define("DS/XSRCommonComponents/components/WorkUnder/WorkUnderContext",["DS/Controls/Abstract","DS/CfgAuthoringContextUX/scripts/CfgAuthoringContext","DS/XSRCommonComponents/utils/Constants","DS/PlatformAPI/PlatformAPI","DS/XSRCommonComponents/utils/RequestUtil"],function(t,e,n,o,i){"use strict";return t.extend({init:function(t){this.appCore=t.appCore;let e=document.getElementById("spec-main-div");this.target=e||this.appCore.specMiddleContainer,this.renderWorkUnder(t.enableWorkUnder),this.appCore.WorkUnderContext=this;this.appCore.wucCtxCapSet=!1},renderWorkUnder:function(t){var r=this,a=t?"show":"hide";e.initialize2(r.target,widget.id,a,"top-left",function(t){console.warn(t),o.subscribe(e.myAuthkey,function(t){var e=t.change,o={};if(o.id=e.id,o.name=e.name,o.id){r.appCore.wucCtxCapSet=!0;let t="pid:"+o.id;r.appCore.wucCtxCapValue=t,r.appCore.basicModelEvents.publish({event:n.EVENT_REFRESH_GRIDORSPECVIEWER,data:{}})}})},{isEditable:!0,isEvolution:!1,isChange:!0,isMovable:!0,resetDefault:!0}),i.setWorkUnderContext(this)},hide:function(){e.hide()},show:function(){e.show()},setChange:function(t){},getChange:function(){return this.authorizedChange=e.get(),this.authorizedChange},getWorkUnderHeaders:function(){return this.getChange(),this.appCore.wucCtxCapSet?Object.assign({},{"DS-Change-Authoring-Context":this.appCore.wucCtxCapValue}):this.authorizedChange&&this.authorizedChange.AuthoringContextHeader?Object.assign({},this.authorizedChange.AuthoringContextHeader):{}}})});