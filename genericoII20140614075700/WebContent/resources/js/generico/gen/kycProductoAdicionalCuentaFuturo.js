KycProductoAdicionalCuentaFuturo = function(){
	var configWindow = {
		add: "kycProductoAdicionalCuentaFuturoAgregarTop",
		edit: "kycProductoAdicionalCuentaFuturoEditarTop",
		remove: "kycProductoAdicionalCuentaFuturoEliminarTop",
		grid: "kycProductoAdicionalCuentaFuturoGrid",
		save: "kycProductoAdicionalCuentaFuturoGuardarTop",
		form: "kycProductoAdicionalCuentaFuturoForm"
	};
	var configWindowBottom = {
			add: "kycProductoAdicionalCuentaFuturoAgregarBottom",
			edit: "kycProductoAdicionalCuentaFuturoEditarBottom",
			remove: "kycProductoAdicionalCuentaFuturoEliminarBottom",
			save: "kycProductoAdicionalCuentaFuturoGuardarBottom"
	};
	return {
		agregarProductoAdicionalCuentaFuturo: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductoAdicionalCuentaFuturo: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductoAdicionalCuentaFuturo: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosAdicionales/delete",
					params: {
						kycProductoAdicionalId : Ext.getCmp("kycProductoAdicionalCuentaFuturoId").getValue(),
						kycProductoId: EfxKYC.getKycProductoId(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoAdicionalCuentaFuturoForm");
								if(jsonObject.kycProductoAdicionalCuentaFuturo){
			    					Ext.getCmp("kycProductoAdicionalCuentaFuturoGrid").getStore().loadData(jsonObject.kycProductoAdicionalCuentaFuturo);
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
		guardarProductoAdicionalCuentaFuturo: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoAdicionalCuentaFuturoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosAdicionales/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoAdicionalCuentaFuturo.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoAdicionalCuentaFuturo.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoAdicionalCuentaFuturo.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CUENTA_FUTURO,
    				"kycProductoAdicionalCuentaFuturo.kycProducto.kycProductoId":EfxKYC.getKycProductoId(),
    				 kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoAdicionalCuentaFuturoForm", true);
    				if(action.result.kycProductoAdicionalCuentaFuturo){
    					Ext.getCmp("kycProductoAdicionalCuentaFuturoGrid").getStore().loadData(action.result.kycProductoAdicionalCuentaFuturo);
    					Ext.getCmp("kycProductoAdicionalCuentaFuturoGrid").getSelectionModel().select(action.result.kycProductoAdicionalCuentaFuturoIndex);
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
				title: "PRODUCTOS - ADICIONALES",
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
							   id: "kycProductoAdicionalCuentaFuturoAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoAdicionalCuentaFuturo.agregarProductoAdicionalCuentaFuturo
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoAdicionalCuentaFuturoEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoAdicionalCuentaFuturo.editarProductoAdicionalCuentaFuturo
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoAdicionalCuentaFuturoEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoAdicionalCuentaFuturo.eliminarProductoAdicionalCuentaFuturo
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoAdicionalCuentaFuturoGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoAdicionalCuentaFuturo.guardarProductoAdicionalCuentaFuturo
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
							   id: "kycProductoAdicionalCuentaFuturoAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoAdicionalCuentaFuturo.agregarProductoAdicionalCuentaFuturo
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoAdicionalCuentaFuturoEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoAdicionalCuentaFuturo.editarProductoAdicionalCuentaFuturo
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoAdicionalCuentaFuturoEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoAdicionalCuentaFuturo.eliminarProductoAdicionalCuentaFuturo
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoAdicionalCuentaFuturoGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoAdicionalCuentaFuturo.guardarProductoAdicionalCuentaFuturo
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoAdicionalCuentaFuturoGrid",
						height: 150,
						width:700,
						collapsible: true,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoAdicionalCuentaFuturo || [],
					    	fields: [
								"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalId",
								"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNombre",
								"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalCedula",
								"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalViajeroFrecuente",
								"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNumeroViajeroFrecuente",
								"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNombreTarjeta",
								"kycProductoAdicionalCuentaFuturo.kycFechaActualizacion",
								"ctgTipoTarjeta.ctgCatalogoId",
								"ctgOficinaEntrega.ctgSucursalId"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
							      {header: "N\u00famero de identificaci\u00f3n",  dataIndex: "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalCedula",flex: 1, width: 100},
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductoAdicionalCuentaFuturoForm", record.data);
					    			Efx.form.setDisable("kycProductoAdicionalCuentaFuturoForm");
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
						id: "kycProductoAdicionalCuentaFuturoForm",
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
								text: "ADICIONALES A CUENTA FUTURO",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label",text: "Seleccione la persona adicional", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Nombre", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de identificaci\u00f3n", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "combo",
								id:"kycAdicionales",
								name: "kycAdicionales",
								store: new Ext.data.SimpleStore({
									data: config.kycAdicionales || [],
									fields: ["kycAdicionalId", "kycAdicionalNombres", "kycAdicionalPrimerApellido", "kycAdicionalSegundoApellido",
									         "kycAdicionalDocumento",
									         {
						                name: 'NombreCompleto',
						                convert: function(value, r) {
						                    var fullName  = (r.get('kycAdicionalNombres') || "") +
						                    	" " + (r.get('kycAdicionalPrimerApellido') || "") +
						                    	" " + (r.get('kycAdicionalSegundoApellido') || "");
						                    return fullName;
						                }
						            }
									         ]
								}),
								displayField:  "NombreCompleto",
								valueField: "kycAdicionalDocumento",
								colspan: 2,
								listeners:{
										change : function() {
											if (this.getValue())
												{
											Ext.getCmp("kycProductoAdicionalNombre").setValue(this.getRawValue());
											Ext.getCmp("kycProductoAdicionalCedula").setValue(this.getValue());
												}
											else {  }
										}}
							},

							{
								xtype : "textfield",
								id:"kycProductoAdicionalNombre",
								name : "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNombre",
								maxLength: 100,
								readOnly: true,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycProductoAdicionalCedula",
								readOnly: true,
								allowBlank: false,
								name : "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalCedula",
								maxLength: 20,
								colspan:2,
								listeners:{
									change: function()
									{
										if (this.getValue()!= " ")
											{
											Ext.getCmp("kycAdicionales").setValue(this.getValue());
											}
									}
									}
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoAdicionalCuentaFuturoId",
								name: "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoAdicionalCuentaFuturo.ctgTipoProducto.ctgCatalogoId"
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