KycProductosReferencias = function(){
	return {
		init: function(config){
			config.items = [];
			config.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			config.items = {
				flex: 1,
				title: "CR\u00c9DITO PERSONAL - REFERENCIAS",
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
						id: "kycProductosReferenciaPersonalGrid",
						title: "Referencias Personales",
						height: 100,
						width: 700,
						maxHeight: 150,
						collapsible: true,
						flex: 1,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductosReferenciaPersonal || [],
					    	fields: [
								"kycProductosReferenciaPersonal.kycReferenciaId",
								"kycProductosReferenciaPersonal.kycReferenciaNombre1",
								"kycProductosReferenciaPersonal.kycReferenciaTipo",
								"kycProductosReferenciaPersonal.kycReferenciaTelefono1",
								"kycProductosReferenciaPersonal.kycReferenciaTelefono2",
								"kycProductosReferenciaPersonal.kycReferenciaCuenta",
								"kycProductosReferenciaPersonal.kycReferenciaBancaria",
								"kycProductosReferenciaPersonal.kyc.kycFechaActualizacion",
								"kycProductosReferenciaPersonal.kycReferenciaTelefono3",
								"kycProductosReferenciaPersonal.kycReferenciaParentesco",
								"kycProductosReferenciaPersonal.kycReferenciaLugarTrabajo",
								"kycProductosReferenciaPersonal.kycReferenciaDireccion",
								"kycProductosReferenciaPersonal.kycReferenciaPeriodoRevision",
								"kycProductosReferenciaPersonal.kycReferenciaDebitosPromedio",
								"kycProductosReferenciaPersonal.kycReferenciaSaldoPromedio",
								"kycProductosReferenciaPersonal.kycReferenciaPrincipalesClientes",
								"kycProductosReferenciaPersonal.kycReferenciaContacto",
								"kycProductosReferenciaPersonal.kycReferenciaSaldo",
								"kycProductosReferenciaPersonal.kycReferenciaCreditos",
								"kycProductosReferenciaPersonal.kycReferenciaDocumento",
								"kycProductosReferenciaPersonal.ctgTipoOperacion.ctgCatalogoId",
								"kycProductosReferenciaPersonal.ctgTipoMoneda.ctgCatalogoId",
								"kycProductosReferenciaPersonal.ctgTipoDocumento.ctgCatalogoId",
								"kycProductosReferenciaPersonal.ctgTipoReferencia.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
						{header: "Nombre Completo",  dataIndex: "kycProductosReferenciaPersonal.kycReferenciaNombre1", flex:2, Width: 120},
						{header: "Parentesco",  dataIndex: "kycProductosReferenciaPersonal.kycReferenciaParentesco", flex:1, width:80},
						{header: "Direcci\u00f3n Exacta",  dataIndex: "kycProductosReferenciaPersonal.kycReferenciaDireccion", flex:2,width: 110},
						{header: "Tel\u00e9fono",  dataIndex: "kycProductosReferenciaPersonal.kycReferenciaTelefono1", flex:1,width: 110}
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle de referencias personales",
				            	handler: EfxMenu.abrirProductosReferenciaPersonal
	            			}
			            ]
					},
					{
						xtype: "grid",
						id: "kycReferenciaComercialGrid",
						title: "Referencias de Cr\u00e9dito",
						height: 100,
						width: 700,
						maxHeight: 150,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycProductosReferenciaComercial || [],
					    	fields: [
									"kycProductosReferenciaComercial.kycReferenciaId",
									"kycProductosReferenciaComercial.kycReferenciaNombre1",
									"kycProductosReferenciaComercial.kycReferenciaTipo",
									"kycProductosReferenciaComercial.kycReferenciaTelefono1",
									"kycProductosReferenciaComercial.kycReferenciaTelefono2",
									"kycProductosReferenciaComercial.kycReferenciaCuenta",
									"kycProductosReferenciaComercial.kycReferenciaBancaria",
									"kycProductosReferenciaComercial.kyc.kycFechaActualizacion",
									"kycProductosReferenciaComercial.kycReferenciaTelefono3",
									"kycProductosReferenciaComercial.kycReferenciaParentesco",
									"kycProductosReferenciaComercial.kycReferenciaLugarTrabajo",
									"kycProductosReferenciaComercial.kycReferenciaDireccion",
									"kycProductosReferenciaComercial.kycReferenciaPeriodoRevision",
									"kycProductosReferenciaComercial.kycReferenciaDebitosPromedio",
									"kycProductosReferenciaComercial.kycReferenciaSaldoPromedio",
									"kycProductosReferenciaComercial.kycReferenciaPrincipalesClientes",
									"kycProductosReferenciaComercial.kycReferenciaContacto",
									"kycProductosReferenciaComercial.kycReferenciaSaldo",
									"kycProductosReferenciaComercial.kycReferenciaCreditos",
									"kycProductosReferenciaComercial.kycReferenciaDocumento",
									"kycProductosReferenciaComercial.ctgTipoOperacion.ctgCatalogoId",
									"kycProductosReferenciaComercial.ctgTipoMoneda.ctgCatalogoId",
									"kycProductosReferenciaComercial.ctgTipoDocumento.ctgCatalogoId",
									"kycProductosReferenciaComercial.ctgTipoReferencia.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
						{header: "Tipo de Referencia ",  dataIndex: "kycProductosReferenciaComercial.kycReferenciaTipo",flex:2, width: 120},
						{header: "Banco ",  dataIndex: "kycProductosReferenciaComercial.kycReferenciaBancaria", flex: 2, width: 120},
						{header: "N\u00famero de Cuenta",  dataIndex: "kycProductosReferenciaComercial.kycReferenciaCuenta",flex:1, width: 120},
						{header: "Saldo",  dataIndex: "kycProductosReferenciaComercial.kycReferenciaSaldo",flex: 1, width: 120}
					        ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle de referencias comerciales",
				            	handler: EfxMenu.abrirProductosReferenciaComercial
	            			}
			            ]
					}
				]
			};
			return config;
		}
	};
}();