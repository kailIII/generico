KycConsultaPersonaJuridica = function(){
	var lastParamsSearch = {};
	return {
		getLastParamsSearch: function(){
			return lastParamsSearch;
		},
		setLastParamsSearch: function(value){
			lastParamsSearch = value;
		},

		validarBusqueda: function(){
			var valid = false;
			Ext.each(Ext.ComponentQuery.query("form field"), function(){
				if(!Ext.isEmpty(this.getValue()) && this.xtype != 'hidden') valid = true;
			});
			if(!valid)Efx.message.alertInvalid("Debe seleccionar al menos un filtro v\u00E1lido");
			else if(
				(!Ext.isEmpty(Ext.getCmp("kycFechaInicio").getValue()) || !Ext.isEmpty(Ext.getCmp("kycFechaFin").getValue())) &&
				(Ext.isEmpty(Ext.getCmp("kycFechaInicio").getValue()) || Ext.isEmpty(Ext.getCmp("kycFechaFin").getValue()))
			){
				Efx.message.alertInvalid("Debe seleccionar un rango de fecha v\u00E1lido");
				valid = false;
			}
			return valid;
		},
		buscarDatos: function(url, path){
			if(KycConsultaPersonaJuridica.validarBusqueda()){
				var store = Ext.getCmp("gridConsulta").getStore();
				store.currentPage = 1;
				store.load({
				    callback: function (records, operation, success) {
				    	KycConsultaPersonaJuridica.setLastParamsSearch(operation.params);
				    }
				});
				EfxKYC.setKycId();
			}
		},
		exportarExcel: function(){
			if(Ext.getCmp("gridConsulta").getStore().getCount() > 0){
				Ext.get(Ext.getBody()).createChild({tag: "iframe", id: "exportframe", name: "exportframe", style:"display:none"});
				var form = Ext.get(Ext.getBody()).createChild({tag: "form", method: "post", id: "exportform", target: "exportframe"});
				Ext.iterate(KycConsultaPersonaJuridica.getLastParamsSearch(), function(name, value){
					form.createChild({tag: "input", type: "hidden", name: name, value: value});
				});
				form.dom.setAttribute("action", Efx.constants.CONTEXT_PATH + "/consulta/export");
				form.dom.submit();
			}
		},
		init: function(){
			var config = {};
			Ext.define("kycBusquedaPersonaJuridicaModel", {
				extend: "Ext.data.Model",
			    fields: [
			        "KYC_TIPO_CODIGO",
			        "KYC_TIPO",
					"KYC_ID",
					"KYC_PJUR_ID",
					"KYC_PJUR_RAZON_SOCIAL",
					"KYC_PJUR_NOMBRE_COMERCIAL",
					"KYC_PJUR_DOCUMENTO1",
					"KYC_PJUR_FECHA_CONSTITUCION",
					"KYC_FECHA_CREACION",
					"KYC_FECHA_ACTUALIZACION",
					"CTG_SUC_NOMBRE",
					"KYC_VIGENTE",
					"KYC_ORDEN",
					"SGD_USU_NOMBRE_COMPLETO"
		        ]
			});

			var kycBusquedaPersonaJuridicaStore = Ext.create("Ext.data.Store", {
				autoLoad: false,
				pageSize: EfxKYC.getLimit(),
				model: "kycBusquedaPersonaJuridicaModel",
				proxy: {
					type: "ajax",
					url: Efx.constants.CONTEXT_PATH + "/consulta/findByParameter",
					timeout: Efx.constants.TIMEOUT_SECONDS,
					reader: {
						type: "json",
						root: "kycs",
						totalProperty: "totalResult"
					}
				},
				listeners: {
					beforeload: function(store, ope, opts){
						if(!ope) ope = {};
						if(!ope.params) ope.params = {};
						Ext.each(Ext.ComponentQuery.query("form field"), function(){
							if(this.xtype == "datefield") ope.params[this.getName()] = ((this.getValue())?Ext.Date.format(this.getValue(),"d/m/Y"):"");
							else ope.params[this.getName()] = this.getValue();
						});
					}
				}
			});
			config.items = {
				flex: 1,
				xtype: "panel",
				id: "panel",
				layout: {
					type: "vbox",
					align : "stretch",
					pack  : "start"
				},
				border: false,
				defaults: {width: 975, margins: "5 5 5 5"},
				items: [
					{
						xtype: "form",
						id: "formConsulta",
						title: "Par\u00E1metros de B\u00FAsqueda",
						collapsible:true,
						layout: {
							type: "table",
							columns: 6,
							tableAttrs: {
								style: {width: "600px"},
								align: "center"
							}
						},
						defaults: {
							width: 180,
							colspan: 2,
							selectOnFocus: true,
							enforceMaxLength: true,
							maxLength: 200,
							typeAhead: true,
							minChars: 1,
							queryMode: "local",
							triggerAction: "all",
							forceSelection: true
						},
						items:[
							{xtype: "label", text: "Razon Social:", cls: "x-form-item label_spacing", colspan: 4},
							{xtype: "label", text: "Nombre Comercial:", cls: "x-form-item label_spacing"},
							{
								xtype: "textfield",
								id: "kycPersonaJuridicaRazonSocial",
								name: "kycParametro.kycPersonaJuridicaRazonSocial",
								colspan: 4,
								width: 385,
								maxLength: 250
							},
							{
								id: "kycPersonaJuridicaNombreComercial",
								name: "kycParametro.kycPersonaJuridicaNombreComercial",
								xtype: "textfield",
								maxLength: 250
							},
							{xtype: "label", text: "N\u00famero de Documento", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Fecha de Inicio:", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Fecha de Fin:", cls: "x-form-item label_spacing"},
							{
								xtype: "textfield",
								id: "kycDocumento1",
								name: "kycParametro.kycDocumento1"
							},
							{
								xtype: "datefield",
								id: "kycFechaInicio",
								name: "kycParametro.kycFechaInicio",
								maxValue: new Date(),
								submitFormat: "d/m/Y"
							},
							{
								xtype: "datefield",
								id: "kycFechaFin",
								name: "kycParametro.kycFechaFin",
								maxValue: new Date(),
								submitFormat: "d/m/Y"
							},
							{xtype: "label", text: "Tipo de Sucursal:", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Subtipo de Sucursal:", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Sucursal:", cls: "x-form-item label_spacing"},
							{
								xtype : "combo",
								id : "ctgTipoSucursalId",
								name: "kycParametro.ctgTipoSucursalId",
								store : new Ext.data.SimpleStore({
									data : Efx.combos.getAllTipoSucursalGrid(),
									fields : ["ctgTipoSucursalId", "ctgTipoSucursalNombre", "ctgTipoSucursalActivo" ]
								}),
								displayField : "ctgTipoSucursalNombre",
								valueField : "ctgTipoSucursalId",
								triggerAction : "all",
								notificarPor : true,
								mode : "local",
								listeners : {
									change : function(field, value) {
										var cmbSubTipoSuc = Ext.getCmp("ctgSubTipoSucursalId");
										var cmbSuc = Ext.getCmp("ctgSucursalId");
										cmbSubTipoSuc.store.loadData(Efx.combos.getAllSubTipoSucursalByTipoSucursal(value));
										cmbSubTipoSuc.setValue("");
										cmbSuc.setValue("");
									}
								}
							},
							{
								xtype: "combo",
								id:"ctgSubTipoSucursalId",
								name: "kycParametro.ctgSubTipoSucursalId",
								store: new Ext.data.SimpleStore({
									autoLoad: false,
									data: Efx.combos.getAllSubTipoSucursalByTipoSucursal(0),
									fields: ["ctgSubTipoSucursalId", "ctgSubTipoSucursalNombre","ctgTipoSucursal","ctgSubTipoSucursalCodigo","ctgSubTipoSucursalUsuarioBureau","ctgSubTipoSucursalContrasenaBureau","ctgSubTipoSucursalActivo"]
								}),
								displayField: "ctgSubTipoSucursalNombre",
								valueField: "ctgSubTipoSucursalId",
								triggerAction: "all",
								notificarPor: true,
								mode: "local",
								listeners:{
									change: function(field, value){
										var cmbSuc = Ext.getCmp("ctgSucursalId");
										cmbSuc.store.loadData(Efx.combos.getAllSucursaleBySubTipoSucursal(value));
										cmbSuc.setValue("");
									}
								}
							},
							{
								xtype: "combo",
								id:"ctgSucursalId",
								name: "kycParametro.ctgSucursalId",
								store: new Ext.data.SimpleStore({
									autoLoad: false,
									data: Efx.combos.getAllSucursaleBySubTipoSucursal(0),
									fields: ["ctgSucursalId", "ctgSucursalNombre","ctgSubTipoSucursal","ctgSucursalActivo","ctgSucursalPoseeComiteCreditos","ctgSucursalAtiendeOtraSucursal"]
								}),
								displayField: "ctgSucursalNombre",
								valueField: "ctgSucursalId",
								triggerAction: "all",
								colspan: 6,
								notificarPor: true,
								mode: "local"
							},
							{xtype: "hidden", name: "kycParametro.ctgTipoPersonaCodigo", value: Efx.constants.codes.PERSONA_JURIDICA}
						],
						bbar: [
							"->",
							{
								id: "busquedaBtn",
								iconCls:Efx.constants.BUSCAR_ICON,
								text: "Buscar",
								handler: function(){
									KycConsultaPersonaJuridica.buscarDatos();
								}
							},{
								id: "limpiarBtn",
								iconCls:Efx.constants.BUSCAR_ICON,
								text: "Limpiar Filtros",
								handler: function(){
									Efx.form.clear("formConsulta");
									Ext.getCmp("gridConsulta").store.removeAll(false);
									EfxKYC.setKycId();
								}
							}
						]
					},
					{
						xtype: "grid",
						flex: 1,
						id: "gridConsulta",
						store: kycBusquedaPersonaJuridicaStore,
						columns: [
						    {
						    	dataIndex: "KYC_VIGENTE",
						    	width: 50,
						    	renderer: function(value){
						    		var icon = "";
						    		var title = "";
						    		if(value == "1"){
						    			icon = "bullet_green.png";
						    			title = "KYC VIGENTE";
						    		}else if(value == "0"){
						    			icon = "bullet_red.png";
						    			title = "KYC NO VIGENTE";
						    		}
						    		if(!Ext.isEmpty(icon)) return "<img src=\"" + Efx.constants.CONTEXT_PATH + "/resources/images/" + icon + "\" data-qtip=\"" + title + "\" />";
						    		return "";
						    	}
						    },
						    {dataIndex: "KYC_PJUR_RAZON_SOCIAL", header: "Raz\u00F3n Social", flex: 1, minWidth: 200},
							{dataIndex: "KYC_PJUR_DOCUMENTO1", header: "C\u00E9dula", width: 100},
							{dataIndex: "KYC_PJUR_FECHA_CONSTITUCION", header: "Fecha de Constituci\u00F3n", width: 120},
							{dataIndex: "KYC_FECHA_CREACION", header: "Fecha Creaci\u00F3n", width: 100},
							{dataIndex: "KYC_FECHA_ACTUALIZACION", header: "Fecha Actualizaci\u00F3n", width: 110},
							{dataIndex: "CTG_SUC_NOMBRE", header: "Origen KYC", flex: 1, minWidth: 350},
							{dataIndex: "SGD_USU_NOMBRE_COMPLETO", header: "Usuario Actualizaci\u00F3n", flex:1,  minWidth: 250}
			            ],
			            features: [
				           {
				        	   ftype: "grouping",
				        	   enableNoGroups: false,
				        	   groupHeaderTpl: '{name} -> {rows.length} KYC{[values.rows.length > 1 ? "\'s" : ""]}'
				           }
			            ],
			            listeners: {
			            	itemclick: function(view, record){
			            	},
			            	selectionchange: function(grid, selections, options){
			            		if(selections == null || selections.length < 1 || selections[0] == null) return;
			            		EfxKYC.setKycId(selections[0].get("KYC_ID"));
			            		EfxKYC.setKycPersonaJuridicaId(selections[0].get("KYC_PJUR_ID"));
			            		EfxKYC.setKycTipoCodigo(selections[0].get("KYC_TIPO_CODIGO"));
			            		EfxKYC.setKycPersonaDocumento1(selections[0].get("KYC_PJUR_DOCUMENTO1"));
			            		EfxKYC.setKycVigente(selections[0].get("KYC_VIGENTE"));
			            		EfxKYC.setKycPersonaNombreCompleto(selections[0].get("KYC_PJUR_RAZON_SOCIAL"));
			            		EfxKYC.setKycFechaActualizacion(selections[0].get("KYC_FECHA_ACTUALIZACION"));
			            	}
			            },
						dockedItems: [{
							xtype: "pagingtoolbar",
							store: kycBusquedaPersonaJuridicaStore,
							dock: "bottom",
							displayInfo: true,
							items: [
						        {
									id: "exportarXlsBtn",
									iconCls:Efx.constants.XLS_ICON,
									tooltip: "Exportar a Excel",
									handler: function(){
										KycConsultaPersonaJuridica.exportarExcel();
									}
								}
							]
						}]
					}
				]
			};
			return config;
		}
	};
}();
