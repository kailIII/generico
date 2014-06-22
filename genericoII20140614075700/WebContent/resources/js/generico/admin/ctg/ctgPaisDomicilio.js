CtgPais = function(){
	return {
		init : function(porcentajePuntuacion,titulo){
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
					ctgPaisPuntajeW = Ext.create("Ext.window.Window", {
						id: "ctgPaisPuntajeW",
						title: "Establecer Pesos",
						modal: true,
						closable: false,
						layout: "fit",
						height: 150,
						width: 450,
						items : {
							xtype: "form",
							id: "ctgPaisPuntajeForm",
							border: false,
							bodyPadding: 10,
							defaults: Efx.utils.defaults({labelWidth: 150}),

						items : [
						{
							xtype: "textfield",
							id: "ctgPaisPuntaje",
							name: "ctgPaisPuntaje",
							fieldLabel: "Peso",
							allowBlank: false,
							selectOnFocus: true,
							width: 350

						},{
							xtype: "numberfield",
							fieldCls: "number-field",
							hideTrigger: true,
							id: "ctgPaisPuntajeCR",
							fieldLabel: "Peso Costa Rica",
							allowNegative: false,
							allowDecimals: false,
 							selectOnFocus: true,
							width: 350
						}
					]
						},
					listeners: {
						show : function (){
							Ext.getCmp("ctgPaisPuntajeForm").getForm().reset();
							Ext.WindowMgr.get("ctgPaisPuntajeW").focus();
							Efx.utils.setFocus("ctgPaisPuntaje");
							}
						},
						buttons: [
							       {
							          text: "Establecer",
							          handler: this.fillCtgPaisPuntaje

							          },{
							        	  text: "Cerrar",
							        	  handler: function(){
							        		 ctgPaisPuntajeW.hide();
							        	  }
							          }
						        ]
					})
					,
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
									},{
										text:'Valor Peso',
										iconCls : Efx.constants.icons.SCORE_ICON,
										itemId: 'valorPeso',
										scope: this,
										handler : this.showCtgPais

									},
									'->',
									{xtype:'label',text: "NACIONALIDAD",cls: "ctg_label"}
								]
							}
						],
						columns: [
							{
								header:'C\u00F3digo de \u00C1rea',
								sortable: true,
								dataIndex: 'ctgPaisCodigoArea',
								editor: {
									xtype: 'textfield',
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								width: 100
							},{
								header:'Abreviatura',
								sortable: true,
								dataIndex: 'ctgPaisAbreviatura',
								editor: {
									xtype: 'textfield',
									allowBlank:false,
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								width: 100
							},{
								header:'Pa\u00EDs',
								sortable: true,
								dataIndex: 'ctgPaisNombre',
								editor: {
									xtype: 'textfield',
									allowBlank:false,
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								flex: 1
							},{
								header:'Nacionalidad',
								sortable: true,
								dataIndex: 'ctgPaisNacionalidad',
								editor: {
									xtype: 'textfield',
									allowBlank:false,
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								},
								draggable: false,
								flex: 1
							},{
								header:'Peso Domicilio',
								sortable: true,
								dataIndex: 'ctgPaisPesoDomicilio',
								editor: {
									xtype: "numberfield",
									fieldCls: "number-field",
									allowBlank:false,
									hideTrigger: true,
									allowNegative: false,
									allowDecimals: false,
									selectOnFocus: true,
								},
								draggable: false,
								flex: 1
							},
							{
								header:'Peso Nacionalidad',
								sortable: true,
								dataIndex: 'ctgPaisPesoNacionalidad',
								hidden: true,
								editor: {
									id : 'ctgPaisPesoNacionalidad',
									xtype: "numberfield",
									fieldCls: "number-field",
									allowBlank:false,
									hideTrigger: true,
									allowNegative: false,
									allowDecimals: false,
									selectOnFocus: true,
								},
								draggable: false,
								flex: 1
							},{
								header: 'Activo?',
								align:'center',
								dataIndex: 'ctgPaisActivo',
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
					var rec = new CtgPais({
						ctgPaisId: '',
						ctgPaisActivo: true,
						ctgPaisNombre: '',
						ctgPaisCodigoArea: '',
						ctgPaisAbreviatura: '',
						ctgPaisNacionalidad: '',
						ctgPaisPesoNacionalidad	:'',
						ctgPaisPesoDomicilio : ''
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
							var deleteOnServer = !Ext.isEmpty(p.sm.getSelection()[0].get("ctgPaisId"));
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
			    },
			    showCtgPais : function () {
			    	ctgPaisPuntajeW.show();
			    },
			    hideCtgPais : function () {
			    	ctgPaisPuntajeW.hide();
			    },

			    fillCtgPaisPuntaje : function () {
				    var i = 0;
				    var s =Ext.getCmp("gridPais").getView();
				    var grid = Ext.getCmp("gridPais");
				    var tabla = Ext.getCmp('gridPais').getView().store;
				    var registros = tabla.getCount();
				    var formulario = Ext.getCmp('ctgPaisPuntajeForm').getForm();
				    var puntajeForAll = formulario.findField('ctgPaisPuntaje').getValue();
				    var puntajeCR = formulario.findField ('ctgPaisPuntajeCR').getValue();
				    if(puntajeForAll != null){
				    for(i = 0 ; i <= registros-1 ; i++) {
				    	s.store.getAt(i).beginEdit();
				    	if(s.store.getAt(i).get("ctgPaisId") == Efx.constants.codes.COSTA_RICA
				    			&& puntajeCR != null){
				    		s.store.getAt(i).set("ctgPaisPesoDomicilio",puntajeCR);
				    	}else{
				    	s.store.getAt(i).set("ctgPaisPesoDomicilio",puntajeForAll);
				    	}
				    	s.store.getAt(i).commit();
				    	s.store.getAt(i).endEdit();
				    	s.store.getAt(i).setDirty();
				    	s.refreshNode(i);
				     }
				    Ext.WindowMgr.get("ctgPaisPuntajeW").hide();
				    } else {
				    	Efx.message.alertInvalid(Efx.constants.REQUIRED_FIELDS);
				    }

//				    this.down("#save").disabled(false);
				    grid.down("#save").enable();
				    //return CtgPais.down("#save").enable();
				    }


			});
			Ext.define('CtgPais',{
				extend: 'Ext.data.Model',
				idProperty: 'ctgPaisId',
				fields: [
					{name: 'ctgPaisId'},
					{name: 'ctgPaisActivo', type:'bool'},
					{name: 'ctgPaisNombre'},
					{name: 'ctgPaisCodigoArea'},
					{name: 'ctgPaisAbreviatura'},
					{name: 'ctgPaisNacionalidad'},
					{name: 'ctgPaisPesoNacionalidad'},
					{name: 'ctgPaisPesoDomicilio'}
				],
				validations:[
		            {type: 'presence',  field: 'ctgPaisNombre'},
		            {type: 'format', field: 'ctgPaisNombre', matcher: Efx.constants.REGEXP_NO_INI_END_BLANKS},
		            {type: 'presence',  field: 'ctgPaisAbreviatura'},
		            {type: 'format', field: 'ctgPaisAbreviatura', matcher: Efx.constants.REGEXP_NO_INI_END_BLANKS},
		            {type: 'presence',  field: 'ctgPaisNacionalidad'},
		            {type: 'format', field: 'ctgPaisNacionalidad', matcher: Efx.constants.REGEXP_NO_INI_END_BLANKS}
	            ]
			});
			Ext.tip.QuickTipManager.init();
			var store = Ext.create('Ext.data.Store', {
				model: 'CtgPais',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api: {
						read: Efx.constants.CONTEXT_PATH + '/nacionalidad/read/',
						create: Efx.constants.CONTEXT_PATH + '/nacionalidad/create/',
						update: Efx.constants.CONTEXT_PATH + '/nacionalidad/update/',
						destroy: Efx.constants.CONTEXT_PATH + '/nacionalidad/delete/'
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
									var modifyStore = Ext.getCmp('gridPais').getView().store;
									Ext.getCmp('gridPais').getView().store.removed = [];
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
						var grid = Ext.getCmp('gridPais');
						var s = grid.getView().store;
						if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) grid.down("#save").enable();
						else grid.down("#save").disable();
						Efx.message.alert("Los cambios se realizaron con &eacute;xito");
					}
				}
			});
//			config.title = titulo,
			config.items =[
			    {
				xtype: 'toolbar',
				style:{border:'none',borderBottom:'1px solid #C3C3C3'},
				items: [
					'->',
					{xtype:'label',text:titulo + " - " + porcentajePuntuacion + " %", cls: "ctg_label"}
				]
			}, {
				id: 'gridPais',
				xtype: 'writergrid',
				header:false,
				frame: false,
				flex: 1,
				forceFit:true,
				store : store,
				selModel: {selType: 'cellmodel'}
			}];
			return config;
		}
	};
}();

function onValidateEdit(editing, e, opts){
	var s = this.getView().store;
	if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) this.down("#save").enable();
	else this.down("#save").disable();
}