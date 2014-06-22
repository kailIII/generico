KycPaqueteBeneficiarioCuentaAhorro = function(){
	var configWindow = {
		add: "kycPaqueteBeneficiarioCuentaAhorroAgregarTop",
		edit: "kycPaqueteBeneficiarioCuentaAhorroEditarTop",
		remove: "kycPaqueteBeneficiarioCuentaAhorroEliminarTop",
		grid: "kycPaqueteBeneficiarioCuentaAhorroGrid",
		save: "kycPaqueteBeneficiarioCuentaAhorroGuardarTop",
		form: "kycPaqueteBeneficiarioCuentaAhorroForm"
	};
	var configWindowBottom = {
			add: "kycPaqueteBeneficiarioCuentaAhorroAgregarBottom",
			edit: "kycPaqueteBeneficiarioCuentaAhorroEditarBottom",
			remove: "kycPaqueteBeneficiarioCuentaAhorroEliminarBottom",
			save: "kycPaqueteBeneficiarioCuentaAhorroGuardarBottom"
	};
	return {
		agregarPaqueteBeneficiarioCuentaAhorro: function(){
			var salarioSuma = Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").getValue();
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
			Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").setValue(salarioSuma);
			Ext.getCmp("kycPaqueteBeneficiarioCuentaEditar").setValue('0');
		},
		editarPaqueteBeneficiarioCuentaAhorro: function(){
			var salarioSuma = Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").getValue();
			var salarioActual = Ext.getCmp("kycPaqueteBeneficiarioParticipacion").getValue();
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycPaqueteBeneficiarioCuentaEditar").setValue(salarioActual);
		},
		eliminarPaqueteBeneficiarioCuentaAhorro: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycPaquetesBeneficiarios/delete",
					params: {
						kycPaqueteId: Efx.utils.getValue("kycPaqueteBeneficiarioCuentaAhorroId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_AHORRO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycPaqueteBeneficiarioCuentaAhorroForm");
								if(jsonObject.kycPaqueteBeneficiarioCuentaAhorro){
			    					Ext.getCmp("kycPaqueteBeneficiarioCuentaAhorroGrid").getStore().loadData(jsonObject.kycPaqueteBeneficiarioCuentaAhorro);
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
		guardarPaqueteBeneficiarioCuentaAhorro: function(){
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
			Ext.getCmp("kycPaqueteBeneficiarioCuentaAhorroForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycPaquetesBeneficiarios/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPaqueteBeneficiarioCuentaAhorro.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycPaqueteBeneficiarioCuentaAhorro.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycPaqueteBeneficiarioCuentaAhorro.ctgTipoPaquete.ctgCatalogoId" :Efx.constants.codes.PAQUETE_CUENTA_AHORRO,
    				 kycTipoPaquete : Efx.constants.codes.PAQUETE_CUENTA_AHORRO

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Ext.getCmp("kycPaqueteBeneficiarioCuentaSuma").setValue(validaTotalPorcentaje);
    				Efx.form.setDisable("kycPaqueteBeneficiarioCuentaAhorroForm", true);
    				if(action.result.kycPaqueteBeneficiarioCuentaAhorro){
    					Ext.getCmp("kycPaqueteBeneficiarioCuentaAhorroGrid").getStore().loadData(action.result.kycPaqueteBeneficiarioCuentaAhorro);
    					Ext.getCmp("kycPaqueteBeneficiarioCuentaAhorroGrid").getSelectionModel().select(action.result.kycPaqueteBeneficiarioCuentaCorrienteIndex);
    				}
    				var length = parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaAhorroGrid").store.data.items.length);
					for (var j = 0, lenExterno = length; j < lenExterno; j++) {
			    			suma =  parseInt(suma) +  parseInt(Ext.getCmp("kycPaqueteBeneficiarioCuentaAhorroGrid").store.getAt(j).get("kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioParticipacion"));
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
							   id: "kycPaqueteBeneficiarioCuentaAhorroAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycPaqueteBeneficiarioCuentaAhorro.agregarPaqueteBeneficiarioCuentaAhorro
						   },{
					    	   text: "Editar",
					    	   id: "kycPaqueteBeneficiarioCuentaAhorroEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycPaqueteBeneficiarioCuentaAhorro.editarPaqueteBeneficiarioCuentaAhorro
					       },{
					    	   text: "Eliminar",
					    	   id: "kycPaqueteBeneficiarioCuentaAhorroEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycPaqueteBeneficiarioCuentaAhorro.eliminarPaqueteBeneficiarioCuentaAhorro
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycPaqueteBeneficiarioCuentaAhorroGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycPaqueteBeneficiarioCuentaAhorro.guardarPaqueteBeneficiarioCuentaAhorro
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
							   id: "kycPaqueteBeneficiarioCuentaAhorroAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycPaqueteBeneficiarioCuentaAhorro.agregarPaqueteBeneficiarioCuentaAhorro
						   },{
					    	   text: "Editar",
					    	   id: "kycPaqueteBeneficiarioCuentaAhorroEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycPaqueteBeneficiarioCuentaAhorro.editarPaqueteBeneficiarioCuentaAhorro
					       },{
					    	   text: "Eliminar",
					    	   id: "kycPaqueteBeneficiarioCuentaAhorroEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycPaqueteBeneficiarioCuentaAhorro.eliminarPaqueteBeneficiarioCuentaAhorro
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycPaqueteBeneficiarioCuentaAhorroGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycPaqueteBeneficiarioCuentaAhorro.guardarPaqueteBeneficiarioCuentaAhorro
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycPaqueteBeneficiarioCuentaAhorroGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycPaqueteBeneficiarioCuentaAhorro || [],
					    	fields: [
								"kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioId",
								"kycPaqueteBeneficiarioNombre",
								"kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioCedula",
								"kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioParticipacion",
								"kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioNumeroCuenta",
								"kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioRelacionAsegurado",
								"kycPaqueteBeneficiarioCuentaAhorro.kycFechaActualizacion",
								"kycPaqueteBeneficiarioApellido"
			    	        ]
					    }),
					    columns: [
					              {text: "Nombre de Beneficiario", xtype: "templatecolumn", tpl: "{kycPaqueteBeneficiarioNombre} " + "{kycPaqueteBeneficiarioApellido}", flex: 1.8, minWidth: 200},
							      {header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioCedula",flex: 1, width: 100},
							      {header: "Porcentaje",  dataIndex: "kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioParticipacion",flex: 1, width: 100}
							      ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycPaqueteBeneficiarioCuentaAhorroForm", record.data);
					    			Efx.form.setDisable("kycPaqueteBeneficiarioCuentaAhorroForm");
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		var suma = new Number(0);
					    		var length = config.kycPaqueteBeneficiarioCuentaAhorro.length;
					    		for (var j = 0, lenExterno = length; j < lenExterno; j++) {
					    			var i = 0;
						    		for (i = 1, len = 7; i < len; i++) {
						    			if (i == 3){
						    			suma =  parseInt(suma) +  parseInt(config.kycPaqueteBeneficiarioCuentaAhorro[j][3]);
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
						id: "kycPaqueteBeneficiarioCuentaAhorroForm",
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
								text: "PAQUETE MULTIPRODUCTOS - BENEFICIARIOS DE CUENTA AHORRO",
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
								name : "kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioNombre",
								maxLength: 150,
								allowBlank: false
							},
							{
								xtype : "textfield",
								id:"kycPaqueteBeneficiarioApellido",
								name : "kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioApellido",
								maxLength: 150,
								allowBlank: false
							},
							{
								xtype : "textfield",
								id:"kycPaqueteBeneficiarioCedula",
								name : "kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioCedula",
								maxLength: 20,
								allowBlank: false,
								colspan:2
							},

							{xtype: "label", text: "Porcentaje (%)", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label",text: "N\u00famero de Cuenta", cls: "x-form-item label_spacing", colspan: 4},
							 {
								xtype : "textfield",
								id:"kycPaqueteBeneficiarioParticipacion",
								name : "kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioParticipacion",
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
								name : "kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioNumeroCuenta",
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
								id: "kycPaqueteBeneficiarioCuentaAhorroId",
								name: "kycPaqueteBeneficiarioCuentaAhorro.kycPaqueteBeneficiarioId"
							},{
								xtype: "hidden",
								id: "ctgTipoPaqueteId",
								name: "kycPaqueteBeneficiarioCuentaAhorro.ctgTipoPaquete.ctgCatalogoId"
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