define("ENOGantt/GanttWidget",["UWA/Class","DS/Foundation2/FoundationV2Data","DS/ENOGantt/Widget/PreferenceUtils","DS/ENOGantt/View/GanttView","DS/ENO6WPlugins/jQuery","DS/Foundation/WidgetAPIs"],function(e,t,a,i,s,n){"use strict";t.getWidgetConstant;var r=null,o=e.extend({addNewPreferences:function(){widget.addPreference({name:"collabspace",type:"list",label:"collabspace",disabled:!1}),widget.addPreference({name:"collabstorage",type:"list",label:"collabstorage",disabled:!0})},init:function(){if(r=this,sessionStorage.getItem("isRefreshed")&&sessionStorage.getItem("widgetData")){var e=sessionStorage.getItem("widgetData");Ext.Object.clear(widget.data),Ext.Object.clear(widget.preferences),widget.data=JSON.parse(e);var a=sessionStorage.getItem("widgetPreference");widget.preferences=JSON.parse(a),sessionStorage.removeItem("widgetData"),sessionStorage.removeItem("widgetPreference")}if(window.isIFWE){WidgetUwaUtils.onAfterLoad=s.noop;var i=widget.getValue("collabstorage");n.getCollaborativeStorages(function(e){WidgetUwaUtils.processStorages(e,i),WidgetUwaUtils.setStoragesPrefs(widget,e,i,"true"),WidgetUwaUtils.processStorageChange.call(r,i),widget.getPreference("collabstorage")||t.getWidgetConstants(CONSTANTS_SERVICE,function(){var e=widget.getPreference("collabspace");e.label=App.Nls["emxProgramCentral.GanttWidget.Credential"],widget.addPreference(e);var t=widget.getPreference("collabstorage");t.label=App.Nls["emxProgramCentral.GanttWidget.CollaborativeStorages"],t.disabled=!(t.options.length>1),widget.addPreference(t)}),r.renderGanttView()})}},loadBPS:function(){WidgetUwaUtils.loadBPS.call(o,widget,enoviaServer.showSpace,CONSTANTS_SERVICE)},onLoad:function(){if(sessionStorage.getItem("isRefreshed")&&sessionStorage.getItem("PreferenceUtils")){var e=sessionStorage.getItem("PreferenceUtils"),t=JSON.parse(e);a.set("savedPhysicalId",t.SAVED_PHYSICALID_PREFERENCE),a.set("savedTitle",t.SAVED_TITLE_PREFERENCE),sessionStorage.removeItem("PreferenceUtils"),sessionStorage.removeItem("isRefreshed")}if(window.isIFWE&&"true"!=sessionStorage.getItem("reloadWidget")){var i=JSON.parse(widget.data.X3DContentId);i.data.items[0].objectId;a.set("savedPhysicalId",i.data.items[0].objectId)}window.isIFWE?widget.addEvents({onStorageChange:r.onStorageChange,onSpaceChange:r.onSpaceChange}):this.renderGanttView()},renderGanttView:function(){let e=this;e.ganttView?e.ganttView.render():require(["DS/ENOGantt/View/GanttPlugins"],function(t){e.ganttView=new i({ganttPlugins:t}),e.ganttView.render()})},onResize:function(){var e;(e=(window.isIFWE,r.ganttView))&&e.resize()},reset:function(){},onPreferencesChanged:function(){"false"!==widget.getValue("reset")&&!1!==widget.getValue("reset")?(a.set("savedPhysicalId",!1),a.removeClearProjectPreference(),sessionStorage.setItem("reloadWidget",!0),r.onLoad()):sessionStorage.setItem("reloadWidget",!1)},processStorageChange:function(){WidgetUwaUtils.processStorageChange.apply(r,arguments)},setSpace:function(){var e=WidgetUwaUtils.getContext();widget.setValue("xPref_CREDENTIAL",e),widget.setValue("x3dPlatformId",widget.data.x3dPlatformId);var t=e.split(".");r.collabSpace=t[t.length-1];var a=widget.getPreference("collabspace");if(null!=a.options&&a.options.length>0){var i=!0,s=a.options[0].label.split("●");if(s.length<3)i=!1;else for(var n=s[1],o=1,g=a.options.length;o<g;o++){if(n!=(c=a.options[o].label.split("●"))[1]){i=!1;break}}}if(i)for(var l=0,d=a.options.length;l<d;l++){var c;if((c=a.options[l].label.split("●")).length<3)break;var w=c[0]+"●"+c[2];a.options[l].label=w}a.options.sort(function(e,t){return e.label>t.label?1:e.label<t.label?-1:0}),a.label=App.Nls["emxProgramCentral.GanttWidget.Credential"],widget.addPreference(a);var f=widget.getPreference("collabstorage");f.label=App.Nls["emxProgramCentral.GanttWidget.CollaborativeStorages"],f.disabled=!(f.options.length>1),widget.addPreference(f),enoviaServer.securityContext=encodeURIComponent(a.value)},onRefresh:function(){var e=sessionStorage.getItem("reloadWidget");if(sessionStorage.removeItem("reloadWidget"),"false"==e)r.ganttView||(r.ganttView=new i),r.ganttView.render();else{sessionStorage.setItem("isRefreshed",!0);var t={SAVED_PHYSICALID_PREFERENCE:!1,SAVED_TITLE_PREFERENCE:""},s=a.get("savedPhysicalId");s&&(t.SAVED_PHYSICALID_PREFERENCE=s,widget.data.savedPhysicalId=s);var n=a.get("savedTitle");n&&(t.SAVED_TITLE_PREFERENCE=n),sessionStorage.setItem("PreferenceUtils",JSON.stringify(t)),sessionStorage.setItem("widgetData",JSON.stringify(widget.data)),sessionStorage.setItem("widgetPreference",JSON.stringify(widget.preferences)),document.location.reload()}},onStorageChange:function(){WidgetUwaUtils.onStorageChange.call(r)},onSpaceChange:function(){widget.isEdit=!1,WidgetUwaUtils.onSpaceChange.call(r),WidgetUwaUtils.processStorageChange.call(r,widget.getValue("collabstorage")),r.setSpace(),widget.isEdit=!0},clearData:function(){WidgetUwaUtils.clearData.call(r)},onAfterLoad:function(){r.setSpace()}});return o});