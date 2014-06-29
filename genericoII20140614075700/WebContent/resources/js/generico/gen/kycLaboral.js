KycLaboral = function(){
	return {
		init: function(config){
			config.items = [];
			config.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			config.items = {
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
				items: [
				       {
						xtype: "grid",
						id: "kycLaboralAsalariadoGrid",
						title: "Asalariado",
						height: 150,
						width: 700,
						maxHeight: 150,
						collapsible: true,
						flex: 1,
						store: new Ext.data.SimpleStore({
					    	data: config.kycLaboralAsalariado || [],
					    	fields: [
					    	     	"kycLaboralAsalariado.kycLaboralId",
									"kycLaboralAsalariado.kycLaboralDireccion",
									"kycLaboralAsalariado.kycLaboralNombre1",
									"kycLaboralAsalariado.kycLaboralTelefono1",
									"kycLaboralAsalariado.kycLaboralTelefono2",
									"kycLaboralAsalariado.kycLaboralTelefono3",
									"kycLaboralAsalariado.kycLaboralTelefono4",
									"kycLaboralAsalariado.kycLaboralNumeroCed1",
									"kycLaboralAsalariado.kycLaboralFechaIngreso",
									"kycLaboralAsalariado.kycLaboralAnios",
									"kycLaboralAsalariado.kycLaboralMeses",
									"kycLaboralAsalariado.kycLaboralEmail1",
									"kycLaboralAsalariado.kycLaboralEmail2",
									"kycLaboralAsalariado.kycLaboralSalAprox",
									"kycLaboralAsalariado.kycLaboralOtro",
									"kycLaboralAsalariado.kycLaboralDetalle",
									"kycLaboralAsalariado.kycLaboralNombres",
									"kycLaboralAsalariado.kycLaboralPrimerApellido",
									"kycLaboralAsalariado.kycLaboralSegundoApellido",
									"kycLaboralAsalariado.kycLaboralFechaNacimiento",
									"kycLaboralAsalariado.kycLaboralApartado",
									"kycLaboralAsalariado.kycLaboralTitular",
									"kycLaboralAsalariado.kycLaboralParentesco",
									"kycLaboralAsalariado.kycLaboralCiudadNacimiento",
									"kycLaboralAsalariado.kycLaboralPantallaBusqueda",
									"kycLaboralAsalariado.kycLaboralMemo",
									"kycLaboralAsalariado.kycFechaActualizacion",
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
									"ctgResultadoInvestigacion.ctgCatalogoId"
							    	        ]
									    }),
									    columns: [
									              {header: "Nombre de Patrono",  dataIndex: "kycLaboralAsalariado.kycLaboralNombre1", flex: 2, minWidth: 200},
											      {header: "Salario Aproximado",  dataIndex: "kycLaboralAsalariado.kycLaboralSalAprox", flex: 1, width: 100}
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Asalariado",
				            	handler: Menu.abrirDatosLaboralesAsalariado
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycLaboralIngresosPropiosGrid",
						title: "Ingresos Propios",
						height: 150,
						width: 700,
						flex: 1,
						maxHeight: 150,
						collapsible: true,
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
								"ctgResultadoInvestigacion.ctgCatalogoId"
								]
								}),
								columns: [
								{header: "Nombre de Patrono",  dataIndex: "kycLaboralIngresosPropios.kycLaboralNombre1", flex: 2, minWidth: 200},
								{header: "Salario Aproximado",  dataIndex: "kycLaboralIngresosPropios.kycLaboralSalAprox", flex:1, width: 100}
								],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Ingresos Propios",
				            	handler: Menu.abrirDatosLaboralesIngresosPropios
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycLaboralPersonasDependientesGrid",
						title: "Personas Dependientes",
						height: 150,
						width: 700,
						flex: 1,
						maxHeight: 150,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycLaboralPersonasDependientes|| [],
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
									"ctgResultadoInvestigacion.ctgCatalogoId"
					    	        ]
							    }),
							    columns: [
							              {text: "Persona que Genera Ingreso",   xtype: "templatecolumn", tpl: "{kycLaboralNombres} " + "{kycLaboralPrimerApellido} " + "{kycLaboralSegundoApellido}", flex: 2, minWidth: 200},
							              {header: "Ingreso Aproximado",  dataIndex: "kycLaboralPersonasDependientes.kycLaboralSalAprox", flex:1, width: 100, renderer: "kycMoney"}
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Personas Dependientes",
				            	handler: Menu.abrirDatosLaboralesPersonasDependientes
	            			}
			            ]
					}
				]
			};
			return config;
		}
	};
}();