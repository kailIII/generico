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
			Ext.util.Format.currencySign = "";
			this.clock();
			if(!config) config = {};
			if(!config.menu) config.menu = [];
			if(!config.items) config.items = [];
			new Ext.Viewport({
				layout: {
				    type: "vbox",
				    align : "stretch",
				    pack  : "start"
				},
				items: {
					xtype: "container",
					layout: "border",
					flex: 1,
	    			items:[
	   			       {
	    					contentEl: "header",
	    					margins: "0 5 0 5",
	    					region: "north",
	    					height: 50,
	    					border:false,
	    					cls: "header"
	    				},{
	    					margins: "0 5 5 5",
	    					region: "center",
	    					layout: {
	    					    type: "vbox",
	    					    align : "stretch",
	    					    pack  : "start"
	    					},
	    					defaults:{margins:"5 5 5 5"},
	    					tbar: {
                                xtype: "ui.toolbar",
                                items: config.menu,
                                style: "border:  none; "
	                        },
	                        items: config.items
	    				}
	    			]
				}
    		});
		}
	};
}();