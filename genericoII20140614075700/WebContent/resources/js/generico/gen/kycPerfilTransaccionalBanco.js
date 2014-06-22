KycPerfilTransaccionalBanco = function(){
	return {
		init : function(cfg){
			var config = {};
			var kycAlertas = EfxKYC.getKycAlertas();
			var ctgSubTipoTransaccion = new Ext.data.SimpleStore({
				data :  cfg.ctgSubTipoTransaccion || [],
				fields : [ "ctgSubTipoTransaccionId",
						"ctgCatalogoNombre",
						"ctgCatalogoPadre",
						"ctgCatalogoHijo",
						"ctgCatalogoPuntaje" ]
			});
			var ctgCatalogoPTB = new Ext.data.SimpleStore({
				data :  cfg.ctgCatalogoPTB || [],
				fields : [ "ctgCatalogoPTBId",
						"ctgCatalogoNombre",
						"ctgCatalogoPadre",
						"ctgCatalogoHijo",
						"ctgCatalogoPuntaje" ]
			});
			var ctgEstimacionMensual = new Ext.data.SimpleStore({
				data :  cfg.ctgEstimacionMensual || [],
				fields : [ "ctgCatalogoEstimacionId",
						"ctgCatalogoNombre",
						"ctgCatalogoPadre",
						"ctgCatalogoHijo",
						"ctgCatalogoPuntaje" ]
			});
			var ctgCantidadEstimacionMensual = new Ext.data.SimpleStore({
				data : cfg.ctgCantidadEstimacionMensual || [],
				fields : [ "ctgCatalogoCantidadEstimacionId",
						"ctgCatalogoNombre",
						"ctgCatalogoPadre",
						"ctgCatalogoHijo",
						"ctgCatalogoPuntaje" ]
			});

			config.items = [];
			config.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) config.items.push(kycAlertas);
				Ext.define('Writer.Grid', {
				extend: 'Ext.grid.Panel',
				alias: 'widget.writergrid',
				requires: [
					'Ext.grid.plugin.CellEditing',
					'Ext.form.field.Text',
					'Ext.toolbar.TextItem'
				],
				initComponent: function(){
					this.editing = Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit: 1});
					Ext.apply(this, {
						frame: true,
						border:true,
						width: 700,
						plugins: [this.editing],
						dockedItems: [
							{
								xtype: 'toolbar',
								items: [
									{
										iconCls: Efx.constants.icons.REFRESH_ICON,
										text: 'Recargar',
										itemId: 'refresh',
										scope: this,
										handler: this.onRefresh
									},
									{
										iconCls:Efx.constants.icons.SAVE_ICON,
										text: 'Guardar Cambios',
										itemId: 'save',
										scope: this,
										handler: this.onSaveChange,
										disabled: true
									}
								]
							}
						],
						columns: [
							{
								header:'*** ',
								sortable: true,
								dataIndex: 'kycPerfilTransaccionalBancoId',
								editor: {
									xtype: 'textfield',
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								width: 20,
								hidden: true
							},
							{
								header:'*** ',
								sortable: true,
								dataIndex: 'kyc',
								editor: {
									xtype: 'textfield',
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								width: 20,
								hidden: true
							},
							{
								header:'Tipo de Transacci\u00F3n',
								sortable: true,
								dataIndex: 'ctgTipoPerfilTransaccionalBancoId',
								draggable: false,
								width: 110,
								renderer:  function(valor){
                              var m = ctgCatalogoPTB.findRecord("ctgCatalogoPTBId", valor);
                              return m ? m.get("ctgCatalogoNombre"): "";
							}
							},
							{
								header:'Subtipo de Transacci\u00F3n',
								sortable: true,
								dataIndex: 'ctgSubTipoPerfilTransaccionalBancoId',
								flex: 1,
								width: 200,
								renderer:  function(valor){
                                    var m = ctgSubTipoTransaccion.findRecord("ctgSubTipoTransaccionId", valor);
                                    return m ? m.get("ctgCatalogoNombre"): "";
								}
							},{
								header:'Estimaci\u00f3n Mensual',
								sortable: true,
								dataIndex: 'ctgEstimacionMensualId',
								editor: {
									id : 'ctgEstimacionMensualCombo',
									xtype: "combo",
									store:  ctgEstimacionMensual,
									displayField : "ctgCatalogoNombre",
									valueField : "ctgCatalogoEstimacionId",
									editable:false,
									allowBlank: false,
									triggerAction: 'all'
								},
								draggable: false,
								flex: 0,
								width: 100,
								renderer:  function(valor){
                                    var m = ctgEstimacionMensual.findRecord("ctgCatalogoEstimacionId", valor);
                                    return m ? m.get("ctgCatalogoNombre"): "";
								}
							},
							{
								header:'Cantidad de Transacciones Estimadas al Mes',
								sortable: true,
								dataIndex: 'ctgCantidadEstimacionMensualId',
								editor: {
									id : 'ctgCantidadEstimacionMensualCombo',
									xtype: "combo",
									store:  ctgCantidadEstimacionMensual,
									displayField : "ctgCatalogoNombre",
									valueField : "ctgCatalogoCantidadEstimacionId",
									editable:false,
									allowBlank: false,
									triggerAction: 'all'
								},
								draggable: false,
								flex: 1,
								renderer:  function(valor){
                                    var m = ctgCantidadEstimacionMensual.findRecord("ctgCatalogoCantidadEstimacionId", valor);
                                    return m ? m.get("ctgCatalogoNombre"): "";
								}
							},
							{
								header:' ',
								sortable: true,
								dataIndex: 'kycId',
								editor: {
									xtype: 'textfield',
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								width: 100,
								hidden: true
							}
						]
					});
					this.callParent();
					this.on('edit', onValidateEdit, this);
				},
				onAddClick: function(){
					var rec = new KycPerfilTransaccionalBanco({
						kycPerfilTransaccionalBancoId: null,
						ctgTipoPerfilTransaccionalBanco: null,
						ctgSubTipoPerfilTransaccionalBanco : null,
						ctgSubTipoPerfilTransaccionalBanco: null,
						kyc : null
					}), edit = this.editing;
					edit.cancelEdit();
					this.store.insert(0, rec);
					edit.startEditByPosition({
						row: 0,
						column: 0
					});
					this.down("#save").enable();
				},
				onRefresh: function(){
					this.editing.cancelEdit();
					this.store.load();
					this.down("#save").disable();
				},
				onSaveChange: function(){
					var s = this.store;
					if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length > 0){
						if(updatekycPerfil(s) == 0){
							s.save();
						}else{
							Efx.message.alert("Debe seleccionar una Cantidad de Transacciones<br/> " +
									"por cada estimaci\u00f3n mensual escogida<br/><br/>" +
									"No puede seleccionar una Cantidad de Transacciones<br/>" +
									"sin determinar Estimaci\u00f3n Mensual");
							return;
						}
					}
					else Efx.message.alert("No hay cambios por guardar.");
					this.down("#save").disable();
				}
			});
			Ext.define('KycPerfilTransaccionalBanco', {
				extend: 'Ext.data.Model',
				idProperty: 'kycPerfilTransaccionalBancoId',
				fields: [
					{name: 'kycPerfilTransaccionalBancoId'},
					{name: 'ctgTipoPerfilTransaccionalBancoId'},
					{name: 'ctgSubTipoPerfilTransaccionalBancoId'},
					{name: 'ctgEstimacionMensualId'},
					{name: 'ctgCantidadEstimacionMensualId'},
					{name: 'kycId'},
					{name: 'ctgTipoPerfilTransaccionalBanco'},
					{name: 'ctgSubTipoPerfilTransaccionalBanco'},
					{name: 'ctgEstimacionMensual'},
					{name: 'ctgCantidadEstimacionMensual'},
					{name: 'kyc'}
				],
				validations:[
	            ]
			});
			Ext.tip.QuickTipManager.init();
			var store = Ext.create('Ext.data.Store', {
				model: 'KycPerfilTransaccionalBanco',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api: {
						read: Efx.constants.CONTEXT_PATH + '/kycPerfilTransaccionalBanco/read/' + EfxKYC.getKycId(),
						create: Efx.constants.CONTEXT_PATH + '/kycPerfilTransaccionalBanco/create/' + EfxKYC.getKycId(),
						update: Efx.constants.CONTEXT_PATH + '/kycPerfilTransaccionalBanco/update/' + EfxKYC.getKycId()
					},
					reader: {
						type: 'json',
						totalProperty: 'total',
						successProperty: 'success',
						root:'KycPerfilTransaccionalBanco'
					},
					writer: {
						type: 'json',
						writeAllFields: true
					},
					listeners: {
						exception: function(proxy, response, operation){
							if(!Ext.isEmpty(operation.records) && (operation.action == "destroy" || operation.action == "DESTROY")){
								try{
									var modifyStore = Ext.getCmp('gridCtg').getView().store;
									Ext.getCmp('gridCtg').getView().store.removed = [];
									Ext.each(operation.records, function(item){
										modifyStore.insert(item.index, item);
									});
								}catch(e){if(console.log(e));}
							}
							Efx.message.alertInvalid(Ext.JSON.decode(response.responseText).errorMessage);
						}
                   }
				},
				listeners: {
                    beforesync: function(obj, operation){
	                        if(obj.update && obj.update.length > 0 || (obj.create && obj.create.length > 0)){
	                              Ext.each(obj.update, function(){
	                                    this.data.kyc = {
	                                  		  kycId: this.data.kycId
	                                    };
	                                    this.data.ctgTipoPerfilTransaccionalBanco = {
	                                  		  ctgCatalogoId: this.data.ctgTipoPerfilTransaccionalBancoId
	                                    };
	                                    this.data.ctgSubTipoPerfilTransaccionalBanco = {
	                                          ctgCatalogoId: this.data.ctgSubTipoPerfilTransaccionalBancoId
	                                    };

	                                    this.data.ctgEstimacionMensual = {
	                                            ctgCatalogoId: this.data.ctgEstimacionMensualId
	                                    };
	                                    this.data.ctgCantidadEstimacionMensual = {
	                                            ctgCatalogoId: this.data.ctgCantidadEstimacionMensualId
	                                    };
	                              });
	                              Ext.each(obj.create, function(){
	                                  this.data.kyc = {
	                                		  kycId: this.data.kycId
	                                  };
	                                  this.data.ctgTipoPerfilTransaccionalBanco = {
	                                		  ctgCatalogoId: this.data.ctgTipoPerfilTransaccionalBancoId
	                                  };
	                                  this.data.ctgSubTipoPerfilTransaccionalBanco = {
	                                        ctgCatalogoId: this.data.ctgSubTipoPerfilTransaccionalBancoId
	                                  };
	                                  this.data.ctgEstimacionMensual = {
	                                          ctgCatalogoId: this.data.ctgEstimacionMensualId
	                                  };
	                                  this.data.ctgCantidadEstimacionMensual = {
	                                          ctgCatalogoId: this.data.ctgCantidadEstimacionMensualId
	                                  };
	                            });
                        }
                    },
					write: function(proxy, operation){
						var grid = Ext.getCmp('gridCtg');
						var s = grid.getView().store;
						if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) grid.down("#save").enable();
						else grid.down("#save").disable();
						s.read();
						Efx.message.alert("Los cambios se realizaron con &eacute;xito");
					}
				}
			});

			config.items.push(

    			{xtype: 'panel',
    				title: "PERFIL TRANSACIONAL",
    				flex: 1,
    				layout: {
    				    type: "vbox",
    				    align : "center",
    				    pack  : "start"
    				},
    				defaults: {width: 730, margins: "5 0 5 0"},
    			 items:[
					    {	id: 'gridCtg',
							xtype: 'writergrid',
							header:false,
							frame: false,
							flex: 1,
							forceFit:true,
							store:store,
							selModel: {selType: 'cellmodel'}
					    }
				    ]
			    }
    		);

			return config;
		}
	};
}();
updatekycPerfil = function(obj){
	var count = 0;
	Ext.each(obj.data.items, function(){
		if(this.data.ctgEstimacionMensualId == "1400" && this.data.ctgCantidadEstimacionMensualId == "1401"){
			}else if(this.data.ctgEstimacionMensualId != "1400" && this.data.ctgCantidadEstimacionMensualId != "1401"){
		}else count++;
  });

	 return count;
};
function onValidateEdit(editing, e, opts){
	var s = this.getView().store;
	if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) this.down("#save").enable();
}

String.prototype.capitalize = function(){
	return this.toLowerCase().replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};