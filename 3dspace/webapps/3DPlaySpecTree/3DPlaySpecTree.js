/*!  COPYRIGHT DASSAULT SYSTEMES 2015   */
define("DS/3DPlaySpecTree/3DPlaySpecTreeSOManager",["UWA/Class","DS/Visualization/PathElement","DS/Selection/XSO","DS/Selection/CSOManager","DS/Selection/HSOManager"],function(e,t,n,i,r){"use strict";Object.create({object:{_objectId:"",treeObject:{_objectId:"",_object:{}},visuObject:{_objectId:"",_object:{}},getId:function(){return this._objectId}},getObjectForId:function(e){for(var t in this)if(t.getId()===e)return t}});return e.extend({init:function(e){this._parent(e);this._cso=new n({getElementID:function(e){return!1},useUniqueID:!0,areEquals:function(e,t){return!1}})},getCSO:function(){return this._cso},dispose:function(){this._parent()}})}),define("DS/3DPlaySpecTree/3DPlaySpecTree",[],function(){}),define("DS/3DPlaySpecTree/3DPlaySpecTreeUtils",["DS/Windows/Panel","DS/WebSystem/Settings","DS/Visualization/PathElement","DS/Selection/CSOManager","DS/Selection/HSOManager","DS/3DPlaySpecTree/3DPlaySpecTreeSOManager","DS/WebappsUtils/WebappsUtils"],function(e,t,n,i,r,o,a){"use strict";var s=t.get("3DPlay.SpecTree.LoggingEnabled");return{CSOManager:i,HSOManager:r,isDebugLog:s,log:s?console.log.bind(window.console):function(){},specTreeModel:null,rootPaths:null,disposeModelNode:function(){this.specTreeModel=null,this.specTreeView=null,this.viewer=null,this.rootPaths=null},registerModelNodes:function(e,t,n){var i=this;if(!e||!t||!n)return this.log("3DPlay : Error - Could resolve specTreeModel, specTreeView or frameWindow",e,t,n),!1;this.viewer=n.getViewer(),this.specTreeModel=e,this.specTreeView=t,this.rootPaths=this.setRootPaths(n),this.addSelectionCB(),e.registerModelNodeType({nodeType:"model-node",buildIcons:function(){return[{iconName:"product"}]},buildLabel:function(e){return e.nodeModel.options.label},onSelect:function(e){var t=e.nodeModel;t.play3DData.fromCSO?delete t.play3DData.fromCSO:i.select3DNode(t.play3DData.id,i.viewer)},onUnselect:function(e){var t=e.nodeModel;if(t.play3DData.fromCSO)delete t.play3DData.fromCSO;else{var n=t.getChildren();if(i.unselect3DNode(t.play3DData.id,i.viewer),n)for(var r=0;r<n.length;r++)n[r].isSelected()&&i.select3DNode(n[r].play3DData.id,i.viewer)}}})},buildPanel:function(t,n){var i=new UWA.Element("div");return n.content&&i.appendChild(n.content),{panel:new e({titleBarVisibleFlag:!1,icon:a.getWebappsAssetUrl("3DPlaySpecTree","icons/32/")+"I_3DPlaySpecTree.png",title:"",content:i,immersiveFrame:t,resizableFlag:!0,movableFlag:!1,currentDockArea:n.currentDockArea|WUXDockAreaEnum.NoneDockArea,width:400,verticallyStretchableFlag:!0,usePaddingFlag:!1,closeButtonFlag:!1,floatableFlag:!1,expandedFlag:!0,ensureHeightDefinitionOnHierarchy:!0}),content:i}},setRootPaths:function(e){var t=e.getViewer().getNodes(),i=e.experience?e.experience.getRootBag():null,r=[];return t.forEach(function(e){var t=new n;if(i&&e===i)for(var o=e.getChildren(),a=o.length,s=0;s<a;s++)t.addElement(o[s]);else t.addElement(e);r.push(t)}),r},createPathFromId:function(e,t){var n,i=this.rootPaths,r=e.split("/"),o=function(e,t){e.length>0&&e.forEach(function(e){var i=e.getLastElement();if(void 0!==i.getPersistentId)"Instance3D"!=i.productType&&1!=i.getPersistentId()||i.getPersistentId()==t[0]&&(t.splice(0,1),n=e);else if(void 0!==i.id){var r=i.worktype?i.worktype:i.plmtype;"VPMReference"!=r&&"VPMInstance"!=r&&"VPMRepInstance"!=r&&"VPMRepReference"!=r&&"3DShape"!=r&&"CATProduct"!=r&&"CATPart"!=r&&"Viewable"!=r&&"CgrViewable"!=r||i.id==t[0]&&(t.splice(0,1),n=e)}var a=e.getChildrenOccurrencePathes();null!=a&&o(a,t)})};return o(i,r),n},createIdFromPath:function(e){for(var t=e.pathElement,n="";null!=t;){var i=t.getLastElement(!0);if(void 0!==i.getPersistentId)"Instance3D"!=i.productType&&1!=i.getPersistentId()||(0!==n.length&&(n="/"+n),n=i.getPersistentId()+n);else if(void 0!==i.id&&0!==i.id){var r=i.worktype?i.worktype:i.plmtype;if("VPMReference"==r||"VPMInstance"==r||"VPMRepInstance"==r||"VPMRepReference"==r||"3DShape"==r||"CATProduct"==r||"CATPart"==r||"Viewable"==r||"CgrViewable"==r)0!==n.length&&(n="/"+n),n=i.id+n}t=t.getParentOccurrencePath()}return n},select3DNode:function(e,t){this.log("-- select3DNode --:",e);var n=this,o=[],a=[];Array.isArray(e)?a=e:a.push(e),a.forEach(function(e){o.push({pathElement:n.createPathFromId(e,t)})}),this.removeSelectionCB(),i.add(o),r.add(o),this.addSelectionCB()},unselect3DNode:function(e,t){this.log("-- unselect3DNode --:",e);var n=this,o=i.get(),a=[];o.forEach(function(e){a.push(n.createIdFromPath(e))});var s=[];Array.isArray(e)?s=e:s.push(e);var l=[];s.forEach(function(e){for(var t=0;t<a.length;t++)a[t].indexOf(e)>-1&&l.push(o[t])}),l.forEach(function(e){n.removeSelectionCB(),i.remove(e),r.remove(e),n.addSelectionCB()})},emptySelection:function(){i.empty(),r.empty()},addSelectionCB:function(){var e=this;void 0!==this.treeSelectionCB&&(this.treeSelectionCB.onAddToken=i.onAdd(function(t){Array.isArray(t)||(t=[t]);var n=[];t.forEach(function(t){n.push(e.createIdFromPath(t))}),e.treeSelectionCB("ADD/VISUNODE",n)}),this.treeSelectionCB.onRemoveToken=i.onRemove(function(t){Array.isArray(t)||(t=[t]);var n=[];t.forEach(function(t){n.push(e.createIdFromPath(t))}),e.treeSelectionCB("REMOVE/VISUNODE",n)}),this.treeSelectionCB.onEmptyToken=i.onEmpty(function(){e.treeSelectionCB("EMPTY/VISUNODE")}))},removeSelectionCB:function(){void 0!==this.treeSelectionCB&&(void 0!==this.treeSelectionCB.onAddToken&&i.unsubscribe(this.treeSelectionCB.onAddToken),void 0!==this.treeSelectionCB.onRemoveToken&&i.unsubscribe(this.treeSelectionCB.onRemoveToken),void 0!==this.treeSelectionCB.onEmptyToken&&i.unsubscribe(this.treeSelectionCB.onEmptyToken))},treeSelectionCB:function(e,t){var n=this,i=function(){return n.specTreeModel.search({match:function(e){for(var n=0;n<t.length;n++){var i=t[n];if(i&&e.nodeModel.play3DData.id===i)return!0}}})};switch(n.specTreeModel.prepareUpdate(),e){case"EMPTY/VISUNODE":n.specTreeModel.unselectAll();break;case"ADD/VISUNODE":i().forEach(function(e,t){e.play3DData.fromCSO=!0,e.select(),e.reverseExpand()});break;case"REMOVE/VISUNODE":i().forEach(function(e){e.play3DData.fromCSO=!0,e.unselect()})}n.specTreeModel.pushUpdate()}}}),define("DS/3DPlaySpecTree/3DPlaySpecTreePanel",["UWA/Class","DS/Visualization/PathElement","DS/SpecTree/SpecTreeView","DS/SpecTree/SpecTreeDocument","DS/TreeModel/TreeNodeModel","DS/Utilities/Utils","DS/Selection/CSOManager","DS/3DPlaySpecTree/3DPlaySpecTreeUtils","DS/3DPlaySpecTree/3DPlaySpecTreeSOManager","DS/WebSystem/Settings","DS/CoreEvents/Events"],function(e,t,n,i,r,o,a,s,l,c,d){"use strict";return e.extend({init:function(e){this._parent(e),this._sceneRootBag=e.sceneRootBag,this._frameWindow=e.frameWindow,window.__karma__&&(this._SpecTreeUtils=s)},dispose:function(){this._destroyPanel(),s.removeSelectionCB(),this._sceneRootBag=void 0,this._frameWindow=void 0,this._parent()},instanciateSpecTreePanel:function(){var e=this._frameWindow.getImmersiveFrame();this._specTreeModel=new i,this._specTreeView=new n({height:"auto",treeDocument:this._specTreeModel,show:{rowHeaders:!1,columnHeaders:!1},isEditable:!1,enableDragAndDrop:!1});var t="true"===c.get("3DPlay.SpecTree.VisuTreeEnabled");t&&this._frameWindow.getTree().show();var r=t?WUXDockAreaEnum.RightDockArea:WUXDockAreaEnum.LeftDockArea;this._dockingElement=e.getDockingElement(r),this._dockingElement.collapseDockingZoneFlag=!0,this._panelModel=s.buildPanel(e,{content:this._specTreeView.getContent(),currentDockArea:r}),this._setupSpecTreePanel(),this.SpecTreeDisableSubscribe=d.subscribe({event:"3DPLAY/SPECTREE/DISABLE"},this._disableSpecTree.bind(this)),this.SpecTreeEnableSubscribe=d.subscribe({event:"3DPLAY/SPECTREE/ENABLE"},this._enableSpecTree.bind(this))},_disableSpecTree:function(){var e=this;this._dockingElement.collapseDockingZoneFlag||(this._dockingElement.collapseDockingZoneFlag=!0),setTimeout(function(){e._dockingElement.visibleDockingZoneFlag=!1,e=void 0},500)},_enableSpecTree:function(){this._dockingElement.visibleDockingZoneFlag=!0},_destroyPanel:function(){this.SpecTreeDisableSubscribe&&d.unsubscribe(this.SpecTreeDisableSubscribe),this.SpecTreeEnableSubscribe&&d.unsubscribe(this.SpecTreeEnableSubscribe),this._specTreeView&&(this._specTreeView.destroy(),this._specTreeView=null),this._panelModel&&this._panelModel.panel&&(this._panelModel.panel.destroy(),this._panelModel.panel=null),this._specTreeModel.removeRoots(),this._specTreeModel=null,s.disposeModelNode()},_setupSpecTreePanel:function(){s.registerModelNodes(this._specTreeModel,this._specTreeView,this._frameWindow),this._specTreeModel.prepareUpdate(),this._generateChildren(this._sceneRootBag.children[0]),this._specTreeModel.pushUpdate()},_generateChildren:function(e,t){if(!e)return s.log("3DPlay : Error - Could not resolve parentModel3DNode",e),!1;if(!t){var n=this._specTreeModel.createModelNode({nodeType:"model-node",label:e.name}),i="";return e.getPersistentId&&(i+=e.getPersistentId()),n.play3DData={id:i},this._specTreeModel.addChild(n),this._generateChildren(e,n),n}for(var r=0;r<e.children.length;r++){var o=e.children[r],a=null;if("Instance3D"===o.productType&&1===o.children.length&&"Reference3D"===o.children[0].productType){var l=""+o.name,c=""+o.children[0].name,d="Node-"+r;""!==c&&(d=c),""!==l&&(d+=" ("+l+")"),a=this._specTreeModel.createModelNode({nodeType:"model-node",label:d});var p=t.play3DData.id+"/"+o.getPersistentId();a.play3DData={id:p},t.addChild(a),this._generateChildren(o,a)}else{if("Reference3D"!==o.productType)return!0;a=t,this._generateChildren(o,a)}}return!0}})});