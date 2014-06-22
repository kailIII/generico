CtgCatalogo = function(){
	return {
		init: function(idCtg, title, cfg, porcentajePuntuacion, titulo, params){
			var jsonParams = (params) ? Ext.JSON.decode(params) : "";
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

									            "->",
									            {
									            	xtype: "label",
									            	id: "totalCriterios",
									            	text: "",
									            	cls: "criterio",
									            	width: 100
								            	}
								        ,
									{
										iconCls:Efx.constants.icons.ADD_ICON,
										text: 'Agregar Registro',
										itemId: 'add',
										scope: this,
										handler: this.onAddClick,
										hidden: (jsonParams)?jsonParams.hideaddbutton:false
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
										hidden: (jsonParams)?jsonParams.hidedeletebutton:false
									},
									'->',
									{xtype:'label',text:title,cls: "ctg_label"}
								]
							}
						],
						columns: [
							{
								header: 'Nombre',
								flex: 1,
								minWidth: 300,
								sortable: true,
								dataIndex: 'ctgCatalogoNombre',
								field: {
									xtype: 'textfield',
									allowBlank: false
								},
								draggable: false
							},
							{
								header: 'Puntaje',
								//flex: 1,
								fieldCls: "number-field",
								maxWidth: 60,
								width:  60,
								sortable: true,
								dataIndex: 'ctgCatalogoPuntaje',
								hidden : !cfg.esActividadEconomica,
								field: {
									id : 'ctgCatalogoPuntajeCombo',
									xtype: "combo",
									store:  new Ext.data.SimpleStore({
										data : cfg.listaPuntajes || [],
										fields : [ "ctgCatalogoId",
												"ctgCatalogoNombre",
												"ctgCatalogoPadre",
												"ctgCatalogoHijo",
												"ctgCatalogoPuntaje" ]
									}),
									displayField : "ctgCatalogoNombre",
									valueField : "ctgCatalogoPuntaje",
									allowBlank: false,
								},
								draggable: false
							},
							{
								header: 'Activo?',
								align:'center',
								dataIndex: 'ctgCatalogoActivo',
								width: 60,
								maxWidth: 60,
								hidden: (jsonParams ? jsonParams.hideactivo:false) ,
								xtype:'checkcolumn',
								draggable: false,

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
							var deleteOnServer = !Ext.isEmpty(p.sm.getSelection()[0].get("ctgCatalogoId"));
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
					var rec = new CtgCatalogo({
						ctgCatalogoPadre: idCtg,
						ctgCatalogoNombre: '',
						ctgCatalogoPuntaje : '',
						ctgCatalogoActivo: true
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
					/*var counter = Ext.getCmp('gridCtg').getView().store.getCount();
					alert(counter);*/
					this.down("#save").disable();
				},
				onSaveChange: function(){
					var s = this.store;
					if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length > 0) s.save();
					else Efx.message.alert("No hay cambios por guardar.");
					this.down("#save").disable();
				}
			});
			Ext.define('CtgCatalogo', {
				extend: 'Ext.data.Model',
				idProperty: 'ctgCatalogoId',
				fields: [
					{name: 'ctgCatalogoId'},
					{name: 'ctgCatalogoPadre'},
					{name: 'ctgCatalogoHijo'},
					{name: 'ctgCatalogoNombre', type: 'string'},
					{name : 'ctgCatalogoPuntaje', type:'string'},
					{name: 'ctgCatalogoActivo', type:'bool'}
				],
				validations:[
		            {type: 'presence',  field: 'ctgCatalogoNombre'}
	            ]
			});
			Ext.tip.QuickTipManager.init();
			var store = Ext.create('Ext.data.Store', {
				model: 'CtgCatalogo',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api: {
						read: Efx.constants.CONTEXT_PATH + '/catalogo/read/' + idCtg,
						create: Efx.constants.CONTEXT_PATH + '/catalogo/create/' + idCtg,
						update: Efx.constants.CONTEXT_PATH + '/catalogo/update/'+ idCtg,
						destroy: Efx.constants.CONTEXT_PATH + '/catalogo/delete/'+ idCtg
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

			config.title = title,
			config.items = [

                {

    				xtype: 'toolbar',
    				style:{border:'none',borderBottom:'1px solid #C3C3C3'},
    				hidden: !cfg.esActividadEconomica,
    				items: [
    					'->',
    					{xtype:'label',text:titulo + " - " + porcentajePuntuacion, cls: "ctg_label" }
    				]
    			},

			    {

				id: 'gridCtg',
				xtype: 'writergrid',
				header:false,
				frame: false,
				flex: 1,
				forceFit:true,
				store:store,
				selModel: {selType: 'cellmodel'}
			}];
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
