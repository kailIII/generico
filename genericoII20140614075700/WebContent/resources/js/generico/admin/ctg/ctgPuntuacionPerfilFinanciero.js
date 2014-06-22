CtgPuntuacionPerfilFinanciero = function(){
	return {
		init: function(ctgCatalogoCodigo, title, porcentajePuntuacion, labelMin, labelMax, limiteSum, lista, contextPath){
			var config = {};

			Ext.define('CtgPuntuacion', {
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
										iconCls: Efx.constants.REFRESH_ICON,
										text: 'Recargar',
										itemId: 'refresh',
										scope: this,
										handler: this.onRefresh
									},
									{
										iconCls:Efx.constants.SAVE_ICON,
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
								flex: 1,
								dataIndex: 'ctgPuntuacionLimiteInferior',
								draggable: false,
								sortable: true,

								renderer: function(value, options, record ,index,row,store){
									var retorno="";
									 var limiteAnterior  = "";
									 var gp = Ext.getCmp("gridPuntuacion").store;
										limiteAnterior = gp.getAt(0).data.ctgPuntuacionLimiteSuperior;
										if(value==1)
										retorno = "MAS DE  ";
										else if(value==2)retorno = "MAS DE  ";

										else if(value==3) retorno = "MENOR O IGUAL A  ";

									retorno += "$" + Ext.util.Format.kycMoney(record.get("ctgPuntuacionLimiteSuperior"));
									if(value == 2) {
										retorno += " Y MENOR o IGUAL A $ "+Ext.util.Format.kycMoney(limiteAnterior);
									}

									return retorno;
								}
							},{
								header: labelMax,
								dataIndex: 'ctgPuntuacionLimiteSuperior',
								draggable: false,
								sortable: true,
								align: "right",
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
									allowDecimals: false,
									minValue: 0,
									maxLength: 6,
									enforceMaxLength :true,
									selectOnFocus: false
								}
							},
							{
								header: 'Puntuaci\u00F3n',
								width: 120,
								dataIndex: 'ctgPuntuacionPuntuacion',
								align: "right",
								sortable: true,
								draggable: false,
								align: "right",
								renderer: function(value){
									return Ext.util.Format.kycMoney(value);
								},
								field: {
									xtype:'numericfield',
									fieldCls: "number-field",
									width: 30,
									enableKeyEvents: true,
									hideTrigger: true,
									allowBlank: false,
									triggerAction : 'all',
									allowNegative: false,
									allowDecimals: false,
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



function validar(){
	var s = Ext.getCmp("gridPuntuacion").store;
	var retorno = true;
	if(s.getUpdatedRecords().length >0){
		//validar que los rangos son correctos
		var total=0;
		for(var i = 0; i < s.getCount(); i++){
			if(parseInt(s.getAt(i).data.ctgPuntuacionPuntuacion) > 100){
				Efx.message.alertInvalid("Valores inv\u00E1lidos <br />" +
						"* Los valores de Puntuaci\u00F3n no pueden ser mayor que 100.00");
				return false;
			};
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

function onValidateEdit(editing, e, opts){
	var s = this.getView().store;
	if(s.getUpdatedRecords().length >0) this.down("#save").enable();
	else this.down("#save").disable();
}

String.prototype.capitalize = function(){
	return this.toLowerCase().replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};
