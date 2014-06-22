KycDesgloceCheque = function(){
	var configWindow = {
		add: "kycDesgloceChequeAgregarTop",
		edit: "kycDesgloceChequeEditarTop",
		remove: "kycDesgloceChequeEliminarTop",
		grid: "kycDesgloceChequeGrid",
		save: "kycDesgloceChequeGuardarTop",
		form: "kycDesgloceChequeForm"
	};
	var configWindowBottom = {
			add: "kycDesgloceChequeAgregarBottom",
			edit: "kycDesgloceChequeEditarBottom",
			remove: "kycDesgloceChequeEliminarBottom",
			save: "kycDesgloceChequeGuardarBottom"
	};
	return {
		agregarDesgloceCheque: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarDesgloceCheque: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarDesgloceCheque: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycDesgloceCheque/delete",
					params: {
						kycDesgloceChequeId: Efx.utils.getValue("kycDesgloceChequeId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId()
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycDesgloceChequeForm");
								if(jsonObject.kycDesgloceCheque){
			    					Ext.getCmp("kycDesgloceChequeGrid").getStore().loadData(jsonObject.kycDesgloceCheque);
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
		guardarDesgloceCheque: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycDesgloceChequeForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycDesgloceCheque/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycDesgloceCheque.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycDesgloceCheque.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId()
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycDesgloceChequeForm", true);
    				if(action.result.kycDesgloceCheque){
    					Ext.getCmp("kycDesgloceChequeGrid").getStore().loadData(action.result.kycDesgloceCheque);
    					Ext.getCmp("kycDesgloceChequeGrid").getSelectionModel().select(action.result.kycDesgloceCheque);
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
				title: "CR\u00c9DITO PERSONAL - DESGLOCE DE CHEQUES PARA CONSOLIDAR DEUDAS",
				autoScroll: true,
				xtype: "panel",
				layout: {
				    type: "vbox",
				    align : "center",
				    pack  : "start"
				},
				defaults: {width: 800, margins: "5 0 5 0"},
				dockedItems: [
					{
						xtype: "toolbar",
						dock: "top",
						hidden: EfxKYC.getKycVigente() === false,
						items: [
						   '->',
						   {
							   text: "Nuevo",
							   id: "kycDesgloceChequeAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycDesgloceCheque.agregarDesgloceCheque
						   },{
					    	   text: "Editar",
					    	   id: "kycDesgloceChequeEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycDesgloceCheque.editarDesgloceCheque
					       },{
					    	   text: "Eliminar",
					    	   id: "kycDesgloceChequeEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycDesgloceCheque.eliminarDesgloceCheque
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycDesgloceChequeGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycDesgloceCheque.guardarDesgloceCheque
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
							   id: "kycDesgloceChequeAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycDesgloceCheque.agregarDesgloceCheque
						   },{
					    	   text: "Editar",
					    	   id: "kycDesgloceChequeEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycDesgloceCheque.editarDesgloceCheque
					       },{
					    	   text: "Eliminar",
					    	   id: "kycDesgloceChequeEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycDesgloceCheque.eliminarDesgloceCheque
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycDesgloceChequeGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycDesgloceCheque.guardarDesgloceCheque
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycDesgloceChequeGrid",
						height: 100,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycDesgloceCheque || [],
					    	fields: [
					    	     	"kycDesgloceCheque.kycDesgloceChequeId",
									"kycDesgloceCheque.kycDesgloceChequeInstitucion",
									"kycDesgloceCheque.kycDesgloceChequeMonto",
									"kycDesgloceCheque.kycSolicitudDesembolso"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre de la Instituci\u00f3n",  dataIndex: "kycDesgloceCheque.kycDesgloceChequeInstitucion", flex: 3, minWidth: 200},
					              {header: "Monto por Deuda",  dataIndex: "kycDesgloceCheque.kycDesgloceChequeMonto", flex: 1}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycDesgloceChequeForm", record.data);
					    			Efx.form.setDisable("kycDesgloceChequeForm");
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
						id: "kycDesgloceChequeForm",
						flex: 1,
					    border: false,
					    autoScroll: true,
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
					        },{
								xtype: "label",
								text: "DESGLOCE DE CHEQUES PARA CONSOLIDAR DEUDAS",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype : "label", text : "Nombre de la Instituci\u00f3n", cls : "x-form-item label_spacing", colspan:4},
							{xtype : "label", text : "Monto por Deuda", cls : "x-form-item label_spacing", colspan:2},
							{
								xtype : "textfield",
								id : "kycDesgloceChequeInstitucion",
								name : "kycDesgloceCheque.kycDesgloceChequeInstitucion",
								allowBlank : false,
								maxLength: 150,
								width: 480,
								colspan:4
							},{
								xtype : "numericfield",
								id : "kycDesgloceChequeMonto",
								name : "kycDesgloceCheque.kycDesgloceChequeMonto",
								maxLength: 20,
								colspan:2
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycDesgloceChequeId",
								name: "kycDesgloceCheque.kycDesgloceChequeId"
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