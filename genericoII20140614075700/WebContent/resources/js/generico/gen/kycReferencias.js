KycReferencias = function(){
	return {
		init: function(config){
			config.items = [];
			config.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			config.items = {
				flex: 1,
				title: "REFERENCIAS",
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
						id: "kycReferenciasPersonalesGrid",
						title: "Referencias personales",
						minHeight: 100,
						maxHeight:200,
						collapsible: true,
						flex: 1,
						store: new Ext.data.SimpleStore({
					    	data: config.kycReferenciaPersonal || [],
					    	fields: [
					    	         "kycReferenciaPersonal.kycReferenciaId",
					    	         "kycReferenciaPersonal.kycReferenciaNombre1",
					    	         "kycReferenciaPersonal.kycReferenciaTipo",
					    	         "kycReferenciaPersonal.kycReferenciaTelefono1",
					    	         "kycReferenciaPersonal.kycReferenciaTelefono2",
					    	         "kycReferenciaPersonal.kycFechaActualizacion"
			    	        ]
					    }),
					    columns: [
					        {header: "Nombre",  dataIndex: "kycReferenciaPersonal.kycReferenciaNombre1", flex: 1, minWidth: 200},
					        {header: "Tel\u00E9fono",  dataIndex: "kycReferenciaPersonal.kycReferenciaTelefono1", width: 80},

					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle de referencias personales",
				            	handler: EfxMenu.abrirReferenciaPersonal
	            			}
			            ]
					},{
						xtype: "grid",
						id: "kycReferenciasBancariasGrid",
						title: "Referencias bancarias",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycReferenciaBancaria || [],
					    	fields: [
					    	         "kycReferenciaBancaria.kycReferenciaId",
					    	         "kycReferenciaBancaria.kycReferenciaNombre1",
					    	         "kycReferenciaBancaria.kycReferenciaTipo",
					    	         "kycReferenciaBancaria.kycReferenciaTelefono1",
					    	         "kycReferenciaBancaria.kycReferenciaTelefono2",
					    	         "kycReferenciaBancaria.kycFechaActualizacion"
			    	        ]
					    }),
					    columns: [
					        {header: "Nombre",  dataIndex: "kycReferenciaBancaria.kycReferenciaNombre1", flex: 1, minWidth: 200},
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle de referencias bancarias",
				            	handler: EfxMenu.abrirReferenciaBancaria
	            			}
			            ],listeners: {
			            	render: function(){
			            		if(config.tipoPersonaCodigo!=00294){
			            			this.hide();
			            		}
			            	}
			            }
					},{
						xtype: "grid",
						id: "kycReferenciasComercialesGrid",
						title: "Referencias comerciales",
						minHeight: 100,
						flex: 1,
						collapsible: true,
						store: new Ext.data.SimpleStore({
							data: config.kycReferenciaComercial || [],
					    	fields: [
					    	         "kycReferenciaComercial.kycReferenciaId",
					    	         "kycReferenciaComercial.kycReferenciaNombre1",
					    	         "kycReferenciaComercial.kycReferenciaTipo",
					    	         "kycReferenciaComercial.kycReferenciaTelefono1",
					    	         "kycReferenciaComercial.kycReferenciaTelefono2",
					    	         "kycReferenciaComercial.kycFechaActualizacion"
			    	        ]
					    }),
					    columns: [
					        {header: "Nombre",  dataIndex: "kycReferenciaComercial.kycReferenciaNombre1", flex: 1, minWidth: 200},
					    ],
					    tools: [
				            {
				            	type: "expand",
				            	qtip: "Detalle de referencias comerciales",
				            	handler: EfxMenu.abrirReferenciaComercial
	            			}
			            ],listeners: {
			            	render: function(){
			            		if(config.tipoPersonaCodigo!=00294){
			            			this.hide();
			            		}
			            	}
			            }
					}
				]
			};
			return config;
		}
	};
}();