KycProductosAdicionales = function(){
	return {
		init: function(config){
			config.items = [];
			config.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			config.items = {
				flex: 1,
				title: "ProductosAdicionales",
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
						id: "kycProductoAdicionalCuentaCorrienteGrid",
						title: "Cuenta Corriente",
						minHeight: 100,
						collapsible: true,
						flex: 1,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoAdicionalCuentaCorriente|| [],
					    	fields: [
							"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalId",
							"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombre",
							"kycProductoAdicionalCuentaCorriente.kycProductoadicionalCedula",
							"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalViajeroFrecuente",
							"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNumeroViajeroFrecuente",
							"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombreTarjeta",
							"kycProductoAdicionalCuentaCorriente.kycFechaActualizacion",
							"ctgTipoTarjeta.ctgCatalogoId",
							"ctgOficinaEntrega.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					      		{header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
								{header: "Numero de identificacion",  dataIndex: "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalCedula",flex: 1, width: 100}

					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Cuenta corriente",
				            	handler: Menu.abrirProductoAdicionalCuentaCorriente
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycProductoAdicionalCuentaAhorroGrid",
						title: "Cuenta Ahorro",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycProductoAdicionalCuentaAhorro || [],
					    	fields: [
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalId",
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombre",
								"kycProductoAdicionalCuentaAhorro.kycProductoadicionalCedula",
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalViajeroFrecuente",
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNumeroViajeroFrecuente",
								"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombreTarjeta",
								"kycProductoAdicionalCuentaAhorro.kycFechaActualizacion",
								"ctgTipoTarjeta.ctgCatalogoId",
								"ctgOficinaEntrega.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
							      {header: "Numero de identificacion",  dataIndex: "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalCedula",flex: 1, width: 100}
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Cuenta Ahorro",
				            	handler: Menu.abrirProductoAdicionalCuentaAhorro
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycProductoAdicionalSuperDepositoGrid",
						title: "Super Deposito Ahorro",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycProductoAdicionalSuperDeposito|| [],
					    	fields: [
					"kycProductoAdicionalSuperDeposito.kycProductoAdicionalId",
					"kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombre",
					"kycProductoAdicionalSuperDeposito.kycProductoadicionalCedula",
					"kycProductoAdicionalSuperDeposito.kycProductoAdicionalViajeroFrecuente",
					"kycProductoAdicionalSuperDeposito.kycProductoAdicionalNumeroViajeroFrecuente",
					"kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombreTarjeta",
					"kycProductoAdicionalSuperDeposito.kycFechaActualizacion",
					"ctgTipoTarjeta.ctgCatalogoId",
					"ctgOficinaEntrega.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
				{header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
				{header: "Numero de identificacion",  dataIndex: "kycProductoAdicionalSuperDeposito.kycProductoAdicionalCedula",flex: 1, width: 100}
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle: Super Deposito Ahorro",
				            	handler: Menu.abrirProductoAdicionalSuperDeposito
	            			}
			            ]
					}
				]
			};
			return config;
		}
	};
}();