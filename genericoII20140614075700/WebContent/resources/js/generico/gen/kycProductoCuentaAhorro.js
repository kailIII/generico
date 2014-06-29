KycProductoCuentaAhorro = function(){
	var configWindow = {
		add: "kycProductoCuentaAhorroAgregarTop",
		edit: "kycProductoCuentaAhorroEditarTop",
		remove: "kycProductoCuentaAhorroEliminarTop",
		grid2: "kycProductoAdicionalCuentaAhorroGrid",
		save: "kycProductoCuentaAhorroGuardarTop",
		form: "kycProductoCuentaAhorroForm",
		form2: "kycProductoAdicionalCuentaAhorroForm"
	};
	var configWindowBottom = {
			add: "kycProductoCuentaAhorroAgregarBottom",
			edit: "kycProductoCuentaAhorroEditarBottom",
			remove: "kycProductoCuentaAhorroEliminarBottom",
			save: "kycProductoCuentaAhorroGuardarBottom"
	};
	var configWindowTop = {
		add: "kycProductoCuentaAhorroAgregarTop",
		edit: "kycProductoCuentaAhorroEditarTop",
		remove: "kycProductoCuentaAhorroEliminarTop",
		save: "kycProductoCuentaAhorroGuardarTop"
	};
	return {
		abrirAdicCuentaAhorro: function(){
			if(Ext.isEmpty(EfxKYC.getKycId()) || Ext.isEmpty(EfxKYC.getKycPersonaFisicaId())){
				Efx.message.alert(Efx.constants.KYC_NO_EXISTE_PERSONA_FISICA);
				return;
			}
			Menu.openSelfWindow(
				"kycProductosAdicionales/view",
				{
					kycId: EfxKYC.getKycId(),
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
					kycProductoId: Ext.getCmp("kycProductoCuentaAhorroId").getValue(),
					kycTipoProducto : Efx.constants.codes.CUENTA_AHORRO
				}
			);
		},
		agregarProductoCuentaAhorro: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
    		Efx.form.clearAndEnable("kycProductoCuentaAhorroForm");
			Ext.getCmp("ctgTipotarjeta").disable();
			Ext.getCmp("kycProductoCuentaAhorroGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoCuentaAhorroGuardarTop").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue("");
			Ext.getCmp("kycProductoSaveAuxId").setValue(valorTemporalColumnaId);
		},
		agregarProductoCuentaAhorroAdicional: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "add");
			Efx.form2.switchButton(configWindowBottom, "add");
    		Efx.form2.clearAndEnable("kycProductoAdicionalCuentaAhorroForm");
			Ext.getCmp("kycProductoCuentaAhorroGuardarTop").setDisabled(true);
			Ext.getCmp("kycProductoCuentaAhorroGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			Ext.getCmp("kycProductoAdicionalCuentaAhorroId").setValue("");
			Ext.getCmp("kycProductoSaveAuxId").setValue(Ext.getCmp("kycProductoSaveId").getValue());
		},
		editarProductoCuentaAhorro: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycProductoCuentaAhorroEliminarTop").setDisabled(false);
			Ext.getCmp("kycProductoCuentaAhorroGuardarTop").setDisabled(false);
			Ext.getCmp("kycProductoCuentaAhorroEliminarBottom").setDisabled(true);
			Ext.getCmp("kycProductoCuentaAhorroGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
		},
		editarProductoCuentaAhorroAdicional: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "edit");
			Efx.form2.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycProductoCuentaAhorroEliminarTop").setDisabled(true);
			Ext.getCmp("kycProductoCuentaAhorroGuardarTop").setDisabled(true);
			Ext.getCmp("kycProductoCuentaAhorroEliminarBottom").setDisabled(false);
			Ext.getCmp("kycProductoCuentaAhorroGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
			Ext.getCmp("kycProductoCuentaAhorroGuardarBottom").setDisabled(true);
		},
		eliminarProductoCuentaAhorro: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductos/delete",
					params: {
						kycProductoId: Efx.utils.getValue("kycProductoCuentaAhorroId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoCuentaAhorroForm");
								if(Ext.getCmp("kycProductoCuentaAhorroGrid").store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycProductoCuentaAhorro){
			    					Ext.getCmp("kycProductoCuentaAhorroGrid").getStore().loadData(jsonObject.kycProductoCuentaAhorro);
								}
								EfxKYC.setKycMostrarCobis(jsonObject.kycMostrarCobis);
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
		eliminarProductoAdicionalCuentaAhorro: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductos/deleteAdicional",
					params: {
						kycProductoAdicionalId : Ext.getCmp("kycProductoAdicionalCuentaAhorroId").getValue(),
						kycProductoId:Ext.getCmp("kycProductoSaveId").getValue(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(false);
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.form.switchButton(configWindowTop, "rowclick");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoAdicionalCuentaAhorroForm");
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
								if(Ext.getCmp("kycProductoCuentaAhorroGrid").store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycProductoCuentaAhorroAdicional){
			    					Ext.getCmp("kycProductoAdicionalCuentaAhorro").getStore().loadData(jsonObject.kycProductoCuentaAhorroAdicional);
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
		guardarProductoCuentaAhorro: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoCuentaAhorroForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductos/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoCuentaAhorro.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoCuentaAhorro.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoCuentaAhorro.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CUENTA_AHORRO,
    				 kycTipoProducto : Efx.constants.codes.CUENTA_AHORRO
    			},
    			success: function(form, action){
    				Ext.getCmp("kycProductoAdicionalCuentaAhorro").store.clearFilter(true);
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoCuentaAhorroForm", true);
    				Ext.getCmp("kycProductoSaveAuxId").setValue("");
    				if(action.result.kycProductoCuentaAhorro){
    					Ext.getCmp("kycProductoCuentaAhorroGrid").getStore().loadData(action.result.kycProductoCuentaAhorro);
    					Ext.getCmp("kycProductoCuentaAhorroGrid").getSelectionModel().select(action.result.kycProductoCuentaCorrienteIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		guardarProductoCuentaAhorroAdicional: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			if (Ext.getCmp("kycProductoSaveId").getValue()!=null) {
   			Ext.getCmp("kycProductoAdicionalCuentaAhorroForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductos/saveAdicional",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoAdicionalCuentaAhorro.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoAdicionalCuentaAhorro.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoAdicionalCuentaAhorro.ctgTipoProducto.ctgCatalogoId":Efx.constants.codes.PAQUETE_CUENTA_AHORRO,
    				"kycProductoAdicionalCuentaAhorro.kycProducto.kycProductoId": Ext.getCmp("kycProductoSaveId").getValue(),
    				kycTipoProducto: Efx.constants.codes.CUENTA_AHORRO
    			},
    			success: function(form, action){
       				Ext.getCmp("kycProductoAdicionalCuentaAhorro").store.clearFilter(true);
    				Ext.getCmp("kycProductoAdicionalCuentaAhorro").store.filter("kycProductoAdicionalCuentaAhorro.kycProductoId", new RegExp(Ext.getCmp("kycProductoSaveId").getValue(), 'i'));
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.form.switchButton(configWindowTop, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoAdicionalCuentaAhorroForm", true);
    				Ext.getCmp("kycProductoCuentaAhorroEditarTop").setDisabled(false);
    				if(action.result.kycProductoCuentaAhorroAdicional){
    					Ext.getCmp("kycProductoAdicionalCuentaAhorro").getStore().loadData(action.result.kycProductoAdicionalCuentaAhorro);
    					Ext.getCmp("kycProductoAdicionalCuentaAhorro").getSelectionModel().select(action.result.kycProductoAdicionalCuentaAhorroIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});}
		},
		init: function(config){
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				flex: 1,
				title: "PRODUCTOS -  CUENTA AHORRO",
				autoScroll: true,
				xtype: "panel",
				layout : {
				type : "table",
				columns : 1,
				tableAttrs : {
					style : {
						width : "730px",
						"margin-top" : "5px",
						"margin-bottom" : "40px"
					},
					align : "center"
				}
			},
			modal : true,
			closable : false,
			defaults: {width: 730, margins: "5 0 5 0"},
			dockedItems: [
				{
					xtype: "toolbar",
					dock: "top",
					hidden: EfxKYC.getKycVigente() === false,
					items: [
					   '->',
					   {
						   text: "Nuevo Producto",
						   id: "kycProductoCuentaAhorroAgregarTop",
						   iconCls: Efx.constants.icons.ADD_ICON,
						   handler: KycProductoCuentaAhorro.agregarProductoCuentaAhorro
					   },{
				    	   text: "Editar Producto",
				    	   id: "kycProductoCuentaAhorroEditarTop",
						   iconCls: Efx.constants.icons.EDIT_ICON,
						   handler: KycProductoCuentaAhorro.editarProductoCuentaAhorro
				       },{
				    	   text: "Eliminar Producto",
				    	   id: "kycProductoCuentaAhorroEliminarTop",
						   iconCls: Efx.constants.icons.DELETE_ICON,
						   handler: KycProductoCuentaAhorro.eliminarProductoCuentaAhorro
				       },
				       {
				    	   text: "Guardar Producto",
				    	   id: "kycProductoCuentaAhorroGuardarTop",
						   iconCls: Efx.constants.icons.SAVE_ICON,
						   handler: KycProductoCuentaAhorro.guardarProductoCuentaAhorro
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
						   text: "Vincular Adicional",
						   id: "kycProductoCuentaAhorroAgregarBottom",
						   iconCls: Efx.constants.icons.ADD_ICON,
						   handler: KycProductoCuentaAhorro.agregarProductoCuentaAhorroAdicional
					   },{
				    	   text: "Editar Adicional",
				    	   id: "kycProductoCuentaAhorroEditarBottom",
						   iconCls: Efx.constants.icons.EDIT_ICON,
						   handler: KycProductoCuentaAhorro.editarProductoCuentaAhorroAdicional
				       },{
				    	   text: "Desvincular Adicional",
				    	   id: "kycProductoCuentaAhorroEliminarBottom",
						   iconCls: Efx.constants.icons.DELETE_ICON,
						   handler: KycProductoCuentaAhorro.eliminarProductoAdicionalCuentaAhorro
				       },
				       {
				    	   text: "Guardar Adicional",
				    	   id: "kycProductoCuentaAhorroGuardarBottom",
						   iconCls: Efx.constants.icons.SAVE_ICON,
						   handler: KycProductoCuentaAhorro.guardarProductoCuentaAhorroAdicional
				       }
	        	    ]
		        }
            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoCuentaAhorroGrid",
						height: 150,
						width:730,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoCuentaAhorro || [],
					    	fields: [
								"kycProductoCuentaAhorro.kycProductoId",
								"kycProductoCuentaAhorro.kycProductoViajeroFrecuente",
								"kycProductoCuentaAhorro.kycProductoNumeroViajeroFrecuente",
								"kycProductoCuentaAhorro.kycProductoNombreTarjeta",
								"kycProductoCuentaAhorro.kycProductoNumeroCuenta",
								"kycProductoCuentaAhorro.kycProductoMontoColones",
								"kycProductoCuentaAhorro.kycProductoMontoDolares",
								"kycProductoCuentaAhorro.kycProductoFechaVencimiento",
								"kycProductoCuentaAhorro.kycProductoFechaInicioDebito",
								"kycProductoCuentaAhorro.kycProductoRenovacionAutomatica",
								"kycProductoCuentaAhorro.kycProductoTarjetaDebito",
								"kycProductoCuentaAhorro.kycProductoFecha1",
								"kycProductoCuentaAhorro.kycProductoFecha2",
								"kycProductoCuentaAhorro.kycProductoFecha3",
								"kycProductoCuentaAhorro.kycProductoCantidadTalonarios",
								"kycProductoCuentaAhorro.kycFechaActualizacion",
								"ctgOficinaEntrega.ctgSucursalId",
								"ctgPrefijo.ctgCatalogoId",
								"ctgMoneda.ctgCatalogoId",
								"ctgProducto.ctgCatalogoId",
								"ctgTipoTarjeta.ctgCatalogoId",
								"ctgTipoChequera.ctgCatalogoId",
								"ctgTipoCuenta.ctgCatalogoId",
								"ctgFrecuenciaCargo.ctgCatalogoId",
								"ctgPlazoCuenta.ctgCatalogoId",
								"ctgListadoTipoProducto.ctgCatalogoId",
								"ctgTipoAporte.ctgCatalogoId",
								"ctgListadoTipoProducto.ctgCatalogoNombre"
			    	        ]
					    }),
					    columns: [
					              {header: "Tipo de Producto",  dataIndex: "ctgListadoTipoProducto.ctgCatalogoNombre", flex: 2, minWidth: 200},
							      {header: "Nombre de Tarjeta",  dataIndex: "kycProductoCuentaAhorro.kycProductoNombreTarjeta",flex: 1.5, width: 100}
					    ],
					    listeners: {
							selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(!records || records.length <= 0){
									Ext.getCmp("kycProductoCuentaAhorroEliminarTop").setDisabled(true);
									Ext.getCmp("kycProductoCuentaAhorroGuardarTop").setDisabled(true);
									Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisable(true);
								};
					    		var filtradoDatos = parseInt(Ext.getCmp("kycProductoCuentaAhorroGrid").getSelectionModel().getSelection()[0].get("kycProductoCuentaAhorro.kycProductoId"));
					    		Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(record != null){
					    			Efx.form.setValues("kycProductoCuentaAhorroForm", record.data);
					    			Efx.form.setDisable("kycProductoCuentaAhorroForm");
					    			Efx.form.setDisable("kycPaqueteAdicionalCuentaAhorroForm");
					    			Efx.form.switchButton(configWindow, "rowclick");
						    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    		};
					    		Ext.getCmp("kycProductoAdicionalCuentaAhorro").store.clearFilter(true);
					    		Ext.getCmp("kycProductoAdicionalCuentaAhorro").store.filter("kycProductoAdicionalCuentaAhorro.kycProductoId", new RegExp(filtradoDatos, 'i'));
					    		if (Ext.getCmp("kycProductoAdicionalCuentaAhorro").store.getCount()<=0){
									Ext.getCmp("kycProductoCuentaAhorroEditarBottom").setDisabled(true);
					    		}else{
					    			Ext.getCmp("kycProductoCuentaAhorroEditarBottom").setDisabled(false);
					    		}
								Ext.getCmp("kycProductoCuentaAhorroEliminarTop").setDisabled(false);
								Ext.getCmp("kycProductoCuentaAhorroGuardarTop").setDisabled(false);
								Ext.getCmp("kycProductoCuentaAhorroEliminarBottom").setDisabled(false);
								Ext.getCmp("kycProductoCuentaAhorroGuardarBottom").setDisabled(false);
					    		if(config.kycAdicionalPersonas ==undefined || config.kycAdicionalPersonas == null || config.kycAdicionalPersonas.length <= 0){
					    			Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
									Ext.getCmp("kycProductoCuentaAhorroEditarBottom").setDisabled(true);
					    		}
								if(Ext.getCmp("kycProductoAdicionalCuentaAhorro").store.getCount() > 0) Efx.grid2.selectFirstRow(Ext.getCmp("kycProductoAdicionalCuentaAhorro"));
								if(Ext.getCmp("kycProductoAdicionalCuentaAhorro").store.getCount() < 1) {
									Efx.form2.clearAndDisable("kycProductoAdicionalCuentaAhorroForm");
								}
								Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
					    		valorTemporal= Ext.getCmp("kycProductoSaveAuxId").getValue();
					    		if (valorTemporal.lenght>0){
					    			Ext.getCmp("kycProductoSaveId").setValue(Ext.getCmp("kycProductoSaveAuxId").getValue());
					    		}
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
					    	},
					    	afterrender: function(model, records){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindowBottom, "cancelNotClear");
					    		if(this.store.getCount()<=0){
									Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
									Ext.getCmp("kycProductoCuentaAhorroEditarBottom").setDisabled(true);
									}

					    		if(config.kycAdicionalPersonas ==undefined || config.kycAdicionalPersonas == null || config.kycAdicionalPersonas.length <= 0){
					    			Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
									Ext.getCmp("kycProductoCuentaAhorroEditarBottom").setDisabled(true);
					    		}
					    		if(this.store.data.items.length <= 0){
									Ext.getCmp("kycProductoCuentaAhorroEditarTop").setDisabled(true);
								}
					    	},
					    	itemclick: function(dv, record, item, index, e) {
					    		if(this.store.data.items.length > 0) {
						    		Efx.form.switchButton(configWindowTop, "cancelNotClear");
						    		Ext.getCmp("kycProductoCuentaAhorroEditarTop").setDisabled(false);
						    	}
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					        }
					    }
					},{
			        	xtype: "form",
						id: "kycProductoCuentaAhorroForm",
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
								text: "CUENTA AHORRO",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label",text: "Tipo de Producto", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Prefijo", cls: "x-form-item label_spacing", width:100, colspan: 1},
							{xtype: "label", text: "Moneda", cls: "x-form-item label_spacing", width:100, colspan: 1},
							{xtype: "label", text: "Producto", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "combo",
								id:"ctgListadoTipoProducto",
								name: "ctgListadoTipoProducto.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgListadoCuentaAhorro || [],
									fields: ["ctgListadoCuentaAhorroId", "ctgListadoCuentaAhorroNombre"]
								}),
								displayField: "ctgListadoCuentaAhorroNombre",
								valueField: "ctgListadoCuentaAhorroId",
								colspan: 2,
								allowBlank: false,
								listeners:{
										change : function() {
											if (this.getValue())
												{
											Ext.getCmp("ctgPrefijo").setValue(this.getValue());
											Ext.getCmp("ctgMoneda").setValue(this.getValue());
											Ext.getCmp("ctgProducto").setValue(this.getValue());
											Ext.getCmp("ctgTipotarjeta").enable();
												}
											else { }
										},
										blur : function(){
											var comboProducto = Ext.getCmp('ctgListadoTipoProducto');
											if (comboProducto.getRawValue()<=0){Ext.getCmp("ctgTipotarjeta").disable();}
										}}
							},
							{
								xtype: "combo",
								id:"ctgPrefijo",
								name: "ctgPrefijo.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgPrefijo || [],
									fields: ["ctgPrefijoId", "ctgPrefijoNombre", "ctgPrefijoPrefijo", "ctgPrefijoMoneda",
											"ctgPrefijoProducto"]
								}),
								displayField: "ctgPrefijoPrefijo",
								valueField: "ctgPrefijoId",
								readOnly: true,
								hideTrigger: true,
								width:100,
								colspan: 1
							},
							{
								xtype: "combo",
								id:"ctgMoneda",
								name: "ctgMoneda.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgMoneda || [],
									fields: ["ctgMonedaId", "ctgMonedaNombre", "ctgMonedaPrefijo", "ctgMonedaMoneda",
									         "ctgMonedaProducto"]
								}),
								displayField: "ctgMonedaMoneda",
								valueField: "ctgMonedaId",
								width:100,
								hideTrigger: true,
								readOnly: true,
								colspan: 1
							},{
								xtype: "combo",
								id:"ctgProducto",
								name: "ctgProducto.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgProducto || [],
									fields: ["ctgProductoId", "ctgProductoNombre", "ctgProductoPrefijo", "ctgProductoMoneda",
									         "ctgProductoProducto"]
								}),
								displayField: "ctgProductoProducto",
								valueField: "ctgProductoId",
								width:100,
								hideTrigger: true,
								readOnly: true,
								colspan: 2
							},
							{xtype: "label", text: "Tipo de Tarjeta", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label",text: "Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "combo",
								id:"ctgTipotarjeta",
								name: "ctgTipoTarjeta.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoTarjeta || [],
									fields: ["ctgTipoTarjetaId", "ctgTipoTarjetaNombre"]
								}),
								displayField: "ctgTipoTarjetaNombre",
								valueField: "ctgTipoTarjetaId",
								colspan: 2,
								lastQuery: '',
								queryMode: 'local',
								triggerAction: 'all',
								listeners : {
										change : function() {

											this.store.clearFilter(true);
											var disable=false;
											var sizeIndexOf = this.getRawValue().indexOf("LIFEMILES");
											var sizeIndexOf2 = this.getRawValue().indexOf("CITIGOLD");
										if	( sizeIndexOf != -1)
											{
											disable=true;
											}
										else if (sizeIndexOf2 != -1 )
											{
											disable=true;
											}
										Efx.utils.setDisabled("kycProductoViajeroFrecuente", !disable, false);
										Ext.getCmp("kycProductoViajeroFrecuente").clearValue();
										Efx.utils.setDisabled("kycProductoNumeroViajeroFrecuente", !disable, false);

										Efx.combos.setRequiredAndValidate("kycProductoViajeroFrecuente", disable);
										},
										beforequery: function(){
												var comboProducto = Ext.getCmp('ctgListadoTipoProducto');
												if (comboProducto.getValue()==null){
													this.store.clearFilter(true);
												};
												var comboProducto = Ext.getCmp('ctgListadoTipoProducto');
												caseSensitive = false;
												if (comboProducto.getRawValue().indexOf("D\u00d3LARES")>=0) {
													this.store.filter("ctgTipoTarjetaNombre", new RegExp(Ext.String.escapeRegex("D\u00d3LARES"), 'i'));
												} else if (comboProducto.getRawValue().indexOf("EURO")>=0) {
													this.store.filter("ctgTipoTarjetaNombre", new RegExp(Ext.String.escapeRegex("EURO"), 'i'));
												} else if (comboProducto.getRawValue().indexOf("COLONES")>=0) {
													this.store.filter("ctgTipoTarjetaNombre", new RegExp(Ext.String.escapeRegex("COLONES"), 'i'));
												}
										}}
							},{
								xtype : "combo",
								id:"kycProductoViajeroFrecuente",
								name : "kycProductoCuentaAhorro.kycProductoViajeroFrecuente",
								store : new Ext.data.SimpleStore({
									data : Efx.combos.yesnoArray() || [],
									fields : [ "id", "descripcion" ]
								}),
								displayField : "descripcion",
								valueField: "id",
								colspan : 2,
							allowBlank: false,
								listeners : {
									change : function() {
										var disable = this.getValue() != "1";
										Efx.utils.setDisabled("kycProductoNumeroViajeroFrecuente",disable, true);

										Efx.combos.setRequiredAndValidate("kycProductoNumeroViajeroFrecuente", !disable);
									}}
							},
							 {
								xtype : "textfield",
								id:"kycProductoNumeroViajeroFrecuente",
								name : "kycProductoCuentaAhorro.kycProductoNumeroViajeroFrecuente",
								maxLength: 30,
								colspan:2
							},
							{xtype: "label", text: "Oficina de Entrega", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Nombre que desea en Tarjeta", cls: "x-form-item label_spacing",  colspan: 4},
							{
								xtype: "combo",
								id:"ctgOficinaEntrega",
								name: "ctgOficinaEntrega.ctgSucursalId",
								store: new Ext.data.SimpleStore({
									data: config.ctgOficinas || [],
									fields: ["ctgOficinasId", "ctgOficinasNombre"]
								}),
								displayField: "ctgOficinasNombre",
								valueField: "ctgOficinasId",
								allowBlank: false,
								colspan: 2
							},
							{
								xtype : "textfield",
								id:"kycProductoNombreTarjeta",
								name : "kycProductoCuentaAhorro.kycProductoNombreTarjeta",
								maxLength : 100,
								allowBlank: false,
								width: 475,
								colspan:4
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoAdicionalCuentaAhorroId",
								name: "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalId"
							},
							{
								xtype: "hidden",
								id: "kycProductoCuentaAhorroId",
								name: "kycProductoCuentaAhorro.kycProductoId"
							},{
								xtype: "hidden",
								id: "kycProductoSaveId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoCuentaAhorro.ctgTipoProducto.ctgCatalogoId"
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
							},
							{
								xtype: "hidden",
								id: "kycProductoSaveAuxId"
							}
						]
			        },{
						xtype: "grid",
					id: "kycProductoAdicionalCuentaAhorro",
					height: 150,
					width:730,
					collapsible: true,
					colspan: 6,
					minHeight: 10,
					store: new Ext.data.SimpleStore({
				    	data: config.kycProductoAdicionalCuentaAhorro || [],
				    	fields: [
							"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalId",
							"kycProductoAdicionalCuentaAhorro.kycProductoId",
							"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombre",
							"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalCedula",
							"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalViajeroFrecuente",
							"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNumeroViajeroFrecuente",
							"kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombreTarjeta",
							"kycProductoAdicionalCuentaAhorro.kycFechaActualizacion",
							"ctgTipoTarjeta.ctgCatalogoId",
							"ctgOficinaEntrega.ctgSucursalId"
		    	        ]
				    }),
				    columns: [
				              {header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
						      {header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalCedula",flex: 1, width: 100}
				    ],
				    listeners: {
				    	selectionchange: function(model, records){
				    		if(!records || records.length <= 0) return;
				    		if(records.length>0) Ext.getCmp("kycProductoCuentaAhorroEditarBottom").setDisabled(false);
				    		var record = records[0];
				    		if(record != null){
				    			Efx.form.setValues("kycProductoAdicionalCuentaAhorroForm", record.data);
				    			Efx.form.setDisable("kycProductoAdicionalCuentaAhorroForm");
				    		}
				    		Efx.form.switchButton(configWindow, "rowclick");
				    		Efx.form.switchButton(configWindowBottom, "rowclick");
							if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
							Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
				    	},
				    	afterrender: function(){
				    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
				    		Efx.form.switchButton(configWindow, "cancelNotClear");
				    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
				    		if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
				    			Ext.getCmp("kycProductoCuentaAhorroAgregarBottom").setDisabled(true);
				    	},
				    	itemclick: function(dv, record, item, index, e) {
				    		if(this.store.data.items.length > 0) {
				    			Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
				    		}
				        }
				    }
				},{
		        	xtype: "form",
					id: "kycProductoAdicionalCuentaAhorroForm",
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
							text: "ADICIONALES A CUENTA DE AHORRO",
							cls: "x-form-item label_header",
							colspan: 6,
							width: 730
						},
						{xtype: "label",text: "Seleccione la Persona Adicional", cls: "x-form-item label_spacing", colspan: 2},
						{xtype: "label", text: "Nombre", cls: "x-form-item label_spacing", colspan: 2},
						{xtype: "label", text: "N\u00famero de Identificaci\u00f3n", cls: "x-form-item label_spacing", colspan: 2},
						{
							xtype: "combo",
							id:"kycAdicionales",
							name: "kycAdicionales",
							store: new Ext.data.SimpleStore({
								data: config.kycAdicionales || [],
								fields: ["kycAdicionalId", "kycAdicionalNombres", "kycAdicionalPrimerApellido", "kycAdicionalSegundoApellido",
								         "kycAdicionalDocumento",
								         {
					                name: 'NombreCompleto',
					                convert: function(value, r) {
					                    var fullName  = (r.get('kycAdicionalNombres') || "") +
					                    	" " + (r.get('kycAdicionalPrimerApellido') || "") +
					                    	" " + (r.get('kycAdicionalSegundoApellido') || "");
					                    return fullName;
					                }
					            }
								         ]
							}),
							displayField:  "NombreCompleto",
							valueField: "kycAdicionalDocumento",
							colspan: 2,
							listeners:{
									change : function() {
										if (this.getValue())
											{
										Ext.getCmp("kycProductoAdicionalNombre").setValue(this.getRawValue());
										Ext.getCmp("kycProductoAdicionalCedula").setValue(this.getValue());
											}
										else {  }
									}}
						},

						{
							xtype : "textfield",
							id:"kycProductoAdicionalNombre",
							name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombre",
							maxLength: 100,
							readOnly: true,
							allowBlank: false,
							colspan:2
						},
						{
							xtype : "textfield",
							id:"kycProductoAdicionalCedula",
							name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalCedula",
							maxLength: 20,
							colspan:2,
							readOnly: true,
							allowBlank: false,
							listeners:{
								change: function()
								{
									if (this.getValue()!= " ")
										{
										Ext.getCmp("kycAdicionales").setValue(this.getValue());
										}
								}
								}
						},

						{xtype: "label", text: "Tipo de Tarjeta", cls: "x-form-item label_spacing", colspan: 2},
						{xtype: "label",text: "Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
						{xtype: "label", text: "N\u00famero de Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
						{
							xtype: "combo",
							id:"ctgTipoTarjeta",
							name: "ctgTipoTarjeta.ctgCatalogoId",
							store: new Ext.data.SimpleStore({
								data: config.ctgTipoTarjeta || [],
								fields: ["ctgTipoTarjetaId", "ctgTipoTarjetaNombre"]
							}),
							displayField: "ctgTipoTarjetaNombre",
							valueField: "ctgTipoTarjetaId",
							allowBlank: false,
							colspan: 2,
							listeners : {
									change : function() {
										var disable=false;
										var sizeIndexOf = this.getRawValue().indexOf("LIFEMILES");
										var sizeIndexOf2 = this.getRawValue().indexOf("CITIGOLD");
									if	( sizeIndexOf != -1)
										{
										disable=true;
										}
									else if (sizeIndexOf2 != -1 )
										{
										disable=true;
										}
									Efx.utils.setDisabled("kycProductoAdicionalViajeroFrecuente", !disable, false);
									Ext.getCmp("kycProductoAdicionalViajeroFrecuente").clearValue();
									Ext.getCmp("kycProductoAdicionalViajeroFrecuente").clearInvalid();
									Efx.utils.setDisabled("kycProductoAdicionalNumeroViajeroFrecuente", !disable, false);

									Efx.combos.setRequiredAndValidate("kycProductoAdicionalViajeroFrecuente", disable);
									}}
						},{
							xtype : "combo",
							id:"kycProductoAdicionalViajeroFrecuente",
							name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalViajeroFrecuente",
							store : new Ext.data.SimpleStore({
								data : Efx.combos.yesnoArray() || [],
								fields : [ "id", "descripcion" ]
							}),
							displayField : "descripcion",
							valueField: "id",
							colspan : 2,
							listeners : {
								change : function() {
									var disable = this.getValue() != "1";
									Efx.utils.setDisabled("kycProductoAdicionalNumeroViajeroFrecuente",disable, true);
									Efx.combos.setRequiredAndValidate("kycProductoAdicionalNumeroViajeroFrecuente", !disable);
								}}
						},
						 {
							xtype : "textfield",
							id:"kycProductoAdicionalNumeroViajeroFrecuente",
							name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNumeroViajeroFrecuente",
							maxLength: 30,
							colspan:2
						},
						{xtype: "label", text: "Oficina de Entrega", cls: "x-form-item label_spacing", colspan: 2},
						{xtype: "label", text: "Nombre que desea en Tarjeta", cls: "x-form-item label_spacing",  colspan: 4},
						{
							xtype: "combo",
							id:"ctgOficinaEntregaAdicional",
							name: "ctgOficinaEntrega.ctgSucursalId",
							store: new Ext.data.SimpleStore({
								data: config.ctgOficinas || [],
								fields: ["ctgOficinasId", "ctgOficinasNombre"]
							}),
							displayField: "ctgOficinasNombre",
							allowBlank: false,
							valueField: "ctgOficinasId",
							colspan: 2
						},
						{
							xtype : "textfield",
							id:"kycProductoAdicionalNombreTarjeta",
							name : "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalNombreTarjeta",
							maxLength : 100,
						allowBlank: false,
							colspan:4
						},

						{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
						{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
						{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
						{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
						{
							xtype: "hidden",
							id: "kycProductoAdicionalCuentaAhorroId",
							name: "kycProductoAdicionalCuentaAhorro.kycProductoAdicionalId"
						},{
							xtype: "hidden",
							id: "ctgTipoProductoId",
							name: "kycProductoAdicionalCuentaAhorro.ctgTipoProducto.ctgCatalogoId"
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