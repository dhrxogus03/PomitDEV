define("DS/LifecycleDAGUtils/ArrayFunctions",["UWA/Array","UWA/Internal/Polyfill/NativeObjects"],function(r,t){"use strict";var e={};return Array.prototype.find||(Array.prototype.find=function(r){if(null===this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var t,e=Object(this),n=e.length>>>0,i=arguments[1],a=0;a<n;a++)if(t=e[a],r.call(i,t,a,e))return t}),Array.prototype.findIndex||(Array.prototype.findIndex=function(r){if(null===this)throw new TypeError("Array.prototype.findIndex called on null or undefined");if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var t,e=Object(this),n=e.length>>>0,i=arguments[1],a=0;a<n;a++)if(t=e[a],r.call(i,t,a,e))return a;return-1}),e.separate=function(r,t){if(!Array.isArray(this))throw new TypeError("ArrayFunctions.separate called on a non array object");for(var e,n=this.length,i=[],a=[],o=0;o<n;o++)e=this[o],r.call(t,e,o,this)?i.push(e):a.push(e);return{match:i,dontMatch:a}},e.intersectionDifference=function(r,t,e,n){if(!Array.isArray(r)&&!Array.isArray(t))throw Error("ArrayUtils.setDifference: both inputs should be an array");for(var i=r.slice(),a=t.slice(),o={intersection:[],difference:void 0},s={intersection:[],difference:void 0},h=!0===n?i.length-1:0;!0===n?h>=0:h<i.length;h=!0===n?h-1:h+1)for(var u=!0===n?a.length-1:0;!0===n?u>=0:u<a.length;u=!0===n?u-1:u+1)if(e(i[h],a[u])){o.intersection.unshift(i.splice(h,1)[0]),s.intersection.unshift(a.splice(u,1)[0]),!n&&(h-=1);break}return o.difference=i,s.difference=a,[o,s]},e.insert=function(r,t){if(!Array.isArray(this))throw new TypeError("ArrayFunctions.insert called on a non array object");this.splice(t,0,r)},e.orderedInsert=function(r,t,e,n){if(!Array.isArray(this))throw new TypeError("ArrayFunctions.orderedInsert called on a non array object");var i=e=e>=0&&e<=this.length?e:this.length;for(t=t>=0?t:0,n="function"==typeof n?n:function(r,t){return t.toString()>r.toString()};i>t&&n(r,this[i-1]);)i-=1;this.splice(i,0,r)},e.MapArray=function(r){if(!Array.isArray(r)||!r.length)throw Error("Invalid initialization");this.array=r},e.MapArray.prototype.mapToValue=function(r){var t=0;if(r){var e=r.slice(16);t=parseInt("0x"+e)%this.array.length}else t=0;return{index:t,value:this.array[t]}},e.CircularArray=function(r,t){if(this.startIndex=t||0,!Array.isArray(r)||!r.length||t>=r.length-1||t<0)throw Error("Invalid initialization");this.array=r,this.currentIndex=t},e.CircularArray.prototype.next=function(r){var t;return 1===this.array.length?t={index:0,value:this.array[0]}:(r=r>=0&&r<this.array.length?r:this.currentIndex,this.currentIndex=r>=0&&r<this.array.length-1?r+1:0,t={index:this.currentIndex,value:this.array[this.currentIndex]}),t},e.CircularArray.prototype.prev=function(r){var t;return 1===this.array.length?t={index:0,value:this.array[0]}:(r=r>=0&&r<this.array.length?r:this.currentIndex,this.currentIndex=0===r?this.array.length-1:r-1,t={index:this.currentIndex,value:this.array[this.currentIndex]}),t},e.CircularArray.prototype.mapToValue=function(r){var t=parseInt("0x"+r)%this.array.length;return{index:t,value:this.array[t]}},e.CircularArray.prototype.getCurrent=function(){return this.array&&this.array.length&&this.currentIndex>=0?{index:this.currentIndex,value:this.array[this.currentIndex]}:void 0},e.CircularArray.prototype.setCurrent=function(r){return this.array&&this.array.length&&(this.currentIndex=this.array.indexOf(r),this.currentIndex)},e.CircularArray.prototype.resetCurrentIndex=function(r){this.currentIndex=r||this.startIndex||0},e});