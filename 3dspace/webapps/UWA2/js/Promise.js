define("UWA/Promise",["UWA/Core","UWA/Utils","UWA/Class","UWA/Internal/Deprecate"],function(e,t,r,n){"use strict";var i=Promise;function o(e){this._promise=e instanceof i?e:new i(e)}function a(e){return function(){return o.cast(this._promise[e].apply(this._promise,arguments))}}function c(e){return function(){return o.cast(i[e].apply(i,arguments))}}var s=o.prototype=Object.create(i.prototype);return s.constructor=o,s.catch=a("catch"),s.then=a("then"),s.fail=s.catch,s.finally=function(e){var t=this;function r(){return o.cast(e()).then(function(){return t})}return this.then(r,r)},s.fin=s.finally,s.done=function(e,r){return this.then(e,r).fail(function(e){var r=o.deferred();return t.setImmediate(function(){throw t.setImmediate(function(){r.reject(e)}),e instanceof Error?e:new Error(e)}),r.promise})},s.spread=function(e,t){return this.then(function(t){return e[Array.isArray(t)?"apply":"call"](null,t)},t)},o.race=c("race"),o.all=function(e){return"number"!=typeof e.length?o.reject(new TypeError("Not an iterable")):o.cast(i.all(t.toArray(e)))},o.reject=c("reject"),o.resolve=c("resolve"),o.cast=function(e){return e instanceof o?e:e instanceof i?new o(e):o.resolve(e)},o.deferred=function(){var e={},t=new o(function(t,r){return e.resolve=t,e.reject=r,e});return e.promise=t,e},o.allSettled=function(e){return o.all(t.toArray(e).map(function(e){return e instanceof i?e.then(function(e){return{state:"fullfilled",value:e}},function(e){return{state:"rejected",reason:e}}):{state:"fullfilled",value:e}}))},n.property(r,"Promise",{value:o,name:"UWA.Class.Promise",message:"Use UWA.Promise instead."}),e.namespace("Promise",o,e)});