KycAccionista = function(){
	var configWindow = {
		add: "kycAccionistaAgregarTop",
		edit: "kycAccionistaEditarTop",
		save: "kycAccionistaGuardarTop",
		remove: "kycAccionistaEliminarTop",
		grid: "kycAccionistaGrid",
		form: "kycAccionistaForm"
	};
	var configWindowBottom = {
			add: "kycAccionistaAgregarBottom",
			edit: "kycAccionistaEditarBottom",
			save: "kycAccionistaGuardarBottom",
			remove: "kycAccionistaEliminarBottom"
	};
	return {
		agregarAccionista: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
//			Ext.getCmp("kycAccionistaFechaNacimiento").allowEnable = true;
		},
		editarAccionista: function(){
//			Ext.getCmp("kycAccionistaFechaNacimiento").allowEnable = false;
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			var disable = Ext.getCmp("ctgPaisId").getValue() != Efx.constants.codes.COSTA_RICA;
			Efx.utils.setDisabled("ctgProvinciaId", disable, false);
			Efx.utils.setDisabled("ctgCantonId", disable, false);
			Efx.utils.setDisabled("ctgDistritoId", disable, false);
		},
		eliminarAccionista: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycAccionista/delete",
					params: {
						kycAccionistaId: Efx.utils.getValue("kycAccionistaId"),
	    				kycPersonaJuridicaId: EfxKYC.getKycPersonaJuridicaId()
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycAccionistaForm");
								if(jsonObject.kycAccionistas){
			    					Ext.getCmp("kycAccionistaGrid").getStore().loadData(jsonObject.kycAccionistas);
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
		guardarAccionista: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycAccionistaForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycAccionista/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycAccionista.kycPersonaJuridica.kyc.kycId": EfxKYC.getKycId(),
    				"kycAccionista.kycPersonaJuridica.kycPersonaJuridicaId": EfxKYC.getKycPersonaJuridicaId()
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycAccionistaForm", true);
    				if(action.result.kycAccionistas){
    					Ext.getCmp("kycAccionistaGrid").getStore().loadData(action.result.kycAccionistas);
    					Ext.getCmp("kycAccionistaGrid").getSelectionModel().select(action.result.kycAccionistaIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		init: function(config){
			var kycAccionistas = config.kycAccionistas;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				flex: 1,
				title: "FIRMANTES",
				autoScroll: true,
				xtype: "panel",
				layout: {
				    type: "vbox",
				    align : "center",
				    pack  : "start"
				},
				defaults: {width: 730, margins: "5 0 5 0"},
				dockedItems: [
					{
						xtype: "toolbar",
						dock: "top",
						hidden: EfxKYC.getKycVigente() === false,
						items: [
						   '->',
						   {
							   text: "Nuevo",
							   id: "kycAccionistaAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycAccionista.agregarAccionista
						   },{
					    	   text: "Editar",
					    	   id: "kycAccionistaEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycAccionista.editarAccionista,
					       },{
					    	   text: "Guardar",
					    	   id: "kycAccionistaGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycAccionista.guardarAccionista
					       },{
					    	   text: "Eliminar",
					    	   id: "kycAccionistaEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycAccionista.eliminarAccionista
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
							   id: "kycAccionistaAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycAccionista.agregarAccionista
						   },{
					    	   text: "Editar",
					    	   id: "kycAccionistaEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycAccionista.editarAccionista
					       },{
					    	   text: "Guardar",
					    	   id: "kycAccionistaGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycAccionista.guardarAccionista
					       },{
					    	   text: "Eliminar",
					    	   id: "kycAccionistaEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycAccionista.eliminarAccionista
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycAccionistaGrid",
						height: 150,
						minHeight: 150,
						collapsible : true,
						store: new Ext.data.SimpleStore({
					    	data: kycAccionistas || [],
					    	fields: [
									"kycAccionistaId",
									"kycAccionistaNombreCompleto",
									"kycAccionistaIdentificacion",
									"kycAccionistaNumeroCuenta",
									"kycAccionistaFechaNacimiento",
									"kycAccionistaLugarNacimiento",
									"kycAccionistaSenas",
									"kycAccionistaEmail",
									"kycAccionistaTelefono1",
									"kycAccionistaTelefono2",
									"kycAccionistaPep",
									"kycAccionistaPepCargo",
									"kycAccionistaPepNombre",
									"kycAccionistaPepFechaInicio",
									"kycAccionistaPepFechaFin",
									"ctgCuenta.ctgCatalogoId",
									"ctgGenero.ctgCatalogoId",
									"ctgEstadoCivil.ctgCatalogoId",
									"ctgNacionalidad.ctgPaisId",
									"ctgTipoDocumento.ctgCatalogoId",
									"ctgProvincia.ctgProvinciaId",
									"ctgCanton.ctgCantonId",
									"ctgDistrito.ctgDistritoId",
									"ctgProfesion.ctgCatalogoId",
									"ctgPais.ctgPaisId",
									"ctgRelacionEmpresa.ctgCatalogoId",
									"kycAccionistaFondosTerceros",
									"kyc.kycFechaActualizacion"
			    	        ]
					    }),
					    columns: [
				            {header: "Nombre Completo",  dataIndex: "kycAccionistaNombreCompleto", flex:1, minWidth: 120},
				            {header: "Identificaci\u00F3n",  dataIndex: "kycAccionistaIdentificacion", width: 120}
//				            {header: "pais",  dataIndex: "ctgPais.ctgPaisId", align: "right", width: 40},
//				            {header: "prov",  dataIndex: "ctgProvincia.ctgProvinciaId", align: "right", width: 40},
//				            {header: "can",  dataIndex: "ctgCanton.ctgCantonId", align: "right", width: 40},
//				            {header: "dist",  dataIndex: "ctgDistrito.ctgDistritoId", align: "right", width: 40},


					    ],

					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){

					    			Efx.form.setValues("kycAccionistaForm", record.data);
					    			Efx.form.setDisable("kycAccionistaForm");
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
						id: "kycAccionistaForm",
						flex: 1,
					    border: false,
					    autoScroll: true,
						layout: {
							type: "table",
							columns: 6,
							style : {
								width : "730px",
								"margin-top" : "5px",
								"margin-bottom" : "40px"
							},
							align : "center"
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
							colspan: 2
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
								text: "DATOS GENERALES",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "Tipo de Cuenta", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Cuenta", cls: "x-form-item label_spacing", colspan: 6},
							{
								xtype: "combo",
								id: "ctgCuenta.ctgCatalogoId",
								name: "ctgCuenta.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
							data: config.ctgTipoCuentas || [],
							fields: [
							         "ctgTipoCuentaId",
							         "ctgTipoCuentaNombre",
							         "ctgTipoCuentaPadre",
							         "ctgTipoCuentaHijo"
									]
							}),
							displayField: "ctgTipoCuentaNombre",
							valueField: "ctgTipoCuentaId",
							allowBlank: false
							},{
								xtype: "textfield",
								id: "kycAccionistaNumeroCuenta",
								name: "kycAccionistaNumeroCuenta",
								maxLength: 20,
								allowBlank: false,
								colspan: 6
							},
							{xtype: "label", text: "Tipo de Identificaci\u00F3n", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Identificaci\u00F3n", cls: "x-form-item label_spacing", colspan :6},
//							{xtype: "label", text: "Participacion", cls: "x-form-item label_spacing"},
							{
								xtype : "combo",
								id : "ctgTipoDocumento.ctgCatalogoId",
								name : "ctgTipoDocumento.ctgCatalogoId",
//								readOnly : true,
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
								xtype: "textfield",
								id: "kycAccionistaIdentificacion",
								name: "kycAccionistaIdentificacion",
								maxLength: 20,
								allowBlank: false,
								colspan: 6
							},
							{xtype: "label", text: "Nombre Completo", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "textfield",
								id: "kycAccionistaNombreCompleto",
								name: "kycAccionistaNombreCompleto",
								maxLength: 250,
								width: 472,
								allowBlank: false,
								colspan: 6
							},
//							{
//								xtype: "numericfield",
//								name: "kycAccionista.kycAccionistaParticipacion",
//								maxLength: 20,
//								maxValue: "100",
//								allowBlank: false,
//								allowZero: false
//							},
							/**nueva seccion de campos para accionistas**/
							{xtype: "label", text: "Nacionalidad", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Lugar de Nacimiento", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Fecha Nacimiento", cls: "x-form-item label_spacing"},
							{
								xtype: "combo",
								id: "ctgNacionalidad",
								name: "ctgNacionalidad.ctgPaisId",
								store: new Ext.data.SimpleStore({
									data: config.ctgNcionalidades || [],
									fields: [
									         "ctgNacionalidadId",
									         "ctgNacionalidadNacionalidad"
									         ]
								}),
								displayField: "ctgNacionalidadNacionalidad",
								valueField: "ctgNacionalidadId",
								allowBlank: false
							},{
								xtype: "textfield",
								id: "kycAccionistaLugarNacimiento",
								name: "kycAccionistaLugarNacimiento",

								maxLength: 100
							},{
								xtype: "datefield",
								id: "kycAccionistaFechaNacimiento",
								name: "kycAccionistaFechaNacimiento",
								//disabled: true,
								submitOnDisable: true,
//								allowEnable: false,
								submitFormat: "Ymd",
								altFormats:"Ymd|d/m/Y",
								maxValue: new Date(),
								allowBlank: false
							},
							{xtype: "label", text: "G\u00E9nero", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Estado Civil", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Profesi\u00f3n/Ocupaci\u00f3n", cls: "x-form-item label_spacing", colspan: 6},
							{
								xtype: "combo",
								id: "ctgGeneroId",
								name: "ctgGenero.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgGeneros || [],
									fields: [
									         "ctgGeneroId",
									         "ctgGeneroNombre"
									        ]
								}),
								displayField: "ctgGeneroNombre",
								valueField: "ctgGeneroId",
								allowBlank: false,
							},{
								xtype : "combo",
								id : "ctgEstadoCivil",
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
							},{
								xtype: "combo",
								id: "ctgProfesion",
								name: "ctgProfesion.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgProfesiones || [],
									fields: [
									         "ctgProfesionId",
									         "ctgProfesionNombre"
									         ]
								}),
								displayField: "ctgProfesionNombre",
								valueField: "ctgProfesionId",
								allowBlank: false,
								colspan: 2
							},
							{
								xtype: "label",
								text: "DATOS DOMICILIO",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label", text: "Pa\u00EDs", cls: "x-form-item label_spacing", colspan: 6},
							{
								xtype: "combo",
								id: "ctgPaisId",
								name: "ctgPais.ctgPaisId",
								store: new Ext.data.SimpleStore({
									data: config.ctgPaises || [],
									fields: [
									         "ctgPaisId",
									         "ctgPaisNacionalidad",
									         "ctgPaisNombre"
									         ]
								}),
								displayField: "ctgPaisNombre",
								valueField: "ctgPaisId",
								allowBlank: false,
								colspan: 6,
								value: Efx.constants.codes.COSTA_RICA,
								listeners: {
									change: function(){
										var disable = this.getValue() != Efx.constants.codes.COSTA_RICA;
										Efx.utils.setDisabled("ctgProvinciaId", disable, true);
										Efx.utils.setDisabled("ctgCantonId", disable, true);
										Efx.utils.setDisabled("ctgDistritoId", disable, true);
										Efx.combos.setRequiredAndValidate("ctgProvinciaId", !disable);
										Efx.combos.setRequiredAndValidate("ctgCantonId", !disable);
										Efx.combos.setRequiredAndValidate("ctgDistritoId", !disable);
									}
								}
							},
							{xtype: "label", text: "Provincia", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Cant\u00F3n", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Distrito", cls: "x-form-item label_spacing"},
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
							{xtype: "label", text: "Otras Se\u00f1as", cls: "x-form-item label_spacing", colspan: 6},
							{
								xtype: "textarea",
								id: "kycAccionistaSenas",
								name: "kycAccionistaSenas",
								maxLength: 250,
								colspan: 6,
								height: 40,
								width: 700,
								allowBlank: false
							},
							{xtype: "label", text: "Correo Electronico", cls: "x-form-item label_spacing", colspan: 6},
							{
								xtype: "textfield",
								id: "kycAccionistaEmail",
								name: "kycAccionistaEmail",
								fieldCls: "remove-uppercase",
								maxLength: 250,
								colspan: 6,
								vtype: "email",
								width: 300
							},
							{xtype: "label", text: "Tel\u00E9fono Residencia", cls: "x-form-item label_spacing"},
//							{xtype: "label", text: "Tel\u00E9fono Celular", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Fax", cls: "x-form-item label_spacing", colspan : 6},
							{
								xtype: "textfield",
								id: "kycAccionistaTelefono1",
								name: "kycAccionistaTelefono1",
								blankText: "Debe ingresar al menos un tel\u00E9fono",
								allowBlank: false,
								listeners: {
									change: function(){
										var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycAccionistaTelefono1"))&&
											Ext.isEmpty(Efx.utils.getValue("kycAccionistaTelefono2")) &&
											Ext.isEmpty(Efx.utils.getValue("kycAccionistaTelefono3"));
										Efx.utils.setRequiredAndValidate("kycAccionistaTelefono1", isEmpty);
										Efx.utils.setRequiredAndValidate("kycAccionistaTelefono2", isEmpty);
										Efx.utils.setRequiredAndValidate("kycAccionistaTelefono3", isEmpty);
									}
								},
								maxLength: 20
							},{
								xtype: "textfield",
								id: "kycAccionistaTelefono2",
								name: "kycAccionista.kycAccionistaTelefono2",
								blankText: "Debe ingresar al menos un tel\u00E9fono",
								listeners: {
									change: function(){
										var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycAccionistaTelefono1"))&&
											Ext.isEmpty(Efx.utils.getValue("kycAccionistaTelefono2")) &&
											Ext.isEmpty(Efx.utils.getValue("kycAccionistaTelefono3"));
										Efx.utils.setRequiredAndValidate("kycAccionistaTelefono1", isEmpty);
										Efx.utils.setRequiredAndValidate("kycAccionistaTelefono2", isEmpty);
										Efx.utils.setRequiredAndValidate("kycAccionistaTelefono3", isEmpty);
									}
								},
								maxLength: 20,
								colspan : 6
							},/**{
								xtype: "textfield",
								id: "kycAccionistaTelefono3",
								name: "kycAccionista.kycAccionistaTelefono3",
								blankText: "Debe ingresar al menos un tel\u00E9fono",
								listeners: {
									change: function(){
										var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycAccionistaTelefono1"))&&
											Ext.isEmpty(Efx.utils.getValue("kycAccionistaTelefono2")) &&
											Ext.isEmpty(Efx.utils.getValue("kycAccionistaTelefono3"));
										Efx.utils.setRequiredAndValidate("kycAccionistaTelefono1", isEmpty);
										Efx.utils.setRequiredAndValidate("kycAccionistaTelefono2", isEmpty);
										Efx.utils.setRequiredAndValidate("kycAccionistaTelefono3", isEmpty);
									}
								},
								maxLength: 20
							}**/
//							{xtype: "label", text: "Apartado Postal", cls: "x-form-item label_spacing"},

							/**{
								xtype: "textfield",
								id: "kycAccionistaApartadoPostal",
								name: "kycAccionista.kycAccionistaApartadoPostal",
								maxLength: 20
							},**/
							{xtype: "label", text: "Relaci\u00F3n con la empresa", cls: "x-form-item label_spacing", colspan : 6},
							{
								xtype: "combo",
								id: "ctgRelacionEmpresa",
								name: "ctgRelacionEmpresa.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgRelacionEmpresa || [],
									fields: [
									         "ctgRelacionEmpresaId",
									         "ctgRelacionEmpresaNombre"
									         ]
								}),
								displayField: "ctgRelacionEmpresaNombre",
								valueField: "ctgRelacionEmpresaId",
								allowBlank: false,
								colspan: 6
							},{
								xtype: "label",
								text: "POL\u00CDTICAMENTE EXPUESTO",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},{
								xtype : "label",
								text : "\u00BFCumple o ha cumplido funciones p\u00FAblicas o " +
										"pol\u00EDticas destacadas, ya sea en el territorio" +
										" nacional o en el extranjero? " +

										"(Considerar los vinculados hasta segundo grado de " +
										"consanguinidad o afinidad)",
								cls : "x-form-item label_spacing",
								width : 650,
								colspan : 6
							},{
								xtype: "combo",
								id: "kycAccionistaPep",
								name: "kycAccionista.kycAccionistaPep",
								store: new Ext.data.SimpleStore({
									data: Efx.combos.yesnoArray() || [],
									fields: ["id", "descripcion"]
								}),
								displayField: "descripcion",
								valueField: "id",
								listeners: {
									change: function(){
										var disable = this.getValue() != "1";
										Efx.utils.setDisabled("kycAccionistaPepCargo", disable, true);
										Efx.utils.setDisabled("kycAccionistaPepNombre", disable, true);
										Efx.utils.setDisabled("kycAccionistaPepFechaInicio", disable, true);
										Efx.utils.setDisabled("kycAccionistaPepFechaFin", disable, true);
										Efx.utils.setRequiredAndValidate("kycAccionistaPepCargo", !disable);
										Efx.combos.setRequiredAndValidate("kycAccionistaPepNombre", !disable);
										Efx.utils.setRequiredAndValidate("kycAccionistaPepFechaInicio", !disable);
										Efx.utils.setRequiredAndValidate("kycAccionistaPepFechaFin", !disable);
									}
								},
								allowBlank: false,
								colspan: 6
							},
							{xtype: "label", text: "Nombre", cls: "x-form-item label_spacing",colspan: 6},
							{
								xtype: "textfield",
								id: "kycAccionistaPepNombre",
								name: "kycAccionista.kycAccionistaPepNombre",
								colspan: 6
							},
							{xtype: "label", text: "Cargo o Relaci\u00F3n", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Desde", cls: "x-form-item label_spacing", width: 115},
							{xtype: "label", text: "Hasta", cls: "x-form-item label_spacing", width: 110, colspan : 6},
							{
								xtype: "textfield",
								id: "kycAccionistaPepCargo",
								name: "kycAccionista.kycAccionistaPepCargo",
								maxLength: 50
							},
							{
								xtype: "datefield",
								id: "kycAccionistaPepFechaInicio",
								name: "kycAccionista.kycAccionistaPepFechaInicio",
								submitFormat: "Ymd",
								altFormats: "Ymd|d/m/y",
								width: 115,
								maxValue: new Date(),
								colspan: 1
							},{
								xtype: "datefield",
								id: "kycAccionistaPepFechaFin",
								name: "kycAccionista.kycAccionistaPepFechaFin",
								submitFormat: "Ymd",
								altFormats: "Ymd|d/m/y",
								width: 110,
								maxValue: new Date(),
								colspan: 6
							},
							/**manejo de fondos**/
							{
								xtype: "label",
								text: "MANEJA FONDOS DE TERCEROS",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},{
								xtype: "label",
								text : "\u00BFManeja fondos de terceros (socios, inversionistas, clientes, otros)",
								cls: "x-form-item label_spacing",
								width: 715,
								colspan: 6
							},{
								xtype : "label",
								text : "Si maneja fondos de terceros debe " +
										"presentar copia de lic. otorgada por la SUGEF, " +
										"seg\u00FAn el art\u00EDculo 15 de Ley 8204",
								cls : "x-form-item label_spacing",
								width : 715,
								colspan : 6
							},{
								xtype: "combo",
								id: "kycAccionistaFondosTerceros",
								name: "kycAccionista.kycAccionistaFondosTerceros",
								store: new Ext.data.SimpleStore({
									data: Efx.combos.yesnoArray() || [],
									fields: ["id", "descripcion"]
								}),
								displayField: "descripcion",
								colspan: 6,
								allowBlank: false,
								valueField: "id"
							},{
								xtype: "hidden",
								id: "kycAccionistaId",
								name: "kycAccionista.kycAccionistaId"
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
							}

						]
			        }
				]
			});
			return configToReturn;
		}
	};
}();