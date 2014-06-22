KycProductoBeneficiarioCreditoPersonal = function(){
	var configWindow = {
		add: "kycProductoBeneficiarioCreditoPersonalAgregarTop",
		edit: "kycProductoBeneficiarioCreditoPersonalEditarTop",
		remove: "kycProductoBeneficiarioCreditoPersonalEliminarTop",
		grid: "kycProductoBeneficiarioCreditoPersonalGrid",
		save: "kycProductoBeneficiarioCreditoPersonalGuardarTop",
		form: "kycProductoBeneficiarioCreditoPersonalForm"
	};
	var configWindowBottom = {
			add: "kycProductoBeneficiarioCreditoPersonalAgregarBottom",
			edit: "kycProductoBeneficiarioCreditoPersonalEditarBottom",
			remove: "kycProductoBeneficiarioCreditoPersonalEliminarBottom",
			save: "kycProductoBeneficiarioCreditoPersonalGuardarBottom"
	};
	return {
		agregarProductoBeneficiarioCreditoPersonal: function(){
			var salarioSuma = Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue();
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
			Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(salarioSuma);
		},
		editarProductoBeneficiarioCreditoPersonal: function(){
			var salarioSuma = Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue();
			var salarioActual = Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue();
			var salarioTotal = salarioSuma - salarioActual;
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
			Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(salarioTotal);
		},
		eliminarProductoBeneficiarioCreditoPersonal: function(){
			Efx.message.confirmDelete(function(){
				var suma = new Number(0);
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycProductosBeneficiarios/delete",
					params: {
						kycProductoId: Efx.utils.getValue("kycProductoBeneficiarioCreditoPersonalId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoProducto : Efx.constants.codes.CREDITO_PERSONAL
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycProductoBeneficiarioCreditoPersonalForm");
								if(jsonObject.kycProductoBeneficiarioCreditoPersonal){
			    					Ext.getCmp("kycProductoBeneficiarioCreditoPersonalGrid").getStore().loadData(jsonObject.kycProductoBeneficiarioCreditoPersonal);
								}
								var length = parseInt(Ext.getCmp("kycProductoBeneficiarioCreditoPersonalGrid").store.data.items.length);
								for (var j = 0, lenExterno = length; j < lenExterno; j++) {
					    			suma =  parseInt(suma) +  parseInt(Ext.getCmp("kycProductoBeneficiarioCreditoPersonalGrid").store.getAt(j).get("kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioParticipacion"));
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
		guardarProductoBeneficiarioCreditoPersonal: function(){
    		if(Ext.getCmp("kycProductoBeneficiarioCreditoPersonalGrid").store.data.items.length <= 0) {
    				Ext.getCmp("gridRecord").setValue('1');
    			} else{
    				Ext.getCmp("gridRecord").setValue('0');
    			}
//			var salarioSuma = Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue();
			var suma = new Number(0);
			Efx.message.progress("Guardando Informaci\u00F3n...");
			var validaTotalPorcentajeValidacionSegunda = parseInt(Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue());
			var validaTotalPorcentaje = parseInt(Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue()) + parseInt(Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue());
			if (isNaN(validaTotalPorcentajeValidacionSegunda)){
				validaTotalPorcentajeValidacionSegunda = 0;
			} else {
				validaTotalPorcentajeValidacionSegunda = Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue();
			}
			if (Ext.getCmp("kycProductoBeneficiarioCuentaSuma").getValue() <= 100 || Ext.getCmp("gridRecord").getValue()=='1') {
			if (Ext.getCmp("gridRecord").getValue()=='1' &&
				Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue() !=null ||
				validaTotalPorcentaje<=100 &&
				Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue() !=null ||
				isNaN(validaTotalPorcentajeValidacionSegunda ) &&
				Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue() !=null ||
				validaTotalPorcentajeValidacionSegunda =='1' &&
				Ext.getCmp("kycProductoBeneficiarioParticipacion").getValue() !=null)
				{
				Ext.getCmp("kycProductoBeneficiarioCreditoPersonalForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycProductosBeneficiarios/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycProductoBeneficiarioCreditoPersonal.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycProductoBeneficiarioCreditoPersonal.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycProductoBeneficiarioCreditoPersonal.ctgTipoProducto.ctgCatalogoId" :Efx.constants.codes.CREDITO_PERSONAL,
    				 kycTipoProducto : Efx.constants.codes.CREDITO_PERSONAL
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(validaTotalPorcentaje);
    				Efx.form.setDisable("kycProductoBeneficiarioCreditoPersonalForm", true);
    				if(action.result.kycProductoBeneficiarioCreditoPersonal){
    					Ext.getCmp("kycProductoBeneficiarioCreditoPersonalGrid").getStore().loadData(action.result.kycProductoBeneficiarioCreditoPersonal);
    					Ext.getCmp("kycProductoBeneficiarioCreditoPersonalGrid").getSelectionModel().select(action.result.kycProductoBeneficiarioIndex);
    				};
    				var length = parseInt(Ext.getCmp("kycProductoBeneficiarioCreditoPersonalGrid").store.data.items.length);
					for (var j = 0, lenExterno = length; j < lenExterno; j++) {
			    			suma =  parseInt(suma) +  parseInt(Ext.getCmp("kycProductoBeneficiarioCreditoPersonalGrid").store.getAt(j).get("kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioParticipacion"));
		    		};
		    		Ext.getCmp("kycProductoBeneficiarioCuentaSuma").setValue(suma);
    			},
    			failure: Efx.form.failureProcedure
   			});
	   		} else{
	   			Efx.message.alert("El porcentaje no puede estar vacio o ser mayor que 100");
	   		};
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
				title: "CR\u00c9DITO PERSONAL - BENEFICIARIOS",
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
							   id: "kycProductoBeneficiarioCreditoPersonalAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoBeneficiarioCreditoPersonal.agregarProductoBeneficiarioCreditoPersonal
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoBeneficiarioCreditoPersonalEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoBeneficiarioCreditoPersonal.editarProductoBeneficiarioCreditoPersonal
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoBeneficiarioCreditoPersonalEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoBeneficiarioCreditoPersonal.eliminarProductoBeneficiarioCreditoPersonal
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoBeneficiarioCreditoPersonalGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoBeneficiarioCreditoPersonal.guardarProductoBeneficiarioCreditoPersonal
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
							   id: "kycProductoBeneficiarioCreditoPersonalAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycProductoBeneficiarioCreditoPersonal.agregarProductoBeneficiarioCreditoPersonal
						   },{
					    	   text: "Editar",
					    	   id: "kycProductoBeneficiarioCreditoPersonalEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycProductoBeneficiarioCreditoPersonal.editarProductoBeneficiarioCreditoPersonal
					       },{
					    	   text: "Eliminar",
					    	   id: "kycProductoBeneficiarioCreditoPersonalEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycProductoBeneficiarioCreditoPersonal.eliminarProductoBeneficiarioCreditoPersonal
					       },
					       {
					    	   text: "Guardar",
					    	   id: "kycProductoBeneficiarioCreditoPersonalGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycProductoBeneficiarioCreditoPersonal.guardarProductoBeneficiarioCreditoPersonal
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycProductoBeneficiarioCreditoPersonalGrid",
						height: 150,
						width:700,
						colspan: 6,
						collapsible: true,
						minHeight: 10,
						store: new Ext.data.SimpleStore({
					    	data: config.kycProductoBeneficiarioCreditoPersonal || [],
					    	fields: [
								"kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioId",
								"kycProductoBeneficiarioNombre",
								"kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioCedula",
								"kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioParticipacion",
								"kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioNumeroCuenta",
								"kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioRelacionAsegurado",
								"kycProductoBeneficiarioCreditoPersonal.kycFechaActualizacion",
								"kycProductoBeneficiarioApellido",
			    	        ]
					    }),
					    columns: [
					              {text: "Nombre Completo", xtype: "templatecolumn", tpl: "{kycProductoBeneficiarioNombre} " + "{kycProductoBeneficiarioApellido}", flex: 1.8, minWidth: 200},
//					              {header: "Nombre Completo",  dataIndex: "kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioNombre", flex: 1.8, minWidth: 200},
							      {header: "N\u00famero de Identificaci\u00f3n",  dataIndex: "kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioCedula",flex: 0.8, width: 100},
							      {header: "Participaci\u00f3n (%)",  dataIndex: "kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioParticipacion",flex: 0.4, width: 100}
							      ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycProductoBeneficiarioCreditoPersonalForm", record.data);
					    			Efx.form.setDisable("kycProductoBeneficiarioCreditoPersonalForm");
					    		}
					    		Efx.form.switchButton(configWindow, "rowclick");
					    		Efx.form.switchButton(configWindowBottom, "rowclick");
					    	},
					    	afterrender: function(){
					    		if(this.store.data.items.length > 0) Efx.grid.selectFirstRow(this);
					    		var suma = new Number(0);
					    		var length = config.kycProductoBeneficiarioCreditoPersonal.length;
					    		for (var j = 0, lenExterno = length; j < lenExterno; j++) {
					    			var i = 0;
						    		for (i = 1, len = 7; i < len; i++) {
						    			if (i == 3){
						    			suma =  parseInt(suma) +  parseInt(config.kycProductoBeneficiarioCreditoPersonal[j][3]);
						    			}
						    		};
					    		};
					    		Efx.form.switchButton(configWindow, "cancelNotClear");
					    		Efx.form.switchButton(configWindowBottom, "cancelNotClear");
					    	}
					    }
					},{
			        	xtype: "form",
						id: "kycProductoBeneficiarioCreditoPersonalForm",
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
								text: "BENEFICIARIOS DE CR\u00c9DITO PERSONAL",
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
								name : "kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioNombre",
								maxLength: 150,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioApellido",
								name : "kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioApellido",
								maxLength: 150,
								allowBlank: false,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioCedula",
								name : "kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioCedula",
								maxLength: 20,
								allowBlank: false,
								colspan:2
							},

							{xtype: "label", text: "Porcentaje de Participaci\u00f3n (%)", cls: "x-form-item label_spacing", colspan: 2},
							{xtype: "label", text: "Relaci\u00f3n con el Asegurado", cls: "x-form-item label_spacing", colspan: 4},
							 {
								xtype : "numberfield",
								id:"kycProductoBeneficiarioParticipacion",
								name : "kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioParticipacion",
								maxLength: 3,
								maxValue: 100,
								minValue: 0,
								hideTrigger:true,
								colspan:2
							},
							{
								xtype : "textfield",
								id:"kycProductoBeneficiarioRelacionAsegurado",
								allowBlank: false,
								name : "kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioRelacionAsegurado",
								colspan:4
							},
							{
								xtype: "hidden",
								id: "kycProductoBeneficiarioCuentaSuma"
							},
							{
								xtype: "hidden",
								id: "gridRecord"
							},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: "   ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycProductoBeneficiarioCreditoPersonalId",
								name: "kycProductoBeneficiarioCreditoPersonal.kycProductoBeneficiarioId"
							},
							{
								xtype: "hidden",
								id: "ctgTipoProductoId",
								name: "kycProductoBeneficiarioCreditoPersonal.ctgTipoProducto.ctgCatalogoId"
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