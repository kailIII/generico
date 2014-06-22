KycLaboralIngresosPropios = function(){
	var configWindow = {
		add: "kycLaboralIngresosPropiosAgregarTop",
		edit: "kycLaboralIngresosPropiosEditarTop",
		save: "kycLaboralIngresosPropiosGuardarTop",
		remove: "kycLaboralIngresosPropiosEliminarTop",
		grid: "kycLaboralIngresosPropiosGrid",
		form: "kycLaboralIngresosPropiosForm"
	};
	var configWindowBottom = {
			add: "kycLaboralIngresosPropiosAgregarBottom",
			edit: "kycLaboralIngresosPropiosEditarBottom",
			save: "kycLaboralIngresosPropiosGuardarBottom",
			remove: "kycLaboralIngresosPropiosEliminarBottom"
	};
	return {
		agregarLaboralIngresosPropios: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarLaboralIngresosPropios: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarLaboralIngresosPropios: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycLaboral/delete",
					params: {
						kycLaboralId: Efx.utils.getValue("kycLaboralIngresosPropiosId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoLaboral : Efx.constants.codes.LABORAL_INGRESOS_PROPIOS
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycLaboralIngresosPropiosForm");
								if(jsonObject.kycLaboralIngresosPropios){
			    					Ext.getCmp("kycLaboralIngresosPropiosGrid").getStore().loadData(jsonObject.kycLaboralIngresosPropios);
								}
								return;
							}
							jsonObject = jsonObject || {};
							Efx.message.alertInvalid(jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE);
							return;
						}
						Efx.message.alertInvalid(Efx.constants.DEFAULT_ERROR_MESSAGE);
					}
				});
			});
		},
		guardarLaboralIngresosPropios: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycLaboralIngresosPropiosForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycLaboral/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycLaboralIngresosPropios.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycLaboralIngresosPropios.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycLaboralIngresosPropios.ctgTipoLaboral.ctgCatalogoId" :Efx.constants.codes.LABORAL_INGRESOS_PROPIOS,
    				 kycTipoLaboral : Efx.constants.codes.LABORAL_INGRESOS_PROPIOS,
    				 tipoDocumento: Efx.utils.getValue("ctgTipoDocumento.ctgCatalogoId"),
    				 esTransaccion : Efx.utils.getValue("esTransaccion")

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycLaboralIngresosPropiosForm", true);
    				if(action.result.kycLaboralIngresosPropios){
    					Ext.getCmp("kycLaboralIngresosPropiosGrid").getStore().loadData(action.result.kycLaboralIngresosPropios);
    					Ext.getCmp("kycLaboralIngresosPropiosGrid").getSelectionModel().select(action.result.kycLaboralAsalariadoIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},findFromBureau: function(){
			Efx.message.progress("Buscando en Bureau...");
			if(Ext.isEmpty(Efx.utils.getValue("kycLaboralNumeroCed1Id"))){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycLaboral/findFromBureau",
				params: {
					kycPersonaFisicaDocumento1: Efx.utils.getValue("kycLaboralNumeroCed1Id"),
					tipoLaboral : Efx.constants.codes.LABORAL_INGRESOS_PROPIOS,
					tipoBoton : "1",
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
    				tipoLaboral :Efx.constants.codes.LABORAL_INGRESOS_PROPIOS,
    				kycLaboralId :Efx.utils.getValue("kycLaboralIngresosPropiosId"),
    				kycTipoPersona : Efx.utils.getValue("ctgTipoDocumento.ctgCatalogoId")
				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycLaboralNombre1").setValue(jsonObject.kycLaboralNombres);
						Ext.getCmp("ctgPais").setValue(jsonObject.ctgPais);
						Ext.getCmp("ctgProvincia").setValue(jsonObject.ctgProvincia);
						Ext.getCmp("ctgCanton").setValue(jsonObject.ctgCanton);
						Ext.getCmp("ctgDistrito").setValue(jsonObject.ctgDistrito);
						Ext.getCmp("kycLaboralTelefono1").setValue(jsonObject.kycLaboralTelefono1);
						Ext.getCmp("kycLaboralDireccion").setValue(jsonObject.kycLaboralDireccion);
						Ext.getCmp("kycLaboralSalAprox").setValue(jsonObject.kycLaboralSalAprox);
						Ext.getCmp("kycLaboralCodigoTransaccion").setValue(jsonObject.kycLaboralCodigoTransaccion);
						Ext.getCmp("esTransaccion").setValue("1");
						Efx.message.alert(jsonObject.message);
					}
				}
			});
		},
		init: function(config){
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				flex: 1,
				title: "DATOS LABORALES",
				autoScroll: true,
				xtype: "panel",
				layout: {
				    type: "vbox",
				    align : "center",
				    pack  : "start"
				},
				defaults: {width: 800, margins: "5 0 5 0"},
				dockedItems: [
					{
						xtype: "toolbar",
						dock: "top",
						hidden: EfxKYC.getKycVigente() === false,
						items: [
						   '->',
						   {
							   text: "Nuevo",
							   id: "kycLaboralIngresosPropiosAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycLaboralIngresosPropios.agregarLaboralIngresosPropios
						   },{
					    	   text: "Editar",
					    	   id: "kycLaboralIngresosPropiosEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycLaboralIngresosPropios.editarLaboralIngresosPropios
					       },{
					    	   text: "Guardar",
					    	   id: "kycLaboralIngresosPropiosGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycLaboralIngresosPropios.guardarLaboralIngresosPropios
					       },{
					    	   text: "Eliminar",
					    	   id: "kycLaboralIngresosPropiosEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycLaboralIngresosPropios.eliminarLaboralIngresosPropios
					       }
					    ]
					},{
			        	xtype: "toolbar",
			        	dock: "bottom",
			        	hidden: EfxKYC.getKycVigente() === false,
			        	bodyStyle: "border: solid",
			        	items: [
			        	   '->',
			        	   {
							   text: "Nuevo",
							   id: "kycLaboralIngresosPropiosAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycLaboralIngresosPropios.agregarLaboralIngresosPropios
						   },{
					    	   text: "Editar",
					    	   id: "kycLaboralIngresosPropiosEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycLaboralIngresosPropios.editarLaboralIngresosPropios
					       },{
					    	   text: "Guardar",
					    	   id: "kycLaboralIngresosPropiosGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycLaboralIngresosPropios.guardarLaboralIngresosPropios
					       },{
					    	   text: "Eliminar",
					    	   id: "kycLaboralIngresosPropiosEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycLaboralIngresosPropios.eliminarLaboralIngresosPropios
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycLaboralIngresosPropiosGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycLaboralIngresosPropios || [],
					    	fields: [
								"kycLaboralIngresosPropios.kycLaboralId",
								"kycLaboralIngresosPropios.kycLaboralDireccion",
								"kycLaboralIngresosPropios.kycLaboralNombre1",
								"kycLaboralIngresosPropios.kycLaboralTelefono1",
								"kycLaboralIngresosPropios.kycLaboralTelefono2",
								"kycLaboralIngresosPropios.kycLaboralTelefono3",
								"kycLaboralIngresosPropios.kycLaboralTelefono4",
								"kycLaboralIngresosPropios.kycLaboralNumeroCed1",
								"kycLaboralIngresosPropios.kycLaboralFechaIngreso",
								"kycLaboralIngresosPropios.kycLaboralAnios",
								"kycLaboralIngresosPropios.kycLaboralMeses",
								"kycLaboralIngresosPropios.kycLaboralEmail1",
								"kycLaboralIngresosPropios.kycLaboralEmail2",
								"kycLaboralIngresosPropios.kycLaboralSalAprox",
								"kycLaboralIngresosPropios.kycLaboralOtro",
								"kycLaboralIngresosPropios.kycLaboralDetalle",
								"kycLaboralIngresosPropios.kycLaboralNombres",
								"kycLaboralIngresosPropios.kycLaboralPrimerApellido",
								"kycLaboralIngresosPropios.kycLaboralSegundoApellido",
								"kycLaboralIngresosPropios.kycLaboralFechaNacimiento",
								"kycLaboralIngresosPropios.kycLaboralApartado",
								"kycLaboralIngresosPropios.kycLaboralTitular",
								"kycLaboralIngresosPropios.kycLaboralParentesco",
								"kycLaboralIngresosPropios.kycLaboralCiudadNacimiento",
								"kycLaboralIngresosPropios.kycLaboralPantallaBusqueda",
								"kycLaboralIngresosPropios.kycLaboralMemo",
								"kycLaboralIngresosPropios.kycFechaActualizacion",
								"ctgActividadEconomica.ctgCatalogoId",
								"ctgSubActividadEconomica.ctgCatalogoId",
								"ctgTipoDocumento.ctgCatalogoId",
								"ctgSubTipoDocumento.ctgCatalogoId",
								"ctgProfesiones.ctgCatalogoId",
								"ctgPais.ctgPaisId",
								"ctgProvincia.ctgProvinciaId",
								"ctgCanton.ctgCantonId",
								"ctgDistrito.ctgDistritoId",
								"ctgPoblado.ctgPobladoId",
								"ctgNacionalidad.ctgPaisId",
								"ctgPaisNacimiento.ctgPaisId",
								"ctgEstadoCivil.ctgCatalogoId",
								"ctgGenero.ctgCatalogoId",
								"ctgResultadoInvestigacion.ctgCatalogoId",
								"kycLaboralIngresosPropios.kycLaboralCodigoTransaccion",
								"kycLaboralIngresosPropios.kycLaboralCodigoReferencia"

			    	        ]
					    }),
					    columns: [
					        {header: "Nombre de Patrono",  dataIndex: "kycLaboralIngresosPropios.kycLaboralNombre1", flex: 2, minWidth: 200},
						    {header: "Salario Aproximado",  dataIndex: "kycLaboralIngresosPropios.kycLaboralSalAprox", format:'0,000.00',xtype: 'numbercolumn',flex:1, width: 100}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycLaboralIngresosPropiosForm", record.data);
					    			Efx.form.setDisable("kycLaboralIngresosPropiosForm");
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    	} }
					},{
			        	xtype: "form",
						id: "kycLaboralIngresosPropiosForm",
						flex: 1,
					    border: false,
					    autoScroll: true,
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
							selectOnFocus: true,
							enforceMaxLength: true,
							maxLength: 200,
							typeAhead: true,
							minChars: 1,
							queryMode: "local",
							forceSelection: true,
							allowEnable: true,
							colspan:2
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
								text: "INGRESOS PROPIOS",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label", text: "Tipo de C\u00e9dula ", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", text: "N\u00famero de C\u00e9dula", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype: "combo",
								id: "ctgTipoDocumento.ctgCatalogoId",
								name: "kycLaboralIngresosPropios.ctgTipoDocumento.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoDocumentoAsalariado || [],
									fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre"]
								}),
								displayField: "ctgTipoDocumentoNombre",
								valueField: "ctgTipoDocumentoId",
								colspan: 2,
								allowBlank: false,
								listeners : {
									change : function() {
											var dis= this.getValue();
											if(dis == 634) {
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;
												Ext.getCmp("validarCedulaButton").disable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = true;
												Ext.getCmp("kycLaboralNumeroCed1Id").setValue(" ");
											}
											else if (dis== 632){
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedJur";
												Ext.getCmp("validarCedulaButton").enable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
											}
											else if (dis == 633)
												{
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedNac";
												Ext.getCmp("validarCedulaButton").enable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
												}
											else{
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;
												Ext.getCmp("validarCedulaButton").disable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
											}

									},
										render : function() {
											var dis = this.getValue();
											if(dis == 634) {
												Ext.getCmp("validarCedulaButton").disable();
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = true;
											}
											else if (dis == 632){
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedJur";
												Ext.getCmp("validarCedulaButton").enable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
											}
											else if (dis == 633)
												{
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedNac";
												Ext.getCmp("validarCedulaButton").enable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
												}
											else{
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;
												Ext.getCmp("validarCedulaButton").disable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
											}
										}
								}
							},{
								xtype: "textfield",
								id : "kycLaboralNumeroCed1Id",
								name: "kycLaboralIngresosPropios.kycLaboralNumeroCed1",
								maxLength : 20,
								allowBlank: false,
								colspan: 2
							},{
			                    xtype: 'button',
			                    id: "validarCedulaButton",
			                    text: 'VALIDAR C\u00c9DULA',
			                    colspan:2,
			                    handler: KycLaboralIngresosPropios.findFromBureau
			                },
			                {xtype: "label",  text: "Actividad Econ\u00f3mica", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label",  text: "Detalle", cls: "x-form-item label_spacing", colspan:4},
							{
								xtype: "combo",
								id: "ctgActividadEconomica.ctgCatalogoId",
								name: "kycLaboralIngresosPropios.ctgActividadEconomica.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgActividadEconomica || [],
									fields: ["ctgCatalogoId", "ctgCatalogoNombre", "ctgCatalogoPadre", "ctgCatalogoHijo"]
								}),
								displayField: "ctgCatalogoNombre",
								valueField: "ctgCatalogoId",
								allowBlank: false,
								listConfig : {minWidth : 400},
								colspan: 2
							},
							{
								xtype:"textfield",
								id: "kycLaboralDetalle",
								name:"kycLaboralIngresosPropios.kycLaboralDetalle",
								width:480,
								allowBlank: false,
								maxLength : 250,
								colspan:4
							},
							{xtype: "label",text: "Nombre de Patrono", cls: "x-form-item label_spacing", colspan:4},
							{xtype: "label", text: "Ocupaci\u00f3n", cls: "x-form-item label_spacing", colspan:2},
							{
								xtype: "textfield",
								id : "kycLaboralNombre1",
								name: "kycLaboralIngresosPropios.kycLaboralNombre1",
								allowBlank: false,
								width:470,
								maxLength: 120,
								colspan:4
							},{
								xtype : "combo",
								id : "ctgProfesiones",
								name : "ctgProfesiones.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgProfesiones || [],
									fields : [ "ctgProfesionesId", "ctgProfesionesNombre" ]
								}),
								displayField : "ctgProfesionesNombre",
								valueField : "ctgProfesionesId",
								allowBlank: false,
								listConfig : {minWidth : 350}
							},
							{xtype: "label", text: "Fecha de Ingreso", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label",text: "Tiempo de Laborar (A\u00f1os/Meses)", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", text: "Salario Aproximado", cls: "x-form-item label_spacing", colspan:2},
							{
								xtype : "datefield",
								id: "kycLaboralFechaIngreso",
								name : "kycLaboralIngresosPropios.kycLaboralFechaIngreso",
								submitFormat : "Ymd",
								maxValue : new Date(),
								altFormats: "Ymd|d/m/Y",
								allowBlank : false,
								listeners:{
	        						change: function(field, nValue, oValue, opts){
	        							if(!field.isValid() || this.getValue()==null)return;
	        							var json = Efx.utils.getJSONAnosMeses(Ext.Date.format(nValue, "d/m/Y"));
	        							Efx.utils.setValue("kycLaboralAnios",json.anos);
	        							Efx.utils.setValue("kycLaboralMeses",json.meses);
	        						}}
							},{
								xtype:"numberfield",
								name:"kycLaboralIngresosPropios.kycLaboralAnios",
								allowDecimals: false,
								maxLength: 10,
								value:0,
								minValue: 0,
								readOnly: true,
								hideTrigger: true,
								id: "kycLaboralAnios",
								width:100,
								colspan:1,
								listeners : {
									change : function() {
										var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycLaboralAnios"))
										&& Ext.isEmpty(Efx.utils.getValue("kycLaboralMeses"));
								Efx.utils.setRequiredAndValidate("kycLaboralAnios",isEmpty);
								Efx.utils.setRequiredAndValidate("kycLaboralMeses",isEmpty);
									}}
							},{
								xtype:"numberfield",
								id: "kycLaboralMeses",
								name:"kycLaboralIngresosPropios.kycLaboralMeses",
								allowBlank: false,
								allowDecimals: false,
								hideTrigger: true,
								readOnly: true,
								value:0,
								maxValue: 11,
								minValue: 0,
								maxLength : 10,
								width:100,
								colspan:1,
								listeners : {
									change : function() {
										var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycLaboralAnios"))
										&& Ext.isEmpty(Efx.utils.getValue("kycLaboralMeses"));
								Efx.utils.setRequiredAndValidate("kycLaboralAnios",isEmpty);
								Efx.utils.setRequiredAndValidate("kycLaboralMeses",isEmpty);
									}}
							},
							{
								xtype: "numericfield",
								name: "kycLaboralIngresosPropios.kycLaboralSalAprox",
								maxLength : 22,
								id: "kycLaboralSalAprox",
								allowDecimals: true,
								decimalPrecision: 2,
								allowBlank: false,
								maxLength: 20,
								colspan:2
							},
							{xtype: "label", text: "Tel\u00e9fono Oficina",cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", style: " ",  text: " ", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", style: "color: red",  text: "Incluir montos en colones unicamente", cls: "x-form-item label_spacing", colspan:2},
							{
								xtype:"textfield",
								id : "kycLaboralTelefono1",
								name:"kycLaboralIngresosPropios.kycLaboralTelefono1",
								allowBlank:false,
								maxLength : 8,
								vtype: "validNA",
								colspan:6
							},
							{
								xtype : "label",
								text : "Pa\u00EDs",
								cls : "x-form-item label_spacing",
								colspan : 2
							},
							{
								xtype : "label",
								text : "Provincia",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Cant\u00F3n",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "combo",
								id : "ctgPais",
								name : "ctgPais.ctgPaisId",
								store : new Ext.data.SimpleStore({
									data : config.ctgPaises || [],
									fields : [ "ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre" ]
								}),
								displayField : "ctgPaisNombre",
								valueField : "ctgPaisId",
								allowBlank : false,
								colspan : 2,
								listeners : {
									change : function() {
										var disable = this.getValue() != Efx.constants.codes.COSTA_RICA;
										Efx.utils.setDisabled("ctgProvincia", disable,true);
										Efx.utils.setDisabled("ctgCanton", disable,true);
										Efx.utils.setDisabled("ctgDistrito", disable,true);
										Efx.utils.setDisabled("ctgPoblado", disable,true);
										Efx.utils.setDisabled("kycLaboralOtro", disable,true);

										Ext.getCmp("ctgPoblado").clearInvalid();
										Ext.getCmp("kycLaboralOtro").clearInvalid();
										Efx.combos.setRequiredAndValidate("ctgProvincia", !disable);
										Efx.combos.setRequiredAndValidate("ctgCanton", !disable);
										Efx.combos.setRequiredAndValidate("ctgDistrito", !disable);

										if (Ext.getCmp("ctgPais").getValue() == Efx.constants.codes.COSTA_RICA)
											{
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPoblado"))&&
									Ext.isEmpty(Efx.utils.getValue("kycLaboralOtro"));
									Efx.utils.setRequiredAndValidate("ctgPoblado", isEmpty);
									Efx.utils.setRequiredAndValidate("kycLaboralOtro", isEmpty);
											}
									}}
							},
							{
								xtype : "combo",
								id : "ctgProvincia",
								name : "ctgProvincia.ctgProvinciaId",
								store : new Ext.data.SimpleStore({
									data : config.ctgProvincias || [],
									fields : [ "ctgProvinciaId","ctgProvinciaNombre" ]
								}),
								displayField : "ctgProvinciaNombre",
								valueField : "ctgProvinciaId",
								listeners : {
									change : function() {
										Efx.combos.loadData("ctgCanton",
										Efx.combos.getAllCantonesByProvinciaCombo(this.getValue(),config.ctgCantones));
										Efx.combos.removeAll("ctgDistrito", true);
									}}
							},
							{
								xtype : "combo",
								id : "ctgCanton",
								name : "ctgCanton.ctgCantonId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgCantonId",
											"ctgCantonNombre",
											"ctgProvinciaId" ]
								}),
								displayField : "ctgCantonNombre",
								valueField : "ctgCantonId",
								listeners : {
									change : function() {
										Efx.combos.loadData("ctgDistrito",
										Efx.combos.getAllDistritosByCantonCombo(this.getValue(),config.ctgDistritos));
									}}
							},
							{
								xtype : "label",
								text : "Distrito",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Barrio/Poblado",
								cls : "x-form-item label_spacing",
								colspan : 2
							},
							{
								xtype : "label",
								text : "Otro",
								cls : "x-form-item label_spacing",
								colspan : 2
							},
							{
								xtype : "combo",
								id : "ctgDistrito",
								name : "ctgDistrito.ctgDistritoId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgDistritoId","ctgDistritoNombre","ctgCantonId"]
								}),
								displayField : "ctgDistritoNombre",
								valueField : "ctgDistritoId",
								listeners:{
									change: function() {
										Efx.combos.loadData("ctgPoblado",Efx.combos.getAllPobladosByDistritoCombo(
											this.getValue(),config.ctgPoblados));
									}}
							},
							{
								xtype : "combo",
								id : "ctgPoblado",
								name : "ctgPoblado.ctgPobladoId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgPobladoId","ctgPobladoNombre","ctgDistritoId"]
								}),
								displayField : "ctgPobladoNombre",
								valueField : "ctgPobladoId",
								listeners:
								{
								change: function()
									{
										if (Ext.getCmp("ctgPais").getValue() == Efx.constants.codes.COSTA_RICA)
											{
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPoblado"))&&
									Ext.isEmpty(Efx.utils.getValue("kycLaboralOtro"));
									Efx.utils.setRequiredAndValidate("ctgPoblado", isEmpty);
									Efx.utils.setRequiredAndValidate("kycLaboralOtro", isEmpty);
											}
									}
								}
							},
							{
								xtype : "textfield",
								id : "kycLaboralOtro",
								name : "kycLaboralIngresosPropios.kycLaboralOtro",
								maxLength : 150,
								listeners:
								{
								change: function()
									{
										if (Ext.getCmp("ctgPais").getValue() == Efx.constants.codes.COSTA_RICA)
											{
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPoblado"))&&
									Ext.isEmpty(Efx.utils.getValue("kycLaboralOtro"));
									Efx.utils.setRequiredAndValidate("ctgPoblado", isEmpty);
									Efx.utils.setRequiredAndValidate("kycLaboralOtro", isEmpty);
											}
									}
								}
							},
							{
								xtype : "label",
								text : "Direcci\u00f3n Exacta (Favor incluir calle, av, etc)",
								cls : "x-form-item label_spacing",
								width: 480,
								colspan : 6
							},
							{
								xtype:"textfield",
								id : "kycLaboralDireccion",
								name:"kycLaboralIngresosPropios.kycLaboralDireccion",
								maxLength : 250,
								allowBlank: false,
								width:720,
								colspan:6
							},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", style: "color: red",  text: "Datos laborales digitados por el usuario", cls: "x-form-item label_spacing", colspan:4},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycLaboralIngresosPropiosId",
								name: "kycLaboralIngresosPropios.kycLaboralId"
							},{
								xtype: "hidden",
								id: "ctgTipoLaboralId",
								name: "kycLaboralIngresosPropios.ctgTipoLaboral.ctgCatalogoId"
							},{
								xtype: "hidden",
								id: "kycLaboralCodigoTransaccion",
								name: "kycLaboralIngresosPropios.kycLaboralCodigoTransaccion"
							},{
								xtype: "hidden",
							id: "kycLaboralCodigoReferencia",
							name: "kycLaboralIngresosPropios.kycLaboralCodigoReferencia"
						},{
								xtype: "hidden",
								id: "kycFechaActualizacion",
								listeners: {
									change: function(){
										var value = this.getValue();
										Efx.utils.setVisible("kycFechaActualizacionTitle", !Ext.isEmpty(value));
										Efx.utils.setText("kycFechaActualizacionTitle", "FORMULARIO ACTUALIZADO EL: " + Ext.util.Format.kycFormatDateYmdHis_d_m_Y_H_i(value));
									}
								}
							},
							 {	xtype: "hidden",
								id: "esTransaccion",
								name: "esTransaccion"
							}
						]
			        }
				]
			});
			return configToReturn;
		}
	};
}();