CfgRegistro = function(){
	return {
		buttonsConfigDepto: {
			add: "cfgRegistroAgregar",
			edit: "cfgRegistroEditar",
			save: "cfgRegistroGuardar",
			remove: "cfgRegistroEliminar",
			cancel: "cfgRegistroCancelar",
			grid: "cfgRegistroGrid",
			form: "cfgRegistroForm"
		},
		guardarDatos: function(form,url, path, tipoForm){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp(form).getForm().submit({
    			url: url,
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			success: function(form, action){
    				Efx.message.alert(action.result.message);
						Ext.getCmp("cfgRegistroCancelar").handler();
						Efx.combos.initRegistroGrid(action.result.cfgRegistro || []);
    					Ext.getCmp("cfgRegistroGrid").getStore().loadData(Efx.combos.getAllRegistroGrid());
    					Efx.combos.initRegistros(action.result.cfgRegistro || []);
    					Ext.getCmp("cfgRegistro").store.loadData(Efx.combos.getAllRegistros());

    			},
    			failure: Efx.form.failureProcedure
   			});

		},
		init: function(contextPath, config){
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
				dockedItems: [{xtype: 'toolbar', items: ['->',{xtype:'label',text:'REGISTRO',cls: "ctg_label"}]}],
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
						defaults: {width:900},
						items: [
						        {
									title: "CONFIGURACI\u00d3N REGISTRO DE CLIENTE",
									xtype: "panel",
									margin: "0 5 0 0",
									tbar: [
											{
												iconCls:Efx.constants.icons.ADD_ICON,
												text: 'Agregar Registro',
												scope: this,
												handler: function(){
													Ext.getCmp("cfgRegistroForm").show();
													Efx.form.switchButton(CfgRegistro.buttonsConfigDepto, "add");
													Ext.getCmp("cfgRegistroId").setReadOnly(true);
											    }
											}
									    ],
									items: [
												{
													id: "cfgRegistroGrid",
													xtype: "grid",
													width: 900,
													height: 100,
													flex: 1,
													border: false,
													store: new Ext.data.SimpleStore({
													   data: Efx.combos.getAllRegistroGrid(),
													   fields: ["cfgRegistroId"
													            ,"cfgRegistroCodigoEmpresa"
													            ,"cfgRegistroNombreEmpresa"
													            ,"cfgPlataforma"
													            , "cfgPrograma"
													            ,"cfgAmbiente"
													            ,"cfgPlataformaDescripcion"
													            , "cfgProgramaDescripcion"
													            ,"cfgAmbienteDescripcion"
													            ],
													   sorters: [
															{
																property: "cfgRegistroNombreEmpresa",
																order: "ASC"
															}
											           ]
													}),
												    columns: [
//												           {header: "Id",  dataIndex: "cfgRegistroId", flex: 1}
												           {header: "C\u00f3digo",  dataIndex: "cfgRegistroCodigoEmpresa", flex: 1}
												          ,{header: "Nombre",  dataIndex: "cfgRegistroNombreEmpresa", flex: 1}
												          ,{header: "Plataforma",  dataIndex: "cfgPlataformaDescripcion", flex: 1.5}
												          ,{header: "Programa",  dataIndex: "cfgProgramaDescripcion", flex: 1.5}
												          ,{header: "Ambiente",  dataIndex: "cfgAmbienteDescripcion", flex: 1.5}
												    ],
												    listeners: {
														selectionchange: function(grid, selections, options){
															var record = selections && selections.length > 0 ? selections[0] : null;
												    		if(record){
																Efx.form.setValues("cfgRegistroForm", record.data);
																Ext.getCmp("cfgRegistroForm").show();
													        	Efx.form.switchButton(CfgRegistro.buttonsConfigDepto, "rowclick");
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
						title: "REGISTRO",
						id: "cfgRegistroForm",
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
					    defaults: {selectOnFocus: true,  enforceMaxLength: true, allowEnable: true},
					    tbar: [
							{
								id: 'cfgRegistroEditar',
								iconCls:Efx.constants.icons.EDIT_ICON,
								text: 'Editar Registro',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CfgRegistro.buttonsConfigDepto, "edit");
								}
							},{
								id: 'cfgRegistroGuardar',
								iconCls:Efx.constants.icons.SAVE_ICON,
								text: 'Guardar Cambios',
								hidden: true,
								handler: function(){
									CfgRegistro.guardarDatos("cfgRegistroForm",contextPath + '/cfgRegistro/create',contextPath,"1");
								}
							},{
								id: 'cfgRegistroEliminar',
								iconCls:Efx.constants.icons.DELETE_ICON,
								text: 'Eliminar Registro',
								hidden: true,
								itemId: 'delete',
								handler: function()
								{
									Efx.message.confirmDelete(function(){
										CfgRegistro.guardarDatos("cfgRegistroForm",contextPath + '/cfgRegistro/delete',contextPath,"1");
									},'');
								}
							},{
								id: 'cfgRegistroCancelar',
								iconCls:Efx.constants.icons.CANCEL_ICON,
								text: 'Cancelar',
								hidden: true,
								handler: function(){
									Efx.form.switchButton(CfgRegistro.buttonsConfigDepto, "cancel");
						       }
							}
			            ],
						items:[
							{xtype: "label", text: "C\u00f3digo de Empresa", cls: "x-form-item label_spacing"},
							{
				    			   xtype: "textfield",
				    			   id: "cfgRegistroCodigoEmpresa",
				    			   name: "cfgRegistro.cfgRegistroCodigoEmpresa",
				    			   allowBlank: false,
				    			   width: 250,
				    			   maxLength: 20
			    			},
			    			{xtype: "label", text: "Nombre de Empresa", cls: "x-form-item label_spacing"},
							{
				    			   xtype: "textfield",
				    			   id: "cfgRegistroNombreEmpresa",
				    			   name: "cfgRegistro.cfgRegistroNombreEmpresa",
				    			   allowBlank: false,
				    			   width: 250,
				    			   maxLength: 100
			    			},
			    			{xtype: "label", text: "Tipo de Plataforma", cls: "x-form-item label_spacing"},
							{
				    			   xtype: "combo",
				    			   id: "cfgPlataforma",
				    			   name: "cfgPlataforma.cfgPlataformaId",
									submitOnDisable: true,
									disabled: true,
									store: new Ext.data.SimpleStore({
										data: Efx.combos.getAllPlataformas(),
									fields: ["cfgPlataformaId", "cfgPlataformaCodigo", "cfgPlataformaDescripcion"]
									}),
									displayField: "cfgPlataformaDescripcion",
									valueField: "cfgPlataformaId",
									width: 250,
									allowBlank: false

			    			},
			    			{xtype: "label", text: "Tipo de Programa", cls: "x-form-item label_spacing"},
			    			{
				    			   xtype: "combo",
				    			   id: "cfgPrograma",
				    			   name: "cfgPrograma.cfgProgramaId",
									submitOnDisable: true,
									disabled: true,
									store: new Ext.data.SimpleStore({
										data: Efx.combos.getAllProgramas(),
										fields: ["cfgProgramaId", "cfgProgramaCodigo", "cfgProgramaDescripcion"]
									}),
									displayField: "cfgProgramaDescripcion",
									valueField: "cfgProgramaId",
									width: 250,
									allowBlank: false

			    			},
			    			{xtype: "label", text: "Tipo de Ambiente", cls: "x-form-item label_spacing"},
			    			{
				    			   xtype: "combo",
				    			   id: "cfgAmbiente",
				    			   name: "cfgAmbiente.cfgAmbienteId",
									submitOnDisable: true,
									disabled: true,
									store: new Ext.data.SimpleStore({
										data: Efx.combos.getAllAmbientes(),
									fields: ["cfgAmbienteId", "cfgAmbienteCodigo", "cfgAmbienteDescripcion"]
									}),
									displayField: "cfgAmbienteDescripcion",
									valueField: "cfgAmbienteId",
									width: 250,
									allowBlank: false

			    			},
			    			{
						    	   xtype: "hidden",
						    	   id: "cfgRegistroId",
						    	   name: "cfgRegistro.cfgRegistroId",
						    	   maxLength: 10
					    	}
				        ]
					}

		        ]
			};
			return config;
		}
	};
}();