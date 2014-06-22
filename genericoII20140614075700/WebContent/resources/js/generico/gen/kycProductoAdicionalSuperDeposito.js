KycProductoAdicionalSuperDeposito = function(){
	var configWindow = {
		add: "kycProductoAdicionalSuperDepositoAgregarTop",
		edit: "kycProductoAdicionalSuperDepositoEditarTop",
		remove: "kycProductoAdicionalSuperDepositoEliminarTop",
		grid: "kycProductoAdicionalSuperDepositoGrid",
		save: "kycProductoAdicionalSuperDepositoGuardarTop",
		form: "kycProductoAdicionalSuperDepositoForm"
	};
	var configWindowBottom = {
			add: "kycProductoAdicionalSuperDepositoAgregarBottom",
			edit: "kycProductoAdicionalSuperDepositoEditarBottom",
			remove: "kycProductoAdicionalSuperDepositoEliminarBottom",
			save: "kycProductoAdicionalSuperDepositoGuardarBottom"
	};
	return {
		agregarProductoAdicionalSuperDeposito: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductoAdicionalSuperDeposito: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductoAdicionalSuperDeposito: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosAdicionales/delete",
					params: {
						kycProductoAdicionalId : Ext.getCmp("kycProductoAdicionalSuperDepositoId").getValue(),
						kycProductoId: EfxKYC.getKycProductoId(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.SUPER_DEPOSITO_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoAdicionalSuperDepositoForm");
								if(jsonObject.kycProductoAdicionalSuperDeposito){
			    					Ext.getCmp("kycProductoAdicionalSuperDepositoGrid").getStore().loadData(jsonObject.kycProductoAdicionalSuperDeposito);
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
		guardarProductoAdicionalSuperDeposito: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoAdicionalSuperDepositoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosAdicionales/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoAdicionalSuperDeposito.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoAdicionalSuperDeposito.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoAdicionalSuperDeposito.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.SUPER_DEPOSITO_AHORRO,
    				"kycProductoAdicionalSuperDeposito.kycProducto.kycProductoId":EfxKYC.getKycProductoId(),
    				kycTipoProducto : Efx.constants.codes.SUPER_DEPOSITO_AHORRO

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoAdicionalSuperDepositoForm", true);
    				if(action.result.kycProductoAdicionalSuperDeposito){
    					Ext.getCmp("kycProductoAdicionalSuperDepositoGrid").getStore().loadData(action.result.kycProductoAdicionalSuperDeposito);
    					Ext.getCmp("kycProductoAdicionalSuperDepositoGrid").getSelectionModel().select(action.result.kycProductoAdicionalSuperDepositoIndex);
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
				title: "PRODUCTOS -  ADICIONALES",
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
							   id: "kycProductoAdicionalSuperDepositoAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoAdicionalSuperDeposito.agregarProductoAdicionalSuperDeposito
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoAdicionalSuperDepositoEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoAdicionalSuperDeposito.editarProductoAdicionalSuperDeposito
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoAdicionalSuperDepositoEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoAdicionalSuperDeposito.eliminarProductoAdicionalSuperDeposito
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoAdicionalSuperDepositoGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoAdicionalSuperDeposito.guardarProductoAdicionalSuperDeposito
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
							   id: "kycProductoAdicionalSuperDepositoAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoAdicionalSuperDeposito.agregarProductoAdicionalSuperDeposito
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoAdicionalSuperDepositoEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoAdicionalSuperDeposito.editarProductoAdicionalSuperDeposito
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoAdicionalSuperDepositoEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoAdicionalSuperDeposito.eliminarProductoAdicionalSuperDeposito
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoAdicionalSuperDepositoGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoAdicionalSuperDeposito.guardarProductoAdicionalSuperDeposito
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoAdicionalSuperDepositoGrid",
						height: 150,
						width:700,
						collapsible: true,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoAdicionalSuperDeposito || [],
					    	fields: [
					    	     	"kycProductoAdicionalSuperDeposito.kycProductoAdicionalId",
									"kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombre",
									"kycProductoAdicionalSuperDeposito.kycProductoAdicionalCedula",
									"kycProductoAdicionalSuperDeposito.kycProductoAdicionalViajeroFrecuente",
									"kycProductoAdicionalSuperDeposito.kycProductoAdicionalNumeroViajeroFrecuente",
									"kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombreTarjeta",
									"kycProductoAdicionalSuperDeposito.kycFechaActualizacion",
									"ctgTipoTarjeta.ctgCatalogoId",
									"ctgOficinaEntrega.ctgSucursalId"
			    	        ]
					    }),
					    columns: [
					{header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
					{header: "N\u00famero de identificaci\u00f3n",  dataIndex: "kycProductoAdicionalSuperDeposito.kycProductoAdicionalCedula",flex: 1, width: 100},					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductoAdicionalSuperDepositoForm", record.data);
					    			Efx.form.setDisable("kycProductoAdicionalSuperDepositoForm");
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
						id: "kycProductoAdicionalSuperDepositoForm",
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
					        	colspan: 8,
					        	hidden: true,
					        	width: 730
					        },{
								xtype: "label",
								text: "ADICIONALES A S\u00daPER DEP\u00d3SITO AHORRO",
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
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombre",
								maxLength: 150,
								readOnly: true,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycProductoAdicionalCedula",
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalCedula",
								maxLength: 20,
								readOnly: true,
								allowBlank: false,
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
										Efx.utils.setDisabled("kycProductoAdicionalViajeroFrecuente", !disable, false);
										Efx.utils.setDisabled("kycProductoAdicionalNumeroViajeroFrecuente", !disable, false);
										}}
								},{
								xtype : "combo",
								id:"kycProductoAdicionalViajeroFrecuente",
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalViajeroFrecuente",
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
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalNumeroViajeroFrecuente",
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
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombreTarjeta",
								maxLength : 100,
								colspan:4
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoAdicionalSuperDepositoId",
								name: "kycProductoAdicionalSuperDeposito.kycProductoAdicionalId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoAdicionalSuperDeposito.ctgTipoProducto.ctgCatalogoId"
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