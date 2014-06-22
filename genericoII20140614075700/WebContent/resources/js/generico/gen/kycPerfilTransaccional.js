KycPerfilTransaccional = function(){
		return{
			setToZeroOrValue: function (fieldName){
				field=Ext.getCmp(fieldName);
				if(Ext.isEmpty(field) || field.getValue()==null || field.getValue()==0){
					return 0;
				}else return field.getValue();
			},
		saveKycPerfilTransaccional: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycPerfilTransaccionalForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycPerfilTransaccional/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPerfilTransaccional.kyc.kycId": EfxKYC.getKycId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycPerfilTransaccionalId", action.result.kycPerfilTransaccionalId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycPerfilTransaccional = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "panel",
				flex: 1,
				title: "PERFIL TRANSACCIONAL",
				autoScroll: true,
				defaults: {margins: "5 0 5 0", align: "center"},
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
								 handler: KycPerfilTransaccional.saveKycPerfilTransaccional
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
								 handler: KycPerfilTransaccional.saveKycPerfilTransaccional
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
				defaults: Efx.utils.defaults({width: 730, colspan: 2}),
				items: [
						{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
						{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},

							{
			        	xtype: "form",
						id: "kycPerfilTransaccionalForm",
						flex: 1,
					    border: false,
					    autoScroll: false,
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
							colspan: 2,
							selectOnFocus: true,
							enforceMaxLength: true,
							maxLength: 200,
							typeAhead: true,
							minChars: 1,
							queryMode: "local",
							forceSelection: true,
							allowEnable: true
						},
						listeners: {
							render: function(){
								if(kycPerfilTransaccional && kycPerfilTransaccional.kycPerfilTransaccionalId && kycPerfilTransaccional.kycPerfilTransaccionalId > 0){
									if(this.getForm()) this.getForm().setValues(kycPerfilTransaccional);
									if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycPerfilTransaccionalForm");
								}
							}
						},

						items: [
					/********************************/
			        {
						xtype: "label",
						text: "PERFIL TRANSACCIONAL",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "Prop\u00f3sito de la Relaci\u00f3n Comercial", cls: "x-form-item label_spacing", width:500, colspan: 6},
					{
						xtype : "textfield",
						id : "kycPerfilTransaccionalProposito",
						name : "kycPerfilTransaccionalProposito",
						maxLength : 250,
						allowBlank: false,
						width:700,
						colspan:6
					},
					{xtype: "label", text: "Naturaleza de la Relaci\u00f3n Comercial", cls: "x-form-item label_spacing", width:500, colspan: 6},
					{
						xtype : "textfield",
						id : "kycPerfilTransaccionalNaturaleza",
						name : "kycPerfilTransaccionalNaturalezaRelacion",
						maxLength : 250,
						allowBlank: false,
						width:700,
						colspan:6
					},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", width: 500, colspan:6},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", width: 500, colspan:6},
					{xtype: "label", text: "Cuant\u00EDa Mensual Estimada de las Operaciones:", cls: "x-form-item label_spacing", width: 500, colspan:6},
			        {xtype: "label", text: "Ingresos (D\u00E9positos)", cls: "x-form-item label_spacing"},
			        {xtype: "label", text: "Egresos (Retiros)", cls: "x-form-item label_spacing", colspan: 4},
			        {
						xtype : "numericfield",
						id : "kycPerfilTransaccionalCreditosColones",
						name : "kycPerfilTransaccionalCreditos",
						maxLength : 100
					},
			        {
						xtype : "numericfield",
						id : "kycPerfilTransaccionalDebitosColones",
						name : "kycPerfilTransaccionalDebitos",
						maxLength : 100
			        },
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "hidden",
						id: "kycPerfilTransaccionalId",
						name: "kycPerfilTransaccional.kycPerfilTransaccionalId"
					},
					{
						xtype: "hidden",
						id: "kycFechaActualizacion",
						listeners: {
							change: function(){
								var value = this.getValue();
								Efx.utils.setVisible("kycFechaActualizacionTitle", !Ext.isEmpty(value));
								Efx.utils.setText("kycFechaActualizacionTitle", "FORMULARIO ACTUALIZADO EL: " + value);
								}
							}
					  },
					{
						xtype: "hidden",
						id: "ctgTipoMoneda",
						name: "kycPerfilTransaccional.ctgTipoMoneda.ctgCatalogoId"
					}
				   ]
				 }
		        ]
            });
			return configToReturn;
		}
	};
}();
