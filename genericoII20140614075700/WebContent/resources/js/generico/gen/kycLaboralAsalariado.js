KycLaboralAsalariado = function(){
	var configWindow = {
		add: "kycLaboralAsalariadoAgregarTop",
		edit: "kycLaboralAsalariadoEditarTop",
		save: "kycLaboralAsalariadoGuardarTop",
		remove: "kycLaboralAsalariadoEliminarTop",
		grid: "kycLaboralAsalariadoGrid",
		form: "kycLaboralAsalariadoForm"
	};
	var configWindowBottom = {
			add: "kycLaboralAsalariadoAgregarBottom",
			edit: "kycLaboralAsalariadoEditarBottom",
			save: "kycLaboralAsalariadoGuardarBottom",
			remove: "kycLaboralAsalariadoEliminarBottom"
	};

	return {
		agregarLaboralAsalariado: function(){
			Efx.form.switchButton(configWindow, "add");
			Efx.form.switchButton(configWindowBottom, "add");
		},
		editarLaboralAsalariado: function(){
			Efx.form.switchButton(configWindow, "edit");
			Efx.form.switchButton(configWindowBottom, "edit");
		},
		eliminarLaboralAsalariado: function(){
			Efx.message.confirmDelete(function(){
				Efx.message.progress("Eliminando Informaci\u00F3n...");
				Ext.Ajax.request({
					timeout: Efx.constants.TIMEOUT_SECONDS,
					url: Efx.constants.CONTEXT_PATH + "/kycLaboral/delete",
					params: {
						kycLaboralId: Efx.utils.getValue("kycLaboralAsalariadoId"),
						kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
						kycTipoLaboral : Efx.constants.codes.LABORAL_ASALARIADO
					},
					callback: function(options, success, response){
						Ext.Msg.hide();
						if(success){
							var jsonObject = Efx.utils.ajaxRequestGetJson(response);
							if(jsonObject && jsonObject.success){
								Efx.form.switchButton(configWindow, "remove");
								Efx.form.switchButton(configWindowBottom, "remove");
								Efx.message.alert(jsonObject.message);
								Efx.form.clearAndDisable("kycLaboralAsalariadoForm");
								if(jsonObject.kycLaboralAsalariado){
			    					Ext.getCmp("kycLaboralAsalariadoGrid").getStore().loadData(jsonObject.kycLaboralAsalariado);
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
		guardarLaboralAsalariado: function(){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("kycLaboralAsalariadoForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/kycLaboral/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycLaboralAsalariado.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
    				"kycLaboralAsalariado.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId(),
    				"kycLaboralAsalariado.ctgTipoLaboral.ctgCatalogoId" :Efx.constants.codes.LABORAL_ASALARIADO,
    				 kycTipoLaboral : Efx.constants.codes.LABORAL_ASALARIADO,
    				 tipoDocumento: Efx.utils.getValue("ctgTipoDocumento.ctgCatalogoId"),
    				 esTransaccion : Efx.utils.getValue("esTransaccion")
    			},
    			success: function(form, action){
    				Efx.form.switchButton(configWindow, "save");
    				Efx.form.switchButton(configWindowBottom, "save");
    				Efx.message.alert(action.result.message);
    				Efx.form.setDisable("kycLaboralAsalariadoForm", true);
    				if(action.result.kycLaboralAsalariado){
    					Ext.getCmp("kycLaboralAsalariadoGrid").getStore().loadData(action.result.kycLaboralAsalariado);
    					Ext.getCmp("kycLaboralAsalariadoGrid").getSelectionModel().select(action.result.kycLaboralAsalariadoIndex);
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});
		},findFromBureau: function(){
			Efx.message.progress("Buscando en Bureau...");
			if(Ext.isEmpty(Efx.utils.getValue("kycLaboralNumeroCed1Id"))){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycLaboral/findFromBureau",
				params: {
					kycPersonaFisicaDocumento1: Efx.utils.getValue("kycLaboralNumeroCed1Id"),
					tipoLaboral : Efx.constants.codes.LABORAL_ASALARIADO,
					tipoBoton : "1",
					kycPersonaFisicaId: EfxKYC.getKycPersonaFisicaId(),
    				kycLaboralId :Efx.utils.getValue("kycLaboralAsalariadoId"),
    				kycTipoPersona : Efx.utils.getValue("ctgTipoDocumento.ctgCatalogoId")
				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						Ext.getCmp("kycLaboralNombre1").setValue(jsonObject.kycLaboralNombres);
						Ext.getCmp("ctgPais").setValue(jsonObject.ctgPais);
						Ext.getCmp("ctgProvincia").setValue(jsonObject.ctgProvincia);
						Ext.getCmp("ctgCanton").setValue(jsonObject.ctgCanton);
						Ext.getCmp("ctgDistrito").setValue(jsonObject.ctgDistrito);
						Ext.getCmp("kycLaboralTelefono1").setValue(jsonObject.kycLaboralTelefono1);
						Ext.getCmp("kycLaboralDireccion").setValue(jsonObject.kycLaboralDireccion);
						Ext.getCmp("kycLaboralSalAprox").setValue(jsonObject.kycLaboralSalAprox);
						Ext.getCmp("kycLaboralCodigoTransaccion").setValue(jsonObject.kycLaboralCodigoTransaccion);
						Ext.getCmp("esTransaccion").setValue("1");
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
				title: "DATOS LABORALES",
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
							   id: "kycLaboralAsalariadoAgregarTop",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycLaboralAsalariado.agregarLaboralAsalariado
						   },{
					    	   text: "Editar",
					    	   id: "kycLaboralAsalariadoEditarTop",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycLaboralAsalariado.editarLaboralAsalariado
					       },{
					    	   text: "Guardar",
					    	   id: "kycLaboralAsalariadoGuardarTop",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycLaboralAsalariado.guardarLaboralAsalariado
					       },{
					    	   text: "Eliminar",
					    	   id: "kycLaboralAsalariadoEliminarTop",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycLaboralAsalariado.eliminarLaboralAsalariado
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
							   id: "kycLaboralAsalariadoAgregarBottom",
							   iconCls: Efx.constants.icons.ADD_ICON,
							   handler: KycLaboralAsalariado.agregarLaboralAsalariado
						   },{
					    	   text: "Editar",
					    	   id: "kycLaboralAsalariadoEditarBottom",
							   iconCls: Efx.constants.icons.EDIT_ICON,
							   handler: KycLaboralAsalariado.editarLaboralAsalariado
					       },{
					    	   text: "Guardar",
					    	   id: "kycLaboralAsalariadoGuardarBottom",
							   iconCls: Efx.constants.icons.SAVE_ICON,
							   handler: KycLaboralAsalariado.guardarLaboralAsalariado
					       },{
					    	   text: "Eliminar",
					    	   id: "kycLaboralAsalariadoEliminarBottom",
							   iconCls: Efx.constants.icons.DELETE_ICON,
							   handler: KycLaboralAsalariado.eliminarLaboralAsalariado
					       }
		        	    ]
			        }
	            ],
				items: [
					{
						xtype: "grid",
						id: "kycLaboralAsalariadoGrid",
						height: 150,
						width:700,
						collapsible: true,
						colspan: 6,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: config.kycLaboralAsalariado || [],
					    	fields: [
					"kycLaboralAsalariado.kycLaboralId",
					"kycLaboralAsalariado.kycLaboralDireccion",
					"kycLaboralAsalariado.kycLaboralNombre1",
					"kycLaboralAsalariado.kycLaboralTelefono1",
					"kycLaboralAsalariado.kycLaboralTelefono2",
					"kycLaboralAsalariado.kycLaboralTelefono3",
					"kycLaboralAsalariado.kycLaboralTelefono4",
					"kycLaboralAsalariado.kycLaboralNumeroCed1",
					"kycLaboralAsalariado.kycLaboralFechaIngreso",
					"kycLaboralAsalariado.kycLaboralAnios",
					"kycLaboralAsalariado.kycLaboralMeses",
					"kycLaboralAsalariado.kycLaboralEmail1",
					"kycLaboralAsalariado.kycLaboralEmail2",
					"kycLaboralAsalariado.kycLaboralSalAprox",
					"kycLaboralAsalariado.kycLaboralOtro",
					"kycLaboralAsalariado.kycLaboralDetalle",
					"kycLaboralAsalariado.kycLaboralNombres",
					"kycLaboralAsalariado.kycLaboralPrimerApellido",
					"kycLaboralAsalariado.kycLaboralSegundoApellido",
					"kycLaboralAsalariado.kycLaboralFechaNacimiento",
					"kycLaboralAsalariado.kycLaboralApartado",
					"kycLaboralAsalariado.kycLaboralTitular",
					"kycLaboralAsalariado.kycLaboralParentesco",
					"kycLaboralAsalariado.kycLaboralCiudadNacimiento",
					"kycLaboralAsalariado.kycLaboralPantallaBusqueda",
					"kycLaboralAsalariado.kycLaboralMemo",
					"kycLaboralAsalariado.kycFechaActualizacion",
					"ctgActividadEconomica.ctgCatalogoId",
					"ctgSubActividadEconomica.ctgCatalogoId",
					"ctgTipoDocumento.ctgCatalogoId",
					"ctgSubTipoDocumento.ctgCatalogoId",
					"ctgProfesiones.ctgCatalogoId",
					"ctgPais.ctgPaisId",
					"ctgProvincia.ctgProvinciaId",
					"ctgCanton.ctgCantonId",
					"ctgDistrito.ctgDistritoId",
					"ctgPoblado.ctgPobladoId",
					"ctgNacionalidad.ctgPaisId",
					"ctgPaisNacimiento.ctgPaisId",
					"ctgEstadoCivil.ctgCatalogoId",
					"ctgGenero.ctgCatalogoId",
					"ctgResultadoInvestigacion.ctgCatalogoId",
					"kycLaboralAsalariado.kycLaboralCodigoTransaccion",
					"kycLaboralAsalariado.kycLaboralCodigoReferencia"

			    	        ]
					    }),
					    columns: [
					              {header: "Nombre de Patrono",  dataIndex: "kycLaboralAsalariado.kycLaboralNombre1", flex: 2, minWidth: 200},
							      {header: "Salario Aproximado",  dataIndex: "kycLaboralAsalariado.kycLaboralSalAprox", flex: 1, width: 100,format:'0,000.00',xtype: 'numbercolumn'}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycLaboralAsalariadoForm", record.data);
					    			Efx.form.setDisable("kycLaboralAsalariadoForm");
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
						id: "kycLaboralAsalariadoForm",
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
								text: "ASALARIADO",
								cls: "x-form-item label_header",
								colspan: 6,
								width: 730
							},
							{xtype: "label", text: "Tipo de C\u00e9dula de Patrono", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "N\u00famero de C\u00e9dula", cls: "x-form-item label_spacing", colspan:4},
							{
								xtype: "combo",
								id: "ctgTipoDocumento.ctgCatalogoId",
								name: "kycLaboralAsalariado.ctgTipoDocumento.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: config.ctgTipoDocumentoAsalariado || [],
									fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre"]
								}),
								displayField: "ctgTipoDocumentoNombre",
								valueField: "ctgTipoDocumentoId",
								colspan: 2,
								allowBlank: false,
								listeners : {
									change : function() {
											var dis= this.getValue();
											if(dis == 634) {
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;
												Ext.getCmp("validarButtonId1").disable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = true;
												Ext.getCmp("kycLaboralNumeroCed1Id").setValue(" ");
											}
											else if (dis== 632){
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedJur";
												Ext.getCmp("validarButtonId1").enable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
											}
											else if (dis == 633)
												{
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedNac";
												Ext.getCmp("validarButtonId1").enable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
												}
											else{
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;
												Ext.getCmp("validarButtonId1").disable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
											}

									},
										render : function() {
											var dis = this.getValue();
											if(dis == 634) {
												Ext.getCmp("validarButtonId1").disable();
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = true;
											}
											else if (dis == 632){
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedJur";
												Ext.getCmp("validarButtonId1").enable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
											}
											else if (dis == 633)
												{
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = "CedNac";
												Ext.getCmp("validarButtonId1").enable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
												}
											else{
												Ext.getCmp("kycLaboralNumeroCed1Id").vtype = undefined;
												Ext.getCmp("validarButtonId1").disable();
												Ext.getCmp("kycLaboralNumeroCed1Id").allowBlank = false;
											}
										}
								}
							},{
								xtype: "textfield",
								id : "kycLaboralNumeroCed1Id",
								name: "kycLaboralAsalariado.kycLaboralNumeroCed1",
								maxLength: 20,
								colspan: 2
							},{
			                    xtype: "button",
			                    id:"validarButtonId1",
			                    text: "VALIDAR C\u00c9DULA",
			                    handler: KycLaboralAsalariado.findFromBureau
			                },
							{xtype: "label", text: "Nombre de Patrono", cls: "x-form-item label_spacing", colspan:4},
							{xtype: "label", text: "Ocupaci\u00f3n",  cls: "x-form-item label_spacing", colspan:2},
							{
								xtype:"textfield",
								id: "kycLaboralNombre1",
								name:"kycLaboralAsalariado.kycLaboralNombre1",
								colspan:4,
								maxLength : 120,
								allowBlank:false,
								width:470
							},{
								xtype : "combo",
								id : "ctgProfesiones",
								name : "ctgProfesiones.ctgCatalogoId",
								store : new Ext.data.SimpleStore({
									data : config.ctgProfesiones || [],
									fields : [ "ctgProfesionesId", "ctgProfesionesNombre" ]
								}),
								displayField : "ctgProfesionesNombre",
								valueField : "ctgProfesionesId",
								allowBlank: false,
								listConfig : {minWidth : 450}
							},
							{xtype: "label", text: "Fecha de Ingreso", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Tiempo de Laborar (A\u00f1os/Meses)",cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", text: "Salario Aproximado", cls: "x-form-item label_spacing", colspan:2},
							{
								xtype : "datefield",
								id: "kycLaboralFechaIngreso",
								name : "kycLaboralAsalariado.kycLaboralFechaIngreso",
								submitFormat : "Ymd",
								maxValue : new Date(),
								allowBlank : false,
								altFormats: "Ymd|d/m/Y",
								listeners:{
	        						change: function(field, nValue, oValue, opts){
	        							if(!field.isValid() || this.getValue()==null)return;
	        							var json = Efx.utils.getJSONAnosMeses(Ext.Date.format(nValue, "d/m/Y"));
	        							Efx.utils.setValue("kycLaboralAnios",json.anos);
	        							Efx.utils.setValue("kycLaboralMeses",json.meses);
	        						},
	        						render: function(field, nValue, oValue, opts){
	        							if(field.isValid())return;
	        							var json = Efx.utils.getJSONAnosMeses(Ext.Date.format(nValue, "d/m/Y"));
	        							Efx.utils.setValue("kycLaboralAnios",json.anos);
	        							Efx.utils.setValue("kycLaboralMeses",json.meses);
	        						}
	        					}
							},{
								xtype:"numberfield",
								id: "kycLaboralAnios",
								name:"kycLaboralAsalariado.kycLaboralAnios",
								width:100,
								allowDecimals: false,
								readOnly: true,
								maxLength: 10,
								value:0,
								minValue: 0,
								hideTrigger: true,
								colspan:1,
								listeners : {
									change : function() {
										var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycLaboralAnios"))
												&& Ext.isEmpty(Efx.utils.getValue("kycLaboralMeses"));
										Efx.utils.setRequiredAndValidate("kycLaboralAnios",isEmpty);
										Efx.utils.setRequiredAndValidate("kycLaboralMeses",isEmpty);
									}}
							},{
								xtype:"numberfield",
								id: "kycLaboralMeses",
								name:"kycLaboralAsalariado.kycLaboralMeses",
								width:100,
								readOnly: true,
								allowDecimals: false,
								hideTrigger: true,
								value:0,
								maxValue: 11,
								minValue: 0,
								maxLength : 10,
								colspan:1,
								listeners : {
									change : function() {
										var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycLaboralAnios"))
												&& Ext.isEmpty(Efx.utils.getValue("kycLaboralMeses"));
										Efx.utils.setRequiredAndValidate("kycLaboralAnios",isEmpty);
										Efx.utils.setRequiredAndValidate("kycLaboralMeses",isEmpty);
									}}
							},{
								xtype:"numericfield",
								id: "kycLaboralSalAprox",
								name:"kycLaboralAsalariado.kycLaboralSalAprox",
								maxLength : 22,
								allowDecimals: true,
								allowBlank: false,
								decimalPrecision: 2,
								colspan: 2
							},
							{xtype: "label", text: "Tel\u00e9fono Oficina", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", style: " ",  text: " ", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", style: "color: red",  text: "Incluir montos en colones unicamente", cls: "x-form-item label_spacing", colspan:2},
							{
								xtype:"textfield",
								id : "kycLaboralTelefono1",
								name:"kycLaboralAsalariado.kycLaboralTelefono1",
								allowBlank:false,
								maxLength : 8,
								vtype: "validNA",
								colspan:6
							},{
								xtype : "label",
								text : "Pa\u00EDs",
								cls : "x-form-item label_spacing",
								colspan : 2
							},{
								xtype : "label",
								text : "Provincia",
								cls : "x-form-item label_spacing"
							},{
								xtype : "label",
								text : "Cant\u00F3n",
								cls : "x-form-item label_spacing"
							},{
								xtype : "combo",
								id : "ctgPais",
								name : "ctgPais.ctgPaisId",
								store : new Ext.data.SimpleStore({
									data : config.ctgPaises || [],
									fields : [ "ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre" ]
								}),
								displayField : "ctgPaisNombre",
								valueField : "ctgPaisId",
								allowBlank : false,
								colspan : 2,
								listeners : {
									change : function() {
										var disable = this.getValue() != Efx.constants.codes.COSTA_RICA;
										Efx.utils.setDisabled("ctgProvincia", disable,true);
										Efx.utils.setDisabled("ctgCanton", disable,true);
										Efx.utils.setDisabled("ctgDistrito", disable,true);
										Efx.utils.setDisabled("ctgPoblado", disable,true);
										Efx.utils.setDisabled("kycLaboralOtro", disable,true);

										Ext.getCmp("ctgPoblado").clearInvalid();
										Ext.getCmp("kycLaboralOtro").clearInvalid();
										Efx.combos.setRequiredAndValidate("ctgProvincia", !disable);
										Efx.combos.setRequiredAndValidate("ctgCanton", !disable);
										Efx.combos.setRequiredAndValidate("ctgDistrito", !disable);


										if (Ext.getCmp("ctgPais").getValue() == Efx.constants.codes.COSTA_RICA)
											{
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPoblado"))&&
									Ext.isEmpty(Efx.utils.getValue("kycLaboralOtro"));
									Efx.utils.setRequiredAndValidate("ctgPoblado", isEmpty);
									Efx.utils.setRequiredAndValidate("kycLaboralOtro", isEmpty);
											}
									}}
							},{
								xtype : "combo",
								id : "ctgProvincia",
								name : "ctgProvincia.ctgProvinciaId",
								store : new Ext.data.SimpleStore({
									data : config.ctgProvincias || [],
									fields : [ "ctgProvinciaId","ctgProvinciaNombre" ]
								}),
								displayField : "ctgProvinciaNombre",
								valueField : "ctgProvinciaId",
								listeners : {
									change : function() {
										Efx.combos.loadData("ctgCanton",
										Efx.combos.getAllCantonesByProvinciaCombo(this.getValue(),config.ctgCantones));
										Efx.combos.removeAll("ctgDistrito", true);
									}}
							},{
								xtype : "combo",
								id : "ctgCanton",
								name : "ctgCanton.ctgCantonId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgCantonId", "ctgCantonNombre", "ctgProvinciaId" ]
								}),
								displayField : "ctgCantonNombre",
								valueField : "ctgCantonId",
								listeners : {
									change : function() {
										Efx.combos.loadData("ctgDistrito",
										Efx.combos.getAllDistritosByCantonCombo(this.getValue(),config.ctgDistritos));
									}}
							},{
								xtype : "label",
								text : "Distrito",
								cls : "x-form-item label_spacing"
							},{
								xtype : "label",
								text : "Barrio/Poblado",
								cls : "x-form-item label_spacing",
								colspan : 2
							},{
								xtype : "label",
								text : "Otro",
								cls : "x-form-item label_spacing",
								colspan : 2
							},{
								xtype : "combo",
								id : "ctgDistrito",
								name : "ctgDistrito.ctgDistritoId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgDistritoId", "ctgDistritoNombre", "ctgCantonId"]
								}),
								displayField : "ctgDistritoNombre",
								valueField : "ctgDistritoId",
								listeners:{
									change: function() {
										Efx.combos.loadData("ctgPoblado",Efx.combos.getAllPobladosByDistritoCombo(
											this.getValue(),config.ctgPoblados));
									}}
							},{
								xtype : "combo",
								id : "ctgPoblado",
								name : "ctgPoblado.ctgPobladoId",
								store : new Ext.data.SimpleStore({
									data : [],
									fields : [ "ctgPobladoId", "ctgPobladoNombre", "ctgDistritoId" ]
								}),
								displayField : "ctgPobladoNombre",
								valueField : "ctgPobladoId",
								listeners:
								{
								change: function()
									{
										if (Ext.getCmp("ctgPais").getValue() == Efx.constants.codes.COSTA_RICA)
											{
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPoblado"))&&
									Ext.isEmpty(Efx.utils.getValue("kycLaboralOtro"));
									Efx.utils.setRequiredAndValidate("ctgPoblado", isEmpty);
									Efx.utils.setRequiredAndValidate("kycLaboralOtro", isEmpty);
											}
									}
								}
							},{
								xtype : "textfield",
								id : "kycLaboralOtro",
								name : "kycLaboralAsalariado.kycLaboralOtro",
								maxLength : 100,
								listeners:
								{
								change: function()
									{
										if (Ext.getCmp("ctgPais").getValue() == Efx.constants.codes.COSTA_RICA)
											{
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("ctgPoblado"))&&
									Ext.isEmpty(Efx.utils.getValue("kycLaboralOtro"));
									Efx.utils.setRequiredAndValidate("ctgPoblado", isEmpty);
									Efx.utils.setRequiredAndValidate("kycLaboralOtro", isEmpty);
											}
									}
								}
							},{
								xtype : "label",
								text : "Direcci\u00f3n Exacta (Favor incluir calle, av, etc)",
								cls : "x-form-item label_spacing",
								width: 480,
								colspan : 6
							},{
								xtype:"textfield",
								id : "kycLaboralDireccion",
								name:"kycLaboralAsalariado.kycLaboralDireccion",
								maxLength : 250,
								allowBlank: false,
								width:720,
								colspan:6
							},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:2},
							{xtype: "label", style: "color: red",  text: "Datos laborales digitados por el usuario", cls: "x-form-item label_spacing", colspan:4},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:6},
							{xtype: "label", text: " ", cls: "x-form-item label_spacing", colspan:6},
							{
								xtype: "hidden",
								id: "kycLaboralAsalariadoId",
								name: "kycLaboralAsalariado.kycLaboralId"
							},{
								xtype: "hidden",
								id: "ctgTipoLaboralId",
								name: "kycLaboralAsalariado.ctgTipoLaboral.ctgCatalogoId"
							},{
								xtype: "hidden",
								id: "kycLaboralCodigoTransaccion",
								name: "kycLaboralAsalariado.kycLaboralCodigoTransaccion"
							},{
								xtype: "hidden",
							id: "kycLaboralCodigoReferencia",
							name: "kycLaboralAsalariado.kycLaboralCodigoReferencia"
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
							},
							  {	xtype: "hidden",
								id: "esTransaccion",
								name: "esTransaccion"
							}
						]
			        }
				]
			});
			return configToReturn;
		}
	};
}();