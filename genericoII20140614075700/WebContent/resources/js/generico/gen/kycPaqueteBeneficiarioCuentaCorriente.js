KycPaqueteBeneficiarioCuentaCorriente = function(){
	var configWindow = {
		add: "kycPaqueteBeneficiarioCuentaCorrienteAgregarTop",
		edit: "kycPaqueteBeneficiarioCuentaCorrienteEditarTop",
		remove: "kycPaqueteBeneficiarioCuentaCorrienteEliminarTop",
		grid: "kycPaqueteBeneficiarioCuentaCorrienteGrid",
		save: "kycPaqueteBeneficiarioCuentaCorrienteGuardarTop",
		form: "kycPaqueteBeneficiarioCuentaCorrienteForm"
	};
	var configWindowBottom = {
			add: "kycPaqueteBeneficiarioCuentaCorrienteAgregarBottom",
			edit: "kycPaqueteBeneficiarioCuentaCorrienteEditarBottom",
			remove: "kycPaqueteBeneficiarioCuentaCorrienteEliminarBottom",
			save: "kycPaqueteBeneficiarioCuentaCorrienteGuardarBottom"
	};
	return {
		agregarPaqueteBeneficiarioCuentaCorriente: function(){
			var salarioSuma = Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").getValue();
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
			Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").setValue(salarioSuma);
			Ext.getCmp("kycPaqueteBeneficiarioCuentaEditar").setValue('0');
		},
		editarPaqueteBeneficiarioCuentaCorriente: function(){
			var salarioSuma = Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").getValue();
			var salarioActual = Ext.getCmp("kycPaqueteBeneficiarioParticipacion").getValue();
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycPaqueteBeneficiarioCuentaEditar").setValue(salarioActual);
		},
		eliminarPaqueteBeneficiarioCuentaCorriente: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycPaquetesBeneficiarios/delete",
					params: {
						kycPaqueteId: Efx.utils.getValue("kycPaqueteBeneficiarioCuentaCorrienteId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycPaqueteBeneficiarioCuentaCorrienteForm");
								if(jsonObject.kycPaqueteBeneficiarioCuentaCorriente){
			    					Ext.getCmp("kycPaqueteBeneficiarioCuentaCorrienteGrid").getStore().loadData(jsonObject.kycPaqueteBeneficiarioCuentaCorriente);
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
		guardarPaqueteBeneficiarioCuentaCorriente: function(){
			if (isNaN(parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaEditar").getValue()))){
				Ext.getCmp("kycPaqueteBeneficiarioCuentaEditar").setValue("0");
			}
			var salarioSuma = Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").getValue() - parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaEditar").getValue());
			var suma = new Number(0);
			Efx.message.progress("Guardando Informaci\u00F3n...");
			var validaTotalPorcentajeValidacionSegunda = parseInt(Ext.getCmp("kycPaqueteBeneficiarioParticipacion").getValue());
			var validaTotalPorcentaje = parseInt(Ext.getCmp("kycPaqueteBeneficiarioParticipacion").getValue()) + parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").getValue()) - parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaEditar").getValue());
			if (isNaN(validaTotalPorcentajeValidacionSegunda)){
				validaTotalPorcentajeValidacionSegunda = 0;
			} else {
				validaTotalPorcentajeValidacionSegunda = Ext.getCmp("kycPaqueteBeneficiarioParticipacion").getValue();
			}
			if (isNaN(validaTotalPorcentaje)){
				validaTotalPorcentaje=0;
			} else{
				parseInt(Ext.getCmp("kycPaqueteBeneficiarioParticipacion").getValue()) + parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").getValue()) - parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaEditar").getValue());
			}
			if (Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").getValue() <= 100) {
			if (validaTotalPorcentaje<=100 || isNaN(validaTotalPorcentajeValidacionSegunda)){
			Ext.getCmp("kycPaqueteBeneficiarioCuentaCorrienteForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycPaquetesBeneficiarios/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPaqueteBeneficiarioCuentaCorriente.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycPaqueteBeneficiarioCuentaCorriente.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycPaqueteBeneficiarioCuentaCorriente.ctgTipoPaquete.ctgCatalogoId" :Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE,
    				 kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").setValue(validaTotalPorcentaje);
    				Efx.form.setDisable("kycPaqueteBeneficiarioCuentaCorrienteForm", true);
    				if(action.result.kycPaqueteBeneficiarioCuentaCorriente){
    					Ext.getCmp("kycPaqueteBeneficiarioCuentaCorrienteGrid").getStore().loadData(action.result.kycPaqueteBeneficiarioCuentaCorriente);
    					Ext.getCmp("kycPaqueteBeneficiarioCuentaCorrienteGrid").getSelectionModel().select(action.result.kycPaqueteBeneficiarioCuentaCorrienteIndex);
    				}
    				var length = parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaCorrienteGrid").store.data.items.length);
					for (var j = 0, lenExterno = length; j < lenExterno; j++) {
			    			suma =  parseInt(suma) +  parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaCorrienteGrid").store.getAt(j).get("kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioParticipacion"));
		    		};
		    		Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").setValue(suma);
    			},
    			failure: Efx.form.failureProcedure
   			});
			} else{Efx.message.alert("El porcentaje no puede estar vacio o ser mayor que 100");};
		} else {
			Efx.message.alert("El porcentaje no puede estar vacio o ser mayor que 100");
		};
		},
		init: function(config){
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				flex: 1,
				title: "PAQUETES -  BENEFICIARIOS",
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
							   id: "kycPaqueteBeneficiarioCuentaCorrienteAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycPaqueteBeneficiarioCuentaCorriente.agregarPaqueteBeneficiarioCuentaCorriente
						   },{
					    	   text: "Editar",
					    	   id: "kycPaqueteBeneficiarioCuentaCorrienteEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycPaqueteBeneficiarioCuentaCorriente.editarPaqueteBeneficiarioCuentaCorriente
					       },{
					    	   text: "Eliminar",
					    	   id: "kycPaqueteBeneficiarioCuentaCorrienteEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycPaqueteBeneficiarioCuentaCorriente.eliminarPaqueteBeneficiarioCuentaCorriente
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycPaqueteBeneficiarioCuentaCorrienteGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycPaqueteBeneficiarioCuentaCorriente.guardarPaqueteBeneficiarioCuentaCorriente
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
							   id: "kycPaqueteBeneficiarioCuentaCorrienteAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycPaqueteBeneficiarioCuentaCorriente.agregarPaqueteBeneficiarioCuentaCorriente
						   },{
					    	   text: "Editar",
					    	   id: "kycPaqueteBeneficiarioCuentaCorrienteEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycPaqueteBeneficiarioCuentaCorriente.editarPaqueteBeneficiarioCuentaCorriente
					       },{
					    	   text: "Eliminar",
					    	   id: "kycPaqueteBeneficiarioCuentaCorrienteEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycPaqueteBeneficiarioCuentaCorriente.eliminarPaqueteBeneficiarioCuentaCorriente
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycPaqueteBeneficiarioCuentaCorrienteGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycPaqueteBeneficiarioCuentaCorriente.guardarPaqueteBeneficiarioCuentaCorriente
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycPaqueteBeneficiarioCuentaCorrienteGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycPaqueteBeneficiarioCuentaCorriente || [],
					    	fields: [
								"kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioId",
								"kycPaqueteBeneficiarioNombre",
								"kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioCedula",
								"kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioParticipacion",
								"kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioNumeroCuenta",
								"kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioRelacionAsegurado",
								"kycPaqueteBeneficiarioCuentaCorriente.kycFechaActualizacion",
								"kycPaqueteBeneficarioApellido"
			    	        ]
					    }),
					    columns: [
					              {text: "Nombre de Beneficiario", xtype: "templatecolumn", tpl: "{kycPaqueteBeneficiarioNombre} " + "{kycPaqueteBeneficiarioApellido}", flex: 1.8, minWidth: 200},
							      {header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioCedula",flex: 1, width: 100},
							      {header: "Porcentaje",  dataIndex: "kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioParticipacion",flex: 1, width: 100}
							      ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycPaqueteBeneficiarioCuentaCorrienteForm", record.data);
					    			Efx.form.setDisable("kycPaqueteBeneficiarioCuentaCorrienteForm");
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		var suma = new Number(0);
					    		var length = config.kycPaqueteBeneficiarioCuentaCorriente.length;
					    		for (var j = 0, lenExterno = length; j < lenExterno; j++) {
					    			var i = 0;
						    		for (i = 1, len = 7; i < len; i++) {
						    			if (i == 3){
						    			suma =  parseInt(suma) +  parseInt(config.kycPaqueteBeneficiarioCuentaCorriente[j][3]);
						    			}
						    		};
					    		};
					    		Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").setValue(suma);
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    	}
					    }
					},{
			        	xtype: "form",
						id: "kycPaqueteBeneficiarioCuentaCorrienteForm",
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
								text: "PAQUETE MULTIPRODUCTOS - BENEFICIARIOS DE CUENTA CORRIENTE",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label", text: "Nombres", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Apellidos", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de Identificaci\u00f3n", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype : "textfield",
								id:"kycPaqueteBeneficiarioNombre",
								name : "kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioNombre",
								maxLength: 150,
								allowBlank: false
							},
							{
								xtype : "textfield",
								id:"kycPaqueteBeneficiarioApellido",
								name : "kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioApellido",
								maxLength: 150,
								allowBlank: false
							},
							{
								xtype : "textfield",
								id:"kycPaqueteBeneficiarioCedula",
								name : "kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioCedula",
								maxLength: 20,
								allowBlank: false,
								colspan:2
							},

							{xtype: "label", text: "Porcentaje (%)", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label",text: "N\u00famero de Cuenta", cls: "x-form-item label_spacing", colspan: 4},
							 {
								xtype : "textfield",
								id:"kycPaqueteBeneficiarioParticipacion",
								name : "kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioParticipacion",
								maxLength: 3,
								allowBlank: false,
								maxValue: 100,
								minValue: 0,
								hideTrigger:true,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycPaqueteBeneficiarioNumeroCuenta",
								name : "kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioNumeroCuenta",
								maxLength : 17,
								minLength:17,
								colspan:4
							},
							{
								xtype: "hidden",
								id: "kycPaqueteBeneficiarioCuentaSuma"
							},{
								xtype: "hidden",
								id: "kycPaqueteBeneficiarioCuentaEditar"
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycPaqueteBeneficiarioCuentaCorrienteId",
								name: "kycPaqueteBeneficiarioCuentaCorriente.kycPaqueteBeneficiarioId"
							},{
								xtype: "hidden",
								id: "ctgTipoPaqueteId",
								name: "kycPaqueteBeneficiarioCuentaCorriente.ctgTipoPaquete.ctgCatalogoId"
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