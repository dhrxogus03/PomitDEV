define("DS/WAfrStateCommands/StateEngine",["DS/CoreEvents/ModelEvents","DS/CoreEvents/Events"],function(t,e){"use strict";var n=Object.create(null);return n.createGraph=function(){this.stateGraph=!0,this._modelEvents=new t,this.FINAL_STATE_ID="finalState",this._initialStateId=null,this._transition={},this._states={},this._stateId=null,this._subscribedEvents=[],this._initGraph=function(t){this._getInitialStateId()&&this._changeState(this._getInitialStateId())},this._clearGraph=function(){this._unsubscribeFromAllEvents(this._stateId),this._initialStateId=null,this._transition=null,this._states=null,this._stateId=null,this._subscribedEvents=null},this.createState=function(t){var e=t.toString();if(!this._getStateFromId(e)){var n={stateId:e,_eventsToListen:[],_enterStateAction:null,_exitStateAction:null};this._states[e]=n}return this._states[e]},this.setEnterStateAction=function(t,e){t&&e&&(t._enterStateAction=e)},this.setLeaveStateAction=function(t,e){t&&e&&(t._exitStateAction=e)},this.setExitStateAction=function(t,e){this.setLeaveStateAction(t,e)},this.createInitialState=function(t){return this._initialStateId=t,this.createState(t)},this.getFinalState=function(){return this.createState(this.FINAL_STATE_ID)},this._getInitialStateId=function(){return this._initialStateId},this._getStateFromId=function(t){return this._states[t]},this._getCurrentStateId=function(){return this._stateId},this._SuscribeToStateEvent=function(t){var n,i=this._getStateFromId(t)._eventsToListen,s=null;for(n=0;n<i.length;n++)if(s=i[n]){var a=Object.create(null);if(s.sender){var r=s.sender._modelEvents;void 0===r&&void 0!==s.sender._modelEvent&&(r=s.sender._modelEvent),void 0!==r&&(a.sender=r,a.token=r.subscribe({event:s.eventName},this._searchForTransition({eventName:s.eventName,sender:s.sender})))}else a.sender=void 0,a.token=e.subscribe({event:s.eventName},this._searchForTransition({eventName:s.eventName,sender:void 0}));void 0!==a&&this._subscribedEvents.push(a)}for(s=null,n=0;n<i.length;n++)(s=i[n]).isAgent&&s.sender.activate()},this._unsubscribeFromAllEvents=function(t){if(t&&this._subscribedEvents){for(var n=this._getStateFromId(t)._eventsToListen,i=null,s=0;s<n.length;s++)(i=n[s]).isAgent&&i.sender.deactivate();for(var a=0;a<this._subscribedEvents.length;a++){var r=this._subscribedEvents[a];r&&(this._subscribedEvents[a].sender?this._subscribedEvents[a].sender.unsubscribe(r.token):e.unsubscribe(r.token))}this._subscribedEvents.length=[]}else this._subscribedEvents=[]},this.defaultParameters={iEvent:null,iInitialState:null,iFinalState:null,iCondition:null,iAction:null,iUndo:null,iRedo:null},this.addTransition=function(t){var e;UWA.extend(this.defaultParameters,t),t.iEvent,t.iCondition||(t.iCondition=function(){return!0}),t.iAction||(t.iAction=function(t,e){t()});var n={initState:t.iInitialState,finalState:t.iFinalState,condition:t.iCondition,action:t.iAction,undo:t.iUndo,redo:t.iRedo};"string"==typeof t.iEvent||"object"==typeof t.iEvent&&t.iEvent.constructor===String?(n.triggerEvent=t.iEvent,n.sender=t.iSender):t.iEvent?(n.triggerEvent=t.iEvent._agentId,n.sender=t.iEvent):(n.triggerEvent=null,n.sender=null);var i=t.iInitialState.stateId.toString();this._transition[i]||(this._transition[i]=[]),this._transition[i]&&this._transition[i].push(n),t.iEvent&&(t.iEvent.hasOwnProperty("_agentId")?(e=!1,t.iInitialState._eventsToListen.forEach(function(n){n.sender===t.iEvent&&(e=!0)}),e||t.iInitialState._eventsToListen.push({eventName:t.iEvent._agentId,sender:t.iEvent,isAgent:!0})):t.iSender?(e=!1,t.iInitialState._eventsToListen.forEach(function(n){n.sender===t.iSender&&n.eventName===t.iEvent&&(e=!0)}),e||t.iInitialState._eventsToListen.push({eventName:t.iEvent,sender:t.iSender})):(e=!1,t.iInitialState._eventsToListen.forEach(function(n){n.eventName===t.iEvent&&(e=!0)}),e||t.iInitialState._eventsToListen.push({eventName:t.iEvent,sender:null})))},this._getTransitionsTabForState=function(t){return this._transition[t]},this.notCondition=function(t){var e=this;return function(){return!t.call(e)}},this.andCondition=function(t){var e=this;return function(n){var i=0,s=t.length,a=!0;for(i=0;i<s;i++)a=a&&t[i].call(e,n);return a}},this.orCondition=function(t){var e=this;return function(n){var i=0,s=t.length,a=!1;for(i=0;i<s;i++)a=a||t[i].call(e,n);return a}},this._changeState=function(t,e){if(this.isNewInfraActivated()||this.isRunning()&&!this.isEnding()){var n=this._stateId===t;if(n||(this._stateId&&(this._unsubscribeFromAllEvents(this._stateId),this._getStateFromId(this._stateId)._exitStateAction&&this._getStateFromId(this._stateId)._exitStateAction.call(this)),this.publish({event:"changeState",data:t})),this._stateId=t,t===this.FINAL_STATE_ID)this.done(e);else{if(!n){var i=this._getStateFromId(t);i._enterStateAction&&i._enterStateAction.call(this)}this._evaluateAutomaticTransitions(),this._getCurrentStateId()===t&&(n||this._SuscribeToStateEvent(t))}}},this._evaluateAutomaticTransitions=function(){this._searchForTransition(null)(null)},this._searchForTransition=function(t){var e=this;return function(n){if(e._stateId){var i=e._getTransitionsTabForState(e._stateId);if(i){var s;n instanceof Array?(s=[],n.forEach(function(t){s.push(t)})):s=n;var a=null,r=0,o=i.length;for(r=0;!a&&r<o;r++){var u,d,c=i[r];t?(u=t.eventName,d=t.sender):(u=null,d=null),c.condition&&u===c.triggerEvent&&c.sender===d&&c.condition.call(e,n)&&(a=c)}if(a){var l=function(t){var n=!0;if(t&&t.error&&(n=!1),n){if(a.undo&&a.redo&&e._withUndoRedo){var i={undoObj:e,undoParamsList:[function(t){var n=!0;t&&t.error&&(n=!1),n&&e._changeState(a.initState.stateId)},s],undoTitle:"Undo",actionObj:e,actionFunc:a.action,actionParamsList:[l,s],actionTitle:"Run",redoObj:e,redoTitle:"Redo",redoFunc:a.redo,redoParamsList:[function(t){var n=!0;t&&t.error&&(n=!1),n&&e._changeState(a.finalState.stateId)},s]};t&&(t.undoTitle&&(i.undoTitle=t.undoTitle),t.redoTitle&&(i.redoTitle=t.redoTitle),t.actionTitle&&(i.actionTitle=t.actionTitle),t.undoParamsList&&i.undoParamsList.push(t.undoParamsList),t.redoParamsList&&i.redoParamsList.push(t.redoParamsList)),a.finalState.stateId===e.FINAL_STATE_ID?(i.undoFunc=function(t,n,i){AFRCommandsManager.getCommand(AFRCommandsManager._getCurrent()).end(),e.begin(),a.undo.call(e,t,n,i)},i.step="endCommand"):i.undoFunc=a.undo,e._undoRedoObjectStack.pushAction(i)}a.finalState.stateId===e.FINAL_STATE_ID&&t&&t.cancel?e.done({cancel:t.cancel,undoOnEnd:t.undoOnEnd}):e._changeState(a.finalState.stateId)}else UWA.log("completionHandler: ERROR")};a.action.call(e,l,n)}}else console.error("stateCmd "+e.getId()+" tries to launch a transition but transitionsTab is "+i)}}},this.publish=function(t){this._modelEvents.publish(t)},this.subscribe=function(t,e){return this._modelEvents.subscribe(t,e)},this.subscribeOnce=function(t,e){this._modelEvents.subscribeOnce(t,e)},this.unsubscribe=function(t){this._modelEvents.unsubscribe(t)},this.isWithUndoRedo=function(){return this._withUndoRedo}},n._createGraph=function(){return console.warn("deprecated please use createGraph"),n.createGraph.apply(this)},n});