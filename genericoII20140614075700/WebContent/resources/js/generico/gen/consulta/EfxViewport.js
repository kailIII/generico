EfxViewport = function(){
	return {
		clock: function(){
			var task = {
				run: function(){
					Ext.fly("clock").update(Ext.Date.format(new Date(), "d/m/Y h:i:s A"));
				},
				interval: 1000
			};
			Ext.TaskManager.start(task);
		},
		init: function(config){
			Ext.QuickTips.init();
			if(!config) config = {};
			if(!config.items) config.items = [];
			Ext.grid.header.Container.override({
				prepareData: function(data, rowIdx, record, view, panel) {
					var obj = this.callOverridden(arguments);
					var headers = this.gridDataColumns || this.getGridColumns(),
					headersLn = headers.length,
					colIdx = 0,
					header;
					for (; colIdx < headersLn; colIdx++) {
						header = headers[colIdx];
						obj[header.id+'-modified'] = Ext.isDefined(record.modified[header.dataIndex]) ? Ext.baseCSSPrefix + 'grid-dirty-cell' : '';
					}
					return obj;
				}
			});

			Ext.apply(Ext.view.View.EventMap, {
				change: 'Change'
			});
			Ext.override(Ext.view.View, {
				onBeforeItemChange: Ext.emptyFn,
				onItemChange: Ext.emptyFn
			});
			/**=====================================================================================================================================**/
			Ext.util.Format.currencySign = "";
			this.clock();
			new Ext.Viewport({
				layout: {
					type: "vbox",
					align : "stretch",
					pack  : "start"
				},
				id: "efxViewport",
				autoScroll: true,
				items: {
					xtype: "container",
					flex: 1,
					layout: "border",
					minWidth: 1000,
					minHeight: 600,
					items:[
				       {
				    	   contentEl: "header",
				    	   margins: "0 5 0 5",
				    	   region: "north",
				    	   height: 60,
				    	   border:false,
				    	   cls:'header'
				       },{
				    	   margins: "0 5 5 0",
				    	   region: "center",
				    	   frame:false,
				    	   layout: {
				    		   type: "vbox",
				    		   align : "stretch",
				    		   pack  : "start"
				    	   },
				    	   items: config.items
				       },
				       new Ext.tree.Panel({
				    	   title: Efx.constants.APPLICATION_TITLE,
				    	   margins: "0 0 5 5",
				    	   region: "west",
				    	   minWidth: 360,
				    	   maxWidth: 375,
				    	   split: true,
				    	   collapsible: true,
				    	   rootVisible: false,
				    	   autoScroll: true,
				    	   listeners: {
				    		   itemclick: function(tree, record){
				    			   if(record && record.get("leaf") === true && !Ext.isEmpty(record.get("itemUrl")))
				    				   Menu.openSelfWindow(record.get("itemUrl"), record.get("itemUrlParams"));
				    		   }
				    	   },
				    	   store: {
				    		   fields: [
			    		           {name: "text"},
			    		           {name: "leaf"},
			    		           {name: "itemUrl"},
			    		           {name: "itemUrlParams"}
		    		           ],
		    		           root: {
		    		        	   expanded: true,
		    		        	   text:"",
		    		        	   user:"",
		    		        	   status:"",
		    		        	   children: [
    		        	              {
    		        	            	  text:"CONSULTAS", expanded: true,
    		        	            	  children: [
	                	                       {
	                	                    	   text: "PERSONA F\u00cdSICA",
	                	                    	   leaf: true,
	                	                    	   itemUrl: "consulta/view/Fisica"
	                	                       }
        	            	             ]
		        	                 }
		        	              ]
		    		           }
				    	   }
				       })
			       ]
				}
			});
		}
	};
}();