KycCreditoHipotecario = function(){
	var configWindow = {
		edit: "kycCreditoHipotecarioEditarTop",
//		remove: "kycCreditoHipotecarioEliminarTop",
		grid: "kycCreditoHipotecarioGrid",
		save: "kycCreditoHipotecarioGuardarTop",
		form: "kycCreditoHipotecarioForm"
	};
	var configWindowBottom = {
			edit: "kycCreditoHipotecarioEditarBottom",
//			remove: "kycCreditoHipotecarioEliminarBottom",
			save: "kycCreditoHipotecarioGuardarBottom"
	};
	return {
		editarCreditoHipotecario: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarCreditoHipotecario: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycCredito/delete",
					params: {
						kycCreditoId: Efx.utils.getValue("kycCreditoHipotecarioId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoCredito : Efx.constants.codes.CREDITO_HIPOTECARIO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycCreditoHipotecarioForm");
								if(jsonObject.kycCreditoHipotecario){
			    					Ext.getCmp("kycCreditoHipotecarioGrid").getStore().loadData(jsonObject.kycCreditoHipotecario);
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
		guardarCreditoHipotecario: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycCreditoHipotecarioForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycCredito/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycCreditoHipotecario.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycCreditoHipotecario.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycCreditoHipotecario.ctgTipoCredito.ctgCatalogoId" :Efx.constants.codes.CREDITO_HIPOTECARIO,
    				 kycTipoCredito : Efx.constants.codes.CREDITO_HIPOTECARIO

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycCreditoHipotecarioForm", true);
    				if(action.result.kycCreditoHipotecario){
    					Ext.getCmp("kycCreditoHipotecarioGrid").getStore().loadData(action.result.kycCreditoHipotecario);
    					Ext.getCmp("kycCreditoHipotecarioGrid").getSelectionModel().select(action.result.kycCreditoHipotecarioIndex);
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
				title: "SECCI\u00d3N DE PRODUCTOS -  CR\u00c9DITOS",
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
					    	   text: "Editar",
					    	   id: "kycCreditoHipotecarioEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycCreditoHipotecario.editarCreditoHipotecario
					       },/*{
					    	   text: "Eliminar",
					    	   id: "kycCreditoHipotecarioEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycCreditoHipotecario.eliminarCreditoHipotecario
					       },*/
					       {
					    	   text: "Guardar",
					    	   id: "kycCreditoHipotecarioGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycCreditoHipotecario.guardarCreditoHipotecario
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
					    	   text: "Editar",
					    	   id: "kycCreditoHipotecarioEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycCreditoHipotecario.editarCreditoHipotecario
					       },/*{
					    	   text: "Eliminar",
					    	   id: "kycCreditoHipotecarioEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycCreditoHipotecario.eliminarCreditoHipotecario
					       },*/
					       {
					    	   text: "Guardar",
					    	   id: "kycCreditoHipotecarioGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycCreditoHipotecario.guardarCreditoHipotecario
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycCreditoHipotecarioGrid",
						height: 45,
						width:710,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycCreditoHipotecario || [],
					    	fields: [
								"kycCreditoHipotecario.kycCreditoId",
								"kycCreditoHipotecario.kycCreditoFechaSolicitud",
								"kycCreditoHipotecario.kycCreditoMontoSolicitado",
								"kycCreditoHipotecario.kycCreditoPlazo",
								"kycCreditoHipotecario.kycCreditoOtro",
								"kycCreditoHipotecario.kycCreditoMarca",
								"kycCreditoHipotecario.kycCreditoEstilo",
								"kycCreditoHipotecario.kycCreditoAnio",
								"kycCreditoHipotecario.kycCreditoPlaca",
								"kycCreditoHipotecario.kycCreditoValorGarantia",
								"kycCreditoHipotecario.kycCreditoPropietarioActual",
								"kycCreditoHipotecario.kycCreditoCedulaPropietario",
								"kycCreditoHipotecario.kycCreditoNombreInscrito",
								"kycCreditoHipotecario.kycCreditoCedulaInscrito",
								"kycCreditoHipotecario.kycCreditoDireccion",
								"kycCreditoHipotecario.kycCreditoHipoteca",
								"kycCreditoHipotecario.kycCreditoEntidadAcredora",
								"kycCreditoHipotecario.kycCreditoFolioRegistro",
								"kycCreditoHipotecario.kycFechaActualizacion",
								"ctgCondicion.ctgCatalogoId",
								"ctgProposito.ctgCatalogoId",
								"ctgTipoMoneda.ctgCatalogoId",
								"ctgTipoMonedaCredito.ctgCatalogoId",
								"ctgProvincia.ctgProvinciaId",
								"ctgCanton.ctgCantonId",
								"ctgDistrito.ctgDistritoId",
								"ctgSucursal.ctgSucursalId",
								"ctgServicio.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Fecha de solicitud",  dataIndex: "kycCreditoHipotecario.kycCreditoFechaSolicitud", flex: 2, minWidth: 200,renderer : function (value) {myDate = Ext.Date.parse(value, "Ymd");otherDate = Ext.Date.format(myDate,"d/m/Y");
				            		return otherDate;
					            	}},
							      {header: "Monto solicitado",  dataIndex: "kycCreditoHipotecario.kycCreditoMontoSolicitado",flex: 1, width: 100},
							      {header: "Plazo",  dataIndex: "kycCreditoHipotecario.kycCreditoPlazo",flex: 1.5, width: 100},
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycCreditoHipotecarioForm", record.data);
					    			Efx.form.setDisable("kycCreditoHipotecarioForm");
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
						id: "kycCreditoHipotecarioForm",
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
								text: "CR\u00c9DITO HIPOTECARIO",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 4},
							{xtype: "label",text: "Fecha de solicitud", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype : "datefield",
								id:"kycCreditoFechaSolicitud",
								name : "kycCreditoHipotecario.kycCreditoFechaSolicitud",
								submitFormat : "Ymd",
								width : 110,
								maxValue : new Date(),
								submitFormat : "Ymd",
								altFormats: "Ymd|d/m/Y",
								value: new Date(),
								colspan : 2,
							},
							{xtype: "label", text: "Monto solicitado", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label",text: "Moneda", cls: "x-form-item label_spacing", colspan: 4},
//							{xtype: "label", text: "Plazo", cls: "x-form-item label_spacing", colspan: 2},
							  {
								xtype:"numericfield",
								id:"kycCreditoMontoSolicitado",
								name : "kycCreditoHipotecario.kycCreditoMontoSolicitado",
								maxLength : 20,
								allowDecimals: true,
								decimalPrecision: 2,
								colspan:2
							},{
								xtype: "combo",
								id:"ctgTipoMoneda",
								name: "ctgTipoMoneda.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoMoneda || [],
									fields: ["ctgTipoMonedaId", "ctgTipoMonedaNombre"]
								}),
								displayField: "ctgTipoMonedaNombre",
								valueField: "ctgTipoMonedaId",
									colspan: 4
							},
							 /*{
								xtype : "numberfield",
								id:"kycCreditoPlazo",
								name : "kycCreditoHipotecario.kycCreditoPlazo",
								allowDecimals:false,
								 maxLength: 10,
								   hideTrigger: true,
								colspan:2
							},*/
							{xtype: "label", text: "Prop\u00f3sito", cls: "x-form-item label_spacing", width: 500, colspan: 4},
							{xtype: "label", text: "Otro", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype: "combo",
								id:"ctgProposito",
								name: "ctgProposito.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgPropositoHipotecario || [],
									fields: ["ctgPropositoHipotecarioId", "ctgPropositoHipotecarioNombre"]
								}),
								displayField: "ctgPropositoHipotecarioNombre",
								valueField: "ctgPropositoHipotecarioId",
								width: 480,
									colspan: 4
							},
							{
								xtype : "textfield",
								id:"kycCreditoOtro",
								name : "kycCreditoHipotecario.kycCreditoOtro",
								maxLength : 150,
								colspan:2
							},

							{
								xtype: "label",
								text: "DATOS DE GARANT\u00cdA",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},

							{xtype: "label", text: "Valor aproximado de la propiedad", cls: "x-form-item label_spacing", width:400, colspan: 6},

							{
								xtype:"numericfield",
								id:"kycCreditoValorGarantia",
								maxLength : 20,
								name : "kycCreditoHipotecario.kycCreditoValorGarantia",
								allowDecimals: true,
								decimalPrecision: 2,
								colspan:6
							},
							{
								xtype : "label",
								text : "Provincia",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Cant\u00F3n",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "label",
								text : "Distrito",
								cls : "x-form-item label_spacing"
							},
							{
								xtype : "combo",
								id : "ctgProvincia",
								name : "ctgProvincia.ctgProvinciaId",
								store : new Ext.data.SimpleStore({
									data : config.ctgProvincias || [],
									fields : [ "ctgProvinciaId",
											"ctgProvinciaNombre" ]
								}),
								displayField : "ctgProvinciaNombre",
								valueField : "ctgProvinciaId",
								listeners : {
									change : function() {
										Efx.combos
												.loadData(
														"ctgCanton",
														Efx.combos
																.getAllCantonesByProvinciaCombo(
																		this
																				.getValue(),
																		config.ctgCantones));
										Efx.combos.removeAll(
												"ctgDistrito", true);
									}
								}
							},
							{
								xtype : "combo",
								id : "ctgCanton",
								name : "ctgCanton.ctgCantonId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgCantonId",
											"ctgCantonNombre",
											"ctgProvinciaId" ]
								}),
								displayField : "ctgCantonNombre",
								valueField : "ctgCantonId",
								listeners : {
									change : function() {
										Efx.combos
												.loadData(
														"ctgDistrito",
														Efx.combos
																.getAllDistritosByCantonCombo(
																		this
																				.getValue(),
																		config.ctgDistritos));
									}
								}
							},
							{
								xtype : "combo",
								id : "ctgDistrito",
								name : "ctgDistrito.ctgDistritoId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgDistritoId",
											"ctgDistritoNombre",
											"ctgCantonId" ]
								}),
								displayField : "ctgDistritoNombre",
								valueField : "ctgDistritoId",
							},
							{xtype: "label", text: "Direcci\u00f3n exacta", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype : "textfield",
								id:"kycCreditoDireccion",
								name : "kycCreditoHipotecario.kycCreditoDireccion",
								maxLength : 100,
								colspan:6,
								width:720
							},
							{xtype: "label", text: "Inscrita a nombre de", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype : "textfield",
								id:"kycCreditoNombreInscrito",
								name : "kycCreditoHipotecario.kycCreditoNombreInscrito",
								maxLength : 120,
								colspan:6,
								width:720
							},
							{xtype: "label", text: "\u00bfEsta propiedad tiene hipoteca en primer grado?", cls: "x-form-item label_spacing", width:220, colspan:2},
							{xtype: "label", text: "Si es 'SI', indique la entidad acredora", cls: "x-form-item label_spacing", colspan:4},

							{
								xtype : "combo",
								id:"kycCreditoHipoteca",
								name : "kycCreditoHipotecario.kycCreditoHipoteca",
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
										Efx.utils.setDisabled("kycCreditoEntidadAcredora",disable, true);
										Efx.utils.setRequiredAndValidate("kycCreditoEntidadAcredora",!disable);

									}
								},
							},
							{
								xtype : "textfield",
								id:"kycCreditoEntidadAcredora",
								name : "kycCreditoHipotecario.kycCreditoEntidadAcredora",
								maxLength : 150,
								width: 480,
								colspan:4
							},
							{xtype: "label", text: "Folio de registro de la propiedad", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", text: "He le\u00eddo y entiendo el tipo de servicio que me ofrece Stewart Title:", cls: "x-form-item label_spacing", width: 480, colspan:4},
							{
								xtype : "textfield",
								id:"kycCreditoFolioRegistro",
								name : "kycCreditoHipotecario.kycCreditoFolioRegistro",
								maxLength : 50,
								colspan:2
							},
							{
								xtype: "combo",
								id:"ctgServicio",
								name: "ctgServicio.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgServicio || [],
									fields: ["ctgServicioId", "ctgServicioNombre"]
								}),
								displayField: "ctgServicioNombre",
								valueField: "ctgServicioId",
								width: 480,
								colspan: 4
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycCreditoHipotecarioId",
								name: "kycCreditoHipotecario.kycCreditoId"
							},{
								xtype: "hidden",
								id: "ctgTipoCreditoId",
								name: "kycCreditoHipotecario.ctgTipoCredito.ctgCatalogoId"
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