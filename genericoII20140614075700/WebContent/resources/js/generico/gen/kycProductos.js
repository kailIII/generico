KycProductos = function(){
	return {
		init: function(config){
			config.items = [];
			config.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			config.items = {
				flex: 1,
				title: "PRODUCTOS",
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
						id: "kycProductoCuentaCorrienteGrid",
						title: "Cuenta Corriente",
						minHeight: 100,
						collapsible: true,
						flex: 1,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoCuentaCorriente|| [],
					    	fields: [
					    	     	"kycProductoCuentaCorriente.kycProductoId",
									"kycProductoCuentaCorriente.kycProductoViajeroFrecuente",
									"kycProductoCuentaCorriente.kycProductoNumeroViajeroFrecuente",
									"kycProductoCuentaCorriente.kycProductoNombreTarjeta",
									"kycProductoCuentaCorriente.kycProductoNumeroCuenta",
									"kycProductoCuentaCorriente.kycProductoMontoColones",
									"kycProductoCuentaCorriente.kycProductoMontoDolares",
									"kycProductoCuentaCorriente.kycProductoFechaVencimiento",
									"kycProductoCuentaCorriente.kycProductoRenovacionAutomatica",
									"kycProductoCuentaCorriente.kycProductoTarjetaDebito",
									"kycProductoCuentaCorriente.kycProductoFecha1",
									"kycProductoCuentaCorriente.kycProductoFecha2",
									"kycProductoCuentaCorriente.kycProductoCantidadTalonarios",
									"kycProductoCuentaCorriente.kycFechaActualizacion",
									"kycProductoCuentaCorriente.ctgOficinaEntrega.ctgSucursalId",
									"kycProductoCuentaCorriente.ctgPrefijo.ctgCatalogoId",
									"kycProductoCuentaCorriente.ctgMoneda.ctgCatalogoId",
									"kycProductoCuentaCorriente.ctgProducto.ctgCatalogoId",
									"kycProductoCuentaCorriente.ctgTipoTarjeta.ctgCatalogoId",
									"kycProductoCuentaCorriente.ctgTipoChequera.ctgCatalogoId",
									"kycProductoCuentaCorriente.ctgTipoCuenta.ctgCatalogoId",
									"kycProductoCuentaCorriente.ctgFrecuenciaCargo.ctgCatalogoId",
									"kycProductoCuentaCorriente.ctgPlazoCuenta.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycProductoCuentaCorriente.kycProductoNumeroCuenta", flex: 2, minWidth: 200},
//							      {header: "Monto solicitado",  dataIndex: "kycCreditoPersonal.kycCreditoMontoSolicitado",flex: 1, width: 100},
//							      {header: "Plazo",  dataIndex: "kycCreditoPersonal.kycCreditoPlazo",flex: 1.5, width: 100},

					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Cuenta corriente",
				            	handler: Menu.abrirProductoCuentaCorriente
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycProductoCuentaAhorroGrid",
						title: "Cuenta Ahorro",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycProductoCuentaAhorro || [],
					    	fields: [
					    	        	"kycProductoCuentaAhorro.kycProductoId",
										"kycProductoCuentaAhorro.kycProductoViajeroFrecuente",
										"kycProductoCuentaAhorro.kycProductoNumeroViajeroFrecuente",
										"kycProductoCuentaAhorro.kycProductoNombreTarjeta",
										"kycProductoCuentaAhorro.kycProductoNumeroCuenta",
										"kycProductoCuentaAhorro.kycProductoMontoColones",
										"kycProductoCuentaAhorro.kycProductoMontoDolares",
										"kycProductoCuentaAhorro.kycProductoFechaVencimiento",
										"kycProductoCuentaAhorro.kycProductoRenovacionAutomatica",
										"kycProductoCuentaAhorro.kycProductoTarjetaDebito",
										"kycProductoCuentaAhorro.kycProductoFecha1",
										"kycProductoCuentaAhorro.kycProductoFecha2",
										"kycProductoCuentaAhorro.kycProductoCantidadTalonarios",
										"kycProductoCuentaAhorro.kycFechaActualizacion",
										"kycProductoCuentaAhorro.ctgOficinaEntrega.ctgSucursalId",
										"kycProductoCuentaAhorro.ctgPrefijo.ctgCatalogoId",
										"kycProductoCuentaAhorro.ctgMoneda.ctgCatalogoId",
										"kycProductoCuentaAhorro.ctgProducto.ctgCatalogoId",
										"kycProductoCuentaAhorro.ctgTipoTarjeta.ctgCatalogoId",
										"kycProductoCuentaAhorro.ctgTipoChequera.ctgCatalogoId",
										"kycProductoCuentaAhorro.ctgTipoCuenta.ctgCatalogoId",
										"kycProductoCuentaAhorro.ctgFrecuenciaCargo.ctgCatalogoId",
										"kycProductoCuentaAhorro.ctgPlazoCuenta.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycProductoCuentaAhorro.kycProductoNumeroViajeroFrecuente", flex: 2, minWidth: 200},
//							      {header: "Monto solicitado",  dataIndex: "kycCreditoPrendario.kycCreditoMontoSolicitado",flex: 1, width: 100},
//							      {header: "Plazo",  dataIndex: "kycCreditoPrendario.kycCreditoPlazo",flex: 1.5, width: 100},
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Cuenta Ahorro",
				            	handler: Menu.abrirProductoCuentaAhorro
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycProductoCuentaFuturoGrid",
						title: "Cuenta Futuro",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycProductoCuentaFuturo|| [],
					    	fields: [
								"kycProductoCuentaFuturo.kycProductoId",
								"kycProductoCuentaFuturo.kycProductoViajeroFrecuente",
								"kycProductoCuentaFuturo.kycProductoNumeroViajeroFrecuente",
								"kycProductoCuentaFuturo.kycProductoNombreTarjeta",
								"kycProductoCuentaFuturo.kycProductoNumeroCuenta",
								"kycProductoCuentaFuturo.kycProductoMontoColones",
								"kycProductoCuentaFuturo.kycProductoMontoDolares",
								"kycProductoCuentaFuturo.kycProductoFechaVencimiento",
								"kycProductoCuentaFuturo.kycProductoRenovacionAutomatica",
								"kycProductoCuentaFuturo.kycProductoTarjetaDebito",
								"kycProductoCuentaFuturo.kycProductoFecha1",
								"kycProductoCuentaFuturo.kycProductoFecha2",
								"kycProductoCuentaFuturo.kycProductoCantidadTalonarios",
								"kycProductoCuentaFuturo.kycFechaActualizacion",
								"kycProductoCuentaFuturo.ctgOficinaEntrega.ctgSucursalId",
								"kycProductoCuentaFuturo.ctgPrefijo.ctgCatalogoId",
								"kycProductoCuentaFuturo.ctgMoneda.ctgCatalogoId",
								"kycProductoCuentaFuturo.ctgProducto.ctgCatalogoId",
								"kycProductoCuentaFuturo.ctgTipoTarjeta.ctgCatalogoId",
								"kycProductoCuentaFuturo.ctgTipoChequera.ctgCatalogoId",
								"kycProductoCuentaFuturo.ctgTipoCuenta.ctgCatalogoId",
								"kycProductoCuentaFuturo.ctgFrecuenciaCargo.ctgCatalogoId",
								"kycProductoCuentaFuturo.ctgPlazoCuenta.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycProductoCuentaFuturo.kycProductoNumeroViajeroFrecuente", flex: 2, minWidth: 200},
//							      {header: "Monto solicitado",  dataIndex: "kycCreditoHipotecario.kycCreditoMontoSolicitado",flex: 1, width: 100},
//							      {header: "Plazo",  dataIndex: "kycCreditoHipotecario.kycCreditoPlazo",flex: 1.5, width: 100},
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Cuenta Futuro",
				            	handler: Menu.abrirProductoCuentaFuturo
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycProductoSuperDepositoGrid",
						title: "Super Deposito Ahorro",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycProductoSuperDeposito|| [],
					    	fields: [
								"kycProductoSuperDeposito.kycProductoId",
								"kycProductoSuperDeposito.kycProductoViajeroFrecuente",
								"kycProductoSuperDeposito.kycProductoNumeroViajeroFrecuente",
								"kycProductoSuperDeposito.kycProductoNombreTarjeta",
								"kycProductoSuperDeposito.kycProductoNumeroCuenta",
								"kycProductoSuperDeposito.kycProductoMontoColones",
								"kycProductoSuperDeposito.kycProductoMontoDolares",
								"kycProductoSuperDeposito.kycProductoFechaVencimiento",
								"kycProductoSuperDeposito.kycProductoRenovacionAutomatica",
								"kycProductoSuperDeposito.kycProductoTarjetaDebito",
								"kycProductoSuperDeposito.kycProductoFecha1",
								"kycProductoSuperDeposito.kycProductoFecha2",
								"kycProductoSuperDeposito.kycProductoCantidadTalonarios",
								"kycProductoSuperDeposito.kycFechaActualizacion",
								"kycProductoSuperDeposito.ctgOficinaEntrega.ctgSucursalId",
								"kycProductoSuperDeposito.ctgPrefijo.ctgCatalogoId",
								"kycProductoSuperDeposito.ctgMoneda.ctgCatalogoId",
								"kycProductoSuperDeposito.ctgProducto.ctgCatalogoId",
								"kycProductoSuperDeposito.ctgTipoTarjeta.ctgCatalogoId",
								"kycProductoSuperDeposito.ctgTipoChequera.ctgCatalogoId",
								"kycProductoSuperDeposito.ctgTipoCuenta.ctgCatalogoId",
								"kycProductoSuperDeposito.ctgFrecuenciaCargo.ctgCatalogoId",
								"kycProductoSuperDeposito.ctgPlazoCuenta.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycProductoSuperDeposito.kycProductoNumeroViajeroFrecuente", flex: 2, minWidth: 200},
//							      {header: "Monto solicitado",  dataIndex: "kycCreditoHipotecario.kycCreditoMontoSolicitado",flex: 1, width: 100},
//							      {header: "Plazo",  dataIndex: "kycCreditoHipotecario.kycCreditoPlazo",flex: 1.5, width: 100},
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Super Deposito Ahorro",
				            	handler: Menu.abrirProductoSuperDeposito
	            			}
			            ]
					}
				]
			};
			return config;
		}
	};
}();