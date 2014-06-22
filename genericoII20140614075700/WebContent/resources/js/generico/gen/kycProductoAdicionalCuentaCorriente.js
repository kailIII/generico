KycProductoAdicionalCuentaCorriente = function(){
	var configWindow = {
		add: "kycProductoAdicionalCuentaCorrienteAgregarTop",
		edit: "kycProductoAdicionalCuentaCorrienteEditarTop",
		remove: "kycProductoAdicionalCuentaCorrienteEliminarTop",
		grid: "kycProductoAdicionalCuentaCorrienteGrid",
		save: "kycProductoAdicionalCuentaCorrienteGuardarTop",
		form: "kycProductoAdicionalCuentaCorrienteForm"
	};
	var configWindowBottom = {
			add: "kycProductoAdicionalCuentaCorrienteAgregarBottom",
			edit: "kycProductoAdicionalCuentaCorrienteEditarBottom",
			remove: "kycProductoAdicionalCuentaCorrienteEliminarBottom",
			save: "kycProductoAdicionalCuentaCorrienteGuardarBottom"
	};
	return {
		agregarProductoAdicionalCuentaCorriente: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductoAdicionalCuentaCorriente: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductoAdicionalCuentaCorriente: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosAdicionales/delete",
					params: {
						kycProductoAdicionalId : Ext.getCmp("kycProductoAdicionalCuentaCorrienteId").getValue(),
						kycProductoId: EfxKYC.getKycProductoId(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_CORRIENTE
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoAdicionalCuentaCorrienteForm");
								if(jsonObject.kycProductoAdicionalCuentaCorriente){
			    					Ext.getCmp("kycProductoAdicionalCuentaCorrienteGrid").getStore().loadData(jsonObject.kycProductoAdicionalCuentaCorriente);
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
		guardarProductoAdicionalCuentaCorriente: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoAdicionalCuentaCorrienteForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosAdicionales/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoAdicionalCuentaCorriente.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoAdicionalCuentaCorriente.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoAdicionalCuentaCorriente.ctgTipoProducto.ctgCatalogoId":Efx.constants.codes.CUENTA_CORRIENTE,
    				"kycProductoAdicionalCuentaCorriente.kycProducto.kycProductoId":EfxKYC.getKycProductoId(),
    				 kycTipoProducto: Efx.constants.codes.CUENTA_CORRIENTE
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoAdicionalCuentaCorrienteForm", true);
    				if(action.result.kycProductoAdicionalCuentaCorriente){
    					Ext.getCmp("kycProductoAdicionalCuentaCorrienteGrid").getStore().loadData(action.result.kycProductoAdicionalCuentaCorriente);
    					Ext.getCmp("kycProductoAdicionalCuentaCorrienteGrid").getSelectionModel().select(action.result.kycProductoAdicionalCuentaCorrienteIndex);
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
							   id: "kycProductoAdicionalCuentaCorrienteAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoAdicionalCuentaCorriente.agregarProductoAdicionalCuentaCorriente
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoAdicionalCuentaCorrienteEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoAdicionalCuentaCorriente.editarProductoAdicionalCuentaCorriente
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoAdicionalCuentaCorrienteEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoAdicionalCuentaCorriente.eliminarProductoAdicionalCuentaCorriente
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoAdicionalCuentaCorrienteGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoAdicionalCuentaCorriente.guardarProductoAdicionalCuentaCorriente
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
							   id: "kycProductoAdicionalCuentaCorrienteAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoAdicionalCuentaCorriente.agregarProductoAdicionalCuentaCorriente
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoAdicionalCuentaCorrienteEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoAdicionalCuentaCorriente.editarProductoAdicionalCuentaCorriente
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoAdicionalCuentaCorrienteEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoAdicionalCuentaCorriente.eliminarProductoAdicionalCuentaCorriente
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoAdicionalCuentaCorrienteGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoAdicionalCuentaCorriente.guardarProductoAdicionalCuentaCorriente
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoAdicionalCuentaCorrienteGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoAdicionalCuentaCorriente || [],
					    	fields: [
						    	     	"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalId",
										"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombre",
										"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalCedula",
										"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalViajeroFrecuente",
										"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNumeroViajeroFrecuente",
										"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombreTarjeta",
										"kycProductoAdicionalCuentaCorriente.kycFechaActualizacion",
										"ctgTipoTarjeta.ctgCatalogoId",
										"ctgOficinaEntrega.ctgSucursalId"
				    	        ]
						    }),
						    columns: [
						{header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
						{header: "N\u00famero de identificaci\u00f3n",  dataIndex: "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalCedula",flex: 1, width: 100},					    ],
						    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductoAdicionalCuentaCorrienteForm", record.data);
					    			Efx.form.setDisable("kycProductoAdicionalCuentaCorrienteForm");
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
						id: "kycProductoAdicionalCuentaCorrienteForm",
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
//							maxLength: 200,
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
								text: "ADICIONALES A CUENTA CORRIENTE",
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
											else
												{

												}
										}
									}
							},
							{
								xtype : "textfield",
								id:"kycProductoAdicionalNombre",
								name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombre",
								readOnly: true,
								allowBlank: false,
								maxLength: 100,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycProductoAdicionalCedula",
								name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalCedula",
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
								name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalViajeroFrecuente",
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
								name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNumeroViajeroFrecuente",
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
								colspan: 2
							},
							{
								xtype : "textfield",
								id:"kycProductoAdicionalNombreTarjeta",
								name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombreTarjeta",
								maxLength : 100,
								colspan:4
							},

							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoAdicionalCuentaCorrienteId",
								name: "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoAdicionalCuentaCorriente.ctgTipoProducto.ctgCatalogoId"
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