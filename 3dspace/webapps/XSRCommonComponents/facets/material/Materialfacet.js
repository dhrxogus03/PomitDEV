define("DS/XSRCommonComponents/facets/material/Materialfacet",["DS/ENONewWidget/ENONew/View/Facet/ENONewFacetBase","DS/XSRCommonComponents/facets/material/Materialfacetview","DS/XSRCommonComponents/utils/Notification","UWA/Class/Options","UWA/Class/Events","DS/XSRCommonComponents/utils/RequestUtil","DS/XSRCommonComponents/utils/Constants","css!DS/XSRCommonComponents/facets/material/MaterialFacet.css"],function(e,t,n,i,s,a,o){"use strict";return e.extend(i,s,{name:"MaterialFacet",securityContext:null,init:function(e){var n=this,i=e;this._parent(e),this.elements.container=new UWA.Element("div",{class:"xsr-materials-facet",style:"height:100%;width:100%"}),i.securityContext&&(this.securityContext=i.securityContext),this.listenToPublishedInfo(function(e,t){if("currentSecurityContext"===e){let e=t.value;n.securityContext=e}}),this.materialsView=new t(e.type),this.materialsView.build(),this.materialsView.container.inject(this.elements.container)},getUI:function(e){return this.elements.container},plmNewContextProvider(){return this.securityContext},postCreation(e){var t=this;let n=e[0].identifier,i=this.materialsView.getSelectedCoreMaterial();if(n&&i)return new Promise(function(e,s){t.connectCoreMaterial(i,n).then(function(t){t.success&&t.result&&e({name:"MaterialFacet"})}).catch(function(e){console.log(e),s({name:"MaterialFacet"})})})},connectCoreMaterial:function(e,t){var n=this,i={itemPID:t,madeOfPID:e};return new Promise(function(e,t){a.send3DSpaceRequest(o.MATERIAL_BASE_URL+"dsspec:applyMaterial","POST",{type:"json",headers:{"Content-type":"application/json",SecurityContext:n.plmNewContextProvider()},data:UWA.Json.encode(i)},e,t)})}})});