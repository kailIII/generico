Ext.namespace('Efx');
Ext.namespace('Efx.arrays');
Ext.namespace('Efx.constants');
Ext.namespace('Efx.constants.codes');
Ext.namespace('Efx.constants.buttons');
Ext.namespace('Efx.constants.windows');
Ext.namespace('Efx.constants.icons');
Ext.namespace('Efx.form');
Ext.namespace('Efx.utils');
Ext.namespace('Efx.tree');
Ext.namespace('Efx.validators');
Ext.namespace('Efx.message');
Ext.namespace('Efx.grid');
Ext.namespace('Efx.ctgForm');

String.prototype.isEmpty = function(){return this == '' || this == undefined || this == null || this.trim() == '';};
String.prototype.trim = function(){return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""));};
String.prototype.trimToEmpty = function(){
	var trim = (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""));
	return trim == "null" ? "" : trim;
};
String.prototype.trimToZero = function(){
	var trim = this.trimToEmpty();
	if(trim == "" || isNaN(trim)) return "0";
	return trim;
};
String.prototype.isDate = function(){return isDate(this, 'dd/mm/yyyy');};
String.prototype.startsWith = function(str){return (this.match("^"+str)==str);};

/*
 * Codigos
 */
Efx.constants.codes.PERSONA_FISICA = "00252";
Efx.constants.codes.PERSONA_JURIDICA = "00253";
Efx.constants.codes.DOCUMENTO_CEDULA = "00293";
Efx.constants.codes.COSTA_RICA = 44;
//codigo de tipo de documento, cedula=293
Efx.constants.codes.TIPO_DOCUMENTO_CEDULA = 293;
Efx.constants.codes.TIPO_DOCUMENTO_CEDULA_CEDULA_NACIONAL = 480;


Efx.constants.codes.ACTIVIDAD_ECONOMICA = "00255";
Efx.constants.codes.ACTIVIDAD_ECONOMICA_JUR = "00264";
//codigo de tipo de moneda,
Efx.constants.codes.TIPO_MONEDA = 573;
Efx.constants.codes.COLONES = 574;
Efx.constants.codes.DOLARES = 575;

Efx.constants.codes.TIPO_DOCUMENTO_MENOR_EDAD = 295;
Efx.constants.codes.TIPO_DOCUMENTO_EXTRANJERO = 294;
Efx.constants.codes.SUBTIPO_DOCUMENTO_CEDULA=480;

//Efx.constants.codes.CREDITO_PERSONAL=709;
Efx.constants.codes.CREDITO_PRENDARIO=710;
Efx.constants.codes.CREDITO_HIPOTECARIO=711;

Efx.constants.codes.CUENTA_CORRIENTE=1088;
Efx.constants.codes.CUENTA_AHORRO=1089;
Efx.constants.codes.CUENTA_FUTURO=1090;
Efx.constants.codes.SUPER_DEPOSITO_AHORRO=1091;
Efx.constants.codes.CERTIFICADO_INVERSION=1092;
Efx.constants.codes.CREDITO_PERSONAL=1093;

Efx.constants.codes.ADICIONAL_CUENTA_CORRIENTE=1088;
Efx.constants.codes.ADICIONAL_CUENTA_AHORRO=1089;
Efx.constants.codes.ADICIONAL_CUENTA_FUTURO=1090;
Efx.constants.codes.ADICIONAL_SUPER_DEPOSITO_AHORRO=1091;

Efx.constants.codes.PAQUETE_CUENTA_CORRIENTE=1497;
Efx.constants.codes.PAQUETE_CUENTA_AHORRO=1498;

Efx.constants.codes.TIPO_MULTIPRODUCTOS=1496;



Efx.constants.codes.REFERENCIA_PERSONAL = 482;
Efx.constants.codes.REFERENCIA_COMERCIAL = 484;

Efx.constants.codes.PRODUCTOS_REFERENCIA_PERSONAL=624;
Efx.constants.codes.PRODUCTOS_REFERENCIA_CREDITOS=626;
Efx.constants.codes.PRODUCTOS_REFERENCIA_TARJETA_CREDITO=625;
Efx.constants.codes.PRODUCTOS_REFERENCIA_PAQUETE_MULTIPRODUCTOS = 483;


Efx.constants.codes.LABORAL_ASALARIADO=644;
Efx.constants.codes.LABORAL_INGRESOS_PROPIOS=645;
Efx.constants.codes.LABORAL_PERSONAS_DEPENDIENTES=646;

Efx.constants.codes.ASALARIADO="00256";
Efx.constants.codes.DETALLE=309;

Efx.constants.codes.DEPOSITO_SINPE = 1423;
Efx.constants.codes.DEPOSITO_CITI = 1424;
Efx.constants.codes.CHEQUE = 1425;


Efx.constants.codes.CORRIENTE_CITIGOLD = "01499";
Efx.constants.codes.CORRIENTE_PREMIUM = 1500;
Efx.constants.codes.CORRIENTE_CITIATWORK = 1501;
Efx.constants.codes.CORRIENTE_TELEMARKETING = 1502;
Efx.constants.codes.CORRIENTE_TELEVENTAS = 1503;
Efx.constants.codes.CORRIENTE_SUCURSALES= 1504;


Efx.constants.codes.AHORRO_CITIGOLD = 1505;
Efx.constants.codes.AHORRO_PREMIUM = 1506;
Efx.constants.codes.AHORRO_CITIATWORK = 1507;
Efx.constants.codes.AHORRO_TELEMARKETING = 1508;
Efx.constants.codes.AHORRO_TELEVENTAS = 1509;
Efx.constants.codes.AHORRO_SUCURSALES= 1510;



/*
 * Constantes
 * mensajes de error para validacion
 */
Efx.constants.SAVING = "Guardando Informaci\u00F3n...";
Efx.constants.KYC_NO_SELECCIONADO = "* Debe seleccionar un formulario KYC";
Efx.constants.ERROR_404 = "* Recurso no Disponible";
Efx.constants.SESSION_EXPIRED = "* Su sesi\u00F3n ha caducado, debe  ingresar nuevamente";
Efx.constants.ACCESS_DENIED = "* Acceso Denegado, Favor Comuniquese con el Administrador";

Efx.constants.TIMEOUT_SECONDS = 1500000;
Efx.constants.SOLICITUD_CREDITO = " .::. SOLICITUD DE CR\u00C9DITO No. ";
Efx.constants.SOLICITUD_DUPLICADA = "INFORMACI\u00D3N TOMADA DE LA SOLICITUD CON FECHA ";
Efx.constants.MOSTRAR_COBIS = "Para Generar el Archivo COBIS, debe ingresar al menos un Producto";
Efx.constants.KYC = " .::. KYC No. ";
/*
 *Mensajes para validacion de datos
 */
Efx.constants.GT_ZERO_TEXT = 'El valor de este campo debe ser mayor que cero';
Efx.constants.EQGT_ZERO_TEXT = 'El valor de este campo debe ser igual o mayor que cero';
Efx.constants.GT_ZERO_VALUE_WITH_DECIMAL = 0.01;
Efx.constants.EQGT_ZERO_VALUE_WITH_DECIMAL = 0.00;
Efx.constants.GT_ZERO_VALUE_WITHOUT_DECIMAL = 1;
Efx.constants.EQGT_ZERO_VALUE_WITHOUT_DECIMAL = 0;
Efx.constants.APPLICATION_TITLE = 'KYC - INSTITUTO NACIONAL DE SEGUROS';
Efx.constants.INVALID_ACTION = 'Acci\u00F3n inv\u00E1lida.';
Efx.constants.REQUIRED_FIELDS = 'Campos requeridos o con valor inv\u00E1lido';
Efx.constants.CONNECTION_FAIILURE = 'Problemas al intentar conectarse con el servidor';
Efx.constants.DEFAULT_ERROR_MESSAGE = 'Procesamiento Incorrecto';
Efx.constants.CONFIRM_DELETE_MESSAGE = "Est\u00E1 seguro que desea eliminar el registro?";

Efx.constants.REGEXP_NO_INI_END_BLANKS = /^\w?$|^\w.*\w$/;
Efx.constants.MSG_NO_INI_END_BLANKS = 'No se admiten espacios al inicio ni al final del texto';

Efx.constants.EFX_EXPERTO_APROBAR = "BAJO";
Efx.constants.EFX_EXPERTO_PREAPROBAR = "PREAPOBADO";
Efx.constants.EFX_EXPERTO_PENDIENTE = "MEDIO";
Efx.constants.EFX_EXPERTO_SIN_EVALUACION = "SIN EVALUACION";
Efx.constants.EFX_EXPERTO_RECHAZAR = "ALTO";

Efx.constants.EFX_DAVIVIENDA_EXPERTO_RECHAZAR = "RAML1";
Efx.constants.EFX_DAVIVIENDA_EXPERTO_PENDIENTE = "RAML2";
Efx.constants.EFX_DAVIVIENDA_EXPERTO_APROBAR = "RAML3";

Efx.constants.limiteMinimo = "L\u00EDmite M\u00EDnimo";
Efx.constants.limiteMaximo = "L\u00EDmite M\u00E1ximo";

/*
 * Iconos
 */
Efx.constants.icons.PRINT_ICON = "print_icon";
Efx.constants.icons.BUSCAR_ICON = "find_icon";
Efx.constants.icons.ADD_ICON = 'add_icon';
Efx.constants.icons.SAVE_ICON = 'save_icon';
Efx.constants.icons.EDIT_ICON = 'edit_icon';
Efx.constants.icons.DELETE_ICON = 'denied_icon';
Efx.constants.icons.CANCEL_ICON = 'cancel_icon';
Efx.constants.icons.OPEN_ICON = "open_icon";
Efx.constants.icons.REFRESH_ICON = "refresh_icon";
Efx.constants.icons.BACK_ICON = "back_icon";
Efx.constants.icons.WORK_ICON = "work_icon";
Efx.constants.icons.FIND_ICON = "find_icon";
Efx.constants.icons.REPRESENTANTE_ICON = "user_gray";
Efx.constants.icons.FIRMANTE_ICON = "firm_icon";
Efx.constants.icons.ACCIONISTA_ICON = "chart_organisation";
Efx.constants.icons.POLIZA_ICON = "shield";
Efx.constants.icons.IMAGES_ICON = "images_icon";
Efx.constants.icons.COINS_ICON="coins_icon";
Efx.constants.XLS_ICON = "xls_icon";
Efx.constants.icons.SCORE_ICON = 'calculator';
Efx.constants.APPLICATION_TITLE = 'KYC - CITIBANK';

Efx.constants.icons.CALCULATOR_ICON = "calculator";
Efx.constants.icons.REFERENCE_ICON = "reference";
Efx.constants.icons.VERIFICATION_ICON = "verification";
Efx.constants.icons.TABLE_GEAR_ICON = "table_gear";
Efx.constants.icons.ASIGNAR_ICON = "asignar";
Efx.constants.icons.PHONE_ICON = "phone";
Efx.constants.icons.LIST_ICON = "list";

Efx.constants.ROLES_ARRAY = [];

if(Ext.Ajax) Ext.Ajax.timeout = Efx.constants.TIMEOUT_SECONDS;

//UTILS
Efx.utils = function(){
	return {
		setDisabled : function(field, disabled, clear){
			if(typeof field == "string") field = Ext.getCmp(field);
			if(field){
				field.setDisabled(disabled);
				if(clear) field.setValue("");
			}
		},
		setVisible: function(fieldId, visible){
			if(Ext.getCmp(fieldId))
				Ext.getCmp(fieldId).setVisible(visible);
		},
		setVisibleDom: function(fieldId, visible){
			if(Ext.getCmp(fieldId))
				Ext.getCmp(fieldId).el.dom.style.display = visible?"":"none";
		},
		setVisibleEnable: function(fieldId, visible, enable){
			var field = Ext.getCmp(fieldId);
			if(field){
				Efx.utils.setVisibleDom(fieldId, visible);
				field.setDisabled(!enable);
			}
		},
		setVisibleEnableClean: function(fieldId, visible, enable, clean){
			var field = Ext.getCmp(fieldId);
			if(field){
				Efx.utils.setVisibleDom(fieldId, visible);
				field.setDisabled(!enable);
				if(clean) field.setValue("");
			}
		},
		setHeight: function(fieldId, height){
			if(Ext.getCmp(fieldId))
				Ext.getCmp(fieldId).setHeight(height);
		},
		setRequired : function(fieldId, required){
			if(Ext.getCmp(fieldId))
				Ext.getCmp(fieldId).allowBlank = !required;
		},
		setRequiredAndValidate: function(fieldId, required){
			var field = Ext.getCmp(fieldId);
			if(field){
				field.allowBlank = !required;
				if(field.validate()){
					field.clearInvalid();
					return true;
				}else{
					field.markInvalid(field.blankText || "Este campo es obligatorio");
					return false;
				}
			}
			return true;
		},
		setAllowEnable : function(field, enable){
			if(typeof field == "string") field = Ext.getCmp(field);
			if(field) field.allowEnable = enable;
		},
		isEnable: function(field){
			if(typeof field == "string"){
				field = Ext.getCmp(field);
				if(!field) return false;
			}
			return !field.disabled;
		},
		getValue : function(fieldId){
			return Ext.getCmp(fieldId) ? Ext.getCmp(fieldId).getValue() : '';
		},
		getSubmitValue : function(fieldId){
			return Ext.getCmp(fieldId) ? Ext.getCmp(fieldId).getSubmitValue() : '';
		},
		isValid : function(fieldId){
			return Ext.getCmp(fieldId) ? Ext.getCmp(fieldId).isValid() : false;
		},
		addCls: function(fieldId, cls){
			fieldId = Ext.getCmp(fieldId);
			if(fieldId && fieldId.addCls){
				fieldId.addCls(cls);
			}
		},
		removeCls: function(fieldId, cls){
			fieldId = Ext.getCmp(fieldId);
			if(fieldId && fieldId.removeCls){
				fieldId.removeCls(cls);
			}
		},
		setWidth : function(fieldId, width){
			fieldId = Ext.getCmp(fieldId);
			if(fieldId && fieldId.setWidth){
				fieldId.setWidth(width);
			}
		},
		setValue : function(fieldId, value){
			fieldId = Ext.getCmp(fieldId);
			if(fieldId){
				if((fieldId.getXType() == "combobox" || fieldId.getXType() == "combo") && fieldId.toNumber == true){
					try{
						value = parseFloat(value);
						if(isNaN(value)) value = "";
					}catch(e){
						value = "";
					}
				}
				fieldId.setValue(value);
			}
		},
		setReadOnly : function(fieldId, readOnly){
			if(Ext.getCmp(fieldId)) Ext.getCmp(fieldId).setReadOnly(readOnly);
		},
		setText : function(fieldId, value){
			if(Ext.getCmp(fieldId)) Ext.getCmp(fieldId).setText(value);
		},
		getRawValue : function(fieldId){
			return Ext.getCmp(fieldId) ? Ext.getCmp(fieldId).getRawValue() : '';
		},
		getValueAsInt : function(fieldId){
			return Ext.getCmp(fieldId) ? (Ext.isEmpty(Ext.getCmp(fieldId).getValue()) ? 0 : parseInt(Ext.getCmp(fieldId).getValue())) : 0;
		},
		clearInvalid : function(fieldId){
			if(Ext.getCmp(fieldId))
				Ext.getCmp(fieldId).clearInvalid();
		},
		markInvalid : function(fieldId, message){
			if(Ext.getCmp(fieldId))
				Ext.getCmp(fieldId).markInvalid(message);
		},
		setFocus: function(fieldId){
			if(Ext.getCmp(fieldId)) Ext.getCmp(fieldId).focus(true, true);
		},
		formatString : function (B) { var A = Array.prototype.slice.call(arguments, 1); return B.replace(/\{(\d+)\}/g, function (C, D) {return A[D];});},
		autoWidth : function(){
			Ext.select(".TABLE").each(function(){
				var mayorLength = 1;
				var a = [];
				this.select(".TR").each(function(){
					var length = this.select(".TD").elements.length;
					if(length > 0) a.push(length);
				});
				mayorLength = a.sort().reverse()[0];
				this.select(".TR").each(function(){
					var length = this.select(".TD").elements.length;
					if(length > 0){
						this.select(".TD").each(function(){
							var width = ((100/mayorLength)-0.5) + "%";
							if(this.dom.style.width == "") this.dom.style.width=width;
						});
					}
				});
			});
		},
		ajaxRequestGetJson : function(result){
			try{
				return Ext.JSON.decode(result.responseText);
			}catch(e){if(console) console.log(e);}
		},
		ajaxstatusDecode: function(status, responseText, options){
			if(Ext.isEmpty(responseText)){
				Efx.message.alertInvalid(Efx.constants.CONNECTION_FAIILURE);
				options.callback = null;
				return false;
			}
			if(responseText && !Ext.isEmpty(responseText) && responseText.indexOf('bWFyaW9yMjM=') != -1){
				Efx.message.confirmProcess(Efx.constants.SESSION_EXPIRED, function(){
					document.location.href = Efx.constants.CONTEXT_PATH + "/logout";
				});
				options.callback = null;
				return false;
			}
			if(responseText && !Ext.isEmpty(responseText) && responseText.indexOf('ssac=afd521') != -1){
				Efx.message.alertInvalid(Efx.constants.ACCESS_DENIED);
				options.callback = null;
				return false;
			}
			if(responseText.indexOf('No data received from server') != -1 ||
					(status != null && (status.toString().indexOf('404') != -1 || status.toString().indexOf('500') != -1))){
				Efx.message.alertInvalid(Efx.constants.ERROR_404);
				options.callback = null;
				return false;
			}
			var jsonObject = Ext.JSON.decode(responseText, true);
			if(jsonObject && !Ext.isEmpty(jsonObject.message) && jsonObject.gridLoadFailure){
				Efx.message.alertInvalid(jsonObject.message);
				return false;
			}
			return true;
		},

		ajaxRequestComplete: function(conn, response, options){
			if(response && !Ext.isEmpty(response.responseText)) response.responseText = response.responseText.replace(/<\/?pre[\s|\w|=|"|\-|\:|;]*>/ig, "");
			Efx.utils.ajaxstatusDecode(response.status, response.responseText, options);
		},
		getJSONAnosMeses:function(fecha){
			var json = [];
			var hoy = new Date();
			var fechaS = fecha.split("/");

			var ano = parseInt(fechaS[2], 10);
			var mes = parseInt(fechaS[1], 10);
			var dia = parseInt(fechaS[0], 10);

			json.anos = hoy.getFullYear() - ano - 1;
			var mesH = hoy.getMonth() + 1;

			if(mesH - mes > 0)json.anos += 1;
			if(mesH - mes == 0 && (hoy.getUTCDate() - dia) >= 0)json.anos += 1 ;

			json.meses = mesH;
			if(mes <= mesH)json.meses = mesH - mes;
			if(mes <= mesH && (hoy.getUTCDate() - dia) < 0)json.meses -= 1;

			if(json.anos == -1)json.anos = 0;
			if(json.meses == -1)json.meses = 0;

			return json;
		},
		fixToFireFoxIFrame:function(){
			Ext.override(Ext.Window, {
				beforeShow: function(){
					if(Ext.isGecko) Ext.select("#containerResumenEjecutivo").setStyle("visibility","hidden");
				},
			    afterHide: function() {
			    	if(Ext.isGecko && Ext.select("#containerResumenEjecutivo").elements[0].style.visibility == "hidden")
			    		Ext.select("#containerResumenEjecutivo").setStyle("visibility","");
			        this.syncMonitorWindowResize();
			        if (this.keyMap) this.keyMap.disable();
			        this.callParent(arguments);
			    }
			});
		},
		initRolsInArray: function(){
    		if(!Ext.get("hddRoles"))return [];
    		var str = Ext.get("hddRoles").dom.value;
    		var array = str.substring(1, str.length - 1).split(",");
    		Ext.each(array, function(){Efx.constants.ROLES_ARRAY.push(Ext.util.Format.trim(''+this));});
    	},
		ifRolGranted: function(rol){
			var isGranted = false;
    		Ext.each(Efx.constants.ROLES_ARRAY, function(){
    			if(this == rol){isGranted = true; return;}
			});
    		return isGranted;
    	},
    	getImageActivoColumn: function(dataIndex){
			return {
	        	dataIndex: dataIndex,
	        	width: 30,
	        	renderer: function(value){
	        		var imgBullet = "<div style=\"background: url('{0}/resources/images/{1}.png');width:16px;height:16px\" data-qtip=\"{2}\"></div>";
	        		var dataQtip = "";
	        		switch(value){
	        			case "0": value = "bullet_red"; dataQtip = "INACTIVO"; break;
	        			case "1": value = "bullet_green"; dataQtip = "ACTIVO"; break;
	        			default: value = "bullet_grey"; dataQtip = "PENDIENTE";
	        		}
        			return Efx.utils.formatString(imgBullet, Efx.constants.CONTEXT_PATH, value, dataQtip);
	        	}
	        };
    	},
    	getComboActivo: function(obj){
    		var combo = {
				xtype: "combo",
				store: new Ext.data.SimpleStore({
					data: Efx.combos.yesnoArray(),
					fields: ["activoId", "activoNombre"]
				}),
				displayField: "activoNombre",
				valueField: "activoId",
				triggerAction: "all",
				mode: "local"
    	    };
    		for(key in obj) combo[key] = obj[key];
    		return combo;
    	},
    	defaults: function(config){
			if(!config) config = {};
			config.enforceMaxLength = true;
			config.maxLength = 200;
			config.typeAhead = true;
			config.minChars = 1;
			config.queryMode = "local";
			config.forceSelection = true;
			config.selectOnFocus = true;
			config.triggerAction = "all";
			config.allowEnable = true;
			return config;
		},
		setTitle: function(title){
			try{
				Ext.fly("divTitle").dom.innerHTML = title;
			}catch(e){if(console && console.log) console.log(e);}
		}
	};
}();

Ext.Ajax.clearListeners();
Ext.Ajax.on('requestcomplete', Efx.utils.ajaxRequestComplete);
Ext.Ajax.on('requestexception', Efx.utils.ajaxRequestComplete);

//VALIDADORES
Efx.validators.plazoAnioMes = function(plazoAnios, plazoMeses){
	var plazoAniosValue = Efx.utils.getValueAsInt(plazoAnios);
	var plazoMesesValue = Efx.utils.getValueAsInt(plazoMeses);
	if((plazoAniosValue * 12 + plazoMesesValue) > 0){
		Efx.utils.clearInvalid(plazoAnios);
		Efx.utils.clearInvalid(plazoMeses);
		return true;
	}
	var mensaje = 'Plazo Total debe ser mayor que cero';
	Efx.utils.markInvalid(plazoAnios, mensaje);
	Efx.utils.markInvalid(plazoMeses, mensaje);
	return mensaje;
};

Efx.validators.antiguedad = function(antiguedadAnios, antiguedadMeses){
	var antiguedadAniosValue = Efx.utils.getValueAsInt(antiguedadAnios);
	var antiguedadMesesValue = Efx.utils.getValueAsInt(antiguedadMeses);
	if((antiguedadAniosValue * 12 + antiguedadMesesValue) > 0){
		Efx.utils.clearInvalid(antiguedadAnios);
		Efx.utils.clearInvalid(antiguedadMeses);
		return true;
	}
	var mensaje = 'Antiguedad Total debe ser mayor que cero';
	Efx.utils.markInvalid(antiguedadAnios, mensaje);
	Efx.utils.markInvalid(antiguedadMeses, mensaje);
	return mensaje;
};

//FORMULARIOS
Efx.form = function(){
	return {
		overideDisableSubmit: function(){
			Ext.override(Ext.form.Field, {
				getSubmitData: function () {
			        var me = this,
		            data = null,
		            val;
			        if ((!me.disabled || me.submitOnDisable) && me.submitValue && !me.isFileUpload()) {
			        	val = me.getSubmitValue();
			        	if (val !== null) {
			        		data = {};
			                data[me.getName()] = val;
			            }
			        }
			        return data;
				},
				isValid: function () {
			        var me = this;
			        if(me.submitOnDisable)
			        	return me.validateValue(me.processRawValue(me.getRawValue()));
			        else
			        	return me.disabled || me.validateValue(me.processRawValue(me.getRawValue()));
			    }
			});
		},
		overideMarkInvalid: function(){
			Ext.override(Ext.form.field.Base, {
				markInvalid : function(errors) {

			        var me = this,
			            oldMsg = me.getActiveError();
			        me.setActiveErrors(Ext.Array.from(errors));
			        try{Ext.select('#' + me.id + ' input').set({"data-errorqtip": Ext.String.format("<ul><li class=\"last\">{0}</li></ul>", me.getErrors()[0])});}catch(e){};
			    },
			    clearInvalid : function() {
			        var me = this,
			            hadError = me.hasActiveError();
			        me.unsetActiveError();
			        try{Ext.select('#' + me.id + ' input').set({"data-errorqtip": ""});}catch(e){};
			    }
			});
		},
		overrideReadOnlyCombo: function(){
			Ext.override(Ext.form.field.Trigger, {
				updateEditState: function() {
					var me = this,
					inputEl = me.inputEl,
		            triggerWrap = me.triggerWrap,
		            noeditCls = Ext.baseCSSPrefix + 'trigger-noedit',
		            displayed,
		            readOnly;

					if (me.rendered) {
						if (me.readOnly) {
							inputEl.addCls(noeditCls);
							readOnly = true;
							displayed = !me.hideTrigger;
						} else {
							if (me.editable) {
								inputEl.removeCls(noeditCls);
								readOnly = false;
							} else {
								inputEl.addCls(noeditCls);
			                    readOnly = true;
			                }
			                displayed = !me.hideTrigger;
			            }

			            triggerWrap.setDisplayed(displayed);
			            inputEl.dom.readOnly = readOnly;
			            //me.doComponentLayout();
			        }
				},
				getTriggerWidth: function() {
			        var me = this,
			            triggerWrap = me.triggerWrap,
			            totalTriggerWidth = 0;
			        if (triggerWrap && !me.hideTrigger) {
			            me.triggerEl.each(function(trigger) {
			                totalTriggerWidth += trigger.getWidth();
			            });
			            totalTriggerWidth += me.triggerWrap.getFrameWidth('lr');
			        }
			        return totalTriggerWidth;
			    }
			});
		},
		failureProcedure: function(form, action){
			Ext.Msg.hide();
			if(action.failureType == Ext.form.Action.CLIENT_INVALID)
				Efx.message.alertInvalidFields();
			else if(action.failureType == Ext.form.Action.CONNECT_FAILURE)
				Efx.message.alertConnectionFailure();
			else if(action.failureType == Ext.form.Action.SERVER_INVALID)
				Efx.message.alertInvalid(action.result.message);
			else
				Efx.message.alertDefaultErrorMessage();
		},
		doLayout: function(form){
			form = Ext.getCmp(form);
			if(form) form.doLayout();
		},
		maxLengthTextField: function(maxlength){
			var maxlengthConfig = Ext.copyTo({}, Ext.form.TextField.prototype.defaultAutoCreate, 'autocomplete,id,name,size,tag,type');
			maxlengthConfig.maxlength = maxlength;
			return maxlengthConfig;
		},
		maxLengthTextArea: function(maxlength){
			var maxlengthConfig = Ext.copyTo({}, {tag: 'textarea', style: 'width:100px;height:60px;', autocomplete: 'off'}, 'autocomplete,id,name,size,tag,type');
			maxlengthConfig.maxlength = maxlength;
			return maxlengthConfig;
		},
		setValues: function(form, values){
			if(typeof form == "string"){
				form = Ext.getCmp(form);
				if(!form) return;
			}
			form.getForm().setValues(values);
		},
		setEnable: function(form){
			if(typeof form == "string"){
				form = Ext.getCmp(form);
				if(!form) return;
			}
			if(!form || !form.items || !form.items.items) return;
			Ext.each(form.items.items, function(){
				var test = /^hidden$|^label$|^grid$/;
				if(!test.test(this.xtype) && this.allowEnable)
					this.setDisabled(false);
			});
			form.getForm().clearInvalid();
		},
		setDisable: function(form){
			if(typeof form == "string"){
				form = Ext.getCmp(form);
				if(!form) return;
			}
			if(!form || !form.items || !form.items.items) return;
			Ext.each(form.items.items, function(){
				var test = /^hidden$|^label$|^grid$/;
				if(!test.test(this.xtype))
					this.setDisabled(true);
			});
			form.getForm().clearInvalid();
		},
		clear: function(form){
			if(typeof form == "string"){
				form = Ext.getCmp(form);
				if(!form) return;
			}
			if(!form || !form.items || !form.items.items) return;
			Ext.each(form.items.items, function(field){
				if(field.setValue)
					if(field.setValue){
						if(field.xtype == "checkbox") field.setValue(true);
						else field.setValue("");
					}
		    });
			form.getForm().clearInvalid();
		},
		clearAndEnable: function(form){
			if(typeof form == "string"){
				form = Ext.getCmp(form);
				if(!form) return;
			}
			if(!form || !form.items || !form.items.items) return;
			Ext.each(form.items.items, function(item){
				var test = /^hidden$|^label$|^grid$/;
				if(item.setValue){
					if(this.xtype == "checkbox") item.setValue(true);
					else this.setValue("");
				}
				if(!test.test(this.xtype) && this.allowEnable)
					this.setDisabled(false);
		    });
			form.getForm().clearInvalid();
		},
		clearAndDisable: function(form){
			if(typeof form == "string"){
				form = Ext.getCmp(form);
				if(!form) return;
			}
			if(!form || !form.items || !form.items.items) return;
			Ext.each(form.items.items, function(item){
				var test = /^hidden$|^label$|^grid$/;
				if(item.setValue){
					if(this.xtype == "checkbox") item.setValue(true);
					else this.setValue("");
				}
				if(!test.test(this.xtype))
					this.setDisabled(true);
		    });
			form.getForm().clearInvalid();
		},
		switchButton: function(config, option){
			switch(option){
				case 'add':
				case 'edit':
					Efx.utils.setVisible(config.add, false);
					Efx.utils.setVisible(config.edit, false);
					Efx.utils.setVisible(config.save, true);
					Efx.utils.setVisible(config.remove, option == 'edit');
					Efx.utils.setVisible(config.cancel, true);
					if(option == 'add'){
						Efx.grid.clearSelection(config.grid);
						Efx.form.clearAndEnable(Ext.getCmp(config.form));
					}else{
						Efx.form.setEnable(Ext.getCmp(config.form));
					}
					break;
				case 'save':
				case 'remove':
				case 'rowclick':
				case 'cancel':
				case 'cancelNotClear':
					var processOption = /rowclick|cancelNotClear/.test(option);
					Efx.utils.setVisible(config.add, true);
					Efx.utils.setVisible(config.edit, processOption);
					Efx.utils.setVisible(config.save, false);
					Efx.utils.setVisible(config.remove, false);
					Efx.utils.setVisible(config.cancel, false);
					if(!processOption){
						Efx.grid.clearSelection(config.grid);
						Efx.form.clearAndDisable(config.form);
					}
					else Efx.form.setDisable(config.form);
					break;
				default: break;
			}
		}
	};
}();
//FORMULARIO DOS
Efx.form2 = function(){
	return {
		overideDisableSubmit: function(){
			Ext.override(Ext.form2.Field, {
				getSubmitData: function () {
			        var me = this,
		            data = null,
		            val;
			        if ((!me.disabled || me.submitOnDisable) && me.submitValue && !me.isFileUpload()) {
			        	val = me.getSubmitValue();
			        	if (val !== null) {
			        		data = {};
			                data[me.getName()] = val;
			            }
			        }
			        return data;
				},
				isValid: function () {
			        var me = this;
			        if(me.submitOnDisable)
			        	return me.validateValue(me.processRawValue(me.getRawValue()));
			        else
			        	return me.disabled || me.validateValue(me.processRawValue(me.getRawValue()));
			    }
			});
		},
		overideMarkInvalid: function(){
			Ext.override(Ext.form2.field.Base, {
				markInvalid : function(errors) {

			        var me = this,
			            oldMsg = me.getActiveError();
			        me.setActiveErrors(Ext.Array.from(errors));
			        try{Ext.select('#' + me.id + ' input').set({"data-errorqtip": Ext.String.format("<ul><li class=\"last\">{0}</li></ul>", me.getErrors()[0])});}catch(e){};
			    },
			    clearInvalid : function() {
			        var me = this,
			            hadError = me.hasActiveError();
			        me.unsetActiveError();
			        try{Ext.select('#' + me.id + ' input').set({"data-errorqtip": ""});}catch(e){};
			    }
			});
		},
		overrideReadOnlyCombo: function(){
			Ext.override(Ext.form2.field.Trigger, {
				updateEditState: function() {
					var me = this,
					inputEl = me.inputEl,
		            triggerWrap = me.triggerWrap,
		            noeditCls = Ext.baseCSSPrefix + 'trigger-noedit',
		            displayed,
		            readOnly;

					if (me.rendered) {
						if (me.readOnly) {
							inputEl.addCls(noeditCls);
							readOnly = true;
							displayed = !me.hideTrigger;
						} else {
							if (me.editable) {
								inputEl.removeCls(noeditCls);
								readOnly = false;
							} else {
								inputEl.addCls(noeditCls);
			                    readOnly = true;
			                }
			                displayed = !me.hideTrigger;
			            }

			            triggerWrap.setDisplayed(displayed);
			            inputEl.dom.readOnly = readOnly;
			            //me.doComponentLayout();
			        }
				},
				getTriggerWidth: function() {
			        var me = this,
			            triggerWrap = me.triggerWrap,
			            totalTriggerWidth = 0;
			        if (triggerWrap && !me.hideTrigger) {
			            me.triggerEl.each(function(trigger) {
			                totalTriggerWidth += trigger.getWidth();
			            });
			            totalTriggerWidth += me.triggerWrap.getFrameWidth('lr');
			        }
			        return totalTriggerWidth;
			    }
			});
		},
		failureProcedure: function(form2, action){
			Ext.Msg.hide();
			if(action.failureType == Ext.form2.Action.CLIENT_INVALID)
				Efx.message.alertInvalidFields();
			else if(action.failureType == Ext.form2.Action.CONNECT_FAILURE)
				Efx.message.alertConnectionFailure();
			else if(action.failureType == Ext.form2.Action.SERVER_INVALID)
				Efx.message.alertInvalid(action.result.message);
			else
				Efx.message.alertDefaultErrorMessage();
		},
		doLayout: function(form2){
			form2 = Ext.getCmp(form2);
			if(form2) form2.doLayout();
		},
		maxLengthTextField: function(maxlength){
			var maxlengthConfig = Ext.copyTo({}, Ext.form2.TextField.prototype.defaultAutoCreate, 'autocomplete,id,name,size,tag,type');
			maxlengthConfig.maxlength = maxlength;
			return maxlengthConfig;
		},
		maxLengthTextArea: function(maxlength){
			var maxlengthConfig = Ext.copyTo({}, {tag: 'textarea', style: 'width:100px;height:60px;', autocomplete: 'off'}, 'autocomplete,id,name,size,tag,type');
			maxlengthConfig.maxlength = maxlength;
			return maxlengthConfig;
		},
		setValues: function(form2, values){
			if(typeof form2 == "string"){
				form2 = Ext.getCmp(form2);
				if(!form2) return;
			}
			form2.getForm().setValues(values);
		},
		setEnable: function(form2){
			if(typeof form2 == "string"){
				form2 = Ext.getCmp(form2);
				if(!form2) return;
			}
			if(!form2 || !form2.items || !form2.items.items) return;
			Ext.each(form2.items.items, function(){
				var test = /^hidden$|^label$|^grid$/;
				if(!test.test(this.xtype) && this.allowEnable)
					this.setDisabled(false);
			});
			form2.getForm().clearInvalid();
		},
		setDisable: function(form2){
			if(typeof form2 == "string"){
				form2 = Ext.getCmp(form2);
				if(!form2) return;
			}
			if(!form2 || !form2.items || !form2.items.items) return;
			Ext.each(form2.items.items, function(){
				var test = /^hidden$|^label$|^grid$/;
				if(!test.test(this.xtype))
					this.setDisabled(true);
			});
			form2.getForm().clearInvalid();
		},
		clear: function(form2){
			if(typeof form2 == "string"){
				form2 = Ext.getCmp(form2);
				if(!form2) return;
			}
			if(!form2 || !form2.items || !form2.items.items) return;
			Ext.each(form2.items.items, function(field){
				if(field.setValue)
					if(field.setValue){
						if(field.xtype == "checkbox") field.setValue(true);
						else field.setValue("");
					}
		    });
			form2.getForm().clearInvalid();
		},
		clearAndEnable: function(form2){
			if(typeof form2 == "string"){
				form2 = Ext.getCmp(form2);
				if(!form2) return;
			}
			if(!form2 || !form2.items || !form2.items.items) return;
			Ext.each(form2.items.items, function(item){
				var test = /^hidden$|^label$|^grid$/;
				if(item.setValue){
					if(this.xtype == "checkbox") item.setValue(true);
					else this.setValue("");
				}
				if(!test.test(this.xtype) && this.allowEnable)
					this.setDisabled(false);
		    });
			form2.getForm().clearInvalid();
		},
		clearAndDisable: function(form2){
			if(typeof form2 == "string"){
				form2 = Ext.getCmp(form2);
				if(!form2) return;
			}
			if(!form2 || !form2.items || !form2.items.items) return;
			Ext.each(form2.items.items, function(item){
				var test = /^hidden$|^label$|^grid$/;
				if(item.setValue){
					if(this.xtype == "checkbox") item.setValue(true);
					else this.setValue("");
				}
				if(!test.test(this.xtype))
					this.setDisabled(true);
		    });
			form2.getForm().clearInvalid();
		},
		switchButton: function(config, option){
			switch(option){
				case 'add':
				case 'edit':
					Efx.utils.setVisible(config.add, false);
					Efx.utils.setVisible(config.edit, false);
					Efx.utils.setVisible(config.save, true);
					Efx.utils.setVisible(config.remove, option == 'edit');
					Efx.utils.setVisible(config.cancel, true);
					if(option == 'add'){
						Efx.grid.clearSelection(config.grid);
						Efx.form2.clearAndEnable(Ext.getCmp(config.form2));
					}else{
						Efx.form2.setEnable(Ext.getCmp(config.form2));
					}
					break;
				case 'save':
				case 'remove':
				case 'rowclick':
				case 'cancel':
				case 'cancelNotClear':
					var processOption = /rowclick|cancelNotClear/.test(option);
					Efx.utils.setVisible(config.add, true);
					Efx.utils.setVisible(config.edit, processOption);
					Efx.utils.setVisible(config.save, false);
					Efx.utils.setVisible(config.remove, false);
					Efx.utils.setVisible(config.cancel, false);
					if(!processOption){
						Efx.grid.clearSelection(config.grid);
						Efx.form2.clearAndDisable(config.form2);
					}
					else Efx.form2.setDisable(config.form2);
					break;
				default: break;
			}
		}
	};
}();

//UTILS
Efx.utils.scrollTo = function(panel, id){
	var el = Ext.getDom(id);
	var top = (Ext.fly(el).getOffsetsTo(panel.body)[1]) + panel.body.dom.scrollTop;
	panel.body.scrollTo('top', top - 25);
};

Efx.utils.sendRedirect = function(url){
	document.location.href = url;
};

//COMBOS
//COMBOS
Efx.combos = function(){
	var planesFinancimiento;
	var fuentesIngreso, fuentesOtrosIngresos, profesiones;
	var wkfTransicionarEtapas;
	var generos, estadosCiviles, estadosVivienda;
	var entidades, deudores, noDeudores, conCodeudor, conFiador;
	var actividadesEconomica;
	var participantes, gstRefereciasFamiliares, gstRefereciasPersonales, gstRefereciasComerciales;
	var gstVerificacionRefereciasFamiliares, gstVerificacionRefereciasPersonales, gstVerificacionRefereciasComerciales;
	var gstLaborales, gstVerificacionLaborales;
	var tiposCredito, parentescos;
	var arrayToReturn = null;
	var wkfEtapas,productos,estados,tipoOperacion,tipoTransicion,tipoProceso,tipoFlujo,usuarios;
	var wkfActMetodo;
	var usuarioRoles = [];
	var actividadesEtapa = [];
	var productosXPlan = [];
	var generarDocEtapas = [];
	var rangosUsuario=[];
	var tipoCalificaciones=[];
	var documentosEtapa;
	var deptoGrid,muniGrid,coloniaGrid,registroGrid;
	var sucursales,tipoSucursal,subtipoSucursal,sucursalGrid,tipoSucursalGrid,subTipoSucursalGrid;
	var representantes;
	var tipoObservacion;
	var sdgUsuariosAsignacion;
	var filter = function(objectId, array, index) {
		arrayToReturn = new Array();
		if (Ext.isEmpty(index))
			return arrayToReturn;
		Ext.each(array, function(item) {
			if (item[index] == objectId) {
				hasBegan = true;
				arrayToReturn.push(item);
			} else
				return item[index] <= objectId;
		});
		return arrayToReturn;
	};

	var filterString = function(objectId, array, index) {
		arrayToReturn = new Array();
		if (Ext.isEmpty(index))
			return arrayToReturn;
		Ext.each(array, function(item) {
			if (item[index] == objectId) {
				hasBegan = true;
				arrayToReturn.push(item);
			} else
				return item[index];
		});
		return arrayToReturn;
	};


	var filterStoI = function(objectId, array, index) {
		arrayToReturn = new Array();
		if (Ext.isEmpty(index))
			return arrayToReturn;
		Ext.each(array, function(item) {
			if (item[index] == parseInt(objectId)) {
				hasBegan = true;
				arrayToReturn.push(item);
			} else
				return item[index];
		});
		return arrayToReturn;
	};
	return {
		setRequiredAndValidate: function(fieldId, required){
			var field = Ext.getCmp(fieldId);
			if(field){
				field.allowBlank = !required;
				if(field.validate()){
					field.clearInvalid();
					return true;
				}else{
					field.markInvalid(field.blankText || "Este campo es obligatorio");
					return false;
				}
			}
			return true;
		},
		getSelectedRecord: function(combo, field, id){
			if(typeof combo == 'string') combo = Ext.getCmp(combo);
			var valueToReturn = null;
			if(combo && combo.store){
				Ext.each(combo.store.getRange(), function(item){
					if(item.get(field) == id){
						valueToReturn = item;
						return false;
					}
				});
			}
			return valueToReturn;
		},
    	getSelectedData: function(fieldId, id){
			fieldId = Ext.getCmp(fieldId);
			var record = null;
			if(fieldId && (fieldId.getXType() == "combobox" || fieldId.getXType() == "combo")){
				for(var i = 0; i < fieldId.store.data.items.length; i++){
					record = fieldId.store.data.items[i].data;
					if(fieldId.value === record[id]) return record;
					else record = null;
				}
			}
			return record;
    	},
		removeAll: function(comboId, notClear){
			var combo = Ext.getCmp(comboId);
			if(combo){
				combo.store.removeAll(true);
				if(!notClear) combo.setValue('');
			}
		},
		loadData: function(comboId, data, notClear){
			var combo = Ext.getCmp(comboId);
			if(combo){
				this.removeAll(comboId, notClear);
				combo.store.loadData(data);
			}
		},
		tipoClienteArray: function() {return [['0','NUEVO'],['1','OMNISPORT']];},
		modeloArray: function(){return [['1','CREDITO A PLAZOS'],['2','CREDITO REVOLVENTE']];},
		yesnoArray: function(){return [['1', 'SI'], ['0', 'NO']];},
		activoArray: function(){return [['1', 'ACTIVO'], ['0', 'INACTIVO']];},
		initUsuarioRoles: function(values){usuarioRoles = values;},
		initUsuarios: function(values){usuarios=values;},
		initDocumentos: function(values){documentos=values;},
		initProvincias: function(values){departamentos = values;},
		initCantones: function(values){municipios = values;},
		initDistritos: function(values){colonias = values;},
		initPoblados: function(values){poblados = values;},
		initProvGrid: function(values){deptoGrid = values;},
		initCantGrid: function(values){muniGrid=values;},
		initDistritoGrid: function(values){coloniaGrid=values;},
		initPobladoGrid: function(values){pobladoGrid=values;},
		getAllGridCantonesByProvincia: function(departamentoId){return filter(departamentoId, muniGrid, 2);},
		getAllGridPobladosByDistrito: function(distritoId){return filter(distritoId,pobladoGrid, 2);},
		initSucursales: function (values) {sucursales=values;},
		initTipoSucursal: function (values){tipoSucursal=values;},
		initSubTipoSucursal: function(values){subTipoSucursal=values;},
		initSucursalGrid: function (values){sucursalGrid=values;},
		initTipoSucursalGrid: function (values) {tipoSucursalGrid=values;},
		initSubTipoSucursalGrid: function(values) {subTipoSucursalGrid=values;},
		getAllTipoSucursalGrid: function(){return tipoSucursalGrid;},
		getAllSubTipoSucursalByTipoSucursal: function(ctgSucursalId){return filter(ctgSucursalId, subTipoSucursalGrid, 2);},
		getAllSucursaleBySubTipoSucursal: function(ctgSubTipoSucursalId){return filter(ctgSubTipoSucursalId,sucursalGrid,2);},
		getAllTipoSucursal: function(){return tipoSucursal;},
		getAllSubTipoSucursal: function(){return subTipoSucursal;},
		getAllSucursales: function(){return sucursales;},
		getAllGridDistritosByCanton: function(municipioId){return filter(municipioId,coloniaGrid,2);},
		getAllCantGrid: function(){return muniGrid;},
		getAllProvGrid: function(){return deptoGrid;},
		getAllUsuarios: function(){return usuarios;},
		getAllDocumentos: function(){return documentos;},
		getAllProvincias: function(){return departamentos;},
		getAllPobladoGrid: function(){return pobladoGrid;},


			initRegistros: function(values){registros = values;},
			initPlataformas: function(values){plataformas = values;},
			initProgramas: function(values){programas = values;},
			initAmbientes: function(values){ambientes = values;},
			initRegistroGrid: function(values){registroGrid = values;},
			getAllRegistroGrid: function(){return registroGrid;},
			getAllPlataformas: function(){return plataformas;},
			getAllProgramas: function(){return programas;},
			getAllAmbientes: function(){return ambientes;},
			getAllRegistros: function(){return registros;},

		initCanales: function(values){canales = values;},
		getAllCanales: function(){return canales;},

		getAllHijosByPadresCombo : function(ctgCatalogoHijo, ctgCatalogoPadre) {
			return filterString(ctgCatalogoHijo, ctgCatalogoPadre, 2);
		},

		getAllDocHijoByDocPadreCombo : function(ctgCatalogoHijo, ctgCatalogoPadre) {
			return filterStoI(ctgCatalogoHijo, ctgCatalogoPadre, 2);
		},



		getAllDocHijoByDocPadreOrigen : function(ctgCatalogoHijo, ctgCatalogoPadre) {
			return filterStoI(ctgCatalogoHijo, ctgCatalogoPadre, 0);
		},

		getAllProdByProdCombo : function(ctgCatalogoId, ctgCatalogoId) {
			return filterString(ctgCatalogoId, ctgCatalogoId, 2);
		},

		getAllCantonesByProvincia: function(provinciaId){return filter(provinciaId, municipios, 2);},
		getAllDistritosByCanton: function(cantonId){return filter(cantonId, colonias, 2);},
		getAllPobladosByDistrito: function(distritoId){return filter(distritoId,poblados);},
		getAllCantonesByProvinciaCombo: function(provinciaId, cantones){return filter(provinciaId, cantones, 2);},
		getAllDistritosByCantonCombo: function(cantonId, distritos){return filter(cantonId, distritos, 2);},
		getAllPobladosByDistritoCombo: function(distritoId, poblados){return filter(distritoId, poblados, 2);},
		getAllSubSegmentosBySegmentoCombo: function(ctgSegmentoId, catalogos){return filterString(ctgSegmentoId, catalogos, 2);},
		getUsuarioRolesBySgdUsuarioId: function(sgdUsuarioId){return filter(sgdUsuarioId, usuarioRoles, "usrId");},
		onBlur: function(field){
			if(Ext.isEmpty(field.getRawValue()) || Ext.isEmpty(field.getValue())){
				field.setValue(null);
				field.fireEvent('select');
			}
			try{field.store.clearFilter();}catch(e){}
		},
		getAllFuentesIngreso: function(){return fuentesIngreso;},
		getAllFuentesOtrosIngresos: function(){return fuentesOtrosIngresos;},
		getAllProfesiones: function(){return profesiones;},
		getAllEntidades: function(){return entidades;},
		getAllGeneros: function(filter){return generos;},
		getAllEstadosCiviles: function(filter){return estadosCiviles;},
		getAllEstadosVivienda: function(filter){return estadosVivienda;},
		getAllDeudor: function(){return deudores;},
		getAllNotDeudor: function(){return noDeudores;},
		getAllConCodeudor: function(){return conCodeudor;},
		getAllConFiador: function(){return conFiador;},
		getAllParticipantes: function(){return participantes;},
		getAllGstRefereciasFamiliaresByGstSolicitudPersonaId: function(gstSolicitudPersonaId){return filter(gstSolicitudPersonaId, gstRefereciasFamiliares, 0);},
		getAllGstRefereciasPersonalesByGstSolicitudPersonaId: function(gstSolicitudPersonaId){return filter(gstSolicitudPersonaId, gstRefereciasPersonales, 0);},
		getAllGstRefereciasComercialesByGstSolicitudPersonaId: function(gstSolicitudPersonaId){return filter(gstSolicitudPersonaId, gstRefereciasComerciales, 0);},
		getAllGstVerificacionReferenciasFamiliaresByGstSolicitudPersonaId: function(gstSolicitudPersonaId){return filter(gstSolicitudPersonaId, gstVerificacionRefereciasFamiliares, 0);},
		getAllGstVerificacionReferenciasPersonalesByGstSolicitudPersonaId: function(gstSolicitudPersonaId){return filter(gstSolicitudPersonaId, gstVerificacionRefereciasPersonales, 0);},
		getAllGstVerificacionLaboralesByGstSolicitudPersonaId: function(gstSolicitudPersonaId){return filter(gstSolicitudPersonaId, gstVerificacionLaborales, 0);},
		getAllGstVerificacionReferenciasComercialesByGstSolicitudPersonaId: function(gstSolicitudPersonaId){return filter(gstSolicitudPersonaId, gstVerificacionRefereciasComerciales, 0);},
		getAllGstLaboralesByGstSolicitudPersonaId: function(gstSolicitudPersonaId){return filter(gstSolicitudPersonaId, gstLaborales, 0);},
		getAllGstRefereciasComerciales: function(){return gstRefereciasComerciales;},
		getAllGstRefereciasFamiliares: function(){return gstRefereciasFamiliares;},
		getAllGstRefereciasPersonales: function(){return gstRefereciasPersonales;},
		getAllParentescos: function(){return parentescos;},
		getWkfActMetodo: function(){return wkfActMetodo;},
		getActividadesEtapaByEtapaId: function(etapaId){return filter(etapaId, actividadesEtapa, "etapaId");},
		initAllDeudor: function(){
			arrayToReturn = new Array();
			Ext.each(entidades, function(item){
				if(item[4] == Efx.constants.DEUDOR_VALUES){
					arrayToReturn.push(item);
				}
			});
			return arrayToReturn;
		},
		initAllNotDeudor: function(){
			arrayToReturn = new Array();
			Ext.each(entidades, function(item){
				if(item[4] != Efx.constants.DEUDOR_VALUES){
					arrayToReturn.push(item);
				}
			});
			return arrayToReturn;
		},
		initAllConCodeudor: function(){
			arrayToReturn = new Array();
			Ext.each(entidades, function(item){
				if(item[4] != Efx.constants.DEUDOR_VALUES &&
						item[4] != Efx.constants.CODEUDOR_VALUES){
					arrayToReturn.push(item);
				}
			});
			return arrayToReturn;
		},
		initAllConFiador: function(){
			arrayToReturn = new Array();
			Ext.each(entidades, function(item){
				if(item[4] != Efx.constants.DEUDOR_VALUES &&
						item[4] != Efx.constants.FIADOR_VALUES){
					arrayToReturn.push(item);
				}
			});
			return arrayToReturn;
		},
		isDeudor: function(ctgEntidadId){
			var deudor = false;
			Ext.each(entidades, function(item){
				if(item.ctgCatalogoId == ctgEntidadId &&
					item.ctgCatalogoHijo == Efx.constants.DEUDOR_VALUES){
					deudor = true;
					return false;
				}
			});
			return deudor;
		},
		selectFirstItem: function(id){
			if(typeof id != 'string') return;
			var cmp = Ext.getCmp(id);
			if(cmp) cmp.setValue((cmp.store && cmp.store.getAt(0))? Ext.getCmp(id).store.getAt(0):"");
		}
	};
}();

//VTYPES
var telVal = /^[1|2|3|4|5|6|7|8|9]\d{7}$/;
var telMask = /^\d$/;
var telText = 'N\u00FAmero de Tel\u00e9fono inv\u00E1lido. </br>Condiciones: </br>- No Iniciar con d\u00edgito 0</br>- Longitud 8 d\u00edgitos';
Ext.apply(Ext.form.VTypes, {
	telefonoDomicilioVal: telVal,
	telefonoDomicilioMask: telMask,
	telefonoDomicilioText: telText,
	telefonoDomicilio: function(v){
		return this.telefonoDomicilioVal.test(v);
	}
});

Ext.apply(Ext.form.VTypes, {
	telefonoCelularVal: telVal,
	telefonoCelularMask: telMask,
	telefonoCelularText: telText,
	telefonoCelular: function(v){
		return this.telefonoCelularVal.test(v);
	}
});

Ext.apply(Ext.form.VTypes, {
	telefonoVal: telVal,
	telefonoMask: telMask,
	telefonoText: telText,
	telefono: function(v){
		return this.telefonoVal.test(v);
	}
});

Ext.apply(Ext.form.VTypes, {
	horaVal: /^(0[1-9]|1[0-2]):(0[0-9]|[1-5][0-9])$/,
	horaMask: /\d|\:/,
	horaText: 'Formato ##:## Ej. 12:30',
	hora: function(v){
		return this.horaVal.test(v);
	}
});

Ext.apply(Ext.form.VTypes, {
	duiVal: /^\d{9}$/,
	duiMask: /^\d{0,9}$/,
	duiText: 'Formato DUI inv\u00E1lido',
	dui: function(value){
		if(isNaN(parseFloat(value)) || parseFloat(value) == 0) return false;
		var cuerpo = value.substring(0, 8);
		var digitoVerif = value.substring(8, 9);
		if(Ext.isEmpty(cuerpo) || Ext.isEmpty(digitoVerif) || value.length != 9) return false;
		var i, k = 0, suma = 0, sumando, digito, resto, digito1;
		digito = Number(digitoVerif);
		for(i = 9; i > 1; i--){
			sumando = cuerpo.substr(k, 1);
			suma += Number(sumando) * i;
			k++;
		}
		resto = suma % 10;//30
		if(resto == 0) digito1 = 0;
		else digito1 = 10 - resto;
		if(digito != digito1) return false;
		return true;
	}
});

Ext.apply(Ext.form.VTypes, {
	numVal: /^\d{9}$/,
	numMask: /^\d{0,9}$/,
	numText: 'Formato numero inv\u00E1lido',
	num: function(value){
		if(isNaN(parseInt(value)) || parseInt(value) == 0){
			return false;
		}
		return true;
	}
});

/*valida que solo ingrese un numero de cuenta bancaria con exactamente 17 digitos*/
Ext.apply(Ext.form.VTypes, {
	cuentaBancariaVal : /^([0|1|2|3|4|5|6|7|8|9]\d{16})$/,
	cuentaBancariaMask : /^\d$/,
	cuentaBancariaText : 'El No. de cuenta de cliente CITI debe tener 17 digitos',
	cuentaBancaria : function(v) {
			return this.cuentaBancariaVal.test(v);
	}
});


//base 64
Ext.util.base64 = {

    base64s : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",

    encode: function(decStr){
        if (typeof btoa === 'function') {
             return btoa(decStr);
        }
        var base64s = this.base64s;
        var bits;
        var dual;
        var i = 0;
        var encOut = "";
        while(decStr.length >= i + 3){
            bits = (decStr.charCodeAt(i++) & 0xff) <<16 | (decStr.charCodeAt(i++) & 0xff) <<8 | decStr.charCodeAt(i++) & 0xff;
            encOut += base64s.charAt((bits & 0x00fc0000) >>18) + base64s.charAt((bits & 0x0003f000) >>12) + base64s.charAt((bits & 0x00000fc0) >> 6) + base64s.charAt((bits & 0x0000003f));
        }
        if(decStr.length -i > 0 && decStr.length -i < 3){
            dual = Boolean(decStr.length -i -1);
            bits = ((decStr.charCodeAt(i++) & 0xff) <<16) |    (dual ? (decStr.charCodeAt(i) & 0xff) <<8 : 0);
            encOut += base64s.charAt((bits & 0x00fc0000) >>18) + base64s.charAt((bits & 0x0003f000) >>12) + (dual ? base64s.charAt((bits & 0x00000fc0) >>6) : '=') + '=';
        }
        return(encOut);
    },

    decode: function(encStr){
        if (typeof atob === 'function') {
            return atob(encStr);
        }
        var base64s = this.base64s;
        var bits;
        var decOut = "";
        var i = 0;
        for(; i<encStr.length; i += 4){
            bits = (base64s.indexOf(encStr.charAt(i)) & 0xff) <<18 | (base64s.indexOf(encStr.charAt(i +1)) & 0xff) <<12 | (base64s.indexOf(encStr.charAt(i +2)) & 0xff) << 6 | base64s.indexOf(encStr.charAt(i +3)) & 0xff;
            decOut += String.fromCharCode((bits & 0xff0000) >>16, (bits & 0xff00) >>8, bits & 0xff);
        }
        if(encStr.charCodeAt(i -2) == 61){
            return(decOut.substring(0, decOut.length -2));
        }
        else if(encStr.charCodeAt(i -1) == 61){
            return(decOut.substring(0, decOut.length -1));
        }
        else {
            return(decOut);
        }
    }

};


//Valida los numeros de telefono, o uno de 8 digitos qe no inicie con "0" u ocho ceros en su defecto
var jueVal = /^([1|2|3|4|5|6|7|8|9]\d{7}|00000000)$/;
var jueMask = /^\d$/;
var jueText = 'El n\u00FAmero de tel\u00e9fono no debe iniciar con "0". <br/>En caso de no tener digite "00000000"';
Ext.apply(Ext.form.VTypes, {
	validcerosVal : jueVal,
	validcerosMask : jueMask,
	validcerosText : jueText,
	validceros : function(v) {
		return this.validcerosVal.test(v);
	}
});



//Valida que la cedula no inicie con cero y solo tenga un maximo de 9 digitos
Ext.apply(Ext.form.VTypes, {
	validNAVal : /^((^NA)|(^na)|[1|2|3|4|5|6|7|8|9]\d{7})$/,
	validNAMask : /[a-zA-Z0-9]/,
	validNAText : 'El n\u00famero de tel\u00e9fono no debe iniciar con "0". En caso de no tener digite "NA"',
	validNA : function(v) {
			return this.validNAVal.test(v);
	}
});


//Valida que ingrese 17 numeros que puedan iniciar con cero y tener NA
Ext.apply(Ext.form.VTypes, {
	validNumberNAVal : /^((^NA)|(^na)|[0|1|2|3|4|5|6|7|8|9]\d{16})$/,
	validNumberNAMask : /[a-zA-Z0-9]/,
	validNumberNAText : 'El n\u00famero de cuenta de liquidaci\u00f3n debe ser de 17 digitos. En caso de no tener digite "NA"',
	validNumberNA : function(v) {
			return this.validNumberNAVal.test(v);
	}
});


//Valida que la cedula no inicie con cero y solo tenga un maximo de 9 digitos
Ext.apply(Ext.form.VTypes, {
	CedNacVal : /^[1|2|3|4|5|6|7|8|9]\d{8}$/,
	CedNacMask : /^\d$/,
	CedNacText : 'El n\u00famero de c\u00e9dula no debe iniciar con "0" y debe contener un m\u00e1ximo de 9 d\u00edgitos continuos',
	CedNac : function(v) {
			return this.CedNacVal.test(v);
	}
});

//Valida que la cedula no inicie con cero y solo tenga un maximo de 10 digitos
Ext.apply(Ext.form.VTypes, {
	CedJurVal : /^[1|2|3|4|5|6|7|8|9]\d{9}$/,
	CedJurMask : /^\d$/,
	CedJurText : 'Formato de c\u00e9dula inv\u00E1lido, no debe comenzar con "0" y debe contener 10 d\u00edgitos continuos',
	CedJur : function(v) {
		if( v.length  == 10)
			return this.CedJurVal.test(v);
		else
			return false;
	}
});


//Valida cedulas que no inicien con cero y tengan un ancho de 9 o 10 (juridicas o fisicas)
Ext.apply(Ext.form.VTypes, {
	cedulasVal : /^[1|2|3|4|5|6|7|8|9]\d{1,10}$/,
	cedulasMask : /^\d$/,
	cedulasText : 'Formato de c\u00e9dula inv\u00e1lido, el n\u00famero no debe iniciar con "0"',
	cedulas : function(v) {
		if(v.length  == 9 || v.length  == 10)
			return this.cedulasVal.test(v);
		else
			return false;
	}
});


//Valida que solo se ingresen letras y espacios
Ext.apply(Ext.form.VTypes, {
	LetrasVal : /^[a-zA-Z ]+$/,
	LetrasMask : /[a-z ]/i,
	LetrasText : 'Datos incorrectos, solo puede ingresar letras y espacios',
	Letras : function(v) {
			return this.LetrasVal.test(v);
	}
});

// Valida que solo se ingresen letras sin espacios
Ext.apply(Ext.form.VTypes, {
	LetrassVal : /^[a-zA-Z]+$/,
	LetrassMask : /[a-z]/i,
	LetrassText : 'Datos incorrectos, solo puede ingresar letras sin espacios',
	Letrass : function(v) {
			return this.LetrassVal.test(v);
	}
});


// Valida que se ingresen letras y numeros con espacio
Ext.apply(Ext.form.VTypes, {
	LetrasNumVal : /^[a-zA-Z0-9]+$/,
	LetrasNumMask : /[a-z0-9]/i,
	LetrasNumText : 'Datos incorrectos, solo puede ingresar letras y n\u00fameros',
	LetrasNum : function(v) {
			return this.LetrasNumVal.test(v);
	}
});

//Valida que se ingresen letras y numeros sin espacio
Ext.apply(Ext.form.VTypes, {
	CedExtVal : /^[a-zA-Z0-9]+$/,
	CedExtMask : /[a-z0-9]/i,
	CedExtText : 'Formato de documento inv\u00E1lido, solo puede ingresar letras y n\u00fameros',
	CedExt : function(v) {
			return this.CedExtVal.test(v);
	}
});

//Permite solo números
Ext.apply(Ext.form.VTypes, {
  validacionNumeroText : 'Los datos ingresado no son v\u00e1lidos. Solo n\u00fameros',
  validacionNumeroMask : /[0-9]/i,
  validacionNumero : function(value, field) {
	   return /[0-9]/.test(value);
	  }
});


Ext.apply(Ext.form.VTypes, {
	nitVal: /^\d{13}$/,
	nitMask: /^\d{0,13}$/,
	nitText: 'Formato NIT inv\u00E1lido',
	nit: function(value){
		if(isNaN(parseFloat(value)) || parseFloat(value) == 0) return false;
		var frontera, peso,suma=0, digito,i, aux, aux1,factor, dig_verif;
		if(Ext.isEmpty(value) || value.length != 14)
			return false;
		frontera = Number(value.substring(10,13));
		if(frontera < 100){
			for(i = 0; i < 13; i++){
				peso = Number(value.substring(i, i+1)) * (15 - (i+1));
				suma += peso;
			}
			digito=suma % 11;
			if(digito == 10) digito=0;
		}
		else{
			for(i = 0; i < 13; i++){
				aux = ((i+1) + 4) / 6;
				aux1 = Math.floor(aux);
				factor = (3 + (6 * aux1)) - (i+1);
				peso = Number(value.substring(i, i+1)) *factor;
				suma += peso;
			}
			digito = suma%11;
			if(digito > 1) digito = 11 - digito;
			else digito = 0;
		}
		dig_verif = Number(value.substr(13, 1));
		if(digito != dig_verif)	return false;
		return true;
	}
});

//MessageBox
Efx.message = function(){
	return {
		addBottons: function(buttons){
			for(button in buttons){
				button = buttons[button];
				Ext.window.MessageBox.prototype.buttonIds.push(button.id);
				Ext.window.MessageBox.prototype.buttonText[button.id] = button.text;
			}

			Ext.override(Ext.window.MessageBox, {
				initComponent: function () {
		            var me = this,
		                i, button;

		            me.title = '&#160;';

		            me.topContainer = Ext.create('Ext.container.Container', {
		                anchor: '100%',
		                style: {
		                    padding: '10px',
		                    overflow: 'hidden'
		                },
		                items: [
		                    me.iconComponent = Ext.create('Ext.Component', {
		                        cls: 'ext-mb-icon',
		                        width: 50,
		                        height: me.iconHeight,
		                        style: {
		                            'float': 'left'
		                        }
		                    }),
		                    me.promptContainer = Ext.create('Ext.container.Container', {
		                        layout: {
		                            type: 'anchor'
		                        },
		                        items: [
		                            me.msg = Ext.create('Ext.Component', {
		                                autoEl: { tag: 'span' },
		                                cls: 'ext-mb-text'
		                            }),
		                            me.textField = Ext.create('Ext.form.field.Text', {
		                                anchor: '100%',
		                                enableKeyEvents: true,
		                                listeners: {
		                                    keydown: me.onPromptKey,
		                                    scope: me
		                                }
		                            }),
		                            me.textArea = Ext.create('Ext.form.field.TextArea', {
		                                anchor: '100%',
		                                height: 75
		                            })
		                        ]
		                    })
		                ]
		            });
		            me.progressBar = Ext.create('Ext.ProgressBar', {
		                anchor: '-10',
		                style: 'margin-left:10px'
		            });

		            me.items = [me.topContainer, me.progressBar];


		            me.msgButtons = [];
		            for (i = 0; i < me.buttonIds.length; i++) {
		                button = me.makeButton(i);
		                me.msgButtons[button.itemId] = button;
		                me.msgButtons.push(button);
		            }
		            me.bottomTb = Ext.create('Ext.toolbar.Toolbar', {
		                ui: 'footer',
		                dock: 'bottom',
		                layout: {
		                    pack: 'center'
		                },
		                items: me.msgButtons
		            });
		            me.dockedItems = [me.bottomTb];

		            me.callParent();
		        },
		        reconfigure: function (cfg) {
			        var me = this,
		            buttons = cfg.buttons || 0,
		            hideToolbar = true,
		            initialWidth = me.maxWidth,
		            i;

			        cfg = cfg || {};
			        me.cfg = cfg;
			        if (cfg.width) {
			            initialWidth = cfg.width;
			        }


			        delete me.defaultFocus;


			        me.animateTarget = cfg.animateTarget || undefined;


			        me.modal = cfg.modal !== false;


			        if (cfg.title) {
			            me.setTitle(cfg.title||'&#160;');
			        }

			        if (!me.rendered) {
			            me.width = initialWidth;
			            me.render(Ext.getBody());
			        } else {
			            me.hidden = false;
			            me.setSize(initialWidth, me.maxHeight);
			        }
			        me.setPosition(-10000, -10000);


			        me.closable = cfg.closable && !cfg.wait;
			        if (cfg.closable === false) {
			            me.tools.close.hide();
			        } else {
			            me.tools.close.show();
			        }


			        if (!cfg.title && !me.closable) {
			            me.header.hide();
			        } else {
			            me.header.show();
			        }


			        me.liveDrag = !cfg.proxyDrag;


			        me.userCallback = Ext.Function.bind(cfg.callback ||cfg.fn || Ext.emptyFn, cfg.scope || Ext.global);


			        me.setIcon(cfg.icon);


			        if (cfg.msg) {
			            me.msg.update(cfg.msg);
			            me.msg.show();
			        } else {
			            me.msg.hide();
			        }


			        if (cfg.prompt || cfg.multiline) {
			            me.multiline = cfg.multiline;
			            if (cfg.multiline) {
			                me.textArea.setValue(cfg.value);
			                me.textArea.setHeight(cfg.defaultTextHeight || me.defaultTextHeight);
			                me.textArea.show();
			                me.textField.hide();
			                me.defaultFocus = me.textArea;
			            } else {
			                me.textField.setValue(cfg.value);
			                me.textArea.hide();
			                me.textField.show();
			                me.defaultFocus = me.textField;
			            }
			        } else {
			            me.textArea.hide();
			            me.textField.hide();
			        }


			        if (cfg.progress || cfg.wait) {
			            me.progressBar.show();
			            me.updateProgress(0, cfg.progressText);
			            if(cfg.wait === true){
			                me.progressBar.wait(cfg.waitConfig);
			            }
			        } else {
			            me.progressBar.hide();
			        }


			        for (i = 0; i < me.buttonIds.length; i++) {
			            if (buttons & Math.pow(2, i)) {


			                if (!me.defaultFocus) {
			                    me.defaultFocus = me.msgButtons[i];
			                }
			                me.msgButtons[i].show();
			                hideToolbar = false;
			            } else {
			                me.msgButtons[i].hide();
			            }
			        }


			        if (hideToolbar) {
			            me.bottomTb.hide();
			        } else {
			            me.bottomTb.show();
			        }
			        me.hidden = true;
			    }
			});
			Ext.MessageBox = Ext.Msg = new Ext.window.MessageBox();
		},
		alert: function(message){
			Ext.MessageBox.show({
				title: Efx.constants.APPLICATION_TITLE,
				msg: message,
				buttons: Ext.Msg.OK,
				minWidth: 250
			});
		},
		alertInvalidFields: function(message){
			this.alert(Efx.utils.formatString('<b>{0}</b><br />* {1}<br />{2}', Efx.constants.INVALID_ACTION, Efx.constants.REQUIRED_FIELDS, (message || "")));
		},
		alertConnectionFailure: function(){
			this.alert(Efx.constants.CONNECTION_FAIILURE);
		},
		alertInvalid: function(message){
			this.alert(Efx.utils.formatString('<b>{0}</b><br /> {1}', Efx.constants.INVALID_ACTION, message));
		},
		alertDefaultErrorMessage: function(){
			this.alert(Efx.constants.DEFAULT_ERROR_MESSAGE);
		},
		confirmDelete: function(fn, parameters){
			if(!parameters) parameters = {};
			Ext.MessageBox.show({
				title: Efx.constants.APPLICATION_TITLE,
				msg: Efx.constants.CONFIRM_DELETE_MESSAGE,
				fn: function(btn){
					if(btn == 'ok') fn(parameters);
				},
				buttons: Ext.Msg.OKCANCEL,
				minWidth: 250
			});
		},
		confirmProcess: function(message, fn, parameters){
			Ext.MessageBox.show({
				title: Efx.constants.APPLICATION_TITLE,
				msg: message,
				fn: function(){
					fn(parameters);
				},
				buttons: Ext.Msg.OK,
				closable: false,
				minWidth: 250
			});
		},
		confirm: function(message, fn, buttons){
			if(!buttons) buttons = Ext.Msg.YESNO;
			Ext.MessageBox.show({
				title: Efx.constants.APPLICATION_TITLE,
				msg: message,
				fn: fn,
				buttons: buttons,
				minWidth: 250,
				closable: false
			});
		},
		errorDelete: function(message, fn){
			Ext.MessageBox.show({
				title: 'ERROR',
				msg: message,
				fn: fn,
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.Msg.OK,
				minWidth: 250,
				closable: false
			});
		},
		progress: function(message){
			Ext.MessageBox.show({
				title: Efx.constants.APPLICATION_TITLE,
				msg: message,
				buttons: [],
				minWidth: 250,
				height: 70,
				closable: false
			});
		},
		prompt: function(message, fn, onEsc){
			Ext.MessageBox.show({
				title: Efx.constants.APPLICATION_TITLE,
				msg: message,
				buttons: Ext.Msg.OKCANCEL,
				minWidth: 350,
				height: 70,
				fn: fn,
				prompt: true,
				closable: false
			});
		}
	};
}();

//GRID
Efx.grid = function(){
	return {
		isGrid: function(grid){
			if(typeof grid == 'string') grid = Ext.getCmp(grid);
			if(!grid) return;
			if(grid.xtype != 'grid') return null;
			return grid;
		},
		selectFirstRow: function(grid){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return;
			grid.getSelectionModel().select(0);
		},
		loadData: function(grid, data){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return;
			grid.getStore().removeAll(true);
			grid.getStore().loadData(data);
		},
		selectByIndex: function(grid, index){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return;
			grid.getSelectionModel().select(index);
		},
		clearSelection: function(grid){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return;
			grid.getSelectionModel().deselectAll();
		},
		hasSelection: function(grid){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return false;
			return grid.getSelectionModel().hasSelection();
		},
		getAdditionalData: function(data, idx, record, orig) {
            var o = Ext.grid.feature.RowBody.prototype.getAdditionalData.apply(this, arguments),
                id = this.columnId;
            o.rowBody = this.getRowBodyContents(data);
            o[id + '-tdAttr'] = ' valign="top" rowspan="2" ';
            if (orig[id+'-tdAttr']) {
                o[id+'-tdAttr'] += orig[id+'-tdAttr'];
            }
            return o;
        },
        getSelectedRow : function(grid){
        	if(typeof grid == "string") grid = Ext.getCmp(grid);
			var records = grid.getSelectionModel().getSelection();
			if(records != null && records.length > 0) return records[0];
			return null;
		},
		getAllRows: function(grid){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return null;
			return grid.getStore().getRange();
		},
		getAllRowsToJson: function(grid) {
			var range = this.getAllRows(grid);
			if (!range) return null;
			return Ext.encode(Ext.pluck(range, 'data'));
		}
	};
}();

//GRID2
Efx.grid2 = function(){
	return {
		isGrid: function(grid){
			if(typeof grid == 'string') grid = Ext.getCmp(grid);
			if(!grid) return;
			if(grid.xtype != 'grid') return null;
			return grid;
		},
		selectFirstRow: function(grid){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return;
			grid.getSelectionModel().select(0);
		},
		loadData: function(grid, data){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return;
			grid.getStore().removeAll(true);
			grid.getStore().loadData(data);
		},
		selectByIndex: function(grid, index){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return;
			grid.getSelectionModel().select(index);
		},
		clearSelection: function(grid){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return;
			grid.getSelectionModel().deselectAll();
		},
		hasSelection: function(grid){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return false;
			return grid.getSelectionModel().hasSelection();
		},
		getAdditionalData: function(data, idx, record, orig) {
            var o = Ext.grid.feature.RowBody.prototype.getAdditionalData.apply(this, arguments),
                id = this.columnId;
            o.rowBody = this.getRowBodyContents(data);
            o[id + '-tdAttr'] = ' valign="top" rowspan="2" ';
            if (orig[id+'-tdAttr']) {
                o[id+'-tdAttr'] += orig[id+'-tdAttr'];
            }
            return o;
        },
        getSelectedRow : function(grid){
        	if(typeof grid == "string") grid = Ext.getCmp(grid);
			var records = grid.getSelectionModel().getSelection();
			if(records != null && records.length > 0) return records[0];
			return null;
		},
		getAllRows: function(grid){
			var grid = this.isGrid(grid);
			if(!grid || !grid.rendered) return null;
			return grid.getStore().getRange();
		},
		getAllRowsToJson: function(grid) {
			var range = this.getAllRows(grid);
			if (!range) return null;
			return Ext.encode(Ext.pluck(range, 'data'));
		}
	};
}();

Efx.utils.comboRenderer = function(combo){
    return function(value) {
        var record = combo.findRecord(combo.valueField, value);
        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
    };
};

Efx.ctgForm.Form = Ext.extend(Ext.form.FormPanel, {
    iconCls: 'silk-user',
    frame: true,
    labelAlign: 'right',
    title: 'Todos los campos son requeridos',
    frame: true,
    width: 500,
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },
    record : null,
    initComponent : function() {
        this.items = this.buildForm();
        this.buttons = this.buildUI();
        this.addEvents({
            create : true
        });
        Efx.ctgForm.Form.superclass.initComponent.call(this);
    },
    buildForm : function() {
        return [
            {fieldLabel: 'Nombre', name: 'nombre', allowBlank: false},
            {fieldLabel: 'Descripci&oacute;n', name: 'ctgCatalogoNombre'},
            {fieldLabel: 'Activo', name: 'activo', allowBlank: false, xtype: 'combo'},
            {fieldLabel: 'Sujeto de Cr&eacute;dito', name: 'sujetoCredito', allowBlank: false, xtype: 'combo'}
        ];
    },
    buildUI: function(){
        return [{
            text: 'Guardar',
            iconCls: 'icon-save',
            handler: this.onUpdate,
            scope: this
        }, {
            text: 'Nuevo',
            iconCls: 'silk-user-add',
            handler: this.onCreate,
            scope: this
        }, {
            text: 'Limpiar',
            handler: function(btn, ev){
                this.getForm().reset();
            },
            scope: this
        }];
    },
    loadRecord : function(rec) {
        this.record = rec;
        this.getForm().loadRecord(rec);
    },
    onUpdate : function(btn, ev) {
        if (this.record == null) {
            return;
        }
        if (!this.getForm().isValid()) {
        	Efx.message.alert("Formulario inv&aacute;lido.");
            return false;
        }
        this.getForm().updateRecord(this.record);
    },
    onCreate : function(btn, ev) {
        if (!this.getForm().isValid()) {
        	Efx.message.alert(false, "Formulario inv&aacute;lido.");
            return false;
        }
        this.fireEvent('create', this, this.getForm().getValues());
        this.getForm().reset();
    },
    onReset : function(btn, ev) {
        this.fireEvent('update', this, this.getForm().getValues());
        this.getForm().reset();
    }
});

Efx.ctgForm.Grid = Ext.extend(Ext.grid.GridPanel, {
    iconCls: 'silk-grid',
    frame: true,
    title: 'Valores',
    height: 300,
    width: 500,
    style: 'margin-top: 10px',
    initComponent : function() {
        this.viewConfig = {
            forceFit: true
        };
        this.relayEvents(this.store, ['destroy', 'save', 'update']);
        this.tbar = this.buildTopToolbar();
        this.buttons = this.buildUI();
        Efx.ctgForm.Grid.superclass.initComponent.call(this);
    },
    buildTopToolbar : function() {
        return [{
            text: 'Agregar',
            iconCls: 'silk-add',
            handler: this.onAdd,
            scope: this
        }, '-', {
            text: 'Eliminar',
            iconCls: 'silk-delete',
            handler: this.onDelete,
            scope: this
        }, '-'];
    },
    buildUI : function() {
        return [{
            text: 'Guardar',
            iconCls: 'icon-save',
            handler: this.onSave,
            scope: this
        }];
    },
    onSave : function(btn, ev) {
        this.store.save();
    },
    onAdd : function(btn, ev) {
        var u = new this.store.recordType({
            nombre : '',
            descripcion: '',
            activo: '',
            sujetoCredito: ''
        });
        this.stopEditing();
        this.store.insert(0, u);
        this.startEditing(0, 1);
    },
    onDelete : function(btn, ev) {
        var index = this.getSelectionModel().getSelectedCell();
        if (!index) {
            return false;
        }
        var rec = this.store.getAt(index[0]);
        this.store.remove(rec);
    }
});
