define("DS/MIBListOfThingsWidget/MIBListOfThingsDataGridView",["UWA/Core","UWA/Controls/Abstract","DS/TreeModel/TreeDocument","DS/TreeModel/TreeNodeModel","DS/DataGridView/DataGridView","DS/Windows/ImmersiveFrame","DS/Utilities/UUID","css!DS/MIBListOfThingsWidget/MIBListOfThingsWidget"],function(e,t,i,n,o,s,a,r){"use strict";return t.extend({defaultOptions:{idName:"dgvContainerLOT"},context:{},model:null,dataGridView:null,init:function(e){this._parent(e),this.context=e.context,this.buildSkeleton(e.branches,e.list_of_things,e.selected_branchiter)},buildSkeleton:function(e,t,r){var c=this.options;this.model=new i;var l=this.model,d=[];e.forEach(e=>{e.iterations.forEach(t=>{d.push({branch:e.branch,uuid:e.uuid,iter:t})})}),l.prepareUpdate(),t.forEach(e=>{var t={};t.id=e.id,t.label=e.Title,t.physicalid=e.physicalid,t.selected_physicalid=e.selected_physicalid,t.type=e.type,t.name=e.name,t.description=e.description,t.contentid=e.contentid,t.branchid=e.branchid,d.forEach(i=>{var n=i.branch,o=i.iter;e[n+"/"+o]&&(t[n+"_"+o]=!0)});var i=new n({label:t.label,grid:t});e.selected_physicalid&&i.updateOptions({color:"blue"}),l.addRoot(i)}),l.pushUpdate();var h=[{text:"Physicalid",dataIndex:"physicalid",sortableFlag:!1,width:"250px"},{text:"Content Id",dataIndex:"contentid",sortableFlag:!0,width:"250px"},{text:"Type",dataIndex:"type",sortableFlag:!0,width:"auto"},{text:"Name",dataIndex:"name",sortableFlag:!1,width:"auto"},{text:"Title",dataIndex:"label",sortableFlag:!1,width:"200px"},{text:"Description",dataIndex:"description",sortableFlag:!1,width:"auto"}];d.forEach(e=>{var t=e.branch,i=e.branchid,n=e.iter,o=r==t+"/"+n;h.push({text:t+" ("+n+")"+(o?" ***":""),dataIndex:t+"_"+n,branchid:i,iter:n,sortableFlag:!0,width:"auto",typeRepresentation:"boolean"})});this.dataGridView=new o({treeDocument:l,columns:h,cellDragEnabledFlag:!0,onDragStartCell:function(e,t){var i=t.draggedNodes,n=h[t.columnID],o=[];i.forEach(function(e){var t=e.options.grid,i={envId:"undefined"!=typeof widget&&widget.getValue("x3dPlatformId")?widget.getValue("x3dPlatformId"):"OnPremise",serviceId:"3DSpace",contextId:void 0,objectId:"cid:"+t.contentid+"/"+t.branchid+"/"+n.iter,objectType:t.type,displayName:t.name,displayType:t.type};o.push(i)});t.nodeModel;var s={protocol:"3DXContent",version:"1.1",source:a.v4(),widgetId:"undefined"==typeof widget?a.v4():widget.id,data:{items:o}};return e.dataTransfer.setData("Text",JSON.stringify(s)),e.stopPropagation(),!1},identifier:this.options.identifier});var u=this.dataGridView;this.myOnCellRequest=function(e,t){u.defaultOnCellRequest(e)},u.rowSelection="none",u.cellSelection="single";var g=new s;g.setContentInBackgroundLayer(u.getContent()),g.reactToPointerEventsFlag=!1;var f=UWA.createElement("div",{id:c.idName});g.inject(f),this.elements.container=f}})}),define("DS/MIBListOfThingsWidget/MIBListOfThingsWidget",["DS/MIBListOfThingsWidget/MIBListOfThingsDataGridView","css!DS/MIBListOfThingsWidget/MIBListOfThingsWidget","i18n!DS/MIBListOfThingsWidget/assets/nls/MIBListOfThingsWidgetNls","i18n!DS/LifecycleWidget/assets/nls/LifecycleWidgetNls","DS/LifecycleServices/LifecycleCommandManager","DS/LifecycleServices/LifecycleServices","DS/LifecycleServices/LifecycleServicesSettings","DS/WAFData/WAFData","UWA/Controls/Abstract","DS/LifecycleServices/LifecycleAlert"],function(e,t,i,n,o,s,a,r,c,l){"use strict";return c.extend({init:function(e,t,i){this._parent(i),this.context={},this.securityCtx=null,this.tenant=null,this.id=i.id||"",this.container=UWA.createElement("div",{class:"miblot_container"}),this.content=UWA.createElement("div",{class:"miblot_content"}),this.content.inject(this.container);var n=this,o=new Promise((e,t)=>{a.app_initialization(function(){n.tenant=a.getTenant();var t=a.getOption("platform_services",null);null!=t&&t.length>0&&Array.isArray(t)&&t.forEach(function(t){null!=t&&t.hasOwnProperty("platformId")&&s.getSecurityContextList(t.platformId,function(){n.getSecurityContext=s.getSecurityContextForCollaborativeSharingCommands,e()})})})});Promise.all([o]).then(()=>{console.log("app_initialization done")}).catch(function(e){n._setEndWaitingResponse(),console.log("app_initialization failed:"),n.showError(e),n._onComplete()})},_onComplete:function(){},refresh:function(){this.executeCmd([])},executeCmd:function(e,t){t||(t=function(){}),this._onComplete=t;var i=this;if(null==e&&(e=this.previous_selection),null==e&&(e=[]),this.previous_selection=e,this.content.empty(),0!=e.length){if(1!=e.length)return i.showNotification("only one object selection is accepted"),void i._onComplete();i.selectedobject=null,e.forEach(function(e){e.hasOwnProperty("objectId")&&""!=e.objectId&&(i.selectedobject={objectId:e.objectId})});var n=new Promise(e=>{e()});UWA.Promise.all([n,(()=>new Promise((e,t)=>{if("function"==typeof this.context.getSecurityContext){var n=this.context.getSecurityContext();i.securityCtx=n.SecurityContext,e()}else s.getSecurityContextPromise(this.tenant).then(function(t){i.securityCtx=t,e()}).catch(function(e){t(e)})}))()]).then(()=>{i._setWaitingResponse(),i._getLotData(function(){i._showLotdata()})}).catch(function(e){i._setEndWaitingResponse(),i.showError(e),i._onComplete()})}else i._onComplete()},_getLotData:function(e){var t=this;console.log("MIBListOfThingsWidget _getLotData");var i=a.get3DSpaceWSUrl(this.tenant,"/resources/lifecycle/mibdebugws/listofthings",null),o=a.getHeaders(encodeURIComponent(t.securityCtx)),c={objectId:t.selectedobject.objectId};r.authenticatedRequest(i,{method:"POST",type:"json",headers:o,timeout:6e5,data:JSON.stringify(c),onComplete:function(i){t._setEndWaitingResponse(),console.log("MIBListOfThingsWidget _getLotData server request: Complete");var n=null;i.hasOwnProperty("status")&&(n=i.status),null!=n&&"success"==n?(t.selected_object=i.selected_object,t.selected_module=i.module,t.branches=i.branches,t.list_of_things=i.list_of_things,t.selected_branchiter=i.selected_branchiter,e()):(console.log("MIBListOfThingsWidget _getLotData failed"),t.showError("failed"),t._onComplete())},onFailure:function(e,i){t._setEndWaitingResponse(),console.log("MIBListOfThingsWidget _getLotData server request: Failure..."+e),t.showError(s.parseWebServiceError(e,i)),t._onComplete()},ontimeout:function(){t._setEndWaitingResponse(),console.log("MIBListOfThingsWidget _getLotData server request: Timeout"),t.showError(n.timeout),t._onComplete()}})},_showLotdata:function(){var t=this.content;this.dgvContainer=new e({identifier:"dgvContainerLOT"+this.id,idName:"dgvContainerLOT",branches:this.branches,list_of_things:this.list_of_things,selected_branchiter:this.selected_branchiter}),this.dgvContainer.inject(t),this.dispatchEvent("onResultDisplayed")},_setWaitingResponse:function(){void 0!==this.widget&&null!==this.widget?this.widget.body.style.cursor="wait":document.body.style.cursor="wait"},_setEndWaitingResponse:function(){void 0!==this.widget&&null!==this.widget?this.widget.body.style.cursor="default":document.body.style.cursor="default"},showNotification:function(e){var t={eventID:"primary",msg:e};l.displayNotification(t),console.log(e)},showError:function(e){var t={eventID:"error",msg:e};l.displayNotification(t),console.log(e)},showSuccess:function(e){var t={eventID:"success",msg:e};l.displayNotification(t),console.log(e)}})});