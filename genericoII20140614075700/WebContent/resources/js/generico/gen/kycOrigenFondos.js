KycOrigenFondos = function(){
	return {
		saveKycOrigenFondos: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycOrigenFondosForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycOrigenFondos/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycOrigenFondos.kyc.kycId": EfxKYC.getKycId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycOrigenFondosId", action.result.kycOrigenFondosId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycOrigenFondos = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycOrigenFondosForm",
				title: "ORIGEN DE LOS FONDOS",
				autoScroll: true,
				listeners: {
					render: function(){
						if(kycOrigenFondos && kycOrigenFondos.kycOrigenFondosId && kycOrigenFondos.kycOrigenFondosId > 0){
							if(this.getForm()) this.getForm().setValues(kycOrigenFondos);
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycOrigenFondosForm");
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
								 handler: KycOrigenFondos.saveKycOrigenFondos
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
								 handler: KycOrigenFondos.saveKycOrigenFondos
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
				listeners: {
					render:function(){
						if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_FISICA){
							Ext.getCmp("kycPersonaFisicaGrid").hide();
							Ext.getCmp("kycInmueblesGrid").hide();
							Ext.getCmp("kycMueblesGrid").hide();
						}
					}
				},
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
						id: "kycOrigenFondosInfo",
						text: "INFORMACI\u00d3N DE REGISTROS",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_FISICA){
									this.hide();
								}
							}
						}
					},
					{
						xtype: "label",
						text: "SOCIEDADES RELACIONADAS",
						style: "text-decoration: underline",
						cls: "x-form-item label_spacing",
						colspan: 6,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_FISICA)
								{this.hide();}
							}}
					},
					{
						xtype : "label",
						text : "",
						cls : "x-form-item label_spacing",
						colspan : 6
					},
					{
						xtype: "grid",
						id: "kycPersonaFisicaGrid",
						height: 80,
						width: 700,
						colspan:6,
						style: "align:left",
						minHeight: 80,
						store: new Ext.data.SimpleStore({
					    	data: config.kycSociedadesRelacionadas || [],
					    	fields: [

					    	         {name:"kycSociedadesRelacionadas.kycSociedadRelacionadaId"},
					    	         {name:"kycSociedadesRelacionadas.kycSociedadRelacionadaEmpresa"},
					    	         {name:"kycSociedadesRelacionadas.kycHistorialCivilCedulaJuridica"},
					    	         {name:"kycSociedadesRelacionadas.kycHistorialCivilPuesto"},
					    	         {name:"kycSociedadesRelacionadas.kycHistorialCivilObservaciones"},
					    	         {name:"kycSociedadesRelacionadas.kycHistorialCivilFecha"}
			    	        ]
					    }),
					    columns: [
				            {header: "Empresa",  dataIndex: "kycSociedadesRelacionadas.kycSociedadRelacionadaEmpresa", align: "left",flex:3, minWidth: 20},
				            {header: "C\u00e9dula Jur\u00eddica",  dataIndex: "kycSociedadesRelacionadas.kycHistorialCivilCedulaJuridica", align: "left",flex:0.8,  width: 20},
				            {header: "Puesto",  dataIndex: "kycSociedadesRelacionadas.kycHistorialCivilPuesto", align: "left",flex:1,  width: 20},
				            {header: "Observaci\u00f3n",  dataIndex: "kycSociedadesRelacionadas.kycHistorialCivilObservaciones", align: "left", flex:1,  width: 20},
				            {header: "Fecha",  dataIndex: "kycSociedadesRelacionadas.kycHistorialCivilFecha", align: "left", flex:0.6,  width: 20,
				            	renderer : function (value) {
				            		myDate = Ext.Date.parse(value, "Ymd");
				            		otherDate = Ext.Date.format(myDate,"d/m/Y");
				            		return otherDate;
				            	}
				            }]
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
					{xtype: "label", text: " BIENES INMUEBLES", style: "text-decoration: underline", cls: "x-form-item label_spacing", colspan: 6,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_FISICA)
								{this.hide();}
							}}
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
						height: 80,
						width: 700,
						colspan:6,
						style: "align:left",
						minHeight: 80,
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
							{name:"kycBienesInmuebles.kycBienesInmueblesValorFiscal"}
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
				            {header: "Valor Fiscal",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesValorFiscal", align: "left", flex:1,  width: 20},
				            {header: "Estimaci\u00f3n",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesPrecioEstimado", align: "left", flex:1,  width: 20},
				            {header: "Moneda",  dataIndex: "kycBienesInmuebles.kycBienesInmueblesMonedaValorFiscal", align: "left", flex:1,  width: 20}
				            ]
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
					{xtype: "label", text: "BIENES MUEBLES", style: "text-decoration: underline", cls: "x-form-item label_spacing", colspan: 6,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_FISICA)
								{this.hide();}
							}}
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
						height: 80,
						width: 700,
						colspan:6,
						style: "align:left",
						minHeight: 80,
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
							{name:"kycBienesMuebles.kycBienesMueblesMarca"}
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
				            {header: "Valor de Hacienda",  dataIndex: "kycBienesMuebles.kycBienesMueblesValorHacienda", align: "left", flex:1.6,  width: 20},
				            {header: "Moneda",  dataIndex: "kycBienesMuebles.kycBienesMueblesMoneda", align: "left", flex:1,  width: 20}
				            ]
					},
					{xtype: "label", text: " ", width: 715, cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: " ", width: 715, cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: "\u00bfDesea imprimir la informaci\u00f3n adicional del cliente (Historial de estado civil, sociedades relacionadas, muebles e inmuebles)?", width: 715, cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype : "combo",
						id : "kycOrigenFondosImpresion",
						name : "kycOrigenFondos.kycOrigenFondosImpresion",
						store : new Ext.data.SimpleStore({
							data : Efx.combos.yesnoArray() || [],
							fields : [ "id", "descripcion" ]
						}),
						displayField : "descripcion",
						valueField : "id",
						value: kycOrigenFondos.kycOrigenFondosImpresion,
						allowBlank : false,
						colspan : 6
					},
			        {
						xtype: "label",
						text: "ORIGEN DE LOS FONDOS",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "Describa el origen de los fondos (Salario, honorarios, operaci\u00f3n del negocio, herencia, rentas, entre otros);", width: 715, cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: "\u00bfDe donde provienen y en que forma?", width: 715, cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype : "textfield",
						id : "kycOrigenFondosJustificar",
						name : "kycOrigenFondos.kycOrigenFondosJustificar",
						allowBlank: false,
						maxLength : 250,
						value: kycOrigenFondos.kycOrigenFondosJustificar,
						width:720,
						colspan:6
					},
					{
						xtype: "hidden",
						id: "kycOrigenFondosId",
						name: "kycOrigenFondos.kycOrigenFondosId"
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