var __extends=this&&this.__extends||function(){var e=function(t,i){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])})(t,i)};return function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),__spreadArray=this&&this.__spreadArray||function(e,t,i){if(i||2===arguments.length)for(var n,o=0,s=t.length;o<s;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))};define("DS/FindEx/FindWidget",["require","exports","UWA/Core","DS/Core/WebUXComponents","DS/Utilities/Utils","DS/Utilities/Dom","DS/Controls/Abstract","DS/Controls/LineEditor","DS/Controls/Button","DS/Controls/Loader","DS/Controls/Expander","DS/Controls/Toggle","DS/Controls/ComboBox","DS/Core/PointerEvents","DS/Controls/TooltipModel","i18n!DS/FindEx/assets/nls/translation","DS/Utilities/WUXUWAUtils","DS/TreeModel/TreeDocument","DS/TreeModel/TreeNodeModel"],function(e,t,i,n,o,s,a,l,d,r,u,c,h,p,g,m,f,v,C){"use strict";var y="".concat("wux-controlsex-findwidget","-main-container"),b="".concat("wux-controlsex-findwidget","-additional-opts-container"),_="".concat("wux-controlsex-findwidget","-editor-container"),F="".concat("wux-controlsex-findwidget","-indicator-container"),x="".concat("wux-controlsex-findwidget","-occurences-counter"),S="".concat("wux-controlsex-findwidget","-clear"),T="".concat("wux-controlsex-findwidget","-loader"),O="".concat("wux-controlsex-findwidget","-navigation-container"),I="".concat("wux-controlsex-findwidget","-validation"),W="".concat("wux-controlsex-findwidget","-previous-result"),w="".concat("wux-controlsex-findwidget","-next-result"),E="".concat("wux-controlsex-findwidget","-selection"),R="".concat("wux-controlsex-findwidget","-find-in-text"),V="".concat("wux-controlsex-findwidget","-expander-container"),A=function(e){function t(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];var n=e.apply(this,t)||this;return n.name="FindWidget",n.markForRecordFlag=!0,f.extendingClassFlag,n}return __extends(t,e),Object.defineProperty(t,"publishedProperties",{get:function(){return{findStr:{defaultValue:"",type:"string",category:"Appearance"},matchCase:{defaultValue:!1,type:"boolean"},relatedWidget:{defaultValue:void 0,type:"object"},navigationMode:{defaultValue:"substring",type:"string"},onFindRequest:{defaultValue:void 0,type:"function"},onFindPreviousResult:{defaultValue:void 0,type:"function"},onFindNextResult:{defaultValue:void 0,type:"function"},onFindInit:{defaultValue:void 0,type:"function"},onFindClose:{defaultValue:void 0,type:"function"},onFindAutoSelect:{defaultValue:void 0,type:"function"},onFindReset:{defaultValue:void 0,type:"function"},getFindableAttributes:{defaultValue:void 0,type:"array"},autoSelect:{defaultValue:{value:!1,modified:!1},type:"object"},inputValidationThreshold:{defaultValue:3,type:"number"},showAdditionnalOptions:{defaultValue:!0,type:"boolean"},compactNavigation:{defaultValue:!1,type:"boolean"}}},enumerable:!1,configurable:!0}),t.prototype.getOnFindRequest=function(){return this.onFindRequest?this.onFindRequest:this.relatedWidget&&this.relatedWidget.onFindRequest?this.relatedWidget.onFindRequest:void 0},t.prototype.getOnFindPreviousResult=function(){return this.onFindPreviousResult?this.onFindPreviousResult:this.relatedWidget&&this.relatedWidget.onFindPreviousResult?this.relatedWidget.onFindPreviousResult:void 0},t.prototype.getOnFindNextResult=function(){return this.onFindNextResult?this.onFindNextResult:this.relatedWidget&&this.relatedWidget.onFindNextResult?this.relatedWidget.onFindNextResult:void 0},t.prototype.getOnFindInit=function(){return this.onFindInit?this.onFindInit:this.relatedWidget&&this.relatedWidget.onFindInit?this.relatedWidget.onFindInit:void 0},t.prototype.getOnFindClose=function(){return this.onFindClose?this.onFindClose:this.relatedWidget&&this.relatedWidget.onFindClose?this.relatedWidget.onFindClose:void 0},t.prototype.getOnFindAutoSelect=function(){return this.onFindAutoSelect?this.onFindAutoSelect:this.relatedWidget&&this.relatedWidget.onFindAutoSelect?this.relatedWidget.onFindAutoSelect:void 0},t.prototype.getOnFindReset=function(){return this.onFindReset?this.onFindReset:this.relatedWidget&&this.relatedWidget.onFindReset?this.relatedWidget.onFindReset:void 0},t.prototype.getgetFindableAttributes=function(){return this.getFindableAttributes?this.getFindableAttributes:this.relatedWidget&&this.relatedWidget.getFindableAttributes?this.relatedWidget.getFindableAttributes:void 0},t.prototype.init=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];this._validationNotAuthorized=!0,this._debounceLaunched=!1,this._debouncedLaunchFind=null,this._currentValue=0,this._count=-1,e.prototype.init.apply(this,t),this._invalidate()},t.prototype.buildView=function(){var e=this,t=function(){var e=document.createElement("div");e.classList.add(_);var t=new l({selectAllOnFocus:!0,sizeInCharNumber:22});e.appendChild(t.getContent());var i=function(){var e=document.createElement("div");e.classList.add(F);var t=new r({height:20,infiniteFlag:!0});t.visibleFlag=!1,t.getContent().classList.add(T),e.appendChild(t.getContent());var i=document.createElement("span");i.classList.add(x),e.appendChild(i);var n=s.generateIcon("clear");return n.style.display="none",n.classList.add(S),e.appendChild(n),{indicatorContainer:e,loader:t,occurrencesCounter:i,clearButton:n}}();return e.appendChild(i.indicatorContainer),{editorContainer:e,findEditor:t,indicatorObj:i}};this.elements.container.addClassName("wux-controlsex-findwidget");var i=function(){var i=document.createElement("div");i.classList.add(y);var n=t();i.appendChild(n.editorContainer);var o=function(){var t=document.createElement("div");t.classList.add(O);var i=new d({icon:{iconName:"chevron-up",fontIconFamily:WUXManagedFontIcons.Font3DS},onClick:function(t){e._goToPreviousFindResult(),t.stopPropagation()}});i.getContent().classList.add(W),i.tooltipInfos=new g({title:m.get("NavigationPreviousMatchTooltipTitle"),shortHelp:m.get("NavigationPreviousMatchTooltipShortHelp")}),t.appendChild(i.getContent());var n=new d({icon:{iconName:"chevron-down",fontIconFamily:WUXManagedFontIcons.Font3DS},onClick:function(t){e._goToNextFindResult(),t.stopPropagation()}});return n.getContent().classList.add(w),n.tooltipInfos=new g({title:m.get("NavigationNextMatchTooltipTitle"),shortHelp:m.get("NavigationNextMatchTooltipShortHelp")}),t.appendChild(n.getContent()),{navigationContainer:t,previousResult:i,nextResult:n}}();return i.appendChild(o.navigationContainer),{mainContainer:i,editorObj:n,navigationObj:o}}();this.elements.container.appendChild(i.mainContainer),this.elements.mainContainer=i.mainContainer,this.elements.editorContainer=i.editorObj.editorContainer,this.elements.findEditor=i.editorObj.findEditor,this.elements.indicatorContainer=i.editorObj.indicatorObj.indicatorContainer,this.elements.loader=i.editorObj.indicatorObj.loader,this.elements.occurrencesCounter=i.editorObj.indicatorObj.occurrencesCounter,this.elements.clearButton=i.editorObj.indicatorObj.clearButton,this.elements.navigationContainer=i.navigationObj.navigationContainer,this.elements.previousResult=i.navigationObj.previousResult,this.elements.nextResult=i.navigationObj.nextResult},t.prototype._postBuildView=function(){var e=this.getOnFindInit();e&&this.relatedWidget&&e.call(this.relatedWidget,this)},t.prototype._applyProperties=function(t){e.prototype._applyProperties.call(this,t),this.isDirty("findStr")&&this._applyFindStr(t.findStr),this.isDirty("relatedWidget")&&this._applyRelatedWidget(t.relatedWidget),this.isDirty("matchCase")&&this._applyMatchCase(t.matchCase),this.isDirty("navigationMode")&&this._applyNavigationMode(t.navigationMode),this.isDirty("showAdditionnalOptions")&&this._applyShowAdditionnalOptions(t.showAdditionnalOptions),this.isDirty("compactNavigation")&&this._applyCompactNavigation(t.compactNavigation)},t.prototype._applyFindStr=function(e){(e||this.findStr)&&(this.findStr!==e&&this.elements.findEditor.valueToCommit!==this.findStr&&(this.elements.findEditor.value=this.findStr),this._updateIndicatorDisplay({displayClear:""!==this.findStr}),!this.findStr||this.findStr.length<this.inputValidationThreshold||0===this.elements.findInCombobox.selectedIndexes.length?this._validationNotAuthorized=!0:this._validationNotAuthorized=!1,this._invalidate())},t.prototype._applyRelatedWidget=function(e){this._updateOptionsVisibility()},t.prototype._updateOptionsVisibility=function(){var e="dataGridView"!==this.relatedWidget.name?"none":void 0;this.elements.navigationModeToggle&&(this.elements.navigationModeToggle.getContent().style.display=e),this.elements.findInTitle&&(this.elements.findInTitle.style.display=e),this.elements.findInCombobox&&(this.elements.findInCombobox.getContent().style.display=e)},t.prototype._applyMatchCase=function(e){this.matchCase!==e&&this.elements.matchCaseToggle&&(this.elements.matchCaseToggle.checkFlag=this.matchCase,this._invalidate())},t.prototype._applyNavigationMode=function(e){this.navigationMode!==e&&this.elements.navigationModeToggle&&(this.elements.navigationModeToggle.checkFlag="row"===this.navigationMode,this._invalidate())},t.prototype._applyAutoSelect=function(e){this.elements.autoSelectToggle&&this.autoSelect.value!==e.value&&(this.elements.autoSelectToggle.checkFlag=this.autoSelect.value)},t.prototype._applyTouchMode=function(t){e.prototype._applyTouchMode.call(this,t);var i=this._getCurrentTouchMode();this._updateSubComponentsAttribute("touchMode",i,"touch-mode")},t.prototype._applyDisabled=function(t){e.prototype._applyDisabled.call(this,t),this._updateSubComponentsAttribute("disabled",this.disabled,"disabled")},t.prototype._updateComboBoxElements=function(){var e=this.getgetFindableAttributes(),t=[];e&&this.relatedWidget&&(t=e.call(this.relatedWidget));var i=[],n=[];for(var o in n=this.elements.findInCombobox.elementsTree.getRoots())i.push(n[o].getLabel());var s=this;i.splice(0,1);var a=[];if(t.forEach(function(e,t){return function(e,t){-1===i.indexOf(e)?a.push({element:e,index:t}):i.splice(i.indexOf(e),1)}(e,t)}),0!==a.length||0!==i.length){this.elements.findInCombobox.elementsTree.prepareUpdate();var l=[];a.forEach(function(e){var t=new C({label:e.element});s.elements.findInCombobox.elementsTree.addChild(t,++e.index),l.push(t)}),l.length>0&&this.elements.findInCombobox._model.getXSO().add(l),i.forEach(function(e){for(var t in n)if(n[t].getLabel()===e){s.elements.findInCombobox.elementsTree.removeRoot(n[t]._unfilteredRowID);break}}),this.elements.findInCombobox.elementsTree.pushUpdate()}},t.prototype._applyShowAdditionnalOptions=function(e){var t=this,i=this;if(e!==this.showAdditionnalOptions&&(t.elements.findInTitle&&(t.elements.findInTitle.remove(),t.elements.findInTitle.destroy(),t.elements.findInTitle=null),[t.elements.matchCaseToggle,t.elements.navigationModeToggle,t.elements.autoSelectToggle,t.elements.findInCombobox,t.elements.expanderContentContainer,t.elements.additionalOptsExpander].forEach(function(e){e&&(e.getContent().remove(),e.destroy())}),t.elements.matchCaseToggle=null,t.elements.navigationModeToggle=null,t.elements.autoSelectToggle=null,t.elements.findInCombobox=null,t.elements.expanderContentContainer=null,t.elements.additionalOptsExpander=null,!0===this.showAdditionnalOptions)){var n=function(){var e=document.createElement("div");e.classList.add(V);var n=new u({header:"Options",body:e});n.getContent().classList.add(b);var o=m.get("MatchCaseTooltipShortHelp"),a=new c({type:"checkbox",label:o,tooltipInfos:new g({shortHelp:o})});e.appendChild(a.getContent());var l=m.get("NavigationModeTooltipShortHelp"),d=new c({type:"checkbox",label:l,tooltipInfos:new g({shortHelp:l})});t.elements.navigationModeToggle=d,e.appendChild(d.getContent());var r=m.get("AutoSelectTooltipShortHelp"),p=new c({type:"checkbox",label:r,tooltipInfos:new g({shortHelp:r})});e.appendChild(p.getContent());var f=document.createElement("b");t.elements.findInTitle=f,f.classList.add(R),f.textContent=m.get("FindIn"),e.appendChild(f);var y=t.getgetFindableAttributes(),_=[];y&&t.relatedWidget&&(_=y.call(t.relatedWidget));var F,x=new v;x.prepareUpdate();for(var S=0;S<_.length;S++){var T=(F=_[S],new C({label:F}));x.addRoot(T)}x.pushUpdate();var O=h.createSelectAllComboBox({elementsTree:x,enableSearchFlag:!1,multiSelFlag:!0,reachablePlaceholderFlag:!0,tooltipInfos:new g({getAllInformationCB:function(){return{model:{shortHelp:O.getMainElementCustomization().label}}}}),getMainElementCustomization:function(){if(this.selectedIndexes.length>0&&this.getIsAllSelected){if(this.getIsAllSelected())return{label:m.get("FindInComboAllSelected")}}else if(0===this.selectedIndexes.length)return{label:m.get("FindInComboPlaceholder")};return this.getDefaultMainElementCustomization()}},{selected:!0,label:"All columns"});return t.elements.findInCombobox=O,e.appendChild(O.getContent()),s.addEventOnElement(t,O,"preDropdown",function(){t._updateComboBoxElements()}),s.addEventOnElement(t,t.relatedWidget,"columnVisibleStateChange",function(){t._updateComboBoxElements()}),i._updateOptionsVisibility(),{additionalOptsExpander:n,expanderContentContainer:e,matchCaseToggle:a,navigationModeToggle:d,autoSelectToggle:p,findInTitle:f,findInCombobox:O}}.call(this);this.elements.container.appendChild(n.additionalOptsExpander.getContent()),this.elements.additionalOptsExpander=n.additionalOptsExpander,this.elements.expanderContentContainer=n.expanderContentContainer,this.elements.matchCaseToggle=n.matchCaseToggle,this.elements.navigationModeToggle=n.navigationModeToggle,this.elements.autoSelectToggle=n.autoSelectToggle,this.elements.findInTitle=n.findInTitle,this.elements.findInCombobox=n.findInCombobox,s.addEventOnElement(t,t.elements.matchCaseToggle,"change",function(e){t.matchCase=t.elements.matchCaseToggle.checkFlag}),s.addEventOnElement(t,t.elements.navigationModeToggle,"change",function(e){t.navigationMode=t.elements.navigationModeToggle.checkFlag?"row":"substring"}),s.addEventOnElement(t,t.elements.autoSelectToggle,"change",function(e){var i=Object.assign({},t.autoSelect);i.value=t.elements.autoSelectToggle.checkFlag,i.modified=!0,t.autoSelect=i}),s.addEventOnElement(t,t.elements.findInCombobox,"change",function(e){0===t.elements.findInCombobox.selectedIndexes.length?(t._validationNotAuthorized=!0,t.elements.validation.tooltipInfos=new g({title:m.get("NavigationValidationColumnsNotValidTooltipTitle")})):(t._applyFindStr(""),t.elements.validation.tooltipInfos=new g({title:m.get("NavigationValidationTooltipTitle"),shortHelp:m.get("NavigationValidationTooltipShortHelp",{inputValidationThreshold:t.inputValidationThreshold})})),t._invalidate()})}},t.prototype._applyCompactNavigation=function(e){var t=this;e!==this.compactNavigation&&([this.elements.validation,this.elements.selection].forEach(function(e){e&&(e.getContent().remove(),e.destroy())}),this.elements.validation=null,this.elements.selection=null,!0!==this.compactNavigation?(this.elements.container.removeAttribute("compact-navigation"),this.elements.validation=new d({icon:{iconName:"check",fontIconFamily:WUXManagedFontIcons.Font3DS},onClick:function(e){t.validate(),e.stopPropagation()}}),this.elements.validation.getContent().classList.add(I),this.elements.validation.tooltipInfos=new g({title:m.get("NavigationValidationTooltipTitle"),shortHelp:m.get("NavigationValidationTooltipShortHelp",{inputValidationThreshold:this.inputValidationThreshold})}),this.elements.navigationContainer.insertBefore(this.elements.validation.getContent(),this.elements.previousResult.getContent()),this.elements.selection=new d({icon:{iconName:"select-on",fontIconFamily:WUXManagedFontIcons.Font3DS},onClick:function(e){var i=Object.assign({},t.autoSelect);i.value=!i.value,i.modified=!0,t.autoSelect=i,t._triggerAutoSelect(),e.stopPropagation()}}),this.elements.selection.getContent().classList.add(E),this.elements.selection.tooltipInfos=new g({title:m.get("NavigationSelectionTooltipTitle"),shortHelp:m.get("NavigationSelectionTooltipShortHelp")}),this.elements.navigationContainer.appendChild(this.elements.selection.getContent())):this.elements.container.setAttribute("compact-navigation",""),this._updateNavigationDisplay({validation:{disable:this._validationNotAuthorized,emphasize:!0},selection:{disable:!0}}))},t.prototype.handleEvents=function(){var t=this;e.prototype.handleEvents.call(this),s.addResizeObserver(this,this.elements.indicatorContainer,this._onIndicatorContainerResizeCB),s.addResizeListener(this.elements.container,function(){t.elements.mainContainer&&t.elements.navigationContainer&&!t._getCurrentTouchMode()&&(t.elements.mainContainer.offsetWidth<293?(t.elements.mainContainer.style.flexWrap="wrap",t.elements.navigationContainer.style.display="block",t.elements.navigationContainer.firstChild.style.marginLeft="0px",t.elements.navigationContainer.style.marginTop="3px",t.elements.editorContainer.width="calc(100% + 5px)"):t.elements.mainContainer.offsetWidth>=293&&(t.elements.mainContainer.style.flexWrap="nowrap",t.elements.navigationContainer.style.display="inline-flex",t.elements.navigationContainer.firstChild.style.marginLeft="",t.elements.navigationContainer.style.marginTop="0px",t.elements.editorContainer.width="298px"))}),s.addEventOnElement(this,this.elements.findEditor,"uncommittedChange",function(e){t.findStr=t.elements.findEditor.valueToCommit}),s.addEventOnElement(this,this.elements.editorContainer,p.POINTERHIT,function(e){!0!==t.disabled&&t._giveFocus()}),s.addEventOnElement(this,this.elements.findEditor,"focus",function(e){t.elements.editorContainer.setAttribute("focused","")}),s.addEventOnElement(this,this.elements.findEditor,"blur",function(e){t.elements.editorContainer.removeAttribute("focused")}),s.addEventOnElement(this,this.elements.findEditor.getContent(),"keydown",function(e){var n=i.Event.whichKey(e);"return"===n?t.elements.findEditor.value===t.findStr&&(e.actionPerformed||!t._isValid()?t.validate():!0!==t.elements.nextResult.disabled&&t._goToNextFindResult()):"shift+return"===n?t.elements.findEditor.value===t.findStr&&!0!==t.elements.nextResult.disabled&&t._goToPreviousFindResult():"esc"===n&&t.elements.findEditor.valueToCommit===t.findStr&&(t.visibleFlag=!1)}),s.addEventOnElement(this,this.elements.clearButton,p.POINTERHIT,function(e){!0!==t.disabled&&(t.findStr="",t._launchFindReset()),e.stopPropagation()}),this._giveFocus()},t.prototype.focus=function(){this._giveFocus()},t.prototype.validate=function(){!0!==this._validationNotAuthorized&&(this._toValidate=!1,this._launchFindOnRelatedWidget())},t.prototype._isValid=function(){return!0!==this._toValidate},t.prototype.clear=function(){this.findStr="",this._launchFindReset()},t.prototype.previousResult=function(){!0!==this.elements.previousResult.disabled&&this._goToPreviousFindResult()},t.prototype.nextResult=function(){!0!==this.elements.nextResult.disabled&&this._goToNextFindResult()},t.prototype.selectResults=function(e){if(void 0===e&&(e=!0),this.elements.selection&&!0!==this.elements.selection.disabled){var t=Object.assign({},this.autoSelect);t.value=e,t.modified=!0,this.autoSelect=t,this._triggerAutoSelect()}},t.prototype.getCount=function(){return this._count},t.prototype.destroy=function(){s.removeResizeObserver(this,this.elements.indicatorContainer,this._onIndicatorContainerResizeCB),this.relatedWidget&&(this.relatedWidget=null),e.prototype.destroy.call(this)},t.prototype._applyVisibleFlag=function(t){if(e.prototype._applyVisibleFlag.call(this,t),0!==this._count&&this._setCount(0),this._invalidate(),!0===this.visibleFlag)this._giveFocus();else{var i=this.getOnFindClose();i&&this.relatedWidget&&i.call(this.relatedWidget),this.fire("close")}},t.prototype._setCurrentValue=function(e){this._currentValue=e,this._displayCurrentValue()},t.prototype._giveFocus=function(){e.prototype._giveFocus.call(this),!this.elements.findEditor||document.activeElement===this.elements.findEditor._myInput||this.elements.matchCaseToggle&&(!this.elements.matchCaseToggle||this.elements.matchCaseToggle._isFocused())||this.elements.navigationModeToggle&&(!this.elements.navigationModeToggle||this.elements.navigationModeToggle._isFocused())||this.elements.autoSelectToggle&&(!this.elements.autoSelectToggle||this.elements.autoSelectToggle._isFocused())||this.elements.findInCombobox&&(!this.elements.findInCombobox||this.elements.findInCombobox._isFocused()||this.elements.findInCombobox._isPopupOpened())||this.elements.findEditor._giveFocus()},t.prototype._launchFindOnRelatedWidget=function(e){var t=this;this.elements&&this.elements.findInCombobox&&this._updateComboBoxElements(),this.findStr=this.elements.findEditor.valueToCommit;var i=function(e){if(t._debounceLaunched||e){t._debounceLaunched=!1;var i=t.getOnFindRequest();if(i&&t.relatedWidget){var n;if(t._updateIndicatorDisplay({displayLoader:!0,displayOccurencesCounter:!1,displayClear:!1}),t._updateNavigationDisplay({validation:{disable:!0,emphasize:!1},previousResult:{disable:!0},nextResult:{disable:!0},selection:{disable:!0}}),!0===t.showAdditionnalOptions){var o=t.elements.findInCombobox.getSelectAllInfos();n=o.label?o.label:""}i.call(t.relatedWidget,{findStr:t.findStr,matchCase:t.matchCase,currentValue:t._currentValue,navigationMode:t.navigationMode,findInContentSelected:!0===t.showAdditionnalOptions?__spreadArray([],t.elements.findInCombobox.value.filter(function(e){return e!==n}),!0):void 0},t._actionCompleted.bind(t,!0))}}};this._debouncedLaunchFind||(this._debouncedLaunchFind=o.debounce(i,500)),e?(this._debounceLaunched=!0,this._debouncedLaunchFind()):i.call(this,!0)},t.prototype._goToPreviousFindResult=function(){var e=this._currentValue;this._count&&0!==this._count&&(this._currentValue>1?this._currentValue--:this._currentValue=this._count,this._displayCurrentValue());var t=this.getOnFindPreviousResult();this._currentValue&&e!==this._currentValue&&t&&this.relatedWidget&&(this._updateIndicatorDisplay({displayLoader:!0,displayOccurencesCounter:!1,displayClear:!1}),t.call(this.relatedWidget,{findStr:this.findStr,matchCase:this.matchCase,currentValue:this._currentValue,navigationMode:this.navigationMode,findInContentSelected:!0===this.showAdditionnalOptions?__spreadArray([],this.elements.findInCombobox.value,!0):[]},this._actionCompleted.bind(this,!1)))},t.prototype._goToNextFindResult=function(){var e=this._currentValue;this._count&&0!==this._count&&(this._currentValue<this._count?this._currentValue++:this._currentValue=1,this._displayCurrentValue());var t=this.getOnFindNextResult();this._currentValue&&e!==this._currentValue&&t&&this.relatedWidget&&(this._updateIndicatorDisplay({displayLoader:!0,displayOccurencesCounter:!1,displayClear:!1}),t.call(this.relatedWidget,{findStr:this.findStr,matchCase:this.matchCase,currentValue:this._currentValue,navigationMode:this.navigationMode,findInContentSelected:!0===this.showAdditionnalOptions?__spreadArray([],this.elements.findInCombobox.value,!0):[]},this._actionCompleted.bind(this,!1)))},t.prototype._displayCurrentValue=function(){this.elements.occurrencesCounter&&(this.findStr&&""!==this.findStr&&void 0!==this._currentValue&&void 0!==this._count?this.elements.occurrencesCounter.innerText=this._currentValue+"/"+this._count:this.elements.occurrencesCounter.innerText=""),this._updateNavigationDisplay({validation:{},previousResult:{disable:this._count<=0},nextResult:{disable:this._count<=0},selection:{disable:this._count<=0}})},t.prototype._onIndicatorContainerResizeCB=function(e){if(e&&e.length&&e[0]&&e[0].target){var t=e[0].target.offsetWidth,i=this._getCurrentTouchMode()?152:96;this.elements.editorContainer.width="calc(100% - ".concat(t," - ").concat(i,")")}},t.prototype._actionCompleted=function(e,t){this._updateIndicatorDisplay({displayLoader:!1,displayOccurencesCounter:!!this._isValid(),displayClear:""!==this.findStr}),this._updateNavigationDisplay({validation:{disable:!1},previousResult:{disable:this._count<=0},nextResult:{disable:this._count<=0},selection:{disable:this._count<=0}}),t&&(void 0!==t.currentValue&&t.currentValue!==this._currentValue&&this._setCurrentValue(t.currentValue),void 0!==t.count&&t.count!==this._count&&this._setCount(t.count)),!0===e&&this._triggerAutoSelect()},t.prototype._triggerAutoSelect=function(){var e=this.getOnFindAutoSelect();void 0!==this.autoSelect&&e&&this.relatedWidget&&(this._updateIndicatorDisplay({displayLoader:!0,displayOccurencesCounter:!1,displayClear:!1}),e.call(this.relatedWidget,{autoSelect:Object.assign({},this.autoSelect)},function(){}),this.autoSelect.modified=!1,this._updateIndicatorDisplay({displayLoader:!1,displayOccurencesCounter:!!this._isValid(),displayClear:""!==this.findStr}))},t.prototype._updateIndicatorDisplay=function(e){e&&(void 0!==e.displayLoader&&this._setLoadingState(e.displayLoader),!0===e.displayClear?this.elements.clearButton.style.display="flex":!1===e.displayClear&&(this.elements.clearButton.style.display="none"),!0===e.displayOccurencesCounter?this.elements.occurrencesCounter.style.display="block":!1===e.displayOccurencesCounter&&(this.elements.occurrencesCounter.style.display="none")),!1===this.elements.loader.visibleFlag&&"none"===this.elements.clearButton.style.display&&"none"===this.elements.occurrencesCounter.style.display?this.elements.indicatorContainer.style.display="none":this.elements.indicatorContainer.style.display="",this._handleEditorContainerLastDisplayedChild()},t.prototype._updateNavigationDisplay=function(e){e&&(this.elements.validation&&e.validation&&(void 0!==e.validation.disable&&(this.elements.validation.disabled=e.validation.disable),void 0!==e.validation.emphasize&&(this.elements.validation.emphasize=(e.validation.emphasize,"primary"))),e.previousResult&&void 0!==e.previousResult.disable&&(this.elements.previousResult.disabled=e.previousResult.disable),e.nextResult&&void 0!==e.nextResult.disable&&(this.elements.nextResult.disabled=e.nextResult.disable),this.elements.selection&&e.selection&&void 0!==e.selection.disable&&(this.elements.selection.disabled=e.selection.disable))},t.prototype._setLoadingState=function(e){e!==this.elements.loader.visibleFlag&&(this.elements.loader.visibleFlag=e)},t.prototype._handleEditorContainerLastDisplayedChild=function(){var e;e="none"!==this.elements.clearButton.style.display?this.elements.clearButton:"none"!==this.elements.occurrencesCounter.style.display?this.elements.occurrencesCounter:!0===this.elements.loader.visibleFlag?this.elements.loader.getContent():this.elements.findEditor.getContent(),this.elements.clearButton.removeAttribute("lastChild"),this.elements.occurrencesCounter.removeAttribute("lastChild"),this.elements.loader.getContent().removeAttribute("lastChild"),this.elements.findEditor.getContent().removeAttribute("lastChild"),e.setAttribute("lastChild","")},t.prototype._updateSubComponentsAttribute=function(e,t,i){for(var n=0,o=[this.elements.mainContainer,this.elements.editorContainer,this.elements.indicatorContainer,this.elements.occurrencesCounter,this.elements.clearButton,this.elements.navigationContainer,this.elements.expanderContentContainer,this.elements.findInTitle];n<o.length;n++){var s=o[n];s&&(!0===t?s.setAttributeNode(document.createAttribute(i)):s.removeAttribute(i))}for(var a=0,l=[this.elements.findEditor,this.elements.loader,this.elements.validation,this.elements.previousResult,this.elements.nextResult,this.elements.selection,this.elements.additionalOptsExpander,this.elements.matchCaseToggle,this.elements.navigationModeToggle,this.elements.autoSelectToggle,this.elements.findInCombobox];a<l.length;a++){var d=l[a];d&&(d[e]=t)}},t.prototype._invalidate=function(){this._isValid()&&(this._toValidate=!0,this._launchFindReset(),this._updateIndicatorDisplay({displayOccurencesCounter:!1}),this._updateNavigationDisplay({validation:{},previousResult:{disable:!0},nextResult:{disable:!0},selection:{disable:!0}})),this._updateNavigationDisplay({validation:{disable:this._validationNotAuthorized,emphasize:!0}})},t.prototype._setCount=function(e){this._count=e,this._count>0?this._currentValue=1:this._currentValue=0,this._displayCurrentValue()},t.prototype._launchFindReset=function(){var e=this.getOnFindReset();e&&this.relatedWidget&&e.call(this.relatedWidget)},t}(a);return n.addClass(A,"FindWidget"),A});__extends=this&&this.__extends||function(){var e=function(t,i){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])})(t,i)};return function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}();define("DS/FindEx/FindDialog",["require","exports","DS/Windows/Dialog","DS/FindEx/FindWidget","DS/Core/WebUXComponents","DS/Utilities/WUXUWAUtils","i18n!DS/FindEx/assets/nls/translation"],function(e,t,i,n,o,s,a){"use strict";var l=function(e){function t(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];var n=e.apply(this,t)||this;return n.name="FindDialog",s.extendingClassFlag,n}return __extends(t,e),Object.defineProperty(t,"publishedProperties",{get:function(){return{findWidgetOptions:{defaultValue:void 0,type:"Object",category:"Behaviour",readOnly:!0},title:{defaultValue:a.get("FindDialogTitle"),type:"string",category:"Appearance"},autoCloseFlag:{defaultValue:!1,type:"boolean",category:"Behavior"}}},enumerable:!1,configurable:!0}),t.prototype._preBuildView=function(t){e.prototype._preBuildView.call(this,t),this.elements.findWidget=new n(t.findWidgetOptions),t.findWidgetOptions&&t.findWidgetOptions.relatedWidget&&(!t.immersiveFrame&&t.findWidgetOptions.relatedWidget.getContainingImmersiveFrame&&(t.immersiveFrame=t.findWidgetOptions.relatedWidget.getContainingImmersiveFrame()),!t.position&&t.immersiveFrame&&(t.position={my:"top right",at:"top right",of:t.findWidgetOptions.relatedWidget}),!t.identifier&&t.findWidgetOptions.relatedWidget.identifier&&(t.identifier=t.findWidgetOptions.relatedWidget.identifier+"_related_FindDialog"))},t.prototype._postBuildView=function(){e.prototype._postBuildView.call(this),this.content=this.elements.findWidget},t.prototype.handleEvents=function(){var t=this;e.prototype.handleEvents.call(this),this.addEventListener("close",function(){!0!==t._isBeingClosed&&(t.visibleFlag=!1)})},t.prototype._applyTouchMode=function(t){e.prototype._applyTouchMode.call(this,t),this.elements.findWidget.touchMode=this._getCurrentTouchMode()},t.prototype._applyDisabled=function(e){this.elements.findWidget.disabled=this.disabled},t.prototype.getFindWidget=function(){return this.elements.findWidget},t.prototype._applyVisibleFlag=function(t){e.prototype._applyVisibleFlag.call(this,t),this.elements.findWidget.visibleFlag=this.visibleFlag},t.prototype.close=function(){this.visibleFlag=!1,e.prototype.close.call(this)},t}(i);return o.addClass(l,"FindDialog"),l});