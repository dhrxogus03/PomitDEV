define("UWA/Plugins/Abstract",["UWA/Core","UWA/Class","UWA/Class/Options"],function(n,t,e){"use strict";var i=t.extend(e,{init:function(n,t){this.widget=n,this.environment=n.environment,this.setOptions(t)},dispatchEvent:function(n,t,e){this.environment.dispatchEvent(n,t,e)},addEvent:function(n,t,e,i){this.environment.addEvent(n,t,e||this,i)},addEvents:function(n,t,e){var i;for(i in n)n.hasOwnProperty(i)&&this.addEvent(i,n[i],t,e)},removeEvent:function(n,t){this.environment.removeEvent(n,t)}});return n.namespace("Plugins/Abstract",i,n)});