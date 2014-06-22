KycProductoBeneficiarioCuentaFuturo = function(){
	var configWindow = {
		add: "kycProductoBeneficiarioCuentaFuturoAgregarTop",
		edit: "kycProductoBeneficiarioCuentaFuturoEditarTop",
		remove: "kycProductoBeneficiarioCuentaFuturoEliminarTop",
		grid: "kycProductoBeneficiarioCuentaFuturoGrid",
		save: "kycProductoBeneficiarioCuentaFuturoGuardarTop",
		form: "kycProductoBeneficiarioCuentaFuturoForm"
	};
	var configWindowBottom = {
			add: "kycProductoBeneficiarioCuentaFuturoAgregarBottom",
			edit: "kycProductoBeneficiarioCuentaFuturoEditarBottom",
			remove: "kycProductoBeneficiarioCuentaFuturoEliminarBottom",
			save: "kycProductoBeneficiarioCuentaFuturoGuardarBottom"
	};
	return {
		agregarProductoBeneficiarioCuentaFuturo: function(){
			var salarioSuma = parseInt(Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue());
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
			Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(salarioSuma);
			Ext.getCmp("kycProductoBeneficiarioCuentaEditar").setValue('0');
		},
		editarProductoBeneficiarioCuentaFuturo: function(){
			var salarioSuma = Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue();
			var salarioActual = Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue();
			var salarioTotal = salarioSuma - salarioActual;
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(salarioTotal);
		},
		eliminarProductoBeneficiarioCuentaFuturo: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				var suma = new Number(0);
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosBeneficiarios/delete",
					params: {
						kycProductoId: Efx.utils.getValue("kycProductoBeneficiarioCuentaFuturoId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoBeneficiarioCuentaFuturoForm");
								if(jsonObject.kycProductoBeneficiarioCuentaFuturo){
			    					Ext.getCmp("kycProductoBeneficiarioCuentaFuturoGrid").getStore().loadData(jsonObject.kycProductoBeneficiarioCuentaFuturo);
								};
								var length = parseInt(Ext.getCmp("kycProductoBeneficiarioCuentaFuturoGrid").store.data.items.length);
								for (var j = 0, lenExterno = length; j < lenExterno; j++) {
					    			suma =  parseInt(suma) +  parseInt(Ext.getCmp("kycProductoBeneficiarioCuentaFuturoGrid").store.getAt(j).get("kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioParticipacion"));
								};
								Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(suma);
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
		guardarProductoBeneficiarioCuentaFuturo: function(){
			var salarioSuma = Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue();
			var suma = new Number(0);
			Efx.message.progress("Guardando Informaci\u00F3n...");
			var validaTotalPorcentajeValidacionSegunda = parseInt(Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue());
			var validaTotalPorcentaje = parseInt(Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue()) + parseInt(Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue());
			if (isNaN(validaTotalPorcentajeValidacionSegunda)){
				validaTotalPorcentajeValidacionSegunda = 0;
			} else {
				validaTotalPorcentajeValidacionSegunda = Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue();
			}
			if (Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue() <= 100) {
				if (validaTotalPorcentaje<=100 || isNaN(validaTotalPorcentajeValidacionSegunda)){
			Ext.getCmp("kycProductoBeneficiarioCuentaFuturoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosBeneficiarios/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoBeneficiarioCuentaFuturo.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoBeneficiarioCuentaFuturo.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoBeneficiarioCuentaFuturo.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CUENTA_FUTURO,
    				 kycTipoProducto : Efx.constants.codes.CUENTA_FUTURO

    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(validaTotalPorcentaje);
    				Efx.form.setDisable("kycProductoBeneficiarioCuentaFuturoForm", true);
    				if(action.result.kycProductoBeneficiarioCuentaFuturo){
    					Ext.getCmp("kycProductoBeneficiarioCuentaFuturoGrid").getStore().loadData(action.result.kycProductoBeneficiarioCuentaFuturo);
    					Ext.getCmp("kycProductoBeneficiarioCuentaFuturoGrid").getSelectionModel().select(action.result.kycProductoBeneficiarioIndex);
    				};
    				var length = parseInt(Ext.getCmp("kycProductoBeneficiarioCuentaFuturoGrid").store.data.items.length);
					for (var j = 0, lenExterno = length; j < lenExterno; j++) {
			    			suma =  parseInt(suma) +  parseInt(Ext.getCmp("kycProductoBeneficiarioCuentaFuturoGrid").store.getAt(j).get("kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioParticipacion"));
		    		};
		    		Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(suma);
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
				title: "PRODUCTOS -  BENEFICIARIOS",
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
							   id: "kycProductoBeneficiarioCuentaFuturoAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoBeneficiarioCuentaFuturo.agregarProductoBeneficiarioCuentaFuturo
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoBeneficiarioCuentaFuturoEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoBeneficiarioCuentaFuturo.editarProductoBeneficiarioCuentaFuturo
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoBeneficiarioCuentaFuturoEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoBeneficiarioCuentaFuturo.eliminarProductoBeneficiarioCuentaFuturo
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoBeneficiarioCuentaFuturoGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoBeneficiarioCuentaFuturo.guardarProductoBeneficiarioCuentaFuturo
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
							   id: "kycProductoBeneficiarioCuentaFuturoAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoBeneficiarioCuentaFuturo.agregarProductoBeneficiarioCuentaFuturo
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoBeneficiarioCuentaFuturoEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoBeneficiarioCuentaFuturo.editarProductoBeneficiarioCuentaFuturo
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoBeneficiarioCuentaFuturoEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoBeneficiarioCuentaFuturo.eliminarProductoBeneficiarioCuentaFuturo
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoBeneficiarioCuentaFuturoGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoBeneficiarioCuentaFuturo.guardarProductoBeneficiarioCuentaFuturo
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoBeneficiarioCuentaFuturoGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoBeneficiarioCuentaFuturo || [],
					    	fields: [
								"kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioId",
								"kycProductoBeneficiarioNombre",
								"kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioCedula",
								"kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioParticipacion",
								"kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioNumeroCuenta",
								"kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioRelacionAsegurado",
								"kycProductoBeneficiarioCuentaFuturo.kycFechaActualizacion",
								"kycProductoBeneficiarioApellido"
			    	        ]
					    }),
					    columns: [
					              {text: "Nombre de Beneficiario", xtype: "templatecolumn", tpl: "{kycProductoBeneficiarioNombre} " + "{kycProductoBeneficiarioApellido}", flex: 1.8, minWidth: 200},
							      {header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioCedula",flex: 1, width: 100},
							      {header: "Porcentaje (%)",  dataIndex: "kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioParticipacion",flex: 1, width: 100}
							      ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductoBeneficiarioCuentaFuturoForm", record.data);
					    			Efx.form.setDisable("kycProductoBeneficiarioCuentaFuturoForm");
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		var suma = new Number(0);
					    		var length = config.kycProductoBeneficiarioCuentaFuturo.length;
					    		for (var j = 0, lenExterno = length; j < lenExterno; j++) {
					    			var i = 0;
						    		for (i = 1, len = 7; i < len; i++) {
						    			if (i == 3){
						    			suma =  parseInt(suma) +  parseInt(config.kycProductoBeneficiarioCuentaFuturo[j][3]);
						    			}
						    		};
					    		};
					    		Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(suma);
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    	}
					    }
					},{
			        	xtype: "form",
						id: "kycProductoBeneficiarioCuentaFuturoForm",
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
								text: "BENEFICIARIOS DE CUENTA FUTURO",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label", text: "Nombres", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Apellidos", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "N\u00famero de Identificaci\u00f3n", cls: "x-form-item label_spacing", colspan: 2},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioNombre",
								name : "kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioNombre",
								maxLength: 150,
								allowBlank: false
							},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioApellido",
								name : "kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioApellido",
								maxLength: 150,
								allowBlank: false
							},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioCedula",
								name : "kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioCedula",
								maxLength: 20,
								allowBlank: false,
								colspan:2
							},

							{xtype: "label", text: "Porcentaje (%)", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label",text: "N\u00famero de Cuenta", cls: "x-form-item label_spacing", colspan: 4},
							 {
								xtype : "numberfield",
								id:"kycProductoBeneficiarioParticipacion",
								name : "kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioParticipacion",
								maxLength: 3,
								maxValue: 100,
								minValue: 0,
								hideTrigger:true,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioNumeroCuenta",
								name : "kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioNumeroCuenta",
								maxLength : 17,
								minLength:17,
								colspan:4
							},
							{
								xtype: "hidden",
								id: "kycProductoBeneficiarioCuentaSuma"
							},
							{
								xtype: "hidden",
								id: "kycProductoBeneficiarioCuentaEditar"
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoBeneficiarioCuentaFuturoId",
								name: "kycProductoBeneficiarioCuentaFuturo.kycProductoBeneficiarioId"
							},{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoBeneficiarioCuentaFuturo.ctgTipoProducto.ctgCatalogoId"
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