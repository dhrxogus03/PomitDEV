define("DS/DELPPRData/Buildup/BuildUpSessionManager",["UWA/Core","DS/DELPXPProcessBuildUp/DELPXPProcessBuildUpAPI","DS/DELPXPSessionManager/DELPXPSessionManager"],function(e,t,n){"use strict";return function(e){let i={},r=e.getOption("logger");return{create:async function(e){r.debug("DynamicBuildupOnCloud::creating session");let i=e||n.createPXPSession(),o=await t.connectProcessBuildUp(i);return this.set(i,o),r.debug(`DynamicBuildupOnCloud::session created with session id: ${i}`),{id:i,session:o}},set:function(e,t){e&&(i[e]={session:t||null})},get:function(e){return i[e]},getNodeSessionInstance:function(e){let t=i[e]?i[e]:null;return t&&t.session?t.session:null},remove:function(e){delete i[e]},reset:function(){i={}}}}}),define("DS/DELPPRData/Buildup/BuildUpSettings",["UWA/Core","DS/Logger/Logger","text!DS/DELPPRData/assets/json/BuildUpCategoriesMap.json"],function(e,t,n){"use strict";var i,r=function(){const i=JSON.parse(n),r="Color",o="WithTransparency",s="TransparencyCoefficient",a="IsDisplayed",u="WithColor",l="TRUE",c="FALSE",d="resource",p="all",f="all_onlyassignedresources",g="capableresource";return{getParsedBuildUpSettings:function(t){var n,i,o,s={};if(e.is(t,"object"))for(i in(n={...t}).DisplayOptions)n.DisplayOptions.hasOwnProperty(i)&&(o=i.toLowerCase(),e.is(s[o],"object")||(s[o]={}),s[o].visibility=n.DisplayOptions[i].IsDisplayed===l,s[o].opacity=n.DisplayOptions[i].WithTransparency===l?Number(n.DisplayOptions[i].TransparencyCoefficient):255,s[o].color=n.DisplayOptions[i].WithColor===l&&n.ColorOptions.WithColor===l?n.ColorOptions[r+i]:null,s[o].withColor=n.DisplayOptions[i].WithColor===l,s[o].filter=n.DisplayOptions[i].Filter?n.DisplayOptions[i].Filter:null);return s},getGraphicProperties:function(t,n){var i;return e.is(t,"object")&&n&&(i=n===p||n===f||n===g?t[d]:t[n]),i},getCategory:function(e){return e&&e===p||e===f||e===g?d:e},isBuildUpColorsEnabled:function(e){let t=!1;return e&&e.ColorOptions&&(t=e.ColorOptions.WithColor===l),t},getCategoryColor:function(e,t){if(e&&e.ColorOptions)return e.ColorOptions[`${r}${i[t]}`]},updateBuildUpColorSettings:function(e,t){return e&&e.ColorOptions&&(e.ColorOptions.WithColor=t?l:c),e},updateBuildUpDisplayCategorySettings:function(e,t,n){return e&&t&&n&&Object.keys(n).forEach(d=>{let p=i[t];if(p)switch(d){case"color":e.ColorOptions&&(e.ColorOptions[`${r}${p}`]=n[d]);break;case"opacity":e.DisplayOptions[`${p}`]&&(e.DisplayOptions[`${p}`][o]=l,e.DisplayOptions[`${p}`][s]=n[d]);break;case"visibility":e.DisplayOptions[`${p}`]&&(e.DisplayOptions[`${p}`][a]=n[d]?l:c);break;case"withColor":e.DisplayOptions[`${p}`]&&(e.DisplayOptions[`${p}`][u]=n[d]?l:c)}}),e},isValidSettings:function(n){let i=!1;try{i=e.is(JSON.stringify(n))}catch(e){t.error(e),i=!1}return i}}};return e.is(i)||(i=new r),i}),define("DS/DELPPRData/WKIModelService",["UWA/Core"],function(e){"use strict";return function(t,n){const i="StepViewInfo";var r=n.getOption("mappingKeys"),o={getWKIContentPromise:function(i,o){return new e.Promise(function(s,a){e.is(i,"array")&&i.length>0&&o?t.getFileNameFromIndex(i,o).then(function(i){e.is(i,"string")?t.getFileContent(i,r.READERTYPE.TEXT).then(s).fail(a):r.FILETYPES.WKICONTENT===o?s(null):a(n.getNLSValue("FileNotFound",{fileType:o},"Error","Message"))}).fail(a):a(n.getNLSValue("Error.Message.InvalidInput"))})},getCurrentStepViewInfo:function(){return t.get(i)},setCurrentStepViewInfo:function(e={}){e.viewInfo&&t.set(i,e.viewInfo)},getViewInfo:function(t){let n;if(t&&t.viewUUID){let i=o.getCurrentStepViewInfo();e.is(i,"array")&&(n=i.find(e=>e.UUID===t.viewUUID))}return n},reset:function(){t.set(i)},destroy:function(){o.reset(),r=null}};return o}}),define("DS/DELPPRData/WebService",["UWA/Core","DS/DELWebViewerUtils/DELWebViewerSettingsMgt","DS/WAFData/WAFData","DS/Logger/Logger","DS/DELWebViewerUtils/Utils","text!DS/DELPPRData/assets/json/Webservices.json"],function(e,t,n,i,r,o){"use strict";var s,a=function(){return{request:function(o){return new e.Promise(function(s,a){var u,l={Accept:"application/json, text/plain, application/octet-stream",SecurityContext:t.getSetting("pad_security_ctx")?t.getSetting("pad_security_ctx"):"preferred","Content-Type":"application/json"};e.is(o,"object")?(e.is(o.headers)&&Object.assign(l,o.headers),(u=new URL(o.url)).searchParams.set("tenant",r.getPlatformId()),n.authenticatedRequest(u.toString(),{method:o.method?o.method:"",type:o.dataType?o.dataType:"",data:o.payload?e.Json.encode(o.payload):"",headers:l,timeout:t.getSetting("webapi_timeout"),proxy:"none",onComplete:function(e){s(e)},onTimeout:function(e,t){i.error("WebService Call failed due to - "+e),a(t)},onFailure:function(e,t){i.error("WebService Call failed due to - "+e),a(t)}})):(i.error("WebService Request Input not found."),a("Error.InvalidInput.Message"))})},getPublishedRepDocument:async function(e){let t,n=JSON.parse(o).getPublishedRepDocument;return e&&(n.payload.batch.expands[0].root.physical_id=e,n.url=r.get3DSpaceUrl()+n.url,t=await s.request(n)),t}}};return e.is(s)||(s=new a),s}),define("DS/DELPPRData/facets/DELWkiInstructionsFacetModel",["UWA/Core","DS/DELPPRData/WebService","DS/DELWebViewerUtils/Utils","text!DS/DELPPRData/assets/json/Webservices.json"],function(e,t,n,i){"use strict";return function(){return{getData:async function(r){var o,s,a;return"businessobject"!==r.get("metatype")&&"bus"!==r.get("metatype")||(o=r.get("objectId"),s=await async function(i){var r=null,o=`${n.get3DSpaceUrl()}/cvservlet/fetch/v2`,s={label:"Fetch-V2-"+Date.now(),physicalid:[i],locale:"en",select_predicate:["ds6w:type"]},a=await t.request({url:o,method:"POST",dataType:"json",payload:s});return a&&e.is(a.results,"array")&&a.results.forEach(t=>{e.is(t.attributes,"array")&&t.attributes.forEach(e=>{"ds6w:type"===e.name&&(r=e.value)})}),r}(o),a=await async function(e,r){var o,s,a=JSON.parse(i).WorkInstructionsTypes;return a[r]&&(o=`${n.get3DSpaceUrl()}`+`${a[r].url.replace("{ID}",e)}`,s=await t.request({url:o,method:"GET",dataType:"json"})),{response:s,type:r}}(o,s)),a}}}}),define("DS/DELPPRData/Buildup/BaseBuildup",["UWA/Core","DS/DELPPRData/WebService","DS/DELWebViewerUtils/Utils","DS/DELPPRData/Buildup/BuildUpSettings","text!DS/DELPPRData/assets/json/GlobalBuildupSettings.json"],function(e,t,n,i,r){"use strict";return function(o,s){var a=s.getOption("mappingKeys"),u=s.getOption("logger"),l=s.getOption("eventCollection").getModelCtrlEventHnd(),c=[];const d="CapRsc",p="BuildUpGlobalSettings";let f=function(){c.forEach(e=>{l.unSubscribe(e)}),c.push(l.subscribe(l.events.onSetBuildUpGlobalSettingsComplete,function(e){e&&widget.setValue(p,JSON.stringify(e))}))},g=function(e={}){if(!e.settings||!i.isValidSettings(e.settings))throw u.log("property settings is not available/ or is not a valid settings, please check the input"),new Error(s.getNLSValue("Error.InvalidInput.Message"));o.set(p,e.settings)},P=function(e={}){var t,n;return s.getOption("persistBuildUpSettings")&&(f(),e.clear&&widget.setValue(p),(n=widget.getValue(p))&&(t=JSON.parse(n))),t||(t=JSON.parse(r)[a.BUILDUPKEYS.BUILDUPSETTINGS]),g({settings:t}),t};return{activateBuildUpPersistence:f,updateBuildUpSettings:function(e){return P(e)},getBuildUpContext:function(e){let i=`${n.get3DSpaceUrl()}/resources/v1/delviewerservices/private/invoke/getBuildUpContext`;return t.request({url:i,method:"POST",dataType:"json",payload:e}).then(function(e){return e&&e.results&&e.results.mfgContext&&o.set("buildupContext",e.results.mfgContext),e&&e.results&&e.results.resourceContext&&o.set("resourceContext",e.results.resourceContext),e})},getPayload:function(e){var t={"dsprcs:MfgProcess":{id:e.processId},"dsprcs:Mfg":{id:e.mfgId},"dsprcs:Resource":{}};return e.installPath&&(t["dsprcs:Mfg"].installPath=e.installPath),e.resourceId&&(t["dsprcs:Resource"].id=e.resourceId),e.filter&&(t.filter=e.filter),t},initialize:function(i){let r=this,a=2===s.getOption("viewerType");return a&&o.loadProcess(i).fail(e=>{u.warn(e)}),e.Promise.all([(l=`${n.get3DSpaceUrl()}/resources/v0/dsprcs/private/invoke/buildup`,c=r.getPayload(i),t.request({url:l,method:"POST",dataType:"json",payload:c})).then(function(e){return o.set("buildupContent",e),e}),r.getBuildUpContext(r.getPayload(i))]).then(function(){return P()});var l,c},getPredecessors:function(){let e=[],t=this.getProcessInfo();return t&&t.installPath&&t.predecessors&&t.predecessors.length>0&&t.predecessors.forEach(function(t){e.push({path:t,category:"previousfromprevioussystem",position:""})}),e},getContext:function(t){var n=o.get("buildupContext")||[];return e.is(t,"array")&&t.length>0&&(n=[],t.forEach(function(t){e.is(t,"array")&&t.length>0&&n.push({[a.BUILDUPKEYS.PATH]:t,[a.BUILDUPKEYS.CATEGORY]:a.BUILDUPCATEGORY.Context})})),n},parseBuildupContent:function(t,n){var i=o.get("process")||{},r=i&&i.installPath&&i.installPath.length>0?i.installPath.slice(0,i.installPath.length-1):[],s=[],u=[],l=this.getContext(n),c=this.getPredecessors()||[],p=function(t,n){let i=[];return e.is(t,"array")&&t.length>0&&t.forEach(function(e){var t={},o=a.BUILDUPCATEGORY[e.bucategory];t[a.BUILDUPKEYS.PATH]=o===d?e.objectinstancepath:r.concat(e.objectinstancepath),o&&(t[a.BUILDUPKEYS.CATEGORY]=o),t[a.GRAPHICPROPERTIES.VISIBILITY]=n,t[a.GRAPHICPROPERTIES.VISIBILITYFREE]=!n,i.push(t)}),i};return t&&(s=p(t[a.BUILDUPKEYS.OBJECTSTOSHOW],!0),u=p(t[a.BUILDUPKEYS.OBJECTSTOHIDE],!1)),u.concat((o.get("resourceContext")||[]).map(function(e){return{path:e.path,visibility:!1,visibilityFree:!0}}),l,c,s)},getBuildUp:function(t){var n,i=[],r=t.path;return e.is(r,"array")&&r.length>0&&(n=o.get("buildupContent")[r.join("/")],i=this.parseBuildupContent(n,t.context)),i},getMFGAndResourcePaths:function(){return[]},isObjectAvailable:function(){return!1},reset:function(){o.set("buildupContext",null),o.set("buildupContent",null)},destroy:function(){this.reset()},getBuildUpGlobalSettings:function(){let e=o.get(p);return e||P()},setBuildUpGlobalSettings:g,getProcessInfo:function(){return o.get("process")}}}}),define("DS/DELPPRData/Zip",["UWA/Core","DS/ZipJS/zip-fs","DS/VisuUnstreamers/FileInZipStreamObject","DS/DELWebViewerUtils/Utils","DS/Logger/Logger","DS/DELPPRData/WebService"],function(e,t,n,i,r,o){"use strict";var s,a=function(){var s,a,u=function(){return new e.Promise(function(e,t){s?e():t("Error.ZipNotInit.Message")})};return{init:function(e){var t=e.getOption("mappingKeys");t&&(s=t.DOCUMENTKEYS),a=e.getOption("logger")},fetchProcessData:function(t={}){var n=this,r=t.processId,l=i.get3DSpaceUrl(),c=function(){return`timestamp=${(new Date).getTime()}`},d=function(){let n,i=t.publishedRepId;return n=i?e.Promise.resolve(i):o.getPublishedRepDocument(r).then(function(t){let n,i;return e.is(t,"object")&&e.is(t.results,"array")&&t.results.length>0&&(i=t.results.find(e=>e.type===s.DOCUMENTTYPE))&&(n=i.resourceid),n})},p=function(t){return new e.Promise(function(n,i){var r;e.is(t)?(r=`${l}/resources/v1/modeler/documents/${t}/files/DownloadTicket?${c()}`,function(){var e=`${l}/resources/v1/application/CSRF?${c()}`;return o.request({url:e,method:"GET",dataType:"json"})}().then(function(e){return o.request({url:r,method:"PUT",dataType:"json",headers:{ENO_CSRF_TOKEN:e.csrf.value}})}).then(n).fail(i)):(a.debug("Document id not found. Ensure workplan is published correctly."),i("Error.PublishedContentNotFound.Message"))})},f=function(t){return new e.Promise(function(i,r){e.is(t)&&e.is(t.data,"array")&&e.is(t.data[0].dataelements.ticketURL)?o.request({url:t.data[0].dataelements.ticketURL,method:"GET",dataType:"blob"}).then(function(o){var u;e.is(t.data[0].dataelements.fileNames,"array")?(u=t.data[0].dataelements.fileNames.find(function(e){return-1!==e.indexOf(s.FILETYPE)}),e.is(u)?n.getFileNameFromZipBlob(o,u).then(function(e){n.getFileContent(o,e,"BLOB").then(i).fail(r)}).fail(r):(a.debug("Viewer Zip content file not found. Ensure workplan is published correctly."),r("Error.PublishedContentNotFound.Message"))):(a.debug("File names not found. Ensure workplan is published correctly."),r("Error.PublishedContentNotFound.Message"))}).fail(r):(a.debug("FCS URL not found. Ensure workplan is published correctly."),r("Error.PublishedContentNotFound.Message"))})},g=function(t){return new e.Promise(function(i,r){e.is(t)&&t.size>0?n.getFileNameFromZipBlob(t,s.INDEXFILESUFFIX).then(function(i){var r;return i?r=n.getFileContent(t,i,"TEXT"):(a.debug("Index file is invalid in published content. Ensure workplan is published correctly."),r=e.Promise.reject("Error.PublishedContentNotFound.Message")),r}).then(function(n){e.is(n)?i({zipBlob:t,indexFile:n}):(a.debug("Index file is invalid in published content. Ensure workplan is published correctly."),r("Error.PublishedContentNotFound.Message"))}).fail(r):(a.debug("Published content not found for given workplan. Ensure workplan is published correctly"),r("Error.PublishedContentNotFound.Message"))})};return new e.Promise(function(e,t){r?u().then(d).then(p).then(f).then(g).then(e).fail(t):t("Error.InvalidInput.Message")})},getFileContent:function(t,i,o){var s={BLOB:function(e,t){e.readAsBlob(t)},TEXT:function(e,t){e.readAsText(t)}};return new e.Promise(function(a,l){u().then(function(){var u,c=s[o];c?(c(u=new n(t,i),function(t){try{"TEXT"===o&&(t=JSON.parse(t)),e.is(t)?a(t):l("Error.FileContentNotFound.Message")}catch(e){r.error("File content extraction failed due to - "+e),l("Error.FileContentExtractionFailed.Message")}}),u.close()):l("Error.InvalidReaderType.Message")}).fail(l)})},getFileNameFromZipBlob:function(n,i){return new e.Promise(function(r,o){u().then(function(){n&&i?t.createReader(new t.BlobReader(n),function(t){t.getEntries(function(t){t.length>0?r(function(t,n){var i,r;for(i=0;i<t.length;++i)if(e.is(t[i].filename)&&(t[i].filename===n.trim()||t[i].filename.indexOf(n)>0)){r=t[i].filename;break}return r}(t,i)):o("Error.NoEntriesInZipBlob.Message")})},o):o("Error.FilenameNotFound.Message")}).fail(o)})},getFileName:function(t,n,i){return new e.Promise(function(r,o){u().then(function(){var o,s,a,u,l;if(e.is(t,"object")&&e.is(n,"array")&&n.length>0&&i&&(o=t.occurrences,e.is(o,"array")))for(s=0;s<o.length;s++)if(e.Array.equals(o[s].pathIds,n)){for(l=o[s].files,a=0;a<l.length;a++)if(l[a].type===i){u=l[a].name;break}break}r(u)}).fail(o)})},getOperationPath:function(t,n){return new e.Promise(function(e,i){u().then(function(){var r;t&&n&&(r=t.occurrences.find(function(e){return!!(e.pathIds&&e.pathIds.length>1)&&(e.pathIds[e.pathIds.length-1]===n||e.pathIds[e.pathIds.length-2]===n)})),r?e(r.pathIds):i("Error.StepPathInvalid.Message")}).fail(i)})},dispose:function(){s=a=null}}};return e.is(s)||(s=new a),s}),define("DS/DELPPRData/Buildup/PublishedBuildup",["UWA/Core","DS/DELPPRData/Buildup/BaseBuildup"],function(e,t){"use strict";return function(n,i){var r,o=[],s=i.getOption("logger"),a=i.getOption("mappingKeys"),u=a.BUILDUPKEYS.BUILDUPDEFKEYS,l=a.GRAPHICPROPERTIES,c=new t(n,i),d=async function(e={}){var t,r=e.processId,o=i.getOption("persistBuildUpSettings");if(t=await c.updateBuildUpSettings(e),!o||e.clear){let e,o=await n.getFileNameFromIndex([r],a.FILETYPES.BUILDUPSETTINGS);if(!o)throw new Error(i.getNLSValue("FileNotFound",{fileType:a.FILETYPES.BUILDUPSETTINGS},"Error","Message"));t=(e=await n.getFileContent(o,a.READERTYPE.TEXT))[a.BUILDUPKEYS.BUILDUPSETTINGS],c.setBuildUpGlobalSettings({settings:t})}return t};return Object.assign({},c,{updateBuildUpSettings:function(e){return d(e)},initialize:function(t={}){return e.is(n)?n.loadProcess(t).then(function(){return new e.Promise(function(t,o){n.getFileNameFromZipBlob(a.FILENAMES.BUILDUPDEF+".").then(function(t){return t?n.getFileContent(t,a.READERTYPE.TEXT):e.Promise.reject(i.getNLSValue("FileNotFound",{fileType:a.FILENAMES.BUILDUPDEF},"Error","Message"))}).then(function(n){var u;e.is(n,"object")?(r=n,t(n)):(u=i.getNLSValue("FileContentNotFound",{fileContentType:a.FILENAMES.BUILDUPDEF+"Content"},"Error","Message"),s.error(u),o(u))}).fail(function(e){s.error(e),o(e)})})}).then(function(t){return new e.Promise(function(r,o){n.getFileNameFromZipBlob(a.FILETYPES.BUILDUPCONTEXT+".").then(function(t){return t?n.getFileContent(t,a.READERTYPE.TEXT):e.Promise.reject(i.getNLSValue("FileNotFound",{fileType:a.FILETYPES.BUILDUPCONTEXT},"Error","Message"))}).then(function(l){var c,d=[];e.is(l,"object")?(l.mfgItemsBuildUp.forEach(function(e){var n=e.Id?e.Id:"",i={};i[a.BUILDUPKEYS.PATH]=t[u.MFGITEMS][n][a.BUILDUPKEYS.PATHIDS],i[a.BUILDUPKEYS.CATEGORY]=e[a.BUILDUPKEYS.CATEGORY],d.push(i)}),n.set("buildupContext",d),r(d)):(c=i.getNLSValue("FileContentNotFound",{fileContentType:a.FILETYPES.BUILDUPCONTEXT+"Content"},"Error","Message"),s.error(c),o(c))}).fail(function(e){s.error(e),o(e)})})}).then(function(){return d(t)}):e.Promise.reject(i.getNLSValue("Error.DataManagerNotFound.Message"))},getMFGAndResourcePaths:function(){var t,n,i=[];if(r)for(t in r)if(r.hasOwnProperty(t)&&e.is(r[t],"object"))for(n of Object.values(r[t]))e.is(n[a.BUILDUPKEYS.PATHIDS],"array")&&n[a.BUILDUPKEYS.PATHIDS].length>0&&i.push(n[a.BUILDUPKEYS.PATHIDS].toString());return i},getBuildUp:function(t){let c=this,d=function(t){return new e.Promise(function(e){let n=t||[],i=[];0===o.length&&(o=c.getMFGAndResourcePaths()),o.forEach(function(e){var t={};n.find(function(t){var n=t[a.BUILDUPKEYS.PATH].toString();return e.indexOf(n)>-1||n.indexOf(e)>-1})||(t[a.BUILDUPKEYS.PATH]=e.split(","),t[l.VISIBILITY]=!1,t[l.VISIBILITYFREE]=!0,i.push(t))}),e(i.concat(n))})},p=function(t){return new e.Promise(function(n){var i,r,o=[],s=c.getContext(),l=c.getPredecessors()||[];if(e.is(t.buildUp,"object")){for(i in u)u.hasOwnProperty(i)&&(r=u[i]+a.BUILDUPKEYS.BUILDUP,e.is(t.buildUp[r],"array")&&t.buildUp[r].length>0&&t.buildUp[r].forEach(function(e){var n=e.Id?e.Id:"",r={};n&&(r[a.BUILDUPKEYS.PATH]=t.buildUpDef[u[i]][n][a.BUILDUPKEYS.PATHIDS],r[a.BUILDUPKEYS.CATEGORY]=e[a.BUILDUPKEYS.CATEGORY],r[a.BUILDUPKEYS.POSITION]=e[a.BUILDUPKEYS.MODEL.POSITION],r[a.BUILDUPKEYS.TYPE]=u[i],o.push(r))}));n(s.concat(l,o))}})};return new e.Promise(function(o,u){var l;(l=r,new e.Promise(function(r,o){var u,c=t.path;e.is(c,"array")&&c.length>0&&n.getFileNameFromIndex(c,a.FILETYPES.BUILDUPCONTENT).then(function(t){e.is(t,"string")?n.getFileContent(t,a.READERTYPE.TEXT).then(function(e){r({buildUp:e,buildUpDef:l})}).fail(o):(u=i.getNLSValue("FileNotFound",{fileType:a.FILETYPES.BUILDUPCONTENT},"Error","Message"),s.error(u),o(u))}).fail(o)})).then(p).then(d).then(o).fail(u)})},isObjectAvailable:function(e){return!!(r&&r[e]&&Object.keys(r[e]).length>0)},reset:function(){r=null,o=[],c.reset()}})}}),define("DS/DELPPRData/Buildup/DynamicBuildupOnPremise",["DS/DELPPRData/Buildup/BaseBuildup"],function(e){"use strict";return function(t,n){return new e(t,n)}}),define("DS/DELPPRData/DataManager",["UWA/Core","DS/DELPPRData/Zip"],function(e,t){"use strict";return function(n){var i={zip:{}},r=n.getOption("eventCollection").getModelCtrlEventHnd();return t.init(n),{get:function(e){return i[e]?i[e]:null},set:function(t,n){e.is(t)&&(i[t]=n,r.publish(`onSet${t}Complete`,n))},reset:function(){i={zip:{}}},destroy:function(){i={zip:{}},t.dispose()},loadProcess:function(r={}){return new e.Promise(function(e,o){t.fetchProcessData(r).then(function(t){i.zip=t,e(t)}).fail(function(e){o(n.getNLSValue(e))})})},getFileNameFromIndex:function(r,o){return new e.Promise(function(e,s){t.getFileName(i.zip.indexFile,r,o).then(e).fail(function(e){s(n.getNLSValue(e))})})},getFileNameFromZipBlob:function(r){return new e.Promise(function(e,o){return t.getFileNameFromZipBlob(i.zip.zipBlob,r).then(e).fail(function(e){o(n.getNLSValue(e))})})},getFileContent:function(r,o){return new e.Promise(function(e,s){t.getFileContent(i.zip.zipBlob,r,o).then(e).fail(function(e){s(n.getNLSValue(e))})})},getOperationPath:function(r){return new e.Promise(function(e,o){i&&i.zip?t.getOperationPath(i.zip.indexFile,r).then(e).fail(function(e){o(n.getNLSValue(e))}):o(n.getNLSValue("Error.ProcessNotSet.Message"))})}}}}),define("DS/DELPPRData/Buildup/DynamicBuildupOnCloud",["UWA/Core","DS/DELPPRData/Buildup/BaseBuildup","DS/DELPXPProcessBuildUp/DELPXPProcessBuildUpAPI","DS/DELPXPMfgModelers/DELPXPMfgModelersAPI","DS/DELPPRData/WebService","DS/DELWebViewerUtils/Utils","DS/DELPPRData/Buildup/BuildUpSessionManager"],function(e,t,n,i,r,o,s){"use strict";return function(a,u){var l=new s(u),c=u.getOption("logger"),d=new n.DELPXPBuildUpParams,p=new t(a,u);return d.setDiffOperator(!0),d.setPositionSolver(!0),Object.assign({},p,{initialize:function(t){var n=this.getProcessInfo(),s=this.getPayload(t);return c.debug("DynamicBuildupOnCloud::initialize method invoked with parameters : ",t),e.Promise.all([this.getBuildUpContext(s),function(){let e=`${o.get3DSpaceUrl()}/resources/v1/delviewerservices/private/invoke/initBuildup`;return r.request({url:e,method:"POST",dataType:"json",payload:s})}()]).then(async function(t){let r,o,s;return e.is(t,"array")&&t.length>0&&(s=JSON.stringify(t[1]),r=await l.create(),o=i.GetMfgModelers(r.session),n.sesssionId=r.id,c.debug(`DynamicBuildupOnCloud::initialize build up using ${s}`),await o.load(s),c.debug("DynamicBuildupOnCloud::Build up initialized")),r})},getBuildUp:async function(t){let i,r,o,s=t||{},a=t.id,u=t.scopedMfg&&t.scopedMfg.id?t.scopedMfg.id:null,c=s.session&&s.session.id?s.session.id:null,p=s&&e.is(s.path,"array")?s.path:[],f=l.getNodeSessionInstance(c);f||(f=(await l.create(c)).session),o=n.GetProcessBuildUpAPI(f),i=new n.DELPXPBuildUpSelection([p],a,u,"");try{r=await o.queryBuildUpSelection(i,d)}catch(e){throw l.remove(c),e.code="DELVIEWER_E003",e}return this.parseBuildupContent(r,t.context)},reset:function(){l.reset(),p.reset()}})}}),define("DS/DELPPRData/BuildUpModelService",["UWA/Core","DS/DELPPRData/WebService","DS/DELWebViewerUtils/Utils","DS/DELPPRData/Buildup/DynamicBuildupOnCloud","DS/DELPPRData/Buildup/DynamicBuildupOnPremise","DS/DELPPRData/Buildup/PublishedBuildup"],function(e,t,n,i,r,o){"use strict";return function(e,t){var s,a=t.getOption("dynamicBuildUp"),u=[],l=t.getOption("eventCollection").getViewerCtrlEventHnd(),c=function(){var a=t.getOption("dynamicBuildUp")?n.isCloud()?i:r:o;return s=null,new a(e,t)},d=function(e){t.getOption("dynamicBuildUp")!==a&&(s=c(),a=e.data.dynamicBuildUp)};return function(){if(l){let e=[{name:l.events.onUpdateOptions,callback:d,handler:l}];for(let t of e)u.push({handler:t.handler,token:t.handler.subscribe(t.name,t.callback)})}}(),s=c(),{getBuildUpSettings:function(e){return s.getBuildUpSettings(e)},initialize:async function(e){return await s.initialize(e)},set:e.set,get:e.get,updateBuildUpSettings:async function(e={}){let n,i={...e,persistBuildUpSettings:t.getOption("persistBuildUpSettings")};return n=await s.updateBuildUpSettings(i)},reset:function(){s&&s.reset()},destroy:function(){this.reset()},getMFGAndResourcePaths:function(){return s.getMFGAndResourcePaths()},getBuildUp:function(e){return s.getBuildUp(e)},getBuildUpGlobalSettings:function(e){let t;return s&&(t=s.getBuildUpGlobalSettings(e)),t},setBuildUpGlobalSettings:function(e){s&&s.setBuildUpGlobalSettings(e)},getProcessInfo:function(){let e;return s&&(e=s.getProcessInfo()),e},isObjectAvailable:function(e){return s.isObjectAvailable(e)}}}}),define("DS/DELPPRData/ModelFactory",["UWA/Core","DS/DELPPRData/DataManager"],function(e,t){"use strict";return function(n){var i,r={},o="ModelService",s={BuildUpBehavior:"DS/DELPPRData/BuildUpModelService",WorkInstructionBehavior:"DS/DELPPRData/WKIModelService"};return{getCreatePromise:function(a){return new e.Promise(function(u){var l,c={};i=e.is(a,"array")&&a.length>0?new t(n):null,l=[null,i,n].concat(Array.prototype.slice.call(arguments,1)),e.is(a,"array")&&a.length>0?(a.forEach(e=>{s[e]&&(c[e]=s[e])}),require(Object.values(c),function(){var e=Array.prototype.slice.call(arguments),t=Object.keys(c);e.length>0&&e.forEach(function(e,n){r[t[n]+o]=new(Function.prototype.bind.apply(e,l))}),u(r)})):u(r)})},getInstance:function(e){return e&&r[e]?r[e]:null},getDataManager:function(){return i},destroy:function(){i&&i.destroy(),r=o=i=null}}}}),define("DS/DELPPRData/ModelInterface",["UWA/Core","DS/DELPPRData/ModelFactory","DS/DELPPRData/WebService","DS/DELWebViewerUtils/Utils","DS/DELWebViewerUtils/DELWebViewerSettingsMgt","text!DS/DELPPRData/assets/json/DrillPayloads.json","text!DS/DELPPRData/assets/json/Webservices.json"],function(e,t,n,i,r,o,s){"use strict";return function(a){var u="resourceid",l="ds6w:label",c="ds6w:type",d="matrixtxt",p="ds6w:globalType",f="Path",g="ds6w:Instance",P="boundingbox",D="taxonomies",h="resultingProductLink",E="pathsr",S="DELFmiProcessOutputPrereqMaterializationCnx",U=Object.freeze({PROCESS:"PROCESS",RESOURCE:"RESOURCE",PRODUCT:"PRODUCT",MBOM:"MBOM"}),y=Object.freeze({DELLmiPPRSystemReference:U.PROCESS,DELFmiFunctionReference:U.MBOM,"interfaces/Resource":U.RESOURCE,VPMReference:U.PRODUCT,DELLmiHeaderWorkPlanReference:U.PROCESS}),b=new t(a),m=a.getOption("logger");return{getCreatePromise:function(e){return b.getCreatePromise(e)},getInstance:function(e){return b.getInstance(e)},getOperationPath:function(t){var n=b.getDataManager();return n?n.getOperationPath(t):e.Promise.reject(a.getNLSValue("Error.DataManagerNotFound.Message"))},getIndexingDate:function(t){var o={select_service:[t]};return new e.Promise(function(e,t){var s=r.getSetting("pad_security_ctx")?r.getSetting("pad_security_ctx"):"preferred",a=`${i.get3DSpaceUrl()}/cvservlet/indexingdate?SecurityContext=${s}`;n.request({url:a,method:"POST",dataType:"json",payload:o}).then(function(t){e(t)}).fail(t)})},getProgressiveExpandData:function(t){var r=i.get3DSpaceUrl()+"/cvservlet/progressiveexpand/v2?output_format=cvjson";return new e.Promise(function(e,i){n.request({url:r,method:"POST",dataType:"json",payload:t}).then(function(t){e(t)}).fail(i)})},getInstallContext:function(t){var r,o,u,l=JSON.parse(s).getMfgItemInstallDependencies;if(a&&t.installPath&&t.installPath.length>1){o=t.installPath[0],u=t.installPath[1];let s=`${i.get3DSpaceUrl()}${l.url}`,c=l.method,d=l.payload;d.assemblyid=o,d.installinstids=[u],t.filter&&(d.config=i.getObjectHavingProperty(t.filter,"config_filter")),r=n.request({url:s,method:c,dataType:"json",payload:d}).then(t=>{let n;return t&&(t.status&&m.error(JSON.stringify(t)),n=t[u]),n||e.Promise.reject(a.getNLSValue("Error.WebServiceCallFailed.Message"))})}else r=e.Promise.reject(a.getNLSValue("Error.InvalidInput.Message"));return r},getAttributeForIds:function(t,r,o){var s,a,u=function(t,r,o){return new e.Promise((s,a)=>{n.request({url:i.get3DSpaceUrl()+"/cvservlet/fetch/v2",method:"POST",dataType:"json",payload:function(e,t,n){return{label:"DrillAttributes-"+Date.now(),physicalid:e,locale:"en",select_predicate:t,select_file:n}}(t,r,o)}).then(function(t){t&&e.is(t.error)?a(t.error.errorMessage):s(t)}).fail(function(e){a(e)})})},l=[],c=[];return e.is(t,"array")&&e.is(r,"array")?new e.Promise(function(n,i){if(t.length>1e4)for(s=0,a=t.length;s<a;s+=1e4)l=t.slice(s,s+1e4),c.push(u(l,r,o));else c.push(u(t,r,o));e.Promise.all(c).then(function(t){var i={};t.forEach(t=>{Object.assign(i,function(t){var n="string"==typeof t?JSON.parse(t).results:t.results,i={};return e.is(n,"array")&&n.forEach(t=>{var n=null,r={};e.is(t.attributes,"array")&&(t.attributes.forEach(t=>{"resourceid"===t.name?n=t.value:r[t.name]?(e.is(r[t.name],"array")||(r[t.name]=[r[t.name]]),r[t.name].push(t.value)):r[t.name]=t.value}),i[n]=r)}),i}(t))}),n(i)}).fail(i)}):e.Promise.reject("Invalid Input Provided")},getTaxonomies:function(t){return this.getAttributeForIds(t,["taxonomies"]).then(function(t){var n={};if(t)for(let i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]&&e.is(t[i].taxonomies,"array")?t[i].taxonomies.join("/"):t[i].taxonomies);return n})},getPPRType:function(t){var n;if(t){t=e.is(t,"array")?t.join("/"):t;for(const e of Object.keys(y))if(t.contains(e)){n=y[e];break}}return n},getDrillData:function(t){var n=this,i=JSON.parse(o),r=function(e,t,n){return e.batch.expands[0].root.physical_id=t,n&&(e.batch.expands[0].filter={and:{filters:[n]}}),e};return t&&t.id?new e.Promise((o,s)=>{e.Promise.all([function(e){return n.getProgressiveExpandData(r(i.drills,e,t.filter))}(t.id),function(e){return n.getProgressiveExpandData(r(i.resultingProduct,e,t.filter))}(t.id)]).then(function(t){var n,i,r=(n=t[0],i={references:{},instances:{},paths:[]},n&&e.is(n.results,"array")&&n.results.forEach(e=>{e[f]?i.paths.push(e[f]):e[p]===g?i.instances[e[u]]={instanceId:e[u],label:e[l],type:e[c],matrixtxt:e[d]?e[d]:null,pathsr:e[E]?e[E]:""}:i.references[e[u]]={referenceId:e[u],label:e[l],type:e[c],taxonomies:e[D],boundingbox:e[P]}}),i),s=function(t,n){var i=[];return t&&e.is(t.results,"array")&&t.results.forEach(e=>{e[p]===g&&e[c]===S&&n.references[e.from]&&(n.references[e.from][h]=!0,i.push(e.from))}),i}(t[1],r),a=function(t,n){var i={resultingProductDrillPaths:[],drillPaths:[]};return e.is(t,"array")&&t.length>0&&t.forEach(function(e){-1!==n.indexOf(e[e.length-1])?i.resultingProductDrillPaths.push(e):i.drillPaths.push(e)}),i}(r.paths,s);o(e.merge(r,a))}).fail(s)}):e.Promise.reject("Invalid Input Provided")},getRequirements:async function(e){let t=JSON.parse(s).getRequirements;return t.payload.input_physical_ids=e,t.url=i.get3DSpaceUrl()+t.url,await n.request(t)},getDataManager:function(){return b.getDataManager()},reset:function(){var e=this.getDataManager();e&&e.reset()},destroy:function(){b&&b.destroy(),b=null}}}});