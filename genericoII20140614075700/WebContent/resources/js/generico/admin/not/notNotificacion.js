NotNotificaciones = function(){
	var fieldsNotificar = [];
	var labelsNotificar = [];
	return{
		getFieldsNotificar: function(){
			return fieldsNotificar;
		},
		setFieldsNotificar: function(value){
			fieldsNotificar = value;
		},
		getLabelsNotificar: function(){
			return labelsNotificar;
		},
		setLabelsNotificar: function(value){
			labelsNotificar = value;
		},

		buttonsConfig: {
			add: "notNotificacionAgregar",
			edit: "notNotificacionEditar",
			save: "notNotificacionGuardar",
			remove: "notNotificacionEliminar",
			cancel: "notNotificacionCancelar",
			grid: "notNotificacionGrid",
			form: "notNotificacionForm"
		},
		agregar: function(){
			Efx.form.switchButton(NotNotificaciones.buttonsConfig, "add");
			Efx.utils.setValue("notTipo","1");
			Efx.utils.setValue("notNotificarPor","1");
			Efx.utils.setValue("sgdUsuarioId","");
			Efx.utils.setValue("notPEP", "0");
			Efx.utils.setValue("notPEPRelacionado", "0");
			Efx.utils.setValue("notPEPSociedad", "0");
			Efx.utils.setValue("notArticulo15", "0");
			//Efx.utils.setValue("notSalaTercera", "0");
			Efx.utils.setValue("notListaInternacional", "0");
		},
		editar: function(){
			Efx.form.switchButton(NotNotificaciones.buttonsConfig, "edit");
			Ext.getCmp("pep").toggle(parseInt(Efx.utils.getValue("notPEP")));
			Ext.getCmp("pepRelacionado").toggle(parseInt(Efx.utils.getValue("notPEPRelacionado")));
			Ext.getCmp("pepSociedad").toggle(parseInt(Efx.utils.getValue("notPEPSociedad")));
			Ext.getCmp("articulo15").toggle(parseInt(Efx.utils.getValue("notArticulo15")));
//			Ext.getCmp("salaTercera").toggle(parseInt(Efx.utils.getValue("notSalaTercera")));
			Ext.getCmp("listaInternacional").toggle(parseInt(Efx.utils.getValue("notListaInternacional")));
			NotNotificaciones.changeNotificarPor();
		},
		cancelar: function(){
			Ext.getCmp("pep").toggle(false);
			Ext.getCmp("pepRelacionado").toggle(false);
			Ext.getCmp("pepSociedad").toggle(false);
			Ext.getCmp("articulo15").toggle(false);
//			Ext.getCmp("salaTercera").toggle(false);
			Ext.getCmp("listaInternacional").toggle(false);
			Efx.form.switchButton(NotNotificaciones.buttonsConfig, "cancel");
        },
		guardarDatos: function(url, path){
			Efx.message.progress("Guardando Informaci\u00F3n...");
			Ext.getCmp("notNotificacionForm").getForm().submit({
    			url: Efx.constants.CONTEXT_PATH + "/notificacion/save",
    			timeout: Efx.constants.TIMEOUT_SECONDS,
    			success: function(form, action){
    				Ext.Msg.hide();
    				Efx.message.alert(action.result.message);
    				NotNotificaciones.cancelar();
    				Ext.getCmp("notNotificacionGrid").store.read();
    			},
    			failure: Efx.form.failureProcedure
   			});
		},
		eliminarDatos: function(url, path){
			Efx.message.confirmDelete(function(){
				Ext.getCmp("notNotificacionForm").getForm().submit({
					url: Efx.constants.CONTEXT_PATH + "/notificacion/delete",
					timeout: Efx.constants.TIMEOUT_SECONDS,
					success: function(form, action){
						Efx.message.alert(action.result.message);
						NotNotificaciones.cancelar();
						Ext.getCmp("notNotificacionGrid").store.read();
					},
					failure: Efx.form.failureProcedure
				});
			});
		},
		changeNotificarPor: function(){
			var notificar = (Ext.getCmp("notTipo").getValue() == "2");
			var indexNotificarPor = parseInt(Ext.getCmp("notNotificarPor").getValue());
			Ext.each(NotNotificaciones.getLabelsNotificar(), function(){
				notificar = (notificar && this.notificarPor[indexNotificarPor]);
				Efx.utils.setVisible(this.id, notificar);
			});
			notificar = (Ext.getCmp("notTipo").getValue() == "2");
			Ext.each(NotNotificaciones.getFieldsNotificar(), function(){
				notificar = (notificar && this.notificarPor[indexNotificarPor]);
				Efx.utils.setVisibleEnableClean(this.id, notificar, notificar, !notificar);
				Efx.utils.setRequired(this.id, notificar);
			});
			/*var notificarPor = (Ext.getCmp("notNotificarPor").getValue() == "2" && notificar);
			Efx.utils.setVisible("lblSucursal", notificarPor);
			Efx.utils.setVisibleEnableClean("ctgSucursalId", notificarPor, notificarPor, !notificarPor);*/
		},
		init: function(){
			var config = {};
			Ext.define('Writer.Grid', {
				extend: 'Ext.grid.Panel',
				alias: 'widget.writergrid',
				requires: [
					'Ext.grid.plugin.CellEditing',
					'Ext.form.field.Text',
					'Ext.toolbar.TextItem'
				],

				//tabla de notificaciones

				initComponent: function(){
					Ext.apply(this, {
						frame: false,
					    columns: [
				              {header: "id",  dataIndex: "notId",  hidden: true},
				              {header: "Tipo Usuario",  dataIndex: "notTipo",  width: 75, renderer: function(v,s,o){
								  return (v=="1"?"USUARIO APLICACION":"OTROS");
							  }},
				              {header: "Nombre",  dataIndex: "notNombre", renderer: function(v,s,o){
								  return (v)? v: ((o.get("sgdUsuarioPrimerNombre") || "") + " " + (o.get("sgdUsuarioSegundoNombre") || "") + " " + (o.get("sgdUsuarioPrimerApellido") || "") + " " + (o.get("sgdUsuarioSegundoApellido") || ""));
							  }},
							  {header: "Correo",  dataIndex: "notCorreo",  width:120, id:"colCorreo", renderer: function(v,s,o){
								  return (v)? v: o.get("sgdUsuarioCorreoElectronico");
							  }},
							  {header: "",  dataIndex: "notPEP", align:'center', width:30, renderer: function(v,s,o){
								  return "<img src='" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_PEP_min"+(v=="1"?"":"_des")+".png' title='PEP'/>";
							  }},
							  {header: "",  dataIndex: "notPEPRelacionado", align:'center', width:30, renderer: function(v,s,o){
								  return "<img src='" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_pep_relacionado_min"+(v=="1"?"":"_des")+".png' title='PEP Relacionado' />";
							  }},
							  {header: "",  dataIndex: "notPEPSociedad", align:'center', width:30, renderer: function(v,s,o){
								  return "<img src='" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_sociedad_pep_min"+(v=="1"?"":"_des")+".png' title='PEP Sociedad'/>";
							  }},
							  {header: "",  dataIndex: "notArticulo15", align:'center', width:30, renderer: function(v,s,o){
								  return "<img src='" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_art15_min"+(v=="1"?"":"_des")+".png' title='Articulo 15'/>";
							  }},
//							  {header: "",  dataIndex: "notSalaTercera", align:'center', width:30, renderer: function(v,s,o){
//								  return "<img src='" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_salatercera_min"+(v=="1"?"":"_des")+".png' title='Sala Tercera'/>";
//							  }},
							  {header: "",  dataIndex: "notListaInternacional", align:'center', width:30, renderer: function(v,s,o){
								  return "<img src='" + Efx.constants.CONTEXT_PATH + "/resources/images/pep/img_lista_internacional_min"+(v=="1"?"":"_des")+".png' title='Lista Internacional'/>";
							  }}
					    ],
					    height: 150,
						listeners: {
							itemclick: function(view, record){
								NotNotificaciones.cancelar();
								Efx.form.setValues("notNotificacionForm", record.data);
								Efx.form.switchButton(NotNotificaciones.buttonsConfig, "rowclick");
			                }
					    }
					});
					this.callParent();
				}
			});
			Ext.define('NotNotificacion', {
				extend: 'Ext.data.Model',
				idProperty: 'notId',
				fields: [
					{name: 'notId'},
					{name: 'notCorreo'},
					{name: 'notTipo'},
					{name: 'notNombre'},
					{name: 'notPEP'},
					{name: 'notPEPRelacionado'},
					{name: 'notPEPSociedad'},
					{name: 'notArticulo15'},
					{name: 'notSalaTercera'},
					{name: 'notListaInternacional'},
					{name: 'sgdUsuarioId', type: 'string'},
					{name: 'sgdUsuarioUsuario'},
					{name: 'sgdUsuarioPrimerNombre'},
					{name: 'sgdUsuarioSegundoNombre'},
					{name: 'sgdUsuarioPrimerApellido'},
					{name: 'sgdUsuarioSegundoApellido'},
					{name: 'sgdUsuarioCorreoElectronico'},
					{name: 'ctgTipoSucursalId'},
					{name: 'ctgSubTipoSucursalId'},
					{name: 'ctgSucursalId'},
					{name: 'notNotificarPor'}
				]
			});
			Ext.tip.QuickTipManager.init();
			var store = Ext.create('Ext.data.Store', {
				model: 'NotNotificacion',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api: {
						read: Efx.constants.CONTEXT_PATH + '/notificacion/read'
					},
					reader: {
						type: 'array'
					},
					writer: {
						type: 'json',
						writeAllFields: true
					}
				}
			});
			config.items = {
				flex: 1,
				xtype: "panel",
				layout: {
					type: "vbox",
					align : "center",
					pack  : "start"
				},
				border: false,
				dockedItems: [{xtype: 'toolbar', items: ['->',{xtype:'label',text:'NOTIFICACIONES',cls: "ctg_label"}]}],
				defaults: {width: 800, margins: "5 0 5 0"},
				items: [
			       {
						id: 'notNotificacionGrid',
						xtype: 'writergrid',
						header:false,
						height: 250,
						forceFit:true,
						store:store
					},{
						xtype: "form",
						id: "notNotificacionForm",
						activeRecord: null,
						autoScroll: true,
						flex: 1,
						bodyPadding: 5,
						layout: {
							type: "table",
							columns: 6,
							tableAttrs: {
								style:{width: "770px"},
					            align: "center"
					        }
						},
						defaults: {
							width: 250,
							selectOnFocus: true,
							colspan: 2,
							enforceMaxLength: true,
							maxLength: 200,
							typeAhead: true,
							minChars: 1,
							queryMode: "local",
							forceSelection: true,
							allowEnable: true,
							listConfig: {minWidth: 250}
						},
						tbar:[
  							{
								id: "notNotificacionAgregar",
								iconCls:Efx.constants.icons.ADD_ICON,
								text: "Agregar",
								handler: function(){
									NotNotificaciones.agregar();
						        }
							},{
								id: "notNotificacionEditar",
								iconCls:Efx.constants.icons.EDIT_ICON,
								text: "Editar Registro",
								hidden: true,
								handler: function(){
									NotNotificaciones.editar();
								}
							},{
								id: "notNotificacionGuardar",
								iconCls:Efx.constants.icons.SAVE_ICON,
								text: "Guardar",
								hidden: true,
								handler: function(){
									NotNotificaciones.guardarDatos();
								}
							},{
								id: "notNotificacionEliminar",
								iconCls:Efx.constants.icons.DELETE_ICON,
								text: "Eliminar Registro",
								hidden: true,
								itemId: "delete",
								handler: function(){
									NotNotificaciones.eliminarDatos();
								}
							},{
								id: "notNotificacionCancelar",
								iconCls:Efx.constants.icons.CANCEL_ICON,
								text: "Cancelar",
								hidden: true,
								handler: function(){
									NotNotificaciones.cancelar();
						       }
							}
						],
						items:[
					        {xtype: "label", text: "", cls: "x-form-item label_spacing", style:"height: 10px", colspan: 6},
							{xtype: "label", text: "Tipo Usuario", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Nombre", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Correo", cls: "x-form-item label_spacing", id:"lblCorreo"},
							{
								xtype : "combo",
								id : "notTipo",
								name : "notNotificacion.notTipo",
								store : new Ext.data.SimpleStore({
									data : [["1", "USUARIO APLICACION"],["2", "OTROS"]],
									fields : ["value", "display"]
								}),
								value: "1",
								displayField : "display",
								valueField : "value",
								allowBlank: false,
								listeners:{
									change: function(field){
										switch(field.getValue()){
											case "2":
												Efx.utils.setVisible("lblCorreo", true);
												Efx.utils.setVisibleEnableClean("sgdUsuarioId", false, false, true);
												Efx.utils.setVisibleEnableClean("notNombre", true, true, false);
												Efx.utils.setVisibleEnableClean("notCorreo", true, true, false);

												Efx.utils.setRequired("sgdUsuarioId", false);
												Efx.utils.setRequired("notNombre", true);
												Efx.utils.setRequired("notCorreo", true);
											break;
											default:
												Efx.utils.setVisible("lblCorreo", false);
												Efx.utils.setVisibleEnableClean("sgdUsuarioId", true, true, false);
												Efx.utils.setVisibleEnableClean("notNombre", false, false, true);
												Efx.utils.setVisibleEnableClean("notCorreo", false, false, true);

												Efx.utils.setRequired("sgdUsuarioId", true);
												Efx.utils.setRequired("notNombre", false);
												Efx.utils.setRequired("notCorreo", false);
											break;
										}
										NotNotificaciones.changeNotificarPor();
									}
								}
						    },
						    {
					    		xtype: "container",
					    		disabledCls: "disableContainer",
								defaults: {
									width: 250,
									selectOnFocus: true,
									enforceMaxLength: true,
									maxLength: 200,
									typeAhead: true,
									minChars: 1,
									queryMode: "local",
									forceSelection: true,
									allowEnable: true,
									listConfig: {minWidth: 250}
								},
							    items:[
									{
										xtype: "textfield",
										id: "notNombre",
										name: "notNotificacion.notNombre",
										maxLength: 20,
										allowBlank: false,
										fieldStyle:{width: '250px'},
										hidden: true
									},
									{
									   xtype: "combo",
									   id:"sgdUsuarioId",
									   name: "sgdUsuario.sgdUsuarioId",
									   store: new Ext.data.SimpleStore({
										   data: Efx.combos.getAllUsuarios(),
										   fields: [
									            "USUARIOID",
									            "SGDUSUARIOACTIVO",
									            "SGDUSUARIOUSUARIO",
									            "SGDUSUARIOCLAVE",
									            "SGDUSUARIOPRIMERNOMBRE",
									            "SGDUSUARIOSEGUNDONOMBRE",
									            "SGDUSUARIOPRIMERAPELLIDO",
									            "SGDUSUARIOSEGUNDOAPELLIDO",
									            {
									                name: 'NOMBRECOMPLETO',
									                convert: function(value, r) {
									                    var fullName  = (r.get('SGDUSUARIOPRIMERNOMBRE') || "") +
									                    	" " + (r.get('SGDUSUARIOSEGUNDONOMBRE') || "") +
									                    	" " + (r.get('SGDUSUARIOPRIMERAPELLIDO') || "") +
							                    			" " + (r.get('SGDUSUARIOSEGUNDOAPELLIDO') || "");
									                    return fullName;
									                }
									            }
								            ]
									   }),
									   displayField: "NOMBRECOMPLETO",
									   valueField: "USUARIOID",
									   triggerAction: "all",
									   allowBlank: false,
									   mode: "local"
								    }
								]
							},
							{
							   xtype: "textfield",
							   id: "notCorreo",
							   vtype: 'email',
							   name: "notNotificacion.notCorreo",
							   maxLength: 256,
							   cls: "remove-uppercase",
							   allowBlank: false
							},
							{xtype: "label", text: "Notificar Por", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Tipo de Sucursal", cls: "x-form-item label_spacing", notificarPor: [true, true, true]},
							{xtype: "label", text: "Subtipo de Sucursal", cls: "x-form-item label_spacing", notificarPor: [false, true, true]},
							{
								xtype : "combo",
								id : "notNotificarPor",
								name : "notNotificacion.notNotificarPor",
								store : new Ext.data.SimpleStore({
									data : [["0", "TIPO SUCURSAL"],["1", "SUBTIPO SUCURSAL"],["2","SUCURSAL"]],
									fields : ["value", "display"]
								}),
								value: "1",
								displayField : "display",
								valueField : "value",
								allowBlank: false,
								listeners:{
									change: function(field){
										NotNotificaciones.changeNotificarPor();
									}
								}
						    },
					    	{
					    	   xtype: "combo",
					    	   id:"ctgTipoSucursalId",
					    	   name: "ctgTipoSucursal.ctgTipoSucursalId",
								store: new Ext.data.SimpleStore({
									   data: Efx.combos.getAllTipoSucursalGrid(),
									   fields: ["ctgTipoSucursalId", "ctgTipoSucursalNombre","ctgTipoSucursalActivo"]
								}),
					    	   displayField: "ctgTipoSucursalNombre",
					    	   valueField: "ctgTipoSucursalId",
					    	   triggerAction: "all",
					    	   notificarPor: [true, true, true],
					    	   mode: "local",
					    	   listeners:{
					    		   change: function(field, value){
					    			   var cmbSubTipoSuc = Ext.getCmp("ctgSubTipoSucursalId");
					    			   var cmbSuc = Ext.getCmp("ctgSucursalId");
					    			   cmbSubTipoSuc.store.loadData(Efx.combos.getAllSubTipoSucursalByTipoSucursal(value));
					    			   cmbSubTipoSuc.setValue("");
					    			   cmbSuc.setValue("");
					    		   }
					    	   }
						    },
						    {
						    	xtype: "combo",
						    	id:"ctgSubTipoSucursalId",
						    	name: "ctgSubTipoSucursal.ctgSubTipoSucursalId",
								store: new Ext.data.SimpleStore({
									autoLoad: false,
									data: Efx.combos.getAllSubTipoSucursalByTipoSucursal(0),
								    fields: ["ctgSubTipoSucursalId", "ctgSubTipoSucursalNombre","ctgTipoSucursal","ctgSubTipoSucursalCodigo","ctgSubTipoSucursalUsuarioBureau","ctgSubTipoSucursalContrasenaBureau","ctgSubTipoSucursalActivo"]
								}),
						    	displayField: "ctgSubTipoSucursalNombre",
						    	valueField: "ctgSubTipoSucursalId",
						    	triggerAction: "all",
						    	notificarPor: [false, true, true],
						    	mode: "local",
					    	    listeners:{
					    		   change: function(field, value){
					    			   var cmbSuc = Ext.getCmp("ctgSucursalId");
					    			   cmbSuc.store.loadData(Efx.combos.getAllSucursaleBySubTipoSucursal(value));
					    			   cmbSuc.setValue("");
					    		   }
					    	    }
						    },
						    {xtype: "label", text: "Sucursal", cls: "x-form-item label_spacing", colspan: 6, id:"lblSucursal", notificarPor: [false, false, true]},
						    {
						    	xtype: "combo",
						    	id:"ctgSucursalId",
						    	name: "ctgSucursal.ctgSucursalId",
								store: new Ext.data.SimpleStore({
									autoLoad: false,
									data: Efx.combos.getAllSucursaleBySubTipoSucursal(0),
									fields: ["ctgSucursalId", "ctgSucursalNombre","ctgSubTipoSucursal","ctgSucursalActivo","ctgSucursalPoseeComiteCreditos","ctgSucursalAtiendeOtraSucursal"]
								}),
						    	displayField: "ctgSucursalNombre",
						    	valueField: "ctgSucursalId",
						    	triggerAction: "all",
						    	colspan: 6,
						    	notificarPor: [false, false, true],
						    	mode: "local"
						    },

						    {xtype: "label", text: "", cls: "x-form-item label_spacing", style:"height: 10px", colspan: 6},
							{xtype: "label", text: "PEP", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "PEP Relacionado", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "PEP Sociedad", cls: "x-form-item label_spacing"},
			                {
				                xtype: 'button',
				                id: 'pep',
			                    text: '',
			                    height: 90,
			                    enableToggle: true,
			                    iconCls: 'pep',
			                    listeners: {
			                        toggle: function(sender, checked){
			                        	Ext.getCmp("notPEP").setValue(checked?"1":"0");
			                        }
			                    }
			                },
							{
								xtype: 'button',
								id: 'pepRelacionado',
								text: '',
								height: 90,
								enableToggle: true,
								iconCls: 'pepRelacionado',
			                    listeners: {
			                        toggle: function(sender, checked){
			                        	Ext.getCmp("notPEPRelacionado").setValue(checked?"1":"0");
			                        }
			                    }
							},
							{
								xtype: 'button',
								id: 'pepSociedad',
								text: '',
								height: 90,
								enableToggle: true,
								iconCls: 'pepSociedad',
			                    listeners: {
			                        toggle: function(sender, checked){
			                        	Ext.getCmp("notPEPSociedad").setValue(checked?"1":"0");
			                        }
			                    }
							},
							{xtype: "label", text: "", cls: "x-form-item label_spacing", style:"height: 10px", colspan: 6},
							{xtype: "label", text: "Articulo 15", cls: "x-form-item label_spacing"},
//							{xtype: "label", text: "Sala Tercera", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Lista Internacional", cls: "x-form-item label_spacing", colspan: 4},
							{
								xtype: 'button',
								id: 'articulo15',
								text: '',
								height: 90,
								enableToggle: true,
								iconCls: 'articulo15',
			                    listeners: {
			                        toggle: function(sender, checked){
			                        	Ext.getCmp("notArticulo15").setValue(checked?"1":"0");
			                        }
			                    }
							},
//							{
//								xtype: 'button',
//								id: 'salaTercera',
//								text: '',
//								height: 90,
//								enableToggle: true,
//								iconCls: 'salaTercera',
//			                    listeners: {
//			                        toggle: function(sender, checked){
//			                        	Ext.getCmp("notSalaTercera").setValue(checked?"1":"0");
//			                        }
//			                    }
//							},
							{
								xtype: 'button',
								id: 'listaInternacional',
								text: '',
								height: 90,
								enableToggle: true,
								iconCls: 'listaInternacional',
			                    listeners: {
			                        toggle: function(sender, checked){
			                        	Ext.getCmp("notListaInternacional").setValue(checked?"1":"0");
			                        }
			                    },
			                    colspan: 4
							},
							{xtype: 'hidden', name: "notNotificacion.notId", id: "notId", value:"0"},
							{xtype: 'hidden', name: "notNotificacion.notPEP", id: "notPEP", value:"0"},
							{xtype: 'hidden', name: "notNotificacion.notPEPRelacionado", id: "notPEPRelacionado", value:"0"},
							{xtype: 'hidden', name: "notNotificacion.notPEPSociedad", id: "notPEPSociedad", value:"0"},
							{xtype: 'hidden', name: "notNotificacion.notArticulo15", id: "notArticulo15", value:"0"},
//							{xtype: 'hidden', name: "notNotificacion.notSalaTercera", id: "notSalaTercera", value:"0"},
							{xtype: 'hidden', name: "notNotificacion.notListaInternacional", id: "notListaInternacional", value:"0"}
				        ]
					}
		        ],
				listeners:{
					render: function(){
						NotNotificaciones.setLabelsNotificar(Ext.ComponentQuery.query("#notNotificacionForm label[notificarPor]"));
						NotNotificaciones.setFieldsNotificar(Ext.ComponentQuery.query("#notNotificacionForm field[notificarPor]"));
					}
				}
			};
			return config;
		}
	};
}();