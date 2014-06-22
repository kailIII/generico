var mostrarActividadesPendientes = function(jsonObject){
	if(!jsonObject){
		var row = null;
		if (Ext.getCmp("kycBusquedaPersonaFisicaGrid")) row = Efx.grid.getSelectedRow("kycBusquedaPersonaFisicaGrid");
		else if (Ext.getCmp("kycBusquedaPersonaJuridicaGrid")) row = Efx.grid.getSelectedRow("kycBusquedaPersonaJuridicaGrid");
		if(row){
			jsonObject = Ext.decode(row.get("COMPLETA"));
		}
	}
	var tpl = new Ext.XTemplate(
		Ext.get("tplActividadesPendientes").dom.innerHTML.replace(/\%7B/g, "{").replace(/\%7D/g, "}").replace(/TPL/g, "tpl"),
		{
			isArrayOrObject: function(mensaje){
				if(Ext.isArray(mensaje) || Ext.isObject(mensaje)) return true;
				return false;
			}
		}
	);
	var panelTPL = Ext.create('Ext.panel.Panel',{
		id:'panelTPL',
		tpl: tpl,
		autoScroll: true,
		bodyCls: "fondoPanel",
		border: false,
		data:jsonObject.actividades
	});
	var winActividadesPendientes = Ext.create('Ext.window.Window', {
		id:'winActividadesPendientes',
		title: "ACTIVIDADES PENDIENTES" /*+ Efx.constants.SOLICITUD_CREDITO + EfxEtapa.getGstSolicitudId()*/,
		height: 600,
		width: 1000,
		layout: 'fit',
		modal: true,
		resizable: false,
		items: [panelTPL]
	});
	winActividadesPendientes.show();
};