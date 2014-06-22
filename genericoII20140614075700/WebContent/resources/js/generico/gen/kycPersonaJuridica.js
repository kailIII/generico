KycPersonaJuridica = function() {
	return {
		saveKycPersonaJuridica : function() {
			Efx.message.progress(Efx.constants.SAVING);
			Ext
					.getCmp("kycPersonaJuridicaForm")
					.getForm()
					.submit(
							{
								url : Efx.constants.CONTEXT_PATH
										+ "/kycPersonaJuridica/save",
								timeout : Efx.constants.TIMEOUT_SECONDS,
								params : {
									"kycPersonaJuridica.kyc.kycId" : EfxKYC
											.getKycId(),
									"kycPersonaJuridica.kycPersonaJuridicaId" : EfxKYC
											.getKycPersonaJuridicaId(),
											Equifax: EfxKYC.getKycVerifica()
								},
								success : function(form, action) {
									Efx.message.alert(action.result.message);
									EfxKYC.setKycId(action.result.kycId);
									EfxKYC
											.setKycPersonaJuridicaId(action.result.kycPersonaJuridicaId);
									Efx.utils
											.setValue(
													"kycFechaActualizacion",
													action.result.kycFechaActualizacion);
								},
								failure : Efx.form.failureProcedure
							});

		},
		init : function(config) {
			var kycPersonaJuridica = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC
					.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if (kycAlertas)
				configToReturn.items.push(kycAlertas);
			configToReturn.items
					.push({
						xtype : "form",
						flex : 1,
						id : "kycPersonaJuridicaForm",
						title : "DATOS GENERALES",
						autoScroll : true,
						listeners : {
							render : function() {
								if (EfxKYC.getKycId() != null
										&& EfxKYC.getKycId() > 0
										&& this.getForm()) {
									this.getForm()
											.setValues(kycPersonaJuridica);
									if (EfxKYC.getKycVigente() === false)
										Efx.form
												.setDisable("kycPersonaJuridicaForm");
								}
							}
						},
						dockedItems : [
								{
									xtype : "toolbar",
									dock : "top",
									hidden : EfxKYC.getKycVigente() === false,
									items : [
											"->",
											{
												text : "Guardar",
												iconCls : Efx.constants.icons.SAVE_ICON,
												handler : KycPersonaJuridica.saveKycPersonaJuridica
											} ]
								},
								{
									xtype : "toolbar",
									dock : "bottom",
									hidden : EfxKYC.getKycVigente() === false,
									items : [
											"->",
											{
												text : "Guardar",
												iconCls : Efx.constants.icons.SAVE_ICON,
												handler : KycPersonaJuridica.saveKycPersonaJuridica
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
								{
									xtype : "label",
									text : "DATOS GENERALES",
									cls : "x-form-item label_header",
									colspan : 6,
									width : 730
								},
								{
									xtype : "label",
									text : "Nombre Comercial",
									cls : "x-form-item label_spacing",
									colspan : 4
								},
								{
									xtype : "label",
									text : "Tipo Entidad",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaNombreComercial",
									name : "kycPersonaJuridica.kycPersonaJuridicaNombreComercial",
									submitOnDisable : true,
									allowBlank : false,
									width : 475,
									colspan : 4,
									maxLength : 120
								},
								{
									xtype : "combo",
									id : "ctgTipoEntidadId",
									name : "kycPersonaJuridica.ctgTipoEntidad.ctgCatalogoId",
									fieldClass : "x-item-disabled",
									store : new Ext.data.SimpleStore({
										data : config.ctgTipoEntidades || [],
										fields : [ "ctgTipoEntidadId",
												"ctgTipoEntidadNombre" ]
									}),
									displayField : "ctgTipoEntidadNombre",
									valueField : "ctgTipoEntidadId"
								},
								{
									xtype : "label",
									text : "Raz\u00F3n Social",
									cls : "x-form-item label_spacing",
									colspan : 4
								},
								{
									xtype : "label",
									text : "C\u00E9dula",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaRazonSocial",
									name : "kycPersonaJuridica.kycPersonaJuridicaRazonSocial",
									disabled : true,
									submitOnDisable: true,
									allowBlank : false,
									width : 475,
									colspan : 4,
									maxLength : 120
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaDocumento1",
									name : "kycPersonaJuridica.kycPersonaJuridicaDocumento1",
									disabled : true,
									submitOnDisable : true,
									maxLength : 20,
									allowBlank : false
								},
								{
									xtype : "label",
									text : "Actividad de la Empresa o Negocio",
									cls : "x-form-item label_spacing",
									colspan: 6
								},
								{/**agregado**/
									xtype : "label",
									text : "Segmento",
									cls : "x-form-item label_spacing"
								},
								{/**agregado**/
									xtype : "label",
									text : "Subsegmento",
									cls : "x-form-item label_spacing",
									colspan : 6
								},
								{/**agregado**/
									xtype : "combo",
									id : "ctgActividadEconomicaId",
									fieldClass : "x-item-disabled",
									name : "kycPersonaJuridica.ctgActividadEconomica.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgActividadesEconomicas
												|| [],
										fields : [ "ctgActividadEconomicaId",
												"ctgActividadEconomicaNombre" ]
									}),
									displayField : "ctgActividadEconomicaNombre",
									valueField : "ctgActividadEconomicaId",
									listeners: {
										change: function(){
											Efx.combos.loadData(
													"ctgSubActividadEconomica",Efx.combos.getAllSubSegmentosBySegmentoCombo(
															this.getValue(),config.ctgCatalogos));										}
									}
								},
								{/**agregado**/
									xtype : "combo",
									id : "ctgSubActividadEconomica",
									fieldClass : "x-item-disabled",
									name : "kycPersonaJuridica.ctgSubActividadEconomica.ctgCatalogoId",
									store : new Ext.data.SimpleStore({
										data :  [],
										fields : [ "ctgSubActividadEconomicaId",
												"ctgSubActividadEconomicaNombre" ]
									}),
									displayField : "ctgSubActividadEconomicaNombre",
									valueField : "ctgSubActividadEconomicaId",
									width: 480,
									colspan: 6
								},
								/**detalles o descripcion de la actividad economica**/
								{
									xtype : "label",
									text: "Detalle",
									cls : "x-form-item label_spacing",
									colspan : 6,
									width : 715
								},
								{
									xtype : "textarea",
									id : "kycPersonaJuridicaDescripcionActividad",
									name : "kycPersonaJuridicaDescripcionActividad",
									maxLength : 250,
									colspan : 6,
									height : 40,
									width : 715,
									allowBlank : false
								},
								/**CANTIDAD EMPLEADOS**/
								{/**agregado**/
									xtype : "label",
									text : "Cantidad Estimada de Empleados",
									cls : "x-form-item label_spacing"
								},
								{/**agregado**/
									xtype : "label",
									text : "Cantidad reportada por el cliente",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Pa\u00EDs de Constituci\u00F3n",
									cls : "x-form-item label_spacing",
									colspan: 6
								},
								{/**agregado**/
									xtype : "textfield",
									id : "kycPersonaJuridicaCantEstEmp",
									name : "kycPersonaJuridica.kycPersonaJuridicaCantidadEstimadaEmpleados",
									submitOnDisable : true,
									maxLength : 20,
									allowBlank : false
								},
								{/**agregado**/
									xtype : "textfield",
									id : "kycPersonaJuridicaCantRep",
									name : "kycPersonaJuridica.kycPersonaJuridicaCantidadReportadaCliente",
									submitOnDisable : true,
									maxLength : 20,
									allowBlank : false
								},
								{
									xtype : 'combo',
									id : "ctgPaisConstitucion",
									fieldClass : "x-item-disabled",
									name : "kycPersonaJuridica.ctgPaisConstitucion.ctgPaisId",
									store : new Ext.data.SimpleStore({
											data : config.ctgPaises
													|| [],
											fields : [ "ctgPaisConstitucionId",
											           "ctgPaisConstitucionNacionalidad",
													"ctgPaisConstitucionNombre" ]
										}),
									displayField : "ctgPaisConstitucionNombre",
									valueField : "ctgPaisConstitucionId",
									colspan: 6
								},
								/**DATOS CONSTITUCION**/

								{
									xtype : "label",
									text : "Lugar de Constituci\u00F3n",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Fecha de Constituci\u00F3n",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Fecha Inicio Operaciones",
									cls : "x-form-item label_spacing",
									colspan: 6
								},

								{
									xtype : 'textfield',
									id : "kycPersonaJuridicaLugarConstitucion",
									name : "kycPersonaJuridicaLugarConstitucion",
									submitOnDisable : true,
									maxLength : 20,
									allowBlank : false
								},
								{
									xtype : "datefield",
									id : "kycPersonaJuridicaFechaConstitucion",
									name : "kycPersonaJuridica.kycPersonaJuridicaFechaConstitucion",
									disabled : true,
									submitOnDisable : true,
									submitFormat : "Ymd",
									maxValue : new Date()
								},
								{
									xtype : "datefield",
									id : "kycPersonaJuridicaFechaInicioOperacion",
									name : "kycPersonaJuridica.kycPersonaJuridicaFechaInicioOperacion",
									submitOnDisable : true,
									submitFormat : "Ymd",
									maxValue : new Date(),
									colspan: 6
								},
								/**Inicio de operaciones**/
								/**e-mail**/
								{
									xtype : "label",
									text : "Apartado Postal",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Correo Electr\u00F3nico",
									cls : "x-form-item label_spacing"
								},
								/**pagina web**/
								{
									xtype : "label",
									text : "Pagina WEB",
									cls : "x-form-item label_spacing",
									colspan : 6
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaApartadoPostal",
									name : "kycPersonaJuridica.kycPersonaJuridicaApartadoPostal",
									maxLength : 20
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaCorreoElectronico",
									name : "kycPersonaJuridica.kycPersonaJuridicaCorreoElectronico",
									fieldCls : "remove-uppercase",
									vtype : "email",
									maxLength : 250
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaPaginaWeb",
									name : "kycPersonaJuridica.kycPersonaJuridicaPaginaWeb",
									fieldCls : "remove-uppercase",
									vtype : "url",
									colspan : 6,
									maxLength : 250
								},
								{
									xtype : "label",
									text : "Otros Datos",
									cls : "x-form-item label_spacing",
									colspan : 6,
									width : 715
								},
								{
									xtype : "textarea",
									id : "kycPersonaJuridicaOtrosDatos",
									name : "kycPersonaJuridicaOtrosDatos",
									maxLength : 250,
									colspan : 6,
									height : 40,
									width : 715,
									allowBlank : false
								},
								/**
								 * Direccion Comercial*
								 */
								{
									xtype : "label",
									text : "DIRECCI\u00D3N COMERCIAL",
									cls : "x-form-item label_header",
									colspan : 6,
									width : 730
								},
								{
									xtype : "label",
									text : "Pa\u00EDs",
									cls : "x-form-item label_spacing",
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
									id : "ctgPaisId",
									name : "kycPersonaJuridica.ctgPais.ctgPaisId",
									store : new Ext.data.SimpleStore({
										data : config.ctgPaises || [],
										fields : [ "ctgPaisId",
												"ctgPaisNacionalidad",
												"ctgPaisNombre" ]
									}),
									displayField : "ctgPaisNombre",
									valueField : "ctgPaisId",
									allowBlank : false,
									value : Efx.constants.codes.COSTA_RICA,
									listeners : {
										change : function() {
											var disable = this.getValue() != Efx.constants.codes.COSTA_RICA;
											Efx.utils.setDisabled(
													"ctgProvinciaId", disable,
													true);
											Efx.utils.setDisabled(
													"ctgCantonId", disable,
													true);
											Efx.utils.setDisabled(
													"ctgDistritoId", disable,
													true);
											Efx.utils.setDisabled(
													"ctgPobladoId", disable,
													true);
											Efx.utils.setDisabled(
													"ctgPobladoId", disable,
													true);
											Efx.combos.setRequiredAndValidate(
													"ctgProvinciaId", !disable);
											Efx.combos.setRequiredAndValidate(
													"ctgCantonId", !disable);
											Efx.combos.setRequiredAndValidate(
													"ctgDistritoId", !disable);
											Efx.combos.setRequiredAndValidate(
													"ctgPobladoId", !disable);
											if(Ext.getCmp("ctgCheckDireccion").getValue()){
												Ext.getCmp("ctgPaisSocialId").setRawValue(Ext.getCmp("ctgPaisId").getRawValue());
											}
										}
									}
								},
								{
									xtype : "combo",
									id : "ctgProvinciaId",
									name : "kycPersonaJuridica.ctgProvincia.ctgProvinciaId",
									store : new Ext.data.SimpleStore({
										data : config.ctgProvincias || [],
										fields : [ "ctgProvinciaId",
												"ctgProvinciaNombre" ]
									}),
									displayField : "ctgProvinciaNombre",
									valueField : "ctgProvinciaId",
									allowBlank : false,
									listeners : {
										change : function() {
											Efx.combos.loadData(
												"ctgCantonId",Efx.combos.getAllCantonesByProvinciaCombo(
														this.getValue(),config.ctgCantones));
											Efx.combos.removeAll("ctgDistritoId", true);
											if(Ext.getCmp("ctgCheckDireccion").getValue()){
												Ext.getCmp("ctgProvinciaSocialId").setRawValue(Ext.getCmp("ctgProvinciaId").getRawValue());
											}
										}
									}
								},
								{
									xtype : "combo",
									id : "ctgCantonId",
									name : "kycPersonaJuridica.ctgCanton.ctgCantonId",
									store : new Ext.data.SimpleStore({
										data : config.ctgCantones ||[],
										fields : [ "ctgCantonId",
												"ctgCantonNombre",
												"ctgProvinciaId" ]
									}),
									displayField : "ctgCantonNombre",
									valueField : "ctgCantonId",
									allowBlank : false,
									listeners : {
										change : function() {
											Efx.combos.loadData("ctgDistritoId",Efx.combos.getAllDistritosByCantonCombo(
												this.getValue(),config.ctgDistritos));
											if(Ext.getCmp("ctgCheckDireccion").getValue()){
												Ext.getCmp("ctgCantonSocialId").setRawValue(Ext.getCmp("ctgCantonId").getRawValue());
											}
										}
									}
								},
								{
									xtype : "label",
									text : "Distrito",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Barrio/Poblado",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Otro",
									cls : "x-form-item label_spacing",
									colspan : 6
								},
								{
									xtype : "combo",
									id : "ctgDistritoId",
									name : "kycPersonaJuridica.ctgDistrito.ctgDistritoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgDistritos || [],
										fields : [ "ctgDistritoId",
												"ctgDistritoNombre",
												"ctgCantonId" ]
									}),
									displayField : "ctgDistritoNombre",
									valueField : "ctgDistritoId",
									allowBlank : false,
									listeners : {
										change : function() {
											Efx.combos.loadData("ctgPobladoId",Efx.combos.getAllPobladosByDistritoCombo(
												this.getValue(),config.ctgPoblados));
											if(Ext.getCmp("ctgCheckDireccion").getValue()){
												Ext.getCmp("ctgDistritoSocialId").setRawValue(Ext.getCmp("ctgDistritoId").getRawValue());
											}
										}
									}
								},

								{
									xtype : "combo",
									id : "ctgPobladoId",
									name : "kycPersonaJuridica.ctgPoblado.ctgPobladoId",
									store : new Ext.data.SimpleStore({
										data : config.ctgPoblados || [],
										fields : [ "ctgPobladoId",
												"ctgPobladoNombre",
												"ctgDistritoId" ]
									}),
									displayField : "ctgPobladoNombre",
									valueField : "ctgPobladoId",
									allowBlank : false,
									listeners:{
										change: function(){
											if(Ext.getCmp("ctgCheckDireccion").getValue()){
												Ext.getCmp("ctgPobladoSocialId").setRawValue(Ext.getCmp("ctgPobladoId").getRawValue());
											}
										}
									}
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaDireccionOtro",
									name : "kycPersonaJuridica.kycPersonaJuridicaDireccionOtro",
									colspan : 6,
									maxLength : 20
								},

								{
									xtype : "label",
									text : "Direcci\u00F3n Exacta",
									cls : "x-form-item label_spacing",
									colspan : 6
								},
								{
									xtype : "textarea",
									id : "kycPersonaJuridicaDireccion",
									name : "kycPersonaJuridica.kycPersonaJuridicaDireccion",
									maxLength : 250,
									colspan : 6,
									height : 40,
									width : 715,
									allowBlank : false,
									listeners:{
										change: function(){
											if(Ext.getCmp("ctgCheckDireccion").getValue()){
												Ext.getCmp("kycPersonaJuridicaDireccionSocial").setRawValue(Ext.getCmp("kycPersonaJuridicaDireccion").getRawValue());
											}

											if((Ext.getCmp("kycPersonaJuridicaDireccion").getRawValue().toUpperCase( )!=kycPersonaJuridica.kycPersonaJuridicaDireccion)){
												EfxKYC.setKycVerifica(false);
													}else{
														EfxKYC.setKycVerifica(true);
													}

										}
									}
								},
								/**Direccion Social**/
								{
									xtype : "label",
									text : "DIRECCI\u00D3N SOCIAL",
									cls : "x-form-item label_header",
									colspan : 6,
									width : 730
								},
								{
									xtype: "checkbox",
									id: "ctgCheckDireccion",
									boxLabel : "Este domicilio es igual al Comercial indicado anteriormente",
									checked: false,
									width: 730,
									colspan: 6,
									listeners:{
										change:{
											fn: function(){
												var value = Ext.getCmp("ctgCheckDireccion").getValue();
												var pais = Ext.getCmp("ctgPaisSocialId");
												var prov = Ext.getCmp("ctgProvinciaSocialId");
												var canton = Ext.getCmp("ctgCantonSocialId");
												var distrito = Ext.getCmp("ctgDistritoSocialId");
												var poblado = Ext.getCmp("ctgPobladoSocialId");
												var direccion = Ext.getCmp("kycPersonaJuridicaDireccionSocial");
												var otro = Ext.getCmp("kycPersonaJuridicaDireccionSocialOtro");
												if(value){
													pais.setRawValue(Ext.getCmp("ctgPaisId").getRawValue());
													pais.setValue(Ext.getCmp("ctgPaisId").getValue());

													prov.setRawValue(Ext.getCmp("ctgProvinciaId").getRawValue());
													prov.setValue(Ext.getCmp("ctgProvinciaId").getValue());

													canton.setRawValue(Ext.getCmp("ctgCantonId").getRawValue());
													canton.setValue(Ext.getCmp("ctgCantonId").getValue());

													distrito.setRawValue(Ext.getCmp("ctgDistritoId").getRawValue());
													distrito.setValue(Ext.getCmp("ctgDistritoId").getValue());

													poblado.setRawValue(Ext.getCmp("ctgPobladoId").getRawValue());
													poblado.setValue(Ext.getCmp("ctgPobladoId").getValue());

													direccion.setRawValue(Ext.getCmp("kycPersonaJuridicaDireccion").getRawValue());
													direccion.setValue(Ext.getCmp("kycPersonaJuridicaDireccion").getValue());

													otro.setRawValue(Ext.getCmp("kycPersonaJuridicaDireccionOtro").getRawValue());
													direccion.setValue(Ext.getCmp("kycPersonaJuridicaDireccion").getValue());


													pais.disable(true);
													prov.disable(true);
													canton.disable(true);
													distrito.disable(true);
													poblado.disable(true);
													direccion.disable(true);
													otro.disable(true);
												}else{
													pais.setRawValue(Ext.getCmp("ctgPaisId").getRawValue());
													prov.setRawValue(Ext.getCmp("ctgProvinciaId").getRawValue());
													canton.setRawValue(Ext.getCmp("ctgCantonId").getRawValue());
													distrito.setRawValue(Ext.getCmp("ctgDistritoId").getRawValue());
													poblado.setRawValue(Ext.getCmp("ctgPobladoId").getRawValue());
													direccion.setRawValue(Ext.getCmp("kycPersonaJuridicaDireccion").getRawValue());
													otro.setRawValue(Ext.getCmp("kycPersonaJuridicaDireccionOtro").getRawValue());

													pais.enable(true);
													prov.enable(true);
													canton.enable(true);
													distrito.enable(true);
													poblado.enable(true);
													direccion.enable(true);
													otro.enable(true);

												}

											}
										}

									}
								},
								{
									xtype : "label",
									text : "Pa\u00EDs",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Provincia",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Cant\u00F3n",
									cls : "x-form-item label_spacing",
									colspan: 6
								},
								{
									xtype : "combo",
									id : "ctgPaisSocialId",
									name : "kycPersonaJuridica.ctgPaisSocial.ctgPaisId",
									store : new Ext.data.SimpleStore({
										data : config.ctgPaises || [],
										fields : [ "ctgPaisId",
												"ctgPaisNacionalidad",
												"ctgPaisNombre" ]
									}),
									displayField : "ctgPaisNombre",
									valueField : "ctgPaisId",
									allowBlank : false,
									submitOnDisable: true,
									listeners : {
										change : function() {
											var disable = this.getValue() != Efx.constants.codes.COSTA_RICA;
											Efx.utils.setDisabled(
													"ctgProvinciaSocialId", disable,
													true);
											Efx.utils.setDisabled(
													"ctgCantonSocialId", disable,
													true);
											Efx.utils.setDisabled(
													"ctgDistritoSocialId", disable,
													true);
											Efx.utils.setDisabled(
													"ctgPobladoSocialId", disable,
													true);
											Efx.combos.setRequiredAndValidate(
													"ctgProvinciaSocialId", !disable);
											Efx.combos.setRequiredAndValidate(
													"ctgCantonSocialId", !disable);
											Efx.combos.setRequiredAndValidate(
													"ctgDistritoSocialId", !disable);
											Efx.combos.setRequiredAndValidate(
													"ctgPobladoSocialId", !disable);
										}
									}
								},
								{
									xtype : "combo",
									id : "ctgProvinciaSocialId",
									name : "kycPersonaJuridica.ctgProvinciaSocial.ctgProvinciaId",
									store : new Ext.data.SimpleStore({
										data : config.ctgProvincias || [],
										fields : [ "ctgProvinciaId",
												"ctgProvinciaNombre" ]
									}),
									displayField : "ctgProvinciaNombre",
									valueField : "ctgProvinciaId",
									submitOnDisable: true,
									allowBlank : false,
									listeners : {
										change : function() {
											Efx.combos
													.loadData(
															"ctgCantonSocialId",
															Efx.combos.getAllCantonesByProvinciaCombo(
																			this
																					.getValue(),
																			config.ctgCantones));
											Efx.combos.removeAll(
													"ctgDistritoSocialId", true);
										}
									}
								},
								{
									xtype : "combo",
									id : "ctgCantonSocialId",
									name : "kycPersonaJuridica.ctgCantonSocial.ctgCantonId",
									store : new Ext.data.SimpleStore({
										data : [],
										fields : [ "ctgCantonId",
												"ctgCantonNombre",
												"ctgProvinciaId" ]
									}),
									displayField : "ctgCantonNombre",
									valueField : "ctgCantonId",
									submitOnDisable: true,
									allowBlank : false,
									listeners : {
										change : function() {
											Efx.combos
													.loadData(
															"ctgDistritoSocialId",
															Efx.combos
																	.getAllDistritosByCantonCombo(
																			this
																					.getValue(),
																			config.ctgDistritos));
										}
									}
								},
								{
									xtype : "label",
									text : "Distrito",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Barrio/Poblado",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Otro",
									cls : "x-form-item label_spacing",
									colspan : 6
								},
								{
									xtype : "combo",
									id : "ctgDistritoSocialId",
									name : "kycPersonaJuridica.ctgDistritoSocial.ctgDistritoId",
									submitOnDisable: true,
									store : new Ext.data.SimpleStore({
										data : [],
										fields : [ "ctgDistritoId",
												"ctgDistritoNombre",
												"ctgCantonId" ]
									}),
									displayField : "ctgDistritoNombre",
									valueField : "ctgDistritoId",
									allowBlank : false,
									listeners : {
										change : function() {
											Efx.combos.loadData("ctgPobladoSocialId",Efx.combos.getAllPobladosByDistritoCombo(
												this.getValue(),config.ctgPoblados));
										}
									}
								},
								{
									xtype : "combo",
									id : "ctgPobladoSocialId",
									name : "kycPersonaJuridica.ctgPobladoSocial.ctgPobladoId",
									submitOnDisable: true,
									store : new Ext.data.SimpleStore({
										data : config.ctgPoblados || [],
										fields : [ "ctgPobladoId",
												"ctgPobladoNombre",
												"ctgDistritoId" ]
									}),
									displayField : "ctgPobladoNombre",
									valueField : "ctgPobladoId",
									allowBlank : false
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaDireccionSocialOtro",
									name : "kycPersonaJuridica.kycPersonaJuridicaDireccionSocialOtro",
									submitOnDisable: true,
									colspan : 6,
									maxLength : 20
								},

								{
									xtype : "label",
									text : "Direcci\u00F3n Exacta",
									cls : "x-form-item label_spacing",
									colspan : 6
								},
								{
									xtype : "textarea",
									id : "kycPersonaJuridicaDireccionSocial",
									name : "kycPersonaJuridica.kycPersonaJuridicaDireccionSocial",
									submitOnDisable: true,
									maxLength : 250,
									colspan : 6,
									height : 40,
									width : 715,
									allowBlank : false
								},
								/**TELEFONOS**/
								{
									xtype : "label",
									text : "TEL\u00C9FONOS",
									cls : "x-form-item label_header",
									colspan : 6,
									width : 730
								},
								{
									xtype : "label",
									text : "Tel\u00E9fono",
									cls : "x-form-item label_spacing"
								},
								{
									xtype : "label",
									text : "Fax",
									cls : "x-form-item label_spacing",
									colspan: 6
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaTelefono1",
									name : "kycPersonaJuridica.kycPersonaJuridicaTelefono1",
									blankText : "Debe ingresar al menos un tel\u00E9fono",
									allowBlank : false,
									listeners : {
										change : function() {
											var isEmpty = Ext
													.isEmpty(Efx.utils
															.getValue("kycPersonaJuridicaTelefono1"))
													&& Ext
															.isEmpty(Efx.utils
																	.getValue("kycPersonaJuridicaTelefono2"));
											Efx.utils
													.setRequiredAndValidate(
															"kycPersonaJuridicaTelefono1",
															isEmpty);
											Efx.utils
													.setRequiredAndValidate(
															"kycPersonaJuridicaTelefono2",
															isEmpty);
										}
									},
									maxLength : 250
								},
								{
									xtype : "textfield",
									id : "kycPersonaJuridicaTelefono2",
									name : "kycPersonaJuridica.kycPersonaJuridicaTelefono2",
									blankText : "Debe ingresar al menos un tel\u00E9fono",
									listeners : {
										change : function() {
											var isEmpty = Ext
													.isEmpty(Efx.utils
															.getValue("kycPersonaJuridicaTelefono1"))
													&& Ext
															.isEmpty(Efx.utils
																	.getValue("kycPersonaJuridicaTelefono2"));
											Efx.utils
													.setRequiredAndValidate(
															"kycPersonaJuridicaTelefono1",
															isEmpty);
											Efx.utils
													.setRequiredAndValidate(
															"kycPersonaJuridicaTelefono2",
															isEmpty);
										}
									},
									maxLength : 250,
									colspan: 6
								},
								/**PEP Relacionado**/
								{
									xtype: "label",
									text: "RELACI\u00D3N CON PERSONAS EXPUESTAS POL\u00CDTICAMENTE",
									cls: "x-form-item label_header",
									colspan: 6,
									width: 730
								},{
									xtype: "label",
									text: "La Empresa tiene relaci\u00F3n con una persona pol\u00edticamente expuesta(PEP):",
									cls: "x-form-item label_spacing",
									width: 715,
									colspan: 6
								},{
									xtype: "combo",
									id: "kycPersonaJuridicaPep",
									name: "kycPersonaJuridica.kycPersonaJuridicaPep",
									store: new Ext.data.SimpleStore({
										data: Efx.combos.yesnoArray() || [],
										fields: ["id", "descripcion"]
									}),
									displayField: "descripcion",
									valueField: "id",
									listeners: {
										change: function(){
											var disable = this.getValue() != "1";
											Efx.utils.setDisabled("kycPersonaJuridicaPepCargo", disable, true);
											Efx.utils.setDisabled("kycPersonaJuridicaPepNombre", disable, true);
											Efx.utils.setDisabled("kycPersonaJuridicaPepFechaInicio", disable, true);
											Efx.utils.setDisabled("kycPersonaJuridicaPepFechaFin", disable, true);
											Efx.utils.setRequiredAndValidate("kycPersonaJuridicaPepCargo", !disable);
											Efx.combos.setRequiredAndValidate("kycPersonaJuridicaPepNombre", !disable);
											Efx.utils.setRequiredAndValidate("kycPersonaJuridicaPepFechaInicio", !disable);
											Efx.utils.setRequiredAndValidate("kycPersonaJuridicaPepFechaFin", !disable);
										}

									},
									allowBlank: false,
									colspan: 6
								},
								{xtype: "label", text: "Nombre", cls: "x-form-item label_spacing"},
								{xtype: "label", text: "Cargo o Relaci\u00F3n", cls: "x-form-item label_spacing"},
								{xtype: "label", text: "Desde", cls: "x-form-item label_spacing", width: 115, colspan: 1},
								{xtype: "label", text: "Hasta", cls: "x-form-item label_spacing", width: 110},
								{
									xtype: "textfield",
									id: "kycPersonaJuridicaPepNombre",
									name: "kycPersonaJuridicaPepNombre",
								},{
									xtype: "textfield",
									id: "kycPersonaJuridicaPepCargo",
									name: "kycPersonaJuridica.kycPersonaJuridicaPepCargo",
									maxLength: 50
								},{
									xtype: "datefield",
									id: "kycPersonaJuridicaPepFechaInicio",
									name: "kycPersonaJuridica.kycPersonaJuridicaPepFechaInicio",
									//format:"Ymd",
									submitFormat: "Ymd",
									altFormats:"Ymd|d/m/Y",
									width: 115,
									maxValue: new Date(),
									colspan: 1
								},{
									xtype: "datefield",
									id: "kycPersonaJuridicaPepFechaFin",
									name: "kycPersonaJuridica.kycPersonaJuridicaPepFechaFin",
									//format:"Ymd",
									submitFormat: "Ymd",
									altFormats:"Ymd|d/m/Y",
									width: 110,
									maxValue: new Date(),
									colspan: 1
								},
								{
									xtype: "label",
									text: "MANEJA FONDOS DE TERCEROS",
									cls: "x-form-item label_header",
									colspan: 6,
									width: 730
								},{
									xtype: "label",
									text: "\u00BFManeja fondos de terceros (socios, inversionistas, otros)?",
									cls: "x-form-item label_spacing",
									width: 715,
									colspan: 6
								},{
									xtype: "label",
									text: "Si maneja fondos de terceros debe aportar copia de la licencia otorgada por la SUGEF, seg\u00FAn el art\u00EDculo 15 de la Ley 8204",
									cls: "x-form-item label_spacing",
									width: 715,
									colspan: 6
								},{
									xtype: "combo",
									id: "kycPersonaJuridicaFondosTerceros",
									name: "kycPersonaJuridica.kycPersonaJuridicaFondosTerceros",
									store: new Ext.data.SimpleStore({
										data: Efx.combos.yesnoArray() || [],
										fields: ["id", "descripcion"]
									}),
									displayField: "descripcion",
									colspan: 6,
									allowBlank: false,
									valueField: "id"
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