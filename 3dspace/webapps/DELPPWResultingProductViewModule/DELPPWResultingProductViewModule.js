define("DS/DELPPWResultingProductViewModule/ResultingProductViewUI",["UWA/Core"],function(e){"use strict";return function(t,n,o,i,r){var a,d,c,l,s=i.getComponent("WUXDockAreaEnum"),u=i.getComponent("WUXFrameWindowsManager").getFrameWindow(t.getAppContext()).getImmersiveFrame();return a=function(a,u){var g=t.getElement(),f=i.createElement("div",{class:"tree-list-container"}),h=e.is(r)?r.getIconURLFromKey(u):"";f.inject(g),l=r.getNLSValue("View."+a+".Title")||"",n.loadDocument(o.getWUXNodeModel()),n.getContent().inject(f),(d=i.create("Panel",{position:{at:"right"},minWidth:300,minHeight:250,height:250,title:l,icon:h,side:s.RightDockArea,currentDockArea:s.RightDockArea,identifier:"panel-"+c,content:g,resizableFlag:!0,closeButtonFlag:!0,useBordersFlag:!0,visibleFlag:!1,collapsibleFlag:!0,verticallyStretchableFlag:!1})).close=function(){e.is(c)?t.notify("toggleCmdCheckHeaderState",{cmdName:c,cmdState:!1}):d.hide()}},{init:function(n,o,i){e.is(n,"string")?(c=n,a(o,i)):t.debug("ResultingProductViewUI","Command name is not defined to create action UI.")},destroy:function(){o.emptyNodeModel(),e.is(d)&&(d.destroy(),d=void 0)},toggle:function(t){var n;t.state&&!d.visibleFlag?(d.immersiveFrame=u,n=u.getDockingElement(d.currentDockArea),e.is(n)&&(n.collapseDockingZoneFlag=!1),d.show()):d.hide()},updateTitle:function(t){e.is(t)&&""!==t?d.title=l+" - "+t:d.title=l}}}}),define("DS/DELPPWResultingProductViewModule/ResultingProductViewModule",["UWA/Core","DS/DELPPWResultingProductViewModule/ResultingProductViewUI"],function(e,t){"use strict";return{behaviors:["TreeListViewBehavior","ProductImplementBehavior","WUXNodeModelBehavior","UXFactoryBehavior","LinkBehavior","ModelBehavior","SelectionBehavior","SearchBehavior","ResourceBehavior","ViewBehavior","TaggerBehavior"],creator:function(n,o,i,r,a,d,c,l,s,u,g,f){const h=["NONE","3D","3D-EIN","EIN"];var p,m,C,v,I,S=[],R=[],A=null,D=function(t){return!(!e.is(t)||!e.is(t.get))&&R.indexOf(t.get("type"))>-1},y=function(){return S.indexOf("PROCESS")>-1||S.indexOf("SERVICE")>-1||S.indexOf("CONSTRUCTION")>-1},E=function(t){var i={action:[],parameters:[]};e.is(t,"array")&&t.length>0?(t.forEach(function(e,t){i.action[t]="addRoot",i.parameters[t]={rootReferencePID:e.id}}),o.processDropEffect(i)):n.debug("No search results")},P=function(){var t,i,a=l.getSelections();r.emptyNodeModel(),e.is(a,"array")&&1===a[1].length?(i=a[1][0],e.is(i)?(A=i,t=c.getReferenceModel(i),e.is(t)?(m.updateTitle(t.get("PLMEntity.V_Name")),d.getConnectionsByModel(t,null,{silentMode:!0,onComplete:function(n){var i;e.is(A)&&Array.isArray(n)&&n.length>0&&(r.prepareUpdate(),n.forEach(function(n){if(D(n)&&n.get("from")===t.get("PID")&&(i=c.getReference(n.get("to")),e.is(i)&&!r.isNodeAdded(i.get("PID")))){const e=o.getReferenceNodeOptions(i);e.children=[],e.grid.RP_USAGE=function(e){if(!Array.isArray(e))return h.includes(e)?e:"3D";const t=e.filter(e=>h.includes(e));return Array.isArray(t)&&t.length>0?t[0]:"3D"}(n.get("V_usage")),e.grid.cellInfo={rpConnectionPID:n.get("PLM_ExternalID"),rpConnectionFakeID:n.get("PID")},v=r.addNodeModel(e);const t=!c.needToQueryForChildren(i);r.updateNodeState(v,t?"collapsed":"partiallyExpanded")}}),r.pushUpdate())},forceDBMode:d.isAuthoringMode()})):n.debug("Reference Model is empty for PID:"+i)):n.debug("No selection in mbom to load action view data.")):(A=null,m.updateTitle(""))};const N=function(t){if(e.is(t)&&e.owns(t,"data")&&e.owns(t.data,"nodeModel")){const i=t.data.nodeModel,a=i.getReferencePID(),d=c.getReference(a),l=function(){let t="";if(i.hasChildren())t="expanded";else{const n=c.getInstancesFromCollection(a);e.is(n,"array")&&n.length>0?(n.forEach(e=>{const t=c.getReferenceModel(e.get("PID")),n=o.getReferenceNodeOptions(t);n.children=[],n.instancePID=e.get("PID");const a=r.addNodeModel(n,i);r.updateNodeState(a,"noChildren")}),t="expanded"):t="noChildren"}i.preExpandDone(),r.updateNodeState(i,t)};if(c.needToQueryForChildren(d)){const e=function(){n.warn(u.getNLSValue("Error.ExpandFailed.Title")),d.setAdditionalInfo({queriedForChildren:!1}),r.updateNodeState(i,"partiallyExpanded")},t={ordered:!1,context:this,doNotExpand:!0,onFailure:e,onTimeout:e,onCancel:function(){n.warn(u.getNLSValue("Info.ExpandCanceled.Title")),d.setAdditionalInfo({queriedForChildren:!1}),r.updateNodeState(i,"partiallyExpanded")}};c.getDescendantsFromServer(d.get("PID"),l,t)}else l()}},M=function(t){if(e.is(t)&&e.owns(t,"data")&&e.owns(t.data,"nodeModel")){const e=t.data.nodeModel;r.updateNodeState(e,"collapsed")}};return{listenTo:function(){return{referenceChanged:this.onChangeIRPC,connectionAdded:this.onAddConnection,connectionChanged:this.onChangeIRPC,connectionRemoved:this.onRemoveConnection,select:this.reloadUI,AlternateBL:this.onAlternateBL,CapableResourceBL:this.onCapableResourceBL,ActionRemove:this.onActionRemove,SearchAndAddCommand:this.onSearchAndAddCommand,refreshImpacted:this.reloadUI}},onStart:function(e){var i;S=(e=e||{}).pprTypes,R=e.linkTypes,p=e.relatedCmdId,C=e.moduleIcon,i=u.getNLSValue(p),(m=new t(n,o,r,a,u)).init(p,i,C),m.toggle({state:!0}),I=r.getWUXNodeModel(),r.removePreExpandListener(),I.onPreExpand(N),I.onPreCollapse(M),P()},onStop:function(){e.is(m)&&(m.destroy(),m=void 0),A=null},onBLCommands:function(t,n,o){var i,r=l.getSelections();e.is(r,"array")&&r.length>0&&1===r[1].length&&(i={url:t,method:"POST",context:this,onComplete:n,onFailure:o,data:e.Json.encode({pid:r[1]})},d.webServiceRequest(i))},onAlternateBL:function(){var e=this;e.onBLCommands("dsmfg/private/V0/invoke/getalternatefrombl",function(t){0===t.referenceIDS.length?n.warn(u.getNLSValue("AlternateBL.Info.Empty")):s.activate("Alternate search",E.bind(e),[],t.referenceIDS)},function(e){n.debug(e),n.warn(u.getNLSValue("AlternateBL.Error.Failure"))})},onCapableResourceBL:function(){var e=this;e.onBLCommands("dsmfg/private/V0/invoke/getResourcesFromBL",function(t){0===t.resourceIDS.length?n.warn(u.getNLSValue("CapableResourceBL.Info.Empty")):s.activate("Capable resource search",E.bind(e),[],t.resourceIDS)},function(e){n.debug(e),n.warn(u.getNLSValue("CapableResourceBL.Error.Failure"))})},onSearchAndAddCommand:function(){y()?s.activate(u.getNLSValue("InContextSearch.MBOM.Title"),E.bind(this)):S.indexOf("RESOURCE")>-1&&s.activate(u.getNLSValue("InContextSearch.EBOM.Title"),E.bind(this))},onActionRemove:function(){var t,o,i=l.getSelections();e.is(i,"array")&&i[0].length>0&&e.is(1===i[1].length)&&(o=c.getReferenceModel(i[1]),d.getConnectionsByModel(o,null,{onComplete:function(n){if(e.is(n,"array")&&n.length>0)for(t=0;t<i[0].length;t++)n.forEach(function(e){e.get("to")===i[0][t]&&d.deleteConnection(e.get("PID"))})},onFailure:function(){n.debug("Getting connections failed")}}))},onChangeIRPC:function(t){var n;t=Array.isArray(t)?t:[t],n=l.getSelections(),e.is(n,"array")&&n.length>0&&1===n[1].length&&r.withTransactionUpdate(function(){t.forEach(function(e){y()&&r.updateAttributes(e)})})},onAddConnection:function(t){var n=function(t){var n,o,i,a;D(t)&&(i=t.get("to"),n=l.getSelections(),e.is(n,"array")&&1===n[1].length&&(o=c.getReferenceModel(n[1][0]),e.is(o)&&o.get("PID")!==i&&(a=c.getReferenceModel(i),e.is(a)&&(r.isNodeAdded(a.get("PID"))||r.addNode(a,{loadChildren:!1})))))};e.is(t,"array")?t.forEach(function(e){n(e)}):n(t)},onRemoveConnection:function(t){var n=[],o=Array.isArray(t)?t:[t];r.withTransactionUpdate(function(){o.forEach(function(t){var o,i=t.get("to");D(t)&&(o=c.getReferenceModel(i),e.is(o)&&n.push(o.get("PID")))}),n.length>0&&r.removeNodes(n)})},reloadUI:function(t){e.is(t)&&P()}}}}});