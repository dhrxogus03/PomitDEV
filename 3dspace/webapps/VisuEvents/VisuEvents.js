define("DS/VisuEvents/ScreenEvent",["UWA/Class","DS/Visualization/ThreeJS_DS","DS/CoreEvents/Events"],function(e,t,s){"use strict";var i=e.extend({init:function(e){return this.type="Screen",this.view=null,this.path=null,this.event=e,this.isPrimary=!1,this.state=i.State.NONE,this.startTime=0,this.currentTime=0,this.startPosition=new t.Vector2,this.currentPosition=new t.Vector2,this.lastPosition=new t.Vector2,this.deltaPosition=new t.Vector2,this.offsetPosition=new t.Vector2,this._startPosition=new t.Vector2,this._currentPosition=new t.Vector2,this._lastPosition=new t.Vector2,this._deltaPosition=new t.Vector2,this._offsetPosition=new t.Vector2,this.updateView(e),this},setPrimary:function(e){this.isPrimary=e},update:function(e){switch(this.currentTime=e.timeStamp,this.event=e,e.type){case"mousedown":case"touchstart":case"wheel":case"mousewheel":case"DOMMouseScroll":this.state=i.State.BEGIN,this.startTime=this.currentTime;break;case"keydown":this.state===i.State.NONE&&(this.state=i.State.BEGIN,this.startTime=this.currentTime);break;case"mousemove":case"touchmove":this.state=i.State.MOVE,this.updateView(e);break;case"keyup":case"mouseup":case"touchend":this.state=i.State.END;break;case"mouseleave":case"mouseout":case"touchcancel":this.state=i.State.CANCEL}},updateView:function(e){var t;if(e.composedPath&&e.composedPath()&&e.composedPath().length){let s=e.composedPath();t=s[0].__impl4cf1e782hg__||s[0].impl||s[0],this.path=s}else e.path&&e.path.length?(t=e.path[0].__impl4cf1e782hg__||e.path[0].impl||e.path[0],this.path=e.path):e.target?t=e.target:e.srcElement&&(t=e.srcElement);this.view&&(this.startPosition.copy(this.getRelativePositionToView(this.startPosition,t)),this.currentPosition.copy(this.getRelativePositionToView(this.currentPosition,t)),this.lastPosition.copy(this.getRelativePositionToView(this.lastPosition,t))),this.view=t},nextState:function(){switch(this.state){case i.State.BEGIN:case i.State.MOVE:this.state=i.State.IDLE;break;case i.State.END:case i.State.CANCEL:default:this.state=i.State.NONE}},getType:function(){return this.type},getState:function(){return this.state},getView:function(){return this.view},getJSEvent:function(){return this.event},isInView:function(e){var t=e;if(e instanceof Array||(t=[e]),this.path)for(var s=0;s<t.length;s++)for(var i=0;i<this.path.length;i++){if((this.path[i].__impl4cf1e782hg__||this.path[i].impl||this.path[i])===(t[s].__impl4cf1e782hg__||t[s].impl||t[s]))return!0}else for(s=0;s<t.length;s++)for(var n=this.view;n;){if(n===t[s])return!0;n=n.parentNode}return!1},getStartPosition:function(e){return e?e==this.view?this.startPosition:this.getRelativePositionToView2(this._startPosition,e):this.getRelativePositionToView2(this._startPosition,this.view)},getCurrentPosition:function(e){return e?this.getRelativePositionToView2(this._currentPosition,e):this.getRelativePositionToView2(this._currentPosition,this.view)},getLastPosition:function(e){return e?this.getRelativePositionToView2(this._lastPosition,e):this.getRelativePositionToView2(this._lastPosition,this.view)},getOffsetPosition:function(){return this._offsetPosition.clone()},getDeltaPosition:function(){return this._deltaPosition.clone()},getRelativePositionToView:function(e,s){var i,n;try{i=this.view.getBoundingClientRect()}catch(e){i={left:0,top:0}}try{n=s.getBoundingClientRect()}catch(e){n={left:0,top:0}}return new t.Vector2(e.x+i.left-n.left,e.y+i.top-n.top)},getRelativePositionToView2:function(e,s){var i;try{i=s.getBoundingClientRect()}catch(e){i={left:0,top:0}}return new t.Vector2(e.x-i.left,e.y-i.top)}});return i.State={NONE:0,BEGIN:1,IDLE:2,MOVE:3,END:4,CANCEL:5},i.MouseButton={NONE:-1,LEFT:0,MIDDLE:1,RIGHT:2,WHEEL:3},i.KeyboardKey={SHIFT:16,CTRL:17,S:83},i.DragGesture={DEFAULT:0,TOUCH:1},i.printMouseButton=function(e){switch(e){case i.MouseButton.LEFT:return"Left";case i.MouseButton.MIDDLE:return"Middle";case i.MouseButton.RIGHT:return"Right";case i.MouseButton.NONE:default:return""}},UWA.namespace("THREEDS/Events/ScreenEvent",i)}),define("VisuEvents/ScreenEvent",["DS/VisuEvents/ScreenEvent","DS/DSMigration/DSMigration"],function(e,t){return t.deprecateModule("VisuEvents/ScreenEvent"),e}),define("DS/VisuEvents/MouseEvent",["DS/Visualization/ThreeJS_DS","DS/VisuEvents/ScreenEvent"],function(e,t){"use strict";var s=t.extend({init:function(e,t){return this._parent(t),this.type="Mouse",this.button=e,this},update:function(s){var i;this._parent(s);try{i=this.view.getBoundingClientRect()}catch(e){i={left:0,top:0}}var n=s.clientX,o=s.clientY;switch(void 0!==s.po_x&&(n=s.po_x),void 0!==s.po_y&&(o=s.po_y),s.type){case"mousedown":case"wheel":case"mousewheel":case"DOMMouseScroll":this.currentPosition.set(n-i.left,o-i.top),this.startPosition.copy(this.currentPosition),this.lastPosition.copy(this.currentPosition),this.deltaPosition.set(0,0),this.offsetPosition.set(0,0),this._currentPosition.set(n,o),this._startPosition.copy(this._currentPosition),this._lastPosition.copy(this._currentPosition),this._deltaPosition.set(0,0),this._offsetPosition.set(0,0),this.button===t.MouseButton.LEFT&&this.setPrimary(!0);break;case"mousemove":var r=new e.Vector2(n-i.left,o-i.top);this.lastPosition.copy(this.currentPosition),this.deltaPosition.subVectors(r,this.currentPosition),this.currentPosition.copy(r),this.offsetPosition.subVectors(this.currentPosition,this.startPosition),r.set(n,o),this._lastPosition.copy(this._currentPosition),this._deltaPosition.subVectors(r,this._currentPosition),this._currentPosition.copy(r),this._offsetPosition.subVectors(this._currentPosition,this._startPosition);break;case"mouseup":case"mouseleave":case"mouseout":r=new e.Vector2(n-i.left,o-i.top);this.lastPosition.copy(this.currentPosition),this.deltaPosition.subVectors(r,this.currentPosition),this.currentPosition.copy(r),this.offsetPosition.subVectors(this.currentPosition,this.startPosition),r.set(n,o),this._lastPosition.copy(this._currentPosition),this._deltaPosition.subVectors(r,this._currentPosition),this._currentPosition.copy(r),this._offsetPosition.subVectors(this._currentPosition,this._startPosition)}},getButton:function(){return this.button}});return UWA.namespace("THREEDS/Events/MouseEvent",s)}),define("VisuEvents/MouseEvent",["DS/VisuEvents/MouseEvent","DS/DSMigration/DSMigration"],function(e,t){return t.deprecateModule("VisuEvents/MouseEvent"),e}),define("DS/VisuEvents/KeyboardEvent",["DS/Visualization/ThreeJS_DS","DS/VisuEvents/ScreenEvent"],function(e,t){"use strict";var s=t.extend({init:function(e,t){return this._parent(t),this.type="Keyboard",this.key=e,this},update:function(e){this._parent(e)},getKey:function(){return this.key}});return UWA.namespace("THREEDS/Events/KeyboardEvent",s)}),define("VisuEvents/KeyboardEvent",["DS/VisuEvents/KeyboardEvent","DS/DSMigration/DSMigration"],function(e,t){return t.deprecateModule("VisuEvents/KeyboardEvent"),e}),define("DS/VisuEvents/TouchEvent",["DS/Visualization/ThreeJS_DS","DS/VisuEvents/ScreenEvent"],function(e,t){"use strict";var s=t.extend({init:function(e,t,s){return this._parent(t),this.type="Touch",this.identifier=e,this._traveledDist=0,this.event.touches&&this.event.touches[s]&&(this.view=this.event.touches[s].target),this},update:function(t){this._parent(t);for(var s,i,n,o=null,r=0;r<t.changedTouches.length;r++){var u=t.changedTouches[r];if(u.identifier===this.identifier){o=u;break}}o&&(s=o.clientX,i=o.clientY,void 0!==o.po_x&&(s=o.po_x),void 0!==o.po_y&&(i=o.po_y));try{n=this.view.getBoundingClientRect()}catch(e){n={left:0,top:0}}switch(t.type){case"touchstart":this.currentPosition.set(s-n.left,i-n.top),this.startPosition.copy(this.currentPosition),this.lastPosition.copy(this.currentPosition),this.deltaPosition.set(0,0),this.offsetPosition.set(0,0),this._currentPosition.set(s,i),this._startPosition.copy(this._currentPosition),this._lastPosition.copy(this._currentPosition),this._deltaPosition.set(0,0),this._offsetPosition.set(0,0),this._traveledDist=0;break;case"touchmove":var h=new e.Vector2(s-n.left,i-n.top);this.lastPosition.copy(this.currentPosition),this.deltaPosition.subVectors(h,this.currentPosition),this.currentPosition.copy(h),this.offsetPosition.subVectors(this.currentPosition,this.startPosition),h.set(s,i),this._lastPosition.copy(this._currentPosition),this._deltaPosition.subVectors(h,this._currentPosition),this._currentPosition.copy(h),this._offsetPosition.subVectors(this._currentPosition,this._startPosition);var a=this._currentPosition.clone();a.sub(this._lastPosition),this._traveledDist+=a.length();break;case"touchend":case"touchcancel":h=new e.Vector2(s-n.left,i-n.top);this.lastPosition.copy(this.currentPosition),this.deltaPosition.subVectors(h,this.currentPosition),this.currentPosition.copy(h),this.offsetPosition.subVectors(this.currentPosition,this.startPosition),h.set(s,i),this._lastPosition.copy(this._currentPosition),this._deltaPosition.subVectors(h,this._currentPosition),this._currentPosition.copy(h),this._offsetPosition.subVectors(this._currentPosition,this._startPosition);var c=new e.Vector2(this._currentPosition.x,this._currentPosition.y);c.sub(this._lastPosition),this._traveledDist+=c.length()}},getIdentifier:function(){return this.identifier},getTraveledDistance:function(){return this._traveledDist}});return UWA.namespace("THREEDS/Events/TouchEvent",s)}),define("VisuEvents/TouchEvent",["DS/VisuEvents/TouchEvent","DS/DSMigration/DSMigration"],function(e,t){return t.deprecateModule("VisuEvents/TouchEvent"),e}),define("DS/VisuEvents/EventsManager",["UWA/Class","DS/CoreEvents/Events","DS/Visualization/ThreeJS_DS","DS/VisuEvents/ScreenEvent","DS/VisuEvents/MouseEvent","DS/VisuEvents/TouchEvent","DS/VisuEvents/KeyboardEvent","DS/Gestures/ClickGesture","DS/Gestures/HoldGesture","DS/Gestures/HoldMouseDownGesture","DS/Gestures/LongHoldGesture","DS/Gestures/EditGesture","DS/Gestures/LongEditGesture","DS/Gestures/SmartEditGesture","DS/Gestures/KeyDownGesture","DS/Gestures/KeyUpGesture","DS/Gestures/MouseDownGesture","DS/Gestures/MouseUpGesture","DS/Gestures/MouseMoveGesture","DS/Gestures/MouseOutGesture","DS/Gestures/MouseWheelGesture","DS/Gestures/TouchGesture","DS/Gestures/ReleaseGesture","DS/Gestures/TapGesture","DS/Gestures/PinchGesture","DS/Gestures/PanGesture","DS/Gestures/RotateGesture","DS/Gestures/PinchPanRotateGesture","DS/Gestures/SwipeGesture","DS/Gestures/SpreadGesture","DS/Gestures/DragGesture","DS/Gestures/PinchTapGesture","DS/Gestures/PrimaryPointerDownUniqueGesture","DS/Gestures/PrimaryPointerMoveUniqueGesture","DS/Gestures/PrimaryPointerUpUniqueGesture","DS/Gestures/PrimaryPointerClickGesture","DS/Gestures/PrimaryPointerDoubleClickGesture","DS/Gestures/DoubleClickGesture","DS/Gestures/ClickDownGesture","DS/Gestures/DoubleTapGesture","DS/Gestures/DoublePinchTapGesture","DS/WebRecordEnabler/Adapter","DS/Gestures/BasicGesture","DS/Gestures/MediumHoldGesture","DS/Gestures/FlickGesture","DS/Gestures/HoldTapGesture","DS/Gestures/TwoFingerTapGesture","DS/Gestures/HoldDragGesture","DS/Gestures/HoldStayGesture","DS/Gestures/MediumHoldStayGesture","DS/Gestures/LongHoldStayGesture"],function(e,t,s,i,n,o,r,u,h,a,c,v,l,_,g,d,p,m,f,E,P,D,T,y,S,M,w,G,b,V,R,N,L,O,B,k,C,I,x,U,H,K,X,Y,W,z,F,A,q,J,j){"use strict";var Q=0,Z=e.singleton({options:{},init:function(e){this._recordViewTable={},this._maxViewIndex=-1,this.options=this.defaultOptions,UWA.extend(this.options,e),this._parent(e),this._screenEvents=[],this._currentEvents=[],this._primaryTouches=[],this.debugEvents=0,this._currentTime=0,this._gestureRecognizers=[],this._gesturesNeedSort=!1,this._gesturesMap=[],this._customGesturesMap=[],this._gesturesToRemove=[],this._ODTMode=!1,this._ODTPiouPiouEvents=null,this._ODTPiouPiouDragsTab=[],this.nbGesturesToLoad=0,this.simulateTouch=!1,this.simulateTouchCB=!1,this.fingerDivs=[],this.fingers=[],this.fingerDst=new s.Vector2(100,100),this._leftButtonPressed=!1,this._shiftKeyPressed=!1,this._staticKeyPressed=!1;var t=this;this.isTouch="ontouchstart"in window,this._isTouchSupported=!!window.TouchEvent,this.isPointer=!!window.PointerEvent;var i=!1;try{var n=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("test",null,n)}catch(e){i=!1}this.supportsPassive=i,this.currentButtons=0,this._onKeyDown=function(e){t._keyDown.call(t,e)},this._onKeyUp=function(e){t._keyUp.call(t,e)},this._onMouseMove=function(e){t._mouseMove.call(t,e)},this._onMouseDown=function(e){t._mouseDown.call(t,e)},this._onMouseUp=function(e){t._mouseUp.call(t,e)},this._onMouseOut=function(e){t._mouseOut.call(t,e)},this._onMouseWheel=function(e){t._mouseWheel.call(t,e)},this._onTouchMove=function(e){t._touchMove.call(t,e)},this._onTouchStart=function(e){t._touchStart.call(t,e)},this._onTouchEnd=function(e){t._touchEnd.call(t,e)},this._onPointerDown=function(e){t._pointerDown.call(t,e)},this._onPointerMove=function(e){t._pointerMove.call(t,e)},this._onPointerUp=function(e){t._pointerUp.call(t,e)},this._onPointerCancel=function(e){t._pointerCancel.call(t,e)},this.touchDetached=!0,this.pointerDetached=!0,this._isIE11=null!=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent),this._isFirefox=s.IsFirefox,this._attachEvents(),this._isInit=!0,this.holdTime=500,this.mediumHoldTime=750,this.longHoldTime=1e3},_attachEvents:function(){K.isReplaying()||(UWA.Element.addEvent.call(document,"mouseleave",this._onMouseOut),document.addEventListener("mousedown",this._onMouseDown,!0),document.addEventListener("mousemove",this._onMouseMove,!0),document.addEventListener("mouseup",this._onMouseUp,!0),document.addEventListener("mousewheel",this._onMouseWheel,!this.supportsPassive||{passive:!1,capture:!0}),document.addEventListener("wheel",this._onMouseWheel,!this.supportsPassive||{passive:!1}),document.addEventListener("DOMMouseScroll",this._onMouseWheel,!this.supportsPassive||{passive:!1}),this._isTouchSupported?this._attachTouchEvents():this.isPointer&&this._attachPointerEvents(),document.addEventListener("keydown",this._onKeyDown,!0),document.addEventListener("keyup",this._onKeyUp,!0),this._screenEvents=[])},_detachEvents:function(){K.isReplaying()||(UWA.Element.removeEvent.call(document,"mouseleave",this._onMouseOut),document.removeEventListener("mousedown",this._onMouseDown,!0),document.removeEventListener("mousemove",this._onMouseMove,!0),document.removeEventListener("mouseup",this._onMouseUp,!0),document.removeEventListener("mousewheel",this._onMouseWheel,!this.supportsPassive||{passive:!1,capture:!0}),document.removeEventListener("DOMMouseScroll",this._onMouseWheel,!0),document.removeEventListener("wheel",this._onMouseWheel,!this.supportsPassive||{passive:!1,capture:!0}),this._detachTouchEvents(),this._detachPointerEvents(),document.removeEventListener("keydown",this._onKeyDown,!0),document.removeEventListener("keyup",this._onKeyUp,!0),this._screenEvents=[])},_attachTouchEvents:function(){var e=!this.supportsPassive||{capture:!0,passive:!1};this.touchDetached&&(document.addEventListener("touchmove",this._onTouchMove,e),document.addEventListener("touchstart",this._onTouchStart,e),document.addEventListener("touchend",this._onTouchEnd,e),document.addEventListener("touchcancel",this._onTouchCancel,e),this.touchDetached=!1)},_attachPointerEvents:function(){this.pointerDetached&&(document.addEventListener("pointerdown",this._onPointerDown,!0),document.addEventListener("pointermove",this._onPointerMove,!0),document.addEventListener("pointerup",this._onPointerUp,!0),document.addEventListener("pointercancel",this._onPointerCancel,!0),this.pointerDetached=!1)},_detachTouchEvents:function(){var e=!this.supportsPassive||{capture:!0,passive:!1};this.touchDetached||(document.removeEventListener("touchmove",this._onTouchMove,e),document.removeEventListener("touchstart",this._onTouchStart,e),document.removeEventListener("touchend",this._onTouchEnd,e),document.removeEventListener("touchcancel",this._onTouchCancel,e),this.touchDetached=!0)},_detachPointerEvents:function(){this.pointerDetached||(document.removeEventListener("pointerdown",this._onPointerDown,!0),document.removeEventListener("pointermove",this._onPointerMove,!0),document.removeEventListener("pointerup",this._onPointerUp,!0),document.removeEventListener("pointercancel",this._onPointerCancel,!0),this.pointerDetached=!0)},setDebugEvents:function(e){this.debugEvents=e;for(var t=0;t<this._gestureRecognizers.length;t++){this._gestureRecognizers[t].setDebugEvents(e)}},setSimulateTouch:function(e){if(this.simulateTouch=e,e&&!this.simulateTouchCB){var s=this;t.subscribe({event:"/VISU/onBasicEvent"},function(e){var t=e.from&&e.from.length?e.from[0]:null;if(null!==t&&"Keyboard"===t.getType()){var n=t.getKey();if(t.getState()===i.State.BEGIN)switch(n){case i.KeyboardKey.SHIFT:s._shiftKeyPressed=!0;break;case i.KeyboardKey.S:s._staticKeyPressed=!0}else if(t.getState()===i.State.END)switch(n){case i.KeyboardKey.SHIFT:s._shiftKeyPressed=!1;break;case i.KeyboardKey.S:s._staticKeyPressed=!1}}}),this.simulateTouchCB=!0}},_setHoldTime:function(e){this.holdTime=e},_setMediumHoldTime:function(e){this.mediumHoldTime=e},_setLongHoldTime:function(e){this.longHoldTime=e},getHoldTime:function(){return this.holdTime},getMediumHoldTime:function(){return this.mediumHoldTime},getLongHoldTime:function(){return this.longHoldTime},getScreenEvents:function(){return this._screenEvents},getMouseEvents:function(e,t,s){for(var o=[],r=0;r<this._screenEvents.length;r++){var u=this._screenEvents[r];if(u instanceof n&&!(s&&u.getButton()===i.MouseButton.NONE||null!=e&&u.getButton()!==e)){if(t)if(t instanceof Array){if(t.length){for(var h=0;h<t.length&&!this._isInView(u,t[h]);h++);if(h===t.length)continue}}else if(!this._isInView(u,t))continue;o.push(u)}}return o},getMouseEventsByStates:function(e,t,s){for(var i=this.getMouseEvents(t,s),n=[],o=0;o<i.length;o++)for(var r=i[o],u=0;u<e.length;u++){var h=e[u];if(r.getState()===h){n.push(r);break}}return n},getPrimaryPointerEventsByStates:function(e,t){for(var s=this.getMouseEventsByStates(e,i.MouseButton.LEFT,t),n=this.getTouchEventsByStates(e,t),o=0;o<n.length;o++)n[o].isPrimary&&s.push(n[o]);return s},getKeyboardEvents:function(e){for(var t=[],s=0;s<this._screenEvents.length;s++){var i=this._screenEvents[s];i instanceof r&&(void 0!==e&&i.getKey()!==e||t.push(i))}return t},getTouchEvents:function(e){for(var t=[],s=0;s<this._screenEvents.length;s++){var i=this._screenEvents[s];if(i instanceof o){if(e)if(e instanceof Array){if(e.length){for(var n=0;n<e.length&&!this._isInView(i,e[n]);n++);if(n===e.length)continue}}else if(!this._isInView(i,e))continue;t.push(i)}}return t},getTouchEventsByStates:function(e,t){for(var s=[],i=0;i<this._screenEvents.length;i++){var n=this._screenEvents[i];if(n instanceof o){if(t)if(t instanceof Array){if(t.length){for(var r=0;r<t.length&&!this._isInView(n,t[r]);r++);if(r===t.length)continue}}else if(!this._isInView(n,t))continue;for(r=0;r<e.length;r++){var u=e[r];if(n.getState()===u){s.push(n);break}}}}return s},getTouchEventById:function(e){for(var t=0;t<this._screenEvents.length;t++){var s=this._screenEvents[t];if(s instanceof o&&s.identifier===e)return s}return null},getGestureRecognizers:function(){return this._gestureRecognizers},addGestureRecognizer:function(e,t){return t&&e.setView(t),this._gestureRecognizers.push(e),this._gesturesNeedSort=!0,e.id},removeGestureRecognizer:function(e){var t=this._gestureRecognizers.indexOf(e);return-1!==t&&(this._gestureRecognizers.splice(t,1),!0)},addCustomGesture:function(e,t,s){return!!t&&(!(!e||""===e)&&(this._customGesturesMap[e]={gestureName:t,params:s},!0))},addEvent:function(e,t,s){if(e){var i=this._getGesture(e,t);return i?i.addCallback(s):null}},removeEvent:function(e,t,s){if(!e)return!1;var i=!1,n=this._getGesture(e,t,!0);return n&&(i=n.removeCallback(s))&&this._gesturesToRemove.push({view:e,action:t,gst:n}),i},removeEventFromToken:function(e){var t=e.split("_");if(2!==t.length)return!1;for(var s=!1,i=null,n=0;n<this._gestureRecognizers.length;n++){var o=this._gestureRecognizers[n];if(o.id===parseInt(t[0])){i=o;break}}return i&&(s=i.removeCallbackFromToken(e))&&this._gesturesToRemove.push({view:i.view[0],action:i.action,gst:i}),s},_getGesture:function(e,t,s){if(K.isActive())if("string"==typeof e){if(!(e=this._getViewFromRecordId(e)))return null}else this._registerRecordView(e);var i=null,n=this._gesturesMap[t];if(n&&(i=n.get(e)),i||s)i&&!s&&i.setView(e);else{e.id&&""!==e.id||(e.id="___view___"+Q,Q++);var o=Z.GESTURES_MAP[t];if(!o&&!(o=this._customGesturesMap[t]))return null;if(o.require){var r=this._getGesture(e,o.require);(i=this._loadGesture(e,t,o.gestureName,o.params)).requireGesture(r)}else i=this._loadGesture(e,t,o.gestureName,o.params)}return i},_loadGesture:function(e,t,s,i){this._gesturesMap[t]||(this._gesturesMap[t]=new Map);var n=this._gesturesMap[t].get(e);return n||((n=i.length?new s(i[0]):new s).setAction(t),n.setView(e),n.setDebugEvents(this.debugEvents),this._gesturesMap[t].set(e,n),this.addGestureRecognizer(n),n)},_isInView:function(e,t){var s=e.getView();if(e.path)for(var i=0;i<e.path.length;i++){if((e.path[i].__impl4cf1e782hg__||e.path[i].impl||e.path[i])===(t.__impl4cf1e782hg__||t.impl||t))return!0}else for(;s;){if(s===t)return!0;s=s.parentNode}return!1},_addEvent:function(e){this._screenEvents.push(e)},_removeEvent:function(e){var t=this._screenEvents.indexOf(e);if(-1===t)return!1;this._screenEvents.splice(t,1)},_removeEvents:function(e){for(var t=0;t<e.length;t++){var s=e[t];this._removeEvent(s)}},_detectGestures:function(){var e;for(this._sortGestures(),e=0;e<this._gestureRecognizers.length;e++){this._gestureRecognizers[e].detect(this._currentEvents)}for(e=0;e<this._gestureRecognizers.length;e++){this._gestureRecognizers[e].execute()}for(e=0;e<this._gestureRecognizers.length;e++){this._gestureRecognizers[e].update()}this._cleanRemovedGestures();var s={eventChannel:"/VISU/",eventType:"@onGesturesDetection",eventID:"",from:this._currentEvents};t.publish({event:"/VISU/onGesturesDetection",data:s})},_cleanRemovedGestures:function(){if(this._gesturesToRemove.length){var e,t=this;for(e=0;e<this._gesturesToRemove.length;e++){var s=this._gesturesToRemove[e];s.gst&&s.gst._dispose(function(){this.view.length&&this.view[0]&&this.view[0].id&&""!==this.view[0].id&&t._gesturesMap[this.action]&&(t.removeGestureRecognizer(this),t._gesturesMap[this.action].delete(this.view[0]))})}this._gesturesToRemove=[]}},_dispose:function(e){if(this._cleanRemovedGestures(),e){for(var t=[],s=0;s<this._screenEvents.length;s++){var i=this._screenEvents[s];i.isInView(e)||t.push(i)}this._screenEvents=t}},_sortGestures:function(){var e=this._gesturesNeedSort;if(!e)for(var t=0;t<this._gestureRecognizers.length;t++){(s=this._gestureRecognizers[t])._needsUpdate&&(s._needsUpdate=!1,e=!0)}if(e){this._gestureRecognizers.sort(function(e,t){return e.priority-t.priority});for(t=0;t<this._gestureRecognizers.length;t++)this._gestureRecognizers[t]._order=t;for(t=0;t<this._gestureRecognizers.length;t++){var s;if((s=this._gestureRecognizers[t]).gestures.length)for(var i=0;i<s.gestures.length;i++){var n=s.gestures[i];if(s._order<n._order){var o=n._order;n._order=s._order,s._order=o}}}this._gestureRecognizers.sort(function(e,t){return e._order-t._order}),this._gesturesNeedSort=!1}},_triggerEvent:function(e,s){var i={eventChannel:"/VISU/",eventType:"@onBasicEvent",eventID:"",from:e};if(t.publish({event:"/VISU/onBasicEvent",data:i}),(1===this.debugEvents||6===this.debugEvents)&&e)for(var n=0;n<e.length;n++){var o=i.eventType+" | "+e[n].getType()+" | "+e[n].getState(),r=e[n].getView();r&&r.id&&(o+=" | "+r.id),console.log(o)}},_getMouseButton:function(e){switch(e){case-1:return i.MouseButton.NONE;case 0:return i.MouseButton.LEFT;case 1:return i.MouseButton.MIDDLE;case 2:return i.MouseButton.RIGHT}return!1},_contextMenu:function(e){e.preventDefault()},_nextStateEvents:function(e){for(var t=0;t<e.length;t++)e[t].nextState()},_keyDown:function(e){if(!this._ODTMode||e._simul){if(this._ODTPiouPiouEnabled("keyboard")&&32!==e.keyCode){var t=this._ODTPiouPiouDragsTab.length&&this._ODTPiouPiouDragsTab[this._ODTPiouPiouDragsTab.length-1];t&&"keyDown"===t.type&&t.keyCode===e.keyCode||this._ODTPiouPiouDragsTab.push({type:"keyDown",keyCode:e.keyCode})}this._ODTPiouPiouDragsTab.length>0&&32===e.keyCode&&console.log("DRAG DUMP:\n"+JSON.stringify(this._ODTPiouPiouDragsTab)),this._currentTime=(new Date).getTime();var s=this.getKeyboardEvents(e.which);s.length||(this._currentEvents=[new r(e.which,e)],this._addEvent(this._currentEvents[0]),this._currentEvents[0].update(e),this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._nextStateEvents(this._currentEvents),this.simulateTouch&&this._simulateTouchEvent("start",e))}},_keyUp:function(e){if(!this._ODTMode||e._simul){this._ODTPiouPiouEnabled("keyboard")&&32!==e.keyCode&&this._ODTPiouPiouDragsTab.push({type:"keyUp",keyCode:e.keyCode}),this._currentTime=(new Date).getTime();var t=this.getKeyboardEvents(e.which);t.length&&(this._currentEvents=t),0!==this._currentEvents.length?(this._currentEvents[0].update(e),this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._removeEvents(this._currentEvents),this._nextStateEvents(this._currentEvents),this.simulateTouch&&this._simulateTouchEvent("end",e)):console.error("No events in _keyUp")}},_mouseDown:function(e){if(!this._ODTMode||e._simul)if(this.simulateTouch)this._simulateTouchEvent("start",e);else{if(this._isEventSimulatedFromTouch(e))return!0;var t=this._getMouseButton(e.button);this._currentTime=(new Date).getTime();var s=this.getMouseEvents(t);if(s.length?this._currentEvents=[s[0]]:(this._currentEvents=[new n(t,e)],this._addEvent(this._currentEvents[0])),this._currentEvents[0].update(e),this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._nextStateEvents(this._currentEvents),this._ODTPiouPiouEnabled("mousedrag")){var i=this._currentEvents[0].getCurrentPosition(e.target);this._ODTPiouPiouMouseDrag=[{x:i.x,y:i.y,timeStamp:0,button:e.button}],this._ODTPiouPiouDragStart=(new Date).getTime()}}},_mouseMove:function(e){if(!this._ODTMode||e._simul)if(this.simulateTouch)this._simulateTouchEvent("move",e);else if(!this._isEventSimulatedFromTouch(e)){this._currentTime=(new Date).getTime();var t=this.getMouseEvents();if(t.length){var s=this.getMouseEvents(i.MouseButton.NONE);s.length||(s=new n(i.MouseButton.NONE,e),this._addEvent(s),t.push(s)),this._currentEvents=t}else this._currentEvents=[new n(i.MouseButton.NONE,e)],this._addEvent(this._currentEvents[0]);for(var o=0;o<this._currentEvents.length;o++)this._currentEvents[o].update(e);if(this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._nextStateEvents(this._currentEvents),this._ODTPiouPiouMouseDrag){var r=(new Date).getTime()-this._ODTPiouPiouDragStart,u=this._currentEvents[0].getCurrentPosition(e.target);this._ODTPiouPiouMouseDrag.push({x:u.x,y:u.y,timeStamp:r,button:e.button})}}},_mouseUp:function(e){if(!this._ODTMode||e._simul)if(this.simulateTouch)this._simulateTouchEvent("end",e);else if(!this._isEventSimulatedFromTouch(e)){this._currentTime=(new Date).getTime();var t=this._getMouseButton(e.button),s=this.getMouseEvents(t);if(s.length&&(this._currentEvents=[s[0]],s[0].update(e)),this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._removeEvent(s[0]),this._nextStateEvents(this._currentEvents),this._ODTPiouPiouMouseDrag){var i=(new Date).getTime()-this._ODTPiouPiouDragStart,n=this._currentEvents[0].getCurrentPosition(e.target);this._ODTPiouPiouMouseDrag.push({x:n.x,y:n.y,timeStamp:i,button:e.button}),this._ODTPiouPiouDragsTab.push(this._ODTPiouPiouMouseDrag),delete this._ODTPiouPiouMouseDrag,delete this._ODTPiouPiouDragStart}}},_mouseOut:function(e){if((!this._ODTMode||e._simul)&&!this.simulateTouch&&!this._isEventSimulatedFromTouch(e)){this._currentTime=(new Date).getTime();var t=this._getMouseButton(-1),s=this.getMouseEvents(t);s.length?this._currentEvents=[s[0]]:(this._currentEvents=[new n(t,e)],this._addEvent(this._currentEvents[0])),this._currentEvents[0].update(e),this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._nextStateEvents(this._currentEvents)}},_mouseWheel:function(e){if((!this._ODTMode||e._simul)&&!this.simulateTouch){this._currentTime=(new Date).getTime();var t=this.getMouseEvents(i.MouseButton.WHEEL);t.length?this._currentEvents=t:(this._currentEvents=[new n(i.MouseButton.WHEEL,e)],this._addEvent(this._currentEvents[0])),this._currentEvents[0].update(e),this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._removeEvent(this._currentEvents[0]),this._nextStateEvents(this._currentEvents)}},_touchStart:function(e,t){if(!this._ODTMode||e._simul){this._currentEvents=[],this._currentTime=(new Date).getTime(),t||this._cancelBrokenTouches(e);for(var s=e.changedTouches,i=0;i<s.length;i++){var n=this.getTouchEventById(s[i].identifier);null===n&&(n=new o(s[i].identifier,e,i),this.getTouchEvents().length||n.setPrimary(!0),this._addEvent(n)),this._currentEvents.push(n),n.update(e),this._detectFalseMouseEvents(n)}this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._nextStateEvents(this._currentEvents)}},_touchMove:function(e){if(!this._ODTMode||e._simul){this._currentEvents=[],this._currentTime=(new Date).getTime();for(var t=e.changedTouches,s=0;s<t.length;s++){var i=t[s].identifier,n=this.getTouchEventById(i);this._currentEvents.push(n),n.update(e),this._detectFalseMouseEvents(n)}this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._nextStateEvents(this._currentEvents)}},_touchEnd:function(e){if(!this._ODTMode||e._simul){this._currentEvents=[],this._currentTime=(new Date).getTime();for(var t=e.changedTouches,s=0;s<t.length;s++){var i=t[s].identifier,n=this.getTouchEventById(i);this._currentEvents.push(n),n.update(e),this._detectFalseMouseEvents(n)}this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._removeEvents(this._currentEvents),this._nextStateEvents(this._currentEvents)}},_touchCancel:function(e){if(!this._ODTMode||e._simul){this._currentEvents=[],this._currentTime=(new Date).getTime();for(var t=e.changedTouches,s=0;s<t.length;s++){var i=t[s].identifier,n=this.getTouchEventById(i);this._currentEvents.push(n),n.update(e),this._detectFalseMouseEvents(n)}this._triggerEvent(this._currentEvents,e),this._detectGestures(),this._removeEvents(this._currentEvents),this._nextStateEvents(this._currentEvents)}},_pointerDown:function(e){var t={target:e.target,clientX:e.clientX,clientY:e.clientY};switch(e._simul&&(t._simul=!0),e.pointerType){case"mouse":case"pen":return;case"touch":t.type="touchstart",t.changedTouches=[{identifier:e.pointerId,clientX:e.clientX,clientY:e.clientY,target:e.target}],t.touches=[{identifier:e.pointerId,clientX:e.clientX,clientY:e.clientY,target:e.target}],this._touchStart(t,!0)}},_pointerMove:function(e){var t={target:e.target,clientX:e.clientX,clientY:e.clientY};switch(e._simul&&(t._simul=!0),e.pointerType){case"mouse":case"pen":return;case"touch":t.type="touchmove",t.changedTouches=[{identifier:e.pointerId,clientX:e.clientX,clientY:e.clientY,target:e.target}],t.touches=[{identifier:e.pointerId,clientX:e.clientX,clientY:e.clientY,target:e.target}],this._touchMove(t)}},_pointerUp:function(e){var t={target:e.target,clientX:e.clientX,clientY:e.clientY};switch(e._simul&&(t._simul=!0),e.pointerType){case"mouse":case"pen":return;case"touch":t.type="touchend",t.changedTouches=[{identifier:e.pointerId,clientX:e.clientX,clientY:e.clientY,target:e.target}],t.touches=[{identifier:e.pointerId,clientX:e.clientX,clientY:e.clientY,target:e.target}],this._touchEnd(t)}},_pointerCancel:function(e){var t={target:e.target,clientX:e.clientX,clientY:e.clientY};switch(e._simul&&(t._simul=!0),e.pointerType){case"mouse":case"pen":return;case"touch":t.type="touchcancel",t.changedTouches=[{identifier:e.pointerId,clientX:e.clientX,clientY:e.clientY,target:e.target}],t.touches=[{identifier:e.pointerId,clientX:e.clientX,clientY:e.clientY,target:e.target}],this._touchCancel(t)}},_detectFalseMouseEvents:function(e){var t=this._primaryTouches;if(e.isPrimary){var s={x:e._startPosition.x,y:e._startPosition.y};t.push(s);var i=function(e,t){var s=e.indexOf(t);s>-1&&e.splice(s,1)}.bind(null,t,s);setTimeout(i,2500)}},_isEventSimulatedFromTouch:function(e){for(var t=this._primaryTouches,s=e.clientX,i=e.clientY,n=0;n<t.length;n++){var o=t[n],r=Math.abs(s-o.x),u=Math.abs(i-o.y);if(r<=25&&u<=25)return!0}},_cancelBrokenTouches:function(e){var t=e.touches,s=this.getTouchEvents(),i=[];if(s.length>=t.length){for(var n=0;n<s.length;n++){var o=s[n];this._findTouchById(t,o.getIdentifier())||(i.push(o),console.log("Broken touch event id="+o.getIdentifier()))}this._removeEvents(i)}},_findTouchById:function(e,t){for(var s=0;s<e.length;s++)if(e[s].identifier===t)return!0},_ODTPiouPiouEnabled:function(e){return!!this._ODTPiouPiouEvents&&(this._ODTPiouPiouEvents==e||this._ODTPiouPiouEvents instanceof Array&&this._ODTPiouPiouEvents.indexOf(e)>=0)},_simulateTouchEvent:function(e,t){var s={type:"touch"+e,touches:[],changedTouches:[]};if(s.pageX=t.pageX,s.pageY=t.pageY,s.offsetX=t.offsetX,s.offsetY=t.offsetY,s.target=t.target,s.currentTarget=t.currentTarget,0===t.button&&("mousedown"===t.type?this._leftButtonPressed=!0:"mouseup"===t.type&&(this._leftButtonPressed=!1)),"mousedown"===t.type&&0===t.button){var i={clientX:t.clientX,clientY:t.clientY,identifier:1,target:t.target};this.fingers=[],this.fingers.push(i),s.touches.push(i),s.changedTouches.push(i)}if("mouseup"===t.type&&0===t.button){for(var n=0;n<this.fingers.length;n++)s.changedTouches.push(this.fingers[n]);this.fingers=[]}if("keydown"===t.type&&this._shiftKeyPressed&&1===this.fingers.length){s.touches.push(this.fingers[0]);i={clientX:this.fingers[0].clientX+this.fingerDst.x,clientY:this.fingers[0].clientY+this.fingerDst.y,identifier:2,target:this.fingers[0].target};this.fingers.push(i),s.touches.push(i),s.changedTouches.push(i)}else{if("keydown"===t.type)return;"keyup"!==t.type||this._shiftKeyPressed||2!==this.fingers.length||(s.changedTouches.push(this.fingers[1]),this.fingers.pop())}if("move"===e&&this._leftButtonPressed){i={clientX:t.clientX,clientY:t.clientY,identifier:1,target:this.fingers[0].target};if(this._staticKeyPressed)this.fingers[1]&&this.fingerDst.set(this.fingers[1].clientX-i.clientX,this.fingers[1].clientY-i.clientY),this.fingers[0]=i;else{this.fingers[0]=i;for(n=1;n<this.fingers.length;n++)this.fingers[n].clientX=i.clientX+this.fingerDst.x,this.fingers[n].clientY=i.clientY+this.fingerDst.y}for(n=0;n<this.fingers.length;n++)s.touches.push(this.fingers[n]),s.changedTouches.push(this.fingers[n])}var o=this.fingers.length,r=this.fingerDivs.length;for(n=0;n<Math.max(r,o);n++){var u=this.fingers[n],h=this.fingerDivs[n];if(n<o){if(h)h.style.display="block";else{(h=document.createElement("div")).setAttribute("style","position:absolute; z-index:9999; left:0; top:0; width:14px; height:14px; border:solid 2px #777;background:rgba(255,255,255,.7); border-radius:20px; pointer-events:none;margin-top:-9px; margin-left:-9px;"),document.body.appendChild(h),this.fingerDivs[n]=h}h.style.left=u.clientX+"px",h.style.top=u.clientY+"px"}else h.style.display="none"}if(s.touches.length||s.changedTouches.length){var a="_touch";a+=e.charAt(0).toUpperCase(),this[a+=e.substr(1)](s)}},disconnectFrom:function(e){for(var t=this._gestureRecognizers.length-1;t>=0;--t){var s=this._gestureRecognizers[t];s&&s.removeView(e)}},_registerRecordView:function(e){if(e){var t=e._viewRecordId;void 0===t&&(t=e.nodeName+this._maxViewIndex++,e._viewRecordId=t,this._recordViewTable[t]=e)}},_getViewFromRecordId:function(e){return this._recordViewTable[e]},_record_registerObject:function(e,t,s){var i=e._recordRegisterName;return i||(i=t+"_"+(e.uniqueName||e.id),e._recordRegisterName=i,console.log("_record_registerObject: '"+i+"'"),this._registeredObjects.push({name:i,object:e,elements:s||[]})),"WebGLV6Viewer"===t&&(console.log("this._viewerList.push(viewer#"+e.id+");"),this._viewerList.push(e)),i}});if(Z.EVENTS_MAP={touchstart:"pointerdown",mousedown:"pointerdown",touchend:"pointerup",mouseup:"pointerup",touchmove:"pointermove",mousemove:"pointermove"},Z.GESTURES_MAP={onLeftClick:{gestureName:u,params:[i.MouseButton.LEFT]},onMiddleClick:{gestureName:u,params:[i.MouseButton.MIDDLE]},onRightClick:{gestureName:u,params:[i.MouseButton.RIGHT]},onHold:{gestureName:h,params:[]},onHoldLeftMouseDown:{gestureName:a,params:[i.MouseButton.LEFT]},onHoldMiddleMouseDown:{gestureName:a,params:[i.MouseButton.MIDDLE]},onHoldRightMouseDown:{gestureName:a,params:[i.MouseButton.RIGHT]},onEdit:{gestureName:v,params:[]},onLongEdit:{gestureName:l,params:[]},onSmartEdit:{gestureName:_,params:[]},onKeyDown:{gestureName:g,params:[]},onKeyUp:{gestureName:d,params:[]},onLongHold:{gestureName:c,params:[]},onLeftMouseClickDown:{gestureName:x,params:[i.MouseButton.LEFT],require:"onLeftClick"},onLeftMouseDown:{gestureName:p,params:[i.MouseButton.LEFT]},onMiddleMouseDown:{gestureName:p,params:[i.MouseButton.MIDDLE]},onRightMouseDown:{gestureName:p,params:[i.MouseButton.RIGHT]},onMouseMove:{gestureName:f,params:[]},onMouseOut:{gestureName:E,params:[]},onLeftMouseUp:{gestureName:m,params:[i.MouseButton.LEFT]},onMiddleMouseUp:{gestureName:m,params:[i.MouseButton.MIDDLE]},onRightMouseUp:{gestureName:m,params:[i.MouseButton.RIGHT]},onMouseWheel:{gestureName:P,params:[]},onPan:{gestureName:M,params:[]},onPinch:{gestureName:S,params:[]},onPinchPanRotate:{gestureName:G,params:[]},onSpread:{gestureName:V,params:[]},onPinchTap:{gestureName:N,params:[]},onRelease:{gestureName:T,params:[]},onRotate:{gestureName:w,params:[]},onSwipe:{gestureName:b,params:[]},onDrag:{gestureName:R,params:[]},onTouchDrag:{gestureName:R,params:[i.DragGesture.TOUCH]},onTap:{gestureName:y,params:[]},onTouch:{gestureName:D,params:[]},onPrimaryPointerDownUnique:{gestureName:L,params:[]},onPrimaryPointerMoveUnique:{gestureName:O,params:[]},onPrimaryPointerUpUnique:{gestureName:B,params:[]},onPrimaryPointerClick:{gestureName:k,params:[]},onPrimaryPointerDoubleClick:{gestureName:C,params:[],require:"onPrimaryPointerClick"},onLeftDoubleClick:{gestureName:I,params:[i.MouseButton.LEFT],require:"onLeftClick"},onMiddleDoubleClick:{gestureName:I,params:[i.MouseButton.MIDDLE],require:"onMiddleClick"},onRightDoubleClick:{gestureName:I,params:[i.MouseButton.RIGHT],require:"onRightClick"},onDoublePinchTap:{gestureName:H,params:[],require:"onPinchTap"},onDoubleTap:{gestureName:U,params:[],require:"onTap"},onMediumHold:{gestureName:Y,params:[]},onFlick:{gestureName:W,params:[]},onHoldTap:{gestureName:z,params:[]},onHoldDrag:{gestureName:A,params:[]},onTwoFingerTap:{gestureName:F,params:[]},onHoldStay:{gestureName:q,params:[]},onMediumHoldStay:{gestureName:J,params:[]},onLongHoldStay:{gestureName:j,params:[]}},window.DSWebRecord){if(Z._registeredObjects=[],Z._viewerList=[],K.TraceManager.setLevel(5),window.DSWebRecord.env.ADL_ODT_ViewerWait){var $=K.WaitManager.addWaitCondition(1e6,"Waiting for start");window.goRoger=function(){K.WaitManager.removeWaitCondition($)}}var ee=document.createElement("div");ee.myName="customDiv",ee.style.position="absolute",ee.style.left="-100px",ee.style.top="-100px",ee.style.width="1px",ee.style.height="1px",ee.setAttribute("data-rec-id","WebGLV6ViewerEventsManager"),document.body.appendChild(ee),K.registerComparator("DS/WebVisuRecord/SceneGraphDumpWebVisuComparator"),K.private_WebVisuRecordTarget=ee,K.registerElement(ee,"DS/WebVisuRecord/WebGLV6ViewerRec",!0,function(){Z._recordReplayReady=!0,console.log("Adapter.registerElement CB!!")}),setTimeout(function(){Z._recordReplayReady=!0},2e3)}return UWA.namespace("THREEDS/VisuEventsManager",Z)}),define("VisuEvents/EventsManager",["DS/VisuEvents/EventsManager","DS/DSMigration/DSMigration"],function(e,t){return t.deprecateModule("VisuEvents/EventsManager"),e});