KycProductosReferenciaPersonal = function(){
	var configWindow = {
		add: "kycProductosReferenciaPersonalAgregarTop",
		edit: "kycProductosReferenciaPersonalEditarTop",
		save: "kycProductosReferenciaPersonalGuardarTop",
		remove: "kycProductosReferenciaPersonalEliminarTop",
		grid: "kycProductosReferenciaPersonalGrid",
		form: "kycProductosReferenciaPersonalForm"
	};
	var configWindowBottom = {
			add: "kycProductosReferenciaPersonalAgregarBottom",
			edit: "kycProductosReferenciaPersonalEditarBottom",
			save: "kycProductosReferenciaPersonalGuardarBottom",
			remove: "kycProductosReferenciaPersonalEliminarBottom"
	};
	return {
		agregarProductosReferenciaPersonal: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductosReferenciaPersonal: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductosReferenciaPersonal: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/delete",
					params: {
						kycReferenciaId: Efx.utils.getValue("kycProductosReferenciaPersonalId"),
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
								Efx.form.clearAndDisable("kycProductosReferenciaPersonalForm");
								if(jsonObject.kycProductosReferenciaPersonal){
			    					Ext.getCmp("kycProductosReferenciaPersonalGrid").getStore().loadData(jsonObject.kycProductosReferenciaPersonal);
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
		guardarProductosReferenciaPersonal: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductosReferenciaPersonalForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductosReferenciaPersonal.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaPersonal.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaPersonal.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductosReferenciaPersonal.ctgTipoReferencia.ctgCatalogoId" :Efx.constants.codes.PRODUCTOS_REFERENCIA_PERSONAL,
    				 kycTipoReferencia : Efx.constants.codes.PRODUCTOS_REFERENCIA_PERSONAL

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductosReferenciaPersonalForm", true);
    				if(action.result.kycProductosReferenciaPersonal){
    					Ext.getCmp("kycProductosReferenciaPersonalGrid").getStore().loadData(action.result.kycProductosReferenciaPersonal);
    					Ext.getCmp("kycProductosReferenciaPersonalGrid").getSelectionModel().select(action.result.kycProductosReferenciaPersonalIndex);
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
					kycReferenciaPersonalId :Efx.utils.getValue("kycProductosReferenciaPersonalId"),
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
				title: "CR\u00c9DITO PERSONAL - REFERENCIAS",
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
							   id: "kycProductosReferenciaPersonalAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaPersonal.agregarProductosReferenciaPersonal
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaPersonalEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaPersonal.editarProductosReferenciaPersonal
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaPersonalGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaPersonal.guardarProductosReferenciaPersonal
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaPersonalEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaPersonal.eliminarProductosReferenciaPersonal
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
							   id: "kycProductosReferenciaPersonalAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaPersonal.agregarProductosReferenciaPersonal
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaPersonalEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaPersonal.editarProductosReferenciaPersonal
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaPersonalGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaPersonal.guardarProductosReferenciaPersonal
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaPersonalEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaPersonal.eliminarProductosReferenciaPersonal
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductosReferenciaPersonalGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductosReferenciaPersonal || [],
					    	fields: [
					    	     	"kycProductosReferenciaPersonal.kycReferenciaId",
									"kycProductosReferenciaPersonal.kycReferenciaNombre1",
									"kycProductosReferenciaPersonal.kycReferenciaTipo",
									"kycProductosReferenciaPersonal.kycReferenciaTelefono1",
									"kycProductosReferenciaPersonal.kycReferenciaTelefono2",
									"kycProductosReferenciaPersonal.kycReferenciaCuenta",
									"kycProductosReferenciaPersonal.kycReferenciaBancaria",
									"kycProductosReferenciaPersonal.kyc.kycFechaActualizacion",
									"kycProductosReferenciaPersonal.kycReferenciaTelefono3",
									"kycProductosReferenciaPersonal.kycReferenciaParentesco",
									"kycProductosReferenciaPersonal.kycReferenciaLugarTrabajo",
									"kycProductosReferenciaPersonal.kycReferenciaDireccion",
									"kycProductosReferenciaPersonal.kycReferenciaPeriodoRevision",
									"kycProductosReferenciaPersonal.kycReferenciaDebitosPromedio",
									"kycProductosReferenciaPersonal.kycReferenciaSaldoPromedio",
									"kycProductosReferenciaPersonal.kycReferenciaPrincipalesClientes",
									"kycProductosReferenciaPersonal.kycReferenciaContacto",
									"kycProductosReferenciaPersonal.kycReferenciaSaldo",
									"kycProductosReferenciaPersonal.kycReferenciaCreditos",
									"kycProductosReferenciaPersonal.kycReferenciaDocumento",
									"kycProductosReferenciaPersonal.ctgTipoOperacion.ctgCatalogoId",
									"kycProductosReferenciaPersonal.ctgTipoMoneda.ctgCatalogoId",
									"kycProductosReferenciaPersonal.ctgTipoDocumento.ctgCatalogoId",
									"kycProductosReferenciaPersonal.ctgTipoReferencia.ctgCatalogoId",
									"kycProductosReferenciaPersonal.kycReferenciaCodigoTransaccion"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre Completo",  dataIndex: "kycProductosReferenciaPersonal.kycReferenciaNombre1", flex:2, Width: 120},
					              {header: "Parentesco",  dataIndex: "kycProductosReferenciaPersonal.kycReferenciaParentesco", flex:1, width:80},
							      {header: "Direcci\u00f3n Exacta",  dataIndex: "kycProductosReferenciaPersonal.kycReferenciaDireccion", flex:2,width: 110},
							      {header: "Tel\u00e9fono",  dataIndex: "kycProductosReferenciaPersonal.kycReferenciaTelefono1", flex:1,width: 110}

					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductosReferenciaPersonalForm", record.data);
					    			Efx.form.setDisable("kycProductosReferenciaPersonalForm");
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
						id: "kycProductosReferenciaPersonalForm",
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
								text: "REFERENCIAS PERSONALES",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "Tipo de Documento", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de Documento", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype: "combo",
								id: "ctgTipoDocumento.ctgCatalogoId",
								name: "kycProductosReferenciaPersonal.ctgTipoDocumento.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoDocumento || [],
									fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre"]
								}),
								displayField: "ctgTipoDocumentoNombre",
								valueField: "ctgTipoDocumentoId",
								allowBlank: false,
								colspan: 2,
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
								name: "kycProductosReferenciaPersonal.kycReferenciaDocumento",
								maxLength: 20,
								allowBlank: false,
								colspan:2
							},
							{
			                    xtype: 'button',
			                    id: "botonValidar",
			                    text: 'VALIDAR C\u00c9DULA',
			                    colspan:2,
			                    handler : KycProductosReferenciaPersonal.findFromBureau
			                },
							{xtype: "label", text: "Nombre Completo", cls: "x-form-item label_spacing", colspan: 4},
							{xtype: "label", text: "Parentesco", cls: "x-form-item label_spacing" ,colspan :2},

							{
								xtype: "textfield",
								id: "kycReferenciaNombre1",
								name: "kycProductosReferenciaPersonal.kycReferenciaNombre1",
								maxLength: 50,
								allowBlank: false,
								width: 480,
								colspan:4
							},{
								xtype: "textfield",
								id: "kycReferenciaParentesco",
								name: "kycProductosReferenciaPersonal.kycReferenciaParentesco",
								maxLength: 100,
								allowBlank: false,
								colspan:2
							},
							{xtype: "label", text: "Direcci\u00f3n Exacta", cls: "x-form-item label_spacing" ,colspan :4},
							{xtype: "label", text: "Tel\u00e9fono", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "textfield",
								id: "kycReferenciaDireccion",
								name: "kycProductosReferenciaPersonal.kycReferenciaDireccion",
								maxLength: 250,
								width: 480,
								allowBlank: false,
								colspan:4
							},
							{
								xtype: "textfield",
								id: "kycReferenciaTelefono1",
								name: "kycProductosReferenciaPersonal.kycReferenciaTelefono1",
								maxLength: 8,
								allowBlank: false,
								vtype:"validNA",
								colspan:2
							},
							{
								xtype: "hidden",
								id: "kycProductosReferenciaPersonalId",
								name: "kycProductosReferenciaPersonal.kycReferenciaId"
							},{
								xtype: "hidden",
								id: "kycReferenciaCodigoTransaccion",
								name: "kycProductosReferenciaPersonal.kycReferenciaCodigoTransaccion"
							},{
								xtype: "hidden",
								id: "ctgTipoReferencia.ctgCatalogoId",
								name: "kycProductosReferenciaPersonal.ctgTipoReferencia.ctgCatalogoId"
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