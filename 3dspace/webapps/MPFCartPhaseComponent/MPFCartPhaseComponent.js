define("DS/MPFCartPhaseComponent/CartPhaseTotalFooter",["UWA/Core","UWA/Class/View","DS/MPFCartModel/CartModelHelper","DS/MPFCartPhaseModel/CartPhaseModel","i18n!DS/MPFCartPhaseComponent/assets/nls/CartPhaseComponent"],function(e,t,s,a,r){"use strict";return t.extend({className:"mpf-cart-phase-total-footer",setup:function(e){this.cart=e.cart,this.cartPhases=e.cartPhases,this.listenTo(this.cartPhases,"onChange:"+a.Fields.PRICE,this.render.bind(this)),this.listenTo(this.cartPhases,"onRemove",this.render.bind(this))},render:function(){return this.container.setContent([{tag:"div",class:"mpf-label",text:r.get("total")},{tag:"div",class:"mpf-message",text:r.get("paymentAreDueAtBeginningOfPhase")},{tag:"div",class:"mpf-total",text:this._calcPrice()}]),this},_calcPrice:function(){const t=this.cartPhases.reduce(function(e,t){const s=parseFloat(t.getPrice());return isNaN(s)?e:e+s},0);return e.is(t,"number")?s.formatPrice(this.cart,t):"-"},destroy:function(){this.stopListening(this.cartPhases),this.cart=null,this.cartPhases=null,this._parent(),this.container=null}})}),define("DS/MPFCartPhaseComponent/CartPhaseHelper",["UWA/Class","UWA/Promise","DS/MPFServices/MarketplaceServices","DS/MPFServices/ObjectService","DS/MPFCartModel/CartPatchArray","DS/MPFCartModel/CartPatchOperation","DS/MPFCartPhaseModel/CartPhaseFactory","DS/MPFCartModel/CartModel","DS/MPFCartPhaseModel/CartPhaseModel","DS/MPFCartPhaseModel/CartPhaseCollection"],function(e,t,s,a,r,i,n,h,o,c){"use strict";const l=e.extend({init:function(e){a.requiredOfPrototype(e.cartPhaseFactory,n,"option.cartPhaseFactory must be a CartPhaseFactory"),a.requiredOfPrototype(e.cart,h,"option.cart must be a CartModel"),a.requiredOfPrototype(e.cartPhases,c,"options.cartPhases must be a CartPhaseCollection"),this.cartPhaseFactory=e.cartPhaseFactory,this.cart=e.cart,this.cartPhases=e.cartPhases,this.service=e.service,this.phasesToDelete=[]},addPhase:function(){const e=this.cartPhaseFactory.createModel(n.Types.CART_CART_PHASE,null,{parentResourceId:this.cart.get("id")});if(e.setNumber(this.cartPhases.size()+1),e.setState(o.States.SUBMITTED),this.service===s.INNOVATE){const t=this.cart.getItems().find(e=>e.isRequestItemForService(this.service)),s=t&&t.getOfferId();e.setOfferId(s)}return this.cartPhases.add(e),e},deletePhase:function(e){e.isNew()||this.phasesToDelete.push(e),this.cartPhases.remove(e),this.cartPhases.forEach(function(e,t){e.isEditable()&&e.setNumber(t+1)})},getCartPatchArray:function(e={}){const t=new r;this.phasesToDelete.forEach(function(e){t.add(new i(i.Operations.REMOVE,"/phases/"+e.get("id")))});const a=this.cart.getItems().find(e=>e.isRequestItemForService(this.service)),n=a&&a.getOfferId(),h=this.service===s.INNOVATE&&!this.cart.isInnovateBusinessExperienceOrder(this.service);return this.cartPhases.forEach(e=>{if(e.hasPendingChanges()||e.isNew()){const s=e.isNew()?i.Operations.ADD:i.Operations.MODIFY,a=e.isNew()?"/phases":"/phases/"+e.get("id"),r=e.isNew()?e.omit():e.getPendingChanges();h&&n&&(r[o.Fields.OFFER_ID]=n),t.add(new i(s,a,r))}}),e.addEmptyMessage&&t.add(new i(i.Operations.add,"/message",{author:"/mdshop/shops/"+this.cart.getShopID(),message:""})),t},save:function(e){const s=this.getCartPatchArray(e);return s.length()>0?this.cart.megaPatch(s).then(this.reset.bind(this)):t.resolve()},reset:function(e){return(e=e||{}).cartPhases&&(this.cartPhases=e.cartPhases),this.phasesToDelete=[],this}});return l.getModifyPhaseOperation=function(e,t){return new i(i.Operations.MODIFY,"/phases/"+e.get("id"),t)},l.getPhaseStateUpdateOperation=function(e,t){return l.getModifyPhaseOperation(e,{[o.Fields.STATE]:t})},l}),define("DS/MPFCartPhaseComponent/TimelineArrow",["UWA/Class/View","css!DS/MPFCartPhaseComponent/MPFCartPhaseComponent"],function(e){"use strict";return e.extend({className:"mpf-arrow",setup:function(e){this.label=e.label,this.isChevron=!0===e.isChevron,this.forceHorizontal=!0===e.forceHorizontal,this.isChevron&&this.container.addClassName("mpf-double-arrow"),this.forceHorizontal&&this.container.addClassName("force-horizontal")},render:function(){return this.container.setContent([{tag:"div",class:"mpf-text",text:this.label}]),this},destroy:function(){this._parent(),this.container=null}})}),define("DS/MPFCartPhaseComponent/CartPhaseItemSummary",["UWA/Core","UWA/Class/View","DS/MPFCartModel/CartModelHelper","DS/MPFCartPhaseComponent/TimelineArrow","i18n!DS/MPFCartPhaseComponent/assets/nls/CartPhaseComponent","css!DS/MPFCartPhaseComponent/MPFCartPhaseComponent"],function(e,t,s,a,r){"use strict";return t.extend({className:"mpf-cart-phase-item-summary",setup:function(e){this.cart=e.cart,this.cartPhase=e.cartPhase},render:function(){return this.container.setContent([this._createLine1(),this._createLine2()]),this},destroy:function(){this.cart=null,this.cartPhase=null,this._parent(),this.container=null},_createLine1:function(){return e.createElement("div",{class:"mpf-line-1",html:[this._createPhaseLabel(),this._createDescription(),this._createPrice()]})},_createPhaseLabel:function(){return e.createElement("div",{class:"mpf-label",html:[{tag:"div",text:r.get("phaseNumber",{number:this.cartPhase.getNumber()})},{tag:"div",class:"mpf-state",text:this.cartPhase.getDisplayedState()}]})},_createDescription:function(){return e.createElement("div",{class:"mpf-description",text:this.cartPhase.getDescription()})},_createPrice:function(){const t=s.formatPrice(this.cart,parseFloat(this.cartPhase.getTotalNetAmount()));return e.createElement("div",{class:"mpf-price",text:t})},_createLine2:function(){return e.createElement("div",{class:"mpf-line-2",html:[this._createTimelineLabel(),{tag:"div",class:"mpf-arrows",html:[this._createStartDate(),this._createDeliveryDate()]}]})},_createTimelineLabel:function(){return e.createElement("div",{class:"mpf-label",text:r.get("timeline")})},_createStartDate:function(){return new a({label:r.get("startDate",{date:this.cartPhase.getStartDate()})}).render()},_createDeliveryDate:function(){return new a({label:r.get("deliveryDate",{date:this.cartPhase.getEndDate()}),isChevron:!0}).render()}})}),define("DS/MPFCartPhaseComponent/CartPhaseItemCreator",["UWA/Core","UWA/Class/View","DS/MPFView/FieldTextInputV2","DS/MPFView/FieldDateInput","DS/MPFView/FieldPriceInput","DS/MPFCartPhaseModel/CartPhaseModel","DS/MPFCartModel/CartModelHelper","DS/MPFCartPhaseComponent/TimelineArrow","i18n!DS/MPFCartPhaseComponent/assets/nls/CartPhaseComponent","css!DS/MPFUI/MPFUI"],function(e,t,s,a,r,i,n,h,o){"use strict";const c=Object.freeze({DELETE:"delete"}),l=t.extend({className:"mpf-cart-phase-item",setup:function(e){this.cart=e.cart,this.cartPhase=e.cartPhase,this.minDate=e.minDate,this.maxDate=e.maxDate,this.line1=this._createLine1(),this.line2=this._createLine2(),this.deleteIcon=this._createDeleteIcon()},getPhase:function(){return this.cartPhase},render:function(){return this.container.setContent([this.line1,this.line2]),this.cartPhase.isEditable()&&this.deleteIcon.inject(this.container),this},showErrors:function(e,t){e.getErrors().forEach(function(e,s){let a;switch(e.field){case i.Fields.DESCRIPTION:a=this.descriptionField,this.descriptionField.validate();break;case i.Fields.UNIT_NET_AMOUNT:a=this.priceField,this.priceField.showError(e.message);break;case i.Fields.START_DATE:a=this.startDateField,this.startDateField.showValidationErrors({isValid:!1,errors:[e]});break;case i.Fields.END_DATE:a=this.endDateField,this.endDateField.showValidationErrors({isValid:!1,errors:[e]})}t&&0===s&&a.focus&&a.focus()},this)},destroy:function(){this.stopListening(),this.descriptionField.destroy(),this.priceField.destroy(),this.startDateField.destroy(),this.endDateField.destroy(),this._parent()},updateMinAndMaxDates:function(e){if(this.minDate=e.minDate,this.maxDate=e.maxDate,this.startDateField&&this.endDateField){const e=this.startDateField.getDate(),t=this.endDateField.getDate(),s=this._calculateMinAndMaxDates(e,t);this.startDateField.setMinDate(s.startDateMin||!1),this.startDateField.setMaxDate(s.startDateMax||!1),this.endDateField.setMinDate(s.endDateMin||!1),this.endDateField.setMaxDate(s.endDateMax||!1)}},_calculateMinAndMaxDates:function(e,t){const s={};return s.startDateMin=this.minDate,s.endDateMax=this.maxDate,s.startDateMax=!t||this.maxDate&&t>this.maxDate?this.maxDate:t,s.endDateMin=!e||this.minDate&&e<this.minDate?this.minDate:e,s},_createLine1:function(){return e.createElement("div",{class:"mpf-line-1",html:[this._createTitle(),this._createDescription(),this._createPrice()]})},_createTitle:function(){return e.createElement("div",{class:"mpf-phase-title",html:[{tag:"div",text:o.get("phaseNumber",{number:this.cartPhase.getNumber()})},{tag:"div",class:"mpf-state",text:this.cartPhase.getDisplayedState()}]})},_createDescription:function(){return this.descriptionField=new s({className:"mpf-description mpf-entry-v2",model:this.cartPhase,fieldName:i.Fields.DESCRIPTION,fieldLabel:o.get("description"),dynamicValidation:!0,readOnly:!this.cartPhase.isEditable()}),this.descriptionField.render()},_createPrice:function(){return this.priceField=new r({model:this.cartPhase,fieldName:i.Fields.PRICE,fieldLabel:o.get("price"),readOnly:!this.cartPhase.isEditable(),min:.5,max:999999.99,numberDecimals:2,currency:this.cart.getCurrency()}),this.priceField.render()},_createLine2:function(){let t;return this.cartPhase.isEditable()&&(t=this._calculateMinAndMaxDates(this.cartPhase.getStartDate()&&new Date(this.cartPhase.getStartDate()),this.cartPhase.getEndDate()&&new Date(this.cartPhase.getEndDate()))),e.createElement("div",{class:"mpf-line-2",html:[{tag:"div",class:"mpf-label-placeholder"},this._createStartSection(t),this._createDeliverySection(t),{tag:"div",class:"mpf-timeline-label",text:o.get("timeline")}]})},_createStartSection:function(t){this.startDateField=new a({model:this.cartPhase,fieldName:i.Fields.START_DATE,readOnly:!this.cartPhase.isEditable(),min:t&&t.startDateMin,max:t&&t.startDateMax,renderDatePickerInside:!0,additionalClassName:"mpf-start-date"});const s=new h({label:o.get("start"),forceHorizontal:!0});return e.createElement("div",{class:"mpf-date-section mpf-start-section",html:[s.render(),this.startDateField.render()]})},_createDeliverySection:function(t){this.endDateField=new a({model:this.cartPhase,fieldName:i.Fields.END_DATE,readOnly:!this.cartPhase.isEditable(),min:t&&t.endDateMin,max:t&&t.endDateMax,renderDatePickerInside:!0,additionalClassName:"mpf-end-date"});const s=new h({label:o.get("delivery"),forceHorizontal:!0,isChevron:!0});return e.createElement("div",{class:"mpf-date-section mpf-delivery-section",html:[s.render(),this.endDateField.render()]})},_createDeleteIcon:function(){return e.createElement("div",{class:"fonticon fonticon-trash mpf-delete-phase-icon",events:{click:this.dispatchEvent.bind(this,c.DELETE,this.cartPhase)}})}});return l.Events=c,l}),define("DS/MPFCartPhaseComponent/CartPhaseItemCreatorList",["UWA/Core","UWA/Class/View","DS/MPFServices/MarketplaceServices","DS/MPFCartModel/CartModel","DS/MPFCartPhaseModel/CartPhaseModel","DS/MPFCartPhaseModel/CartPhaseCollection","DS/MPFOfferModel/OfferCollection","DS/MPFCartPhaseComponent/CartPhaseItemCreator","DS/MPFInnovateComponent/cartPhases/InnovatePhaseItemCreator","DS/MPFServices/ObjectService","DS/MPFUtils/MPFUtils","i18n!DS/MPFCartPhaseComponent/assets/nls/CartPhaseComponent"],function(e,t,s,a,r,i,n,h,o,c,l,d){"use strict";return t.extend({className:"mpf-cart-phase-list",setup:function(e={}){c.requiredOfPrototype(e.cart,a,"option.cart must be a CartModel"),c.requiredOfPrototype(e.cartPhases,i,"options.cartPhases must be a CartPhaseCollection"),this.cart=e.cart,this.cartPhases=e.cartPhases,this.service=e.service,this.cartPhaseHelper=e.cartPhaseHelper,this.service=e.service,this.companyFactory=e.companyFactory,this.service===s.INNOVATE&&this.cart.isInnovateBusinessExperienceOrder(this.service)&&!this.cart.isSelfOrder()&&(c.requiredOfPrototype(e.offers,n,"options.offers must be a OfferCollection"),this.offers=e.offers,this.portfolioFactory=e.portfolioFactory,this.companyFactory=e.companyFactory),this.listenTo(this.cartPhases,"onChange:"+r.Fields.START_DATE,this._updateMinAndMaxDates.bind(this)),this.listenTo(this.cartPhases,"onChange:"+r.Fields.END_DATE,this._updateMinAndMaxDates.bind(this))},render:function(){let t;return this.cartPhaseItems=this._createCartPhaseItems(),t=this.cartPhaseItems.length>0?this.cartPhaseItems.map(function(e){return e.render()}):e.createElement("span",{text:d.get("noPhaseDefined"),class:"mpf-no-phase-message"}),this.container.setContent(t),this},addPhase:function(){this.cartPhaseHelper.addPhase(),this.render()},showErrors:function(e){this.cartPhasesValidationResults=e,this.render();const t=this._getPhaseNumberOfFirstError();this.cartPhaseItems.forEach((e,s)=>{this._showItemError(e,e.getPhase().getNumber()===t)}),this.cartPhasesValidationResults=null},destroy:function(){if(this.stopListening(),Array.isArray(this.cartPhaseItems))for(let e=0;e<this.cartPhaseItems.length;e++)this.cartPhaseItems[e].destroy();this.cart=null,this.cartPhases=null,this.cartPhaseHelper=null,this._parent()},_createCartPhaseItem:function(e,t,s){const a=new h({cart:this.cart,cartPhase:e,minDate:t,maxDate:s});return this.listenTo(a,h.Events.DELETE,this._deletePhase.bind(this)),a},_createInnovatePhaseItem(e,t,s,a){const r=new o({cart:this.cart,offers:this.offers,cartPhase:e,minDate:t,maxDate:s,showDeleteButton:a,portfolioFactory:this.portfolioFactory,companyFactory:this.companyFactory});return this.listenTo(r,h.Events.DELETE,this._deletePhase.bind(this)),r},_createCartPhaseItems:function(){const e=this._getMinAndMaxDates(),t=this.service===s.INNOVATE&&this.cart.isInnovateBusinessExperienceOrder(this.service)&&!this.cart.isSelfOrder()?this._createInnovatePhaseItem.bind(this):this._createCartPhaseItem.bind(this);return this.cartPhases.map(function(s,a){return t(s,e[a].minDate,e[a].maxDate,0!==a)})},_updateMinAndMaxDates:function(){if(this.cartPhaseItems){const e=this._getMinAndMaxDates();this.cartPhaseItems.forEach(function(t,s){t.updateMinAndMaxDates(e[s])})}},_getMinAndMaxDates:function(){const e=[],t=this.cartPhases.size();if(t>0){for(let t=0;t<this.cartPhases.size();t++)e.push({});let s,a,r=new Date(Date.now()),i=new Date(Date.now());i.setFullYear(i.getFullYear()+100),e[0].minDate=r,e[e.length-1].maxDate=i;for(let n=1;n<t;n++)s=this.cartPhases.at(n-1),a=this.cartPhases.at(t-n),r=this._getMaxDate([s.getEndDate(),s.getStartDate(),r]),i=this._getMinDate([a.getStartDate(),a.getEndDate(),i]),e[n].minDate=r,e[t-1-n].maxDate=i}return e},_getMaxDate:e=>!!((e=e.filter(e=>e)).length>0)&&new Date(Math.max(...e.map(e=>e instanceof Date?e:new Date(e)))),_getMinDate:e=>!!((e=e.filter(e=>e)).length>0)&&new Date(Math.min(...e.map(e=>e instanceof Date?e:new Date(e)))),_showItemError:function(e,t){if(this.cartPhasesValidationResults&&!this.cartPhasesValidationResults.isValid()){const s=l.findInArray(this.cartPhasesValidationResults.getPhaseValidationResults(),function(t){const s=e.getPhase(),a=t.getPhase();return s.id&&a.id?s.id===a.id:s.getNumber()===a.getNumber()});s&&e.showErrors(s,t)}},_getPhaseNumberOfFirstError:function(){const e=this.cartPhasesValidationResults&&!this.cartPhasesValidationResults.isValid();let t;return e&&(t=l.findInArray(this.cartPhasesValidationResults.getPhaseValidationResults(),function(e){return!e.isValid()})),e&&t?t.getPhase().getNumber():-1},_deletePhase:function(e){this.cartPhaseHelper.deletePhase(e),this.render()}})}),define("DS/MPFCartPhaseComponent/CartPhaseItemSummaryList",["UWA/Class/View","DS/MPFServices/MarketplaceServices","DS/MPFCartPhaseComponent/CartPhaseItemSummary","DS/MPFInnovateComponent/cartPhases/InnovatePhaseItemSummary"],function(e,t,s,a){"use strict";return e.extend({className:"mpf-phase-item-summary-list",setup:function(e){this.cart=e.cart,this.cartPhases=e.cartPhases,this.service=e.service||t.ENGINEERING,this.items=[],this.listenTo(this.cartPhases,"onSync",this.render.bind(this))},render:function(){return this._destroyItems(),this.items=this.cartPhases.filter(function(e){return!e.isNew()}).map(function(e){return this.service===t.INNOVATE&&this.cart.isInnovateBusinessExperienceOrder(this.service)?new a({cart:this.cart,cartPhase:e}).render():new s({cart:this.cart,cartPhase:e}).render()},this),this.container.setContent(this.items),this},destroy:function(){this.stopListening(),this._destroyItems(),this.items=[],this.cart=null,this.cartPhases=null,this._parent(),this.container=null},_destroyItems:function(){this.items.forEach(function(e){e.destroy()})}})}),define("DS/MPFCartPhaseComponent/CartPhaseCreator",["UWA/Core","UWA/Class/View","DS/UIKIT/Alert","DS/MPFServices/MarketplaceServices","DS/MPFCartModel/CartModel","DS/MPFCartPhaseModel/CartPhaseModel","DS/MPFCartPhaseModel/CartPhaseCollection","DS/MPFCartPhaseModel/CartPhaseFactory","DS/MPFOfferModel/OfferCollection","DS/MPFServices/ObjectService","DS/MPFCartPhaseComponent/CartPhaseHelper","DS/MPFCartPhaseComponent/CartPhaseItemCreatorList","DS/MPFCartPhaseComponent/CartPhaseTotalFooter","DS/MPFInnovateComponent/cartPhases/InnovatePhaseFooter","DS/MPFCartPhaseModel/CartPhaseValidationResult","i18n!DS/MPFCartPhaseComponent/assets/nls/CartPhaseComponent","css!DS/MPFCartPhaseComponent/MPFCartPhaseComponent"],function(e,t,s,a,r,i,n,h,o,c,l,d,P,m,u,f){"use strict";return t.extend({className:"mpf-cart-phase-creator",setup:function(e={}){c.requiredOfPrototype(e.cart,r,"option.cart must be a CartModel"),c.requiredOfPrototype(e.cartPhases,n,"options.cartPhases must be a CartPhaseCollection"),c.requiredOfPrototype(e.cartPhaseFactory,h,"option.cartPhaseFactory must be a CartPhaseFactory"),this.cart=e.cart,this.cartPhases=e.cartPhases,this.cartPhaseFactory=e.cartPhaseFactory,this.service=e.service,this._isBusinessExperienceOrder()&&(c.requiredOfPrototype(e.offers,o,"options.offers must be a OfferCollection"),this.offers=e.offers,this.portfolioFactory=e.portfolioFactory,this.companyFactory=e.companyFactory),this.cartPhaseHelper=this._createCartPhaseHelper(),this._isBusinessExperienceOrder()&&this.cartPhaseHelper.addPhase(),this.addPhaseCommand=this._createAddPhaseCommand(),this.header=this._createHeader(),this.cartPhaseItemList=this._createCartPhaseItemList(),this.totalFooter=this._createTotalFooter(),this.alert=this._createAlert()},render:function(){return this.container.setContent([this.alert,this.header,this.cartPhaseItemList.render(),this.totalFooter.render()]),this},onAddPhase:function(){this.service===a.INNOVATE&&this.cartPhases.size()>=1?this.showAlert(f.get("errorOnlyOnePhaseSupported")):this.cartPhaseItemList.addPhase()},getCartPatchOperations:function(){if(this.validate().isValid()){const e=this.cartPhases.at(0);return e&&e.isNew()&&e.unset(i.Fields.STATE),this.cartPhaseHelper.getCartPatchArray()}return null},validate:function(){let e;return 0===this.cartPhases.size()?(this.showAlert(f.get("mustContainOnePhase")),(e=new u).addError(void 0,f.get("mustContainOnePhase"))):(e=this.cartPhases.validate()).isValid()||this.showErrors(e),e},showErrors:function(e){this.cartPhaseItemList.showErrors(e)},showAlert:function(e){this.alert.add({className:"error",message:e}).show()},resetAlert:function(){this.alert.getMessages().forEach(function(e){this.alert.remove(e)},this)},destroy:function(){this.cartPhaseItemList.destroy(),this.totalFooter.destroy(),this.cart=null,this.cartPhases=null,this.cartPhaseFactory=null,this._parent(),this.container=null},_createCartPhaseHelper:function(){return new l({cart:this.cart,cartPhases:this.cartPhases,cartPhaseFactory:this.cartPhaseFactory,service:this.service})},_createAddPhaseCommand:function(){return e.createElement("a",{class:"mpf-link-button",text:"+ "+f.get("addPhase"),events:{click:this.onAddPhase.bind(this)}})},_createHeader:function(){const t=e.createElement("div",{class:"mpf-title",text:f.get("scheduleAndPrices")});return e.createElement("header",{class:"mpf-header",html:[t,this.addPhaseCommand]})},_createCartPhaseItemList:function(){return new d({cart:this.cart,cartPhases:this.cartPhases,cartPhaseFactory:this.cartPhaseFactory,cartPhaseHelper:this.cartPhaseHelper,offers:this.offers,service:this.service,portfolioFactory:this.portfolioFactory,companyFactory:this.companyFactory})},_isBusinessExperienceOrder(){return this.service===a.INNOVATE&&this.cart.isInnovateBusinessExperienceOrder(this.service)&&!this.cart.isSelfOrder()},_createTotalFooter:function(){let e;return e=this._isBusinessExperienceOrder()?new m:new P({cart:this.cart,cartPhases:this.cartPhases})},_createAlert:function(){return new s({visible:!1,closable:!0,autoHide:!0,hideDelay:4e3})}})}),define("DS/MPFCartPhaseComponent/CartPhaseCreatorFactory",["DS/MPFServices/MarketplaceServices","DS/MPFConnector/MarketplaceConnector","DS/MPFCartModel/CartModel","DS/MPFModelFactory/MPFFactoriesV2","DS/MPFCartModel/CartFactory","DS/MPFCartPhaseModel/CartPhaseFactory","DS/MPFOfferModel/OfferFactory","DS/MPFCartPhaseComponent/CartPhaseCreator"],function(e,t,s,a,r,i,n,h){"use strict";class o{static async from({cartId:s,service:a=e.ENGINEERING}={}){const r=await t.fetchPromise({service:a});return new o({connector:r,service:a}).fromCartId(s)}constructor({connector:e,service:t}){this.connector=e,this.service=t}async fromCartId(t){const o=a.getInstance(this.connector),[c,l,d]=await o.getFactories([a.Types.CART,a.Types.CART_PHASE,a.Types.OFFER]),P=c.createModel(r.Types.CART,{id:t}),m=l.createCollection(i.Types.CART_CART_PHASE,null,{parentResourceId:t});let u,f,p;return await Promise.all([P.fetchPromise({expand:[s.Expands.CART_ITEMS]}),m.fetchPromise()]),this.service===e.INNOVATE&&P.isInnovateBusinessExperienceOrder(this.service)&&!P.isSelfOrder()&&(u=d.createCollection(n.Types.SHOP_OFFERS,[],{parentResourceId:P.getShopId()}),await u.fetchPromise(),[f,p]=await o.getFactories([a.Types.PORTFOLIO,a.Types.COMPANY])),new h({cart:P,cartPhases:m,cartPhaseFactory:l,offers:u,service:this.service,portfolioFactory:f,companyFactory:p})}}return o}),define("DS/MPFCartPhaseComponent/CartPhaseSummary",["UWA/Core","UWA/Class/View","DS/UIKIT/Mask","DS/UIKIT/Alert","DS/MPFServices/MarketplaceServices","DS/MPFCartModel/CartModel","DS/MPFCartPhaseModel/CartPhaseCollection","DS/MPFCartPhaseModel/CartPhaseFactory","DS/MPFServices/ObjectService","DS/MPFCartPhaseComponent/CartPhaseItemSummaryList","DS/MPFCartPhaseComponent/CartPhaseItemCreatorList","DS/MPFCartPhaseComponent/CartPhaseTotalFooter","DS/MPFInnovateComponent/cartPhases/InnovatePhaseFooter","DS/MPFCartPhaseComponent/CartPhaseHelper","DS/MPFFiniteStateMachine/FiniteStateMachine","i18n!DS/MPFCartPhaseComponent/assets/nls/CartPhaseComponent","css!DS/MPFCartPhaseComponent/MPFCartPhaseComponent"],function(e,t,s,a,r,i,n,h,o,c,l,d,P,m,u,f){"use strict";const p=Object.freeze({READ:"read",EDIT:"edit"}),C=Object.freeze({CHANGES_SAVED:"changesSaved"}),D=t.extend({className:"mpf-cart-phase-summary",setup:function(e={}){o.requiredOfPrototype(e.cart,i,"option.cart must be a CartModel"),o.requiredOfPrototype(e.cartPhases,n,"options.cartPhases must be a CartPhaseCollection"),o.requiredOfPrototype(e.cartPhaseFactory,h,"options.cartPhaseFactory must be a CartPhaseFactory"),this.cart=e.cart,this.cartPhases=e.cartPhases,this.cartPhaseFactory=e.cartPhaseFactory,this.isReadOnly=!0===e.isReadOnly,this.service=e.service||r.ENGINEERING,this.offers=e.offers,this.portfolioFactory=e.portfolioFactory,this.companyFactory=e.companyFactory,this.stateMachine=this._createStateMachine(),this.cartPhaseHelper=this._createCartPhaseHelper(),this.stateMachine.getState()===p.EDIT&&0===this.cartPhases.size()&&this._isBusinessExperienceOrder()&&this.service===r.INNOVATE&&this.cart.isInnovateBusinessExperienceOrder(this.service)&&!this.cart.isSelfOrder()&&this.cartPhaseHelper.addPhase(),this.saveCommand=this._createCommand(f.get("save"),this.onSave.bind(this)),this.editCommand=this._createCommand(f.get("edit"),this.onEdit.bind(this),!0),this.addPhaseCommand=this._createCommand(f.get("addPhase"),this.onAddPhase.bind(this)),this.alert=this._createAlert(),this.editList=this._createEditList(),this.summaryList=this._createSummaryList(),this.footer=this._createFooter()},render:function(){const e=this.stateMachine.getState()===p.EDIT?this.editList:this.summaryList;return this.container.setContent([this.alert,this._createHeader(),e.render(),this.footer.render()]),this._adaptClassNames(),this},toEditMode(){this.stateMachine.changeState(p.EDIT),0===this.cartPhases.size()&&this.cartPhaseHelper.addPhase(),this.cartPhaseHelper.reset(),this.render()},toReadMode(){this.stateMachine.getState()!==p.READ&&this.stateMachine.changeState(p.READ),this.render()},onSave:function(){const e=this.cartPhases.validate();if(e.isValid())return s.mask(this.container),this.cartPhaseHelper.save({addEmptyMessage:!0}).then(this.onEdit.bind(this)).then(()=>{s.unmask(this.container),this.dispatchEvent(C.CHANGES_SAVED)}).catch(e=>{console.error(e),s.unmask(this.container),this.showAlert(f.get("failedToSaveModifications"))});this.editList.showErrors(e)},async onEdit(){s.mask(this.container);try{await this.cartPhases.fetchPromise()}catch(e){this.alert.add({className:"error",message:f.get("failedToLoadPhases")}),console.error(e)}this.stateMachine.getState()===p.EDIT?this.stateMachine.changeState(p.READ):(this.stateMachine.changeState(p.EDIT),0===this.cartPhases.size()&&this.cartPhaseHelper.addPhase(),this.cartPhaseHelper.reset()),s.unmask(this.container),this.render()},onAddPhase:function(){this.service===r.INNOVATE&&this.cartPhases.length>=1?this.showAlert(f.get("errorOnlyOnePhaseSupported")):this.editList.addPhase()},destroy:function(){this.summaryList.destroy(),this.editList&&this.editList.destroy(),this.footer.destroy(),this.cart=null,this.cartPhases=null,this._parent(),this.container=null},showAlert:function(e){this.alert.add({className:"error",message:e}).show()},_adaptClassNames(){this.stateMachine.getState()===p.EDIT?(this.cartPhaseHelper.reset(),this.container.addClassName("mpf-cart-phase-creator"),this.editCommand.setText(f.get("cancel")),this.saveCommand.removeClassName("mpf-hidden"),this.addPhaseCommand.removeClassName("mpf-hidden")):(this.container.removeClassName("mpf-cart-phase-creator"),this.editCommand.setText(f.get("edit")),this.saveCommand.addClassName("mpf-hidden"),this.addPhaseCommand.addClassName("mpf-hidden"))},_createCartPhaseHelper:function(){return new m({cart:this.cart,cartPhases:this.cartPhases,cartPhaseFactory:this.cartPhaseFactory,service:this.service})},_createStateMachine:function(){const e=!this.isReadOnly&&this._isFirstPhaseCreation()?p.EDIT:p.READ;return new u({state:e,states:[p.READ,p.EDIT],transitions:[{from:p.READ,to:p.EDIT},{from:p.EDIT,to:p.READ}]})},_createCommand:(t,s,a=!1)=>e.createElement("a",{class:"mpf-link-button"+(a?"":" mpf-hidden"),text:t,events:{click:s}}),_createHeader:function(){const e={tag:"h3",class:"mpf-title",text:f.get("scheduleAndPrices")};let t;return{tag:"header",class:"mpf-header",html:t=this.isReadOnly||this._isFirstPhaseCreation()&&this.service===r.INNOVATE?[e]:this._isFirstPhaseCreation()?[e,this.addPhaseCommand]:[e,this.saveCommand,this.addPhaseCommand,this.editCommand]}},_createSummaryList:function(){return new c({cart:this.cart,cartPhases:this.cartPhases,service:this.service})},_createEditList:function(){return new l({service:this.service,cart:this.cart,cartPhases:this.cartPhases,cartPhaseFactory:this.cartPhaseFactory,cartPhaseHelper:this.cartPhaseHelper,offers:this.offers,portfolioFactory:this.portfolioFactory,companyFactory:this.companyFactory})},_isFirstPhaseCreation(){return!this.cartPhases.some(e=>!e.isNew())},_isBusinessExperienceOrder(){return this.service===r.INNOVATE&&this.cart.isInnovateBusinessExperienceOrder(this.service)&&!this.cart.isSelfOrder()},_createFooter:function(){let e;return e=this._isBusinessExperienceOrder()?new P:new d({cart:this.cart,cartPhases:this.cartPhases})},_createAlert:function(){return new a({visible:!1,autoHide:!0})}});return D.Events=C,D.States=p,D}),define("DS/MPFCartPhaseComponent/CartPhaseSummaryFactory",["UWA/Core","UWA/Class","UWA/Promise","DS/MPFServices/MarketplaceServices","DS/MPFServices/ObjectService","DS/MPFConnector/Connector","DS/MPFConnector/MarketplaceConnector","DS/MPFModelFactory/MPFFactoriesV2","DS/MPFCartModel/CartFactory","DS/MPFCartPhaseModel/CartPhaseFactory","DS/MPFCartPhaseComponent/CartPhaseSummary"],function(e,t,s,a,r,i,n,h,o,c,l){"use strict";const d=t.extend({init:function(e){r.requiredOfPrototype(e.connector,i,"options.connector must be a Connector"),this.connector=e.connector},fromCartId:function(t,r){r=r||{};const i=h.getInstance(this.connector);let n,d;return s.all([i.getFactory(h.Types.CART),i.getFactory(h.Types.CART_PHASE),i.getFactory(h.Types.COMPANY,{loadConstraints:!1})]).then(function(e){n=e[1],d=e[2];const a=e[0].createModel(o.Types.CART);a.set("id",t);const r=n.createCollection(c.Types.CART_CART_PHASE);return r.setParentResourceId(t),s.all([a.fetchPromise(),r.fetchPromise()])}).then(function(t){let s={cart:t[0],cartPhases:t[1],cartPhaseFactory:n,companyFactory:d,service:r.service||a.ENGINEERING};return s=e.merge(r,s),new l(s)})}});return d.from=function(e){return n.fetchPromise(e).then(function(t){return new d({connector:t}).fromCartId(e.cartId)})},d});