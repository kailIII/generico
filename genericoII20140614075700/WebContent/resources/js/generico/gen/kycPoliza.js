KycPoliza = function(){
	return {
		saveKycPoliza: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycPolizaForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycPoliza/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPoliza.kyc.kycId": EfxKYC.getKycId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycPolizaId", action.result.kycPolizaId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycPoliza = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycPolizaForm",
				title: "P\u00D3LIZA",
				autoScroll: true,
				listeners: {
					render: function(){
						if(kycPoliza && kycPoliza.kycPolizaId && kycPoliza.kycPolizaId > 0){
							if(this.getForm()) this.getForm().setValues(kycPoliza);
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycPolizaForm");
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
								 handler: KycPoliza.saveKycPoliza
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
								 handler: KycPoliza.saveKycPoliza
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
			        },{
						xtype: "label",
						text: "DESCRIPCI\u00D3N DE LA P\u00D3LIZA",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "Tipo P\u00F3liza", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Valor Asegurado", cls: "x-form-item label_spacing", colspan: 1, width: 115},
					{xtype: "label", text: "Monto Prima", cls: "x-form-item label_spacing", colspan: 1, width: 115},
					{xtype: "label", text: "Periodicidad", cls: "x-form-item label_spacing"},
					{
						xtype: "combo",
						id: "ctgTipoSeguroId",
						name: "kycPoliza.ctgTipoSeguro.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgTipoSeguros || [],
							fields: ["ctgTipoSeguroId", "ctgTipoSeguroNombre"]
						}),
						displayField: "ctgTipoSeguroNombre",
						valueField: "ctgTipoSeguroId",
						listConfig: {minWidth: 450},
						allowBlank: false
					},{
						xtype: "numericfield",
						id: "kycPolizaValor",
						name: "kycPoliza.kycPolizaValor",
						maxLength: 20,
						allowBlank: false,
						allowZero: false,
						colspan: 1,
						width: 110
					},{
						xtype: "numericfield",
						id: "kycPolizaMontoPrima",
						name: "kycPoliza.kycPolizaMontoPrima",
						maxLength: 20,
						allowBlank: false,
						allowZero: false,
						colspan: 1,
						width: 115
					},{
						xtype: "combo",
						id: "ctgPeriocidadId",
						name: "kycPoliza.ctgPeriocidad.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgPeriocidades || [],
							fields: ["ctgPeriocidadId", "ctgPeriocidadNombre"]
						}),
						displayField: "ctgPeriocidadNombre",
						valueField: "ctgPeriocidadId",
						allowBlank: false
					},
					{xtype: "label", text: "Nombre del Asegurado", cls: "x-form-item label_spacing", colspan: 4},
					{xtype: "label", text: "Estimaci\u00F3n de ingresos mensuales", cls: "x-form-item label_spacing"},
					{
						xtype: "textfield",
						id: "kycPolizaNombreAsegurado",
						name: "kycPoliza.kycPolizaNombreAsegurado",
						allowBlank: false,
						maxLength: 120,
						colspan: 4,
						width: 475
					},{
						xtype: "combo",
						id: "ctgRangoIngresosId",
						name: "kycPoliza.ctgRangoIngresos.ctgRangoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgRangoIngresos || [],
							fields: ["ctgRangoIngresoId", "ctgRangoIngresoNombre"]
						}),
						displayField: "ctgRangoIngresoNombre",
						valueField: "ctgRangoIngresoId"
					},
					{xtype: "label", text: "Nombre de Beneficiario", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "textfield",
						id: "kycPolizaNombreBeneficiario",
						name: "kycPoliza.kycPolizaNombreBeneficiario",
						maxLength: 120,
						colspan: 6,
						width: 475
					},{
						xtype: "label",
						text: "Describa la actividad de la cual provienen los fondos",
						cls: "x-form-item label_spacing",
						width: 715,
						colspan: 6
					},{
						xtype: "textarea",
						id: "kycPolizaDescripcion",
						name: "kycPoliza.kycPolizaDescripcion",
						maxLength: 1000,
						colspan: 6,
						height: 40,
						width: 715
					},{
						xtype: "label",
						text: "Tipo de relaci\u00F3n comercial (Favor indicar el tipo de Seguro que est\u00E1 adquiriendo)",
						cls: "x-form-item label_spacing",
						width: 715,
						colspan: 6
					},{
						xtype: "textarea",
						id: "kycPolizaTipoRelacion",
						name: "kycPoliza.kycPolizaTipoRelacion",
						maxLength: 250,
						colspan: 6,
						height: 40,
						width: 715
					},{
						xtype: "label",
						text: "CORRESPONDENCIA",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},{
						xtype: "checkboxgroup",
				        items: config.kycCorrespondencias || [],
				        colspan: 6,
				        columns: 2,
				        vertical: true,
				        width: 715
					},{
						xtype: "label",
						text: "OBSERVACIONES GENERALES",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},{
						xtype: "label",
						text: "Incluir cualquier comentario o dato que estime necesario en relaci\u00F3n con la informaci\u00F3n consignada en el presente Formulario",
						cls: "x-form-item label_spacing",
						width: 715,
						colspan: 6
					},{
						xtype: "textarea",
						name: "kycObservacion",
						maxLength: 1000,
						colspan: 6,
						height: 40,
						width: 715
					},{
						xtype: "hidden",
						id: "kycPolizaId",
						name: "kycPoliza.kycPolizaId"
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