KycAdicional = function(){
	var configWindow = {
		add: "kycAdicionalAgregarTop",
		edit: "kycAdicionalEditarTop",
		save: "kycAdicionalGuardarTop",
		remove: "kycAdicionalEliminarTop",
		grid: "kycAdicionalGrid",
		form: "kycAdicionalForm"
	};
	var configWindowBottom = {
			add: "kycAdicionalAgregarBottom",
			edit: "kycAdicionalEditarBottom",
			save: "kycAdicionalGuardarBottom",
			remove: "kycAdicionalEliminarBottom"
	};

	return {
		agregarAdicional: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarAdicional: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarAdicional: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycAdicional/delete",
					params: {
						kycAdicionalId: Efx.utils.getValue("kycAdicionalId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycAdicionalForm");
								if(jsonObject.kycAdicional){
			    					Ext.getCmp("kycAdicionalGrid").getStore().loadData(jsonObject.kycAdicional);
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
		guardarAdicional: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycAdicionalForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycAdicional/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycAdicional.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycAdicional.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
					esTransaccion : Efx.utils.getValue("esTransaccion")
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycAdicionalForm", true);
    				if(action.result.kycAdicional){
    					Ext.getCmp("kycAdicionalGrid").getStore().loadData(action.result.kycAdicional);
    					Ext.getCmp("kycAdicionalGrid").getSelectionModel().select(action.result.kycAdicionalIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},findFromBureau: function(){
			Efx.message.progress("Buscando en Bureau...");
			if(Ext.isEmpty(Efx.utils.getValue("kycAdicionalDocumento"))){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycAdicional/findFromBureau",
				params: {
					kycPersonaFisicaDocumento1: Efx.utils.getValue("kycAdicionalDocumento"),
					tipoAdicional : Efx.constants.codes.Adicional_ASALARIADO,
					tipoBoton : "1",
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
    				tipoAdicional :Efx.constants.codes.Adicional_ASALARIADO,
    				kycAdicionalId :Efx.utils.getValue("kycAdicionalId"),
				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycAdicionalNombres").setValue(jsonObject.kycAdicionalNombres);
						Ext.getCmp("kycAdicionalPrimerApellido").setValue(jsonObject.kycAdicionalPrimerApellido);
						Ext.getCmp("kycAdicionalSegundoApellido").setValue(jsonObject.kycAdicinalSegundoApellido);
						Ext.getCmp("ctgProvinciaId").setValue(jsonObject.ctgProvinciaId);
						Ext.getCmp("ctgCantonId").setValue(jsonObject.ctgCantonId);
						Ext.getCmp("ctgDistritoId").setValue(jsonObject.ctgDistritoId);
						Ext.getCmp("ctgPaisNacimiento").setValue(jsonObject.ctgPaisNacimientoId);
						Ext.getCmp("ctgPaisDireccion").setValue(jsonObject.ctgPaisDireccionId);
						Ext.getCmp("ctgNacionalidad").setValue(jsonObject.ctgNacionalidadId);
						Ext.getCmp("ctgGeneroId").setValue(jsonObject.ctgGeneroId);
						Ext.getCmp("kycAdicionalTelefono1").setValue(jsonObject.kycAdicionalTelefono1);
						Ext.getCmp("kycAdicionalTelefono2").setValue(jsonObject.kycAdicionalTelefono2);
						Ext.getCmp("kycAdicionalDireccion").setValue(jsonObject.kycAdicionalDireccion);
						Ext.getCmp("kycAdicionalFechaNacimiento").setValue(jsonObject.kycAdicionalFechaNacimiento);
						Ext.getCmp("kycAdicionalMemo").setValue(jsonObject.kycAdicionalMemo);
						Ext.getCmp("ctgResultado").setValue({"ctgResultadoInvestigacion.ctgCatalogoId" : jsonObject.ctgResultadoId});
						Ext.getCmp("kycAdicionalCiudadNacimiento").setValue(jsonObject.kycAdicionalCiudadNacimiento);
						Ext.getCmp("kycAdicionalPantallaBusqueda").inputValue = jsonObject.isActive;
						Ext.getCmp("kycAdicionalCodigoTransaccion").setValue(jsonObject.kycAdicionalCodigoTransaccion);
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
				title: "ADICIONALES - PERSONA F\u00cdSICA",
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
							   id: "kycAdicionalAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycAdicional.agregarAdicional
						   },{
					    	   text: "Editar",
					    	   id: "kycAdicionalEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycAdicional.editarAdicional
					       },{
					    	   text: "Guardar",
					    	   id: "kycAdicionalGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycAdicional.guardarAdicional
					       },{
					    	   text: "Eliminar",
					    	   id: "kycAdicionalEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycAdicional.eliminarAdicional
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
							   id: "kycAdicionalAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycAdicional.agregarAdicional
						   },{
					    	   text: "Editar",
					    	   id: "kycAdicionalEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycAdicional.editarAdicional
					       },{
					    	   text: "Guardar",
					    	   id: "kycAdicionalGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycAdicional.guardarAdicional
					       },{
					    	   text: "Eliminar",
					    	   id: "kycAdicionalEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycAdicional.eliminarAdicional
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycAdicionalGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycAdicional || [],
					    	fields: [
					"kycAdicional.kycAdicionalId",
					"kycAdicionalNombres",
					"kycAdicionalPrimerApellido",
					"kycAdicionalSegundoApellido",
					"kycAdicional.kycAdicionalDocumento",
					"kycAdicional.kycAdicionalFechaNacimiento",
					"kycAdicional.kycAdicionalCiudadNacimiento",
					"kycAdicional.kycAdicionalDireccion",
					"kycAdicional.kycAdicionalTelefono1",
					"kycAdicional.kycAdicionalTelefono2",
					"kycAdicional.kycAdicionalTelefono3",
					"kycAdicional.kycAdicionalTelefono4",
					"kycAdicional.kycAdicionalApartadoPostal",
					"kycAdicional.kycAdicionalEmail1",
					"kycAdicional.kycAdicionalEmail2",
					"kycAdicional.kycAdicionalOtro",
					"kycAdicional.kycAdicionalRelacion",
					"kycAdicional.kycAdicionalPantallaBusqueda",
					"kycAdicional.kycAdicionalMemo",
					"kycAdicional.kycFechaActualizacion",
					"kycAdicional.ctgPaisNacimiento.ctgPaisId",
					"kycAdicional.ctgNacionalidad.ctgPaisId",
					"kycAdicional.ctgPaisDireccion.ctgPaisId",
					"kycAdicional.ctgProvincia.ctgProvinciaId",
					"kycAdicional.ctgCanton.ctgCantonId",
					"kycAdicional.ctgDistrito.ctgDistritoId",
					"kycAdicional.ctgPoblado.ctgPobladoId",
					"kycAdicional.ctgGenero.ctgCatalogoId",
					"kycAdicional.ctgProfesion.ctgCatalogoId",
					"kycAdicional.ctgEstadoCivil.ctgCatalogoId",
					"kycAdicional.ctgTipoDocumento.ctgCatalogoId",
					"ctgResultadoInvestigacion.ctgCatalogoId",
					"kycAdicional.kycAdicionalCodigoTransaccion"
			    	        ]
					    }),
					    columns: [
					              {text: "Nombre de Adicional", xtype: "templatecolumn", tpl: "{kycAdicionalNombres} " + "{kycAdicionalPrimerApellido} " + "{kycAdicionalSegundoApellido}", flex: 2, minWidth: 100},
					              {header : "Identificaci\u00F3n", dataIndex : "kycAdicional.kycAdicionalDocumento", flex: 0.5}
					              ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycAdicionalForm", record.data);
					    			Efx.form.setDisable("kycAdicionalForm");
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
						id: "kycAdicionalForm",
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
								text: "DATOS PERSONALES",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{
								xtype : "label",
								text : "Tipo de C\u00e9dula",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "Numero de C\u00e9dula",
								cls : "x-form-item label_spacing",
								colspan:4
							},
							{
								xtype: "combo",
								id: "ctgTipoDocumento.ctgCatalogoId",
								name: "kycAdicional.ctgTipoDocumento.ctgCatalogoId",
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
											if(this.getValue() == 639) {
												Ext.getCmp("validarButtonId1").disable();
												Ext.getCmp("kycAdicionalDocumento").vtype = undefined;
											}
											else if (this.getValue() == 638){
													Ext.getCmp("kycAdicionalDocumento").vtype = "CedNac";
													Ext.getCmp("validarButtonId1").enable();
												}
										},
										render : function() {
											if(this.getValue() == 639) {
												Ext.getCmp("validarButtonId1").disable();
												Ext.getCmp("kycAdicionalDocumento").vtype = undefined;
											}
											else if (this.getValue() == 638){
													Ext.getCmp("kycAdicionalDocumento").vtype = "CedNac";
													Ext.getCmp("validarButtonId1").enable();
												}
										}

								}
							},
							{
								xtype : "textfield",
								id : "kycAdicionalDocumento",
								name : "kycAdicional.kycAdicionalDocumento",
								allowBlank : false,
								maxLength: 20
							},
							{
			                    xtype: 'button',
			                    id:"validarButtonId1",
			                    text: 'VALIDAR C\u00c9DULA',
			                    handler: KycAdicional.findFromBureau,
			                    colspan:2
			                },
							{
								xtype : "label",
								text : "Nombres",
								cls : "x-form-item label_spacing",
								colspan:2
							},{
								xtype : "label",
								text : "Primer Apellido ",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "Segundo Apellido",
								cls : "x-form-item label_spacing",
								colspan:2
							},{
								xtype : "textfield",
								id : "kycAdicionalNombres",
								name : "kycAdicional.kycAdicionalNombres",
								allowBlank : false,
								maxLength : 50,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycAdicionalPrimerApellido",
								name : "kycAdicional.kycAdicionalPrimerApellido",
								disabled : !config.kycExtranjero,
								submitOnDisable : true,
								allowBlank : false,
								maxLength : 25,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycAdicionalSegundoApellido",
								name : "kycAdicional.kycAdicionalSegundoApellido",
								maxLength : 25,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "label",
								text : "Sexo",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "Nacionalidad",
								cls : "x-form-item label_spacing",
								colspan : 2
							},
							{
								xtype : "label",
								text : "Estado Civil",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "combo",
								id : "ctgGeneroId",
								name : "kycAdicional.ctgGenero.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgGeneros || [],
									fields : [ "ctgGeneroId",
											"ctgGeneroNombre" ]
								}),
								displayField : "ctgGeneroNombre",
								valueField : "ctgGeneroId",
								allowBlank : false,
								colspan:2
							},
							{
								xtype : "combo",
								id : "ctgNacionalidad",
								name : "kycAdicional.ctgNacionalidad.ctgPaisId",
								store : new Ext.data.SimpleStore({
									data : config.ctgNacionalidades || [],
									fields : [ "ctgPaisId",
											"ctgPaisNacionalidad",
											"ctgPaisNombre" ]
								}),
								displayField : "ctgPaisNacionalidad",
								valueField : "ctgPaisId",
								allowBlank : false,
								colspan: 2
							},
							{
								xtype : "combo",
								id : "ctgEstadoCivil",
								name : "kycAdicional.ctgEstadoCivil.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgEstadosCiviles || [],
									fields : [ "ctgEstadoCivilId",
											"ctgEstadoCivilNombre" ]
								}),
								displayField : "ctgEstadoCivilNombre",
								valueField : "ctgEstadoCivilId",
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "label",
								text : "Pa\u00eds de Nacimiento",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "Ciudad de Nacimiento",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "Fecha de Nacimiento",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype: "combo",
								id: "ctgPaisNacimiento",
								name: "kycAdicional.ctgPaisNacimiento.ctgPaisId",
								store: new Ext.data.SimpleStore({
									data: config.ctgPaises || [],
									fields: ["ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre"]
								}),
								displayField: "ctgPaisNombre",
								valueField: "ctgPaisId",
								allowBlank: false,
							},
							{
								xtype : "textfield",
								id : "kycAdicionalCiudadNacimiento",
								name : "kycAdicional.kycAdicionalCiudadNacimiento",
								maxLength : 100,
								allowBlank: false
							},
							{
								xtype : "datefield",
								id : "kycAdicionalFechaNacimiento",
								name : "kycAdicional.kycAdicionalFechaNacimiento",
								submitFormat : "Ymd",
								altFormats: "Ymd|d/m/Y",
								submitOnDisable: true,
								maxValue : new Date(),
								allowBlank : false
							},
							{xtype : "label", text : "Profesi\u00f3n", cls : "x-form-item label_spacing", colspan:2},
							 {xtype: "label", text: "Relaci\u00f3n con Titular", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype : "combo",
								id : "ctgProfesion",
								allowBlank : false,
								name : "kycAdicional.ctgProfesion.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgProfesiones || [],
									fields : [ "ctgProfesionId","ctgProfesionNombre" ]
								}),
								displayField : "ctgProfesionNombre",
								valueField : "ctgProfesionId",
								colspan:2
							},{
								xtype: "textfield",
								id : "kycAdicionalRelacion",
								name: "kycAdicional.kycAdicionalRelacion",
								maxLength: 150,
								allowBlank: false,
								width:475,
								colspan: 4
							},
							{
								xtype : "label",
								text : "DATOS DE CONTACTO",
								cls : "x-form-item label_header",
								colspan : 6,
								width : 730
							},
							{xtype : "label", text : "Tel\u00E9fono de Residencia", cls : "x-form-item label_spacing"},
							{xtype : "label", text : "Tel\u00E9fono Celular", cls : "x-form-item label_spacing"},
							{xtype : "label", text : "Tel\u00E9fono de Trabajo", cls : "x-form-item label_spacing"},
							{
								xtype : "textfield",
								id : "kycAdicionalTelefono1",
								name : "kycAdicional.kycAdicionalTelefono1",
								allowBlank : false,
								maxLength : 8,
								vtype: "validNA"
							},
							{
								xtype : "textfield",
								id : "kycAdicionalTelefono2",
								name : "kycAdicional.kycAdicionalTelefono2",
								allowBlank : false,
								maxLength : 8,
								vtype: "validNA"
							},
							{
								xtype : "textfield",
								id : "kycAdicionalTelefono3",
								name : "kycAdicional.kycAdicionalTelefono3",
								allowBlank : false,
								maxLength : 8,
								vtype: "validNA"
							},
							{xtype : "label", text : "Tel\u00E9fono Fax", cls : "x-form-item label_spacing"},
							{xtype : "label", text : "Direcci\u00f3n Electr\u00f3nica 1", cls : "x-form-item label_spacing", colspan : 2},
							{xtype : "label", text : "Direcci\u00f3n Electr\u00f3nica 2", cls : "x-form-item label_spacing", colspan : 2},
							{
								xtype : "textfield",
								id : "kycAdicionalTelefono4",
								name : "kycAdicional.kycAdicionalTelefono4",
								allowBlank : false,
								vtype: "validNA",
								maxLength : 8,
							},{
								xtype : "textfield",
								id : "kycAdicionalEmail1",
								name : "kycAdicional.kycAdicionalEmail1",
								fieldCls : "remove-uppercase",
								maxLength : 250,
								allowBlank : false,
								colspan : 2,
								vtype : "email",
								width : 230
							},{
								xtype : "textfield",
								id : "kycAdicionalEmail2",
								name : "kycAdicional.kycAdicionalEmail2",
								fieldCls : "remove-uppercase",
								maxLength : 250,
								allowBlank : false,
								colspan : 2,
								vtype : "email",
								width : 230
							},
							{xtype : "label", text : "Apartado Postal", cls : "x-form-item label_spacing", colspan : 6},
							{
								xtype : "textfield",
								id : "kycAdicionalApartadoPostal",
								name : "kycAdicional.kycAdicionalApartadoPostal",
								allowBlank : false,
								colspan:6,
								maxLength: 10,
								minLength: 2
							},{
								xtype : "label",
								text : "DOMICILIO PERMANENTE",
								cls : "x-form-item label_header",
								colspan : 6,
								width : 730
							},
							{xtype : "label", text : "Pa\u00EDs de Domicilio", cls : "x-form-item label_spacing",colspan : 2},
							{xtype : "label", text : "Provincia", cls : "x-form-item label_spacing"},
							{xtype : "label", text : "Cant\u00F3n", cls : "x-form-item label_spacing"},
							{
								xtype : "combo",
								id : "ctgPaisDireccion",
								name : "kycAdicional.ctgPaisDireccion.ctgPaisId",
								store : new Ext.data.SimpleStore({
									data : config.ctgPaises || [],
									fields : [ "ctgPaisDireccionId",
											"ctgPaisNacionalidad",
											"ctgPaisNombre" ]
								}),
								displayField : "ctgPaisNombre",
								valueField : "ctgPaisDireccionId",
								allowBlank : false,
								colspan : 2,
								listeners : {
									change : function() {
										var disable = this.getValue() != Efx.constants.codes.COSTA_RICA;
										Efx.utils.setDisabled("ctgProvinciaId", disable,true);
										Efx.utils.setDisabled("ctgCantonId", disable,true);
										Efx.utils.setDisabled("ctgDistritoId", disable,true);
										Efx.utils.setDisabled("ctgPobladoId", disable,true);
										Efx.utils.setDisabled("kycAdicionalOtro", disable,true);

										Ext.getCmp("ctgPobladoId").clearInvalid();
										Ext.getCmp("kycAdicionalOtro").clearInvalid();
										Efx.combos.setRequiredAndValidate("ctgProvinciaId", !disable);
										Efx.combos.setRequiredAndValidate("ctgCantonId", !disable);
										Efx.combos.setRequiredAndValidate("ctgDistritoId", !disable);

										if (Ext.getCmp("ctgPaisDireccion").getValue() == Efx.constants.codes.COSTA_RICA)
										{
							var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPobladoId"))&&
								Ext.isEmpty(Efx.utils.getValue("kycAdicionalOtro"));
								Efx.utils.setRequiredAndValidate("ctgPobladoId", isEmpty);
								Efx.utils.setRequiredAndValidate("kycAdicionalOtro", isEmpty);
										}
									}}
							},{
								xtype : "combo",
							id : "ctgProvinciaId",
							name : "kycAdicional.ctgProvincia.ctgProvinciaId",
							store : new Ext.data.SimpleStore({
								data : config.ctgProvincias || [],
								fields : [ "ctgProvinciaId","ctgProvinciaNombre" ]
							}),
							displayField : "ctgProvinciaNombre",
							valueField : "ctgProvinciaId",
							allowBlank : false
							,
							listeners : {
								change : function() {
									Efx.combos.loadData("ctgCantonId",
									Efx.combos.getAllCantonesByProvinciaCombo(this.getValue(),config.ctgCantones));
									Efx.combos.removeAll("ctgDistritoId", true);
								}}
						},
						{
							xtype : "combo",
							id : "ctgCantonId",
							name : "kycAdicional.ctgCanton.ctgCantonId",
							store : new Ext.data.SimpleStore({
								data : [],
								fields : [ "ctgCantonId", "ctgCantonNombre","ctgProvinciaId" ]}),
							displayField : "ctgCantonNombre",
							valueField : "ctgCantonId",
							allowBlank : false,
							listeners : {
								change : function() {
									Efx.combos.loadData("ctgDistritoId",
									Efx.combos.getAllDistritosByCantonCombo(this.getValue(),config.ctgDistritos));
								}}
						},
							{xtype : "label", text : "Distrito",cls : "x-form-item label_spacing"},
							{xtype : "label", text : "Barrio/Poblado",cls : "x-form-item label_spacing",colspan : 2},
							{xtype : "label", text : "Otro", cls : "x-form-item label_spacing", colspan : 2},
							{
								xtype : "combo",
								id : "ctgDistritoId",
								name : "kycAdicional.ctgDistrito.ctgDistritoId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgDistritoId","ctgDistritoNombre","ctgCantonId"]
								}),
								displayField : "ctgDistritoNombre",
								valueField : "ctgDistritoId",
								allowBlank : false,
								listeners:{
									change: function() {
										Efx.combos.loadData("ctgPobladoId",Efx.combos.getAllPobladosByDistritoCombo(
											this.getValue(),config.ctgPoblados));
									}}
							},{
								xtype : "combo",
								id : "ctgPobladoId",
								name : "kycAdicional.ctgPoblado.ctgPobladoId",
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
										if (Ext.getCmp("ctgPaisDireccion").getValue() == Efx.constants.codes.COSTA_RICA)
											{
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPobladoId"))&&
									Ext.isEmpty(Efx.utils.getValue("kycAdicionalOtro"));
									Efx.utils.setRequiredAndValidate("ctgPobladoId", isEmpty);
									Efx.utils.setRequiredAndValidate("kycAdicionalOtro", isEmpty);
											}
									}
								}
							},{
								xtype : "textfield",
								id : "kycAdicionalOtro",
								name : "kycAdicional.kycAdicionalOtro",
								maxLength : 100,
								listeners:
								{
									change: function()
										{
											if (Ext.getCmp("ctgPaisDireccion").getValue() == Efx.constants.codes.COSTA_RICA)
												{
									var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPobladoId"))&&
										Ext.isEmpty(Efx.utils.getValue("kycAdicionalOtro"));
										Efx.utils.setRequiredAndValidate("ctgPobladoId", isEmpty);
										Efx.utils.setRequiredAndValidate("kycAdicionalOtro", isEmpty);
												}
										}
									}
							},{
								xtype : "label",
								text : "Direcci\u00f3n Exacta (Favor incluir calle, av, etc)",
								cls : "x-form-item label_spacing",
								width: 480,
								colspan : 6
							},{
								xtype : "textfield",
								id : "kycAdicionalDireccion",
								name : "kycAdicional.kycAdicionalDireccion",
								maxLength : 100,
								allowBlank:false,
								width:710,
								colspan:6
							},
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
						            allowBlank: false,
						            items : config.ctgResultadoInvestigacion || [],
						            colspan: 2
						   },
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan: 2},

							{xtype: "label", text: "Adjuntar Pantalla de B\u00fasqueda", cls: "x-form-item label_spacing", colspan: 2},
							{
						            xtype: "checkbox",
						            id: "kycAdicionalPantallaBusqueda",
						            name: "kycAdicional.kycAdicionalPantallaBusqueda",
						            width: 100,
						            colspan: 4,
						            inputValue: "1",
						            uncheckedValue: "0"
						        },
						    	{xtype: "label", text: "Memo", cls: "x-form-item label_spacing", colspan: 6},
						        {
									xtype : "textarea",
									id : "kycAdicionalMemo",
									name : "kycAdicional.kycAdicionalMemo",
									maxLength : 500,
									colspan : 6,
									height : 40,
									width : 715
								},{
									xtype: "hidden",
									id: "kycAdicionalId",
									name: "kycAdicional.kycAdicionalId"
								},{
									xtype: "hidden",
									id: "kycAdicionalCodigoTransaccion",
									name: "kycAdicional.kycAdicionalCodigoTransaccion"
								},{
									xtype: "hidden",
									id: "kycAdicionalCodigoReferencia",
									name: "kycAdicional.kycAdicionalCodigoReferencia"
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
							{
								xtype: "hidden",
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

