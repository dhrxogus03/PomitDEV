define("DS/XCTInfToolbar/XCTInfToolbar",[],function(){"use strict";return{}}),define("DS/XCTInfToolbar/XCTToolbar",["UWA/Core","UWA/Class","DS/UIKIT/Tooltip","DS/WebappsUtils/WebappsUtils","DS/CoreEvents/Events","DS/Selection/HSOManager","css!DS/XCTInfToolbar/XCTInfToolbar.css"],function(e,t,n,o,i,a){"use strict";return t.extend({CLOSE_EVENT:"XCT:Toolbar:panel:closed",init:function(t){this.initToolbar(t),this._toolbarPanelWrapper=e.createElement("div",{Class:"xct-toolbar-panel-wrapper"}).inject(this._toolbarNode),this.initToolbarEvents()},initToolbar:function(t){this._currentItem=void 0,this._toolbarItems=[];var n=document.getElementById("canvas-div");t&&t.parent&&(n=t.parent),this._toolbarNode=e.createElement("div",{Class:"xct-toolbar"}).inject(n),this._listNode=e.createElement("ul",{Class:"xct-toolbar-item-list"}).inject(this._toolbarNode)},initToolbarEvents:function(){this.token=i.subscribe({event:this.CLOSE_EVENT},function(){this._closeActivePanel()}.bind(this)),a.onAdd(this._handleSceneNodeSelected.bind(this))},createToolTip:function(e,t,o){return new n({target:e,body:t,position:o})},addToolbarItem:function(e){var t=e.classList||[];t.push(["xct-toolbar-item"]);var n=this._createToolbarButton(e.icon,t,e.tooltip);e.tooltip&&this.createToolTip(n,e.tooltip,"right"),this._listNode.appendChild(n);var o={node:n,panel:e.panel,showPanelOnSceneItemSelect:e.showPanelOnSceneItemSelect||!1,nodeTypes:e.nodeTypes};return this._toolbarItems.push(o),n.onclick=this._handleSelectToolbarItem.bind(this,o,e.onClickCallback),n},addToolbarSeparator:function(){e.createElement("li",{Class:"xct-toolbar-separator"}).inject(this._listNode)},getToolbarNode:function(){return this._toolbarNode},getToolbarPanelWrapperNode:function(){return this._toolbarPanelWrapper},getCurrentItem:function(){return this._currentItem},addHighlight:function(e){e.classList.add("xct-toolbar-item-active")},removeHighlight:function(e){e.classList.remove("xct-toolbar-item-active")},_createToolbarButton:function(t,n){var i=e.createElement("li");return t&&(i.style.backgroundImage="url('"+o.getWebappsBaseUrl()+t+"')"),n.forEach(function(e){i.classList.add(e)}),i},_clearHighlights:function(){this._toolbarItems.forEach(function(e){this.removeHighlight(e.node)}.bind(this))},_handleSelectToolbarItem:function(e,t){var n=this._currentItem;this._closeActivePanel(),n&&e.node===n.node||(e.panel&&e.panel.show(),this.addHighlight(e.node),this._currentItem=e),t&&t(this._currentItem)},_closeActivePanel:function(){this._currentItem&&(this._currentItem.panel&&this._currentItem.panel.close(),this._currentItem=void 0,this._clearHighlights())},_handleSceneNodeSelected:function(e){if(this._currentItem&&this._currentItem.showPanelOnSceneItemSelect){var t=e.pathElement.getLastElement().getNodeType();if(t){var n=this._toolbarItems.filter(function(e){return e.nodeTypes&&-1!==e.nodeTypes.indexOf(t)});if(n.length){var o=n[0];o.panel.PANELTYPE!==this._currentItem.panel.PANELTYPE&&(this._closeActivePanel(),this._handleSelectToolbarItem(o))}}}}})}),define("DS/XCTInfToolbar/XCTToolbarBasePanel",["UWA/Core","UWA/Class","DS/XCTInfToolbar/XCTToolbar","DS/WebappsUtils/WebappsUtils","DS/CoreEvents/Events"],function(e,t,n,o,i){"use strict";return t.extend({CLOSE_EVENT:n.prototype.CLOSE_EVENT,init:function(e){e&&(this.toolbar=e.toolbar,this.toolbarPanelWrapper=e.toolbarPanelWrapper,this.frmWindow=e.frmWindow)},show:function(t,n){this.panel=e.createElement("div",{Class:t}).inject(this.toolbarPanelWrapper),this.panelHeader=e.createElement("div",{Class:"xct-panel-header"}).inject(this.panel),n||(this.panelActions=e.createElement("div",{Class:"xct-panel-actions"}).inject(this.panel)),this.panelContent=e.createElement("div",{Class:"xct-panel-content"}).inject(this.panel),this._slideIn()},close:function(){this._slideOut(),this._cleanPanel(this.toolbarPanelWrapper)},_cleanPanel:function(e){e.getChildren().forEach(function(t){e.removeChild(t)})},_slideIn:function(){this.toolbarPanelWrapper.classList.add("xct-toolbar-open")},_slideOut:function(){this.toolbarPanelWrapper.classList.remove("xct-toolbar-open")},showHeader:function(t){var n=e.createElement("div",{Class:"xct-toolbar-panel-title",html:t});e.createElement("div",{Class:"xct-panel-close",styles:{backgroundImage:"url('"+o.getWebappsBaseUrl()+"XCTIIS/assets/icons/20/closePanel.png')"}}).inject(n).onclick=function(){i.publish({event:this.CLOSE_EVENT})}.bind(this),this.panelHeader.appendChild(n)}})});