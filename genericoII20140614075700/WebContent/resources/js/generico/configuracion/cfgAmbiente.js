CfgAmbiente = function(){
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
								dataIndex: 'cfgAmbienteId',
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
								flex: 1,
								minWidth: 300,
								sortable: true,
								dataIndex: 'cfgAmbienteCodigo',
								field: {
									xtype: 'textfield',
									allowBlank: false
								},
								draggable: false
							},{
								header: 'Descripci\u00f3n',
								flex: 1,
								minWidth: 300,
								sortable: true,
								dataIndex: 'cfgAmbienteDescripcion',
								field: {
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
							var deleteOnServer = !Ext.isEmpty(p.sm.getSelection()[0].get("cfgAmbienteId"));
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
					var rec = new CfgAmbiente({
						cfgAmbienteNombre: '',
						cfgAmbienteActivo: true
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
			Ext.define('CfgAmbiente', {
				extend: 'Ext.data.Model',
				idProperty: 'cfgAmbienteId',
				fields: [
				    {name: 'cfgAmbienteId'},
					{name: 'cfgAmbienteCodigo'},
					{name: 'cfgAmbienteDescripcion'}
				],
				validations:[
		            {type: 'presence',  field: 'cfgAmbienteDescripcion'}
	            ]
			});
			Ext.tip.QuickTipManager.init();
			var store = Ext.create('Ext.data.Store', {
				model: 'CfgAmbiente',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api: {
						read: Efx.constants.CONTEXT_PATH + '/cfgAmbiente/read/',
						create: Efx.constants.CONTEXT_PATH + '/cfgAmbiente/create/' ,
						update: Efx.constants.CONTEXT_PATH + '/cfgAmbiente/update/',
						destroy: Efx.constants.CONTEXT_PATH + '/cfgAmbiente/delete/'
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
