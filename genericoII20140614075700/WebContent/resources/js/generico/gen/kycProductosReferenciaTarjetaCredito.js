KycProductosReferenciaTarjetaCredito = function(){
	var configWindow = {
		add: "kycProductosReferenciaTarjetaCreditoAgregarTop",
		edit: "kycProductosReferenciaTarjetaCreditoEditarTop",
		save: "kycProductosReferenciaTarjetaCreditoGuardarTop",
		remove: "kycProductosReferenciaTarjetaCreditoEliminarTop",
		grid: "kycProductosReferenciaTarjetaCreditoGrid",
		form: "kycProductosReferenciaTarjetaCreditoForm"
	};
	var configWindowBottom = {
			add: "kycProductosReferenciaTarjetaCreditoAgregarBottom",
			edit: "kycProductosReferenciaTarjetaCreditoEditarBottom",
			save: "kycProductosReferenciaTarjetaCreditoGuardarBottom",
			remove: "kycProductosReferenciaTarjetaCreditoEliminarBottom"
	};
	return {
		agregarProductosReferenciaTarjetaCredito: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductosReferenciaTarjetaCredito: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductosReferenciaTarjetaCredito: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/delete",
					params: {
						kycReferenciaId: Efx.utils.getValue("kycProductosReferenciaTarjetaCreditoId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoReferencia : Efx.utils.getValue("ctgTipoReferencia.ctgCatalogoId")
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductosReferenciaTarjetaCreditoForm");
								if(jsonObject.kycProductosReferenciaTarjetaCredito){
			    					Ext.getCmp("kycProductosReferenciaTarjetaCreditoGrid").getStore().loadData(jsonObject.kycProductosReferenciaTarjetaCredito);
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
		guardarProductosReferenciaTarjetaCredito: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductosReferenciaTarjetaCreditoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductosReferenciaTarjetaCredito.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaTarjetaCredito.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaTarjetaCredito.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductosReferenciaTarjetaCredito.ctgTipoReferencia.ctgCatalogoId" :Efx.constants.codes.PRODUCTOS_REFERENCIA_TARJETA_CREDITO,
    				 kycTipoReferencia : Efx.constants.codes.PRODUCTOS_REFERENCIA_TARJETA_CREDITO

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductosReferenciaTarjetaCreditoForm", true);
    				if(action.result.kycProductosReferenciaTarjetaCredito){
    					Ext.getCmp("kycProductosReferenciaTarjetaCreditoGrid").getStore().loadData(action.result.kycProductosReferenciaTarjetaCredito);
    					Ext.getCmp("kycProductosReferenciaTarjetaCreditoGrid").getSelectionModel().select(action.result.kycProductosReferenciaTarjetaCreditoIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},findFromBureau: function(){
			Efx.message.progress("Buscando en Bureau...");
			if(Ext.isEmpty(Efx.utils.getValue("kycReferenciaDocumento"))){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/findFromBureau",
				params: {
					kycPersonaFisicaDocumento1: Efx.utils.getValue("kycReferenciaDocumento"),
					kycReferenciaPersonalId :Efx.utils.getValue("kycProductosReferenciaTarjetaCreditoId"),
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId()

				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycReferenciaNombre1").setValue(jsonObject.kycReferenciaNombre1);
						Ext.getCmp("kycReferenciaDireccion").setValue(jsonObject.kycReferenciaDireccion);
						Ext.getCmp("kycReferenciaTelefono1").setValue(jsonObject.kycReferenciaTelefono1);
						Ext.getCmp("kycReferenciaCodigoTransaccion").setValue(jsonObject.kycReferenciaCodigoTransaccion);
						Efx.message.alert(jsonObject.message);
					}
				}
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
				title: "PRODUCTOS - REFERENCIAS",
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
							   id: "kycProductosReferenciaTarjetaCreditoAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaTarjetaCredito.agregarProductosReferenciaTarjetaCredito
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaTarjetaCreditoEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaTarjetaCredito.editarProductosReferenciaTarjetaCredito
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaTarjetaCreditoGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaTarjetaCredito.guardarProductosReferenciaTarjetaCredito
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaTarjetaCreditoEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaTarjetaCredito.eliminarProductosReferenciaTarjetaCredito
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
							   id: "kycProductosReferenciaTarjetaCreditoAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaTarjetaCredito.agregarProductosReferenciaTarjetaCredito
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaTarjetaCreditoEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaTarjetaCredito.editarProductosReferenciaTarjetaCredito
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaTarjetaCreditoGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaTarjetaCredito.guardarProductosReferenciaTarjetaCredito
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaTarjetaCreditoEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaTarjetaCredito.eliminarProductosReferenciaTarjetaCredito
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductosReferenciaTarjetaCreditoGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductosReferenciaTarjetaCredito || [],
					    	fields: [
					    	     	"kycProductosReferenciaTarjetaCredito.kycReferenciaId",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaNombre1",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaTipo",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaTelefono1",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaTelefono2",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaCuenta",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaBancaria",
									"kycProductosReferenciaTarjetaCredito.kyc.kycFechaActualizacion",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaTelefono3",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaParentesco",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaLugarTrabajo",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaDireccion",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaPeriodoRevision",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaDebitosPromedio",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaSaldoPromedio",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaPrincipalesClientes",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaContacto",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaSaldo",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaCreditos",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaDocumento",
									"kycProductosReferenciaTarjetaCredito.ctgTipoOperacion.ctgCatalogoId",
									"kycProductosReferenciaTarjetaCredito.ctgTipoMoneda.ctgCatalogoId",
									"kycProductosReferenciaTarjetaCredito.ctgTipoDocumento.ctgCatalogoId",
									"kycProductosReferenciaTarjetaCredito.ctgTipoReferencia.ctgCatalogoId",
									"kycProductosReferenciaTarjetaCredito.kycReferenciaCodigoTransaccion"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre Completo",  dataIndex: "kycProductosReferenciaTarjetaCredito.kycReferenciaNombre1", flex:2, Width: 120},
					              {header: "Parentesco",  dataIndex: "kycProductosReferenciaTarjetaCredito.kycReferenciaParentesco", flex:1, width:80},
							      {header: "Direcci\u00f3n Exacta",  dataIndex: "kycProductosReferenciaTarjetaCredito.kycReferenciaDireccion", flex:2,width: 110},
							      {header: "Tel\u00e9fono",  dataIndex: "kycProductosReferenciaTarjetaCredito.kycReferenciaTelefono1", flex:1,width: 110}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductosReferenciaTarjetaCreditoForm", record.data);
					    			Efx.form.setDisable("kycProductosReferenciaTarjetaCreditoForm");
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
						id: "kycProductosReferenciaTarjetaCreditoForm",
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
								text: "REFERENCIAS PERSONALES PARA TARJETA DE CR\u00c9DITO",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "Tipo de Documento", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de Documento", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype: "combo",
								id: "ctgTipoDocumento.ctgCatalogoId",
								name: "kycProductosReferenciaTarjetaCredito.ctgTipoDocumento.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoDocumento || [],
									fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre"]
								}),
								displayField: "ctgTipoDocumentoNombre",
								valueField: "ctgTipoDocumentoId",
								colspan: 2,
								allowBlank: false,
								listeners : {
										change : function() {
												var valor = this.getValue();
												if(valor == 639) {
													Ext.getCmp("botonValidar").disable();
													Ext.getCmp("kycReferenciaDocumento").vtype = undefined;
												}
												else if (valor==638){
														Ext.getCmp("kycReferenciaDocumento").vtype = "CedNac";
														Ext.getCmp("botonValidar").enable();
														}
											}
										}
							},
							{
								xtype: "textfield",
								id: "kycReferenciaDocumento",
								name: "kycProductosReferenciaTarjetaCredito.kycReferenciaDocumento",
								maxLength: 20,
								allowBlank: false,
								colspan:2
							},
							{
			                    xtype: 'button',
			                    id: "botonValidar",
			                    text: 'VALIDAR C\u00c9DULA',
			                    colspan:2,
			                    handler : KycProductosReferenciaTarjetaCredito.findFromBureau
			                },
							{xtype: "label", text: "Nombre Completo", cls: "x-form-item label_spacing", colspan: 4},
							{xtype: "label", text: "Parentesco", cls: "x-form-item label_spacing" ,colspan :2},

							{
								xtype: "textfield",
								id: "kycReferenciaNombre1",
								name: "kycProductosReferenciaTarjetaCredito.kycReferenciaNombre1",
								maxLength: 50,
								width: 480,
								allowBlank: false,
								colspan:4
							},{
								xtype: "textfield",
								id: "kycReferenciaParentesco",
								name: "kycProductosReferenciaTarjetaCredito.kycReferenciaParentesco",
								maxLength: 100,
								allowBlank: false,
								colspan:2
							},
							{xtype: "label", text: "Direcci\u00f3n Exacta", cls: "x-form-item label_spacing" ,colspan :4},
							{xtype: "label", text: "Tel\u00e9fono", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "textfield",
								id: "kycReferenciaDireccion",
								name: "kycProductosReferenciaTarjetaCredito.kycReferenciaDireccion",
								maxLength: 250,
								allowBlank: false,
								width: 480,
								colspan:4
							},
							{
								xtype: "textfield",
								id: "kycReferenciaTelefono1",
								name: "kycProductosReferenciaTarjetaCredito.kycReferenciaTelefono1",
								maxLength: 8,
								allowBlank: false,
								vtype:"validNA",
								colspan:2
							},
							{
								xtype: "hidden",
								id: "kycProductosReferenciaTarjetaCreditoId",
								name: "kycProductosReferenciaTarjetaCredito.kycReferenciaId"
							},{
								xtype: "hidden",
								id: "ctgTipoReferencia.ctgCatalogoId",
								name: "kycProductosReferenciaTarjetaCredito.ctgTipoReferencia.ctgCatalogoId"
							},{
								xtype: "hidden",
								id: "kycReferenciaCodigoTransaccion",
								name: "kycProductosReferenciaTarjetaCredito.kycReferenciaCodigoTransaccion"
							},
							{
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