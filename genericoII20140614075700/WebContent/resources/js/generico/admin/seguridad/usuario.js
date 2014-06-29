SgdUsuarios = function(){
	return {
		getCtgTipoDocumentos: function(){return ctgTipoDocumentos;},
		setCtgTipoDocumentos: function(values){ctgTipoDocumentos = values;},
		buttonsConfig: {
			add: "sgdUsuariosAgregar",
			edit: "sgdUsuariosEditar",
			save: "sgdUsuariosGuardar",
			remove: "sgdUsuariosEliminar",
			cancel: "sgdUsuariosCancelar",
			grid: "sgdUsuariosGrid",
			form: "sgdUsuariosForm"
		},
		eliminarDatos: function(url, path){
			Efx.message.confirmDelete(function(){
				Ext.getCmp("sgdUsuariosForm").getForm().submit({
					url: Efx.constants.CONTEXT_PATH + "/seguridad/usuario/delete",
					timeout: Efx.constants.TIMEOUT_SECONDS,
					success: function(form, action){
						Efx.message.alert(action.result.message);
						Efx.form.switchButton(SgdUsuarios.buttonsConfig, "remove");
						Ext.getCmp("sgdUsuariosGrid").down("#save").disable();
						Ext.getCmp("sgdUsuariosGrid").getStore().read();
						if(action.result.sdgUsuariosCombo){
							Efx.combos.initUsuarios(action.result.sdgUsuariosCombo || []);
	    					Ext.getCmp("sgdUsuarioPadreId").store.loadData(Efx.combos.getAllUsuarios());
						}
					},
					failure: Efx.form.failureProcedure
				});
			});
		},
		guardarDatos: function(url, path){
			if(Ext.getCmp("pass1").value==Ext.getCmp("pass2").value){
				Efx.message.progress("Guardando Informaci\u00F3n..."),
				Ext.getCmp("sgdUsuariosForm").getForm().submit({
	    			url: Efx.constants.CONTEXT_PATH + "/seguridad/usuario/save",
	    			timeout: Efx.constants.TIMEOUT_SECONDS,
	    			success: function(form, action){
	    				Ext.Msg.hide();
	    				Efx.message.alert(action.result.message);
	    				Efx.form.switchButton(SgdUsuarios.buttonsConfig, "save");
	    				Ext.getCmp("sgdUsuariosGrid").down("#save").disable();
	    				Ext.getCmp("sgdUsuariosGrid").getStore().read();
	    				if(action.result.sdgUsuariosCombo){
		    				Efx.combos.initUsuarios(action.result.sdgUsuariosCombo || []);
	    					Ext.getCmp("sgdUsuarioPadreId").store.loadData(Efx.combos.getAllUsuarios());
	    				}
	    			},
	    			failure: Efx.form.failureProcedure
	   			});
			}
			else Efx.message.alert("Las Contrase\u00f1as no coinciden.");
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
				initComponent: function(){
					this.editing = Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit: 1});
					Ext.apply(this, {
						frame: false,
						plugins: [this.editing],
						dockedItems: [{
							xtype: 'toolbar',
							items: [
						        '->',
								{
									iconCls:Efx.constants.icons.SAVE_ICON,
									text: 'Guardar Estados',
									itemId: 'save',
									scope: this,
									handler: this.onSaveChange,
									disabled: true
								}
							]
						}],
					    columns: [
			              {header: "Usuario",  dataIndex: "sgdUsuarioUsuario",  width: 120},
			              {header: "Nombre",  dataIndex: "sgdUsuarioPrimerNombre", width: 120},
			              {header: "",  dataIndex: "sgdUsuarioPrimerApellido", flex: 1},
			              {dataIndex: 'ctgSucursal', hidden: true},
			              {dataIndex: 'sgdUsuarioPadre', hidden: true}
					    ],
			            features: [{
			        	   ftype: "grouping",
			        	   enableNoGroups: false,
			        	   groupHeaderTpl: 'Sucursal: {name}'
			            }],
					    height: 230,
						listeners: {
							itemclick: function(view, record){
								Efx.form.switchButton(SgdUsuarios.buttonsConfig, "rowclick");
								Efx.form.setValues("sgdUsuariosForm", record.data);
			                },
			                edit: function(){
								var s = this.getView().store;
								if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length >0) this.down("#save").enable();
			                }
					    }
					});
					this.callParent();
				},
				onSaveChange: function(){
					var s = this.store;
					if(s.getNewRecords().length > 0 || s.getUpdatedRecords().length > 0) s.save();
					else Efx.message.alert("No hay cambios por guardar.");
					this.down("#save").disable();
				}
			});
			Ext.define('SgdUsuario', {
				extend: 'Ext.data.Model',
				idProperty: 'sgdUsuarioId',
				fields: [
				    {name: "sgdUsuarioId"},
			    	{name: "sgdUsuarioActivo"},
					{name: "sgdUsuarioUsuario"},
		    		{name: "sgdUsuarioClave"},
					{name: "sgdUsuarioPrimerNombre"},
	    			{name: "sgdUsuarioSegundoNombre"},
					{name: "sgdUsuarioPrimerApellido"},
					{name: "sgdUsuarioSegundoApellido"},
					{name: "sgdUsuarioCorreoElectronico"},
					{name: "sgdUsuarioPadreId"},
					{name: "ctgTipoSucursalId"},
					{name: "ctgSubTipoSucursalId"},
					{name: "ctgSucursalId"},
					{name: "ctgSucursalNombre"},
					{name: "sgdUsuarioCambiarClave"},
					{name: "ctgTipoDocumentoId"},
					{name: "sgdUsuarioDocumento"},
					{name: "ctgSucursal"},
					{name: "sgdUsuarioPadre"}
				]
			});
			Ext.tip.QuickTipManager.init();
			var store = Ext.create('Ext.data.Store', {
				model: 'SgdUsuario',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api: {
						read: Efx.constants.CONTEXT_PATH + '/seguridad/usuario/read',
						update: Efx.constants.CONTEXT_PATH + '/seguridad/usuario/update'
					},
					reader: {
						type: 'array'
					},
					writer: {
						type: 'json',
						writeAllFields: true
					}
				},
				groupers: [{property: "ctgSucursalNombre"}],
				listeners: {
					beforesync: function(obj, operation){
						if(obj.update && obj.update.length > 0){
							Ext.each(obj.update, function(){
								this.data.ctgSucursal = {
									ctgSucursalId: this.data.ctgSucursalId,
									ctgSucursalNombre: this.data.ctgSucursalNombre
								};
								this.data.sgdUsuarioPadre = {
									sgdUsuarioId: this.data.sgdUsuarioPadreId
								};
							});
						}
					},
					write: function(proxy, operation){
						Efx.message.alert("Los cambios se realizaron con &eacute;xito");
						Efx.form.switchButton(SgdUsuarios.buttonsConfig, "save");
						Ext.getCmp('sgdUsuariosGrid').getStore().read();
						Ext.Ajax.request({
							timeout: Efx.constants.TIMEOUT_SECONDS,
							url: Efx.constants.CONTEXT_PATH + '/seguridad/usuario/updateUsuariosCombo',
							callback: function(options, success, response){
								if(success){
									var jsonObject = Efx.utils.ajaxRequestGetJson(response);
									if(jsonObject && jsonObject.success){
					    				if(jsonObject.sdgUsuariosCombo){
						    				Efx.combos.initUsuarios(jsonObject.sdgUsuariosCombo || []);
					    					Ext.getCmp("sgdUsuarioPadreId").store.loadData(Efx.combos.getAllUsuarios());
					    				}
									}else Efx.message.alertInvalid(jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE);
								}
							}
						});
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
				dockedItems: [{xtype: 'toolbar', items: ['->',{xtype:'label',text:'USUARIOS',cls: "ctg_label"}]}],
				defaults: {width: 800, margins: "5 0 5 0"},
				items: [
			       {
						id: 'sgdUsuariosGrid',
						xtype: 'writergrid',
						header:false,
						height: 200,
						forceFit:true,
						store:store
					},{
						xtype: "form",
						id: "sgdUsuariosForm",
						activeRecord: null,
						autoScroll: true,
						flex: 1,
						bodyPadding: 5,
						layout: {
							type: "table",
							columns: 4,
							tableAttrs: {
					            style: {width: "490px", border:"1"},
					            align: "center"
					        }
						},
						defaults: {
							width: 230,
							selectOnFocus: true,
							colspan: 2,
							enforceMaxLength: true,
							maxLength: 200,
							typeAhead: true,
							minChars: 1,
							queryMode: "local",
							forceSelection: true,
							allowEnable: true,
							listConfig: {minWidth: 450}
						},
						tbar: [
							{
								id: "sgdUsuariosAgregar",
								iconCls:Efx.constants.icons.ADD_ICON,
								text: "Agregar",
								handler: function(){
									Efx.form.switchButton(SgdUsuarios.buttonsConfig, "add");
									Ext.getCmp("sgdUsuarioUsuario").setReadOnly(false);
						        }
							},{
								id: "sgdUsuariosEditar",
								iconCls:Efx.constants.icons.EDIT_ICON,
								text: "Editar Registro",
								hidden: true,
								handler: function(){
									Efx.form.switchButton(SgdUsuarios.buttonsConfig, "edit");
									Ext.getCmp("sgdUsuarioUsuario").setReadOnly(true);
								}
							},{
								id: "sgdUsuariosGuardar",
								iconCls:Efx.constants.icons.SAVE_ICON,
								text: "Guardar",
								hidden: true,
								handler: function(){
									SgdUsuarios.guardarDatos();
								}
							},{
								id: "sgdUsuariosEliminar",
								iconCls:Efx.constants.icons.DELETE_ICON,
								text: "Eliminar Registro",
								hidden: true,
								itemId: "delete",
								handler: function(){
									SgdUsuarios.eliminarDatos();
								}
							},{
								id: "sgdUsuariosCancelar",
								iconCls:Efx.constants.icons.CANCEL_ICON,
								text: "Cancelar",
								hidden: true,
								handler: function(){
									Efx.form.switchButton(SgdUsuarios.buttonsConfig, "cancel");
						       }
							}
			            ],
						items:[
							{xtype: "label", text: "Usuario", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Usuario Padre", cls: "x-form-item label_spacing"},
							{
							   xtype: "textfield",
							   id: "sgdUsuarioUsuario",
							   name: "sgdUsuario.sgdUsuarioUsuario",
							   maxLength: 20,
							   allowBlank: false
							},
							{
					    	   xtype: "combo",
					    	   store: new Ext.data.SimpleStore({
					    		   data: Efx.combos.getAllUsuarios(),
				    			   fields: ["usuarioId", "usuarioActivo", "usuarioDescripcion"]
					    	   }),
					    	   displayField: "usuarioDescripcion",
					    	   valueField: "usuarioId",
					    	   triggerAction: "all",
					    	   mode: "local",
					    	   id:"sgdUsuarioPadreId",
					    	   name: "sgdUsuario.sgdUsuarioPadre.sgdUsuarioId"
						    },


							{xtype: "label", text: "Tipo Documento", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "C\u00e9dula", cls: "x-form-item label_spacing"},
					        {
								xtype: "combo",
								id: "ctgTipoDocumentoId",
								name: "sgdUsuario.ctgTipoDocumento.ctgCatalogoId",
								store: new Ext.data.SimpleStore({
									data: SgdUsuarios.getCtgTipoDocumentos(),
									fields: ["ctgTipoDocumentoId", "ctgTipoDocumentoNombre", "ctgTipoDocumentoPadre", "ctgTipoDocumentoHijo"]
								}),
								displayField: "ctgTipoDocumentoNombre",
								valueField: "ctgTipoDocumentoId",
								value: Efx.constants.codes.TIPO_DOCUMENTO_CEDULA,
								allowBlank: false,
								listeners : {
									change : function() {
										var valor = this.getValue();
											if(valor == 293) {
												Ext.getCmp("sgdUsuarioDocumento").vtype = "CedNac";
												if(Ext.getCmp("sgdUsuarioDocumento").validate()){
													Ext.getCmp("sgdUsuarioDocumento").clearInvalid();
													return true;
												}else{
													Ext.getCmp("sgdUsuarioDocumento").markInvalid(Ext.getCmp("sgdUsuarioDocumento").blankText || 'Formato de c\u00e9dula inv\u00e1lido, el n\u00famero no debe iniciar con "0"');
													return false;
												}
											}
											else if (valor== 295){
													Ext.getCmp("sgdUsuarioDocumento").vtype = "CedNac";
													if(Ext.getCmp("sgdUsuarioDocumento").validate()){
														Ext.getCmp("sgdUsuarioDocumento").clearInvalid();
														return true;
													}else{
														Ext.getCmp("sgdUsuarioDocumento").markInvalid(Ext.getCmp("sgdUsuarioDocumento").blankText || 'Formato de c\u00e9dula inv\u00e1lido, el n\u00famero no debe iniciar con "0"');
														return false;
													}
												}
											else {
												Ext.getCmp("sgdUsuarioDocumento").vtype = undefined;
												if(Ext.getCmp("sgdUsuarioDocumento").validate()){
													Ext.getCmp("sgdUsuarioDocumento").clearInvalid();
													return true;
												}else{
													Ext.getCmp("sgdUsuarioDocumento").markInvalid(Ext.getCmp("sgdUsuarioDocumento").blankText || 'Formato de c\u00e9dula inv\u00e1lido, el n\u00famero no debe iniciar con "0"');
													return false;
												}
												}

										}
									}
							},
							{
					    	   xtype: "textfield",
					    	   id: "sgdUsuarioDocumento",
					    	   name: "sgdUsuario.sgdUsuarioDocumento",
					    	   maxLength: 20,
					    	   allowBlank: false,
					    	   listeners :  {
									change : function() {
										var valor = Ext.getCmp("ctgTipoDocumentoId").getValue();
											if(valor == 293) {
												Ext.getCmp("sgdUsuarioDocumento").vtype = "CedNac";
											}
											else if (valor== 295){
													Ext.getCmp("sgdUsuarioDocumento").vtype = "CedNac";
												}
											else {
												Ext.getCmp("sgdUsuarioDocumento").vtype = undefined;
												}

										}
							}
					    	},
							{xtype: "label", text: "Contrase\u00f1a", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Confirmar Contrase\u00f1a", cls: "x-form-item label_spacing"},
							{
								xtype: "textfield",
								inputType: 'password',
								id: "pass1",
								name: "sgdUsuario.sgdUsuarioClave",
								minLength: 6,
								maxLength: 9
							},{
							   xtype: "textfield",
							   inputType: 'password',
							   id: "pass2",
							   name: "sgdUsuario.sgdUsuarioClave2",
							   minLength: 6,
							   maxLength: 9
							},
							{xtype: "label", text: "Tipo de Sucursal", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Subtipo de Sucursal", cls: "x-form-item label_spacing"},
					    	{
					    	   xtype: "combo",
					    	   id:"ctgTipoSucursalId",
					    	   name: "sgdUsuario.ctgSucursal.ctgSubTipoSucursal.ctgTipoSucursal.ctgTipoSucursalId",
								store: new Ext.data.SimpleStore({
									   data: Efx.combos.getAllTipoSucursalGrid(),
									   fields: ["ctgTipoSucursalId", "ctgTipoSucursalNombre","ctgTipoSucursalActivo"]
								}),
					    	   displayField: "ctgTipoSucursalNombre",
					    	   valueField: "ctgTipoSucursalId",
					    	   triggerAction: "all",
					    	   mode: "local",
							   allowBlank: false,
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
						    	name: "sgdUsuario.ctgSucursal.ctgSubTipoSucursal.ctgSubTipoSucursalId",
								store: new Ext.data.SimpleStore({
									autoLoad: false,
									data: Efx.combos.getAllSubTipoSucursalByTipoSucursal(0),
								    fields: ["ctgSubTipoSucursalId", "ctgSubTipoSucursalNombre","ctgTipoSucursal","ctgSubTipoSucursalCodigo","ctgSubTipoSucursalUsuarioBureau","ctgSubTipoSucursalContrasenaBureau","ctgSubTipoSucursalActivo"]
								}),
						    	displayField: "ctgSubTipoSucursalNombre",
						    	valueField: "ctgSubTipoSucursalId",
						    	triggerAction: "all",
						    	mode: "local",
						    	allowBlank: false,
					    	    listeners:{
					    		   change: function(field, value){
					    			   var cmbSuc = Ext.getCmp("ctgSucursalId");
					    			   cmbSuc.store.loadData(Efx.combos.getAllSucursaleBySubTipoSucursal(value));
					    			   cmbSuc.setValue("");
					    		   }
					    	    }
						    },
						    {xtype: "label", text: "Sucursal", cls: "x-form-item label_spacing", colspan: 8},
						    {
						    	xtype: "combo",
						    	id:"ctgSucursalId",
						    	name: "sgdUsuario.ctgSucursal.ctgSucursalId",
								store: new Ext.data.SimpleStore({
									autoLoad: false,
									data: Efx.combos.getAllSucursaleBySubTipoSucursal(0),
									fields: ["ctgSucursalId", "ctgSucursalNombre","ctgSubTipoSucursal","ctgSucursalActivo","ctgSucursalPoseeComiteCreditos","ctgSucursalAtiendeOtraSucursal"]
								}),
						    	displayField: "ctgSucursalNombre",
						    	valueField: "ctgSucursalId",
						    	triggerAction: "all",
						    	mode: "local",
						    	allowBlank: false,
						    	colspan: 8
						    },
							{xtype: "label", text: "Primer Nombre", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Segundo Nombre", cls: "x-form-item label_spacing"},
							{
					    	   xtype: "textfield",
					    	   id: "sgdUsuarioPrimerNombre",
					    	   name: "sgdUsuario.sgdUsuarioPrimerNombre",
					    	   maxLength: 20,
					    	   allowBlank: false
					    	},
					    	{
					    	   xtype: "textfield",
					    	   id: "sgdUsuarioSegundoNombre",
					    	   name: "sgdUsuario.sgdUsuarioSegundoNombre",
					    	   maxLength: 20
					    	},
							{xtype: "label", text: "Primer Apellido", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "Segundo Apellido", cls: "x-form-item label_spacing"},
							{
					    	   xtype: "textfield",
					    	   id: "sgdUsuarioPrimerApellido",
					    	   name: "sgdUsuario.sgdUsuarioPrimerApellido",
					    	   maxLength: 20,
					    	   allowBlank: false
					    	},{
					    	   xtype: "textfield",
					    	   id: "sgdUsuarioSegundoApellido",
					    	   name: "sgdUsuario.sgdUsuarioSegundoApellido",
					    	   maxLength: 20
					    	},
//					    	{xtype: "label", text: "Sucursal", cls: "x-form-item label_spacing"},
//					    	{xtype: "label", text: "", cls: "x-form-item label_spacing", style: "border-right: none;"},
//					    	{
//					    	   xtype: "combo",
//					    	   store: new Ext.data.SimpleStore({
//					    		   data: Efx.combos.getAllSucursales(),
//				    			   fields: ["activoId", "activoDescripcion"]
//					    	   }),
//					    	   displayField: "activoDescripcion",
//					    	   valueField: "activoId",
//					    	   triggerAction: "all",
//					    	   mode: "local",
//					    	   id:"ctgSucursalId",
//					    	   allowBlank: false,
//					    	   name: "sgdUsuario.ctgSucursal.ctgSucursalId",
//					    	   width: 475,
//					    	   colspan: 8
//						    },
						    {xtype: "label", text: "Email", cls: "x-form-item label_spacing"},
							{xtype: "label", text: "", cls: "x-form-item label_spacing", style: "border-right: none;"},
							{
					    	   xtype: "textfield",
					    	   vtype: 'email',
					    	   id: "sgdUsuarioCorreoElectronico",
					    	   name: "sgdUsuario.sgdUsuarioCorreoElectronico",
					    	   fieldCls : "remove-uppercase",
					    	   maxLength: 60,
					    	   width: 475,
					    	   colspan: 8
					    	},
							{xtype: "label", text: "Activo", cls: "x-form-item label_spacing", colspan: 4},
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
					    	   id:"sgdUsuarioActivo",
					    	   name: "sgdUsuario.sgdUsuarioActivo"
						    },{
							   xtype: "hidden",
							   id: "sgdUsuarioId",
							   name: "sgdUsuario.sgdUsuarioId"
							},{
							   xtype: "hidden",
							   id: "sgdUsuarioClave",
							   name: "claveActual"
							},{
							   xtype: "hidden",
							   name: "sgdUsuarioCambiarClave"
							}
				        ]
					}
		        ]
			};
			return config;
		}
	};

}();
