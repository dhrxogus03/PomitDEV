define("DS/MVAInput/MVAInput",["DS/UIKIT/Input/Text","UWA/Controls/Abstract","UWA/Json","DS/UIKIT/Dropdown","DS/Controls/TooltipModel","DS/WidgetServices/WidgetServices","DS/DataDragAndDrop/DataDragAndDrop","i18n!DS/MVAInput/assets/nls/MVAInput","css!DS/MVAInput/MVAInput.css"],function(t,e,n,i,s,u,a,o){"use strict";return e.extend({listValue:[],internalOption:{min_width:"200",useDropDown:!1,MVAClassName:"",suffixe:""},defaultOptions:{className:"",id:"",uniqueValue:!1,reorder:!0,suffixe:"",type:"object"},init:function(t){var e=this;this._parent(t),this.options.suffixe=this.options.suffixe?this.options.suffixe:"",this.listValue=[],this.container=UWA.createElement("div",{id:this.options.id,class:"form-control form-control-root MVA_input "+this.internalOption.MVAClassName+" "+this.options.className,events:{click:function(){e._focus()},resize:function(){e._resizeInput()}}}),this.elements={},this.elements.container=this.container;var n="listOfValue ";u.isTouchDevice()&&(n+="MVAInput_touchDevice "),this.listOfValue=UWA.createElement("span",{class:n}).inject(this.container),this.textField=UWA.createElement("span",{class:"MVAInput_textArea"}).inject(this.container),this.textInput&&(this.textInput.inject(this.textField),a.droppable(this.textField,{drop:function(t){e._drop(t,null)}})),this.internalOption.useDropDown&&(this.dropDown=new i({className:"mva_dropdown",body:"",target:e.textInput.getContent(),events:{onClick:function(t,n){e._onValidValue()},onShow:function(){var t=this;setTimeout(function(){e._updateDropDown(),""===e._getDisplayInputValue()&&t.hide()})}}})),t&&t.value&&this.addItems(t.value,!1),this._resizeInput()},destroy:function(){this.elements={}},_updateDropDown:function(t){var e=this._getDisplayInputValue();this.dropDown.getBody().empty(),this.dropDown.setBody(e),!0===t&&this._onValidValue(),""===e?this.dropDown.hide():this.dropDown.show()},_getDisplayInputValue:function(){return this.textInput.getValue()},_focus:function(){this.textInput.focus()},_isEqual:function(t,e){return t===e},_checkValue:function(t){var e=null,n=this;return this.options.uniqueValue&&this.getListOfValue().every(function(i){var s=i;return"object"==typeof i&&i.value&&(s=i.value),!n._isEqual(s,t.value)||(e={message:o.get("The item already exists")},!1)}),e},_actionOnValid:function(){},_getItemOfInput:function(){},_formatItem:function(t){return t.displayValue?t.displayValue:t.value},_setError:function(t){this.dispatchEvent("onError",t)},_onValidValue:function(){var t=this._getItemOfInput();this._actionOnValid(),this.dropDown&&this.dropDown.hide(),""!==t&&""!==t.value&&this.addItem(t)},_clear:function(){this.listOfValue.empty(),this.listValue=[]},setValue:function(t){var e=this,n=!1;if(t&&t.length===this.listValue.length){n=!0;var i=!0;if(t.length>0){var s=t[0];"object"==typeof s&&null!==s&&void 0!==t[0].value||(i=!1)}t.every(function(s,u){var a=null;return e.listValue[u]&&(a=e.listValue[u].info),!(null!=a&&(!1===i&&!e._isEqual(t[u],a.value)||!0===i&&!e._isEqual(t[u].value,a.value)))||(n=!1,!1)})}!1===n&&(this._clear(),this.addItems(t))},addItems:function(t,e){var n=this;if(Array.isArray(t)){var i=t.length;t.forEach(function(t){Array.isArray(t)?(i=t.length,t.forEach(function(t){i--,n.addItem(t,null,!(i>0)&&e)})):(i--,n.addItem(t,null,!(i>0)&&e))})}else n.addItem(t,null,e)},addItem:function(t,e,i){if(null!=t){var u=t;"object"==typeof t&&void 0!==t.value||(u={value:t});var o=this._checkValue(u);if(o)this._setError(o);else{u.displayValue=this._formatItem(u)+this.options.suffixe;var l=this,r=this._genenateUniqueId();u.mva_id=r;var p=UWA.createElement("span",{mva_id:u.mva_id,html:[{tag:"div",class:"formatted-label",html:u.displayValue}]}),c=this._getTooltipForItem(u);c&&(p.tooltipInfos=new s({allowUnsafeHTMLShortHelp:!0,shortHelp:c,initialDelay:400,mouseRelativePosition:!0})),UWA.createElement("div",{class:"supp-icon fonticon fonticon-cancel",events:{click:function(t){l._removeValueInList(r),p.remove()}}}).inject(p);var h=n.encode({value:u.value,displayValue:u.displayValue,id:u.mva_id});if(a.draggable(p,{data:h,start:function(){l._dragStart(p,r)},stop:function(){l._dragStop(p)}}),a.droppable(p,{drop:function(t){l._drop(t,r)}}),e){var f=null;e&&(f=this._getElementFromId(e));var d=this.listValue[f].UI;this.listOfValue.insertBefore(p,d),this._setValueInList(p,u,f)}else p.inject(this.listOfValue),this._setValueInList(p,u);this._resizeInput(),!1!==i&&this.dispatchEvent("onChange")}}},_getTooltipForItem:function(t){return null},_resizeInput:function(){var t=this.container.getDimensions(),e=0,n=0,i=this.listValue.length,s=0,u=0;for(s=i-1;s>=0;s--){var a=this.listValue[s].UI,o=a.getOffsets().y;if(s===i-1&&(u=o),o!==u)break;e+=a.getDimensions().outerWidth}n=(n=t.innerWidth-e-20)<this.internalOption.min_width?"100%":100*n/t.innerWidth+"%",this.textField.setStyle("width",n)},_dragStart:function(t,e){this.movingItem=e,t.addClassName("movingAttribute"),console.log("Event:","start")},_dragStop:function(t){var e=this;t.removeClassName("movingAttribute"),console.log("Event:","stop"),setTimeout(function(){e.movingItem=null},0)},_drop:function(t,e){if(t){var i=n.decode(t);i.value&&(this.movingItem&&e?!1!==this.options.reorder&&this._insertElementAfterOrBefore(this.movingItem,e):this.addItem({value:i.value},e))}},_genenateUniqueId:function(){for(var t={info:{mva_id:0}},e=!0,n=this.listValue.length+1,i=0;!0===e&&i<n;){i++,t.info.mva_id++,e=!(u.arrayContains(this.listValue,t,function(t){return t.info.mva_id})<0)}return t.info.mva_id},_insertElementAfterOrBefore:function(t,e){var n=this._getElementFromId(e),i=this._getElementFromId(t),s=null;i>=0&&(s=this.listValue[i]);var u=null;n>=0&&(u=this.listValue[n]),u&&s&&(i<n?(this.listValue.splice(n+1,0,s),this.listValue.splice(i,1),this.listValue.length===n?s.UI.inject(this.listOfValue):this.listOfValue.insertBefore(s.UI,u.UI.nextSibling)):(this.listValue.splice(i,1),this.listValue.splice(n,0,s),this.listOfValue.insertBefore(s.UI,u.UI))),this._resizeInput(),this.dispatchEvent("onChange")},_getElementFromId:function(t){var e=null;return this.listValue.every(function(n,i){return n.info.mva_id!==t||(e=i,!1)}),e},_setValueInList:function(t,e,n){n?this.listValue.splice(n,0,{UI:t,info:e}):this.listValue.push({UI:t,info:e})},_removeValueInList:function(t){var e=this._getElementFromId(t);this.listValue.splice(e,1),this._resizeInput(),this.dispatchEvent("onChange")},getItems:function(){return this.listValue},getValue:function(){return this.getListOfValue()},getListOfValue:function(){var t=this,e=[];return this.listValue.forEach(function(n){n.info;"table"===t.options.type?e.push(n.info.value):e.push(n.info)}),e}})}),define("DS/MVAInput/searchPeopleInput/MVASearchPeopleInput",["DS/SearchWidget/SearchWidget","DS/SearchWidget/SearchWidgetConstant","DS/MVAInput/MVAInput","i18n!DS/MVAInput/assets/nls/MVAInput"],function(t,e,n){"use strict";return n.extend({internalOption:{useDropDown:!1,MVAClassName:"MVA_searchPeopleMaster"},init:function(n){var i=this,s=e.TYPE_FULL;this.textInput=t.getSearchWidget(t.FULL,{className:"searchPeople_mva",MaxNumber:"5",MaxSize:"300",showEmptyCategory:!1,type:s,events:{onValid:function(){i._onValidValue(),this.clearTextArea()},onError:function(t){i._setError(t)}}}),this._parent(n)},_isEqual:function(t,e){return this._parent(t,e)||JSON.stringify(t)===JSON.stringify(e)},_focus:function(){},_actionOnValid:function(){},_formatItem:function(t){return t.displayValue?t.displayValue:t.value},_getValueOfInput:function(){var t=this.textInput.getNewOwner();return t.displayedValue=this.textInput.getDisplayedResult(),t},_getItemOfInput:function(){var t=this._getValueOfInput();return{value:t.person.personID,displayValue:t.displayedValue,content:t}}})}),define("DS/MVAInput/selectInput/MVASelectInput",["DS/UIKIT/Input/Select","DS/MVAInput/MVAInput","DS/WidgetServices/WidgetServices","i18n!DS/MVAInput/assets/nls/MVAInput"],function(t,e,n,i){"use strict";return e.extend({internalOption:{useDropDown:!1},defaultOptions:{options:[]},init:function(e){var s=this;e.options||(e.options=[]);var u=!1;n.isReplayedODT()&&(u=!0),this.textInput=new t({custom:u,className:"MVAInput_select",placeholder:i.get("MVA_input_Placeholder"),options:e.options,events:{onChange:function(){s._onValidValue()}}}),this._parent(e)},_actionOnValid:function(){},_getValueOfInput:function(){var t="",e=this.textInput.getValue();return e.length>0&&(t=e[0]),t},_getItemOfInput:function(){var t=this._getValueOfInput(),e=this.textInput.getOption(t).textContent;return""===t?t:{value:t,displayValue:e}}})}),define("DS/MVAInput/textInput/MVATextInput",["DS/UIKIT/Input/Text","DS/MVAInput/MVAInput","i18n!DS/MVAInput/assets/nls/MVAInput"],function(t,e,n){"use strict";return e.extend({internalOption:{useDropDown:!0},init:function(e){var i=this;this.textInput=new t({className:"MVAInput_input",placeholder:n.get("MVA_input_Placeholder"),events:{onKeyDown:function(t){setTimeout(function(){var e=!1;13===t.keyCode&&(e=!0),i._updateDropDown(e)},0)}}}),this._parent(e)},_isEqual:function(t,e){return this._parent(t,e)||parseFloat(t)===parseFloat(e)},_actionOnValid:function(){this.textInput.setValue("")},_getValueOfInput:function(){return this.textInput.getValue()},_getItemOfInput:function(){var t=this._getValueOfInput();return{value:t,displayValue:t}}})}),define("DS/MVAInput/dateInput/MVADateInput",["DS/UIKIT/Input/Date","DS/MVAInput/MVAInput","i18n!DS/MVAInput/assets/nls/MVAInput"],function(t,e,n){"use strict";return e.extend({internalOption:{useDropDown:!1},defaultOptions:{options:[]},init:function(e){var i=this;e.options||(e.options=[]),this.textInput=new t({className:"MVAInput_input",placeholder:n.get("MVA_input_Placeholder"),events:{onChange:function(){i._onValidValue()}}}),this.hiddenTextInput=new t({className:"MVAInput_hidden_input hidden"}),this._parent(e)},_actionOnValid:function(){this.textInput.setValue("")},_formatItem:function(t){return this.hiddenTextInput.setDate(t.value),this.hiddenTextInput.getValue()},_getValueOfInput:function(){return this.textInput.getDate()},_getItemOfInput:function(){return{value:this._getValueOfInput()}},_isEqual:function(t,e){return this._parent(t,e)||t.toDateString()===e.toDateString()}})}),define("DS/MVAInput/MVAInputDispatcher",["DS/MVAInput/dateInput/MVADateInput","DS/MVAInput/searchPeopleInput/MVASearchPeopleInput","DS/MVAInput/selectInput/MVASelectInput","DS/MVAInput/textInput/MVATextInput"],function(t,e,n,i){"use strict";return{generateMVAInput:function(s,u){var a=null;switch(s){case"timestamp":a=t;break;case"person":a=e;break;case"enum":a=n;break;default:a=i}return new a(u)}}});