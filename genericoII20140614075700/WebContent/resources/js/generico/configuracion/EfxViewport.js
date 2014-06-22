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
			var ROLE_ADMINISTRADOR = Efx.utils.ifRolGranted("ROLE_ADMINISTRADOR");
			var ROLE_ADMINISTRADOR_EMPLEADOS = Efx.utils.ifRolGranted("ROLE_ADMINISTRADOR_EMPLEADOS");
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
										EfxMenu.openSelfWindow(record.get("itemUrl"), record.get("itemUrlParams"));
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
									children: function(){
										var childs = [];
										childs.push({
											text:"CONFIGURACI\u00d3N DE REGISTRO", expanded: true,
											children: [
												{
													text: "GENERALES",
													expanded: true,
													children: [
														{
															text: "REGISTRO DE CLIENTES",
															leaf: true,
															itemUrl: "cfgRegistro/view"
														},{
															text: "TIPOS DE PROGRAMA",
															leaf: true,
															itemUrl: "cfgPrograma/view"
														},{
															text: "TIPOS DE PLATAFORMA",
															leaf: true,
															itemUrl: "cfgPlataforma/view"
														},{
															text: "TIPOS DE CONSULTA",
															leaf: true,
															itemUrl: "cfgConsulta/view"
														},{
															text: "TIPOS DE AMBIENTE",
															leaf: true,
															itemUrl: "cfgAmbiente/view"
														}
													]
												}
//												,{
//													text: "SEGURIDAD",
//													expanded: true,
//													children: function(){
//														var childs = [];
//														if(ROLE_ADMINISTRADOR){
//															childs.push({
//																text: "ASIGNACI\u00D3N DE PERMISOS",
//																leaf: true,
//																itemUrl: "seguridad/rol"
//															});
//														}
//														childs.push({
//															text: "USUARIOS",
//															leaf: true,
//															itemUrl: "seguridad/usuario/view"
//														},
//														{
//															text: "DATOS WEBSERVICE",
//															leaf: true,
//															itemUrl: "seguridad/AutenticacionWebService/view"
//														});
//														return childs;
//													}()
//												}
											]
										});
//										if(ROLE_ADMINISTRADOR){
//											childs.push({
//												text: "CAT\u00C1LOGOS",
//												expanded: true,
//												children: [
//													{
//														text: "GENERALES",
//														expanded: true,
//														children: [
//															{
//																text: "PERSONA F\u00CDSICA",
//																leaf: false,
//																expanded: true,
//																children: [
//																	{
//																		text: "ACTIVIDAD ECON\u00D3MICA",
//																		leaf: true,
//																		itemUrl: "catalogo/view",
//																		itemUrlParams: {
//																			ctgCatalogoCodigo: "00255"
//																		}
//																	}
//																]
//															},{
//																text: "PERSONA JUR\u00CDDICA",
//																leaf: false,
//																expanded: true,
//																children: [
//														           	{
//																		text: "ACTIVIDAD ECON\u00D3MICA",
//																		leaf: true,
//																		itemUrl: "catalogo/view",
//																		itemUrlParams: {
//																			ctgCatalogoCodigo: "00264"
//																		}
//																	},{
//																		text: "TIPO ENTIDAD",
//																		leaf: true,
//																		itemUrl: "catalogo/view",
//																		itemUrlParams: {
//																			ctgCatalogoCodigo: "00259"
//																		}
//																	}
//																]
//															},{
//																text: "DISTRIBUCI\u00D3N TERRITORIAL",
//																leaf: true,
//																itemUrl: "distribucion/view"
//															},
//		//    	                	                       {
//		//    	                	                    	   text: "ESTADO CIVIL",
//		//    	                	                    	   leaf: true,
//		//    	                	                    	   itemUrl: "catalogo/view",
//		//    	                	                    	   itemUrlParams: {
//		//    	                	                    		   ctgCatalogoCodigo: "00012"
//		//    	                	                    	   }
//		//    	                	                       },
//															{
//																text: "G\u00C9NERO",
//																leaf: true,
//																itemUrl: "catalogo/view",
//																itemUrlParams: {
//																	ctgCatalogoCodigo: "00009"
//																}
//															},
//		//    	                	                       {
//		//    	                	                    	   text: "NACIONALIDAD",
//		//    	                	                    	   leaf: true,
//		//    	                	                    	   itemUrl: "nacionalidad/view"
//		//    	                	                       },
//															{
//																text: "PROFESIONES / OCUPACIONES",
//																leaf: true,
//																itemUrl: "catalogo/view",
//																itemUrlParams: {
//																	ctgCatalogoCodigo: "00018"
//																}
//															}
//														]
//													}

//													,{
//														text: "INS",
//														expanded: true,
//														children: [
//															{
//																text: "CANALES ENV\u00CDO DE CORRESPONDENCIA",
//																leaf: true,
//																itemUrl: "catalogo/view",
//																itemUrlParams: {
//																	ctgCatalogoCodigo: "00190"
//																}
//															},{
//																text: "PERIODICIDAD DE P\u00D3LIZA",
//																leaf: true,
//																itemUrl: "catalogo/view",
//																itemUrlParams: {
//																	ctgCatalogoCodigo: "00196"
//																}
//															},/*{
//																text: "RANGO INGRESOS",
//																leaf: true,
//																itemUrl: "rango/view",
//																itemUrlParams: {
//																	ctgCatalogoCodigo: "00012"
//																}
//															},*/{
//																text: "SEGUROS PARA EMPRESAS",
//																leaf: true,
//																itemUrl: "catalogo/view",
//																itemUrlParams: {
//																	ctgCatalogoCodigo: "00230"
//																}
//															},{
//																text: "SEGUROS PARA PERSONAS",
//																leaf: true,
//																itemUrl: "catalogo/view",
//																itemUrlParams: {
//																	ctgCatalogoCodigo: "00203"
//																}
//															}
//														]
//													}
//												]
//											});
//										}
										return childs;
									}()
								}
							}
						})
					]
				}
			});
		}
	};
}();
