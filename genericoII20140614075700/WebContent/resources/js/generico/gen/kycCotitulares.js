KycCotitulares = function(){
	var configWindow = {
		add: "kycCotitularesAgregarTop",
		edit: "kycCotitularesEditarTop",
		remove: "kycCotitularesEliminarTop",
		grid: "kycCotitularesGrid",
		save: "kycCotitularesGuardarTop",
		form: "kycCotitularesForm"
	};
	var configWindowBottom = {
			add: "kycCotitularesAgregarBottom",
			edit: "kycCotitularesEditarBottom",
			remove: "kycCotitularesEliminarBottom",
			save: "kycCotitularesGuardarBottom"
	};
	return {
		agregarCotitulares: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarCotitulares: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarCotitulares: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycCotitulares/delete",
					params: {
						kycCotitularesId: Efx.utils.getValue("kycCotitularesId"),
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
								Efx.form.clearAndDisable("kycCotitularesForm");
								if(jsonObject.kycCotitulares){
			    					Ext.getCmp("kycCotitularesGrid").getStore().loadData(jsonObject.kycCotitulares);
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
		guardarCotitulares: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycCotitularesForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycCotitulares/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycCotitulares.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycCotitulares.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
					esTransaccion : Efx.utils.getValue("esTransaccion")
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycCotitularesForm", true);
    				if(action.result.kycCotitulares){
    					Ext.getCmp("kycCotitularesGrid").getStore().loadData(action.result.kycCotitulares);
    					Ext.getCmp("kycCotitularesGrid").getSelectionModel().select(action.result.kycCotitularesIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},

		findFromBureau: function(){
			Efx.message.progress("Buscando en Bureau...");
			if(Ext.isEmpty(Efx.utils.getValue("kycCotitularesNumeroCedula"))){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycCotitulares/findFromBureau",
				params: {
					kycPersonaFisicaDocumento1: Efx.utils.getValue("kycCotitularesNumeroCedula"),
					tipoBoton : "1",
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
    				kycCotitularesId :Efx.utils.getValue("kycCotitularesId"),
    				kycTipoPersona : Efx.utils.getValue("ctgTipoCedula")
				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycCotitularesNombres").setValue(jsonObject.kycCotitularesNombres);
						Ext.getCmp("kycCotitularesPrimerApellido").setValue(jsonObject.kycCotitularesPrimerApellido);
						Ext.getCmp("kycCotitularesSegundoApellido").setValue(jsonObject.kycCotitularesSegundoApellido);
						Ext.getCmp("ctgNacionalidad").setValue(jsonObject.ctgNacionalidad);
						Ext.getCmp("ctgPaisDomicilio").setValue(jsonObject.ctgPaisDomicilio);
						Ext.getCmp("ctgProvincia").setValue(jsonObject.ctgProvincia);
						Ext.getCmp("ctgCanton").setValue(jsonObject.ctgCanton);
						Ext.getCmp("ctgDistrito").setValue(jsonObject.ctgDistrito);
						Ext.getCmp("kycCotitularesTelefono1").setValue(jsonObject.kycCotitularesTelefono1);
						Ext.getCmp("kycCotitularesTelefono2").setValue(jsonObject.kycCotitularesTelefono2);
						Ext.getCmp("kycCotitularesTelefono3").setValue(jsonObject.kycCotitularesTelefono3);
						Ext.getCmp("kycCotitularesDireccion").setValue(jsonObject.kycCotitularesDireccion);
						Ext.getCmp("ctgGenero").setValue(jsonObject.ctgGenero);
						Ext.getCmp("kycCotitularesLugarNacimiento").setValue(jsonObject.kycCotitularesLugarNacimiento);
						Ext.getCmp("kycCotitularesFechaNacimiento").setValue(jsonObject.kycCotitularesFechaNacimiento);
						Ext.getCmp("kycCotitularesCodigoTransaccion").setValue(jsonObject.kycCotitularesCodigoTransaccion);
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
				title: "CERTIFICADO DE INVERSI\u00d3N -  COTITULARES",
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
							   id: "kycCotitularesAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycCotitulares.agregarCotitulares
						   },{
					    	   text: "Editar",
					    	   id: "kycCotitularesEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycCotitulares.editarCotitulares
					       },{
					    	   text: "Eliminar",
					    	   id: "kycCotitularesEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycCotitulares.eliminarCotitulares
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycCotitularesGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycCotitulares.guardarCotitulares
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
							   id: "kycCotitularesAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycCotitulares.agregarCotitulares
						   },{
					    	   text: "Editar",
					    	   id: "kycCotitularesEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycCotitulares.editarCotitulares
					       },{
					    	   text: "Eliminar",
					    	   id: "kycCotitularesEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycCotitulares.eliminarCotitulares
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycCotitularesGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycCotitulares.guardarCotitulares
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycCotitularesGrid",
						height: 100,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycCotitulares || [],
					    	fields: [
								"kycCotitulares.kycCotitularesId",
								"kycCotitularesNombres",
								"kycCotitularesPrimerApellido",
								"kycCotitularesSegundoApellido",
								"kycCotitulares.kycCotitularesNumeroCedula",
								"kycCotitulares.kycCotitularesFechaNacimiento",
								"kycCotitulares.kycCotitularesLugarNacimiento",
								"kycCotitulares.kycCotitularesLugarTrabajo",
								"kycCotitulares.kycCotitularesCodigoCliente",
								"kycCotitulares.kycCotitularesDireccion",
								"kycCotitulares.kycCotitularesTelefono1",
								"kycCotitulares.kycCotitularesTelefono2",
								"kycCotitulares.kycCotitularesTelefono3",
								"kycCotitulares.kycCotitularesTelefono4",
								"kycCotitulares.kycCotitularesEmail",
								"kycCotitulares.kycCotitularesPuesto",
								"kycCotitulares.kycFechaActualizacion",
								"ctgNacionalidad",
								"ctgPaisDomicilio",
								"ctgProvincia",
								"ctgCanton",
								"ctgDistrito",
								"ctgGenero",
								"ctgOcupacion",
								"ctgEstadoCivil",
								"ctgTipoCedula",
								"kycCotitulares.kycCotitularesCodigoTransaccion",
			    	        ]
					    }),
					    columns: [
					              {text: "Nombre Completo de Adicional",   xtype: "templatecolumn", tpl: "{kycCotitularesNombres} " + "{kycCotitularesPrimerApellido} " + "{kycCotitularesSegundoApellido}", flex: 1.5},
					              {header: "N\u00famero de Documento",  dataIndex: "kycCotitulares.kycCotitularesNumeroCedula", flex: 1},
					              {header: "Relaci\u00f3n",  dataIndex: "kycCotitulares.kycCotitularesPuesto", flex: 1}
					              ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycCotitularesForm", record.data);
					    			Efx.form.setDisable("kycCotitularesForm");
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
						id: "kycCotitularesForm",
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
								text: "COTITULARES",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{
								xtype : "label",
								text : "Tipo de Documento",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "N\u00famero de Documento",
								cls : "x-form-item label_spacing",
								colspan:4
							},
							{
								xtype: "combo",
								id: "ctgTipoCedula",
								name: "kycCotitulares.ctgTipoCedula.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTiposCedulas || [],
									fields: ["ctgTipoCedulaId", "ctgTipoCedulaNombre"]
								}),
								displayField: "ctgTipoCedulaNombre",
								valueField: "ctgTipoCedulaId",
								allowBlank: false,
								colspan: 2,
								listeners:
									{
									change: function()
										{
										if (this.getValue() != 465)
											{
												Ext.getCmp("validarButtonId1").disable();
												Ext.getCmp("kycCotitularesNumeroCedula").vtype = undefined;
											}
										else
											{
												Ext.getCmp("validarButtonId1").enable();
												Ext.getCmp("kycCotitularesNumeroCedula").vtype = "CedNac";
											}
										},

									render: function()
										{
											if (this.getValue() != 465)
											{
												Ext.getCmp("validarButtonId1").disable();
												Ext.getCmp("kycCotitularesNumeroCedula").vtype = undefined;

											}
											else
											{
												Ext.getCmp("validarButtonId1").enable();
												Ext.getCmp("kycCotitularesNumeroCedula").vtype = "CedNac";

											}
										}
									}
							},
							{
								xtype : "textfield",
								id : "kycCotitularesNumeroCedula",
								name : "kycCotitulares.kycCotitularesNumeroCedula",
								allowBlank : false,
								maxlength: 20,
								minlength: 9,
								colspan:2
							},
							{
			                    xtype: 'button',
			                    id:"validarButtonId1",
			                    text: 'VALIDAR C\u00c9DULA',
			                    handler: KycCotitulares.findFromBureau,
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
								id : "kycCotitularesNombres",
								name : "kycCotitulares.kycCotitularesNombres",
								allowBlank : false,
								maxLength : 150,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycCotitularesPrimerApellido",
								name : "kycCotitulares.kycCotitularesPrimerApellido",
								maxLength : 50,
								allowBlank:false,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycCotitularesSegundoApellido",
								name : "kycCotitulares.kycCotitularesSegundoApellido",
								maxLength : 50,
								allowBlank:false,
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
								id : "ctgGenero",
								allowBlank:false,
								name : "kycCotitulares.ctgGenero.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgGeneros || [],
									fields : [ "ctgGeneroId",
											"ctgGeneroNombre" ]
								}),
								displayField : "ctgGeneroNombre",
								valueField : "ctgGeneroId",
								colspan:2
							},
							{
								xtype : "combo",
								id : "ctgNacionalidad",
								name : "kycCotitulares.ctgNacionalidad.ctgPaisId",
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
								name : "kycCotitulares.ctgEstadoCivil.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgEstadosCiviles || [],
									fields : [ "ctgEstadoCivilId",
											"ctgEstadoCivilNombre" ]
								}),
								displayField : "ctgEstadoCivilNombre",
								valueField : "ctgEstadoCivilId",
								allowBlank:false,
								colspan:2
							},
							{
								xtype : "label",
								text : "Lugar de Nacimiento",
								cls : "x-form-item label_spacing",
								colspan:4
							},
							{
								xtype : "label",
								text : "Fecha de Nacimiento",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycCotitularesLugarNacimiento",
								name : "kycCotitulares.kycCotitularesLugarNacimiento",
								maxLength : 250,
								allowBlank:false,
								width: 465,
								colspan: 4
							},
							{
								xtype : "datefield",
								id : "kycCotitularesFechaNacimiento",
								name : "kycCotitulares.kycCotitularesFechaNacimiento",
								submitFormat : "Ymd",
								altFormats: "Ymd|d/m/Y",
								allowBlank:false,
								colspan: 2
							},
							{xtype : "label", text : "Profesi\u00f3n", cls : "x-form-item label_spacing", colspan:2},
							{xtype : "label", text : "Lugar de Trabajo", cls : "x-form-item label_spacing", colspan:2},
							{xtype : "label", text : "Puesto", cls : "x-form-item label_spacing", colspan:2},
							{
								xtype : "combo",
								id : "ctgOcupacion",
								name : "kycCotitulares.ctgOcupacion.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgOcupaciones || [],
									fields : [ "ctgOcupacionesId",
											"ctgOcupacionesNombre" ]
								}),
								displayField : "ctgOcupacionesNombre",
								valueField : "ctgOcupacionesId",
								allowBlank:false,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycCotitularesLugarTrabajo",
								allowBlank:false,
								maxLength : 250,
								name : "kycCotitulares.kycCotitularesLugarTrabajo"
							},
							{
								xtype : "textfield",
								id : "kycCotitularesPuesto",
								allowBlank:false,
								maxLength : 150,
								name : "kycCotitulares.kycCotitularesPuesto"
							},
							{
								xtype : "label",
								text : "DATOS DE CONTACTO",
								cls : "x-form-item label_header",
								colspan : 6,
								width : 730
							},
							{
								xtype : "label",
								text : "Tel\u00E9fono de Domicilio",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Tel\u00E9fono Celular",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Tel\u00E9fono de Trabajo/Oficina",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "textfield",
								id : "kycCotitularesTelefono1",
								name : "kycCotitulares.kycCotitularesTelefono1",
								allowBlank : false,
								maxLength : 8,
								vtype: "validNA"
							},
							{
								xtype : "textfield",
								id : "kycCotitularesTelefono2",
								name : "kycCotitulares.kycCotitularesTelefono2",
								allowBlank : false,
								maxLength : 8,
								vtype: "validNA"
							},
							{
								xtype : "textfield",
								id : "kycCotitularesTelefono3",
								name : "kycCotitulares.kycCotitularesTelefono3",
								allowBlank : false,
								maxLength : 8,
								vtype: "validNA"
							},{
								xtype : "label",
								text : "Tel\u00E9fono Fax",
								cls : "x-form-item label_spacing"
							},{
								xtype : "label",
								text : "Direcci\u00f3n Electr\u00f3nica",
								cls : "x-form-item label_spacing",
								colspan : 4
							},{
								xtype : "textfield",
								id : "kycCotitularesTelefono4",
								name : "kycCotitulares.kycCotitularesTelefono4",
								allowBlank : false,
								vtype: "validNA",
								maxLength : 8
							},{
								xtype : "textfield",
								id : "kycCotitularesEmail",
								name : "kycCotitulares.kycCotitularesEmail",
								fieldCls : "remove-uppercase",
								maxLength : 250,
								allowBlank : false,
								colspan : 4,
								vtype : "email",
								width : 230
							},{
								xtype : "label",
								text : "DOMICILIO",
								cls : "x-form-item label_header",
								colspan : 6,
								width : 730
							},{
								xtype : "label",
								text : "Pa\u00EDs de Domicilio",
								cls : "x-form-item label_spacing",
								colspan : 2
							},{
								xtype : "label",
								text : "Provincia",
								cls : "x-form-item label_spacing"
							},{
								xtype : "label",
								text : "Cant\u00F3n",
								cls : "x-form-item label_spacing"
							},{
								xtype : "combo",
								id : "ctgPaisDomicilio",
								name : "kycCotitulares.ctgPaisDomicilio.ctgPaisId",
								store : new Ext.data.SimpleStore({
									data : config.ctgPaises || [],
									fields : [ "ctgPaisDomicilioId",
											"ctgPaisNacionalidad",
											"ctgPaisNombre" ]
								}),
								displayField : "ctgPaisNombre",
								valueField : "ctgPaisDomicilioId",
								allowBlank : false,
								colspan : 2,
								listeners : {
									change : function() {
										var disable = this.getValue() != Efx.constants.codes.COSTA_RICA;
										Efx.utils.setDisabled("ctgProvincia", disable,true);
										Efx.utils.setDisabled("ctgCanton", disable,true);
										Efx.utils.setDisabled("ctgDistrito", disable,true);

										Efx.combos.setRequiredAndValidate("ctgProvincia", !disable);
										Efx.combos.setRequiredAndValidate("ctgCanton", !disable);
										Efx.combos.setRequiredAndValidate("ctgDistrito", !disable);
									}}
							},{
								xtype : "combo",
								id : "ctgProvincia",
								name : "kycCotitulares.ctgProvincia.ctgProvinciaId",
								store : new Ext.data.SimpleStore({
									data : config.ctgProvincias || [],
									fields : [ "ctgProvinciaId","ctgProvinciaNombre" ]
								}),
								displayField : "ctgProvinciaNombre",
								valueField : "ctgProvinciaId",
								allowBlank : false,
								listeners : {
									change : function() {
										Efx.combos.loadData("ctgCanton",
										Efx.combos.getAllCantonesByProvinciaCombo(this.getValue(),config.ctgCantones));
										Efx.combos.removeAll("ctgDistrito", true);
									}}
							},{
								xtype : "combo",
								id : "ctgCanton",
								name : "kycCotitulares.ctgCanton.ctgCantonId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgCantonId","ctgCantonNombre","ctgProvinciaId" ]
								}),
								displayField : "ctgCantonNombre",
								valueField : "ctgCantonId",
								allowBlank : false,
								listeners : {
									change : function() {
										Efx.combos.loadData("ctgDistrito",
										Efx.combos.getAllDistritosByCantonCombo(this.getValue(), config.ctgDistritos));
									}}
							},{
								xtype : "label",
								text : "Distrito",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Direcci\u00f3n Exacta",
								cls : "x-form-item label_spacing",
								colspan : 4
							},{
								xtype : "combo",
								id : "ctgDistrito",
								name : "kycCotitulares.ctgDistrito.ctgDistritoId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgDistritoId", "ctgDistritoNombre", "ctgCantonId" ]
								}),
								displayField : "ctgDistritoNombre",
								valueField : "ctgDistritoId",
								allowBlank : false
							},{
								xtype : "textfield",
								id : "kycCotitularesDireccion",
								name : "kycCotitulares.kycCotitularesDireccion",
								maxLength : 100,
								allowBlank:false,
								width:480,
								colspan:4
							},
							{
								xtype : "label",
								text : "Codigo de Cliente",
								cls : "x-form-item label_spacing",
								colspan : 6
							},
							{
								xtype : "textfield",
								id : "kycCotitularesCodigoCliente",
								name : "kycCotitulares.kycCotitularesCodigoCliente",
								maxLength : 30,
								colspan:6
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycCotitularesId",
								name: "kycCotitulares.kycCotitularesId"
							},{
								xtype: "hidden",
								id: "kycCotitularesCodigoTransaccion",
								name: "kycCotitulares.kycCotitularesCodigoTransaccion"
							},{
								xtype: "hidden",
							id: "kycCotitularesCodigoReferencia",
							name: "kycCotitulares.kycCotitularesCodigoReferencia"
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