/**
 * Copyright(c) 2011
 *
 * Licensed under the terms of the Open Source LGPL 3.0
 * http://www.gnu.org/licenses/lgpl.html
 * @author Greivin Britton, brittongr@gmail.com
 *
 * @changes
 * No currency symbol by default
 * No decimalPrecision in config
 * Supporting any character as thousand separator
 * Improved getFormattedValue
 * Removed unnecessary code to create format template, now using float.toFixed(this.decimalPrecission)
 */
Ext.define('Ext.ux.NumericField', {
    extend: 'Ext.form.TextField',
    alias: 'widget.numericfield',
//    alternateClassName: ['Ext.form.NumberField', 'Ext.form.Number','Ext.form.field.Number'],
	style: 'text-align: right;',
	minText : "El valor m&#237;nimo para este campo es de Anibal{0}",
    maxText : "El valor m&#225;ximo para este campo es de {0}",
    nanText : "{0} no es un n&#250;mero v&#225;lido",
    zeroText: "El valor m&#237;nimo para este campo es de 0.00",
    negativeText: "El valor para este campo no puede ser negativo",
    baseChars : '0123456789',
    thousandSeparator: ',',
    decimalSeparator: '.',
    minValue: Number.NEGATIVE_INFINITY,
    maxValue: Number.MAX_VALUE,
    useThousandSeparator: true,
    allowDecimals: true,
    allowBlank: false,
    baseChars : '0123456789',
	fieldCls: "number-field",
	allowZero: true,
	emptyToZero: true,

	initComponent: function() {
        var me = this, allowed;
        me.callParent();
        me.setMinValue(me.minValue);
        me.setMaxValue(me.maxValue);
        if (me.disableKeyFilter !== true) {
            allowed = me.baseChars + '';
            if (me.allowDecimals) {
                allowed += me.decimalSeparator;
            }
            if (me.minValue < 0) {
                allowed += '-';
            }
            if(me.useThousandSeparator === true && !Ext.isEmpty(me.thousandSeparator)){
            	allowed += me.thousandSeparator;
            }
            allowed = Ext.String.escapeRegex(allowed);
            me.maskRe = new RegExp('[' + allowed + ']');
            if (me.autoStripChars) {
                me.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
            }
        }

    },

    getErrors: function(value){
    	var me = this,
	    	errors = me.callParent(arguments),
	    	format = Ext.String.format;
    	value = Ext.isEmpty(value) ? 0 : value.toString().replace(/\,/gi, "");
    	value = isNaN(value) ? 0 : parseFloat(value);
    	if(me.allowZero === false && value == 0)
    		errors.push(format(me.zeroText, value));
    	if(value < 0)
    		errors.push(format(me.negativeText, value));
    	if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
        return errors;
    	}
    	value = String(value).replace(me.decimalSeparator, '.');
    	if(isNaN(value)){
            errors.push(format(me.nanText, value));
        }
        num = me.parseValue(value);
        if (me.minValue === 0 && num < 0) {
            errors.push(this.negativeText);
        }
        else if (num < me.minValue) {
            errors.push(format(me.minText, me.minValue));
        }
        if (num > me.maxValue) {
            errors.push(format(me.maxText, me.maxValue));
        }
        return errors;
    },

    rawToValue: function(rawValue) {
        return this.fixPrecision(this.parseValue(rawValue)) || rawValue || null;
    },
    onChange: function() {
        var me = this,
            value = me.getValue(),
            valueIsNull = value === null;

        me.callParent(arguments);
//
        // Update the spinner buttons
//        me.setSpinUpEnabled(valueIsNull || value < me.maxValue);
//        me.setSpinDownEnabled(valueIsNull || value > me.minValue);
    },
    valueToRaw: function(value) {
        var me = this,
            decimalSeparator = me.decimalSeparator;
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        value = isNaN(value) ? '' : String(value).replace('.', decimalSeparator);
        return value;
    },

    setMinValue : function(value) {
        this.minValue = Ext.Number.from(value, Number.NEGATIVE_INFINITY);
    },

    setMaxValue: function(value) {
        this.maxValue = Ext.Number.from(value, Number.MAX_VALUE);
    },

    parseValue : function(value) {
        value = parseFloat(String(value).replace(this.decimalSeparator, '.'));
        return isNaN(value) ? null : value;
    },

	setValue: function(v){
	   if(!Ext.isEmpty(v)) v = v.toString().replace(/\,/gi, '');
	   Ext.ux.NumericField.superclass.setValue.call(this, v);
	   this.setRawValue(this.getFormattedValue(this.getValue()));
    },

	getValue: function(){
		var me = this;
		return Ext.isEmpty(me.getRawValue()) ? "" : me.getRawValue().toString().replace(/\,/gi, "");
	},

    getSubmitValue: function() {
    	var value = this.getRawValue();
    	value = Ext.isEmpty(value) ? null : value.toString().replace(/\,/gi, "");
        return this.processRawValue(value);
    },

    getFormattedValue: function(v){
    	var me = this;
		if (Ext.isEmpty(v))
            return '0' + me.decimalSeparator + '00';
	    else
	    	return Ext.util.Format.kycMoney(v);
    },
    fixPrecision : function(value) {
        var me = this,
            nan = isNaN(value),
            precision = me.decimalPrecision;

        if (nan || !value) {
            return nan ? '' : value;
        } else if (!me.allowDecimals || precision <= 0) {
            precision = 0;
        }

        return parseFloat(Ext.Number.toFixed(parseFloat(value), precision));
    },
    beforeBlur : function() {
        var me = this,
        	value = me.getRawValue();
        	v = '';

        if(!Ext.isEmpty(value))
            v = value.replace(/\,/gi, '');

        if (!Ext.isEmpty(v)) {
            me.setValue(v);
        }

        if (Ext.isEmpty(v) && this.emptyToZero) {
        	me.setValue("0");
        }
    }
});