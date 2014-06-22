KycSeccionProductos = function(){
	return {
		saveKycSeccionProductos: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycSeccionProductosForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycSeccionProductos/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycDeudor.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycDeudor.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycFiador.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycFiador.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycDeudorId", action.result.kycDeudorId);
    				Efx.utils.setValue("kycFiadorId", action.result.kycFiadorId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},findFromBureau: function(){
			Efx.message.progress("Buscando en Bureau...");
			if(Ext.isEmpty(Efx.utils.getValue("kycDeudorCedulaConyuge"))){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycSeccionProductos/findFromBureau",
				params: {
					kycPersonaFisicaDocumento1: Efx.utils.getValue("kycDeudorCedulaConyuge"),
					kycDeudorId :Efx.utils.getValue("kycDeudorId"),
					kycFiadorId :Efx.utils.getValue("kycFiadorId"),
					tipoBoton : "1",
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId()

				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycDeudorNombreConyuge").setValue(jsonObject.kycDeudorNombreConyuge);
						Ext.getCmp("kycDeudorTelefono2Conyuge").setValue(jsonObject.kycDeudorTelefono2Conyuge);
						Ext.getCmp("kycDeudorTelefono3Conyuge").setValue(jsonObject.kycDeudorTelefono3Conyuge);
						Efx.message.alert(jsonObject.message);
					}
				}
			});
		},
		findFromBureauFiador: function(){
			Efx.message.progress("Buscando en Bureau...");
			if(Ext.isEmpty(Efx.utils.getValue("kycFiadorCedula"))){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycSeccionProductos/findFromBureau",
				params: {
					kycPersonaFisicaDocumento1: Efx.utils.getValue("kycFiadorCedula"),
					kycDeudorId :Efx.utils.getValue("kycDeudorId"),
					kycFiadorId :Efx.utils.getValue("kycFiadorId"),
					tipoBoton : "2",
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId()

				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycFiadorNombre").setValue(jsonObject.kycFiadorNombre);
						Efx.message.alert(jsonObject.message);
					}
				}
			});
		},
		init: function(config){
			var kycDeudor = config.kycDeudor;
			var kycFiador = config.kycFiador;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycSeccionProductosForm",
				title: "SECCI\u00d3N DE PRODUCTOS - DATOS GENERALES",
				autoScroll: true,
				listeners: {
					render: function(){
						if((kycDeudor && kycDeudor.kycDeudorId && kycDeudor.kycDeudorId > 0)
								&& (kycFiador && kycFiador.kycFiadorId && kycFiador.FiadorId > 0)){
							if(this.getForm()) this.getForm().setValues(kycDeudor);
							if(this.getForm()) this.getForm().setValues(kycFiador);
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycSeccionProductosForm");
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
								 handler: KycSeccionProductos.saveKycSeccionProductos
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
								 handler: KycSeccionProductos.saveKycSeccionProductos
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
			        },{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "label",
						text: "DATOS DEL DEUDOR",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: "Condici\u00f3n de vivienda", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Si es hipotecada indique la entidad", cls: "x-form-item label_spacing", colspan: 4},
					{
						xtype: "combo",
						id: "kycDeudor.ctgDeudorCondicionViviendaId",
						name: "kycDeudor.ctgDeudorCondicionVivienda.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgDeudorCondicionVivienda || [],
							fields: ["ctgCondicionViviendaId", "ctgCondicionViviendaNombre"]
						}),
						displayField: "ctgCondicionViviendaNombre",
						valueField: "ctgCondicionViviendaId",
						value: kycDeudor.ctgDeudorCondicionViviendaId,
						colspan: 2
					},
					{
						xtype : "textfield",
						id : "kycDeudorEntidadHipoteca",
						name : "kycDeudor.kycDeudorEntidadHipoteca",
						maxLength : 100,
						value: kycDeudor.kycDeudorEntidadHipoteca,
						width: 480,
						colspan:4
					},
					{xtype: "label", text: "\u00bfEs empleado de Davivienda?", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Tipo de empleador", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Grado acad\u00e9mico", cls: "x-form-item label_spacing", colspan: 2},

					{
						xtype : "combo",
						id : "kycDeudorEmpleadoDavivienda",
						name : "kycDeudor.kycDeudorEmpleadoDavivienda",
						store : new Ext.data.SimpleStore({
							data : Efx.combos.yesnoArray() || [],
							fields : [ "id", "descripcion" ]
						}),
						displayField : "descripcion",
						valueField : "id",
						value: kycDeudor.kycDeudorEmpleadoDavivienda,
						allowBlank : false,
						colspan : 2
					},
					{
						xtype: "combo",
						id: "ctgDeudorTipoEmpleadorId",
						name: "kycDeudor.ctgDeudorTipoEmpleador.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgDeudorTipoEmpleador || [],
							fields: ["ctgDeudorTipoEmpleadorId", "ctgDeudorTipoEmpleadorNombre"]
						}),
						displayField: "ctgDeudorTipoEmpleadorNombre",
						valueField: "ctgDeudorTipoEmpleadorId",
						value: kycDeudor.ctgDeudorTipoEmpleadorId,
						colspan:2
					},
					{
						xtype: "combo",
						id: "ctgDeudorGradoAcademicoId",
						name: "kycDeudor.ctgDeudorGradoAcademico.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgDeudorGradoAcademico || [],
							fields: ["ctgDeudorGradoAcademicoId", "ctgDeudorGradoAcademicoNombre"]
						}),
						displayField: "ctgDeudorGradoAcademicoNombre",
						valueField: "ctgDeudorGradoAcademicoId",
						value: kycDeudor.ctgDeudorGradoAcademicoId,
						colspan:2
					},
					{xtype: "label", text: "Tipo de documento", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "C\u00e9dula de c\u00f3nyuge", cls: "x-form-item label_spacing", colspan: 4},
					{
						xtype: "combo",
						id: "ctgTipoDocumentoDeudor",
						name: "kycDeudor.ctgTipoDocumentoDeudor.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgTipoDocumentoDeudor || [],
							fields: ["ctgTipoDocumentoDeudorId", "ctgTipoDocumentoDeudorNombre"]
						}),
						displayField: "ctgTipoDocumentoDeudorNombre",
						valueField: "ctgTipoDocumentoDeudorId",
						value: kycDeudor.ctgTipoDocumentoDeudor,
						colspan: 2,
							listeners : {
								change : function() {
										var valor = this.getValue();
										if(valor == 639) {
											Ext.getCmp("validar").disable();
										}
										else {
												Ext.getCmp("kycDeudorCedulaConyuge").vtype = "CedNac";
												Ext.getCmp("validar").enable();
												}
									}
								}
					},{
						xtype : "textfield",
						id : "kycDeudorCedulaConyuge",
						name : "kycDeudor.kycDeudorCedulaConyuge",
						maxLength : 20,
						minLength:9,
						value: kycDeudor.kycDeudorCedulaConyuge,
						colspan:2
					},
					{
	                    xtype: 'button',
	                    id: "validar",
	                    text: 'VALIDAR C\u00c9DULA',
	                    colspan:2,
	                    handler: KycSeccionProductos.findFromBureau
	                },
					{xtype: "label", text: "Nombre de c\u00f3nyuge", cls: "x-form-item label_spacing", colspan:6},
					 {
						xtype : "textfield",
						id : "kycDeudorNombreConyuge",
						name : "kycDeudor.kycDeudorNombreConyuge",
						value: kycDeudor.kycDeudorNombreConyuge,
						maxLength : 120,
						width:465,
						colspan:6
					},

					{xtype: "label", text: "Tel\u00e9fono de trabajo", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Tel\u00e9fono de residencia", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Tel\u00e9fono celular", cls: "x-form-item label_spacing", colspan: 2},
					{
						xtype : "textfield",
						id : "kycDeudorTelefono1Conyuge",
						name : "kycDeudor.kycDeudorTelefono1Conyuge",
						value: kycDeudor.kycDeudorTelefono1Conyuge,
						maxLength : 8,
						minLength:8,
						vtype: "telefono",
						colspan:2
					},
					{
						xtype : "textfield",
						id : "kycDeudorTelefono2Conyuge",
						name : "kycDeudor.kycDeudorTelefono2Conyuge",
						value: kycDeudor.kycDeudorTelefono2Conyuge,
						maxLength : 8,
						minLength:8,
						vtype: "telefono",
						colspan:2
					},
					{
						xtype : "textfield",
						id : "kycDeudorTelefono3Conyuge",
						name : "kycDeudor.kycDeudorTelefono3Conyuge",
						value: kycDeudor.kycDeudorTelefono3Conyuge,
						maxLength : 8,
						minLength:8,
						vtype: "telefono",
						colspan:2
					},

			        {xtype: "label", text: "Hijos mayores a 21 a\u00f1os", cls: "x-form-item label_spacing", colspan: 2},
			        {xtype: "label", text: "Hijos menores a 21 a\u00f1os", cls: "x-form-item label_spacing", colspan: 4},
			        {
						xtype: "combo",
						id: "ctgDeudorHijosMayoresId",
						name: "kycDeudor.ctgDeudorHijosMayores.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgDeudorHijosMayores || [],
							fields: ["ctgDeudorHijosMayoresId", "ctgDeudorHijosMayoresNombre"]
						}),
						displayField: "ctgDeudorHijosMayoresNombre",
						valueField: "ctgDeudorHijosMayoresId",
						value: kycDeudor.ctgDeudorHijosMayoresId,
							colspan: 2
					},
					{
						xtype: "combo",
						id: "ctgDeudorHijosMenoresId",
						name: "kycDeudor.ctgDeudorHijosMenores.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgDeudorHijosMenores || [],
							fields: ["ctgDeudorHijosMenoresId", "ctgDeudorHijosMenoresNombre"]
						}),
						displayField: "ctgDeudorHijosMenoresNombre",
						valueField: "ctgDeudorHijosMenoresId",
						value: kycDeudor.ctgDeudorHijosMenoresId,
						colspan: 4
					},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "label",
						text: "DATOS DEL FIADOR O CODEUDOR",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 6},
					{xtype: "label", text: "Tipo de documento", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "N\u00famero de c\u00e9dula", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "combo",
						id: "ctgTipoDocumentoFiador",
						name: "kycFiador.ctgTipoDocumentoFiador.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgTipoDocumentoFiador || [],
							fields: ["ctgTipoDocumentoFiadorId", "ctgTipoDocumentoFiadorNombre"]
						}),
						displayField: "ctgTipoDocumentoFiadorNombre",
						valueField: "ctgTipoDocumentoFiadorId",
						value: kycFiador.ctgTipoDocumentoFiador,
						colspan: 2,
						listeners : {
								change : function() {
										var valor = this.getValue();
										if(valor == 639) {
											Ext.getCmp("validar2").disable();
										}
										else {
												Ext.getCmp("kycFiadorCedula").vtype = "CedNac";
												Ext.getCmp("validar2").enable();
												}
									}
								}
					},{
						xtype : "textfield",
						id : "kycFiadorCedula",
						name : "kycFiador.kycFiadorCedula",
						value: kycFiador.kycFiadorCedula,
						maxLength : 20,
						minLenth:9,
						colspan:2
					},
					{
	                    xtype: 'button',
	                    id: "validar2",
	                    text: 'VALIDAR C\u00c9DULA',
	                    colspan:4,
	                    handler :KycSeccionProductos.findFromBureauFiador
	                },
	                {xtype: "label", text: "Nombre completo", cls: "x-form-item label_spacing", colspan: 4},
	            	{xtype: "label", text: "Condici\u00f3n", cls: "x-form-item label_spacing", colspan: 2},
					  {
						xtype : "textfield",
						id : "kycFiadorNombre",
						value: kycFiador.kycFiadorNombre,
						name : "kycFiador.kycFiadorNombre",
						maxLength : 120,
						width:465,
						colspan:4
					},

					{
						xtype: "combo",
						id: "ctgFiadorCondicionId",
						name: "kycFiador.ctgFiadorCondicion.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgFiadorCondicion || [],
							fields: ["ctgFiadorCondicionId", "ctgFiadorCondicionNombre"]
						}),
						displayField: "ctgFiadorCondicionNombre",
						valueField: "ctgFiadorCondicionId",
						value: kycFiador.ctgFiadorCondicionId,
							colspan:2
					},

					{xtype: "label", text: "Condici\u00f3n de vivienda", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Si es hipotecada indique la entidad", cls: "x-form-item label_spacing", colspan: 4},
					{
						xtype: "combo",
						id: "ctgFiadorCondicionViviendaId",
						name: "kycFiador.ctgFiadorCondicionVivienda.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgFiadorCondicionVivienda || [],
							fields: ["ctgCondicionViviendaId", "ctgCondicionViviendaNombre"]
						}),
						displayField: "ctgCondicionViviendaNombre",
						valueField: "ctgCondicionViviendaId",
						value: kycFiador.ctgFiadorCondicionViviendaId,
						colspan: 2
					},{
						xtype: "textfield",
						id: "kycFiadorEntidadHipoteca",
						name: "kycFiador.kycFiadorEntidadHipoteca",
						value: kycFiador.kycFiadorEntidadHipoteca,
						allowBlank: false,
						maxLength: 120,
						width:480,
						colspan: 4,
					},
					{xtype: "label", text: "\u00bfEs empleado de Davivienda?", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Tipo de empleador", cls: "x-form-item label_spacing", colspan: 2},
					{xtype: "label", text: "Grado acad\u00e9mico", cls: "x-form-item label_spacing", colspan: 2},
					{
						xtype : "combo",
						id : "kycFiadorEmpleadoDavivienda",
						name : "kycFiador.kycFiadorEmpleadoDavivienda",
						store : new Ext.data.SimpleStore({
							data : Efx.combos.yesnoArray() || [],
							fields : [ "id", "descripcion" ]
						}),
						displayField : "descripcion",
						valueField : "id",
						value: kycFiador.kycFiadorEmpleadoDavivienda,
						allowBlank : false,
						colspan : 2
					},
					{
						xtype: "combo",
						id: "ctgFiadorTipoEmpleadorId",
						name: "kycFiador.ctgFiadorTipoEmpleador.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgFiadorTipoEmpleador || [],
							fields: ["ctgFiadorTipoEmpleadorId", "ctgFiadorTipoEmpleadorNombre"]
						}),
						displayField: "ctgFiadorTipoEmpleadorNombre",
						valueField: "ctgFiadorTipoEmpleadorId",
						value: kycFiador.ctgFiadorTipoEmpleadorId,
						colspan:2
					},{
						xtype: "combo",
						id: "ctgFiadorGradoAcademicoId",
						name: "kycFiador.ctgFiadorGradoAcademico.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgFiadorGradoAcademico || [],
							fields: ["ctgFiadorGradoAcademicoId", "ctgFiadorGradoAcademicoNombre"]
						}),
						displayField: "ctgFiadorGradoAcademicoNombre",
						valueField: "ctgFiadorGradoAcademicoId",
						value: kycFiador.ctgFiadorGradoAcademicoId,
						colspan:2
					},
			        {xtype: "label", text: "Hijos mayores a 21 a\u00f1os", cls: "x-form-item label_spacing", colspan: 2},
			        {xtype: "label", text: "Hijos menores a 21 a\u00f1os", cls: "x-form-item label_spacing", colspan: 4},
			        {
						xtype: "combo",
						id: "ctgFiadorHijosMayoresId",
						name: "kycFiador.ctgFiadorHijosMayores.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgFiadorHijosMayores || [],
							fields: ["ctgFiadorHijosMayoresId", "ctgFiadorHijosMayoresNombre"]
						}),
						displayField: "ctgFiadorHijosMayoresNombre",
						valueField: "ctgFiadorHijosMayoresId",
						value: kycFiador.ctgFiadorHijosMayoresId,
							colspan:2
					},{
						xtype: "combo",
						id: "ctgFiadorHijosMenoresId",
						name: "kycFiador.ctgFiadorHijosMenores.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgFiadorHijosMenores || [],
							fields: ["ctgFiadorHijosMenoresId", "ctgFiadorHijosMenoresNombre"]
						}),
						displayField: "ctgFiadorHijosMenoresNombre",
						valueField: "ctgFiadorHijosMenoresId",
						value: kycFiador.ctgFiadorHijosMenoresId,
						colspan: 4
					},{
						xtype: "hidden",
						id: "kycDeudorId",
						name: "kycDeudor.kycDeudorId",
						value: kycDeudor.kycDeudorId
					},{
						xtype: "hidden",
						id: "kycFiadorId",
						name: "kycFiador.kycFiadorId",
						value: kycFiador.kycFiadorId
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