KycLaboralPersonasDependientes = function(){
	var configWindow = {
		add: "kycLaboralPersonasDependientesAgregarTop",
		edit: "kycLaboralPersonasDependientesEditarTop",
		save: "kycLaboralPersonasDependientesGuardarTop",
		remove: "kycLaboralPersonasDependientesEliminarTop",
		grid: "kycLaboralPersonasDependientesGrid",
		form: "kycLaboralPersonasDependientesForm"
	};
	var configWindowBottom = {
			add: "kycLaboralPersonasDependientesAgregarBottom",
			edit: "kycLaboralPersonasDependientesEditarBottom",
			save: "kycLaboralPersonasDependientesGuardarBottom",
			remove: "kycLaboralPersonasDependientesEliminarBottom"
	};
	return {
		agregarLaboralPersonasDependientes: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarLaboralPersonasDependientes: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarLaboralPersonasDependientes: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycLaboral/delete",
					params: {
						kycLaboralId: Efx.utils.getValue("kycLaboralPersonasDependientesId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoLaboral : Efx.constants.codes.LABORAL_PERSONAS_DEPENDIENTES
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycLaboralPersonasDependientesForm");
								if(jsonObject.kycLaboralPersonasDependientes){
			    					Ext.getCmp("kycLaboralPersonasDependientesGrid").getStore().loadData(jsonObject.kycLaboralPersonasDependientes);
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
		guardarLaboralPersonasDependientes: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycLaboralPersonasDependientesForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycLaboral/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycLaboralPersonasDependientes.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycLaboralPersonasDependientes.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycLaboralPersonasDependientes.ctgTipoLaboral.ctgCatalogoId" :Efx.constants.codes.LABORAL_PERSONAS_DEPENDIENTES,
    				 kycTipoLaboral : Efx.constants.codes.LABORAL_PERSONAS_DEPENDIENTES,
    				 tipoDocumento: Efx.utils.getValue("ctgTipoDocumento.ctgCatalogoId"),
    				 esTransaccion : Efx.utils.getValue("esTransaccion")
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycLaboralPersonasDependientesForm", true);
    				if(action.result.kycLaboralPersonasDependientes){
    					Ext.getCmp("kycLaboralPersonasDependientesGrid").getStore().loadData(action.result.kycLaboralPersonasDependientes);
    					Ext.getCmp("kycLaboralPersonasDependientesGrid").getSelectionModel().select(action.result.kycLaboralPersonasDependientesIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},findFromBureauPersona: function(){
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
					tipoLaboral : Efx.constants.codes.LABORAL_PERSONAS_DEPENDIENTES,
					tipoBoton : "1",
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
    				kycLaboralId :Efx.utils.getValue("kycLaboralPersonasDependientesId"),
    				kycTipoPersona : Efx.utils.getValue("ctgTipoDocumento.ctgCatalogoId")
				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycLaboralNombres").setValue(jsonObject.kycLaboralNombre1);
						Ext.getCmp("kycLaboralPrimerApellido").setValue(jsonObject.kycLaboralPrimerApellido);
						Ext.getCmp("kycLaboralSegundoApellido").setValue(jsonObject.kycLaboralSegundoApellido);
						Ext.getCmp("ctgNacionalidad").setValue(jsonObject.ctgNacionalidad);
						Ext.getCmp("ctgPaisNacimiento").setValue(jsonObject.ctgPaisNacimiento);
						Ext.getCmp("ctgPais").setValue(jsonObject.ctgPais);
						Ext.getCmp("ctgProvincia").setValue(jsonObject.ctgProvincia);
						Ext.getCmp("ctgCanton").setValue(jsonObject.ctgCanton);
						Ext.getCmp("ctgDistrito").setValue(jsonObject.ctgDistrito);
						Ext.getCmp("kycLaboralTelefono2").setValue(jsonObject.kycLaboralTelefono2);
						Ext.getCmp("kycLaboralTelefono3").setValue(jsonObject.kycLaboralTelefono3);
						Ext.getCmp("kycLaboralDireccion").setValue(jsonObject.kycLaboralDireccion);
						Ext.getCmp("kycLaboralSalAprox").setValue(jsonObject.kycLaboralSalAprox);
						Ext.getCmp("ctgGenero").setValue(jsonObject.ctgGenero);
						Ext.getCmp("kycLaboralCiudadNacimiento").setValue(jsonObject.kycLaboralCiudadNac);
						Ext.getCmp("kycLaboralFechaNacimiento").setValue(jsonObject.kycLaboralFechaNac);
						Ext.getCmp("kycLaboralMemo").setValue(jsonObject.kycLaboralMemo);
						Ext.getCmp("ctgResultado").setValue({"ctgResultadoInvestigacion.ctgCatalogoId" : jsonObject.ctgResultadoId});
						Ext.getCmp("kycLaboralPantallaBusqueda").inputValue=jsonObject.isActive;
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
							   id: "kycLaboralPersonasDependientesAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycLaboralPersonasDependientes.agregarLaboralPersonasDependientes
						   },{
					    	   text: "Editar",
					    	   id: "kycLaboralPersonasDependientesEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycLaboralPersonasDependientes.editarLaboralPersonasDependientes
					       },{
					    	   text: "Guardar",
					    	   id: "kycLaboralPersonasDependientesGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycLaboralPersonasDependientes.guardarLaboralPersonasDependientes
					       },{
					    	   text: "Eliminar",
					    	   id: "kycLaboralPersonasDependientesEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycLaboralPersonasDependientes.eliminarLaboralPersonasDependientes
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
							   id: "kycLaboralPersonasDependientesAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycLaboralPersonasDependientes.agregarLaboralPersonasDependientes
						   },{
					    	   text: "Editar",
					    	   id: "kycLaboralPersonasDependientesEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycLaboralPersonasDependientes.editarLaboralPersonasDependientes
					       },{
					    	   text: "Guardar",
					    	   id: "kycLaboralPersonasDependientesGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycLaboralPersonasDependientes.guardarLaboralPersonasDependientes
					       },{
					    	   text: "Eliminar",
					    	   id: "kycLaboralPersonasDependientesEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycLaboralPersonasDependientes.eliminarLaboralPersonasDependientes
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycLaboralPersonasDependientesGrid",
						height: 80,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 20,
						store: new Ext.data.SimpleStore({
					    	data: config.kycLaboralPersonasDependientes || [],
					    	fields: [
							"kycLaboralPersonasDependientes.kycLaboralId",
							"kycLaboralPersonasDependientes.kycLaboralDireccion",
							"kycLaboralPersonasDependientes.kycLaboralNombre1",
							"kycLaboralPersonasDependientes.kycLaboralTelefono1",
							"kycLaboralPersonasDependientes.kycLaboralTelefono2",
							"kycLaboralPersonasDependientes.kycLaboralTelefono3",
							"kycLaboralPersonasDependientes.kycLaboralTelefono4",
							"kycLaboralPersonasDependientes.kycLaboralNumeroCed1",
							"kycLaboralPersonasDependientes.kycLaboralFechaIngreso",
							"kycLaboralPersonasDependientes.kycLaboralAnios",
							"kycLaboralPersonasDependientes.kycLaboralMeses",
							"kycLaboralPersonasDependientes.kycLaboralEmail1",
							"kycLaboralPersonasDependientes.kycLaboralEmail2",
							"kycLaboralPersonasDependientes.kycLaboralSalAprox",
							"kycLaboralPersonasDependientes.kycLaboralOtro",
							"kycLaboralPersonasDependientes.kycLaboralDetalle",
							"kycLaboralNombres",
							"kycLaboralPrimerApellido",
							"kycLaboralSegundoApellido",
							"kycLaboralPersonasDependientes.kycLaboralFechaNacimiento",
							"kycLaboralPersonasDependientes.kycLaboralApartado",
							"kycLaboralPersonasDependientes.kycLaboralTitular",
							"kycLaboralPersonasDependientes.kycLaboralParentesco",
							"kycLaboralPersonasDependientes.kycLaboralCiudadNacimiento",
							"kycLaboralPersonasDependientes.kycLaboralPantallaBusqueda",
							"kycLaboralPersonasDependientes.kycLaboralMemo",
							"kycLaboralPersonasDependientes.kycFechaActualizacion",
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
							"kycLaboralPersonasDependientes.kycLaboralCodigoTransaccion",
							"kycLaboralPersonasDependientes.kycLaboralCodigoReferencia"

			    	        ]
					    }),
					    columns: [
					              {text: "Persona que Genera Ingreso",   xtype: "templatecolumn", tpl: "{kycLaboralNombres} " + "{kycLaboralPrimerApellido} " + "{kycLaboralSegundoApellido}", flex: 2, minWidth: 200},
					              {header: "Ingreso Aproximado",  dataIndex: "kycLaboralPersonasDependientes.kycLaboralSalAprox", flex:1, width: 100, renderer: "kycMoney",format:'0,000.00',xtype: 'numbercolumn'}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycLaboralPersonasDependientesForm", record.data);
					    			Efx.form.setDisable("kycLaboralPersonasDependientesForm");
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    	}
					    }
					},{
			        	xtype: "form",
						id: "kycLaboralPersonasDependientesForm",
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
					        	colspan: 8,
					        	hidden: true,
					        	width: 730
					        },{
								xtype: "label",
								text: "PERSONAS DEPENDIENTES -  DATOS PARA PERSONA NO TITULAR",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "Tipo de C\u00e9dula", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "N\u00famero de C\u00e9dula", cls: "x-form-item label_spacing", colspan:4},
							{
								xtype: "combo",
								id: "ctgTipoDocumento.ctgCatalogoId",
								name: "kycLaboralPersonasDependientes.ctgTipoDocumento.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoDocumentoPersonasDependientes1 || [],
									fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre"]
								}),
								displayField: "ctgTipoDocumentoNombre",
								valueField: "ctgTipoDocumentoId",
								allowBlank: false,
								colspan: 2,
								listeners : {
										change : function() {
												var valor = this.getValue();
												if(valor == 639) {
													Ext.getCmp("validar").disable();
													Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;

																}
												else {
														Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedNac";
														Ext.getCmp("validar").enable();
													}
											},
											render : function() {
												var valor = this.getValue();
												if(valor == 639) {
													Ext.getCmp("validar").disable();
													Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;
														}
												else {
														Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedNac";
														Ext.getCmp("validar").enable();
													}
											}}
							},
							{
								xtype: "textfield",
								id: "kycLaboralNumeroCed1Id",
								name: "kycLaboralPersonasDependientes.kycLaboralNumeroCed1",
								maxLength: 20,
								allowBlank: false,
								colspan: 2
							},
							{
			                    xtype: "button",
			                    id: "validar",
			                    text: 'VALIDAR C\u00c9DULA',
			                    handler : KycLaboralPersonasDependientes.findFromBureauPersona
			                },
							{
								xtype : "label",
								text : "Nombres",
								cls : "x-form-item label_spacing",
								colspan: 2
							},{
								xtype : "label",
								text : "Primer Apellido ",
								cls : "x-form-item label_spacing",
								colspan: 2
							},
							{
								xtype : "label",
								text : "Segundo Apellido",
								cls : "x-form-item label_spacing",
								colspan: 2
							},{
								xtype : "textfield",
								id : "kycLaboralNombres",
								name : "kycLaboralPersonasDependientes.kycLaboralNombres",
								allowBlank : false,
								maxLength : 60,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycLaboralPrimerApellido",
								name : "kycLaboralPersonasDependientes.kycLaboralPrimerApellido",
								allowBlank : false,
								maxLength : 50,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycLaboralSegundoApellido",
								name : "kycLaboralPersonasDependientes.kycLaboralSegundoApellido",
								maxLength : 50,
								allowBlank : false,
								colspan:2
							},
							{
								xtype : "label",
								text : "Sexo",
								cls : "x-form-item label_spacing",
								colspan: 2
							},
							{
								xtype : "label",
								text : "Nacionalidad",
								cls : "x-form-item label_spacing",
								colspan: 2
							},
							{
								xtype : "label",
								text : "Estado Civil",
								cls : "x-form-item label_spacing",
								colspan: 2
							},
							{
								xtype : "combo",
								id : "ctgGenero",
								name : "ctgGenero.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgGeneros || [],
									fields : [ "ctgGeneroId", "ctgGeneroNombre" ]
								}),
								displayField : "ctgGeneroNombre",
								valueField : "ctgGeneroId",
								allowBlank : false,
								colspan:2
							},
							{
								xtype : "combo",
								id : "ctgNacionalidad",
								name : "ctgNacionalidad.ctgPaisId",
								store : new Ext.data.SimpleStore({
									data : config.ctgNacionalidades || [],
									fields : [ "ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre" ]
								}),
								displayField : "ctgPaisNacionalidad",
								valueField : "ctgPaisId",
								allowBlank : false,
								colspan: 2
							},{
								xtype : "combo",
								id : "ctgEstadoCivil",
								name : "ctgEstadoCivil.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgEstadosCiviles || [],
									fields : [ "ctgEstadoCivilId", "ctgEstadoCivilNombre" ]
								}),
								displayField : "ctgEstadoCivilNombre",
								allowBlank : false,
								valueField : "ctgEstadoCivilId"
							},
							{
								xtype : "label",
								text : "Pa\u00eds de Nacimiento",
								cls : "x-form-item label_spacing",
								colspan: 2
							},
							{
								xtype : "label",
								text : "Ciudad de Nacimiento",
								cls : "x-form-item label_spacing",
								colspan: 2
							},
							{
								xtype : "label",
								text : "Fecha de Nacimiento",
								cls : "x-form-item label_spacing",
								colspan: 2
							},
							{
								xtype: "combo",
								id: "ctgPaisNacimiento",
								name: "ctgPaisNacimiento.ctgPaisId",
								store: new Ext.data.SimpleStore({
									data: config.ctgPais || [],
									fields: ["ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre"]
								}),
								displayField: "ctgPaisNombre",
								valueField: "ctgPaisId",
								allowBlank: false
							},
							{
								xtype : "textfield",
								id : "kycLaboralCiudadNacimiento",
								name : "kycLaboralPersonasDependientes.kycLaboralCiudadNacimiento",
								allowBlank: false,
								maxLength : 150
							},
							{
								xtype : "datefield",
								id : "kycLaboralFechaNacimiento",
								name : "kycLaboralPersonasDependientes.kycLaboralFechaNacimiento",
								submitFormat : "Ymd",
								altFormats: "Ymd|d/m/Y",
								allowBlank: false,
								submitOnDisable: true,
								maxValue : new Date()
							},
							{
								xtype : "label",
								text : "Tel\u00E9fono de Residencia",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Tel\u00E9fono Celular",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Tel\u00E9fono de Trabajo",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "textfield",
								id : "kycLaboralTelefono2",
								name : "kycLaboralPersonasDependientes.kycLaboralTelefono2",
								allowBlank : false,
								maxLength : 8,
								vtype: "validNA"
							},
							{
								xtype : "textfield",
								id : "kycLaboralTelefono3",
								name : "kycLaboralPersonasDependientes.kycLaboralTelefono3",
								allowBlank : false,
								maxLength : 8,
								vtype: "validNA"
							},
							{
								xtype : "textfield",
								id : "kycLaboralTelefono1",
								name : "kycLaboralPersonasDependientes.kycLaboralTelefono1",
								allowBlank : false,
								maxLength : 8,
								vtype: "validNA"
							},
							{
								xtype : "label",
								text : "Tel\u00E9fono Fax",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Direcci\u00f3n Electr\u00f3nica 1",
								cls : "x-form-item label_spacing",
								colspan : 2
							},
							{
								xtype : "label",
								text : "Direcci\u00f3n Electr\u00f3nica 2",
								cls : "x-form-item label_spacing",
								colspan : 2
							},
							{
								xtype : "textfield",
								id : "kycLaboralTelefono4",
								name : "kycLaboralPersonasDependientes.kycLaboralTelefono4",
								allowBlank : false,
								vtype: "validNA",
								maxLength : 8
							},
							{
								xtype : "textfield",
								id : "kycLaboralEmail1",
								name : "kycLaboralPersonasDependientes.kycLaboralEmail1",
								fieldCls : "remove-uppercase",
								maxLength : 250,
								allowBlank : false,
								colspan : 2,
								vtype : "email",
								width : 230
							},
							{
								xtype : "textfield",
								id : "kycLaboralEmail2",
								name : "kycLaboralPersonasDependientes.kycLaboralEmail2",
								fieldCls : "remove-uppercase",
								maxLength : 250,
								allowBlank : false,
								colspan : 2,
								vtype : "email",
								width : 230
							},
							{
								xtype : "label",
								text : "Apartado Postal",
								cls : "x-form-item label_spacing",
								colspan : 6
							},
							{
								xtype : "textfield",
								id : "kycLaboralApartado",
								name : "kycLaboralPersonasDependientes.kycLaboralApartado",
								allowBlank : false,
								colspan:6,
								maxLength: 10,
								minLength: 2
							},
							{
								xtype : "label",
								text : "DIRECCI\u00d3N",
								cls : "x-form-item label_header",
								colspan : 6,
								width : 730
							},
							{
								xtype : "label",
								text : "Pa\u00EDs de Domicilio",
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
							},{
								xtype : "combo",
								id : "ctgPais",
								name : "ctgPais.ctgPaisId",
								store : new Ext.data.SimpleStore({
									data : config.ctgPaises || [],
									fields : [ "ctgPaisId","ctgPaisNacionalidad","ctgPaisNombre" ]
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

									}

							}
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
										Efx.combos.loadData("ctgCanton",Efx.combos.getAllCantonesByProvinciaCombo(this.getValue(),config.ctgCantones));
										Efx.combos.removeAll("ctgDistrito", true);
									}}
							},
							{
								xtype : "combo",
								id : "ctgCanton",
								name : "ctgCanton.ctgCantonId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgCantonId","ctgCantonNombre","ctgProvinciaId" ]
								}),
								displayField : "ctgCantonNombre",
								valueField : "ctgCantonId",
								listeners : {
									change : function() {
										Efx.combos.loadData("ctgDistrito",Efx.combos.getAllDistritosByCantonCombo(this.getValue(),config.ctgDistritos));
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
									fields : [ "ctgDistritoId","ctgDistritoNombre","ctgCantonId" ]
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
									fields : [ "ctgPobladoId", "ctgPobladoNombre", "ctgDistritoId" ]
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
								name : "kycLaboralPersonasDependientes.kycLaboralOtro",
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
								xtype : "textfield",
								id : "kycLaboralDireccion",
								name : "kycLaboralPersonasDependientes.kycLaboralDireccion",
								maxLength : 250,
								allowBlank: false,
								width:710,
								colspan:6
							},
							{xtype: "label", text: "Ocupaci\u00f3n", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", text: "Ingreso Mensual Bruto", cls: "x-form-item label_spacing", colspan:4},
							{
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
								listConfig : {minWidth : 450}
							},
							{
								xtype : "numericfield",
								id : "kycLaboralSalAprox",
								name : "kycLaboralPersonasDependientes.kycLaboralSalAprox",
								allowBlank: false,
								allowDecimals: true,
								decimalPrecision: 2,
								maxlength:22,
								colspan:4
							},
			                {xtype: "label", text: "Nombre de Patrono", cls: "x-form-item label_spacing", colspan:6},
							{
								allowBlank: false,
								xtype: "textfield",
								id : "kycLaboralNombre1",
								name: "kycLaboralPersonasDependientes.kycLaboralNombre1",
								maxLength: 120,
								width:480,
								colspan: 6
							},
			                {xtype: "label", text: "Nombre de Titular", cls: "x-form-item label_spacing", colspan: 4},
			                {xtype: "label", text: "Parentesco", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "textfield",
								id : "kycLaboralTitular",
								name: "kycLaboralPersonasDependientes.kycLaboralTitular",
								maxLength: 200,
								allowBlank: false,
								width:480,
								colspan: 4
							},
							{
								xtype: "textfield",
								id : "kycLaboralParentesco",
								name: "kycLaboralPersonasDependientes.kycLaboralParentesco",
								maxLength: 100,
								allowBlank: false,
								colspan: 2
							},
							{xtype: "label",  text: " ", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", style: "color: red",  text: "Datos laborales digitados por el usuario",  cls: "x-form-item label_spacing", colspan:4},
							{
								xtype : "label",
								text : "PARA USO INTERNO - VERIFICACI\u00d3N CONTRA LISTAS (GLOBAL INTERDICT)",
								cls : "x-form-item label_header",
								colspan : 6,
								width : 730
							},
							{xtype: "label", text: "Resultado de la Investigaci\u00f3n", cls: "x-form-item label_spacing", colspan: 2},
							 {
					            xtype: 'radiogroup',
					            id: "ctgResultado",
					            columns : 2,
					            width: 230,
					            allowBlank: false,
					            items : config.ctgResultadoInvestigacion || [],
					            colspan: 2
					        },
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Adjuntar Pantalla de B\u00fasqueda", cls: "x-form-item label_spacing", colspan: 2},
							{
					            xtype: "checkbox",
					            id: "kycLaboralPantallaBusqueda",
					            name: "kycLaboralPersonasDependientes.kycLaboralPantallaBusqueda",
					            width: 100,
					            colspan: 4,
					            inputValue: "1",
					            uncheckedValue: "0"
					        },
					    	{xtype: "label", text: "Memo", cls: "x-form-item label_spacing", colspan: 6},
					        {
								xtype : "textarea",
								id : "kycLaboralMemo",
								name : "kycLaboralPersonasDependientes.kycLaboralMemo",
								maxLength : 500,
								colspan : 6,
								height : 40,
								width : 715
							},
					        {
								xtype: "hidden",
								id: "kycLaboralPersonasDependientesId",
								name: "kycLaboralPersonasDependientes.kycLaboralId"
							},{
								xtype: "hidden",
								id: "ctgTipoLaboralId",
								name: "kycLaboralPersonasDependientes.ctgTipoLaboral.ctgCatalogoId"
							},{
								xtype: "hidden",
								id: "kycLaboralCodigoTransaccion",
								name: "kycLaboralPersonasDependientes.kycLaboralCodigoTransaccion"
							},{
								xtype: "hidden",
							id: "kycLaboralCodigoReferencia",
							name: "kycLaboralPersonasDependientes.kycLaboralCodigoReferencia"
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