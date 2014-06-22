KycReferenciaBancaria = function(){
	var configWindow = {
		add: "kycReferenciaBancariaAgregarTop",
		edit: "kycReferenciaBancariaEditarTop",
		save: "kycReferenciaBancariaGuardarTop",
		remove: "kycReferenciaBancariaEliminarTop",
		grid: "kycReferenciaBancariaGrid",
		form: "kycReferenciaBancariaForm"
	};
	var configWindowBottom = {
			add: "kycReferenciaBancariaAgregarBottom",
			edit: "kycReferenciaBancariaEditarBottom",
			save: "kycReferenciaBancariaGuardarBottom",
			remove: "kycReferenciaBancariaEliminarBottom"
	};
	return {
		agregarReferenciaBancaria: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarReferenciaBancaria: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarReferenciaBancaria: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycReferencias/delete",
					params: {
						kycReferenciaId: Efx.utils.getValue("kycReferenciaBancariaId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoReferencia : Efx.constants.codes.REFERENCIA_BANCARIO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycReferenciaBancariaForm");
								if(jsonObject.kycReferenciaBancaria){
			    					Ext.getCmp("kycReferenciaBancariaGrid").getStore().loadData(jsonObject.kycReferenciaBancaria);
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
		guardarReferenciaBancaria: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycReferenciaBancariaForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycReferencias/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycReferenciaBancaria.kyc.kycId": EfxKYC.getKycId(),
    				"kycReferenciaBancaria.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycReferenciaBancaria.ctgTipoReferencia.ctgCatalogoId" :Efx.constants.codes.REFERENCIA_BANCARIO,
    				 kycTipoReferencia : Efx.constants.codes.REFERENCIA_BANCARIO,
    				 ctgTipoPersonaCodigo: EfxKYC.getCtgTipoPersonaCodigo()

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycReferenciaBancariaForm", true);
    				if(action.result.kycReferenciaBancaria){
    					Ext.getCmp("kycReferenciaBancariaGrid").getStore().loadData(action.result.kycReferenciaBancaria);
    					Ext.getCmp("kycReferenciaBancariaGrid").getSelectionModel().select(action.result.kycReferenciaBancariaIndex);
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
				title: "REFERENCIAS",
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
							   id: "kycReferenciaBancariaAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycReferenciaBancaria.agregarReferenciaBancaria
						   },{
					    	   text: "Editar",
					    	   id: "kycReferenciaBancariaEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycReferenciaBancaria.editarReferenciaBancaria
					       },{
					    	   text: "Guardar",
					    	   id: "kycReferenciaBancariaGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycReferenciaBancaria.guardarReferenciaBancaria
					       },{
					    	   text: "Eliminar",
					    	   id: "kycReferenciaBancariaEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycReferenciaBancaria.eliminarReferenciaBancaria
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
							   id: "kycReferenciaBancariaAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycReferenciaBancaria.agregarReferenciaBancaria
						   },{
					    	   text: "Editar",
					    	   id: "kycReferenciaBancariaEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycReferenciaBancaria.editarReferenciaBancaria
					       },{
					    	   text: "Guardar",
					    	   id: "kycReferenciaBancariaGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycReferenciaBancaria.guardarReferenciaBancaria
					       },{
					    	   text: "Eliminar",
					    	   id: "kycReferenciaBancariaEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycReferenciaBancaria.eliminarReferenciaBancaria
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycReferenciaBancariaGrid",
						height: 150,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycReferenciaBancaria || [],
					    	fields: [
				    	         "kycReferenciaBancaria.kycReferenciaId",
				    	         "kycReferenciaBancaria.kycReferenciaNombre1",
				    	         "kycReferenciaBancaria.kycReferenciaTipo",
				    	         "kycReferenciaBancaria.kycReferenciaTelefono1",
				    	         "kycReferenciaBancaria.kycReferenciaTelefono2",
				    	         "kycReferenciaBancaria.kycFechaActualizacion"
			    	        ]
					    }),
					    columns: [
				            {header: "Nombre/Instituci\u00f3n",  dataIndex: "kycReferenciaBancaria.kycReferenciaNombre1", flex:1, minWidth: 120}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycReferenciaBancariaForm", record.data);
					    			Efx.form.setDisable("kycReferenciaBancariaForm");
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
						id: "kycReferenciaBancariaForm",
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
							width: 160,
							selectOnFocus: true,
							enforceMaxLength: true,
							maxLength: 200,
							typeAhead: true,
							minChars: 1,
							queryMode: "local",
							forceSelection: true,
							allowEnable: true
						},
						items: [
				        	 {
					        	xtype: "label",
					        	id: "kycFechaActualizacionTitle",
					        	text: "",
					        	cls: "x-form-item label_header lblHeaderRed",
					        	colspan: 8,
					        	hidden: true,
					        	width: 730
					        },{
								xtype: "label",
								text: "REFERENCIAS BANCARIAS",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "Nombre/Instituci\u00f3n", cls: "x-form-item label_spacing", colspan :6},
							{
								xtype: "textfield",
								name: "kycReferenciaBancaria.kycReferenciaNombre1",
								maxLength: 50,
								width: 715,
								allowBlank: false,
								colspan:6
							},{
								xtype: "hidden",
								id: "kycReferenciaBancariaId",
								name: "kycReferenciaBancaria.kycReferenciaId"
							},{
								xtype: "hidden",
								id: "ctgTipoReferenciaId",
								name: "kycReferenciaBancaria.ctgTipoReferencia.ctgCatalogoId"
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