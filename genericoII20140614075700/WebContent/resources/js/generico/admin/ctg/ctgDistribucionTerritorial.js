CtgDistribucionTerritorial = function(){
	return {
		buttonsConfigDepto: {
			add: "ctgProvinciaAgregar",
			edit: "ctgProvinciaEditar",
			save: "ctgProvinciaGuardar",
			remove: "ctgProvinciaEliminar",
			cancel: "ctgProvinciaCancelar",
			grid: "ctgProvinciaGrid",
			form: "ctgProvinciaForm"
		},
		buttonsConfigMuni: {
			add: "ctgCantonAgregar",
			edit: "ctgCantonEditar",
			save: "ctgCantonGuardar",
			remove: "ctgCantonEliminar",
			cancel: "ctgCantonCancelar",
			grid: "ctgCantonGrid",
			form: "ctgCantonForm"
		},

		buttonsConfigCol: {
			add: "ctgDistritoAgregar",
			edit: "ctgDistritoEditar",
			save: "ctgDistritoGuardar",
			remove: "ctgDistritoEliminar",
			cancel: "ctgDistritoCancelar",
			grid: "ctgDistritoGrid",
			form: "ctgDistritoForm"
		},buttonsConfigPob: {
			add: "ctgPobladoAgregar",
			edit: "ctgPobladoEditar",
			save: "ctgPobladoGuardar",
			remove: "ctgPobladoEliminar",
			cancel: "ctgPobladoCancelar",
			grid: "ctgPobladoGrid",
			form: "ctgPobladoForm"
		},
		guardarDatos: function(form,url, path, tipoForm){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp(form).getForm().submit({
    			url: url,
    			params: {
                    tipo: tipoForm
                },
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
    				if(tipoForm==1){
						Efx.combos.initProvGrid(action.result.ctgProvincias || []);
    					Ext.getCmp("ctgProvinciaGrid").getStore().loadData(Efx.combos.getAllProvGrid());
    					Efx.combos.initProvincias(action.result.ctgProvincias || []);
    					Ext.getCmp("ctgProvincia").store.loadData(Efx.combos.getAllProvincias());
					}
    				else if(tipoForm==2){
    					Efx.combos.initCantGrid(action.result.ctgCantons || []);
    					Ext.getCmp("ctgCantonGrid").getStore().loadData(Efx.combos.getAllGridCantonesByProvincia(
    							Ext.getCmp("ctgProvinciaGrid").getSelectionModel().getSelection()[0].data.ctgProvinciaId));
    					Efx.combos.initCantones(action.result.ctgCantons || []);
    					Ext.getCmp("ctgCanton").store.loadData(Efx.combos.getAllCantonesByProvincia(
    							Ext.getCmp("ctgProvinciaGrid").getSelectionModel().getSelection()[0].data.ctgProvinciaId));
    				}
    				else if(tipoForm==3){
    					Efx.combos.initDistritoGrid(action.result.ctgDistritos || []);
    					Ext.getCmp("ctgDistritoGrid").getStore().loadData(Efx.combos.getAllGridDistritosByCanton(
    					Ext.getCmp("ctgCantonGrid").getSelectionModel().getSelection()[0].data.ctgCantonId));
    				}else if(tipoForm==4){
    					Efx.combos.initPobladoGrid(action.result.ctgPoblados || []);
    					Ext.getCmp("ctgPobladoGrid").getStore().loadData(Efx.combos.getAllGridPobladosByDistrito(
    							Ext.getCmp("ctgDistritoGrid").getSelectionModel().getSelection()[0].ctgDistritoId));
    				}
    				Ext.getCmp("ctgProvinciaCancelar").handler();
    				Ext.getCmp("ctgCantonCancelar").handler();
    				Ext.getCmp("ctgDistritoCancelar").handler();
    				Ext.getCmp("ctgPobladoCancelar").handler();
    			},
    			failure: Efx.form.failureProcedure
   			});

		},
		init: function(contextPath,municipios, colonias){
			var config = {};
			var accion='';
			config.items = {
				flex: 1,
				xtype: "panel",
				layout: {
					type: "vbox",
					align : "center",
					pack  : "start"
				},
				border: false,
				dockedItems: [{xtype: 'toolbar', items: ['->',{xtype:'label',text:'DISTRIBUCION TERRITORIAL',cls: "ctg_label"}]}],
				defaults: {width: 950, margins: "5 0 5 0"},
				items: [
			       {
			    	   flex: 1,
					   title: "",
			    	   xtype: "panel",
					   layout: {
							type: "hbox",
							align : "center",
							pack  : "start"
						},
						border: false,
						defaults: {width: 250},
						items: [
						        {
									title: "PROVINCIAS",
									xtype: "panel",
									margin: "0 5 0 0",
									tbar: [
											{
												iconCls:Efx.constants.icons.ADD_ICON,
												text: 'Agregar Registro',
												scope: this,
												handler: function(){
													Ext.getCmp("ctgProvinciaForm").show();
													Ext.getCmp("ctgCantonForm").hide();
													Ext.getCmp("ctgDistritoForm").hide();
													Ext.getCmp("ctgPobladoForm").hide();

													Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigDepto, "add");
													Ext.getCmp("ctgProvinciaId").setReadOnly(true);
											    }
											}
									    ],
									items: [
												{
													id: "ctgProvinciaGrid",
													xtype: "grid",
													width: 250,
													height: 280,
													border: false,
													store: new Ext.data.SimpleStore({
													   data: Efx.combos.getAllProvGrid(),
													   fields: ["ctgProvinciaId", "ctgProvinciaNombre","ctgProvinciaActivo"],
													   sorters: [
															{
																property: "ctgProvinciaId",
																order: "ASC"
															}
											           ]
													}),
												    columns: [
												        {header: "Provincia",  dataIndex: "ctgProvinciaNombre", flex: 1}
												    ],
												    listeners: {
														selectionchange: function(grid, selections, options){
															var record = selections && selections.length > 0 ? selections[0] : null;
												    		if(record){
																Efx.form.setValues("ctgProvinciaForm", record.data);
																Ext.getCmp("ctgCantonForm").hide();
																Ext.getCmp("ctgDistritoForm").hide();
																Ext.getCmp("ctgPobladoForm").hide();
																Ext.getCmp("ctgProvinciaForm").show();
																Ext.getCmp("ctgCantonGrid").store.removeAll();
																Ext.getCmp("ctgDistritoGrid").store.removeAll();
																Ext.getCmp("ctgPobladoGrid").store.removeAll();
																Ext.getCmp("ctgCantonGrid").store.loadData(Efx.combos.getAllGridCantonesByProvincia(record.data.ctgProvinciaId));
													        	Ext.getCmp("ctgCanton").store.loadData(Efx.combos.getAllCantonesByProvincia(record.data.ctgProvinciaId));
													        	Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigDepto, "rowclick");
												    		}
										                },
										                sortchange: function(ct, column){
															Ext.getCmp("ctgCantonForm").hide();
															Ext.getCmp("ctgDistritoForm").hide();


										                }
												    }

												}

									        ]
						        } ,
						        {
									title: "CANTONES",
									xtype: "panel",
									margin: "0 5 0 0",
									tbar: [
											{
												iconCls:Efx.constants.icons.ADD_ICON,
												text: 'Agregar Registro',
												scope: this,
												handler: function(){
														Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigMuni, "add");
														Ext.getCmp("ctgProvinciaForm").hide();
														Ext.getCmp("ctgPobladoForm").hide();
														Ext.getCmp("ctgDistritoForm").hide();
														Ext.getCmp("ctgCantonForm").show();
														Ext.getCmp("ctgCantonId").setReadOnly(true);
												}
											}
									    ],
									items: [
												{
													id: "ctgCantonGrid",
													xtype: "grid",
													width: 250,
													height: 280,
													border: false,
													store: new Ext.data.SimpleStore({
														autoLoad: false,
														data: Efx.combos.getAllGridCantonesByProvincia(0),//Efx.combos.getAllCantGrid(),
													    fields: ["ctgCantonId", "ctgCantonNombre","ctgProvincia","ctgCantonActivo"],
													    sorters: [
												              {
												            	  property: "ctgCantonId",
												            	  order: "ASC"
												              }
											            ]
													}),
												    columns: [{header: "Cant\u00F3n",  dataIndex: "ctgCantonNombre", flex: 1}],
												    listeners: {
												    	selectionchange: function(grid, selections, options){
												    		var record = selections && selections.length > 0 ? selections[0] : null;
												    		if(record){
																Efx.form.setValues("ctgCantonForm", record.data);
																Ext.getCmp("ctgProvinciaForm").hide();
																Ext.getCmp("ctgDistritoForm").hide();
																Ext.getCmp("ctgPobladoForm").hide();
																Ext.getCmp("ctgCantonForm").show();
																Ext.getCmp("ctgDistritoGrid").store.removeAll();
																Ext.getCmp("ctgPobladoGrid").store.removeAll();
																Ext.getCmp("ctgDistritoGrid").store.loadData(Efx.combos.getAllGridDistritosByCanton(record.data.ctgCantonId));
												        		Ext.getCmp("ctgCanton").store.loadData(Efx.combos.getAllCantonesByProvincia(Ext.getCmp("ctgProvinciaGrid").getSelectionModel().getSelection()[0].data.ctgProvinciaId));
//												        		Ext.getCmp("ctgCanton").store.loadData(Ext.getCmp("ctgCantonGrid").getStore());
																Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigMuni, "rowclick");
												    		}

										                },
										                itemclick: function(grid, selections, options){
												    		var record = selections && selections.length > 0 ? selections[0] : null;
												    		if(record){
																Efx.form.setValues("ctgCantonForm", record.data);
																Ext.getCmp("ctgProvinciaForm").hide();
																Ext.getCmp("ctgDistritoForm").hide();
																Ext.getCmp("ctgPobladoForm").hide();
																Ext.getCmp("ctgCantonForm").show();
																Ext.getCmp("ctgDistritoGrid").store.removeAll();
																Ext.getCmp("ctgPobladoGrid").store.removeAll();
																Ext.getCmp("ctgDistritoGrid").store.loadData(Efx.combos.getAllGridDistritosByCanton(record.data.ctgCantonId));
												        		Ext.getCmp("ctgCanton").store.loadData(Efx.combos.getAllCantonesByProvincia(Ext.getCmp("ctgProvinciaGrid").getSelectionModel().getSelection()[0].data.ctgProvinciaId));
//												        		Ext.getCmp("ctgCanton").store.loadData(Ext.getCmp("ctgCantonGrid").getStore());
																Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigMuni, "rowclick");
												    		}

										                }
												    }
												}
									        ]
						        },
						        {
									title: "DISTRITOS",
									xtype: "panel",
									flex: 1,
									margin: "0 5 0 0",
									tbar: [
											{
												iconCls:Efx.constants.icons.ADD_ICON,
												text: 'Agregar Registro',
												scope: this,
												border: false,
												handler: function(){
														Ext.getCmp("ctgProvinciaForm").hide();
														Ext.getCmp("ctgCantonForm").hide();
														Ext.getCmp("ctgPobladoForm").hide();
														Ext.getCmp("ctgDistritoForm").show();
														Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigCol, "add");
														Ext.getCmp("ctgDistritoId").setReadOnly(true);
											       }
											}
									    ],
									items: [
											 {
												id: "ctgDistritoGrid",
												xtype: "grid",
												flex: 1,
												height: 280,
												border: false,
												store: new Ext.data.SimpleStore({
													autoLoad: false,
													data: Efx.combos.getAllGridDistritosByCanton(0),//Efx.combos.getAllCantGrid(),
													fields: ["ctgDistritoId", "ctgDistritoNombre","ctgCanton", "ctgDistritoActivo"],
													sorters: [
												          {
												        	  property: "ctgDistritoId",
												        	  order: "ASC"
												          }
											        ]
										    	}),
											    columns: [
												      {header: "Distrito",  dataIndex: "ctgDistritoNombre", flex: 1},
												      {
												    	  header: "Activo",
												    	  dataIndex: "ctgDistritoActivo",
												    	  width: 40,
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
											    	selectionchange: function(grid, selections, options){
											    		var record = selections && selections.length > 0 ? selections[0] : null;
											    		if(record){
											    			Efx.form.setValues("ctgDistritoForm", record.data);
											    			Ext.getCmp("ctgCantonForm").hide();
											    			Ext.getCmp("ctgProvinciaForm").hide();
															Ext.getCmp("ctgPobladoForm").hide();
											    			Ext.getCmp("ctgDistritoForm").show();
											    			Ext.getCmp("ctgPobladoGrid").store.removeAll();
											        		Ext.getCmp("ctgPobladoGrid").store.loadData(Efx.combos.getAllGridPobladosByDistrito(record.data.ctgDistritoId));
											        		Ext.getCmp("ctgDistrito").store.loadData(Efx.combos.getAllDistritosByCanton(Ext.getCmp("ctgCantonGrid").getSelectionModel().getSelection()[0].data.ctgCantonId));
											        		Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigCol, "rowclick");
											    		}
									                }
											    }
											}
										]
						        },
						        {
									title: "BARRIOS/POBLADOS",
									xtype: "panel",
									flex: 1,
									tbar: [
											{
												iconCls:Efx.constants.icons.ADD_ICON,
												text: 'Agregar Registro',
												scope: this,
												handler: function(){
														Ext.getCmp("ctgProvinciaForm").hide();
														Ext.getCmp("ctgCantonForm").hide();
														Ext.getCmp("ctgDistritoForm").hide();
														Ext.getCmp("ctgPobladoForm").show();
														Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigPob, "add");
														Ext.getCmp("ctgPobladoId").setReadOnly(true);
											       }
											}
									    ],
									items: [
											 {
												id: "ctgPobladoGrid",
												xtype: "grid",
												flex: 1,
												height: 280,
												border: false,
												store: new Ext.data.SimpleStore({
													autoLoad: false,
													data: Efx.combos.getAllGridCantonesByProvincia(0),//Efx.combos.getAllCantGrid(),
													fields: ["ctgPobladoId", "ctgPobladoNombre","ctgDistrito", "ctgPobladoActivo"],
													sorters: [
												          {
												        	  property: "ctgPobladoId",
												        	  order: "ASC"
												          }
											        ]
										    	}),
											    columns: [
												      {header: "Poblado",  dataIndex: "ctgPobladoNombre", flex: 1},
												      {
												    	  header: "Activo",
												    	  dataIndex: "ctgPobladoActivo",
												    	  width: 40,
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
											    	selectionchange: function(grid, selections, options){
											    		var record = selections && selections.length > 0 ? selections[0] : null;
											    		if(record){
											    			Efx.form.setValues("ctgPobladoForm", record.data);
											    			Ext.getCmp("ctgCantonForm").hide();
											    			Ext.getCmp("ctgProvinciaForm").hide();
											    			Ext.getCmp("ctgDistritoForm").hide();
															Ext.getCmp("ctgPobladoForm").show();
											    			Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigPob, "rowclick");
											    		}
									                }
											    }
											}
										]
						        }
						       ]
			       }
			       ,{
						xtype: "form",
						title: "PROVINCIAS",
						id: "ctgProvinciaForm",
						activeRecord: null,
						flex: 1,
						bodyPadding: 5,
						layout: {
							type: "table",
							columns: 2,
							tableAttrs: {
					            style: {width: "590px", "margin-top": "10px", border:"1"},
					            align: "center"
					        }
						},
					    defaults: {selectOnFocus: true,  enforceMaxLength: true, maxLength: 200, allowEnable: true},
					    tbar: [
							{
								id: 'ctgProvinciaEditar',
								iconCls:Efx.constants.icons.EDIT_ICON,
								text: 'Editar Registro',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigDepto, "edit");
									Ext.getCmp("ctgProvinciaId").setReadOnly(true);

								}
							},{
								id: 'ctgProvinciaGuardar',
								iconCls:Efx.constants.icons.SAVE_ICON,
								text: 'Guardar Cambios',
								hidden: true,
								handler: function(){
									CtgDistribucionTerritorial.guardarDatos("ctgProvinciaForm",contextPath + '/distribucion/create',contextPath,"1");
								}
							},{
								id: 'ctgProvinciaEliminar',
								iconCls:Efx.constants.icons.DELETE_ICON,
								text: 'Eliminar Registro',
								hidden: true,
								itemId: 'delete',
								handler: function()
								{
									Efx.message.confirmDelete(function(){
										CtgDistribucionTerritorial.guardarDatos("ctgProvinciaForm",contextPath + '/distribucion/delete',contextPath,"1");
									},'');
								}
							},{
								id: 'ctgProvinciaCancelar',
								iconCls:Efx.constants.icons.CANCEL_ICON,
								text: 'Cancelar',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigDepto, "cancel");
						       }
							}
			            ],
						items:[
							{xtype: "label", text: "Nombre:", cls: "x-form-item label_spacing"},
							{
				    			   xtype: "textfield",
				    			   id: "ctgProvinciaNombre",
				    			   name: "ctgProvincia.ctgProvinciaNombre",
				    			   allowBlank: false,
				    			   width: 250,
				    			   maxLength: 20
			    			},
			    			{xtype: "label", text: "Estado:", cls: "x-form-item label_spacing"},
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
						    	   width: 250,
						    	   allowBlank: false,
						    	   id: "ctgProvinciaActivo",
						    	   name:"ctgProvincia.ctgProvinciaActivo"
			    			},{
						    	   xtype: "hidden",
						    	   id: "ctgProvinciaId",
						    	   name: "ctgProvincia.ctgProvinciaId",
						    	   maxLength: 10
					    	}
				        ]
					},{
						xtype: "form",
						title: "CANTONES",
						id: "ctgCantonForm",
						activeRecord: null,
						flex: 1,
						bodyPadding: 5,
						layout: {
							type: "table",
							columns: 2,
							tableAttrs: {
					            style: {width: "590px", "margin-top": "10px", border:"1"},
					            align: "center"
					        }
						},
					    defaults: {selectOnFocus: true,  enforceMaxLength: true, maxLength: 200, allowEnable: true},
					    tbar: [
							{
								id: 'ctgCantonEditar',
								iconCls:Efx.constants.icons.EDIT_ICON,
								text: 'Editar Registro',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigMuni, "edit");
									Ext.getCmp("ctgCantonId").setReadOnly(true);
								}
							},{
								id: 'ctgCantonGuardar',
								iconCls:Efx.constants.icons.SAVE_ICON,
								text: 'Guardar Cambios',
								hidden: true,
								handler: function(){
										CtgDistribucionTerritorial.guardarDatos("ctgCantonForm",contextPath + '/distribucion/create',contextPath,"2");
								}
							},{
								id: 'ctgCantonEliminar',
								iconCls:Efx.constants.icons.DELETE_ICON,
								text: 'Eliminar Registro',
								hidden: true,
								itemId: 'delete',
								handler: function()
								{
									Efx.message.confirmDelete(function(){
										CtgDistribucionTerritorial.guardarDatos("ctgCantonForm",contextPath + '/distribucion/delete',contextPath,"2");
									},'');
								}
							},{
								id: 'ctgCantonCancelar',
								iconCls:Efx.constants.icons.CANCEL_ICON,
								text: 'Cancelar',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigMuni, "cancel");
						       }
							}
			            ],
						items:[

						   {xtype: "label", text: "Provincia:", cls: "x-form-item label_spacing"},
						   {
							   xtype: "combo",
							   id: "ctgProvincia",
							   name: "ctgCanton.ctgProvincia.ctgProvinciaId",
							   store: new Ext.data.SimpleStore({
								   data: Efx.combos.getAllProvincias(),
								   fields: ["ctgProvinciaId", "ctgProvinciaNombre","ctgProvinciaActivo"]
							   }),
							   width: 250,
							   displayField: "ctgProvinciaNombre",
							   valueField: "ctgProvinciaId"
							},
							{xtype: "label", text: "Nombre:", cls: "x-form-item label_spacing"},
							{
				    			   xtype: "textfield",
				    			   id: "ctgCantonNombre",
				    			   name: "ctgCanton.ctgCantonNombre",
				    			   allowBlank: false,
				    			   width: 250,
				    			   maxLength: 40
			    			},
			    			{xtype: "label", text: "Estado:", cls: "x-form-item label_spacing"},
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
						    	   allowBlank: false,
						    	   width: 250,
						    	   id: "ctgCantonActivo",
						    	   name:"ctgCanton.ctgCantonActivo"
			    			},{
						    	   xtype: "hidden",
						    	   id: "ctgCantonId",
						    	   name: "ctgCanton.ctgCantonId",
						    	   maxLength: 10
					    	}
				        ]
					},
			        {
						xtype: "form",
						title: "DISTRITOS",
						id: "ctgDistritoForm",
						activeRecord: null,
						flex: 1,
						bodyPadding: 5,
						layout: {
							type: "table",
							columns: 2,
							tableAttrs: {
					            style: {width: "590px", "margin-top": "10px", border:"1"},
					            align: "center"
					        }
						},
					    defaults: {selectOnFocus: true,  enforceMaxLength: true, maxLength: 200, allowEnable: true},
					    tbar: [
							{
								id: 'ctgDistritoEditar',
								iconCls:Efx.constants.icons.EDIT_ICON,
								text: 'Editar Registro',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigCol, "edit");
									Ext.getCmp("ctgDistritoId").setReadOnly(true);
								}
							},{
								id: 'ctgDistritoGuardar',
								iconCls:Efx.constants.icons.SAVE_ICON,
								text: 'Guardar Cambios',
								hidden: true,
								handler: function(){
										CtgDistribucionTerritorial.guardarDatos("ctgDistritoForm",contextPath + '/distribucion/create',contextPath,"3");
								}
							},{
								id: 'ctgDistritoEliminar',
								iconCls:Efx.constants.icons.DELETE_ICON,
								text: 'Eliminar Registro',
								hidden: true,
								itemId: 'delete',
								handler: function()
								{
									Efx.message.confirmDelete(function(){
										CtgDistribucionTerritorial.guardarDatos("ctgDistritoForm",contextPath + '/distribucion/delete',contextPath,"3");
									},'');
								}
							},{
								id: 'ctgDistritoCancelar',
								iconCls:Efx.constants.icons.CANCEL_ICON,
								text: 'Cancelar',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigCol, "cancel");
						       }
							}
			            ],
						items:[
					       	{xtype: "label", text: "Cant\u00F3n:", cls: "x-form-item label_spacing"},
							{
								   xtype: "combo",
								   id: "ctgCanton",
								   name: "ctgDistrito.ctgCanton.ctgCantonId",
								   store: new Ext.data.SimpleStore({
									   data: Efx.combos.getAllCantonesByProvincia(),

									   fields: ["ctgCantonId", "ctgCantonNombre", "ctgProvincia"]
								   }),
								   displayField: "ctgCantonNombre",
								   width: 250,
								   allowBlank: false,
								   valueField: "ctgCantonId"

							},
							{xtype: "label", text: "Nombre:", cls: "x-form-item label_spacing"},
							{
				    			   xtype: "textfield",
				    			   id: "ctgDistritoNombre",
				    			   name: "ctgDistrito.ctgDistritoNombre",
				    			   allowBlank: false,
				    			   width: 250,
				    			   maxLength: 60
			    			},
			    			{xtype: "label", text: "Estado:", cls: "x-form-item label_spacing"},
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
						    	   width: 250,
						    	   allowBlank: false,
						    	   id: "ctgDistritoActivo",
						    	   name:"ctgDistrito.ctgDistritoActivo"
			    			},{
						    	   xtype: "hidden",
						    	   id: "ctgDistritoId",
						    	   name: "ctgDistrito.ctgDistritoId",
						    	   maxLength: 10
					    	}
				        ]
					},
			        {
						xtype: "form",
						title: "POBLADOS",
						id: "ctgPobladoForm",
						activeRecord: null,
						flex: 1,
						bodyPadding: 5,
						layout: {
							type: "table",
							columns: 2,
							tableAttrs: {
					            style: {width: "590px", "margin-top": "10px", border:"1"},
					            align: "center"
					        }
						},
					    defaults: {selectOnFocus: true,  enforceMaxLength: true, maxLength: 200, allowEnable: true},
					    tbar: [
							{
								id: 'ctgPobladoEditar',
								iconCls:Efx.constants.icons.EDIT_ICON,
								text: 'Editar Registro',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigPob, "edit");
									Ext.getCmp("ctgPobladoId").setReadOnly(true);
								}
							},{
								id: 'ctgPobladoGuardar',
								iconCls:Efx.constants.icons.SAVE_ICON,
								text: 'Guardar Cambios',
								hidden: true,
								handler: function(){
										CtgDistribucionTerritorial.guardarDatos("ctgPobladoForm",contextPath + '/distribucion/create',contextPath,"4");
								}
							},{
								id: 'ctgPobladoEliminar',
								iconCls:Efx.constants.icons.DELETE_ICON,
								text: 'Eliminar Registro',
								hidden: true,
								itemId: 'delete',
								handler: function()
								{
									Efx.message.confirmDelete(function(){
										CtgDistribucionTerritorial.guardarDatos("ctgPobladoForm",contextPath + '/distribucion/delete',contextPath,"4");
									},'');
								}
							},{
								id: 'ctgPobladoCancelar',
								iconCls:Efx.constants.icons.CANCEL_ICON,
								text: 'Cancelar',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CtgDistribucionTerritorial.buttonsConfigPob, "cancel");
						       }
							}
			            ],
						items:[
					       	{xtype: "label", text: "Distrito:", cls: "x-form-item label_spacing"},
							{
								   xtype: "combo",
								   id: "ctgDistrito",
								   name: "ctgPoblado.ctgDistrito.ctgDistritoId",
								   store: new Ext.data.SimpleStore({
									   data: Efx.combos.getAllDistritosByCanton(0),
									   fields: ["ctgDistritoId", "ctgDistritoNombre", "ctgCanton"]
								   }),
								   displayField: "ctgDistritoNombre",
								   width: 250,
								   allowBlank: false,
								   valueField: "ctgDistritoId"

							},
							{xtype: "label", text: "Nombre:", cls: "x-form-item label_spacing"},
							{
				    			   xtype: "textfield",
				    			   id: "ctgPobladoNombre",
				    			   name: "ctgPoblado.ctgPobladoNombre",
				    			   allowBlank: false,
				    			   width: 250,
				    			   maxLength: 60
			    			},
			    			{xtype: "label", text: "Estado:", cls: "x-form-item label_spacing"},
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
						    	   width: 250,
						    	   allowBlank: false,
						    	   id: "ctgPobladoActivo",
						    	   name:"ctgPoblado.ctgPobladoActivo"
			    			},{
						    	   xtype: "hidden",
						    	   id: "ctgPobladoId",
						    	   name: "ctgPoblado.ctgPobladoId",
						    	   maxLength: 10
					    	}
			    			/*,{
					    		xtype:"hidden",
					    		id:"ctgPobladoCodigo",
					    		name:"ctgPoblado.ctgPobladoCodigo",
					    		value: "123",
					    		maxLength: 10
					    	}*/
				        ]
					}
		        ]
			};
			return config;
		}
	};
}();