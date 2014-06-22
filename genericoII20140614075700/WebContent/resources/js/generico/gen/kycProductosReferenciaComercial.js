KycProductosReferenciaComercial = function(){
	var configWindow = {
		add: "kycProductosReferenciaComercialAgregarTop",
		edit: "kycProductosReferenciaComercialEditarTop",
		save: "kycProductosReferenciaComercialGuardarTop",
		remove: "kycProductosReferenciaComercialEliminarTop",
		grid: "kycProductosReferenciaComercialGrid",
		form: "kycProductosReferenciaComercialForm"
	};
	var configWindowBottom = {
			add: "kycProductosReferenciaComercialAgregarBottom",
			edit: "kycProductosReferenciaComercialEditarBottom",
			save: "kycProductosReferenciaComercialGuardarBottom",
			remove: "kycProductosReferenciaComercialEliminarBottom"
	};
	return {
		agregarProductosReferenciaComercial: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarProductosReferenciaComercial: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarProductosReferenciaComercial: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/delete",
					params: {
						kycReferenciaId: Efx.utils.getValue("kycProductosReferenciaComercialId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoReferencia :  Efx.utils.getValue("ctgTipoReferencia.ctgCatalogoId")
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductosReferenciaComercialForm");
								if(jsonObject.kycProductosReferenciaComercial){
			    					Ext.getCmp("kycProductosReferenciaComercialGrid").getStore().loadData(jsonObject.kycProductosReferenciaComercial);
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
		guardarProductosReferenciaComercial: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycProductosReferenciaComercialForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosReferencias/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductosReferenciaComercial.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaComercial.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductosReferenciaComercial.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductosReferenciaComercial.ctgTipoReferencia.ctgCatalogoId" :Efx.constants.codes.PRODUCTOS_REFERENCIA_CREDITOS,
    				 kycTipoReferencia : Efx.constants.codes.PRODUCTOS_REFERENCIA_CREDITOS,

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycProductosReferenciaComercialForm", true);
    				if(action.result.kycProductosReferenciaComercial){
    					Ext.getCmp("kycProductosReferenciaComercialGrid").getStore().loadData(action.result.kycProductosReferenciaComercial);
    					Ext.getCmp("kycProductosReferenciaComercialGrid").getSelectionModel().select(action.result.kycReferenciaIndex);
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
				title: "CR\u00c9DITO PERSONAL - REFERENCIAS",
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
							   id: "kycProductosReferenciaComercialAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaComercial.agregarProductosReferenciaComercial
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaComercialEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaComercial.editarProductosReferenciaComercial
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaComercialGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaComercial.guardarProductosReferenciaComercial
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaComercialEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaComercial.eliminarProductosReferenciaComercial
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
							   id: "kycProductosReferenciaComercialAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductosReferenciaComercial.agregarProductosReferenciaComercial
						   },{
					    	   text: "Editar",
					    	   id: "kycProductosReferenciaComercialEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductosReferenciaComercial.editarProductosReferenciaComercial
					       },{
					    	   text: "Guardar",
					    	   id: "kycProductosReferenciaComercialGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductosReferenciaComercial.guardarProductosReferenciaComercial
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductosReferenciaComercialEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductosReferenciaComercial.eliminarProductosReferenciaComercial
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductosReferenciaComercialGrid",
						height: 150,
						collapsible: true,
						width: 700,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductosReferenciaComercial || [],
					    	fields: [
								"kycProductosReferenciaComercial.kycReferenciaId",
								"kycProductosReferenciaComercial.kycReferenciaNombre1",
								"kycProductosReferenciaComercial.kycReferenciaTipo",
								"kycProductosReferenciaComercial.kycReferenciaTelefono1",
								"kycProductosReferenciaComercial.kycReferenciaTelefono2",
								"kycProductosReferenciaComercial.kycReferenciaCuenta",
								"kycProductosReferenciaComercial.kycReferenciaBancaria",
								"kycProductosReferenciaComercial.kyc.kycFechaActualizacion",
								"kycProductosReferenciaComercial.kycReferenciaTelefono3",
								"kycProductosReferenciaComercial.kycReferenciaParentesco",
								"kycProductosReferenciaComercial.kycReferenciaLugarTrabajo",
								"kycProductosReferenciaComercial.kycReferenciaDireccion",
								"kycProductosReferenciaComercial.kycReferenciaPeriodoRevision",
								"kycProductosReferenciaComercial.kycReferenciaDebitosPromedio",
								"kycProductosReferenciaComercial.kycReferenciaSaldoPromedio",
								"kycProductosReferenciaComercial.kycReferenciaPrincipalesClientes",
								"kycProductosReferenciaComercial.kycReferenciaContacto",
								"kycProductosReferenciaComercial.kycReferenciaSaldo",
								"kycProductosReferenciaComercial.kycReferenciaCreditos",
								"kycProductosReferenciaComercial.kycReferenciaDocumento",
								"kycProductosReferenciaComercial.ctgTipoOperacion.ctgCatalogoId",
								"kycProductosReferenciaComercial.ctgTipoMoneda.ctgCatalogoId",
								"kycProductosReferenciaComercial.ctgTipoDocumento.ctgCatalogoId",
								"kycProductosReferenciaComercial.ctgTipoReferencia.ctgCatalogoId"
									]
					    }),
					    columns: [
					          	{header: "Tipo de Referencia ",  dataIndex: "kycProductosReferenciaComercial.kycReferenciaTipo",flex:2, width: 120},
								{header: "Banco ",  dataIndex: "kycProductosReferenciaComercial.kycReferenciaBancaria", flex: 2, width: 120},
								{header: "N\u00famero de Cuenta",  dataIndex: "kycProductosReferenciaComercial.kycReferenciaCuenta",flex:1, width: 120},
								{header: "Saldo",  dataIndex: "kycProductosReferenciaComercial.kycReferenciaSaldo",flex: 1, width: 120}
								],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductosReferenciaComercialForm", record.data);
					    			Efx.form.setDisable("kycProductosReferenciaComercialForm");
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
						id: "kycProductosReferenciaComercialForm",
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
								text: "REFERENCIAS DE CR\u00C9DITO",
								cls: "x-form-item label_header",
								colspan: 8,
								width: 730
							},
							{xtype: "label", text: "Tipo de Referencia", cls: "x-form-item label_spacing" ,colspan :4},
							{xtype: "label", text: "N\u00famero de Cuenta", cls: "x-form-item label_spacing" ,colspan :2},
							{
								xtype: "textfield",
								id: "kycReferenciaTipo",
								name: "kycProductosReferenciaComercial.kycReferenciaTipo",
								maxLength: 50,
								allowBlank: false,
								maxValue: "100",
								width: 480,
								colspan:4
							},
							{
								xtype: "textfield",
								id: "kycReferenciaCuenta",
								name: "kycProductosReferenciaComercial.kycReferenciaCuenta",
								maxLength: 20,
								colspan:2
							},
							{xtype: "label", text: "Banco", cls: "x-form-item label_spacing" ,colspan :4},
							{xtype: "label", text: "Saldo", cls: "x-form-item label_spacing" ,colspan :2},
							{
								xtype: "textfield",
								id:"kycReferenciaBancaria",
								name: "kycProductosReferenciaComercial.kycReferenciaBancaria",
								maxLength: 50,
								allowBlank: false,
								width: 480,
								colspan:4
							},
							{
								xtype: "numericfield",
								id: "kycReferenciaSaldo",
								name: "kycProductosReferenciaComercial.kycReferenciaSaldo",
								maxLength:100,
								allowBlank: false,
								colspan:2
							},
							{
								xtype: "hidden",
								id: "kycProductosReferenciaComercialId",
								name: "kycProductosReferenciaComercial.kycReferenciaId"
							},{
								xtype: "hidden",
								id: "ctgTipoReferencia.ctgCatalogoId",
								name: "kycProductosReferenciaComercial.ctgTipoReferencia.ctgCatalogoId"
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