KycFactoresCalificacion = function(){
	return {
		saveKycFactoresCalificacion: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycFactoresCalificacionForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycFactoresCalificacion/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycFactoresCalificacion.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycFactoresCalificacion.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycFactorCalificacionRiesgoId", action.result.kycFactoresCalificacionId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycFactoresCalificacion = config.kycFactoresCalificacion;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycFactoresCalificacionForm",
				title: "INFORMACI\u00d3N REQUERIDA PARA CALIFICACI\u00d3N DE RIESGO",
				autoScroll: true,
				listeners: {
					render: function(){
						if(kycFactoresCalificacion && kycFactoresCalificacion.kycFactorCalificacionRiesgoId && kycFactoresCalificacion.kycFactorCalificacionRiesgoId > 0){
							if(this.getForm()){
								this.getForm().setValues(kycFactoresCalificacion);
							}
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycFactoresCalificacionForm");
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
								 handler: KycFactoresCalificacion.saveKycFactoresCalificacion
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
								 handler: KycFactoresCalificacion.saveKycFactoresCalificacion
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
						text: "INFORMACI\u00d3N REQUERIDA PARA LA CALIFICACI\u00d3N DEL RIESGO",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label",text: "Tipo de Persona", cls: "x-form-item label_spacing", colspan: 6},
			        {
						id: "ctgTipoPersona",
			            xtype: 'checkboxgroup',
			            columns: 3,
			            items: config.ctgTipoPersona || [],
			            width: 730,
			            colspan:6,
			            allowBlank: false
			        },
			        {xtype: "label",text: "Productos y Servicios", cls: "x-form-item label_spacing", colspan: 6},
			        {
			            xtype: 'checkboxgroup',
			            columns: 3,
			        	items: config.ctgProductoServicio || [],
				        width: 730,
			            colspan:6,
			            allowBlank: false
			        },
			        {xtype: "label",text: "Actividades", cls: "x-form-item label_spacing", colspan: 6},
			        {
						xtype : "combo",
						id : "ctgActividad",
						name : "kycFactoresCalificacion.ctgActividad.ctgCatalogoId",
						fieldClass : "x-item-disabled",
						store : new Ext.data.SimpleStore({
							data : config.ctgActividades || [],
							fields : [ "ctgActividadesId",
									"ctgActividadesNombre" ]
						}),
						displayField : "ctgActividadesNombre",
						valueField : "ctgActividadesId",
						width: 730,
						allowBlank: false,
						colspan: 6
					},
			        {xtype: "label",text: "Estimaci\u00f3n de Ingresos", cls: "x-form-item label_spacing", colspan: 6},
			        {
						id: "ctgEstimadoIngreso",
			            xtype: 'radiogroup',
			            columns: 4,
			            allowBlank: false,
			            items: config.ctgEstimacionIngreso || [],
			            width: 730,
			            colspan:6
			        },
			        {xtype: "label",text: "Vol\u00famen Mensual estimado de operatoria de Tarjetas de Cr\u00E9dito", cls: "x-form-item label_spacing", width: 600, colspan: 6},
			        {
			        	id: "ctgEstimadoIngresoTarjetaCredito",
			            xtype: 'radiogroup',
			            columns: 4,
			            allowBlank: false,
			            items: config.ctgVolumenMensualCredito || [],
			            width: 730,
			            colspan:6
			        },
			        {xtype: "label",text: "Vol\u00famen Mensual estimado de operatoria en Productos Bancarios (Pasivos)", width: 600, cls: "x-form-item label_spacing", colspan: 6},
			        {
			        	id: "ctgEstimadoIngresoBanca",
			            xtype: 'radiogroup',
			            columns: 4,
			            allowBlank: false,
			            items: config.ctgVolumenMensualBanco || [],
			            width: 730,
			            colspan:6
			        },
			        {xtype: "label",text: "Variables cr\u00edticas del Riesgo del Cliente", width: 600, cls: "x-form-item label_spacing", colspan: 6},
			        {
			            xtype: 'checkboxgroup',
			            columns: 1,
			        	items: config.ctgVariables || [],
				        width: 700,
			            colspan:6,
			            allowBlank: false
			        },
					{
						xtype: "hidden",
						id: "kycFactorCalificacionRiesgoId",
						name: "kycFactoresCalificacion.kycFactorCalificacionRiesgoId"
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