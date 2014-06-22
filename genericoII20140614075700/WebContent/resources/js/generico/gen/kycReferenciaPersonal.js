KycReferenciaPersonal = function(){
	var configWindow = {
		add: "kycReferenciaPersonalAgregarTop",
		edit: "kycReferenciaPersonalEditarTop",
		save: "kycReferenciaPersonalGuardarTop",
		remove: "kycReferenciaPersonalEliminarTop",
		grid: "kycReferenciaPersonalGrid",
		form: "kycReferenciaPersonalForm"
	};
	var configWindowBottom = {
			add: "kycReferenciaPersonalAgregarBottom",
			edit: "kycReferenciaPersonalEditarBottom",
			save: "kycReferenciaPersonalGuardarBottom",
			remove: "kycReferenciaPersonalEliminarBottom"
	};
	return {
		agregarReferenciaPersonal: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarReferenciaPersonal: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarReferenciaPersonal: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycReferencias/delete",
					params: {
						kycReferenciaId: Efx.utils.getValue("kycReferenciaPersonalId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoReferencia : Efx.constants.codes.REFERENCIA_PERSONAL
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycReferenciaPersonalForm");
								if(jsonObject.kycReferenciaPersonal){
			    					Ext.getCmp("kycReferenciaPersonalGrid").getStore().loadData(jsonObject.kycReferenciaPersonal);
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
		guardarReferenciaPersonal: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycReferenciaPersonalForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycReferencias/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycReferenciaPersonal.kyc.kycId": EfxKYC.getKycId(),
    				"kycReferenciaPersonal.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycReferenciaPersonal.ctgTipoReferencia.ctgCatalogoId" :Efx.constants.codes.REFERENCIA_PERSONAL,
    				 kycTipoReferencia : Efx.constants.codes.REFERENCIA_PERSONAL,
    				 ctgTipoPersonaCodigo: EfxKYC.getCtgTipoPersonaCodigo()

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycReferenciaPersonalForm", true);
    				if(action.result.kycReferenciaPersonal){
    					Ext.getCmp("kycReferenciaPersonalGrid").getStore().loadData(action.result.kycReferenciaPersonal);
    					Ext.getCmp("kycReferenciaPersonalGrid").getSelectionModel().select(action.result.kycReferenciaPersonalIndex);
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
							   id: "kycReferenciaPersonalAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycReferenciaPersonal.agregarReferenciaPersonal
						   },{
					    	   text: "Editar",
					    	   id: "kycReferenciaPersonalEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycReferenciaPersonal.editarReferenciaPersonal
					       },{
					    	   text: "Guardar",
					    	   id: "kycReferenciaPersonalGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycReferenciaPersonal.guardarReferenciaPersonal
					       },{
					    	   text: "Eliminar",
					    	   id: "kycReferenciaPersonalEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycReferenciaPersonal.eliminarReferenciaPersonal
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
							   id: "kycReferenciaPersonalAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycReferenciaPersonal.agregarReferenciaPersonal
						   },{
					    	   text: "Editar",
					    	   id: "kycReferenciaPersonalEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycReferenciaPersonal.editarReferenciaPersonal
					       },{
					    	   text: "Guardar",
					    	   id: "kycReferenciaPersonalGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycReferenciaPersonal.guardarReferenciaPersonal
					       },{
					    	   text: "Eliminar",
					    	   id: "kycReferenciaPersonalEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycReferenciaPersonal.eliminarReferenciaPersonal
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycReferenciaPersonalGrid",
						height: 150,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycReferenciaPersonal || [],
					    	fields: [
				    	         "kycReferenciaPersonal.kycReferenciaId",
				    	         "kycReferenciaPersonal.kycReferenciaNombre1",
				    	         "kycReferenciaPersonal.kycReferenciaTipo",
				    	         "kycReferenciaPersonal.kycReferenciaTelefono1",
				    	         "kycReferenciaPersonal.kycReferenciaTelefono2",
				    	         "kycReferenciaPersonal.kycFechaActualizacion"
			    	        ]
					    }),
					    columns: [
				            {header: "Nombre completo",  dataIndex: "kycReferenciaPersonal.kycReferenciaNombre1", flex:1, minWidth: 120},
				            {header: "N\u00famero telef\u00f3nico ",  dataIndex: "kycReferenciaPersonal.kycReferenciaTelefono1", width: 120}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycReferenciaPersonalForm", record.data);
					    			Efx.form.setDisable("kycReferenciaPersonalForm");
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
						id: "kycReferenciaPersonalForm",
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
								text: "REFERENCIAS PERSONALES",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "Nombre completo", cls: "x-form-item label_spacing", colspan:4},
							{xtype: "label", text: "Tel\u00e9fono ", cls: "x-form-item label_spacing" ,colspan :2},
							{
								xtype: "textfield",
								name: "kycReferenciaPersonal.kycReferenciaNombre1",
								maxLength: 50,
								width: 480,
								colspan:4,
								allowBlank: false
							},{
								xtype: "textfield",
								name: "kycReferenciaPersonal.kycReferenciaTelefono1",
								maxLength: 8,
								minLength:8,
								vtype:"validceros",
								allowBlank: false,
								colspan:2
							},{
								xtype: "hidden",
								id: "kycReferenciaPersonalId",
								name: "kycReferenciaPersonal.kycReferenciaId"
							},{
								xtype: "hidden",
								id: "ctgTipoReferenciaId",
								name: "kycReferenciaPersonal.ctgTipoReferencia.ctgCatalogoId"
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