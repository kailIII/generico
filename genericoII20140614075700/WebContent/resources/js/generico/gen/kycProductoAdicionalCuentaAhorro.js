KycProductoAdicionalCuentaAhorro = function(){
	var configWindow = {
		add: "kycProductoAdicionalCuentaAhorroAgregarTop",
		edit: "kycProductoAdicionalCuentaAhorroEditarTop",
		remove: "kycProductoAdicionalCuentaAhorroEliminarTop",
		grid: "kycProductoAdicionalCuentaAhorroGrid",
		save: "kycProductoAdicionalCuentaAhorroGuardarTop",
		form: "kycProductoAdicionalCuentaAhorroForm"
	};
	var configWindowBottom = {
			add: "kycProductoAdicionalCuentaAhorroAgregarBottom",
			edit: "kycProductoAdicionalCuentaAhorroEditarBottom",
			remove: "kycProductoAdicionalCuentaAhorroEliminarBottom",
			save: "kycProductoAdicionalCuentaAhorroGuardarBottom"
	};
	return {
		agregarProductoAdicionalCuentaAhorro: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductoAdicionalCuentaAhorro: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductoAdicionalCuentaAhorro: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosAdicionales/delete",
					params: {
						kycProductoAdicionalId : Ext.getCmp("kycProductoAdicionalCuentaAhorroId").getValue(),
						kycProductoId: EfxKYC.getKycProductoId(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoAdicionalCuentaAhorroForm");
								if(jsonObject.kycProductoAdicionalCuentaAhorro){
			    					Ext.getCmp("kycProductoAdicionalCuentaAhorroGrid").getStore().loadData(jsonObject.kycProductoAdicionalCuentaAhorro);
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
		guardarProductoAdicionalCuentaAhorro: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoAdicionalCuentaAhorroForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosAdicionales/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoAdicionalCuentaAhorro.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoAdicionalCuentaAhorro.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoAdicionalCuentaAhorro.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CUENTA_AHORRO,
    				"kycProductoAdicionalCuentaAhorro.kycProducto.kycProductoId":EfxKYC.getKycProductoId(),
    				 kycTipoProducto : Efx.constants.codes.CUENTA_AHORRO

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoAdicionalCuentaAhorroForm", true);
    				if(action.result.kycProductoAdicionalCuentaAhorro){
    					Ext.getCmp("kycProductoAdicionalCuentaAhorroGrid").getStore().loadData(action.result.kycProductoAdicionalCuentaAhorro);
    					Ext.getCmp("kycProductoAdicionalCuentaAhorroGrid").getSelectionModel().select(action.result.kycProductoAdicionalCuentaAhorroIndex);
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
							   id: "kycProductoAdicionalCuentaAhorroAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoAdicionalCuentaAhorro.agregarProductoAdicionalCuentaAhorro
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoAdicionalCuentaAhorroEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoAdicionalCuentaAhorro.editarProductoAdicionalCuentaAhorro
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoAdicionalCuentaAhorroEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoAdicionalCuentaAhorro.eliminarProductoAdicionalCuentaAhorro
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoAdicionalCuentaAhorroGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoAdicionalCuentaAhorro.guardarProductoAdicionalCuentaAhorro
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
							   id: "kycProductoAdicionalCuentaAhorroAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoAdicionalCuentaAhorro.agregarProductoAdicionalCuentaAhorro
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoAdicionalCuentaAhorroEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoAdicionalCuentaAhorro.editarProductoAdicionalCuentaAhorro
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoAdicionalCuentaAhorroEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoAdicionalCuentaAhorro.eliminarProductoAdicionalCuentaAhorro
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoAdicionalCuentaAhorroGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoAdicionalCuentaAhorro.guardarProductoAdicionalCuentaAhorro
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoAdicionalCuentaAhorroGrid",
						height: 150,
						width:700,
						collapsible: true,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoAdicionalCuentaAhorro || [],
					    	fields: [
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalId",
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombre",
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalCedula",
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalViajeroFrecuente",
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNumeroViajeroFrecuente",
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombreTarjeta",
								"kycProductoAdicionalCuentaAhorro.kycFechaActualizacion",
								"ctgTipoTarjeta.ctgCatalogoId",
								"ctgOficinaEntrega.ctgSucursalId"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
							      {header: "N\u00famero de identificaci\u00f3n",  dataIndex: "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalCedula",flex: 1, width: 100},
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductoAdicionalCuentaAhorroForm", record.data);
					    			Efx.form.setDisable("kycProductoAdicionalCuentaAhorroForm");
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
						id: "kycProductoAdicionalCuentaAhorroForm",
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
								text: "ADICIONALES A CUENTA DE AHORRO",
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
								name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombre",
								maxLength: 100,
								readOnly: true,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycProductoAdicionalCedula",
								name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalCedula",
								maxLength: 20,
								colspan:2,
								readOnly: true,
								allowBlank: false,
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

							{xtype: "label", text: "Tipo de Tarjeta", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label",text: "Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "combo",
								id:"ctgTipotarjeta",
								name: "ctgTipoTarjeta.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoTarjeta || [],
									fields: ["ctgTipoTarjetaId", "ctgTipoTarjetaNombre"]
								}),
								displayField: "ctgTipoTarjetaNombre",
								valueField: "ctgTipoTarjetaId",
								colspan: 2,
								listeners : {
										change : function() {
											var disable=false;
											var sizeIndexOf = this.getRawValue().indexOf("LIFEMILES");
											var sizeIndexOf2 = this.getRawValue().indexOf("CITIGOLD");
										if	( sizeIndexOf != -1)
											{
											disable=true;
											}
										else if (sizeIndexOf2 != -1 )
											{
											disable=true;
											}
										Efx.utils.setDisabled("kycProductoAdicionalViajeroFrecuente", !disable, false);
										Efx.utils.setDisabled("kycProductoAdicionalNumeroViajeroFrecuente", !disable, false);
										}}
							},{
								xtype : "combo",
								id:"kycProductoAdicionalViajeroFrecuente",
								name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalViajeroFrecuente",
								store : new Ext.data.SimpleStore({
									data : Efx.combos.yesnoArray() || [],
									fields : [ "id", "descripcion" ]
								}),
								displayField : "descripcion",
								valueField: "id",
								colspan : 2,
								listeners : {
									change : function() {
										var disable = this.getValue() != "1";
										Efx.utils.setDisabled("kycProductoAdicionalNumeroViajeroFrecuente",disable, true);
									}}
							},
							 {
								xtype : "textfield",
								id:"kycProductoAdicionalNumeroViajeroFrecuente",
								name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNumeroViajeroFrecuente",
								maxLength: 30,
								colspan:2
							},
							{xtype: "label", text: "Oficina de Entrega", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Nombre que desea en Tarjeta", cls: "x-form-item label_spacing",  colspan: 4},
							{
								xtype: "combo",
								id:"ctgOficinaEntrega",
								name: "ctgOficinaEntrega.ctgSucursalId",
								store: new Ext.data.SimpleStore({
									data: config.ctgOficinas || [],
									fields: ["ctgOficinasId", "ctgOficinasNombre"]
								}),
								displayField: "ctgOficinasNombre",
								valueField: "ctgOficinasId",
								colspan: 2,
							},
							{
								xtype : "textfield",
								id:"kycProductoAdicionalNombreTarjeta",
								name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombreTarjeta",
								maxLength : 100,
								colspan:4
							},

							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoAdicionalCuentaAhorroId",
								name: "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoAdicionalCuentaAhorro.ctgTipoProducto.ctgCatalogoId"
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