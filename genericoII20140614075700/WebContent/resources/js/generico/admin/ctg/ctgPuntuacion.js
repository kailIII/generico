CtgPuntuacion = function(){
	var nextValue = 0;
	return {
		setNextValue: function(value){nextValue = parseFloat(value);},
		getNextValue: function(){return nextValue;},
		init: function(ctgCatalogoCodigo, title, porcentajePuntuacion, labelMin, labelMax, limiteSum, lista, contextPath){
			var config = {};
			CtgPuntuacion.setNextValue(limiteSum);
			Ext.define('CtgPuntuacionModel', {
				extend: 'Ext.data.Model',
				idProperty: 'ctgPuntuacionId',
				fields: [
					{name: 'ctgPuntuacionId'},
					{name: 'ctgPuntuacionLimiteInferior'},
					{name: 'ctgPuntuacionLimiteSuperior'},
					{name: 'ctgPuntuacionPuntuacion'},
					{name: 'ctgTipo'},
					{name: 'ctgTipoNombre'}
				]
			});

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
									}
								]
							}
						],
						columns: [
						   {dataIndex: "ctgPuntuacionId",  hidden: true},
						   {dataIndex: "ctgTipo", hidden: true},
					       {
								header: labelMin,
								width: 120,
								dataIndex: 'ctgPuntuacionLimiteInferior',
								align: "right",
								draggable: false,
								sortable: true,
								renderer: function(value){
									if(isInt(limiteSum)) return value;
									return Ext.util.Format.kycMoney(value);
								},
								field: {
									xtype:'numberfield',
									fieldCls: "number-field",
									width: 30,
									enableKeyEvents: true,
									hideTrigger: true,
									allowBlank: false,
									triggerAction : 'all',
									allowNegative: false,
									allowDecimals: !isInt(limiteSum),
									decimalPrecision: isInt(limiteSum) ? 0 : 1,
									minValue: 0,
									maxLength: isInt(limiteSum) ? 3 : 6,
									enforceMaxLength :true,
									selectOnFocus: false
								}
							},{
								header: labelMax,
								width: 120,
								dataIndex: 'ctgPuntuacionLimiteSuperior',
								align: "right",
								sortable: true,
								draggable: false,
								renderer: function(value){
									if(isInt(limiteSum)) return value;
									return Ext.util.Format.kycMoney(value);
								},
								field: {
									xtype:'numberfield',
									fieldCls: "number-field",
									width: 30,
									enableKeyEvents: true,
									hideTrigger: true,
									allowBlank: false,
									triggerAction : 'all',
									allowNegative: false,
									allowDecimals: !isInt(limiteSum),
									decimalPrecision: isInt(limiteSum) ? 0 : 2,
									minValue: 0,
									maxLength: isInt(limiteSum) ? 3 : 6,
									enforceMaxLength: true,
									selectOnFocus: false/*,
									listeners: {
										change: function(field, event,eOpts) {
											var sm = Ext.getCmp("gridPuntuacion").getView().getSelectionModel();
											fila = sm.getSelection()[0].index;
											var indice = Ext.getCmp("gridPuntuacion").store.data.items[0].data.ctgPuntuacionId;
											if(fila < (Ext.getCmp("gridPuntuacion").store.getCount())){
												if(fila != (Ext.getCmp("gridPuntuacion").store.getCount() - 1)){
													Ext.getCmp("gridPuntuacion").store.getAt(fila+1).setDirty();
													if(isInt(limiteSum))
														Ext.getCmp("gridPuntuacion").store.getAt(fila+1).set("ctgPuntuacionLimiteInferior", parseInt(this.getValue()) + parseInt(limiteSum));
													else
														Ext.getCmp("gridPuntuacion").store.getAt(fila+1).set("ctgPuntuacionLimiteInferior", parseFloat(this.getValue()) + parseFloat(limiteSum));
													this.focus(false);
												}
											}
									   }
							       }*/
								}
							},
							{
								header: 'Puntuaci\u00F3n',
								width: 120,
								dataIndex: 'ctgPuntuacionPuntuacion',
								align: "right",
								sortable: true,
								draggable: false,
								renderer: "gestorPercentage",
								field: {
									xtype:'numericfield',
									fieldCls: "number-field",
									width: 30,
									enableKeyEvents: true,
									hideTrigger: true,
									allowBlank: false,
									triggerAction : 'all',
									allowNegative: false,
									minValue: 0,
									maxLength: 6,
									enforceMaxLength :true,
									selectOnFocus: false
								}
							}
						]
					});
					this.callParent();
					this.on('edit', onValidateEdit, this);
					this.on('beforeedit', disableEdit, this);
				},
				onDeleteClick: function(){
					var sm = this.getView().getSelectionModel();
					fila = sm.getSelection()[0].index;
					filasBeforeDelete = Ext.getCmp("gridPuntuacion").store.getCount()-1;
					limiteInferiorToSet = sm.getSelection()[0].data.ctgPuntuacionLimiteInferior;
					if(sm.getSelection()[0]){
						if(validarDelete()){
							var p = {grid:this, sm:sm};
							Efx.message.confirmDelete(function(p){
								p.sm.position.row = 0;
								p.sm.position.column = 0;
								p.grid.store.remove(p.sm.getSelection()[0]);
								if(deleteAll(ctgCatalogoCodigo,fila,filasBeforeDelete,limiteInferiorToSet)) {
									p.grid.store.destroy();
								}
							},p);
						}
					}else{
						Efx.message.alert("Antes seleccione el registro que desea eliminar.");
					}
				},
				onAddClick: function(){
					var rec = new CtgPuntuacionModel({
						ctgPuntuacionLimiteInferior: parseInt(Ext.getCmp("gridPuntuacion").store.data.items[Ext.getCmp("gridPuntuacion").store.getCount()-1].data.ctgPuntuacionLimiteSuperior)+1,
						ctgPuntuacionLimiteSuperior: '',
						ctgPuntuacionPuntuacion: '',
						ctgTipo: Ext.getCmp("gridPuntuacion").store.data.items[0].data.ctgTipo,
						ctgTipoNombre: Ext.getCmp("gridPuntuacion").store.data.items[0].data.ctgTipoNombre

					}), edit = this.editing;
					edit.cancelEdit();
					this.store.insert(Ext.getCmp("gridPuntuacion").store.getCount(), rec);
					edit.startEditByPosition({
						row: Ext.getCmp("gridPuntuacion").store.getCount()-1,
						column: 2
					});
					this.down("#save").enable();
				},
				onRefresh: function(){
					this.editing.cancelEdit();
					refresh(ctgCatalogoCodigo);
					this.down("#save").disable();
				},
			    onSaveChange: function(){
			    	if(validar(limiteSum))
			    		saveAll(ctgCatalogoCodigo);
				}
			});
			Ext.tip.QuickTipManager.init();
			config.items = [
					{
						xtype: 'toolbar',
						style:{border:'none',borderBottom:'1px solid #C3C3C3'},
						items: [
							'->',
							{xtype:'label',text: title + " - " + porcentajePuntuacion + " %", cls: "ctg_label"}
						]
					},{
						id: 'gridPuntuacion',
						xtype: 'writergrid',
						margins: "5 5 5 5",
						frame: true,
						border: true,
						flex: 1,
						forceFit: true,
						store: new Ext.data.SimpleStore({
							model: "CtgPuntuacionModel",
							data: lista.data || []
						}),
						selModel: {selType: 'cellmodel'}
					}
			];
			return config;
		}
	};
}();

//Funcion para deshabilitar las celdas
function disableEdit(editor,e,eOpts ){
	//colIdx -> segun columnas definidas en el grid
	if(editor.rowIdx!=0 && editor.colIdx==3) return false;
}

function isInt(n) {
   if(typeof n == 'number' && n % 1 == 0) {
       return true;
   } else {
       return false;
   }
}

function validar(limiteSum){
	var s = Ext.getCmp("gridPuntuacion").store;
	var b=1;
	var j=0;
	var retorno = true;
	if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0){
		//validar que los rangos son correctos
		var total=0;
		for(var i = 0; i < s.getCount(); i++){
			j=i+1;
			total+=parseInt(s.getAt(i).data.ctgPuntuacionPuntuacion);
			if(i<s.getCount()-1){
				if(isInt(limiteSum)){
					if(parseInt(s.getAt(i).data.ctgPuntuacionLimiteInferior) > parseInt(s.getAt(i).data.ctgPuntuacionLimiteSuperior))
						b=0;
					if( parseInt(s.getAt(i).data.ctgPuntuacionLimiteSuperior) >= parseInt(s.getAt(j).data.ctgPuntuacionLimiteSuperior))
						b=0;
				}else{
					if(parseFloat(s.getAt(i).data.ctgPuntuacionLimiteInferior) > parseFloat(s.getAt(i).data.ctgPuntuacionLimiteSuperior))
						b=0;
					if( parseFloat(s.getAt(i).data.ctgPuntuacionLimiteSuperior) >= parseFloat(s.getAt(j).data.ctgPuntuacionLimiteSuperior))
						b=0;
				}
				if(parseFloat(s.getAt(i).data.ctgPuntuacionPuntuacion) > 100) b = 0;
			}
		}
		if(b == 0){
			Efx.message.alertInvalid("Valores inv\u00E1lidos <br />" +
					"* L\u00EDmite Superior no puede ser menor que el L\u00EDmite Inferior <br />" +
					"* Los valores de Puntuaci\u00F3n no pueden ser mayor que 100.00");
			retorno = false;
		}
	}
	else{
		Efx.message.alertInvalid("No hay cambios por guardar");
		retorno = false;
	}
	return retorno;
}


function validarDelete(){
	var s = Ext.getCmp("gridPuntuacion").store;
	var retorno = true;
	if(s.getCount() <= 1){
			Efx.message.alertInvalid("No se Puede Realizar la Eliminaci\u00F3n <br> Debe Existir Al Menos Un Registro.");
			retorno = false;
	}
	return retorno;
}


function onValidateEdit(editing, e, opts){
	var s = this.getView().store;
	if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) this.down("#save").enable();
	else this.down("#save").disable();

	var currentRow = e.grid.getStore().getAt(e.rowIdx);;
	var nextRow = e.grid.getStore().getAt(e.rowIdx + 1);
	if(nextRow){
		var currentValue = currentRow.get("ctgPuntuacionLimiteSuperior");
		if(Ext.isEmpty(currentValue) || isNaN(currentValue)) currentVaule = 0;
		else currentValue = parseFloat(currentValue);
		nextRow.set("ctgPuntuacionLimiteInferior", currentValue + CtgPuntuacion.getNextValue());
	}

}

function saveAll(ctgCatalogoCodigo){
	Efx.message.progress("Guardando Informaci\u00F3n...");
	Ext.Ajax.request({
		timeout: Efx.constants.TIMEOUT_SECONDS,
		url: Efx.constants.CONTEXT_PATH + '/admin/puntuacion/save',
		params: {
			jsonString: Ext.encode(Ext.pluck(Ext.getCmp("gridPuntuacion").getStore().getRange(), 'data')),
			ctgCatalogoCodigo: ctgCatalogoCodigo
		},
		callback: function(options,success,response){
			Ext.Msg.hide();
			if(success){
				var jsonObject = Efx.utils.ajaxRequestGetJson(response);
				if(jsonObject && jsonObject.success){
					if(jsonObject.data)
						Ext.getCmp("gridPuntuacion").store.loadData(jsonObject.data);
					Efx.message.alert(jsonObject.message);
				}else{
					Efx.message.alertInvalid(jsonObject ? (jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE) : Efx.constants.DEFAULT_ERROR_MESSAGE);
				}
			}
		}
	});
}

function refresh(ctgCatalogoCodigo){
	Efx.message.progress("Cargando Informaci\u00F3n...");
	Ext.Ajax.request({
		timeout: Efx.constants.TIMEOUT_SECONDS,
		url: Efx.constants.CONTEXT_PATH + "/admin/puntuacion/loadPuntuacion",
		params: {
			ctgCatalogoCodigo: ctgCatalogoCodigo
		},
		callback: function(options,success,response){
			Ext.Msg.hide();
			if(success){
				var jsonObject = Efx.utils.ajaxRequestGetJson(response);
				if(jsonObject && jsonObject.success){
					if(jsonObject.data)
						Ext.getCmp("gridPuntuacion").store.loadData(jsonObject.data);
				}else{
					Efx.message.alertInvalid(jsonObject ? (jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE) : Efx.constants.DEFAULT_ERROR_MESSAGE);
				}
			}
		}
	});
}

function deleteAll(ctgCatalogoCodigo,fila,filasBeforeDelete,limiteInferiorToSet){
	Efx.message.progress("Guardando Informaci\u00F3n...");
	Ext.Ajax.request({
		timeout: Efx.constants.TIMEOUT_SECONDS,
		url: Efx.constants.CONTEXT_PATH + '/admin/puntuacion/delete',
		params: {
			jsonString: Ext.encode(Ext.pluck(Ext.getCmp("gridPuntuacion").getStore().getRange(), 'data')),
			ctgCatalogoCodigo: ctgCatalogoCodigo,
			fila: fila,
			filasBeforeDelete: filasBeforeDelete,
			limiteInferiorToSet: limiteInferiorToSet
		},
		callback: function(options,success,response){
			Ext.Msg.hide();
			if(success){
				var jsonObject = Efx.utils.ajaxRequestGetJson(response);
				if(jsonObject && jsonObject.success){
					if(jsonObject.data){
						Ext.getCmp("gridPuntuacion").store.loadData(jsonObject.data);
					}
					Efx.message.alert(jsonObject.message);
				}else{
					Efx.message.alertInvalid(jsonObject ? (jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE) : Efx.constants.DEFAULT_ERROR_MESSAGE);
				}
			}
		}
	});
}
