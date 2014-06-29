KycPaqueteCuentaAhorro = function(){
	var configWindow = {
	    add: "kycPaqueteCuentaAhorroAgregarTop",
		edit: "kycPaqueteCuentaAhorroEditarTop",
		remove: "kycPaqueteCuentaAhorroEliminarTop",
		grid2: "kycProductoAdicionalCuentaAhorroGrid",
		save: "kycPaqueteCuentaAhorroGuardarTop",
		form: "kycPaqueteCuentaAhorroForm",
		form2: "kycPaqueteAdicionalCuentaAhorroForm"
	};
	var configWindowBottom = {
			add: "kycPaqueteCuentaAhorroAgregarBottom",
			edit: "kycPaqueteCuentaAhorroEditarBottom",
			remove: "kycPaqueteCuentaAhorroEliminarBottom",
			save: "kycPaqueteCuentaAhorroGuardarBottom"
	};
	var configWindowTop = {
		add: "kycPaqueteCuentaAhorroAgregarTop",
		edit: "kycPaqueteCuentaAhorroEditarTop",
		remove: "kycPaqueteCuentaAhorroEliminarTop",
		save: "kycPaqueteCuentaAhorroGuardarTop"
	};
	return {
		abrirAdicPaqueteCuentaAhorro: function(){
			if(Ext.isEmpty(EfxKYC.getKycId()) || Ext.isEmpty(EfxKYC.getKycPersonaFisicaId())){
				Efx.message.alert(Efx.constants.KYC_NO_EXISTE_PERSONA_FISICA);
				return;
			}
			Menu.openSelfWindow(
				"kycPaquetesAdicionales/view",
				{
					kycId: EfxKYC.getKycId(),
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
					kycPaqueteId: Ext.getCmp("kycPaqueteId").getValue(),
					kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_AHORRO
				}
			);
		},
		agregarPaqueteCuentaAhorro: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
    		Efx.form.clearAndEnable("kycPaqueteCuentaAhorroForm");
			Ext.getCmp("ctgTipotarjeta").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaAhorroGuardarBottom").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaAhorroGuardarTop").setDisabled(false);
			Ext.getCmp("kycProductoSaveAuxId").setValue(valorTemporalColumnaId);
		},
		agregarPaqueteAdicionalCuentaAhorro: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "add");
			Efx.form2.switchButton(configWindowBottom, "add");
    		Efx.form2.clearAndEnable("kycPaqueteAdicionalCuentaAhorroForm");
			Ext.getCmp("kycPaqueteCuentaAhorroGuardarTop").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaAhorroGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			Ext.getCmp("kycProductoSaveAuxId").setValue(Ext.getCmp("kycProductoSaveId").getValue());
		},
		editarPaqueteCuentaAhorro: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycPaqueteCuentaAhorroGuardarTop").setDisabled(false);
			Ext.getCmp("kycPaqueteCuentaAhorroEliminarTop").setDisabled(false);
			Ext.getCmp("kycPaqueteCuentaAhorroEliminarBottom").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaAhorroGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
		},
		editarPaqueteAdicionalCuentaAhorro: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "edit");
			Efx.form2.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycPaqueteCuentaAhorroEliminarTop").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaAhorroGuardarTop").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaAhorroEliminarBottom").setDisabled(false);
			Ext.getCmp("kycPaqueteCuentaAhorroGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
			Ext.getCmp("kycPaqueteCuentaAhorroGuardarBottom").setDisabled(true);
		},
		eliminarPaqueteCuentaAhorro: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycPaquetes/delete",
					params: {
						kycPaqueteId: Efx.utils.getValue("kycPaqueteId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycPaqueteCuentaAhorroForm");
								if(jsonObject.kycPaqueteCuentaAhorro){
			    					Ext.getCmp("kycPaqueteCuentaAhorroGrid").getStore().loadData(jsonObject.kycPaqueteCuentaAhorro);
								}
								return;

								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycPaqueteCuentaAhorroForm");
								if(Ext.getCmp("kycPaqueteCuentaAhorroGrid").store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycPaqueteCuentaAhorro){
			    					Ext.getCmp("kycPaqueteCuentaAhorroGrid").getStore().loadData(jsonObject.kycPaqueteCuentaAhorro);
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
		eliminarPaqueteAdicionalCuentaAhorro: function(){
			Efx.message.confirmDelete(function(){
				valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycPaquetes/deleteAdicional",
					params: {
						kycPaqueteAdicionalId : Ext.getCmp("kycPaqueteAdicionalCuentaAhorroId").getValue(),
						kycPaqueteId: EfxKYC.getKycPaqueteId(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycPaqueteAdicionalCuentaAhorroForm");
								if(jsonObject.kycPaqueteAdicionalCuentaAhorro){
			    					Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").getStore().loadData(jsonObject.kycPaqueteAdicionalCuentaAhorro);
								}
								return;

								Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(false);
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.form.switchButton(configWindowTop, "rowclick");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycPaqueteAdicionalCuentaAhorroForm");
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
								if(Ext.getCmp("kycPaqueteCuentaAhorroGrid").store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycPaqueteCuentaAhorroAdicional){
			    					Ext.getCmp("kycPaqueteAdicionalCuentaAhorro").getStore().loadData(jsonObject.kycPaqueteCuentaAhorroAdicional);
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
		guardarPaqueteCuentaAhorro: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycPaqueteCuentaAhorroForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycPaquetes/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPaqueteCuentaAhorro.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycPaqueteCuentaAhorro.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycPaqueteCuentaAhorro.ctgTipoPaquete.ctgCatalogoId" :Efx.constants.codes.PAQUETE_CUENTA_AHORRO,
    				 kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_AHORRO
    			},
    			success: function(form, action){
			      	Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").store.clearFilter(true);
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycPaqueteCuentaAhorroForm", true);
    				Ext.getCmp("kycProductoSaveAuxId").setValue("");
    				if(action.result.kycPaqueteCuentaAhorro){
    					Ext.getCmp("kycPaqueteCuentaAhorroGrid").getStore().loadData(action.result.kycPaqueteCuentaAhorro);
    					Ext.getCmp("kycPaqueteCuentaAhorroGrid").getSelectionModel().select(action.result.kycPaqueteIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		guardarPaqueteAdicionalCuentaAhorro: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycPaqueteAdicionalCuentaAhorroForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycPaquetes/saveAdicional",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPaqueteAdicionalCuentaAhorro.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycPaqueteAdicionalCuentaAhorro.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycPaqueteAdicionalCuentaAhorro.ctgTipoPaquete.ctgCatalogoId" :Efx.constants.codes.PAQUETE_CUENTA_AHORRO,
    				"kycPaqueteAdicionalCuentaAhorro.kycPaquete.kycPaqueteId":Ext.getCmp("kycProductoSaveId").getValue(),
    				 kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_AHORRO
    			},
    			success: function(form, action){
    				Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").store.clearFilter(true);
    				Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").store.filter("kycPaquete.kycPaqueteId", new RegExp(Ext.getCmp("kycProductoSaveId").getValue(), 'i'));
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycPaqueteAdicionalCuentaAhorroForm", true);
    				if(action.result.kycPaqueteAdicionalCuentaAhorro){
    					Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").getStore().loadData(action.result.kycPaqueteAdicionalCuentaAhorro);
    					Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").getSelectionModel().select(action.result.kycPaqueteAdicionalCuentaCorrienteIndex);
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
				title: "PRODUCTOS - CUENTA AHORRO",
				autoScroll: true,
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
							   text: "Nuevo",
							   id: "kycPaqueteCuentaAhorroAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycPaqueteCuentaAhorro.agregarPaqueteCuentaAhorro
						   },{
					    	   text: "Editar",
					    	   id: "kycPaqueteCuentaAhorroEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycPaqueteCuentaAhorro.editarPaqueteCuentaAhorro
					       },{
					    	   text: "Eliminar",
					    	   id: "kycPaqueteCuentaAhorroEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycPaqueteCuentaAhorro.eliminarPaqueteCuentaAhorro
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycPaqueteCuentaAhorroGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycPaqueteCuentaAhorro.guardarPaqueteCuentaAhorro
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
						   id: "kycPaqueteCuentaAhorroAgregarBottom",
						   iconCls: Efx.constants.icons.ADD_ICON,
						   handler: KycPaqueteCuentaAhorro.agregarPaqueteAdicionalCuentaAhorro
					   },{
				    	   text: "Editar Adicional",
				    	   id: "kycPaqueteCuentaAhorroEditarBottom",
						   iconCls: Efx.constants.icons.EDIT_ICON,
						   handler: KycPaqueteCuentaAhorro.editarPaqueteAdicionalCuentaAhorro
				       },{
				    	   text: "Desvincular Adicional",
				    	   id: "kycPaqueteCuentaAhorroEliminarBottom",
						   iconCls: Efx.constants.icons.DELETE_ICON,
						   handler: KycPaqueteCuentaAhorro.eliminarPaqueteAdicionalCuentaAhorro
				       },
				       {
				    	   text: "Guardar Adicional",
				    	   id: "kycPaqueteCuentaAhorroGuardarBottom",
						   iconCls: Efx.constants.icons.SAVE_ICON,
						   handler: KycPaqueteCuentaAhorro.guardarPaqueteAdicionalCuentaAhorro
				       }
	        	    ]
		        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycPaqueteCuentaAhorroGrid",
						height: 150,
						width:730,
						collapsible: true,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycPaqueteCuentaAhorro || [],
					    	fields: [
								"kycPaqueteCuentaAhorro.kycPaqueteId",
								"kycPaqueteCuentaAhorro.kycPaqueteViajeroFrecuente",
								"kycPaqueteCuentaAhorro.kycPaqueteNumeroViajeroFrecuente",
								"kycPaqueteCuentaAhorro.kycPaqueteNombreTarjeta",
								"kycPaqueteCuentaAhorro.kycPaqueteNumeroCuenta",
								"kycPaqueteCuentaAhorro.kycPaqueteMontoColones",
								"kycPaqueteCuentaAhorro.kycPaqueteMontoDolares",
								"kycPaqueteCuentaAhorro.kycPaqueteFechaVencimiento",
								"kycPaqueteCuentaAhorro.kycPaqueteFechaInicioDebito",
								"kycPaqueteCuentaAhorro.kycPaqueteRenovacionAutomatica",
								"kycPaqueteCuentaAhorro.kycPaqueteTarjetaDebito",
								"kycPaqueteCuentaAhorro.kycPaqueteFecha1",
								"kycPaqueteCuentaAhorro.kycPaqueteFecha2",
								"kycPaqueteCuentaAhorro.kycPaqueteFecha3",
								"kycPaqueteCuentaAhorro.kycPaqueteCantidadTalonarios",
								"kycPaqueteCuentaAhorro.kycFechaActualizacion",
								"ctgOficinaEntrega.ctgSucursalId",
								"ctgPrefijo.ctgCatalogoId",
								"ctgMoneda.ctgCatalogoId",
								"ctgPaquete.ctgCatalogoId",
								"ctgTipoTarjeta.ctgCatalogoId",
								"ctgTipoChequera.ctgCatalogoId",
								"ctgTipoCuenta.ctgCatalogoId",
								"ctgFrecuenciaCargo.ctgCatalogoId",
								"ctgPlazoCuenta.ctgCatalogoId",
								"ctgListadoTipoPaquete.ctgCatalogoId",
								"ctgTipoAporte.ctgCatalogoId",
								"ctgListadoTipoProducto.ctgCatalogoNombre"
			    	        ]
					    }),
					    columns: [
					              {header: "Tipo de Producto",  dataIndex: "ctgListadoTipoProducto.ctgCatalogoNombre", flex: 2, minWidth: 200},
							      {header: "Nombre de Tarjeta",  dataIndex: "kycPaqueteCuentaAhorro.kycPaqueteNombreTarjeta",flex: 1.5, width: 100}
					    ],
					    listeners: {
							selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(!records || records.length <= 0){
								Ext.getCmp("kycPaqueteCuentaAhorroEliminarTop").setDisabled(true);
								Ext.getCmp("kycPaqueteCuentaAhorroGuardarTop").setDisabled(true);
								}
					    		var filtradoDatos = parseInt(Ext.getCmp("kycPaqueteCuentaAhorroGrid").getSelectionModel().getSelection()[0].get("kycPaqueteCuentaAhorro.kycPaqueteId"));
					    		Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(record != null){
					    			Efx.form.setValues("kycPaqueteCuentaAhorroForm", record.data);
					    			Efx.form.setDisable("kycPaqueteCuentaAhorroForm");
					    			Efx.form.setDisable("kycPaqueteAdicionalCuentaAhorroForm");
					    			Efx.form.switchButton(configWindow, "rowclick");
						    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    		};
					    		Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").store.clearFilter(true);
					    		Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").store.filter("kycPaquete.kycPaqueteId", new RegExp(filtradoDatos, 'i'));
					    		if (Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").store.getCount()<=0){
									Ext.getCmp("kycPaqueteCuentaAhorroEditarBottom").setDisabled(true);
					    		}else{
					    			Ext.getCmp("kycPaqueteCuentaAhorroEditarBottom").setDisabled(false);
					    		}
								Ext.getCmp("kycPaqueteCuentaAhorroEliminarTop").setDisabled(false);
								Ext.getCmp("kycPaqueteCuentaAhorroGuardarTop").setDisabled(false);
								Ext.getCmp("kycPaqueteCuentaAhorroEliminarBottom").setDisabled(false);
								Ext.getCmp("kycPaqueteCuentaAhorroGuardarBottom").setDisabled(false);
					    		if(config.kycAdicionalPersonas ==undefined || config.kycAdicionalPersonas == null || config.kycAdicionalPersonas.length <= 0){
					    			Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
					    		}
								if(Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").store.getCount() > 0) Efx.grid2.selectFirstRow(Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid"));
								if(Ext.getCmp("kycPaqueteAdicionalCuentaAhorroGrid").store.getCount() < 1) {
									Efx.form2.clearAndDisable("kycPaqueteAdicionalCuentaAhorroForm");
								}
								Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
					    		valorTemporal= Ext.getCmp("kycProductoSaveAuxId").getValue();
					    		if (valorTemporal.lenght>0){
					    			Ext.getCmp("kycProductoSaveId").setValue(Ext.getCmp("kycProductoSaveAuxId").getValue());
					    		}
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
									Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);

					    	},
					    	afterrender: function(model, records){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindowBottom, "cancelNotClear");
					    		if(this.store.getCount()<=0){
									Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
									Ext.getCmp("kycPaqueteCuentaAhorroEditarBottom").setDisabled(true);
									}

					    		if(config.kycAdicionalPersonas ==undefined || config.kycAdicionalPersonas == null || config.kycAdicionalPersonas.length <= 0){
					    			Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
					    		}
					    		if(this.store.data.items.length <= 0){
									Ext.getCmp("kycPaqueteCuentaAhorroEditarTop").setDisabled(true);
								}
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
					    	},
					    	itemclick: function(dv, record, item, index, e) {
					    		if(this.store.data.items.length > 0) {
						    		Efx.form.switchButton(configWindowTop, "cancelNotClear");
						    		Ext.getCmp("kycPaqueteCuentaAhorroEditarTop").setDisabled(false);
						    	}
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					        }
					    }
					},{
			        	xtype: "form",
						id: "kycPaqueteCuentaAhorroForm",
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
								text: "PAQUETE MULTIPRODUCTOS - CUENTA AHORRO",
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
								id:"ctgListadoTipoPaquete",
								name: "ctgListadoTipoPaquete.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgListadoCuentaAhorro || [],
									fields: ["ctgCatalogoId", "ctgCatalogoNombre", "ctgTCatalogoPadre", "ctgCatalogoHijo"]
								}),
								displayField: "ctgCatalogoNombre",
								valueField: "ctgCatalogoId",
								allowBlank: false,
								colspan: 2,
								listeners:{
										change : function() {
											if (this.getValue() != null)
												{
											Ext.getCmp("ctgPrefijo").setValue(this.getValue());
											Ext.getCmp("ctgMoneda").setValue(this.getValue());
											Ext.getCmp("ctgPaquete").setValue(this.getValue());
												}
										}}
							},
							{
								xtype: "combo",
								id:"ctgPrefijo",
								name: "ctgPrefijo.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgPrefijo || [],
									fields: ["ctgPrefijoId", "ctgPrefijoNombre", "ctgPrefijoPrefijo", "ctgPrefijoMoneda",
											"ctgPrefijoPaquete"]
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
									         "ctgMonedaPaquete"]
								}),
								displayField: "ctgMonedaMoneda",
								valueField: "ctgMonedaId",
								width:100,
								hideTrigger: true,
								readOnly: true,
								colspan: 1
							},{
								xtype: "combo",
								id:"ctgPaquete",
								name: "ctgPaquete.ctgCatalogoId",
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
								id:"kycPaqueteCuentaAhorro.ctgTipotarjeta",
								name: "ctgTipoTarjeta.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoTarjetaCuentaAhorro || [],
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
										Efx.utils.setDisabled("kycPaqueteViajeroFrecuente", !disable, false);
										Efx.utils.setDisabled("kycPaqueteNumeroViajeroFrecuente", !disable, false);
										}}
							},{
								xtype : "combo",
								id:"kycPaqueteViajeroFrecuente",
								name : "kycPaqueteCuentaAhorro.kycPaqueteViajeroFrecuente",
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
										Efx.utils.setDisabled("kycPaqueteNumeroViajeroFrecuente",disable, true);

										Efx.combos.setRequiredAndValidate("kycPaqueteNumeroViajeroFrecuente", !disable);

									}}
							},
							 {
								xtype : "textfield",
								id:"kycPaqueteNumeroViajeroFrecuente",
								name : "kycPaqueteCuentaAhorro.kycPaqueteNumeroViajeroFrecuente",
								maxLength: 30,
								colspan:2
							},
							{xtype: "label", text: "Oficina de Entrega", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Nombre que desea en Tarjeta", cls: "x-form-item label_spacing",  colspan: 4},
							{
								xtype: "combo",
								id:"kycPaqueteCuentaAhorro.ctgOficinaEntrega",
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
								id:"kycPaqueteNombreTarjeta",
								name : "kycPaqueteCuentaAhorro.kycPaqueteNombreTarjeta",
								maxLength : 100,
								allowBlank: false,
								colspan:4
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycPaqueteId",
								name: "kycPaqueteCuentaAhorro.kycPaqueteId"
							},{
								xtype: "hidden",
								id: "ctgTipoPaqueteId",
								name: "kycPaqueteCuentaAhorro.ctgTipoPaquete.ctgCatalogoId"
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
								id: "kycPaqueteAdicionalCuentaAhorroId",
								name: "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalId"
							},
							{
								xtype: "hidden",
								id: "kycProductoSaveId"
							},
							{
								xtype: "hidden",
								id: "kycProductoSaveAuxId"
							}
						]
			        },
			        {
						xtype: "grid",
						id: "kycPaqueteAdicionalCuentaAhorroGrid",
						height: 150,
						width:730,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycPaqueteAdicionalCuentaAhorro || [],
					    	fields: [
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalId",
				    	     	"kycPaquete.kycPaqueteId",
				    	     	"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalId",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombre",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalCedula",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalViajeroFrecuente",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNumeroViajeroFrecuente",
								"kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombreTarjeta",
								"kyc.kycFechaActualizacion",
								"ctgTipoTarjeta.ctgCatalogoId",
								"ctgOficinaEntrega.ctgSucursalId"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre de Adicional",  dataIndex: "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombre", flex: 2, minWidth: 200},
							      {header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalCedula",flex: 1, width: 100}
					    ],
					    listeners: {
							selectionchange: function(model, records){
								valorTemporalColumnaId=Ext.getCmp("kycProductoSaveAuxId").getValue();
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(!records || records.length <= 0) return;
								var record = records[0];
								if(record != null){
									Efx.form.setValues("kycPaqueteAdicionalCuentaAhorroForm", record.data);
									Efx.form.setDisable("kycPaqueteAdicionalCuentaAhorroForm");
								}
								Efx.form.switchButton(configWindow, "rowclick");
								Efx.form.switchButton(configWindowBottom, "rowclick");
								if(this.store.data.items.length > 0)Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(false);
								if(this.store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
								if(this.store.data.items.length > 0)Ext.getCmp("kycPaqueteCuentaAhorroEditarBottom").setDisabled(false);
								if(this.store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaAhorroEditarBottom").setDisabled(true);
					    		//Validacion para verificar sino hay adicionales
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
									Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
							},
							afterrender: function(){
								if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
								Efx.form.switchButton(configWindow, "cancelNotClear");
								Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
					    			Ext.getCmp("kycPaqueteCuentaAhorroAgregarBottom").setDisabled(true);
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
						id: "kycPaqueteAdicionalCuentaAhorroForm",
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
											Ext.getCmp("kycPaqueteAdicionalNombre").setValue(this.getRawValue());
											Ext.getCmp("kycPaqueteAdicionalCedula").setValue(this.getValue());
												}
											else {  }
										}}
							},

							{
								xtype : "textfield",
								id:"kycPaqueteAdicionalNombre",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombre",
								maxLength: 100,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycPaqueteAdicionalCedula",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalCedula",
								maxLength: 20,
								allowBlank: false,
								colspan:2,
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
								id:"ctgTipotarjeta",
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
										Efx.utils.setDisabled("kycPaqueteAdicionalViajeroFrecuente", !disable, false);
										Ext.getCmp("kycPaqueteAdicionalViajeroFrecuente").clearValue();
										Ext.getCmp("kycPaqueteAdicionalViajeroFrecuente").clearInvalid();
										Efx.utils.setDisabled("kycPaqueteAdicionalNumeroViajeroFrecuente", !disable, false);

										Efx.combos.setRequiredAndValidate("kycPaqueteAdicionalViajeroFrecuente", disable);

										}}
							},{
								xtype : "combo",
								id:"kycPaqueteAdicionalViajeroFrecuente",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalViajeroFrecuente",
								store : new Ext.data.SimpleStore({
									data : Efx.combos.yesnoArray() || [],
									fields : [ "id", "descripcion" ]
								}),
								displayField : "descripcion",
								valueField: "id",
								allowBlank: false,
								colspan : 2,
								listeners : {
									change : function() {
										var disable = this.getValue() != "1";
										Efx.utils.setDisabled("kycPaqueteAdicionalNumeroViajeroFrecuente",disable, true);

										Efx.combos.setRequiredAndValidate("kycPaqueteAdicionalNumeroViajeroFrecuente", !disable);

									}}
							},
							 {
								xtype : "textfield",
								id:"kycPaqueteAdicionalNumeroViajeroFrecuente",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNumeroViajeroFrecuente",
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
								colspan: 2,
							},
							{
								xtype : "textfield",
								id:"kycPaqueteAdicionalNombreTarjeta",
								name : "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalNombreTarjeta",
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
								id: "kycPaqueteAdicionalCuentaAhorroId",
								name: "kycPaqueteAdicionalCuentaAhorro.kycPaqueteAdicionalId"
							},{
								xtype: "hidden",
								id: "ctgTipoPaqueteId",
								name: "kycPaqueteAdicionalCuentaAhorro.ctgTipoPaquete.ctgCatalogoId"
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