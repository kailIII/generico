KycBusquedaPersonaFisica = function(){
	return {
		newBlankKyc: function(){
			var record = Efx.combos.getSelectedData("ctgTipoDocumentoId", "ctgTipoDocumentoId");
			if(record){
				Menu.openSelfWindow("kycPersonaFisica/view", {
					ctgTipoDocumentoId: record.ctgTipoDocumentoId,
					ctgTipoDocumentoCodigo: record.ctgTipoDocumentoHijo,
					kycPersonaFisicaDocumento1: Efx.utils.getValue("kycDocumento1")
				});
			}else Efx.message.alertInvalid("* Debe seleccionar el Tipo de Identificaci\u00F3n");
		},
		saveFromBureau: function(){
			Efx.message.progress("Guardando KYC...");
			if(Ext.isEmpty(EfxKYC.getKycPersonaDocumento1())){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycPersonaFisica/saveFromBureau",
				params: {
					kycPersonaFisicaDocumento1: EfxKYC.getKycPersonaDocumento1(),
					"ctgTipoDocumento.ctgCatalogoId": EfxKYC.getCtgTipoDocumentoId(),
					"ctgTipoDocumento.ctgCatalogoHijo": EfxKYC.getCtgTipoDocumentoCodigo(),
					"ctgTipoDocumento.ctgCatalogoNombre": EfxKYC.getCtgTipoDocumentoNombre()
				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						if(jsonObject && jsonObject.success){
							EfxKYC.setKycId(jsonObject.kycId);
							EfxKYC.setKycPersonaFisicaId(jsonObject.kycPersonaFisicaId);
							Efx.message.confirmProcess(jsonObject.message, function(){
								Menu.openSelfWindow(
									"kycPersonaFisica/view",
									{
										kycId: EfxKYC.getKycId(),
										kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId()
									}
								);
								Efx.message.progress("Obteniendo Informaci\u00F3n...");
							});
						}else
							Efx.message.alertInvalid(jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE);
					}else Efx.message.alertInvalid(Efx.constants.DEFAULT_ERROR_MESSAGE);
				}
			});
		},
		saveFromKyc: function(){
			Efx.message.progress("Guardando KYC...");
			if(Ext.isEmpty(EfxKYC.getKycPersonaFisicaId()) || Ext.isEmpty(EfxKYC.getKycId())){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycPersonaFisica/saveFromKyc",
				params: {
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
					kycId: EfxKYC.getKycId()
				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						if(jsonObject && jsonObject.success){
							EfxKYC.setKycId(jsonObject.kycId);
							EfxKYC.setKycPersonaFisicaId(jsonObject.kycPersonaFisicaId);
							Efx.message.confirmProcess(jsonObject.message, function(){
								Menu.openSelfWindow(
									"kycPersonaFisica/view",
									{
										kycId: EfxKYC.getKycId(),
										kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId()
									}
								);
								Efx.message.progress("Obteniendo Informaci\u00F3n...");
							});
						}else
							Efx.message.alertInvalid(jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE);
					}else Efx.message.alertInvalid(Efx.constants.DEFAULT_ERROR_MESSAGE);
				}
			});
		},
		buscar: function(){
			if((Ext.isEmpty(Efx.utils.getValue("kycDocumento1")) && Ext.isEmpty(Efx.utils.getValue("kycDocumento2"))) ||
					!Ext.getCmp("kycDocumento1").validate()){
					Efx.message.alertInvalidFields("Debe ingresar al menos un documento v\u00E1lido");
					return;
			}
			var store = Ext.getCmp("kycBusquedaPersonaFisicaGrid").getStore();
			EfxKYC.setKycId(null);
    		EfxKYC.setKycPersonaFisicaId(null);
    		EfxKYC.setKycTipoCodigo("");
    		EfxKYC.setKycPersonaDocumento1(null);
    		EfxKYC.setCtgTipoDocumentoId(null);
    		EfxKYC.setCtgTipoDocumentoCodigo("");
    		EfxKYC.setCtgTipoDocumentoNombre("");
    		EfxKYC.setKycVigente(null);
    		EfxKYC.setKycPersonaNombreCompleto(null);
    		EfxKYC.setKycFechaActualizacion(null);
			store.currentPage = 1;
			store.load();
		},
		init: function(config){
			var configToReturn = {};
			Efx.message.addBottons([{id: "bureau", text: "Nuevo desde Bureau"}]);
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			Ext.define("kycBusquedaPersonaFisicaModel", {
			    extend: "Ext.data.Model",
			    fields: [
			        "KYC_TIPO_CODIGO",
			        "KYC_TIPO",
					"KYC_ID",
					"KYC_PFIS_ID",
					"KYC_PFIS_NOMBRE_COMPLETO",
					"KYC_PFIS_DOCUMENTO1",
					"CTG_TDOC_ID",
					"CTG_TDOC_CODIGO",
					"CTG_TDOC_NOMBRE",
					"KYC_PFIS_FECHA_NACIMIENTO",
					"CTG_PAIS_NACIONALIDAD",
					"KYC_FECHA_CREACION",
					"KYC_FECHA_ACTUALIZACION",
					"CTG_SUC_NOMBRE",
					"KYC_VIGENTE",
					"KYC_ORDEN",
					"SGD_USU_NOMBRE_COMPLETO",
					"COMPLETA",
					"ES_EXITO"
		        ]
			});
			var completaRenderer = function(value){
				if(Ext.isEmpty(value)) return;
				var jsonCompleta = Ext.decode(value);
				if (jsonCompleta.completa){
					return '<div class="bateria" title="ACTIVIDADES COMPLETADAS"></div>';
				}else{
					return '<div class="incompleta" title="ACTIVIDADES PENDIENTES" onClick="mostrarActividadesPendientes()"></div>';
				}
			};
			var kycBusquedaPersonaFisicaStore = Ext.create("Ext.data.Store", {
				autoLoad: false,
				pageSize: EfxKYC.getLimit(),
				model: "kycBusquedaPersonaFisicaModel",
				proxy: {
			        type: "ajax",
			        url: Efx.constants.CONTEXT_PATH + "/kycPersonaFisica/findByParameter",
			        timeout: Efx.constants.TIMEOUT_SECONDS,
			        reader: {
			        	type: "json",
			        	root: "kycs",
			        	totalProperty: "totalResult"
	        		}
			    },
			    listeners: {
			    	beforeload: function(store, operation, options){
			    		Ext.LoadMask.prototype.disable();
			    		Ext.MessageBox.wait('Cargando...', 'KYC-CITIBANK');
			    		if(!operation) operation = {};
			    		if(!operation.params) operation.params = {};
			    		if(Ext.isEmpty(Efx.utils.getValue("kycDocumento1")) || Ext.isEmpty(Efx.utils.getValue("ctgTipoDocumentoId"))){
			    			Efx.message.alertInvalid("* Tipo de Identificaci\u00F3n <br/> * Identificaci\u00F3n");
			    			return false;
			    		}
			    		var record = Efx.combos.getSelectedData("ctgTipoDocumentoId", "ctgTipoDocumentoId");
			    		operation.params["kycParametro.kycDocumento1"] = Efx.utils.getValue("kycDocumento1");
			    		operation.params["kycParametro.ctgTipoDocumentoId"] = record.ctgTipoDocumentoId;
			    		operation.params["kycParametro.ctgTipoDocumentoNombre"] = record.ctgTipoDocumentoNombre;
			    		operation.params["kycParametro.ctgTipoDocumentoCodigo"] = record.ctgTipoDocumentoHijo;
			    	},
			    	load: function(store, records, successful, options){
			    		if(store.proxy && store.proxy.reader && store.proxy.reader.jsonData){
			    			var record = Efx.combos.getSelectedData("ctgTipoDocumentoId", "ctgTipoDocumentoId");
			    			if(!record) return;
			    			if(Efx.constants.codes.DOCUMENTO_CEDULA != record.ctgTipoDocumentoHijo && store.proxy.reader.jsonData.encontrado == false){
			    				Efx.message.confirm(
		    						"Cliente no encontrado o no posee KYC vigentes, \u00BFDesea generar KYC en blanco\u003F<br />" +
		    						"<b>" + Efx.utils.getRawValue("ctgTipoDocumentoId") + ":</b> " + Efx.utils.getValue("kycDocumento1")
		    						,
		    						function(btn){
				    					if(btn == "no") return;
				    					KycBusquedaPersonaFisica.newBlankKyc();
			    					}
			    				);
			    			}
			    		}
			    		if(records.length != 0 ) {
			    		if(records[0].data.ES_EXITO == "00" || store.proxy.reader.jsonData.encontrado == true){
			    			setTimeout(function() { Ext.MessageBox.hide() });
			    			}


			    		}
			    	}
			    },
			    groupers: [{property: "KYC_TIPO"}],
			    sorters: [{property: "KYC_ORDEN", direction: "DESC"}]
			});
			configToReturn.items = [
                {
					xtype: "grid",
					flex: 1,
					id: "kycBusquedaPersonaFisicaGrid",
					store: kycBusquedaPersonaFisicaStore,
					columns: [
					     {
					    	dataIndex: "KYC_VIGENTE",
					    	width: 40,
					    	align: "center",
					    	renderer: function(value){
					    		var icon = "";
					    		var title = "";
					    		if(value == "1"){
					    			icon = "bullet_green.png";
					    			title = "KYC VIGENTE";
					    		}else if(value == "0"){
					    			icon = "bullet_red.png";
					    			title = "KYC NO VIGENTE";
					    		}
					    		if(!Ext.isEmpty(icon)) return "<img src=\"" + Efx.constants.CONTEXT_PATH + "/resources/images/" + icon + "\" data-qtip=\"" + title + "\" />";
					    		return "";
					    	}
					    },
					    {dataIndex: "COMPLETA", header: "", width: 70, align: "center", renderer : completaRenderer},
						{dataIndex: "KYC_PFIS_NOMBRE_COMPLETO", header: "Nombre Completo", flex: 1, minWidth: 250},
						{dataIndex: "CTG_TDOC_NOMBRE", header: "Tipo de Identificaci\u00F3n", width: 120},
						{dataIndex: "KYC_PFIS_DOCUMENTO1", header: "Identificaci\u00F3n", width: 80},
						{dataIndex: "KYC_PFIS_FECHA_NACIMIENTO", header: "Fecha Nacimiento", width: 100},
						{dataIndex: "KYC_FECHA_CREACION", header: "Fecha Creaci\u00F3n", width: 100},
						{dataIndex: "KYC_FECHA_ACTUALIZACION", header: "Fecha Actualizaci\u00F3n", width: 110},
						{dataIndex: "CTG_SUC_NOMBRE", header: "Origen KYC", flex: 1, minWidth: 250},
						{dataIndex: "SGD_USU_NOMBRE_COMPLETO", header: "Usuario Actualizaci\u00F3n", flex: 1, minWidth: 150}

		            ],
		            features: [
			           {
			        	   ftype: "grouping",
			        	   enableNoGroups: false,
			        	   groupHeaderTpl: '{name} -> {rows.length} KYC{[values.rows.length > 1 ? "\'s" : ""]}'
			           }
		            ],
		            listeners: {
		            	itemclick: function(view, record){
		            	},
		            	selectionchange: function(grid, selections, options){
		            		if(selections == null || selections.length < 1 || selections[0] == null) return;
		            		EfxKYC.setKycId(selections[0].get("KYC_ID"));
		            		EfxKYC.setKycPersonaFisicaId(selections[0].get("KYC_PFIS_ID"));
		            		EfxKYC.setKycTipoCodigo(selections[0].get("KYC_TIPO_CODIGO"));
		            		EfxKYC.setKycPersonaDocumento1(selections[0].get("KYC_PFIS_DOCUMENTO1"));
		            		EfxKYC.setCtgTipoDocumentoId(selections[0].get("CTG_TDOC_ID"));
		            		EfxKYC.setCtgTipoDocumentoCodigo(selections[0].get("CTG_TDOC_CODIGO"));
		            		EfxKYC.setCtgTipoDocumentoNombre(selections[0].get("CTG_TDOC_NOMBRE"));
		            		EfxKYC.setKycVigente(selections[0].get("KYC_VIGENTE"));
		            		EfxKYC.setKycPersonaNombreCompleto(selections[0].get("KYC_PFIS_NOMBRE_COMPLETO"));
		            		EfxKYC.setKycFechaActualizacion(selections[0].get("KYC_FECHA_ACTUALIZACION"));
		            	}
		            },
		            dockedItems: [{
		                xtype: "pagingtoolbar",
		                store: kycBusquedaPersonaFisicaStore,
		                dock: "bottom",
		                displayInfo: true
		            },{
		            	xtype: "toolbar",
		            	dock: "top",
		            	enableOverflow: true,
		            	items: [
	            	        "Tipo de Identificaci\u00F3n:",
	            	        {
								xtype: "combo",
								id: "ctgTipoDocumentoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoDocumentos,
									fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre", "ctgTipoDocumentoPadre", "ctgTipoDocumentoHijo"]
								}),
								displayField: "ctgTipoDocumentoNombre",
								valueField: "ctgTipoDocumentoId",
								value: Efx.constants.codes.TIPO_DOCUMENTO_CEDULA,
								allowBlank: false,
								typeAhead: true,
								minChars: 1,
								queryMode: "local",
								forceSelection: true,
								selectOnFocus: true,
								triggerAction: "all",
								width: 200,
								listeners : {
									change : function() {

										var valor = this.getValue();
											if(valor == 293) {
												Ext.getCmp("kycDocumento1").vtype = "CedNac";
												if(Ext.getCmp("kycDocumento1").validate()){
													Ext.getCmp("kycDocumento1").clearInvalid();
													return true;
												}else{
													Ext.getCmp("kycDocumento1").markInvalid(Ext.getCmp("kycDocumento1").blankText || 'Formato de c\u00e9dula inv\u00e1lido, el n\u00famero no debe iniciar con "0"');
													return false;
												}
											}
											else if (valor== 295){
													Ext.getCmp("kycDocumento1").vtype = "CedNac";
													if(Ext.getCmp("kycDocumento1").validate()){
														Ext.getCmp("kycDocumento1").clearInvalid();
														return true;
													}else{
														Ext.getCmp("kycDocumento1").markInvalid(Ext.getCmp("kycDocumento1").blankText || 'Formato de c\u00e9dula inv\u00e1lido, el n\u00famero no debe iniciar con "0"');
														return false;
													}
												}
											else {
												Ext.getCmp("kycDocumento1").vtype = "CedExt";
												if(Ext.getCmp("kycDocumento1").validate()){
													Ext.getCmp("kycDocumento1").clearInvalid();
													return true;
												}else{
													Ext.getCmp("kycDocumento1").markInvalid(Ext.getCmp("kycDocumento1").blankText || 'Formato de documento inv\u00e1lido, no se permiten s\u00edmbolos');
													return false;
												}
												}

										}
									}
							},
							"Identificaci\u00F3n:",
							{
	            	        	xtype: "textfield",
	            	        	id: "kycDocumento1",
	            	        	selectOnFocus: true,
	            	        	maxLength: 20,
	            	        	listeners :  {
									change : function() {
										var valor = Ext.getCmp("ctgTipoDocumentoId").getValue();
											if(valor == 293) {
												Ext.getCmp("kycDocumento1").vtype = "CedNac";
											}
											else if (valor== 295){
													Ext.getCmp("kycDocumento1").vtype = "CedNac";
												}
											else {
												Ext.getCmp("kycDocumento1").vtype = "CedExt";
												}

										}
							}
	            	        },{
	            	        	text: "Buscar",
	            	        	iconCls: Efx.constants.icons.BUSCAR_ICON,
	            	        	handler: KycBusquedaPersonaFisica.buscar
	            	        }
            	        ]
		            }]
				}
            ];
			return configToReturn;
		}
	};
}();