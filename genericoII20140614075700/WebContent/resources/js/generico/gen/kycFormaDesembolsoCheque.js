KycFormaDesembolsoCheque = function(){
	var configWindow = {
		add: "kycFormaDesembolsoAgregarTop",
		cancel: "kycFormaDesembolsoCancelarTop",
		edit: "kycFormaDesembolsoEditarTop",
		save: "kycFormaDesembolsoGuardarTop",
		remove: "kycFormaDesembolsoEliminarTop",
		grid: "kycFormaDesembolsoGrid",
		form: "kycFormaDesembolsoForm"
	};
	var configWindowBottom = {
			add: "kycFormaDesembolsoAgregarBottom",
			cancel: "kycFormaDesembolsoCancelarBottom",

			edit: "kycFormaDesembolsoEditarBottom",
			save: "kycFormaDesembolsoGuardarBottom",
			remove: "kycFormaDesembolsoEliminarBottom"
	};
	return {
		agregarFormaDesembolsoCheque: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarFormaDesembolsoCheque: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		cancelarFormaDesembolsoCheque: function(){
			Efx.form.switchButton(configWindow, "cancel");
			Efx.form.switchButton(configWindowBottom, "cancel");
		},
		eliminarFormaDesembolsoCheque: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycFormaDesembolso/delete",
					params: {
						kycId: EfxKYC.getKycId(),
						kycFormaDesembolsoId: Efx.utils.getValue("kycFormaDesembolsoId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						ctgTipoDeposito : Efx.constants.codes.CHEQUE,
	    				ctgTipoPersonaCodigo: EfxKYC.getCtgTipoPersonaCodigo()
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycFormaDesembolsoForm");
								if(jsonObject.kycFormaDesembolso){
			    					Ext.getCmp("kycFormaDesembolsoGrid").getStore().loadData(jsonObject.kycFormaDesembolso);
								}
								return;
							}
							jsonObject = jsonObject || {};
							Efx.message.alertInvalid(jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE);
							return;
						}
						Efx.message.alertInvalid(Efx.constants.DEFAULT_ERROR_MESSAGE);
					}
				});
			});
		},
		guardarFormaDesembolsoCheque: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycFormaDesembolsoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycFormaDesembolso/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycFormaDesembolso.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycFormaDesembolso.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				ctgTipoDeposito : Efx.constants.codes.CHEQUE,
    				 ctgTipoPersonaCodigo: EfxKYC.getCtgTipoPersonaCodigo()
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycFormaDesembolsoForm", true);
    				if(action.result.kycFormaDesembolso){
    					Ext.getCmp("kycFormaDesembolsoGrid").getStore().loadData(action.result.kycFormaDesembolso);
    					Ext.getCmp("kycFormaDesembolsoGrid").getSelectionModel().select(action.result.kycFormaDesembolsoIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		init: function(config){
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				flex: 1,
				title: "CR\u00c9DITO PERSONAL - FORMA DE DESEMBOLSO",
				autoScroll: true,
				xtype: "panel",
				layout: {
				    type: "vbox",
				    align : "center",
				    pack  : "start"
				},
				defaults: {width: 730, margins: "5 0 5 0"},
				dockedItems: [
					{
						xtype: "toolbar",
						dock: "top",
						hidden: EfxKYC.getKycVigente() === false,
						items: [
						   '->',
						   {
							   text: "Nuevo",
							   id: "kycFormaDesembolsoAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycFormaDesembolsoCheque.agregarFormaDesembolsoCheque
						   },{
					    	   text: "Editar",
					    	   id: "kycFormaDesembolsoEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycFormaDesembolsoCheque.editarFormaDesembolsoCheque
					       },{
					    	   text: "Guardar",
					    	   id: "kycFormaDesembolsoGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycFormaDesembolsoCheque.guardarFormaDesembolsoCheque
					       },{
					    	   text: "Eliminar",
					    	   id: "kycFormaDesembolsoEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycFormaDesembolsoCheque.eliminarFormaDesembolsoCheque
					       },{
					    	   text: "Cancelar",
					    	   id: "kycFormaDesembolsoCancelarTop",
							   iconCls: Efx.constants.icons.CANCEL_ICON,
							   handler: KycFormaDesembolsoCheque.cancelarFormaDesembolsoCheque
					       }
					    ]
					},{
			        	xtype: "toolbar",
			        	dock: "bottom",
			        	hidden: EfxKYC.getKycVigente() === false,
			        	bodyStyle: "border: solid",
			        	items: [
			        	   '->',
			        	   {
							   text: "Nuevo",
							   id: "kycFormaDesembolsoAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycFormaDesembolsoCheque.agregarFormaDesembolsoCheque
						   },{
					    	   text: "Editar",
					    	   id: "kycFormaDesembolsoEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycFormaDesembolsoCheque.editarFormaDesembolsoCheque
					       },{
					    	   text: "Guardar",
					    	   id: "kycFormaDesembolsoGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycFormaDesembolsoCheque.guardarFormaDesembolsoCheque
					       },{
					    	   text: "Eliminar",
					    	   id: "kycFormaDesembolsoEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycFormaDesembolsoCheque.eliminarFormaDesembolsoCheque
					       },{
					    	   text: "Cancelar",
					    	   id: "kycFormaDesembolsoCancelarBottom",
							   iconCls: Efx.constants.icons.CANCEL_ICON,
							   handler: KycFormaDesembolsoCheque.cancelarFormaDesembolsoCheque
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycFormaDesembolsoGrid",
						height: 150,
						width: 700,
						collapsible: true,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycFormaDesembolso || [],
					    	fields: [
									"kycFormaDesembolso.kycFormaDesembolsoId",
									"kycFormaDesembolso.kycFormaDesembolsoInstitucion",
									"kycFormaDesembolso.kycFormaDesembolsoMonto",
									"kycFormaDesembolso.ctgFormaDesembolso.ctgCatalogoId",
									"kycFormaDesembolso.kycFechaActualizacion"
			    	        ]
					    }),
					    columns: [
						    {header: "Instituci\u00f3n",  dataIndex: "kycFormaDesembolso.kycFormaDesembolsoInstitucion", flex: 2,width: 120},
				            {header: "Monto",  dataIndex: "kycFormaDesembolso.kycFormaDesembolsoMonto", flex:1, minWidth: 120}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycFormaDesembolsoForm", record.data);
					    			Efx.form.setDisable("kycFormaDesembolsoForm");
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    	}
					    }
					},{
			        	xtype: "form",
						id: "kycFormaDesembolsoForm",
						flex: 1,
					    border: false,
					    autoScroll: true,
					    listeners: {
							render: function(){
							if (config.banderaCiti == '1' && config.banderaCheque == '0' &&
								config.banderaSinpe == '1'){
								Ext.getCmp("kycFormaDesembolsoAgregarTop").disable();
								Ext.getCmp("kycFormaDesembolsoEditarTop").disable();
								Ext.getCmp("kycFormaDesembolsoGuardarTop").disable();
								Ext.getCmp("kycFormaDesembolsoEliminarTop").disable();
								Ext.getCmp("kycFormaDesembolsoCancelarTop").disable();
								Ext.getCmp("kycFormaDesembolsoAgregarBottom").disable();
								Ext.getCmp("kycFormaDesembolsoEditarBottom").disable();
								Ext.getCmp("kycFormaDesembolsoGuardarBottom").disable();
								Ext.getCmp("kycFormaDesembolsoEliminarBottom").disable();
								Ext.getCmp("kycFormaDesembolsoCancelarBottom").disable();
								Efx.utils.setVisible("labelFormularioDeshabilitado", true);
								}
					    	}
						},
						layout: {
							type: "table",
							columns: 6,
							tableAttrs: {
					            style: {width: "730px"},
					            align: "center"
					        }
						},
						defaults: {
							width: 230,
							selectOnFocus: true,
							enforceMaxLength: true,
							maxLength: 200,
							typeAhead: true,
							minChars: 1,
							queryMode: "local",
							forceSelection: true,
							allowEnable: true,
							colspan:2
						},
						items: [
								{
					        	xtype: "label",
					        	id: "kycFechaActualizacionTitle",
					        	text: "",
					        	cls: "x-form-item label_header lblHeaderRed",
					        	colspan: 6,
					        	hidden: true,
					        	width: 730
					        },
					        {xtype:"label", id: "labelFormularioDeshabilitado", hidden: true, style: "color: red; text-align: center" ,text:"SOLO SE PERMITEN INGRESAR M\u00c1XIMO, DOS FORMAS DE DESEMBOLSO", cls: 'x-form-item label_spacing', colspan: 6, width: 700},
					        {
								xtype: "label",
								text: "CHEQUE (CONSOLIDACI\u00d3N DE DEUDAS)",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype:"label", text:"Instituci\u00f3n", cls: 'x-form-item label_spacing', colspan: 4},
							{xtype:"label", text:"Monto", cls: 'x-form-item label_spacing', colspan: 2},
							{
								xtype: "textfield",
								id:"kycFormaDesembolsoInstitucion",
								name: "kycFormaDesembolso.kycFormaDesembolsoInstitucion",
								colspan:4,
								width: 480,
								allowBlank: false
							},{
								xtype: "numericfield",
								id:"kycFormaDesembolsoMonto",
								allowBlank: false,
								name: "kycFormaDesembolso.kycFormaDesembolsoMonto",
							},
							{
								xtype: "hidden",
								id: "kycFormaDesembolsoId",
								name: "kycFormaDesembolso.kycFormaDesembolsoId"
							},{
								xtype: "hidden",
								id: "kycFechaActualizacion",
								listeners: {
									change: function(){
										var value = this.getValue();
										Efx.utils.setVisible("kycFechaActualizacionTitle", !Ext.isEmpty(value));
										Efx.utils.setText("kycFechaActualizacionTitle", "FORMULARIO ACTUALIZADO EL: " + Ext.util.Format.kycFormatDateYmdHis_d_m_Y_H_i(value));
									}
								}
							}
						]
			        }
				]
			});
			return configToReturn;
		}
	};
}();