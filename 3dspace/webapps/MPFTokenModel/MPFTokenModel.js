define("DS/MPFTokenModel/ValidateTokenDataProxy",["UWA/Core","DS/MPFDataProxy/DataProxy","DS/MPFError/NotImplementedError"],function(e,t,o){"use strict";return t.extend({init:function(e){this._parent(e,"/token/v1/validate")},buildPath:function(){return this.resourcePath},urlGet:o.emit,urlPut:o.emit,urlPatch:o.emit,urlDelete:o.emit,doGet:o.emit,doPut:o.emit,doPatch:o.emit,doDelete:o.emit})}),define("DS/MPFTokenModel/TokenModel",["DS/MPFModel/MPFModel"],function(e){"use strict";var t={TOKEN:"token",PROCESSING_CODE:"code",SOURCE:"source",CART_ID:"cartID"},o=e.extend({defaults:function(){var e={};return e[t.TOKEN]=null,e},setup:function(e,t){this._parent(e,t),this._type="TokenModel"},getToken:function(){return this.get(t.TOKEN)},setToken:function(e){this.set(t.TOKEN,e)},getProcessingCode:function(){return this.get(t.PROCESSING_CODE)},getSource:function(){return this.get(t.SOURCE)},getCartID:function(){return this.get(t.CART_ID)}});return o.Fields=Object.freeze(t),o}),define("DS/MPFTokenModel/ConsumeTokenDataProxy",["UWA/Core","DS/MPFDataProxy/DataProxy","DS/MPFError/NotImplementedError"],function(e,t,o){"use strict";return t.extend({init:function(e){this._parent(e,"/token/v1/consume")},buildPath:function(){return this.resourcePath},urlGet:o.emit,urlPut:o.emit,urlPatch:o.emit,urlDelete:o.emit,doGet:o.emit,doPut:o.emit,doPatch:o.emit,doDelete:o.emit})}),define("DS/MPFTokenModel/TokenFactory",["DS/MPFModelFactory/Factory","DS/MPFTokenModel/TokenModel","DS/MPFTokenModel/ValidateTokenDataProxy","DS/MPFTokenModel/ConsumeTokenDataProxy"],function(e,t,o,n){"use strict";var r={VALIDATE:"VALIDATE",CONSUME:"CONSUME"},i=e.extend({createModel:function(e,o,n){return n||(n={}),o||(o={}),n.dataProxy=this.getDataProxy(e),this._parent(t,e,o,n)},getDataProxy:function(e){var t;return(e=e&&e.toUpperCase())===r.VALIDATE?(this.dataProxies.validate||(this.dataProxies.validate=new o(this.connector)),t=this.dataProxies.validate):e===r.CONSUME?(this.dataProxies.consume||(this.dataProxies.consume=new n(this.connector)),t=this.dataProxies.consume):(this.dataProxies.validate||(this.dataProxies.validate=new o(this.connector)),t=this.dataProxies.validate),t}});return i.Types=Object.freeze(r),i});