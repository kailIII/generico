KycPaquetes = function(){
	return {
		init: function(config){
			config.items = [];
			config.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			config.items = {
				flex: 1,
				title: "PAQUETES",
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
						id: "kycPaqueteCuentaCorrienteGrid",
						title: "Cuenta Corriente",
						minHeight: 100,
						collapsible: true,
						flex: 1,
						store: new Ext.data.SimpleStore({
					    	data: config.kycPaqueteCuentaCorriente|| [],
					    	fields: [
					    	     	"kycPaqueteCuentaCorriente.kycPaqueteId",
									"kycPaqueteCuentaCorriente.kycPaqueteViajeroFrecuente",
									"kycPaqueteCuentaCorriente.kycPaqueteNumeroViajeroFrecuente",
									"kycPaqueteCuentaCorriente.kycPaqueteNombreTarjeta",
									"kycPaqueteCuentaCorriente.kycPaqueteNumeroCuenta",
									"kycPaqueteCuentaCorriente.kycPaqueteMontoColones",
									"kycPaqueteCuentaCorriente.kycPaqueteMontoDolares",
									"kycPaqueteCuentaCorriente.kycPaqueteFechaVencimiento",
									"kycPaqueteCuentaCorriente.kycPaqueteRenovacionAutomatica",
									"kycPaqueteCuentaCorriente.kycPaqueteTarjetaDebito",
									"kycPaqueteCuentaCorriente.kycPaqueteFecha1",
									"kycPaqueteCuentaCorriente.kycPaqueteFecha2",
									"kycPaqueteCuentaCorriente.kycPaqueteCantidadTalonarios",
									"kycPaqueteCuentaCorriente.kycFechaActualizacion",
									"kycPaqueteCuentaCorriente.ctgOficinaEntrega.ctgSucursalId",
									"kycPaqueteCuentaCorriente.ctgPrefijo.ctgCatalogoId",
									"kycPaqueteCuentaCorriente.ctgMoneda.ctgCatalogoId",
									"kycPaqueteCuentaCorriente.ctgPaquete.ctgCatalogoId",
									"kycPaqueteCuentaCorriente.ctgTipoTarjeta.ctgCatalogoId",
									"kycPaqueteCuentaCorriente.ctgTipoChequera.ctgCatalogoId",
									"kycPaqueteCuentaCorriente.ctgTipoCuenta.ctgCatalogoId",
									"kycPaqueteCuentaCorriente.ctgFrecuenciaCargo.ctgCatalogoId",
									"kycPaqueteCuentaCorriente.ctgPlazoCuenta.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycPaqueteCuentaCorriente.kycPaqueteNumeroCuenta", flex: 2, minWidth: 200},
//							      {header: "Monto solicitado",  dataIndex: "kycCreditoPersonal.kycCreditoMontoSolicitado",flex: 1, width: 100},
//							      {header: "Plazo",  dataIndex: "kycCreditoPersonal.kycCreditoPlazo",flex: 1.5, width: 100},

					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Cuenta corriente",
				            	handler: Menu.abrirPaqueteCuentaCorriente
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycPaqueteCuentaAhorroGrid",
						title: "Cuenta Ahorro",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycPaqueteCuentaAhorro || [],
					    	fields: [
					    	        	"kycPaqueteCuentaAhorro.kycPaqueteId",
										"kycPaqueteCuentaAhorro.kycPaqueteViajeroFrecuente",
										"kycPaqueteCuentaAhorro.kycPaqueteNumeroViajeroFrecuente",
										"kycPaqueteCuentaAhorro.kycPaqueteNombreTarjeta",
										"kycPaqueteCuentaAhorro.kycPaqueteNumeroCuenta",
										"kycPaqueteCuentaAhorro.kycPaqueteMontoColones",
										"kycPaqueteCuentaAhorro.kycPaqueteMontoDolares",
										"kycPaqueteCuentaAhorro.kycPaqueteFechaVencimiento",
										"kycPaqueteCuentaAhorro.kycPaqueteRenovacionAutomatica",
										"kycPaqueteCuentaAhorro.kycPaqueteTarjetaDebito",
										"kycPaqueteCuentaAhorro.kycPaqueteFecha1",
										"kycPaqueteCuentaAhorro.kycPaqueteFecha2",
										"kycPaqueteCuentaAhorro.kycPaqueteCantidadTalonarios",
										"kycPaqueteCuentaAhorro.kycFechaActualizacion",
										"kycPaqueteCuentaAhorro.ctgOficinaEntrega.ctgSucursalId",
										"kycPaqueteCuentaAhorro.ctgPrefijo.ctgCatalogoId",
										"kycPaqueteCuentaAhorro.ctgMoneda.ctgCatalogoId",
										"kycPaqueteCuentaAhorro.ctgPaquete.ctgCatalogoId",
										"kycPaqueteCuentaAhorro.ctgTipoTarjeta.ctgCatalogoId",
										"kycPaqueteCuentaAhorro.ctgTipoChequera.ctgCatalogoId",
										"kycPaqueteCuentaAhorro.ctgTipoCuenta.ctgCatalogoId",
										"kycPaqueteCuentaAhorro.ctgFrecuenciaCargo.ctgCatalogoId",
										"kycPaqueteCuentaAhorro.ctgPlazoCuenta.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycPaqueteCuentaAhorro.kycPaqueteNumeroViajeroFrecuente", flex: 2, minWidth: 200},
//							      {header: "Monto solicitado",  dataIndex: "kycCreditoPrendario.kycCreditoMontoSolicitado",flex: 1, width: 100},
//							      {header: "Plazo",  dataIndex: "kycCreditoPrendario.kycCreditoPlazo",flex: 1.5, width: 100},
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Cuenta Ahorro",
				            	handler: Menu.abrirPaqueteCuentaAhorro
	            			}
			            ]
					}
				]
			};
			return config;
		}
	};
}();