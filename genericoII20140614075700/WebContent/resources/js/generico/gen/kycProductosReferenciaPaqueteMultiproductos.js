KycProductosReferenciaPaqueteMultiproductos = function(){
	var configWindow = {
		add: "kycProductosReferenciaPaqueteMultiproductosAgregarTop",
		edit: "kycProductosReferenciaPaqueteMultiproductosEditarTop",
		save: "kycProductosReferenciaPaqueteMultiproductosGuardarTop",
		remove: "kycProductosReferenciaPaqueteMultiproductosEliminarTop",
		grid: "kycProductosReferenciaPaqueteMultiproductosGrid",
		form: "kycProductosReferenciaPaqueteMultiproductosForm"
	};
	var configWindowBottom = {
			add: "kycProductosReferenciaPaqueteMultiproductosAgregarBottom",
			edit: "kycProductosReferenciaPaqueteMultiproductosEditarBottom",
			save: "kycProductosReferenciaPaqueteMultiproductosGuardarBottom",
			remove: "kycProductosReferenciaPaqueteMultiproductosEliminarBottom"
	};
	return {
		agregarProductosReferenciaPaqueteMultiproductos: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductosReferenciaPaqueteMultiproductos: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductosReferenciaPaqueteMultiproductos: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/delete",
					params: {
						kycReferenciaId: Efx.utils.getValue("kycProductosReferenciaPaqueteMultiproductosId"),
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
								Efx.form.clearAndDisable("kycProductosReferenciaPaqueteMultiproductosForm");
								if(jsonObject.kycProductosReferenciaPaqueteMultiproductos){
			    					Ext.getCmp("kycProductosReferenciaPaqueteMultiproductosGrid").getStore().loadData(jsonObject.kycProductosReferenciaPaqueteMultiproductos);
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
		guardarProductosReferenciaPaqueteMultiproductos: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductosReferenciaPaqueteMultiproductosForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductosReferenciaPaqueteMultiproductos.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaPaqueteMultiproductos.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaPaqueteMultiproductos.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductosReferenciaPaqueteMultiproductos.ctgTipoReferencia.ctgCatalogoId" :Efx.constants.codes.PRODUCTOS_REFERENCIA_PAQUETE_MULTIPRODUCTOS,
    				 kycTipoReferencia : Efx.constants.codes.PRODUCTOS_REFERENCIA_PAQUETE_MULTIPRODUCTOS

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductosReferenciaPaqueteMultiproductosForm", true);
    				if(action.result.kycProductosReferenciaPaqueteMultiproductos){
    					Ext.getCmp("kycProductosReferenciaPaqueteMultiproductosGrid").getStore().loadData(action.result.kycProductosReferenciaPaqueteMultiproductos);
    					Ext.getCmp("kycProductosReferenciaPaqueteMultiproductosGrid").getSelectionModel().select(action.result.kycProductosReferenciaPaqueteMultiproductosIndex);
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
					kycReferenciaPersonalId :Efx.utils.getValue("kycProductosReferenciaPaqueteMultiproductosId"),
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId()

				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycReferenciaNombre1").setValue(jsonObject.kycReferenciaNombre1);
						Ext.getCmp("kycReferenciaDireccion").setValue(jsonObject.kycReferenciaDireccion);
						Ext.getCmp("kycReferenciaTelefono1").setValue(jsonObject.kycReferenciaTelefono1);
						Ext.getCmp("kycReferenciaTelefono2").setValue(jsonObject.kycReferenciaTelefono2);
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
							   id: "kycProductosReferenciaPaqueteMultiproductosAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaPaqueteMultiproductos.agregarProductosReferenciaPaqueteMultiproductos
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaPaqueteMultiproductosEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaPaqueteMultiproductos.editarProductosReferenciaPaqueteMultiproductos
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaPaqueteMultiproductosGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaPaqueteMultiproductos.guardarProductosReferenciaPaqueteMultiproductos
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaPaqueteMultiproductosEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaPaqueteMultiproductos.eliminarProductosReferenciaPaqueteMultiproductos
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
							   id: "kycProductosReferenciaPaqueteMultiproductosAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaPaqueteMultiproductos.agregarProductosReferenciaPaqueteMultiproductos
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaPaqueteMultiproductosEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaPaqueteMultiproductos.editarProductosReferenciaPaqueteMultiproductos
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaPaqueteMultiproductosGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaPaqueteMultiproductos.guardarProductosReferenciaPaqueteMultiproductos
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaPaqueteMultiproductosEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaPaqueteMultiproductos.eliminarProductosReferenciaPaqueteMultiproductos
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductosReferenciaPaqueteMultiproductosGrid",
						height: 150,
						width:700,
						colspan: 6,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductosReferenciaPaqueteMultiproductos || [],
					    	fields: [
					    	     	"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaId",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaNombre1",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaTipo",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaTelefono1",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaTelefono2",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaCuenta",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaBancaria",
									"kycProductosReferenciaPaqueteMultiproductos.kyc.kycFechaActualizacion",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaTelefono3",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaParentesco",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaLugarTrabajo",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaDireccion",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaPeriodoRevision",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaDebitosPromedio",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaSaldoPromedio",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaPrincipalesClientes",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaContacto",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaSaldo",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaCreditos",
									"kycProductosReferenciaPaqueteMultiproductos.kycReferenciaDocumento",
									"kycProductosReferenciaPaqueteMultiproductos.ctgTipoOperacion.ctgCatalogoId",
									"kycProductosReferenciaPaqueteMultiproductos.ctgTipoMoneda.ctgCatalogoId",
									"kycProductosReferenciaPaqueteMultiproductos.ctgTipoDocumento.ctgCatalogoId",
									"kycProductosReferenciaPaqueteMultiproductos.ctgTipoReferencia.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Nombre Completo",  dataIndex: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaNombre1", flex:2, Width: 120},
					              {header: "Parentesco",  dataIndex: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaParentesco", flex:1, width:80},
							      {header: "Direcci\u00f3n Exacta",  dataIndex: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaDireccion", flex:2,width: 110},
							      {header: "Tel\u00e9fono",  dataIndex: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaTelefono1", flex:1,width: 110}

					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductosReferenciaPaqueteMultiproductosForm", record.data);
					    			Efx.form.setDisable("kycProductosReferenciaPaqueteMultiproductosForm");
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
						id: "kycProductosReferenciaPaqueteMultiproductosForm",
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
								text: "REFERENCIAS PERSONALES PARA PAQUETE MULTIPRODUCTOS",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "Tipo de Documento", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de Documento", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype: "combo",
								id: "ctgTipoDocumento.ctgCatalogoId",
								name: "kycProductosReferenciaPaqueteMultiproductos.ctgTipoDocumento.ctgCatalogoId",
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
								name: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaDocumento",
								maxLength: 20,
								allowBlank: false,
								colspan:2
							},
							{
			                    xtype: 'button',
			                    id: "botonValidar",
			                    text: 'VALIDAR C\u00c9DULA',
			                    colspan:2,
			                    handler : KycProductosReferenciaPaqueteMultiproductos.findFromBureau
			                },
							{xtype: "label", text: "Nombre Completo", cls: "x-form-item label_spacing", colspan: 4},
							{xtype: "label", text: "Parentesco", cls: "x-form-item label_spacing" ,colspan :2},

							{
								xtype: "textfield",
								id: "kycReferenciaNombre1",
								name: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaNombre1",
								maxLength: 50,
								allowBlank: false,
								width: 480,
								colspan:4
							},{
								xtype: "textfield",
								id: "kycReferenciaParentesco",
								name: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaParentesco",
								maxLength: 100,
								allowBlank: false,
								colspan:2
							},
							{xtype: "label", text: "Direcci\u00f3n Exacta", cls: "x-form-item label_spacing" ,colspan :4},
							{xtype: "label", text: "Tel\u00e9fono", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "textfield",
								id: "kycReferenciaDireccion",
								name: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaDireccion",
								maxLength: 250,
								width: 480,
								allowBlank: false,
								colspan:4
							},
							{
								xtype: "textfield",
								id: "kycReferenciaTelefono1",
								name: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaTelefono1",
								maxLength: 8,
								allowBlank: false,
								vtype:"validNA",
								colspan:2
							},
							{
								xtype: "hidden",
								id: "kycProductosReferenciaPaqueteMultiproductosId",
								name: "kycProductosReferenciaPaqueteMultiproductos.kycReferenciaId"
							},{
								xtype: "hidden",
								id: "ctgTipoReferencia.ctgCatalogoId",
								name: "kycProductosReferenciaPaqueteMultiproductos.ctgTipoReferencia.ctgCatalogoId"
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