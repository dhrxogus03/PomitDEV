define("DS/3DPlayUDLExperience/UDLLeftPanel",["UWA/Core","UWA/Class","css!DS/3DPlayUDLExperience/UDLLeftPanel","DS/Panels/SidePanel","DS/CoreEvents/Events","DS/WebSystem/Nls","i18n!DS/3DPlayExperienceModule/assets/nls/3DPlayExperienceModule"],function(e,t,i,n,s,r,a){"use strict";return t.extend({init:function(t){this.sheets=[];this.frameWindow=t.frmWindow,this.onWidgetResize=function(){this.mainContainer&&(this.mainContainer.style.height=this.leftPanel.elements.panel.clientHeight-5+"px")}.bind(this),this.frameWindow.getViewerFrame().addEvent("resize",this.onWidgetResize);var i=this.frameWindow.getUIFrame();this.leftPanel=new n({side:"left"}).inject(i),this.leftPanel.slideOut(),this.mainContainer=new e.Element("div",{id:"MAIN_CONTAINER",styles:{height:this.leftPanel.elements.panel.clientHeight-5+"px","overflow-y":"auto"}}).inject(this.leftPanel);var r=new e.Element("div",{id:"SHEET_LIST_CONTAINER"}).inject(this.mainContainer);this.sheetIDs=[];for(var a=function(i,n,s,r){var a=new e.Element("div",{id:s,class:"UDL-leftpanel-item",events:{click:function(e){e.target.parentElement.className.indexOf("selected")<0&&t.clickCB(n)}}}).inject(i);return new e.Element("span",{title:r,class:"UDL-title"}).inject(a).innerHTML=r,a},o=0;o<t.items.length;o++){t.items[o];var l=a(r,t.items[o].index,"Sheet_"+(o+1),t.items[o].sheetName);this.sheets.push(l)}this.LeftPanelDisableSubscribe=s.subscribe({event:"3DPLAY/UDLLEFTPANEL/DISABLE"},this._DisableLeftPanel.bind(this)),this.LeftPanelEnableSubscribe=s.subscribe({event:"3DPLAY/UDLLEFTPANEL/ENABLE"},this._EnableLeftPanel.bind(this))},_DisableLeftPanel:function(){this.leftPanel&&(this.mainContainer.remove&&(this.mainContainer.style.display="none"),this.leftPanel.elements.panel.remove&&(this.leftPanel.elements.panel.style.display="none"),this.leftPanel.elements.lateralHandle&&(this.leftPanel.elements.lateralHandle.style.display="none"))},_EnableLeftPanel:function(){this.leftPanel&&(this.mainContainer.remove&&(this.mainContainer.style.display="block"),this.leftPanel.elements.panel.remove&&(this.leftPanel.elements.panel.style.display="block"),this.leftPanel.elements.lateralHandle&&(this.leftPanel.elements.lateralHandle.style.display="block"))},selectSheetByIndex:function(e){if(this.leftPanel){for(var t=0;t<this.sheets.length;t++){var i=this.sheets[t];i.className.indexOf("selected")>0&&i.removeClassName("selected")}var n=e+1,s=document.getElementById("Sheet_"+n);s&&s.addClassName("selected")}},loadImg:function(t){var i=t.index+1,n=t.sheetName,s=new e.Element("img",{src:t.url,id:"thumbnail_image",alt:"Thumbnail Image",title:n,styles:{width:"150",height:"90",position:"absolute",top:0,left:0,right:0}});document.getElementById("Sheet_"+i)&&document.getElementById("Sheet_"+i).appendChild(s)},loadDiv:function(t){var i="";void 0!==a&&void 0!==a.UDL_NoThumbnail&&""!==a.UDL_NoThumbnail&&(i=a.UDL_NoThumbnail);var n=t.index+1,s=new e.Element("div",{id:"No_THUMBNAIL",styles:{width:"150",height:"90",position:"absolute",color:"#B4B6BA","text-align":"center",backgroundColor:"white",top:0,left:0,right:0,"font-family":"Arial, Helvetica, sans-serif","font-size":"14px"}});s.textContent=i,document.getElementById("Sheet_"+n).appendChild(s)},dispose:function(){this.leftPanel&&(this.mainContainer.remove&&this.mainContainer.remove(),this.leftPanel.elements.panel.remove&&this.leftPanel.elements.panel.remove(),this.leftPanel.elements.lateralHandle&&this.leftPanel.elements.lateralHandle.remove(),this.leftPanel=void 0,this.mainContainer=void 0,this.sheets=[],s.unsubscribe(this.LeftPanelDisableSubscribe),s.unsubscribe(this.LeftPanelEnableSubscribe))}})}),define("DS/3DPlayUDLExperience/CmdScaleUDL",["UWA/Core","DS/ApplicationFrame/Command"],function(e,t){"use strict";return t.extend({init:function(e){for(var t in this._parent(e,{isAsynchronous:!1}),e.arguments)"Scale"==e.arguments[t].ID&&(this.scaleMode=e.arguments[t].Value)},execute:function(){var e=this.getFrameWindow();if(e&&e.experience){var t=e.experience.getZoomScale();"+"==this.scaleMode?t+=5:t-=5,t<=1?t=1:t>Number.MAX_VALUE&&(t=Number.POSITIVE_INFINITY),e.experience.updateZoomOutCmdStatus(t),e.experience.setZoomScale(t)}}})}),define("DS/3DPlayUDLExperience/CmdScrollUDL",["DS/ApplicationFrame/Command","DS/CoreEvents/Events","DS/WebUtils/EventDisposer"],function(e,t,i){"use strict";return e.extend({init:function(e){for(var t in this._parent(e,{isAsynchronous:!1}),e.arguments)"ScrollSheet"==e.arguments[t].ID&&(this.scrollDir=e.arguments[t].Value);var i=this;this._exp=this.getFrameWindow().experience,this.loadingCompletedToken=this._exp.subscribe("ASSET/LOADINGFINISHED",function(){1===i._exp.getNumberOfSheets()&&i.disable()})},execute:function(){"Previous"===this.scrollDir?this._exp.scrollToPreviousSheet():"Next"===this.scrollDir&&this._exp.scrollToNextSheet()},_destroy:function(){this._exp&&(this._exp.unsubscribe(this.loadingCompletedToken),this.loadingCompletedToken=void 0,this._exp=void 0,this._parent())}})}),define("DS/3DPlayUDLExperience/3DPlayUDLExperience",["DS/3DPlayExperienceModule/PlayExperience3D","DS/Visualization/ThreeJS_DS","DS/CoreEvents/Events","DS/3DPlayUDLExperience/UDLLeftPanel","DS/ApplicationFrame/CommandsManager","DS/3DPlayDrawingExperience/DrawingAnnotationManager","DS/WebUtils/ContextedSingleton","DS/3DPlayAnnotation3D/AnnotationManager","DS/WebSystem/Environment","DS/WebappsUtils/WebappsUtils","DS/WebSystem/App","DS/3DPlayUtils/IdentifyPLMType","DS/WebUtils/ProbesManager"],function(e,t,i,n,s,r,a,o,l,d,h,c,D){"use strict";var u,m=function(e,t){this.id=t,this.sheetName=null,this.sheetBackgroundClr=null,this.index=e,this.annotVpList=[],this.loadingStarted=!1,this.node=null,this.isLoaded=!1,this.setThumbnail=function(e){this.thumbnail=e},this.getThumbnail=function(){return this.thumbnail},this.setSource=function(e){this.node=e},this.getSource=function(){return this.node}},P=["DS/DibUDLWebLoader/CATDibUDLWebLoader"];return e.extend({init:function(e){this._parent(e),this._isSheetSettingScenario=null;var t=this;this.sheets=[],e.workbenchs=[],e.workbenchs.unshift({name:"3DPlayDocumentViewerPrint",module:"3DPlay2DExperience"}),e.workbenchs.unshift({name:"3DPlayUDLExperience",module:"3DPlayUDLExperience"}),l.isSet("3DPlay.Activate3DComment")&&e.workbenchs.push({name:"3DPlayComment",module:"3DPlay"}),this._hasLightbox?(h.isOnCloud()?e.workbenchs.push({name:"3DPlayShareComment_LightboxMode",module:"3DPlay"}):e.workbenchs.push({name:"3DPlayShare_LightboxMode",module:"3DPlay"}),e.workbenchs.push({name:"EnopadRightPanel_LightboxMode",module:"3DPlay"})):(this.force3DComment||(h.is3DSwym()||h.is3DDrive()||h.is3DSpace()||h.is3DPlay())&&h.isOnCloud()?this._iOS?e.workbenchs.push({name:"3DPlayShareComment_iOS",module:"3DPlay"}):e.workbenchs.push({name:"3DPlayShareComment",module:"3DPlay"}):this._iOS?e.workbenchs.push({name:"3DPlayShare_iOS",module:"3DPlay"}):e.workbenchs.push({name:"3DPlayShare",module:"3DPlay"}),h.is3DPlay()&&e.workbenchs.push({name:"EnopadRightPanel",module:"3DPlay"})),u=new c,this.loadingStartedToken=this.subscribe("ASSET/LOADINGSTARTED",function(){t.annotationManager=new r({frameWindow:t.frmWindow,context:t.ctx}),a.add(t.ctx,"ANNOTATION_MANAGER",t.annotationManager)}),this.loadingCompletedToken=this.subscribe("ASSET/LOADINGFINISHED",function(){t.sheetCameraDistance=t.frmWindow.getViewpoint().getTargetDistance(),t.zoomScale=100}),this.viewpointChangedToken=i.subscribe({event:"/VISU/"},function(e){if(t.hasOwnProperty("sheetCameraDistance")&&t.hasOwnProperty("zoomScale")&&("@onViewpointEndMove"==e.eventType||"@onViewpointChange"==e.eventType)){var i=t.frmWindow.getViewpoint().getTargetDistance();t._isSheetSettingScenario&&(t.sheetCameraDistance=i,t._isSheetSettingScenario=null),t.zoomScale=Math.floor(t.sheetCameraDistance/i*100),t.updateZoomOutCmdStatus(t.zoomScale)}})},refreshExp:function(){this.sheets=[],this.LeftPanel&&(this.LeftPanel.dispose(),this.LeftPanel=void 0)},onPreCreate:function(){this._parent(),this.tabletMabModel={speeddial:[{id:"Reframe",rsc:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"Previous",rsc:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"Next",rsc:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"AnnotationCommands",rsc:"3DPlay/3DPlayExperience3D"},{id:"AnnotationCommand3DText",rsc:"3DPlay/3DPlayExperience3D"},{id:"Background",rsc:"3DPlay/3DPlayExperience3D",toggle:[{id:"VisuWhiteMirrorOCACmd",rsc:"ViewerCommands/ViewerCommands"},{id:"VisuDarkMirrorOCACmd",rsc:"ViewerCommands/ViewerCommands"}]}],sections:[{id:"ScaleP",rsc:"3DPlayUDLExperience/3DPlayUDLExperience",nls:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"ScaleM",rsc:"3DPlayUDLExperience/3DPlayUDLExperience",nls:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"AnnotationTour",nls:"3DPlay/3DPlayExperience3D",rsc:"3DPlay/3DPlayExperience3D"},{id:"Print2DRealSize",rsc:"3DPlay2DExperience/3DPlay2DExperience",nls:"3DPlay2DExperience/3DPlay2DExperience"}]},this.mabModel={speeddial:[{id:"Reframe",rsc:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"AnnotationCommands",rsc:"3DPlay/3DPlayExperience3D"},{id:"AnnotationCommand3DText",rsc:"3DPlay/3DPlayExperience3D"}],sections:[{id:"ScaleP",rsc:"3DPlayUDLExperience/3DPlayUDLExperience",nls:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"ScaleM",rsc:"3DPlayUDLExperience/3DPlayUDLExperience",nls:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"Previous",rsc:"3DPlayUDLExperience/3DPlayUDLExperience",nls:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"Next",rsc:"3DPlayUDLExperience/3DPlayUDLExperience",nls:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"AnnotationTour",nls:"3DPlay/3DPlayExperience3D",rsc:"3DPlay/3DPlayExperience3D"},{id:"Print2DRealSize",rsc:"3DPlay2DExperience/3DPlay2DExperience",nls:"3DPlay2DExperience/3DPlay2DExperience"},{id:"Background",nls:"3DPlay/3DPlayExperience3D",rsc:"3DPlay/3DPlayExperience3D",toggle:[{id:"VisuWhiteMirrorOCACmd",rsc:"ViewerCommands/ViewerCommands"},{id:"VisuDarkMirrorOCACmd",rsc:"ViewerCommands/ViewerCommands"}]}]},this._hasLightbox||(this.mabModel.speeddial.push({id:"Share",icon:"3DPlay/assets/icons/32/I_3DSHAREShare.png",flyout:[]}),this.tabletMabModel.speeddial.push({id:"Share",icon:"3DPlay/assets/icons/32/I_3DSHAREShare.png",flyout:[]}));var e=this.tabletMabModel.speeddial.filter(function(e){return"Share"===e.id});this._hasLightbox||(this._iOS,e&&(e[0].flyout=[{id:"ShareTo3DSwYm",rsc:"3DPlay/3DPlay"},{id:"ShareDownload",rsc:"3DPlay/3DPlay"},{id:"SharePrint",rsc:"3DPlay/3DPlay"}]),this.mabModel.speeddial[3].flyout=[{id:"ShareTo3DSwYm",rsc:"3DPlay/3DPlay"},{id:"ShareDownload",rsc:"3DPlay/3DPlay"},{id:"SharePrint",rsc:"3DPlay/3DPlay"}],(this.force3DComment||(h.is3DSwym()||h.is3DDrive()||h.is3DSpace()||h.is3DPlay())&&h.isOnCloud())&&(this.mabModel.speeddial[3].flyout.unshift({id:"Share3DComment",rsc:"3DPlay/3DPlay"}),e&&e[0].flyout.unshift({id:"Share3DComment",rsc:"3DPlay/3DPlay"})),h.is3DPlay()&&(this.tabletMabModel.sections.push({id:"RightSidePanel",rsc:"PADUtils/PADUtils",nls:"PADUtils/PADUtils"}),this.mabModel.sections.push({id:"RightSidePanel",rsc:"PADUtils/PADUtils",nls:"PADUtils/PADUtils"})))},onPostCreate:function(){this.viewer||(this.viewer=this.frmWindow.getViewer()),this.viewer.getCurrentState=function(){var e=Date.now(),t=this.viewer.currentViewpoint;return{id:e,eyePosition:t.getEyePosition(),targetDistance:t.getTargetDistance(),sheetIndex:this.currentSheetIndex,viewerBackgroundEnvInfo:this.frmWindow.getViewer().getVisuEnv()}}.bind(this),this.viewer.set2DMode(!0),this.pad3DViewer.displayStatusBar(!1),this.viewer.setAntiAliasing("MSMAA"),this.EventDisposer.add(i.subscribe({event:"3DPLAY/MOBILEACTIONBAR/UPDATE/COMPLETE/ON/RESIZE"},()=>{let e=this.frmWindow.getViewer().getVisuEnv();"DarkMirrorOCA"===e?this.frmWindow.getActionBar().MAB.updateToggle("VisuDarkMirrorOCACmd","ViewerCommands/ViewerCommands",!0):"WhiteMirrorOCA"===e&&this.frmWindow.getActionBar().MAB.updateToggle("VisuWhiteMirrorOCACmd","ViewerCommands/ViewerCommands",!1)})),this._parent()},loadModel:function(e){this.onModelLoadingStarted();var t,i,n,r=this;this.refreshExp();var a,o,d=e.asset;if(d&&(d.provider&&(a=d.provider),d.type&&(o=d.type)),this.loadingAsset.Load_Infra=D.createProbe("Load_Infra").begin(),"file"===a.toLowerCase()){"udl"===o&&require(["DS/DibUDLWebLoader/DraftingUDLWebLoader"],function(t){if(r.loadingAsset.Load_Infra.end(),t&&(r._UDLLoader&&r._UDLLoader.clearLoader&&r._UDLLoader.clearLoader(),r._UDLLoader=new t,r._UDLLoader.set3DAccuracy(.001),r._UDLLoader.set2DAccuracy(.001),e)){var i={provider:"FILE",serverurl:"",proxyurl:"none",requiredAuth:null};"file"===a.toLowerCase()?i.filename=e.asset.filename?e.asset.filename:e.asset.url:i.filename=e.asset.data;var n={UDLObjURL:i,onComplete:function(e){for(var t=0;t<e.sheetIDList.length;t++){var i=new m(t,e.sheetIDList[t]),n=r._UDLLoader.getSheetName(i.id);i.sheetName=n,i.sheetBackgroundClr=r._UDLLoader.getSheetBackgroundColor(i.id),r.sheets.push(i),e&&e.currentSheetID&&e.sheetIDList[t]===e.currentSheetID&&(r.currentSheetIndex=t)}r.currentSheetIndex||(r.currentSheetIndex=0),r.sheets.length>=1&&r.loadThumbnail(),r.cmds=s.getCommands(r.ctx),r.setCurrentSheet(r.currentSheetIndex),r.loadingAsset.Load_Session.end()},onFailure:function(){console.log("Unexpected error!! Failed to Load UDL via _UDLLoader.loadModel!!")}};r._UDLLoader&&(r.loadingAsset.Load_Session=D.createProbe("Load_Session").begin(),r._UDLLoader.loadModel(n))}})}else if("udl"===o){var h=d.originalAsset,c=h.contextid?h.contextid:h.contextId?h.contextId:"preferred";l.get("PreferredCredentials")&&(c=l.get("PreferredCredentials")),h&&h.dtype&&h.physicalid&&h.serverurl&&(t=h.dtype,u.isKindOfDrawing(h,function(e){e&&(t=e),i=h.physicalid,n=h.serverurl,r.loaderExternal({dtype:t,phyId:i,serverurl:n,securityContext:c})}))}else if(("DIFSheet"===o||"DIFLayout"===o)&&d.dtype&&d.physicalid&&d.serverurl){c=d.contextid?d.contextid:d.contextId?d.contextId:"preferred";l.get("PreferredCredentials")&&(c=l.get("PreferredCredentials")),t=d.dtype,i=d.physicalid,n=d.serverurl,this.loaderExternal({dtype:t,phyId:i,serverurl:n,securityContext:c})}},loaderExternal:function(e){var t=this,i=e.phyId,n=e.dtype,r=e.serverurl;this.loadingAsset.Load_Infra=D.createProbe("Load_Infra").begin(),require(P,function(a){if(t.loadingAsset.Load_Infra.end(),a){t._UDLLoader&&t._UDLLoader.clearLoader&&t._UDLLoader.clearLoader(),t._UDLLoader=new a,t._UDLLoader.set3DAccuracy(.001),t._UDLLoader.set2DAccuracy(.001);var o=e.securityContext,l={data:{physicalid:i,dataType:n},securityContext:o,serverUrl:r,onComplete:function(e){for(var i=0;i<e.sheetIDList.length;i++){var n=new m(i,e.sheetIDList[i]),r=t._UDLLoader.getSheetName(n.id);n.sheetName=r,n.sheetBackgroundClr=t._UDLLoader.getSheetBackgroundColor(n.id),t.sheets.push(n),e&&e.currentSheetID&&e.sheetIDList[i]===e.currentSheetID&&(t.currentSheetIndex=i)}t.currentSheetIndex||(t.currentSheetIndex=0),t.sheets.length>=1&&t.loadThumbnail(),t.cmds=s.getCommands(t.ctx),t.setCurrentSheet(t.currentSheetIndex),t.loadingAsset.Load_Session.end()},onFailure:function(){console.log("Failed loading model")}};t._UDLLoader&&(t.loadingAsset.Load_Session=D.createProbe("Load_Session").begin(),t._UDLLoader.loadModel(l))}})},loadThumbnail:function(){var e=this;this.sheets.forEach(function(t){e._UDLLoader.getSheetThumbnail({sheetID:t.id,onComplete:function(i){void 0===e.LeftPanel&&e.initiateLeftPanel(),t.setThumbnail(i),e.LeftPanel.loadImg({url:i,index:t.index,sheetName:t.sheetName})},onFailure:function(){void 0===e.LeftPanel&&e.initiateLeftPanel(),t.setThumbnail(null),e.LeftPanel.loadDiv({url:null,index:t.index,sheetName:t.sheetName}),console.log("No Thumbnail Available!! Thumbnail Loading Failed!! Failed to Load Thumbnail via _UDLLoader.getSheetThumbnail")}})})},getSheet3DNode:function(e,t,i){this.getPhaseProgress().setIndeterminateState(),this.getPhaseProgress().showProgressBar();var n=this;e.loadingStarted=!0;var s={sheetID:e.id,onSheetNodeCreated:function(t){var i=n.frmWindow.experience.getRootBag();t.visible=!1,i.addChild(t),e.setSource(t)},onSheetLoaded:function(){n.modelLoadComplete||n.modelLoader.onLoadedCB(),e.isLoaded=!0,e.loadingStarted=!1,t(i),n.getPhaseProgress().resetProgress(),n.getPhaseProgress().hideProgressBar()},onFailure:function(){console.log("Unexpected error"),n=void 0}};this._UDLLoader.getSheet3DNode(s)},unloadSheet:function(e){this.viewer.removeNode(e.getSource()),this.viewer.render()},setUpActionBarAmbienceCmd:function(e,t){let i=s.getCommands(this.ctx),n=null;t&&"None"!==t?"DarkMirrorOCA"===t?n="000000":"WhiteMirrorOCA"===t&&(n="ffffff"):n=e.getHexString(),"ffffff"!==n?i&&i.VisuDarkMirrorOCACmd&&(i.VisuDarkMirrorOCACmd.begin(),this.frmWindow.getActionBar().MAB.updateToggle("VisuDarkMirrorOCACmd","ViewerCommands/ViewerCommands",!0)):"ffffff"===n&&i&&i.VisuWhiteMirrorOCACmd&&(i.VisuWhiteMirrorOCACmd.begin(),this.frmWindow.getActionBar().MAB.updateToggle("VisuWhiteMirrorOCACmd","ViewerCommands/ViewerCommands",!1))},setCurrentSheet:function(e,t,i){if(e>=0&&e<this.sheets.length){this._isSheetSettingScenario=!0;var n=this.sheets[this.currentSheetIndex].sheetBackgroundClr;this.setUpActionBarAmbienceCmd(n,i),this.annotationManager.hideAnnotationsOfCurrentSheet(),this.sheets[this.currentSheetIndex].isLoaded&&(this.sheets[this.currentSheetIndex].getSource().setVisibility(!1),this.viewer.render()),this.currentSheetIndex=e,this.sheets.length>1&&(this.cmds.Previous._isEnabled||this.cmds.Previous.enable(),this.cmds.Next._isEnabled||this.cmds.Next.enable(),this.currentSheetIndex===this.sheets.length-1?this.cmds.Next.disable():0===this.currentSheetIndex&&this.cmds.Previous.disable()),this.sheets[this.currentSheetIndex].isLoaded?this.showCurrentSheet(t):this.getSheet3DNode(this.sheets[this.currentSheetIndex],this.showCurrentSheet.bind(this),t),this.frmWindow.experience.publish("3DPLAY/UDLEXP/MAB/SCROLL/NAVIGATIONSTATEUPDATE",{})}},showCurrentSheet:function(e){this.LeftPanel&&this.LeftPanel.selectSheetByIndex(this.currentSheetIndex),this.sheets[this.currentSheetIndex].getSource().setVisibility(!0),this.viewer.currentViewpoint.reframe(),this.viewer.render(),this.annotationManager.showAnnotationsOfCurrentSheet(),e&&e()},getSheet:function(e){return this.sheets.length>0&&e<this.sheets.length?this.sheets[e]:void console.log("Invalid sheet index!!!")},onFailure:function(){console.log("Unexpected error")},initiateLeftPanel:function(){var e=this;this.LeftPanel=new n({items:this.sheets,frmWindow:this.frmWindow,clickCB:function(t){e.setCurrentSheet(t)}})},getZoomScale:function(){return this.zoomScale},updateZoomOutCmdStatus:function(e){let t=s.getCommands(this.ctx).ScaleM;t&&(e<=1?t.disable():t.enable())},setZoomScale:function(e){this.zoomScale=e;var t=this.frmWindow.getViewpoint(),i=100*this.sheetCameraDistance/this.zoomScale;t.moveTo({distanceToTarget:i,duration:100}),this.frmWindow.getViewer().render()},getNumberOfSheets:function(){return this._UDLLoader.getNumberOfSheets()},getCurrentSheet:function(){return this.sheets[this.currentSheetIndex]},scrollToPreviousSheet:function(){var e=this.currentSheetIndex-1;this.setCurrentSheet(e)},scrollToNextSheet:function(){var e=this.currentSheetIndex+1;this.setCurrentSheet(e)},dispose:function(){this.viewpointChangedToken&&(i.unsubscribe(this.viewpointChangedToken),this.viewpointChangedToken=void 0),this.loadingCompletedToken&&(this.unsubscribe(this.loadingCompletedToken),this.loadingCompletedToken=void 0),this.loadingStartedToken&&(this.unsubscribe(this.loadingStartedToken),this.loadingStartedToken=void 0),this.clearView(),this._parent(),this._UDLLoader&&this._UDLLoader.clearLoader&&this._UDLLoader.clearLoader(),this._UDLLoader=null,this.sheets=null,this.viewer=null,this.LeftPanel&&(this.LeftPanel=void 0)}})}),define("DS/3DPlayUDLExperience/3DPlayUDLExperiencePreview",["DS/3DPlayUDLExperience/3DPlayUDLExperience"],function(e){"use strict";return e.extend({init:function(e){this._parent(e),e.workbenchs=[],e.workbenchs.unshift({name:"3DPlayUDLExperiencePreview",module:"3DPlayUDLExperience"})},dispose:function(){this._parent()},onPreCreate:function(){this.args.visu={picking:!1};var e=this;this.args.ui={keepActionbarClosed:!0,onActionBarReady:function(){e&&e.frmWindow&&(e.frmWindow.getActionBar().close(),e=void 0)}},this.mabModel={speeddial:[{id:"Reframe",rsc:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"Previous",rsc:"3DPlayUDLExperience/3DPlayUDLExperience"},{id:"Next",rsc:"3DPlayUDLExperience/3DPlayUDLExperience"}]}}})});