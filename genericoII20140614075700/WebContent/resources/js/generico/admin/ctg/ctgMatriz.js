CtgMatriz = function(){
	return {
		saveAll: function(){
			if(Ext.getCmp("ctgMatrizGlobalGrid").getStore().sum("ctgMatrizGlobalPuntuacion") != "100"){
				Efx.message.alertInvalid("La sumatoria de todos los criterios debe ser 100%");
				return;
			}

			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/admin/matriz/save",
				params: {
					jsonString: Efx.grid.getAllRowsToJson("ctgMatrizGlobalGrid")
				},
				callback: function(options,success,response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						if(jsonObject && jsonObject.success){
							if(jsonObject.data)
								Efx.grid.loadData("ctgMatrizGlobalGrid", jsonObject.data);
							if(Ext.getCmp("ctgMatrizGlobalGrid") && Ext.getCmp("ctgMatrizGlobalGrid").getStore())
	            				Efx.utils.setText("totalCriterios", "Total : " +
	            						Ext.getCmp("ctgMatrizGlobalGrid").getStore().sum("ctgMatrizGlobalPuntuacion") + " %");
							/*Verificar Mensaje*/
							//Efx.message.alert(jsonObject.message);
							Efx.message.alert('Registro Almacenado Correctamente');
						}else{
							Efx.message.alertInvalid(jsonObject ? (jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE) : Efx.constants.DEFAULT_ERROR_MESSAGE);
						}
					}
				}
			});
		},
		refresh: function(){
			Efx.message.progress("Cargando Informaci\u00F3n...");
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/admin/matriz/load",
				callback: function(options,success,response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						if(jsonObject && jsonObject.success){
							if(jsonObject.data)
								Efx.grid.loadData("ctgMatrizGlobalGrid", jsonObject.data);
							if(Ext.getCmp("ctgMatrizGlobalGrid") && Ext.getCmp("ctgMatrizGlobalGrid").getStore())
	            				Efx.utils.setText("totalCriterios", "Total : " +
	            						Ext.getCmp("ctgMatrizGlobalGrid").getStore().sum("ctgMatrizGlobalPuntuacion") + " %");
						}else{
							Efx.message.alertInvalid(jsonObject ? (jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE) : Efx.constants.DEFAULT_ERROR_MESSAGE);
						}
					}
				}
			});
		},
		init: function(config){
			Ext.define("CtgMatrizGlobal", {
			    extend: "Ext.data.Model",
			    idProperty: "ctgMatrizGlobalId",
			    fields: [
					{name: "ctgMatrizGlobalId"},
					{name: "ctgTipo"},
					{name: "ctgMatrizGlobalNombre"},
					//{name: "sgdCliente"},
					{name: "ctgMatrizGlobalPuntuacion", type: "float"},
					{name: "ctgMatriz"},
					{name: "ctgMatrizId"}
		        ]
			});
			return {
				items: [
					{
						xtype: "toolbar",
						style: {border:"none",borderBottom:"1px solid #C3C3C3"},
						items: [
						    "->",
					        {xtype:"label",text: "MATRIZ DE PUNTUACIONES",cls: "ctg_label"}
				        ]
					},{
						xtype: "grid",
						id: "ctgMatrizGlobalGrid",
						flex: 1,
						frame: true,
						margins: "5 5 5 5",
						dockedItems: [
						    {
							    xtype: "toolbar",
							    dock: "bottom",
							    items: [
						            "->",
						            {
						            	xtype: "label",
						            	id: "totalCriterios",
						            	text: "Total: 100%",
						            	cls: "criterio",
						            	width: 100
					            	}
					            ]
							},{
								xtype: "toolbar",
								dock: "top",
								enableOverflow: true,
								items: [
									{
										text: 'Refrescar',
										itemId: 'refresh',
										iconCls: Efx.constants.icons.REFRESH_ICON,
										scope: this,
										handler: CtgMatriz.refresh
									},
									{
										iconCls:Efx.constants.icons.SAVE_ICON,
										text: 'Guardar Cambios',
										itemId: 'save',
										scope: this,
										handler: CtgMatriz.saveAll
									}
						        ]
							}
			            ],
						store: new Ext.data.SimpleStore({
							model: "CtgMatrizGlobal",
							data: config.data || [],
							groupers: [{property: "ctgMatriz"}]
						}),
						columns: [
							{
								dataIndex: "ctgMatrizGlobalNombre",
								header: "Criterio",
								flex: 1,
								summaryType: "count",
						        summaryRenderer: function(value){
						            return Ext.String.format("<span class=\"criterio\">{0} Criterio{1}</span>", value, value !== 1 ? "s" : "");
						        }
							},{
								id: "ctgMatrizGlobalPuntuacion",
								dataIndex: "ctgMatrizGlobalPuntuacion",
								summaryType: "sum",
								align: "right",
								summaryRenderer: function(value){ return Ext.String.format("<span class=\"criterio\">{0} %</span>", Ext.util.Format.kycMoney(value)); },
								renderer: "gestorPercentage",
								field: {
					                xtype: "numericfield"
					            },
								width: 100
							}
						],
						plugins: Ext.create("Ext.grid.plugin.CellEditing", {
					        clicksToEdit: 1,
					        listeners: {
					            edit: function(){
					                Ext.getCmp("ctgMatrizGlobalGrid").getView().refresh();
					            }
					        }
					    }),
						features: [
				           {
				        	   ftype: "groupingsummary",
				        	   enableNoGroups: false,
				        	   groupHeaderTpl: "{name}",
				        	   showSummaryRow: true,
				        	   fixed: true
				           }
			            ],
			            viewConfig: {
			            	listeners: {
			            		itemupdate: function(){
			            			if(Ext.getCmp("ctgMatrizGlobalGrid") && Ext.getCmp("ctgMatrizGlobalGrid").getStore())
			            				Efx.utils.setText("totalCriterios", "Total : " +
			            						Ext.getCmp("ctgMatrizGlobalGrid").getStore().sum("ctgMatrizGlobalPuntuacion") + " %");
			            		}
			            	}
			            }
			        }
				]
			};
		}
	};
}();

function onValidateEdit(editing, e, opts){
	var s = this.getView().store;
	if(s.getUpdatedRecords().length >0)
		this.down("#save").enable();

}