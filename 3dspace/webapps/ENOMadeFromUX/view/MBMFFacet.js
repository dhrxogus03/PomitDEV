define("DS/ENOMadeFromUX/view/MBMFFacet",["UWA/Core","UWA/Class","UWA/Controls/Abstract","DS/PlatformAPI/PlatformAPI","DS/EditPropWidget/facets/Common/FacetsBase","DS/SpecGridView/SpecGridView","DS/XSRCommonComponents/service/CommandsService","DS/ENOMadeFromUX/utils/MBMFUtils","DS/XSRCommonComponents/utils/TypeUtils","DS/ENOMadeFromUX/service/MBMFServiceProvider","DS/ENOMadeFromUX/model/MBMFItemModel","DS/XSRCommonComponents/components/XSpecDnD/DragDropUtil","DS/XSRCommonComponents/utils/XspecEvents","DS/XSRCommonComponents/utils/RequestUtil","DS/XSRCommonComponents/utils/XSRSearch","DS/XSRCommonComponents/utils/Notification","DS/XSRCommonComponents/utils/GridCommonActionsManager","DS/XSRCommonComponents/utils/Utils","DS/XSRCommonComponents/utils/XSRMask","DS/XSRCommonComponents/utils/Constants","DS/XSRCommonComponents/service/XSpecsMenuBuilder","DS/XSRCommonComponents/service/XSpecsActionsFactory","DS/XSRCommonComponents/utils/ItemServiceProvider","DS/ENOMadeFromUX/utils/PostSearchAction","DS/ENOMadeFromUX/controller/MBMFGridCol","DS/XSRCommonComponents/createform/view/TableForm","DS/XSRCommonComponents/createform/control/BOMCreateModel","DS/XSRCommonComponents/utils/RMCommonServiceProvider","DS/XSRCommonComponents/createform/view/NewDialog","text!DS/ENOMadeFromUX/assets/MBMFConfig/MBMFToolBarCommands.json","text!DS/ENOMadeFromUX/assets/MBMFConfig/MBMFColumnConfig.json","i18n!DS/ENOMadeFromUX/assets/nls/MadeFromUX","css!DS/ENOMadeFromUX/view/MBMFFacet.css"],function(e,t,n,i,o,a,s,r,d,l,c,m,M,p,u,h,g,f,C,b,F,v,D,y,B,I,S,_,E,N,A,w){"use strict";return t.extend(n,o,{init:function(t){if(this._parent(t),this.hasTabInstance=t.hasTabInstance,this._MBMFTabContainer=t._MBMFTabContainer,this.gridColumnControl=void 0,this.elements.container||(this.elements.container=e.createElement("div",{class:"xsr-mbmf"}),this.hasTabInstance&&this._MBMFTabContainer&&this.elements.container.setStyle("height","100%")),this.appId=t.appId?t.appId:widget.data.appId,this.appCore=this.options.appCore||this.options.appContext,null==this.appCore&&(this.appCore={}),this.appCore.contextAppId=this.appId,this.appId==b.XSR_APP_ID)this.modelEvents=this.appCore.specViewerModelEvents?this.appCore.specViewerModelEvents:this.appCore.basicModelEvents,this.itemID=t.itemId,this.itemModel=t.itemModel,this.itemTitle=this.itemModel?this.itemModel.getLabel():"",this.itemMaturity=this.itemModel?this.itemModel.getMaturity():"",this.appCore.specViewerModelEvents||(this.appCore.specViewerModelEvents=this.modelEvents);else{this.appCore={},this.modelEvents=new M,this.appCore.specViewerModelEvents=this.modelEvents,this.appCore.basicModelEvents=this.modelEvents;var n={};n.modelEvents=this.modelEvents,n.appContext=t.appContext,s.initialize(n),F.initialize(n),v.setOptions(n)}this.basicModelEvents=this.appCore.basicModelEvents,this.currentTabKey=b.FACET_MBMF,this.preferredView=b.GRID_VIEW,this._MBMFSubscriptionList=[],this._subscribeEvents()},_renderEmptyOrManyMsg:function(e){this.mbmfContainer&&this.mbmfContainer.empty(),this.elements.container.empty();let t=p.getTouchMode(),n=UWA.createElement("div",{class:"xsr-message-container"});"Many"==e&&n.addContent(w.Message_TooManyItems),t&&n.addClassName("xsr-mobile-font"),n.inject(this.elements.container)},_renderNoSupportMsg:function(){this.mbmfContainer&&this.mbmfContainer.empty(),this.elements.container.empty();var e=new UWA.Element("div",{class:"xsr-make-from-info"});UWA.createElement("div",{class:"xsr-blocking-icon wux-ui-3ds wux-ui-3ds-3x wux-ui-3ds-block"}).inject(e),new UWA.Element("h4",{class:"make-from-info-msg",html:w.label_NotSupported}).inject(e);e.inject(this.elements.container)},updateFacet:function(){var e=this;e.elements.container&&C.maskLoader(e.elements.container,w.UpdatingLoader),p.set3DSpaceURL().then(async function(){if(await p.setSecurityContext(),await p.setCSRFToken(),f.prepareRawMaterialSubtypes(),f.prepareUOMTypes(),f.preparePhysicalProductSubtypes(),e.MBMFService=new l,e.RMService=new _,e.appId!==b.XSR_APP_ID){let t=e.getModel();if(t.getMergingModels)return void e._renderEmptyOrManyMsg("Many");let n="relationship"===t.get("metatype"),i=t.get("selReferenceID");if(n&&void 0===i)return void e._renderNoSupportMsg();if(t){if(e.itemID=n?i:t.get("objectId"),"TRUE"===(await e.MBMFService.getAdditionalInfo([e.itemID])).result[0].hasDimension.toUpperCase())return void e._renderNoSupportMsg();let o=await e.MBMFService.fetchItemInfo([e.itemID]);e.itemModel=(new c).set(o[0],!1),e.itemTitle=e.itemModel.getLabel(),e.itemMaturity=e.itemModel.getMaturity()}}!e.mbmfContainer||e.mbmfContainer&&e.mbmfContainer.getChildren()&&0===e.mbmfContainer.getChildren().length?e._buildView():e.drawMBMFNodes()}).catch(function(e){console.err("Loading Make From is failed!!!",e)})},loadMBMFGrid:function(){var e=this,t=JSON.parse(N),n=r.getNLSLabels(t.actions),i=JSON.parse(A);e.gridColumnControl=r.getNLSLabels(i.columns),e.gridColumnControl=new B({colsObj:e.gridColumnControl,appId:e.appId});var o={itemId:e.itemID,container:e.mbmfContainer,appCore:e.appCore,currentTabKey:e.currentTabKey,enableCrossWidgetFeature:!0,isColorized:!0,parentModel:e.itemModel,dvgOpts:{}};o.dvgOpts.rowDragEnabledFlag=!1,e.MBMFGrid=new a(o),e.MBMFGrid.setColumns(e.gridColumnControl.getColumns()),e.MBMFGrid.render(),e.MBMFGrid.setToolBarActions({actions:n}),e.MBMFGrid.toolbar.disableCommands(["removeitem"]),e.MBMFGrid.getTreeDocument().onNodeModelUpdate(t=>{if(t.data.attributes){t.data.nodeModel.options.grid;t.data.attributes.hasOwnProperty("referenceName")&&(null==t.data.attributes.referenceName&&(t.data.nodeModel.options.grid.referenceName=""),e.updateReferenceList())}}),"Released"!=e.itemMaturity&&"Obsolete"!=e.itemMaturity||e.MBMFGrid.toolbar.disableCommands(["addMBMFItem","removeitem","addMBMFFPItem"])},updateReferenceList:function(){let e=this.MBMFGrid.getTreeDocument().getChildren().reduce((e,t)=>(null!=t.getAttributeValue("referenceName")&&""!==t.getAttributeValue("referenceName")&&e.add(t.getAttributeValue("referenceName")),e),new Set);this.gridColumnControl.setReferenceNameList([...e])},connectMaterialCheck(e,t){(t+=this.bomGridCombos.length)>1&&(e.connectCM=!1),this.parentHasCoreMat||1!=t||1!=e.coreMaterial.length?0==e.coreMaterial.length?(e.canConnectCM=!1,e.connectCM_Msg=w.childCMMsg):(e.canConnectCM=!1,e.connectCM_Msg=w.connectMultiCMMsg):e.canConnectCM=!0},_buildView:function(){this.elements.container.empty(),this.mbmfContainer=e.createElement("div",{class:"mbmf_container"}).inject(this.elements.container),this.hasTabInstance&&this.elements.container.inject(this._MBMFTabContainer),this.dnd=new m({modelEvents:this.modelEvents}),this.dnd.makeDroppable(this.mbmfContainer,"insertMbmfFacets"),this.appId===b.XSR_APP_ID&&(this.appCore.dndManager?this.appCore.dndManager.enableDragAndDropOnIDCard():(this.appCore.dndManager={},this.appCore.dndManager.enableDragAndDropOnMBMFFacet=this._enableDragAndDropOnMBMFFacet.bind(this))),this.loadMBMFGrid(),this.drawMBMFNodes()},_enableDragAndDropOnMBMFFacet:function(){let e=document.querySelector(this.mbmfContainer);e&&null!=e&&(this.dnd.cleanDroppable(e),this.dnd.makeDragable(e,[this.itemModel])),this.dnd.makeDroppable(this.mbmfContainer,"drop")},createProdGridFields(e,t,n){let i=[];return Array.isArray(e)?(e.forEach(e=>{let o=(new S).setModel(e);o.dimensionDB&&""!=o.dimensionDB||!t.has(o.id)||(o.dimension=t.get(o.id).nlsLabel,o.dimensionDB=t.get(o.id).dbName),n.has(o.id)&&(o.coreMaterial=[n.get(o.id)]),o.isMBMF=!0,i.push(o)}),i):i},getColumnDef:function(e){return{dataIndex:e.dbName,text:e.nlsLabel,typeRepresentation:"string",editableFlag:!1,forbiddenCheck:!1,allowUnsafeHTMLContent:!1,autoRowHeightFlag:!1,exportFlag:!0,visibleFlag:!0,disabled:!0}},drawMBMFNodes:function(){this.getMBMFNodes(this.itemID),this.checkAndApplyGrouping()},getCoreMatDetails:function(e){for(var t=this,n=[],i=0;i<e.length;i++)n.push(e[i].getID());if(n&&n.length>0){var o={};o.references=n,o.with_partials=!0,(new D).fetchCoreMatDetails(o,e).then(function(n){if(n){for(var i=0;i<e.length;i++)for(const[t,s]of n.entries())if(t===e[i].getID()){var o=s.physicalid,a=(s.V_Name?s.V_Name:"")+" "+(s.revision?s.revision:"-");e[i].setCoreMat(a),e[i].setCoreMatId(o),e[i].updateOptions(e[i].options)}t.MBMFGrid.getTreeDocument().acceptChanges()}}).catch(function(e){h.displayNotification({eventID:"error",msg:e?e.message:w.Error_GetMatInfo}),C.unmaskLoader(t.mbmfContainer)})}},getMBMFNodes:function(e,t){var n=this;r.getMBMFDetails(e,void 0,n.appCore,void 0,void 0,this.extApp_SC).then(function(e){if(C.maskLoader(n.mbmfContainer,w.UpdatingLoader),e&&e.length>0){var i=[],o=new Map;n.MBMFGrid.getTreeDocument().empty(),n.MBMFGrid.getTreeDocument().acceptChanges();let d=e.reduce((e,t)=>(""!==t.ReferenceName&&e.add(t.ReferenceName),e),new Set);n.gridColumnControl.setReferenceNameList([...d]);for(var a=0;a<e.length;a++){var s=new c({ignoreselectevent:!0,fromfacet:"MBMFFacet"}).set(e[a]);s.currentTabKey=n.currentTabKey,s.appCore=n.appCore,e[a].MakeFrom_extensions.forEach(e=>{e.attributes.forEach(t=>{let n=s.getAttributeObject(t,e.dbName,e.nlsLabel);s.setAttributeToMap(n),o.set(n.dbName,n)})}),s.parentNode=n.itemModel,n._addNewNode(s,"MBMF"),i.push(s)}n.getCoreMatDetails(i);let l=7;if(o.forEach(e=>{n.MBMFGrid.addColumn(n.getColumnDef(e),l),l++}),n.MBMFGrid.getTreeDocument().acceptChanges(),n.appCore.MBMFDialog&&n.appCore.MBMFDialog.closeDialog(),t&&n.appId!==b.XSR_APP_ID){var r=[];r.push(s),n.publishMBMFUpdateEvent("add",r)}}else n.MBMFGrid.displayEmptyObjectView(),n.appId!==b.XSR_APP_ID&&(n.MBMFGrid.getTreeDocument().empty(),n.MBMFGrid.getTreeDocument().acceptChanges())}).catch(function(e){h.displayNotification({eventID:"error",msg:e?e.result.message:w.Error_Get_MBMF})}).finally(()=>{C.unmaskLoader(n.mbmfContainer),C.unmaskLoader(n.elements.container)})},_addNewNode:function(e,t){"MBMF"===t&&this.MBMFGrid.addRootNodes(e,!1),this.MBMFGrid.getTreeDocument().acceptChanges(),this.MBMFGrid.updateGroupByIfAny(),this.appId==b.XSR_APP_ID&&(new D).checkMaterialMismatch(this.itemID).then(e=>{this.modelEvents.publish({event:"item-view-manager-material-icon-update",data:e.result})})},createMBMF(e,t){let n=this;if(Array.isArray(e)&&0==e.length)return;let i=[];n.dataModelMap=new Map,e.forEach(e=>{let t=e.options.grid;n.dataModelMap.set(t.id,t);let o=t.dataToSubmit();"EA"===t.unitDB&&t.quantity>0?i.push(...Array(t.quantity).fill(o)):i.push(o)}),(new l).connectMBMFItem(i,t).then(e=>{if(!e||200!==e.statusCode)return void h.displayNotification({eventID:"error",msg:"Service failed"});let i=e.result.MadeFromConnections,o=[];i.forEach(e=>{let i=n.dataModelMap.get(e.makeFromPID);i.relationID=e.connectionPID,i.parentID=t,o.push(i.getMbmfJsonForEIM(e))}),n.modelEvents.publish({event:"add_MBMF_nodes",data:{resp:o,success:!0}}),h.displayNotification({eventID:"success",msg:w.Success_ConnectMBMF})})},async preapreComboFromGrid(){let e=this.MBMFGrid.getTreeDocument(),t=e.getVisibleChildren?e.getVisibleChildren():e.getChildren(),n=[];if(t.forEach(e=>{let t=e.getMBMFReferenceName()||"";n.push(`${e.getID()}_${t}`)}),e.getVisibleChildren&&0==t.length){let e=await(new l).getReferenceMap(parentId);e.success&&Object.keys(e.result.MadeFromConnections).forEach(t=>{e.result.MadeFromConnections[t]&&e.result.MadeFromConnections[t].forEach(e=>{n.push(`${t}_${e}`)})})}return n},confirmationBoxForRemoveNodes:function(e,t){var n={};n.Title=w.label_Detach;var i=new UWA.Element("div",{class:"Delete-Dialog-Option-Container"}),o=new UWA.Element("div",{class:"xsr-delete-message-icon"}).inject(i),a=(new UWA.Element("span",{class:"xsr-delete_warning_icon fonticon fonticon-attention fonticon-1x"}).inject(o),new UWA.Element("p",{class:"message-container",html:w.RemoveConfirm}).inject(o));n.Content=i;if(1===t.length){n.Title=w.label_Detach+" "+t[0].getTitle();var s=w.replace(w.get("RemoveItemConfirm"),{title:t[0].getTitle()});"function"==typeof t[0].IsComputed&&t[0].IsComputed()&&(s=w.replace(w.get("DetachSpecilizedMakeFrom"),{title:t[0].getTitle()})),a.innerHTML=s,this.singleItem=!0}let r=w.Message_removeMBMF;UWA.Element("div",{class:"xsr-delete-extra-info",html:r}).inject(i),n.position={at:"center",my:"center"},n.width=450,n.height=150,n.renderTo=widget.body,n.RemoveApplyButton=!0,n.OKLabel=w.label_Detach;var d=new E(n);d.render(),d._dialog.buttons.Ok.disabled=!1,d.listenTo(d,"EVENT_CLICK_SPEC_OK",function(){C.maskLoader(widget.body,w.RemovingProgress),d.closeDialog(),e(t)})},_subscribeEvents:function(){var e=this;this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"xsr-load-mask"},function(e){C.maskLoader(widget.body,w.WAIT)})),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"xsr-unload-mask"},function(e){C.unmaskLoader(widget.body)})),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"grid-toolbar-action-click-MBMFFacet"},function(t){var n,i;if(t)switch(t){case"addMBMFItem":case"addMBMFFPItem":!async function(n){const i=await u._getSearchCriteria(e.appCore.immersiveFrame,(e.appCore.immersiveFrame?e.appCore.immersiveFrame.elements.container:document.body).getElementsByClassName("fonticon-part-made-from")[0]);if("addMBMFItem"===n||"addMBMFFPItem"===t){var o=e.MBMFGrid.getTreeDocument().getSelectedNodes();if(o&&o.length>0&&o[0].getMadeFrom())return void r.getMsgAddNodeOnMBMF();let t=e.MBMFGrid.getGridNodes().filter(function(e){return e.IsComputed()});if(t&&t.length>0)return void r.getMsgAddNodeOnLayeredProd();let a={appCore:e.appCore,container:e.mbmfContainer,bomGrid:e.MBMFGrid,isReferenceView:!1,isTileView:!1,specModel:e.itemModel,modelEvents:e.modelEvents,isMBMF:!0,appId:e.appId};"addMBMFFPItem"===n&&(a.isMBMFFP=!0);let s=e.itemID?[e.itemID]:[];new y(a).triggerSearch({searchOnlyRawM:!1,query:i,excludeList:s})}}(t);break;case"removeitem":n="remove",(i=e.MBMFGrid.getTreeDocument().getSelectedNodes())&&i.length>0?e.appId===b.XSR_APP_ID&&"remove"===n?(t="UPSAuthUnparent",v.launchUPSUnparent({data:i})):e.confirmationBoxForRemoveNodes(function(t){for(var n=function(t,n,i){(new l).disconnectMBMFItem(t.getParentId(),t.getID()).then(function(o){o&&o.success?(t.parentNodeModel&&t.parentNodeModel.getMBMFChild()&&t.parentNodeModel.setMBMFChild(null),e._removeNodes(t),n===i-1&&(h.displayNotification({eventID:"success",msg:w.RemoveMBMFSuccess}),C.unmaskLoader(widget.body))):(h.displayNotification({eventID:"error",msg:w.RemoveMBMFFailed}),C.unmaskLoader(widget.body))}).catch(function(e){var t="";e&&!e.success&&e.result&&(t=e.result.message),h.displayNotification({eventID:"error",msg:t})})},o=0;o<t.length;o++)n(i[o],o,t.length)},i):h.displayNotification({eventID:"error",msg:w.NoItemSelected});break;case"Export":e._exportGrid();break;case"personalize":e._personalize()}})),this.platFormSubscrpition=i.subscribe("DS/PADUtils/PADCommandProxy/refresh",function(t){t.data.authored&&t.data.authored.modified&&t.data.authored.modified.forEach(function(t){var n;UWA.is(t,"object")?n=t.physicalid:UWA.is(t,"string")&&(n=t),e.syncNodeBasedOnID(n),e.MBMFService.fetchItemInfo([e.itemID]).then(function(t){let n=(new c).set(t[0]).getMaturity();e.itemMaturity=n,"Released"!=n&&"Obsolete"!=n||e.MBMFGrid.toolbar.disableCommands(["addMBMFItem","removeitem","addMBMFFPItem"])})})}),this.platFormXENSubscrpition=i.subscribe("XEN/PUBLIC_EVENT/ENGINEERING_ITEM/PART_NUMBER_UPDATED",function(t){if(t&&Array.isArray(t.references))for(var n=t.references,i=0;i<n.length;i++){var o=n[i].physicalid;e.syncNodeBasedOnID(o)}}),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"xsr-add-item-on-drop-MakeFrom"},async function(t){if("Released"!==e.itemMaturity&&"Obsolete"!==e.itemMaturity){if(t.length>0){let i=t.reduce((e,t)=>(e.push(t.id),e),[]),o=await e.MBMFService.fetchItemInfo(i);if("object"==typeof o&&o.length>0){if(null!=e.itemModel.getChildren()&&e.itemModel.getChildren().some(e=>null==e.getMadeFrom()))return void r.getMsgAddNodeOnRMFromDragandDrop();let t=[],i=[];for(let n=0;n<o.length;n++)if(i.push(o[n].physicalid),o[n].id=o[n].physicalid,o[n].madeFromPID=o[n].physicalid,d.isRawMaterial(o[n]["ds6w:type_value"])){let i=(await e.RMService.getUOMTypes(o[n].physicalid)).result.applicableUOMTypes[0];o[n]["ds6wg:raw_material.v_dimensiontype_value"]=i.dimension.dbName,o[n]["ds6wg:raw_material.v_dimensiontype_value"]||t.push(o[n].physicalid)}else d.isFormulatedProduct(o[n]["ds6w:type_value"])&&t.push(o[n].physicalid);let a=[];t.forEach(t=>{let n=new Promise((n,i)=>{e.RMService.getUOMTypes(t).then(function(e){let i={};i[t]=e.result.applicableUOMTypes[0].dimension,n(i)})});a.push(n)});var n=e;let s={appCore:n.appCore,createCloseAction:function(t){n.createMBMF(t,e.itemID)}};s.bomGridCombos=await e.preapreComboFromGrid(),s.container=e.elements.container,Promise.all(a).then(async function(e){let t=new Map,a=new Map;if(e.forEach(function(e){t.set(Object.keys(e)[0],Object.values(e)[0])}),0!=i.length){let e={references:i,with_partials:!0};(a=await(new D).fetchCoreMatDetails(e))||(a=new Map)}let r=n.createProdGridFields(o,t,a);if(r&&r.length>0)for(let e=0;e<r.length;e++)r[e]._parentID=n.itemModel.getID(),r[e]._parentTitle=n.itemModel.getTitle(),r[e].parentHasCoreMat=n.itemModel.hasMadeOf?n.itemModel.hasMadeOf():r[e].parentHasCoreMat,r[e].parentHasCoreMat||1!=r.length||1!=r[e]._coreMaterial.length?0==r[e]._coreMaterial.length?(r[e].canConnectCM=!1,r[e].connectCM_Msg=w.childCMMsg):(r[e].canConnectCM=!1,r[e].connectCM_Msg=w.connectMultiCMMsg):r[e].canConnectCM=!0;n.tblFrom=new I(s).loadData(r),C.unmaskLoader(n.elements.container)})}}}else h.displayNotification({eventID:"error",msg:e.itemTitle+" is in "+e.itemMaturity+" state."})})),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"grid-list-remove-node-successful-MBMFFacet"},function(t){e._removeNodes(t)})),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:b.UPDATE_ITEMVIEW_TOOLBOOR_COUNT},function(t){"Released"!=e.itemMaturity&&"Obsolete"!=e.itemMaturity&&(0==t?(e.MBMFGrid.toolbar.disableCommands(["removeitem"]),e.MBMFGrid.toolbar.enableCommands(["addMBMFItem","addMBMFFPItem"])):(e.MBMFGrid.toolbar.disableCommands(["addMBMFItem","addMBMFFPItem"]),e.MBMFGrid.toolbar.enableCommands(["removeitem"])))})),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"xsr-slide-in-facet-destroy-updated"},function(t){e.hasTabInstance||e.destroyComponent()})),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"grid_action_context_menu-MBMFFacet"},function(t){var n=e.MBMFGrid.getTreeDocument().getSelectedNodes();t.gridInstance=e.MBMFGrid;var i=e.appId===b.XSR_APP_ID?["Information","OpenSpecificationView","DeleteItem","UPSAuthReorderProduct","UPSAuthReplaceByRevision","UPSAuthCut","UPSAuthCopy","UPSAuthPaste"]:["Information","OpenSpecificationView","OpenWith","ManageFiles","SetPartNumber","UPSAuthUnparent","RemoveChild","VersionExplorer","DuplicateItem","CompareWith","RelatedObjects","MaturityGraph","ActionBar_ChangeOwner","MultiOwnership","DownloadReport","DownloadDocument","Subscriptions","DeleteItem","addExisting","RegenerateReport","Close","UPSAuthReorderProduct","UPSAuthReplaceByRevision","UPSAuthCut","UPSAuthCopy","UPSAuthPaste"];if(e.appId===b.XSR_APP_ID||void 0!==widget.data&&"ENXENG_AP"===widget.data.appId)if(n&&n.length>1)(0,g.getMultiActionMenu)(t,i);else if(n&&(0===n.length||1===n.length)){(0,g.getActionMenu)(t,i)}})),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"grid-item-toolbar-mutiactions-list-MBMFFacet"},function(t){if(t&&(t.nodeModel=e.MBMFGrid.getTreeDocument()),t.gridInstance=e.MBMFGrid,e.appId===b.XSR_APP_ID){(0,g.getToolbarActionMenu)(t,["Information","OpenSpecificationView","DeleteItem","UPSAuthReplaceByRevision","UPSAuthCut","UPSAuthCopy","UPSAuthPaste"])}})),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"grid-cell-value-update-MBMFFacet"},function(t){var n=t.newValue,i=t.oldValue,o=t.nodeModel.getID();C.maskLoader(e.mbmfContainer,w.UpdatingLoader);var a=function(t,n){"success"===t?(e.MBMFGrid.getTreeDocument().acceptChanges(),e.modelEvents.publish({event:"xsr-hide-toolbar-reset-command-"+e.currentTabKey})):e.modelEvents.publish({event:"xsr-show-toolbar-reset-command-"+e.currentTabKey}),h.displayNotification({eventID:t,msg:n}),C.unmaskLoader(e.mbmfContainer)},s=function(n,i,s){e.MBMFGrid.unselectAll(),t.nodeModel.select(),e.MBMFService.updateAndSyncAttributes(o,[{attribute:n,value:i}],t.nodeModel,s).then(function(t){e.syncInstanceModels(t),a("success",w.Notify_Updated)}).catch(function(t){C.unmaskLoader(e.mbmfContainer),a("error",w.Failure_Update)})};let l={};switch(t.dataIndex){case"ds6w:description":s(b.ITEM_DESCRIPTION,n,"bus");break;case"tree":var c=b.ITEM_V_NAME;n?s(c,n,"bus"):a("error",w.replace(w.get(w.Error_EmptyTitle),{columnName:w.label_Title}));break;case"asRequired":l.uomType=t.nodeModel.getDimensionType(),l.quantity=t.nodeModel.getQtyAndUnit(),l.asRequired=n,r.getMBMFUpdateService(l,t.nodeModel).then(function(i){if(i&&i.success){t.nodeModel.setAsRequired(n),e.MBMFGrid.unselectAll(),t.nodeModel.select(),t.nodeModel.sync(),t.nodeModel.acceptChanges();var o=[];o.push(t.nodeModel),e.publishMBMFUpdateEvent("update",o)}else h.displayNotification({eventID:"error",msg:i.result.message}),t.nodeModel.setAsRequired(!1);C.unmaskLoader(e.mbmfContainer)}).catch(function(t){h.displayNotification({eventID:"error",msg:t.result.message}),C.unmaskLoader(e.mbmfContainer)});break;case"quantity":l.uomType=t.nodeModel.getDimensionType(),t.nodeModel.getUnit()?l.quantity=n+" "+t.nodeModel.getUnit():l.quantity=n+"",l.asRequired=t.nodeModel.getAsRequired(),r.getMBMFUpdateService(l,t.nodeModel).then(function(o){if(o&&o.success){e.syncNodePostUpdate(t,n),t.nodeModel.setQtyAndUnit(n+" "+t.nodeModel.getUnit());var a=[];a.push(t.nodeModel),e.publishMBMFUpdateEvent("update",a)}else h.displayNotification({eventID:"error",msg:o.result.message}),e.syncNodePostUpdate(t,i);C.unmaskLoader(e.mbmfContainer)}).catch(function(t){h.displayNotification({eventID:"error",msg:t.result.message}),C.unmaskLoader(e.mbmfContainer)});break;case"unitNLS":l.uomType=t.nodeModel.getDimensionType();var m=Object.entries(d.getUOMUnits(t.nodeModel.getDimensionType()));if(m){var M=new Map;m.forEach(function(e){M.set(e[1],e[0])})}n&&(l.quantity=t.nodeModel.options.grid.quantity+" "+M.get(n)),l.asRequired=t.nodeModel.getAsRequired(),r.getMBMFUpdateService(l,t.nodeModel).then(function(o){o&&o.success?(t.nodeModel.setUnit(n),t.nodeModel.setQtyAndUnit(t.nodeModel.options.grid.quantity+" "+M.get(n)),e.MBMFGrid.unselectAll(),t.nodeModel.select(),t.nodeModel.sync(),t.nodeModel.acceptChanges()):(h.displayNotification({eventID:"error",msg:o.result.message}),e.syncNodePostUpdate(t,i)),C.unmaskLoader(e.mbmfContainer)}).catch(function(t){h.displayNotification({eventID:"error",msg:t.result.message}),C.unmaskLoader(e.mbmfContainer)});break;case"referenceName":l.referenceName=n;let o=t.nodeModel.getAttributeValue("physicalId"),p=t.nodeModel.getAttributeValue("madeFromRelationId");0==e.MBMFGrid.getTreeDocument().getChildren().filter(e=>o===e.getAttributeValue("physicalId")&&p!==e.getAttributeValue("madeFromRelationId")).filter(e=>n===e.getAttributeValue("referenceName")).length?(t.nodeModel.options.grid.quantity>0&&(l.uomType=t.nodeModel.getDimensionType(),l.quantity=t.nodeModel.getQtyAndUnit()),l.asRequired=t.nodeModel.getAsRequired(),r.getMBMFUpdateService(l,t.nodeModel).then(t=>{t&&t.success&&e.MBMFGrid.getTreeDocument().acceptChanges()}).catch(e=>{}).finally(()=>{C.unmaskLoader(e.mbmfContainer)})):(e.MBMFGrid.getTreeDocument().cancelChanges(),h.displayNotification({eventID:"error",msg:w.ERROR_UNIQUE_REFERENCE_NAME}),C.unmaskLoader(e.mbmfContainer));break;default:C.unmaskLoader(e.mbmfContainer)}})),this._MBMFSubscriptionList.push(this.modelEvents.subscribe({event:"add_MBMF_nodes"},t=>{e.getMBMFNodes(e.itemID,!0),e.checkAndApplyGrouping()}))},syncNodePostUpdate:function(e,t){"number"==typeof t&&e.nodeModel.setInstanceCount(t),this.MBMFGrid.unselectAll(),e.nodeModel.select(),e.nodeModel.sync(),e.nodeModel.acceptChanges()},syncNodeBasedOnID:function(e){var t=this;t.MBMFGrid.getTreeDocument().getSelectedNodes().forEach(function(n){n.getID()===e&&t.MBMFService.fetchItemInfo([e]).then(function(e){e&&Array.isArray(e)?n.set(e[0]):n.set(e),t.syncInstanceModels(n)}).catch(function(e){console.log(e)})})},syncInstanceModels:function(e){let t=this.MBMFGrid.getGridNodes();t&&UWA.is(t,"array")&&t.forEach(function(t){t.getID()===e.getID()&&t.getMBMFReferenceName()!=e.getMBMFReferenceName()&&t.syncInstances(e)}),this.MBMFGrid.getTreeDocument().acceptChanges()},_removeNodes:function(e){var t=this;this.MBMFGrid.removeRootNodes(e),0==this.MBMFGrid.gridTreeDocument.model.getChildren().length&&this.MBMFGrid.toolbar.enableCommands(["addMBMFItem","addMBMFFPItem"]),this.updateReferenceList(),t.appId==b.XSR_APP_ID&&t.MBMFService.checkMaterialMismatch(t.itemID).then(e=>{t.modelEvents.publish({event:"item-view-manager-material-icon-update",data:e.result})});var n=[];n.push(e),t.publishMBMFUpdateEvent("remove",n)},createNodeFromId:function(e){this.MBMFGrid.getTreeDocument().getSelectedNodes();if(e)return this.getMBMFNodes(e,!0)},publishMBMFUpdateEvent:function(e,t){var n=[];if(Array.isArray(t))for(var o=0;o<t.length;o++){var a={};a.actionMode=e,a.details=t[o]._options.grid,n.push(a)}i.publish("XSR/PUBLIC_EVENT/MAKE_FROM_UPDATE",n)},_exportGrid:function(){var e=this.itemTitle+"_"+this.itemMaturity+"_"+w.label_MakeFrom_Export;this.MBMFGrid.exportGrid(e)},_personalize:function(){this.MBMFGrid.personalize()},checkAndApplyGrouping:function(){let e=this,t=e.MBMFGrid.getGroupByColumns();t?e.MBMFGrid.checkAndUpdatePersistency(t):e.MBMFGrid.setGroupByColumns(void 0)},setRequriedInfo:async function(){let e=this;e.itemModel.referenceData=await r.getReferenceList(e.itemID),e.itemModel.getReferenceNameList=function(){return e.itemModel.referenceData};let t={references:[e.itemID],with_partials:!0},n=!1,i=await(new D).fetchCoreMatDetails(t);i&&i.references&&i.references_infos&&(n=!0),e.itemModel.hasMadeOf=function(){return n}},destroyComponent:function(){this.dnd.cleanDroppable(this.elements.container),this.elements.container.destroy(),this.MBMFGrid.destroy(),this.appId===b.XSR_APP_ID&&this.appCore.dndManager.enableDragAndDropOnSpecViewer(),this._MBMFSubscriptionList&&this.modelEvents.unsubscribeList(this._MBMFSubscriptionList),this.platFormSubscrpition&&i.unsubscribe(this.platFormSubscrpition),this.platFormXENSubscrpition&&i.unsubscribe(this.platFormXENSubscrpition)}})});