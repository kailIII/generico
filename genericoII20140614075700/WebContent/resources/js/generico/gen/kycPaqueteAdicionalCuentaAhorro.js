KycPaqueteAdicionalCuentaAhorro = function(){
	var configWindow = {
		add: "kycPaqueteAdicionalCuentaAhorroAgregarTop",
		edit: "kycPaqueteAdicionalCuentaAhorroEditarTop",
		remove: "kycPaqueteAdicionalCuentaAhorroEliminarTop",
		grid: "kycPaqueteAdicionalCuentaAhorroGrid",
		save: "kycPaqueteAdicionalCuentaAhorroGuardarTop",
		form: "kycPaqueteAdicionalCuentaAhorroForm"
	};
	var configWindowBottom = {
			add: "kycPaqueteAdicionalCuentaAhorroAgregarBottom",
			edit: "kycPaqueteAdicionalCuentaAhorroEditarBottom",
			remove: "kycPaqueteAdicionalCuentaAhorroEliminarBottom",
			save: "kycPaqueteAdicionalCuentaAhorroGuardarBottom"
	};
	return {
		agregarPaqueteAdicionalCuentaAhorro: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarPaqueteAdicionalCuentaAhorro: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarPaqueteAdicionalCuentaAhorro: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycPaquetesAdicionales/delete",
					params: {
						kycPaqueteAdicionalId : Ext.getCmp("kycPaqueteAdicionalCuentaAhorroId").getValue(),
						kycPaqueteId: EfxKYC.getKycPaqueteId(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycPaqueteAdicionalCuentaAhorroForm");
								if(jsonObject.kycPaqueteAdicionalCuentaAhorro){
			    					Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").getStore().loadData(jsonObject.kycPaqueteAdicionalCuentaAhorro);
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
		guardarPaqueteAdicionalCuentaAhorro: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycPaqueteAdicionalCuentaAhorroForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycPaquetesAdicionales/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPaqueteAdicionalCuentaAhorro.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycPaqueteAdicionalCuentaAhorro.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycPaqueteAdicionalCuentaAhorro.ctgTipoPaquete.ctgCatalogoId" :Efx.constants.codes.PAQUETE_CUENTA_AHORRO,
    				"kycPaqueteAdicionalCuentaAhorro.kycPaquete.kycPaqueteId":EfxKYC.getKycPaqueteId(),
    				 kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_AHORRO
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycPaqueteAdicionalCuentaAhorroForm", true);
    				if(action.result.kycPaqueteAdicionalCuentaAhorro){
    					Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").getStore().loadData(action.result.kycPaqueteAdicionalCuentaAhorro);
    					Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").getSelectionModel().select(action.result.kycPaqueteAdicionalCuentaAhorroIndex);
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
				title: "PAQUETE MULTIPRODUCTOS - ADICIONALES",
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
							   id: "kycPaqueteAdicionalCuentaAhorroAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycPaqueteAdicionalCuentaAhorro.agregarPaqueteAdicionalCuentaAhorro
						   },{
					    	   text: "Editar",
					    	   id: "kycPaqueteAdicionalCuentaAhorroEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycPaqueteAdicionalCuentaAhorro.editarPaqueteAdicionalCuentaAhorro
					       },{
					    	   text: "Eliminar",
					    	   id: "kycPaqueteAdicionalCuentaAhorroEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycPaqueteAdicionalCuentaAhorro.eliminarPaqueteAdicionalCuentaAhorro
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycPaqueteAdicionalCuentaAhorroGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycPaqueteAdicionalCuentaAhorro.guardarPaqueteAdicionalCuentaAhorro
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
							   id: "kycPaqueteAdicionalCuentaAhorroAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycPaqueteAdicionalCuentaAhorro.agregarPaqueteAdicionalCuentaAhorro
						   },{
					    	   text: "Editar",
					    	   id: "kycPaqueteAdicionalCuentaAhorroEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycPaqueteAdicionalCuentaAhorro.editarPaqueteAdicionalCuentaAhorro
					       },{
					    	   text: "Eliminar",
					    	   id: "kycPaqueteAdicionalCuentaAhorroEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycPaqueteAdicionalCuentaAhorro.eliminarPaqueteAdicionalCuentaAhorro
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycPaqueteAdicionalCuentaAhorroGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycPaqueteAdicionalCuentaAhorro.guardarPaqueteAdicionalCuentaAhorro
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycPaqueteAdicionalCuentaAhorroGrid",
						height: 150,
						width:700,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycPaqueteAdicionalCuentaAhorro || [],
					    	fields: [
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalId",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombre",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalCedula",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalViajeroFrecuente",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNumeroViajeroFrecuente",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombreTarjeta",
								"kycPaqueteAdicionalCuentaAhorro.kycFechaActualizacion",
								"ctgTipoTarjeta.ctgCatalogoId",
								"ctgOficinaEntrega.ctgSucursalId"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre de Adicional",  dataIndex: "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombre", flex: 2, minWidth: 200},
							      {header: "N\u00famero de identificaci\u00f3n",  dataIndex: "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalCedula",flex: 1, width: 100}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycPaqueteAdicionalCuentaAhorroForm", record.data);
					    			Efx.form.setDisable("kycPaqueteAdicionalCuentaAhorroForm");
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
						id: "kycPaqueteAdicionalCuentaAhorroForm",
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
											Ext.getCmp("kycPaqueteAdicionalNombre").setValue(this.getRawValue());
											Ext.getCmp("kycPaqueteAdicionalCedula").setValue(this.getValue());
												}
											else {  }
										}}
							},

							{
								xtype : "textfield",
								id:"kycPaqueteAdicionalNombre",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombre",
								maxLength: 100,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycPaqueteAdicionalCedula",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalCedula",
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
										Efx.utils.setDisabled("kycPaqueteAdicionalViajeroFrecuente", !disable, false);
										Efx.utils.setDisabled("kycPaqueteAdicionalNumeroViajeroFrecuente", !disable, false);
										}}
							},{
								xtype : "combo",
								id:"kycPaqueteAdicionalViajeroFrecuente",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalViajeroFrecuente",
								store : new Ext.data.SimpleStore({
									data : Efx.combos.yesnoArray() || [],
									fields : ["id", "descripcion"]
								}),
								displayField : "descripcion",
								valueField: "id",
								colspan : 2,
								listeners : {
									change : function() {
										var disable = this.getValue() != "1";
										Efx.utils.setDisabled("kycPaqueteAdicionalNumeroViajeroFrecuente",disable, true);
									}}
							},
							 {
								xtype : "textfield",
								id:"kycPaqueteAdicionalNumeroViajeroFrecuente",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNumeroViajeroFrecuente",
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
								id:"kycPaqueteAdicionalNombreTarjeta",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombreTarjeta",
								maxLength : 100,
								colspan:4
							},

							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycPaqueteAdicionalCuentaAhorroId",
								name: "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalId"
							},{
								xtype: "hidden",
								id: "ctgTipoPaqueteId",
								name: "kycPaqueteAdicionalCuentaAhorro.ctgTipoPaquete.ctgCatalogoId"
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