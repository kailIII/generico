KycPaqueteMultiproductos = function(){
  return {
    saveKycPaqueteMultiproductos: function(){
      Efx.message.progress(Efx.constants.SAVING);
      Ext.getCmp("kycPaqueteMultiproductosForm").getForm().submit({
        url: Efx.constants.CONTEXT_PATH + "/kycPaqueteMultiproductos/save",
          timeout: Efx.constants.TIMEOUT_SECONDS,
          params: {
            "kycPaqueteMultiproductos.kycPersonaFisica.kyc.kycId": EfxKYC.getKycId(),
            "kycPaqueteMultiproductos.kycPersonaFisica.kycPersonaFisicaId": EfxKYC.getKycPersonaFisicaId()
          },
          success: function(form, action){
            Efx.message.alert(action.result.message);
            Efx.utils.setValue("kycPaqueteMultiproductosId", action.result.kycPaqueteMultiproductosId);
            Efx.utils.setValue("kycFechaActualizacion", action.result.kycFechaActualizacion);
          },
          failure: Efx.form.failureProcedure
      });
    },
    init: function(config){
      var kycPaqueteMultiproductos = config.currentObject;
      var kycAlertas = EfxKYC.getKycAlertas();
      var configToReturn = {};
      configToReturn.items = [];
      configToReturn.menu = EfxBotones.getBotones(EfxKYC.getCtgTipoPersonaCodigo(), EfxKYC.getKycVentanaId());
      if(kycAlertas) configToReturn.items.push(kycAlertas);
      configToReturn.items.push({
        xtype: "form",
        flex: 1,
        id: "kycPaqueteMultiproductosForm",
        title: "PRODUCTOS - PAQUETE MULTIPRODUCTOS",
        autoScroll: true,
        listeners: {
          render: function(){
            if(kycPaqueteMultiproductos && kycPaqueteMultiproductos.kycPaqueteMultiproductosId && kycPaqueteMultiproductos.kycPaqueteMultiproductosId > 0){
              if(this.getForm()) this.getForm().setValues(kycPaqueteMultiproductos);
              if(EfxKYC.getKycVigente() === false) Efx.form.setDisable("kycPaqueteMultiproductosForm");
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
                 handler: KycPaqueteMultiproductos.saveKycPaqueteMultiproductos
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
                 handler: KycPaqueteMultiproductos.saveKycPaqueteMultiproductos
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
            text: "PAQUETE MULTIPRODUCTOS",
            cls: "x-form-item label_header",
            colspan: 6,
            width: 730
          },
          {xtype: "label",text: "Tipo de Paquete", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label",text: "C\u00f3digo de Ejecutivo de Cuenta", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "C\u00f3digo de Ejecutivo de Venta", cls: "x-form-item label_spacing", colspan: 2},
          {
            xtype: "combo",
            id:"ctgTipoPaquete",
            name: "ctgTipoPaquete.ctgCatalogoId",
            store: new Ext.data.SimpleStore({
            	data:   config.ctgCanales || [],
            	fields: ["ctgCatalogoId", "ctgCatalogoHijo", "ctgCatalogoNombre","ctgCatalogoPadre"]
            }),
            displayField: "ctgCatalogoNombre",
            valueField: "ctgCatalogoId",
            colspan: 2,
            allowBlank:false,
            listeners : {
				render : function() {
					if (this.getValue() != null)
					{
				Ext.getCmp("ctgSourceCode").setValue(this.getValue());
					}
				},
				change: function()
				{
					if (this.getValue() != null)
					{
				Ext.getCmp("ctgSourceCode").setValue(this.getValue());
					}
						var disable=false;
						var sizeIndexOf = this.getRawValue().indexOf("INFINITE");
						var sizeIndexOf2 = this.getRawValue().indexOf("PLATINIUM");
					if	( sizeIndexOf != -1)
						{
						disable=true;
						}
					else if (sizeIndexOf2 != -1)
						{
						disable=true;
						}
					Efx.utils.setDisabled("kycPaqueteMultiproductosViajeroFrecuente", !disable, false);
					Efx.utils.setDisabled("kycPaqueteMultiproductosNumeroViajeroFrecuente", !disable, false);
				}
			}
          },
          {
            xtype : "textfield",
            id:"kycPaqueteMultiproductosCodigoEjecutivoCuenta",
            name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosCodigoEjecutivoCuenta",
            maxLength: 10,
            colspan:2
          },
          {
              xtype : "textfield",
              id:"kycPaqueteMultiproductosCodigoEjecutivoVenta",
              name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosCodigoEjecutivoVenta",
              maxLength: 10,
              colspan:2
            },
          {xtype: "label",text: "Escolaridad", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "Dependientes", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "Nombre Usual en Pl\u00e1stico", cls: "x-form-item label_spacing", colspan: 2},
          {
            xtype: "combo",
            id:"ctgEscolaridad",
            name: "ctgEscolaridad.ctgCatalogoId",
            store: new Ext.data.SimpleStore({
              data: config.ctgEscolaridad|| [],
              fields: ["ctgEscolaridadId", "ctgEscolaridadNombre"]
            }),
            displayField: "ctgEscolaridadNombre",
            valueField: "ctgEscolaridadId",
            colspan: 2,
            allowBlank:false
          },{
            xtype : "numberfield",
            id : "kycPaqueteMultiproductosDependientes",
            name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosDependientes",
            maxValue : 10,
            minValue:0,
            allowBlank: false,
            colspan:2
          },
          {
              xtype : "textfield",
              id : "kycPaqueteMultiproductosNombrePlastico",
              allowBlank: false,
              name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosNombrePlastico",
              maxLength : 24
            },
          {xtype: "label", text: "SOEID", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "Logo", cls: "x-form-item label_spacing", colspan: 4},
          {
              xtype : "textfield",
              id : "kycPaqueteMultiproductosSoeid",
              name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosSoeid",
              maxLength : 30,
              colspan:2
            },
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
          {xtype: "label", text: "Source Code", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "N\u00famero Viajero Frecuente", cls: "x-form-item label_spacing", colspan: 2},
          {
				xtype: "combo",
				id:"ctgSourceCode",
				name: "ctgSourceCode.ctgCatalogoId",
				store: new Ext.data.SimpleStore({
					data: config.ctgSourceCode || [],
					fields: ["ctgSourceCodeId", "ctgSourceCodeNombre", "SourceCodeCodigo"]
				}),
				displayField: "SourceCodeCodigo",
				valueField: "ctgSourceCodeId",
				readOnly: true,
				hideTrigger: true,
				colspan: 2
			},
            {
                xtype : "combo",
                id:"kycPaqueteMultiproductosViajeroFrecuente",
                name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosViajeroFrecuente",
                store : new Ext.data.SimpleStore({
                  data : Efx.combos.yesnoArray() || [],
                  fields : [ "id", "descripcion" ]
                }),
                displayField : "descripcion",
                allowBlank: false,
                valueField: "id",
                colspan : 2,
                listeners : {
                  change : function() {
                    var disable = this.getValue() != "1";
                    Efx.utils.setDisabled("kycPaqueteMultiproductosNumeroViajeroFrecuente",disable, true);
					Efx.combos.setRequiredAndValidate("kycPaqueteMultiproductosNumeroViajeroFrecuente", !disable);

                  },
                  render : function() {
                      var disable = this.getValue() != "1";
                      Efx.utils.setDisabled("kycPaqueteMultiproductosNumeroViajeroFrecuente",disable, false);
                  	Efx.combos.setRequiredAndValidate("kycPaqueteMultiproductosNumeroViajeroFrecuente", !disable);
                    }
                }
              },
              {
                  xtype : "textfield",
                  id : "kycPaqueteMultiproductosNumeroViajeroFrecuente",
                  name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosNumeroViajeroFrecuente",
                  maxLength : 10,
                  colspan:2
               },
          {
            xtype: "label",
            text: "BIENES Y PROPIEDADES",
            cls: "x-form-item label_header",
            colspan: 6,
            width: 730
          },
          {xtype: "label", text: "Vivienda", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "Tiempo de Residencia Actual (A\u00f1os/Meses)", cls: "x-form-item label_spacing", colspan: 2},
          {xtype: "label", text: "Autom\u00f3vil", cls: "x-form-item label_spacing", colspan: 6},
          {
            xtype: "combo",
            id:"ctgCondicionVivienda",
            name: "ctgCondicionVivienda.ctgCatalogoId",
            store: new Ext.data.SimpleStore({
              data: config.ctgCondicionVivienda|| [],
              fields: ["ctgCondicionViviendaId", "ctgCondicionViviendaNombre"]
            }),
            displayField: "ctgCondicionViviendaNombre",
            valueField: "ctgCondicionViviendaId",
            colspan: 2,
            allowBlank:false
          },{
            xtype : "numberfield",
            id : "kycPaqueteMultiproductosAnios",
            name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosAnios",
            maxLength : 30,
            allowDecimals: false,
          	minValue: 0,
          	hideTrigger: true,
            maxValue: 100,
            width:100,
            colspan:1,
            listeners : {
				change : function() {
					var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycPaqueteMultiproductosAnios"))
							&& Ext.isEmpty(Efx.utils.getValue("kycPaqueteMultiproductosMeses"));
					Efx.utils.setRequiredAndValidate("kycPaqueteMultiproductosAnios",isEmpty);
					Efx.utils.setRequiredAndValidate("kycPaqueteMultiproductosMeses",isEmpty);
				}}
          },{
            xtype : "numberfield",
            id : "kycPaqueteMultiproductosMeses",
            name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosMeses",
            maxLength : 30,
            allowDecimals: false,
          	minValue: 0,
          	hideTrigger: true,
            maxValue: 11,
            width:100,
            colspan:1,
            listeners : {
				change : function() {
					var isEmpty = Ext.isEmpty(Efx.utils.getValue("kycPaqueteMultiproductosAnios"))
							&& Ext.isEmpty(Efx.utils.getValue("kycPaqueteMultiproductosMeses"));
					Efx.utils.setRequiredAndValidate("kycPaqueteMultiproductosAnios",isEmpty);
					Efx.utils.setRequiredAndValidate("kycPaqueteMultiproductosMeses",isEmpty);
				}}
          },
          {
              xtype : "combo",
              id:"kycPaqueteMultiproductosAutomovil",
              name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosAutomovil",
              store : new Ext.data.SimpleStore({
                data : Efx.combos.yesnoArray() || [],
                fields : [ "id", "descripcion"]
              }),
              displayField : "descripcion",
              valueField: "id",
              colspan : 2,
              allowBlank: false,
              listeners : {
                  change : function() {
                    var disable = this.getValue() != "1";
                    Efx.utils.setDisabled("kycPaqueteMultiproductosMarca",disable, true);
                    Efx.utils.setDisabled("kycPaqueteMultiproductosModelo",disable, true);
                    Efx.utils.setDisabled("kycPaqueteMultiproductosAnio",disable, true);
                    Efx.combos.setRequiredAndValidate("kycPaqueteMultiproductosMarca", !disable);
                    Efx.combos.setRequiredAndValidate("kycPaqueteMultiproductosModelo", !disable);
                    Efx.combos.setRequiredAndValidate("kycPaqueteMultiproductosAnio", !disable);
                  },
                  render: function(){
                	  var disable = this.getValue() != "1";
                      Efx.utils.setDisabled("kycPaqueteMultiproductosMarca",disable, false);
                      Efx.utils.setDisabled("kycPaqueteMultiproductosModelo",disable, false);
                      Efx.utils.setDisabled("kycPaqueteMultiproductosAnio",disable, false);
                      Efx.combos.setRequiredAndValidate("kycPaqueteMultiproductosMarca", !disable);
                      Efx.combos.setRequiredAndValidate("kycPaqueteMultiproductosModelo", !disable);
                      Efx.combos.setRequiredAndValidate("kycPaqueteMultiproductosAnio", !disable);
                  }
              }
            },
            {xtype: "label", text: "Marca", cls: "x-form-item label_spacing", colspan: 2},
            {xtype: "label", text: "Modelo", cls: "x-form-item label_spacing", colspan: 2},
            {xtype: "label", text: "A\u00f1o", cls: "x-form-item label_spacing", colspan: 2},
            {
                xtype : "textfield",
                id : "kycPaqueteMultiproductosMarca",
                name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosMarca",
                maxLength : 100,
                colspan:2
            },{
                 xtype : "textfield",
                 id : "kycPaqueteMultiproductosModelo",
                 name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosModelo",
                 maxLength : 100,
                 colspan:2
            },{
                xtype : "textfield",
                id : "kycPaqueteMultiproductosAnio",
                name : "kycPaqueteMultiproductos.kycPaqueteMultiproductosAnio",
                maxLength : 4,
                colspan:2
           },
           {
            xtype: "hidden",
            id: "kycPaqueteMultiproductosId",
            name: "kycPaqueteMultiproductos.kycPaqueteMultiproductosId"
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
