UsuarioRol = function(){
	return {
		init: function(json){
			Efx.combos.initUsuarioRoles(json.jsonString);
			var config = {};

			Ext.define('UsuarioModel', {
				extend: 'Ext.data.Model',
				idProperty: 'id',
				fields: [
				         /**
				    {name: "id"},
			    	{name: "sgdUsuarioActivo"},
					{name: "login"},
		    		{name: "sgdUsuarioClave"},
					{name: "usuarioPrimerNombre"},
	    			{name: "usuarioSegundoNombre"},
					{name: "usuarioprimerApellido"},
					{name: "usuarioSegundoApellido"},
					{name: "usuarioCorreoElectronico"},
//					{name: "sgdUsuarioPadreId"},
					{name: "ctgSucursalId"},
					{name: "ctgSucursalNombre"},
//					{name: "sgdUsuarioEjecutivo"},
					{name: "usuarioCambiarClave"},
					{name: "ctgSucursal"},
					{name: "sgdUsuarioPadre"}
					**/
				         
					{name: "id"},
					{name: "usuarioActivo"},
					{name: "login"},
					{name: "password"},
					{name: "usuarioPrimerNombre"},
					{name: "usuarioSegundoNombre"},
					{name: "usuarioprimerApellido"},
					{name: "usuarioSegundoApellido"},
					{name: "usuarioCorreoElectronico"},
					//{name: "sgdUsuarioPadre.id"},
					{name: "ctgSucursalId"},
					{name: "ctgSucursalNombre"},
					{name: "usuarioCambiarClave"}
//					{name: "usuarioDocumento"},
//					{name: "ctgTipoDocumento.ctgCatalogoId"}
					
				]
			});

			Ext.define('CtgRoles', {
				extend: 'Ext.data.Model',
				idProperty: 'roleId',
				fields: [
				         {name: "roleId"},
				         {name: "role"},
				         {name: "roleActivo"}
				         ]
			});

			var storeUsuarios = Ext.create('Ext.data.Store', {model: 'UsuarioModel', groupers: [{property: "ctgSucursalNombre"}]});

			var storeRoles = Ext.create('Ext.data.Store', {model: 'CtgRoles', sorters: [{property: "role", order: "ASC"}]});

			var gridUsuarios = Ext.create('Ext.grid.Panel',{
				id: 'gridUsuarios',
				store: storeUsuarios,
				flex: 1,
				title: "Usuarios",
				frame:true,
				bodyCls:'bgGray',
				columns: [
					{header: 'Id', dataIndex: 'id', hidden: true},
					{xtype:"rownumberer",sortable:false,width:30},
					{header: 'Usuario', dataIndex: 'login', sortable: true, fixed: true, width:150},
					{
						header: 'Nombre', dataIndex: 'usuarioPrimerNombre', sortable: true, fixed: true, flex:1,
						renderer: function(a,b,o){
							o = o.data;
							return o.usuarioPrimerNombre +
							(o.usuarioSegundoNombre? " "+o.usuarioSegundoNombre: "") +
							" "+o.usuarioprimerApellido +
							(o.usuarioSegundoApellido? " "+o.usuarioSegundoApellido: "");
						}
					}
				],
	            features: [{
	        	   ftype: "grouping",
	        	   enableNoGroups: false,
	        	   groupHeaderTpl: 'Sucursal: {name}'
	            }],
				listeners:{
					selectionchange: function(g, s, o){
						if(s[0]){
							btnGuardar.enable();
							var changeChecks = Efx.combos.getUsuarioRolesBySgdUsuarioId(s[0].data.id);
							var roles = json.roles;
							Ext.each(roles, function(o){o.data.roleActivo = false;});
							Ext.each(roles, function(o){
								Ext.each(changeChecks, function(i){
									if(i.rolId == o.data.roleId) o.data.roleActivo = true;
								});
							});
							storeRoles.loadData(roles);
						};
					}
				}
			});

			var gridRoles = Ext.create('Ext.grid.Panel',{
				id: 'gridRoles',
				store: storeRoles,
				plugins: [Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit: 1})],
				flex: 1,
				frame:true,
				title: "Permisos",
				columns: [
					{header: 'Id', dataIndex: 'roleId', hidden: true},
					{xtype:"rownumberer",sortable:false,width:30},
					{
						header: '',
						dataIndex: 'roleActivo',
						width: 30,
						xtype:'checkcolumn',
						draggable: false,
						sortable: false,
						menuDisabled: true
					},
					{header: 'Rol', dataIndex: 'role', sortable: true, draggable: false, menuDisabled: true, flex:1}
				]
			});

			var getRolesChecked = function(){
				var cheked = [];
				Ext.each(storeRoles.data.items, function(o){
					if(o.data.roleActivo) cheked.push(o.data.roleId);
				});
				return cheked;
			};

			var onSaveChange = function(){
				var sm = gridUsuarios.getView().getSelectionModel();
				if(sm.getSelection()[0]){
					var usrId = sm.getSelection()[0].data.id;;
					var rolesCheked = getRolesChecked();
					Ext.Ajax.request({
						timeout: Efx.constants.TIMEOUT_SECONDS,
						url: Efx.constants.CONTEXT_PATH + "/seguridad/rol/save",
						params: {
							usrId: usrId,
							rolesCheked: (rolesCheked.length > 0)?rolesCheked:null
						},
						callback: function(options, success, response){
							if(success){
								var jsonObject = Efx.utils.ajaxRequestGetJson(response);
								if(jsonObject && jsonObject.success){
									Efx.combos.initUsuarioRoles(jsonObject.jsonString);
									Efx.message.alert("Los cambios se realizaron con &eacute;xito");
									btnGuardar.disable();
									gridUsuarios.getView().getSelectionModel().clearSelections();
									gridUsuarios.getView().refresh();
									gridRoles.getView().getSelectionModel().clearSelections();
									gridRoles.getView().refresh();
									Ext.each(storeRoles.data.items, function(o){o.data.roleActivo = false;});
									gridRoles.getView().refresh();
								}else{
									Efx.message.alertInvalid(jsonObject ? (jsonObject.message || Efx.constants.DEFAULT_ERROR_MESSAGE) : Efx.constants.DEFAULT_ERROR_MESSAGE);
								}
							}
						}
					});
				}else{
					Efx.message.alert("Seleccione el Usuario del cual desea administrar Roles.");
				}
			};

			var btnGuardar = Ext.create("Ext.button.Button",{
				iconCls:Efx.constants.icons.SAVE_ICON,
				text: 'Guardar Cambios',
				scope: this,
				handler: onSaveChange,
				disabled:true
			});

			var items =
			[{
				xtype: 'toolbar',
				style:{border:'none',borderBottom:'1px solid #C3C3C3'},
				items: [
					btnGuardar,
					'->',
					{xtype:'label',text:"ASIGNACI\u00D3N DE PERMISOS",cls: "ctg_label"}
				]
			},{
				xtype:'container',
				flex: 1,
				layout: {
					type: "hbox",
					pack  : "start",
					align : "stretch"
				},
				defaults: {margins: "5 5 5 5"},
				items:[gridUsuarios, gridRoles]
			}];

			config.items = items;

			Ext.each(json.roles, function(o){o.roleActivo = false;});

			storeRoles.loadData(json.roles);
			storeUsuarios.loadData(json.usuarios);

			return config;
		}
	};
}();
