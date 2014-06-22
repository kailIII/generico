
EfxKYC = function(){
	var limit = null;
	var ctgTipoPersonaCodigo = "";
	var kycVentanaId = null;
	var kycId = null;
	var kycPersonaFisicaId = null;
	var kycProductoId = null;
	var kycPaqueteId = null;
	var kycPersonaJuridicaId = null;
	var kycTipoCodigo = "";
	var kycPersonaDocumento1 = "";
	var ctgTipoDocumentoId = "";
	var ctgTipoDocumentoCodigo = "";
	var ctgTipoDocumentoNombre = "";
	var kycVigente = "";
	var kycPersonaFisicaNombreCompleto = "";
	var kycFechaActualizacion = "";
	var kycReporte = null;
	var kycVerifica = "";
	var kycMostrarCobis = null;

	return {
		getLimit: function(){return limit;},
		setLimit: function(value){limit = value;},
		getCtgTipoPersonaCodigo: function(){return ctgTipoPersonaCodigo;},
		setCtgTipoPersonaCodigo: function(value){ctgTipoPersonaCodigo = value;},
		getKycVentanaId: function(){return kycVentanaId;},
		setKycVentanaId: function(value){kycVentanaId = value;},
		getKycId: function(){return kycId;},
		setKycId: function(value){kycId = value;},
		getKycPersonaFisicaId: function(){return kycPersonaFisicaId;},
		setKycPersonaFisicaId: function(value){kycPersonaFisicaId = value;},
		getKycPersonaJuridicaId: function(){return kycPersonaJuridicaId;},
		setKycPersonaJuridicaId: function(value){kycPersonaJuridicaId = value;},
		getKycTipoCodigo: function(){return kycTipoCodigo;},
		setKycTipoCodigo: function(value){kycTipoCodigo = value;},
		getKycPersonaDocumento1: function(){return kycPersonaDocumento1;},
		setKycPersonaDocumento1: function(value){kycPersonaDocumento1 = value;},
		getKycVigente: function(){return kycVigente;},
		setKycVigente: function(value){kycVigente = value;},
		getKycPersonaNombreCompleto: function(){return kycPersonaFisicaNombreCompleto;},
		setKycPersonaNombreCompleto: function(value){kycPersonaFisicaNombreCompleto = value;},
		getKycFechaActualizacion: function(){return kycFechaActualizacion;},
		setKycFechaActualizacion: function(value){kycFechaActualizacion = value;},
		getCtgTipoDocumentoId: function(){return ctgTipoDocumentoId;},
		setCtgTipoDocumentoId: function(value){ctgTipoDocumentoId = value;},
		getCtgTipoDocumentoCodigo: function(){return ctgTipoDocumentoCodigo;},
		setCtgTipoDocumentoCodigo: function(value){ctgTipoDocumentoCodigo = value;},
		getCtgTipoDocumentoNombre: function(){return ctgTipoDocumentoNombre;},
		setCtgTipoDocumentoNombre: function(value){ctgTipoDocumentoNombre = value;},
		getKycReporte: function(){return kycReporte;},
		setKycReporte: function(value){kycReporte = value;},
		getKycProductoId: function(){return kycProductoId;},
		setKycProductoId: function(value){kycProductoId = value;},
		getKycPaqueteId: function(){return kycPaqueteId;},
		setKycPaqueteId: function(value){kycPaqueteId = value;},
		getKycVerifica: function(){return kycVerifica;},
		setKycVerifica: function(value){kycVerifica = value;},
		getKycMostrarCobis: function(){return kycMostrarCobis;},
		setKycMostrarCobis: function(value){kycMostrarCobis = value;},

		/*getKycAlertas: function(){
			if(Ext.get("kycAlertas")){
				return {
			    	xtype: "panel",
			    	title: "ALERTAS",
			    	contentEl: "kycAlertas",
			    	titleCollapse: true,
			    	collapsible: true,
			    	height: 80
			    };
			}
			return null;
		}*/
		getKycAlertas: function(){
			var hidden = true;
			if(Ext.get("kycAlertasInnerHTML")){
				hidden = false;
			}
			return {
		    	xtype: "panel",
		    	title: "ALERTAS",
		    	id: "kycAlertasPanel",
		    	contentEl: "kycAlertas",
		    	titleCollapse: true,
		    	collapsible: true,
		    	height: 80,
		    	hidden: hidden
		    };
		},
		loadAlertas: function(kycPep, kycPepRelacionado, kycPepSociedad, kycArticulo15, kycListaInternacional){
			var innerHTML = "";
			if("1" == kycPep)
				innerHTML += "<img src=\"" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_PEP.png\" width=\"100\" height=\"50\" onclick=\"EfxMenu.mostrarAlertas('" + EfxKYC.getKycReporte().PEP + "')\" />";
			if("1" == kycPepRelacionado)
				innerHTML += "<img src=\"" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_pep_relacionado.png\" width=\"100\" height=\"50\" onclick=\"EfxMenu.mostrarAlertas('" + EfxKYC.getKycReporte().PEP + "')\" />";
			if("1" == kycPepSociedad)
				innerHTML += "<img src=\"" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_sociedad_pep.png\" width=\"100\" height=\"50\" onclick=\"EfxMenu.mostrarAlertas('" + EfxKYC.getKycReporte().PEP + "')\" />";
			if("1" == kycArticulo15)
				innerHTML += "<img src=\"" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_art15.png\" width=\"100\" height=\"50\" onclick=\"EfxMenu.mostrarAlertas('" + EfxKYC.getKycReporte().ARTICULO15 + "')\" />";
			if("1" == kycListaInternacional)
				innerHTML += "<img src=\"" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_lista_internacional.png\" width=\"100\" height=\"50\" onclick=\"EfxMenu.mostrarAlertas('" + EfxKYC.getKycReporte().LISTA_INTERNACIONAL + "')\" />";
			if(!Ext.isEmpty(innerHTML) && Ext.get("kycAlertasContent")){
				Ext.get("kycAlertasContent").dom.innerHTML = innerHTML;
				Efx.utils.setVisible("kycAlertasPanel", true);
				alert("ENTRO A INNERHTML");
			}else{
				Ext.get("kycAlertasContent").dom.innerHTML = "";
				Efx.utils.setVisible("kycAlertasPanel", false);
				alert("NO ENTRO A INNERHTML");
			}
		}
	};
}();