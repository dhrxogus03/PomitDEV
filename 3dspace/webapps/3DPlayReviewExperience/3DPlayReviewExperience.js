define("DS/3DPlayReviewExperience/3DPlayReviewExperience",["DS/Selection/PSOManager","DS/3DPlayExperienceModule/PlayExperience3D","DS/Visualization/ThreeJS_DS","DS/DMUReadPersistence/DMULoadMarkupServices","DS/DMUBaseUIServices/DMUSlidePreferences","DS/DMUBaseExperience/DMUContextManager","DS/DMUBaseUIControllers/DMU2DSheetManager","DS/DMUBaseExperience/EXPManagerSet","DS/DMUPlaySlide/controllers/DMUSlideShowController","DS/CATWebUXComponents/DMUCommandsManager","DS/DMUReadPersistence/DMUReviewPersistenceServicesSetting","DS/DMUBaseUIControllers/DMUReviewContextInitializer","DS/DMUBaseUIControllers/DMUSlidesController","DS/DMUBaseUIControllers/DMUCommentsController","DS/DMUBaseUIControllers/DMUApplicativeContextManager","DS/CATWebUXPreferences/CATWebUXPreferencesManager","DS/CATWebUXSelectionManager/CATWebUXSelectionManager","DS/CATWebUXPreferences/CATWebUXPreferencesUtils","DS/CATWebUXComponents/CATWebUXUtils","DS/PADUtils/PADUtilsServices","DS/PADUtils/PADSettingsMgt","DS/PADUtils/views/PADProgressBar","DS/DMUMeasurable/DMUToolsSceneGraph","DS/DMUReadPersistence/DMULoadingContextController","DS/3DPlay/3DPlay","i18n!DS/3DPlayReviewExperience/assets/nls/3DPlayReviewExperience"],function(e,t,i,n,r,a,o,l,s,c,d,p,g,D,u,m,C,f,w,h,P,V,S,v,y,R){"use strict";var M;return t.extend({init:function(t){var M,x,b,A,U,I,T,E,k,W=!1,F=this,_=!0,L={},X="";let B,O,N,H=null,G=!1,j="Perspective",q=!1,z=!1,J="selectParentReference";function K(){(k=C.getSelectionManager({context:F.pad3DViewer})).setActiveState(!0),(E=m.getPreferenceManager({context:F.pad3DViewer.getFrameWindow()}))&&(E.setUnitsPreferencesDisplayFlag(!0),E.setDisplayPreferencesDisplayFlag(!0),E.set3DSelectionPreferencesDisplayFlag(!0),E.set2DSelectionPreferencesDisplayFlag(!0),E.setMeasurePreferencesDisplayFlag(!0),E.setClippingPreferencesDisplayFlag(!0),E.addPreferences([{nls:R.preferences.markupSectionTitle,id:"MarkupPreferences",type:"section",preferences:[{nls:R.preferences.SlideTitleDisplayLbl,id:"DisplaySlideTitle",type:"checkbox",getValue:function(){return"true"===localStorage.getItem("CATWebUXMePreferences_DisplaySlideTitle")},getDefaultValue:function(){return!1},setValue:function(e){e!==("true"===localStorage.getItem("CATWebUXMePreferences_DisplaySlideTitle"))&&localStorage.setItem("CATWebUXMePreferences_DisplaySlideTitle",e?"true":"false")}}]},{nls:R.preferences.compareSectionTitle,id:"ComparePreferences",type:"section",preferences:[{nls:R.preferences.firstProductColor,id:"CompareFirstColor",type:"color",getValue:function(){return localStorage.getItem("CATWebUXMePreferences_CompareFirstColor")?localStorage.getItem("CATWebUXMePreferences_CompareFirstColor"):"#FF0000"},getDefaultValue:function(){return"#FF0000"},setValue:function(e){localStorage.setItem("CATWebUXMePreferences_CompareFirstColor",e)}},{nls:R.preferences.secondProductColor,id:"CompareSecondColor",type:"color",getValue:function(){return localStorage.getItem("CATWebUXMePreferences_CompareSecondColor")?localStorage.getItem("CATWebUXMePreferences_CompareSecondColor"):"#00FF00"},getDefaultValue:function(){return"#00FF00"},setValue:function(e){localStorage.setItem("CATWebUXMePreferences_CompareSecondColor",e)}},{nls:R.preferences.compare3DCommonColor,id:"Compare3DCommonColor",type:"color",getValue:function(){return localStorage.getItem("CATWebUXMePreferences_Compare3DCommonColor")?localStorage.getItem("CATWebUXMePreferences_Compare3DCommonColor"):"#D3D3D3"},getDefaultValue:function(){return"#D3D3D3"},setValue:function(e){localStorage.setItem("CATWebUXMePreferences_Compare3DCommonColor",e)}},{nls:R.preferences.compare2DCommonColor,id:"Compare2DCommonColor",type:"color",getValue:function(){return localStorage.getItem("CATWebUXMePreferences_Compare2DCommonColor")?localStorage.getItem("CATWebUXMePreferences_Compare2DCommonColor"):"#000000"},getDefaultValue:function(){return"#000000"},setValue:function(e){localStorage.setItem("CATWebUXMePreferences_Compare2DCommonColor",e)}}]}]),E.setPreferredPreferenceContainersOrder(["MarkupPreferences","MeasurePreferences","SectionPreferences","ComparePreferences"]),H=E.subscribe("com.ds.mep:onPrefUpdate",function(e){let t=JSON.parse(e[1].preferences);for(let e=0;e<t.repositories.length;e++)for(let i=0;i<t.repositories[e].preferences.length;i++)"SelectParentReferenceOr3DShape"===t.repositories[e].preferences[i].name?(J=t.repositories[e].preferences[i].value,k&&k.selectParentReference("select3DShape"!==J)):"Select3DGeometry"===t.repositories[e].preferences[i].name?(q="true"===t.repositories[e].preferences[i].value,k&&k.setPicking(q?0:1)):"Select2DGeometry"===t.repositories[e].preferences[i].name?(z="true"===t.repositories[e].preferences[i].value,k&&F.pad3DViewer.getViewer().get2DMode()&&k.setPicking(z?0:1)):"ProjectionType"===t.repositories[e].preferences[i].name?(j=t.repositories[e].preferences[i].value,F.pad3DViewer&&F.pad3DViewer.getViewer()&&F.pad3DViewer.getViewer().currentViewpoint&&F.pad3DViewer.getViewer().currentViewpoint.setProjectionType(j)):"Gravity"===t.repositories[e].preferences[i].name&&(G="true"===t.repositories[e].preferences[i].value,F.pad3DViewer&&F.pad3DViewer.getViewer()&&F.pad3DViewer.getViewer().currentViewpoint&&F.pad3DViewer.getViewer().currentViewpoint.control&&(F.pad3DViewer.getViewer().currentViewpoint.getControl().setRotationRolling(!G),F.pad3DViewer.getViewer().currentViewpoint.getControl().setRollingForTouchAvailable(!G)))}),f.readPreferences([{Repository:"VisualizationRepository",PreferenceNames:["Gravity"]},{Repository:"FrameGeneral",PreferenceNames:["ProjectionType"]},{Repository:"SelectionRepository",PreferenceNames:["Select3DGeometry","SelectParentReferenceOr3DShape","Select2DGeometry"]}]).then(e=>{let t=e.repositories;for(let e=0;e<t.length;e++)if("VisualizationRepository"===t[e].name)G="true"===t[e].preferences[0].value;else if("FrameGeneral"===t[e].name)j=t[e].preferences[0].value;else if("SelectionRepository"===t[e].name){let i=t[e].preferences;for(let e=0;e<i.length;e++)"Select3DGeometry"===i[e].name?q="true"===i[e].value:"Select2DGeometry"===i[e].name?z=i[e].value:"SelectParentReferenceOr3DShape"===i[e].name&&(J=i[e].value)}F.pad3DViewer.getViewer().get2DMode()?k&&k.setPicking(z?0:1):("boolean"==typeof G&&(F.pad3DViewer.getViewer().currentViewpoint.getControl().setRotationRolling(!G),F.pad3DViewer.getViewer().currentViewpoint.getControl().setRollingForTouchAvailable(!G)),"Perspective"!==j&&"Parallel"!==j||F.pad3DViewer.getViewer().currentViewpoint.setProjectionType("Perspective"===j?0:1),k&&k.setPicking(q?0:1),k&&k.selectParentReference("select3DShape"!==J))}).catch(e=>{F.pad3DViewer.getViewer().get2DMode()?(k&&k.setPicking(z?0:1),window.console.warn("Could not get server value, default value set instead.",e)):("boolean"==typeof G&&(F.pad3DViewer.getViewer().currentViewpoint.getControl().setRotationRolling(!G),F.pad3DViewer.getViewer().currentViewpoint.getControl().setRollingForTouchAvailable(!G)),"Perspective"!==j&&"Parallel"!==j||F.pad3DViewer.getViewer().currentViewpoint.setProjectionType("Perspective"===j?0:1),k&&k.setPicking(q?0:1),k&&k.selectParentReference("select3DShape"!==J),window.console.warn("Could not get server value, default value set instead.",e))})),U||(U=new s({context:F.pad3DViewer})).subscribe("onActiveStateModified",function(e){_=!e.state})}function Q(e){var t={lastCommand:[],currentCommand:null,defaultCommand:null},i=F.pad3DViewer.getCommandContext();i?c._commandsState[i]=t:c._commandsState=t,c.resetDefaultCommand(i),c._isCommandEnding=!1,c._ignoreCommandBeginWhileEndingCommand=!1,["_commands","_cmdCheckHeader"].forEach(function(e){var t=i&&c[e]?c[e][i]:c[e];t&&Object.keys(t).forEach(function(e){var i=t[e];i&&i._destroy&&i._destroy(),delete t[e]})});var n=F.pad3DViewer.getFrameWindow().getActionBar(),r=n.onActionBarReady(function(){n.removeCallback(r),setTimeout(e.actionBarReadyCb,500)});F.pad3DViewer.loadActionBar({file:e.file,module:e.module})}function Y(e,t){var i=function(){if(F.pad3DViewer){var e=c.getCommandCheckHeader("WebDocumentBookmarksPanelCmdHdr",F.pad3DViewer.getCommandContext());if(e){let i=localStorage.getItem("DMUBookmarksPanelDisplayed");"true"!==i&&("false"===i||"Requirement"!==t&&"Requirement Specification"!==t)||e.setState(!0),b&&b.documentHasBookmarks()?e.enable():e.disable()}(e=c.getCommand("WebDocumentRotatePagesLeftCmdHdr",F.pad3DViewer.getCommandContext()))&&(b&&"Document"===b.getDocumentType()?e.enable():e.disable()),(e=c.getCommand("WebDocumentRotatePagesRightCmdHdr",F.pad3DViewer.getCommandContext()))&&(b&&"Document"===b.getDocumentType()?e.enable():e.disable()),(e=c.getCommand("DMUNextCommentCmdHdr",F.pad3DViewer.getCommandContext()))&&(T&&T.hasComments()?e.enable():e.disable()),(e=c.getCommand("DMUPreviousCommentCmdHdr",F.pad3DViewer.getCommandContext()))&&(T&&T.hasComments()?e.enable():e.disable());let l=a.getReviewContext({context:F.pad3DViewer}),s=l&&l.getCurrentSessionMarkup()||null;var i=g.giveDMUSlidesController({context:F.frmWindow});if(s&&(!b||!b.isRunning()&&!b.isADocumentDisplayed())){var n=s.getSlides(),r=s.getAttribute("sCurrentSlideId");if(F.autoReframe=!1,i)if("string"==typeof r){for(var o=0;o<n.length;o++)if(n[o].getAttribute("sID")===r){i.setActiveSlide(n[o]);break}}else n.length&&i.setActiveSlide(n[0])}i&&i.updateHeaderCommandsAvailability()}};X!==e?("ITF"===e?Q({file:"3DPlayReviewITFExperience.xml",module:"3DPlayReviewExperience",actionBarReadyCb:i}):"Document"===e?Q({file:"3DPlayReviewDocumentExperience.xml",module:"3DPlayReviewExperience",actionBarReadyCb:i}):"3D"===e?Q({file:"3DPlayReviewExperience.xml",module:"3DPlayReviewExperience",actionBarReadyCb:i}):"2D"===e?Q({file:"3DPlayReviewDrawingExperience.xml",module:"3DPlayReviewExperience",actionBarReadyCb:i}):"MSR"===e&&Q({file:"3DPlayReviewMSRExperience.xml",module:"3DPlayReviewExperience",actionBarReadyCb:i}),X=e):i()}function Z(e){x||(x=u.getDMUApplicativeContextManager({context:F.pad3DViewer})).initApplicativeContainer(e,{onReady:function(e){e&&e.length&&e.forEach(function(e){"POI"!==e.getApplicativeContainerID()&&e.setActiveState(!0)})}})}function $(e){b&&b.load2DDocument({phyID:e.phyID,serverUrl:h.get3DSpaceUrl(),securityContext:P.getSetting("pad_security_ctx"),dataType:e.dataType,is2DCompareActive:B,parentNode:F.pad3DViewer.getRootBagPath().getChildrenPathes()[F.pad3DViewer.getRootBagPath().getChildrenPathes().length-1].getLastElement(!0),onLoadingStarted:e.onLoadingStarted,onComplete:e.onComplete,onFailure:e.onFailure})}d.doInitialize(),this.getSlideIDToActivate=function(e){let t;if(e){var i=e.getLoadedRepRefs();return i.length>0&&i[0].getMarkupContent()&&i[0].getMarkupContent().getSlides()&&i[0].getMarkupContent().getSlides().length&&(t=i[0].getMarkupContent().getSlides()[0].getAttribute("sUuid")),t}},this.setReviewData=(e=>{M=JSON.stringify(e)}),this.internalLoad=function(e,t){if(a.removeReviewContext({context:F.pad3DViewer}),e){M=JSON.stringify(e);var i=e.asset.physicalid;if(e.asset&&e.asset.physicalid){var s=e.asset;let c,d;s.reviewId=e.asset.physicalid,s.context=F.pad3DViewer,e.asset.Play3DXContent&&e.asset.Play3DXContent.data&&e.asset.Play3DXContent.data.items&&e.asset.Play3DXContent.data.items.length>0&&(s.commentId=e.asset.Play3DXContent.data.items[0]?e.asset.Play3DXContent.data.items[0].commentId:null);let u,m=[],C=[],f=function(){if(c&&d&&m.length&&u){I||(I=g.giveDMUSlidesController({context:F.frmWindow}));let r=function(e,t){var i=a.giveEventsController({viewer:F.pad3DViewer.getViewer()});if(i){let n=i.addEvent("on2DDocumentLoadSuccess",function(){T&&T.applyComment({commentId:t,markupId:e}),i.removeEvent(n)})}};for(var e=0;e<m.length;e++){let a=null;for(var t=0;t<C.length;t++)C[t].getAttribute("sPresentationSlideID")===m[e].getAttribute("sUuid")&&((n={highlight:C[t],slide:m[e]})&&n.slide&&n.slide.addAssociatedHighlightData&&n.highlight&&n.slide.addAssociatedHighlightData({id:n.highlight.getPlmID(),rating:n.highlight.getRating(),hasIssue:Boolean(n.highlight._lIssuesIDs.length),hasImpactedChecks:Boolean((n.highlight.getAssociatedCheck()||[]).length)}),m[e].getAttribute("sUuid")===u&&(a=C[t]));if(m[e].getAttribute("sUuid")===u)if(F.autoReframe=!1,"DMUSlide"===m[e].getType())I&&I.setActiveSlide(m[e]);else if("DMUComment"===m[e].getType()){var i=m[e].getAttribute("sUuid");if(a)r(a.getAttribute("sRepRefMarkupID"),i)}}}var n};s.cbRootAdded=function(){let e=a.giveEventsController({viewer:F.pad3DViewer.getViewer()}),t=e.addEvent("onDXFLoadSuccess",function(){Y("2D"),e.removeEvent(t)});var i;c=!0,F.pad3DViewer.getRootBagPath().getChildrenPathes()[0]&&(i=S.getNodeType(F.pad3DViewer.getRootBagPath().getChildrenPathes()[0].getLastElement(!0)));var n=F.pad3DViewer.getApplicativeData().getLoadedItfData&&F.pad3DViewer.getApplicativeData().getLoadedItfData().data.length?"ITF":"Drawing"===i||"DIFLayout"===i||"DIFSheet"===i?"2D":"Document"===i||"Specification Report"===i||"Requirement"===i||"Requirement Specification"===i?"Document":"DesignSight"===i?"MSR":"3D";if(!A||"DXF"!==A.getLoadMarkupCtxType()&&"DWG"!==A.getLoadMarkupCtxType()||(n="2D"),Z(n),Y(n,i),"Drawing"===i){let e=S.getNodeID(F.pad3DViewer.getRootBagPath().getChildrenPathes()[0].getLastElement(!0)),t=0;$({phyID:e,dataType:i,onLoadingStarted:function(){1===++t&&V.on()},onComplete:function(){B=!0,--t<=0&&(V.off(),t=0)},onFailure:function(){B=!0,F.pad3DViewer.removeRoots({pids:[e]}),--t<=0&&(V.off(),t=0)}}),O||(O=F.pad3DViewer.subscribe({event:"onRootAdded"},function(i){$({phyID:i.id,dataType:S.getNodeType(i.path.getLastElement(!0)),onLoadingStarted:function(){1===++t&&V.on()},onComplete:function(){--t<=0&&(V.off(),t=0)},onFailure:function(){F.pad3DViewer.removeRoots({pids:[e]}),--t<=0&&(V.off(),t=0)}})})),N||(N=F.pad3DViewer.subscribe({event:"onRootRemoved"},function(e){b&&b.clean2DDocument(e)}))}if("Document"===n&&(F.pad3DViewer.getViewpoint().setDefaultController(!0,"CATIA"),T||(T=D.giveDMUCommentsController({context:F.frmWindow,commandContext:F.pad3DViewer.getCommandContext()})),b&&!b.isADocumentDisplayed())){let t=e.addEvent("on2DDocumentLoadSuccess",()=>{e.removeEvent(t),Y(n,i)})}K(),W||(r.setSlidePreferences({context:F.frmWindow,preferences:{playMode:!0,displayNominal:!1}}),W=!0),f()},s.cbOK=async function(){if(d=!0,!I||t){var e,n=await p.createReviewContext({context:F.pad3DViewer}),r=n.getValidation();let t=r.getHighlights();if(t&&t.length)for(e=0;e<t.length;e++)C.push(t[e]);if(n.getCurrentSessionMarkup()){if(r=n.getValidation()){var a=r.getLoadedRepRefs();for(e=0;e<a.length;e++)if(a[e].getMarkupContent()){m=m.concat(a[e].getMarkupContent().getSlides());for(let t=0;t<a[e].getMarkupContent().getSlides().length;t++){var o=a[e].getMarkupContent().getSlides()[t].getDMUObjects();for(let e=0;e<o.length;e++)o[e].getDMUComments&&(m=m.concat(o[e].getDMUComments()))}}}u=F.getSlideIDToActivate(r,i),f()}}},s.cbFailed=function(){F.clearView()},(b=l.getManager({name:"DMU2DSheetManager",context:F.frmWindow}))||(b=new o({ctxViewer:F.pad3DViewer}),l.addManager({name:"DMU2DSheetManager",context:F.frmWindow,manager:b})),A||(A=v.getLoadingContextController({context:F.pad3DViewer})),function(e){let t=n.getLoadMarkupServices(e);t&&(delete e.context,e.readOnly=!0,e.editionMode=!1,r.setSlidePreferences({context:F.pad3DViewer.getFrameWindow(),preferences:{displayNominal:!1,displayInWork:!1}}),t.loadValidation(e))}(s)}}},this.internalClear=function(e){if(F.pad3DViewer&&O&&F.pad3DViewer.unsubscribe(O),O=null,F.pad3DViewer&&N&&F.pad3DViewer.unsubscribe(N),N=null,E){E.removePreferences(["MarkupPreferences"]);var t=Object.keys(L);for(let e=0;e<t.length;e++)E.unsubscribe(L[t[e]]);L={},H&&(E.unsubscribe(H),H=null)}if(U&&(U.clean(),U=null),e){if(F.pad3DViewer.getRootBagPath().getChildrenPathes()[0]){var i=S.getNodeID(F.pad3DViewer.getRootBagPath().getChildrenPathes()[0].getLastElement(!0));F.pad3DViewer.getController().removeRoots({pids:[i]})}l.removeManager({name:"DMU2DSheetManager",context:F.frmWindow}),m.unreferencePreferenceManager({context:F.pad3DViewer.getFrameWindow()}),E=null,C.unreferenceSelectionManager({context:F.pad3DViewer}),k=null,a.removeReviewContext({context:F.pad3DViewer}),I=T=null}B=!1},this.internalDispose=function(e){const t=F.pad3DViewer&&F.pad3DViewer.getCommandContext(),i=y.getExperience(t);i&&i.executeScriptingFunction("showAll"),M=null,F.frmWindow.getContextualUIManager().unregister("3DPlayReviewExperience"),r.removeSlidePreferences({context:F.frmWindow}),F.internalClear&&F.internalClear("ENOR3V_AP"!==e&&"ENOR3R_AP"!==e),W=!1},this.internalRefresh=function(){M&&(F.internalClear(!0),F.internalLoad(JSON.parse(M),!0))},this.internalPostCreate=function(){this.frmWindow.getContextualUIManager().register({subscriberId:"3DPlayReviewExperience",workbenchName:"3DPlayReviewExperience",context:F.pad3DViewer.getCommandContext(),cmdPrefix:"",fileName:"3DPlayReviewExperience.xml",module:"3DPlayReviewExperience",onContextualMenuReady:function(t,n){var r=[];if(_&&n&&n.XmousePosition){var a=new i.Vector2(n.XmousePosition,n.YmousePosition),o=F.frmWindow.getViewer().getMousePosition(a);if(0===F.frmWindow.getViewer().pick(o,"mesh",!0).path.length){var l=e.get(),s=l&&l[0]&&l[0].pathElement?l[0].pathElement.getLastElement(!0):null,c=s&&s.getDMUType?s.getDMUType():"";if("Highlights"===c||"Checks"===c)return{cmdList:r};w.isMobile()||(r=[{line:1,name:"DMU3DReviewDisplaySubMenu",resourceFile:"DMUBaseCommands/3DPlayPro",hdr_list:["VisuQMCommand"]}]),r=r.concat([{line:1,name:"DMU3DReviewAmbiencesSubMenu",resourceFile:"DMUBaseCommands/3DPlayPro",hdr_list:["VisuPureWhiteOCACmd","VisuWhiteMirrorOCACmd","VisuWhiteReviewOCACmd","VisuWhiteExperienceOCACmd","VisuStudioOCACmd","VisuDarkMirrorOCACmd","VisuDarkReviewOCACmd","VisuWhiteDesignOCACmd","VisuBlueDesignOCACmd","VisuDarkDesignOCACmd","VisuIndoorOCACmd","VisuCityOCACmd","VisuRoadOCACmd","VisuOutdoorOCACmd","VisuBasicOCACmd"]}])}}return{cmdList:r}}})},t.commandApplication=!1,t.workbenchs=t.workbenchs||[],t.options.pad3DViewer||t.workbenchs.push({name:"3DPlayReviewExperience",module:"3DPlayReviewExperience"}),t.options.pad3DViewer&&a.getReviewContext({context:t.options.pad3DViewer})&&a.getReviewContext({context:t.options.pad3DViewer}).getValidation()&&(t.input.asset.type=a.getReviewContext({context:t.options.pad3DViewer}).getValidation()._sValType,t.input.asset.physicalid=a.getReviewContext({context:t.options.pad3DViewer}).getValidation()._sPlmID,t.input.asset.Play3DXContent.data.items[0].objectId=a.getReviewContext({context:t.options.pad3DViewer}).getValidation()._sPlmID,t.input.asset.Play3DXContent.data.items[0].objectType=a.getReviewContext({context:t.options.pad3DViewer}).getValidation()._sValType),this._parent(t),this.subscribe("ASSET/LOADINGFINISHED",()=>{var e;K(),F.pad3DViewer.getRootBagPath().getChildrenPathes()[0]&&(e=S.getNodeType(F.pad3DViewer.getRootBagPath().getChildrenPathes()[0].getLastElement(!0)));var t=F.pad3DViewer.getApplicativeData().getLoadedItfData&&F.pad3DViewer.getApplicativeData().getLoadedItfData().data.length?"ITF":"Drawing"===e||"DIFLayout"===e||"DIFSheet"===e?"2D":"Document"===e||"Requirement"===e||"Requirement Specification"===e?"Document":"DesignSight"===e?"MSR":"3D";!A||"DXF"!==A.getLoadMarkupCtxType()&&"DWG"!==A.getLoadMarkupCtxType()||(t="2D"),Z(t),Y(t)},!0)},clearView:function(){this.internalClear&&this.internalClear(!0),this._parent()},onPostCreate:function(){this.pad3DViewer.getViewer().setPrePicking({activated:!0,displayHL:!0}),window.widget.setMetas({helpPath:"3DPlayReviewExperience/assets/help"}),window.widget.dispatchEvent("onPlayExperienceReady",[{pad3DViewer:this.pad3DViewer}]),this.internalPostCreate&&this.internalPostCreate();let e=a.getReviewContext({context:this.pad3DViewer});e&&e.getValidation()&&this.setReviewData({asset:{physicalid:e.getValidation()._sPlmID,type:e.getValidation()._sValType}})},dispose:function(e){window.widget.setMetas({helpPath:void 0}),this.internalDispose&&this.internalDispose(M),M=null,this._parent(e)},refresh:function(){return this.internalRefresh&&this.internalRefresh(),!0},loadAsset:function(e){e&&e.asset&&e.asset.physicalid&&this.internalLoad&&(this.clearView(),this.internalLoad(e))},acceptSwitch:function(e){var t=!1;return e&&e.options&&e.options.id&&("ENOR3V_AP"!==(M=e.options.id)&&"ENOR3R_AP"!==M||(t=!0)),t}})}),define("DS/3DPlayReviewExperience/3DPlayHighlightExperience",["DS/3DPlayReviewExperience/3DPlayReviewExperience"],function(e){"use strict";return e.extend({init:function(e){this._parent(e);let t=this.getSlideIDToActivate;this.getSlideIDToActivate=function(e,i){let n;if(!e||!i)return;let r=e.getHighlights();if(r&&r.length)for(let e=0;e<r.length;e++)r[e].getPlmID()===i&&(n=r[e].getPresentationSlideID());return n||t(e,i)}}})});