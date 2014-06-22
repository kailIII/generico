KycRepresentanteLegal = function() {
	var control = true;
	var ctgTipoDocumentos = [];
	var configWindow = {
		add : "kycRepresentanteLegalAgregarTop",
		edit : "kycRepresentanteLegalEditarTop",
		save : "kycRepresentanteLegalGuardarTop",
		remove : "kycRepresentanteLegalEliminarTop",
		cancel: "kycRepresentanteLegalCancelarTop",
		grid : "kycRepresentanteLegalGrid",
		form : "kycRepresentanteLegalForm"
	};
	var configWindowBottom = {
		add : "kycRepresentanteLegalAgregarBottom",
		edit : "kycRepresentanteLegalEditarBottom",
		save : "kycRepresentanteLegalGuardarBottom",
		cancel: "kycRepresentanteLegalCancelarBottom",
		remove : "kycRepresentanteLegalEliminarBottom"
	};
	return {
		getCtgTipoDocumentos : function() {
			return ctgTipoDocumentos;
		},
		setCtgTipoDocumentos : function(values) {
			ctgTipoDocumentos = values;
		},
		showBusquedaRepresentanteLegal : function() {
			var kycRepresentanteLegalWindow = Ext.WindowMgr
					.get("kycRepresentanteLegalWindow");
			if (kycRepresentanteLegalWindow) {
				kycRepresentanteLegalWindow.show();
				return;
			}
			kycRepresentanteLegalWindow = Ext
					.create(
							"Ext.window.Window",
							{
								id : "kycRepresentanteLegalWindow",
								title : "B\u00FAsqueda Representante Legal",
								modal : true,
								closable : false,
								layout : "fit",
								height : 150,
								width : 450,
								items : {
									xtype : "form",
									id : "kycBusquedaRepresentanteLegalForm",
									border : false,
									bodyPadding : 10,
									defaults : Efx.utils.defaults({
										labelWidth : 150
									}),
									items : [
											{
												xtype : "combo",
												id : "ctgWindowTipoDocumentoId",
												fieldLabel : "Tipo Identificaci\u00F3n",
												store : new Ext.data.SimpleStore(
														{
															data : KycRepresentanteLegal
																	.getCtgTipoDocumentos(),
															fields : [
																	"ctgTipoDocumentoId",
																	"ctgTipoDocumentoNombre",
																	"ctgTipoDocumentoPadre",
																	"ctgTipoDocumentoHijo" ]
														}),
												displayField : "ctgTipoDocumentoNombre",
												valueField : "ctgTipoDocumentoId",
												allowBlank : false,
												width : 350
											},
											{
												xtype : "textfield",
												id : "kycBusquedaRepresentanteLegalDocumento1",
												name : "kycRepresentanteLegalDocumento1",
												fieldLabel : "Identificaci\u00F3n",
												allowBlank : false,
												selectOnFocus : true,
												width : 350
											} ]
								},
								listeners : {
									show : function() {
										Ext
												.getCmp(
														"kycBusquedaRepresentanteLegalForm")
												.getForm().reset();
										Ext.WindowMgr.get(
												"kycRepresentanteLegalWindow")
												.focus();
										Efx.utils
												.setFocus("ctgWindowTipoDocumentoId");
										Efx.utils
												.setValue(
														"kycBusquedaRepresentanteLegalDocumento1",
														Efx.utils
																.getValue("kycRepresentanteLegalDocumento1"));
										Efx.utils
												.setValue(
														"ctgWindowTipoDocumentoId",
														Efx.utils
																.getValue("ctgTipoDocumentoId"));
									}
								},
								buttons : [
										{
											text : "Buscar",
											handler : KycRepresentanteLegal.decodeSaveFrom
										},
										{
											text : "Cerrar",
											handler : function() {
												kycRepresentanteLegalWindow
														.hide();
											}
										} ]
							});
			kycRepresentanteLegalWindow.show();
		},
		decodeSaveFrom : function() {
			var ctgTipoDocumento = Efx.combos.getSelectedData(
					"ctgWindowTipoDocumentoId", "ctgTipoDocumentoId");
			if (!ctgTipoDocumento) {
				Efx.message
						.alertInvalid("Debe indicar el Tipo de Identificaci\u00F3n");
				return;
			}
			if (Efx.constants.codes.DOCUMENTO_CEDULA == ctgTipoDocumento.ctgTipoDocumentoHijo) {
				KycRepresentanteLegal.saveFromBureau(ctgTipoDocumento);
			} else {
				KycRepresentanteLegal.saveByDocument(ctgTipoDocumento);
			}
		},
		saveByDocument : function(ctgTipoDocumento) {
			Efx.message.progress("Obteniendo Informaci\u00F3n...");
			Ext
					.getCmp("kycBusquedaRepresentanteLegalForm")
					.getForm()
					.submit(
							{
								url : Efx.constants.CONTEXT_PATH
										+ "/kycRepresentanteLegal/saveByDocument",
								timeout : Efx.constants.TIMEOUT_SECONDS,
								params : {
									"ctgTipoDocumento.ctgCatalogoId" : ctgTipoDocumento.ctgTipoDocumentoId,
									"ctgTipoDocumento.ctgCatalogoHijo" : ctgTipoDocumento.ctgTipoDocumentoHijo,
									"ctgTipoDocumento.ctgCatalogoNombre" : ctgTipoDocumento.ctgTipoDocumentoNombre,
									"kycPersonaJuridica.kycPersonaJuridicaId" : EfxKYC
											.getKycPersonaJuridicaId()
								},
								success : function(form, action) {
									Efx.message.alert(action.result.message);
									if (action.result.encontrado) {
										Efx.form
												.setValues(
														"kycRepresentanteLegalForm",
														action.result.kycRepresentanteLegal);
									} else {
										Efx.utils
												.setDisabled(
														"kycRepresentanteLegalPrimerNombre",
														false, true);
										Efx.utils
												.setDisabled(
														"kycRepresentanteLegalSegundoNombre",
														false, true);
										Efx.utils
												.setDisabled(
														"kycRepresentanteLegalPrimerApellido",
														false, true);
										Efx.utils
												.setDisabled(
														"kycRepresentanteLegalSegundoApellido",
														false, true);
										Efx.utils
												.setDisabled(
														"kycRepresentanteLegalFechaNacimiento",
														false, true);
										Efx.utils
												.setValue(
														"ctgTipoDocumentoId",
														ctgTipoDocumento.ctgTipoDocumentoId);
										Efx.utils
												.setValue(
														"kycRepresentanteLegalDocumento1",
														action.result.kycRepresentanteLegalDocumento1);
									}
									Ext.WindowMgr.get(
											"kycRepresentanteLegalWindow")
											.hide();
								},
								failure : Efx.form.failureProcedure
							});
		},
		saveFromBureau : function(ctgTipoDocumento) {
			Efx.message.progress(Efx.constants.SAVING);
			Ext
					.getCmp("kycBusquedaRepresentanteLegalForm")
					.getForm()
					.submit(
							{
								url : Efx.constants.CONTEXT_PATH
										+ "/kycRepresentanteLegal/saveFromBureau",
								timeout : Efx.constants.TIMEOUT_SECONDS,
								params : {
									"ctgTipoDocumento.ctgCatalogoId" : ctgTipoDocumento.ctgTipoDocumentoId,
									"ctgTipoDocumento.ctgCatalogoHijo" : ctgTipoDocumento.ctgTipoDocumentoHijo,
									"ctgTipoDocumento.ctgCatalogoNombre" : ctgTipoDocumento.ctgTipoDocumentoNombre,
									kycPersonaJuridicaId : EfxKYC
											.getKycPersonaJuridicaId()
								},
								success : function(form, action) {
									Efx.message.alert(action.result.message);
									Efx.form
											.setValues(
													"kycRepresentanteLegalForm",
													action.result.kycRepresentanteLegal);
									Efx.form
											.setEnable("kycRepresentanteLegalForm");
									Efx.utils
											.setValue(
													"kycFechaActualizacion",
													action.result.kycFechaActualizacion);
									Efx.utils.setVisible(
											"kycRepresentanteLegalToolbarTop",
											true);
									Efx.utils
											.setVisible(
													"kycRepresentanteLegalToolbarBottom",
													true);
									Ext.WindowMgr.get(
											"kycRepresentanteLegalWindow")
											.close();
								},
								failure : Efx.form.failureProcedure
							});
		},
		agregarRepresentanteLegal : function() {
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
			Ext.getCmp("kycRepresentanteLegalFechaNacimiento").allowEnable = true;
			KycRepresentanteLegal.showBusquedaRepresentanteLegal();
			return !control;
		},
		editarRepresentanteLegal : function() {
			Ext.getCmp("kycRepresentanteLegalFechaNacimiento").allowEnable = false;
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			return !control;
		},
		eliminarRepresentanteLegal : function() {
			Efx.message.confirmDelete(function() {
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout : Efx.constants.TIMEOUT_SECONDS,
					url : Efx.constants.CONTEXT_PATH + "/kycRepresentanteLegal/delete",
					params : {
						kycRepresentanteLegalId : Efx.utils.getValue("kycRepresentanteLegalId"),
						kycPersonaJuridicaId : EfxKYC.getKycPersonaJuridicaId()
					},
					callback : function(options, success, response) {
						Ext.Msg.hide();
						if (success) {
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if (jsonObject && jsonObject.success) {
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom,"remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycRepresentanteLegalForm");
								if (jsonObject.kycRepresentanteLegal) {
									Ext.getCmp("kycRepresentanteLegalGrid").getStore().loadData(jsonObject.kycRepresentanteLegal);
								}
								return;
							}
							jsonObject = jsonObject || {};
							Efx.message
									.alertInvalid(jsonObject.message
											|| Efx.constants.DEFAULT_ERROR_MESSAGE);
							return;
						}
						Efx.message.alertInvalid(Efx.constants.DEFAULT_ERROR_MESSAGE);
					}
				});
			});
		},
		cancelarRepresentanteLegal : function() {
			Efx.form.switchButton(configWindow, "cancelNotClear");
			Efx.form.switchButton(configWindowBottom, "cancelNotClear");
			return false;
		},
		saveKycRepresentanteLegal : function() {
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycRepresentanteLegalForm").getForm().submit({
				url : Efx.constants.CONTEXT_PATH + "/kycRepresentanteLegal/save",
				timeout : Efx.constants.TIMEOUT_SECONDS,
				params : {
					"kycRepresentanteLegal.kycPersonaJuridica.kyc.kycId" : EfxKYC.getKycId(),
					"kycRepresentanteLegal.kycPersonaJuridica.kycPersonaJuridicaId" : EfxKYC.getKycPersonaJuridicaId()
						},
				success : function(form, action) {
					Efx.form.switchButton(configWindow, "save");
					Efx.form.switchButton(configWindowBottom,"save");
					Efx.message.alert(action.result.message);
					Efx.form.setDisable("kycRepresentanteLegalForm", true);
    				if(action.result.kycRepresentanteLegal){
    					Ext.getCmp("kycRepresentanteLegalGrid").getStore().loadData(action.result.kycRepresentanteLegal);
    					Ext.getCmp("kycRepresentanteLegalGrid").getSelectionModel().select(action.result.kycRepresentanteLegalIndex);

    				}
    			},
				failure : Efx.form.failureProcedure
			});
		},
		init : function(config) {
			var kycRepresentanteLegal = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC
					.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if (kycAlertas)
				configToReturn.items.push(kycAlertas);
			KycRepresentanteLegal
					.setCtgTipoDocumentos(config.ctgWindowTipoDocumentos || []);
			configToReturn.items
					.push({
						xtype : "panel",
						flex : 1,
//						id : "kycRepresentanteLegalForm",
						title : "REPRESENTANTE LEGAL",
						autoScroll : true,

						dockedItems : [
				{
					xtype: "toolbar",
					dock: "top",
					hidden: EfxKYC.getKycVigente() === false,
					items: [
					   '->',
					   {
						   text: "Nuevo",
						   id: "kycRepresentanteLegalAgregarTop",
						   iconCls: Efx.constants.icons.ADD_ICON,
						   handler: KycRepresentanteLegal.agregarRepresentanteLegal,

					   },{
				    	   text: "Editar",
				    	   id: "kycRepresentanteLegalEditarTop",
						   iconCls: Efx.constants.icons.EDIT_ICON,
						   handler: KycRepresentanteLegal.editarRepresentanteLegal,

				       },{
				    	   text: "Guardar",
				    	   id: "kycRepresentanteLegalGuardarTop",
						   iconCls: Efx.constants.icons.SAVE_ICON,
						   handler: KycRepresentanteLegal.saveKycRepresentanteLegal
				       },{
				    	   text: "Eliminar",
				    	   id: "kycRepresentanteLegalEliminarTop",
						   iconCls: Efx.constants.icons.DELETE_ICON,
						   handler: KycRepresentanteLegal.eliminarRepresentanteLegal
				       },{
				    	   text:"Cancelar",
				    	   id: "kycRepresentanteLegalCancelarTop",
				    	   iconCls: Efx.constants.icons.CANCEL_ICON,
				    	   handler: KycRepresentanteLegal.cancelarRepresentanteLegal
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
						   id: "kycRepresentanteLegalAgregarBottom",
						   iconCls: Efx.constants.icons.ADD_ICON,
						   handler: KycRepresentanteLegal.agregarRepresentanteLegal
					   },{
				    	   text: "Editar",
				    	   id: "kycRepresentanteLegalEditarBottom",
						   iconCls: Efx.constants.icons.EDIT_ICON,
						   handler: KycRepresentanteLegal.editarRepresentanteLegal
				       },{
				    	   text: "Guardar",
				    	   id: "kycRepresentanteLegalGuardarBottom",
						   iconCls: Efx.constants.icons.SAVE_ICON,
						   handler: KycRepresentanteLegal.saveKycRepresentanteLegal
				       },{
				    	   text: "Eliminar",
				    	   id: "kycRepresentanteLegalEliminarBottom",
						   iconCls: Efx.constants.icons.DELETE_ICON,
						   handler: KycRepresentanteLegal.eliminarRepresentanteLegal
				       },{
				    	   text:"Cancelar",
				    	   id: "kycRepresentanteLegalCancelarBottom",
				    	   iconCls: Efx.constants.icons.CANCEL_ICON,
				    	   handler: KycRepresentanteLegal.cancelarRepresentanteLegal
				       }
	        	    ]
		        }
								],
								layout: {
								    type: "vbox",
								    align : "center",
								    pack  : "start"
								},
								defaults: {width: 730, margins: "5 0 5 0"},
						items : [
								{
									xtype : "grid",
									id : "kycRepresentanteLegalGrid",
									height : 150,
									minHeight : 150,
									collapsible: true,
									store : new Ext.data.SimpleStore(
											{
												data : kycRepresentanteLegal || [],
												fields : [
														"kycRepresentanteLegalId",
														"kycRepresentanteLegalPrimerNombre",
														"kycRepresentanteLegalSegundoNombre",
														"kycRepresentanteLegalPrimerApellido",
														"kycRepresentanteLegalSegundoApellido",
														"kycRepresentanteLegalDocumento1",
														"ctgNacionalidad.ctgPaisId",
														"kycRepresentanteLegalLugarNacimiento",
														"kycRepresentanteLegalFechaNacimiento",
														"ctgGenero.ctgCatalogoId",
														"ctgPaisDireccion.ctgPaisId",
														"ctgProvincia.ctgProvinciaId",
														"ctgCanton.ctgCantonId",
														"ctgDistrito.ctgDistritoId",
														"kycRepresentanteLegalDireccion",
														"kycRepresentanteLegalTelefono1",
														"kycRepresentanteLegalTelefono2",
														"kycRepresentanteLegalTelefono3",
														"kycRepresentanteLegalApartadoPostal",
														"kycRepresentanteLegalCorreoElectronico",
														"kycRepresentanteLegalPep",
														"kycRepresentanteLegalPepCargo",
														"kycRepresentanteLegalPepFechaInicio",
														"kycRepresentanteLegalPepFechaFin",
														"ctgPaisPep.ctgPaisId",
														"ctgTipoDocumento.ctgCatalogoId",
														"kycRepresentanteLegalFondosTerceros",
														"kycFechaActualizacion",
														"ctgTipoInclusion.ctgCatalogoId",
														"ctgEstadoCivil.ctgCatalogoId",
														"ctgProfesion.ctgCatalogoId",
														"ctgRelacionEmpresa.ctgCatalogoId",
														"kycRepresentanteLegalPepNombre"
														]
											}),
									columns : [
									        { 	text: 'Nombre Completo',
									        	xtype: 'templatecolumn',
									        	tpl: '{kycRepresentanteLegalPrimerNombre} ' +
									        		 '{kycRepresentanteLegalSegundoNombre} '+
									        		 '{kycRepresentanteLegalPrimerApellido} '+
									        		 '{kycRepresentanteLegalSegundoApellido}',
									        	flex:1
									        },
											{
												header : "Identificaci\u00F3n",
												dataIndex : "kycRepresentanteLegalDocumento1",
												width : 120
											}
											 ],
									listeners : {
										selectionchange : function(model,records) {
											if (!records || records.length <= 0) return;
											var record = records[0];
											if (record != null ) {
												Efx.form.setValues("kycRepresentanteLegalForm",	record.data);
												Efx.form.setDisable("kycRepresentanteLegalForm");
											}
											Efx.form.switchButton(configWindow,"rowclick");
											Efx.form.switchButton(configWindowBottom,"rowclick");
										},
										afterrender : function() {
											if (this.store.data.items.length > 0)
												Efx.grid.selectFirstRow(this);
											Efx.form.switchButton(configWindow,"cancelNotClear");
											Efx.form.switchButton(configWindowBottom,"cancelNotClear");
										}
									}
								},
								{
									xtype : "form",
									id : "kycRepresentanteLegalForm",
									flex : 1,
									border : false,
									autoScroll : true,
									layout : {
										type : "table",
										columns : 3,
										tableAttrs : {
											style : {
												width : "730px"
											},
											align : "center"
										}
									},
									defaults : {
										width : 160,
										selectOnFocus : true,
										enforceMaxLength : true,
										maxLength : 200,
										typeAhead : true,
										minChars : 1,
										queryMode : "local",
										forceSelection : true,
										allowEnable : true
									},
//									listeners : {
//										render : function() {
//											if (kycRepresentanteLegal
//													&& !Ext
//															.isEmpty(kycRepresentanteLegal.kycRepresentanteLegalId) != null
//													&& kycRepresentanteLegal.kycRepresentanteLegalId > 0
//													&& this.getForm()) {
//												this.getForm().setValues(
//														kycRepresentanteLegal);
//												if (EfxKYC.getKycVigente() === false)
//													Efx.form
//															.setDisable("kycRepresentanteLegalForm");
//											}
//											if (!kycRepresentanteLegal
//													|| kycRepresentanteLegal.kycRepresentanteLegalConsultado != "1") {
//												Efx.form
//														.setDisable("kycRepresentanteLegalForm");
//												KycRepresentanteLegal
//														.showBusquedaRepresentanteLegal();
//												Efx.utils.setVisible(
//														"kycRepresentanteLegalToolbarTop",
//														false);
//												Efx.utils
//														.setVisible(
//																"kycRepresentanteLegalToolbarBottom",
//																false);
//											}
//
//										}
//
//									},
									items : [

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
												text : "DATOS GENERALES",
												cls : "x-form-item label_header",
												colspan : 6,
												width : 730
											},
											/** inclusion* */
											 {	xtype: "label", text: "Tipo de Inclusi\u00f3n",
												cls: "x-form-item label_spacing",
												colspan: 6
											 },
											 {
											 xtype: "combo",
											 id: "ctgTipoInclusionId",
											 name: "ctgTipoInclusion.ctgCatalogoId",
											 // disabled: true,
											 store: new Ext.data.SimpleStore({
											 data: config.ctgTipoInclusiones ||
											 [],
											 fields: ["ctgTipoInclusionId",
											 "ctgTipoInclusionNombre",
											 "ctgTipoInclusionPadre",
											 "ctgTipoInclusionHijo"]
											 }),
											 displayField: "ctgTipoInclusionNombre",
											 valueField: "ctgTipoInclusionId",
											 allowBlank: false,
											 colspan : 6
											 },
											 {
													xtype : "label",
													text : "Tipo de Identificaci\u00F3n",
													cls : "x-form-item label_spacing"
												},
												{
													xtype : "label",
													text : "N\u00FAmero de Identificaci\u00F3n",
													cls : "x-form-item label_spacing",
													colspan : 4
												},
												{
													xtype : "combo",
													id : "ctgTipoDocumentoId",
													name : "ctgTipoDocumento.ctgCatalogoId",
//													readOnly : true,
													// disabled: true,
													store : new Ext.data.SimpleStore(
															{
																data : config.ctgTipoDocumentos
																		|| [],
																fields : [
																		"ctgTipoDocumentoId",
																		"ctgTipoDocumentoNombre",
																		"ctgTipoDocumentoPadre",
																		"ctgTipoDocumentoHijo" ]
															}),
													displayField : "ctgTipoDocumentoNombre",
													valueField : "ctgTipoDocumentoId",
													allowBlank : false,
													cls: 'x-item-disabled'
												},
												{
													xtype : "textfield",
													id : "kycRepresentanteLegalDocumento1",
													name : "kycRepresentanteLegalDocumento1",
													blankText : "Debe ingresar al menos un documento",
													allowBlank : false,
													disabled : true,
													submitOnDisable : true,
//													allowEnable : false,
													enforceMaxLength: true,
													maxLength: 9,
													colspan : 4
												},
											{
												xtype : "label",
												text : "Primer Nombre",
												cls : "x-form-item label_spacing"
											},
											{
												xtype : "label",
												text : "Segundo Nombre",
												cls : "x-form-item label_spacing",
												colspan : 4
											},
											{
												xtype : "textfield",
												id : "kycRepresentanteLegalPrimerNombre",
												name : "kycRepresentanteLegalPrimerNombre",
												//disabled : true,
												submitOnDisable : true,
//												allowEnable : false,
												allowBlank : false,
												maxLength : 20
											},
											{
												xtype : "textfield",
												id : "kycRepresentanteLegalSegundoNombre",
												name : "kycRepresentanteLegalSegundoNombre",
//												disabled : true,
												submitOnDisable : true,
//												allowEnable : false,
												maxLength : 20,
												colspan : 4
											},
											{
												xtype : "label",
												text : "Primer Apellido ",
												cls : "x-form-item label_spacing"
											},
											{
												xtype : "label",
												text : "Segundo Apellido",
												cls : "x-form-item label_spacing",
												colspan : 4
											},
											{
												xtype : "textfield",
												id : "kycRepresentanteLegalPrimerApellido",
												name : "kycRepresentanteLegalPrimerApellido",
//												disabled : true,
												submitOnDisable : true,
//												allowEnable : false,
												allowBlank : false,
												maxLength : 20
											},
											{
												xtype : "textfield",
												id : "kycRepresentanteLegalSegundoApellido",
												name : "kycRepresentanteLegalSegundoApellido",
//												disabled : true,
												submitOnDisable : true,
//												allowEnable : false,
												maxLength : 20,
												colspan : 4
											},
											{
												xtype : "label",
												text : "Nacionalidad",
												cls : "x-form-item label_spacing"
											},
											{
												xtype : "label",
												text : "Lugar de Nacimiento",
												cls : "x-form-item label_spacing"
											},
											{
												xtype : "label",
												text : "Fecha Nacimiento",
												cls : "x-form-item label_spacing"
											},
											{
												xtype : "combo",
												id : "ctgNacionalidadId",
												name : "ctgNacionalidad.ctgPaisId",
												store : new Ext.data.SimpleStore(
														{
															data : config.ctgNacionalidades
																	|| [],
															fields : [
																	"ctgPaisId",
																	"ctgPaisNacionalidad",
																	"ctgPaisNombre" ]
														}),
												displayField : "ctgPaisNacionalidad",
												valueField : "ctgPaisId",
												allowBlank : false,
												value : Efx.constants.codes.COSTA_RICA
											},
											{
												xtype : "textfield",
												id : "kycRepresentanteLegalLugarNacimiento",
												name : "kycRepresentanteLegalLugarNacimiento",
												maxLength : 100
											},
											{
												xtype : "datefield",
												id : "kycRepresentanteLegalFechaNacimiento",
												name : "kycRepresentanteLegalFechaNacimiento",
//												disabled : true,
												submitOnDisable : true,
//												allowEnable : false,
//												format : "Ymd",
												submitFormat : "Ymd",
												altFormats: "Ymd|d/m/Y",
												maxValue : new Date(),
												allowBlank : false
											},
											{
												xtype : "label",
												text : "G\u00E9nero",
												cls : "x-form-item label_spacing"
											},
											{
												xtype : "label",
												text : "Estado Civil",
												cls : "x-form-item label_spacing"
											},
											{
												xtype : "label",
												text : "Profesi\u00f3n/Ocupaci\u00f3n",
												cls : "x-form-item label_spacing",
												colspan : 6
											},
											{
												xtype : "combo",
												id : "ctgGeneroId",
												name : "ctgGenero.ctgCatalogoId",
												store : new Ext.data.SimpleStore(
														{
															data : config.ctgGeneros
																	|| [],
															fields : [
																	"ctgGeneroId",
																	"ctgGeneroNombre" ]
														}),
												displayField : "ctgGeneroNombre",
												valueField : "ctgGeneroId",
												allowBlank : false,
											},
											{
												xtype : "combo",
												id : "ctgEstadoCivilId",
												name : "ctgEstadoCivil.ctgCatalogoId",
												store : new Ext.data.SimpleStore(
														{
															data : config.ctgEstadosCiviles
																	|| [],
															fields : [
																	"ctgEstadoCivilId",
																	"ctgEstadoCivilNombre" ]
														}),
												displayField : "ctgEstadoCivilNombre",
												valueField : "ctgEstadoCivilId",
												allowBlank : false,
											},
											{
												xtype : "combo",
												id : "ctgProfesionId",
												name : "ctgProfesion.ctgCatalogoId",
												store : new Ext.data.SimpleStore(
														{
															data : config.ctgProfesiones
																	|| [],
															fields : [
																	"ctgProfesionId",
																	"ctgProfesionNombre" ]
														}),
												displayField : "ctgProfesionNombre",
												valueField : "ctgProfesionId",
												allowBlank : false,
												colspan : 6
											},
											{
												xtype : "label",
												text : "DATOS DOMICILIO",
												cls : "x-form-item label_header",
												colspan : 6,
												width : 730
											},
											{
												xtype : "label",
												text : "Pa\u00EDs",
												cls : "x-form-item label_spacing",
												colspan : 6
											},
											{
												xtype : "combo",
												id : "ctgPaisDireccionId",
												name : "ctgPaisDireccion.ctgPaisId",
												store : new Ext.data.SimpleStore(
														{
															data : config.ctgPaises
																	|| [],
															fields : [
																	"ctgPaisId",
																	"ctgPaisNacionalidad",
																	"ctgPaisNombre" ]
														}),
												displayField : "ctgPaisNombre",
												valueField : "ctgPaisId",
												allowBlank : false,
												colspan : 6,
												value : Efx.constants.codes.COSTA_RICA,
												listeners : {
													change : function() {
														var disable = this
																.getValue() != Efx.constants.codes.COSTA_RICA;
														Efx.utils
																.setDisabled(
																		"ctgProvinciaId",
																		disable,
																		true);
														Efx.utils.setDisabled(
																"ctgCantonId",
																disable, true);
														Efx.utils
																.setDisabled(
																		"ctgDistritoId",
																		disable,
																		true);
														Efx.combos
																.setRequiredAndValidate(
																		"ctgProvinciaId",
																		!disable);
														Efx.combos
																.setRequiredAndValidate(
																		"ctgCantonId",
																		!disable);
														Efx.combos
																.setRequiredAndValidate(
																		"ctgDistritoId",
																		!disable);
													}
												}
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
												xtype : "label",
												text : "Distrito",
												cls : "x-form-item label_spacing"
											},
											{
												xtype : "combo",
												id : "ctgProvinciaId",
												name : "ctgProvincia.ctgProvinciaId",
												store : new Ext.data.SimpleStore(
														{
															data : config.ctgProvincias
																	|| [],
															fields : [
																	"ctgProvinciaId",
																	"ctgProvinciaNombre" ]
														}),
												displayField : "ctgProvinciaNombre",
												valueField : "ctgProvinciaId",
												allowBlank : false,
												listeners : {
													change : function() {
														Efx.combos.loadData("ctgCantonId",Efx.combos.getAllCantonesByProvinciaCombo(this.getValue(),config.ctgCantones));
														Efx.combos.removeAll("ctgDistritoId",true);
													}
												}
											},
											{
												xtype : "combo",
												id : "ctgCantonId",
												name : "ctgCanton.ctgCantonId",
												store : new Ext.data.SimpleStore(
														{
															data : [],
															fields : [
																	"ctgCantonId",
																	"ctgCantonNombre",
																	"ctgProvinciaId" ]
														}),
												displayField : "ctgCantonNombre",
												valueField : "ctgCantonId",
												allowBlank : false,
												listeners : {
													change : function() {
														Efx.combos
																.loadData(
																		"ctgDistritoId",
																		Efx.combos
																				.getAllDistritosByCantonCombo(
																						this
																								.getValue(),
																						config.ctgDistritos));
													}
												}
											},
											{
												xtype : "combo",
												id : "ctgDistritoId",
												name : "ctgDistrito.ctgDistritoId",
												store : new Ext.data.SimpleStore(
														{
															data : [],
															fields : [
																	"ctgDistritoId",
																	"ctgDistritoNombre",
																	"ctgCantonId" ]
														}),
												displayField : "ctgDistritoNombre",
												valueField : "ctgDistritoId",
												allowBlank : false
											},
											{
												xtype : "label",
												text : "Otras Se\u00f1as",
												cls : "x-form-item label_spacing",
												colspan : 6
											},
											{
												xtype : "textarea",
												id : "kycRepresentanteLegalDireccion",
												name : "kycRepresentanteLegalDireccion",
												maxLength : 250,
												colspan : 6,
												height : 40,
												width : 715,
												allowBlank : false
											},
											{
												xtype : "label",
												text : "Tel\u00E9fono Residencia",
												cls : "x-form-item label_spacing"
											},
											// {xtype: "label", text:
											// "Tel\u00E9fono Celular", cls:
											// "x-form-item label_spacing"},
											{
												xtype : "label",
												text : "Fax",
												cls : "x-form-item label_spacing",
												colspan : 6
											},
											{
												xtype : "textfield",
												id : "kycRepresentanteLegalTelefono1",
												name : "kycRepresentanteLegalTelefono1",
												blankText : "Debe ingresar al menos un tel\u00E9fono",
												allowBlank : false,
												listeners : {
													change : function() {
														var isEmpty = Ext
																.isEmpty(Efx.utils
																		.getValue("kycRepresentanteLegalTelefono1"))
																&& Ext
																		.isEmpty(Efx.utils
																				.getValue("kycRepresentanteLegalTelefono2"))
																&& Ext
																		.isEmpty(Efx.utils
																				.getValue("kycRepresentanteLegalTelefono3"));
														Efx.utils
																.setRequiredAndValidate(
																		"kycRepresentanteLegalTelefono1",
																		isEmpty);
														Efx.utils
																.setRequiredAndValidate(
																		"kycRepresentanteLegalTelefono2",
																		isEmpty);
														Efx.utils
																.setRequiredAndValidate(
																		"kycRepresentanteLegalTelefono3",
																		isEmpty);
													}
												},
												maxLength : 20
											},
											{
												xtype : "textfield",
												id : "kycRepresentanteLegalTelefono2",
												name : "kycRepresentanteLegalTelefono2",
												blankText : "Debe ingresar al menos un tel\u00E9fono",
												listeners : {
													change : function() {
														var isEmpty = Ext
																.isEmpty(Efx.utils
																		.getValue("kycRepresentanteLegalTelefono1"))
																&& Ext
																		.isEmpty(Efx.utils
																				.getValue("kycRepresentanteLegalTelefono2"))
																&& Ext
																		.isEmpty(Efx.utils
																				.getValue("kycRepresentanteLegalTelefono3"));
														Efx.utils
																.setRequiredAndValidate(
																		"kycRepresentanteLegalTelefono1",
																		isEmpty);
														Efx.utils
																.setRequiredAndValidate(
																		"kycRepresentanteLegalTelefono2",
																		isEmpty);
														Efx.utils
																.setRequiredAndValidate(
																		"kycRepresentanteLegalTelefono3",
																		isEmpty);
													}
												},
												maxLength : 20,
												colspan : 6
											},
											/**{
																	xtype: "textfield",
																	id: "kycRepresentanteLegalTelefono3",
																	name: "kycRepresentanteLegal.kycRepresentanteLegalTelefono3",
																	blankText: "Debe ingresar al menos un tel\u00E9fono",
																	listeners: {
																		change: function(){
																			var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono1"))&&
																				Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono2")) &&
																				Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono3"));
																			Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono1", isEmpty);
																			Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono2", isEmpty);
																			Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono3", isEmpty);
																		}
																	},
																	maxLength: 20
																}**/
											//					{xtype: "label", text: "Apartado Postal", cls: "x-form-item label_spacing"},
											{
												xtype : "label",
												text : "Correo Electronico",
												cls : "x-form-item label_spacing",
												colspan : 6
											},
											/**{
												xtype: "textfield",
												id: "kycRepresentanteLegalApartadoPostal",
												name: "kycRepresentanteLegal.kycRepresentanteLegalApartadoPostal",
												maxLength: 20
											},**/
											{
												xtype : "textfield",
												id : "kycRepresentanteLegalCorreoElectronico",
												name : "kycRepresentanteLegalCorreoElectronico",
												fieldCls : "remove-uppercase",
												maxLength : 250,
												colspan : 6,
												vtype : "email",
												width : 475
											},
											{
												xtype : "label",
												text : "Relaci\u00F3n con la empresa",
												cls : "x-form-item label_spacing",
												colspan : 6
											},
											{
												xtype : "combo",
												id : "ctgRelacionEmpresaId",
												name : "ctgRelacionEmpresa.ctgCatalogoId",
												store: new Ext.data.SimpleStore({
													 data: config.ctgRelacionEmpresa ||
													 [],
													 fields: ["ctgRelacionEmpresaId",
													 "ctgRelacionEmpresaNombre",
													 "ctgRelacionEmpresaPadre",
													 "ctgRelacionEmpresaHijo"]
													 }),
												displayField: "ctgRelacionEmpresaNombre",
												valueField: "ctgRelacionEmpresaId",
												maxLength : 50,
												colspan : 6
											},{
												xtype : "label",
												text : "POL\u00CDTICAMENTE EXPUESTO",
												cls : "x-form-item label_header",
												colspan : 6,
												width : 730
											},
											{
												xtype : "label",
												text : "\u00BFCumple o ha cumplido funciones p\u00FAblicas o " +
														"pol\u00EDticas destacadas, ya sea en el territorio" +
														" nacional o en el extranjero? " +

														"(Considerar los vinculados hasta segundo grado de " +
														"consanguinidad o afinidad)",
												cls : "x-form-item label_spacing",
												width : 650,
												colspan : 6
											},
											{
												xtype : "combo",
												id : "kycRepresentanteLegalPep",
												name : "kycRepresentanteLegalPep",
												store : new Ext.data.SimpleStore(
														{
															data : Efx.combos
																	.yesnoArray()
																	|| [],
															fields : [ "id",
																	"descripcion" ]
														}),
												displayField : "descripcion",
												valueField : "id",
												listeners: {
													change: function(){
														var disable = this.getValue() != "1";
														Efx.utils.setDisabled("kycRepresentanteLegalPepCargo", disable, true);
														Efx.utils.setDisabled("kycRepresentanteLegalPepNombre", disable, true);
														Efx.utils.setDisabled("kycRepresentanteLegalPepFechaInicio", disable, true);
														Efx.utils.setDisabled("kycRepresentanteLegalPepFechaFin", disable, true);
														Efx.utils.setRequiredAndValidate("kycRepresentanteLegalPepCargo", !disable);
														Efx.combos.setRequiredAndValidate("kycRepresentanteLegalNombrePep", !disable);
														Efx.utils.setRequiredAndValidate("kycRepresentanteLegalPepFechaInicio", !disable);
														Efx.utils.setRequiredAndValidate("kycRepresentanteLegalPepFechaFin", !disable);
													}
												},
												allowBlank : false,
												colspan : 6
											},
											{xtype: "label", text: "Nombre", cls: "x-form-item label_spacing",colspan: 6},
											{
												xtype: "textfield",
												id: "kycRepresentanteLegalPepNombre",
												name: "kycRepresentanteLegal.kycRepresentanteLegalPepNombre",
												colspan: 6
											},
											{xtype: "label", text: "Cargo o Relaci\u00F3n", cls: "x-form-item label_spacing"},
											{xtype: "label", text: "Desde", cls: "x-form-item label_spacing", width: 115},
											{xtype: "label", text: "Hasta", cls: "x-form-item label_spacing", width: 110, colspan : 6},
											{
												xtype: "textfield",
												id: "kycRepresentanteLegalPepCargo",
												name: "kycRepresentanteLegal.kycRepresentanteLegalPepCargo",
												maxLength: 50
											},
											{
												xtype: "datefield",
												id: "kycRepresentanteLegalPepFechaInicio",
												name: "kycRepresentanteLegal.kycRepresentanteLegalPepFechaInicio",
												submitFormat: "Ymd",
												altFormats:"Ymd|d/m/Y",
												width: 115,
												maxValue: new Date(),
												colspan: 1
											},{
												xtype: "datefield",
												id: "kycRepresentanteLegalPepFechaFin",
												name: "kycRepresentanteLegalPepFechaFin",
												submitFormat: "Ymd",
												altFormats:"Ymd|d/m/Y",
												width: 110,
												maxValue: new Date(),
												colspan: 6
											},
											/**manejo de fondos**/
											{
												xtype : "label",
												text : "MANEJA FONDOS DE TERCEROS",
												cls : "x-form-item label_header",
												colspan : 6,
												width : 730
											},
											{
												xtype : "label",
												text : "\u00BFManeja fondos de terceros (socios, inversionistas, clientes, otros)",
												cls : "x-form-item label_spacing",
												width : 715,
												colspan : 6
											},
											{
												xtype : "label",
												text : "Si maneja fondos de terceros debe " +
														"presentar copia de lic. otorgada por la SUGEF, " +
														"seg\u00FAn el art\u00EDculo 15 de Ley 8204",
												cls : "x-form-item label_spacing",
												width : 715,
												colspan : 6
											},
											{
												xtype : "combo",
												id : "kycRepresentanteLegalFondosTerceros",
												name : "kycRepresentanteLegalFondosTerceros",
												store : new Ext.data.SimpleStore(
														{
															data : Efx.combos
																	.yesnoArray()
																	|| [],
															fields : [ "id",
																	"descripcion" ]
														}),
												displayField : "descripcion",
												colspan : 6,
												allowBlank : false,
												valueField : "id"
											},
											{
												xtype : "hidden",
												id : "kycRepresentanteLegalId",
												name : "kycRepresentanteLegalId"
											},

											{
												xtype : "hidden",
												id : "kycFechaActualizacion",
												listeners : {
													change : function() {
														var value = this
																.getValue();
														Efx.utils
																.setVisible(
																		"kycFechaActualizacionTitle",
																		!Ext
																				.isEmpty(value));
														Efx.utils.setText("kycFechaActualizacionTitle", "FORMULARIO ACTUALIZADO EL: " + Ext.util.Format.kycFormatDateYmdHis_d_m_Y_H_i(value));

													}
												}
											}
								]
								}
								]
					});
			return configToReturn;
		}
	};
}();