define("DS/ENOCharacteristicsApp/utils/IndexServiceProvider",["UWA/Class","UWA/Promise","DS/WAFData/WAFData","DS/ENOCharacteristicsApp/utils/RequestUtil"],function(e,t,i,r){"use strict";return e.extend({init:function(e){this._parent(e),this.platFormId=r.getPlatformId()},getSearchResults:function(e,n,a,s){var c=this;return new t(function(t,o){var d=e,u={login:{"3dspace":{SecurityContext:"ctx::"+widget.getValue("SC")}},label:"Recent",version:2,order_field:"ds6w:modified",order_by:"desc",nresults:500,tenant:c.platFormId,locale:widget.lang,select_predicate:a,with_synthesis:!0,specific_source_parameter:{drive:{additional_query:' AND NOT ([policy]:"Version")'}}};u[n.key]=n.value,s&&(u.next_start=s),i.authenticatedRequest(d,{method:"POST",headers:{"content-type":"application/json",SecurityContext:r.getSecurityContext()},data:JSON.stringify(u),onComplete:function(e){t(e)},onFailure:o})})},searchTestMethods:function(e,t,i){var n=r.get3DSearchURL()+"/search";return this.getSearchResults(n,e,t,i)}})});