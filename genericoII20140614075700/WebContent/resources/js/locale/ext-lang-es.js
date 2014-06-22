/**
 * Spanish/Latin American Translation by genius551v 04-08-2007
 * Revised by efege, 2007-04-15.
 * Revised by Rafaga2k 10-01-2007 (mm/dd/yyyy)
 * Revised by FeDe 12-13-2007 (mm/dd/yyyy)
 * Synchronized with 2.2 version of ext-lang-en.js (provided by Condor 8 aug 2008)
 *     by halkon_polako 14-aug-2008
 */
Ext.onReady(function() {
	Ext.Ajax.method = "POST";
	if(Ext.data.proxy.Ajax && Ext.data.proxy.Ajax.prototype.actionMethods) Ext.data.proxy.Ajax.prototype.actionMethods.read = "POST";
    if(Ext.Updater) {
        Ext.Updater.defaults.indicatorText = '<div class="loading-indicator">Cargando...</div>';
    }

    if(Ext.view.View){
    	Ext.view.View.prototype.deferEmptyText = false;
      Ext.view.View.prototype.emptyText = "No se encontraron registros";
    }

    if(Ext.grid.Panel){
      Ext.grid.Panel.prototype.ddText = "{0} fila(s) seleccionada(s)";
    }

    if(Ext.LoadMask){
      Ext.LoadMask.prototype.msg = "Cargando...";
    }

    if(Ext.view.AbstractView){
    	Ext.view.AbstractView.prototype.loadingText = "Cargando...";
    }

    if(Ext.Date) {
        Ext.Date.monthNames = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ];

        Ext.Date.getShortMonthName = function(month) {
          return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
          Ene : 0,
          Feb : 1,
          Mar : 2,
          Abr : 3,
          May : 4,
          Jun : 5,
          Jul : 6,
          Ago : 7,
          Sep : 8,
          Oct : 9,
          Nov : 10,
          Dic : 11
        };

        Ext.Date.getMonthNumber = function(name) {
          return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = [
          "Domingo",
          "Lunes",
          "Martes",
          "Mi&#233;rcoles",
          "Jueves",
          "Viernes",
          "S&#225;bado"
        ];

        Ext.Date.getShortDayName = function(day) {
          if (day==3) return "Mié";
          if (day==6) return "Sáb";
          return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";
    }

    if(Ext.window.MessageBox){
      Ext.window.MessageBox.prototype.buttonText = {
        ok     : "Aceptar",
        cancel : "Cancelar",
        yes    : "S&#237;",
        no     : "No"
      };
    }
    if(Ext.Msg.msgButtons["ok"].text) Ext.Msg.msgButtons["ok"].text = "Aceptar";
    if(Ext.Msg.msgButtons["cancel"].text) Ext.Msg.msgButtons["cancel"].text = "Cancelar";
    if(Ext.Msg.msgButtons["yes"].text) Ext.Msg.msgButtons["yes"].text = "S&#237;";
    if(Ext.Msg.msgButtons["no"].text) Ext.Msg.msgButtons["no"].text = "No";
    if(Ext.Date.y2kYear) Ext.Date.y2kYear = 20;

    if(Ext.util.Format){
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ',',
            decimalSeparator: '.',
            currencySign: '',  // Spanish Euro
            dateFormat: 'd/m/Y',
            kycMoney : function(v) {
                var valueToReturn = Ext.util.Format.currency(v, '', 2);
                return Ext.isEmpty(valueToReturn) ? "0.00" : valueToReturn;
            },
            kycPercentage : function(v) {
                var valueToReturn = Ext.util.Format.currency(v, '', 2);
                return Ext.isEmpty(valueToReturn) ? "0.00 %" : valueToReturn + " %";
            },
            kycFormatDateYmdHis_d_m_Y_H_i_s: function(v){
            	if(Ext.isEmpty(v)) return "";
            	try{
            		return Ext.Date.format(Ext.Date.parse(v, 'YmdHis'), 'd/m/Y H:i:s');
            	}catch(e){return "";}
            },
            kycFormatDateYmdHis_d_m_Y_H_i: function(v){
            	if(Ext.isEmpty(v)) return "";
            	try{
            		return Ext.Date.format(Ext.Date.parse(v, 'YmdHis'), 'd/m/Y H:i');
            	}catch(e){return "";}
            }
        });
    }

    if(Ext.picker.Date){
      Ext.apply(Ext.picker.Date.prototype, {
        todayText         : "Hoy",
        minText           : "Esta fecha es anterior a la fecha m&#237;nima",
        maxText           : "Esta fecha es posterior a la fecha m&#225;xima",
        disabledDaysText  : "",
        disabledDatesText : "",
        monthNames	      : Ext.Date.monthNames,
        dayNames		  : Ext.Date.dayNames,
        nextText          : 'Mes Siguiente (Control+Right)',
        prevText          : 'Mes Anterior (Control+Left)',
        monthYearText     : 'Seleccione un mes (Control+Up/Down para desplazar el a&#241;o)',
        todayTip          : "{0} (Barra espaciadora)",
        format            : "d/m/Y",
        startDay          : 1
      });
    }

    if(Ext.picker.Month) {
      Ext.apply(Ext.picker.Month.prototype, {
          okText            : "&#160;Ok&#160;",
          cancelText        : "Cancelar"
      });
    }

    if(Ext.toolbar.Paging){
      Ext.apply(Ext.PagingToolbar.prototype, {
        beforePageText : "P&#225;gina",
        afterPageText  : "de {0}",
        firstText      : "Primera p&#225;gina",
        prevText       : "P&#225;gina anterior",
        nextText       : "P&#225;gina siguiente",
        lastText       : "Última p&#225;gina",
        refreshText    : "Actualizar",
        displayMsg     : "Mostrando {0} - {1} de {2}",
        emptyMsg       : 'Sin datos para mostrar'
      });
    }

    if(Ext.form.field.Base){
      Ext.form.field.Base.prototype.invalidText = "El valor en este campo es inv&#225;lido";
    }

    if(Ext.form.field.Text){
      Ext.apply(Ext.form.field.Text.prototype, {
        minLengthText : "El tama&#241;o m&#237;nimo para este campo es de {0}",
        maxLengthText : "El tama&#241;o m&#225;ximo para este campo es de {0}",
        blankText     : "Este campo es obligatorio. En caso de no tener digite 'NA'",
        regexText     : "",
        emptyText     : null
      });
    }


    if(Ext.form.field.ComboBox){
        Ext.apply(Ext.form.field.ComboBox.prototype, {
          minLengthText : "El tama&#241;o m&#237;nimo para este campo es de {0}",
          maxLengthText : "El tama&#241;o m&#225;ximo para este campo es de {0}",
          blankText     : "Este campo es obligatorio. Debe seleccionar una opci&oacute;n",
          regexText     : "",
          emptyText     : null
        });
      }

    if(Ext.form.field.Number){
      Ext.apply(Ext.form.field.Number.prototype, {
        decimalSeparator : ".",
        decimalPrecision : 2,
        minText 	: "El valor m&#237;nimo para este campo es de {0}",
        maxText 	: "El valor m&#225;ximo para este campo es de {0}",
        blankText 	: "Este campo es obligatorio.",
        nanText 	: "{0} no es un n&#250;mero v&#225;lido"
      });
    }

    if(Ext.form.field.Date){
      Ext.apply(Ext.form.field.Date.prototype, {
        disabledDaysText  : "Deshabilitado",
        disabledDatesText : "Deshabilitado",
        minText           : "La fecha para este campo debe ser posterior a {0}",
        maxText           : "La fecha para este campo debe ser anterior a {0}",
        invalidText       : "{0} no es una fecha v&#225;lida - debe tener el formato {1}",
        format            : "d/m/Y",
        altFormats        : "d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
      });
    }

    if(Ext.form.field.ComboBox){
      Ext.apply(Ext.form.field.ComboBox.prototype, {
        loadingText       : "Cargando...",
        valueNotFoundText : undefined
      });
          Ext.override(Ext.form.ComboBox, {
              beforeBlur: function(){
                  if(Ext.isEmpty(this.getRawValue()) || Ext.isEmpty(this.getValue())){
                      this.setValue(null);
                      try{this.fireEvent('select');}catch(e){}
                  }
                  try{this.store.clearFilter();}catch(e){}
                  this.callOverridden();
              }
          });
    }

    if(Ext.form.field.VTypes){
      Ext.apply(Ext.form.field.VTypes, {
        emailText    : 'Este campo debe ser una direcci&#243;n de correo electr&#243;nico con el formato "usuario@dominio.com" o NA',
        urlText      : 'Este campo debe ser una URL con el formato "http:/'+'/www.dominio.com" o NA',
        alphaText    : 'Este campo s&#243;lo debe contener letras y _',
        alphanumText : 'Este campo s&#243;lo debe contener letras, n&#250;meros y _',
        emailMask: /[a-z0-9_\.\-@\+\/]/i,
            url: function (v){
                return /((^NA?)|(((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST))\/?))/i.test(v);
            },
            email: function(v){
            	return /((^NA?)|^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$)/i.test(v);
            }
          });
        }

    if(Ext.form.field.HtmlEditor){
      Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        createLinkText : "Por favor proporcione la URL para el enlace:",
        buttonTips : {
          bold : {
            title: 'Negritas (Ctrl+B)',
    	    text: 'Transforma el texto seleccionado en Negritas.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          italic : {
            title: 'It&#225;lica (Ctrl+I)',
            text: 'Transforma el texto seleccionado en It&#225;licas.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          underline : {
            title: 'Subrayado (Ctrl+U)',
            text: 'Subraya el texto seleccionado.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          increasefontsize : {
            title: 'Aumentar la fuente',
            text: 'Aumenta el tama&#241;o de la fuente',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          decreasefontsize : {
            title: 'Reducir la fuente',
            text: 'Reduce el tama&#241;o de la fuente.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          backcolor : {
            title: 'Color de fondo',
            text: 'Modifica el color de fondo del texto seleccionado.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          forecolor : {
            title: 'Color de la fuente',
            text: 'Modifica el color del texto seleccionado.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          justifyleft : {
            title: 'Alinear a la izquierda',
            text: 'Alinea el texto a la izquierda.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          justifycenter : {
            title: 'Centrar',
            text: 'Centrar el texto.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          justifyright : {
            title: 'Alinear a la derecha',
            text: 'Alinea el texto a la derecha.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          insertunorderedlist : {
            title: 'Lista de vi&#241;etas',
            text: 'Inicia una lista con vi&#241;etas.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          insertorderedlist : {
            title: 'Lista numerada',
            text: 'Inicia una lista numerada.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          createlink : {
            title: 'Enlace',
            text: 'Inserta un enlace de hipertexto.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          },
          sourceedit : {
            title: 'C&#243;digo Fuente',
            text: 'Pasar al modo de edici&#243;n de c&#243;digo fuente.',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
          }
        }
      });
    }

    if(Ext.grid.header.Container){
      Ext.apply(Ext.grid.header.Container.prototype, {
        sortAscText  : "Ordenar en forma ascendente",
        sortDescText : "Ordenar en forma descendente",
        columnsText  : "Columnas"
      });
    }

    if(Ext.panel.Table){
    	Ext.panel.Table.prototype.enableColumnMove = false;
    }

    if(Ext.grid.column.Column){
    	Ext.grid.column.Column.prototype.menuDisabled = true;
    }

    if(Ext.grid.GroupingFeature){
      Ext.apply(Ext.grid.GroupingFeature.prototype, {
        emptyGroupText : '(Ninguno)',
        groupByText    : 'Agrupar por este campo',
        showGroupsText : 'Mostrar en grupos'
      });
    }

    if(Ext.grid.PropertyColumnModel){
      Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
        nameText   : "Nombre",
        valueText  : "Valor",
        dateFormat : "j/m/Y"
      });
    }

    if(Ext.layout.BorderLayout && Ext.layout.BorderLayout.SplitRegion){
      Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
        splitTip            : "Arrastre para redimensionar.",
        collapsibleSplitTip : "Arrastre para redimensionar. Doble clic para ocultar."
      });
    }

    if(Ext.form.field.Time){
      Ext.apply(Ext.form.field.Time.prototype, {
        minText : "La hora en este campo debe ser igual o posterior a {0}",
        maxText : "La hora en este campo debe ser igual o anterior a {0}",
        invalidText : "{0} no es una hora v&#225;lida",
        format : "g:i A",
        altFormats : "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
      });
    }

    if(Ext.form.CheckboxGroup){
      Ext.apply(Ext.form.CheckboxGroup.prototype, {
        blankText : "Debe seleccionar al menos un &#237;tem de este grupo"
      });
    }

    if(Ext.form.RadioGroup){
      Ext.apply(Ext.form.RadioGroup.prototype, {
        blankText : "Debe seleccionar un &#237;tem de este grupo"
      });
    }

    if(Ext.form.ComboBox){
    	Ext.override(Ext.form.ComboBox, {
    		beforeBlur: function(){
    			if(Ext.isEmpty(this.getRawValue()) || Ext.isEmpty(this.getValue())){
    				this.setValue(null);
    				try{this.fireEvent('select');}catch(e){}
    			}
    			try{this.store.clearFilter();}catch(e){}
    			this.callOverridden();
			}
    	});
    }

    if(Ext.toolbar.Paging){
    	Ext.override(Ext.toolbar.Paging, {
	    	onPagingKeyDown : function(field, e){
	            var me = this,
	                k = e.getKey(),
	                pageData = me.getPageData(),
	                increment = e.shiftKey ? 10 : 1,
	                pageNum;

	            if (k == e.RETURN) {
	                e.stopEvent();
	                pageNum = me.readPageFromInput(pageData);
	                if (pageNum !== false) {
	                    pageNum = Math.min(Math.max(1, pageNum), pageData.pageCount);
	                    if(me.fireEvent('beforechange', me, pageNum) !== false){
	                        me.store.loadPage(pageNum);
	                    }
	                }
	            } else if (k == e.HOME || k == e.END) {
	                e.stopEvent();
	                pageNum = k == e.HOME ? 1 : pageData.pageCount;
	                field.setValue(pageNum);
	            } else if (k == e.UP || k == e.PAGEUP || k == e.DOWN || k == e.PAGEDOWN) {
	                e.stopEvent();
	                pageNum = me.readPageFromInput(pageData);
	                if (pageNum) {
	                    if (k == e.DOWN || k == e.PAGEDOWN) {
	                        increment *= -1;
	                    }
	                    pageNum += increment;
	                    if (pageNum >= 1 && pageNum <= pageData.pages) {
	                        field.setValue(pageNum);
	                    }
	                }
	            }
	        }
    	});
    }

    if(Ext.button && Ext.button.Button){
    	Ext.override(Ext.button.Button, {
    		onClick: function (e) {
    			var me = this;
    			if (me.preventDefault || me.disabled && me.getHref() && e) {
    				e.preventDefault();
    			}
    			if (e.button !== 0) {
    				return;
    			}
    			if (!me.disabled) {
    				if (me.enableToggle && (me.allowDepress !== false || !me.pressed)) {
    					me.toggle();
    				}
    				if (me.menu && !me.hasVisibleMenu() && !me.ignoreNextClick) {
    					me.showMenu();
    				}
    				me.fireEvent("click", me, e);
    				if (me.handler) {
    					me.handler.call(me.scope || me, me, e);
    				}
    				me.onBlur();
    				try{me.blur();}catch(e){}
    			}
    		}
    	});
    }
//    UtilFormat.currencySign = "";
//    UtilFormat.decimalSeparator = ".";
//    UtilFormat.thousandSeparator = ",";

});