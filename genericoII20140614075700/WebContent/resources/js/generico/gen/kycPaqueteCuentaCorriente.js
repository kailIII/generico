KycPaqueteCuentaCorriente = function(){
	var configWindow = {
		add: "kycPaqueteCuentaCorrienteAgregarTop",
		edit: "kycPaqueteCuentaCorrienteEditarTop",
		remove: "kycPaqueteCuentaCorrienteEliminarTop",
		grid2: "kycProductoAdicionalCuentaCorrienteGrid",
		save: "kycPaqueteCuentaCorrienteGuardarTop",
		form: "kycPaqueteCuentaCorrienteForm",
		form2: "kycPaqueteAdicionalCuentaCorrienteForm"
	};
	var configWindowBottom = {
			add: "kycPaqueteCuentaCorrienteAgregarBottom",
			edit: "kycPaqueteCuentaCorrienteEditarBottom",
			remove: "kycPaqueteCuentaCorrienteEliminarBottom",
			save: "kycPaqueteCuentaCorrienteGuardarBottom"
	};
	var configWindowTop = {
		add: "kycPaqueteCuentaCorrienteAgregarTop",
		edit: "kycPaqueteCuentaCorrienteEditarTop",
		remove: "kycPaqueteCuentaCorrienteEliminarTop",
		save: "kycPaqueteCuentaCorrienteGuardarTop"
	};
	return {
		abrirPaqueteAdicCuentaCorriente: function(){
			if(Ext.isEmpty(EfxKYC.getKycId()) || Ext.isEmpty(EfxKYC.getKycPersonaFisicaId())){
				Efx.message.alert(Efx.constants.KYC_NO_EXISTE_PERSONA_FISICA);
				return;
			}
			EfxMenu.openSelfWindow(
				"kycPaquetesAdicionales/view",
				{
					kycId: EfxKYC.getKycId(),
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
					kycPaqueteId: Ext.getCmp("kycPaqueteCuentaCorrienteId").getValue(),
					kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE
				}
			);
		},

		agregarPaqueteCuentaCorriente: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
    		Efx.form.clearAndEnable("kycPaqueteCuentaCorrienteForm");
			Ext.getCmp("ctgTipotarjeta").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaCorrienteGuardarBottom").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaCorrienteGuardarTop").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue("");
			Ext.getCmp("kycProductoSaveAuxId").setValue(valorTemporalColumnaId);
		},
		agregarPaqueteAdicionalCuentaCorriente: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "add");
			Efx.form2.switchButton(configWindowBottom, "add");
    		Efx.form2.clearAndEnable("kycPaqueteAdicionalCuentaCorrienteForm");
			Ext.getCmp("kycPaqueteCuentaCorrienteGuardarTop").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaCorrienteGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteId").setValue("");
			Ext.getCmp("kycProductoSaveAuxId").setValue(Ext.getCmp("kycProductoSaveId").getValue());
		},
		editarPaqueteCuentaCorriente: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Efx.form.switchButton(configWindowTop, "edit");
			Ext.getCmp("kycPaqueteCuentaCorrienteGuardarTop").setDisabled(false);
			Ext.getCmp("kycPaqueteCuentaCorrienteEliminarTop").setDisabled(false);
			Ext.getCmp("kycPaqueteCuentaCorrienteEliminarBottom").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaCorrienteGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			Ext.getCmp("ctgTipotarjeta").setDisabled(true);
		},
		editarPaqueteAdicionalCuentaCorriente: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "edit");
			Efx.form2.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycPaqueteCuentaCorrienteGuardarBottom").setDisabled(false);
			Ext.getCmp("kycPaqueteCuentaCorrienteEliminarBottom").setDisabled(false);
			Ext.getCmp("kycPaqueteCuentaCorrienteEliminarTop").setDisabled(true);
			Ext.getCmp("kycPaqueteCuentaCorrienteGuardarTop").setDisabled(true);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
			Ext.getCmp("kycPaqueteCuentaCorrienteGuardarBottom").setDisabled(true);
		},
		eliminarPaqueteCuentaCorriente: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycPaquetes/delete",
					params: {
						kycPaqueteId: Efx.utils.getValue("kycPaqueteCuentaCorrienteId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycPaqueteCuentaCorrienteForm");
								if(Ext.getCmp("kycPaqueteCuentaCorrienteGrid").store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycPaqueteCuentaCorriente){
			    					Ext.getCmp("kycPaqueteCuentaCorrienteGrid").getStore().loadData(jsonObject.kycPaqueteCuentaCorriente);
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
		eliminarPaqueteAdicionalCuentaCorriente: function(){
				valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
				Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycPaquetes/deleteAdicional",
					params: {
						kycPaqueteAdicionalId : Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteId").getValue(),
						kycPaqueteId: EfxKYC.getKycPaqueteId(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(false);
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.form.switchButton(configWindowTop, "rowclick");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycPaqueteAdicionalCuentaCorrienteForm");
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
								if(Ext.getCmp("kycPaqueteCuentaCorrienteGrid").store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycPaqueteAdicionalCuentaCorriente){
			    					Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").getStore().loadData(jsonObject.kycPaqueteAdicionalCuentaCorriente);
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
		guardarPaqueteCuentaCorriente: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycPaqueteCuentaCorrienteForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycPaquetes/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPaqueteCuentaCorriente.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycPaqueteCuentaCorriente.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycPaqueteCuentaCorriente.ctgTipoPaquete.ctgCatalogoId" :Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE,
    				 kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE
    			},
    			success: function(form, action){
    				Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").store.clearFilter(true);
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycPaqueteCuentaCorrienteForm", true);
    				Ext.getCmp("kycProductoSaveAuxId").setValue("");
    				if(action.result.kycPaqueteCuentaCorriente){
    					Ext.getCmp("kycPaqueteCuentaCorrienteGrid").getStore().loadData(action.result.kycPaqueteCuentaCorriente);
    					Ext.getCmp("kycPaqueteCuentaCorrienteGrid").getSelectionModel().select(action.result.kycPaqueteIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		guardarPaqueteAdicionalCuentaCorriente: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycPaquetes/saveAdicional",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPaqueteAdicionalCuentaCorriente.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycPaqueteAdicionalCuentaCorriente.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycPaqueteAdicionalCuentaCorriente.ctgTipoPaquete.ctgCatalogoId":Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE,
    				"kycPaqueteAdicionalCuentaCorriente.kycPaquete.kycPaqueteId":Ext.getCmp("kycProductoSaveId").getValue(),
    				 kycTipoPaquete: Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE
    			},
    			success: function(form, action){
    				Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").store.clearFilter(true);
    				Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").store.filter("kycPaquete.kycPaqueteId", new RegExp(Ext.getCmp("kycProductoSaveId").getValue(), 'i'));
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycPaqueteAdicionalCuentaCorrienteForm", true);
    				if(action.result.kycPaqueteAdicionalCuentaCorriente){
    					Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").getStore().loadData(action.result.kycPaqueteAdicionalCuentaCorriente);
    					Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").getSelectionModel().select(action.result.kycPaqueteAdicionalCuentaCorrienteIndex);
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
				title: "PRODUCTOS - CUENTA CORRIENTE",
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
							   id: "kycPaqueteCuentaCorrienteAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycPaqueteCuentaCorriente.agregarPaqueteCuentaCorriente
						   },{
					    	   text: "Editar",
					    	   id: "kycPaqueteCuentaCorrienteEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycPaqueteCuentaCorriente.editarPaqueteCuentaCorriente
					       },{
					    	   text: "Eliminar",
					    	   id: "kycPaqueteCuentaCorrienteEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycPaqueteCuentaCorriente.eliminarPaqueteCuentaCorriente
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycPaqueteCuentaCorrienteGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycPaqueteCuentaCorriente.guardarPaqueteCuentaCorriente
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
							   id: "kycPaqueteCuentaCorrienteAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycPaqueteCuentaCorriente.agregarPaqueteAdicionalCuentaCorriente
						   },{
					    	   text: "Editar Adicional",
					    	   id: "kycPaqueteCuentaCorrienteEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycPaqueteCuentaCorriente.editarPaqueteAdicionalCuentaCorriente
					       },{
					    	   text: "Desvincular Adicional",
					    	   id: "kycPaqueteCuentaCorrienteEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycPaqueteCuentaCorriente.eliminarPaqueteAdicionalCuentaCorriente
					       },
					       {
					    	   text: "Guardar Adicional",
					    	   id: "kycPaqueteCuentaCorrienteGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycPaqueteCuentaCorriente.guardarPaqueteAdicionalCuentaCorriente
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycPaqueteCuentaCorrienteGrid",
						height: 150,
						width:730,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycPaqueteCuentaCorriente || [],
					    	fields: [
								"kycPaqueteCuentaCorriente.kycPaqueteId",
								"kycPaqueteCuentaCorriente.kycPaqueteViajeroFrecuente",
								"kycPaqueteCuentaCorriente.kycPaqueteNumeroViajeroFrecuente",
								"kycPaqueteCuentaCorriente.kycPaqueteNombreTarjeta",
								"kycPaqueteCuentaCorriente.kycPaqueteNumeroCuenta",
								"kycPaqueteCuentaCorriente.kycPaqueteMontoColones",
								"kycPaqueteCuentaCorriente.kycPaqueteMontoDolares",
								"kycPaqueteCuentaCorriente.kycPaqueteFechaVencimiento",
								"kycPaqueteCuentaCorriente.kycPaqueteFechaInicioDebito",
								"kycPaqueteCuentaCorriente.kycPaqueteRenovacionAutomatica",
								"kycPaqueteCuentaCorriente.kycPaqueteTarjetaDebito",
								"kycPaqueteCuentaCorriente.kycPaqueteFecha1",
								"kycPaqueteCuentaCorriente.kycPaqueteFecha2",
								"kycPaqueteCuentaCorriente.kycPaqueteFecha3",
								"kycPaqueteCuentaCorriente.kycPaqueteCantidadTalonarios",
								"kycPaqueteCuentaCorriente.kycFechaActualizacion",
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
								"ctgListadoTipoPaquete.ctgCatalogoNombre"
			    	        ]
					    }),
					    columns: [
					              {header: "Tipo de Producto",  dataIndex: "ctgListadoTipoPaquete.ctgCatalogoNombre", flex: 2, minWidth: 200},
							      {header: "Nombre de Tarjeta",  dataIndex: "kycPaqueteCuentaCorriente.kycPaqueteNombreTarjeta",flex: 1, width: 100}
					    ],
					    listeners: {
							selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(!records || records.length <= 0){
								Ext.getCmp("kycPaqueteCuentaCorrienteEliminarTop").setDisabled(true);
								Ext.getCmp("kycPaqueteCuentaCorrienteGuardarTop").setDisabled(true);
								}
					    		var filtradoDatos = parseInt(Ext.getCmp("kycPaqueteCuentaCorrienteGrid").getSelectionModel().getSelection()[0].get("kycPaqueteCuentaCorriente.kycPaqueteId"));
					    		Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(record != null){
					    			Efx.form.setValues("kycPaqueteCuentaCorrienteForm", record.data);
					    			Efx.form.setDisable("kycPaqueteCuentaCorrienteForm");
					    			Efx.form.setDisable("kycPaqueteAdicionalCuentaCorrienteForm");
					    			Efx.form.switchButton(configWindow, "rowclick");
						    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    		};
					    		Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").store.clearFilter(true);
					    		Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").store.filter("kycPaquete.kycPaqueteId", new RegExp(filtradoDatos, 'i'));
					    		if (Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").store.getCount()<=0){
									Ext.getCmp("kycPaqueteCuentaCorrienteEditarBottom").setDisabled(true);
					    		}else{
					    			Ext.getCmp("kycPaqueteCuentaCorrienteEditarBottom").setDisabled(false);
					    		}
								Ext.getCmp("kycPaqueteCuentaCorrienteEliminarTop").setDisabled(false);
								Ext.getCmp("kycPaqueteCuentaCorrienteGuardarTop").setDisabled(false);
								Ext.getCmp("kycPaqueteCuentaCorrienteEliminarBottom").setDisabled(false);
								Ext.getCmp("kycPaqueteCuentaCorrienteGuardarBottom").setDisabled(false);
								if(Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").store.getCount() > 0) Efx.grid2.selectFirstRow(Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid"));
								if(Ext.getCmp("kycPaqueteAdicionalCuentaCorrienteGrid").store.getCount() < 1) {
									Efx.form2.clearAndDisable("kycPaqueteAdicionalCuentaCorrienteForm");
								}
								Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
					    		valorTemporal= Ext.getCmp("kycProductoSaveAuxId").getValue();
					    		if (valorTemporal.lenght>0){
					    			Ext.getCmp("kycProductoSaveId").setValue(Ext.getCmp("kycProductoSaveAuxId").getValue());
					    		}
					    		if(this.store.data.items.length > 0)
					    			Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)
					    			Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
									Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
					    	},
					    	afterrender: function(model, records){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindowBottom, "cancelNotClear");
					    		if(this.store.getCount()<=0){
									Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
									Ext.getCmp("kycPaqueteCuentaCorrienteEditarBottom").setDisabled(true);
									}
					    		if(this.store.data.items.length <= 0){
									Ext.getCmp("kycPaqueteCuentaCorrienteEditarTop").setDisabled(true);
								}
					    		if(this.store.data.items.length > 0)
					    			Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)
					    			Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
					    	},
					    	itemclick: function(dv, record, item, index, e) {
					    		if(this.store.data.items.length > 0) {
						    		Efx.form.switchButton(configWindowTop, "cancelNotClear");
						    		Ext.getCmp("kycPaqueteCuentaCorrienteEditarTop").setDisabled(false);
						    	}
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					    		if(this.store.data.items.length > 0)
					    			Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)
					    			Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
					        }
					    }
					},{
			        	xtype: "form",
						id: "kycPaqueteCuentaCorrienteForm",
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
						listeners:
							{
								render: function()
								{
									if (config.ctgListadoCuentaCorriente == "")
										{
										Ext.getCmp("kycPaqueteCuentaCorrienteAgregarTop").disable();
										Ext.getCmp("kycPaqueteCuentaCorrienteEditarTop").disable();
										Ext.getCmp("kycPaqueteCuentaCorrienteEliminarTop").disable();
										Ext.getCmp("kycPaqueteCuentaCorrienteGuardarTop").disable();

										Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").disable();
										Ext.getCmp("kycPaqueteCuentaCorrienteEditarBottom").disable();
										Ext.getCmp("kycPaqueteCuentaCorrienteEliminarBottom").disable();
										Ext.getCmp("kycPaqueteCuentaCorrienteGuardarBottom").disable();


										Efx.utils.setVisible("formulariodeshabilitado", true);
										}
								}
							},
						defaults: {
							width: 230,
							selectOnFocus: true,
							enforceMaxLength: true,
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
							{xtype: "label",  style: "color: red; text-align: center", id: "formulariodeshabilitado", width: 700, hidden: true, text: "NO PUEDE INGRESAR UN PRODUCTO CUENTA CORRIENTE DEBIDO AL CANAL SELECCIONADO", cls: "x-form-item label_spacing", colspan: 6},
					        {
								xtype: "label",
								text: "PAQUETE MULTIPRODUCTOS - CUENTA CORRIENTE",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label",text: "Tipo de Producto", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Prefijo", cls: "x-form-item label_spacing", colspan: 1, width: 100},
							{xtype: "label", text: "Moneda", cls: "x-form-item label_spacing", colspan: 1, width: 100},
							{xtype: "label", text: "Producto", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "combo",
								id:"ctgListadoTipoPaquete",
								name: "ctgListadoTipoPaquete.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgListadoCuentaCorriente || [],
									fields: ["ctgListadoCuentaCorrienteId", "ctgListadoCuentaCorrienteNombre"]
								}),
								displayField: "ctgListadoCuentaCorrienteNombre",
								valueField: "ctgListadoCuentaCorrienteId",
								allowBlank: false,
								colspan: 2,
								listeners:{
									change : function() {
										if (this.getValue())
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
								id:"kycPaqueteCuentaCorriente.ctgTipotarjeta",
								name: "ctgTipoTarjeta.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoTarjetaCuentaCorriente || [],
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
									}}
							},{
								xtype : "combo",
								id:"kycPaqueteCuentaCorriente.kycPaqueteViajeroFrecuente",
								name : "kycPaqueteCuentaCorriente.kycPaqueteViajeroFrecuente",
								store : new Ext.data.SimpleStore({
									data : Efx.combos.yesnoArray() || [],
									fields : [ "id", "descripcion" ]
								}),
								displayField : "descripcion",
							allowBlank: false,
								valueField: "id",
								colspan : 2,
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
								name : "kycPaqueteCuentaCorriente.kycPaqueteNumeroViajeroFrecuente",
								maxLength: 30,
								colspan:2
							},
							{xtype: "label", text: "Autorizo emitir Talonarios de Cheques", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Tipo de Chequera", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype : "numberfield",
								id:"kycPaqueteCantidadTalonarios",
								name : "kycPaqueteCuentaCorriente.kycPaqueteCantidadTalonarios",
								maxValue : 30,
								allowBlank: false,
								minValue: 0,
								colspan:2,
								listeners : {
									change : function() {
										var disable = this.getValue() == "0";
										Efx.utils.setDisabled("ctgTipoChequera",disable, true);

										Efx.combos.setRequiredAndValidate("ctgTipoChequera", !disable);

									}}
							},{
								xtype: "combo",
								id:"ctgTipoChequera",
								name: "ctgTipoChequera.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoChequera || [],
									fields: ["ctgTipoChequeraId", "ctgTipoChequeraNombre"]
								}),
								displayField: "ctgTipoChequeraNombre",
								valueField: "ctgTipoChequeraId",
								colspan: 4
							},

							{xtype: "label", text: "Oficina de Entrega", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Nombre que desea en Tarjeta", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype: "combo",
								id:"kycPaqueteCuentaCorriente.ctgOficinaEntrega",
								name: "ctgOficinaEntrega.ctgSucursalId",
								allowBlank: false,
								store: new Ext.data.SimpleStore({
									data: config.ctgOficinas || [],
									fields: ["ctgOficinasId", "ctgOficinasNombre"]
								}),
								displayField: "ctgOficinasNombre",
								valueField: "ctgOficinasId",
								colspan: 2
							},
							{
								xtype : "textfield",
								id:"kycPaqueteNombreTarjeta",
								name : "kycPaqueteCuentaCorriente.kycPaqueteNombreTarjeta",
								maxLength : 100,
								width: 480,
								allowBlank: false,
								colspan:4
							},
							{
								xtype: "hidden",
								id: "kycPaqueteCuentaCorrienteId",
								name: "kycPaqueteCuentaCorriente.kycPaqueteId"
							},{
								xtype: "hidden",
								id: "ctgTipoPaqueteId",
								name: "kycPaqueteCuentaCorriente.ctgTipoPaquete.ctgCatalogoId"
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
								id: "kycPaqueteAdicionalCuentaCorrienteId",
								name: "kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalId"
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
						id: "kycPaqueteAdicionalCuentaCorrienteGrid",
						height: 150,
						width:730,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycPaqueteAdicionalCuentaCorriente || [],
				    	fields: [
					    	         	"kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalId",
						    	     	"kycPaquete.kycPaqueteId",
						    	     	"kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalId",
										"kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalNombre",
										"kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalCedula",
										"kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalViajeroFrecuente",
										"kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalNumeroViajeroFrecuente",
										"kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalNombreTarjeta",
										"kyc.kycFechaActualizacion",
										"ctgTipoTarjeta.ctgCatalogoId",
										"ctgOficinaEntrega.ctgSucursalId"
				    	        ]
						    }),
						    columns: [
						{header: "Nombre de Adicional",  dataIndex: "kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalNombre", flex: 2, minWidth: 200},
						{header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalCedula",flex: 1, width: 100}				    ],
						    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycPaqueteAdicionalCuentaCorrienteForm", record.data);
					    			Efx.form.setDisable("kycPaqueteAdicionalCuentaCorrienteForm");
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycPaqueteCuentaCorrienteEditarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycPaqueteCuentaCorrienteEditarBottom").setDisabled(true);
					    		//Validacion para verificar sino hay adicionales
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
									Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		if(Ext.getCmp("kycPaqueteCuentaCorrienteGrid").store.data.items.length > 0)
					    			Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(false);
					    		if(Ext.getCmp("kycPaqueteCuentaCorrienteGrid").store.data.items.length <= 0)
					    			Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
					    		if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
					    			Ext.getCmp("kycPaqueteCuentaCorrienteAgregarBottom").setDisabled(true);
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
						id: "kycPaqueteAdicionalCuentaCorrienteForm",
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
								text: "ADICIONALES A CUENTA CORRIENTE",
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
											else
												{

												}
										}
									}
							},
							{
								xtype : "textfield",
								id:"kycPaqueteAdicionalNombre",
								name : "kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalNombre",
								maxLength: 100,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycPaqueteAdicionalCedula",
								name : "kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalCedula",
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
								allowBlank: false,
								name: "ctgTipoTarjeta.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoTarjeta || [],
									fields: ["ctgTipoTarjetaId", "ctgTipoTarjetaNombre"]
								}),
								displayField: "ctgTipoTarjetaNombre",
								valueField: "ctgTipoTarjetaId",
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
								name : "kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalViajeroFrecuente",
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

										Efx.combos.setRequiredAndValidate("kycPaqueteAdicionalNumeroViajeroFrecuente", disable);
									}}
							},
							 {
								xtype : "textfield",
								id:"kycPaqueteAdicionalNumeroViajeroFrecuente",
								name : "kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalNumeroViajeroFrecuente",
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
								id:"kycPaqueteAdicionalNombreTarjeta",
								name : "kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalNombreTarjeta",
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
								id: "kycPaqueteAdicionalCuentaCorrienteId",
								name: "kycPaqueteAdicionalCuentaCorriente.kycPaqueteAdicionalId"
							},{
								xtype: "hidden",
								id: "ctgTipoPaqueteId",
								name: "kycPaqueteAdicionalCuentaCorriente.ctgTipoPaquete.ctgCatalogoId"
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