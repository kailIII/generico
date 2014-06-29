function cambioClave(contextPath, requiredChangePassword){
	Ext.apply(Ext.form.VTypes, {
	    password : function(val, field) {
	        if (field.initialPassField) {
	            var pwd = Ext.getCmp(field.initialPassField);
	            return (val == pwd.getValue());
	        }
	        return true;
	    },
	    passwordText : 'Las claves no son iguales.'
	});

	var form = Ext.create('Ext.form.Panel', {
		bodyPadding: 10,
		border: false,
		style: {background:'white'},
		url: contextPath + '/seguridad/usuario/cambiarClave',
		layout: 'anchor',
		defaults: {
			anchor: '100%',
			inputType: 'password',
			allowBlank: false,
			minLength: 6,
			maxLength: 9,
			enforceMaxLength: true
		},
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'Clave Actual',
			name: 'claveActual'
		},{
			fieldLabel: 'Clave Nueva',
			name: 'claveNueva',
			id: 'claveNueva'
		},{
			fieldLabel: 'Confirmar Clave',
			name: 'confirmarClave',
			vtype: 'password',
			initialPassField: 'claveNueva'
		}]
	});

	var win = Ext.create('Ext.window.Window', {
		id:'winCambioClave',
		title: 'Cambio de Clave',
		height: 160,
		width: 400,
		layout: 'fit',
		modal: !requiredChangePassword,
		resizable: false,
		closable: !requiredChangePassword,
		draggable: !requiredChangePassword,
		items: [form],
		buttons: [
			{
				xtype: 'button',
				text: 'Limpiar',
				handler: function() {
					form.getForm().reset();
				}
			}, {
				xtype: 'button',
				text: 'Cambiar Clave',
				handler: function() {
					Efx.message.progress("Guardando Informaci\u00F3n...");
					if (form.getForm().isValid()) {
						form.getForm().submit({
							success: function(form, action) {
								if(requiredChangePassword){
									Efx.message.confirmProcess("Datos Actualizados<br />* Debe ingresar a la aplicaci\u00F3n nuevamente",
											function(){document.location.href = contextPath + "/security/logout";});
								}else Efx.message.alert(action.result.message);
								win.close();
							},
							failure: Efx.form.failureProcedure
						});
					}else{
						Efx.message.alertInvalidFields();
					}
				}
			},{
				text: "Cerrar",
				handler: function(){
					win.close();
				}
			}
        ]
	});

	win.show();
}
