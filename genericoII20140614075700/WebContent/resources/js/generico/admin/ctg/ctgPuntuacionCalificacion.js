CtgPuntuacionCalificacion = function(){
	var nextValue = 0;
	return {
		setNextValue: function(value){nextValue = parseFloat(value);},
		getNextValue: function(){return nextValue;},

		init: function(ctgCatalogoCodigo, title, porcentajePuntuacion, labelMin, labelMax, limiteSum, lista, contextPath){
			var config = {};
			CtgPuntuacionCalificacion.setNextValue(limiteSum);
			Ext.define('CtgPuntuacion', {
				extend: 'Ext.data.Model',
				idProperty: 'ctgPuntuacionId',
				fields: [
					{name: 'ctgPuntuacionId'},
					{name: 'ctgPuntuacionLimiteInferior'},
					{name: 'ctgPuntuacionLimiteSuperior'},
					{name: 'ctgPuntuacionPuntuacion'},
					{name: 'ctgTipo'},
					{name: 'ctgTipoNombre'},
					{name: 'ctgPuntuacionScoreNombre'}
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
								editor: {
									xtype: 'numberfield',
									allowBlank:false,
									hideTrigger: true,
									regex: Efx.constants.REGEXP_NO_INI_END_BLANKS,
									regexText: Efx.constants.MSG_NO_INI_END_BLANKS
								}
							},{
								header: labelMax,
								width: 120,
								dataIndex: 'ctgPuntuacionLimiteSuperior',
								align: "right",
								draggable: false,
								sortable: true,
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
									minValue: 0,
									maxLength: 4,
									enforceMaxLength :true,
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
								renderer: function(value){
									if(value == -1) return Efx.constants.EFX_EXPERTO_RECHAZAR;
									else if (value == 0 ) return Efx.constants.EFX_EXPERTO_PENDIENTE;
									else if (value == 1) return Efx.constants.EFX_EXPERTO_APROBAR;

								}
							},
							/*{
								header: 'Score',
								width: 120,
								dataIndex: 'ctgPuntuacionPuntuacion',
								align: "right",
								sortable: true,
								draggable: false,
								renderer: function(value,row){
									if(value == -1) {
										row.style= 'background:red';
										return Efx.constants.EFX_DAVIVIENDA_EXPERTO_RECHAZAR+'';}
									else if (value == 0 ){
										row.style= 'background:yellow';
										return Efx.constants.EFX_DAVIVIENDA_EXPERTO_PENDIENTE;}
									else if (value == 1){
										row.style= 'background:#58F425';
										return Efx.constants.EFX_DAVIVIENDA_EXPERTO_APROBAR;}

								}*/
							{
								header: 'Score',
								width: 120,
								dataIndex: 'ctgPuntuacionScoreNombre',
								align: "right",
								sortable: true,
								draggable: false,
								field: {
									xtype:'textfield',
									width: 30,
									enableKeyEvents: true,
									hideTrigger: true,
									allowBlank: false,
									triggerAction : 'all',
									//allowDecimals: false,
									selectOnFocus: false
								},
								renderer: function(rowIndex,row,record){
									var res = record.get("ctgPuntuacionScoreNombre");
									//var valorPuntuacion = record.get("ctgPuntuacionPuntuacion");
									/*if(valorPuntuacion == -1) {
										row.style= 'background:red';
										return res;}
									else if (valorPuntuacion == 0 ){
										row.style= 'background:yellow';
										return res;}
									else if (valorPuntuacion == 1){
										row.style= 'background:#58F425';
										return res;}*/
									return res;

								}
							}
						]
					});

					this.callParent();
					this.on('edit', onValidateEdit, this);
					this.on('beforeedit', disableEdit, this);
				},
				onRefresh: function(){
					this.editing.cancelEdit();
					refresh(ctgCatalogoCodigo);
					this.down("#save").disable();
				},
			    onSaveChange: function(){
			    	if(validar())
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
							{xtype:'label',text: title , cls: "ctg_label"}
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
							model: "CtgPuntuacion",
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
	//colIdx -> segun columnas definidas en el grid (validacion length de valores en txt)
	if(editor.rowIdx!=0 && editor.colIdx==4) return false;
}

function isInt(n) {
	   if(typeof n == 'number' && Math.Round(n) % 1 == 0) {
	       return true;
	   } else {
	       return false;
	   }
	}

function validar(){
	var s = Ext.getCmp("gridPuntuacion").store;
	var b=1;
	var j=0;
	var retorno = true;
	if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0){
		//validar que los rangos son correctos
		for(var i = 0; i < s.getCount(); i++){
			j=i+1;
			if(i<s.getCount()-1){
				if(parseFloat(s.getAt(i).data.ctgPuntuacionLimiteInferior) > parseFloat(s.getAt(i).data.ctgPuntuacionLimiteSuperior))
					b=0;
				if( parseFloat(s.getAt(i).data.ctgPuntuacionLimiteSuperior) >= parseFloat(s.getAt(j).data.ctgPuntuacionLimiteSuperior))
					b=0;
			}
			//if(parseFloat(s.getAt(i).data.ctgPuntuacionLimiteInferior) > 100 ||
				//	parseInt(s.getAt(i).data.ctgPuntuacionLimiteSuperior) > 100) b = 0;
		}
		if(b==0){
			Efx.message.alertInvalid("L\u00EDmites con valores inv\u00E1lidos <br />" +
					"* L\u00EDmite Superior no puede ser menor que el L\u00EDmite Inferior <br />" );
			retorno = false;
		}
	}
	else{
		Efx.message.alertInvalid("No hay cambios por guardar");
		retorno = false;
	}
	return retorno;
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
		nextRow.set("ctgPuntuacionLimiteInferior", currentValue +1);
		//		nextRow.set("ctgPuntuacionLimiteInferior", currentValue + 0.01);
		//nextRow.set("ctgPuntuacionLimiteInferior", currentValue +CtgPuntuacionCalificacion.getNextValue());
	}
}

String.prototype.capitalize = function(){
	return this.toLowerCase().replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};
