KycFormaDesembolsoCiti = function() {
	return {
		saveKycFormaDesembolsoCiti : function() {
			Efx.message.progress(Efx.constants.SAVING);
			Ext
					.getCmp("kycFormaDesembolsoForm")
					.getForm()
					.submit(
							{
								url : Efx.constants.CONTEXT_PATH
										+ "/kycFormaDesembolso/save",
								timeout : Efx.constants.TIMEOUT_SECONDS,
								params : {
									"kycFormaDesembolso.kycPersonaFisica.kycPersonaFisicaId" : EfxKYC.getKycPersonaFisicaId(),
									"kycFormaDesembolso.kycPersonaFisica.kyc.kycId" : EfxKYC.getKycId(),
									ctgTipoDeposito :Efx.constants.codes.DEPOSITO_CITI
								},
								success : function(form, action) {
									Efx.message.alert(action.result.message);
//									EfxKYC.setKycId(action.result.kycId);
									EfxKYC.getKycPersonaFisicaId(action.result.getKycPersonaFisicaId);
									Efx.utils.setValue("kycFormaDesembolsoId", action.result.kycFormaDesembolsoId);
									Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
								},
								failure : Efx.form.failureProcedure
							});

		},
		init : function(config) {
			var kycFormaDesembolso = config.kycFormaDesembolso;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if (kycAlertas)
				configToReturn.items.push(kycAlertas);
			configToReturn.items.push(
					{
						xtype : "form",
						flex : 1,
						id : "kycFormaDesembolsoForm",
						title : "CR\u00c9DITO PERSONAL - FORMA DE DESEMBOLSO",
						autoScroll : true,
						listeners : {
							render : function() {
								if (kycFormaDesembolso.banderaCheque == '1' && kycFormaDesembolso.banderaCiti == '0' &&
										config.kycFormaDesembolso.banderaSinpe == '1'){
										Ext.getCmp("botonGuardar1").disable();
										Ext.getCmp("botonGuardar2").disable();
										Ext.getCmp("kycFormaDesembolsoBeneficiario").disable();
										Ext.getCmp("kycFormaDesembolsoMonto").disable();
										Ext.getCmp("kycFormaDesembolsoCuentaCliente").disable();
										Ext.getCmp("ctgTipoCuenta").disable();
										Efx.utils.setVisible("labelFormularioDeshabilitado", true);
									}
								if (EfxKYC.getKycId() != null
										&& EfxKYC.getKycId() > 0
										&& this.getForm()) {
									this.getForm().setValues(kycFormaDesembolso);
									if (EfxKYC.getKycVigente() === false)
										Efx.form.setDisable("kycFormaDesembolsoForm");

								}
							}
						},
						dockedItems : [
								{
									xtype : "toolbar",
									dock : "top",
									id: "botonGuardar1",
									hidden : EfxKYC.getKycVigente() === false,
									items : [
											"->",
											{
												text : "Guardar",
												iconCls : Efx.constants.icons.SAVE_ICON,
												handler : KycFormaDesembolsoCiti.saveKycFormaDesembolsoCiti
											} ]
								},
								{
									xtype : "toolbar",
									dock : "bottom",
									id: "botonGuardar2",
									hidden : EfxKYC.getKycVigente() === false,
									items : [
											"->",
											{
												text : "Guardar",
												iconCls : Efx.constants.icons.SAVE_ICON,
												handler : KycFormaDesembolsoCiti.saveKycFormaDesembolsoCiti
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
						defaults : Efx.utils.defaults({
							width : 230,
							colspan : 2
						}),
						items : [
						        {xtype:"label", id: "labelFormularioDeshabilitado", hidden: true, style: "color: red; text-align: center" ,text:"SOLO SE PERMITEN INGRESAR M\u00c1XIMO, DOS FORMAS DE DESEMBOLSO", cls: 'x-form-item label_spacing', colspan: 6, width: 700},
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
									text : "DEP\u00d3SITO A CUENTA PROPIA EN CITI",
									cls : "x-form-item label_header",
									colspan : 6,
									width : 730
								},
								{xtype:"label", text:"Beneficiario", cls: 'x-form-item label_spacing', colspan: 4},
								{xtype:"label", text:"Monto", cls: 'x-form-item label_spacing', colspan: 2},
								{
									xtype: "textfield",
									id:"kycFormaDesembolsoBeneficiario",
									name:"kycFormaDesembolso.kycFormaDesembolsoBeneficiario",
									colspan: 4,
									allowBlank: false,
									width: 480
								},
								{
									xtype: "numericfield",
									id:"kycFormaDesembolsoMonto",
									allowBlank: false,
									name:"kycFormaDesembolso.kycFormaDesembolsoMonto"
								},

								{xtype:"label", text:"No. de Cuenta Cliente", cls: 'x-form-item label_spacing', colspan: 2},
								{xtype:"label", text:"Tipo de Cuenta", cls: 'x-form-item label_spacing', colspan: 4},
								{
									xtype: "textfield",
									id:"kycFormaDesembolsoCuentaCliente",
									name:"kycFormaDesembolso.kycFormaDesembolsoCuentaCliente",
								},
								{
									xtype: "combo",
									id: "ctgTipoCuenta",
									name:"kycFormaDesembolso.ctgTipoCuenta.ctgCatalogoId",
									store:
										new Ext.data.SimpleStore({
											data: config.ctgTipoCuentas || [],
											fields:[
											        "ctgTipoCuentaId",
											        "ctgTipoCuentaNombre"
											        ]
										}),
									displayField: "ctgTipoCuentaNombre",
									valueField: "ctgTipoCuentaId",
									colspan: 4

								},
								{
									xtype: "hidden",
									id: "kycFormaDesembolsoId",
									name: "kycFormaDesembolso.kycFormaDesembolsoId",
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