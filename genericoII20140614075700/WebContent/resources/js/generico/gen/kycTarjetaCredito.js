KycTarjetaCredito = function(){
  return {
    saveKycTarjetaCredito: function(){
      Efx.message.progress(Efx.constants.SAVING);
      Ext.getCmp("kycTarjetaCreditoForm").getForm().submit({
        url: Efx.constants.CONTEXT_PATH + "/kycTarjetaCredito/save",
          timeout: Efx.constants.TIMEOUT_SECONDS,
          params: {
            "kycTarjetaCredito.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
            "kycTarjetaCredito.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId()
          },
          success: function(form, action){
            Efx.message.alert(action.result.message);
            Efx.utils.setValue("kycTarjetaCreditoId", action.result.kycTarjetaCreditoId);
            Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
          },
          failure: Efx.form.failureProcedure
      });
    },
    init: function(config){
      var kycTarjetaCredito = config.currentObject;
      var kycAlertas = EfxKYC.getKycAlertas();
      var configToReturn = {};
      configToReturn.items = [];
      configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
      if(kycAlertas) configToReturn.items.push(kycAlertas);
      configToReturn.items.push({
        xtype: "form",
        flex: 1,
        id: "kycTarjetaCreditoForm",
        title: "PRODUCTOS - TARJETA DE CR\u00c9DITO",
        autoScroll: true,
        listeners: {
          render: function(){
            if(kycTarjetaCredito && kycTarjetaCredito.kycTarjetaCreditoId && kycTarjetaCredito.kycTarjetaCreditoId > 0){
              if(this.getForm()) this.getForm().setValues(kycTarjetaCredito);
              if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycTarjetaCreditoForm");
            }
          }
        },
        dockedItems:[
                 {
                   xtype: "toolbar",
                   dock: "top",
                   hidden: EfxKYC.getKycVigente() === false,
                   items: [
              "->",
              {
                 text: "Guardar",
                 iconCls: Efx.constants.icons.SAVE_ICON,
                 handler: KycTarjetaCredito.saveKycTarjetaCredito
              }
                       ]
                 },{
                   xtype: "toolbar",
                   dock: "bottom",
                   hidden: EfxKYC.getKycVigente() === false,
                   items: [
              "->",
              {
                 text: "Guardar",
                 iconCls: Efx.constants.icons.SAVE_ICON,
                 handler: KycTarjetaCredito.saveKycTarjetaCredito
              }
                       ]
                 }
              ],
        layout: {
          type: "table",
          columns: 6,
          tableAttrs: {
                  style: {width: "730px", "margin-top": "5px", "margin-bottom": "40px"},
                  align: "center"
              }
        },
        defaults: Efx.utils.defaults({width: 230, colspan: 2}),
        items: [
          {
                xtype: "label",
                id: "kycFechaActualizacionTitle",
                text: "",
                cls: "x-form-item label_header lblHeaderRed",
                colspan: 6,
                hidden: true,
                width: 730
              },
          {
            xtype: "label",
            text: "DATOS GENERALES",
            cls: "x-form-item label_header",
            colspan: 6,
            width: 730
          },
          {xtype: "label",text: "Escolaridad", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "Dependientes", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "SOEID", cls: "x-form-item label_spacing", colspan: 2},
          {
            xtype: "combo",
            id:"ctgEscolaridad",
            name: "ctgEscolaridad.ctgCatalogoId",
            store: new Ext.data.SimpleStore({
              data: config.ctgEscolaridad|| [],
              fields: ["ctgEscolaridadId", "ctgEscolaridadNombre",]
            }),
            displayField: "ctgEscolaridadNombre",
            valueField: "ctgEscolaridadId",
            colspan: 2,
            allowBlank:false
          },{
            xtype : "numberfield",
            id : "kycTarjetaCreditoDependientes",
            name : "kycTarjetaCredito.kycTarjetaCreditoDependientes",
            maxValue : 10,
            minValue: 0,
            allowBlank: false,
            colspan:2
          },{
            xtype : "textfield",
            id : "kycTarjetaCreditoSoeid",
            name : "kycTarjetaCredito.kycTarjetaCreditoSoeid",
            colspan:2
          },
          {xtype: "label",text: "Source Code", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label",text: "Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "N\u00famero de Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
          {
            xtype : "textfield",
            id : "kycTarjetaCreditoSourceCode",
            name : "kycTarjetaCredito.kycTarjetaCreditoSourceCode",
            maxLength: 25,
            colspan:2
          },{
            xtype : "combo",
            id:"kycTarjetaCreditoViajeroFrecuente",
            name : "kycTarjetaCredito.kycTarjetaCreditoViajeroFrecuente",
            store : new Ext.data.SimpleStore({
              data : Efx.combos.yesnoArray() || [],
              fields : [ "id", "descripcion" ]
            }),
            displayField : "descripcion",
            valueField: "id",
            colspan : 2,
            allowBlank: false,
            listeners : {
              change : function() {
                var disable = this.getValue() != "1";
                Efx.utils.setDisabled("kycTarjetaCreditoNumeroViajeroFrecuente",disable, true);
				Efx.combos.setRequiredAndValidate("kycTarjetaCreditoNumeroViajeroFrecuente", !disable);

              }}
          },{
            xtype : "textfield",
            id:"kycTarjetaCreditoNumeroViajeroFrecuente",
            name : "kycTarjetaCredito.kycTarjetaCreditoNumeroViajeroFrecuente",
            maxLength: 10,
            colspan:2
          },
          {xtype: "label", text: "Logo", cls: "x-form-item label_spacing", colspan: 4},
          {xtype: "label", text: "Nombre Usual en Pl\u00e1stico", cls: "x-form-item label_spacing", colspan: 2},
          {
              xtype: "combo",
              id:"ctgLogo",
              name: "ctgLogo.ctgCatalogoId",
              store: new Ext.data.SimpleStore({
                data: config.ctgLogo || [],
                fields: ["ctgLogoId", "ctgLogoNombre"]
              }),
              displayField: "ctgLogoNombre",
              valueField: "ctgLogoId",
              colspan: 4,
              width: 475,
              allowBlank:false
            },
          {
            xtype : "textfield",
            id : "kycTarjetaCreditoNombreUsual",
            name : "kycTarjetaCredito.kycTarjetaCreditoNombreUsual",
            maxLength : 24,
            allowBlank:false,
            colspan:2
          },
          {
            xtype: "label",
            text: "BIENES Y PROPIEDADES",
            cls: "x-form-item label_header",
            colspan: 6,
            width: 730
          },
          {xtype: "label", text: "", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "Tiempo de Residencia Actual", cls: "x-form-item label_spacing", colspan: 4},
          {xtype: "label", text: "Vivienda", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "A\u00f1os", cls: "x-form-item label_spacing", colspan: 1, width: 100},
          {xtype: "label", text: "Meses", cls: "x-form-item label_spacing", colspan: 1, width: 100},
          {xtype: "label", text: "Autom\u00f3vil", cls: "x-form-item label_spacing", colspan: 2},
          {
            xtype: "combo",
            id:"ctgCondicionVivienda",
            name: "ctgCondicionVivienda.ctgCatalogoId",
            store: new Ext.data.SimpleStore({
              data: config.ctgCondicionVivienda|| [],
              fields: ["ctgCondicionViviendaId", "ctgCondicionViviendaNombre",]
            }),
            displayField: "ctgCondicionViviendaNombre",
            valueField: "ctgCondicionViviendaId",
            colspan: 2,
            allowBlank:false
          },{
            xtype : "numberfield",
            id : "kycTarjetaCreditoAnios",
            name : "kycTarjetaCredito.kycTarjetaCreditoAnios",
            hideTrigger: true,
            maxLength: 10,
			maxValue: 100,
			minValue: 0,
            allowDecimals: false,
            width:100,
            colspan:1,
            listeners : {
				change : function() {
					var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycTarjetaCreditoAnios"))
							&& Ext.isEmpty(Efx.utils.getValue("kycTarjetaCreditoMeses"));
					Efx.utils.setRequiredAndValidate("kycTarjetaCreditoAnios",isEmpty);
					Efx.utils.setRequiredAndValidate("kycTarjetaCreditoMeses",isEmpty);
				}}
          },{
            xtype : "numberfield",
            id : "kycTarjetaCreditoMeses",
            name : "kycTarjetaCredito.kycTarjetaCreditoMeses",
            hideTrigger: true,
            maxLength: 10,
			minValue: 0,
			maxValue: 11,
            allowDecimals: false,
            width:100,
            colspan:1,
            listeners : {
				change : function() {
					var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycTarjetaCreditoAnios"))
							&& Ext.isEmpty(Efx.utils.getValue("kycTarjetaCreditoMeses"));
					Efx.utils.setRequiredAndValidate("kycTarjetaCreditoAnios",isEmpty);
					Efx.utils.setRequiredAndValidate("kycTarjetaCreditoMeses",isEmpty);
				}}
          },
          {
              xtype : "combo",
              id:"kycTarjetaCreditoAutomovil",
              name : "kycTarjetaCredito.kycTarjetaCreditoAutomovil",
              store : new Ext.data.SimpleStore({
                data : Efx.combos.yesnoArray() || [],
                fields : [ "id", "descripcion" ]
              }),
              displayField : "descripcion",
              allowBlank:false,
              valueField: "id",
              colspan : 2,
              listeners : {
                  change : function() {
                    var disable = this.getValue() != "1";
                    Efx.utils.setDisabled("kycTarjetaCreditoMarca",disable, true);
                    Efx.utils.setDisabled("kycTarjetaCreditoModelo",disable, true);
                    Efx.utils.setDisabled("kycTarjetaCreditoAutomovilAnio",disable, true);
                    Efx.combos.setRequiredAndValidate("kycTarjetaCreditoMarca", !disable);
                    Efx.combos.setRequiredAndValidate("kycTarjetaCreditoModelo", !disable);
                    Efx.combos.setRequiredAndValidate("kycTarjetaCreditoAutomovilAnio", !disable);

                  },
                  render: function(){
                	  var disable = this.getValue() != "1";
                      Efx.utils.setDisabled("kycTarjetaCreditoMarca",disable, false);
                      Efx.utils.setDisabled("kycTarjetaCreditoModelo",disable, false);
                      Efx.utils.setDisabled("kycTarjetaCreditoAutomovilAnio",disable, false);
                      Efx.combos.setRequiredAndValidate("kycTarjetaCreditoMarca", !disable);
                      Efx.combos.setRequiredAndValidate("kycTarjetaCreditoModelo", !disable);
                      Efx.combos.setRequiredAndValidate("kycTarjetaCreditoAutomovilAnio", !disable);
                  }
              }
            },
            {xtype: "label", text: "Marca", cls: "x-form-item label_spacing", colspan: 2},
            {xtype: "label", text: "Modelo", cls: "x-form-item label_spacing", colspan: 2},
            {xtype: "label", text: "A\u00f1o", cls: "x-form-item label_spacing", colspan: 2},
            {
                xtype : "textfield",
                id : "kycTarjetaCreditoMarca",
                name : "kycTarjetaCredito.kycTarjetaCreditoMarca",
                maxLength : 100,
                colspan:2
            },{
                 xtype : "textfield",
                 id : "kycTarjetaCreditoModelo",
                 name : "kycTarjetaCredito.kycTarjetaCreditoModelo",
                 maxLength : 100,
                 colspan:2
            },{
                xtype : "textfield",
                id : "kycTarjetaCreditoAutomovilAnio",
                name : "kycTarjetaCredito.kycTarjetaCreditoAutomovilAnio",
                maxLength : 4,
                colspan:2
           },
            {
        	   xtype: "hidden",
        	   id: "kycTarjetaCreditoId",
        	   name: "kycTarjetaCredito.kycTarjetaCreditoId"
            },{
            	xtype: "hidden",
            	id: "kycFechaActualizacion",
            	listeners: {
              change: function(){
                var value = this.getValue();
                Efx.utils.setVisible("kycFechaActualizacionTitle", !Ext.isEmpty(value));
                Efx.utils.setText("kycFechaActualizacionTitle", "FORMULARIO ACTUALIZADO EL: " + value);
              }
            }
          }
            ]
            });
          return configToReturn;
    }
  };
}();
