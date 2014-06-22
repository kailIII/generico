CtgPorcentajeFactorRiesgo = function(){
	return {
		init : function(){
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
										handler: this.onAddClick
									}, {
										iconCls:Efx.constants.icons.DELETE_ICON,
										text: 'Eliminar Registro',
										itemId: 'delete',
										scope: this,
										handler: this.onDeleteClick
									},
									'-',
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
									},
									'->',
									{xtype:'label',text:"FACTORES DE RIESGO",cls: "ctg_label"}
								]
							}
						],
						columns: [
							/*{
								header:'Id Porcentaje Factor Riesgo',
								sortable: true,
								dataIndex: 'ctgPorcentajeFactorRiesgoId',
								editor: {
									xtype: 'textfield',
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								width: 100
							},*/{
								header:'Nombre',
								sortable: true,
								dataIndex: 'ctgPorcentajeFactorRiesgoNombre',
								editor: {
									xtype: 'textfield',
									allowBlank:false,
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								width: 100
							},{
								header:'Ponderaci\u00F3n %',
								sortable: true,
								dataIndex: 'ctgPorcentajeFactorRiesgoPonderacion',
								editor: {
									xtype: 'textfield',
									allowBlank:false,
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								width : 40

							} ,{
								header: 'Activo?',
								align:'center',
								dataIndex: 'ctgPorcentajeFactorRiesgoActivo',
								xtype:'checkcolumn',
								draggable: false,
								width: 40
							}
						]
					});
					this.callParent();
					this.on('edit', onValidateEdit, this);
				},
				onAddClick: function(){
					var rec = new CtgPorcentajeFactorRiesgo({
						ctgPorcentajeFactorRiesgoId: '',
						ctgPorcentajeFactorRiesgoActivo: true,
						ctgPorcentajeFactorRiesgoNombre: '',
						ctgPorcentajeFactorRiesgoPonderacion: ''

					}), edit = this.editing;
					edit.cancelEdit();
					this.store.insert(0, rec);
					edit.startEditByPosition({
						row: 0,
						column: 0
					});
					this.down("#save").disable();
				},
				onRefresh: function(){
					this.editing.cancelEdit();
					this.store.load();
					this.down("#save").disable();
				},
				onDeleteClick: function(){
					var sm = this.getView().getSelectionModel();
					if(sm.getSelection()[0]){
						var p = {grid:this, sm:sm};
						Efx.message.confirmDelete(function(p){
							var deleteOnServer = !Ext.isEmpty(p.sm.getSelection()[0].get("ctgPorcentajeFactorRiesgoId"));
							p.sm.position.row = 0;
							p.sm.position.column = 0;
							p.grid.store.remove(p.sm.getSelection()[0]);
							if(deleteOnServer) p.grid.store.destroy();
						},p);
					}else{
						Efx.message.alert("Antes seleccione el registro que desea eliminar.");
					}
				},
				onSaveChange: function(){
					var s = this.store;
					if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) s.save();
					else Efx.message.alert("No hay cambios por guardar.");
					this.down("#save").disable();
				},
				comboRenderer : function(combo){
					return function(value){
						var record = combo.findRecord(combo.valueField, value);
						return record ? record.get(combo.displayField) : combo.valueNotFoundText;
					};
			    }
			});
			Ext.define('CtgPorcentajeFactorRiesgo',{
				extend: 'Ext.data.Model',
				idProperty: 'ctgPorcentajeFactorRiesgoId',
				fields: [
					{name: 'ctgPorcentajeFactorRiesgoId'},
					{name: 'ctgPorcentajeFactorRiesgoActivo', type:'bool'},
					{name: 'ctgPorcentajeFactorRiesgoNombre'},
					{name: 'ctgPorcentajeFactorRiesgoPonderacion'},
					{name: 'ctgIndicadores.ctgCatalogoNombre'}
				],
				validations:[
		            {type: 'presence',  field: 'ctgPorcentajeFactorRiesgoNombre'},
		            {type: 'format', field: 'ctgCatalogoId.ctgCatalogoNombre', matcher: Efx.constants.REGEXP_NO_INI_END_BLANKS},
		            {type: 'presence',  field: 'ctgPorcentajeFactorRiesgoPonderacion'},
	            ]
			});
			Ext.tip.QuickTipManager.init();
			var store = Ext.create('Ext.data.Store', {
				model: 'CtgPorcentajeFactorRiesgo',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api: {
						read: Efx.constants.CONTEXT_PATH + '/porcentajeFactorRiesgo/read/',
						create: Efx.constants.CONTEXT_PATH + '/porcentajeFactorRiesgo/create/',
						update: Efx.constants.CONTEXT_PATH + '/porcentajeFactorRiesgo/update/',
						destroy: Efx.constants.CONTEXT_PATH + '/porcentajeFactorRiesgo/delete/'
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
									var modifyStore = Ext.getCmp('gridPorcentajeFactorRiesgo').getView().store;
									Ext.getCmp('gridPorcentajeFactorRiesgo').getView().store.removed = [];
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
						var grid = Ext.getCmp('gridPorcentajeFactorRiesgo');
						var s = grid.getView().store;
						if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) grid.down("#save").enable();
						else grid.down("#save").disable();
						Efx.message.alert("Los cambios se realizaron con &eacute;xito");
					}
				}
			});
			config.title = "FACTORES DE RIESGO",
			config.items = {
				id: 'gridPorcentajeFactorRiesgo',
				xtype: 'writergrid',
				header:false,
				frame: false,
				flex: 1,
				forceFit:true,
				store : store,
				selModel: {selType: 'cellmodel'}
			};
			return config;
		}
	};
}();

function onValidateEdit(editing, e, opts){
	var s = this.getView().store;
	if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) this.down("#save").enable();
	else this.down("#save").disable();
}