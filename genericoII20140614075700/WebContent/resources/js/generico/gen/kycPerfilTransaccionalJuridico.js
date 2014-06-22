KycPerfilTransaccionalJuridico = function(){
	var configWindow = {
			add: "kycPerfilTransaccionalJuridicoAgregarTop",
			edit: "kycPerfilTransaccionalJuridicoEditarTop",
			save: "kycPerfilTransaccionalJuridicoGuardarTop",
			remove: "kycPerfilTransaccionalJuridicoEliminarTop",
			grid: "kycPerfilTransaccionalJuridicoGrid",
			form: "kycPerfilTransaccionalJuridicoForm"
		};
		var configWindowBottom = {
				add: "kycPerfilTransaccionalJuridicoAgregarBottom",
				edit: "kycPerfilTransaccionalJuridicoEditarBottom",
				save: "kycPerfilTransaccionalJuridicoGuardarBottom",
				remove: "kycPerfilTransaccionalJuridicoEliminarBottom"
		};

		return{
			agregarPerfilTransaccionalJuridico: function(){
				Efx.form.switchButton(configWindow, "add");
				Efx.form.switchButton(configWindowBottom, "add");
			},
			editarPerfilTransaccionalJuridico: function(){
				Efx.form.switchButton(configWindow, "edit");
				Efx.form.switchButton(configWindowBottom, "edit");
			},
			eliminarPerfilTransaccionalJuridico: function(){
				Efx.message.confirmDelete(function(){
					Efx.message.progress("Eliminando Informaci\u00F3n...");
					Ext.Ajax.request({
						timeout: Efx.constants.TIMEOUT_SECONDS,
						url: Efx.constants.CONTEXT_PATH + "/kycPerfilTransaccionalJuridico/delete",
						params: {
							kycPerfilTransaccionalJuridicoId: Efx.utils.getValue("kycPerfilTransaccionalJuridicoId"),
		    				kycPersonaJuridicaId: EfxKYC.getKycPersonaJuridicaId()
						},
						callback: function(options, success, response){
							Ext.Msg.hide();
							if(success){
								var jsonObject = Efx.utils.ajaxRequestGetJson(response);
								if(jsonObject && jsonObject.success){
									Efx.form.switchButton(configWindow, "remove");
									Efx.form.switchButton(configWindowBottom, "remove");
									Efx.message.alert(jsonObject.message);
									Efx.form.clearAndDisable("kycPerfilTransaccionalJuridicoForm");
									if(jsonObject.kycPerfilTransaccionalJuridicos){
				    					Ext.getCmp("kycPerfilTransaccionalJuridicoGrid").getStore().loadData(jsonObject.kycPerfilTransaccionalJuridicos);
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
			guardarPerfilTransaccionalJuridico: function(){
				Efx.message.progress("Guardando Informaci\u00F3n...");
				Ext.getCmp("kycPerfilTransaccionalJuridicoForm").getForm().submit({
	    			url: Efx.constants.CONTEXT_PATH + "/kycPerfilTransaccionalJuridico/save",
	    			timeout: Efx.constants.TIMEOUT_SECONDS,
	    			params: {
	    				"kycPerfilTransaccionalJuridico.kycPersonaJuridica.kyc.kycId": EfxKYC.getKycId(),
	    				"kycPerfilTransaccionalJuridico.kycPersonaJuridica.kycPersonaJuridicaId": EfxKYC.getKycPersonaJuridicaId()
	    			},
	    			success: function(form, action){
	    				Efx.form.switchButton(configWindow, "save");
	    				Efx.form.switchButton(configWindowBottom, "save");
	    				Efx.message.alert(action.result.message);
	    				Efx.form.setDisable("kycPerfilTransaccionalJuridicoForm", true);
	    				if(action.result.kycPerfilTransaccionalJuridicos){
	    					Ext.getCmp("kycPerfilTransaccionalJuridicoGrid").getStore().loadData(action.result.kycPerfilTransaccionalJuridicos);
	    					Ext.getCmp("kycPerfilTransaccionalJuridicoGrid").getSelectionModel().select(action.result.kycPerfilTransaccionalJuridicoIndex);
	    				}
	    			},
	    			failure: Efx.form.failureProcedure
	   			});
			},
		saveKycPerfilTransaccionalJuridico: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycPerfilTransaccionalJuridicoForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycPerfilTransaccionalJuridico/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycPerfilTransaccionalJuridico.kyc.kycId": EfxKYC.getKycId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycPerfilTransaccionalJuridicoId", action.result.kycPerfilTransaccionalJuridicoId);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycPerfilTransaccionalJuridico = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			configToReturn.items.push({
				xtype: "panel",
				flex: 1,
//				id: "kycPerfilTransaccionalJuridicoForm",
				title: "PERFIL TRANSACCIONAL",
				autoScroll: true,
				listeners: {
					render: function(){
						if(kycPerfilTransaccionalJuridico && kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoId && kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoId > 0){
							if(this.getForm()) this.getForm().setValues(kycPerfilTransaccionalJuridico);
							if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycPerfilTransaccionalJuridicoForm");
						}
					}
				},
				layout: {
				    type: "vbox",
				    align : "center",
				    pack  : "start"
				},
				defaults: {width: 730, margins: "5 0 5 0"},
				dockedItems:[
		             {
		            	 xtype: "toolbar",
		            	 dock: "top",
		            	 hidden: EfxKYC.getKycVigente() === false,
		            	 items: [
							"->",
							{
								   text: "Nuevo",
								   id: "kycPerfilTransaccionalJuridicoAgregarTop",
								   iconCls: Efx.constants.icons.ADD_ICON,
								   handler: KycPerfilTransaccionalJuridico.agregarPerfilTransaccionalJuridico
							},{
						    	   text: "Editar",
						    	   id: "kycPerfilTransaccionalJuridicoEditarTop",
								   iconCls: Efx.constants.icons.EDIT_ICON,
								   handler: KycPerfilTransaccionalJuridico.editarPerfilTransaccionalJuridico,
						    },{
								 text: "Guardar",
								 iconCls: Efx.constants.icons.SAVE_ICON,
								 handler: KycPerfilTransaccionalJuridico.saveKycPerfilTransaccionalJuridico
							},{
						    	 text: "Eliminar",
						    	 id: "kycPerfilTransaccionalJuridicoEliminarTop",
								 iconCls: Efx.constants.icons.DELETE_ICON,
								 handler: KycPerfilTransaccionalJuridico.eliminarPerfilTransaccionalJuridico
						    }
            	         ]
		             },{
		            	 xtype: "toolbar",
		            	 dock: "bottom",
		            	 hidden: EfxKYC.getKycVigente() === false,
		            	 items: [
							"->",
							{
								 text: "Guardar",
								 iconCls: Efx.constants.icons.SAVE_ICON,
								 handler: KycPerfilTransaccionalJuridico.saveKycPerfilTransaccionalJuridico
							}
            	         ]
		             }
	            ],
//				layout: {
//					type: "table",
//					columns: 6,
//					tableAttrs: {
//			            style: {width: "730px", "margin-top": "5px", "margin-bottom": "40px"},
//			            align: "center"
//			        }
//				},
//				defaults: Efx.utils.defaults({width: 730, colspan: 2}),
				items: [
				        {
						xtype: "grid",
						id: "kycPerfilTransaccionalJuridicoGrid",
						height: 150,
						minHeight: 150,
						store: new Ext.data.SimpleStore({
					    	data: [["a","s","d","f","g"],
					    	       ["q","w","e","r","t"],["z","x","c","v","b"]] || [],
					    	fields: [
						         "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoId",
						         "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoNombreCompleto",
						         "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoIdentificacion",
						         "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoParticipacion",
						         "kycFechaActualizacion"
					        ]
					    }),
					    columns: [
					        {header: "Nombre Completo",  dataIndex: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoNombreCompleto", flex:1, minWidth: 120},
					        {header: "Identificaci\u00F3n",  dataIndex: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoIdentificacion", width: 120},
					        {header: "Participaci\u00F3n",  dataIndex: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoParticipacion", align: "right", width: 120, renderer: "kycPercentage"}
					    ],
					    listeners: {
					    	selectionchange: function(model, records){
					    		if(!records || records.length <= 0) return;
					    		var record = records[0];
					    		if(record != null){
					    			Efx.form.setValues("kycPerfilTransaccionalJuridicoForm", record.data);
					    			Efx.form.setDisable("kycPerfilTransaccionalJuridicoForm");
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
						id: "kycPerfilTransaccionalJuridicoForm",
						flex: 1,
					    border: false,
					    autoScroll: true,
						layout: {
							type: "table",
							columns: 3,
							tableAttrs: {
					            style: {width: "730px"},
					            align: "center"
					        }
						},
						defaults: {
							width: 160,
							selectOnFocus: true,
							enforceMaxLength: true,
							maxLength: 200,
							typeAhead: true,
							minChars: 1,
							queryMode: "local",
							forceSelection: true,
							allowEnable: true
						},items: [
					{
			        	xtype: "label",
			        	id: "kycFechaActualizacionTitle",
			        	text: "",
			        	cls: "x-form-item label_header lblHeaderRed",
			        	colspan: 6,
			        	hidden: true,
			        	width: 730
			        },
					/********************************/
			        {
						xtype: "label",
						text: "Documentaci\u00f3n Para Verificaci\u00f3n de Origen de Fondos",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},{
						xtype: "checkboxgroup",
				        items: [{ boxLabel: 'Aporte de Socios (Inf. Financiera)', name: 'rb', inputValue: '1' },
				                { boxLabel: 'Operaci\u00f3n Normal de la Empresa (Inf. Financiera)', name: 'rb', inputValue: '2' },
				                { boxLabel: 'Donaciones (Inf. Financiera)', name: 'rb', inputValue: '3' },
				                { boxLabel: 'Financiamiento (Nombre de la Instituci\u00f3n)', name: 'rb', inputValue: '4' },
				                { boxLabel: 'Otros Origenes (Detallar)', name: 'rb', inputValue: '5' },],
				        colspan: 6,
				        columns: 2,
				        vertical: true,
				        width: 715
					},{
						xtype: "label",
						text: "Detalles",
						cls: "x-form-item label_spacing",
						colspan: 6,
					},{
						xtype:'textarea',
						name: "kycAccionista.kycAccionistaFondos",
						maxLength: 250,
						colspan: 6,
						height: 20,
						width: 600,
						allowBlank: false

					},	  {
							xtype: "label",
							text: "TRANSACCIONES DEL CLIENTE",
							cls: "x-form-item label_header",
							colspan: 8,
							width: 730
						},{
							xtype: "label",
							text: "Volumen Mensual",
							cls: "x-form-item label_spacing",
							colspan: 6
						},
						{
							xtype:"radiogroup",
							columns : 2,
							items: [
						            { boxLabel: 'Colones', name: 'rb', inputValue: '1', checked: true },
						            { boxLabel: 'Dolares', name: 'rb', inputValue: '2'},

						        ],
						    colspan : 6
						},{
							xtype:"label",
							text:"Creditos/Ingresos",
							cls: "x-form-item label_spacing",
						},{
							xtype:"label",
							text:"Debitos/Egresos",
							cls: "x-form-item label_spacing",
							colspan : 6
						},{
							xtype:"numericfield",
							id:"kycTransaccionesIngresos",
							name: "",
							allowBlank : false
						},{
							xtype:"numericfield",
							id:"kycTransaccionesEgresos",
							name: "",
							allowBlank : false,
							colspan : 6
						},
						{
							xtype:"label",
							text: "Tipo de Transacci\u00f3n",
							cls: "x-form-item label_spacing",
						},{
							xtype:"label",
							text: "No. de Transacciones",
							cls: "x-form-item label_spacing",
								colspan: 6
						},{
							xtype:"textfield",
							id:"kycTransacciones",
							name: "",
							allowBlank : false
						},{
							xtype:"numericfield",
							id:"kycNumeroTransacciones",
							name: "",
							allowBlank : false,
							colspan: 6
						},{
							xtype:"label",
							text:"REFERENCIAS COMERCIALES",
							cls:"x-form-item label_header",
							width: 730,
							colspan: 6
						},{
							xtype:"label",
							text:"1. Nombre:",
							cls: "x-form-item label_spacing"
						},{
							xtype:"label",
							text:"Telefono",
							cls: "x-form-item label_spacing"
						},{
							xtype:"label",
							text:"Contacto:",
							cls: "x-form-item label_spacing"
						},{
							xtype:"textfield",
							id: "kycPersonaJuridicaRef1",
							name:"",

						},{
							xtype:"textfield",
							id: "kycPersonaJuridicaTelRef1",
							name:"",

						},{
							xtype:"textfield",
							id: "kycPersonaJuridicaRefContacto1",
							name:"",
							colspan: 6

						},{
							xtype:"label",
							text:"2. Nombre:",
							cls: "x-form-item label_spacing"
						},{
							xtype:"label",
							text:"Telefono",
							cls: "x-form-item label_spacing"
						},{
							xtype:"label",
							text:"Contacto:",
							cls: "x-form-item label_spacing"
						},{
							xtype:"textfield",
							id: "kycPersonaJuridicaRef2",
							name:"",

						},{
							xtype:"textfield",
							id: "kycPersonaJuridicaTelRef2",
							name:"",

						},{
							xtype:"textfield",
							id: "kycPersonaJuridicaRefContacto2",
							name:"",
							colspan: 6
						},
					/******************************************************************
					{xtype: "label", text: "Tipo P\u00F3liza", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Valor Asegurado", cls: "x-form-item label_spacing", colspan: 1, width: 115},
					{xtype: "label", text: "Monto Prima", cls: "x-form-item label_spacing", colspan: 1, width: 115},
					{xtype: "label", text: "Periodicidad", cls: "x-form-item label_spacing"},
					{
						xtype: "combo",
						id: "ctgTipoSeguroId",
						name: "kycPerfilTransaccionalJuridico.ctgTipoSeguro.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgTipoSeguros || [],
							fields: ["ctgTipoSeguroId", "ctgTipoSeguroNombre"]
						}),
						displayField: "ctgTipoSeguroNombre",
						valueField: "ctgTipoSeguroId",
						listConfig: {minWidth: 450},
						allowBlank: false
					},{
						xtype: "numericfield",
						id: "kycPerfilTransaccionalJuridicoValor",
						name: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoValor",
						maxLength: 20,
						allowBlank: false,
						allowZero: false,
						colspan: 1,
						width: 110
					},{
						xtype: "numericfield",
						id: "kycPerfilTransaccionalJuridicoMontoPrima",
						name: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoMontoPrima",
						maxLength: 20,
						allowBlank: false,
						allowZero: false,
						colspan: 1,
						width: 115
					},{
						xtype: "combo",
						id: "ctgPeriocidadId",
						name: "kycPerfilTransaccionalJuridico.ctgPeriocidad.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgPeriocidades || [],
							fields: ["ctgPeriocidadId", "ctgPeriocidadNombre"]
						}),
						displayField: "ctgPeriocidadNombre",
						valueField: "ctgPeriocidadId",
						allowBlank: false
					},
					{xtype: "label", text: "Nombre del Asegurado", cls: "x-form-item label_spacing", colspan: 4},
					{xtype: "label", text: "Estimaci\u00F3n de ingresos mensuales", cls: "x-form-item label_spacing"},
					{
						xtype: "textfield",
						id: "kycPerfilTransaccionalJuridicoNombreAsegurado",
						name: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoNombreAsegurado",
						allowBlank: false,
						maxLength: 120,
						colspan: 4,
						width: 475
					},{
						xtype: "combo",
						id: "ctgRangoIngresosId",
						name: "kycPerfilTransaccionalJuridico.ctgRangoIngresos.ctgRangoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgRangoIngresos || [],
							fields: ["ctgRangoIngresoId", "ctgRangoIngresoNombre"]
						}),
						displayField: "ctgRangoIngresoNombre",
						valueField: "ctgRangoIngresoId"
					},
					{xtype: "label", text: "Nombre de Beneficiario", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "textfield",
						id: "kycPerfilTransaccionalJuridicoNombreBeneficiario",
						name: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoNombreBeneficiario",
						maxLength: 120,
						colspan: 6,
						width: 475
					},{
						xtype: "label",
						text: "Describa la actividad de la cual provienen los fondos",
						cls: "x-form-item label_spacing",
						width: 715,
						colspan: 6
					},{
						xtype: "textarea",
						id: "kycPerfilTransaccionalJuridicoDescripcion",
						name: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoDescripcion",
						maxLength: 1000,
						colspan: 6,
						height: 40,
						width: 715
					},{
						xtype: "label",
						text: "Tipo de relaci\u00F3n comercial (Favor indicar el tipo de Seguro que est\u00E1 adquiriendo)",
						cls: "x-form-item label_spacing",
						width: 715,
						colspan: 6
					},{
						xtype: "textarea",
						id: "kycPerfilTransaccionalJuridicoTipoRelacion",
						name: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoTipoRelacion",
						maxLength: 250,
						colspan: 6,
						height: 40,
						width: 715
					},{
						xtype: "label",
						text: "CORRESPONDENCIA",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},{
						xtype: "checkboxgroup",
				        items: config.kycCorrespondencias || [],
				        colspan: 6,
				        columns: 2,
				        vertical: true,
				        width: 715
					},{
						xtype: "label",
						text: "OBSERVACIONES GENERALES",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},{
						xtype: "label",
						text: "Incluir cualquier comentario o dato que estime necesario en relaci\u00F3n con la informaci\u00F3n consignada en el presente Formulario",
						cls: "x-form-item label_spacing",
						width: 715,
						colspan: 6
					},{
						xtype: "textarea",
						name: "kycObservacion",
						maxLength: 1000,
						colspan: 6,
						height: 40,
						width: 715
					},**/
					{
						xtype: "hidden",
						id: "kycPerfilTransaccionalJuridicoId",
						name: "kycPerfilTransaccionalJuridico.kycPerfilTransaccionalJuridicoId"
					},{
						xtype: "hidden",
						id: "kycFechaActualizacion",
						listeners: {
							change: function(){
								var value = this.getValue();
								Efx.utils.setVisible("kycFechaActualizacionTitle", !Ext.isEmpty(value));
								Efx.utils.setText("kycFechaActualizacionTitle", "FORMULARIO ACTUALIZADO EL: " + value);
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