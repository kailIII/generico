KycPersonaExpuestaPoliticamente = function(){
	return {
		saveKycPersonaExpuestaPoliticamente: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycPersonaExpuestaPoliticamenteForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycPersonaExpuestaPoliticamente/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPersonaExpuestaPoliticamente.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycPersonaExpuestaPoliticamente.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycFondosTerceros.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId()

    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycPersonaExpuestaPoliticamenteId", action.result.kycPersonaExpuestaPoliticamenteId);
    				Efx.utils.setValue("kycFondosTercerosId", action.result.kycFondosTercerosId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycPersonaExpuestaPoliticamente = config.kycPersonaExpuestaPoliticamente;
			//var kycFondosTerceros = config.kycFondosTerceros;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycPersonaExpuestaPoliticamenteForm",
				title: "PERSONA EXPUESTA POL\u00cdTICAMENTE Y ART\u00cdCULO 15",
				autoScroll: true,
				listeners: {
					render: function(){
						if((kycPersonaExpuestaPoliticamente && kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteId && kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteId > 0)){
							if(this.getForm()) {this.getForm().setValues(kycPersonaExpuestaPoliticamente);}
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycPersonaExpuestaPoliticamenteForm");
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
								 handler: KycPersonaExpuestaPoliticamente.saveKycPersonaExpuestaPoliticamente
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
								 handler: KycPersonaExpuestaPoliticamente.saveKycPersonaExpuestaPoliticamente
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
						text : "PERSONA POL\u00CDTICAMENTE EXPUESTA",
						cls : "x-form-item label_header",
						colspan : 6,
						width : 730
					},
					{
						xtype : "label",
						text : "\u00bfCumple o ha cumplido usted o su c\u00f3nyuge funciones p\u00FAblicas o pol\u00EDticas destacadas, ya sea en el territorio nacional o en el extranjero?",
						cls : "x-form-item label_spacing",
						id: "pregunta",
						width : 715,
						colspan : 6
					},
					{
						xtype : "combo",
						id : "kycPersonaExpuestaPoliticamenteTipo",
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteTipo",
						store : new Ext.data.SimpleStore({
							data : Efx.combos.yesnoArray() || [],
							fields : [ "id", "descripcion" ]
						}),
						displayField : "descripcion",
						allowBlank: false,
						valueField : "id",
						listeners : {
							change : function() {
								var disable = this.getValue() != "1";
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteNombre",disable, disable);
								Efx.utils.setDisabled("ctgEstadoCivil",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamentePaisNacimiento",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteLugarNacimiento",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteFechaNacimiento",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamentePuesto",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteInstitucion",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamentePeriodoDesde",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamentePeriodoHasta",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteGradoParentezco",disable, disable);


								Efx.utils.setRequiredAndValidate("kycPersonaExpuestaPoliticamenteNombre", !disable);
								Efx.utils.setRequiredAndValidate("kycPersonaExpuestaPoliticamentePaisNacimiento", !disable);
								Efx.utils.setRequiredAndValidate("kycPersonaExpuestaPoliticamenteLugarNacimiento",!disable);
								Efx.utils.setRequiredAndValidate("kycPersonaExpuestaPoliticamenteFechaNacimiento", !disable);
								Efx.utils.setRequiredAndValidate("kycPersonaExpuestaPoliticamentePuesto", !disable);
								Efx.utils.setRequiredAndValidate("kycPersonaExpuestaPoliticamenteInstitucion", !disable);
								Efx.utils.setRequiredAndValidate("kycPersonaExpuestaPoliticamentePeriodoDesde", !disable);
								Efx.utils.setRequiredAndValidate("kycPersonaExpuestaPoliticamentePeriodoHasta", !disable);
								Efx.utils.setRequiredAndValidate("kycPersonaExpuestaPoliticamenteGradoParentezco",!disable);
								Efx.utils.setRequiredAndValidate("ctgEstadoCivil", !disable);
							}, render: function(){
								var disable = this.getValue() != "1";
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteNombre",disable, disable);
								Efx.utils.setDisabled("ctgEstadoCivil",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamentePaisNacimiento",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteLugarNacimiento",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteFechaNacimiento",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamentePuesto",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteInstitucion",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamentePeriodoDesde",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamentePeriodoHasta",disable, disable);
								Efx.utils.setDisabled("kycPersonaExpuestaPoliticamenteGradoParentezco",disable, disable);
							}
						},
						colspan : 6
					},
					{
						xtype : "label",
						text : "Nombre Completo",
						cls : "x-form-item label_spacing",
						colspan:4
					},
					{
						xtype : "label",
						text : "Estado Civil",
						cls : "x-form-item label_spacing",
						colspan : 2
					},{
						xtype : "textfield",
						id : "kycPersonaExpuestaPoliticamenteNombre",
						colspan: 4,
						width: 480,
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteNombre",
						maxLength : 120
					},{
						xtype : "combo",
						id : "ctgEstadoCivil",
						name : "kycPersonaExpuestaPoliticamente.ctgEstadoCivil.ctgCatalogoId",
						store : new Ext.data.SimpleStore({
							data : config.ctgEstadosCiviles || [],
							fields : [ "ctgEstadoCivilId",
									"ctgEstadoCivilNombre" ]
						}),
						displayField : "ctgEstadoCivilNombre",
						valueField : "ctgEstadoCivilId"
					},{
						xtype : "label",
						text : "Pa\u00eds de Nacimiento",
						cls : "x-form-item label_spacing"
					},{
						xtype : "label",
						text : "Lugar de Nacimiento",
						cls : "x-form-item label_spacing",
						colspan : 2
					},{
						xtype : "label",
						text : "Fecha de Nacimiento",
						cls : "x-form-item label_spacing",
						colspan : 2
					},
					{
						xtype : "combo",
						id : "kycPersonaExpuestaPoliticamentePaisNacimiento",
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamentePaisNacimiento",
						store : new Ext.data.SimpleStore({
							data : config.ctgPaises || [],
							fields : [ "ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre" ]
						}),
						displayField : "ctgPaisNombre",
						valueField : "ctgPaisNombre",
						colspan : 2
					},{
						xtype : "textfield",
						id : "kycPersonaExpuestaPoliticamenteLugarNacimiento",
						allowBlank: false,
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteLugarNacimiento",
						maxLength : 120
					},	{
						xtype : "datefield",
						id : "kycPersonaExpuestaPoliticamenteFechaNacimiento",
						allowBlank: false,
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteFechaNacimiento",
						colspan:2,
						altFormats: "Ymd|d/m/Y",
						submitFormat : "Ymd",
						maxLength : 120,
						maxValue: new Date()
					},{
						xtype : "label",
						text : "Cargo o Relaci\u00F3n",
						cls : "x-form-item label_spacing"
					},{
						xtype : "label",
						text : "Instituci\u00f3n",
						cls : "x-form-item label_spacing"
					},{
						xtype : "label",
						text : "Per\u00edodo Desde",
						cls : "x-form-item label_spacing",
						width : 115,
						colspan : 1
					},{
						xtype : "label",
						text : "Per\u00edodo Hasta",
						cls : "x-form-item label_spacing",
						width : 110
					},{
						xtype : "textfield",
						id : "kycPersonaExpuestaPoliticamentePuesto",
						allowBlank: false,
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamentePuesto",
						maxLength : 50
					},{
						xtype : "textfield",
						id : "kycPersonaExpuestaPoliticamenteInstitucion",
						allowBlank: false,
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteInstitucion",
						maxLength : 50
					},{
						xtype : "numberfield",
						id : "kycPersonaExpuestaPoliticamentePeriodoDesde",
						allowBlank: false,
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamentePeriodoDesde",
		            	hideTrigger: true,
		            	maxLength:4,
		            	minLength: 4,
						width : 115,
						colspan : 1
					},{
						xtype : "numberfield",
						id : "kycPersonaExpuestaPoliticamentePeriodoHasta",
						allowBlank: false,
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamentePeriodoHasta",
		            	hideTrigger: true,
		            	maxLength:4,
		            	minLength: 4,
						width : 110,
						colspan : 1
					},{
						xtype : "label",
						text : "Parentesco",
						cls : "x-form-item label_spacing",
						colspan:6
					},{
						xtype : "textfield",
						id : "kycPersonaExpuestaPoliticamenteGradoParentezco",
						allowBlank: false,
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteGradoParentezco",
						maxLength : 50,
						colspan:6
					},

					{
						xtype : "label",
						text : "INFORMACI\u00d3N PARA ADMINISTRADOR DE FONDOS (ART. 15 LEY 8204. ART. 15 BIS LEY 8719)",
						cls : "x-form-item label_header",
						colspan : 6,
						width : 730
					},{
						xtype : "label",
						text : "\u00bfAdministra fondos a terceros?",
						cls : "x-form-item label_spacing",
						colspan: 6
					},
					{
						xtype : "combo",
						id : "kycPersonaExpuestaPoliticamenteArticulo15",
						allowBlank: false,
						name : "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteArticulo15",
						store : new Ext.data.SimpleStore({
							data : Efx.combos.yesnoArray() || [],
							fields : [ "id", "descripcion" ]
						}),
						displayField : "descripcion",
						valueField : "id",
						listeners : {
							change : function() {
								var disable = this.getValue() != "1";
								Efx.utils.setDisabled("kycActividades",disable, disable);
								Efx.utils.setRequiredAndValidate("kycActividades", !disable);
							}, render: function(){
								var disable = this.getValue() != "1";
								Efx.utils.setDisabled("kycActividades",disable, disable);
								Efx.utils.setRequiredAndValidate("kycActividades", !disable);

			}
						},
						colspan : 6
					},	{
						xtype : "label",
						text : "En caso afirmativo, el cliente reportar\u00e1 su actividad a la Superintendencia General de Entidades Financieras (a-d) o a la Unidad Inteligencia" +
								"Financiera del Instituto Costarricense sobre Dorgas (f-k) de acuerdo a los formularios que se establezcan para tal fin.",
						cls : "x-form-item  label_spacing",
						width:715,
						colspan: 6
					},{
						xtype : "label",
						text : "\u00bfSe dedica a algunas de las siguientes actividades?",
						cls : "x-form-item label_spacing",
						width:500,
						colspan: 6
					},
					{
			            xtype: "checkboxgroup",
			            id: "kycActividades",
			            columns: 1,
			            autoScroll: true,
			            width:730,
			            maxWidth: 730,
			            items: config.ctgActividades || [],
			            colspan:6
			        },

					{
						xtype: "hidden",
						id: "kycPersonaExpuestaPoliticamenteId",
						name: "kycPersonaExpuestaPoliticamente.kycPersonaExpuestaPoliticamenteId"
					},
					{
						xtype: "hidden",
						id: "kycFondosTerceroId",
						name: "kycPersonaExpuestaPoliticamente.kycFondosTercerosId"
					},
//					{
//						xtype: "hidden",
//						id: "sgdUsuario",
//						name: "kycPersonaExpuestaPoliticamente.sgdUsuario.sgdUsuarioId",
//						value: config.kycPersonaExpuestaPoliticamente.sgdUsuario
//					},
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