define("UWA/Services/Search",["UWA/Core","UWA/Utils","UWA/Data"],function(e,a,o){"use strict";var c={getFromProvider:function(c,s){var r,t="";switch(void 0!==s.lang&&(t+="&lang="+s.lang),void 0!==s.locale&&(t+="&locale="+s.locale),void 0!==s.mode&&(t+="&mode="+s.mode),void 0!==s.category&&(t+="&category="+s.category),void 0!==s.shop&&(t+="&shop="+s.shop),s.type){case"websearch":case"blogsearch":case"imagesearch":case"videosearch":case"podcastsearch":case"shoppingsearch":case"opensearch":return r=e.hosts.netvibes+"/data/"+s.type+"/?q="+a.encodeUrl(s.query)+"&engine="+a.encodeUrl(c)+t,o.request(r,{method:"GET",type:"json",onComplete:s.onComplete});default:e.log("invalid request type")}}};return e.namespace("Services/Search",c,e)});