KycFirmantes = function(){
	var ctgTipoDocumentos = [];
	return {
		getCtgTipoDocumentos: function(){return ctgTipoDocumentos;},
		setCtgTipoDocumentos: function(values){ctgTipoDocumentos = values;},
		showBusquedaRepresentanteLegal: function(){
			var kycRepresentanteLegalWindow = Ext.WindowMgr.get("kycRepresentanteLegalWindow");
			if(kycRepresentanteLegalWindow){
				kycRepresentanteLegalWindow.show();
				return;
			}
			kycRepresentanteLegalWindow = Ext.create("Ext.window.Window", {
				id: "kycRepresentanteLegalWindow",
				title: "B\u00FAsqueda Representante Legal",
				modal: true,
				closable: false,
				layout: "fit",
				height: 150,
				width: 450,
				items: {
					xtype: "form",
					id: "kycBusquedaRepresentanteLegalForm",
					border: false,
					bodyPadding: 10,
					defaults: Efx.utils.defaults({labelWidth: 150}),
					items: [
				        {
							xtype: "combo",
							id: "ctgWindowTipoDocumentoId",
							fieldLabel: "Tipo Indetificaci\u00F3n",
							store: new Ext.data.SimpleStore({
								data: KycFirmantes.getCtgTipoDocumentos(),
								fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre", "ctgTipoDocumentoPadre", "ctgTipoDocumentoHijo"]
							}),
							displayField: "ctgTipoDocumentoNombre",
							valueField: "ctgTipoDocumentoId",
							allowBlank: false,
							width: 350
						},{
							xtype: "textfield",
							id: "kycBusquedaRepresentanteLegalDocumento1",
							name: "kycRepresentanteLegalDocumento1",
							fieldLabel: "Indetificaci\u00F3n",
							allowBlank: false,
							selectOnFocus: true,
							width: 350
						}
			        ]
				},
				listeners: {
					show: function(){
						Ext.getCmp("kycBusquedaRepresentanteLegalForm").getForm().reset();
						Ext.WindowMgr.get("kycRepresentanteLegalWindow").focus();
						Efx.utils.setFocus("ctgWindowTipoDocumentoId");
						Efx.utils.setValue("kycBusquedaRepresentanteLegalDocumento1", Efx.utils.getValue("kycRepresentanteLegalDocumento1"));
						Efx.utils.setValue("ctgWindowTipoDocumentoId", Efx.utils.getValue("ctgTipoDocumentoId"));
					}
				},
				buttons: [
			          {
			        	  text: "Buscar",
			        	  handler: KycFirmantes.decodeSaveFrom
			          },{
			        	  text: "Cerrar",
			        	  handler: function(){
			        		  kycRepresentanteLegalWindow.hide();
			        	  }
			          }
		        ]
			});
			kycRepresentanteLegalWindow.show();
		},
		decodeSaveFrom: function(){
			var ctgTipoDocumento = Efx.combos.getSelectedData("ctgWindowTipoDocumentoId", "ctgTipoDocumentoId");
			if(!ctgTipoDocumento){
				Efx.message.alertInvalid("Debe indicar el Tipo de Identificaci\u00F3n");
				return;
			}
			if(Efx.constants.codes.DOCUMENTO_CEDULA == ctgTipoDocumento.ctgTipoDocumentoHijo){
				KycFirmantes.saveFromBureau(ctgTipoDocumento);
			}else{
				KycFirmantes.saveByDocument(ctgTipoDocumento);
			}
		},
		saveByDocument: function(ctgTipoDocumento){
			Efx.message.progress("Obteniendo Informaci\u00F3n...");
			Ext.getCmp("kycBusquedaRepresentanteLegalForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycRepresentanteLegal/saveByDocument",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"ctgTipoDocumento.ctgCatalogoId": ctgTipoDocumento.ctgTipoDocumentoId,
    				"ctgTipoDocumento.ctgCatalogoHijo": ctgTipoDocumento.ctgTipoDocumentoHijo,
    				"ctgTipoDocumento.ctgCatalogoNombre": ctgTipoDocumento.ctgTipoDocumentoNombre,
    				"kycPersonaJuridica.kycPersonaJuridicaId": EfxKYC.getKycPersonaJuridicaId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				if(action.result.encontrado){
    					Efx.form.setValues("kycRepresentanteLegalForm", action.result.kycRepresentanteLegal);
    				}else{
    					Efx.utils.setDisabled("kycRepresentanteLegalPrimerNombre", false, true);
    					Efx.utils.setDisabled("kycRepresentanteLegalSegundoNombre", false, true);
    					Efx.utils.setDisabled("kycRepresentanteLegalPrimerApellido", false, true);
    					Efx.utils.setDisabled("kycRepresentanteLegalSegundoApellido", false, true);
    					Efx.utils.setDisabled("kycRepresentanteLegalFechaNacimiento", false, true);
    					Efx.utils.setValue("ctgTipoDocumentoId", ctgTipoDocumento.ctgTipoDocumentoId);
    					Efx.utils.setValue("kycRepresentanteLegalDocumento1", action.result.kycRepresentanteLegalDocumento1);
    				}
					Ext.WindowMgr.get("kycRepresentanteLegalWindow").hide();
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		saveFromBureau: function(ctgTipoDocumento){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycBusquedaRepresentanteLegalForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycRepresentanteLegal/saveFromBureau",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"ctgTipoDocumento.ctgCatalogoId": ctgTipoDocumento.ctgTipoDocumentoId,
    				"ctgTipoDocumento.ctgCatalogoHijo": ctgTipoDocumento.ctgTipoDocumentoHijo,
    				"ctgTipoDocumento.ctgCatalogoNombre": ctgTipoDocumento.ctgTipoDocumentoNombre,
    				kycPersonaJuridicaId: EfxKYC.getKycPersonaJuridicaId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.form.setValues("kycRepresentanteLegalForm", action.result.kycRepresentanteLegal);
    				Efx.form.setEnable("kycRepresentanteLegalForm");
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    				Efx.utils.setVisible("kycRepresentanteLegalToolbarTop", true);
					Efx.utils.setVisible("kycRepresentanteLegalToolbarBottom", true);
					Ext.WindowMgr.get("kycRepresentanteLegalWindow").close();
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		saveKycRepresentanteLegal: function(){
			Efx.message.progress(Efx.constants.SAVING);
			Ext.getCmp("kycRepresentanteLegalForm").getForm().submit({
				url: Efx.constants.CONTEXT_PATH + "/kycRepresentanteLegal/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			params: {
    				"kycRepresentanteLegal.kycPersonaJuridica.kyc.kycId": EfxKYC.getKycId(),
    				"kycRepresentanteLegal.kycPersonaJuridica.kycPersonaJuridicaId": EfxKYC.getKycPersonaJuridicaId()
    			},
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
    			},
    			failure: Efx.form.failureProcedure
			});
		},
		init: function(config){
			var kycRepresentanteLegal = config.currentObject;
			var kycAlertas = EfxKYC.getKycAlertas();
			var configToReturn = {};
			configToReturn.items = [];
			configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
			if(kycAlertas) configToReturn.items.push(kycAlertas);
			KycFirmantes.setCtgTipoDocumentos(config.ctgWindowTipoDocumentos || []);
			configToReturn.items.push({
				xtype: "form",
				flex: 1,
				id: "kycRepresentanteLegalForm",
				title: "REPRESENTANTE LEGAL",
				autoScroll: true,
				listeners: {
					render: function(){
						if(kycRepresentanteLegal &&
								!Ext.isEmpty(kycRepresentanteLegal.kycRepresentanteLegalId) != null &&
								kycRepresentanteLegal.kycRepresentanteLegalId > 0 && this.getForm()){
							this.getForm().setValues(kycRepresentanteLegal);
							if(EfxKYC.getKycVigente() === false)
								Efx.form.setDisable("kycRepresentanteLegalForm");
						}
						if(!kycRepresentanteLegal || kycRepresentanteLegal.kycRepresentanteLegalConsultado != "1"){
							Efx.form.setDisable("kycRepresentanteLegalForm");
							KycFirmantes.showBusquedaRepresentanteLegal();
							Efx.utils.setVisible("kycRepresentanteLegalToolbarTop", false);
							Efx.utils.setVisible("kycRepresentanteLegalToolbarBottom", false);
						}
					}
				},
				dockedItems:[
		             {
		            	 xtype: "toolbar",
		            	 id: "kycRepresentanteLegalToolbarTop",
		            	 dock: "top",
		            	 hidden: EfxKYC.getKycVigente() === false,
		            	 items: [
							"->",
							{
								 text: "Guardar",
								 iconCls: Efx.constants.icons.SAVE_ICON,
								 handler: KycFirmantes.saveKycRepresentanteLegal
							}
            	         ]
		             },{
		            	 xtype: "toolbar",
		            	 id: "kycRepresentanteLegalToolbarBottom",
		            	 dock: "bottom",
		            	 hidden: EfxKYC.getKycVigente() === false,
		            	 items: [
							"->",
							{
								 text: "Guardar",
								 iconCls: Efx.constants.icons.SAVE_ICON,
								 handler: KycFirmantes.saveKycRepresentanteLegal
							}
            	         ]
		             }
	            ],
				layout: {
					type: "table",
					columns: 6,
					tableAttrs: {
			            style: {width: "730px", "margin-top": "5px", "margin-bottom": "40px"},
			            align: "center"
			        }
				},
				defaults: Efx.utils.defaults({width: 230, colspan: 2}),
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
						text: "DATOS GENERALES",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					/**inclusion**/
					{xtype: "label", text: "Tipo de Inclusi\u00f3n", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "combo",
						id: "ctgInclusionId",
						name: "kycRepresentanteLegal.ctgTipoDocumento.ctgCatalogoId",
						readOnly: true,
//						disabled: true,
						store: new Ext.data.SimpleStore({
							data: config.ctgTipoDocumentos || [],
							fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre", "ctgTipoDocumentoPadre", "ctgTipoDocumentoHijo"]
						}),
						displayField: "ctgTipoDocumentoNombre",
						valueField: "ctgTipoDocumentoId",
						allowBlank: false,
						colspan : 6
					},
					{xtype: "label", text: "Primer Nombre", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Segundo Nombre", cls: "x-form-item label_spacing", colspan: 4},
					{
						xtype: "textfield",
						id: "kycRepresentanteLegalPrimerNombre",
						name: "kycRepresentanteLegal.kycRepresentanteLegalPrimerNombre",
						disabled: true,
						submitOnDisable: true,
						allowEnable: false,
						allowBlank: false,
						maxLength: 20
					},{
						xtype: "textfield",
						id: "kycRepresentanteLegalSegundoNombre",
						name: "kycRepresentanteLegal.kycRepresentanteLegalSegundoNombre",
						disabled: true,
						submitOnDisable: true,
						allowEnable: false,
						maxLength: 20,
						colspan: 4
					},
					{xtype: "label", text: "Primer Apellido ", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Segundo Apellido", cls: "x-form-item label_spacing", colspan: 4},
					{
						xtype: "textfield",
						id: "kycRepresentanteLegalPrimerApellido",
						name: "kycRepresentanteLegal.kycRepresentanteLegalPrimerApellido",
						disabled: true,
						submitOnDisable: true,
						allowEnable: false,
						allowBlank: false,
						maxLength: 20
					},{
						xtype: "textfield",
						id: "kycRepresentanteLegalSegundoApellido",
						name: "kycRepresentanteLegal.kycRepresentanteLegalSegundoApellido",
						disabled: true,
						submitOnDisable: true,
						allowEnable: false,
						maxLength: 20,
						colspan: 4
					},
					{xtype: "label", text: "Tipo de Identificaci\u00F3n", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "N\u00FAmero de Identificaci\u00F3n", cls: "x-form-item label_spacing", colspan: 4},
					{
						xtype: "combo",
						id: "ctgTipoDocumentoId",
						name: "kycRepresentanteLegal.ctgTipoDocumento.ctgCatalogoId",
						readOnly: true,
//						disabled: true,
						store: new Ext.data.SimpleStore({
							data: config.ctgTipoDocumentos || [],
							fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre", "ctgTipoDocumentoPadre", "ctgTipoDocumentoHijo"]
						}),
						displayField: "ctgTipoDocumentoNombre",
						valueField: "ctgTipoDocumentoId",
						allowBlank: false
					},{
						xtype: "textfield",
						id: "kycRepresentanteLegalDocumento1",
						name: "kycRepresentanteLegal.kycRepresentanteLegalDocumento1",
						blankText: "Debe ingresar al menos un documento",
						allowBlank: false,
						disabled: true,
						submitOnDisable: true,
						allowEnable: false,
						maxLength: 20,
						colspan: 4
					},
					{xtype: "label", text: "Nacionalidad", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Lugar de Nacimiento", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Fecha Nacimiento", cls: "x-form-item label_spacing"},
					{
						xtype: "combo",
						id: "ctgNacionalidadId",
						name: "kycRepresentanteLegal.ctgNacionalidad.ctgPaisId",
						store: new Ext.data.SimpleStore({
							data: config.ctgNacionalidades || [],
							fields: ["ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre"]
						}),
						displayField: "ctgPaisNacionalidad",
						valueField: "ctgPaisId",
						allowBlank: false,
						value: Efx.constants.codes.COSTA_RICA
					},{
						xtype: "textfield",
						id: "kycRepresentanteLegalLugarNacimiento",
						name: "kycRepresentanteLegal.kycRepresentanteLegalLugarNacimiento",
						maxLength: 100
					},{
						xtype: "datefield",
						id: "kycRepresentanteLegalFechaNacimiento",
						name: "kycRepresentanteLegal.kycRepresentanteLegalFechaNacimiento",
						disabled: true,
						submitOnDisable: true,
						allowEnable: false,
						submitFormat: "Ymd",
						maxValue: new Date(),
						allowBlank: false
					},
					{xtype: "label", text: "G\u00E9nero", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Profesi\u00f3n/Ocupaci\u00f3n", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "combo",
						id: "ctgGeneroId",
						name: "kycRepresentanteLegal.ctgGenero.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgGeneros || [],
							fields: ["ctgGeneroId", "ctgGeneroNombre"]
						}),
						displayField: "ctgGeneroNombre",
						valueField: "ctgGeneroId",
						allowBlank: false,
					},{
						xtype: "combo",
						id: "ctgProfesionId",
						name: "kycRepresentanteLegal.ctgGenero.ctgCatalogoId",
						store: new Ext.data.SimpleStore({
							data: config.ctgGeneros || [],
							fields: ["ctgGeneroId", "ctgGeneroNombre"]
						}),
						displayField: "ctgGeneroNombre",
						valueField: "ctgGeneroId",
						allowBlank: false,
						colspan: 6
					},
					{
						xtype: "label",
						text: "DATOS DOMICILIO",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},
					{xtype: "label", text: "Pa\u00EDs", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "combo",
						id: "ctgPaisDireccionId",
						name: "kycRepresentanteLegal.ctgPaisDireccion.ctgPaisId",
						store: new Ext.data.SimpleStore({
							data: config.ctgPaises || [],
							fields: ["ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre"]
						}),
						displayField: "ctgPaisNombre",
						valueField: "ctgPaisId",
						allowBlank: false,
						colspan: 6,
						value: Efx.constants.codes.COSTA_RICA,
						listeners: {
							change: function(){
								var disable = this.getValue() != Efx.constants.codes.COSTA_RICA;
								Efx.utils.setDisabled("ctgProvinciaId", disable, true);
								Efx.utils.setDisabled("ctgCantonId", disable, true);
								Efx.utils.setDisabled("ctgDistritoId", disable, true);
								Efx.combos.setRequiredAndValidate("ctgProvinciaId", !disable);
								Efx.combos.setRequiredAndValidate("ctgCantonId", !disable);
								Efx.combos.setRequiredAndValidate("ctgDistritoId", !disable);
							}
						}
					},
					{xtype: "label", text: "Provincia", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Cant\u00F3n", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Distrito", cls: "x-form-item label_spacing"},
					{
						xtype: "combo",
						id: "ctgProvinciaId",
						name: "kycRepresentanteLegal.ctgProvincia.ctgProvinciaId",
						store: new Ext.data.SimpleStore({
							data: config.ctgProvincias || [],
							fields: ["ctgProvinciaId", "ctgProvinciaNombre"]
						}),
						displayField: "ctgProvinciaNombre",
						valueField: "ctgProvinciaId",
						allowBlank: false,
						listeners: {
							change: function(){
								Efx.combos.loadData("ctgCantonId", Efx.combos.getAllCantonesByProvinciaCombo(this.getValue(), config.ctgCantones));
								Efx.combos.removeAll("ctgDistritoId" ,true);
							}
						}
					},{
						xtype: "combo",
						id: "ctgCantonId",
						name: "kycRepresentanteLegal.ctgCanton.ctgCantonId",
						store: new Ext.data.SimpleStore({
							data: [],
							fields: ["ctgCantonId", "ctgCantonNombre", "ctgProvinciaId"]
						}),
						displayField: "ctgCantonNombre",
						valueField: "ctgCantonId",
						allowBlank: false,
						listeners: {
							change: function(){
								Efx.combos.loadData("ctgDistritoId", Efx.combos.getAllDistritosByCantonCombo(this.getValue(), config.ctgDistritos));
							}
						}
					},{
						xtype: "combo",
						id: "ctgDistritoId",
						name: "kycRepresentanteLegal.ctgDistrito.ctgDistritoId",
						store: new Ext.data.SimpleStore({
							data: [],
							fields: ["ctgDistritoId", "ctgDistritoNombre", "ctgCantonId"]
						}),
						displayField: "ctgDistritoNombre",
						valueField: "ctgDistritoId",
						allowBlank: false
					},
					{xtype: "label", text: "Otras Se\u00f1as", cls: "x-form-item label_spacing", colspan: 6},
					{
						xtype: "textarea",
						id: "kycRepresentanteLegalDireccion",
						name: "kycRepresentanteLegal.kycRepresentanteLegalDireccion",
						maxLength: 250,
						colspan: 6,
						height: 40,
						width: 715,
						allowBlank: false
					},
					{xtype: "label", text: "Tel\u00E9fono Residencia", cls: "x-form-item label_spacing"},
//					{xtype: "label", text: "Tel\u00E9fono Celular", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Fax", cls: "x-form-item label_spacing", colspan : 6},
					{
						xtype: "textfield",
						id: "kycRepresentanteLegalTelefono1",
						name: "kycRepresentanteLegal.kycRepresentanteLegalTelefono1",
						blankText: "Debe ingresar al menos un tel\u00E9fono",
						allowBlank: false,
						listeners: {
							change: function(){
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono1"))&&
									Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono2")) &&
									Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono3"));
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono1", isEmpty);
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono2", isEmpty);
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono3", isEmpty);
							}
						},
						maxLength: 20
					},{
						xtype: "textfield",
						id: "kycRepresentanteLegalTelefono2",
						name: "kycRepresentanteLegal.kycRepresentanteLegalTelefono2",
						blankText: "Debe ingresar al menos un tel\u00E9fono",
						listeners: {
							change: function(){
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono1"))&&
									Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono2")) &&
									Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono3"));
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono1", isEmpty);
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono2", isEmpty);
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono3", isEmpty);
							}
						},
						maxLength: 20,
						colspan : 6
					},/**{
						xtype: "textfield",
						id: "kycRepresentanteLegalTelefono3",
						name: "kycRepresentanteLegal.kycRepresentanteLegalTelefono3",
						blankText: "Debe ingresar al menos un tel\u00E9fono",
						listeners: {
							change: function(){
								var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono1"))&&
									Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono2")) &&
									Ext.isEmpty(Efx.utils.getValue("kycRepresentanteLegalTelefono3"));
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono1", isEmpty);
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono2", isEmpty);
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalTelefono3", isEmpty);
							}
						},
						maxLength: 20
					}**/
//					{xtype: "label", text: "Apartado Postal", cls: "x-form-item label_spacing"},
					{xtype: "label", text: "Correo Electronico", cls: "x-form-item label_spacing", colspan: 6},
					/**{
						xtype: "textfield",
						id: "kycRepresentanteLegalApartadoPostal",
						name: "kycRepresentanteLegal.kycRepresentanteLegalApartadoPostal",
						maxLength: 20
					},**/{
						xtype: "textfield",
						id: "kycRepresentanteLegalCorreoElectronico",
						name: "kycRepresentanteLegal.kycRepresentanteLegalCorreoElectronico",
						fieldCls: "remove-uppercase",
						maxLength: 250,
						colspan: 6,
						vtype: "email",
						width: 475
					},
					{xtype: "label", text: "Cargo o Relaci\u00F3n", cls: "x-form-item label_spacing", colspan : 6},
					{
						xtype: "textfield",
						id: "kycRepresentanteLegalPepCargo",
						name: "kycRepresentanteLegal.kycRepresentanteLegalPepCargo",
						maxLength: 50,
						colspan : 6
					},
					/**manejo de fondos**/
					{
						xtype: "label",
						text: "MANEJA FONDOS DE TERCEROS",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},{
						xtype: "label",
						text: "Maneja fondos de terceros (socios, inversionistas, otros)",
						cls: "x-form-item label_spacing",
						width: 715,
						colspan: 6
					},{
						xtype: "combo",
						id: "kycRepresentanteLegalFondosTerceros",
						name: "kycRepresentanteLegal.kycRepresentanteLegalFondosTerceros",
						store: new Ext.data.SimpleStore({
							data: Efx.combos.yesnoArray() || [],
							fields: ["id", "descripcion"]
						}),
						displayField: "descripcion",
						colspan: 6,
						allowBlank: false,
						valueField: "id"
					},{
						xtype: "label",
						text: "POL\u00CDTICAMENTE EXPUESTO",
						cls: "x-form-item label_header",
						colspan: 6,
						width: 730
					},{
						xtype: "label",
						text: "Cumple o ha cumplito funciones p\u00FAblicas o pol\u00EDticas destacadas, ya sea en el territorio nacional o en el extranjero",
						cls: "x-form-item label_spacing",
						width: 715,
						colspan: 6
					},{
						xtype: "combo",
						id: "kycRepresentanteLegalPep",
						name: "kycRepresentanteLegal.kycRepresentanteLegalPep",
						store: new Ext.data.SimpleStore({
							data: Efx.combos.yesnoArray() || [],
							fields: ["id", "descripcion"]
						}),
						displayField: "descripcion",
						valueField: "id",
						/**listeners: {
							change: function(){
								var disable = this.getValue() != "1";
								Efx.utils.setDisabled("kycRepresentanteLegalPepCargo", disable, true);
								Efx.utils.setDisabled("ctgPaisPepId", disable, true);
								Efx.utils.setDisabled("kycRepresentanteLegalPepFechaInicio", disable, true);
								Efx.utils.setDisabled("kycRepresentanteLegalPepFechaFin", disable, true);
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalPepCargo", !disable);
								Efx.combos.setRequiredAndValidate("ctgPaisPepId", !disable);
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalPepFechaInicio", !disable);
								Efx.utils.setRequiredAndValidate("kycRepresentanteLegalPepFechaFin", !disable);
							}
						},**/
						allowBlank: false,
						colspan: 6
					},
//					{xtype: "label", text: "Pa\u00EDs", cls: "x-form-item label_spacing"},
//					{xtype: "label", text: "Desde", cls: "x-form-item label_spacing", width: 115, colspan: 1},
//					{xtype: "label", text: "Hasta", cls: "x-form-item label_spacing", width: 110},
					/**{
						xtype: "combo",
						id: "ctgPaisPepId",
						name: "kycRepresentanteLegal.ctgPaisPep.ctgPaisId",
						store: new Ext.data.SimpleStore({
							data: config.ctgPaisesPep || [],
							fields: ["ctgPaisId", "ctgPaisNacionalidad", "ctgPaisNombre"]
						}),
						displayField: "ctgPaisNombre",
						valueField: "ctgPaisId",
						value: Efx.constants.codes.COSTA_RICA
					},{
						xtype: "datefield",
						id: "kycRepresentanteLegalPepFechaInicio",
						name: "kycRepresentanteLegal.kycRepresentanteLegalPepFechaInicio",
						submitFormat: "Ymd",
						width: 115,
						maxValue: new Date(),
						colspan: 1
					},{
						xtype: "datefield",
						id: "kycRepresentanteLegalPepFechaFin",
						name: "kycRepresentanteLegal.kycRepresentanteLegalPepFechaFin",
						submitFormat: "Ymd",
						width: 110,
						maxValue: new Date(),
						colspan: 1
					},**/{
						xtype: "hidden",
						id: "kycRepresentanteLegalId",
						name: "kycRepresentanteLegal.kycRepresentanteLegalId"
					},{
						xtype: "hidden",
						id: "kycRepresentanteLegalConsultado",
						name: "kycRepresentanteLegal.kycRepresentanteLegalConsultado"
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
            });
			return configToReturn;
		}
	};
}();