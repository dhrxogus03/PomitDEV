define("DS/DELWebViewerWorkInstructionController/DELImporter",["UWA/Core","DS/DELWebViewerCommon/DELCommonImporter"],function(e,t){"use strict";return function(e,n){var i,o=n.getOption("logger"),r=function(){var n={context:e.getContext(),frameWindow:e.getFrameWindow(),bDisplayNominal:!1,bDisplayInWork:!1,thumbnailListTitle:"",activateSlide:!1,displayDMUSlidePanel:!1,beforeApplySlideCB:null,afterApplySlideCB:null};return i||(i=new t(n)),i};return{importModel:function(e){o.debug("DELImporter::importModel method invoked with parameters : %o",e),r().importModel(e)},removeModel:function(){o.debug("DELImporter::removeModel method invoked"),r().removeModel()},destroy:function(){i&&(i.removeModel(),i.destroyDMUImporter()),o=i=r=null}}}}),define("DS/DELWebViewerWorkInstructionController/WorkInstructionDataManager",["DS/DELPPRData/Buildup/BuildUpSettings"],function(e){"use strict";return function(t,n){var i=n.getOption("logger"),o=t.getInstance("WorkInstructionBehaviorModelService"),r=n.getOption("mappingKeys"),u=function(e,t){var n=[];return UWA.is(e)&&UWA.is(e.Model,"array")&&UWA.is(e.Model[0].WKIRelations,"array")&&e.Model[0].WKIRelations.length>0&&e.Model[0].WKIRelations.forEach(function(e){t&&e&&e.Instruction&&e.View&&(UWA.is(t.pid,"array")&&(t.pid.indexOf(e.Instruction.InstPhyID)>-1||e.Instruction.Row&&t.pid.indexOf(e.Instruction.Row.RowPhyID)>-1)?-1===n.indexOf(e.View.UUID)&&n.push(e.View.UUID):t.uuid&&e.View.UUID===t.uuid&&(n.push(UWA.is(e.Instruction.Row)?e.Instruction.Row.RowPhyID:e.Instruction.InstPhyID),UWA.is(e.Instruction.Row)&&n.push(e.Instruction.InstPhyID)))}),n};return{getStepViewJson:function(e){return new UWA.Promise(function(t,n){o.getWKIContentPromise(e,r.FILETYPES.DMUJSON).then(function(e){t({json:e})}).fail(n)})},initStepViewSettings:function(e){return new UWA.Promise(function(t,u){o.getWKIContentPromise(e,r.FILETYPES.WKIVIEWINFO).then(function(e){if(e&&e[r.WKIKEYS.WKIVIEWINFO]&&e[r.WKIKEYS.WKIVIEWINFO][r.WKIKEYS.OPERATION]){let n=e[r.WKIKEYS.WKIVIEWINFO][r.WKIKEYS.OPERATION][r.WKIKEYS.VIEWS];o.setCurrentStepViewInfo({viewInfo:n}),t(n)}else i.error("WorkInstructionDataManager::initStepViewSettings View BuildUp Settings format is invalid, check the mapping"),u(n.getNLSValue("Error.ViewBuildUpSettingsFormatInvalid.Message"))}).fail(u)})},getLocalGraphicData:function(t,n){var r,u=o.getViewInfo({viewUUID:n});return i.debug("WorkInstructionDataManager::getLocalGraphicData method invoked with parameters : ",n),u?r=function(n={}){var i=[],o=e.getParsedBuildUpSettings(n.BuildUpSettings);return t&&t.forEach(function(t){var n,r=e.getGraphicProperties(o,t.category);r&&(n=UWA.merge({path:t.path},r),"OnlyAssignedResources"===o[e.getCategory(t.category)].filter&&"all"===t.category&&(n.visibility=!1),n.visibilityFree=!n.visibility,i.push(n))}),i}(u):i.warn("View Settings not found"),r},getLinkedViewUuids:function(e,t){return new UWA.Promise(function(n,i){o.getWKIContentPromise(e,r.FILETYPES.WKICONTENT).then(function(e){n(u(e,t))}).fail(i)})},getLinkedTextualInstIds:function(e,t){return new UWA.Promise(function(n,i){o.getWKIContentPromise(e,r.FILETYPES.WKICONTENT).then(function(e){n(u(e,{uuid:t}))}).fail(i)})},getWKIContent:function(e){return new UWA.Promise(function(t,n){o.getWKIContentPromise(e,r.FILETYPES.WKICONTENT).then(function(e){t(e)}).fail(n)})},getCurrentStepViewInfo:function(){o.getCurrentStepViewInfo()},getViewInfo:function(e){return o.getViewInfo(e)},reset:function(){o.reset()},destroy:function(){o&&o.destroy(),i=o=r=u=null}}}}),define("DS/DELWebViewerWorkInstructionController/WorkInstructionController",["UWA/Core","DS/DELWebViewerCommon/DELCommonSlideServices","DS/DELWebViewerUtils/DELWebViewerSettingsMgt","DS/DELWebViewerWorkInstructionController/WorkInstructionDataManager","DS/DELWebViewerWorkInstructionController/DELImporter","DS/DELWebViewerWorkInstructionCommon/DELWKIContent/DELWKIContentController"],function(e,t,n,i,o,r){"use strict";return function(u,s,l,a){var c,d=a.getOption("logger"),I=a.getOption("eventCollection").getViewerCtrlEventHnd(),g=new i(l,a),w=new r({context:s.getContext()}),f=u.getInstance("BuildUpBehavior"),p=new o(s,a),W=a.getOption("mappingKeys"),S=function(){return s.getMode()===W.VIEWERMODES.WORKINSTRUCTIONS},h=function(e){var t,n;return f?t=(n=f.getCurrentBuildUpContent())?n[e]:null:d.error("BuildUpBehavior not found"),t},v=function(){return d.debug("WorkInstructionController::clean method invoked"),s.removeSceneGraphOverrideSet(W.SCENEGRAPHKEYS.PUBLIC),w.removeModel(),p.removeModel(),e.is(c)&&c.clean(),g.reset(),e.Promise.resolve()},C=function(){var i=function(n,i){n&&n.data&&(s.setGraphicProperties({graphicProperties:g.getLocalGraphicData(h(W.BUILDUPKEYS.GRAPHICDATA),n.data.uuid)},W.SCENEGRAPHKEYS.BUILDUP),n.data.context=s.getContext(),t.applySlide(n.data),w.applySlide({uuid:n.data.uuid}),e.is(n.data.uuid)&&i&&g.getLinkedTextualInstIds(h(W.BUILDUPKEYS.PATHIDS),n.data.uuid).then(function(e){I.publish(I.events.onSelectView,{viewUUID:n.data.uuid,textualInstructionPIds:e,viewID:n.data.id})}))},o=function(e){var n={slides:t.getSlidesDefinition({context:s.getContext()}),wkiContent:e};c.clean(),c.display(n)},r=function(){var t;g.initStepViewSettings(h(W.BUILDUPKEYS.PATHIDS)).then(function(){return g.getWKIContent(h(W.BUILDUPKEYS.PATHIDS))}).then(function(o){return w.importModel({wkiContent:o}),new e.Promise(function(e,r){c?e(o):((t=Object.create(a)).setOption("onSlideSelectedCB",i),Object.assign(t,a.getOption("executionContext")?n.getDELViewerSetting("wkiview_opts"):n.getLayout_options("wkiview_opts")),s.getComponentPromise("DELSlideView",t).then(function(t){c=t,e(o)}).fail(function(e){throw d.error("DELSlideView Component Initialization failed due to -",e),r(e),new Error(e)}))})}).then(o).fail(function(e){d.error("WorkInstructionController::addSlidePanel - Unable to create views panel due to -",e)})};d.debug("WorkInstructionController::show method invoked"),v().then(function(){return g.getStepViewJson(h(W.BUILDUPKEYS.PATHIDS))}).then(function(e){d.debug("WorkInstructionController::importStepView method invoked"),e.onModelLoadedCB=r,p.importModel(e)}).fail(function(t){e.is(c)&&c.hide(),s.render(),d.error("WorkInstructionController::show unable to show the work instructions due to - ",t),I.publish(I.events.onWKIFailed,{error:t})})};I.subscribe(I.events.onGlobalBuildUpComplete,function(){S()&&C()});let m={show:C,reset:function(){d.debug("WorkInstructionController::remove method invoked"),v().then(function(){return new e.Promise(function(t){e.is(c)&&(w.removeModel(),c.reset(),c=null),t()})}).fail(function(e){d.error("WorkInstructionController::remove not able to remove work instructions due to - ",e)})},highlightLinkedViews:function(n){return d.info("WorkInstructionController::highlightLinkedViews API invoked with parameters : ",n),n&&e.is(n.pid,"string")&&(n.pid=[n.pid]),new e.Promise(function(i,o){S()&&n?g.getLinkedViewUuids(h(W.BUILDUPKEYS.PATHIDS),n).then(function(n){var o;c?e.is(n,"array")&&n.length>0?((o=t.getSlidesDefinition({context:s.getContext()}).find(function(e){return n.indexOf(e.uuid)>-1}))&&o.uuid&&c.activateView({viewUUID:o.uuid}),c.highlightViews(n)):(c.unHighlightViews(n),c.selectActiveView()):d.debug("Work Instruction views are not available, unable to highlight View"),i()}).fail(function(e){d.error("WorkInstructionController::highlightLinkedViews not able to highlight views due to ",e),o(e)}):(d.error("WorkInstructionController :: WorkInstruction mode is not active"),o(a.getNLSValue("Error.WorkInstModeNotActive.Message")))})},getCurrentView:function(){return d.info("WorkInstructionController::getCurrentView API invoked"),new e.Promise(function(e,t){var n;c&&S()?(n=c.getActiveView())?e(n):(d.error("WorkInstructionController :: getCurrentView No active View ID found"),t(a.getNLSValue("Error.ActiveViewIDNotFound.Message"))):t(a.getNLSValue("Error.WorkInstModeNotActive.Message"))})},setCurrentView:function(t){return d.info("WorkInstructionController::setCurrentView API invoked with parameters : ",t),new e.Promise(function(n,i){S()?t&&(e.is(t.viewUUID,"string")||e.is(t.viewID,"number"))?(c.activateView(t),n()):(d.error("WorkInstructionController :: setCurrentView Invalid input paramters"),i(a.getNLSValue("Error.InvalidInput.Message"))):(d.error("WorkInstructionController :: WorkInstruction mode is not active"),i(a.getNLSValue("Error.WorkInstModeNotActive.Message")))})},clean:v,getCurrentViewInfo:async function(){return g.getViewInfo(await m.getCurrentView())},getCurrentBuildUpSettings:async function(){let e;try{let t=g.getViewInfo(await m.getCurrentView());t&&(e=t.BuildUpSettings)}catch(t){d.log(t),d.debug("Views are not available, global build up settings is shown"),e=l.getInstance("BuildUpBehaviorModelService").getBuildUpGlobalSettings()}return e},destroy:function(){p&&p.destroy(),c&&c.destroy(),g&&g.destroy(),d=I=g=f=p=c=W=null,w.destroy()}};return m}});