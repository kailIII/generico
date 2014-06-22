KycCertificadoInversion = function(){
	return {
		saveKycCertificadoInversion: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycCertificadoInversionForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycCertificadoInversion/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycCertificadoInversion.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycCertificadoInversion.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycCertificadoInversionId", action.result.kycCertificadoInversionId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycCertificadoInversion = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycCertificadoInversionForm",
				title: "PRODUCTOS - CERTIFICADO DE INVERSI\u00d3N",
				autoScroll: true,
				listeners: {
					render: function(){
						if(kycCertificadoInversion && kycCertificadoInversion.kycCertificadoInversionId && kycCertificadoInversion.kycCertificadoInversionId > 0){
							if(this.getForm()) this.getForm().setValues(kycCertificadoInversion);
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycCertificadoInversionForm");
						}
					}
				},
				dockedItems:[
		             {
		            	 xtype: "toolbar",
		            	 dock: "top",
		            	 hidden: EfxKYC.getKycVigente() === false,
		            	 items: [
							"->",
							{
								 text: "Guardar",
								 iconCls: Efx.constants.icons.SAVE_ICON,
								 handler: KycCertificadoInversion.saveKycCertificadoInversion
							}
            	         ]
		             },{
		            	 xtype: "toolbar",
		            	 dock: "bottom",
		            	 hidden: EfxKYC.getKycVigente() === false,
		            	 items: [
							"->",
							{
								 text: "Guardar",
								 iconCls: Efx.constants.icons.SAVE_ICON,
								 handler: KycCertificadoInversion.saveKycCertificadoInversion
							}
            	         ]
		             }
	            ],
				layout: {
					type: "table",
					columns: 6,
					tableAttrs: {
			            style: {width: "730px", "margin-top": "5px", "margin-bottom": "40px"},
			            align: "center"
			        }
				},
				defaults: Efx.utils.defaults({width: 230, colspan: 2}),
				items: [
					{
			        	xtype: "label",
			        	id: "kycFechaActualizacionTitle",
			        	text: "",
			        	cls: "x-form-item label_header lblHeaderRed",
			        	colspan: 6,
			        	hidden: true,
			        	width: 730
			        },
					{
						xtype: "label",
						text: "CERTIFICADO DE INVERSI\u00d3N",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label",text: "Tipo de Producto", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Prefijo", cls: "x-form-item label_spacing", colspan: 1, width: 100},
					{xtype: "label", text: "Moneda", cls: "x-form-item label_spacing", colspan: 1, width: 100},
					{xtype: "label", text: "Producto", cls: "x-form-item label_spacing", colspan: 2},
					{
						xtype: "combo",
						id:"ctgListadoTipoProducto",
						name: "ctgListadoTipoProducto.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgListadoCertificadoInversion|| [],
							fields: ["ctgListadoCertificadoInversionId", "ctgListadoCertificadoInversionNombre",]
						}),
						displayField: "ctgListadoCertificadoInversionNombre",
						valueField: "ctgListadoCertificadoInversionId",
						colspan: 2,
						allowBlank:false,
						listeners:{
							change : function() {
								if (this.getValue())
									{
								Ext.getCmp("ctgPrefijo").setValue(this.getValue());
								Ext.getCmp("ctgMoneda").setValue(this.getValue());
								Ext.getCmp("ctgProducto").setValue(this.getValue());
									}
								else
									{

									}
							}
						}
					},
					{
						xtype: "combo",
						id:"ctgPrefijo",
						name: "ctgPrefijo.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgPrefijo || [],
							fields: ["ctgPrefijoId", "ctgPrefijoNombre", "ctgPrefijoPrefijo", "ctgPrefijoMoneda",
									"ctgPrefijoProducto"]
						}),
						displayField: "ctgPrefijoPrefijo",
						valueField: "ctgPrefijoId",
						readOnly: true,
						hideTrigger: true,
						width:100,
						colspan: 1
					},
					{
						xtype: "combo",
						id:"ctgMoneda",
						name: "ctgMoneda.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgMoneda || [],
							fields: ["ctgMonedaId", "ctgMonedaNombre", "ctgMonedaPrefijo", "ctgMonedaMoneda",
							         "ctgMonedaProducto"]
						}),
						displayField: "ctgMonedaMoneda",
						valueField: "ctgMonedaId",
						width:100,
						hideTrigger: true,
						readOnly: true,
						colspan: 1
					},{
						xtype: "combo",
						id:"ctgProducto",
						name: "ctgProducto.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgProducto || [],
							fields: ["ctgProductoId", "ctgProductoNombre", "ctgProductoPrefijo", "ctgProductoMoneda",
							         "ctgProductoProducto"]
						}),
						displayField: "ctgProductoProducto",
						valueField: "ctgProductoId",
						width:100,
						hideTrigger: true,
						readOnly: true,
						colspan: 2
					},
					{xtype: "label", text: "N\u00famero de Certificado", cls: "x-form-item label_spacing", colspan: 6},
					  {
						xtype : "textfield",
						id : "kycCertificadoInversionNumeroCertificado",
						name : "kycCertificadoInversion.kycCertificadoInversionNumeroCertificado",
						maxLength : 30,
						width:465,
						colspan:6
					},
					{xtype: "label", text: "Valor Facial (Monto)", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Tasa de Inter\u00e9s Neta (%)", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Plazo en D\u00edas", cls: "x-form-item label_spacing", colspan: 2},
					{
						xtype : "numericfield",
						id : "kycCertificadoInversionValorFacial",
						name : "kycCertificadoInversion.kycCertificadoInversionValorFacial",
						allowDecimals:true,
						allowBlank:false,
						decimalPrecision: 2,
						maxLength : 30,
						colspan:2
					},
					{
						xtype : "textfield",
						id : "kycCertificadoInversionTasaInteres",
						name : "kycCertificadoInversion.kycCertificadoInversionTasaInteres",
						maxLength : 20,
						allowBlank:false,
						colspan:2
					},
					{
						xtype : "numberfield",
						id : "kycCertificadoInversionPlazoDias",
						name : "kycCertificadoInversion.kycCertificadoInversionPlazoDias",
						maxLength : 10,
						minValue:0,
						allowBlank:false,
						colspan:2
					},
					{xtype: "label", text: "Nombres", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Primer Apellido", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Segundo Apellido", cls: "x-form-item label_spacing", colspan: 2},
					{
						xtype : "textfield",
						id : "kycCertificadoInversionNombres",
						name : "kycCertificadoInversion.kycCertificadoInversionNombres",
						maxLength : 150,
						value: config.kycPersonaFisicaNombres,
						readOnly: true,
						colspan:2
					},
					{
						xtype : "textfield",
						id : "kycCertificadoInversionPrimerApellido",
						name : "kycCertificadoInversion.kycCertificadoInversionPrimerApellido",
						maxLength : 50,
						value: config.kycPersonaFisicaPrimerApellido,
						readOnly: true,
						colspan:2
					},
					{
						xtype : "textfield",
						id : "kycCertificadoInversionSegundoApellido",
						name : "kycCertificadoInversion.kycCertificadoInversionSegundoApellido",
						value: config.kycPersonaFisicaSegundoApellido,
						readOnly: true,
						maxLength : 20,
						colspan:2
					},

					{xtype: "label", text: "N\u00famero de Identificaci\u00f3n", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Tel\u00e9fonos", cls: "x-form-item label_spacing", colspan: 4},
					{
						xtype : "textfield",
						id : "kycCertificadoInversionNumeroIdentificacion",
						name : "kycCertificadoInversion.kycCertificadoInversionNumeroIdentificacion",
						maxLength : 20,
						value: config.kycPersonaFisicaDocumento,
						readOnly: true,
						colspan:2
					},
					{
						xtype : "textfield",
						id : "kycCertificadoInversionTelefonos",
						name : "kycCertificadoInversionTelefonos",
						maxLength : 100,
						value: config.kycPersonaFisicaTelefono1 + " / " + config.kycPersonaFisicaTelefono2,
						colspan:4,
						readOnly: true,
						width: 480
					},
					{xtype: "label", text: "INFORMACI\u00d3N DE MERCADEO", cls: "x-form-item label_header", colspan: 6, width: 730},
					{xtype: "label", text: "Prop\u00f3sito de Adquirir el Producto", cls: "x-form-item label_spacing", width: 500, colspan: 6},
					{
						xtype : "textfield",
						id : "kycCertificadoInversionProposito",
						name : "kycCertificadoInversion.kycCertificadoInversionProposito",
						maxLength : 100,
						value: config.kycPerfilTransaccionalProposito,
						width: 720,
						colspan:6
					},
					{xtype: "label", text: "Origen de los Fondos (\u00bfDe donde provienen y de qu\u00e9 forma?)", cls: "x-form-item label_spacing", width: 500, colspan: 6},
					{
						xtype : "textfield",
						id : "kycCertificadoInversionOrigenFondos",
						name : "kycCertificadoInversion.kycCertificadoInversionOrigenFondos",
						maxLength : 250,
						value: config.kycOrigenFondosJustificar,
						readOnly: true,
						width: 720,
						colspan:6
					},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},

					{xtype: "label", text: "Detalle el Vol\u00famen Mensual Estimado de:", cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label",  text: "Ingresos a transar", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Egresos a transar", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label",  text: "Moneda", cls: "x-form-item label_spacing", colspan: 2},
					{
						xtype : "numericfield",
						id : "kycCertificadoInversionIngresos",
						name : "kycCertificadoInversionIngresos",
						maxLength : 20,
						allowDecimals: true,
						value: config.kycPerfilTransaccionalCreditos,
						decimalPrecision: 2,
						colspan:2
					},
					{
						xtype : "numericfield",
						id : "kycCertificadoInversionEgresos",
						name : "kycCertificadoInversionEgresos",
						maxLength : 20,
						allowDecimals: true,
						decimalPrecision: 2,
						value: config.kycPerfilTransaccionalDebitos,
						colspan:2
					},
					{
						xtype: "combo",
						id: "ctgTipoMoneda",
						name: "kycCertificadoInversion.ctgTipoMoneda.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgTipoMoneda || [],
							fields: ["ctgTipoMonedaId", "ctgTipoMonedaNombre"]
						}),
						displayField: "ctgTipoMonedaNombre",
						allowBlank:false,
						valueField: "ctgTipoMonedaId",
						colspan: 2
					},
					{xtype: "label", text: "Nombre del Ejecutivo", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype : "textfield",
						id : "kycCertificadoInversionNombreEjecutivo",
						name : "kycCertificadoInversion.kycCertificadoInversionNombreEjecutivo",
						maxLength : 250,
						allowBlank:false,
						width: 480,
						colspan:6
					},{
						xtype: "hidden",
						id: "kycCertificadoInversionId",
						name: "kycCertificadoInversion.kycCertificadoInversionId"
					},{
						xtype: "hidden",
						id: "kycFechaActualizacion",
						listeners: {
							change: function(){
								var value = this.getValue();
								Efx.utils.setVisible("kycFechaActualizacionTitle", !Ext.isEmpty(value));
								Efx.utils.setText("kycFechaActualizacionTitle", "FORMULARIO ACTUALIZADO EL: " + value);
							}
						}
					}
		        ]
            });
	        return configToReturn;
		}
	};
}();