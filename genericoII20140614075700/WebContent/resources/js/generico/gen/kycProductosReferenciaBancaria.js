KycProductosReferenciaBancaria = function(){
	var configWindow = {
		add: "kycProductosReferenciaBancariaAgregarTop",
		edit: "kycProductosReferenciaBancariaEditarTop",
		save: "kycProductosReferenciaBancariaGuardarTop",
		remove: "kycProductosReferenciaBancariaEliminarTop",
		grid: "kycProductosReferenciaBancariaGrid",
		form: "kycProductosReferenciaBancariaForm"
	};
	var configWindowBottom = {
			add: "kycProductosReferenciaBancariaAgregarBottom",
			edit: "kycProductosReferenciaBancariaEditarBottom",
			save: "kycProductosReferenciaBancariaGuardarBottom",
			remove: "kycProductosReferenciaBancariaEliminarBottom"
	};
	return {
		agregarProductosReferenciaBancaria: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductosReferenciaBancaria: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductosReferenciaBancaria: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/delete",
					params: {
						kycReferenciaId: Efx.utils.getValue("kycProductosReferenciaBancariaId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoReferencia : Efx.constants.codes.PRODUCTOS_REFERENCIA_BANCARIA
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductosReferenciaBancariaForm");
								if(jsonObject.kycReferenciaBancaria){
			    					Ext.getCmp("kycProductosReferenciaBancariaGrid").getStore().loadData(jsonObject.kycProductosReferenciaBancaria);
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
		guardarProductosReferenciaBancaria: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductosReferenciaBancariaForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductosReferenciaBancaria.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaBancaria.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaBancaria.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductosReferenciaBancaria.ctgTipoReferencia.ctgCatalogoId" :Efx.constants.codes.PRODUCTOS_REFERENCIA_BANCARIA,
    				 kycTipoReferencia : Efx.constants.codes.PRODUCTOS_REFERENCIA_BANCARIA

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductosReferenciaBancariaForm", true);
    				if(action.result.kycProductosReferenciaBancaria){
    					Ext.getCmp("kycProductosReferenciaBancariaGrid").getStore().loadData(action.result.kycProductosReferenciaBancaria);
    					Ext.getCmp("kycProductosReferenciaBancariaGrid").getSelectionModel().select(action.result.kycProductosReferenciaBancariaIndex);
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
				title: "SECCI\u00d3N DE PRODUCTOS - REFERENCIAS",
				autoScroll: true,
				xtype: "panel",
				layout: {
				    type: "vbox",
				    align : "center",
				    pack  : "start"
				},
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
							   id: "kycProductosReferenciaBancariaAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaBancaria.agregarProductosReferenciaBancaria
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaBancariaEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaBancaria.editarProductosReferenciaBancaria
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaBancariaGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaBancaria.guardarProductosReferenciaBancaria
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaBancariaEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaBancaria.eliminarProductosReferenciaBancaria
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
							   id: "kycProductosReferenciaBancariaAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaBancaria.agregarProductosReferenciaBancaria
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaBancariaEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaBancaria.editarProductosReferenciaBancaria
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaBancariaGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaBancaria.guardarProductosReferenciaBancaria
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaBancariaEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaBancaria.eliminarProductosReferenciaBancaria
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductosReferenciaBancariaGrid",
						height: 150,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductosReferenciaBancaria || [],
					    	fields: [
					    	         "kycProductosReferenciaBancaria.kycReferenciaId",
					    	         "kycProductosReferenciaBancaria.kycReferenciaNombre1",
					    	         "kycProductosReferenciaBancaria.kycReferenciaNombre2",
					    	         "kycProductosReferenciaBancaria.kycReferenciaTelefono1",
					    	         "kycProductosReferenciaBancaria.kycReferenciaTelefono2",
					    	         "kycProductosReferenciaBancaria.kycReferenciaCuenta",
					    	         "kycProductosReferenciaBancaria.kycReferenciaBancaria",
					    	         "kycProductosReferenciaBancaria.kycFechaActualizacion",
					    	         "kycProductosReferenciaBancaria.kycReferenciaTelefono3",
					    	         "kycProductosReferenciaBancaria.kycReferenciaParentesco",
					    	         "kycProductosReferenciaBancaria.kycReferenciaLugarTrabajo",
					    	         "kycProductosReferenciaBancaria.kycReferenciaDireccion",
					    	         "kycProductosReferenciaBancaria.kycReferenciaPeriodoRevision",
					    	         "kycProductosReferenciaBancaria.kycReferenciaDebitosPromedio",
					    	         "kycProductosReferenciaBancaria.kycReferenciaSaldoPromedio",
					    	         "kycProductosReferenciaBancaria.kycReferenciaPrincipalesClientes",
					    	         "kycProductosReferenciaBancaria.kycReferenciaContacto",
					    	         "kycProductosReferenciaBancaria.kycReferenciaPuesto",
					    	         "kycProductosReferenciaBancaria.kycReferenciaCreditos",
					    	         "ctgTipoOperacion.ctgCatalogoId",
					    	         "ctgTipoMoneda.ctgCatalogoId"
			    	        ]
					    }),
					    columns: [
					              {header: "Emisor",  dataIndex: "kycProductosReferenciaBancaria.kycReferenciaNombre1",  flex:2, width: 120},
							      {header: "Per\u00edodo de revisi\u00f3n",  dataIndex: "kycProductosReferenciaBancaria.kycReferenciaPeriodoRevision",flex:2, width: 120},
							      {header: "Saldo promedio",  dataIndex: "kycProductosReferenciaBancaria.kycReferenciaSaldoPromedio", flex: 1, width: 120
							      }

					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductosReferenciaBancariaForm", record.data);
					    			Efx.form.setDisable("kycProductosReferenciaBancariaForm");
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
						id: "kycProductosReferenciaBancariaForm",
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
								text: "REFERENCIAS BANCARIAS (DE PASIVOS)",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "* Incluye cuentas de ahorro, corrientes, inversiones a plazo.", width: 700, cls: "x-form-item label_spacing", colspan :6},
							{xtype: "label", text: "Emisor", cls: "x-form-item label_spacing", colspan :4},
							{xtype: "label", text: "Tipo de operaci\u00f3n", cls: "x-form-item label_spacing" ,colspan :2},
							{
								xtype: "textfield",
								id:"kycReferenciaNombre1",
								name: "kycProductosReferenciaBancaria.kycReferenciaNombre1",
								maxLength: 50,
								allowBlank: false,
								width: 480,
								colspan:4
							},{
								xtype: "combo",
								id: "ctgTipoOperacion.ctgCatalogoId",
								name: "kycProductosReferenciaBancaria.ctgTipoOperacion.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoOperacion || [],
									fields: ["ctgTipoOperacionId", "ctgTipoOperacionNombre"]
								}),
								displayField: "ctgTipoOperacionNombre",
								valueField: "ctgTipoOperacionId",
								allowBlank: false,
								colspan: 2
							},
							{xtype: "label", text: "Moneda", cls: "x-form-item label_spacing", colspan :2},
							{xtype: "label", text: "Per\u00edodo de revisi\u00f3n ", cls: "x-form-item label_spacing" ,colspan :4},
							{
								xtype: "combo",
								id: "ctgTipoMoneda.ctgCatalogoId",
								name: "kycProductosReferenciaBancaria.ctgTipoMoneda.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoMoneda || [],
									fields: ["ctgTipoMonedaId", "ctgTipoMonedaNombre"]
								}),
								displayField: "ctgTipoMonedaNombre",
								valueField: "ctgTipoMonedaId",
								allowBlank: false,
									colspan: 2
							},{
								xtype: "textfield",
								id:"kycReferenciaPeriodoRevision",
								name: "kycProductosReferenciaBancaria.kycReferenciaPeriodoRevision",
								maxLength: 50,
								width:480,
								colspan:4
							},
							{xtype: "label", text: "D\u00e9bitos promedio", cls: "x-form-item label_spacing", colspan :2},
							{xtype: "label", text: "Cr\u00e9ditos", cls: "x-form-item label_spacing" ,colspan :2},
							{xtype: "label", text: "Saldo promedio", cls: "x-form-item label_spacing" ,colspan :2},
							{
								xtype: "numericfield",
								id:"kycReferenciaDebitosPromedio",
								name: "kycProductosReferenciaBancaria.kycReferenciaDebitosPromedio",
								maxLength: 50,
								allowDecimals: true,
								decimalPrecision: 2,
								allowBlank: false
							},
							{
								xtype: "numericfield",
								id: "kycReferenciaCreditos",
								name: "kycProductosReferenciaBancaria.kycReferenciaCreditos",
								maxLength: 50,
								allowDecimals: true,
								decimalPrecision: 2,
								allowBlank: false,
							},
							{
								xtype: "numericfield",
								id: "kycReferenciaSaldoPromedio",
								name: "kycProductosReferenciaBancaria.kycReferenciaSaldoPromedio",
								maxLength: 50,
								allowDecimals: true,
								decimalPrecision: 2,
								allowBlank: false,
							},
							{
								xtype: "hidden",
								id: "kycProductosReferenciaBancariaId",
								name: "kycProductosReferenciaBancaria.kycReferenciaId"
							},{
								xtype: "hidden",
								id: "ctgTipoReferenciaId",
								name: "kycProductosReferenciaBancaria.ctgTipoReferencia.ctgCatalogoId"
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