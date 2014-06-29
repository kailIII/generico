KycCredito = function(){
	return {
		init: function(config){
			config.items = [];
			config.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			config.items = {
				flex: 1,
				title: "CREDITOS",
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
						id: "kycCreditoPersonalGrid",
						title: "Asalariado",
						minHeight: 100,
						collapsible: true,
						flex: 1,
						store: new Ext.data.SimpleStore({
					    	data: config.kycCreditoPersonal|| [],
					    	fields: [
								"kycCreditoPersonal.kycCreditoId",
								"kycCreditoPersonal.kycCreditoFechaSolicitud",
								"kycCreditoPersonal.kycCreditoMontoSolicitado",
								"kycCreditoPersonal.kycCreditoPlazo",
								"kycCreditoPersonal.kycCreditoOtro",
								"kycCreditoPersonal.kycCreditoMarca",
								"kycCreditoPersonal.kycCreditoEstilo",
								"kycCreditoPersonal.kycCreditoAnio",
								"kycCreditoPersonal.kycCreditoPlaca",
								"kycCreditoPersonal.kycCreditoValorGarantia",
								"kycCreditoPersonal.kycCreditoPropietarioActual",
								"kycCreditoPersonal.kycCreditoCedulaPropietario",
								"kycCreditoPersonal.kycCreditoNombreInscrito",
								"kycCreditoPersonal.kycCreditoCedulaInscrito",
								"kycCreditoPersonal.kycCreditoDireccion",
								"kycCreditoPersonal.kycCreditoHipoteca",
								"kycCreditoPersonal.kycCreditoEntidadAcredora",
								"kycCreditoPersonal.kycCreditoFolioRegistro",
								"kycCreditoPersonal.kycFechaActualizacion",
								"ctgTipoMoneda.ctgCatalogoId",
								"ctgProvincia.ctgProvinciaId",
								"ctgCanton.ctgCantonId",
								"ctgDistrito.ctgDistritoId",
								"ctgServicio.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycCreditoPersonal.kycCreditoFechaSolicitud", flex: 2, minWidth: 200},
							      {header: "Monto solicitado",  dataIndex: "kycCreditoPersonal.kycCreditoMontoSolicitado",flex: 1, width: 100},
							      {header: "Plazo",  dataIndex: "kycCreditoPersonal.kycCreditoPlazo",flex: 1.5, width: 100},

					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Credito personal",
				            	handler: Menu.abrirCreditoPersonal
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycCreditoPrendarioGrid",
						title: "Ingresos propios",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycCreditoPrendario || [],
					    	fields: [
							"kycCreditoPrendario.kycCreditoId",
							"kycCreditoPrendario.kycCreditoFechaSolicitud",
							"kycCreditoPrendario.kycCreditoMontoSolicitado",
							"kycCreditoPrendario.kycCreditoPlazo",
							"kycCreditoPrendario.kycCreditoOtro",
							"kycCreditoPrendario.kycCreditoMarca",
							"kycCreditoPrendario.kycCreditoEstilo",
							"kycCreditoPrendario.kycCreditoAnio",
							"kycCreditoPrendario.kycCreditoPlaca",
							"kycCreditoPrendario.kycCreditoValorGarantia",
							"kycCreditoPrendario.kycCreditoPropietarioActual",
							"kycCreditoPrendario.kycCreditoCedulaPropietario",
							"kycCreditoPrendario.kycCreditoNombreInscrito",
							"kycCreditoPrendario.kycCreditoCedulaInscrito",
							"kycCreditoPrendario.kycCreditoDireccion",
							"kycCreditoPrendario.kycCreditoHipoteca",
							"kycCreditoPrendario.kycCreditoEntidadAcredora",
							"kycCreditoPrendario.kycCreditoFolioRegistro",
							"kycCreditoPrendario.kycFechaActualizacion",
							"ctgTipoMoneda.ctgCatalogoId",
							"ctgProvincia.ctgProvinciaId",
							"ctgCanton.ctgCantonId",
							"ctgDistrito.ctgDistritoId",
							"ctgServicio.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycCreditoPrendario.kycCreditoFechaSolicitud", flex: 2, minWidth: 200},
							      {header: "Monto solicitado",  dataIndex: "kycCreditoPrendario.kycCreditoMontoSolicitado",flex: 1, width: 100},
							      {header: "Plazo",  dataIndex: "kycCreditoPrendario.kycCreditoPlazo",flex: 1.5, width: 100},
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Credito prendario",
				            	handler: Menu.abrirCreditoPrendario
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycCreditoHipotecarioGrid",
						title: "Personas dependientes",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycCreditoHipotecario|| [],
					    	fields: [
							"kycCreditoHipotecario.kycCreditoId",
							"kycCreditoHipotecario.kycCreditoFechaSolicitud",
							"kycCreditoHipotecario.kycCreditoMontoSolicitado",
							"kycCreditoHipotecario.kycCreditoPlazo",
							"kycCreditoHipotecario.kycCreditoOtro",
							"kycCreditoHipotecario.kycCreditoMarca",
							"kycCreditoHipotecario.kycCreditoEstilo",
							"kycCreditoHipotecario.kycCreditoAnio",
							"kycCreditoHipotecario.kycCreditoPlaca",
							"kycCreditoHipotecario.kycCreditoValorGarantia",
							"kycCreditoHipotecario.kycCreditoPropietarioActual",
							"kycCreditoHipotecario.kycCreditoCedulaPropietario",
							"kycCreditoHipotecario.kycCreditoNombreInscrito",
							"kycCreditoHipotecario.kycCreditoCedulaInscrito",
							"kycCreditoHipotecario.kycCreditoDireccion",
							"kycCreditoHipotecario.kycCreditoHipoteca",
							"kycCreditoHipotecario.kycCreditoEntidadAcredora",
							"kycCreditoHipotecario.kycCreditoFolioRegistro",
							"kycCreditoHipotecario.kycFechaActualizacion",
							"ctgTipoMoneda.ctgCatalogoId",
							"ctgProvincia.ctgProvinciaId",
							"ctgCanton.ctgCantonId",
							"ctgDistrito.ctgDistritoId",
							"ctgServicio.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycCreditoHipotecario.kycCreditoFechaSolicitud", flex: 2, minWidth: 200},
							      {header: "Monto solicitado",  dataIndex: "kycCreditoHipotecario.kycCreditoMontoSolicitado",flex: 1, width: 100},
							      {header: "Plazo",  dataIndex: "kycCreditoHipotecario.kycCreditoPlazo",flex: 1.5, width: 100},
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Credito hipotecario",
				            	handler: Menu.abrirDatosCreditoHipotecario
	            			}
			            ]
					}
				]
			};
			return config;
		}
	};
}();