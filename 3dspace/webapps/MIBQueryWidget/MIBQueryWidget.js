define("DS/MIBQueryWidget/DataGridViewForMIBQuery",["UWA/Controls/Abstract","DS/TreeModel/TreeDocument","DS/TreeModel/TreeNodeModel","DS/DataGridView/DataGridView","DS/Windows/ImmersiveFrame","DS/Utilities/UUID","css!DS/MIBQueryWidget/DataGridViewForMIBQuery"],function(t,e,i,n,o,r){"use strict";return t.extend({defaultOptions:{idName:"dgvContainerMIBQuery"},model:null,init:function(t){if(this._parent(t),this.buildSkeleton(t.data),this.options=t,t._po_exposed){this._po_exposed=t._po_exposed;var e=this;this._po_exposed.getRows=function(){var t=[];e.model&&e.model.getRoots().forEach(e=>{var i=e.options.grid,n={objectId:i.objectId,title:i.Title,owner:i["branch.owner"]},o=i["branch.originated"];if(o){let t=new Date(o);"Invalid Date"===t.toString()?console.log("invalid date returned from server: "+t):n.originated=t}t.push(n)});return t},this._po_exposed.setSelectedRow=function(t){var i=e.model.getRoots(),n=e.dataGridView.getNodesXSO();n.empty(),i.forEach(i=>{i.options.grid.objectId===t&&(n.add(i),e.dataGridView.ensureNodeModelVisible(i))})}}},getSelected:function(){return null!=this.model?this.model.getSelectedNodes():null},buildSkeleton:function(t){var a=this,s=this.options;this.model=new e;var d=this.model,l=[];t.forEach(function(t){var e=JSON.parse(JSON.stringify(t)),i=e.fullcontenturl;if(void 0!==i){const t=i.split("/");3==t.length&&(e.iteration=t[2])}var n=void 0;e.contenturl&&(n=e.contenturl.substring("cid:".length)),e.contenturl=n,e.options&&e.options.icons&&e.options.icons.length>0&&(e.icon=a.options.startOfURL+e.options.icons[0]);var o=e["attribute[XCADExtension.V_CADFileOrigin]"];void 0!==o&&o.length>0&&(e.cadorigin=o),void 0!==(o=e["attribute[XCADExtension.V_CADOrigin]"])&&o.length>0&&(e.cadorigin=o),e["attribute[PLMEntity.V_Name]"]?e.Title=e["attribute[PLMEntity.V_Name]"]:e["attribute[Title]"]&&(e.Title=e["attribute[Title]"]),l.push(e)}),d.prepareUpdate(),l.forEach(function(t){var e=new i({label:t.Text,grid:t});d.addRoot(e)}),d.pushUpdate();var u=!1;l.forEach(function(t){t.sandbox&&(u=!0)});var c=[{dataIndex:"icon",width:"20px",typeRepresentation:"icon",visibleFlag:!1},{text:"Title",dataIndex:"Title",width:"auto"},{text:"Type",dataIndex:"displayType",width:"auto"},{text:"Name",dataIndex:"name",width:"auto"},{text:"Revision",dataIndex:"branch",width:"auto"},{text:"Revision Comment",dataIndex:"branch.description",width:"auto",visibleFlag:!1},{text:"sandbox",dataIndex:"sandbox",width:"auto",visibleFlag:u,typeRepresentation:"boolean"},{text:"Maturity",dataIndex:"branch.current",width:"auto"},{text:"Owner",dataIndex:"branch.owner",width:"auto"},{text:"Collab Space",dataIndex:"branch.project",width:"auto"},{text:"Organization",dataIndex:"branch.organization",width:"auto"},{text:"Created",dataIndex:"branch.originated",width:"auto",typeRepresentation:"datetime"},{text:"Modified",dataIndex:"branch.modified",width:"auto",typeRepresentation:"datetime",visibleFlag:!1},{text:"CAD",dataIndex:"attribute[XCADExtension.V_CADOrigin]",width:"auto",visibleFlag:!1},{text:"Description",dataIndex:"attribute[PLMEntity.V_description]",width:"auto"},{text:"Module",dataIndex:"module",width:"auto",visibleFlag:!1},{text:"Branch UUID",dataIndex:"branch.uuid",width:"auto",visibleFlag:!1},{text:"Object Id",dataIndex:"objectId",width:"auto",visibleFlag:!1},{text:"Content Id",dataIndex:"contenturl",width:"auto",visibleFlag:!1},{text:"Full Content Id",dataIndex:"fullcontenturl",width:"auto",visibleFlag:!1}];this.dataGridView=new n({treeDocument:d,columns:c,cellDragEnabledFlag:!0,onDragStartCell:function(t,e){var i=e.draggedNodes,n=[];i.forEach(function(t){var e=t.options.grid,i={envId:"undefined"!=typeof widget&&widget.getValue("x3dPlatformId")?widget.getValue("x3dPlatformId"):"OnPremise",serviceId:"3DSpace",contextId:void 0,objectId:e.objectId,objectType:e.type,displayName:e.Title,displayType:e.displayType};n.push(i)});var o={protocol:"3DXContent",version:"1.1",source:r.v4(),widgetId:"undefined"==typeof widget?r.v4():widget.id,data:{items:n}};return t.dataTransfer.setData("Text",JSON.stringify(o)),t.stopPropagation(),!1},identifier:this.options.identifier});var p=this.dataGridView;p.rowSelection="multiple",p.cellSelection="single";var h=new o;h.setContentInBackgroundLayer(p.getContent()),h.reactToPointerEventsFlag=!1;var g=UWA.createElement("div",{id:s.idName});h.inject(g),this.elements.container=g}})}),define("DS/MIBQueryWidget/MIBQueryWidget",["css!DS/MIBQueryWidget/MIBQueryWidget","UWA/Controls/Abstract","DS/ENO6WPlugins/jQuery","i18n!DS/LifecycleWidget/assets/nls/LifecycleWidgetNls","i18n!DS/MIBQueryWidget/assets/nls/MIBQueryWidgetNls","DS/LifecycleServices/LifecycleServices","DS/WAFData/WAFData","DS/Controls/Button","DS/Controls/LineEditor","DS/MIBQueryWidget/DataGridViewForMIBQuery","DS/LifecycleServices/LifecycleAlert"],function(t,e,i,n,o,r,a,s,d,l,u){"use strict";return e.extend({init:function(t,e,n){this.context={},this.securityCtx=null,this.tenant=null,this.id=n.id||"",this.resultList=[],this.queryStringInput=null,this._parent(n),this.container=UWA.createElement("div",{class:"mibquery_container"}),this.content=UWA.createElement("div",{class:"mibquery_content"}),this.content.inject(this.container),this._po_exposed={},i(this.content).data("_po_exposed",this._po_exposed);var o=this;this._getPlatformServices(void 0,function(t){console.log("_getPlatformServices("+JSON.stringify(t)+")"),o.tenant=t[0].platformId,o["3DSpaceURL"]=t[0]["3DSpace"];var e=o._get3DSpaceWSUrl(o.tenant,"/resources/pno/person/getsecuritycontext",null);a.authenticatedRequest(e,{type:"json",method:"GET",proxy:"passport",headers:o._getHeaders(),timeout:3e4,onComplete:function(t){o.securityContext="ctx::"+t.SecurityContext,console.log("app_initialization done ("+o.securityContext+")")},onFailure:function(t,e){console.log("getSecurityContext:Failure..."+t),o._setEndWaitingResponse(),console.log("app_initialization failed"),o.showError("initialization failed"),o._onComplete()},ontimeout:function(){console.log("getSecurityContext: A connection timeout occurred."),o._setEndWaitingResponse(),console.log("app_initialization failed"),o.showError("initialization failed"),o._onComplete()}})})},refresh:function(){this.executeCmd()},_onComplete:function(){},executeCmd:function(t){t||(t=function(){}),this._onComplete=t,this._showQueryPanel()},_getPlatformServices:function(t,e,i){require(["DS/i3DXCompassServices/i3DXCompassServices"],function(n){t&&""!==t||(t=widget.getValue("PlatFormInstanceId")),t&&""!==t||(t=void 0),n.getPlatformServices({platformId:t,onComplete:e,onFailure:i})})},_get3DSpaceWSUrl:function(t,e,i){var n=this["3DSpaceURL"]+e+(e.indexOf("?")<0?"?":"&")+"tenant="+t;return null!=i&&null!=i&&(n=n+"&"+i),n},_getHeaders:function(t){var e={Accept:"application/json","Content-Type":"application/json"};return t&&(e.SecurityContext=t),e},_setWaitingResponse:function(){void 0!==this.widget&&null!==this.widget?this.widget.body.style.cursor="wait":document.body.style.cursor="wait"},_setEndWaitingResponse:function(){void 0!==this.widget&&null!==this.widget?this.widget.body.style.cursor="default":document.body.style.cursor="default"},_showQueryPanel:function(){var t=this,e=this.content;e.empty();var i=null;(i=UWA.createElement("div",{class:"mibquery-query_div"})).inject(e),new UWA.Element("text",{text:o.Query,class:"mibquery-query_title"}).inject(i),this.queryStringInput=new d({sizeInCharNumber:40,displayClearFieldButtonFlag:!0}),this.queryStringInput.getContent().addClassName("mibquery-query_editor"),this.queryStringInput.inject(i),i.style.marginLeft="10px";var n=new s;n.label="Go",n.inject(i),n.getContent().style.marginLeft="10px",n.getContent().addEventListener("buttonclick",function(){console.log(t.queryStringInput.value),t._query(t.queryStringInput.value)}),this.dispatchEvent("onReady")},_showResultPanel:function(){var t=this.content;t.empty();var e=this["3DSpaceURL"],i=this.resultList;new l({identifier:"dgvContainerMIBQuery"+this.id,idName:"dgvContainerMIBQuery",data:i,securityCtx:this.securityCtx,startOfURL:e,_po_exposed:this._po_exposed}).inject(t),this.dispatchEvent("onResultDisplayed")},_query:function(t){this._setWaitingResponse(),this.resultList=[];var e=this,i=new Promise(t=>{t()});Promise.all([i]).then(()=>e._queryRequest(t)).then(t=>{var i=null;return t.hasOwnProperty("results")&&(i=t.results),t.hasOwnProperty("status")&&"error"===t.status&&t.hasOwnProperty("report")?t:null===i||0===i.length?t:e._queryAttributesValue(i)}).then(t=>{e._setEndWaitingResponse(),e.resultList=[];var i=null;if(t.hasOwnProperty("results")&&(i=t.results),t.hasOwnProperty("status")&&"error"===t.status&&t.hasOwnProperty("report")){var o=t.report;o.length>0&&o[0].hasOwnProperty("message")&&e.showError(o[0].message),e._onComplete()}else null===i||0===i.length?(e.showError(n.objectNotFound),e._onComplete()):(e.resultList=i,e._showResultPanel())}).catch(function(t){e._setEndWaitingResponse(),e.showError(t),e._onComplete()})},_queryRequest:function(t){var e=this;return new Promise((i,o)=>{var s={query_string:t},d=e._get3DSpaceWSUrl(e.tenant,"/resources/lifecycle/mibws/mibquery2",null),l=e._getHeaders(e.securityContext);a.authenticatedRequest(d,{method:"POST",type:"json",headers:l,timeout:6e5,data:JSON.stringify(s),onComplete:function(t){i(t)},onFailure:function(t,e){console.log("MIBQueryWidget _query:Failure..."+t),o(r.parseWebServiceError(t,e))},ontimeout:function(){console.log("MIBQueryWidget _query: A connection timeout occured."),o(n.timeout)}})})},_queryAttributesValue:function(t){var e=this;return new Promise((i,o)=>{var s={data:[],attributes:["type","name","module","contenturl","fullcontenturl","branch","branch.uuid","branch.current","branch.project","branch.owner","branch.organization","branch.originated","branch.modified","branch.description","displayType","Title","attribute[PLMEntity.V_Name]","attribute[Title]","attribute[PLMEntity.V_description]"]};t.forEach(t=>{s.data.push({objectId:t.objectId})});var d=e._get3DSpaceWSUrl(e.tenant,"/resources/lifecycle/product/attributeList",null),l=e._getHeaders(e.securityContext);a.authenticatedRequest(d,{method:"POST",type:"json",headers:l,timeout:6e5,data:JSON.stringify(s),onComplete:function(t){i(t)},onFailure:function(t,e){console.log("MIBQueryWidget _queryAttributesValue:Failure..."+t),o(r.parseWebServiceError(t,e))},ontimeout:function(){console.log("MIBQueryWidget _queryAttributesValue: A connection timeout occured."),o(n.timeout)}})})},showError:function(t){var e={eventID:"error",msg:t};u.displayNotification(e),console.log(t)}})});