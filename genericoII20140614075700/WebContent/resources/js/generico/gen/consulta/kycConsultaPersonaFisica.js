KycConsultaPersonaFisica = function(){
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
			if(KycConsultaPersonaFisica.validarBusqueda()){
				var store = Ext.getCmp("gridConsulta").getStore();
				store.currentPage = 1;
				store.load({
				    callback: function (records, operation, success) {
				    	KycConsultaPersonaFisica.setLastParamsSearch(operation.params);
				    }
				});
				EfxKYC.setKycId();
			}
		},
		exportarExcel: function(){
			if(Ext.getCmp("gridConsulta").getStore().getCount() > 0){
				Ext.get(Ext.getBody()).createChild({tag: "iframe", id: "exportframe", name: "exportframe", style:"display:none"});
				var form = Ext.get(Ext.getBody()).createChild({tag: "form", method: "post", id: "exportform", target: "exportframe"});
				Ext.iterate(KycConsultaPersonaFisica.getLastParamsSearch(), function(name, value){
					form.createChild({tag: "input", type: "hidden", name: name, value: value});
				});
				form.dom.setAttribute("action", Efx.constants.CONTEXT_PATH + "/consulta/export");
				form.dom.submit();
			}
		},
		init: function(paramsJsp){
			var config = {};
			Ext.define("kycBusquedaPersonaFisicaModel", {
				extend: "Ext.data.Model",
				fields: [
					"KYC_TIPO_CODIGO",
					"KYC_TIPO",
					"KYC_ID",
					"KYC_PFIS_ID",
					"KYC_PFIS_NOMBRE_COMPLETO",
					"KYC_PFIS_DOCUMENTO1",
					"CTG_TDOC_CODIGO",
					"CTG_TDOC_NOMBRE",
					"KYC_PFIS_FECHA_NACIMIENTO",
					"CTG_PAIS_NACIONALIDAD",
					"KYC_FECHA_CREACION",
					"KYC_FECHA_ACTUALIZACION",
					"CTG_SUC_NOMBRE",
					"KYC_VIGENTE",
					"KYC_ORDEN",
					"SGD_USU_NOMBRE_COMPLETO"
				]
			});

			var kycBusquedaPersonaFisicaStore = Ext.create("Ext.data.Store", {
				autoLoad: false,
				pageSize: EfxKYC.getLimit(),
				model: "kycBusquedaPersonaFisicaModel",
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
							columns: 8,
							tableAttrs: {
								style: {width: "800px"},
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
							{xtype: "label", text: "Nombre Completo:", cls: "x-form-item label_spacing", colspan: 4},
							{xtype: "label", text: "Primer Apellido:", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Segundo Apellido:", cls: "x-form-item label_spacing"},
							{
								xtype: "textfield",
								id: "kycPersonaFisicaPrimerNombre",
								name: "kycParametro.kycPersonaFisicaPrimerNombre",
								maxLength: 50,
								colspan:4,
								width: 390
							},
							{
								xtype: "textfield",
								id: "kycPersonaFisicaPrimerApellido",
								name: "kycParametro.kycPersonaFisicaPrimerApellido",
								maxLength: 20
							},
							{
								xtype: "textfield",
								id: "kycPersonaFisicaSegundoApellido",
								name: "kycParametro.kycPersonaFisicaSegundoApellido",
								maxLength: 20
							},
							{xtype: "label", text: "Tipo de Documento", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "N\u00famero de Documento", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Fecha de Inicio:", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Fecha de Fin:", cls: "x-form-item label_spacing"},
												{
								xtype: "combo",
								id: "ctgTipoDocumentoId",
								name: "kycParametro.ctgTipoDocumentoId",
								store: new Ext.data.SimpleStore({
									data: paramsJsp.ctgTipoDocumentos,
									fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre", "ctgTipoDocumentoPadre", "ctgTipoDocumentoHijo"]
								}),
								displayField: "ctgTipoDocumentoNombre",
								valueField: "ctgTipoDocumentoId",
								typeAhead: true,
								minChars: 1,
								queryMode: "local",
								forceSelection: true,
								selectOnFocus: true,
								triggerAction: "all"
							},
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
							{xtype: "label", text: "", cls: "x-form-item label_spacing"},
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
							{xtype: "hidden", name: "kycParametro.ctgTipoPersonaCodigo", value: Efx.constants.codes.PERSONA_FISICA}
						],
						bbar: [
							"->",
							{
								id: "busquedaBtn",
								iconCls:Efx.constants.BUSCAR_ICON,
								text: "Buscar",
								handler: function(){
									KycConsultaPersonaFisica.buscarDatos();
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
						store: kycBusquedaPersonaFisicaStore,
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
							{dataIndex: "KYC_PFIS_NOMBRE_COMPLETO", header: "Nombre Completo", flex: 1, minWidth: 200},
							{dataIndex: "CTG_TDOC_NOMBRE", header: "Tipo de Identificaci\u00F3n", width: 120},
							{dataIndex: "KYC_PFIS_DOCUMENTO1", header: "Identificaci\u00F3n", width: 100},
							{dataIndex: "KYC_PFIS_FECHA_NACIMIENTO", header: "Fecha Nacimiento", width: 100},
							{dataIndex: "CTG_PAIS_NACIONALIDAD", header: "Nacionalidad", width: 120},
							{dataIndex: "KYC_FECHA_CREACION", header: "Fecha Creaci\u00F3n", width: 100},
							{dataIndex: "KYC_FECHA_ACTUALIZACION", header: "Fecha Actualizaci\u00F3n", width: 110},
							{dataIndex: "CTG_SUC_NOMBRE", header: "Origen KYC", flex: 1, minWidth: 350},
							{dataIndex: "SGD_USU_NOMBRE_COMPLETO", header: "Usuario Actualizaci\u00F3n", flex: 1, minWidth: 250}
						],
						features: [{
							ftype: "grouping",
							enableNoGroups: false,
							groupHeaderTpl: '{name} -> {rows.length} KYC{[values.rows.length > 1 ? "\'s" : ""]}'
						}],
						listeners: {
							itemclick: function(view, record){
							},
							selectionchange: function(grid, selections, options){
								if(selections == null || selections.length < 1 || selections[0] == null) return;
								EfxKYC.setKycId(selections[0].get("KYC_ID"));
								EfxKYC.setKycPersonaFisicaId(selections[0].get("KYC_PFIS_ID"));
								EfxKYC.setKycTipoCodigo(selections[0].get("KYC_TIPO_CODIGO"));
								EfxKYC.setKycPersonaDocumento1(selections[0].get("KYC_PFIS_DOCUMENTO1"));
								EfxKYC.setCtgTipoDocumentoCodigo(selections[0].get("CTG_TDOC_CODIGO"));
								EfxKYC.setCtgTipoDocumentoNombre(selections[0].get("CTG_TDOC_NOMBRE"));
								EfxKYC.setKycVigente(selections[0].get("KYC_VIGENTE"));
								EfxKYC.setKycPersonaNombreCompleto(selections[0].get("KYC_PFIS_NOMBRE_COMPLETO"));
								EfxKYC.setKycFechaActualizacion(selections[0].get("KYC_FECHA_ACTUALIZACION"));
							}
						},
						dockedItems: [{
							xtype: "pagingtoolbar",
							store: kycBusquedaPersonaFisicaStore,
							dock: "bottom",
							displayInfo: true,
							items: [
						        {
									id: "exportarXlsBtn",
									iconCls:Efx.constants.XLS_ICON,
									tooltip: "Exportar a Excel",
									handler: function(){
										KycConsultaPersonaFisica.exportarExcel();
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
