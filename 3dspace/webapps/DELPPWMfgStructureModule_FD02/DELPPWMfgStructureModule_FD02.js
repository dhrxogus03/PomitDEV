define("DS/DELPPWMfgStructureModule_FD02/MfgStructureModule",["UWA/Core"],function(e){"use strict";return{behaviors:["UXFactoryBehavior","ResourceBehavior","ModelBehavior","WUXNodeModelBehavior","TreeListViewBehavior","ImplementBehavior","SelectionBehavior","MfgItemBehavior","ViewBehavior","RootsBehavior"],creator:function(t,n,i,o,r,m,l,s,a,g,c){var p,d,u,I,f,h,S,M,P,C,v,R,b,D,B,U,L=null,w={},N=null;return d=function(t,n){if(w={},!e.is(t))throw new Error("Command ID is null");w.cmdId=t,w.onOKCallBack=n,w.onCancelCallback=C},f=function(){e.is(L)&&(L.isVisible()&&L.destroyUI(),L=void 0)},h=function(e){var t=!0,n=g.getActiveView();return!1===e.changed.isSelected&&e.sourceId!==n&&(t=!1),t},I=function(){var t,n,i,r,m={},s=[],a=!1;return t=L.getImplementingID(),r=L.getImplementedIDs()[0],e.is(t)&&(n=o.getReferenceId(t),(i=l.getScopeLinksOfImplementing(n)).length>0&&(m.id=i[0].get("to"),s.push(m),e.is(r)?o.getReferenceId(r)!==m.id&&(L.updateImplemented(s),a=!0):(L.updateImplemented(s),a=!0))),a},u=function(e){var t,n;!0===e.bUpdateImplemented?(L.updateImplemented(e.selNodes),t="ImplementUI.ImplementedSelectionNotAllowed",n="error"):!0===e.bUpdateImplementing&&(L.updateImplementing(e.selNodes),t="ImplementUI.ImplementedSelectionChanged",n="info"),!0===I()&&L.showMessages(i.getNLSValue(t),n)},S=function(t){if(w={},!e.is(t))throw new Error("Command ID is null");w.cmdId=t,w.moduleOptions=p,w.onOKCallBack=R,w.onCancelCallback=C},M=function(e,t){N.updateImplementingLabel(e),o.getMajorRevisions(t,function(e){N.updateImplementedRevnList(t,e,!1)})},P=function(){e.is(N)&&(N.isVisible()&&N.destroyUI(),N=void 0)},v=function(t){var r,m,s,g,c,p,d,u,I,h={};e.is(t)&&(r=o.getReferenceModel(t.implementingId),m=o.getReferenceModel(t.implementedIDs[0]),s=o.getInstance(t.implementingId),g=o.getInstance(t.implementedIDs[0]),I=t.implementingId,e.is(t.implementingPaths[0])&&e.is(t.implementingPaths[0][0])&&(I=o.getInstance(t.implementingPaths[0][0]).get("isAggregatedBy")),s&&g&&l.isImplementLinkPossible(t.implementingPaths[0],t.implementedPaths[0])&&(c=s.get("PID"),p=l.getPathToScope(t.implementedPaths[0])),d=r.get("V_Name"),u=m.get("V_Name"),h.scopeCreation=t.scopeCreation,h.prefix=t.mfgItemPrefix,h.logMessage=i.getNLSValue("CreateMfgItemStructure.LogMessage",{mbom:d,ebom:u}),h.computeResultReport=!!e.is(t.resultReportMode)&&"no_report"!==t.resultReportMode,a.webservice("Create",{product:{referencePID:m.get("PID"),OccPath:p},mfgItem:{referencePID:r.get("PID"),instancePID:c,topRootMfgItemPID:I}},h,function(i){var o;i=i||{},e.is(i.resultReport)&&(e.is(t.resultReportMode)&&(o=t.resultReportMode),n.create("MfgItemCreateReportUI",{report:i.resultReport,mode:o}))}),f())},R=function(t){var n,r,m={};e.is(t)&&(n=o.getReferenceModel(t.implementingId).get("V_Name"),m.backgroundJobFlag=!1,m.scopeCreation=t.scopeCreation,m.prefix=t.mfgItemPrefix,m.logMessage=i.getNLSValue("UpdateMfgItemStructure.LogMessage",{mbom:n}),m.updateIntermediateScopedAssemblies=t.updateIntermediateScopedAssemblies,r=t.implementingId,e.is(t.implementingPaths[0])&&e.is(t.implementingPaths[0][0])&&(r=o.getInstance(t.implementingPaths[0][0]).get("isAggregatedBy")),a.webservice("Update",{product:{referencePID:t.implementedId,productConfigFilter:U[t.implementedId]},mfgItem:{referencePID:t.implementingId,processConfigFilter:B[t.implementingId],topRootMfgItemPID:r}},m),P())},C=function(){f(),P()},b=function(){C(),d("CreateMfgItemStructure",v),w.cmdTitle="Dialog.CreateMfgItemStructure.Title",w.implementingSection=!0,w.implementedSection=!0,w.optionsSection=!0,w.scopeOption="ComboBox",w.mfgItemPrefix=!0,w.mfgItemResultReport=!0,w.multiSelectionOfImplementing=!1,w.multiSelectionOfImplemented=!1,L=n.create("ImplementUI",w),u(L.getSelectionsWithPaths())},D=function(){var r,m,a,g,p,d=s.getSelectionsWithPaths()[1][0],u=d.id,I=o.getReferenceModel(u);if(C(),!e.is(I))return void t.debug("UpdateMfgItemStructure: Reference Model not found for pid:"+u);if(a=I.get("PID"),(r=l.getScopeLinksOfImplementing(a)).length<=0)return void t.warn(i.getNLSValue("Error.NoProductScopeExists.Title"));if(m=r[0].get("to"),e.is(d.path,"array")&&d.path.length>0){const e=d.path[0];p=o.getInstance(e).get("isAggregatedBy");const n=l.getScopeLinksOfImplementing(p);if(0===n.length)return void t.warn(i.getNLSValue("Error.NoProductScopeExists.Title"));g=n[0].get("to")}else g=m,p=a;const f=c.getCompatibleConfigurationFilters([p]),h=c.getCompatibleConfigurationFilters([g]);e.is(f)&&e.is(h)?(B={...f},U={...h},S("UpdateMfgItemStructure"),w.cmdTitle="Dialog.UpdateMfgItemStructure.Title",w.implementedRevTreeListCSSStyle="implementedSection-container-withChkBox",w.optionsSection=!0,w.scopeOption="ComboBox",w.mfgItemPrefix=!0,w.defaultHeight="430",w.modalFlag=!0,(N=n.create("ImplementedRevChooserUI",w)).updateImplementing(),M(a,m)):t.warn(i.getNLSValue("BI.Computation.IncompatibleFilter"))},{listenTo:function(){return{select:this.onSelect,CreateMfgItemStructure:b,UpdateMfgItemStructure:D}},onStart:function(e){p=e},onStop:function(){f(),P()},onSelect:function(t){if(e.is(L)&&L.isVisible()&&e.is(t)){if(!1===h(t))return;e.is(t.changed)&&u(L.getSelectionsWithPaths())}}}}}});