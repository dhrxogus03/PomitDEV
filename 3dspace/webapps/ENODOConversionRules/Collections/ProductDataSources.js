define("DS/ENODOConversionRules/Collections/ProductDataSources",["UWA/Class/Collection","DS/ENODOConversionRules/Models/ProductDataSource","DS/ENODerivedFormatEssentials/Utils/DerivedFormatUtil"],function(e,t,n){return e.extend({model:t,securitycontext:null,nlsData:null,init:function(){this._parent.apply(this,arguments),this.url="/resources/v1/modeler/conversionAdmin/derivedformatmanagement/declarative"},postAjaxProcess:function(e){var n=this;n.securitycontext=e.securitycontext,n.nlsData=e.nlsData,e.data?(n.remove(n._models[0]),e.data.forEach(function(e,r){var a=new t(e);n.add(a)})):e.error&&(derivedformatmanagementinfra.servererror=!0,n.nlsData=e.nlsData)},addData:function(e){this.nlsData=e.nlsData,this.securitycontext=e.securitycontext},fetch:function(e){var t=this,r=(new Array,{method:"GET",url:t.url,onComplete:t.postAjaxProcess.bind(t),onFailure:t.postAjaxProcess.bind(t)});n.sendServerRequest(r)}})});