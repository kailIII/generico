CtgSucursales = function(){
	return {
		buttonsConfigTipo: {
			add: "ctgTipoSucursalAgregar",
			edit: "ctgTipoSucursalEditar",
			save: "ctgTipoSucursalGuardar",
			remove: "ctgTipoSucursalEliminar",
			cancel: "ctgTipoSucursalCancelar",
			grid: "ctgTipoSucursalGrid",
			form: "ctgTipoSucursalForm"
		},
		buttonsConfigSubTipo: {
			add: "ctgSubTipoSucursalAgregar",
			edit: "ctgSubTipoSucursalEditar",
			save: "ctgSubTipoSucursalGuardar",
			remove: "ctgSubTipoSucursalEliminar",
			cancel: "ctgSubTipoSucursalCancelar",
			grid: "ctgSubTipoSucursalGrid",
			form: "ctgSubTipoSucursalForm"
		},
		buttonsConfigSucursal: {
			add: "ctgSucursalAgregar",
			edit: "ctgSucursalEditar",
			save: "ctgSucursalGuardar",
			remove: "ctgSucursalEliminar",
			cancel: "ctgSucursalCancelar",
			grid: "ctgSucursalGrid",
			form: "ctgSucursalForm"
		},
		guardarDatos: function(form,url, path, tipoForm){
			Ext.getCmp(form).getForm().submit({
    			url: url,
    			params: {
                    tipo: tipoForm
                },
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			success: function(form, action){
    				Efx.message.alert(action.result.message);

    				if(tipoForm==1){
						Efx.combos.initTipoSucursalGrid(action.result.ctgTipoSucursal || []);
    					Ext.getCmp("ctgTipoSucursalGrid").getStore().loadData(Efx.combos.getAllTipoSucursalGrid());
    					Efx.combos.initTipoSucursal(action.result.ctgTipoSucursal || []);
    					Ext.getCmp("ctgTipoSucursal").store.loadData(Efx.combos.getAllTipoSucursal());
    					Ext.getCmp("ctgTipoSucursalCancelar").handler();
					}
    				else if(tipoForm==2){
    					Efx.combos.initSubTipoSucursalGrid(action.result.ctgSubTipoSucursal || []);
    					Ext.getCmp("ctgSubTipoSucursalGrid").getStore().loadData(Efx.combos.getAllSubTipoSucursalByTipoSucursal(
    							Ext.getCmp("ctgTipoSucursalGrid").getSelectionModel().getSelection()[0].data.ctgTipoSucursalId));
    					Efx.combos.initSubTipoSucursal(action.result.ctgSubTipoSucursal || []);
    					Ext.getCmp("ctgSubTipoSucursal").store.loadData(Efx.combos.getAllSubTipoSucursalByTipoSucursal(
    							Ext.getCmp("ctgTipoSucursalGrid").getSelectionModel().getSelection()[0].data.ctgSucursalId));
    					Ext.getCmp("ctgSubTipoSucursalCancelar").handler();
    				}
    				else if(tipoForm==3){
    					Efx.combos.initSucursalGrid(action.result.ctgSucursal || []);
    					Ext.getCmp("ctgSucursalGrid").getStore().loadData(Efx.combos.getAllSucursaleBySubTipoSucursal(
    							Ext.getCmp("ctgSubTipoSucursalGrid").getSelectionModel().getSelection()[0].data.ctgSubTipoSucursalId));
    					Ext.getCmp("ctgSucursalCancelar").handler();
    				}
    			},
    			failure: Efx.form.failureProcedure
   			});

		},
		init: function(municipios, colonias){
			var config = {};
			config.items = {
				flex: 1,
				xtype: "panel",
				layout: {
					type: "hbox",
					align: "stretch",
					pack  : "start"
				},
				autoScroll: true,
				border: false,
				dockedItems: [{xtype: 'toolbar', items: ['->',{xtype:'label',text:'SUCURSALES',cls: "ctg_label"}]}],
				defaults: {margins: "5 0 5 0"},
				items: [
			       {
			    	   xtype: "panel",
			    	   border: false,
			    	   flex: 1,
			    	   minWidth: 500,
			    	   autoScroll: true,
					   layout: {
							type: "vbox",
							align: "stretch",
							pack  : "start"
						},
						defaults: {width: 350, flex: 1},
						items: [
							{
								xtype: "panel",
								title: "TIPO DE SUCURSAL",
								margins: "5 0 0 5",
								layout: "fit",
								tbar: [
										{
											iconCls:Efx.constants.icons.ADD_ICON,
											text: 'Agregar Registro',
											scope: this,
											id: "ctgTipoSucursalAgregar2",
											handler: function(){
												Ext.getCmp("ctgTipoSucursalForm").show();
												Ext.getCmp("ctgSubTipoSucursalForm").hide();
												Ext.getCmp("ctgSucursalForm").hide();

												Efx.form.switchButton(CtgSucursales.buttonsConfigTipo, "add");
												Ext.getCmp("ctgTipoSucursalId").setReadOnly(true);
										    }
										}
								    ],
								items: [
											{
												id: "ctgTipoSucursalGrid",
												xtype: "grid",
												border: false,
												store: new Ext.data.SimpleStore({
													   data: Efx.combos.getAllTipoSucursalGrid(),
													   fields: ["ctgTipoSucursalId", "ctgTipoSucursalNombre","ctgTipoSucursalActivo"]
												}),
											    columns: [
											        {header: "Tipo Sucursal",  dataIndex: "ctgTipoSucursalNombre", flex: 1}
											    ],

												listeners: {
														itemclick: function(view, record){
															Efx.form.setValues("ctgTipoSucursalForm", record.data);
															Ext.getCmp("ctgTipoSucursalForm").show();
															Ext.getCmp("ctgSubTipoSucursalForm").hide();
															Ext.getCmp("ctgSucursalForm").hide();
															Efx.form.switchButton(CtgSucursales.buttonsConfigTipo, "rowclick");
															Ext.getCmp("ctgSubTipoSucursalGrid").store.loadData(Efx.combos.getAllSubTipoSucursalByTipoSucursal(record.data.ctgTipoSucursalId));
												        	Ext.getCmp("ctgSubTipoSucursal").store.loadData(Efx.combos.getAllSubTipoSucursalByTipoSucursal(record.data.ctgTipoSucursalId));
										                }
												    }
											}

								        ]
							} ,
							{
								xtype: "panel",
								title: "SUBTIPO SUCURSAL",
								margins: "5 0 0 5",
								flex: 1,
								layout: "fit",
								tbar: [
										{
											iconCls:Efx.constants.icons.ADD_ICON,
											text: 'Agregar Registro',
											id: 'ctgSubTipoSucursalAgregar2',
											scope: this,
											handler: function(){
												   var valuerow=Efx.grid.getSelectedRow("ctgTipoSucursalGrid").get("ctgTipoSucursalId");


												    Ext.getCmp("ctgTipoSucursalForm").hide();
													Ext.getCmp("ctgSubTipoSucursalForm").show();
													Ext.getCmp("ctgSucursalForm").hide();
													Efx.form.switchButton(CtgSucursales.buttonsConfigSubTipo, "add");
													Ext.getCmp("ctgSubTipoSucursalId").setReadOnly(true);
												    Ext.getCmp("ctgSubTipoSucursalForm").getForm().setValues([{id:'ctgTipoSucursal', value:valuerow}]);
//												    Efx.utils.setRequired("ctgSubTipoSucursalContrasenaBureau", true);
										       }
										}
								    ],
								items: [
											{
												id: "ctgSubTipoSucursalGrid",
												xtype: "grid",
												border: false,
												store: new Ext.data.SimpleStore({
														autoLoad: false,
														data: Efx.combos.getAllSubTipoSucursalByTipoSucursal(0),//Efx.combos.getAllCantGrid(),
													    fields: ["ctgSubTipoSucursalId", "ctgSubTipoSucursalNombre","ctgTipoSucursal","ctgSubTipoSucursalCodigo","ctgSubTipoSucursalUsuarioBureau","ctgSubTipoSucursalContrasenaBureau","ctgSubTipoSucursalActivo"]
												}),
											    columns: [
										              {header: "C\u00F3digo",  dataIndex: "ctgSubTipoSucursalCodigo", width: 100},
														{header: "Subtipo Sucursal",  dataIndex: "ctgSubTipoSucursalNombre",flex: 2, minWidth: 100},
														{header: "Activo",  dataIndex: "ctgSubTipoSucursalActivo",flex: 1, minWidth: 100,
												    	  renderer: function(value){
												    	        if (value == 1) {
												    	            return 'Si';
												    	        }
												    	        else
												    	        	{
												    	            return 'No';
												    	        	}
												    	  }
												      }
											    ],
											    listeners: {
													itemclick: function(view, record){
														Efx.form.setValues("ctgSubTipoSucursalForm", record.data);
//														Ext.getCmp("ctgSubTipoSucursalContrasenaBureau").setValue("");
														Ext.getCmp("ctgSubTipoSucursalForm").show();
														Ext.getCmp("ctgTipoSucursalForm").hide();
														Ext.getCmp("ctgSucursalForm").hide();
														Efx.form.switchButton(CtgSucursales.buttonsConfigSubTipo, "rowclick");
										        		Ext.getCmp("ctgSucursalGrid").store.loadData(
										    					   Efx.combos.getAllSucursaleBySubTipoSucursal(record.data.ctgSubTipoSucursalId));
										        		Ext.getCmp("ctgSubTipoSucursal").store.loadData(
										        				Efx.combos.getAllSubTipoSucursalByTipoSucursal(Ext.getCmp("ctgTipoSucursalGrid").getSelectionModel().getSelection()[0].data.ctgTipoSucursalId));
									                }
											    }
											}
								        ]
							},{
								xtype: "panel",
								title: "SUCURSALES",
								layout: "fit",
								margins: "5 0 0 5",
								tbar: [
										{
											iconCls:Efx.constants.icons.ADD_ICON,
											text: 'Agregar Registro',
											id: 'ctgSucursalAgregar2',
											scope: this,
											handler: function(){
													Ext.getCmp("ctgTipoSucursalForm").hide();
													Ext.getCmp("ctgSubTipoSucursalForm").hide();
													Ext.getCmp("ctgSucursalForm").show();
													Efx.form.switchButton(CtgSucursales.buttonsConfigSucursal, "add");
													//Ext.getCmp("ctgSucursalId").setReadOnly(true);
													Ext.getCmp("ctgSubTipoSucursal").store.loadData(Efx.combos.getAllSubTipoSucursalByTipoSucursal(Ext.getCmp("ctgTipoSucursalGrid").getSelectionModel().getSelection()[0].data.ctgTipoSucursalId));
												    var valuerow=Efx.grid.getSelectedRow("ctgSubTipoSucursalGrid").get("ctgSubTipoSucursalId");
													Ext.getCmp("ctgSucursalForm").getForm().setValues([{id:'ctgSubTipoSucursal', value:valuerow}]);


											}
										}
								    ],
								items: [
										 {
											id: "ctgSucursalGrid",
											xtype: "grid",
											border: false,
											store: new Ext.data.SimpleStore({
													autoLoad: false,
													data: Efx.combos.getAllSucursaleBySubTipoSucursal(0),//Efx.combos.getAllCantGrid(),
													fields: ["ctgSucursalId", "ctgSucursalNombre","ctgSubTipoSucursal","ctgSucursalActivo", "ctgSucursalCodigo","ctgSucursalPoseeComiteCreditos","ctgSucursalAtiendeOtraSucursal"]
									    	}),
										    columns: [
											     {header: "Sucursal",  dataIndex: "ctgSucursalNombre", flex: 1},
											      {
											    	  header: "Activo",
											    	  dataIndex: "ctgSucursalActivo",
											    	  width: 40,
											    	  flex: 0.5,
											    	  renderer: function(value){
											    	        if (value == 1) {
											    	            return 'Si';
											    	        }
											    	        else
											    	        	{
											    	            return 'No';
											    	        	}
											    	  }
											      }
										    ],
										    listeners: {
												itemclick: function(view, record){
													Efx.form.setValues("ctgSucursalForm", record.data);
													Ext.getCmp("ctgSubTipoSucursalForm").hide();
													Ext.getCmp("ctgTipoSucursalForm").hide();
													Ext.getCmp("ctgSucursalForm").show();
													Efx.form.switchButton(CtgSucursales.buttonsConfigSucursal, "rowclick");
								                }
										    }

										}
									]
							}
				        ]
			       },{
			    	   border: false,
		    		   width: 400,
		    		   margins: "10 5 5 5",
		    		   layout: {
		    			   type: "hbox",
		    			   align: "stretch",
		    			   pack  : "start"
    				   },
		    		   items: [
							{
								xtype: "form",
								title: "TIPO SUCURSAL",
								id: "ctgTipoSucursalForm",
								activeRecord: null,
								bodyPadding: 5,
								autoScroll: true,
								width: 400,
								height: 450,
								layout: {
									type: "table",
									columns: 1,
									tableAttrs: {
							            style: {"margin-top": "10px", border:"1"},
							            align: "center"
							        }
								},
							    defaults: {
							    	selectOnFocus: true,
							    	enforceMaxLength: true,
							    	maxLength: 200,
							    	allowEnable: true,
							    	width: 350,
							    	typeAhead: true,
							    	minChars: 1,
							    	queryMode: "local"
								},
							    tbar: [
									{
										id: 'ctgTipoSucursalEditar',
										iconCls:Efx.constants.icons.EDIT_ICON,
										text: 'Editar Registro',
										hidden: true,
										handler: function(){
											Efx.form.switchButton(CtgSucursales.buttonsConfigTipo, "edit");
											Ext.getCmp("ctgTipoSucursalId").setReadOnly(true);
										}
									},{
										id: 'ctgTipoSucursalGuardar',
										iconCls:Efx.constants.icons.SAVE_ICON,
										text: 'Guardar Cambios',
										hidden: true,
										handler: function(){
											Efx.message.progress("Guardando Informaci\u00F3n...");
											CtgSucursales.guardarDatos("ctgTipoSucursalForm",Efx.constants.CONTEXT_PATH + '/sucursal/create',Efx.constants.CONTEXT_PATH,"1");
										}
									},{
										id: 'ctgTipoSucursalEliminar',
										iconCls:Efx.constants.icons.DELETE_ICON,
										text: 'Eliminar Registro',
										hidden: true,
										itemId: 'delete',
										handler: function()
										{
											Efx.message.confirmDelete(function(){
												CtgSucursales.guardarDatos("ctgTipoSucursalForm",Efx.constants.CONTEXT_PATH + '/sucursal/delete',Efx.constants.CONTEXT_PATH,"1");
											},'');
										}
									},{
										id: 'ctgTipoSucursalCancelar',
										iconCls:Efx.constants.icons.CANCEL_ICON,
										text: 'Cancelar',
										hidden: true,
										handler: function(){
											Efx.form.switchButton(CtgSucursales.buttonsConfigTipo, "cancel");
								       }
									}
							    ],
								items:[
									{xtype: "label", text: "Descripci\u00F3n:", cls: "x-form-item label_spacing", width: 75},
									{
										   xtype: "textfield",
										   id: "ctgTipoSucursalNombre",
										   name: "ctgTipoSucursal.ctgTipoSucursalNombre",
										   maxLength: 50
									},
									{xtype: "label", text: "Estado:", cls: "x-form-item label_spacing", width: 75},
									{
								    	   xtype: "combo",
								    	   store: new Ext.data.SimpleStore({
								    		   data: Efx.combos.activoArray(),
							    			   fields: ["activoId", "activoDescripcion"]
								    	   }),
								    	   displayField: "activoDescripcion",
								    	   valueField: "activoId",
								    	   triggerAction: "all",
								    	   mode: "local",
								    	   id: "ctgTipoSucursalActivo",
								    	   name:"ctgTipoSucursal.ctgTipoSucursalActivo"
									},{
										   xtype: "hidden",
										   id: "ctgTipoSucursalId",
										   name: "ctgTipoSucursal.ctgTipoSucursalId",
										   width: 50
									}
							    ]
							},
							{
								xtype: "form",
								title: "SUBTIPO SUCURSAL",
								id: "ctgSubTipoSucursalForm",
								activeRecord: null,
								bodyPadding: 5,
								autoScroll: true,
								width: 400,
								height: 450,
								layout: {
									type: "table",
									columns: 1,
									tableAttrs: {
							            style: {"margin-top": "10px", border:"1"},
							            align: "center"
							        }
								},
								defaults: {
							    	selectOnFocus: true,
							    	enforceMaxLength: true,
							    	maxLength: 200,
							    	allowEnable: true,
							    	width: 350,
							    	typeAhead: true,
							    	minChars: 1,
							    	queryMode: "local"
								},
							    tbar: [
									{
										id: 'ctgSubTipoSucursalEditar',
										iconCls:Efx.constants.icons.EDIT_ICON,
										text: 'Editar Registro',
										hidden: true,
										handler: function(){
											Efx.form.switchButton(CtgSucursales.buttonsConfigSubTipo, "edit");
											Ext.getCmp("ctgSubTipoSucursalId").setReadOnly(true);
//											Efx.utils.setRequired("ctgSubTipoSucursalContrasenaBureau", false);
										}
									},{
										id: 'ctgSubTipoSucursalGuardar',
										iconCls:Efx.constants.icons.SAVE_ICON,
										text: 'Guardar Cambios',
										hidden: true,
										handler: function(){
											Efx.message.progress("Guardando Informaci\u00F3n...");
											CtgSucursales.guardarDatos("ctgSubTipoSucursalForm",Efx.constants.CONTEXT_PATH + '/sucursal/create',Efx.constants.CONTEXT_PATH,"2");
										}


									},{
										id: 'ctgSubTipoSucursalEliminar',
										iconCls:Efx.constants.icons.DELETE_ICON,
										text: 'Eliminar Registro',
										hidden: true,
										itemId: 'delete',
										handler: function()
										{
											Efx.message.confirmDelete(function(){
												CtgSucursales.guardarDatos("ctgSubTipoSucursalForm",Efx.constants.CONTEXT_PATH + '/sucursal/delete',Efx.constants.CONTEXT_PATH,"2");
											},'');
										}
									},{
										id: 'ctgSubTipoSucursalCancelar',
										iconCls:Efx.constants.icons.CANCEL_ICON,
										text: 'Cancelar',
										hidden: true,
										handler: function(){
											Efx.form.switchButton(CtgSucursales.buttonsConfigSubTipo, "cancel");
								       }
									}
							    ],
								items:[
								   {xtype: "label", text: "C\u00f3digo:", cls: "x-form-item label_spacing", width: 100},
									{
										xtype: "textfield",
										id: "ctgSubTipoSucursalCodigo",
										name: "ctgSubTipoSucursal.ctgSubTipoSucursalCodigo",
							            allowBlank:false,
							            hideTrigger: true,
							            allowDecimals: false,
										maxLength: 20
									},
									{xtype: "label", text: "Tipo Sucursal:", cls: "x-form-item label_spacing", width: 100},
								   {
									   xtype: "combo",
									   id: "ctgTipoSucursal",
									   name: "ctgSubTipoSucursal.ctgTipoSucursal.ctgTipoSucursalId",
									   readOnly:true,
									   store: new Ext.data.SimpleStore({
										   data: Efx.combos.getAllTipoSucursal(),
										   fields: ["ctgTipoSucursalId", "ctgTipoSucursalNombre","ctgTipoSucursalActivo"]
									   }),
									   displayField: "ctgTipoSucursalNombre",
									   valueField: "ctgTipoSucursalId"
									},

									{xtype: "label", text: "Descripci\u00F3n:", cls: "x-form-item label_spacing", width: 100},
									{
										   xtype: "textfield",
										   id: "ctgSubTipoSucursalNombre",
										   name: "ctgSubTipoSucursal.ctgSubTipoSucursalNombre",
										   maxLength: 40
									},
//									{xtype: "label", text: "Usuario Bureau:", cls: "x-form-item label_spacing"},
//									{
//										xtype: "textfield",
//										id: "ctgSubTipoSucursalUsuarioBureau",
//										name: "ctgSubTipoSucursal.ctgSubTipoSucursalUsuarioBureau",
//										allowBlank:false,
//										maxLength: 50
//									},
//
//									{xtype: "label", text: "Contrase\u00f1a Bureau:", cls: "x-form-item label_spacing"},
//									{
//										xtype: "textfield",
//										id: "ctgSubTipoSucursalContrasenaBureau",
//										name: "ctgSubTipoSucursal.ctgSubTipoSucursalContrasenaBureau",
//										maxLength: 100
//									},
									{xtype: "label", text: "Estado:", cls: "x-form-item label_spacing", width: 100},
									{
								    	   xtype: "combo",
								    	   store: new Ext.data.SimpleStore({
								    		   data: Efx.combos.activoArray(),
							    			   fields: ["activoId", "activoDescripcion"]
								    	   }),
								    	   displayField: "activoDescripcion",
								    	   valueField: "activoId",
								    	   triggerAction: "all",
								    	   mode: "local",
								    	   id: "ctgSubTipoSucursalActivo",
								    	   name:"ctgSubTipoSucursal.ctgSubTipoSucursalActivo"
									},{
								    	   xtype: "hidden",
								    	   id: "ctgSubTipoSucursalId",
								    	   name: "ctgSubTipoSucursal.ctgSubTipoSucursalId",
								    	   width: 100
							       }
							    ]
							},
							{
								xtype: "form",
								title: "SUCURSALES",
								id: "ctgSucursalForm",
								activeRecord: null,
								bodyPadding: 5,
								autoScroll: true,
								width: 400,
								height: 450,
								layout: {
									type: "table",
									columns: 1,
									tableAttrs: {
							            style: {"margin-top": "10px", border:"1"},
							            align: "center"
							        }
								},
								defaults: {
							    	selectOnFocus: true,
							    	enforceMaxLength: true,
							    	maxLength: 200,
							    	allowEnable: true,
							    	width: 350,
							    	typeAhead: true,
							    	minChars: 1,
							    	queryMode: "local"
								},
							    tbar: [
									{
										id: 'ctgSucursalEditar',
										iconCls:Efx.constants.icons.EDIT_ICON,
										text: 'Editar Registro',
										hidden: true,
										handler: function(){
											Efx.form.switchButton(CtgSucursales.buttonsConfigSucursal, "edit");
										}
									},{
										id: 'ctgSucursalGuardar',
										iconCls:Efx.constants.icons.SAVE_ICON,
										text: 'Guardar Cambios',
										hidden: true,
										handler: function(){
											Efx.message.progress("Guardando Informaci\u00F3n...");
											CtgSucursales.guardarDatos("ctgSucursalForm",Efx.constants.CONTEXT_PATH + '/sucursal/create',Efx.constants.CONTEXT_PATH,"3");
										}
									},{
										id: 'ctgSucursalEliminar',
										iconCls:Efx.constants.icons.DELETE_ICON,
										text: 'Eliminar Registro',
										hidden: true,
										itemId: 'delete',
										handler: function()
										{
											Efx.message.confirmDelete(function(){
												CtgSucursales.guardarDatos("ctgSucursalForm",Efx.constants.CONTEXT_PATH + '/sucursal/delete',Efx.constants.CONTEXT_PATH,"3");
											},'');

										}
									},{
										id: 'ctgSucursalCancelar',
										iconCls:Efx.constants.icons.CANCEL_ICON,
										text: 'Cancelar',
										hidden: true,
										handler: function(){
											Efx.form.switchButton(CtgSucursales.buttonsConfigSucursal, "cancel");
								       }
									}
							    ],
								items:[

							       	{xtype: "label", text: "Subtipo Sucursal", cls: "x-form-item label_spacing", width: 200},
									{
										   xtype: "combo",
										   id: "ctgSubTipoSucursal",
										   name: "ctgSucursal.ctgSubTipoSucursal.ctgSubTipoSucursalId",
										   readOnly:true,
										   store: new Ext.data.SimpleStore({
											   data: Efx.combos.getAllSubTipoSucursal(),//[[]],//Efx.combos.getAllCantonesByProvincia(Ext.getCmp("myGrid1").getSelectionModel().getSelection()[0].data.ctgProvinciaId),
											   fields: ["ctgSubTipoSucursalId", "ctgSubTipoSucursalNombre", "ctgTipoSucursal"]
										   }),
										   displayField: "ctgSubTipoSucursalNombre",
										   valueField: "ctgSubTipoSucursalId"

									},
									{xtype: "label", text: "Descripci\u00F3n", cls: "x-form-item label_spacing", width: 200},
									{
										   xtype: "textfield",
										   id: "ctgSucursalNombre",
										   name: "ctgSucursal.ctgSucursalNombre",
										   maxLength: 60
									},
									{xtype: "label", text: "C\u00f3digo", cls: "x-form-item label_spacing", width: 200},
									{
										   xtype: "textfield",
										   id: "ctgSucursalCodigo",
										   name: "ctgSucursal.ctgSucursalCodigo",
										   maxLength: 10
									},
									{xtype: "label", text: "Estado", cls: "x-form-item label_spacing", width: 200},
									{
								    	   xtype: "combo",
								    	   allowBlank: false,
								    	   store: new Ext.data.SimpleStore({
								    		   data: Efx.combos.activoArray(),
							    			   fields: ["activoId", "activoDescripcion"]
								    	   }),
								    	   displayField: "activoDescripcion",
								    	   valueField: "activoId",
								    	   triggerAction: "all",
								    	   mode: "local",
								    	   id: "ctgSucursalActivo",
								    	   name:"ctgSucursal.ctgSucursalActivo"
									},{
								    	   xtype: "hidden",
								    	   id: "ctgSucursalId",
								    	   name: "ctgSucursal.ctgSucursalId"
							       }

							    ]
							}
    		           ]
			       }
		        ]
			};
			return config;
		}
	};

}();