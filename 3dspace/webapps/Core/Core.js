define("DS/Core/WebUXGlobalEnums",["require","exports"],function(e,t){"use strict";var o,n,i,r,s,a,l,u,p;Object.defineProperty(t,"__esModule",{value:!0}),t.WUXColors3DExperience=t.InvalidDisplayPolicy=t.WUXInformationLevelEnum=t.WUXStandardButtonEnum=t.WUXStandardButtonRoleEnum=t.WUXWindowGroupTypeEnum=t.WUXSnapAreaEnum=t.WUXCustomButtonRoleEnum=t.WUXManagedFontIcons=t.WUXPreferenceRestorationStateEnum=t.WUXDockAreaEnum=void 0,function(e){e[e.NoneDockArea=0]="NoneDockArea",e[e.TopDockArea=1]="TopDockArea",e[e.BottomDockArea=2]="BottomDockArea",e[e.LeftDockArea=4]="LeftDockArea",e[e.RightDockArea=8]="RightDockArea"}(o=t.WUXDockAreaEnum||(t.WUXDockAreaEnum={})),Object.freeze(o),function(e){e[e.NotRestored=0]="NotRestored",e[e.BeingRestored=1]="BeingRestored",e[e.Restored=2]="Restored"}(n=t.WUXPreferenceRestorationStateEnum||(t.WUXPreferenceRestorationStateEnum={})),Object.freeze(n),function(e){e[e.FontAwesome=0]="FontAwesome",e[e.Font3DS=1]="Font3DS"}(i=t.WUXManagedFontIcons||(t.WUXManagedFontIcons={})),Object.freeze(i),function(e){e.Validate="validate",e.Escape="escape"}(r=t.WUXCustomButtonRoleEnum||(t.WUXCustomButtonRoleEnum={})),Object.freeze(r),function(e){e[e.NoneArea=0]="NoneArea",e[e.OutsideArea=1]="OutsideArea",e[e.TopArea=2]="TopArea",e[e.BottomArea=3]="BottomArea",e[e.LeftArea=4]="LeftArea",e[e.RightArea=5]="RightArea",e[e.InsideArea=6]="InsideArea"}(s=t.WUXSnapAreaEnum||(t.WUXSnapAreaEnum={})),Object.freeze(s),function(e){e[e.GroupAsGrid=0]="GroupAsGrid",e[e.GroupAsTab=1]="GroupAsTab"}(a=t.WUXWindowGroupTypeEnum||(t.WUXWindowGroupTypeEnum={})),Object.freeze(a),function(e){e[e.InvalidRole=0]="InvalidRole",e[e.AcceptRole=1]="AcceptRole",e[e.RejectRole=2]="RejectRole",e[e.DestructiveRole=3]="DestructiveRole",e[e.HelpRole=4]="HelpRole",e[e.YesRole=5]="YesRole",e[e.NoRole=6]="NoRole",e[e.ApplyRole=7]="ApplyRole",e[e.ResetRole=8]="ResetRole"}(l=t.WUXStandardButtonRoleEnum||(t.WUXStandardButtonRoleEnum={})),Object.freeze(l),t.WUXStandardButtonEnum=Object.freeze({Ok:{name:"Ok",value:1,role:l.AcceptRole},Open:{name:"Open",value:2,role:l.AcceptRole},Save:{name:"Save",value:4,role:l.AcceptRole},Apply:{name:"Apply",value:8,role:l.ApplyRole},Reset:{name:"Reset",value:16,role:l.ResetRole},RestoreDefaults:{name:"RestoreDefaults",value:32,role:l.ResetRole},Help:{name:"Help",value:64,role:l.HelpRole},SaveAll:{name:"SaveAll",value:128,role:l.AcceptRole},Yes:{name:"Yes",value:256,role:l.YesRole},YesToAll:{name:"YesToAll",value:512,role:l.YesRole},No:{name:"No",value:1024,role:l.NoRole},NoToAll:{name:"NoToAll",value:2048,role:l.NoRole},Abort:{name:"Abort",value:4096,role:l.RejectRole},Retry:{name:"Retry",value:8192,role:l.AcceptRole},Ignore:{name:"Ignore",value:16384,role:l.AcceptRole},Discard:{name:"Discard",value:32768,role:l.DestructiveRole},Cancel:{name:"Cancel",value:65536,role:l.RejectRole},Close:{name:"Close",value:1<<17,role:l.RejectRole}}),Object.freeze(t.WUXStandardButtonEnum),function(e){e[e.NoLevel=0]="NoLevel",e[e.Question=1]="Question",e[e.Information=2]="Information",e[e.Warning=3]="Warning",e[e.Error=4]="Error",e[e.Success=5]="Success"}(u=t.WUXInformationLevelEnum||(t.WUXInformationLevelEnum={})),Object.freeze(u),window.WUXSnapAreaEnum=s,window.WUXWindowGroupTypeEnum=a,window.WUXStandardButtonRoleEnum=l,window.WUXStandardButtonEnum=t.WUXStandardButtonEnum,window.WUXDockAreaEnum=o,window.WUXPreferenceRestorationStateEnum=n,window.WUXManagedFontIcons=i,window.WUXCustomButtonRoleEnum=r,window.WUXInformationLevelEnum=u,t.InvalidDisplayPolicy=Object.freeze({OnValidate:0,OnInput:1,Always:2,Never:3}),function(e){e.COLOR_BACKGROUND_GRAY="#f9f9f9",e.COLOR_SECTION_GRAY="#f4f5f6",e.COLOR_FOOTER_GRAY="#f1f1f1",e.COLOR_OUTLINE_GRAY="#e2e4e3",e.COLOR_OUTLINE_DARK_GRAY="#d1d4d4",e.COLOR_ICON_GRAY="#b4b6ba",e.COLOR_COPY_GRAY="#77797c",e.COLOR_DARK_GRAY="#3d3d3d",e.COLOR_COPY_BLACK="#191919",e.COLOR_LIGHT_BLUE="#78befa",e.COLOR_MEDIUM_BLUE="#42a2da",e.COLOR_DARK_BLUE="#368ec4",e.COLOR_LIGHT_STEEL="#d5e8f2",e.COLOR_CORPORATE_STEEL_BLUE="#005686",e.COLOR_DARK_STEEL="#003c5a",e.COLOR_LIGHT_GREEN="#edf6eb",e.COLOR_MEDIUM_GREEN="#57b847",e.COLOR_DARK_GREEN="#477738",e.COLOR_LIGHT_CYAN="#f2f5f7",e.COLOR_MEDIUM_CYAN="#00b8de",e.COLOR_DARK_CYAN="#0087a3",e.COLOR_LIGHT_RED="#fff0ee",e.COLOR_MEDIUM_RED="#ea4f37",e.COLOR_DARK_RED="#844138",e.COLOR_LIGHT_ORANGE="#fff3e9",e.COLOR_MEDIUM_ORANGE="#e87b00",e.COLOR_DARK_ORANGE="#8f4c00"}(p=t.WUXColors3DExperience||(t.WUXColors3DExperience={})),Object.freeze(p)}),define("DS/Core/PointerEvents",["require","exports","UWA/Utils/Client","DS/Utilities/Dom","DS/Utilities/DeviceUtils","DS/TouchDragAndDropPolyfill/TouchDragAndDropPolyfill"],function(e,t,o,n,i){"use strict";var r,s,a,l=!1,u="DSpointerup",p="DSpointermove",c="DSpointerdown",d=300,h=1e3,f=5,v={capture:!1},g={touchstart:{value:null,options:{passive:!1,capture:!1}},mousedown:{value:null,options:v},pointerdown:{value:null,options:v},touchend:{value:null,options:v},pointerup:{value:null,options:v},mouseup:{value:null,options:v},click:{value:null,options:v},touchmove:{value:null,options:{passive:!1,capture:!1}},mousemove:{value:null,options:v},pointermove:{value:null,options:v},mouseleave:{value:null,options:v},mouseout:{value:null,options:v},mouseenter:{value:null,options:v}},m={mousedown:c,mouseup:u,click:"DSpointerhit",mousemove:p,mouseleave:"DSpointerleave",mouseout:"DSpointerout",mouseenter:"DSpointerenter"},y={touchstart:c,touchend:u,click:"DSpointerhit",touchmove:p},_={pointerdown:c,pointerup:u,click:"DSpointerhit",pointermove:p,pointerout:"DSpointerout",pointerenter:"DSpointerenter",pointerleave:"DSpointerleave"},b=!0,E=function(e,t){var o;"touch"==t.type.substr(0,5)&&t.changedTouches&&t.changedTouches.length?((o=new MouseEvent(e,{bubbles:t.bubbles,cancelable:t.cancelable,view:t.view,detail:t.detail,ctrlKey:t.ctrlKey,altKey:t.altKey,button:t.button,buttons:t.buttons,clientX:t.changedTouches[0].clientX,clientY:t.changedTouches[0].clientY,metaKey:t.metaKey,relatedTarget:t.relatedTarget,screenX:t.changedTouches[0].screenX,screenY:t.changedTouches[0].screenY,shiftKey:t.shiftKey})).changedTouches=t.changedTouches,o.touches=t.touches):o=new MouseEvent(e,{bubbles:t.bubbles,cancelable:t.cancelable,view:t.view,detail:t.detail,ctrlKey:t.ctrlKey,altKey:t.altKey,button:t.button,buttons:t.buttons,clientX:t.clientX,clientY:t.clientY,metaKey:t.metaKey,relatedTarget:t.relatedTarget,screenX:t.screenX,screenY:t.screenY,shiftKey:t.shiftKey}),o.originalEvent=t,o.touchFlag=P.isTouchEvent(t),o.oldPreventDefault=o.preventDefault,o.oldStopPropagation=o.stopPropagation,o.oldStopImmediatePropagation=o.stopImmediatePropagation,t.target.dispatchEvent(o)},O=void 0,R={DSpointerdown:void 0,DSpointermove:void 0,DSpointerup:void 0},w=null,T=0,D=void 0,A=function(){s&&a&&(clearTimeout(s),clearTimeout(a),s=0,a=0)},P=function(){function e(){}return e.disable=function(){b=!1},e.isLastEventTouch=function(t){if(void 0===t)return e.isTouch;e.isTouch=t},e.isTouchEvent=function(e){var t=!1,o=e.mozInputSource;return e.touchFlag?t=!0:null!=o&&5===o?t=!0:e.changedTouches?t=!0:i.isAndroid()?t=!0:"touch"===e.pointerType?t=!0:e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents?t=!0:window.navigator.userAgent&&window.navigator.platform.match(/iPhone|iPod|iPad/)?t=!0:"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1?t=!0:"touchstart"!==e.type&&"touchend"!==e.type&&"touchmove"!==e.type||(t=!0),e.touchFlag=t,t},e.enable=function(){var t=!1;function i(n){if(b){var i,v=e.isTouchEvent(n),g=o.Engine;if(l&&console.log("oldEvent :"+n.type+"   touch :"+v),g.ie||window.navigator.userAgent.indexOf("Edge")>=0?i=v?_[n.type]:m[n.type]:g.safari||g.safari7?i=v?y[n.type]:m[n.type]:g.chrome||g.webkit?i=v?y[n.type]:m[n.type]:g.firefox&&(i=v?y[n.type]:m[n.type]),i){var P;if(3===(void 0!==n.which?n.which:n.button))return;if("touch"==n.type.substr(0,5)&&n.changedTouches&&n.changedTouches.length?((P=new MouseEvent(i,{bubbles:n.bubbles,cancelable:n.cancelable,view:n.view,detail:n.detail,ctrlKey:n.ctrlKey,altKey:n.altKey,button:n.button,buttons:n.buttons,clientX:n.changedTouches[0].clientX,clientY:n.changedTouches[0].clientY,metaKey:n.metaKey,relatedTarget:n.relatedTarget,screenX:n.changedTouches[0].screenX,screenY:n.changedTouches[0].screenY,shiftKey:n.shiftKey})).changedTouches=n.changedTouches,P.touches=n.touches):P=new MouseEvent(i,{bubbles:n.bubbles,cancelable:n.cancelable,view:n.view,detail:n.detail,ctrlKey:n.ctrlKey,altKey:n.altKey,button:n.button,buttons:n.buttons,clientX:n.clientX,clientY:n.clientY,metaKey:n.metaKey,relatedTarget:n.relatedTarget,screenX:n.screenX,screenY:n.screenY,shiftKey:n.shiftKey}),n){var C=R[P.type],S=C&&C.changedTouches?C.changedTouches[0].screenX:C?C.screenX:-1,L=C&&C.changedTouches?C.changedTouches[0].screenY:C?C.screenY:-1,U=g.ie||window.navigator.userAgent.indexOf("Edge")>=0;if(C&&n.target===C.target&&(!U&&Math.abs(n.timeStamp-C.timeStamp)<5&&S===P.screenX&&L===P.screenY||U&&Math.abs(n.timeStamp-C.timeStamp)<70&&Math.abs(S-P.screenX)<10&&Math.abs(L-P.screenY)<10))if(P.type===c||P.type===u){if(P.type===O.type||n.type!==C.originalEvent.type)return void(l&&console.warn("stop event",n.type))}else{if(P.type!==p)return void(l&&console.warn("stop event",n.type));if(O&&C&&C.timeStamp>=O.timeStamp)return void(l&&console.warn("stop event",n.type))}}if(P.originalEvent=n,P.oldPreventDefault=P.preventDefault,P.oldStopPropagation=P.stopPropagation,P.oldStopImmediatePropagation=P.stopImmediatePropagation,P.preventDefault=function(){P.oldPreventDefault(),n.preventDefault()},P.stopPropagation=function(){P.oldStopPropagation(),n.stopPropagation()},P.stopImmediatePropagation=function(){P.oldStopImmediatePropagation(),n.stopImmediatePropagation()},P.type===c&&(t=!0,A(),s=setTimeout(function(e){n.target&&!0===n.target.isConnected?E("DShold",n):n.preventDefault()},d),a=setTimeout(function(e){n.target&&!0===n.target.isConnected?E("DSlonghold",n):n.preventDefault()},h)),"DSpointerhit"===P.type&&(D||(D=n.target),D===n.target?T++:(T=1,clearTimeout(w),w=null),D=n.target,P.multipleHitCount=T,null===w&&(w=setTimeout(function(){w=null,T=0,D=void 0,clearTimeout(w)},500))),"DSpointermove"===P.type){var X=R[c];if(t&&X&&(X.screenX||X.screenY)&&X.screenX===P.screenX&&X.screenY===P.screenY)return t=void 0,void(l&&console.log("DSpointermove prevented"));X&&Math.sqrt(Math.pow(P.screenX-X.screenX,2)+Math.pow(P.screenY-X.screenY,2))>f&&A()}e.isLastEventTouch(v),P.touchFlag=v,l&&console.log("oldEvent :"+n.type+"     newEvent :"+P.type+"   touch :"+v),n.target.dispatchEvent(P),P.type!==c&&P.type!==u||(O=P),Object.keys(R).indexOf(P.type)>-1&&(R[P.type]=P),P.type===u&&A(),l&&(clearTimeout(r),console.warn(n.type,"--\x3e",P.type,P.timeStamp),"DSpointerhit"===P.type&&console.log("multipleHitCount :  "+P.multipleHitCount),r=setTimeout(function(){},5e3))}}}for(var v in g)o.Engine.ie?document.addEventListener(v,i,g[v].options.capture):document.addEventListener(v,i,g[v].options);document.oncontextmenu=function(e){var t;if(null==e?void 0:e.target){var o=(null===(t=e.target)||void 0===t?void 0:t.getTagName)?e.target.getTagName():"";if("input"===o||"textarea"===o)return void(e.target.disabled&&e.preventDefault());var i=n.firstParentWithDSModel(e.target),r=(null==i?void 0:i.dsModel)?i.dsModel:null;if(null==r?void 0:r.noContextMenu)if(null==r?void 0:r._getCustomContent){var s=r._getCustomContent();if(s.length){for(var a=!1,l=0;l<s.length;l++)s[l]&&n.isElementInside(e.target,s[l])&&(a=!0);a||e.preventDefault()}else e.preventDefault()}else e.preventDefault()}}},e.POINTERDOWN=c,e.POINTERMOVE=p,e.POINTERUP=u,e.POINTERLEAVE="DSpointerleave",e.POINTERENTER="DSpointerenter",e.POINTEROUT="DSpointerout",e.HOLD="DShold",e.LONGHOLD="DSlonghold",e.POINTERHIT="DSpointerhit",e}();return P}),define("DS/Core/CoreInterfaces",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})}),define("DS/Core/WebUXComponents",["require","exports","UWA/Core"],function(e,t,o){"use strict";function n(e,t,n){var i;i=e,Object.defineProperty(n.prototype,i,{get:function(){if(this._properties&&this._properties[i])return this._properties[i].value},enumerable:!0,configurable:!0}),!0!==t.readOnly&&function(e){var i=e.substring(0,1).toUpperCase()+e.substring(1,e.length),r="_apply"+i;if(!0!==t.advancedSetter)Object.defineProperty(n.prototype,e,{set:function(n){var i;if(!(this._properties&&this._properties[e]&&(Array.isArray(this._properties[e].value)?o.equals(this._properties[e].value,n):this._properties[e].value===n))&&(this._properties[e]?(i=this._properties[e].value,this._properties[e].value=n):this._properties[e]={value:n},this._propertyChanged(e,i,n),!t.noNeedToApplyFlag)){if(this._properties[e].dirty=!0,this[r])this[r](i,n);else{var s={};s[e]=i,this._applyProperties(s)}this._properties[e].dirty=!1}}});else{var s="_preEdit"+i,a="_postEdit"+i;Object.defineProperty(n.prototype,e,{set:function(n){var i;if(this._properties[e]&&(i=this._properties[e].value),this[s]){var l=this[s](i,n);if(!1===l)return;"object"==typeof l&&Object.keys(l).indexOf("validValue")>=0&&(n=l.validValue)}if(this._properties&&this._properties[e]&&(Array.isArray(this._properties[e].value)?o.equals(this._properties[e].value,n):this._properties[e].value===n))this[a]&&this[a](i,n);else{if(this._properties[e]?this._properties[e].value=n:this._properties[e]={value:n},this._propertyChanged(e,i,n),!t.noNeedToApplyFlag){if(this._properties[e].dirty=!0,this[r])this[r](i,n);else{var u={};u[e]=i,this._applyProperties(u)}this._properties[e].dirty=!1}this[a]&&this[a](i,n)}}})}}(e)}return function(){function e(){}return e.addClass=function(e,t){e.prototype.name=t;var i=e.publishedProperties||{};e.prototype.publishedProperties?e.prototype.publishedProperties=o.clone(e.prototype.publishedProperties):e.prototype.publishedProperties={};var r=e._privateProperties||{};for(var s in e.prototype._privateProperties?e.prototype._privateProperties=o.clone(e.prototype._privateProperties):e.prototype._privateProperties={},i)e.prototype.publishedProperties[s]=i[s],n(s,i[s],e);for(var s in r)e.prototype._privateProperties[s]=r[s],n(s,r[s],e)},e._applyForAdvancedSetterProperty=function(e,t,o,n){if(e){var i=t,r=i.substring(0,1).toUpperCase()+i.substring(1,i.length),s="_preEdit"+r,a="_postEdit"+r,l="_apply"+r;if(e[s]){var u=e[s](o,n);if(!1===u)return void(e._properties[i].value=o);"object"==typeof u&&u.hasOwnProperty("validValue")&&(e._properties[i].value=u.validValue)}e[l]&&e[l](o,e._properties[i].value),e[a]&&e[a](o,e._properties[i].value)}},e}()}),define("DS/Core/ActionsStack",["UWA/Core","UWA/Class","DS/Utilities/Data"],function(e,t,o){"use strict";return t.extend({init:function(){this._stack=[],this._index=-1,this._isRunning=!1,this._lastRecordTimeStamp=new Date},_execute:function(e,t,o){return e&&"function"==typeof e[t]?(this._isRunning=!0,o?e[t](o):e[t](),this._isRunning=!1,this):this},pushAction:function(e,t){this.registerAction(e),t&&t()},registerAction:function(t){e.extend({undoObj:null,undoFunc:null,undoParamsList:[],undoTitle:"Undo",actionObj:null,actionFunc:null,actionParamsList:[],actionTitle:"run",redoObj:null,redoFunc:null,redoParamsList:[],redoTitle:"Redo"},t);var o=new Date,n=o-this._lastRecordTimeStamp;this._lastRecordTimeStamp=o,this._add({undoTitle:t.undoTitle,actionTitle:t.actionTitle,redoTitle:t.redoTitle,deltaTime:n,actionParamsList:t.actionParamsList,undo:function(){t.undoFunc.apply(t.undoObj,t.undoParamsList)},redo:function(){t.redoFunc.apply(t.redoObj,t.redoParamsList)},run:function(e){e?t.actionFunc.apply(t.actionObj,e):t.actionFunc.apply(t.actionObj,t.actionParamsList)}})},_add:function(e){return this._isRunning?this:(this._stack.splice(this._index+1,this._stack.length-this._index),this._stack.push(e),this._index=this._stack.length-1,this.callback&&this.callback(),this)},setCallback:function(e){this.callback=e},getUndoTitle:function(){return this._stack[this._index]&&this._stack[this._index].undoTitle?this._stack[this._index].undoTitle:"Undo"},getRedoTitle:function(){return this._stack[this._index+1]&&this._stack[this._index+1].redoTitle?this._stack[this._index+1].redoTitle:"Redo"},undo:function(){var e=this._stack[this._index];return e?(this._execute(e,"undo"),this._index-=1,this.callback&&this.callback(),this):this},redo:function(){var e=this._stack[this._index+1];return e?(this._execute(e,"redo"),this._index+=1,this.callback&&this.callback(),this):this},play:function(e){var t=this,o=function(n){var i=t._stack[n];i&&(e?setTimeout(function(){t._execute(i,"run"),o(++n)},0===n?0:i.deltaTime):(t._execute(i,"run"),o(++n)))};o(0)},process:function(t){var n=this;if((t=e.extend({actionParamsList:null,chunckProcess:!0},t)).chunckProcess)o.forEach(n._stack,function(e){n._execute(e,"run",t.actionParamsList)},10);else{var i=function(e){var o=n._stack[e];o&&(n._execute(o,"run",t.actionParamsList),i(++e))};i(0)}},clear:function(){var e=this._stack.length;this._stack=[],this._index=-1,this.callback&&e>0&&this.callback()},hasUndoAction:function(){return-1!==this._index},hasRedoAction:function(){return this._index<this._stack.length-1},getActions:function(){return this._stack}})}),define("DS/Core/BaseComponent",["require","exports","UWA/Core","UWA/Utils","DS/Utilities/WUXUWAUtils","UWA/Dispatcher","DS/WUXTypings/typings/UWA","DS/WUXTypings/typings/WEBUX"],function(e,t,o,n,i,r){"use strict";function s(e,t,o){var n=e._dispatchers,i=n&&n[t]||new r;return o||(n||(n=e._dispatchers=Object.create(null)),n[t]=i),i}return function(){function e(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];i.extendingClassFlag||(this.options={},this.defaultOptions={},this.elements=void 0,this.container=void 0,this.clearAllTimed=void 0,this.init.apply(this,e))}return e.prototype.initProperty=function(e,t,o){if(t){if(t&&t.hasOwnProperty(e))return void(this[e]=t[e]);this[e]=o}},e.prototype.dispatchEvent=function(e,t,o){var i,r;return void 0===o&&(o=this),t=n.splat(t),i=s(this,e),"function"==typeof this[e]&&i.addOnce(this[e],o,1),"onAnyEvent"!==e&&this.hasEvent("onAnyEvent")?(r=s(this,"onAnyEvent"),"function"==typeof this.onAnyEvent&&r.addOnce(this.onAnyEvent,o),r.addOnce(function(){i.dispatch(t,o)},o),r.dispatch([e].concat(t),o)):i.dispatch(t,o),this},e.prototype.dispatchAsEventListener=function(e,t,o){var i=this;return void 0===o&&(o=i),t=n.splat(t),function(n){i.dispatchEvent(e,[n].concat(t),o)}},e.prototype.addEvent=function(e,t,o,n){return s(this,e).add(t,o,n),this},e.prototype.addEventOnce=function(e,t,o,n){return s(this,e).addOnce(t,o,n),this},e.prototype.addEvents=function(e,t,o){for(var n in e)e.hasOwnProperty(n)&&this.addEvent(n,e[n],t,o);return this},e.prototype.removeEvent=function(e,t,o){var n=this._dispatchers,i=n&&n[e];if(e)i&&(t?i.remove(t,o):i.removeAll(o),0===i.getNumListeners()&&delete n[e]);else for(var r in n)this.removeEvent(r,t,o);return this},e.prototype.removeEvents=function(e){if(e)for(var t in e)e.hasOwnProperty(t)&&this.removeEvent(t,e[t]);else this.removeEvent();return this},e.prototype.hasEvent=function(e,t){var o,n=this;return o=function(e){return!!(s(n,e,!0).getNumListeners()||!t&&n[e])},(e?[e]:Object.keys(n._dispatchers||{})).some(o)},e.prototype.setOptions=function(e){return e=e||{},this.hasOwnProperty("options")||(this.options=o.clone(this.defaultOptions||this.options||{})),e.events&&this.addEvents&&this.addEvents(e.events),o.extend(this.options,e,!0),this},e.prototype.setOption=function(e,t){var o={};return o[e]=t,this.setOptions(o)},e.prototype.getOption=function(e,t){var o=this.options;return void 0!==o[e]?o[e]:t},e.prototype.getModel=function(){return this},e.prototype.preInject=function(e){},e.prototype.inject=function(e,t){var o=this.getContent();return o&&(this.preInject(e),this.dispatchEvent("onPreInject",[e]),o.inject(e,t),this.dispatchEvent("onPostInject",[e]),this.dispatchEvent("onResize",[e])),this},e.prototype.remove=function(){var e=this.getContent();return e&&e.remove(),this},e.prototype.getContent=function(){if(!this.elements.container&&!this.container)throw new Error("You don't have an elements.container or container.");return this.elements.container||this.container},e.prototype.getClassNames=function(){var e=this.constructor,t=n.toArray(arguments),o=this.options.className||"",i=n.splat(o).join(" ");for(t.length||(t=[""]),t.indexOf("")>=0&&!1!==this.options._root&&t.push("-root");e;)e.prototype.name&&(i+=" "+e.prototype.name+t.join(" "+e.prototype.name)),e=e.parent;return i},e.prototype.show=function(e){return this.getContent().show(),this.dispatchEvent("onShow")},e.prototype.destroy=function(){var e,t=this.elements||{};for(e in this.container&&(t.container=this.container),t)t.hasOwnProperty(e)&&"object"==typeof t[e]&&void 0!==t[e]&&t[e].destroy&&(t[e].destroy(),delete t[e]);this.removeEvents(),this.clearAllTimed&&this.clearAllTimed(),delete this.options},e.prototype.buildDefaultProperties=function(){return{}},e.prototype._preBuild=function(e){},e.prototype._build=function(){},e.prototype._postBuild=function(){},e.prototype._applyProperties=function(e){},e.prototype.init=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o=e[0];for(var n in this._properties={},this.elements={},this.setOptions(void 0),this.publishedProperties)this._properties[n]={value:Array.isArray(this.publishedProperties[n].defaultValue)?this.publishedProperties[n].defaultValue.slice():this.publishedProperties[n].defaultValue,dirty:!0};for(var n in this._privateProperties)this._properties[n]={value:Array.isArray(this._privateProperties[n].defaultValue)?this._privateProperties[n].defaultValue.slice():this._privateProperties[n].defaultValue,dirty:!0};this._preBuild&&this._preBuild(o),this._build&&this._build(),this.setProperties(o,!0),this._postBuild&&this._postBuild()},e.prototype.isDirty=function(e){return!!this._properties&&(!!this._properties[e]&&this._properties[e].dirty)},e.prototype.setProperties=function(e,t){var o={},n=t||!1,i=n;for(var r in e)this._properties[r]&&(this.publishedProperties[r]?(!this.publishedProperties[r].readOnly||n)&&this._properties[r].value!==e[r]&&(o[r]=this._properties[r].value,this._properties[r].value=e[r],this._properties[r].dirty=!0,i=!0):this._privateProperties[r]&&(!this._privateProperties[r].readOnly||n)&&this._properties[r].value!==e[r]&&(o[r]=this._properties[r].value,this._properties[r].value=e[r],this._properties[r].dirty=!0,i=!0));if(i)for(var s in this._applyProperties(o),this._properties)this._properties[s].dirty=!1},e.prototype._forceApplyProperties=function(e){for(var t={},o=0;o<e.length;o++)this._properties[e[o]]?(this._properties[e[o]].dirty=!0,t[e[o]]=this._properties[e[o]].value):console.log(n+" is not a published property");for(var n in this._applyProperties(t),this._properties)this._properties[n].dirty=!1},e.prototype._propertyChanged=function(e,t,o){0},e.inherit=i.inherit,e.extend=i.extend,e}()}),define("DS/Core/TooltipManager",["require","exports","DS/Core/PointerEvents"],function(e,t,o){"use strict";return function(){function e(){}return e._getTooltipFrame=function(){if(void 0!==e._tooltipFrame)return e._tooltipFrame},e.enable=function(){document.addEventListener(o.LONGHOLD,function(t){e.hide()}),document.addEventListener(o.HOLD,function(t){if(o.isTouchEvent(t)){var n=e._getTooltipFrame();n&&(n.mousePosition={x:t.clientX,y:t.clientY});var i=void 0,r=void 0;for(r=t.target;r;r=r.parentNode){if(r.dsModel&&r.dsModel.tooltipInfos){i=r.dsModel;break}if(r.tooltipInfos){i=r;break}}void 0!==i&&(i.tooltipInfos.initialDelay=0,e.touchMode=!0,n._lastShowPosition={x:t.clientX,y:t.clientY},e.show(i))}}),document.addEventListener(o.POINTERDOWN,function(t){var o=t.target,n=e._getTooltipFrame();if(n&&n.visibleFlag){var i=!1;if(n.target&&n.target.tooltipInfos&&(i=n.target.tooltipInfos._reachableState),!i)return void e.hide();var r=!1,s=!1;for(var a in n.elements)if(n.elements.hasOwnProperty(a)&&n.elements[a]===o){r=!0,s="moreHelp"===a;break}s?n.target.tooltipInfos.moreHelpCB():r||e.hide()}},!0),document.addEventListener(o.POINTERMOVE,function(t){var o=e._getTooltipFrame();if(o&&o.visibleFlag&&(o.hasInitialTimerEnded()?o.isShortHelpVisible()||(o.mousePosition={x:t.clientX,y:t.clientY},o._setInitialTimer()):o.mousePosition={x:t.clientX,y:t.clientY},o.target&&o.target.tooltipInfos&&o.target.tooltipInfos._reachableState)){var n={x:t.clientX+window.pageXOffset,y:t.clientY+window.pageYOffset},i=o.isPositionInRZ(n,"target",0),r=o.isPositionInRZ(n,"tooltip",0);i||r||e.hide()}}),document.addEventListener(o.POINTERUP,function(t){if(!o.isTouchEvent(t))for(var n=t.target;n;n=n.parentNode)if(n.dsModel&&n.dsModel.tooltipInfos||n.tooltipInfos){e.hide();break}},!0),document.addEventListener("mouseleave",function(t){var o=e._getTooltipFrame();if(o){var n=!1;o.target&&o.target.tooltipInfos&&(n=o.target.tooltipInfos._reachableState);var i={x:t.clientX+window.pageXOffset,y:t.clientY+window.pageYOffset},r=o.isPositionInRZ(i,"target",-1),s=o.isPositionInRZ(i,"tooltip",-1);r||n&&s||e.hide()}},!0),document.addEventListener("mouseenter",function(t){if(!o.isTouchEvent(t)){var n=e._getTooltipFrame(),i=!1;n&&n.target&&n.target.tooltipInfos&&(i=n.target.tooltipInfos._reachableState);var r={x:t.clientX+window.pageXOffset,y:t.clientY+window.pageYOffset};if(!i||!n.isPositionInRZ(r,"tooltip")){n&&(n.mousePosition={x:t.clientX,y:t.clientY});for(var s=void 0,a=t.target;a;a=a.parentNode){if(a.dsModel&&a.dsModel.tooltipInfos){s=a.dsModel.tooltipInfos;break}if(a.tooltipInfos){s=a.tooltipInfos;break}}s&&n&&(a.dsModel&&n.target!==a.dsModel||!a.dsModel&&a!==n.target)&&(e.hide(),n._lastShowPosition={x:t.clientX,y:t.clientY},e.show(a))}}},!0),document.addEventListener("keydown",function(t){e.hide()},!0)},e.show=function(t){var o=e._getTooltipFrame();o&&t&&(t.dsModel||t.tooltipInfos)&&(t.dsModel&&o.target!==t.dsModel?o.target=t.dsModel:t.tooltipInfos&&o.target!==t&&(o.target=t),o.touchMode=e.touchMode,o.show())},e.hide=function(){var t=e._getTooltipFrame();t&&(t.visibleFlag=!1)},e._tooltipFrame=void 0,e}()}),define("DS/Core/Core",["require","exports","DS/WebappsUtils/WebappsUtils","UWA/Core","DS/Core/PointerEvents","DS/Core/TooltipManager","UWA/Class/Promise","DS/Utilities/TouchUtils","UWA/Controls/Abstract","css!DS/Core/wux.css","css!DS/Core/wux-3ds-fonticons.css","DS/Core/WebUXGlobalEnums"],function(e,t,o,n,i,r,s,a,l){"use strict";var u,p=!1;var c,d,h=l.singleton({defaultOptions:{},init:function(e){this._parent(e),this._buildView()},_buildView:function(){var e=this;this.elements.container=new n.Element("div",{styles:{position:"absolute",top:0,width:0,right:0,bottom:0,borderLeft:"1px solid silver",background:"white",fontFamily:"consolas",overflow:"hidden",zIndex:1e5,boxShadow:"0px 1px 5px #CCC"}}),this.elements.titleContainer=new n.Element("div",{html:"Console",styles:{width:"100%",background:"#358EC4",color:"white",padding:5,position:"relative"}}).inject(this.elements.container),this.elements.emptyConsole=new n.Element("div",{styles:{background:"url("+o.getWebappsBaseUrl()+"Core/assets/icons/trash.png)",backgroundSize:"contain",backgroundRepeat:"no-repeat",width:20,height:16,position:"absolute",top:3,right:10}}).inject(this.elements.titleContainer),this.elements.emptyConsole.addEvent(i.POINTERUP,function(){e.elements.console.empty()}),this.elements.console=new n.Element("div",{styles:{padding:5}}).inject(this.elements.container)},_pushMessage:function(e,t){var o="black",i="white",r="silver";switch(t){case"log":o="#999",i="white",r="#EBEAE9";break;case"warn":i="#FEF5D3",r=o="#F07E00";break;case"info":i="#E9FDFE",r=o="#1DBCDE"}var s=new Date,a=s.getHours(),l=s.getMinutes(),u=s.getSeconds(),p=new n.Element("div",{html:e,styles:{textAlign:"left",padding:"2px 5px",marginBottom:10,color:o,borderRadius:2,border:"1px solid "+r,background:i}}).inject(this.elements.console,"top");new n.Element("div",{html:a+":"+l+":"+u,styles:{fontSize:9,padding:"2px 5px",marginBottom:0,color:"silver",textAlign:"right"}}).inject(p,"top")},_prettyPrint:function(e){e=Array.prototype.slice.call(e);var t="";return e.forEach(function(e){if("[object Object]"===n.typeOf(e)||"object"===n.typeOf(e)){var o=function(e,t){void 0===t&&(t=0);var o="";for(var n in e)o=o+"\r"+n+": "+(e[n]&&e[n].toString?e[n].toString():e[n])+",";return t++,o="{"+o+"\r }"}(e);t=t+" "+o}else t=t+" "+e}),t},addButton:function(e){new n.Element("div",{html:e.label,events:e.events,class:"wux-controls-button"}).inject(this.elements.console,"bottom")},log:function(){this._pushMessage(this._prettyPrint(arguments),"log")},warn:function(e){this._pushMessage(this._prettyPrint(arguments),"warn")},info:function(e){this._pushMessage(this._prettyPrint(arguments),"info")}}),f=function(){function e(){}return e.getVersion=function(){return 5.5},e.isDebug=function(){return e.debug.enabled},e.enableWUXConsole=function(){p=!0,h.getContent().setStyles({width:200}),document.body.appendChild(h.getContent())},e.disableWUXConsole=function(){p=!1},e.isWUXConsoleEnabled=function(){return p},e.getWUXConsole=function(){return h},e.setFullscreen=function(){var t;t=o.getWebappsBaseUrl()+"Controls/nv-patch.css",(u=document.createElement("link")).type="text/css",u.rel="stylesheet",u.href=t,document.getElementsByTagName("head")[0].appendChild(u),console.warn("=========================================================================="),console.warn("WUX.setFullscreen() is for debug purpose only! DO NOT use in production..."),console.warn("=========================================================================="),e&&(e.debug.fullscreen=!0);var i=n.extend(document.querySelector(".module"));i&&i.setStyles({position:"absolute",top:0,width:"auto",left:0,right:p?200:0,bottom:0})},e.enableFullscreen=function(){this.setFullscreen()},e.isFullscreen=function(){return!!e&&e.debug.fullscreen},e.setLogLevel=function(t){e&&(e.debug.logLevel=t)},e.info=function(e){},e.log=function(t,o){void 0===o&&(o=0),e&&e.debug.logLevel&&o<=e.debug.logLevel&&console.log("["+e.debug.logLevel+"] : %o",t)},e.warn=function(t,o){void 0===o&&(o=0),e&&e.debug.logLevel&&o<=e.debug.logLevel&&console.warn("["+e.debug.logLevel+"] : %o",t)},e.warnDev=function(e,t){console.warn("["+e+"] - "+t)},e.getLocalization=function(){var e,t;return(null===(e=window.widget)||void 0===e?void 0:e.lang)?window.widget.lang:(null===navigator||void 0===navigator?void 0:navigator.language)?navigator.language:(null===(t=null===navigator||void 0===navigator?void 0:navigator.languages)||void 0===t?void 0:t.length)?navigator.languages[0]:"en"},e.onlanguagechange=function(e){v.addEvent("onlanguagechange",e)},e.offlanguagechange=function(e){v.removeEvent("onlanguagechange",e)},e.startUnsafeHTMLDisplay=function(){var e=[];e.push(g("DS/Developer/UnsafeHTMLDisplay")),s.all(e).then(function(e){e[0].startUnsafeHTMLDisplay()}).catch(function(e){console.error("There were an error on startUnsafeHTMLDisplay call")})},e.stopUnsafeHTMLDisplay=function(){var e=[];e.push(g("DS/Developer/UnsafeHTMLDisplay")),s.all(e).then(function(e){e[0].stopUnsafeHTMLDisplay()}).catch(function(e){console.error("There were an error on stopUnsafeHTMLDisplay call")})},e.debug={enabled:!1,fullscreen:!1,logLevel:0},e.PointerEvents=i,e.TooltipManager=r,e.POLYMER_ENABLED=Boolean(function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var o=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return o?o[2]?decodeURIComponent(o[2].replace(/\+/g," ")):"":null}("WUX_POLYMER_ENABLED")),e}(),v=new n.Class.Events;function g(t){return new s(function(o,n){new Promise(function(o,n){e([t],o,n)}).then(function(e){o(e)},function(e){n(e)})})}return i.enable(),r.enable(),a.init(),f.POLYMER_ENABLED&&(c="../Polymer-1.1.4/webcomponents-lite.js",(u=document.createElement("script")).type="text/JavaScript",u.src=c,document.getElementsByTagName("head")[0].appendChild(u),function(e){(u=document.createElement("link")).rel="import",u.href=e,document.getElementsByTagName("head")[0].appendChild(u)}("../Polymer-1.1.4/polymer.html"),window.Polymer=window.Polymer||{},window.Polymer.dom="shadow"),n.namespace("WUX",f,window,"replace"),d=f.getLocalization(),Object.defineProperty(window.WUX,"currentLanguage",{get:function(){return d},set:function(e){d=e,v.dispatchEvent("onlanguagechange")}}),f});