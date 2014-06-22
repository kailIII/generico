KycPersonaFisica = function() {
//var configWindow = {
//			grid: "kycPersonaFisicaGrid"
//		};
	var ctgTipoDocumentos = [];
	return {
		getCtgTipoDocumentos : function() {
			return ctgTipoDocumentos;
		},
		setCtgTipoDocumentos : function(values) {
			ctgTipoDocumentos = values;
		},

		showBusquedaPersonaFisica : function() {
			var kycPersonaFisicaWindow = Ext.WindowMgr.get("kycPersonaFisicaWindow");
			if (kycPersonaFisicaWindow) {
				kycPersonaFisicaWindow.show();
				return;
			}
			kycPersonaFisicaWindow = Ext.create("Ext.window.Window", {
				id : "kycPersonaFisicaWindow",
				title : "Buscar",
				modal : true,
				closable : false,
				layout : "fit",
				height : 150,
				width : 450,
				items : {
					xtype : "form",
					id : "kycBusquedaPersonaFisicaForm",
					border : false,
					bodyPadding : 10,
					defaults : Efx.utils.defaults({
						labelWidth : 150
					}),
					items : [
							{
								xtype : "combo",
								id : "ctgWindowTipoDocumentoId",
								fieldLabel : "Tipo Indetificaci\u00F3n",
								store : new Ext.data.SimpleStore({
									data : KycPersonaFisica
											.getCtgTipoDocumentos(),
									fields : [ "ctgTipoDocumentoId",
											"ctgTipoDocumentoNombre",
											"ctgTipoDocumentoPadre",
											"ctgTipoDocumentoHijo" ]
								}),
								displayField : "ctgTipoDocumentoNombre",
								valueField : "ctgTipoDocumentoId",
								allowBlank : false,
								width : 350
							}, {
								xtype : "textfield",
								id : "kycBusquedaPersonaFisicaDocumento1",
								name : "kycPersonaFisicaDocumento1",
								fieldLabel : "Identificaci\u00F3n",
								allowBlank : false,
								selectOnFocus : true,
								width : 350
							} ]
				},
				listeners : {
					show : function() {
						Ext.getCmp("kycBusquedaPersonaFisicaForm").getForm().reset();
						Ext.WindowMgr.get("kycPersonaFisicaWindow").focus();
						Efx.utils.setFocus("ctgWindowTipoDocumentoId");
					}
				},
				buttons : [ {
					text : "Buscar",
					handler : KycPersonaFisica.decodeSaveFrom
				}, {
					text : "Cerrar",
					handler : function() {
						kycPersonaFisicaWindow.hide();
					}
				} ]
			});
			kycPersonaFisicaWindow.show();
		},
		decodeSaveFrom : function() {
			var ctgTipoDocumento = Efx.combos.getSelectedData(
					"ctgWindowTipoDocumentoId", "ctgTipoDocumentoId");
			if (!ctgTipoDocumento) {
				Efx.message.alertInvalid("Debe indicar el tipo de Identificaci\u00F3n");
				return;
			}
			if (Efx.constants.codes.DOCUMENTO_CEDULA == ctgTipoDocumento.ctgTipoDocumentoHijo) {
				KycPersonaFisica.saveFromBureau(ctgTipoDocumento);
			} else {
				KycPersonaFisica.saveByDocument(ctgTipoDocumento);
			}
		},
		saveByDocument : function(ctgTipoDocumento) {
			Efx.message.progress("Obteniendo Informaci\u00F3n...");
			Ext
					.getCmp("kycBusquedaPersonaFisicaForm")
					.getForm()
					.submit(
							{
								url : Efx.constants.CONTEXT_PATH + "/kycPersonaFisica/saveByDocument",
								timeout : Efx.constants.TIMEOUT_SECONDS,
								params : {
									"ctgTipoDocumento.ctgCatalogoId" : ctgTipoDocumento.ctgTipoDocumentoId,
									"ctgTipoDocumento.ctgCatalogoHijo" : ctgTipoDocumento.ctgTipoDocumentoHijo,
									"ctgTipoDocumento.ctgCatalogoNombre" : ctgTipoDocumento.ctgTipoDocumentoNombre,
									kycId : EfxKYC.getKycId()
								},
								success : function(form, action) {
									Efx.message.alert(action.result.message);
									if (action.result.encontrado) {
										EfxKYC.setKycId(action.result.kycId);
										EfxKYC.setKycPersonaFisicaId(action.result.kycPersonaFisicaId);
										Efx.form.setValues("kycPersonaFisicaForm", action.result.kycPersonaFisica);
									} else {
										Efx.utils.setDisabled("kycPersonaFisicaPrimerNombre", false, true);
										Efx.utils.setDisabled("kycPersonaFisicaSegundoNombre", false, true);
										Efx.utils.setDisabled("kycPersonaFisicaPrimerApellido", false, true);
										Efx.utils.setDisabled("kycPersonaFisicaSegundoApellido", false, true);
										Efx.utils.setDisabled("kycPersonaFisicaFechaNacimiento",false, true);
										Efx.utils.setValue("ctgTipoDocumentoId",ctgTipoDocumento.ctgTipoDocumentoId);
										Efx.utils.setValue("kycPersonaFisicaDocumento1",action.result.kycPersonaFisicaDocumento1);
									}
									Ext.WindowMgr.get("kycPersonaFisicaWindow").hide();
								},
								failure : Efx.form.failureProcedure
							});
		},
		saveFromBureau : function(ctgTipoDocumento) {
			Efx.message.progress("Obteniendo Informaci\u00F3n...");
			Ext.getCmp("kycBusquedaPersonaFisicaForm").getForm().submit(
							{
								url : Efx.constants.CONTEXT_PATH + "/kycPersonaFisica/saveFromBureau",
								timeout : Efx.constants.TIMEOUT_SECONDS,
								params : {
									"ctgTipoDocumento.ctgCatalogoId" : ctgTipoDocumento.ctgTipoDocumentoId,
									"ctgTipoDocumento.ctgCatalogoHijo" : ctgTipoDocumento.ctgTipoDocumentoHijo,
									"ctgTipoDocumento.ctgCatalogoNombre" : ctgTipoDocumento.ctgTipoDocumentoNombre,
									kycDatosPersonales : true,
									kycId : EfxKYC.getKycId()
								},
								success : function(form, action) {
									Efx.message.alert(action.result.message);
									EfxKYC.setKycId(action.result.kycId);
									EfxKYC.setKycPersonaFisicaId(action.result.kycPersonaFisicaId);
									Efx.form.setValues("kycPersonaFisicaForm",action.result.kycPersonaFisica);
									Efx.form.setValues("kycPersonaFisicaCodigoTransaccion",action.result.kycPersonaFisicaCodigoTransaccion);
									Ext.WindowMgr.get("kycPersonaFisicaWindow").hide();
								},
								failure : Efx.form.failureProcedure
							});
		},
		saveKycPersonaFisica : function() {
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycPersonaFisicaForm").getForm().submit(
							{
								url : Efx.constants.CONTEXT_PATH + "/kycPersonaFisica/save",
								timeout : Efx.constants.TIMEOUT_SECONDS,
								params : {
									"kycPersonaFisica.kyc.kycId" : EfxKYC.getKycId(),
									"kycPersonaFisica.kycPersonaFisicaId" : EfxKYC.getKycPersonaFisicaId(),
								},
								success : function(form, action) {
									Efx.message.alert(action.result.message);
									EfxKYC.setKycId(action.result.kycId);
									EfxKYC.setKycPersonaFisicaId(action.result.kycPersonaFisicaId);
									Efx.utils.setValue("kycFechaActualizacion",action.result.kycFechaActualizacion);
								},
								failure : Efx.form.failureProcedure
							});
		},
		init : function(config) {
			var ctgSucursal = config.ctgSucursal;
			var kycPersonaFisica = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if (kycAlertas)
				configToReturn.items.push(kycAlertas);
			KycPersonaFisica.setCtgTipoDocumentos(config.ctgWindowTipoDocumentos || []);
			configToReturn.items
					.push({
						xtype : "form",
						flex : 1,
						id : "kycPersonaFisicaForm",
						title : "DATOS GENERALES",
						autoScroll : true,
						listeners : {
							render : function() {
								if (EfxKYC.getKycId() != null && EfxKYC.getKycId() > 0 && this.getForm()) {
									this.getForm().setValues(kycPersonaFisica);
									if (EfxKYC.getKycVigente() === false)
										Efx.form.setDisable("kycPersonaFisicaForm");
								} else {
									Efx.utils.setValue("ctgTipoDocumentoId", config.ctgTipoDocumentoId);
									Efx.utils.setValue("kycPersonaFisicaDocumento1", config.kycPersonaFisicaDocumento1);
								}
							}
						},
						dockedItems : [ {
							xtype : "toolbar",
							dock : "top",
							hidden : EfxKYC.getKycVigente() === false,
							items : [ "->", {
								text : "Guardar",
								iconCls : Efx.constants.icons.SAVE_ICON,
								handler : KycPersonaFisica.saveKycPersonaFisica
							} ]
						}, {
							xtype : "toolbar",
							dock : "bottom",
							hidden : EfxKYC.getKycVigente() === false,
							items : [ "->", {
								text : "Guardar",
								iconCls : Efx.constants.icons.SAVE_ICON,
								handler : KycPersonaFisica.saveKycPersonaFisica
							} ]
						} ],
						layout : {
							type : "table",
							columns : 6,
							tableAttrs : {
								style : {
									width : "730px",
									"margin-top" : "5px",
									"margin-bottom" : "40px"
								},
								align : "center"
							}
						},
						defaults : Efx.utils.defaults({
							width : 230,
							colspan : 2
						}),
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
								{xtype: "label", text: "Sucursal", cls: "x-form-item label_spacing", colspan: 6},
								{
									xtype: "combo",
									id: "ctgSucursalId",
									name: "ctgSucursal.ctgSucursalId",
									store: new Ext.data.SimpleStore({
										data: config.ctgSucursales || [],
										fields: ["ctgSucursalId", "ctgSucursalNombre"]
									}),
									displayField: "ctgSucursalNombre",
									valueField: "ctgSucursalId",
									allowBlank: false,
									value: ctgSucursal.ctgSucursalId,
									colspan: 6
								},
								{xtype: "label", text : "C\u00f3digo de Cliente", cls : "x-form-item label_spacing",colspan:2},
								{xtype: "label", text: "Canal", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Ejecutivo de Cuenta", cls: "x-form-item label_spacing", colspan: 2},
								{
									xtype : "textfield",
									id : "kycPersonaFisicaCodigoCliente",
									name : "kycPersonaFisica.kycPersonaFisicaCodigoCliente",
									maxLength : 30,
									colspan:2
								},
								{
									xtype: "combo",
									id: "ctgCanal",
									name: "kycPersonaFisica.ctgCanal.ctgCatalogoId",
									store: new Ext.data.SimpleStore({
										data: config.ctgCanales || [],
										fields: ["ctgCanalId", "ctgCanalNombre"]
									}),
									displayField: "ctgCanalNombre",
									valueField: "ctgCanalId",
									colspan: 2
								},
								{
									xtype: "combo",
									id: "kycEjecutivo",
									name: "kycPersonaFisica.kycEjecutivo.kycEjecutivoId",
									store: new Ext.data.SimpleStore({
										data: config.ctgEjecutivo || [],
										fields: ["kycEjecutivoId", "kycEjecutivoNombre"]
									}),
									displayField: "kycEjecutivoNombre",
									valueField: "kycEjecutivoId",
									colspan: 2
								},
								{
									xtype : "label",
									text : "DATOS PERSONALES",
									cls : "x-form-item label_header",
									colspan : 6,
									width : 730
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
									id : "kycPersonaFisicaPrimerNombre",
									name : "kycPersonaFisica.kycPersonaFisicaPrimerNombre",
									disabled : !config.kycExtranjero,
									submitOnDisable : true,
									allowBlank : false,
									maxLength : 50,
									colspan:2
								},
								{
									xtype : "textfield",
									id : "kycPersonaFisicaPrimerApellido",
									name : "kycPersonaFisica.kycPersonaFisicaPrimerApellido",
									disabled : !config.kycExtranjero,
									submitOnDisable : true,
									allowBlank : false,
									maxLength : 20,
									colspan:2
								},
								{
									xtype : "textfield",
									id : "kycPersonaFisicaSegundoApellido",
									name : "kycPersonaFisica.kycPersonaFisicaSegundoApellido",
									disabled : !config.kycExtranjero,
									submitOnDisable : true,
									allowBlank : false,
									maxLength : 20,
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
									colspan : 4
								},
								{
									xtype : "combo",
									id : "ctgGeneroId",
									name : "kycPersonaFisica.ctgGenero.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgGeneros || [],
										fields : [ "ctgGeneroId", "ctgGeneroNombre"]
									}),
									displayField : "ctgGeneroNombre",
									allowBlank : false,
									submitOnDisable : true,
									valueField : "ctgGeneroId",
									colspan:2
								},
								{
									xtype : "combo",
									id : "ctgNacionalidadId",
									name : "kycPersonaFisica.ctgNacionalidad.ctgPaisId",
									store : new Ext.data.SimpleStore({
										data : config.ctgNacionalidades || [],
										fields : [ "ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre"]
									}),
									displayField : "ctgPaisNacionalidad",
									valueField : "ctgPaisId",
									allowBlank : false,
									submitOnDisable : true,
									colspan: 4,
									listeners: {
										change: function()
										{
											if (this.getValue() == 41 || this.getValue() == 43 || this.getValue() == 46 || this.getValue() == 84 ||
													this.getValue() == 85 || this.getValue() == 104 ||  this.getValue() == 146 || this.getValue() == 154 ||
													this.getValue() == 156 ||  this.getValue() == 160 ||  this.getValue() == 180)
												{
												Ext.MessageBox.alert('ADVERTENCIA:<br/><br/><br/>Nacionalidad de Ultra-Ato riesgo<br/><br/>Solicitar VB de cumplimiento');
												}
											else
												{

												}
										}
									}
								},
								{
									xtype : "label",
									id: "kycPersonaFisicaIdentificacion",
									text : "Identificaci\u00F3n " + config.tipoDocumentoNombreCmb,
									cls : "x-form-item label_spacing",
									colspan:2
								},
								{
									xtype : "label",
									text : "Tipo de Documento",
									cls : "x-form-item label_spacing",
									colspan:2
								},
								{
									xtype : "label",
									text : "Fecha de Vencimiento",
									cls : "x-form-item label_spacing",
									colspan:2

								},
								{
									xtype : "textfield",
									id : "kycPersonaFisicaDocumento1",
									name : "kycPersonaFisica.kycPersonaFisicaDocumento1",
									allowBlank : false,
									disabled : true,
									maxlength: 20,
									submitOnDisable : true
								},
								{
									xtype: "combo",
									id: "ctgSubTipoDocumentoId",
									name: "kycPersonaFisica.ctgSubTipoDocumento.ctgCatalogoId",
									store: new Ext.data.SimpleStore({
										data:   [],
										fields: ["ctgCatalogoId", "ctgCatalogoNombre", "ctgTCatalogoPadre", "ctgCatalogoHijo"]
									}),
									displayField: "ctgCatalogoNombre",
									valueField: "ctgCatalogoId",
									allowBlank: false,
									value: config.ctgSubTipodocumentoId,
									submitOnDisable: true,
									listeners:
										{
											render: function()
											{
											 if (Ext.getCmp("ctgTipoDocumentoId").getValue() == Efx.constants.codes.TIPO_DOCUMENTO_CEDULA && Ext.getCmp("ctgSubTipoDocumentoId").getValue() == null);
											 	Ext.getCmp("ctgSubTipoDocumentoId").setValue(Efx.constants.codes.TIPO_DOCUMENTO_CEDULA_CEDULA_NACIONAL);

											}
										}
								},
								{
									xtype : "datefield",
									id : "kycPersonaFisicaFechaVencimiento",
									name : "kycPersonaFisica.kycPersonaFisicaFechaVencimiento",
									submitOnDisable : true,
									submitFormat : "Ymd",
									altFormats: "Ymd|d/m/Y",
									allowBlank : false,
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
									id: "ctgPaisId",
									name: "kycPersonaFisica.ctgPaisNacimiento.ctgPaisId",
									store: new Ext.data.SimpleStore({
										data: config.ctgPaises || [],
										fields: ["ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre"]
									}),
									displayField: "ctgPaisNombre",
									valueField: "ctgPaisId",
									allowBlank: false,
									submitOnDisable: true
								},
								{
									xtype : "textfield",
									id : "kycPersonaFisicaLugarNacimiento",
									name : "kycPersonaFisica.kycPersonaFisicaLugarNacimiento",
									allowBlank:false,
									maxLength : 100
								},
								{
									xtype : "datefield",
									id : "kycPersonaFisicaFechaNacimiento",
									name : "kycPersonaFisica.kycPersonaFisicaFechaNacimiento",
									submitFormat : "Ymd",
									allowBlank:false,
									maxValue : new Date()
								},
								{
									xtype : "label",
									text : "Edad",
									cls : "x-form-item label_spacing",
									colspan:2
								},
								{
									xtype : "label",
									text : "Profesi\u00f3n",
									cls : "x-form-item label_spacing",
									colspan:2
								},
								{
									xtype : "label",
									text : "Estado Civil",
									cls : "x-form-item label_spacing",
									colspan:2
								},
								{
									xtype : "textfield",
									id : "kycPersonaFisicaEdad",
									name : "kycPersonaFisica.kycPersonaFisicaEdad",
									allowBlank:false,
									maxlength: 50
								},
								{
									xtype : "combo",
									id : "ctgProfesionId",
									allowBlank : false,
									name : "kycPersonaFisica.ctgProfesion.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgProfesiones || [],
										fields : [ "ctgProfesionId", "ctgProfesionNombre" ]
									}),
									displayField : "ctgProfesionNombre",
									valueField : "ctgProfesionId",
									listConfig : {minWidth : 450}
								},
								{
									xtype : "combo",
									id : "ctgEstadoCivilId",
									allowBlank: false,
									name : "kycPersonaFisica.ctgEstadoCivil.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgEstadosCiviles || [],
										fields : [ "ctgEstadoCivilId", "ctgEstadoCivilNombre" ]
									}),
									displayField : "ctgEstadoCivilNombre",
									valueField : "ctgEstadoCivilId"
								},
								{
									xtype : "label",
									text : "Observaciones de Estado Civil",
									cls : "x-form-item label_spacing",
									colspan:6
								},
								{
									xtype : "textfield",
									id : "kycPersonaFisicaObservaciones",
									name : "kycPersonaFisica.kycPersonaFisicaObservaciones",
									maxLength : 100,
									allowBlank: false,
									width : 715,
									colspan:6
								},
								{xtype : "label",text : "",cls : "x-form-item label_spacing",colspan : 6},
								{xtype : "label",text : "",cls : "x-form-item label_spacing",colspan : 6},
								{
									xtype : "label",
									text : "HISTORIAL DE ESTADO CIVIL",
									cls : "x-form-item label_spacing",
									style: "text-decoration: underline" ,
									colspan : 6
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
									minHeight: 60,
									store: new Ext.data.SimpleStore({
								    	data: config.kycHistorialCivil || [],
								    	fields: [
								    	         {name:"kycHistorialCivil.kycHistorialCivilId"},
								    	         {name:"kycHistorialCivil.kycHistorialCivilDocumento"},
								    	         {name:"kycHistorialCivil.kycHistorialCivilNombre"},
								    	         {name:"kycHistorialCivil.kycHistorialCivilRelacion"},
								    	         {name:"kycHistorialCivil.kycHistorialCivilFechaSuceso"}
								    	]
								    }),
								    columns: [
							            {header: "C\u00e9dula",  dataIndex: "kycHistorialCivil.kycHistorialCivilDocumento", align: "center",flex:0.6, minWidth: 20},
							            {header: "Nombre",  dataIndex: "kycHistorialCivil.kycHistorialCivilNombre", align: "center",flex:2.5,  width: 20},
							            {header: "Relaci\u00f3n",  dataIndex: "kycHistorialCivil.kycHistorialCivilRelacion", align: "center",flex:2,  width: 20},
							            {header: "Fecha de Suceso", dataIndex: "kycHistorialCivil.kycHistorialCivilFechaSuceso",align: "center",flex:0.8, width: 20,
							            	renderer : function (value) {
							            		myDate = Ext.Date.parse(value, "dmY");
							            		otherDate = Ext.Date.format(myDate,"d/m/Y");
							            		return otherDate;
							            	}}
							            ]
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
									id : "kycPersonaFisicaTelefono1",
									name : "kycPersonaFisica.kycPersonaFisicaTelefono1",
									allowBlank : false,
									maxLength : 8,
									vtype: "validNA"
								},
								{
									xtype : "textfield",
									id : "kycPersonaFisicaTelefono2",
									name : "kycPersonaFisica.kycPersonaFisicaTelefono2",
									allowBlank : false,
									maxLength : 8,
									vtype: "validNA"
								},
								{
									xtype : "textfield",
									id : "kycPersonaFisicaTelefono3",
									name : "kycPersonaFisica.kycPersonaFisicaTelefono3",
									allowBlank : false,
									maxLength : 8,
									vtype: "validNA"
								},{
									xtype : "label",
									text : "Tel\u00E9fono Fax",
									cls : "x-form-item label_spacing"
								},{
									xtype : "label",
									text : "Direcci\u00f3n Electr\u00f3nica 1",
									cls : "x-form-item label_spacing",
									colspan : 2
								},{
									xtype : "label",
									text : "Direcci\u00f3n Electr\u00f3nica 2",
									cls : "x-form-item label_spacing",
									colspan : 2
								},{
									xtype : "textfield",
									id : "kycPersonaFisicaTelefono4",
									name : "kycPersonaFisica.kycPersonaFisicaTelefono4",
									allowBlank : false,
									vtype: "validNA",
									maxLength : 8
								},{
									xtype : "textfield",
									id : "kycPersonaFisicaCorreoElectronico",
									name : "kycPersonaFisica.kycPersonaFisicaCorreoElectronico",
									fieldCls : "remove-uppercase",
									maxLength : 250,
									allowBlank : false,
									colspan : 2,
									vtype : "email"
								},{
									xtype : "textfield",
									id : "kycPersonaFisicaCorreoElectronico2",
									name : "kycPersonaFisica.kycPersonaFisicaCorreoElectronico2",
									fieldCls : "remove-uppercase",
									maxLength : 250,
									allowBlank : false,
									colspan : 2,
									vtype : "email"
								},{
									xtype : "label",
									text : "Apartado Postal",
									cls : "x-form-item label_spacing",
									colspan : 6
								},{
									xtype : "textfield",
									id : "kycPersonaFisicaApartadoPostal",
									name : "kycPersonaFisica.kycPersonaFisicaApartadoPostal",
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
									id : "ctgPaisDireccionId",
									name : "kycPersonaFisica.ctgPaisDireccion.ctgPaisId",
									store : new Ext.data.SimpleStore({
										data : config.ctgPaises || [],
										fields : [ "ctgPaisDireccionId", "ctgPaisNacionalidad", "ctgPaisNombre"]
									}),
									displayField : "ctgPaisNombre",
									valueField : "ctgPaisDireccionId",
									allowBlank : false,
									colspan : 2,
									value : Efx.constants.codes.COSTA_RICA,
									listeners : {
										change : function() {
											var disable = this.getValue() != Efx.constants.codes.COSTA_RICA;
											Efx.utils.setDisabled("ctgProvinciaId", disable,true);
											Efx.utils.setDisabled("ctgCantonId", disable,true);
											Efx.utils.setDisabled("ctgDistritoId", disable,true);
											Efx.utils.setDisabled("ctgPobladoId", disable,true);
											Efx.utils.setDisabled("kycPersonaFisicaOtro", disable,true);

											Ext.getCmp("ctgPobladoId").clearInvalid();
											Ext.getCmp("kycPersonaFisicaOtro").clearInvalid();
											Efx.combos.setRequiredAndValidate("ctgProvinciaId", !disable);
											Efx.combos.setRequiredAndValidate("ctgCantonId", !disable);
											Efx.combos.setRequiredAndValidate("ctgDistritoId", !disable);


											if (Ext.getCmp("ctgPaisDireccionId").getValue() == Efx.constants.codes.COSTA_RICA)
												{
									var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPobladoId"))&&
										Ext.isEmpty(Efx.utils.getValue("kycPersonaFisicaOtro"));
										Efx.utils.setRequiredAndValidate("ctgPobladoId", isEmpty);
										Efx.utils.setRequiredAndValidate("kycPersonaFisicaOtro", isEmpty);
												}
										}}
								},{
									xtype : "combo",
									id : "ctgProvinciaId",
									name : "kycPersonaFisica.ctgProvincia.ctgProvinciaId",
									store : new Ext.data.SimpleStore({
										data : config.ctgProvincias || [],
										fields : [ "ctgProvinciaId","ctgProvinciaNombre" ]
									}),
									displayField : "ctgProvinciaNombre",
									valueField : "ctgProvinciaId",
									allowBlank : false,
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
									name : "kycPersonaFisica.ctgCanton.ctgCantonId",
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
								},{
									xtype : "label",
									text : "Distrito",
									cls : "x-form-item label_spacing"
								},{
									xtype : "label",
									text : "Barrio/Poblado",
									cls : "x-form-item label_spacing",
									colspan : 2
								},{
									xtype : "label",
									text : "Otro",
									cls : "x-form-item label_spacing",
									colspan : 2
								},{
									xtype : "combo",
									id : "ctgDistritoId",
									name : "kycPersonaFisica.ctgDistrito.ctgDistritoId",
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
									name : "kycPersonaFisica.ctgPoblado.ctgPobladoId",
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
											if (Ext.getCmp("ctgPaisDireccionId").getValue() == Efx.constants.codes.COSTA_RICA)
												{
									var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPobladoId"))&&
										Ext.isEmpty(Efx.utils.getValue("kycPersonaFisicaOtro"));
										Efx.utils.setRequiredAndValidate("ctgPobladoId", isEmpty);
										Efx.utils.setRequiredAndValidate("kycPersonaFisicaOtro", isEmpty);
												}
											else  if(Ext.getCmp("ctgPaisDireccionId").getValue() != Efx.constants.codes.COSTA_RICA)
												{
												this.allowBlank = true;
												}
										}
									}
								},{
									xtype : "textfield",
									id : "kycPersonaFisicaOtro",
									name : "kycPersonaFisica.kycPersonaFisicaOtro",
									maxLength : 100
									,
									listeners:
									{
									change: function()
										{
											if (Ext.getCmp("ctgPaisDireccionId").getValue() == Efx.constants.codes.COSTA_RICA)
												{
									var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPobladoId"))&&
										Ext.isEmpty(Efx.utils.getValue("kycPersonaFisicaOtro"));
										Efx.utils.setRequiredAndValidate("ctgPobladoId", isEmpty);
										Efx.utils.setRequiredAndValidate("kycPersonaFisicaOtro", isEmpty);
												}
											else if(Ext.getCmp("ctgPaisDireccionId").getValue() != Efx.constants.codes.COSTA_RICA)
											{
												this.allowBlank = true;
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
									id : "kycPersonaFisicaOtrasSenas",
									name : "kycPersonaFisica.kycPersonaFisicaOtrasSenas",
									maxLength : 100,
									width:710,
									colspan:6,
									allowBlank: false,
									listeners:
									{
										change: function()
										{
											if(this.value !=  kycPersonaFisica.kycPersonaFisicaOtrasSenas)
											{
												Ext.getCmp("kycPersonaFisicaVerificacionBase").disable();
											}
										}
									}
								},{
									xtype : "label",
									text : "Verificado por Base de Datos",
									cls : "x-form-item label_spacing",
									colspan : 2
								},{
						            xtype: "checkbox",
						            id: "kycPersonaFisicaVerificacionBase",
						            name: "kycPersonaFisica.kycPersonaFisicaVerificacionBase",
						            width: 100,
						            colspan: 4,
						            inputValue: "1",
						            uncheckedValue: "0"
						        },{
									xtype : "label",
									text : "Cambio Demogr\u00e1fico",
									cls : "x-form-item label_spacing",
									colspan : 6
								},{
									xtype : "combo",
									id : "kycPersonaFisicaCambioDemografico",
									name : "kycPersonaFisica.kycPersonaFisicaCambioDemografico",
									store : new Ext.data.SimpleStore({
										data : Efx.combos.yesnoArray() || [],
										fields : [ "id", "descripcion" ]
									}),
									displayField : "descripcion",
									valueField : "id",
									allowBlank : false,
									colspan : 6
								},{
									xtype : "label",
									text : "Env\u00edo de Correspondencia",
									cls : "x-form-item label_spacing",
									colspan : 6
								},{
						            xtype: 'radiogroup',
						            id: "ctgEnvioCorrespondencia",
						            columns : 3,
						            width: 700,
						            items : config.ctgEnvioCorrespondencia || [],
						            colspan: 6
						        },
								{
									xtype : "label",
									text : "Env\u00edo de Estado de Cuenta",
									cls : "x-form-item label_spacing",
									colspan : 6
								},
								{
						            xtype: 'radiogroup',
						            id: "ctgEnvioEstado",
						            columns : 3,
						            width: 700,
						            items : config.ctgEnvioEstado || [],
						            colspan: 6
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
						            allowBlank: false,
						            columns : 2,
						            width: 230,
						            items : config.ctgResultadoInvestigacion || [],
						            colspan: 2
						        },
								{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Adjuntar Pantalla de B\u00fasqueda", cls: "x-form-item label_spacing", colspan: 2},
								{
						            xtype: "checkboxfield",
						            id: "kycPersonaFisicaPantallaBusqueda",
						            name: "kycPersonaFisica.kycPersonaFisicaPantallaBusqueda",
						            width: 100,
						            colspan: 4,
						            inputValue: "1",
						            uncheckedValue: "0",
						            listeners :{
						            	render: function(){
						            		if (kycPersonaFisica.kycPersonaFisicaPantallaBusqueda==null
						            				|| kycPersonaFisica.kycPersonaFisicaPantallaBusqueda.length==0){

						            			this.setValue("1");
						            		}
						            	}
						            }
						        },
						    	{xtype: "label", text: "Memo", cls: "x-form-item label_spacing", colspan: 6},
						        {
									xtype : "textarea",
									id : "kycPersonaFisicaMemo",
									name : "kycPersonaFisica.kycPersonaFisicaMemo",
									maxLength : 500,
									colspan : 6,
									height : 40,
									width : 715
								},
								{
									xtype : "hidden",
									id : "kycPersonaFisicaCodigoTransaccion",
									name : "kycPersonaFisica.kycPersonaFisicaCodigoTransaccion",
									submitOnDisable: true,
									maxLength : 10,
									colspan : 6
							},
							{
								xtype : "hidden",
								id : "kycPersonaFisicaCodigoReferencia",
								name : "kycPersonaFisica.kycPersonaFisicaCodigoReferencia",
								submitOnDisable: true,
								maxLength : 20,
								colspan : 6
						},
								{
									xtype : "hidden",
									id : "ctgTipoDocumentoId",
									name : "kycPersonaFisica.ctgTipoDocumento.ctgCatalogoId",
									readOnly: true,
									fieldClass: "x-item-disabled",
									store : new Ext.data.SimpleStore({
										data : config.ctgTipoDocumentos || [],
										fields : [ "ctgCatalogoId", "ctgCatalogoNombre", "ctgCatalogoPadre", "ctgCatalogoHijo"]
									}),
									displayField : "ctgCatalogoNombre",
									valueField : "ctgCatalogoId",
									allowBlank : false,
									listeners : {
										change : function() {
											Efx.combos.loadData("ctgSubTipoDocumentoId",
											Efx.combos.getAllDocHijoByDocPadreCombo(this.getValue(),config.ctgCatalogos));

											var disable = this.getValue();
											if (disable == Efx.constants.codes.TIPO_DOCUMENTO_CEDULA);
											{
//												Efx.combos.setRequiredAndValidate("ctgSubTipoDocumentoId", !disable);
												Ext.getCmp("ctgSubTipoDocumentoId").setValue(Efx.constants.codes.SUBTIPO_DOCUMENTO_CEDULA);
											}

											if (this.getValue()==Efx.constants.codes.TIPO_DOCUMENTO_EXTRANJERO){
												if(kycPersonaFisica.ctgPaisNacimiento == null || kycPersonaFisica.ctgNacionalidadId == null)
													{
													var combo = Ext.getCmp('ctgPaisId');
									                combo.setValue("");
									                var combo2=Ext.getCmp('ctgNacionalidadId');
									                combo2.setValue("");
													}

											}else if (this.getValue()==Efx.constants.codes.TIPO_DOCUMENTO_CEDULA){
											if(kycPersonaFisica.ctgPaisNacimiento == null || kycPersonaFisica.ctgNacionalidadId == null)
												{
												Ext.getCmp('ctgPaisId').setValue(Efx.constants.codes.COSTA_RICA);
												Ext.getCmp('ctgNacionalidadId').setValue(Efx.constants.codes.COSTA_RICA);
												}
										}
								}}
								},
								{
									xtype : "hidden",
									id : "kycFechaActualizacion",
									listeners : {
										change : function() {var value = this.getValue();
											Efx.utils.setVisible("kycFechaActualizacionTitle",!Ext.isEmpty(value));
											Efx.utils.setText("kycFechaActualizacionTitle","FORMULARIO ACTUALIZADO EL: "+ value);
										}
									}
								}
								]
					});
			return configToReturn;
		}
	};
}();