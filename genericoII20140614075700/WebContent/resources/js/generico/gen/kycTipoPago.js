KycTipoPago = function(){
	return {
		saveKycTipoPago: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycTipoPagoForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycTipoPago/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycTipoPago.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycTipoPago.kycPersonaFisica.kycPersonaFisicaId" : EfxKYC.getKycPersonaFisicaId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycTipoPagoId", action.result.kycTipoPagoId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycTipoPago = config.kycTipoPago;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycTipoPagoForm",
				title: "CR\u00c9DITO PERSONAL - TIPO DE PAGO",
				autoScroll: true,
				listeners: {
					render: function(){
						if(kycTipoPago && kycTipoPago.kycTipoPagoId && kycTipoPago.kycTipoPagoId > 0){
							if(this.getForm()) this.getForm().setValues(kycTipoPago);
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycTipoPagoForm");
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
								 handler: KycTipoPago.saveKycTipoPago
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
								 handler: KycTipoPago.saveKycTipoPago
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
						text: "TIPO DE PAGO",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					 {xtype: "label",text: "Forma de Pago", cls: "x-form-item label_spacing", colspan: 4},
					 {xtype: "label",text: "No. de Cuenta Cliente CITI", cls: "x-form-item label_spacing", colspan: 2},
					{
						xtype: "combo",
						id: "ctgFormaPago",
						allowBlank: false,
						name:"kycTipoPago.ctgFormaPago.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgFormasPago || [],
							fields:[
							        "ctgFormaPagoId",
							        "ctgFormaPagoNombre"
							        ]
						}),
						displayField: "ctgFormaPagoNombre",
						valueField: "ctgFormaPagoId",
						colspan: 4,
						width: 480
					},
					{
						xtype: "textfield",
						id: "kycCuentaClienteCiti",
						name: "kycTipoPago.kycCuentaClienteCiti",
						colspan: 2,
						maxLength: 17,
						vtype: "cuentaBancaria",
					},
					{
						xtype: "label",
						id: "kycTipoPagoInfo",
						text: "BIENES Y PROPIEDADES",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label",text: " ", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label",text: " ", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label",text: "Tiempo de Residencia Actual", cls: "x-form-item label_spacing", colspan: 2},

					{xtype: "label",text: "Tipo de Vivienda", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label",text: "Dependientes", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label",text: "A\u00f1os", cls: "x-form-item label_spacing", colspan: 1, width: 100},
					{xtype: "label",text: "Meses", cls: "x-form-item label_spacing", colspan: 1, width: 100},
					{
						xtype: "combo",
						id: "ctgTipoVivienda",
						name:"kycTipoPago.ctgTipoVivienda.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgTiposVivienda || [],
							fields:[
							        "ctgTipoViviendaId",
							        "ctgTipoViviendaNombre"
							        ]
						}),
						displayField: "ctgTipoViviendaNombre",
						allowBlank: false,
						valueField: "ctgTipoViviendaId"
					},
					{
						xtype: "textfield",
						id: "kycTipoPagoDependientes",
						allowBlank: false,
						name:"kycTipoPago.kycTipoPagoDependientes",
						colspan: 2
					},
					{
						xtype: "numberfield",
						id: "kycTipoPagoAnios",
						name:"kycTipoPago.kycTipoPagoAnios",
						allowBlank: false,
						colspan: 1,
						maxValue: 100,
						hideTrigger: true,
						minValue: 0,
						width: 100,
						listeners : {
							change : function() {
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycTipoPagoAnios"))
										&& Ext.isEmpty(Efx.utils.getValue("kycTipoPagoMeses"));
								Efx.utils.setRequiredAndValidate("kycTipoPagoAnios",isEmpty);
								Efx.utils.setRequiredAndValidate("kycTipoPagoMeses",isEmpty);
							}}
					},
					{
						xtype: "numberfield",
						id: "numberfield",
						name:"kycTipoPago.kycTipoPagoMeses",
						colspan: 1,
						width: 100,
						maxValue: 11,
						hideTrigger: true,
						minValue: 0,
						listeners : {
							change : function() {
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycTipoPagoAnios"))
										&& Ext.isEmpty(Efx.utils.getValue("kycTipoPagoMeses"));
								Efx.utils.setRequiredAndValidate("kycTipoPagoAnios",isEmpty);
								Efx.utils.setRequiredAndValidate("kycTipoPagoMeses",isEmpty);
							}}
					},
					{xtype: "label", text: "BIENES INMUEBLES", style: "text-decoration: underline", cls: "x-form-item label_spacing", colspan: 6,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_FISICA){
									this.hide();
								}
							}
						}
					},
					{
						xtype : "label",
						text : "",
						cls : "x-form-item label_spacing",
						colspan : 6
					},
					{
						xtype: "grid",
						id: "kycInmueblesGrid",
						height: 100,
						width: 700,
						colspan:6,
						style: "align:left",
						minHeight: 60,
						store: new Ext.data.SimpleStore({
					    	data: config.kycBienesInmuebles || [],
					    	fields: [
							{name:"kycBienesInmuebles.kycBienesInmueblesId"},
							{name:"kycBienesInmuebles.kycBienesInmueblesFechaInscripcion"},
							{name:"kycBienesInmuebles.kycBienesInmueblesCedula"},
							{name:"kycBienesInmuebles.kycBienesInmueblesFinca"},
							{name:"kycBienesInmuebles.kycBienesInmueblesMedidas"},
							{name:"kycBienesInmuebles.kycBienesInmueblesMonedaPrecioEstimado"},
							{name:"kycBienesInmuebles.kycBienesInmueblesMonedaValorFiscal"},
							{name:"kycBienesInmuebles.kycBienesInmueblesNaturaleza"},
							{name:"kycBienesInmuebles.kycBienesInmueblesNumeroPlano"},
							{name:"kycBienesInmuebles.kycBienesInmueblesPrecioEstimado"},
							{name:"kycBienesInmuebles.kycBienesInmueblesPresentacion"},
							{name:"kycBienesInmuebles.kycBienesInmueblesUbicacion"},
							{name:"kycBienesInmuebles.kycBienesInmueblesProvincia"},
							{name:"kycBienesInmuebles.kycBienesInmueblesCanton"},
							{name:"kycBienesInmuebles.kycBienesInmueblesDistrito"},
							{name:"kycBienesInmuebles.kycBienesInmueblesUltimaActualizacion"},
							{name:"kycBienesInmuebles.kycBienesInmueblesValorFiscal"},
									]
					    }),
					    columns: [
				            {header: "Propiedad",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesId", align: "left",flex:0.9, minWidth: 20},
				            {header: "Finca",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesFinca", align: "left",flex:1.3,  width: 20},
				            {header: "Derecho",  dataIndex: "a6", align: "left", flex:1,  width: 20},
				            {header: "Provincia",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesProvincia", align: "left",flex:1,  width: 20},
				            {header: "Cant\u00f3n",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesCanton", align: "left", flex:1,  width: 20},
				            {header: "Distrito",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesDistrito", align: "left", flex:1,  width: 20},
				            {header: "\u00c1rea",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesMedidas", align: "left", flex:1,  width: 20},
				            {header: "Valor fiscal",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesValorFiscal", align: "left", flex:1,  width: 20},
				            {header: "Estimaci\u00f3n",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesPrecioEstimado", align: "left", flex:1,  width: 20},
				            {header: "Moneda",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesMonedaValorFiscal", align: "left", flex:1,  width: 20}
				            ],
					},
					{
						xtype : "label",
						text : "",
						cls : "x-form-item label_spacing",
						colspan : 6
					},{
						xtype : "label",
						text : "",
						cls : "x-form-item label_spacing",
						colspan : 6
					},
					{xtype: "label", text: "BIENES MUEBLES", 	style: "text-decoration: underline", cls: "x-form-item label_spacing", colspan: 6,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_FISICA){
									this.hide();
								}
							}
						}
					},

					{
						xtype : "label",
						text : "",
						cls : "x-form-item label_spacing",
						colspan : 6
					},
					{
						xtype: "grid",
						id: "kycMueblesGrid",
						height: 100,
						width: 700,
						colspan:6,
						style: "align:left",
						store: new Ext.data.SimpleStore({
					    	data: config.kycBienesMuebles|| [],
					    	fields: [
							{name:"kycBienesMuebles.kycBienesMueblesId"},
							{name:"kycBienesMuebles.kycBienesMueblesAnnoFabricacion"},
							{name:"kycBienesMuebles.kycBienesMueblesValorHacienda"},
							{name:"kycBienesMuebles.kycBienesMueblesUltimaActualizacion"},
							{name:"kycBienesMuebles.kycBienesMueblesPlaca"},
							{name:"kycBienesMuebles.kycBienesMueblesClase"},
							{name:"kycBienesMuebles.kycBienesMueblesBien"},
							{name:"kycBienesMuebles.kycBienesMueblesMoneda"},
							{name:"kycBienesMuebles.kycBienesMueblesEstilo"},
							{name:"kycBienesMuebles.kycBienesMueblesCedula"},
							{name:"kycBienesMuebles.kycBienesMueblesAnno"},
							{name:"kycBienesMuebles.kycBienesMueblesMarca"},

			    	        ]
					    }),
					    columns: [
				            {header: "Veh\u00edculo",  dataIndex: "kycBienesMuebles.kycBienesMueblesId", align: "left",flex:0.8, minWidth: 20},
				            {header: "Clase",  dataIndex: "kycBienesMuebles.kycBienesMueblesClase", align: "left",flex:1,  width: 20},
				            {header: "C\u00f3digo",  dataIndex: "", align: "left",flex:0.8,  width: 20},
				            {header: "Bien",  dataIndex: "kycBienesMuebles.kycBienesMueblesBien", align: "left",flex:1,  width: 20},
				            {header: "Marca",  dataIndex: "kycBienesMuebles.kycBienesMueblesMarca", align: "left", flex:1.4,  width: 20},
				            {header: "Estilo",  dataIndex: "kycBienesMuebles.kycBienesMueblesEstilo", align: "left", flex:1.8,  width: 20},
				            {header: "A\u00f1o Fabricaci\u00f3n",  dataIndex: "kycBienesMuebles.kycBienesMueblesAnnoFabricacion", align: "left", flex:1.4,  width: 20},
				            {header: "Valor de hacienda",  dataIndex: "kycBienesMuebles.kycBienesMueblesValorHacienda", align: "left", flex:1.6,  width: 20},
				            {header: "Moneda",  dataIndex: "kycBienesMuebles.kycBienesMueblesMoneda", align: "left", flex:1,  width: 20}

				            ],
					},
					{xtype: "label", text: " ", width: 715, cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: " ", width: 715, cls: "x-form-item label_spacing", colspan: 6},


					{
						xtype: "hidden",
						id: "kycTipoPagoId",
						name: "kycTipoPago.kycTipoPagoId"
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
					}
		        ]
            });
	        return configToReturn;
		}
	};
}();