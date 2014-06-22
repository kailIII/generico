KycProductosGeneral = function(){
	return {
		saveKycProductosGeneral: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycProductosGeneralForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycProductosGeneral/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductosGeneral.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosGeneral.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycProductosGeneralId", action.result.kycProductosGeneralId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycProductosGeneral = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycProductosGeneralForm",
				title: "PRODUCTOS - DATOS GENERALES",
				autoScroll: true,
				listeners: {
					render: function(){
						if(kycProductosGeneral && kycProductosGeneral.kycProductosGeneralId && kycProductosGeneral.kycProductosGeneralId > 0){
							if(this.getForm()) this.getForm().setValues(kycProductosGeneral);
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycProductosGeneralForm");
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
								 handler: KycProductosGeneral.saveKycProductosGeneral
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
								 handler: KycProductosGeneral.saveKycProductosGeneral
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
						text: "DATOS GENERALES",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "N\u00famero de Cuenta Asignado 1", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "N\u00famero de Cuenta Asignado 2", cls: "x-form-item label_spacing", colspan: 4},

					{
						xtype : "textfield",
						id : "kycProductosGeneralNumeroCuenta1",
						name : "kycProductosGeneral.kycProductosGeneralNumeroCuenta1",
						maxLength : 17,
						minLength:17,
						colspan:2
					},
					{
						xtype : "textfield",
						id : "kycProductosGeneralNumeroCuenta2",
						name : "kycProductosGeneral.kycProductosGeneralNumeroCuenta2",
						maxLength : 17,
						minLength:17,
						colspan:4
					},
					{xtype: "label", text: "N\u00famero de Cuenta Asignado 3", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "N\u00famero de Cuenta Asignado 4", cls: "x-form-item label_spacing", colspan: 4},
					{
						xtype : "textfield",
						id : "kycProductosGeneralNumeroCuenta3",
						name : "kycProductosGeneral.kycProductosGeneralNumeroCuenta3",
						maxLength : 17,
						minLength:17,
						colspan:2
					},
					{
						xtype : "textfield",
						id : "kycProductosGeneralNumeroCuenta4",
						name : "kycProductosGeneral.kycProductosGeneralNumeroCuenta4",
						maxLength : 17,
						minLength:17,
						colspan:4
					},
					{
						xtype: "label",
						text: "CITIBANK ON LINE",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "Usuario Citibank On Line", cls: "x-form-item label_spacing", width: 500, colspan: 6},
					{
						xtype : "textfield",
						id : "kycProductosGeneralUsuarioCitibank",
						name : "kycProductosGeneral.kycProductosGeneralUsuarioCitibank",
						maxLength : 50,
						width: 720,
						colspan:6
					},
					{
						xtype: "hidden",
						id: "kycProductosGeneralId",
						name: "kycProductosGeneral.kycProductosGeneralId"
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