KycSolicitudDesembolso = function() {
	return {
		saveKycSolicitudDesembolso : function() {
			Efx.message.progress(Efx.constants.SAVING);
			Ext
					.getCmp("kycSolicitudDesembolsoForm")
					.getForm()
					.submit(
							{
								url : Efx.constants.CONTEXT_PATH
										+ "/kycSolicitudDesembolso/save",
								timeout : Efx.constants.TIMEOUT_SECONDS,
								params : {
									"kycSolicitudDesembolso.kycPersonaFisica.kycPersonaFisicaId" : EfxKYC.getKycPersonaFisicaId(),
									"kycSolicitudDesembolso.kycPersonaFisica.kyc.kycId" : EfxKYC.getKycId()
								},
								success : function(form, action) {
									Efx.message.alert(action.result.message);
//									EfxKYC.setKycId(action.result.kycId);
									EfxKYC.getKycPersonaFisicaId(action.result.getKycPersonaFisicaId);
									Efx.utils.setValue("kycSolicitudDesembolsoId", action.result.kycSolicitudDesembolsoId);
				    				Efx.utils.setValue("kycLiquidacionDesembolsoId", action.result.kycLiquidacionDesembolsoId);
									Efx.utils.setValue("kycFechaActualizacion",
													action.result.kycFechaActualizacion);
								},
								failure : Efx.form.failureProcedure
							});

		},
		init : function(config) {
			var kycSolicitudDesembolso = config.currentObject;
			var kycLiquidacionDesembolso = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC
					.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if (kycAlertas)
				configToReturn.items.push(kycAlertas);
			configToReturn.items
					.push({
						xtype : "form",
						flex : 1,
						id : "kycSolicitudDesembolsoForm",
						title : "SOLICITUD DE DESEMBOLSO",
						autoScroll : true,
						listeners : {
							render : function() {
								if (EfxKYC.getKycId() != null
										&& EfxKYC.getKycId() > 0
										&& this.getForm()) {
									this.getForm().setValues(kycSolicitudDesembolso);
									if (EfxKYC.getKycVigente() === false)
										Efx.form.setDisable("kycSolicitudDesembolsoForm");
								}
							}
						},
						dockedItems : [
								{
									xtype : "toolbar",
									dock : "top",
									hidden : EfxKYC.getKycVigente() === false,
									items : [
											"->",
											{
												text : "Guardar",
												iconCls : Efx.constants.icons.SAVE_ICON,
												handler : KycSolicitudDesembolso.saveKycSolicitudDesembolso
											} ]
								},
								{
									xtype : "toolbar",
									dock : "bottom",
									hidden : EfxKYC.getKycVigente() === false,
									items : [
											"->",
											{
												text : "Guardar",
												iconCls : Efx.constants.icons.SAVE_ICON,
												handler : KycSolicitudDesembolso.saveKycSolicitudDesembolso
											} ]
								} ],
						layout : {
							type : "table",
							columns : 6,
							tableAttrs : {
								style : {
									width : "730px",
									"margin-top" : "5px",
									"margin-bottom" : "40px"
								},
								align : "center"
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
						items : [
								{
									xtype : "label",
									id : "kycFechaActualizacionTitle",
									text : "",
									cls : "x-form-item label_header lblHeaderRed",
									colspan : 6,
									hidden : true,
									width : 730
								},
								{
									xtype : "label",
									text : "SOLICITUD DE DESEMBOLSO",
									cls : "x-form-item label_header",
									colspan : 6,
									width : 730
								},
								{xtype: "label", text: "Solicitado por", cls: "x-form-item label_spacing", colspan: 6},
								{
									xtype : "textfield",
									id : "kycSolicitudDesembolsoSolicitante",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoSolicitante",
									colspan: 6,
									width: 715,
									maxlength: 100,
									allowBlank: false
								},
								{xtype: "label", text: "Ejecutivo", cls: "x-form-item label_spacing", colspan: 6},
								{
									xtype : "textfield",
									id : "kycSolicitudDesembolsoEjecutivo",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoEjecutivo",
									colspan: 6,
									width: 715,
									maxlength: 100,
									allowBlank: false
								},
								{xtype: "label", text: "Fecha de Desembolso", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Hora", cls: "x-form-item label_spacing", colspan: 4},
								{
									xtype : "datefield",
									id : "kycSolicitudDesembolsoFecha",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoFecha",
									submitFormat : "Ymd",
									altFormats: "Ymd|d/m/Y",
									allowBlank: false
								},
								{
									xtype : "timefield",
									id : "kycSolicitudDesembolsoHora",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoHora",
									allowBlank: false,
									colspan: 4
								},
								{xtype: "label", text: "Monto Cheque(s) para Consolidar Deudas \u00a2", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Monto para Depositar en Cuenta \u00a2", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Total Desembolso \u00a2", cls: "x-form-item label_spacing", colspan: 2},
								{
									xtype : "numericfield",
									id : "kycSolicitudDesembolsoMontoCheques",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoMontoCheques",
									allowBlank: false,
									decimalPrecision:2,
									hideTrigger: true,
									maxLength: 15,
									listeners : {
									change : function() {
										var sumaChequeCuenta = parseFloat(Ext.getCmp("kycSolicitudDesembolsoMontoCheques").getValue()) + parseFloat(Ext.getCmp("kycSolicitudDesembolsoMontoCuenta").getValue());
										Ext.getCmp("kycSolicitudDesembolsoMontoTotal").setValue(parseFloat(sumaChequeCuenta));
										}
									}

								},
								{
									xtype : "numericfield",
									id : "kycSolicitudDesembolsoMontoCuenta",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoMontoCuenta",
									allowBlank: false,
									decimalPrecision:2,
									hideTrigger: true,
									maxLength: 15,
									listeners : {
										change : function() {
											var sumaCuentaCheque = parseFloat(Ext.getCmp("kycSolicitudDesembolsoMontoCheques").getValue()) + parseFloat(Ext.getCmp("kycSolicitudDesembolsoMontoCuenta").getValue());
											Ext.getCmp("kycSolicitudDesembolsoMontoTotal").setValue(parseFloat(sumaCuentaCheque));
											}
										}
								},
								{
									xtype : "numericfield",
									id : "kycSolicitudDesembolsoMontoTotal",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoMontoTotal",
									allowBlank: false,
									disabled: true,
									decimalPrecision:2,
									maxLength: 20,
									submitOnDisable: true
								},
								{xtype: "label", text: "Detallar la liquidaci\u00f3n del Desembolso", cls: "x-form-item label_spacing", colspan: 6},
								{
						            xtype: "checkboxgroup",
						            id: "ctgTipoDesembolso",
						            columns: 1,
						            width:730,
						            allowBlank: false,
						            items: config.ctgLiquidacion || [],
						            colspan:6
						        },
								{xtype: "label", text: "Banco", cls: "x-form-item label_spacing", colspan: 4},
								{xtype: "label", text: "N\u00famero de Cuenta", cls: "x-form-item label_spacing", colspan: 2},
								{
									xtype : "textfield",
									id : "kycSolicitudDesembolsoBanco",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoBanco",
									allowBlank: false,
									colspan:4,
									width: 480
								},
								{
									xtype : "textfield",
									id : "kycSolicitudDesembolsoCuenta",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoCuenta",
									allowBlank: false,
									maxLength: 17,
									minLength: 17,
									colspan:2
								},
								{xtype: "label", text: "Tasa (%)", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Observaciones", cls: "x-form-item label_spacing", colspan: 4},
								{
									xtype : "numberfield",
									id : "kycSolicitudDesembolsoTasa",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoTasa",
									allowBlank: false,
									decimalPrecision: 0,
									colspan:2,
									hideTrigger: true,
									maxValue: 100
								},
								{
									xtype : "textfield",
									id : "kycSolicitudDesembolsoObservaciones",
									name : "kycSolicitudDesembolso.kycSolicitudDesembolsoObservaciones",
									allowBlank: false,
									colspan:4,
									maxlength: 150,
									width: 480
								},

								{
									xtype: "hidden",
									id: "kycSolicitudDesembolsoId",
									name: "kycSolicitudDesembolso.kycSolicitudDesembolsoId"
								},
								{
									xtype: "hidden",
									id: "kycLiquidacionDesembolsoId",
									name: "kycSolicitudDesembolso.kycLiquidacionDesembolsoId"
								},

								{
									xtype : "hidden",
									id : "kycFechaActualizacion",
									listeners : {
										change : function() {
											var value = this.getValue();
											Efx.utils
													.setVisible(
															"kycFechaActualizacionTitle",
															!Ext.isEmpty(value));
											Efx.utils
													.setText(
															"kycFechaActualizacionTitle",
															"FORMULARIO ACTUALIZADO EL: "
																	+ value);
										}
									}


								}

								]
					});

			return configToReturn;
		}
	};
}();