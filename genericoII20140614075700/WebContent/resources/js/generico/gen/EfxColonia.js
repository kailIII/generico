EfxColonia = function(){
	var nextFocus = ""; ctgDistritoNombre = "", ctgDistritoId = "", ctgDistritoSujetoCredito = "";
	return {
		setNextFocus: function(value){nextFocus = value;},
		setCtgDistritoNombre: function(value){ctgDistritoNombre = value;},
		setCtgDistritoId: function(value){ctgDistritoId = value;},
		setCtgDistritoSujetoCredito: function(value){ctgDistritoSujetoCredito = value;},
		closeColonia: function(){
			var efxColoniaWindow = Ext.WindowMgr.get("buscarColoniaWindow");
  		  	if(efxColoniaWindow) efxColoniaWindow.close();
  		  	Efx.utils.setFocus(nextFocus);
		},
		noExisteColonia: function(){
			Efx.message.prompt("Digite el nombre de la Colonia:", function(btn, text){
				  Efx.utils.setValue(ctgDistritoNombre, btn == "ok" ? text : "");
				  Efx.utils.setValue(ctgDistritoId, "");
				  Efx.utils.setValue(ctgDistritoSujetoCredito, "1");
				  if(btn == "ok"){
					  EfxColonia.closeColonia();
					  Efx.utils.setFocus(nextFocus);
				  }
				  else Ext.getCmp("ctgDistritoNombreFilter").getView().focus();
			  });
		},
		seleccionarColonia: function(grid, record){
			if(!record){
				var records = Ext.getCmp("ctgDistritoNombreGrid").getSelectionModel().getSelection();
				if(records != null && records.length > 0) record = records[0];
				else{
					Efx.message.alertInvalid("Debe seleccionar un registro");
					return;
				}
			}
			Efx.utils.setValue(ctgDistritoNombre, record.get("ctgDistritoNombre"));
			Efx.utils.setValue(ctgDistritoId, record.get("ctgDistritoId"));
			Efx.utils.setValue(ctgDistritoSujetoCredito, record.get("ctgDistritoSujetoCredito"));
			EfxColonia.closeColonia();
			Efx.utils.setFocus(nextFocus);
		},
		buscarColonias: function(ctgCantonId, ctgCantonNombre){
			if(Ext.isEmpty(ctgCantonId) || Ext.isEmpty(ctgCantonNombre)){
				Efx.message.alertInvalid("* Debe seleccionar un municipio");
				return;
			}
			Ext.create("Ext.window.Window", {
				id: "buscarColoniaWindow",
				modal: true,
				title: Efx.constants.APPLICATION_TITLE || "GESTOR - WEB",
				height: 300,
				width: 550,
				layout: "fit",
				listeners: {
	    		   show: function(){
	    			   Ext.fly("ctgDistritoNombreGrid").on("keypress", function(event){
	    				   if(event.keyCode == Ext.EventObject.ENTER) EfxColonia.seleccionarColonia();
					   });
	    		   }
				},
				tbar: [
			       "Municipio: " + (ctgCantonNombre || "DEBE SELECCIONAR UN MUNICIPIO"), "-",
			       "Colonia:",
			       {
			    	   xtype: "textfield",
			    	   id: "ctgDistritoNombreFilter",
			    	   enableKeyEvents: true,
			    	   listeners: {
			    		   keyup: function(field, event){
			    			   if(event.keyCode == Ext.EventObject.ENTER || event.keyCode == Ext.EventObject.DOWN){
			    				   Ext.getCmp("ctgDistritoNombreGrid").getSelectionModel().select(0);
			    				   Ext.getCmp("ctgDistritoNombreGrid").getView().focus();
			    			   }else if(event.keyCode == Ext.EventObject.ESC){
			    				   /*EfxColonia.noExisteColonia();*/
			    				   EfxColonia.closeColonia();			    				   
			    				   event.stopEvent();
			    			   }else{
				    			   var buscarColoniaWindow = Ext.WindowMgr.get("buscarColoniaWindow");
				    			   var store = buscarColoniaWindow.items.items[0].getStore();
				    			   store.clearFilter();
				    			   var value = this.getValue() || "";
				    			   value = value.replace("\\", "\\\\");
				    			   value = value.replace("\(", "\\(").replace("\)", "\\)").replace("\.", "\\.");
			    				   var regExp = new RegExp("[\w|\W]*" + value + "[\w|\W]*", "i");
			    				   store.filter("ctgDistritoNombre", regExp);
			    			   }
			    		   },
			    		   specialkey: function(field, event){
			    			   if(event.keyCode == Ext.EventObject.ESC){
//			    				   EfxColonia.noExisteColonia();
			    				   EfxColonia.closeColonia();
			    				   event.stopEvent();
			    			   }
			    		   }
			    	   }
			       }/*,{
	            	  text: "Buscar",
	            	  handler: function(){
	            		  var buscarColoniaWindow = Ext.WindowMgr.get("buscarColoniaWindow");
	            		  var store = buscarColoniaWindow.items.items[0].getStore();
	            		  if(Ext.isEmpty(Efx.utils.getValue("ctgDistritoNombreFilter"))) store.clearFilter();
	            		  else store.filter("ctgDistritoNombre", Efx.utils.getValue("ctgDistritoNombreFilter"), true);
	        		  }
		          }*/
		        ],
		        //onEsc: EfxColonia.noExisteColonia,
		        onEsc: EfxColonia.closeColonia,
		        buttons: [
					/*{
						text: "Colonia no Encontrada",
						handler: EfxColonia.noExisteColonia
					}*/
					{
						text: "Cerrar",
						handler: EfxColonia.closeColonia
					}
		        ],
				items: {
					xtype: "grid",
					id: "ctgDistritoNombreGrid",
					border: false,
					columns: [{header: "Colonia", dataIndex: "ctgDistritoNombre", flex: 1}],
					store: new Ext.data.SimpleStore({
		    		   data: Efx.combos.getAllColoniasByMunicipio(ctgCantonId),
	    			   fields: ["ctgDistritoId", "ctgDistritoNombre", "ctgDeparatamentoId", "ctgDistritoSujetoCredito"]
		    	   }),
		    	   listeners: {
		    		   itemdblclick: function(view, record){
		    			   EfxColonia.seleccionarColonia(record);
		    		   }
		    	   }
				}
			}).show();
			Ext.getCmp("ctgDistritoNombreFilter").focus();
		}
	};
}();