define("DS/DELMCBUserDefAdmin/utils/PlatformServices",["UWA/Class/Promise","UWA/Core","DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","DS/PlatformAPI/PlatformAPI","DS/WAFData/WAFData"],function(e,t,i,n,r){"use strict";var o="?tenant=",a="onpremise",l=0,s=1,c=2,u=0;let d=null,p={};const m={platformServices:d,securityContexts:p,getCurrentTenantIndex:function(){const e=window.widget;if(!Array.isArray(d))throw new Error("Platform services have not been initialized correctly");let i="";i="undefined"!=typeof dscef?this.parseTenantIdFromURL():e.getValue("x3dPlatformId");let n=-1;if(t.is(i,"string"))for(let e=0;e<d.length;e++)d[e].platformId===i&&(n=e);return-1===n?0:n},getSecurityContexts:function(t){var i={},n=window.widget;return i.method="GET",i.headers={Accept:"application/json","Content-Type":"application/json","Accept-Language":n.lang?n.lang:n.getValue("lang")},i.cache=-1,new e(function(e,n){i.onComplete=function(t){e(JSON.parse(t))},i.onFailure=function(e){n(e)};var o=m.getCurrentTenantIndex(),a=d[o].platformId;r.authenticatedRequest(t+"/resources/modeler/pno/person?tenant="+a+"&current=true&select=preferredcredentials&select=collabspaces",i)}).then(function(e){var t,i=function(e,t,i){return"ctx::"+i+"."+t+"."+e},n=function(e,t,i){return""===t?e+" ● "+i:e+" ● "+t+" ● "+i},r=function(e){var t="",i="",n="";for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];switch(r){case"organization":t=o.name;break;case"role":i=o.name,n=o.nls?o.nls:i}}return{org:t,role:i,roleNls:n}},o=e.pid,a=[],l="",s="",c="";for(var d in e.preferredcredentials)if(e.preferredcredentials.hasOwnProperty(d)){var p=e.preferredcredentials[d];switch(d){case"collabspace":l=p.name;break;case"organization":s=p.name;break;case"role":c=p.name}}t=i(l,s,c);var m=[];for(var g in e.collabspaces)if(e.collabspaces.hasOwnProperty(g))for(var f=e.collabspaces[g],v=0;v<f.couples.length;v++){var P=r(f.couples[v]);m.push(P.org)}var D=m.every(function(e,t,i){return e===i[m.length-1]});for(var S in e.collabspaces)if(e.collabspaces.hasOwnProperty(S))for(var y=e.collabspaces[S],C=0;C<y.couples.length;C++){var h=r(y.couples[C]),w=i(y.name,h.org,h.role),b=y.title?y.title:y.name,I={csName:b,label:n(b,D?"":h.org,h.roleNls),value:w};t===w&&(I.isDefault=!0),a.push(I)}return""!==l&&""!==s&&""!==c||a.length>0&&(t=a[u].value),{userId:o,securityContext:t,cspaces:a}})},parseTenantIdFromURL:function(){let e=null;const t=window.top.location.href.split("?");if(t instanceof Array)for(let i=0;i<t.length;i++)if(t[i].indexOf("tenantID")>-1){e=t[i].split("=")[1]}return e},getWebInWinOptions:function(t){if("","undefined"!=typeof dscef){var i=location.href.split("?"),n=(i[1].split("="),i[2].split("=")[1].split(";")),r=n[0].split(":"),o=n[1].split(":"),a=n[2].split(":"),l=n[3].split(":"),s=n[4].split(":"),c=n[5].split(":");r[1],o[1],a[1],l[1],s[1],c[1];return new e(function(e,t){window.dscef.getMyAppsURL().then(function(i){i?e({myAppsBaseUrl:i,userId:c[1],lang:widget.lang?widget.lang:widget.getValue("lang")}):t(new Error("Issue while retrieveing the my apps url"))})})}return e.resolve("")}};return{_internals:m,async init(){var t=this;if(null!==d)return e.resolve();let n=await m.getWebInWinOptions({});return new e(function(e,r){i.getPlatformServices({config:n,onComplete:function(i){d=t._internals.platformServices=i,e()},onFailure:function(e){r(e)}})}).then(function(){return m.getSecurityContexts(t.get3DSpaceUrl())}).then(function(e){return p=t._internals.securityContexts=e,t})},isCloudEnvironment:function(){var e=!1,i=window.widget.getValue("x3dPlatformId");t.is(i,"string")&&""!==i&&(e=-1===i.toLowerCase().indexOf(a));return e},get3DSpaceUrl:function(){var e=m.getCurrentTenantIndex();if(void 0===d[e]["3DSpace"])throw new Error("No 3DSpace URL available for this tenant");return d[e]["3DSpace"]},getSecurityContexts:function(){return p},getSecurityContext:function(){var e,i=window.widget;if(e=i.hasPreference("securityContext")&&i.getPreference("securityContext")?i.getPreference("securityContext").value:i.getValue("securityContext"),t.is(e,"string")&&e.contains("ctx::")){var n=e.split("::");return n[n.length-1]}return e},getTenants:function(){var e=[];for(var t in d)d.hasOwnProperty(t)&&e.push({label:d[t].displayName,value:d[t].platformId});return{platforms:e,tenant:this.getTenant()}},getTenant:function(){var e=m.getCurrentTenantIndex();return d[e].platformId},getCurrentCredentials:function(){var e=this.getSecurityContext().split(".");return 3!==e.length?{role:"",organization:"",collaborativeSpace:""}:{role:e[l],organization:e[s],collaborativeSpace:e[c]}},getUserName:function(){return n.getUser().login},getUserImage:function(e,t){var i="";return t&&"mini"===t.format&&(i="/format/mini"),this.assembleURLFor3DSwym("/api/user/getpicture/login/"+e+i)},assembleURLFor3DSpace:function(e,i){const n=this;let r="";if(t.is(i,"string")&&i.length>0){if("&"!==i.charAt(0))throw new Error("The parameters argument should start with &");r=i}else r="";let a="";return-1===e.indexOf(o)&&(a=o+n.getTenant()),n.get3DSpaceUrl()+e+a+r},assembleURLFor3DSwym:function(e,i){const n=this;let r="";if(t.is(i,"string")&&i.length>0){if("&"!==i.charAt(0))throw new Error("The parameters argument should start with &");r=i}else r="";let a="";return-1===e.indexOf(o)&&(a=o+n.getTenant()),n.get3DSwymUrl()+e+a+r}}}),define("DS/DELMCBUserDefAdmin/utils/CodeGenerator",["UWA/Core","text!DS/DELMCBUserDefAdmin/assets/PrimitivesDef.json"],function(e,t){var i,n={extractTagsFromJSCode:function(e){for(var t=[],i=(e=(e=String(e)).toString(),!0),n=0;i||r>=0;){i=!1;var r=e.search("//@"),o=e.search("@//");if(r>=0){e.substring(1,4);t[n]=e.substring(r+3,o),n++,e=(e=e.replace("//@","")).replace("@//","")}}return t},mergeNavigationSet:function(e){e.forEach((t,i)=>e[i]=t.trim());let t="",i="";return e.forEach((n,r)=>{isNaN(n)?(e=>-1!=e.indexOf("\\[")+2&&-1!=e.lastIndexOf("]"))(n)?t+=(e=>{let t=e.indexOf("\\[")+2,i=e.lastIndexOf("]"),n=e.substring(t+1,i);if(e=e.slice(0,t),!isNaN(n))return"resultStep"+e+".get("+n+")"})(n):t+=n:t+="resultStep"+n,r!==e.length-1&&(t+=".merge(",i+=")")}),t+i}};return{getPrimitives:function(){return null==i&&(i=JSON.parse(t)),i},getTagsFromJSCode:function(e){for(var t=[],i=n.extractTagsFromJSCode(e),r=0;r<i.length;r++){const e=/(?<!\|)\|(?!\|)/;let n=i[r].split(e);t.push({primitive:n[0],input1:n[1],input2:n[2],input3:n[3]})}return t},generateJSCode:function(e,t){const r="    ",o="                                "+r;var a="";new Set;const l={PRD:"Product",SEL_PRD:"Product",PRCS:"Process",SEL_PRCS:"Process",PROD_SYS:"System",SEL_PROD_SYS:"System",WK_PL:"WorkPlan",SEL_WK_PL:"WorkPlan",RSC:"Resource",SEL_RSC:"Resource",CPBL_RSC:"capableResource",SEL_CPBL_RSC:"capableResource"};let s=0;t.forEach(function(e){var t=e.options.grid;(e=>{let t=new Set;return e.forEach(e=>{e&&e.includes("SEL_")&&e.split(",").forEach(e=>e.includes("SEL_")?t.add(e):null)}),t})([t.input1,t.input2,t.input3]).forEach(e=>{a+=",\n",a+=o+'{name:"'+e+'", type:"NavigationSet"}'}),s+=1});var c,u,d='var params = proc.declareParameters([{name:"PRD",  type:"NavigationSet"},\n'+o+'{name:"PRCS", type:"NavigationSet"},\n'+o+'{name:"PROD_SYS",  type:"NavigationSet"},\n'+o+'{name:"WK_PL",  type:"NavigationSet"},\n'+o+'{name:"RSC",  type:"NavigationSet"},\n'+o+'{name:"CPBL_RSC",  type:"NavigationSet"}'+a+"],\n"+o+'[{name:"ConfigurationsVal", type:"Filters"}]);\n\nvar DELPPRExpandPrimitive = Java.type("com.dassault_systemes.pprcompletion.primitives.DELPPRExpandPrimitive");\nvar DELPPRFilterPrimitive = Java.type("com.dassault_systemes.pprcompletion.primitives.DELPPRFilterPrimitive");\nvar ExpandPrimitivesIndex = Java.type("com.dassault_systemes.pprcompletion.primitives.DELPPRExpandPrimitive");\nvar PrimitiveContext3D \t = Java.type("com.dassault_systemes.pprcompletion.primitives.DELPPRContext3DPrimitive");\nvar ExpandPrimitives     = Java.type("com.dassault_systemes.completion.service.ExpandPrimitives");\nvar NavigationPrimitives = Java.type("com.dassault_systemes.completion.service.NavigationPrimitives");\nvar I3DNavigationPrimitives = Java.type("com.dassault_systemes.pprcompletion.primitives.DELPPRNavigatePrimitive");\nvar FsxNavigationPrimitives = Java.type("com.dassault_systemes.fsx.completion.service.FsxNavigationPrimitives");\nvar FilterServices \t\t= Java.type("com.dassault_systemes.completion.service.FilterServices");\nvar CompletionServicesConstants = Java.type("com.dassault_systemes.completion.service.CompletionServicesConstants");\nvar PrimitiveScope = Java.type("com.dassault_systemes.pprcompletion.primitives.DELPPRScopePrimitive");\nvar DebugTimer = Java.type("com.dassault_systemes.completionServices.base.DebugTimer");\nvar System = Java.type("java.lang.System");\nvar navSets = [PRD, PRCS, PROD_SYS, WK_PL, RSC, CPBL_RSC];\n\nmql.startTransaction(false);\n\nCompletionProcedure.runFunction (ConfigurationsVal, navSets, function(context, outputData) {\n\n'+r+'var CurrCompletionID = "'+e.ProcID+'";\n\n';for(u=0;u<s;u++){if("Open"===(c=t[u].options.grid).primitive||"stopAt"===c.primitive){h(c);continue}let e=i.find(e=>e.id===c.primitive);if(!e)continue;let o=u+1;var p=c.input1.replace(/\s+/g,"").split(","),m=n.mergeNavigationSet(p),g="";if(void 0!==c.input2){let t=(g=c.input2.replace(/\s+/g,"")).split(",");if("cutOccurrences"===c.primitive)d+=r+(P="var clause_"+o)+" = "+g+";\n",g="clause_"+o;else void 0!==e.arg2&&"NAVSET"==e.arg2&&(g=n.mergeNavigationSet(t));g.length>0&&(g=", "+g)}var f="";if(void 0!==c.input3){let t=(f=c.input3.replace(/\s+/g,"")).split(",");"ModifyContextWithProximityVolume"===c.primitive||"ModifyContextWithBoundingBoxVolume"===c.primitive?f="DELPPRFilterPrimitive.VolumeMode."+f:void 0!==e.arg3&&"NAVSET"==e.arg3&&(f=n.mergeNavigationSet(t)),f.length>0&&(f=", "+f)}var v=e.xclass,P="var resultStep"+o,D="";e.arg2&&void 0!==c.input2&&(D="|"+c.input2);var S="";if(e.arg3&&void 0!==c.input3&&(S="|"+c.input3),d+=r+"//@"+c.primitive+"|"+c.input1+D+S+"@//\t#"+o+"\n",d+=r+"var Step"+o+'Timer = new DebugTimer (context, 0, "resultStep'+o+'", true);\n',"merge"===c.primitive)isNaN(p[0])?d+=r+P+" = "+p[0]+" = "+m+";\n":d+=r+P+" = resultStep"+p[0]+" = "+m+";\n";else{let e=c.primitive;"fastenersAnalysisBothSidesLegacy"===e&&(e="fastenersAnalysisBothSides");var y="context, ";"compact"!==c.primitive&&"keepRoot"!==c.primitive||(y=""),d+=r+P+" = "+v+"."+e+" ("+y+m+g+f+");\n"}d+=r+"Step"+o+"Timer.complete();\n\n"}function C(e){let n=e.split(","),r=parseInt(n[0]);if(isNaN(r))return l[n[0]];let o=t[r-1].options.grid,a=i.find(e=>e.id===o.primitive);return a?"IdentifyFromInput"===a.returntype?C(o.input1):"Array"===a.returntype?n[0].includes("[0]")?l.PRD:n[0].includes("[1]")?l.PRCS:"None":a.returntype:"None"}function h(e){let t="";"Open"===e.primitive?d+=r+"//@Open|"+e.input1+"|1@//\n":"stopAt"===c.primitive&&(d+=r+"//@stopAt|"+e.input1+"|1@//\n",t="StopAt");let i=e.input1.split(","),o=[],a=[],l=[],s=[],u=[],p=[];for(let e=0;e<i.length;e++){let t;i[e]=i[e].trim(),"Product"==(t=C(i[e]))?o.push(i[e]):"Process"==t?a.push(i[e]):"System"==t?l.push(i[e]):"Resource"==t?s.push(i[e]):"WorkPlan"==t?u.push(i[e]):"capableResource"==t&&p.push(i[e])}o.length>0&&(d+=r+`outputData.add ("${t}Product", `+n.mergeNavigationSet(o)+");\n"),a.length>0&&(d+=r+`outputData.add ("${t}Process", `+n.mergeNavigationSet(a)+");\n"),l.length>0&&(d+=r+`outputData.add ("${t}System", `+n.mergeNavigationSet(l)+");\n"),u.length>0&&(d+=r+`outputData.add ("${t}WorkPlan", `+n.mergeNavigationSet(u)+");\n"),s.length>0&&(d+=r+`outputData.add ("${t}Resource", `+n.mergeNavigationSet(s)+");\n"),p.length>0&&(d+=r+`outputData.add ("${t}capableResource", `+n.mergeNavigationSet(p)+");\n"),d+="\n"}return d+="});\n\n",d+="mql.abortTransaction();"}}}),define("DS/DELMCBUserDefAdmin/utils/Services",["DS/WAFData/WAFData","UWA/Class/Promise","DS/Notifications/NotificationsManagerUXMessages","DS/Notifications/NotificationsManagerViewOnScreen","DS/DELMCBUserDefAdmin/utils/PlatformServices"],function(e,t,i,n,r){"use strict";const o=function(e){const t=e&&UWA.is(e.version,"string")?e.version:"1.0";return{Accept:"application/json","Content-Type":"application/json","Accept-Language":window.widget.lang,"DS-API-Version":t,SecurityContext:"ctx::"+r.getSecurityContext()}};return{FetchProcedureDetails:function(i){return new t((t,n)=>{var a={method:"POST"};a.headers=o(),a.data=JSON.stringify({ProcID:i.ProcID}),a.cache=-1,a.onComplete=function(e){t(e)},a.onFailure=function(e){console.log("GetProcedureDetails failure response:"),console.log(e),n(e)},e.authenticatedRequest(r.assembleURLFor3DSpace("/resources/delmcb/api/UDOWebServices/GetProcedureDetails"),a)})},DeployProcedure:function(i){return new t((t,n)=>{i.ProcUsageContext_Open=!0,i.ProcUsageContext_XPDM=!1;var a={method:"POST"};a.headers=o(),a.data=JSON.stringify(i),a.cache=-1,a.onComplete=function(e){t(e)},a.onFailure=function(e){console.log("Deploy failure response:"),console.log(e),n(e)},e.authenticatedRequest(r.assembleURLFor3DSpace("/resources/delmcb/api/UDOWebServices/Deploy"),a)})},FetchListOfProcedures:function(){return new t((t,i)=>{var n={method:"GET"};n.headers=o(),n.type="json",n.timeout=6e5,n.cache=-1,n.onComplete=function(e){t(e.Scenarios)},n.onFailure=function(e){console.log("GetProcedureList failure response:"),console.log(e),i(e)},e.authenticatedRequest(r.assembleURLFor3DSpace("/resources/delmcb/api/UDOWebServices/GetProcedureList"),n)})},DeleteProcedure:function(i){return new t((t,n)=>{var a={method:"POST"};a.headers=o(),a.cache=-1,a.data=JSON.stringify({ProcID:i}),a.onComplete=function(e){t(e)},a.onFailure=function(e){console.log("Delete failure response:"),console.log(e),n(e)},e.authenticatedRequest(r.assembleURLFor3DSpace("/resources/delmcb/api/UDOWebServices/Delete"),a)})},NotificationMessage(e,t,r){window.notifs=i,n.setNotificationManager(window.notifs);var o={level:r,title:e,message:t,sticky:!1};window.notifs.addNotif(o)}}}),define("DS/DELMCBUserDefAdmin/ProcedureEditor",["UWA/Core","DS/Windows/Dialog","DS/Controls/Button","DS/Controls/ComboBox","DS/Controls/LineEditor","DS/Controls/Editor","DS/Controls/Toggle","DS/Controls/ButtonGroup","DS/Controls/TooltipModel","DS/TreeModel/TreeDocument","DS/TreeModel/TreeNodeModel","DS/DataGridView/DataGridView","DS/DELMCBUserDefAdmin/utils/CodeGenerator","DS/DELMCBUserDefAdmin/utils/Services","i18n!DS/DELMCBUserDefAdmin/assets/nls/DELMCBUserDefAdmin","i18n!DS/DELMCBUserDefAdmin/assets/nls/Applist","text!DS/DELMCBUserDefAdmin/assets//PrimitivesDef.json"],function(e,t,i,n,r,o,a,l,s,c,u,d,p,m,g,f,v){"use strict";var P,D=null,S=null;const y=new RegExp("^[A-Za-z0-9_-]+(\\.\\d+){3}$");var C={ProcID:"",modProg:!1,ProcCategory:"Custo",ProcUsageContext_Open:!0,ProcUsageContext_XPDM:!1,ProcDisplayName:"",ProcShortDescription:"",ProcVisibility:"DEV",ProcAction:"ALL",ProcInputObjType:"",ProcOpenApp:"",JavascriptCode:""},h=!1,w=new Set;const b=["Any","EBOM","MBOM","Workplan","System","Resource"],I=["MCB_OPEN","MCB_EXPLORE","MCB_REVISION"],E=["DEV","ALL","OBSOLETE"],N={PRD:"Product",SEL_PRD:"Product",PRCS:"Process",SEL_PRCS:"Process",PROD_SYS:"System",SEL_PROD_SYS:"System",WK_PL:"Workplan",SEL_WK_PL:"Workplan",RSC:"Resource",SEL_RSC:"Resource",CPBL_RSC:"capableResource",SEL_CPBL_RSC:"capableResource"};return{Launch:function(x,L,A){if(null!=D)return;var R=JSON.parse(JSON.stringify(C));""!=x&&(S=x.ProcID,R=JSON.parse(JSON.stringify(x)));var M=JSON.parse(v),O={};M.forEach(e=>{O[e.id]={},e.hasOwnProperty("input1")&&(O[e.id].input1=e.input1),e.hasOwnProperty("input2")&&(O[e.id].input2=e.input2),e.hasOwnProperty("input3")&&(O[e.id].input3=e.input3),e.hasOwnProperty("returntype")&&(O[e.id].returntype=e.returntype),e.hasOwnProperty("pattern1")&&(O[e.id].pattern1=e.pattern1),e.hasOwnProperty("pattern2")&&(O[e.id].pattern2=e.pattern2),e.hasOwnProperty("pattern3")&&(O[e.id].pattern3=e.pattern3)});var F=document.createElement("div");F.className="container-proceditor-panel";new e.Element("div",{text:g.get("title.procedureID")}).inject(F);var T=new r({value:R.ProcID,disabled:!1,sizeInCharNumber:30}).inject(F),U=(new e.Element("proceditor-div",{text:g.get("title.procedureName")}).inject(F),new r({value:R.ProcDisplayName,disabled:!1,sizeInCharNumber:30}).inject(F)),_=(new e.Element("div",{text:g.get("title.procedureVisibility")}).inject(F),new n({selectedIndex:E.findIndex(e=>e===R.ProcVisibility),elementsList:[g.get("visible.inwork"),g.get("visible.production"),g.get("visible.obsolete")]}).inject(F)),V=(new e.Element("div",{text:g.get("title.procedureAction")}).inject(F),new l({type:"checkbox"}).inject(F)),B=new a({type:"checkbox",label:g.get("command.udo"),value:I[0],checkFlag:!1}),W=new a({type:"checkbox",label:g.get("command.ude"),value:I[1],checkFlag:!1}),k=new a({type:"checkbox",label:g.get("command.udr"),value:I[2],checkFlag:!1});B.tooltipInfos=new s({title:g.get("action.udo"),shortHelp:g.get("action.udo.shortHelp")}),W.tooltipInfos=new s({title:g.get("action.ude"),shortHelp:g.get("action.ude.shortHelp")}),k.tooltipInfos=new s({title:g.get("action.udr"),shortHelp:g.get("action.udr.shortHelp")}),V.addChild(B),V.addChild(W),V.addChild(k);new e.Element("div",{text:g.get("title.procedureNodeType")}).inject(F);let J=new n({selectedIndex:0,elementsList:[g.get("nodetype.any"),g.get("nodetype.product"),g.get("nodetype.item"),g.get("nodetype.workplan"),g.get("nodetype.system"),g.get("nodetype.resource")]}).inject(F);new e.Element("div",{text:g.get("title.openinapp")}).inject(F);let j=[];for(let e in f.apps)f.apps.hasOwnProperty(e)&&j.push({valueItem:e,labelItem:f.apps[e]});let G=new n({selectedIndex:0,elementsList:j}).inject(F);new e.Element("div",{text:g.get("title.procedureDesc")}).inject(F);var z=new o({value:R.ProcShortDescription,disabled:!1,nbRows:5,sizeInCharNumber:500}).inject(F);let X="Custo"!=R.ProcCategory,K=new i({label:g.get("button.deploy"),disabled:X,onClick:function(e){if(""!==T.value&&""!==U.value&&""!==z.value)if(y.test(T.value))if(V.value.length)if(ee.getRowModelLength()<2)m.NotificationMessage(g.get("error.validationFailed"),g.get("error.MinimumNbStep"),"error");else{if(w.size)return m.NotificationMessage(g.get("error.validationFailed"),g.get("error.invalidInputs"),"error"),void(h||(h=!0,w.forEach(e=>{ee.updateCellView(e,{updateCellContent:!0,updateCellLayout:!1,updateCellAttributes:!1})})));R.ProcCategory="Custo",R.ProcID=T.value,R.ProcDisplayName=U.value,R.ProcShortDescription=z.value,R.ProcVisibility=E[_.selectedIndex],R.ProcAction=V.value.join(","),R.ProcNodeType=b[J.selectedIndex],R.ProcOpenApp=j[G.selectedIndex].valueItem,R.JavascriptCode=p.generateJSCode(R,P.getChildren()),R.modProg=!1,null!=S&&S==R.ProcID&&(R.modProg=!0),m.DeployProcedure(R).then(e=>{var t=JSON.parse(e);if("S_OK"==t.result){R.ModificationTime=(new Date).toLocaleString();var i=[];i[0]=R,A&&A(i);var n=g.replace(g.get("msg.deploySuccess"),{procx:R.ProcID});m.NotificationMessage(g.get("msg.deploySuccessTitle"),n,"info")}else m.NotificationMessage(g.get("msg.deployFailTitle"),t.error_msg,"error")}),D.close(),D=null}else m.NotificationMessage(g.get("error.validationFailed"),g.get("error.ProcActionValueNull"),"error");else m.NotificationMessage(g.get("error.invalidInput"),g.get("error.procedureID"),"error");else m.NotificationMessage(g.get("msg.deployFailTitle"),g.get("msg.missingProcProperties"),"error")}});T.addEventListener("change",function(e){if(K.disabled=!0,y.test(T.value)){var t=[];S&&(t=S.split("."));var i=T.value.split(".");"Custo"!==R.ProcCategory&&t[0]===i[0]||(K.disabled=!1)}else m.NotificationMessage(g.get("error.invalidInput"),g.get("error.procedureID"),"error")}),(D=new t({immersiveFrame:L,title:g.get("title.editProcedure"),content:F,height:750,width:1e3,resizableFlag:!0,activeFlag:!1,modalFlag:!0,buttons:{Ok:K,Cancel:new i({label:g.get("button.cancel"),onClick:function(e){D.close(),D=null}})}})).addEventListener("close",function(e){D&&(w.clear(),D=null,h=!1)});var q=new e.Element("div");if(q.className="container-proceditor-table",q.inject(F),(P=new c).onNodeModelUpdate(function(e){w.clear(),ee.updateView({updateCellContent:!0,updateCellLayout:!1,updateCellAttributes:!1})}),V.addEventListener("change",e=>{ee.updateColumnView("primitive",{updateCellContent:!0,updateCellLayout:!1,updateCellAttributes:!1}),P.getRoots().forEach(e=>{e&&e._options&&e._options.grid&&"stopAt"===e._options.grid.primitive&&e.updateOptions({label:"",grid:{input1:"",input2:"",input3:"",primitive:""}})})}),""!=x)m.FetchProcedureDetails(R).then(e=>{let t=JSON.parse(e);R.ProcAction=t.ProcAction,R.ProcAction||(R.ProcAction=I.join(",")),V.value=R.ProcAction.split(","),V.value.includes("BOTH")&&(V.value=[I[0],I[1]]),R.ProcNodeType=t.ProcNodeType,J.selectedIndex=b.findIndex(e=>e===R.ProcNodeType),J.selectedIndex<0&&(J.selectedIndex=0),R.ProcOpenApp=t.ProcOpenApp;let i=0;for(let e in f.apps){if(R.ProcOpenApp==e){G.selectedIndex=i;break}i++}var n=p.getTagsFromJSCode(t.code);P.prepareUpdate(),n.forEach(function(e){var t=new u({label:e.primitive,grid:e});P.addRoot(t)}),P.pushUpdate()});else{P.prepareUpdate();for(let e=0;e<6;e++){var H=new u({label:"",grid:{primitive:e<5?"":g.get("primitive.Open"),input1:"",input2:"",input3:""}});P.addRoot(H)}P.pushUpdate()}function $(t){let i=new RegExp("^[0-9]+\\[[0-9]+\\]$","g");if(!isNaN(t)){t=parseInt(t);let i=ee.getNodeModelAtRowID(t-1).getAttributeValue("primitive"),n=O[i]?O[i].returntype:void 0;if(e.equals(n,"IdentifyFromInput")){let e=ee.getNodeModelAtRowID(t-1).getAttributeValue("input1"),i=e?e.split(","):void 0;if(!i||!i.length)return;n=$(i[0])}return n}if(i.test(t)){let e=t.match(/\d+/g);if(0==e[1])return"Product";if(1==e[1])return"Process"}return N[t]}function Y(e){let t="valid-editable-field",i="pattern"+e.columnID,n=e.nodeModel._options.grid.primitive;if(O[n]&&O[n].hasOwnProperty(i)){new RegExp(O[n][i],"g").test(e.cellModel)&&function(e){let t=O[e.nodeModel._options.grid.primitive],i="input"+e.columnID,n=e.cellModel.split(",");if(!t[i])return!0;let r="";for(let o=0;o<n.length;o++){if(n[o]=n[o].trim(),!isNaN(n[o])&&n[o]>e.nodeModel._rowID)return!1;let a=$(n[o]);if(!a)return!1;if("Any"!==t[i]&&!t[i].includes(a))return!1;if("Open"!==e.nodeModel._options.grid.primitive&&"stopAt"!=e.nodeModel._options.grid.primitive)if(""===r)r=a;else if(r!==a)return!1}return!0}(e)?w.delete(e.cellID):(w.add(e.cellID),t=h?"incorrect-input-field":t),console.log(w)}else t="non-editable-field";return t}function Z(e){return e.nodeModel?Y(e):""}const Q=[{text:g.get("title.step"),dataIndex:"primitive",editableFlag:!0,sortableFlag:!1,editionPolicy:"EditionOnClick",getCellTypeRepresentation:function(e){return V&&V.value&&1===V.value.length&&V.value[0]===I[2]?"primitivesEnumType2":"primitivesEnumType"},getCellClassName:function(e){let t="valid-editable-field";return e&&e.rowID>0&&e.cellModel&&!e.cellModel.length?(w.add(e.cellID),t=h?"incorrect-input-field":t):w.delete(e.cellID),t}},{text:g.get("title.param1"),dataIndex:"input1",typeRepresentation:"string",editableFlag:!0,sortableFlag:!1,editionPolicy:"EditionOnClick",hasCellValue:function(e){if(e.columnID>0&&e.rowID>=0){let t=e.nodeModel.getAttributeValue("primitive");if(!O[t])return e.nodeModel._options.grid.input1="",!1}return!0},getCellClassName:Z},{text:g.get("title.param2"),dataIndex:"input2",typeRepresentation:"string",editableFlag:!0,sortableFlag:!1,editionPolicy:"EditionOnClick",hasCellValue:function(e){if(e.columnID>0&&e.rowID>=0){let t=e.nodeModel.getAttributeValue("primitive");if(O[t]&&!O[t].pattern2)return e.nodeModel._options.grid.input2="",!1}return!0},getCellClassName:Z},{text:g.get("title.param3"),dataIndex:"input3",typeRepresentation:"string",editableFlag:!0,sortableFlag:!1,editionPolicy:"EditionOnClick",hasCellValue:function(e){if(e&&e.columnID>0&&e.rowID>=0){let t=e.nodeModel.getAttributeValue("primitive");if(O[t]&&!O[t].pattern3)return e.nodeModel._options.grid.input3="",!1}return!0},getCellClassName:Z}];var ee=new d({treeDocument:P,columns:Q,fontIconFamily:WUXManagedFontIcons.font3DS,rowDragEnabledFlag:!0,showModelChangesFlag:!0,rowSelection:"single",cellSelection:"single",defaultColumnDef:{editableFlag:!0},getCellTooltip:function(e){if(e.columnID>0&&e.rowID>=0){let t=p.getPrimitives(),i=e.nodeModel.getAttributeValue("primitive"),n=t.find(e=>e.id===i);if(n){let t="primitive."+n.id+".tooltip"+e.columnID,i=g.get(t);return i===t&&(i=g.get("primitive.tooltip.unused")),{shortHelp:i,updateModel:!1}}}return ee.getCellDefaultTooltip(e)}}).inject(q),te={},ie={};p.getPrimitives().forEach(function(e){te[e.id]=g.get("primitive."+e.id)}),Object.assign(ie,te),delete te.stopAt;var ne={primitivesEnumType:{stdTemplate:"enumCombo",semantics:{possibleValues:te,valueType:"enumValueToProperty"}}};ee.getTypeRepresentationFactory().registerTypeRepresentations(JSON.stringify(ne));var re={primitivesEnumType2:{stdTemplate:"enumCombo",semantics:{possibleValues:ie,valueType:"enumValueToProperty"}}};ee.getTypeRepresentationFactory().registerTypeRepresentations(JSON.stringify(re)),ee.onContextualEvent=function(e){let t=[];if(e&&e.collectionView&&e.cellInfos&&-1!==e.cellInfos.rowID){let i=ee.layout.getCellIDFromCoordinates({rowID:e.cellInfos.rowID,columnID:0});if("Open"!==ee.getCellInfosAt(i).cellModel){let i={insertRow:!0};(t=e.collectionView.buildDefaultContextualMenu(e,i)).push({type:"PushItem",title:g.get("menu.deleterow"),action:{callback:function(t){e.cellInfos.nodeModel.remove()}}})}}return t},ee.insertRowCallback=function(e,t,i){e.setLabel("Inserted By InsertRow Cmd"),e.updateOptions({grid:{primitive:"",input1:"",input2:"",input3:""}})},L.inject(document.body)}}}),define("DS/DELMCBUserDefAdmin/DELMCBUserDefAdmin",["UWA/Core","DS/Windows/ImmersiveFrame","DS/Windows/Panel","DS/Windows/Dialog","DS/Controls/Button","DS/TreeModel/TreeDocument","DS/TreeModel/TreeNodeModel","DS/Tweakers/GeneratedToolbar","DS/DataGridView/DataGridView","DS/DELMCBUserDefAdmin/ProcedureEditor","DS/DELMCBUserDefAdmin/utils/Services","DS/DELMCBUserDefAdmin/utils/PlatformServices","i18n!DS/DELMCBUserDefAdmin/assets/nls/DELMCBUserDefAdmin"],function(e,t,i,n,r,o,a,l,s,c,u,d,p){"use strict";let m=null,g=null;const f={async init(){const t=window.widget;await d.init();const i=d.getSecurityContexts();document.body.empty(),t.addPreference({name:"securityContext",type:"list",label:p.get("preferences.securityContext"),options:i.cspaces,defaultValue:i.securityContext});const n=d.getTenants();!0===d.isCloudEnvironment()&&e.is(n,"object")&&t.addPreference({name:"x3dPlatformId",type:"list",label:p.get("preferences.tenant"),options:n.platforms,defaultValue:n.tenant})},AddProcedurestoList:function(e){m.prepareUpdate(),e.forEach(function(e){"DEV"==e.ProcVisibility?e.ProcVisibilityDisplay=p.get("visible.inwork"):"ALL"==e.ProcVisibility?e.ProcVisibilityDisplay=p.get("visible.production"):"OBSOLETE"==e.ProcVisibility&&(e.ProcVisibilityDisplay=p.get("visible.obsolete"));let t="lightgrey";"Custo"!==e.ProcCategory&&(t="limegreen");let i=m.getRoots().find(t=>t.getAttributeValue("label")===e.ProcID);if(i)i.updateOptions({label:e.ProcID,grid:e,color:t});else{var n=new a({label:e.ProcID,grid:e,color:t});m.addRoot(n)}}),m.pushUpdate()},NewProcedure:function(){c.Launch("",g,f.AddProcedurestoList)},OpenProcedure:function(){let e=m.getSelectedNodes();if(e.length>0){let t=e[0].options.grid;c.Launch(t,g,f.AddProcedurestoList)}},DeleteProcedure:function(){let e=m.getSelectedNodes();if(e.length>0)var t=e[0],i=t.options.label,o=p.replace(p.get("delete.message"),{procx:i}),a=new n({immersiveFrame:g,title:p.get("delete.title"),content:o,activeFlag:!1,buttons:{No:new r({onClick:function(e){a.close()}}),Yes:new r({onClick:function(e){u.DeleteProcedure(i).then(e=>{var n=JSON.parse(e);if("S_OK"==n.result){m.prepareUpdate(),m.removeRoot(t),m.pushUpdate();var r=p.replace(p.get("msg.deleteSuccess"),{procx:i});u.NotificationMessage(p.get("msg.deleteSuccessTitle"),r,"info")}else u.NotificationMessage(p.get("msg.deleteFailTitle"),n.error_msg,"error");a.close()})}})}})},async LaunchPanel(){await f.init(),g=new t({identifier:"MainPage"});var n=document.createElement("div");n.className="container-proclist-panel";var r={entries:[{id:"newProcedure",dataElements:{typeRepresentation:"functionIcon",tooltip:p.get("command.createProc"),label:"Add",icon:{iconName:"plus",fontIconFamily:1},action:{module:"DS/DELMCBUserDefAdmin/DELMCBUserDefAdmin",func:"NewProcedure"},position:"far",category:"1"}},{id:"deleteProcedure",tooltip:p.get("command.deleteProc"),disabled:1,dataElements:{typeRepresentation:"functionIcon",icon:{iconName:"trash",fontIconFamily:1},position:"far",category:"1",action:{module:"DS/DELMCBUserDefAdmin/DELMCBUserDefAdmin",func:"DeleteProcedure"}}},{id:"openProcedure",tooltip:p.get("command.openProc"),disabled:1,dataElements:{typeRepresentation:"functionIcon",icon:{iconName:"open",fontIconFamily:1},position:"far",category:"1",action:{module:"DS/DELMCBUserDefAdmin/DELMCBUserDefAdmin",func:"OpenProcedure"}}}]},a=l.prototype.createTreeDocument(r),c=new l({items:a});c.inject(n);var d=new e.Element("div");d.className="container-proclist-table",d.inject(n),m=new o;var v=[{text:p.get("title.procedureID"),dataIndex:"ProcID",typeRepresentation:"string"},{text:p.get("title.procedureName"),dataIndex:"ProcDisplayName"},{text:p.get("title.procedureDesc"),dataIndex:"ProcShortDescription"},{text:p.get("title.procedureVisibility"),dataIndex:"ProcVisibilityDisplay"},{text:p.get("title.procedureModificationDate"),dataIndex:"ModificationTime",typeRepresentation:"date"}];var P=new s({treeDocument:m,columns:v,fontIconFamily:WUXManagedFontIcons.font3DS,showModelChangesFlag:!0,rowSelection:"single",cellSelection:"none",showNodeKPIColorFlag:!0,cellActivationFeedback:"none",cellPreselectionFeedback:"row"}).inject(d).getNodesXSO();P.onPostAdd(function(e){c.updateNodeModel("openProcedure",{disabled:0}),e.forEach(function(e){let t="Custo"!==m.getRoots().find(t=>t.getAttributeValue("label")===e.options.label).options.grid.ProcCategory;c.updateNodeModel("deleteProcedure",{disabled:t})})}),P.onPostRemove(function(e){c.updateNodeModel("openProcedure",{disabled:1}),c.updateNodeModel("deleteProcedure",{disabled:1})});new i({immersiveFrame:g,content:n,allowedDockAreas:"WUXDockAreaEnum.NoneDockArea",maximizedFlag:!0,titleBarVisibleFlag:!1,collapsibleFlag:!1,floatableFlag:!1,showTitleFlag:!1,identifier:"WebUIPanelDocumentation_ProcListPanel"});g.inject(document.body),u.FetchListOfProcedures().then(e=>{f.AddProcedurestoList(e)})}};return{NewProcedure:function(){f.NewProcedure()},OpenProcedure:function(){f.OpenProcedure()},DeleteProcedure:function(){f.DeleteProcedure()},LaunchPanel(){f.LaunchPanel()}}});