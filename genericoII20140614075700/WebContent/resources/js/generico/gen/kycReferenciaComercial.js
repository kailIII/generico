KycReferenciaComercial = function(){
	var configWindow = {
		add: "kycReferenciaComercialAgregarTop",
		edit: "kycReferenciaComercialEditarTop",
		save: "kycReferenciaComercialGuardarTop",
		remove: "kycReferenciaComercialEliminarTop",
		grid: "kycReferenciaComercialGrid",
		form: "kycReferenciaComercialForm"
	};
	var configWindowBottom = {
			add: "kycReferenciaComercialAgregarBottom",
			edit: "kycReferenciaComercialEditarBottom",
			save: "kycReferenciaComercialGuardarBottom",
			remove: "kycReferenciaComercialEliminarBottom"
	};
	return {
		agregarReferenciaComercial: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarReferenciaComercial: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarReferenciaComercial: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycReferencias/delete",
					params: {
						kycId: EfxKYC.getKycId(),
						kycReferenciaId: Efx.utils.getValue("kycReferenciaComercialId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoReferencia : Efx.constants.codes.REFERENCIA_COMERCIAL,
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
								Efx.form.clearAndDisable("kycReferenciaComercialForm");
								if(jsonObject.kycReferenciaComercial){
			    					Ext.getCmp("kycReferenciaComercialGrid").getStore().loadData(jsonObject.kycReferenciaComercial);
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
		guardarReferenciaComercial: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycReferenciaComercialForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycReferencias/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycReferenciaComercial.kyc.kycId": EfxKYC.getKycId(),
    				"kycReferenciaComercial.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycReferenciaComercial.ctgTipoReferencia.ctgCatalogoId" : Efx.constants.codes.REFERENCIA_COMERCIAL,
    				 kycTipoReferencia : Efx.constants.codes.REFERENCIA_COMERCIAL,
    				 ctgTipoPersonaCodigo: EfxKYC.getCtgTipoPersonaCodigo()
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycReferenciaComercialForm", true);
    				if(action.result.kycReferenciaComercial){
    					Ext.getCmp("kycReferenciaComercialGrid").getStore().loadData(action.result.kycReferenciaComercial);
    					Ext.getCmp("kycReferenciaComercialGrid").getSelectionModel().select(action.result.kycReferenciaComercialIndex);
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
							   id: "kycReferenciaComercialAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycReferenciaComercial.agregarReferenciaComercial
						   },{
					    	   text: "Editar",
					    	   id: "kycReferenciaComercialEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycReferenciaComercial.editarReferenciaComercial
					       },{
					    	   text: "Guardar",
					    	   id: "kycReferenciaComercialGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycReferenciaComercial.guardarReferenciaComercial
					       },{
					    	   text: "Eliminar",
					    	   id: "kycReferenciaComercialEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycReferenciaComercial.eliminarReferenciaComercial
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
							   id: "kycReferenciaComercialAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycReferenciaComercial.agregarReferenciaComercial
						   },{
					    	   text: "Editar",
					    	   id: "kycReferenciaComercialEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycReferenciaComercial.editarReferenciaComercial
					       },{
					    	   text: "Guardar",
					    	   id: "kycReferenciaComercialGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycReferenciaComercial.guardarReferenciaComercial
					       },{
					    	   text: "Eliminar",
					    	   id: "kycReferenciaComercialEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycReferenciaComercial.eliminarReferenciaComercial
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycReferenciaComercialGrid",
						height: 150,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycReferenciaComercial || [],
					    	fields: [
				    	         "kycReferenciaComercial.kycReferenciaId",
				    	         "kycReferenciaComercial.kycReferenciaNombre1",
				    	         "kycReferenciaComercial.kycReferenciaTipo",
				    	         "kycReferenciaComercial.kycReferenciaTelefono1",
				    	         "kycReferenciaComercial.kycReferenciaTelefono2",
				    	         "kycReferenciaComercial.kycReferenciaContacto"
			    	        ]
					    }),
					    columns: [
				            {header: "Principales Clientes",  dataIndex: "kycReferenciaComercial.kycReferenciaNombre1", flex:1, minWidth: 120}
				            //{header: "Numero Telefono ",  dataIndex: "kycReferenciaComercial.kycReferenciaTelefono1", width: 120}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycReferenciaComercialForm", record.data);
					    			Efx.form.setDisable("kycReferenciaComercialForm");
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
						id: "kycReferenciaComercialForm",
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
					        	colspan: 6,
					        	hidden: true,
					        	width: 730
					        },{
								xtype: "label",
								text: "REFERENCIAS COMERCIALES",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label", text: "Principales Clientes", cls: "x-form-item label_spacing", colspan :4},
							{xtype: "label", text: "Tel\u00E9fono ", cls: "x-form-item label_spacing" ,colspan :2,listeners: {
								render: function(){
									if(EfxKYC.getCtgTipoPersonaCodigo()==Efx.constants.codes.PERSONA_FISICA){
										this.hide();
									}
								}
							}},
							{
								xtype: "textfield",
								name: "kycReferenciaComercial.kycReferenciaNombre1",
								maxLength: 50,
								width: 480,
								colspan : 4,
								allowBlank: false
							},{
								xtype: "textfield",
								name: "kycReferenciaComercial.kycReferenciaTelefono1",
								maxLength: 8,
								minLenth:8,
								vtype: "validceros",
								colspan: 2,
								listeners: {
									render: function(){
										if(EfxKYC.getCtgTipoPersonaCodigo()==Efx.constants.codes.PERSONA_FISICA){
											this.hide();
										}
									}
								}
							},
							{xtype: "label", text: "Contacto ", cls: "x-form-item label_spacing" ,colspan :6,listeners: {
								render: function(){
									if(EfxKYC.getCtgTipoPersonaCodigo()==Efx.constants.codes.PERSONA_FISICA){
										this.hide();
									}
								}
							}},
							{
								xtype: "textfield",
								name: "kycReferenciaComercial.kycReferenciaContacto",
								maxLength: 100,
								colspan: 6,
								listeners: {
									render: function(){
										if(EfxKYC.getCtgTipoPersonaCodigo()==Efx.constants.codes.PERSONA_FISICA){
											this.hide();
										}
									}
								}
							},{
								xtype: "hidden",
								id: "kycReferenciaComercialId",
								name: "kycReferenciaComercial.kycReferenciaId"
							},{
								xtype: "hidden",
								id: "ctgTipoReferenciaId",
								name: "kycReferenciaComercial.ctgTipoReferencia.ctgCatalogoId"
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