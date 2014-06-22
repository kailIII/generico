EfxDigitalizacion = function(){
	return {
		deleteFile: function(){
			var efxDigitalizacionTree = Ext.getCmp("efxDigitalizacionTree");
			if(efxDigitalizacionTree.getSelectionModel().hasSelection()){
				var currentNode = efxDigitalizacionTree.getSelectionModel().getSelection()[0];
				if(Ext.isEmpty(currentNode.data.fileLocation)){
					Efx.message.alert("No se puede eliminar el folder principal");
					return;
				}
				var funct = function(btn){
					if(btn != "yes") return;
					Ext.Ajax.request({
		    			timeout: Efx.constants.TIMEOUT_SECONDS,
		  			    url: Efx.constants.CONTEXT_PATH + "/documentoAdjunto/delete",
		  			    params: {
		  			    	kycDocumentoAdjuntoId: currentNode.data.fileLocation
		  			    },
		  			    callback: function(options, success, response){
		  			    	if(success){
		  			    		var jsonObject = Efx.utils.ajaxRequestGetJson(response);
		  			    		if(jsonObject && jsonObject.success){
		  			    			Efx.message.alert(jsonObject.message);
		  			    			var nodeToUpdate = currentNode.parentNode;
		  			    			currentNode.remove();
			    					efxDigitalizacionTree.getSelectionModel().select(nodeToUpdate);
		  			    		}else{
		  			    			Efx.message.alertInvalid(jsonObject ? (jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE) : Efx.constants.DEFAULT_ERROR_MESSAGE);
		  			    		}
		  			    	}
		  			    }
		  			});
				};
				Efx.message.confirm("Esta seguro que desea elimnar?<br />" +
						(currentNode.data.leaf == true ? "<b>* Archivo: </b>" : "<b>* Carpeta: </b>") +
						currentNode.data.text,
						funct);
			}else{
				Efx.message.alertInvalid("Debe seleccionar un archivo");
			}
		},
		getNodeToUpdateNode: function(){
			var efxDigitalizacionTree = Ext.getCmp("efxDigitalizacionTree");
			var nodeToUpdate = efxDigitalizacionTree.getView().node;
			return nodeToUpdate;
		},
		upload: function(){
			if(Ext.isEmpty(Efx.utils.getValue("uploadFile"))){
				Efx.message.alertInvalid("Debe seleccionar un archivo");
				return null;
			}
			var nodeToUpdate = EfxDigitalizacion.getNodeToUpdateNode();
			if(!nodeToUpdate) return;
			var funct = function(btn){
				if(btn != "yes") return;
				Efx.message.progress("Guardando Informaci\u00F3n...");
				Ext.getCmp("efxDigitalizacionForm").getForm().submit({
					url: Efx.constants.CONTEXT_PATH + "/documentoAdjunto/upload",
	    			timeout: Efx.constants.TIMEOUT_SECONDS,
	    			reset: true,
	    			params: {
	    				"kycDocumentoAdjunto.kyc.kycId": EfxKYC.getKycId(),
	    				ctgDocumentoDescripcion: Efx.utils.getRawValue("ctgDocumentoId")
	    			},
	    			success: function(form, action){
	    				Ext.Msg.hide();
	    				Efx.message.alert(action.result.message);
	    				var fileSystem = action.result.fileSystem;
	    				if(!Ext.isObject(fileSystem)) fileSystem = Ext.decode(fileSystem);
	    				Ext.getCmp("efxDigitalizacionTree").setRootNode(fileSystem);
	    				Efx.combos.selectFirstItem("ctgDocumentoId");
	    			},
	    			failure: Efx.form.failureProcedure
				});
			};
			Efx.message.confirm("Desea continuar?, Si el archivo existe ser\u00E1 sobreescrito<br />" +
					"<b>* Archivo: </b>" +
						(Ext.isEmpty(Efx.utils.getRawValue("kycDocumentoAdjuntoDescripcion")) ?
								Efx.utils.getRawValue("ctgDocumentoId") + "<br />" :
								Efx.utils.getRawValue("kycDocumentoAdjuntoDescripcion")),
					funct);
		},
		showDigitalizacion: function(fileSystem, documentos){
			if(!Ext.isObject(fileSystem)) fileSystem = Ext.decode(fileSystem);
			var defined = false;
			try{if(ImageModel) defined = true;}catch(e){}
			if(!defined){
				Ext.define("ImageModel", {
					extend: "Ext.data.Model",
					fields: ["text", "fileLocation", "resources", "iconCls", "leaf"]
				});
			}
			var efxDigitalizacionWindow = Ext.create("Ext.window.Window", {
				title: "DOCUMENTOS ADJUNTOS" + Efx.constants.KYC +  EfxKYC.getKycId(),
				layout: "fit",
				height: 600,
				width: 650,
				modal: true,
				items: {
		        	xtype: "container",
		        	width: 350,
		        	bodyStyle: "border-top: none; border-left: none; border_bottom: none;",
		        	layout: {
					    type: "vbox",
					    align : "stretch",
					    pack  : "start"
					},
					defaults: {margins: "5 5 5 5"},
		        	items: [
	        	        {
			        		xtype: "form",
			        		id: "efxDigitalizacionForm",
			        		frame: true,
			        		defaults: {anchor: "90%", labelAlign: "left"},
			        		buttons: [
								{
									xtype: "button",
									iconCls: Efx.constants.UPLOAD_ICON,
									text: "Cargar Archivo",
									handler: EfxDigitalizacion.upload
								}
        		            ],
							items: [
						        {
						    	   xtype: "combo",
						    	   id: "ctgDocumentoId",
						    	   name: "kycDocumentoAdjunto.ctgDocumento.ctgCatalogoId",
						    	   fieldLabel: "Documento",
						    	   store: new Ext.data.SimpleStore({
						    		   data: documentos,
					    			   fields: [
				    			            "ctgDocumentoId", "ctgDocumentoNombre", "ctgDocumentoPadre", "ctgDocumentoHijo"
			    			           ]
						    	   }),
						    	   displayField: "ctgDocumentoNombre",
						    	   valueField: "ctgDocumentoId",
						    	   typeAhead: true,
						    	   minChars: 1,
						    	   queryMode: "local",
						    	   triggerAction: "all",
						    	   mode: "local",
						    	   forceSelection: true,
						    	   listeners: {
						    		   change: function(field){
						    			   var value = field.findRecord();
					    				   var disable = value.get("ctgDocumentoHijo") != "00291";
					    				   Efx.utils.setDisabled("kycDocumentoAdjuntoDescripcion", disable);
					    				   if(disable) Efx.utils.setValue("kycDocumentoAdjuntoDescripcion", "");
					    				   Efx.utils.setRequiredAndValidate("kycDocumentoAdjuntoDescripcion", !disable);
						    		   }
					    		   },
					    		   allowBlank: false,
						    	   listConfig: {minWidth: 450}
					    	   },{
						    	   xtype: "textfield",
						    	   id: "kycDocumentoAdjuntoDescripcion",
						    	   name: "kycDocumentoAdjunto.kycDocumentoAdjuntoDescripcion",
						    	   fieldLabel: "Descripci\u00F3n",
						    	   disabled: true,
					    		   allowBlank: false
					    	   },{
								    xtype: "filefield",
								    id: "uploadFile",
								    name: "uploadFile",
								    fieldLabel: "Archivo",
								    width: 265,
								    buttonText: "",
								    tooltip: "Seleccionar Archivo",
								    allowBlank: false,
								    buttonConfig: {
								    	iconCls: Efx.constants.icons.OPEN_ICON,
								    	tooltip: "Seleccionar Archivo"
						    		}
								}
							]
			        	},{
			        		xtype: "treepanel",
			        		id: "efxDigitalizacionTree",
			        		flex: 1,
				        	layout: {
				        		type: "vbox",
							    align : "center",
							    pack  : "start"
				        	},
		        	        store: {
		        	        	model: "ImageModel",
		        	        	root: fileSystem,
		        	        	proxy: {
        	        		        type: 'memory'
		        	        	}
	        	        	},
	        	        	lbar: [
        	        	       {
									xtype: "button",
									iconCls: Efx.constants.icons.DELETE_ICON,
									tooltip: "Eliminar Archivo",
									handler: EfxDigitalizacion.deleteFile
								}
	        	       		],
	        	        	singleExpand: true,
		        	        listeners: {
		        	        	itemdblclick: function(view, record){
		        	        		if(record.get("leaf") == true){
		        	        			EfxMenu.openWindow("documentoAdjunto/viewFile?codigo=" + record.get("fileLocation") + "&kycId=" + EfxKYC.getKycId());
		        	        		}
		        	        	}
		        	        }
				        }
        	        ]
		        },
    	        buttons: [
	                 {
	                	 text: "Cerrar",
	                	 handler: function(){efxDigitalizacionWindow.close();}
	                 }
                ]
			});
			efxDigitalizacionWindow.show();
			Efx.combos.selectFirstItem("ctgDocumentoId");
		},
		initDigitalizacion: function(){
			Efx.message.progress("Obteniendo Informaci\u00F3n...");
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
			    url: Efx.constants.CONTEXT_PATH + "/documentoAdjunto/view",
			    params: {
			        kycId: EfxKYC.getKycId()
			    },
			    callback: function(options, success, response){
			    	Ext.Msg.hide();
			    	if(success){
			    		var jsonObject = Efx.utils.ajaxRequestGetJson(response);
			    		if(jsonObject) EfxDigitalizacion.showDigitalizacion(jsonObject.fileSystem || [], jsonObject.ctgDocumentos || []);
			    	}
			    }
			});
		}
	};
}();