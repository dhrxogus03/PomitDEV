define("DS/MPFPricingModel/PricingDataProxy",["UWA/Core","UWA/String","DS/MPFDataProxy/DataProxy","DS/MPFError/NotImplementedError"],function(t,e,r,i){"use strict";return r.extend({init:function(t){this._parent(t,"/mdshop/shops/pricing/{0}")},buildPath:function(t){return e.format(this.resourcePath,t.id)},urlGet:i.emit,urlPost:i.emit,urlPut:i.emit,urlDelete:i.emit})}),define("DS/MPFPricingModel/PricingModel",["UWA/Promise","DS/MPFModel/MPFModel"],function(t,e){"use strict";var r={MINIMUM_ORDER_COST:"minimumOrderCost",PRICE_PER_QUOTE:"pricePerQuote",TOTAL_ORDER_PRICE:"totalOrderPrice",TOTAL_PART_QUANTITY:"totalPartQuantity"},i=e.extend({defaults:function(){var t={};return t[r.MINIMUM_ORDER_COST]=0,t[r.PRICE_PER_QUOTE]=0,t[r.TOTAL_ORDER_PRICE]=0,t[r.TOTAL_PART_QUANTITY]=0,t},setup:function(t,e){this._parent(t,e),this._type="PricingModel"},getMinimumOrderCost:function(){return this.get(r.MINIMUM_ORDER_COST)},setMinimumOrderCost:function(t){this.set(r.MINIMUM_ORDER_COST,t)},getPricePerQuote:function(){return this.get(r.PRICE_PER_QUOTE)},setPricePerQuote:function(t){this.set(r.PRICE_PER_QUOTE,t)},getTotalOrderPrice:function(){return this.get(r.TOTAL_ORDER_PRICE)},setTotalOrderPrice:function(t){this.set(r.TOTAL_ORDER_PRICE,t)},getTotalPartQuantity:function(){return this.get(r.TOTAL_PART_QUANTITY)},setTotalPartQuantity:function(t){this.set(r.TOTAL_PART_QUANTITY,t)}});return i.Fields=Object.freeze(r),i}),define("DS/MPFPricingModel/ShopPricingDataProxy",["UWA/Core","UWA/String","DS/MPFDataProxy/DataProxy","DS/MPFPricingModel/PricingDataProxy","DS/MPFError/NotImplementedError"],function(t,e,r,i,n){"use strict";return r.extend({init:function(t){this._parent(t,"/mdshop/shops/{0}/pricing",new i(t))},buildPath:function(t){return e.format(this.resourcePath,t.parentResourceId)},urlPatch:function(t,e){return this.delegate.urlPatch(t,e)},urlPut:n.emit,urlDelete:n.emit})}),define("DS/MPFPricingModel/PricingFactory",["DS/MPFModelFactory/Factory","DS/MPFPricingModel/PricingModel","DS/MPFPricingModel/ShopPricingDataProxy","DS/MPFPricingModel/PricingDataProxy"],function(t,e,r,i){"use strict";var n={SHOP:"SHOP",PRICING:"PRICING"},o=t.extend({createModel:function(t,r,i){return i||(i={}),r||(r={}),i.dataProxy=this.getDataProxy(t),this._parent(e,t,r,i)},getDataProxy:function(t){var e;return(t=t&&t.toUpperCase())===n.SHOP?(this.dataProxies.shop||(this.dataProxies.shop=new r(this.connector)),e=this.dataProxies.shop):t===n.PRICING&&(this.dataProxies.pricing||(this.dataProxies.pricing=new i(this.connector)),e=this.dataProxies.pricing),e}});return o.Types=Object.freeze(n),o});