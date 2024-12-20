define("DS/MPFExternalQuotation/ExternalQuotationConfigurator",["UWA/Class/View","DS/MPFView/FieldTextInputV2","DS/MPFShopModel/ShopServiceModel","DS/UIKIT/Input/Toggle","DS/UIKIT/Mask","i18n!DS/MPFExternalQuotation/assets/nls/externalQuotation","css!DS/MPFExternalQuotation/MPFExternalQuotation"],function(t,e,n,o,i,a){"use strict";return t.extend({className:"mpf-ext-quotation-configurator",setup:function(t){this.shopService=t.shopService,this.externalQuotationUrl=this._createExternalQuotationUrl(),this.externalQuotationCondition=this._createExternalQuotationCondition()},render:function(){return this.container.setContent([this.externalQuotationUrl.render(),this.externalQuotationCondition]),this},destroy:function(){this._parent()},_createExternalQuotationUrl:function(){return new e({model:this.shopService,fieldName:n.Fields.EXTERNAL_PRICING_URL,fieldLabel:a.get("externalQuotationUrl"),dynamicValidation:!0,saveOnChange:!0})},_createExternalQuotationCondition:function(){return new o({type:"switch",name:n.Fields.EXTERNAL_PRICING_CONDITION,label:a.get("activateExternalQuotation"),events:{onChange:this._onActivationChange.bind(this)}})},_onActivationChange:function(){const t=this.externalQuotationCondition.isChecked()?"PF-1e81bc39b8c16c97bff9f45c89bf7ac9,PF-1e81bc3b8e406dd1a552f45c89bf7ac9":"";return this.shopService.set(n.Fields.EXTERNAL_PRICING_CONDITION,t),i.mask(this.container),this.shopService.savePromise(this.shopService.getPendingChanges(),{patch:!0}).finally(()=>{i.unmask(this.container)})}})}),define("DS/MPFExternalQuotation/ExternalQuotationConfiguratorFactory",["DS/MPFConnector/MarketplaceConnector","DS/MPFServices/MarketplaceServices","DS/MPFModelFactory/MPFFactoriesV2","DS/MPFShopModel/ShopServiceFactory","DS/MPFExternalQuotation/ExternalQuotationConfigurator"],function(t,e,n,o,i){"use strict";const a={fromShop:function(e,a){return t.fetchPromise(a).then(t=>{return n.getInstance(t).getFactory(n.Types.SHOP_SERVICE)}).then(t=>{const n=t.createModel(o.Types.SHOP_SHOP_SERVICE);return n.setParentResourceId(e),n.fetchPromise()}).then(t=>new i({shopService:t}))}};return a});