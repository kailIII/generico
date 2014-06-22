CfgConsulta = function(){
	return {
		init: function(params){
			var config = {};
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
						frame: false,
						border:false,
						width: 700,
						plugins: [this.editing],
						dockedItems: [
							{
								xtype: 'toolbar',
								items: [
									{
										iconCls:Efx.constants.icons.ADD_ICON,
										text: 'Agregar Registro',
										itemId: 'add',
										scope: this,
										handler: this.onAddClick,
//										hidden: (jsonParams)?jsonParams.hideaddbutton:false
									},{
										iconCls:Efx.constants.icons.SAVE_ICON,
										text: 'Guardar Cambios',
										itemId: 'save',
										scope: this,
										handler: this.onSaveChange,
										disabled: true
									},{
										iconCls: Efx.constants.icons.REFRESH_ICON,
										text: 'Recargar',
										itemId: 'refresh',
										scope: this,
										handler: this.onRefresh
									},{
										iconCls:Efx.constants.icons.DELETE_ICON,
										text: 'Eliminar Registro',
										itemId: 'delete',
										scope: this,
										handler: this.onDeleteClick,
//										hidden: (jsonParams)?jsonParams.hidedeletebutton:false
									},
									'->',
//									{xtype:'label',text:title,cls: "ctg_label"}
								]
							}
						],
						columns: [
						    {
								header:'*** ',
								sortable: true,
								dataIndex: 'cfgConsultaId',
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
								header: 'C\u00f3digo',
								flex: 0.8,
								minWidth: 50,
								width: 50,
								sortable: true,
								dataIndex: 'cfgConsultaCodigo',
								field: {
									xtype: 'textfield',
									allowBlank: false
								},
								draggable: false
							},{
								header: 'Descripci\u00f3n',
								flex: 3,
								minWidth: 300,
								width: 400,
								sortable: true,
								dataIndex: 'cfgConsultaDescripcion',
								field: {
									xtype: 'textfield',
									allowBlank: false
								},
								draggable: false
							},{
								header: 'Categor\u00eda',
							flex: 2,
							minWidth: 150,
							width: 150,
							sortable: true,
							dataIndex: 'cfgConsultaCategorias',
							field: {
								xtype: 'textfield',
								allowBlank: false
							},
							draggable: false
							},{
							header: 'Identificador',
							flex: 1,
							width: 50,
							minWidth: 20,
							sortable: true,
							dataIndex: 'cfgConsultaIdentificador',
							field: {
								readOnly: true,
								xtype: 'textfield',
								allowBlank: false
							},
							draggable: false
							}
						]
					});
					this.callParent();
					this.on('edit', onValidateEdit, this);
				},
				onDeleteClick: function(){
					var sm = this.getView().getSelectionModel();
					if(sm.getSelection()[0]){
						var p = {grid:this, sm:sm};
						Efx.message.confirmDelete(function(p){
							var deleteOnServer = !Ext.isEmpty(p.sm.getSelection()[0].get("cfgConsultaId"));
							p.sm.position.row = 0;
							p.sm.position.column = 0;
							p.grid.store.remove(p.sm.getSelection()[0]);
							if(deleteOnServer) p.grid.store.destroy();
						},p);
					}else{
						Efx.message.alert("Antes seleccione el registro que desea eliminar.");
					}
				},
				onAddClick: function(){
					var rec = new CfgConsulta({
						cfgConsultaNombre: '',
						cfgConsultaActivo: true
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
					if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length > 0) s.save();
					else Efx.message.alert("No hay cambios por guardar.");
					this.down("#save").disable();
				}
			});
			Ext.define('CfgConsulta', {
				extend: 'Ext.data.Model',
				idProperty: 'cfgConsultaId',
				fields: [
				    {name: 'cfgConsultaId'},
					{name: 'cfgConsultaCodigo'},
					{name: 'cfgConsultaDescripcion'},
					{name: 'cfgConsultaCategorias'},
					{name: 'cfgConsultaIdentificador'}
				],
				validations:[
		            {type: 'presence',  field: 'cfgConsultaDescripcion'}
	            ]
			});
			Ext.tip.QuickTipManager.init();
			var store = Ext.create('Ext.data.Store', {
				model: 'CfgConsulta',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api: {
						read: Efx.constants.CONTEXT_PATH + '/cfgConsulta/read/',
						create: Efx.constants.CONTEXT_PATH + '/cfgConsulta/create/' ,
						update: Efx.constants.CONTEXT_PATH + '/cfgConsulta/update/',
						destroy: Efx.constants.CONTEXT_PATH + '/cfgConsulta/delete/'
					},
					reader: {
						type: 'json',
						totalProperty: 'total',
						successProperty: 'success',
						root:'data'
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
					write: function(proxy, operation){
						var grid = Ext.getCmp('gridCtg');
						var s = grid.getView().store;
						if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) grid.down("#save").enable();
						else grid.down("#save").disable();
						Efx.message.alert("Los cambios se realizaron con &eacute;xito");
					}
				}
			});
//			config.title = title,
			config.items = {
				id: 'gridCtg',
				xtype: 'writergrid',
				header:false,
				frame: false,
				flex: 1,
				forceFit:true,
				store:store,
				selModel: {selType: 'cellmodel'}
			};
			return config;
		}
	};
}();

function onValidateEdit(editing, e, opts){
	var s = this.getView().store;
	if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) this.down("#save").enable();
	//else this.down("#save").disable();
}

String.prototype.capitalize = function(){
	return this.toLowerCase().replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};
