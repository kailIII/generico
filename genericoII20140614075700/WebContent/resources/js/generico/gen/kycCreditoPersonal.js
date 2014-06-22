KycCreditoPersonal = function(){
	var configWindow = {
		edit: "kycCreditoPersonalEditarTop",
		save: "kycCreditoPersonalGuardarTop",
//		remove: "kycCreditoPersonalEliminarTop",
		grid: "kycCreditoPersonalGrid",
		form: "kycCreditoPersonalForm"
	};
	var configWindowBottom = {
			edit: "kycCreditoPersonalEditarBottom",
			save: "kycCreditoPersonalGuardarBottom",
//			remove: "kycCreditoPersonalEliminarBottom"
	};
	return {
		editarCreditoPersonal: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarCreditoPersonal: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycCredito/delete",
					params: {
						kycCreditoId: Efx.utils.getValue("kycCreditoPersonalId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoCredito : Efx.constants.codes.CREDITO_PERSONAL
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycCreditoPersonalForm");
								if(jsonObject.kycCreditoPersonal){
			    					Ext.getCmp("kycCreditoPersonalGrid").getStore().loadData(jsonObject.kycCreditoPersonal);
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
		guardarCreditoPersonal: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycCreditoPersonalForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycCreditoPersonal/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycCreditoPersonal.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycCreditoPersonal.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),

    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    					EfxKYC.getKycPersonaFisicaId(action.result.getKycPersonaFisicaId);
						Efx.utils.setValue("kycCreditoPersonalId", action.result.kycCreditoPersonalId);
						Efx.utils.setValue("kycFechaActualizacion",	action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		init: function(config){
			var kycCreditoPersonal = config.kycCreditoPersonal;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push(
				       {
			        	xtype: "form",
						id: "kycCreditoPersonalForm",
						flex: 1,
						title: "PRODUCTOS - CR\u00c9DITO PERSONAL",
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
						listeners : {
							render : function() {
								if (EfxKYC.getKycId() != null
										&& EfxKYC.getKycId() > 0
										&& this.getForm()) {
									this.getForm().setValues(kycCreditoPersonal);
									if (EfxKYC.getKycVigente() === false)
										Efx.form.setDisable("kycCreditoPersonalForm");
								}
							}
						},
						dockedItems: [
										{
											xtype: "toolbar",
											dock: "top",
											hidden: EfxKYC.getKycVigente() === false,
											items: [
											   '->',
												{
										    	   text: "Guardar",
										    	   id: "kycCreditoPersonalGuardarTop",
												   iconCls: Efx.constants.icons.SAVE_ICON,
												   handler: KycCreditoPersonal.guardarCreditoPersonal
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
										    	   text: "Guardar",
										    	   id: "kycCreditoPersonalGuardarBottom",
												   iconCls: Efx.constants.icons.SAVE_ICON,
												   handler: KycCreditoPersonal.guardarCreditoPersonal
										       }
							        	    ]
								        }
						            ],
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
								text: "CR\u00c9DITO PERSONAL",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							 {xtype: "label",text: "Tipo de Cliente", cls: "x-form-item label_spacing", colspan: 2},
							 {xtype: "label",text: "A.I.D", cls: "x-form-item label_spacing", colspan: 2},
							 {xtype: "label",text: "Prescreening", cls: "x-form-item label_spacing", colspan: 2},

							{
								xtype: "combo",
								id:"ctgTipoCliente",
								name:"kycCreditoPersonal.ctgTipoCliente.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data : config.ctgTipoCliente || [],
									fields : [ "ctgTipoClienteId",
											"ctgTipoClienteNombre" ]
								}),
								displayField : "ctgTipoClienteNombre",
								valueField : "ctgTipoClienteId",
								allowBlank: false
							},
							{
								xtype:"textfield",
								id:"kycCreditoPersonalAid",
								name:"kycCreditoPersonal.kycCreditoPersonalAid"
							},
							{
								xtype: "combo",
								id:"kycCreditoPersonalPreScreen",
								name:"kycCreditoPersonal.kycCreditoPersonalPreScreen",
								store : new Ext.data.SimpleStore({
									data : Efx.combos.yesnoArray() || [],
									fields : [ "id", "descripcion" ]
								}),
								displayField : "descripcion",
								valueField : "id",
								colspan: 2,
								allowBlank: false
							},
							 {xtype: "label",text: "Moneda", cls: "x-form-item label_spacing", colspan: 2},
							 {xtype: "label",text: "Monto Solicitado", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype: "combo",
								id:"ctgTipoMoneda",
								name:"kycCreditoPersonal.ctgTipoMoneda.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgTipoMoneda || [],
									fields : [ "ctgTipoMonedaId", "ctgTipoMonedaNombre" ]
								}),
								displayField : "ctgTipoMonedaNombre",
								valueField : "ctgTipoMonedaId",
								allowBlank: false,
								listeners : {
									change : function() {
										var comboPlazo = Ext.getCmp('ctgPlazo');
										if (this.getValue())
										if (this.getValue()=="574"){
											monedaColones = parseInt(2500) * parseInt(config.ctgTipoCambio[1][4]);
											Ext.getCmp("kycCreditoPersonalMonto").setMinValue(monedaColones);
										} else {
											monedaColones = parseInt(2500);
											Ext.getCmp("kycCreditoPersonalMonto").setMinValue(monedaColones);
											comboPlazo.store.clearFilter(true);
										}

									},
									beforerender : function(){
										var comboPlazo = Ext.getCmp('ctgPlazo');
										if (this.getValue())
										if (this.getValue()=="574"){
											monedaColones = parseInt(2500) * parseInt(config.ctgTipoCambio[1][4]);
											Ext.getCmp("kycCreditoPersonalMonto").setMinValue(monedaColones);
										} else {
											monedaColones = parseInt(2500);
											Ext.getCmp("kycCreditoPersonalMonto").setMinValue(monedaColones);
											comboPlazo.store.clearFilter(true);
										}
									}

							 	}
							},
							{
								xtype:"numericfield",
								id:"kycCreditoPersonalMonto",
								name:"kycCreditoPersonal.kycCreditoPersonalMonto",
								allowBlank: true,
								allowDecimals: true,
								allowNegative: false,
								forcePrecision: true,
								hideTrigger: true,
								useThousandSeparator: true,
								decimalSeparator:".",
								decimalPrecision: 2
							},
							{xtype:"label",  style: "color: red", text:"*M\u00ednimo $2500 o su equivalente en colones", cls: 'x-form-item label_spacing', colspan: 2},
							{xtype: "label",text: "Tipo de Cambio \u00a2", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label",text: "Plazo", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label",text: "Checklist que desea Imprimir", cls: "x-form-item label_spacing", colspan: 2},
							 {
								xtype:"numericfield",
								id:"kycCreditoPersonalTipoCambio",
								style: 'text-align: left;',
								name:"kycCreditoPersonal.kycCreditoPersonalTipoCambio"
							},
							{
								xtype: "combo",
								id:"ctgPlazo",
								name:"kycCreditoPersonal.ctgPlazo.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgPlazo || [],
									fields : [ "ctgPlazoId", "ctgPlazoNombre" ]
								}),
								displayField : "ctgPlazoNombre",
								valueField : "ctgPlazoId",
								colspan:2,
								allowBlank: false,
								listeners : {
									beforequery: function(){
											var comboMoneda = Ext.getCmp('ctgTipoMoneda');
											if (comboMoneda.getValue()==null){
												this.store.clearFilter(true);
											};
											var comboMoneda = Ext.getCmp('ctgTipoMoneda');
											caseSensitive = false;
											if (comboMoneda.getRawValue().indexOf("D\u00d3LARES")>=0) {
												this.store.load();
												this.store.remove(this.store.findRecord("ctgPlazoId","1228"));
												this.store.sync();
											} else {
												this.store.load();
											}

									}
								}
							},
							{
								xtype: "combo",
								id:"ctgCheckListImpresion",
								name:"kycCreditoPersonal.ctgCheckListImpresion.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgCheckListImpresion || [],
									fields : [ "ctgCheckListImpresionId", "ctgCheckListImpresionNombre" ]
								}),
								displayField : "ctgCheckListImpresionNombre",
								valueField : "ctgCheckListImpresionId",
								colspan: 2,
								allowBlank: false
							},
							{
								xtype:"hidden",
								id:"kycCreditoPersonalId",
								name:"kycCreditoPersonal.kycCreditoPersonalId"
							},
							{
								xtype : "hidden",
								id : "kycFechaActualizacion",
								listeners : {
									change : function() {
										var value = this.getValue();
										Efx.utils.setVisible("kycFechaActualizacionTitle",!Ext.isEmpty(value));
										Efx.utils.setText("kycFechaActualizacionTitle","FORMULARIO ACTUALIZADO EL: "+ value);
									}
								}


							}
						]
			        }

			);
			return configToReturn;
		}
	};
}();