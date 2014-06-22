KycProductoCuentaCorriente = function(){
	var configWindow = {
		add: "kycProductoCuentaCorrienteAgregarTop",
		edit: "kycProductoCuentaCorrienteEditarTop",
		remove: "kycProductoCuentaCorrienteEliminarTop",
		grid2: "kycProductoAdicionalCuentaCorriente",
		save: "kycProductoCuentaCorrienteGuardarTop",
		form: "kycProductoCuentaCorrienteForm",
		form2: "kycProductoAdicionalCuentaCorrienteForm"
	};
	var configWindowBottom = {
			add: "kycProductoCuentaCorrienteAgregarBottom",
			edit: "kycProductoCuentaCorrienteEditarBottom",
			remove: "kycProductoCuentaCorrienteEliminarBottom",
			save: "kycProductoCuentaCorrienteGuardarBottom"
	};
	var configWindowTop = {
		add: "kycProductoCuentaCorrienteAgregarTop",
		edit: "kycProductoCuentaCorrienteEditarTop",
		remove: "kycProductoCuentaCorrienteEliminarTop",
		save: "kycProductoCuentaCorrienteGuardarTop"
	};
	return {
		abrirAdicCuentaCorriente: function(){
			if(Ext.isEmpty(EfxKYC.getKycId()) || Ext.isEmpty(EfxKYC.getKycPersonaFisicaId())){
				Efx.message.alert(Efx.constants.KYC_NO_EXISTE_PERSONA_FISICA);
				return;
			}
			EfxMenu.openSelfWindow(
				"kycProductosAdicionales/view",
				{
					kycId: EfxKYC.getKycId(),
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
					kycProductoId: Ext.getCmp("kycProductoCuentaCorrienteId").getValue(),
					kycTipoProducto : Efx.constants.codes.CUENTA_CORRIENTE
				}
			);
		},

		agregarProductoCuentaCorriente: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
    		Efx.form.clearAndEnable("kycProductoCuentaCorrienteForm");
			Ext.getCmp("ctgTipotarjeta").disable();
			Ext.getCmp("kycProductoCuentaCorrienteGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoCuentaCorrienteGuardarTop").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue("");
			Ext.getCmp("kycProductoSaveAuxId").setValue(valorTemporalColumnaId);
		},
		agregarProductoCuentaCorrienteAdicional: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "add");
			Efx.form2.switchButton(configWindowBottom, "add");
    		Efx.form2.clearAndEnable("kycProductoAdicionalCuentaCorrienteForm");
			Ext.getCmp("kycProductoCuentaCorrienteGuardarTop").setDisabled(true);
			Ext.getCmp("kycProductoCuentaCorrienteGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			Ext.getCmp("kycProductoAdicionalCuentaCorrienteId").setValue("");
			Ext.getCmp("kycProductoSaveAuxId").setValue(Ext.getCmp("kycProductoSaveId").getValue());
		},
		editarProductoCuentaCorriente: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Efx.form.switchButton(configWindowTop, "edit");
			Ext.getCmp("kycProductoCuentaCorrienteEliminarBottom").setDisabled(true);
			Ext.getCmp("kycProductoCuentaCorrienteGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoCuentaCorrienteEliminarTop").setDisabled(false);
			Ext.getCmp("kycProductoCuentaCorrienteGuardarTop").setDisabled(false);
			Ext.getCmp("kycProductoAdicionalCuentaCorrienteId").setValue("");
			if (Ext.getCmp("ctgTipotarjeta").getValue()>0){
			} else {
				Ext.getCmp("ctgTipotarjeta").disable();
			}
		},
		editarProductoCuentaCorrienteAdicional: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "edit");
			Efx.form2.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycProductoCuentaCorrienteGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoCuentaCorrienteEliminarBottom").setDisabled(false);
			Ext.getCmp("kycProductoCuentaCorrienteEliminarTop").setDisabled(true);
			Ext.getCmp("kycProductoCuentaCorrienteGuardarTop").setDisabled(true);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
			Ext.getCmp("kycProductoCuentaCorrienteGuardarBottom").setDisabled(true);
		},
		eliminarProductoCuentaCorriente: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductos/delete",
					params: {
						kycProductoId: Efx.utils.getValue("kycProductoCuentaCorrienteId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_CORRIENTE
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoCuentaCorrienteForm");
								if(Ext.getCmp("kycProductoCuentaCorrienteGrid").store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycProductoCuentaCorriente){
			    					Ext.getCmp("kycProductoCuentaCorrienteGrid").getStore().loadData(jsonObject.kycProductoCuentaCorriente);
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
		eliminarProductoAdicionalCuentaCorriente: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductos/deleteAdicional",
					params: {
						kycProductoAdicionalId : Ext.getCmp("kycProductoAdicionalCuentaCorrienteId").getValue(),
						kycProductoId:Ext.getCmp("kycProductoSaveId").getValue(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_CORRIENTE
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(false);
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.form.switchButton(configWindowTop, "rowclick");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoAdicionalCuentaCorrienteForm");
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(true);
								if(Ext.getCmp("kycProductoCuentaCorrienteGrid").store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycProductoCuentaCorrienteAdicional){
			    					Ext.getCmp("kycProductoAdicionalCuentaCorriente").getStore().loadData(jsonObject.kycProductoCuentaCorrienteAdicional);
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
		guardarProductoCuentaCorriente: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoCuentaCorrienteForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductos/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoCuentaCorriente.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
					"kycProductoCuentaCorriente.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
					"kycProductoCuentaCorriente.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CUENTA_CORRIENTE,
    				 kycTipoProducto : Efx.constants.codes.CUENTA_CORRIENTE
    			},
    			success: function(form, action){
    				Ext.getCmp("kycProductoAdicionalCuentaCorriente").store.clearFilter(true);
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoCuentaCorrienteForm", true);
    				Ext.getCmp("kycProductoSaveAuxId").setValue("");
    				if(action.result.kycProductoCuentaCorriente){
    					Ext.getCmp("kycProductoCuentaCorrienteGrid").getStore().loadData(action.result.kycProductoCuentaCorriente);
    					Ext.getCmp("kycProductoCuentaCorrienteGrid").getSelectionModel().select(action.result.kycProductoCuentaCorrienteIndex);
    				}
    				EfxKYC.setKycMostrarCobis(jsonObject.kycMostrarCobis);
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		guardarProductoCuentaCorrienteAdicional: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
   			Ext.getCmp("kycProductoAdicionalCuentaCorrienteForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductos/saveAdicional",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoAdicionalCuentaCorriente.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoAdicionalCuentaCorriente.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoAdicionalCuentaCorriente.ctgTipoProducto.ctgCatalogoId":Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE,
    				"kycProductoAdicionalCuentaCorriente.kycProducto.kycProductoId": Ext.getCmp("kycProductoSaveId").getValue(),
    				kycTipoProducto: Efx.constants.codes.CUENTA_CORRIENTE
    			},
    			success: function(form, action){
    				Ext.getCmp("kycProductoAdicionalCuentaCorriente").store.clearFilter(true);
    				Ext.getCmp("kycProductoAdicionalCuentaCorriente").store.filter("kycProductoAdicionalCuentaCorriente.kycProductoId", new RegExp(Ext.getCmp("kycProductoSaveId").getValue(), 'i'));
    				Efx.form.switchButton(configWindowBottom, "save");
    				Ext.getCmp("kycProductoCuentaCorrienteEditarBottom").setDisabled(false);
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoAdicionalCuentaCorrienteForm", true);
    				if(action.result.kycProductoCuentaCorrienteAdicional){
    					Ext.getCmp("kycProductoAdicionalCuentaCorriente").getStore().loadData(action.result.kycProductoAdicionalCuentaCorriente);
    					Ext.getCmp("kycProductoAdicionalCuentaCorriente").getSelectionModel().select(action.result.kycProductoAdicionalCuentaCorrienteIndex);
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
							   text: "Nuevo Producto",
							   id: "kycProductoCuentaCorrienteAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoCuentaCorriente.agregarProductoCuentaCorriente
						   },{
					    	   text: "Editar Producto",
					    	   id: "kycProductoCuentaCorrienteEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoCuentaCorriente.editarProductoCuentaCorriente
					       },{
					    	   text: "Eliminar Producto",
					    	   id: "kycProductoCuentaCorrienteEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoCuentaCorriente.eliminarProductoCuentaCorriente
					       },
					       {
					    	   text: "Guardar Producto",
					    	   id: "kycProductoCuentaCorrienteGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoCuentaCorriente.guardarProductoCuentaCorriente
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
							   id: "kycProductoCuentaCorrienteAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoCuentaCorriente.agregarProductoCuentaCorrienteAdicional
						   },{
					    	   text: "Editar Adicional",
					    	   id: "kycProductoCuentaCorrienteEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoCuentaCorriente.editarProductoCuentaCorrienteAdicional
					       },{
					    	   text: "Desvincular Adicional",
					    	   id: "kycProductoCuentaCorrienteEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoCuentaCorriente.eliminarProductoAdicionalCuentaCorriente
					       },
					       {
					    	   text: "Guardar Adicional",
					    	   id: "kycProductoCuentaCorrienteGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoCuentaCorriente.guardarProductoCuentaCorrienteAdicional
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoCuentaCorrienteGrid",
						height: 120,
						width:730,
						collapsible: true,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoCuentaCorriente || [],
					    	fields: [
								"kycProductoCuentaCorriente.kycProductoId",
								"kycProductoCuentaCorriente.kycProductoViajeroFrecuente",
								"kycProductoCuentaCorriente.kycProductoNumeroViajeroFrecuente",
								"kycProductoCuentaCorriente.kycProductoNombreTarjeta",
								"kycProductoCuentaCorriente.kycProductoNumeroCuenta",
								"kycProductoCuentaCorriente.kycProductoMontoColones",
								"kycProductoCuentaCorriente.kycProductoMontoDolares",
								"kycProductoCuentaCorriente.kycProductoFechaVencimiento",
								"kycProductoCuentaCorriente.kycProductoFechaInicioDebito",
								"kycProductoCuentaCorriente.kycProductoRenovacionAutomatica",
								"kycProductoCuentaCorriente.kycProductoTarjetaDebito",
								"kycProductoCuentaCorriente.kycProductoFecha1",
								"kycProductoCuentaCorriente.kycProductoFecha2",
								"kycProductoCuentaCorriente.kycProductoFecha3",
								"kycProductoCuentaCorriente.kycProductoCantidadTalonarios",
								"kycProductoCuentaCorriente.kycFechaActualizacion",
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
							      {header: "Nombre de Tarjeta",  dataIndex: "kycProductoCuentaCorriente.kycProductoNombreTarjeta",flex: 1, width: 100}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(!records || records.length <= 0){
								Ext.getCmp("kycProductoCuentaCorrienteEliminarTop").setDisabled(true);
								Ext.getCmp("kycProductoCuentaCorrienteGuardarTop").setDisabled(true);
								}
					    		var filtradoDatos = parseInt(Ext.getCmp("kycProductoCuentaCorrienteGrid").getSelectionModel().getSelection()[0].get("kycProductoCuentaCorriente.kycProductoId"));
					    		Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(record != null){
					    			Efx.form.setValues("kycProductoCuentaCorrienteForm", record.data);
					    			Efx.form.setDisable("kycProductoCuentaCorrienteForm");
					    			Efx.form.setDisable("kycPaqueteAdicionalCuentaCorrienteForm");
					    			Efx.form.switchButton(configWindow, "rowclick");
						    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    		};
					    		Ext.getCmp("kycProductoAdicionalCuentaCorriente").store.clearFilter(true);
					    		Ext.getCmp("kycProductoAdicionalCuentaCorriente").store.filter("kycProductoAdicionalCuentaCorriente.kycProductoId", new RegExp(filtradoDatos, 'i'));
					    		if (Ext.getCmp("kycProductoAdicionalCuentaCorriente").store.getCount()<=0){
									Ext.getCmp("kycProductoCuentaCorrienteEditarBottom").setDisabled(true);
					    		}else{
					    			Ext.getCmp("kycProductoCuentaCorrienteEditarBottom").setDisabled(false);
					    		}
								Ext.getCmp("kycProductoCuentaCorrienteEliminarTop").setDisabled(false);
								Ext.getCmp("kycProductoCuentaCorrienteGuardarTop").setDisabled(false);
								Ext.getCmp("kycProductoCuentaCorrienteEliminarBottom").setDisabled(false);
								Ext.getCmp("kycProductoCuentaCorrienteGuardarBottom").setDisabled(false);

								if(Ext.getCmp("kycProductoAdicionalCuentaCorriente").store.getCount() > 0) Efx.grid2.selectFirstRow(Ext.getCmp("kycProductoAdicionalCuentaCorriente"));
								if(Ext.getCmp("kycProductoAdicionalCuentaCorriente").store.getCount() < 1) {
									Efx.form2.clearAndDisable("kycProductoAdicionalCuentaCorrienteForm");
								}
								Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(true);
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
									Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(true);
					    	},
					    	afterrender: function(model, records){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindowBottom, "cancelNotClear");
					    		if(this.store.getCount()<=0){
									Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(true);
									Ext.getCmp("kycProductoCuentaCorrienteEditarBottom").setDisabled(true);
									}
					    		if(this.store.data.items.length <= 0){
									Ext.getCmp("kycProductoCuentaCorrienteEditarTop").setDisabled(true);
								}
					    		valorTemporal= Ext.getCmp("kycProductoSaveAuxId").getValue();
					    		if (valorTemporal.lenght>0){
					    			Ext.getCmp("kycProductoSaveId").setValue(Ext.getCmp("kycProductoSaveAuxId").getValue());
					    		}
					    	},
					    	itemclick: function(dv, record, item, index, e) {
					    		if(this.store.data.items.length > 0) {
						    		Efx.form.switchButton(configWindowTop, "cancelNotClear");
						    		Ext.getCmp("kycProductoCuentaCorrienteEditarTop").setDisabled(false);
						    	}
					    		valorTemporal= Ext.getCmp("kycProductoSaveAuxId").getValue();
					    		if (valorTemporal!=""){
					    			Ext.getCmp("kycProductoSaveId").setValue(Ext.getCmp("kycProductoSaveAuxId").getValue());
					    		}
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					        }
					    }
					},{
			        	xtype: "form",
						id: "kycProductoCuentaCorrienteForm",
						flex: 1,
					    border: false,
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
								text: "CUENTA CORRIENTE",
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
								id:"ctgListadoTipoProducto",
								name: "ctgListadoTipoProducto.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgListadoCuentaCorriente || [],
									fields: ["ctgListadoCuentaCorrienteId", "ctgListadoCuentaCorrienteNombre"]
								}),
								displayField: "ctgListadoCuentaCorrienteNombre",
								valueField: "ctgListadoCuentaCorrienteId",
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

									},
									blur : function(){
										var comboProducto = Ext.getCmp('ctgListadoTipoProducto');
										if (comboProducto.getRawValue()<=0){Ext.getCmp("ctgTipotarjeta").disable();}
									}
								}
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
								allowBlank: false,
								lastQuery: '',
								queryMode: 'local',
								triggerAction: 'all',
								listeners : {
									change : function() {
										var comboProducto = Ext.getCmp('ctgListadoTipoProducto');
										if (comboProducto.getValue()==null){
											this.store.clearFilter(true);
										};
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
											caseSensitive = false;
											if (comboProducto.getRawValue().indexOf("D\u00d3LARES")>=0) {
												this.store.filter("ctgTipoTarjetaNombre", new RegExp(Ext.String.escapeRegex("D\u00d3LARES"), 'i'));
											} else if (comboProducto.getRawValue().indexOf("EURO")>=0) {
												this.store.filter("ctgTipoTarjetaNombre", new RegExp(Ext.String.escapeRegex("EURO"), 'i'));
											} else if (comboProducto.getRawValue().indexOf("COLONES")>=0) {
												this.store.filter("ctgTipoTarjetaNombre", new RegExp(Ext.String.escapeRegex("COLONES"), 'i'));
											}
									}
								}
							},{
								xtype : "combo",
								id:"kycProductoViajeroFrecuente",
								name : "kycProductoCuentaCorriente.kycProductoViajeroFrecuente",
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
										Efx.utils.setDisabled("kycProductoNumeroViajeroFrecuente",disable, true);

										Efx.combos.setRequiredAndValidate("kycProductoNumeroViajeroFrecuente", !disable);
									}}
							},
							 {
								xtype : "textfield",
								id:"kycProductoNumeroViajeroFrecuente",
								name : "kycProductoCuentaCorriente.kycProductoNumeroViajeroFrecuente",
								maxLength: 30,
								colspan:2
							},
							{xtype: "label", text: "Autorizo emitir Talonarios de Cheques", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Tipo de Chequera", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype : "numberfield",
								id:"kycProductoCantidadTalonarios",
								name : "kycProductoCuentaCorriente.kycProductoCantidadTalonarios",
								maxValue : 30,
								minValue: 0,
							allowBlank: false,
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
								name : "kycProductoCuentaCorriente.kycProductoNombreTarjeta",
								maxLength : 100,
								width: 480,
								allowBlank: false,
								colspan:4
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoCuentaCorrienteId",
								name: "kycProductoCuentaCorriente.kycProductoId"
							},
							{
								xtype: "hidden",
								id: "kycProductoAdicionalCuentaCorrienteId",
								name: "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoCuentaCorriente.ctgTipoProducto.ctgCatalogoId"
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
							},{
								xtype: "hidden",
								id: "kycProductoSaveAuxId"
							}
						]
			        },
					 {
								xtype: "grid",
								id: "kycProductoAdicionalCuentaCorriente",
								height: 120,
								width:730,
								collapsible: true,
								colspan: 6,
								minHeight: 10,
								store: new Ext.data.SimpleStore({
							    	data: config.kycProductoAdicionalCuentaCorriente || [],
							    	fields: [
												"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalId",
												"kycProductoAdicionalCuentaCorriente.kycProductoId",
												"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombre",
												"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalCedula",
												"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalViajeroFrecuente",
												"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNumeroViajeroFrecuente",
												"kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombreTarjeta",
												"kycProductoAdicionalCuentaCorriente.kycFechaActualizacion",
												"ctgTipoTarjeta.ctgCatalogoId",
												"ctgOficinaEntrega.ctgSucursalId"
						    	        ]
								    }),
								    columns: [
								{header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
								{header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalCedula",flex: 1, width: 100}
								],
								  listeners: {
								    	selectionchange: function(model, records){
								    		if(!records || records.length <= 0) return;
								    		if(!records || records.length <= 0){
								    			Ext.getCmp("kycProductoCuentaCorrienteEliminarBottom").setDisabled(true);
												Ext.getCmp("kycProductoCuentaCorrienteGuardarBottom").setDisabled(true);
												}
								    		var record = records[0];
								    		if(record != null){
								    			Efx.form.setValues("kycProductoAdicionalCuentaCorrienteForm", record.data);
								    			Efx.form.setDisable("kycProductoAdicionalCuentaCorrienteForm");
								    		}
								    		Efx.form.switchButton(configWindow, "rowclick");
								    		Efx.form.switchButton(configWindowBottom, "rowclick");
											Ext.getCmp("kycProductoCuentaCorrienteEliminarTop").setDisabled(false);
											Ext.getCmp("kycProductoCuentaCorrienteGuardarTop").setDisabled(false);
											Ext.getCmp("kycProductoCuentaCorrienteEliminarBottom").setDisabled(false);
											Ext.getCmp("kycProductoCuentaCorrienteGuardarBottom").setDisabled(false);
											if(this.store.getCount() > 0) Efx.grid2.selectFirstRow(this.store.first());
								    		if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								    			Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(true);
											if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
												Ext.getCmp("kycProductoCuentaCorrienteAgregarBottom").setDisabled(true);
								    	},
								    	afterrender: function(){
								    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
								    		Efx.form.switchButton(configWindow, "cancelNotClear");
								    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
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
							id: "kycProductoAdicionalCuentaCorrienteForm",
							flex: 1,
						    border: false,
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
												Ext.getCmp("kycProductoAdicionalNombre").setValue(this.getRawValue());
												Ext.getCmp("kycProductoAdicionalCedula").setValue(this.getValue());
													}
												else
													{

													}
											}
										}
								},
								{
									xtype : "textfield",
									id:"kycProductoAdicionalNombre",
									name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombre",
									readOnly: true,
									allowBlank: false,
									maxLength: 100,
									colspan:2
								},
								{
									xtype : "textfield",
									id:"kycProductoAdicionalCedula",
									name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalCedula",
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
									id:"ctgTipotarjetaAdicional",
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
										Efx.utils.setDisabled("kycProductoAdicionalNumeroViajeroFrecuente", !disable, false);

										Efx.combos.setRequiredAndValidate("kycProductoAdicionalViajeroFrecuente", disable);
										}}
								},{
									xtype : "combo",
									id:"kycProductoAdicionalViajeroFrecuente",
									name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalViajeroFrecuente",
									store : new Ext.data.SimpleStore({
										data : Efx.combos.yesnoArray() || [],
										fields : [ "id", "descripcion"]
									}),
									displayField : "descripcion",
									valueField: "id",
									colspan : 2,
								allowBlank: false,
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
									name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNumeroViajeroFrecuente",
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
									valueField: "ctgOficinasId",
								allowBlank: false,
									colspan: 2
								},
								{
									xtype : "textfield",
									id:"kycProductoAdicionalNombreTarjeta",
									name : "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalNombreTarjeta",
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
									id: "kycProductoAdicionalCuentaCorrienteId",
									name: "kycProductoAdicionalCuentaCorriente.kycProductoAdicionalId"
								},{
									xtype: "hidden",
									id: "kycProductoSaveId"
								},{
									xtype: "hidden",
									id: "ctgTipoProductoId",
									name: "kycProductoAdicionalCuentaCorriente.ctgTipoProducto.ctgCatalogoId"
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