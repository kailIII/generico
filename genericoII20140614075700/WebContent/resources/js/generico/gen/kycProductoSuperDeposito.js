KycProductoSuperDeposito = function(){
	var configWindow = {
		add: "kycProductoSuperDepositoAgregarTop",
		edit: "kycProductoSuperDepositoEditarTop",
		remove: "kycProductoSuperDepositoEliminarTop",
		grid2: "kycProductoAdicionalSuperDepositoGrid",
		save: "kycProductoSuperDepositoGuardarTop",
		form: "kycProductoSuperDepositoForm",
		form2: "kycProductoAdicionalSuperDepositoForm"

	};
	var configWindowBottom = {
			add: "kycProductoSuperDepositoAgregarBottom",
			edit: "kycProductoSuperDepositoEditarBottom",
			remove: "kycProductoSuperDepositoEliminarBottom",
			save: "kycProductoSuperDepositoGuardarBottom"
	};
	var configWindowTop = {
		add: "kycProductoSuperDepositoAgregarTop",
		edit: "kycProductoSuperDepositoEditarTop",
		remove: "kycProductoSuperDepositoEliminarTop",
		save: "kycProductoSuperDepositoGuardarTop"
	};
	return {
		abrirAdicSuperDepositoAhorro: function(){
			if(Ext.isEmpty(EfxKYC.getKycId()) || Ext.isEmpty(EfxKYC.getKycPersonaFisicaId())){
				Efx.message.alert(Efx.constants.KYC_NO_EXISTE_PERSONA_FISICA);
				return;
			}
			Menu.openSelfWindow(
				"kycProductosAdicionales/view",
				{
					kycId: EfxKYC.getKycId(),
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
					kycProductoId: Ext.getCmp("kycProductoSuperDepositoId").getValue(),
					kycTipoProducto : Efx.constants.codes.SUPER_DEPOSITO_AHORRO
				}
			);
		},
		agregarProductoSuperDeposito: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
    		Efx.form.clearAndEnable("kycProductoSuperDepositoForm");
			Ext.getCmp("ctgTipotarjeta").setDisabled(true);
			Ext.getCmp("kycProductoSuperDepositoGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoSuperDepositoGuardarTop").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue("");
			Ext.getCmp("kycProductoSaveAuxId").setValue(valorTemporalColumnaId);
		},
		agregarProductoSuperDepositoAdicional: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "add");
			Efx.form2.switchButton(configWindowBottom, "add");
    		Efx.form2.clearAndEnable("kycProductoAdicionalSuperDepositoForm");
			Ext.getCmp("kycProductoSuperDepositoGuardarTop").setDisabled(true);
			Ext.getCmp("kycProductoSuperDepositoGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			Ext.getCmp("kycProductoAdicionalSuperDepositoId").setValue("");
			Ext.getCmp("kycProductoSaveAuxId").setValue(Ext.getCmp("kycProductoSaveId").getValue());
		},
		editarProductoSuperDeposito: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycProductoSuperDepositoEliminarBottom").setDisabled(true);
			Ext.getCmp("kycProductoSuperDepositoGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoSuperDepositoEliminarTop").setDisabled(false);
			Ext.getCmp("kycProductoSuperDepositoGuardarTop").setDisabled(false);
			Ext.getCmp("ctgTipotarjeta").setDisabled(true);
		},
		editarProductoSuperDepositoAdicional: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "edit");
			Efx.form2.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycProductoSuperDepositoEliminarTop").setDisabled(true);
			Ext.getCmp("kycProductoSuperDepositoGuardarTop").setDisabled(true);
			Ext.getCmp("kycProductoSuperDepositoEliminarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSuperDepositoGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
			Ext.getCmp("kycProductoSuperDepositoGuardarBottom").setDisabled(true);
		},
		eliminarProductoSuperDeposito: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductos/delete",
					params: {
						kycProductoId: Efx.utils.getValue("kycProductoSuperDepositoId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.SUPER_DEPOSITO_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoSuperDepositoForm");
								if(Ext.getCmp("kycProductoSuperDepositoGrid").store.data.items.length <= 0)Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycProductoSuperDeposito){
			    					Ext.getCmp("kycProductoSuperDepositoGrid").getStore().loadData(jsonObject.kycProductoSuperDeposito);
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
		eliminarProductoAdicionalSuperDeposito: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductos/deleteAdicional",
					params: {
						kycProductoAdicionalId : Ext.getCmp("kycProductoAdicionalSuperDepositoId").getValue(),
						kycProductoId: EfxKYC.getKycProductoId(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.SUPER_DEPOSITO_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(false);
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.form.switchButton(configWindowTop, "rowclick");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoAdicionalSuperDepositoForm");
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
								if(Ext.getCmp("kycProductoSuperDepositoGrid").store.data.items.length <= 0)Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycProductoSuperDepositoAdicional){
			    					Ext.getCmp("kycProductoAdicionalSuperDeposito").getStore().loadData(jsonObject.kycProductoSuperDepositoAdicional);
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
		guardarProductoSuperDeposito: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoSuperDepositoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductos/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoSuperDeposito.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoSuperDeposito.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoSuperDeposito.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.SUPER_DEPOSITO_AHORRO,
    				 kycTipoProducto : Efx.constants.codes.SUPER_DEPOSITO_AHORRO
    			},
    			success: function(form, action){
    				Ext.getCmp("kycProductoAdicionalSuperDeposito").store.clearFilter(true);
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoSuperDepositoForm", true);
    				Ext.getCmp("kycProductoSaveAuxId").setValue("");
    				if(action.result.kycProductoSuperDeposito){
    					Ext.getCmp("kycProductoSuperDepositoGrid").getStore().loadData(action.result.kycProductoSuperDeposito);
    					Ext.getCmp("kycProductoSuperDepositoGrid").getSelectionModel().select(action.result.kycProductoSuperDepositoIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		guardarProductoSuperDepositoAdicional: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			if (Ext.getCmp("kycProductoSaveId").getValue()!=null) {
   			Ext.getCmp("kycProductoAdicionalSuperDepositoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductos/saveAdicional",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoAdicionalSuperDeposito.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoAdicionalSuperDeposito.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoAdicionalSuperDeposito.ctgTipoProducto.ctgCatalogoId":Efx.constants.codes.SUPER_DEPOSITO_AHORRO,
    				"kycProductoAdicionalSuperDeposito.kycProducto.kycProductoId": Ext.getCmp("kycProductoSaveId").getValue(),
    				kycTipoProducto: Efx.constants.codes.SUPER_DEPOSITO_AHORRO
    			},
    			success: function(form, action){
    				Ext.getCmp("kycProductoAdicionalSuperDeposito").store.clearFilter(true);
    				Ext.getCmp("kycProductoAdicionalSuperDeposito").store.filter("kycProductoAdicionalSuperDeposito.kycProductoId", new RegExp(Ext.getCmp("kycProductoSaveId").getValue(), 'i'));
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoAdicionalSuperDepositoForm", true);
    				if(action.result.kycProductoAdicionalSuperDepositoGrid){
    					Ext.getCmp("kycProductoAdicionalSuperDeposito").getStore().loadData(action.result.kycProductoAdicionalSuperDepositoGrid);
    					Ext.getCmp("kycProductoAdicionalSuperDeposito").getSelectionModel().select(action.result.kycProductoAdicionalCuentaCorrienteIndex);
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
				title: "PRODUCTOS -  S\u00daPER DEP\u00d3SITO AHORRO",
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
							   id: "kycProductoSuperDepositoAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoSuperDeposito.agregarProductoSuperDeposito
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoSuperDepositoEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoSuperDeposito.editarProductoSuperDeposito
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoSuperDepositoEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoSuperDeposito.eliminarProductoSuperDeposito
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoSuperDepositoGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoSuperDeposito.guardarProductoSuperDeposito
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
							   id: "kycProductoSuperDepositoAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoSuperDeposito.agregarProductoSuperDepositoAdicional
						   },{
					    	   text: "Editar Adicional",
					    	   id: "kycProductoSuperDepositoEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoSuperDeposito.editarProductoSuperDepositoAdicional
					       },{
					    	   text: "Desvincular Adicional",
					    	   id: "kycProductoSuperDepositoEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoSuperDeposito.eliminarProductoAdicionalSuperDeposito
					       },
					       {
					    	   text: "Guardar Adicional",
					    	   id: "kycProductoSuperDepositoGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoSuperDeposito.guardarProductoSuperDepositoAdicional
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoSuperDepositoGrid",
						height: 150,
						width:730,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoSuperDeposito || [],
					    	fields: [
								"kycProductoSuperDeposito.kycProductoId",
								"kycProductoSuperDeposito.kycProductoViajeroFrecuente",
								"kycProductoSuperDeposito.kycProductoNumeroViajeroFrecuente",
								"kycProductoSuperDeposito.kycProductoNombreTarjeta",
								"kycProductoSuperDeposito.kycProductoNumeroCuenta",
								"kycProductoSuperDeposito.kycProductoMontoColones",
								"kycProductoSuperDeposito.kycProductoMontoDolares",
								"kycProductoSuperDeposito.kycProductoFechaVencimiento",
								"kycProductoSuperDeposito.kycProductoFechaInicioDebito",
								"kycProductoSuperDeposito.kycProductoRenovacionAutomatica",
								"kycProductoSuperDeposito.kycProductoTarjetaDebito",
								"kycProductoSuperDeposito.kycProductoFecha1",
								"kycProductoSuperDeposito.kycProductoFecha2",
								"kycProductoSuperDeposito.kycProductoFecha3",
								"kycProductoSuperDeposito.kycProductoCantidadTalonarios",
								"kycProductoSuperDeposito.kycFechaActualizacion",
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
							      {header: "Nombre de Tarjeta",  dataIndex: "kycProductoSuperDeposito.kycProductoNombreTarjeta",flex: 1.5, width: 100}
							      ],
					    listeners: {
							selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(!records || records.length <= 0){
								Ext.getCmp("kycProductoSuperDepositoEliminarTop").setDisabled(true);
								Ext.getCmp("kycProductoSuperDepositoGuardarTop").setDisabled(true);
								Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisable(true);
								}
					    		var filtradoDatos = parseInt(Ext.getCmp("kycProductoSuperDepositoGrid").getSelectionModel().getSelection()[0].get("kycProductoSuperDeposito.kycProductoId"));
					    		Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(record != null){
					    			Efx.form.setValues("kycProductoSuperDepositoForm", record.data);
					    			Efx.form.setDisable("kycProductoSuperDepositoForm");
					    			Efx.form.setDisable("kycPaqueteAdicionalSuperDepositoForm");
					    			Efx.form.switchButton(configWindow, "rowclick");
						    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    		};
					    		Ext.getCmp("kycProductoAdicionalSuperDeposito").store.clearFilter(true);
					    		Ext.getCmp("kycProductoAdicionalSuperDeposito").store.filter("kycProductoAdicionalSuperDeposito.kycProductoId", new RegExp(filtradoDatos, 'i'));
					    		if (Ext.getCmp("kycProductoAdicionalSuperDeposito").store.getCount()<=0){
									Ext.getCmp("kycProductoSuperDepositoEditarBottom").setDisabled(true);
					    		}else{
					    			Ext.getCmp("kycProductoSuperDepositoEditarBottom").setDisabled(false);
					    		}
								Ext.getCmp("kycProductoSuperDepositoEliminarTop").setDisabled(false);
								Ext.getCmp("kycProductoSuperDepositoGuardarTop").setDisabled(false);
								Ext.getCmp("kycProductoSuperDepositoEliminarBottom").setDisabled(false);
								Ext.getCmp("kycProductoSuperDepositoGuardarBottom").setDisabled(false);
					    		if(config.kycAdicionalPersonas ==undefined || config.kycAdicionalPersonas == null || config.kycAdicionalPersonas.length <= 0){
					    			Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
									Ext.getCmp("kycProductoSuperDepositoEditarBottom").setDisabled(true);
					    		}
								if(Ext.getCmp("kycProductoAdicionalSuperDeposito").store.getCount() > 0) Efx.grid2.selectFirstRow(Ext.getCmp("kycProductoAdicionalSuperDeposito"));
								if(Ext.getCmp("kycProductoAdicionalSuperDeposito").store.getCount() < 1) {
									Efx.form2.clearAndDisable("kycProductoAdicionalSuperDepositoForm");
								}
								Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
					    		valorTemporal= Ext.getCmp("kycProductoSaveAuxId").getValue();
					    		if (valorTemporal.lenght>0){
					    			Ext.getCmp("kycProductoSaveId").setValue(Ext.getCmp("kycProductoSaveAuxId").getValue());
					    		}
					    		if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
					    			Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
					    	},
					    	afterrender: function(model, records){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindowBottom, "cancelNotClear");
					    		if(this.store.getCount()<=0){
									Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
									Ext.getCmp("kycProductoSuperDepositoEditarBottom").setDisabled(true);
									}

					    		if(config.kycAdicionalPersonas ==undefined || config.kycAdicionalPersonas == null || config.kycAdicionalPersonas.length <= 0){
					    			Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
									Ext.getCmp("kycProductoSuperDepositoEditarBottom").setDisabled(true);
					    		}
					    		if(this.store.data.items.length <= 0){
									Ext.getCmp("kycProductoSuperDepositoEditarTop").setDisabled(true);
								}
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
					    	},
					    	itemclick: function(dv, record, item, index, e) {
					    		if(this.store.data.items.length > 0) {
						    		Efx.form.switchButton(configWindowTop, "cancelNotClear");
						    		Ext.getCmp("kycProductoSuperDepositoEditarTop").setDisabled(false);
						    	}
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form2.switchButton(configWindow, "cancelNotClear");
					        }
					    }
					},{
			        	xtype: "form",
						id: "kycProductoSuperDepositoForm",
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
					        	colspan: 8,
					        	hidden: true,
					        	width: 730
					        },{
								xtype: "label",
								text: "S\u00daPER DEP\u00d3SITO AHORRO",
								cls: "x-form-item label_header",
								colspan: 8,
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
									data: config.ctgListadoSuperDepositoAhorro || [],
									fields: ["ctgListadoSuperDepositoAhorroId", "ctgListadoSuperDepositoAhorroNombre"]
								}),
								displayField: "ctgListadoSuperDepositoAhorroNombre",
								valueField: "ctgListadoSuperDepositoAhorroId",
								allowBlank: false,
								colspan: 2,
								listeners:{
										change : function() {
											if (this.getValue())
												{
											Ext.getCmp("ctgPrefijo").setValue(this.getValue());
											Ext.getCmp("ctgMoneda").setValue(this.getValue());
											Ext.getCmp("ctgProducto").setValue(this.getValue());
											Ext.getCmp("ctgTipotarjeta").setDisabled(false);
												}
											else
												{

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
							{xtype: "label", text: "Tarjeta de D\u00e9bito", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label",text: "Tipo de Tarjeta", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype : "combo",
								id:"kycProductoTarjetaDebito",
								name : "kycProductoSuperDeposito.kycProductoTarjetaDebito",
								store : new Ext.data.SimpleStore({
									data : Efx.combos.yesnoArray() || [],
									fields : [ "id", "descripcion" ]
								}),
								displayField : "descripcion",
								valueField: "id",
								allowBlank: false,
								colspan : 2,
								listeners:{
									render: function()
									{
										if (Ext.getCmp("kycProductoTarjetaDebito").getValue() == 0)
											{
											Ext.getCmp("ctgTipotarjeta").disable();
											Ext.getCmp("ctgTipotarjeta").clearInvalid();
											Ext.getCmp("ctgTipotarjeta").clearValue();

											}
										else if (Ext.getCmp("kycProductoTarjetaDebito").getValue() == 1)
											{
											Ext.getCmp("ctgTipotarjeta").enable();
											Efx.combos.setRequiredAndValidate("ctgTipotarjeta", Ext.getCmp("ctgTipotarjeta").enable());

											}
										else
											{
											Ext.getCmp("ctgTipotarjeta").disable();
											Ext.getCmp("ctgTipotarjeta").clearInvalid();
											}
										},
										change: function()
										{
											if (Ext.getCmp("kycProductoTarjetaDebito").getValue() == 0)
											{
											Ext.getCmp("ctgTipotarjeta").disable();
											Ext.getCmp("ctgTipotarjeta").clearInvalid();
											}
										else if (Ext.getCmp("kycProductoTarjetaDebito").getValue() == 1)
											{
											Ext.getCmp("ctgTipotarjeta").enable();
											Efx.combos.setRequiredAndValidate("ctgTipotarjeta", Ext.getCmp("ctgTipotarjeta").enable());
											}
										else
											{
											Ext.getCmp("ctgTipotarjeta").disable();
											Ext.getCmp("ctgTipotarjeta").clearInvalid();
											}
										}
								}
							},{
								xtype: "combo",
							id:"ctgTipotarjeta",
							name: "ctgTipoTarjeta.ctgCatalogoId",
							store: new Ext.data.SimpleStore({
								data: config.ctgTipoTarjeta || [],
								fields: ["ctgTipoTarjetaId", "ctgTipoTarjetaNombre"]
							}),
							displayField: "ctgTipoTarjetaNombre",
							valueField: "ctgTipoTarjetaId",
							width: 480,
							allowBlank: false,
							colspan: 4,
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
									Efx.utils.setDisabled("kycProductoNumeroViajeroFrecuente", !disable, false);
									Ext.getCmp("kycProductoViajeroFrecuente").clearValue();
									Ext.getCmp("kycProductoViajeroFrecuente").clearInvalid();
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
						},
							{xtype: "label",text: "Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype : "combo",
								id:"kycProductoViajeroFrecuente",
								name : "kycProductoSuperDeposito.kycProductoViajeroFrecuente",
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
										Efx.utils.setDisabled("kycProductoNumeroViajeroFrecuente",disable, true);

										Efx.combos.setRequiredAndValidate("kycProductoNumeroViajeroFrecuente", !disable);

									}}
							},
							 {
								xtype : "textfield",
								id:"kycProductoNumeroViajeroFrecuente",
								name : "kycProductoSuperDeposito.kycProductoNumeroViajeroFrecuente",
								maxLength: 30,
								colspan:4
							},
							{xtype: "label", text: "Monto de Apertura \u00a2", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Monto de Apertura $", cls: "x-form-item label_spacing",  colspan: 4},

							{
								xtype : "numericfield",
								id:"kycProductoMontoColones",
								name : "kycProductoSuperDeposito.kycProductoMontoColones",
								allowDecimals: true,
								decimalPrecision: 2,
								maxLength : 20,
								colspan:2
							},{
								xtype : "numericfield",
								id:"kycProductoMontoDolares",
								name : "kycProductoSuperDeposito.kycProductoMontoDolares",
								maxLength : 20,
								allowDecimals: true,
								decimalPrecision: 2,
								colspan:4
							},
							{xtype: "label", text: "Oficina de Entrega", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Nombre que desea en Tarjeta", cls: "x-form-item label_spacing",  colspan: 4},
							{
								xtype: "combo",
								id:"kycProductoSuperDeposito.ctgOficinaEntrega",
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
								name : "kycProductoSuperDeposito.kycProductoNombreTarjeta",
								width: 480,
								allowBlank: false,
								maxLength : 100,
								colspan:4
							},

							{
								xtype: "hidden",
								id: "kycProductoSuperDepositoId",
								name: "kycProductoSuperDeposito.kycProductoId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoSuperDeposito.ctgTipoProducto.ctgCatalogoId"
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
								id: "kycProductoAdicionalSuperDepositoId",
								name: "kycProductoAdicionalSuperDeposito.kycProductoAdicionalId"
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
						id: "kycProductoAdicionalSuperDeposito",
						height: 150,
						width:730,
						collapsible: true,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoAdicionalSuperDeposito || [],
					    	fields: [
										"kycProductoAdicionalSuperDeposito.kycProductoAdicionalId",
										"kycProductoAdicionalSuperDeposito.kycProductoId",
										"kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombre",
										"kycProductoAdicionalSuperDeposito.kycProductoAdicionalCedula",
										"kycProductoAdicionalSuperDeposito.kycProductoAdicionalViajeroFrecuente",
										"kycProductoAdicionalSuperDeposito.kycProductoAdicionalNumeroViajeroFrecuente",
										"kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombreTarjeta",
										"kycProductoAdicionalSuperDeposito.kycFechaActualizacion",
										"ctgTipoTarjeta.ctgCatalogoId",
										"ctgOficinaEntrega.ctgSucursalId"
			    	        ]
					    }),
					    columns: [
					{header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
					{header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycProductoAdicionalSuperDeposito.kycProductoAdicionalCedula",flex: 1, width: 100}
					],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductoAdicionalSuperDepositoForm", record.data);
					    			Efx.form.setDisable("kycProductoAdicionalSuperDepositoForm");
					    		}
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
					    		if(this.store.data.items.length > 0)Ext.getCmp("kycProductoSuperDepositoEditarBottom").setDisabled(false);
					    		if(this.store.data.items.length <= 0)Ext.getCmp("kycProductoSuperDepositoEditarBottom").setDisabled(true);
					    		if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
				    			Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
					    			Ext.getCmp("kycProductoSuperDepositoAgregarBottom").setDisabled(true);
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
						id: "kycProductoAdicionalSuperDepositoForm",
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
					        	colspan: 8,
					        	hidden: true,
					        	width: 730
					        },{
								xtype: "label",
								text: "ADICIONALES A S\u00daPER DEP\u00d3SITO AHORRO",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label",text: "Seleccione la persona adicional", cls: "x-form-item label_spacing", colspan: 2},
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
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombre",
								maxLength: 150,
								readOnly: true,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycProductoAdicionalCedula",
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalCedula",
								maxLength: 20,
								readOnly: true,
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
//										Ext.getCmp("kycProductoAdicionalNumeroViajeroFrecuente").clearInvalid();
										}}
								},{
								xtype : "combo",
								id:"kycProductoAdicionalViajeroFrecuente",
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalViajeroFrecuente",
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
										Efx.utils.setDisabled("kycProductoAdicionalNumeroViajeroFrecuente",disable, true);
										Efx.combos.setRequiredAndValidate("kycProductoAdicionalNumeroViajeroFrecuente", !disable);

									}}
							},
							 {
								xtype : "textfield",
								id:"kycProductoAdicionalNumeroViajeroFrecuente",
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalNumeroViajeroFrecuente",
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
								id:"kycProductoAdicionalNombreTarjeta",
								name : "kycProductoAdicionalSuperDeposito.kycProductoAdicionalNombreTarjeta",
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
								id: "kycProductoAdicionalSuperDepositoId",
								name: "kycProductoAdicionalSuperDeposito.kycProductoAdicionalId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoAdicionalSuperDeposito.ctgTipoProducto.ctgCatalogoId"
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