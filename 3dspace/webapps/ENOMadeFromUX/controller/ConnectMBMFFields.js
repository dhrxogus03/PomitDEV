define("DS/ENOMadeFromUX/controller/ConnectMBMFFields",["UWA/Core","UWA/Controls/Abstract","DS/XSRCommonComponents/createform/view/NewDialog","DS/XSRCommonComponents/createform/view/NewForm","DS/XSRCommonComponents/utils/Notification","DS/XSRCommonComponents/utils/XSRMask","DS/ENOMadeFromUX/service/MBMFServiceProvider","DS/XSRCommonComponents/utils/Constants","DS/XSRCommonComponents/utils/RequestUtil","DS/XSRCommonComponents/utils/Utils","text!DS/ENOMadeFromUX/assets/MBMFConfig/ConnectMBMF_Fields.json","i18n!DS/ENOMadeFromUX/assets/nls/MadeFromUX"],function(e,i,t,n,o,s,l,a,M,d,F,r){"use strict";return i.extend({newForm:null,templateList:null,formFields:null,target:null,options:null,dialog:null,init:function(e,i){this._parent(e),this.options=e,this.MBMFService=new l,this.injectUOMTypes(this.options.toBeAddedMBMFId),this.basicModelEvents=e.appCore.basicModelEvents,this.target=e.appCore.specContainer,this.createCloseAction=e.createCloseAction,this.createAction=e.createAction,this.CSRFToken=M.get3DSpaceCSRFToken(),this.tenantID=M.getPlatformId(),this.parentId=e.parentId,this.dialogContainer=e.container,this.appCore=e.appCore,this.UOMTypeValue=null,i&&(this.extApp_SC=i)},injectUOMTypes:function(e){var i=this;i.MBMFService.getUOMTypes(e).then(function(e){if(e&&200===e.statusCode){var t=e.result.applicableUOMTypes;i.allUOMTypeUnitList=t,t&&t[0].dimension&&(i.UOMTypeValue=t[0].dimension.dbName,i.UOMTypeNLS=t[0].dimension.nlsLabel),i._updateMBMFInfoForConnect(i.options.parentOfMBMFItem),i.fetchUOMUnit()}}).catch(function(e){e&&e.result&&!e.success&&o.displayNotification({eventID:"error",msg:e.result.message})})},fetchUOMUnit:function(){if(this.allUOMTypeUnitList&&this.allUOMTypeUnitList.length>0){for(var e=this.allUOMTypeUnitList[0].units,i=[],t=[],n=new Map,o=0;o<e.length;o++)n.set(e[o].dbName,e[o].nlsLabel),i.push({labelItem:e[o].nlsLabel,valueItem:e[o].dbName}),t.push(e[o].dbName);this.MBMFForm.updateField(i,"uomUnit",!1),this.UOMUnitsDBNLSMap=n,this.UOMUnitsOnCombobox=t,this.MBMFFormFields.uomUnit.inputfield.fieldoptions.disabled=!1,this.MBMFFormFields.uomUnit.inputfield.elementsList=t}},_fetchMBMFInfo:function(e){this.createCloseAction&&this.createCloseAction(e,this.UOMUnitsDBNLSMap)},_updateMBMFInfoForConnect:function(e){var i=this,l=i.options.toBeAddedMBMFTitle,M=JSON.parse(F);M.formName=a.MBMF_FORM,this.MBMFForm=new n(M).render(i.UOMTypeValue),this.MBMFFormFields=this.MBMFForm.formfieldControls;var m={position:{at:"center",my:"center"}};m.Title=l+" | "+r.makeFromItem+" | UOM",m.Content=i.MBMFForm.container,m.width=400,m.renderTo=i.dialogContainer?i.dialogContainer:i.target,m.RemoveApplyButton=!0,m.OKLabel=r.label_Button_Add,this.MBMFDialog=new t(m),this.MBMFDialog.render(),this.appCore.MBMFDialog=this.MBMFDialog,this.MBMFForm.listenTo(this.MBMFForm,"CONTAINS_DIRTY_FIELD",function(e){i.MBMFFormFields.asNeeded.inputfield.checkFlag?i.MBMFDialog._dialog.buttons.Ok.disabled=!1:i.MBMFDialog.dispatchEvent("CONTAINS_DIRTY_FIELD",e)}),this.MBMFForm.listenTo(this.MBMFForm,"EVENT_TEXT_INPUT_CHANGE",function(e){!i.MBMFFormFields.quantity.inputfield.value&&i.MBMFFormFields.asNeeded.inputfield.checkFlag?(i.MBMFFormFields.uomUnit.inputfield.elementsList=[],i.MBMFFormFields.uomUnit.inputfield.disabled=!0):(i.MBMFFormFields.uomUnit.inputfield.elementsList=i.UOMUnitsOnCombobox,i.MBMFFormFields.uomUnit.inputfield.value=i.UOMUnitsOnCombobox[0],i.MBMFFormFields.uomUnit.inputfield.disabled=!1)}),this.MBMFForm.listenTo(this.MBMFForm,"TYPE_TOGGLE_CHANGE",function(e){i.MBMFFormFields.asNeeded.inputfield.checkFlag?(i.MBMFFormFields.uomUnit.inputfield.fieldoptions.mandatory=!1,i.MBMFFormFields.quantity.inputfield.fieldoptions.mandatory=!1,i.MBMFFormFields.quantity.inputfield.value||(i.MBMFFormFields.uomUnit.inputfield.elementsList=[],i.MBMFFormFields.uomUnit.inputfield.disabled=!0),i.MBMFDialog._dialog.buttons.Ok.disabled=!1):(i.MBMFFormFields.uomUnit.inputfield.fieldoptions.mandatory=!0,i.MBMFFormFields.quantity.inputfield.fieldoptions.mandatory=!0,i.MBMFFormFields.uomUnit.inputfield.elementsList=i.UOMUnitsOnCombobox,i.MBMFFormFields.uomUnit.inputfield.value=i.UOMUnitsOnCombobox[0],i.MBMFFormFields.uomUnit.inputfield.disabled=!1,i.MBMFFormFields.uomUnit.inputfield.value&&i.MBMFFormFields.quantity.inputfield.value||(i.MBMFDialog._dialog.buttons.Ok.disabled=!0))}),i.MBMFDialog.listenTo(i.MBMFDialog,"EVENT_CLICK_SPEC_OK",function(){i.MBMFDialog._dialog.buttons.Ok.disabled=!0;var e=i.MBMFFormFields.asNeeded.inputfield.checkFlag,t=i.UOMTypeValue,n=d.hasValue(i.MBMFFormFields.uomUnit.inputfield.value)?i.MBMFFormFields.uomUnit.inputfield.value.trim():"",l=d.hasValue(i.MBMFFormFields.quantity.inputfield.value)?i.MBMFFormFields.quantity.inputfield.value.trim():"",a=i.allUOMTypeUnitList.filter(function(e){return e.dimension.dbName===t}),M=a[0].units.filter(function(e){return e.dbName===n}),F="";l&&(F=l+" "+M[0].dbName);var m={madeFromPID:i.options.toBeAddedMBMFId,uomType:a[0].dimension.dbName,quantity:F,asRequired:e};return new Promise(function(e,t){i.MBMFService.connectMBMFItem(m,i.parentId,i.extApp_SC).then(function(e){e&&e.success&&200===e.statusCode&&(i._fetchMBMFInfo(i.parentId),o.displayNotification({eventID:"success",msg:e?e.result.message:r.Success_ConnectMBMF}))}).catch(function(e){o.displayNotification({eventID:"error",msg:e.result.message});var t=i.dialogContainer?i.dialogContainer:i.target;s.unmaskLoader(t),i.MBMFDialog.closeDialog()})})})}})});