define("DS/ENOCharacteristicsApp/view/TestMethodFacet",["UWA/Core","UWA/Class","UWA/Controls/Abstract","DS/EditPropWidget/facets/Common/FacetsBase","DS/SpecGridView/SpecGridView","DS/ENOCharacteristicsApp/utils/CharTestMethodUtils","DS/ENOCharacteristicsApp/service/CharTestMethodServiceProvider","DS/ENOCharacteristicsApp/service/CharacteristicsServiceWrapper","DS/ENOCharacteristicsApp/model/CharTestMethodModel","DS/XSRCommonComponents/utils/XSRSearch","DS/ENOCharacteristicsApp/utils/Notification","DS/XSRCommonComponents/utils/GridCommonActionsManager","DS/XSRCommonComponents/utils/XSRMask","DS/XSRCommonComponents/utils/Constants","DS/ENOCharacteristicsApp/view/DeleteCharacteristicsDialog","text!DS/ENOCharacteristicsApp/assets/config/CharTestMethodToolBarCommands.json","text!DS/ENOCharacteristicsApp/assets/config/CharTestMethodColumnConfig.json","i18n!DS/ENOCharacteristicsApp/assets/nls/ENOCharacteristicsApp","css!DS/ENOCharacteristicsApp/view/TestMethodFacet.css"],function(e,t,i,s,o,r,n,a,d,c,h,p,l,u,m,T,M,g){"use strict";return t.extend(i,s,{init:function(t){this._parent(t),this.elements.container||(this.elements.container=e.createElement("div",{class:"xsr-testmethod-view"})),this.appCore=this.options.appContext,this.appId=t.appId,this.appCore.contextAppId=this.appId,this.pcId=t.itemId,this.itemModel=t.itemModel,this.itemTitle=this.itemModel?this.itemModel.getLabel():"",this.rootModel=this.itemModel.getRoot().getAttributeValue("physicalId")?this.itemModel.getRoot():this.itemModel.getNthParent(1),this.psId=this.rootModel.getAttributeValue("physicalId"),this.modelEvents=this.appCore.specViewerModelEvents,this.basicModelEvents=this.appCore.basicModelEvents,this.currentTabKey="test-method-facet",this._TMSubscriptionList=[],this._subscribeEvents(),this.preferredView=void 0===widget.getValue("grid-preferred-view-"+this.currentTabKey)?u.BIG_TILE:widget.getValue("grid-preferred-view-"+this.currentTabKey),this.TMService=new n({psid:this.psId,pcid:this.pcId}),this.charService=new a},updateFacet:function(){!this.tmContainer||this.tmContainer&&this.tmContainer.getChildren()&&0===this.tmContainer.getChildren().length?this._buildView():this.drawTMNodes()},_buildView:function(){this.elements.container.empty(),this.tmContainer=e.createElement("div",{class:"tm_container"}).inject(this.elements.container),this.loadTMGrid(),this.drawTMNodes()},loadTMGrid:function(){var e=this,t=JSON.parse(T),i=r.getNLSLabels(t.actions),s=JSON.parse(M),n=r.getNLSLabels(s.columns),a={itemId:e.pcId,container:e.tmContainer,appCore:e.appCore,currentTabKey:e.currentTabKey,enableCrossWidgetFeature:!1,isColorized:!0,parentModel:e.itemModel,preferredView:e.preferredView};e.TMGrid=new o(a),e.TMGrid.setColumns(n),e.TMGrid.render(),e.TMGrid.setToolBarActions({actions:i});var d=["RemoveTestMethod"];this.rootModel.isInWork()||d.push("AddTestMethod"),e.TMGrid.toolbar.disableCommands(d),this.rootModel.isInWork()&&(e.TMGrid.getTreeDocument().getXSO().onPostAdd(function(t){e.TMGrid.getTreeDocument().getSelectedNodes().length>0&&e.TMGrid.toolbar.enableCommands(["RemoveTestMethod"])}),e.TMGrid.getTreeDocument().getXSO().onPostRemove(function(t){0==e.TMGrid.getTreeDocument().getSelectedNodes().length&&e.TMGrid.toolbar.disableCommands(["RemoveTestMethod"])}))},drawTMNodes:function(){this.getTMNodes(this.pcId)},getTMNodes:function(e){var t=this;r.getTestMethods(t.psId,e,t.appCore,this.extApp_SC).then(function(e){if(e&&e.length>0){var i=[];t.TMGrid.getTreeDocument().empty(),t.TMGrid.getTreeDocument().acceptChanges();for(var s={appCore:t.appCore,currentTabKey:t.currentTabKey},o=0;o<e.length;o++){var r=new d(s).set(e[o]);t._addNewNode(r),i.push(r)}t.TMGrid.getTreeDocument().acceptChanges()}else t.TMGrid.displayEmptyObjectView()}).catch(function(e){console.log(e),h.displayNotification({eventID:"error",msg:e?e.result.message:g.Error_Get_TM}),l.unmaskLoader(t.tmContainer)})},_addNewNode:function(e,t){this.TMGrid.addRootNodes(e,!1),this.TMGrid.getTreeDocument().acceptChanges()},evt_GridToolbarSwitchView:function(e){var t="grid-preferred-view-"+this.currentTabKey;widget.setValue(t,e),this.TMGrid.switchView(e)},evt_RemoveTestMethods:function(){var e=this,t=e.TMGrid.getTreeDocument().getSelectedNodes();if(t&&t.length>0){var i=e.itemModel.getTypeActualName();this.confirmationBox(function(){var s,o;t.length,o=(s=t).reduce(function(e,t){return e.push(t.getPhysicalId()),e},[]),r.remove(e.psId,e.pcId,o,i).then(function(t){h.displayNotification({eventID:"success",msg:g.Message_TestMethodsRemoved}),e.modelEvents.publish({event:"TestMethodFacet-to-PerfSpec-commute-remove-node-success",data:{testmethodIds:o,nodeModel:e.itemModel}}),e.TMGrid.gridTreeDocument.removeRoot(s)})},t)}},confirmationBox:function(e,t){var i=new m(t).renderDialog(!1);i.listenTo(i,"EVENT_CLICK_CHAR_OK",function(){e(),i.closeDialog()})},evt_AddTestMethods:function(e){var t=this;!async function(e){var i=t.appCore.immersiveFrame?t.appCore.immersiveFrame.elements.container:document.body;i=(i=i.getElementsByClassName("xsr-testmethod-view")[0]?i.getElementsByClassName("xsr-testmethod-view")[0]:i).getElementsByClassName("fonticon fonticon-plus")[0];const s=await c._getSearchCriteria(t.appCore.immersiveFrame,i);if("AddTestMethod"===e){var o=0,r={allowedTypes:["Test Method Specification"],role:"",subType:"",criteria:s,precondition:"(current==Release OR current==RELEASED)",in_apps_callback:function(e){if(e){for(var i=0;i<e.length;i++)if("Technical Specification.RELEASED"!==e[i]["ds6w:status_value"]){o++;break}if(0<o)h.displayNotification({eventID:"error",msg:g.Err_TMS_NotReleased});else{var s=e.reduce(function(e,t){return e.push(t.id),e},[]),r={testMethods:s,type:t.itemModel.getTypeActualName(),addTestMethod:!0};t.charService.updateCharacteristicsData(r,t.psId,t.pcId).then(function(e){var i=JSON.parse(e);i&&200===i.statusCode&&t.TMService.fetch(s).then(function(e){t.modelEvents.publish({event:"TestMethodFacet-to-PerfSpec-commute-add-node-success",data:{testmethodInfo:e,nodeModel:t.itemModel}});for(var i={appCore:t.appCore,currentTabKey:t.currentTabKey},s=0;s<e.results.length;s++){var o=new d(i).set(e.results[s].attributes);t._addNewNode(o)}t.TMGrid.getTreeDocument().acceptChanges(),h.displayNotification({eventID:"success",msg:g.Message_TestMethodsAdded})})}).catch(function(e){h.displayNotification({eventID:"error",msg:g.Message_Error_AddTestMethod}),l.unmaskLoader(t.tmContainer)})}}},multiSel:!0,excludeList:t.TMGrid.getTreeDocument().getChildren().reduce(function(e,t){return e.push(t.getPhysicalId()),e},[])};new c(r).launchSearch(r)}}(e)},_subscribeEvents:function(){var e=this;this._TMSubscriptionList.push(this.modelEvents.subscribe({event:"grid-toolbar-switch-view-test-method-facet"},t=>e.evt_GridToolbarSwitchView(t))),this._TMSubscriptionList.push(e.appCore.basicModelEvents.subscribe({event:u.OPEN_SPECIFICATION_VIEW},t=>{e.appCore.triptychManager.hideRightPanel()})),this._TMSubscriptionList.push(this.modelEvents.subscribe({event:"xsr-slide-in-facet-destroy-updated"},function(t){e.destroyComponent()})),this._TMSubscriptionList.push(this.modelEvents.subscribe({event:"grid-toolbar-action-click-"+this.currentTabKey},function(t){"AddTestMethod"===t?e.evt_AddTestMethods(t):e.evt_RemoveTestMethods()})),this._TMSubscriptionList.push(this.modelEvents.subscribe({event:u.GRID_CONTEXT_MENU+"-"+this.currentTabKey},function(t){var i=e.TMGrid.getTreeDocument().getSelectedNodes();t.gridInstance=e.TMGrid;var s=["Information","OpenWith","ManageFiles","SetPartNumber","UPSAuthUnparent","RemoveChild","VersionExplorer","DuplicateItem","CompareWith","RelatedObjects","MaturityGraph","ActionBar_ChangeOwner","MultiOwnership","DownloadReport","Subscriptions","DeleteItem","addExisting","RegenerateReport","Close","Information_Widget","Alternates"];if(i&&i.length>1)(0,p.getMultiActionMenu)(t,s);else if(i&&(0===i.length||1===i.length)){(0,p.getActionMenu)(t,s)}}))},destroyComponent:function(){this.elements.container.destroy(),this.TMGrid.destroy(),this._TMSubscriptionList&&this.modelEvents.unsubscribeList(this._TMSubscriptionList)}})});