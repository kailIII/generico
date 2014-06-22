KycBusquedaPersonaJuridica = function(){
	return {
		saveFromBureau: function(){
			Efx.message.progress("Guardando KYC...");
			if(Ext.isEmpty(EfxKYC.getKycPersonaDocumento1())){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycPersonaJuridica/saveFromBureau",
				params: {kycPersonaJuridicaDocumento1: EfxKYC.getKycPersonaDocumento1()},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						if(jsonObject && jsonObject.success){
							EfxKYC.setKycId(jsonObject.kycId);
							EfxKYC.setKycPersonaJuridicaId(jsonObject.kycPersonaJuridicaId);
							Efx.message.confirmProcess(jsonObject.message, function(){
								EfxMenu.openSelfWindow(
									"kycPersonaJuridica/view",
									{
										kycId: EfxKYC.getKycId(),
										kycPersonaJuridicaId: EfxKYC.getKycPersonaJuridicaId()
									}
								);
								Efx.message.progress("Obteniendo Informaci\u00F3n...");
							});
						}else
							Efx.message.alertInvalid(jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE);
					}else Efx.message.alertInvalid(Efx.constants.DEFAULT_ERROR_MESSAGE);
				}
			});
		},
		saveFromKyc: function(){
			Efx.message.progress("Guardando KYC...");
			if(Ext.isEmpty(EfxKYC.getKycPersonaJuridicaId()) || Ext.isEmpty(EfxKYC.getKycId())){
				Efx.message.alertInvalid(Efx.constants.REGISTRO_NO_SELECCIONADO);
				return;
			}
			if("1" != EfxKYC.getKycVigente()){
				Efx.message.alertInvalid("No se puede generar un KYC a partir de un registro no vigente");
				return;
			}
			Ext.Ajax.request({
				timeout: Efx.constants.TIMEOUT_SECONDS,
				url: Efx.constants.CONTEXT_PATH + "/kycPersonaJuridica/saveFromKyc",
				params: {
					kycPersonaJuridicaId: EfxKYC.getKycPersonaJuridicaId(),
					kycId: EfxKYC.getKycId()
				},
				callback: function(options, success, response){
					Ext.Msg.hide();
					if(success){
						var jsonObject = Efx.utils.ajaxRequestGetJson(response);
						if(jsonObject && jsonObject.success){
							EfxKYC.setKycId(jsonObject.kycId);
							EfxKYC.setKycPersonaJuridicaId(jsonObject.kycPersonaJuridicaId);
							Efx.message.confirmProcess(jsonObject.message, function(){
								EfxMenu.openSelfWindow(
									"kycPersonaJuridica/view",
									{
										kycId: EfxKYC.getKycId(),
										kycPersonaJuridicaId: EfxKYC.getKycPersonaJuridicaId()
									}
								);
								Efx.message.progress("Obteniendo Informaci\u00F3n...");
							});
						}else
							Efx.message.alertInvalid(jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE);
					}else Efx.message.alertInvalid(Efx.constants.DEFAULT_ERROR_MESSAGE);
				}
			});
		},
		buscar: function(){
			if(Ext.isEmpty(Efx.utils.getValue("kycDocumento1")) && Ext.isEmpty(Efx.utils.getValue("kycDocumento2"))){
					Efx.message.alertInvalidFields("Debe ingresar al menos un documento");
					return;
			}
			var store = Ext.getCmp("kycBusquedaPersonaJuridicaGrid").getStore();
			EfxKYC.setKycId(null);
    		EfxKYC.setKycPersonaJuridicaId(null);
    		EfxKYC.setKycTipoCodigo("");
    		EfxKYC.setKycPersonaDocumento1(null);
    		EfxKYC.setKycVigente(null);
    		EfxKYC.setKycPersonaNombreCompleto(null);
    		EfxKYC.setKycFechaActualizacion(null);
			store.currentPage = 1;
			store.load();
		},
		init: function(){
			var config = {};
			Efx.message.addBottons([{id: "bureau", text: "Nuevo desde Bureau"}]);
			Efx.constants.YESNOBUREAU = 22;
			config.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
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
			        url: Efx.constants.CONTEXT_PATH + "/kycPersonaJuridica/findByParameter",
			        timeout: Efx.constants.TIMEOUT_SECONDS,
			        reader: {
			        	type: "json",
			        	root: "kycs",
			        	totalProperty: "totalResult"
	        		}
			    },
			    listeners: {
			    	beforeload: function(store, operation, options){
			    		if(!operation) operation = {};
			    		if(!operation.params) operation.params = {};
			    		if(Ext.isEmpty(Efx.utils.getValue("kycDocumento1"))){
			    			Efx.message.alertInvalid("* C\u00E9dula");
			    			return false;
			    		}
			    		operation.params["kycParametro.kycDocumento1"] = Efx.utils.getValue("kycDocumento1");
			    	}
			    },
			    groupers: [{property: "KYC_TIPO"}],
			    sorters: [{property: "KYC_ORDEN", direction: "DESC"}]
			});
			config.items = [
                {
					xtype: "grid",
					flex: 1,
					id: "kycBusquedaPersonaJuridicaGrid",
					store: kycBusquedaPersonaJuridicaStore,
					columns: [
					    {
					    	dataIndex: "KYC_VIGENTE",
					    	width: 40,
					    	align: "center",
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
						{dataIndex: "COMPLETA", header: "", width: 70, align: "center", renderer : completaRenderer},
						{dataIndex: "KYC_PJUR_RAZON_SOCIAL", header: "Raz\u00F3n Social", flex: 1, minWidth: 200},
						{dataIndex: "KYC_PJUR_DOCUMENTO1", header: "C\u00E9dula", width: 90},
						{dataIndex: "KYC_PJUR_FECHA_CONSTITUCION", header: "Fecha de Constituci\u00F3n", width: 120},
						{dataIndex: "KYC_FECHA_CREACION", header: "Fecha Creaci\u00F3n", width: 100},
						{dataIndex: "KYC_FECHA_ACTUALIZACION", header: "Fecha Actualizaci\u00F3n", width: 110},
						{dataIndex: "CTG_SUC_NOMBRE", header: "Origen KYC", flex: 1, minWidth: 250},
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
		                displayInfo: true
		            },{
		            	xtype: "toolbar",
		            	dock: "top",
		            	enableOverflow: true,
		            	items: [
	            	        "C\u00E9dula:",
	            	        {
	            	        	xtype: "textfield",
	            	        	id: "kycDocumento1",
	            	        	selectOnFocus: true
	            	        },{
	            	        	text: "Buscar",
	            	        	iconCls: Efx.constants.icons.BUSCAR_ICON,
	            	        	handler: KycBusquedaPersonaJuridica.buscar
	            	        }
            	        ]
		            }]
				}
            ];
			return config;
		}
	};
}();