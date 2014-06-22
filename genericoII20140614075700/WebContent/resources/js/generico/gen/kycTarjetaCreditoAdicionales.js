KycTarjetaCreditoAdicionales = function(){
	var configWindow = {
		add: "kycTarjetaCreditoAdicionalesAgregarTop",
		edit: "kycTarjetaCreditoAdicionalesEditarTop",
		remove: "kycTarjetaCreditoAdicionalesEliminarTop",
		grid: "kycTarjetaCreditoAdicionalesGrid",
		save: "kycTarjetaCreditoAdicionalesGuardarTop",
		form: "kycTarjetaCreditoAdicionalesForm"
	};
	var configWindowBottom = {
			add: "kycTarjetaCreditoAdicionalesAgregarBottom",
			edit: "kycTarjetaCreditoAdicionalesEditarBottom",
			remove: "kycTarjetaCreditoAdicionalesEliminarBottom",
			save: "kycTarjetaCreditoAdicionalesGuardarBottom"
	};
	return {
		agregarTarjetaCreditoAdicionales: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarTarjetaCreditoAdicionales: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarTarjetaCreditoAdicionales: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycTarjetaCreditoAdicionales/delete",
					params: {
						kycTarjetaCreditoAdicionalesId: Efx.utils.getValue("kycTarjetaCreditoAdicionalesId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId()
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycTarjetaCreditoAdicionalesForm");
								if(jsonObject.kycTarjetaCreditoAdicionales){
			    					Ext.getCmp("kycTarjetaCreditoAdicionalesGrid").getStore().loadData(jsonObject.kycTarjetaCreditoAdicionales);
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
		findFromBureau: function(){
			Efx.message.progress("Buscando en Bureau...");
			if(Ext.isEmpty(Efx.utils.getValue("kycTarjetaCreditoAdicionalesNumeroDocumento"))){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycTarjetaCreditoAdicionales/findFromBureau",
				params: {
					kycPersonaFisicaDocumento1: Efx.utils.getValue("kycTarjetaCreditoAdicionalesNumeroDocumento"),
					tipoBoton : "1",
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
					kycTarjetaCreditoAdicionalesId :Efx.utils.getValue("kycTarjetaCreditoAdicionalesId"),
    				kycTipoPersona : Efx.utils.getValue("ctgTipoDocumento")
				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycTarjetaCreditoAdicionalesNombre").setValue(jsonObject.kycTarjetaCreditoAdicionalesNombre);
						Ext.getCmp("kycTarjetaCreditoAdicionalesApellido1").setValue(jsonObject.kycTarjetaCreditoAdicionalesApellido1);
						Ext.getCmp("kycTarjetaCreditoAdicionalesApellido2").setValue(jsonObject.kycTarjetaCreditoAdicionalesApellido2);
						Ext.getCmp("ctgGenero").setValue(jsonObject.ctgGenero);
						Ext.getCmp("kycTarjetaCreditoAdicionalesFechaNacimiento").setValue(jsonObject.kycTarjetaCreditoAdicionalesFechaNacimiento);
						Ext.getCmp("kycTarjetaCreditoAdicionalesCodigoTransaccion").setValue(jsonObject.kycTarjetaCreditoAdicionalesCodigoTransaccion);
						Efx.message.alert(jsonObject.message);

					}
				}
			});
		},

		guardarTarjetaCreditoAdicionales: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycTarjetaCreditoAdicionalesForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycTarjetaCreditoAdicionales/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycTarjetaCreditoAdicionales.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycTarjetaCreditoAdicionales.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId()
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycTarjetaCreditoAdicionalesForm", true);
    				if(action.result.kycTarjetaCreditoAdicionales){
    					Ext.getCmp("kycTarjetaCreditoAdicionalesGrid").getStore().loadData(action.result.kycTarjetaCreditoAdicionales);
    					Ext.getCmp("kycTarjetaCreditoAdicionalesGrid").getSelectionModel().select(action.result.kycTarjetaCreditoAdicionalesIndex);
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
				title: "PRODUCTOS - ADICIONALES",
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
							   id: "kycTarjetaCreditoAdicionalesAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycTarjetaCreditoAdicionales.agregarTarjetaCreditoAdicionales
						   },{
					    	   text: "Editar",
					    	   id: "kycTarjetaCreditoAdicionalesEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycTarjetaCreditoAdicionales.editarTarjetaCreditoAdicionales
					       },{
					    	   text: "Eliminar",
					    	   id: "kycTarjetaCreditoAdicionalesEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycTarjetaCreditoAdicionales.eliminarTarjetaCreditoAdicionales
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycTarjetaCreditoAdicionalesGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycTarjetaCreditoAdicionales.guardarTarjetaCreditoAdicionales
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
							   id: "kycTarjetaCreditoAdicionalesAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycTarjetaCreditoAdicionales.agregarTarjetaCreditoAdicionales
						   },{
					    	   text: "Editar",
					    	   id: "kycTarjetaCreditoAdicionalesEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycTarjetaCreditoAdicionales.editarTarjetaCreditoAdicionales
					       },{
					    	   text: "Eliminar",
					    	   id: "kycTarjetaCreditoAdicionalesEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycTarjetaCreditoAdicionales.eliminarTarjetaCreditoAdicionales
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycTarjetaCreditoAdicionalesGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycTarjetaCreditoAdicionales.guardarTarjetaCreditoAdicionales
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycTarjetaCreditoAdicionalesGrid",
						height: 100,
						width:715,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycTarjetaCreditoAdicionales || [],
					    	fields: [
								"kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesId",
								"kycTarjetaCreditoAdicionalesNombre",
								"kycTarjetaCreditoAdicionalesApellido1",
								"kycTarjetaCreditoAdicionalesApellido2",
								"kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesFechaNacimiento",
								"kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesNumeroDocumento",
								"kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesNombreUsual",
								"kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesParentesco",
								"kycTarjetaCreditoAdicionales.kycFechaActualizacion",
								"ctgTipoDocumento",
								"ctgGenero",
								"ctgEstadoCivil",
								"ctgProfesion",
								"kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesCodigoTransaccion",
			    	        ]
					    }),
					    columns: [
					              {text: "Nombre Completo de Adicional",   xtype: "templatecolumn", tpl: "{kycTarjetaCreditoAdicionalesNombre} " + "{kycTarjetaCreditoAdicionalesApellido1} " + "{kycTarjetaCreditoAdicionalesApellido2}", flex: 1.5},
					              {header: "N\u00famero de Documento",  dataIndex: "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesNumeroDocumento", flex: 1}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycTarjetaCreditoAdicionalesForm", record.data);
					    			Efx.form.setDisable("kycTarjetaCreditoAdicionalesForm");
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
						id: "kycTarjetaCreditoAdicionalesForm",
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
								text: "ADICIONALES A TARJETA DE CR\u00c9DITO",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{
								xtype : "label",
								text : "Tipo de Documento",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "N\u00famero de Documento",
								cls : "x-form-item label_spacing",
								colspan:4
							},
							{
								xtype: "combo",
								id: "ctgTipoDocumento",
								name: "kycTarjetaCreditoAdicionales.ctgTipoDocumento.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTiposCedulas || [],
									fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre"]
								}),
								displayField: "ctgTipoDocumentoNombre",
								valueField: "ctgTipoDocumentoId",
								allowBlank: false,
								colspan: 2,
								listeners:
								{
								change: function()
									{
									if (this.getValue() != 465)
										{
											Ext.getCmp("validarButtonId1").disable();
											Ext.getCmp("kycTarjetaCreditoAdicionalesNumeroDocumento").vtype = undefined;
										}
									else
										{
											Ext.getCmp("validarButtonId1").enable();
											Ext.getCmp("kycTarjetaCreditoAdicionalesNumeroDocumento").vtype = "CedNac";
										}
									},

								render: function()
									{
										if (this.getValue() != 465)
										{
											Ext.getCmp("validarButtonId1").disable();
											Ext.getCmp("kycTarjetaCreditoAdicionalesNumeroDocumento").vtype = undefined;

										}
										else
										{
											Ext.getCmp("validarButtonId1").enable();
											Ext.getCmp("kycTarjetaCreditoAdicionalesNumeroDocumento").vtype = "CedNac";

										}
									}
								}
							},
							{
								xtype : "textfield",
								id : "kycTarjetaCreditoAdicionalesNumeroDocumento",
								name : "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesNumeroDocumento",
								allowBlank : false,
								maxlength: 20,
								colspan:2
							},
							{
			                    xtype: 'button',
			                    id:"validarButtonId1",
			                    text: 'VALIDAR C\u00c9DULA',
			                    handler: KycTarjetaCreditoAdicionales.findFromBureau,
			                    colspan:2
			                },
							{
								xtype : "label",
								text : "Nombres",
								cls : "x-form-item label_spacing",
								colspan:2
							},{
								xtype : "label",
								text : "Primer Apellido ",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "Segundo Apellido",
								cls : "x-form-item label_spacing",
								colspan:2
							},{
								xtype : "textfield",
								id : "kycTarjetaCreditoAdicionalesNombre",
								name : "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesNombre",
								allowBlank : false,
								maxLength : 150,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycTarjetaCreditoAdicionalesApellido1",
								name : "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesApellido1",
								maxLength : 50,
								allowBlank:false,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycTarjetaCreditoAdicionalesApellido2",
								name : "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesApellido2",
								maxLength : 50,
								allowBlank:false,
								colspan:2
							},
							{
								xtype : "label",
								text : "Sexo",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "Estado Civil",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "label",
								text : "Fecha de Nacimiento",
								cls : "x-form-item label_spacing",
								colspan:2
							},
							{
								xtype : "combo",
								id : "ctgGenero",
								allowBlank:false,
								name : "kycTarjetaCreditoAdicionales.ctgGenero.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgGeneros || [],
									fields : [ "ctgGeneroId",
											"ctgGeneroNombre" ]
								}),
								displayField : "ctgGeneroNombre",
								valueField : "ctgGeneroId",
								colspan:2
							},
							{
								xtype : "combo",
								id : "ctgEstadoCivil",
								name : "kycTarjetaCreditoAdicionales.ctgEstadoCivil.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgEstadosCiviles || [],
									fields : [ "ctgEstadoCivilId",
											"ctgEstadoCivilNombre" ]
								}),
								displayField : "ctgEstadoCivilNombre",
								valueField : "ctgEstadoCivilId",
								allowBlank:false,
								colspan:2
							},
							{
								xtype : "datefield",
								id : "kycTarjetaCreditoAdicionalesFechaNacimiento",
								name : "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesFechaNacimiento",
								submitFormat : "Ymd",
								altFormats: "Ymd|d/m/Y",
								allowBlank:false,
								colspan: 2
							},
							{xtype : "label", text : "Profesi\u00f3n", cls : "x-form-item label_spacing", colspan:2},
							{xtype : "label", text : "Nombre Usual en Pl\u00e1stico", cls : "x-form-item label_spacing", colspan:2},
							{xtype : "label", text : "Parentesco", cls : "x-form-item label_spacing", colspan:2},
							{
								xtype : "combo",
								id : "ctgProfesion",
								name : "kycTarjetaCreditoAdicionales.ctgProfesion.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgOcupaciones || [],
									fields : [ "ctgOcupacionesId",
											"ctgOcupacionesNombre" ]
								}),
								displayField : "ctgOcupacionesNombre",
								valueField : "ctgOcupacionesId",
								allowBlank:false,
								colspan:2
							},
							{
								xtype : "textfield",
								id : "kycTarjetaCreditoAdicionalesNombreUsual",
								allowBlank:false,
								maxLength : 250,
								name : "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesNombreUsual",
							},
							{
								xtype : "textfield",
								id : "kycTarjetaCreditoAdicionalesParentesco",
								allowBlank:false,
								maxLength : 30,
								name : "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesParentesco"
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycTarjetaCreditoAdicionalesId",
								name: "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesId"
							},{
								xtype: "hidden",
								id: "kycTarjetaCreditoAdicionalesCodigoTransaccion",
								name: "kycTarjetaCreditoAdicionales.kycTarjetaCreditoAdicionalesCodigoTransaccion"
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