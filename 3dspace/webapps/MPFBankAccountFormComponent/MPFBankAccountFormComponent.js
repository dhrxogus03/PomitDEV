define("DS/MPFBankAccountFormComponent/BankAccountFormComponentV2",["UWA/Core","UWA/Class/View","DS/UIKIT/Alert","DS/UIKIT/Input/Button","DS/MPFView/FieldTextInput","DS/MPFServices/ObjectService","DS/MPFBankAccountModel/BankAccountModel","DS/MPFKycComponent/KycStripeTokenHandler","DS/MPFError/BadArgumentError","DS/MPFError/ValidationError","i18n!DS/MPFBankAccountFormComponent/assets/nls/BankAccountFormComponent","css!DS/MPFUI/MPFUI"],function(t,n,e,s,o,i,a,r,c,u,l){"use strict";return n.extend({className:"mpf-bank-account-form",setup:function({bankAccount:n,constraints:e,stripeTokenHandler:s,readOnly:o=!1}={}){if(i.requiredOfPrototype(n,a,"BankAccountFormComponent expects options.bankAccount to be a BankAccountModel"),this.bankAccount=n,this.stripeTokenHandler=s,"object"==typeof e)this.bankAccountConstraints=e;else{if("object"!=typeof this.bankAccount.constraints)throw new c("Constraints were not found in BankAccountModel");this.bankAccountConstraints=this.bankAccount.constraints}if(this.country=n.get("country"),!t.is(this.country,"string"))throw new c("The country attribute in the passed BankAccountModel has to be set before creating the BankAccountFormComponentV2","BankAccountFormComponentV2",42);this.readOnly=o,this.alert=this._createAlert(),this.inputs=this._createInputs(),this.buttonContainer=this._createButtonContainer()},render:function(){return this.container.setContent([this.alert,{tag:"div",class:"mpf-bank-account-form-input-container",html:this.inputs.map(t=>t.render())},this.buttonContainer]),this},destroy:function(){this.stopListening(),this.bankAccount=null,this.bankAccountConstraints=null,this.country=null;for(let t=0;t<this.inputs.length;t++)this.inputs[t].destroy(),this.inputs[t]=null;this._parent(),this.container=null},async savePromise(){if(!this._validateInputs())return this._displaySaveError(),this.saveButton.load(!1),t.Promise.reject(new u(l.get("validationFailure")));{this.saveButton.load(!0);const{accountToken:t,bankToken:n}=await this._getStripeTokens();try{await this.bankAccount.savePromise({...this._getCurrentValues(),bankToken:n,accountToken:t}),this.alert.add({className:"success",message:l.get("bankAccountSaved")}),this.saveButton.load(!1),this.saveButton.disable(),this.setReadOnly(!0)}catch(t){const n=t.response&&t.response.errorMsg?t.response.errorMsg:t;return console.error(n),this._displaySaveError(),this.saveButton.load(!1),n}}},setReadOnly:function(t){this.readOnly=t,this.buttonContainer=this._createButtonContainer(),this.inputs.forEach(function(n){n.setDisabled(t)}),this.render()},_displaySaveError(){this.alert.add({className:"error",message:l.get("saveFailure")})},async _getStripeTokens(){let t,n;if(this.stripeTokenHandler&&this.stripeTokenHandler.isUsingStripeTokens())try{this.stripeTokenHandler.doesCompanyExistInMpo()||(t=await this.stripeTokenHandler.createCompanyAccountToken()),n=await this.stripeTokenHandler.createBankToken()}catch(t){throw console.error(t),this._displaySaveError(),this.saveButton.load(!1),new Error("token creation failed")}return{accountToken:t,bankToken:n}},_onChange:function(){this.readOnly||(this._validateFilledInputs(),this._validateModel()?this.saveButton.enable():this.saveButton.disable())},_createAlert:function(){return new e({visible:!0,autoHide:!0,hideDelay:3e3})},_createButtonContainer:function(){const n=t.createElement("div",{class:"mpf-commands"});return this.readOnly||(this.saveButton=new s({className:"primary",value:l.get("Save"),disabled:!0,events:{onClick:this.savePromise.bind(this)}}).inject(n)),n},_createInputs:function(){const n=[],e=this,s=this._getBankAccountConstraints();if(!t.is(s)||0===s.keys().length)return;const i=s.getConstraintKeyNames();for(let t=0;t<i.length;t++){const s=i[t];if(void 0!==e.bankAccount.get(s)){const t=new o({model:e.bankAccount,fieldName:s,fieldLabel:l.get(s),required:!0,readOnly:e.readOnly,dynamicValidation:!0,force:!0,saveOnChange:!1,silent:!1});e.listenTo(t,"update",function(){e._onChange()}),n.push(t)}}return n},_getBankAccountConstraints:function(){return this.bankAccountConstraints.get(this.country)||this.bankAccountConstraints.get("DEFAULT")},_validateInputs:function(){for(let n=0;n<this.inputs.length;n++)if(t.is(this.inputs[n].validate()))return!1;return!0},_validateFilledInputs:function(){let n=!0;for(let e=0;e<this.inputs.length;e++){const s=this.inputs[e].fieldName,o=this.bankAccount.get(s);t.is(o,"string")&&o.length>0&&t.is(this.inputs[e].validate())&&(n=!1)}return n},_validateModel:function(){const n=this.bankAccount.validate(this._getCurrentValues());return!(t.is(n)&&n.length>0)},_getCurrentValues:function(){const t={};for(let n=0;n<this.inputs.length;n++){const e=this.inputs[n].fieldName,s=this.bankAccount.get(e);t[e]=s}return t}})});