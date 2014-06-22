KycCobis = function() {
	return {
		regresar: function(){
			window.history.go(-1);
		},
		saveKycCobis : function() {
			Efx.message.progress(Efx.constants.SAVING);
			Ext
					.getCmp("kycCobisForm")
					.getForm()
					.submit(
							{
								url : Efx.constants.CONTEXT_PATH
										+ "/kycCobis/save",
								timeout : Efx.constants.TIMEOUT_SECONDS,
								params : {
									"kycCobis.kycPersonaFisica.kycPersonaFisicaId" : EfxKYC.getKycPersonaFisicaId(),
									"kycCobis.kycPersonaFisica.kyc.kycId" : EfxKYC.getKycId()
								},
								success : function(form, action) {
									Efx.message.alert(action.result.message);
									EfxKYC.getKycPersonaFisicaId(action.result.getKycPersonaFisicaId);
									Efx.utils.setValue("kycCobisId", action.result.kycCobisId);
									Efx.utils.setValue("kycFechaActualizacion",
													action.result.kycFechaActualizacion);
								},
								failure : Efx.form.failureProcedure
							});

		},
		init : function(config) {
			var kycCobis = config.kycCobis;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			if(EfxMenu.getKycMostrarCobis()==false){
				Ext.LoadMask.prototype.disable();
				kycPersonaFisicaWindow = Ext.create("Ext.window.Window", {
				id : "kycRetoronoMensaje",
				title : "KYC - CITIBANK",
				modal : true,
				closable : false,
				layout : "fit",
				height : 100,
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
								 xtype: 'label',
						        forId: 'myFieldId',
						        style: "align: center",
						        text: 'Para acceder a la secci\u00f3n COBIS, debe tener un producto registrado.'
							}


]
				},
				listeners : {
					show : function() {
					 if (btn == 'ACEPTAR'){
					    	window.history.go(-1);
					    }
					}
				},
				buttons : [ {
					text : "ACEPTAR",
					handler: KycCobis.regresar
				}]
			});
			kycPersonaFisicaWindow.show();
				};

			configToReturn.menu = EfxBotones.getBotones(EfxKYC
					.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if (kycAlertas)
				configToReturn.items.push(kycAlertas);
			configToReturn.items
					.push({
						xtype : "form",
						flex : 1,
						id : "kycCobisForm",
						title : "INFORMACI\u00d3N REQUERIDA PARA COBIS",
						autoScroll : true,
						listeners : {
							render : function() {
								if (EfxKYC.getKycId() != null
										&& EfxKYC.getKycId() > 0
										&& this.getForm()) {
									this.getForm().setValues(kycCobis);
									if (EfxKYC.getKycVigente() === false)
										Efx.form.setDisable("kycCobisForm");
								}
							}
						},
						dockedItems : [
								{
									xtype : "toolbar",
									dock : "top",
									hidden : EfxKYC.getKycVigente() === false | config.esProductoActivo === false,
									items : [
											"->",
											{
												text : "Guardar",
												iconCls : Efx.constants.icons.SAVE_ICON,
												handler : KycCobis.saveKycCobis
											} ]
								},
								{
									xtype : "toolbar",
									dock : "bottom",
									hidden : EfxKYC.getKycVigente() === false | config.esProductoActivo === false ,
									items : [
											"->",
											{
												text : "Guardar",
												iconCls : Efx.constants.icons.SAVE_ICON,
												handler : KycCobis.saveKycCobis
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
									text : "PARA ACTIVAR ESTA SECCI\u00d3N DEBE INGRESAR AL MENOS UN PRODUCTO",
									cls : "x-form-item label_spacing",
									style: "color: red; text-align: center",
									colspan : 6,
									hidden : config.esProductoActivo,
									width : 730
								},
								{
									xtype : "label",
									text : "INFORMACI\u00d3N REQUERIDA PARA COBIS",
									cls : "x-form-item label_header",
									colspan : 6,
									width : 730
								},
								{xtype: "label", text: "Tipo de Persona (Cobis Clientes)", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Sector Econ\u00F3mico (Cobis Clientes)", cls: "x-form-item label_spacing", colspan: 4},
								{
									xtype : "combo",
									id : "tipoPersona",
									name : "kycCobis.tipoPersona.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgTipoPersona || [],
										fields : [ "ctgTipoPersonaId",
												"ctgTipoPersonaNombre" ]
									}),
									displayField : "ctgTipoPersonaNombre",
									valueField : "ctgTipoPersonaId",
									allowBlank: false,
									colspan: 2
								},
								{
									xtype : "combo",
									id : "sectorEconomico",
									name : "kycCobis.sectorEconomico.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgSectorEconomico || [],
										fields : [ "ctgSectorEconomicoId",
												"ctgSectorEconomicoNombre" ]
									}),
									displayField : "ctgSectorEconomicoNombre",
									valueField : "ctgSectorEconomicoId",
									colspan: 4,
									width: 480,
									listConfig : {minWidth : 570},
									allowBlank: false
								},
								{xtype: "label", text: "Sector Contable (Cobis Clientes)", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Oficial del Cliente (Cobis Clientes)", cls: "x-form-item label_spacing", colspan: 4},
								{
									xtype : "combo",
									id : "sectorContable",
									name : "kycCobis.sectorContable.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgSectorContable || [],
										fields : [ "ctgTipoEntidadId",
												"ctgTipoEntidadNombre" ]
									}),
									displayField : "ctgTipoEntidadNombre",
									valueField : "ctgTipoEntidadId",
									allowBlank: false,
									colspan: 2
								},
								{
									xtype : "combo",
									id : "oficialCliente",
									name : "kycCobis.oficialCliente.kycOficialId",
									store : new Ext.data.SimpleStore({
										data : config.ctgOficialCliente || [],
										fields : ["kycOficialId",
												"kycOficialNombre"]
									}),
									displayField : "kycOficialNombre",
									valueField : "kycOficialId",
									colspan: 4,
									width: 480,
									allowBlank: false
								},
								{xtype: "label", text: "Categoria del Cliente (Cobis Clientes)", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Risk Type (Cobis Clientes)", cls: "x-form-item label_spacing", colspan: 4},
								{
									xtype : "combo",
									id : "categoriaCliente",
									name : "kycCobis.categoriaCliente.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgCategoriaCliente || [],
										fields : [ "ctgCategoriaClienteId",
												"ctgCategoriaClienteNombre" ]
									}),
									displayField : "ctgCategoriaClienteNombre",
									valueField : "ctgCategoriaClienteId",
									allowBlank: false
								},
								{
									xtype : "combo",
									id : "riskType",
									name : "kycCobis.riskType.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgRiskType || [],
										fields : ["ctgRiskTypeId",
												"ctgRiskTypeNombre"]
									}),
									displayField : "ctgRiskTypeNombre",
									valueField : "ctgRiskTypeId",
									colspan: 4,
									width: 480,
									allowBlank: false
								},
								{xtype: "label", text: "Watch List Code (Cobis Clientes)", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Rol dentro de la Compa\u00f1\u00eda (Tadmin) ", cls: "x-form-item label_spacing", colspan: 4},
								{
									xtype : "combo",
									id : "watchListCode",
									name : "kycCobis.watchListCode.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgWatchList || [],
										fields : ["ctgWatchListId",
												"ctgWatchListNombre"]
									}),
									displayField : "ctgWatchListNombre",
									valueField : "ctgWatchListId",
									allowBlank: false,
									colspan: 2
								},
								{
									xtype : "combo",
									id : "rol",
									name : "kycCobis.rol.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgRol || [],
										fields : [ "ctgRolId",
												"ctgRolNombre" ]
									}),
									displayField : "ctgRolNombre",
									colspan: 4,
									width: 480,
									valueField : "ctgRolId",
									allowBlank: false
								},
								{xtype: "label", text: "Rol de la Cuenta (Tadmin) ", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Direcci\u00f3n env\u00edo de Estado de Cuenta (Tadmin) ", cls: "x-form-item label_spacing",  width: 480, colspan: 4},
								{
									xtype : "combo",
									id : "prodRol",
									name : "kycCobis.prodRol.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgProductoRol || [],
										fields : ["ctgProductoRolId",
												"ctgProductoRolNombre"]
									}),
									displayField : "ctgProductoRolNombre",
									valueField : "ctgProductoRolId",
									colspan: 2,
									allowBlank: false
								},
								{
									xtype : "combo",
									id : "tipoDireccion",
									name : "kycCobis.tipoDireccion.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgTipoDireccion || [],
										fields : ["ctgTipoDirecciontId",
												"ctgTipoDireccionNombre"]
									}),
									displayField : "ctgTipoDireccionNombre",
									valueField : "ctgTipoDirecciontId",
									width: 480,
									allowBlank: false,
									colspan: 4
								},
								{xtype: "label", text: "Origen de la Cuenta (Tadmin) ", cls: "x-form-item label_spacing", colspan: 2},
								{xtype: "label", text: "Ejecutivo de Cuenta (Tadmin) ", cls: "x-form-item label_spacing", colspan: 4},
								{
									xtype : "combo",
									id : "origen",
									name : "kycCobis.origen.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgOrigen || [],
										fields : [ "ctgOrigenId",
												"ctgOrigenNombre" ]
									}),
									displayField : "ctgOrigenNombre",
									valueField : "ctgOrigenId",
									allowBlank: false,
									colspan: 2
								},
								{
									xtype : "combo",
									id : "kycEjecutivoCuenta",
									name : "kycCobis.kycEjecutivoCuenta.kycEjecutivoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgEjecutivoCuenta || [],
										fields : [ "ctgEjecutivoCuentaId",
												"ctgEjecutivoCuentaNombre" ]
									}),
									displayField : "ctgEjecutivoCuentaNombre",
									valueField : "ctgEjecutivoCuentaId",
									allowBlank: false,
									width: 480,
									colspan: 4
								},
								{xtype: "label", text: "Ejecutivo de Venta (Tadmin)", cls: "x-form-item label_spacing", colspan: 4},
								{xtype: "label", text: "Contrase\u00f1a", cls: "x-form-item label_spacing", colspan: 2},
								{
									xtype : "combo",
									id : "kycEjecutivoVenta",
									name : "kycCobis.kycEjecutivoVenta.kycEjecutivoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgEjecutivoVenta || [],
										fields : [ "ctgEjecutivoVentaId",
												"ctgEjecutivoVentaNombre" ]
									}),
									displayField : "ctgEjecutivoVentaNombre",
									valueField : "ctgEjecutivoVentaId",
									colspan: 4,
									width: 480,
									allowBlank: false
								},
								{
									xtype : "textfield",
									inputType: "password",
									id : "kycContrasenia",
									name : "kycContrasenia",
									colspan: 2,
									allowBlank: false
								},
								{xtype: "label", text: "Observaciones", cls: "x-form-item label_spacing", colspan: 6},
								{
									xtype : "textarea",
									id : "kycCobisObservaciones",
									name : "kycCobis.kycCobisObservaciones",
									colspan: 6,
									width: 715,
									maxlength: 500,
									allowBlank: false
								},
								{
				                    xtype: 'button',
				                    id:"validarButtonId1",
				                    text: 'DESCARGAR COBIS',
				                    colspan:6,
				                    handler: function(){

				                    /**
				                     * INICIO COBIS VALIDACION
				                     * */
									Efx.message.progress("Validando Actividades Pendientes...");
									Ext.Ajax.request({
										timeout: Efx.constants.TIMEOUT_SECONDS,
										url: Efx.constants.CONTEXT_PATH + '/kyc/validarActividadesPendientes',
										params: {
											kycId: EfxKYC.getKycId(),
											tipoPersona: EfxKYC.getCtgTipoPersonaCodigo()
										},
										callback: function(options, success, response){
											Ext.Msg.hide();
											if (success) {
												var jsonObject = Efx.utils.ajaxRequestGetJson(response);
												if (jsonObject && jsonObject.success) {
													if (!jsonObject.actividades.completa) mostrarActividadesPendientes(jsonObject.actividades);
													else {
														if(Ext.getCmp("kycContrasenia").getValue() != "" && Ext.getCmp("kycContrasenia").getValue() != null) {
														var pwd = Ext.util.base64.encode(Ext.getCmp("kycContrasenia").getValue());
														window.open( Efx.constants.CONTEXT_PATH + "/kycCobis/downloadFile/"+ EfxKYC.getKycPersonaFisicaId()+"&" + EfxKYC.getKycId() + "&"+pwd );
														}else {
															Efx.message.alert("Debe ingresar una contrasena");
														}
													}
												}
												else Efx.message.alertInvalid(jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE);
											}
										}
									});
				                  }
								,
				                  listeners:{
				                	  render:function(){
				                		  var kycCobisId = "";
				                		  kycCobisId=Ext.getCmp("kycCobisId").getValue();
				                		  if(Ext.isEmpty(kycCobisId) || config.esProductoActivo == false){
				                			  Ext.getCmp("validarButtonId1").hide();
				                		  }else Ext.getCmp("validarButtonId1").show();
				                	  }
				                  }
								},
								{
									xtype: "hidden",
									id: "kycCobisId",
									name: "kycCobis.kycCobisId",
									listeners:{
										change:function(){
				                		  var kycCobisId = "";
				                		  kycCobisId=Ext.getCmp("kycCobisId").getValue();
				                		  if(Ext.isEmpty(kycCobisId) || config.esProductoActivo == false ){
				                			  Ext.getCmp("validarButtonId1").hide();
				                		  }else Ext.getCmp("validarButtonId1").show();
										}
				                	  }
								},
								{
									xtype : "hidden",
									id : "kycFechaActualizacion",
									listeners : {
										change : function() {
											var value = this.getValue();
											Efx.utils
													.setVisible(
															"kycFechaActualizacionTitle",
															!Ext.isEmpty(value));
											Efx.utils
													.setText(
															"kycFechaActualizacionTitle",
															"FORMULARIO ACTUALIZADO EL: "
																	+ value);
										}
									}
								}

								]
					});

			return configToReturn;
		}
	};
}();