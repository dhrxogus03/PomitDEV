define("UWA/Services/Geo",["UWA/Core","UWA/Json"],function(e,t){"use strict";var i=function(t){this.adapter=null;var i,o=e.Services.Geo.Adapters;if(t){if(!o[t])return new Error("Invalid UWA.Services.Geo AdapterName.");this.adapter=o[t]()}else for(i in o)if(o.hasOwnProperty(i)&&(this.adapter=o[i](),this.adapter))break};return i.prototype={getCurrentPosition:function(t,i,o){this.adapter?this.adapter.getCurrentPosition(t,i,o):e.is(i,"function")&&i(new Error("Geolocalization support not found."))}},i.Adapters={html5:function(){if(void 0!==navigator.geolocation)return{getCurrentPosition:function(e,t,i){(i=i||{}).enableHighAccuracy=!0;navigator.geolocation.getCurrentPosition(function(t){void 0!==t.latitude?e({timestamp:t.timestamp,coords:{latitude:t.latitude,longitude:t.longitude}}):e(t)},t,i)}}},freegeoip:function(){return{getCurrentPosition:function(i,o,r){r=e.merge(r||{},{server:"http://freegeoip.net/json/"});t.request(r.server,{onComplete:function(e){i({timestamp:Date.now(),coords:{latitude:e.latitude,longitude:e.longitude}})},onFailure:o})}}}},e.namespace("Services/Geo",i,e)});