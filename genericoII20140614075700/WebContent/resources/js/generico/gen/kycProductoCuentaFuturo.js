KycProductoCuentaFuturo = function(){
	var configWindow = {
		add: "kycProductoCuentaFuturoAgregarTop",
		edit: "kycProductoCuentaFuturoEditarTop",
		remove: "kycProductoCuentaFuturoEliminarTop",
		grid2: "kycProductoAdicionalCuentaFuturo",
		save: "kycProductoCuentaFuturoGuardarTop",
		form: "kycProductoCuentaFuturoForm",
		form2: "kycProductoAdicionalCuentaFuturoForm"
	};
	var configWindowBottom = {
		add: "kycProductoCuentaFuturoAgregarBottom",
		edit: "kycProductoCuentaFuturoEditarBottom",
		remove: "kycProductoCuentaFuturoEliminarBottom",
		save: "kycProductoCuentaFuturoGuardarBottom"
	};
	var configWindowTop = {
		add: "kycProductoCuentaFuturoAgregarTop",
		edit: "kycProductoCuentaFuturoEditarTop",
		remove: "kycProductoCuentaFuturoEliminarTop",
		save: "kycProductoCuentaFuturoGuardarTop"
	};
	return {
		abrirAdicCuentaFuturo: function(){
			if(Ext.isEmpty(EfxKYC.getKycId()) || Ext.isEmpty(EfxKYC.getKycPersonaFisicaId())){
				Efx.message.alert(Efx.constants.KYC_NO_EXISTE_PERSONA_FISICA);
				return;
			}
			Menu.openSelfWindow(
				"kycProductosAdicionales/view",
				{
					kycId: EfxKYC.getKycId(),
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
					kycProductoId: Ext.getCmp("kycProductoCuentaFuturoId").getValue(),
					kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO
				}
			);
		},
		agregarProductoCuentaFuturo: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
			Ext.getCmp('kycProductoMontoColones').disable();
			Ext.getCmp('kycProductoMontoDolares').disable();
			Efx.form.clearAndEnable("kycProductoCuentaFuturoForm");
			Ext.getCmp("kycProductoCuentaFuturoGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoCuentaFuturoGuardarTop").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);

			Ext.getCmp("kycProductoCuentaLiquidacion2").setDisabled(true);
			Ext.getCmp("kycProductoPorcentajeLiquidacion2").setDisabled(true);
			Ext.getCmp("ctgTipoCuentaFuturo2").setDisabled(true);

			Ext.getCmp("kycProductoCuentaLiquidacion3").setDisabled(true);
			Ext.getCmp("kycProductoPorcentajeLiquidacion3").setDisabled(true);
			Ext.getCmp("ctgTipoCuentaFuturo3").setDisabled(true);

			Ext.getCmp("kycProductoCuentaLiquidacion4").setDisabled(true);
			Ext.getCmp("kycProductoPorcentajeLiquidacion4").setDisabled(true);
			Ext.getCmp("ctgTipoCuentaFuturo4").setDisabled(true);

		},
		agregarProductoCuentaFuturoAdicional: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "add");
			Efx.form2.switchButton(configWindowBottom, "add");
    		Efx.form2.clearAndEnable("kycProductoAdicionalCuentaFuturoForm");
			Ext.getCmp("kycProductoCuentaFuturoGuardarTop").setDisabled(true);
			Ext.getCmp("kycProductoCuentaFuturoGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			Ext.getCmp("kycProductoAdicionalCuentaFuturoId").setValue("");
			Ext.getCmp("kycProductoSaveAuxId").setValue(Ext.getCmp("kycProductoSaveId").getValue());
		},
		editarProductoCuentaFuturo: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycProductoCuentaFuturoEliminarBottom").setDisabled(true);
			Ext.getCmp("kycProductoCuentaFuturoGuardarBottom").setDisabled(true);
			Ext.getCmp("kycProductoCuentaFuturoEliminarTop").setDisabled(false);
			Ext.getCmp("kycProductoCuentaFuturoGuardarTop").setDisabled(false);
			if (Ext.getCmp('kycProductoMontoDolares').getValue()>0){
				Ext.getCmp('kycProductoMontoColones').disable();
			}
			if (Ext.getCmp('kycProductoMontoColones').getValue()>0){
				Ext.getCmp('kycProductoMontoDolares').disable();
			}

			Ext.getCmp("kycProductoCuentaLiquidacion2").setDisabled(true);
			Ext.getCmp("kycProductoPorcentajeLiquidacion2").setDisabled(true);
			Ext.getCmp("ctgTipoCuentaFuturo2").setDisabled(true);

			Ext.getCmp("kycProductoCuentaLiquidacion3").setDisabled(true);
			Ext.getCmp("kycProductoPorcentajeLiquidacion3").setDisabled(true);
			Ext.getCmp("ctgTipoCuentaFuturo3").setDisabled(true);

			Ext.getCmp("kycProductoCuentaLiquidacion4").setDisabled(true);
			Ext.getCmp("kycProductoPorcentajeLiquidacion4").setDisabled(true);
			Ext.getCmp("ctgTipoCuentaFuturo4").setDisabled(true);
		},
		editarProductoCuentaFuturoAdicional: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.form2.switchButton(configWindow, "edit");
			Efx.form2.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycProductoCuentaFuturoEliminarBottom").setDisabled(false);
			Ext.getCmp("kycProductoCuentaFuturoGuardarBottom").setDisabled(false);
			Ext.getCmp("kycProductoCuentaFuturoEliminarTop").setDisabled(true);
			Ext.getCmp("kycProductoCuentaFuturoGuardarTop").setDisabled(true);
			Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
			if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
			Ext.getCmp("kycProductoCuentaFuturoGuardarBottom").setDisabled(true);
		},
		eliminarProductoCuentaFuturo: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductos/delete",
					params: {
						kycProductoId: Efx.utils.getValue("kycProductoCuentaFuturoId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoCuentaFuturoForm");
								if(Ext.getCmp("kycProductoCuentaFuturoGrid").store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycProductoCuentaFuturo){
			    					Ext.getCmp("kycProductoCuentaFuturoGrid").getStore().loadData(jsonObject.kycProductoCuentaFuturo);
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
		eliminarProductoAdicionalCuentaFuturo: function(){
			valorTemporalColumnaId=Ext.getCmp("kycProductoSaveId").getValue();
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductos/deleteAdicional",
					params: {
						kycProductoAdicionalId : Ext.getCmp("kycProductoAdicionalCuentaFuturoId").getValue(),
						kycProductoId:Ext.getCmp("kycProductoSaveId").getValue(),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(false);
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.form.switchButton(configWindowTop, "rowclick");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoAdicionalCuentaFuturoForm");
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
								if(Ext.getCmp("kycProductoCuentaFuturoGrid").store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoSaveId").setValue(valorTemporalColumnaId);
								if(jsonObject.kycProductoCuentaFuturoAdicional){
			    					Ext.getCmp("kycProductoAdicionalCuentaFuturo").getStore().loadData(jsonObject.kycProductoCuentaFuturoAdicional);
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
		guardarProductoCuentaFuturo: function(){

var porUno = (Ext.getCmp("kycProductoPorcentajeLiquidacion1").getValue() != null) ? Ext.getCmp("kycProductoPorcentajeLiquidacion1").getValue():0;
var porDos = (Ext.getCmp("kycProductoPorcentajeLiquidacion2").getValue() != null) ? Ext.getCmp("kycProductoPorcentajeLiquidacion2").getValue():0;
var porTres = (Ext.getCmp("kycProductoPorcentajeLiquidacion3").getValue() != null) ? Ext.getCmp("kycProductoPorcentajeLiquidacion3").getValue():0;
var porCuatro = (Ext.getCmp("kycProductoPorcentajeLiquidacion4").getValue() != null) ? Ext.getCmp("kycProductoPorcentajeLiquidacion4").getValue():0;
var porTotal = porUno + porDos + porTres + porCuatro;
if (porTotal == 100 && Ext.getCmp("ctgRenovacionAutomatica").getValue() == 1601){

			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoCuentaFuturoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductos/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoCuentaFuturo.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoCuentaFuturo.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoCuentaFuturo.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CUENTA_FUTURO,
    				 kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO

    			},
    			success: function(form, action){
       				Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.clearFilter(true);
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoCuentaFuturoForm", true);
    				Ext.getCmp("kycProductoSaveAuxId").setValue("");
    				if(action.result.kycProductoCuentaFuturo){
    					Ext.getCmp("kycProductoCuentaFuturoGrid").getStore().loadData(action.result.kycProductoCuentaFuturo);
    					Ext.getCmp("kycProductoCuentaFuturoGrid").getSelectionModel().select(action.result.kycProductoCuentaCorrienteIndex);
    				}
    				EfxKYC.setKycMostrarCobis(jsonObject.kycMostrarCobis);
    			},

    			failure: Efx.form.failureProcedure
   			});
    		} else if (porTotal == 100 && Ext.getCmp("ctgRenovacionAutomatica").getValue() == 1602){

			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoCuentaFuturoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductos/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoCuentaFuturo.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoCuentaFuturo.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoCuentaFuturo.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CUENTA_FUTURO,
    				 kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO

    			},
    			success: function(form, action){
       				Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.clearFilter(true);
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoCuentaFuturoForm", true);
    				Ext.getCmp("kycProductoSaveAuxId").setValue("");
    				if(action.result.kycProductoCuentaFuturo){
    					Ext.getCmp("kycProductoCuentaFuturoGrid").getStore().loadData(action.result.kycProductoCuentaFuturo);
    					Ext.getCmp("kycProductoCuentaFuturoGrid").getSelectionModel().select(action.result.kycProductoCuentaCorrienteIndex);
    				}
    				EfxKYC.setKycMostrarCobis(jsonObject.kycMostrarCobis);
    			},

    			failure: Efx.form.failureProcedure
   			});
    		} else if (Ext.getCmp("ctgRenovacionAutomatica").getValue() == 1600){

					Efx.message.progress("Guardando Informaci\u00F3n...");
					Ext.getCmp("kycProductoCuentaFuturoForm").getForm().submit({
						url: Efx.constants.CONTEXT_PATH + "/kycProductos/save",
						timeout: Efx.constants.TIMEOUT_SECONDS,
						params: {
							"kycProductoCuentaFuturo.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
							"kycProductoCuentaFuturo.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
							"kycProductoCuentaFuturo.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CUENTA_FUTURO,
							 kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO

						},
						success: function(form, action){
								Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.clearFilter(true);
							Efx.form.switchButton(configWindow, "save");
							Efx.form.switchButton(configWindowBottom, "save");
							Efx.message.alert(action.result.message);
							Efx.form.setDisable("kycProductoCuentaFuturoForm", true);
							Ext.getCmp("kycProductoSaveAuxId").setValue("");
							if(action.result.kycProductoCuentaFuturo){
								Ext.getCmp("kycProductoCuentaFuturoGrid").getStore().loadData(action.result.kycProductoCuentaFuturo);
								Ext.getCmp("kycProductoCuentaFuturoGrid").getSelectionModel().select(action.result.kycProductoCuentaCorrienteIndex);
							}
							EfxKYC.setKycMostrarCobis(jsonObject.kycMostrarCobis);
						},

						failure: Efx.form.failureProcedure
						});
					} else {
    			Efx.message.alert("El porcentaje de liquidaci\u00f3n debe ser menor o igual a 100%");
    		}
		},
		guardarProductoCuentaFuturoAdicional: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductoAdicionalCuentaFuturoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductos/saveAdicional",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoAdicionalCuentaFuturo.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoAdicionalCuentaFuturo.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoAdicionalCuentaFuturo.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.PAQUETE_CUENTA_FUTURO,
    				"kycProductoAdicionalCuentaFuturo.kycProducto.kycProductoId":Ext.getCmp("kycProductoSaveId").getValue(),
    				 kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.form.switchButton(configWindowTop, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductoAdicionalCuentaFuturoForm", true);
    				if(action.result.kycProductoAdicionalCuentaFuturo){
    					Ext.getCmp("kycProductoAdicionalCuentaFuturo").getStore().loadData(action.result.kycProductoAdicionalCuentaFuturo);
    					Ext.getCmp("kycProductoAdicionalCuentaFuturo").getSelectionModel().select(action.result.kycProductoAdicionalCuentaFuturoIndex);
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
				title: "PRODUCTOS - CUENTA FUTURO",
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
						   id: "kycProductoCuentaFuturoAgregarTop",
						   iconCls: Efx.constants.icons.ADD_ICON,
						   handler: KycProductoCuentaFuturo.agregarProductoCuentaFuturo
					   },{
				    	   text: "Editar Producto",
				    	   id: "kycProductoCuentaFuturoEditarTop",
						   iconCls: Efx.constants.icons.EDIT_ICON,
						   handler: KycProductoCuentaFuturo.editarProductoCuentaFuturo
				       },{
				    	   text: "Eliminar Producto",
				    	   id: "kycProductoCuentaFuturoEliminarTop",
						   iconCls: Efx.constants.icons.DELETE_ICON,
						   handler: KycProductoCuentaFuturo.eliminarProductoCuentaFuturo
				       },
				       {
				    	   text: "Guardar Producto",
				    	   id: "kycProductoCuentaFuturoGuardarTop",
						   iconCls: Efx.constants.icons.SAVE_ICON,
						   handler: KycProductoCuentaFuturo.guardarProductoCuentaFuturo
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
						   id: "kycProductoCuentaFuturoAgregarBottom",
						   iconCls: Efx.constants.icons.ADD_ICON,
						   handler: KycProductoCuentaFuturo.agregarProductoCuentaFuturoAdicional
					   },{
				    	   text: "Editar Adicional",
				    	   id: "kycProductoCuentaFuturoEditarBottom",
						   iconCls: Efx.constants.icons.EDIT_ICON,
						   handler: KycProductoCuentaFuturo.editarProductoCuentaFuturoAdicional
				       },{
				    	   text: "Desvincular Adicional",
				    	   id: "kycProductoCuentaFuturoEliminarBottom",
						   iconCls: Efx.constants.icons.DELETE_ICON,
						   handler: KycProductoCuentaFuturo.eliminarProductoAdicionalCuentaFuturo
				       },
				       {
				    	   text: "Guardar Adicional",
				    	   id: "kycProductoCuentaFuturoGuardarBottom",
						   iconCls: Efx.constants.icons.SAVE_ICON,
						   handler: KycProductoCuentaFuturo.guardarProductoCuentaFuturoAdicional
				       }
	        	    ]
		        }
            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoCuentaFuturoGrid",
						height: 150,
						width:730,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoCuentaFuturo || [],
					    	fields: [
					    	     	"kycProductoCuentaFuturo.kycProductoId",
									"kycProductoCuentaFuturo.kycProductoViajeroFrecuente",
									"kycProductoCuentaFuturo.kycProductoNumeroViajeroFrecuente",
									"kycProductoCuentaFuturo.kycProductoNombreTarjeta",
									"kycProductoCuentaFuturo.kycProductoNumeroCuenta",
									"kycProductoCuentaFuturo.kycProductoMontoColones",
									"kycProductoCuentaFuturo.kycProductoMontoDolares",
									"kycProductoCuentaFuturo.kycProductoFechaVencimiento",
									"kycProductoCuentaFuturo.kycProductoFechaInicioDebito",
									"kycProductoCuentaFuturo.kycProductoRenovacionAutomatica",
									"kycProductoCuentaFuturo.kycProductoTarjetaDebito",
									"kycProductoCuentaFuturo.kycProductoFecha1",
									"kycProductoCuentaFuturo.kycProductoFecha2",
									"kycProductoCuentaFuturo.kycProductoFecha3",
									"kycProductoCuentaFuturo.kycProductoCantidadTalonarios",
									"kycProductoCuentaFuturo.kycFechaActualizacion",
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
									"ctgListadoTipoProducto.ctgCatalogoNombre",
									"ctgRenovacionAutomatica.ctgCatalogoId",

"kycProductoCuentaLiquidacion1"
//"kycProductoPorcentajeLiquidacion1",
//"ctgTipoCuentaFuturo1.ctgCatalogoId",
//"kycProductoCuentaLiquidacion2",
//"kycProductoPorcentajeLiquidacion2",
//"ctgTipoCuentaFuturo2.ctgCatalogoId",
//"kycProductoCuentaLiquidacion3",
//"kycProductoPorcentajeLiquidacion3",
//"ctgTipoCuentaFuturo3.ctgCatalogoId",
//"kycProductoCuentaLiquidacion4",
//"kycProductoPorcentajeLiquidacion4",
//"ctgTipoCuentaFuturo4.ctgCatalogoId"

			    	        ]
					    }),
					    columns: [
					              {header: "Tipo de Producto",  dataIndex: "ctgListadoTipoProducto.ctgCatalogoNombre", flex: 2, minWidth: 200},
							      {header: "N\u00famero de Cuenta",  dataIndex: "kycProductoCuentaFuturo.kycProductoNumeroCuenta",flex: 1.5, width: 100}
					    ],
					 listeners: {
				    	selectionchange: function(model, records){
				    		if(!records || records.length <= 0) return;
				    		var record = records[0];
				    		if(!records || records.length <= 0){
							Ext.getCmp("kycProductoCuentaFuturoEliminarTop").setDisabled(true);
							Ext.getCmp("kycProductoCuentaFuturoGuardarTop").setDisabled(true);
							}
				    		var filtradoDatos = parseInt(Ext.getCmp("kycProductoCuentaFuturoGrid").getSelectionModel().getSelection()[0].get("kycProductoCuentaFuturo.kycProductoId"));
				    		Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
				    		if(record != null){
				    			Efx.form.setValues("kycProductoCuentaFuturoForm", record.data);
				    			Efx.form.setDisable("kycProductoCuentaFuturoForm");
				    			Efx.form.setDisable("kycPaqueteAdicionalCuentaFuturoForm");
				    			Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
				    		};
				    		Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.clearFilter(true);
				    		Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.filter("kycProductoAdicionalCuentaFuturo.kycProductoId", new RegExp(filtradoDatos, 'i'));
				    		if (Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.getCount()<=0){
								Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(true);
				    		}else{
				    			Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(false);
				    		}
							Ext.getCmp("kycProductoCuentaFuturoEliminarTop").setDisabled(false);
							Ext.getCmp("kycProductoCuentaFuturoGuardarTop").setDisabled(false);
							Ext.getCmp("kycProductoCuentaFuturoEliminarBottom").setDisabled(false);
							Ext.getCmp("kycProductoCuentaFuturoGuardarBottom").setDisabled(false);
				    		if(config.kycAdicionalPersonas ==undefined || config.kycAdicionalPersonas == null || config.kycAdicionalPersonas.length <= 0){
				    			Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(true);
				    		}
							if(Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.getCount() > 0) Efx.grid2.selectFirstRow(Ext.getCmp("kycProductoAdicionalCuentaFuturo"));
							if(Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.getCount() < 1) {
								Efx.form2.clearAndDisable("kycProductoAdicionalCuentaFuturoForm");
							}
							Ext.getCmp("kycProductoSaveId").setValue(filtradoDatos);
				    		if(this.store.data.items.length > 0)Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(false);
				    		if(this.store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
				    		valorTemporal= Ext.getCmp("kycProductoSaveAuxId").getValue();
				    		if (valorTemporal.lenght>0){
				    			Ext.getCmp("kycProductoSaveId").setValue(Ext.getCmp("kycProductoSaveAuxId").getValue());
				    		}
							if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
				    	},
				    	afterrender: function(model, records){
				    		if(this.store.data.items.length <= 0){
								Ext.getCmp("kycProductoCuentaFuturoEditarTop").setDisabled(true);
							}
				    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
				    		Efx.form.switchButton(configWindow, "cancelNotClear");
				    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
				    		Efx.form2.switchButton(configWindow, "cancelNotClear");
				    		Efx.form2.switchButton(configWindowBottom, "cancelNotClear");
				    		if(this.store.getCount()<=0){
								Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(true);
								}

				    		if(config.kycAdicionalPersonas ==undefined || config.kycAdicionalPersonas == null || config.kycAdicionalPersonas.length <= 0){
				    			Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
								Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(true);
				    		}
				    		if(this.store.data.items.length > 0)Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(false);
				    		if(this.store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
				    		if(this.store.data.items.length > 0)Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(false);
				    		if(this.store.data.items.length <= 0)Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(true);
				    		if(Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.data.items.lenght>0)
				    			{
				    				Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(false);
				    				Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(false);
				    			}
				    		if(Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.data.items.lenght<=0 || Ext.getCmp("kycProductoAdicionalCuentaFuturo").store.data.items.lenght == null)
				    				{
				    				if(this.store.data.items.length > 0){
				    					Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(false);
									}
									else{
										Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
									}
				    				Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(true);
				    				}
				    	},
				    	itemclick: function(dv, record, item, index, e) {
				    		if(this.store.data.items.length > 0) {
					    		Efx.form.switchButton(configWindowTop, "cancelNotClear");
					    		Ext.getCmp("kycProductoCuentaFuturoEditarTop").setDisabled(false);
					    	}
				    		Efx.form.switchButton(configWindow, "cancelNotClear");
				    		Efx.form2.switchButton(configWindow, "cancelNotClear");
				    		Ext.getCmp("kycProductoSaveId").setValue(Ext.getCmp("kycProductoSaveAuxId").getValue());
				        }
				    }
					},{
			        	xtype: "form",
						id: "kycProductoCuentaFuturoForm",
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
								text: "CUENTA FUTURO",
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
									data: config.ctgListadoCuentaFuturo || [],
									fields: ["ctgListadoCuentaFuturoId", "ctgListadoCuentaFuturoNombre"]
								}),
								displayField: "ctgListadoCuentaFuturoNombre",
								valueField: "ctgListadoCuentaFuturoId",
								allowBlank: false,
								colspan: 2,
								listeners:{
									change: function(){
											if (this.getValue())
												{
											Ext.getCmp("ctgPrefijo").setValue(this.getValue());
											Ext.getCmp("ctgMoneda").setValue(this.getValue());
											Ext.getCmp("ctgProducto").setValue(this.getValue());
												}
											else { }
											var comboProducto = Ext.getCmp('ctgListadoTipoProducto');
											caseSensitive = false;
											if (comboProducto.getRawValue().indexOf("D\u00d3LARES")>=0) {
												Ext.getCmp('kycProductoMontoDolares').enable();
												Ext.getCmp('kycProductoMontoColones').disable();
											} else if (comboProducto.getRawValue().indexOf("COLONES")>=0) {
												Ext.getCmp('kycProductoMontoDolares').disable();
												Ext.getCmp('kycProductoMontoColones').enable();
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
							{xtype: "label", text: "Para Cuenta Futuro autorizo cargar al Producto", width:400, cls: "x-form-item label_spacing", colspan: 6},
							{xtype: "label", text: "Tipo de Cuenta", cls: "x-form-item label_spacing", colspan: 4},
							{xtype: "label",text: "N\u00famero de Cuenta Cargo", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "combo",
								id:"ctgTipoCuenta",
								name: "ctgTipoCuenta.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoCuenta || [],
									fields: ["ctgTipoCuentaId", "ctgTipoCuentaNombre"]
								}),
								displayField: "ctgTipoCuentaNombre",
								valueField: "ctgTipoCuentaId",
								width: 470,
								allowBlank: false,
								colspan: 4
							},
							 {
								xtype : "textfield",
								id:"kycProductoNumeroCuenta",
								name : "kycProductoCuentaFuturo.kycProductoNumeroCuenta",
								maxLength: 17,
								minLength: 17,
								colspan:2
							},
							{xtype: "label", text: "Especificaciones para el cargo de Cuenta Futuro", width:400, cls: "x-form-item label_spacing", colspan: 6},
							{xtype: "label", text: "Frecuencia del Cargo", cls: "x-form-item label_spacing", colspan: 6},
							{
								xtype: "combo",
								id:"ctgFrecuenciaCargo",
								name: "ctgFrecuenciaCargo.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgFrecuenciaCargo || [],
									fields: ["ctgFrecuenciaCargoId", "ctgFrecuenciaCargoNombre"]
								}),
								displayField: "ctgFrecuenciaCargoNombre",
								valueField: "ctgFrecuenciaCargoId",
								colspan: 2,
								allowBlank: false,
								listeners:{
									change: function()
									{
										if (this.getValue()==1165 || this.getValue()==1167)
											{
											Ext.getCmp("kycProductoFecha3").enable();
											Ext.getCmp("mensual").enable();
											Ext.getCmp("mensual2").enable();
											Ext.getCmp("kycProductoFecha1").setValue("");
											Ext.getCmp("kycProductoFecha2").setValue("");
											Ext.getCmp("kycProductoFecha1").disable();
											Ext.getCmp("kycProductoFecha2").disable();
											Ext.getCmp("mensual3").disable();
											Ext.getCmp("mensual4").disable();
											}
										else if (this.getValue()==1166)
											{
											Ext.getCmp("kycProductoFecha3").setValue("");
											Ext.getCmp("kycProductoFecha3").disable();
											Ext.getCmp("mensual").disable();
											Ext.getCmp("mensual2").disable();
											Ext.getCmp("kycProductoFecha1").enable();
											Ext.getCmp("kycProductoFecha2").enable();
											Ext.getCmp("mensual3").enable();
											Ext.getCmp("mensual4").enable();
											}
										else
											{
											Ext.getCmp("kycProductoFecha3").disable();
											Ext.getCmp("mensual").disable();
											Ext.getCmp("mensual2").disable();
											Ext.getCmp("kycProductoFecha1").disable();
											Ext.getCmp("kycProductoFecha2").disable();
											Ext.getCmp("mensual3").disable();
											Ext.getCmp("mensual4").disable();
											}

									}
								}
							},
							{xtype: "label", text: "Hacer cargo dia", id: "mensual", cls: "x-form-item label_spacing", width: 100, colspan: 1},
							{
								xtype : "numberfield",
								id:"kycProductoFecha3",
								name : "kycProductoCuentaFuturo.kycProductoFecha3",
								maxValue : 31,
								minValue:1,
								hideTrigger: true,
								colspan:1,
								width:100
							},
							{xtype: "label", text: "de cada mes", id: "mensual2",  cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: " ",  cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Hacer cargo dias", id: "mensual3",  cls: "x-form-item label_spacing", width:100, colspan: 1},
							{
								xtype : "numberfield",
								id:"kycProductoFecha1",
								name : "kycProductoCuentaFuturo.kycProductoFecha1",
								maxValue : 15,
								minValue: 1,
								colspan:1,
								width:100,
								hideTrigger: true,
								listeners:{
									blur: function(){
										var valorProductoFecha2 = Ext.getCmp("kycProductoFecha2").getValue();
										var diferenciaDias = 0;
										if (valorProductoFecha2 != null && this.getValue() != null){
										if (this.getValue()<valorProductoFecha2){
											diferenciaDias = valorProductoFecha2 - this.getValue();
										}
										if (diferenciaDias<14){
											Efx.message.alert("El valor entre ambas fechas no puede ser menor de 14 d\u00edas");
											this.reset();
										}
										}
									}
							}},
							{
								xtype : "numberfield",
								id:"kycProductoFecha2",
								name : "kycProductoCuentaFuturo.kycProductoFecha2",
								maxValue : 31,
								minValue:16,
								width:100,
								colspan:1,
								hideTrigger: true,
								listeners:{
									blur: function(){
											var valorProductoFecha1 = Ext.getCmp("kycProductoFecha1").getValue();
											var diferenciaDias = 0;

											if (valorProductoFecha1 != null && this.getValue() != null)
											{
												if (this.getValue()>valorProductoFecha1){
												diferenciaDias = this.getValue() - valorProductoFecha1;
											}
											if (diferenciaDias<14){
															Efx.message.alert("El valor entre ambas fechas no puede ser menor de 14 d\u00edas");
																this.reset();
																	}
											}
										}
								}
							},
							{xtype: "label", text: "de cada mes",id: "mensual4",  cls: "x-form-item label_spacing", colspan: 1, width: 100},
							{xtype: "label", text: " ",  cls: "x-form-item label_spacing", colspan: 6},
							{xtype: "label", text: "Tipo de Aporte", cls: "x-form-item label_spacing",  colspan: 2},
							{xtype: "label", text: "Valor del Aporte \u00a2", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Valor del Aporte $", cls: "x-form-item label_spacing",  colspan: 2},
							{
								xtype: "combo",
								id:"ctgTipoAporte",
								name: "ctgTipoAporte.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoAporte || [],
									fields: ["ctgTipoAporteId", "ctgTipoAporteNombre"]
								}),
								displayField: "ctgTipoAporteNombre",
								valueField: "ctgTipoAporteId",
								allowBlank: false,
								colspan: 2
							},
							{
								xtype : "numericfield",
								id:"kycProductoMontoColones",
								name : "kycProductoCuentaFuturo.kycProductoMontoColones",
								allowDecimals: true,
								decimalPrecision: 2,
								maxLength : 20,
								disabled: true,
								colspan:2,
								listeners: {
									change: function(){
										if (Ext.getCmp("ctgFrecuenciaCargo").getValue() == '1165' &&
												this.getValue() < 10000.00 &&
												this.getValue() != 0.00){
												this.setMinValue(10000.00);
										}
										if (Ext.getCmp("ctgFrecuenciaCargo").getValue() == '1166' &&
												this.getValue() < 5.00 &&
												this.getValue() != 0.00){
												this.setMinValue(5.00);
										}
										if (Ext.getCmp("ctgFrecuenciaCargo").getValue() == '1167' &&
												this.getValue() < 250.00 &&
												this.getValue() != 0.00){
												this.setMinValue(250.00);
										}
										}
									}
							},{
								xtype : "numericfield",
								id:"kycProductoMontoDolares",
								name : "kycProductoCuentaFuturo.kycProductoMontoDolares",
								maxLength : 20,
								allowDecimals: true,
								decimalPrecision: 2,
								disabled: true,
								colspan:2,
								listeners: {
									change: function(){
										if (Ext.getCmp("ctgFrecuenciaCargo").getValue() == '1165' &&
												this.getValue() < 20.00 &&
												this.getValue() != 0.00){
												this.setMinValue(20.00);
										}
										if (Ext.getCmp("ctgFrecuenciaCargo").getValue() == '1166' &&
												this.getValue() < 10.00 &&
												this.getValue() != 0.00){
												this.setMinValue(10.00);
										}
										if (Ext.getCmp("ctgFrecuenciaCargo").getValue() == '1167' &&
												this.getValue() < 500.00 &&
												this.getValue() != 0.00){
												this.setMinValue(500.00);
										}
										}
									}
							},
							{xtype: "label", text: "Plazo de Cuenta", cls: "x-form-item label_spacing",  colspan: 2},
							{xtype: "label", text: "Fecha de Vencimiento", cls: "x-form-item label_spacing",  colspan: 2},
							{xtype: "label", text: "Fecha Inicio de D\u00e9bito", cls: "x-form-item label_spacing",  colspan: 2},
							{
								xtype: "combo",
								id:"ctgPlazoCuenta",
								name: "ctgPlazoCuenta.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgPlazoCuenta || [],
									fields: ["ctgPlazoCuentaId", "ctgPlazoCuentaNombre"]
								}),
								displayField: "ctgPlazoCuentaNombre",
								valueField: "ctgPlazoCuentaId",
								allowBlank: false,
								colspan: 2
							},
							{
								xtype : "datefield",
								id:"kycProductoFechaVencimiento",
								name : "kycProductoCuentaFuturo.kycProductoFechaVencimiento",
								maxLength : 50,
								allowBlank: false,
								submitFormat : "Ymd",
								altFormats: "Ymd|d/m/Y",
								colspan:2,
								disabledDays:  [0, 6]
							},
							{
								xtype : "datefield",
								id:"kycProductoFechaInicioDebito",
								name : "kycProductoCuentaFuturo.kycProductoFechaInicioDebito",
								maxLength : 50,
								submitFormat : "Ymd",
							allowBlank: false,
								altFormats: "Ymd|d/m/Y",
								minValue: new Date(),
								colspan:2
							},
							{xtype: "label", text: "Renovaci\u00f3n Autom\u00e1tica", cls: "x-form-item label_spacing", colspan: 6},
//							{
//								xtype : "combo",
//								id:"kycProductoRenovacionAutomatica",
//								name : "kycProductoCuentaFuturo.kycProductoRenovacionAutomatica",
//								store : new Ext.data.SimpleStore({
//									data : Efx.combos.yesnoArray() || [],
//									fields : [ "id", "descripcion" ]
//								}),
//								displayField : "descripcion",
//							allowBlank: false,
//								valueField: "id",
//								colspan : 6
//							},



							{
								xtype: "combo",
								id:"ctgRenovacionAutomatica",
								name: "ctgRenovacionAutomatica.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgRenovacionAutomatica || [],
									fields: ["ctgRenovacionAutomaticaId", "ctgRenovacionAutomaticaNombre"]
								}),
								displayField: "ctgRenovacionAutomaticaNombre",
								valueField: "ctgRenovacionAutomaticaId",
								colspan: 6,
								width: 475
							},
//***********************************************************Seccion de 4 campos a partir de aqui*********************************
							{xtype: "label", text: "Cuenta Liquidaci\u00f3n", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", text: "Porcentaje de Liquidaci\u00f3n", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", text: "Tipo de Cuenta", cls: "x-form-item label_spacing", colspan:2},
							{
								xtype : "textfield",
								id:"kycProductoCuentaLiquidacion1",
								name : "kycProductoCuentaFuturo.kycProductoCuentaLiquidacion1",
								vtype: 'validNumberNA',
								colspan:2,
								listeners: {
									blur: function (){
										if (this.getValue() != "" && Ext.getCmp("ctgRenovacionAutomatica").getValue() == 1601){
												Ext.getCmp("ctgTipoCuentaFuturo1").allowBlank=false;
											} else {
												Ext.getCmp("ctgTipoCuentaFuturo1").allowBlank=true;
											}
									}
								}
							},{
								xtype : "numberfield",
								id:"kycProductoPorcentajeLiquidacion1",
								name : "kycProductoCuentaFuturo.kycProductoPorcentajeLiquidacion1",
								allowDecimals: true,
								decimalPrecision: 2,
//								fieldLabel: '%',
								hideTrigger:true,
//								allowBlank: false,
								colspan:2,
								minValue: 0,
								listeners: {
									change: function(){
										if (Ext.getCmp("kycProductoPorcentajeLiquidacion2").isDisabled() == true &&
											Ext.getCmp("kycProductoPorcentajeLiquidacion3").isDisabled() == true &&
											Ext.getCmp("kycProductoPorcentajeLiquidacion4").isDisabled() == true){
												this.setMaxValue(100.00);
										}
										}
									}
							},{
								xtype: "combo",
								id:"ctgTipoCuentaFuturo1",
								name: "ctgTipoCuentaFuturo.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoCuentaFuturo || [],
									fields: ["ctgTipoCuentaFuturoId", "ctgTipoCuentaFuturoNombre"]
								}),
								displayField: "ctgTipoCuentaFuturoNombre",
								valueField: "ctgTipoCuentaFuturoId",
								colspan: 2,
								listeners: {
									change: function (){
										if (this.isValid() == true &&
												Ext.getCmp("kycProductoCuentaLiquidacion1").getValue() != "" &&
												Ext.getCmp("kycProductoPorcentajeLiquidacion1").getValue != ""){
												Ext.getCmp("kycProductoCuentaLiquidacion2").enable(true);
												Ext.getCmp("kycProductoPorcentajeLiquidacion2").enable(true);
												Ext.getCmp("ctgTipoCuentaFuturo2").enable(true);
											} else {
												Ext.getCmp("kycProductoCuentaLiquidacion2").disable(true);
												Ext.getCmp("kycProductoPorcentajeLiquidacion2").disable(true);
												Ext.getCmp("ctgTipoCuentaFuturo2").disable(true);

												Ext.getCmp("kycProductoCuentaLiquidacion2").setValue("");
												Ext.getCmp("kycProductoPorcentajeLiquidacion2").setValue("");
												Ext.getCmp("ctgTipoCuentaFuturo2").setValue("");
											}
									}
								}
							},

//**********************************Linea dos*********************************************
							{
								xtype : "textfield",
								id:"kycProductoCuentaLiquidacion2",
								name : "kycProductoCuentaFuturo.kycProductoCuentaLiquidacion2",
								vtype: 'validNumberNA',
								colspan:2,
								listeners: {
									blur: function (){
										if (this.getValue() != ""){
												Ext.getCmp("ctgTipoCuentaFuturo2").allowBlank=false;
											} else {
												Ext.getCmp("ctgTipoCuentaFuturo2").allowBlank=true;
											}
									}
								}
							},{
								xtype : "numberfield",
								id:"kycProductoPorcentajeLiquidacion2",
								name : "kycProductoCuentaFuturo.kycProductoPorcentajeLiquidacion2",
								allowDecimals: true,
								decimalPrecision: 2,
	//							fieldLabel: '%',
								hideTrigger:true,
								colspan:2,
								minValue: 0
//								,
//								listeners: {
//									change: function(){
//										if (Ext.getCmp("kycProductoPorcentajeLiquidacion1").isDisabled() == false &&
//											this.isDisabled() == false &&
//											Ext.getCmp("kycProductoPorcentajeLiquidacion3").isDisabled() == true &&
//											Ext.getCmp("kycProductoPorcentajeLiquidacion4").isDisabled() == true){
//											var porcentajeLiquidacionUno = Ext.getCmp("kycProductoPorcentajeLiquidacion1").getValue();
//											var porcentajeLiquidacionDos = 100;
//											var maximo = porcentajeLiquidacionUno - porcentajeLiquidacionDos;
//											Ext.getCmp("kycProductoPorcentajeLiquidacion2").setMaxValue(Math.abs(maximo));
//										}
//										}
//									}
							},{
								xtype: "combo",
								id:"ctgTipoCuentaFuturo2",
								name: "ctgTipoCuentaFuturo.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoCuentaFuturo || [],
									fields: ["ctgTipoCuentaFuturoId", "ctgTipoCuentaFuturoNombre"]
								}),
								displayField: "ctgTipoCuentaFuturoNombre",
								valueField: "ctgTipoCuentaFuturoId",
								colspan: 2,
								listeners: {
									change: function (){
										if (this.isValid() == true &&
												Ext.getCmp("kycProductoCuentaLiquidacion2").getValue() != "" &&
												Ext.getCmp("kycProductoPorcentajeLiquidacion2").getValue != ""){
												Ext.getCmp("kycProductoCuentaLiquidacion3").enable(true);
												Ext.getCmp("kycProductoPorcentajeLiquidacion3").enable(true);
												Ext.getCmp("ctgTipoCuentaFuturo3").enable(true);
											} else {
												Ext.getCmp("kycProductoCuentaLiquidacion3").disable(true);
												Ext.getCmp("kycProductoPorcentajeLiquidacion3").disable(true);
												Ext.getCmp("ctgTipoCuentaFuturo3").disable(true);

												Ext.getCmp("kycProductoCuentaLiquidacion3").setValue("");
												Ext.getCmp("kycProductoPorcentajeLiquidacion3").setValue("");
												Ext.getCmp("ctgTipoCuentaFuturo3").setValue("");
											}
									}
								}
							},

//**********************************Linea tres*********************************************
							{
								xtype : "textfield",
								id:"kycProductoCuentaLiquidacion3",
								name : "kycProductoCuentaFuturo.kycProductoCuentaLiquidacion3",
								vtype: 'validNumberNA',
								colspan:2,
								listeners: {
									blur: function (){
										if (this.getValue() != ""){
												Ext.getCmp("ctgTipoCuentaFuturo3").allowBlank=false;
											} else {
												Ext.getCmp("ctgTipoCuentaFuturo3").allowBlank=true;
											}
									}
								}
							},{
								xtype : "numberfield",
								id:"kycProductoPorcentajeLiquidacion3",
								name : "kycProductoCuentaFuturo.kycProductoPorcentajeLiquidacion3",
								allowDecimals: true,
								decimalPrecision: 2,
	//							fieldLabel: '%',
								hideTrigger:true,
								colspan:2,
								minValue: 0
//								,
//								listeners: {
//									change: function(){
//										if (Ext.getCmp("kycProductoPorcentajeLiquidacion1").isDisabled() == false &&
//											Ext.getCmp("kycProductoPorcentajeLiquidacion2").isDisabled() == false &&
//											Ext.getCmp("kycProductoPorcentajeLiquidacion3").isDisabled() == false &&
//											Ext.getCmp("kycProductoPorcentajeLiquidacion4").isDisabled() == true){
//											var porcentajeLiquidacionUno = Ext.getCmp("kycProductoPorcentajeLiquidacion1").getValue();
//											var porcentajeLiquidacionDos = Ext.getCmp("kycProductoPorcentajeLiquidacion2").getValue();
//											var porcentajeLiquidacionTres = 100;
//											var maximo = (porcentajeLiquidacionUno + porcentajeLiquidacionDos) - porcentajeLiquidacionTres;
//											Ext.getCmp("kycProductoPorcentajeLiquidacion3").setMaxValue(Math.abs(maximo));
//										}
//										}
//									}
							},{
								xtype: "combo",
								id:"ctgTipoCuentaFuturo3",
								name: "ctgTipoCuentaFuturo.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoCuentaFuturo || [],
									fields: ["ctgTipoCuentaFuturoId", "ctgTipoCuentaFuturoNombre"]
								}),
								displayField: "ctgTipoCuentaFuturoNombre",
								valueField: "ctgTipoCuentaFuturoId",
								colspan: 2,
								listeners: {
									change: function (){
										if (this.isValid() == true &&
												Ext.getCmp("kycProductoCuentaLiquidacion3").getValue() != "" &&
												Ext.getCmp("kycProductoPorcentajeLiquidacion3").getValue != ""){
												Ext.getCmp("kycProductoCuentaLiquidacion4").enable(true);
												Ext.getCmp("kycProductoPorcentajeLiquidacion4").enable(true);
												Ext.getCmp("ctgTipoCuentaFuturo4").enable(true);
											} else {
												Ext.getCmp("kycProductoCuentaLiquidacion4").disable(true);
												Ext.getCmp("kycProductoPorcentajeLiquidacion4").disable(true);
												Ext.getCmp("ctgTipoCuentaFuturo4").disable(true);

												Ext.getCmp("kycProductoCuentaLiquidacion4").setValue("");
												Ext.getCmp("kycProductoPorcentajeLiquidacion4").setValue("");
												Ext.getCmp("ctgTipoCuentaFuturo4").setValue("");
											}
									}
								}
							},

//**********************************Linea cuatro*********************************************
							{
								xtype : "textfield",
								id:"kycProductoCuentaLiquidacion4",
								name : "kycProductoCuentaFuturo.kycProductoCuentaLiquidacion4",
								vtype: 'validNumberNA',
								colspan:2,
								listeners: {
									blur: function (){
										if (this.getValue() != ""){
												Ext.getCmp("ctgTipoCuentaFuturo4").allowBlank=false;
											} else {
												Ext.getCmp("ctgTipoCuentaFuturo4").allowBlank=true;
											}
									}
								}
							},{
								xtype : "numberfield",
								id:"kycProductoPorcentajeLiquidacion4",
								name : "kycProductoCuentaFuturo.kycProductoPorcentajeLiquidacion4",
								allowDecimals: true,
								decimalPrecision: 2,
	//							fieldLabel: '%',
								hideTrigger:true,
								colspan:2,
								minValue: 0
//								,
//								listeners: {
//									change: function(){
//										if (Ext.getCmp("kycProductoPorcentajeLiquidacion1").isDisabled() == false &&
//											Ext.getCmp("kycProductoPorcentajeLiquidacion2").isDisabled() == false &&
//											Ext.getCmp("kycProductoPorcentajeLiquidacion3").isDisabled() == false &&
//											Ext.getCmp("kycProductoPorcentajeLiquidacion4").isDisabled() == false){
//											var porcentajeLiquidacionUno = Ext.getCmp("kycProductoPorcentajeLiquidacion1").getValue();
//											var porcentajeLiquidacionDos = Ext.getCmp("kycProductoPorcentajeLiquidacion2").getValue();
//											var porcentajeLiquidacionTres = Ext.getCmp("kycProductoPorcentajeLiquidacion3").getValue();
//											var porcentajeLiquidacionCuatro = 100;
//											var maximo = (porcentajeLiquidacionUno + porcentajeLiquidacionDos + porcentajeLiquidacionTres) - porcentajeLiquidacionCuatro;
//											Ext.getCmp("kycProductoPorcentajeLiquidacion4").setMaxValue(Math.abs(maximo));
//										}
//										}
//									}
							},{
								xtype: "combo",
								id:"ctgTipoCuentaFuturo4",
								name: "ctgTipoCuentaFuturo.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoCuentaFuturo || [],
									fields: ["ctgTipoCuentaFuturoId", "ctgTipoCuentaFuturoNombre"]
								}),
								displayField: "ctgTipoCuentaFuturoNombre",
								valueField: "ctgTipoCuentaFuturoId",
								colspan: 2
							},


							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoCuentaFuturoId",
								name: "kycProductoCuentaFuturo.kycProductoId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoCuentaFuturo.ctgTipoProducto.ctgCatalogoId"
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
			        },
			        {
						xtype: "grid",
						id: "kycProductoAdicionalCuentaFuturo",
						height: 150,
						width:730,
						collapsible: true,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoAdicionalCuentaFuturo || [],
					    	fields: [
										"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalId",
										"kycProductoAdicionalCuentaFuturo.kycProductoId",
										"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNombre",
										"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalCedula",
										"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalViajeroFrecuente",
										"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNumeroViajeroFrecuente",
										"kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNombreTarjeta",
										"kycProductoAdicionalCuentaFuturo.kycFechaActualizacion",
										"ctgTipoTarjeta.ctgCatalogoId",
										"ctgOficinaEntrega.ctgSucursalId"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre de Adicional",  dataIndex: "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNombre", flex: 2, minWidth: 200},
							      {header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalCedula",flex: 1, width: 100}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		if(!records || records.length <= 0){
					    			Ext.getCmp("kycProductoCuentaFuturoEliminarBottom").setDisabled(true);
									Ext.getCmp("kycProductoCuentaFuturoGuardarBottom").setDisabled(true);
									}
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductoAdicionalCuentaFuturoForm", record.data);
					    			Efx.form.setDisable("kycProductoAdicionalCuentaFuturoForm");
					    			Ext.getCmp("kycProductoCuentaFuturoEditarBottom").setDisabled(false);
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
								Ext.getCmp("kycProductoCuentaFuturoEliminarTop").setDisabled(false);
								Ext.getCmp("kycProductoCuentaFuturoGuardarTop").setDisabled(false);
								Ext.getCmp("kycProductoCuentaFuturoEliminarBottom").setDisabled(false);
								Ext.getCmp("kycProductoCuentaFuturoGuardarBottom").setDisabled(false);
								if(this.store.getCount() > 0) Efx.grid2.selectFirstRow(this.store.first());
								if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
								Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		if(Ext.getCmp("kycAdicionales").store.data.items.length==0)
					    		Ext.getCmp("kycProductoCuentaFuturoAgregarBottom").setDisabled(true);
					    	},
					    	itemclick: function(dv, record, item, index, e) {
					    		if(this.store.data.items.length > 0) {
					    			Efx.form.switchButton(configWindow, "cancelNotClear");
						    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    		}
					        }}
					},{
			        	xtype: "form",
			        	id: "kycProductoAdicionalCuentaFuturoForm",
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
							text: "ADICIONALES A CUENTA FUTURO",
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
							name : "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalNombre",
							maxLength: 100,
							readOnly: true,
							allowBlank: false,
							colspan:2
						},
						{
							xtype : "textfield",
							id:"kycProductoAdicionalCedula",
							readOnly: true,
							allowBlank: false,
							name : "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalCedula",
							maxLength: 20,
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
						{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
						{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
						{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
						{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
						{
							xtype: "hidden",
							id: "kycProductoAdicionalCuentaFuturoId",
							name: "kycProductoAdicionalCuentaFuturo.kycProductoAdicionalId"
						},{
							xtype: "hidden",
							id: "kycProductoSaveId"
						},{
							xtype: "hidden",
							id: "ctgTipoProductoId",
							name: "kycProductoAdicionalCuentaFuturo.ctgTipoProducto.ctgCatalogoId"
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