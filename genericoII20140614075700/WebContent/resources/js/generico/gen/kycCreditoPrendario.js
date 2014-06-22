KycCreditoPrendario = function(){
	var configWindow = {
		edit: "kycCreditoPrendarioEditarTop",
		save: "kycCreditoPrendarioGuardarTop",
//		remove: "kycCreditoPrendarioEliminarTop",
		grid: "kycCreditoPrendarioGrid",
		form: "kycCreditoPrendarioForm"
	};
	var configWindowBottom = {
			edit: "kycCreditoPrendarioEditarBottom",
			save: "kycCreditoPrendarioGuardarBottom",
//			remove: "kycCreditoPrendarioEliminarBottom"
	};
	return {
		editarCreditoPrendario: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarCreditoPrendario: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycCredito/delete",
					params: {
						kycCreditoId: Efx.utils.getValue("kycCreditoPrendarioId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoCredito : Efx.constants.codes.LABORAL_ASALARIADO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycCreditoPrendarioForm");
								if(jsonObject.kycCreditoPrendario){
			    					Ext.getCmp("kycCreditoPrendarioGrid").getStore().loadData(jsonObject.kycCreditoPrendario);
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
		guardarCreditoPrendario: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycCreditoPrendarioForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycCredito/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycCreditoPrendario.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycCreditoPrendario.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycCreditoPrendario.ctgTipoCredito.ctgCatalogoId" :Efx.constants.codes.CREDITO_PRENDARIO,
    				 kycTipoCredito : Efx.constants.codes.CREDITO_PRENDARIO

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycCreditoPrendarioForm", true);
    				if(action.result.kycCreditoPrendario){
    					Ext.getCmp("kycCreditoPrendarioGrid").getStore().loadData(action.result.kycCreditoPrendario);
    					Ext.getCmp("kycCreditoPrendarioGrid").getSelectionModel().select(action.result.kycCreditoPrendarioIndex);
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
					    	   id: "kycCreditoPrendarioEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycCreditoPrendario.editarCreditoPrendario
					       },{
					    	   text: "Guardar",
					    	   id: "kycCreditoPrendarioGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycCreditoPrendario.guardarCreditoPrendario
					       }/*,{
					    	   text: "Eliminar",
					    	   id: "kycCreditoPrendarioEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycCreditoPrendario.eliminarCreditoPrendario
					       }*/
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
					    	   id: "kycCreditoPrendarioEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycCreditoPrendario.editarCreditoPrendario
					       },{
					    	   text: "Guardar",
					    	   id: "kycCreditoPrendarioGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycCreditoPrendario.guardarCreditoPrendario
					       }/*,{
					    	   text: "Eliminar",
					    	   id: "kycCreditoPrendarioEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycCreditoPrendario.eliminarCreditoPrendario
					       }*/
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycCreditoPrendarioGrid",
						height: 45,
						width:710,
						colspan: 6,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycCreditoPrendario || [],
					    	fields: [
							"kycCreditoPrendario.kycCreditoId",
							"kycCreditoPrendario.kycCreditoFechaSolicitud",
							"kycCreditoPrendario.kycCreditoMontoSolicitado",
							"kycCreditoPrendario.kycCreditoPlazo",
							"kycCreditoPrendario.kycCreditoOtro",
							"kycCreditoPrendario.kycCreditoMarca",
							"kycCreditoPrendario.kycCreditoEstilo",
							"kycCreditoPrendario.kycCreditoAnio",
							"kycCreditoPrendario.kycCreditoPlaca",
							"kycCreditoPrendario.kycCreditoValorGarantia",
							"kycCreditoPrendario.kycCreditoPropietarioActual",
							"kycCreditoPrendario.kycCreditoCedulaPropietario",
							"kycCreditoPrendario.kycCreditoNombreInscrito",
							"kycCreditoPrendario.kycCreditoCedulaInscrito",
							"kycCreditoPrendario.kycCreditoDireccion",
							"kycCreditoPrendario.kycCreditoHipoteca",
							"kycCreditoPrendario.kycCreditoEntidadAcredora",
							"kycCreditoPrendario.kycCreditoFolioRegistro",
							"kycCreditoPrendario.kycFechaActualizacion",
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
					              {header: "Fecha de solicitud",  dataIndex: "kycCreditoPrendario.kycCreditoFechaSolicitud", flex: 2, minWidth: 200,
					            	  renderer : function (value) {myDate = Ext.Date.parse(value, "Ymd");otherDate = Ext.Date.format(myDate,"d/m/Y");
					            		return otherDate;
					            	}},
							      {header: "Monto solicitado",  dataIndex: "kycCreditoPrendario.kycCreditoMontoSolicitado",flex: 1, width: 100},
							      {header: "Plazo",  dataIndex: "kycCreditoPrendario.kycCreditoPlazo",flex: 1.5, width: 100},
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycCreditoPrendarioForm", record.data);
					    			Efx.form.setDisable("kycCreditoPrendarioForm");
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
						id: "kycCreditoPrendarioForm",
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
								text: "CR\u00c9DITO PRENDARIO",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 4},
							{xtype: "label", text: "Fecha de solicitud", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype : "datefield",
								id:"kycCreditoFechaSolicitud",
								name : "kycCreditoPrendario.kycCreditoFechaSolicitud",
								submitFormat : "Ymd",
								width : 110,
								maxValue : new Date(),
								submitFormat : "Ymd",
								altFormats: "Ymd|d/m/Y",
								value: new Date(),
								colspan : 2,
							},
							{xtype: "label", text: "Monto solicitado", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Moneda", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Plazo (Meses)", cls: "x-form-item label_spacing", colspan: 2},
							  {
								xtype:"numericfield",
								id:"kycCreditoMontoSolicitado",
								name : "kycCreditoPrendario.kycCreditoMontoSolicitado",
								allowDecimals: true,
								decimalPrecision: 2,
								maxLength : 20,
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
									colspan: 2
							}, {
								xtype : "numberfield",
								id:"kycCreditoPlazo",
								name : "kycCreditoPrendario.kycCreditoPlazo",
								allowDecimals: false,
								maxLength : 10,
								 hideTrigger: true,
								value:0,
								colspan:2
							},
							{xtype: "label", text: "Prop\u00f3sito", cls: "x-form-item label_spacing", colspan: 6},
							{
					            xtype: 'radiogroup',
					            id: "ctgPropositoPrendario",
					            columns : 2,
					            items : config.ctgPropositoPrendario || [],
					            width:380,
					            colspan: 6
					        },{
								xtype: "label",
								text: "DATOS DE GARANT\u00cdA",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label", text: "Marca", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Estilo", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", text: "A\u00f1o", cls: "x-form-item label_spacing", colspan:2},
							{
								xtype : "textfield",
								id:"kycCreditoMarca",
								name : "kycCreditoPrendario.kycCreditoMarca",
								maxLength : 100,
								colspan:2
							},{
								xtype : "textfield",
								id:"kycCreditoEstilo",
								name : "kycCreditoPrendario.kycCreditoEstilo",
								maxLength : 100,
								colspan:2
							},{
								xtype : "textfield",
								id:"kycCreditoAnio",
								name : "kycCreditoPrendario.kycCreditoAnio",
								maxLength : 8,
								colspan:2
							},
							{xtype: "label", text: "Placa (Si el veh\u00edculo es usado)", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", text: "Valor del veh\u00edculo", cls: "x-form-item label_spacing", colspan:4},
							{
								xtype : "textfield",
								id:"kycCreditoPlaca",
								name : "kycCreditoPrendario.kycCreditoPlaca",
								maxLength : 20,
								colspan:2
							},{
								xtype : "numericfield",
								id:"kycCreditoValorGarantia",
								name : "kycCreditoPrendario.kycCreditoValorGarantia",
								maxLength : 100,
								allowDecimals: true,
								decimalPrecision: 2,
								colspan:2
							},{
					            xtype: 'radiogroup',
					            id: "ctgTipoMonedaCredito",
					            columns : 2,
					            items : config.ctgTipoMonedaCredito || [],
					            colspan: 2
					        },
					    	{xtype: "label",text: "Propietario actual (Si el veh\u00edculo es usado)", cls: "x-form-item label_spacing", width:400, colspan:4},
					    	{xtype: "label", text: "N\u00famero de identificaci\u00f3n", cls: "x-form-item label_spacing", colspan:2},
					    	{
								xtype : "textfield",
								id:"kycCreditoPropietarioActual",
								name : "kycCreditoPrendario.kycCreditoPropietarioActual",
								maxLength : 120,
								width:480,
								colspan:4
							},{
								xtype : "textfield",
								id:"kycCreditoCedulaPropietario",
								name : "kycCreditoPrendario.kycCreditoCedulaPropietario",
								maxLength : 9,
								minLength:9,
								vtype: "CedNac",
								colspan:2
							},
							{xtype: "label", text: "Inscribir a nombre de", cls: "x-form-item label_spacing", colspan:4},
					    	{xtype: "label", text: "N\u00famero de identificaci\u00f3n", cls: "x-form-item label_spacing", colspan:2},
					    	{
								xtype : "textfield",
								id:"kycCreditoNombreInscrito",
								name : "kycCreditoPrendario.kycCreditoNombreInscrito",
								maxLength : 120,
								width:480,
								colspan:4
							},{
								xtype : "textfield",
								id:"kycCreditoCedulaInscrito",
								name : "kycCreditoPrendario.kycCreditoCedulaInscrito",
								maxLength : 9,
								minLength:9,
								vtype: "CedNac",
								colspan:2
							},{
								xtype: "hidden",
								id: "kycCreditoPrendarioId",
								name: "kycCreditoPrendario.kycCreditoId"
							},{
								xtype: "hidden",
								id: "ctgTipoCreditoId",
								name: "kycCreditoPrendario.ctgTipoCredito.ctgCatalogoId"
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