Ext.define("Ext.ui.Toolbar", {
    extend: "Ext.toolbar.Toolbar",
    alias: "widget.ui.toolbar",
	afterScrollerCls: "after-scroller-ui-right",
	beforeScrollerCls: "before-scroller-ui-left",
	
	initComponent: function(){
		var me = this;
		//me.height = me.height || 60;
		if(!me.bodyStyle) me.bodyStyle = {};
		me.callParent();		
		me.layout.align = "left";
		//me.layout.type = "hbox";
		me.layout.overflowHandler = new Ext.layout.container.boxOverflow.Scroller(me.layout);
		me.layout.overflowHandler.afterScrollerCls = me.afterScrollerCls;
		me.layout.overflowHandler.beforeScrollerCls = me.beforeScrollerCls;
		me.layout.overflowHandler.scrollIncrement = 20;
	}
});