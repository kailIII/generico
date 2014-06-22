KycAnalisisTransaccional = function(){
	return {
		saveKycProcesarPerfil: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycAnalisisTransaccionalForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycAnalisisTransaccional/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProcesarPerfil.kyc.kycId": EfxKYC.getKycId(),
    				"kycAnalisisTransaccional.kyc.kycId": EfxKYC.getKycId()

    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycProcesarPerfil.kycProcesarPerfilId", action.result.kycProcesarPerfilId);
    				Efx.utils.setValue("kycAnalisisTransaccional.kycAnalisisTransaccionalId", action.result.kycAnalisisTransaccionalId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycProcesarPerfil = config.kycProcesarPerfil.split(",");
			var kycAnalisisTransaccional = config.kycAnalisisTransaccional;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycAnalisisTransaccionalForm",
				title: "PROCESAR PERFILES",
				autoScroll: true,
				listeners: {
					render: function(){
						if(kycAnalisisTransaccional && kycAnalisisTransaccional.kycAnalisisTransaccionalId && kycAnalisisTransaccional.kycAnalisisTransaccionalId > 0){
							if(this.getForm()){
								this.getForm().setValues(kycAnalisisTransaccional);
							}
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycAnalisisTransaccionalForm");
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
								 handler: KycAnalisisTransaccional.saveKycProcesarPerfil
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
								 handler: KycAnalisisTransaccional.saveKycProcesarPerfil
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
						text: "PROCESAR PERFILES",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "Documento de identificaci\u00f3n:", cls: "x-form-item label_spacing", width: 300, colspan: 6},
					{
						xtype: "checkboxgroup",
				        items: config.ctgPrpDocumentos || [],
				        colspan: 6,
				        columns: 3,
				        vertical: true,
				        allowBlank: false,
				        width: 730
					},
			        {xtype: "label", text: "Pasaporte", cls: "x-form-item label_spacing", width: 300, colspan: 6,
			        	listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_JURIDICA){
									this.hide();
								}
							}
						}
					},

			        {
						xtype: "checkboxgroup",
				        items: config.ctgPrpPasaporte || [],
				        colspan: 6,
				        columns: 3,
				        vertical: true,
				        width: 730
					},
					{xtype: "label", text: "En caso de ser Menor de Edad:", cls: "x-form-item label_spacing", width: 300, colspan: 6,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_FISICA){
									this.hide();
								}
							}
						}
					},

			        {
						xtype: "checkboxgroup",
				        items: config.ctgPrpDocumentoMenorEdad || [],
				        colspan: 6,
				        columns: 3,
				        vertical: true,
				        width: 730
					},

			        {xtype: "label", text: "C\u00E9dula de Residencia:", cls: "x-form-item label_spacing", width: 300, colspan: 6,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_JURIDICA){
									this.hide();
								}
							}
						}
					},
			        {
			            xtype: 'checkboxgroup',
			            columns: 3,
			            width: 730,
			            items: config.ctgPrpCedulaResidencia || [],
			            vertical: true,
			            colspan:6
			        },
			        {xtype: "label", text: "Verificaci\u00f3n del domicilio", cls: "x-form-item label_spacing", width: 300, colspan: 6},
			        {
			            xtype: 'checkboxgroup',
			            columns: 3,
			            width: 770,
			            items: config.ctgPrpVerificacionDomicilio || [],
			            colspan:6
			        },

					{
						xtype : "textfield",
						id : "kycDetalleDomicilio",
						name : "kycProcesarPerfil.kycProcesarPerfilDetalles",
						maxLength : 100,
						width:500,
						fieldLabel:'Detalle',
						value: kycProcesarPerfil[0],
						colspan:6
					},
			        {xtype: "label", text: "Empadronamiento en SUGEF",cls: "x-form-item label_spacing", width: 300, colspan: 6,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_JURIDICA){
									this.hide();
								}
							}
						}
					},

					{
			        	xtype: 'checkboxgroup',
			        	columns: 2,
			        	width: 488,
			        	items: config.ctgPrpEmpadronamientoSugef || [],
			        	colspan: 6
					},
					{xtype: "label", text: "Personer\u00EDa Jur\u00EDdica",cls: "x-form-item label_spacing", width: 300, colspan: 6,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_JURIDICA){
									this.hide();
								}
							}
						}
					},

					{
			        	xtype: 'checkboxgroup',
			        	columns: 2,
			        	width: 488,
			        	items: config.ctgPrpPersoneriaJuridica || [],
			        	colspan: 6
					},
			        {xtype: "label", text: "Documentaci\u00f3n para respaldar el origen de los fondos", cls: "x-form-item label_spacing", width: 500, colspan: 6},
			        {
			            xtype: 'checkboxgroup',
			            columns: 3,
			            items: config.ctgPrpDocumentoOrigenFondos || [],
			            width: 730,
			        colspan:6
			        },
			        {
			        	fieldLabel: "Segmento: Nacional Asalariado",
			        	labelAlign: "top",
			        	labelCls: "label_spacing",
			            xtype: 'checkboxgroup',
			            columns: 3,
			            items: config.ctgPrpDocumentosAsalariado || [],
			            width: 730,
			            colspan:6,
			            listeners:{
			            	render:function(){
			            		if(Ext.isEmpty(config.ctgPrpDocumentosAsalariado))
			            				this.hide();
			            	}
			            }
			        },
			        {
			        	fieldLabel: "Segmento: Persona Dependiente",
			        	labelAlign: "top",
			        	labelCls: "label_spacing",
			            xtype: 'checkboxgroup',
			            columns: 3,
			            items: config.ctgPrpDocumentosDependiente || [],
			            width: 730,
			            colspan:6,
			            listeners:{
			            	render:function(){
			            		if(Ext.isEmpty(config.ctgPrpDocumentosDependiente))
			            				this.hide();
			            	}
			            }
			        },
			        /**
			         * Ingreso Propio
			         * **/
			        {
			        	fieldLabel: "Segmento: Persona Pensionada",
			        	labelAlign: "top",
			        	labelCls: "label_spacing",
			            xtype: 'checkboxgroup',
			            columns: 3,
			            items: config.ctgPrpDocumentosPensionado || [],
			            width: 730,
			            colspan:6,
			            listeners:{
			            	render:function(){
			            		if(Ext.isEmpty(config.ctgPrpDocumentosPensionado))
			            				this.hide();
			            	}
			            }
			        },
			        {
			        	fieldLabel: "Segmento: Persona F\u00EDsica Profesionales Independientes",
			        	labelAlign: "top",
			        	labelCls: "label_spacing",
			            xtype: 'checkboxgroup',
			            columns: 3,
			            items: config.ctgPrpDocumentosProfesional || [],
			            width: 730,
			            colspan:6,
			            listeners:{
			            	render:function(){
			            		if(Ext.isEmpty(config.ctgPrpDocumentosProfesional))
			            				this.hide();
			            	}
			            }
			        },
			        {
			        	fieldLabel: "Segmento: Persona F\u00EDsica con negocio peque\u00F1o",
			        	labelAlign: "top",
			        	labelCls: "label_spacing",
			            xtype: 'checkboxgroup',
			            columns: 3,
			            items: config.ctgPrpDocumentosNegocioPropio || [],
			            width: 730,
			            colspan:6,
			            listeners:{
			            	render:function(){
			            		if(Ext.isEmpty(config.ctgPrpDocumentosNegocioPropio))
			            				this.hide();
			            	}
			            }
			        },
			        {
			        	fieldLabel: "Segmento: General",
			        	labelAlign: "top",
			        	labelCls: "label_spacing",
			            xtype: 'checkboxgroup',
			            columns: 3,
			            items: config.ctgPrpDocumentosGeneral || [],
			            width: 730,
			            colspan:6,
			            listeners:{
			            	render:function(){
			            		if(!Ext.isEmpty(config.ctgPrpDocumentosAsalariado) 	||
			            		   !Ext.isEmpty(config.ctgPrpDocumentosDependiente) ||
			            		   !Ext.isEmpty(config.ctgPrpDocumentosPensionado) 	||
			            		   !Ext.isEmpty(config.ctgPrpDocumentosProfesional) ||
			            		   !Ext.isEmpty(config.ctgPrpDocumentosNegocioPropio) ||
			            		   Ext.isEmpty(config.ctgPrpDocumentosGeneral))
			            				this.hide();
			            	}
			            }
			        },
		{
			xtype : "textfield",
			id : "kycDetalleDocumentacion",
			name : "kycProcesarPerfil.kycProcesarPerfilDetalles",
			width:500,
			fieldLabel:'Detalles',
			value: kycProcesarPerfil[1],
			maxLength : 100,
			colspan:6,
			listeners:{
				render: function(){
					if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_JURIDICA){
						this.hide();
					}
				}
			}
		},{
			xtype: "checkboxgroup",
			fieldLabel: "Present\u00F3 listado de actividades de la empresa",
			labelWidth: 300,
			width: 730,
			defaults: {boxLabelAlign: "before"},
			items: config.ctgPrpListadoEmpresa || [],
			colspan: 6,
			listeners:{
            	render:function(){
            		if(Ext.isEmpty(config.ctgPrpDocumentosNegocioPropio))
            				this.hide();
            	}
            }
		},
		{
			xtype:"label",
			text: "Inversiones superiores a los US$500K:",
			cls: "x-form-item label_spacing",
			colspan: 6,
			listeners:{
				render: function(){
					if(EfxKYC.getCtgTipoPersonaCodigo()!=Efx.constants.codes.PERSONA_JURIDICA){
						this.hide();
					}
				}
			}
		},
		{
			xtype: "checkboxgroup",
			columns: 2,
			width: 480,
			items: config.ctgPrpInversionesSuperiores || [],
			colspan: 6
		},
		{xtype: "label", text: "\u00BFDa fe que toda la documentaci\u00f3n se\u00f1alada est\u00e1 en su poder?", cls: "x-form-item label_spacing", width: 500, colspan: 6},

        {
            xtype      : 'radiogroup',
            items      : config.ctgPrpDocumentacionPresente || [],
		colspan:6
        },

		{
		xtype : "textfield",
		id : "kycDetalleDocumentacionPoder",
		name : "kycProcesarPerfil.kycProcesarPerfilDetalles",
		width:500,
		fieldLabel:'Detalles',
		maxLength : 100,
		value: kycProcesarPerfil[2],
		colspan:6
		},
		{
			xtype: "panel",
			width: 730,
			title: "Otros Tipos de Documentos",
			headerPosition : "top",
			items:[
					{
						xtype: "checkboxgroup",
						columns: 2,
						width: 770,
						items: config.ctgPrpOtrosTiposDocumentos || [],
						colspan: 6
					}
			       ],
			 colspan: 6,
			 collapsible: true,
			 collapsed: true
		},

			        {
						xtype: "label",
						text: "ANALISIS TRANSACCIONAL",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "Vol\u00famen de ingresos seg\u00fan informaci\u00f3n financiera: US$", cls: "x-form-item label_spacing", width: 500, colspan: 6},
			        {
						xtype : "numericfield",
						id : "kycVolumenIngresos",
						value: config.volumenMensual,
						readOnly: true,
						allowBlank: false,
						maxLength : 100,
						colspan:2
					},
			        {xtype: "label", text: "Es el vol\u00famen de ingresos incluido en la secci\u00f3n de perfil transaccional", cls: "x-form-item label_spacing", width: 500, colspan: 4},
			        {xtype: "label", text: "Vol\u00famen de ingresos aproximado: US$", cls: "x-form-item label_spacing", width: 500, colspan: 6},
					{
						xtype : "numericfield",
						id : "kycAnalisisTransaccionalVolIngAprox",
						name : "kycAnalisisTransaccionalVolIngAprox",
						maxLength : 100,
						colspan:2,
						allowBlank: false,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()==Efx.constants.codes.PERSONA_FISICA){
									this.setRawValue(Ext.getCmp("kycVolumenIngresos").getRawValue());
									this.setReadOnly(true);
								}
							},
							change: function(){
								var ingresos = parseFloat(Ext.getCmp("kycVolumenIngresos").getValue());
								var ingAprox = parseFloat(this.getValue());
								if(EfxKYC.getCtgTipoPersonaCodigo()==Efx.constants.codes.PERSONA_JURIDICA){
									Ext.getCmp("kycAnalisisTransaccionalBalance").setValue();
									var balance = ingresos - ingAprox;
									if(balance <= 0){
										Ext.getCmp("kycAnalisisTransaccionalBalance").setValue((balance*(-1)));
										Ext.getCmp("kycAnalisisTransaccionalActRecomendada").setValue(ingresos);
									}else{
										Ext.getCmp("kycAnalisisTransaccionalBalance").setValue(balance);
										Ext.getCmp("kycAnalisisTransaccionalActRecomendada").setValue(ingAprox);
									}
								}
							}
						}
					},
			        {xtype: "label", text: "  Es la suma de todos los ingresos que el cliente reporta", cls: "x-form-item label_spacing", colspan: 4, width: 500},
			        {xtype: "label", text: "Balance US$", cls: "x-form-item label_spacing", colspan: 6},
			        {
						xtype : "numericfield",
						id : "kycAnalisisTransaccionalBalance",
						name : "kycAnalisisTransaccional.kycAnalisisTransaccionalBalance",
						readOnly: true,
						maxLength : 100,
						colspan:2,
						allowBlank: false,
						listeners:{
							render: function(){
								var ingresos = parseFloat(Ext.getCmp("kycVolumenIngresos").getValue());
								var ingAprox = parseFloat(Ext.getCmp("kycAnalisisTransaccionalVolIngAprox").getValue());
								if(EfxKYC.getCtgTipoPersonaCodigo()==Efx.constants.codes.PERSONA_JURIDICA){
									this.setValue();
									var balance = ingresos - ingAprox;
									if(balance <= 0){
										this.setValue((balance*(-1)));
										Ext.getCmp("kycAnalisisTransaccionalActRecomendada").setValue(ingresos);
									}else{
										this.setValue(balance);
										Ext.getCmp("kycAnalisisTransaccionalActRecomendada").setValue(ingAprox);
									}
								}
							}
						}
					},
					{xtype: "label", text: "  Es la diferencia entre ambos", cls: "x-form-item label_spacing", colspan: 4, width: 500},
				    {xtype: "label", text: "Actividad transaccional recomendada: US$", cls: "x-form-item label_spacing", colspan: 6, width: 600},					{
						xtype : "numericfield",
						id : "kycAnalisisTransaccionalActRecomendada",
						name : "kycAnalisisTransaccional.kycAnalisisTransaccionalActRecomendada",
						maxLength : 100,
						colspan:6,
						allowBlank: false,
						readOnly: true,
						listeners:{
							render: function(){
								if(EfxKYC.getCtgTipoPersonaCodigo()==Efx.constants.codes.PERSONA_FISICA){
									this.setRawValue(Ext.getCmp("kycVolumenIngresos").getRawValue());
								}
							}
						}
					},

				    {xtype: "label", text: "  Es el monto de menor riesgo entre vol\u00famen de ingresos seg\u00fan informaci\u00f3n financiera y vol\u00famen de ingresos aproximados", cls: "x-form-item label_spacing", width: 690, colspan: 6},
					{xtype: "label", text: "Indique c\u00f3mo obtuvo el monto anterior (con qu\u00e9 rubro hizo el c\u00e1lculo/Describa el procedimiento):", cls: "x-form-item label_spacing", colspan: 6, width: 600},

					{
						xtype : "textfield",
						id : "kycAnalisisTransaccionalProcedimiento",
						name : "kycAnalisisTransaccional.kycAnalisisTransaccionalProcedimiento",
						maxLength : 250,
						allowBlank: false,
						width: 600,
						colspan:6
					},
					{
						xtype: "hidden",
						id: "kycAnalisisTransaccionalId",
						name: "kycAnalisisTransaccional.kycAnalisisTransaccionalId"
					},
					{
						xtype: "hidden",
						id: "kycProcesarPerfilId",
						name: "kycProcesarPerfil.kycProcesarPerfilId"
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