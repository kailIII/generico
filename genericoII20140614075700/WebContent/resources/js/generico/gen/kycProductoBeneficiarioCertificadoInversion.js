KycProductoBeneficiarioCertificadoInversion = function(){
	var configWindow = {
		add: "kycProductoBeneficiarioCertificadoInversionAgregarTop",
		edit: "kycProductoBeneficiarioCertificadoInversionEditarTop",
		remove: "kycProductoBeneficiarioCertificadoInversionEliminarTop",
		grid: "kycProductoBeneficiarioCertificadoInversionGrid",
		save: "kycProductoBeneficiarioCertificadoInversionGuardarTop",
		form: "kycProductoBeneficiarioCertificadoInversionForm"
	};
	var configWindowBottom = {
			add: "kycProductoBeneficiarioCertificadoInversionAgregarBottom",
			edit: "kycProductoBeneficiarioCertificadoInversionEditarBottom",
			remove: "kycProductoBeneficiarioCertificadoInversionEliminarBottom",
			save: "kycProductoBeneficiarioCertificadoInversionGuardarBottom"
	};
	return {
		agregarProductoBeneficiarioCertificadoInversion: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductoBeneficiarioCertificadoInversion: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductoBeneficiarioCertificadoInversion: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosBeneficiarios/delete",
					params: {
						kycProductoId: Efx.utils.getValue("kycProductoBeneficiarioCertificadoInversionId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CERTIFICADO_INVERSION
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoBeneficiarioCertificadoInversionForm");
								if(jsonObject.kycProductoBeneficiarioCertificadoInversion){
			    					Ext.getCmp("kycProductoBeneficiarioCertificadoInversionGrid").getStore().loadData(jsonObject.kycProductoBeneficiarioCertificadoInversion);
								}
								return;
							}
							jsonObject = jsonObject || {};
							Efx.message.alertInvalid(jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE);
							return;
						}
						Efx.message.alertInvalid(Efx.constants.DEFAULT_ERROR_MESSAGE);
					}
				});
			});
		},
		guardarProductoBeneficiarioCertificadoInversion: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoBeneficiarioCertificadoInversionForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosBeneficiarios/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoBeneficiarioCertificadoInversion.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoBeneficiarioCertificadoInversion.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoBeneficiarioCertificadoInversion.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CERTIFICADO_INVERSION,
    				 kycTipoProducto : Efx.constants.codes.CERTIFICADO_INVERSION

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoBeneficiarioCertificadoInversionForm", true);
    				if(action.result.kycProductoBeneficiarioCertificadoInversion){
    					Ext.getCmp("kycProductoBeneficiarioCertificadoInversionGrid").getStore().loadData(action.result.kycProductoBeneficiarioCertificadoInversion);
    					Ext.getCmp("kycProductoBeneficiarioCertificadoInversionGrid").getSelectionModel().select(action.result.kycProductoBeneficiarioCertificadoInversionIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		init: function(config){
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				flex: 1,
				title: "PRODUCTOS - BENEFICIARIOS",
				autoScroll: true,
				xtype: "panel",
				layout: {
				    type: "vbox",
				    align : "center",
				    pack  : "start"
				},
				defaults: {width: 800, margins: "5 0 5 0"},
				dockedItems: [
					{
						xtype: "toolbar",
						dock: "top",
						hidden: EfxKYC.getKycVigente() === false,
						items: [
						   '->',
						   {
							   text: "Nuevo",
							   id: "kycProductoBeneficiarioCertificadoInversionAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoBeneficiarioCertificadoInversion.agregarProductoBeneficiarioCertificadoInversion
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoBeneficiarioCertificadoInversionEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoBeneficiarioCertificadoInversion.editarProductoBeneficiarioCertificadoInversion
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoBeneficiarioCertificadoInversionEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoBeneficiarioCertificadoInversion.eliminarProductoBeneficiarioCertificadoInversion
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoBeneficiarioCertificadoInversionGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoBeneficiarioCertificadoInversion.guardarProductoBeneficiarioCertificadoInversion
					       }
					    ]
					},{
			        	xtype: "toolbar",
			        	dock: "bottom",
			        	hidden: EfxKYC.getKycVigente() === false,
			        	bodyStyle: "border: solid",
			        	items: [
			        	   '->',
			        	   {
							   text: "Nuevo",
							   id: "kycProductoBeneficiarioCertificadoInversionAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoBeneficiarioCertificadoInversion.agregarProductoBeneficiarioCertificadoInversion
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoBeneficiarioCertificadoInversionEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoBeneficiarioCertificadoInversion.editarProductoBeneficiarioCertificadoInversion
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoBeneficiarioCertificadoInversionEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoBeneficiarioCertificadoInversion.eliminarProductoBeneficiarioCertificadoInversion
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoBeneficiarioCertificadoInversionGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoBeneficiarioCertificadoInversion.guardarProductoBeneficiarioCertificadoInversion
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoBeneficiarioCertificadoInversionGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoBeneficiarioCertificadoInversion || [],
					    	fields: [
								"kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioId",
								"kycProductoBeneficiarioNombre",
								"kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioCedula",
								"kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioParticipacion",
								"kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioNumeroCuenta",
								"kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioRelacionAsegurado",
								"kycProductoBeneficiarioCertificadoInversion.kycFechaActualizacion",
								"kycProductoBeneficiarioApellido"
			    	        ]
					    }),
					    columns: [
					              {text: "Nombre de Beneficiario", xtype: "templatecolumn", tpl: "{kycProductoBeneficiarioNombre} " + "{kycProductoBeneficiarioApellido}", flex: 1.8, minWidth: 200},
							      {header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioCedula",flex: 1, width: 100},
							      {header: "Porcentaje (%)",  dataIndex: "kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioParticipacion",flex: 1, width: 100}
							      ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductoBeneficiarioCertificadoInversionForm", record.data);
					    			Efx.form.setDisable("kycProductoBeneficiarioCertificadoInversionForm");
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    	}
					    }
					},{
			        	xtype: "form",
						id: "kycProductoBeneficiarioCertificadoInversionForm",
						flex: 1,
					    border: false,
					    autoScroll: true,
						layout: {
							type: "table",
							columns: 6,
							tableAttrs: {
					            style: {width: "730px"},
					            align: "center"
					        }
						},
						defaults: {
							width: 230,
							selectOnFocus: true,
							enforceMaxLength: true,
							maxLength: 200,
							typeAhead: true,
							minChars: 1,
							queryMode: "local",
							forceSelection: true,
							allowEnable: true,
							colspan:2
						},
						items: [
				        	 {
					        	xtype: "label",
					        	id: "kycFechaActualizacionTitle",
					        	text: "",
					        	cls: "x-form-item label_header lblHeaderRed",
					        	colspan: 6,
					        	hidden: true,
					        	width: 730
					        },{
								xtype: "label",
								text: "BENEFICIARIOS DE CERTIFICADO DE INVERSI\u00d3N",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label", text: "Nombres", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Apellidos", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de Identificaci\u00f3n", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioNombre",
								name : "kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioNombre",
								maxLength: 150,
								allowBlank: false
							},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioApellido",
								name : "kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioApellido",
								maxLength: 150,
								allowBlank: false
							},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioCedula",
								name : "kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioCedula",
								maxLength: 20,
								colspan:2,
								allowBlank: false
							},

							{xtype: "label", text: "Porcentaje (%)", cls: "x-form-item label_spacing", colspan: 6},
							 {
								xtype : "numberfield",
								id:"kycProductoBeneficiarioParticipacion",
								name : "kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioParticipacion",
								maxLength: 3,
								maxValue: 100,
								minValue: 0,
								hideTrigger:true,
								colspan:6
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoBeneficiarioCertificadoInversionId",
								name: "kycProductoBeneficiarioCertificadoInversion.kycProductoBeneficiarioId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoBeneficiarioCertificadoInversion.ctgTipoProducto.ctgCatalogoId"
							},{
								xtype: "hidden",
								id: "kycFechaActualizacion",
								listeners: {
									change: function(){
										var value = this.getValue();
										Efx.utils.setVisible("kycFechaActualizacionTitle", !Ext.isEmpty(value));
										Efx.utils.setText("kycFechaActualizacionTitle", "FORMULARIO ACTUALIZADO EL: " + Ext.util.Format.kycFormatDateYmdHis_d_m_Y_H_i(value));
									}
								}
							}
						]
			        }
				]
			});
			return configToReturn;
		}
	};
}();