KycPerfilTransaccionalCredito = function(){
		return{
			setToZeroOrValue: function (fieldName){
				field=Ext.getCmp(fieldName);
				if(Ext.isEmpty(field) || field.getValue()==null || field.getValue()==0){
					return 0;
				}else return field.getValue();
			},
			getKycPerfilTransaccionalCreditos: function(){
			var i = 0;
			var credito = Ext.getCmp("kycPerfilTransaccionalCreditoCheck");
			var financiero = Ext.getCmp("kycPerfilTransaccionalFinanciamientoCheck");
			var jsonArray = "";
			Ext.each(credito.items.items, function(){
				if(credito.items.items[i].checked){
					json = {
							kycPerfilTransaccionalCreditoId: "null",
							kycPerfilTransaccionalCreditoFinanciamiento: (financiero.items.items[i].checked == true ? financiero.items.items[i].inputValue : financiero.items.items[i].uncheckedValue),
							ctgRangoCredito:{ctgCatalogoId: parseInt(credito.items.items[i].inputValue)},
							kyc:{kycId:EfxKYC.getKycId()}
					};
					if(!Ext.isEmpty(jsonArray)) jsonArray += ",";
					jsonArray += Ext.JSON.encode(json);
				}
				i++;
          });
			return jsonArray == "[]" ? "":"["+jsonArray+"]";
		},

		validateKycPerfilTransaccionalCreditos: function(){
			var i = 0;
			var count = 0;
			var credito = Ext.getCmp("kycPerfilTransaccionalCreditoCheck");
			var financiero = Ext.getCmp("kycPerfilTransaccionalFinanciamientoCheck");
			Ext.each(credito.items.items, function(){
				var id = "";
				id = credito.items.items[i].getId();
				if(!credito.items.items[i].checked && financiero.items.items[i].checked){

					Ext.getCmp(id).markInvalid("Este campo es obligatorio");
					count++;
				}else
				i++;
          });
			return count;
		},

		validateKycPerfilTransaccionalCreditosCompletos: function(){
			var i = 0;
			var count = 0;
			var credito = Ext.getCmp("kycPerfilTransaccionalCreditoCheck");
			var financiero = Ext.getCmp("kycPerfilTransaccionalFinanciamientoCheck");
			Ext.each(credito.items.items, function(){
				var id = "";
				id = credito.items.items[i].getId();
				if(credito.items.items[i].checked == true && financiero.items.items[i].checked == false){
					count = 0;
					return count;
					}
				else {
					count++;
					}

				i++;
		  });
			return count;
		},
		saveKycPerfilTransaccionalCredito: function(){
			Efx.message.progress(Efx.constants.SAVING);
			var validaCredito = parseInt(KycPerfilTransaccionalCredito.validateKycPerfilTransaccionalCreditos());
			var validaFinanciamiento = parseInt(KycPerfilTransaccionalCredito.validateKycPerfilTransaccionalCreditosCompletos());
			if(validaCredito == 0 &&
					validaFinanciamiento > 0){
				Ext.getCmp("kycPerfilTransaccionalForm").getForm().submit({
					url: Efx.constants.CONTEXT_PATH + "/kycPerfilTransaccionalCredito/save",
	    			timeout: Efx.constants.TIMEOUT_SECONDS,
	    			params: {
	    				"kycPerfilTransaccionalCreditoJson": KycPerfilTransaccionalCredito.getKycPerfilTransaccionalCreditos(),
	    				"kycPerfilTransaccionalCredito.kyc.kycId": EfxKYC.getKycId()
	    			},
	    			success: function(form, action){
	    				Efx.message.alert(action.result.message);
	    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
	    			},
	    			failure: Efx.form.failureProcedure
				});
			}else {
				if(validaFinanciamiento == 0){
				Efx.message.alert("Si seleccion\u00f3 un Rango de l\u00edmite de cr\u00E9ditos " +
								" <br/> es necesario seleccionar un Extrafinanciamiento");
				} else {
					Efx.message.alert("No puede seleccionar Extrafinanciamiento " +
					" <br/> si no ha elegido su respectivo <br/>Rango de l\u00edmite de cr\u00E9ditos");
				}
				return;
			}
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
								 handler: KycPerfilTransaccionalCredito.saveKycPerfilTransaccionalCredito
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
								 handler: KycPerfilTransaccionalCredito.saveKycPerfilTransaccionalCredito
							}
            	         ]
		             }
	            ],
				layout: {
					type: "table",
					columns: 6,
					tableAttrs: {
			            style: {width: "900px", "margin-top": "5px", "margin-bottom": "40px"},
			            align: "center"
			        }
				},
				defaults: Efx.utils.defaults({width: 900, colspan: 1}),
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
					            style: {width: "900px"},
					            align: "center"
					        }
						},
						defaults: {
							width: 100,
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
						text: "PERFIL TRANSACCIONAL PARA TARJETAS DE CR\u00C9DITO",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 850
					},

					{xtype: "label", text: "Rango de l\u00edmite de cr\u00e9ditos", cls: "x-form-item label_spacing", width : 160, height: 22},
					{xtype: "label", text: "Transacciones", cls: "x-form-item label_spacing",width : 60, height: 22},

					{xtype: "label", text: "CONSUMO Y RETIROS", cls: "x-form-item label_spacing", width : 150, height: 22},
					{xtype: "label", text: "Extrafinanciamiento", cls: "x-form-item label_spacing", width : 100, height: 22},

					{xtype: "label", text: "Transacciones", cls: "x-form-item label_spacing", width : 80, height: 22},
					{xtype: "label", text: "PAGOS", cls: "x-form-item label_spacing", width : 150, height: 22},
					{
						xtype: "checkboxgroup",
						id: "kycPerfilTransaccionalCreditoCheck",
				        items: config.kycPerfilTransaccionalCredito || [],
				        colspan: 1,
				        labelCls: "label_spacing",
				        rowspan: 5,
				        columns: 1,
				        vertical: true,
				        width : 160
					},
					{xtype: "label", text: "De 1 a 20", cls: "x-form-item label_spacing", width : 60, height: 22},
					{xtype: "label", text: "De $1.00 a $1,500.00", cls: "x-form-item label_spacing",width : 150, height: 22},
					{
						xtype: "checkboxgroup",
						id: "kycPerfilTransaccionalFinanciamientoCheck",
				        items: config.kycPerfilTransaccionalFinanciamiento || [],
				        colspan: 1,
				        rowspan: 5,
				        columns: 1,
				        vertical: true,
				        width : 100
					},
					{xtype: "label", text: "De 1 a 5", cls: "x-form-item label_spacing", width : 80, height: 22},
					{xtype: "label", text: "De $1.00 a $2,000.00", cls: "x-form-item label_spacing",width : 150, height: 22},

					{xtype: "label", text: "De 1 a 35", cls: "x-form-item label_spacing", width : 60, height: 22},
					{xtype: "label", text: "De $1.00 a $2,500.00", cls: "x-form-item label_spacing", width : 150, height: 22},

					{xtype: "label", text: "De 1 a 7", cls: "x-form-item label_spacing", width : 80, height: 22},
					{xtype: "label", text: "De $1.00 a $2,700.00", cls: "x-form-item label_spacing", width : 150, height: 22},

					{xtype: "label", text: "De 1 a 50", cls: "x-form-item label_spacing", width : 60, height: 22},
					{xtype: "label", text: "De $1.00 a $4,000.00", cls: "x-form-item label_spacing",width : 150, height: 22},

					{xtype: "label", text: "De 1 a 7", cls: "x-form-item label_spacing", width : 80, height: 22},
					{xtype: "label", text: "De $1.00 a $4,500.00", cls: "x-form-item label_spacing",width : 150,height: 22},

					{xtype: "label", text: "De 1 a 70", cls: "x-form-item label_spacing", width : 60, height: 20},
					{xtype: "label", text: "De $1.00 a $5,000.00", cls: "x-form-item label_spacing", width : 150, height: 20},

					{xtype: "label", text: "De 1 a 8", cls: "x-form-item label_spacing", width : 80, height: 20},
					{xtype: "label", text: "De $1.00 a $5,500.00", cls: "x-form-item label_spacing", width : 150,height: 20},

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
					  }
				   ]
				 }
		        ]
            });
			return configToReturn;
		}
	};
}();

























