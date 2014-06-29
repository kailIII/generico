EfxViewport = function(){
	return {
		clock: function(){
			var task = {
				run: function(){
					Ext.fly("clock").update(Ext.Date.format(new Date(), "d/m/Y h:i:s A"));
				},
				interval: 1000
			};
			Ext.TaskManager.start(task);
		},

		init: function(config){
			Ext.QuickTips.init();
			if(!config) config = {};
			if(!config.items) config.items = [];
			Ext.grid.header.Container.override({
				prepareData: function(data, rowIdx, record, view, panel) {
					var obj = this.callOverridden(arguments);
					var headers = this.gridDataColumns || this.getGridColumns(),
					headersLn = headers.length,
					colIdx = 0,
					header;
					for (; colIdx < headersLn; colIdx++) {
						header = headers[colIdx];
						obj[header.id+'-modified'] = Ext.isDefined(record.modified[header.dataIndex]) ? Ext.baseCSSPrefix + 'grid-dirty-cell' : '';
					}
					return obj;
				}
			});

			Ext.apply(Ext.view.View.EventMap, {
				change: 'Change'
			});
			Ext.override(Ext.view.View, {
				onBeforeItemChange: Ext.emptyFn,
				onItemChange: Ext.emptyFn
			});
			/**=====================================================================================================================================**/
			Ext.util.Format.currencySign = "";
			this.clock();
			new Ext.Viewport({
				layout: {
					type: "vbox",
					align : "stretch",
					pack  : "start"
				},
				id: "efxViewport",
				autoScroll: true,
				items: {
					xtype: "container",
					flex: 1,
					layout: "border",
					minWidth: 1000,
					minHeight: 600,
					items:[
				       {
				    	   contentEl: "header",
				    	   margins: "0 5 0 5",
				    	   region: "north",
				    	   height: 60,
				    	   border:false,
				    	   cls:'header'
				       },{
				    	   margins: "0 5 5 0",
				    	   region: "center",
				    	   frame:false,
				    	   layout: {
				    		   type: "vbox",
				    		   align : "stretch",
				    		   pack  : "start"
				    	   },
				    	   items: config.items
				       },
				       new Ext.tree.Panel({
				    	   title: Efx.constants.APPLICATION_TITLE,
				    	   margins: "0 0 5 5",
				    	   region: "west",
				    	   minWidth: 360,
				    	   maxWidth: 375,
				    	   split: true,
				    	   collapsible: true,
				    	   rootVisible: false,
				    	   autoScroll: true,
				    	   listeners: {
				    		   itemclick: function(tree, record){
				    			   if(record && record.get("leaf") === true && !Ext.isEmpty(record.get("itemUrl")))
				    				   Menu.openSelfWindow(record.get("itemUrl"), record.get("itemUrlParams"));
				    		   }
				    	   },
				    	   store: {
				    		   fields: [
			    		           {name: "text"},
			    		           {name: "leaf"},
			    		           {name: "itemUrl"},
			    		           {name: "itemUrlParams"}
		    		           ],
		    		           root: {
		    		        	   expanded: true,
		    		        	   text:"",
		    		        	   user:"",
		    		        	   status:"",
		    		        	   children: [
    		        	              {
    		        	            	  text:"ADMINISTRACI\u00d3N", expanded: true,
    		        	            	  children: [
        	                	            {
	        	            	            	 text: "SEGURIDAD",
	        	            	            	 expanded: true,
	        	            	            	 children: [
//													{
//														text: "USUARIOS",
//														leaf: true,
//														itemUrl: "seguridad/usuario/view"
//													},
//    	            	            	            {
//    	            	            	            	text: "ASIGNACI\u00D3N DE PERMISOS",
//    	            	            	            	leaf: true,
//    	            	            	            	itemUrl: "seguridad/rol"
//    	            	            	            },
    	            	            	            {
    	                	                    	   text: "SUCURSALES",
    	                	                    	   leaf: true,
    	                	                    	   itemUrl: "sucursal/view"
    	                	                       }
//    	                	                       {
//    	                	                    	   text: "NOTIFICACIONES",
//    	                	                    	   leaf: true,
//    	                	                    	   itemUrl: "notificacion/view"
//    	                	                       }
	            	            	             ]
	        	            	             },
	        	            	             {
	 											text: "MATRICES CALIFICADORES",
												expanded: true,
											    children: [
											        {
											        	text:"MATRIZ GLOBAL",
											        	leaf: true,
											        	itemUrl: "admin/matriz/view"
													},{
											        	text:"MATRIZ CALIFICACI\u00F3N",
											        	leaf: true,
											        	itemUrl: "admin/puntuacion/view",
											        	itemUrlParams: {
											        		ctgCatalogoCodigo: "00299",
											        		tipo: "4",
											        		min: Efx.constants.limiteMinimo,
											        		max: Efx.constants.limiteMaximo,
											        		sum: 1
											        	}
													},{
														   text :"FACTORES DE RIESGO",
														   expanded: true,
														   children : [

														       {
															   text: "TIPO DE PERSONA",
															   leaf: true,
															   itemUrl: "catalogo/view",
															   itemUrlParams: {
																   ctgCatalogoCodigo: "00256",
																   ctgCodigo :"1"
															   }
														   },
														   {
															   text: "PRODUCTOS Y SERVICIOS",
															   leaf: true,
															   itemUrl: "catalogo/view",
															   itemUrlParams: {
																   ctgCatalogoCodigo: "00268",
																   ctgCodigo :"1"
															   }
														   },
														   {
															   text: "ACTIVIDADES",
															   leaf: true,
															   itemUrl: "catalogo/view",
															   itemUrlParams: {
																   ctgCatalogoCodigo: "00269",
																   ctgCodigo :"1"

															   }
														   },
														   {
															   text: "VARIABLES CRITICAS DEL CLIENTE",
															   leaf: true,
															   itemUrl: "catalogo/view",
															   itemUrlParams: {
																   ctgCatalogoCodigo: "00305",
																   ctgCodigo :"1"
															   }
														   },
														   {
															   text :"ESTIMACI\u00d3N DE INGRESOS",
															   expanded: true,
															   children : [
														   {
											        	text:"ESTIMACI\u00F3N DE INGRESOS",
											        	leaf: true,
											        	itemUrl: "catalogo/view",
											        	itemUrlParams: {
											        		ctgCatalogoCodigo: "01262",
											        		ctgCodigo: "1"
											        	}
													},
														   {
															   text: "VOL. MENSUAL ESTIMADO OPER. EN TARJETA DE CR\u00c9DITO",
															   leaf: true,
															    itemUrl: "catalogo/view",
													        	itemUrlParams: {
													        		ctgCatalogoCodigo: "01267",
													        		ctgCodigo: "1"
													        	}
														   },
														   {
															   text: "VOL. MENSUAL ESTIMADO OPER. EN PROD. BANCARIOS(PASIVOS)",
															   leaf: true,
															   itemUrl: "catalogo/view",
													        	itemUrlParams: {
													        		ctgCatalogoCodigo: "01271",
													        		ctgCodigo : "1"
													        	}
														   }

														       ]
														   }
														 ]
													},{
	    	                	                    	   text: "PAIS",
	    	                	                    	   expanded: true,
	    	                	                    	   children: [
	    	                	                       {
	    	                	                    	   text: "NACIONALIDAD",
	    	                	                    	   leaf: true,
	    	                	                    	   itemUrl: "nacionalidad/view",
	    	                	                    	   itemUrlParams: {
	    	                	                    		tipo: "1",
	    	                	                    		ctgCatalogoCodigo: "00302"
	    	                	                    	   }
	    	                	                       }]}

											        ]}
        	            	             ]
		        	                 },{
		        	                	 text: "CAT\u00C1LOGOS",
		        	                	 expanded: true,
		        	                	 children: [
        	                	            {
        	                	            	text: "GENERALES",
	        	                	            expanded: true,
	        	                	            children: [
    	                	                       {
    	                	                    	   text: "DISTRIBUCI\u00D3N TERRITORIAL",
    	                	                    	   leaf: true,
    	                	                    	   itemUrl: "distribucion/view"
    	                	                       },{
    	                	                    	   text: "ESTADO CIVIL",
    	                	                    	   leaf: true,
    	                	                    	   itemUrl: "catalogo/view",
    	                	                    	   itemUrlParams: {
    	                	                    		   ctgCatalogoCodigo: "00012"
    	                	                    	   }
    	                	                       },{
    	                	                    	   text: "G\u00C9NERO",
    	                	                    	   leaf: true,
    	                	                    	   itemUrl: "catalogo/view",
    	                	                    	   itemUrlParams: {
    	                	                    		   ctgCatalogoCodigo: "00009"
    	                	                    	   }
    	                	                       },
    	                	                      {
    	                	                    	   text: "PROFESIONES / OCUPACIONES",
    	                	                    	   leaf: true,
    	                	                    	   itemUrl: "catalogo/view",
    	                	                    	   itemUrlParams: {
    	                	                    		   ctgCatalogoCodigo: "00018"
    	                	                    	   }
    	                	                       },
    	                	                      {
    	                	                    	   text: "TIPO DE CAMBIO",
    	                	                    	   leaf: true,
    	                	                    	   itemUrl: "catalogo/view",
    	                	                    	   itemUrlParams: {
    	                	                    		   ctgCatalogoCodigo: "00477"
    	                	                    	   }
    	                	                       }
	                	                        ]
        	                	            },{
	       		        	                	 text: "CITIBANK",
	    		        	                	 expanded: true,
	    		        	                	 children: [
													/*	{
														text: "FACTORES DE RIESGO",
														leaf: true,
														itemUrl: "porcentajeFactorRiesgo/view",
														},*/
													{
														text:"PERSONA F\u00cdSICA",
															expanded :true,
															children :[
															 {
	    	    	                	                    	   text: "TIPO DE DOCUMENTOS",
	    	    	                	                    	   leaf: true,
	    	    	                	                    	   itemUrl: "catalogo/view",
	    	    	                	                    	   itemUrlParams: {
	    	    	                	                    		   ctgCatalogoCodigo: "00294"
	    	    	                	                    	   }
	    	    	                	                       },
															 {
	    	    	                	                    	   text: "ACTIVIDADES ART. 15",
	    	    	                	                    	   leaf: true,
	    	    	                	                    	   itemUrl: "catalogo/view",
	    	    	                	                    	   itemUrlParams: {
	    	    	                	                    		   ctgCatalogoCodigo: "01075"
	    	    	                	                    	   }
	    	    	                	                       },
	    	    	                	                       {
	    	    	                	                    	   text: "CONDICI\u00d3N DE VIVIENDA",
	    	    	                	                    	   leaf: true,
	    	    	                	                    	   itemUrl: "catalogo/view",
	    	    	                	                    	   itemUrlParams: {
	    	    	                	                    		   ctgCatalogoCodigo: "01429"
	    	    	                	                    	   }
	    	    	                	                       },
	    	    	                	                       {
	    	    	                	                    	   text: "ACTIVIDADES ECON\u00d3MICAS",
	    	    	                	                    	   leaf: true,
	    	    	                	                    	   itemUrl: "catalogo/view",
	    	    	                	                    	   itemUrlParams: {
	    	    	                	                    		   ctgCatalogoCodigo: "00773"
	    	    	                	                    	   }
	    	    	                	                       },
	    	    	                	                       {
	    	    	                	                    	   text: "GRADO ACAD\u00c9MICO",
	    	    	                	                    	   leaf: true,
	    	    	                	                    	   itemUrl: "catalogo/view",
	    	    	                	                    	   itemUrlParams: {
	    	    	                	                    		   ctgCatalogoCodigo: "00502"
	    	    	                	                    	   }
	    	    	                	                       },
	    	      	                	                      {
	    	     	                	                    	   text: "TIPO DE MONEDA",
	    	     	                	                    	   leaf: true,
	    	     	                	                    	   itemUrl: "catalogo/view",
	    	     	                	                    	   itemUrlParams: {
	    	     	                	                    		   ctgCatalogoCodigo: "00573"
	    	     	                	                    	   }
	    	     	                	                       }
																/** HASTA ACA ACTIVIDAD ECONOMICA*/
															         ]
													}
	        	                	             ]
	    		        	                 }
    	                	             ]
		        	                 }
		        	              ]
		    		           }
				    	   }
				       })
			       ]
				}
			});
		}
	};
}();