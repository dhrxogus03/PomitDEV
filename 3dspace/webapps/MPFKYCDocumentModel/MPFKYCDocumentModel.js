define("DS/MPFKYCDocumentModel/UboDocumentModel",["DS/MPFModel/MPFModel"],function(e){"use strict";const t={KYC_TYPE:"kyc_type",FILENAME:"filename",STATE:"kyc_status",DRIVE_URL:"kyc_3ddrive_url"},o={ID:"kyc_ubo_id",ID_BACK:"kyc_ubo_id_back",ADDRESS:"kyc_ubo_address",KYC_PERSON_ID:"kyc_person_id",KYC_PERSON_ADDRESS:"kyc_person_address"},n={UPLOADED:"uploaded",VALIDATED:"validated",REJECTED:"rejected"},r=e.extend({idAttribute:t.KYC_TYPE,setup:function(e,t){this._type="UboDocumentModel",this._parent(e,t)},getKycType:function(){return this.get(t.KYC_TYPE)},setKycType:function(e){return this.set(t.KYC_TYPE,e)},getFileName:function(){return this.get(t.FILENAME)},setFileName:function(e){return this.set(t.FILENAME,e)},getState:function(){return this.get(t.STATE)},getStatus(){return this.getState()},getDriveUrl(){return this.get(t.DRIVE_URL)}});return r.Fields=Object.freeze(t),r.DocumentTypes=Object.freeze(o),r.States=Object.freeze(n),r}),define("DS/MPFKYCDocumentModel/KycDocumentModel",["UWA/Promise","DS/MPFModel/MPFModel"],function(e,t){"use strict";const o={},n={};o.id="kyc_id",o.idStripe="kyc_id_stripe",o.address="kyc_address",o.idPro="kyc_id_pro",o.statutes="kyc_statutes",o.bank="kyc_bank",o.kbis="kyc_kbis",o.tax="kyc_tax",o.kyc_ubo1_id="kyc_ubo1_id",o.kyc_ubo2_id="kyc_ubo2_id",o.kyc_ubo3_id="kyc_ubo3_id",o.kyc_ubo4_id="kyc_ubo4_id",o.kyc_ubo1_address="kyc_ubo1_address",o.kyc_ubo2_address="kyc_ubo2_address",o.kyc_ubo3_address="kyc_ubo3_address",o.kyc_ubo4_address="kyc_ubo4_address",n.KYC_STATUS="kycStatus",n.FILENAME="fileName",n.KYC_MESSAGE="kycMessage",n.KYC_TYPE="kycType",n.KYC_UPLOADED="kycUploaded",n.DRIVE_URL="kyc3ddriveUrl";const r=t.extend({idAttribute:"kycType",defaults:{[n.KYC_STATUS]:null,[n.FILENAME]:null,[n.KYC_MESSAGE]:null,[n.KYC_TYPE]:null,[n.KYC_UPLOADED]:null},setup:function(e,t){this._parent(e,t),this._type="KycDocumentModel"},parse:function(e){return{kycStatus:e.kyc_status,fileName:e.filename,kycMessage:e.kyc_message,kycType:e.kyc_type,kycUploaded:e.kyc_uploaded,kyc3ddriveUrl:e.kyc_3ddrive_url}},toJSON:function(){return{kyc_status:this.get(n.KYC_STATUS),filename:this.get(n.FILENAME),kyc_message:this.get(n.KYC_MESSAGE),kyc_type:this.get(n.KYC_TYPE),kyc_uploaded:this.get(n.KYC_UPLOADED),kyc_3ddrive_url:this.get(n.DRIVE_URL)}},isNew:function(){const e=this.get(n.KYC_UPLOADED);return!("string"==typeof e&&e.length>0)},saveFile:function(t,o){const n=e.deferred(),r=new FormData;return r.append("file",t),o||(o={}),o.method="POST",o.data=r,o.onComplete=n.resolve,o.onFailure=function(e,t,o){n.reject({model:e,response:t,options:o})},this.save(null,o),n.promise},getKycType(){return this.get(n.KYC_TYPE)},getStatus:function(){return this.get(n.KYC_STATUS)},getDriveUrl(){return this.get(n.DRIVE_URL)}});return r.DocumentTypes=Object.freeze(o),r.Fields=Object.freeze(n),r}),define("DS/MPFKYCDocumentModel/ShopKycDocumentDataProxy",["UWA/Core","DS/MPFUrl/UrlUtils","DS/MPFDataProxy/DataProxy"],function(e,t,o){"use strict";return o.extend({init:function(e){this._parent(e,"/mdshop/shops/{0}/kyc")},urlGet:function(t){const o=[];o.push(e.String.format(this.resourcePath,t.parentResourceId)),"function"!=typeof t.isNew||t.isNew()||(o.push("/"),o.push(t.get("kycType")));const n=o.join("");return this.connector.url(n)},urlPost:function(o,{stripeAccountToken:n,stripeFileToken:r}={}){const c=`${e.String.format(this.resourcePath,o.parentResourceId)}/${o.get("kycType")}`,u=new t(this.connector.url(c));return r&&u.addParameter("fileTokenIdStripe",r),n&&u.addParameter("accountToken",n),u.getUrl()},urlPut:null,urlPatch:null,urlDelete:null,doPut:null,doPatch:null,doDelete:null})}),define("DS/MPFKYCDocumentModel/UboDocumentDataProxy",["UWA/String","DS/MPFUrl/UrlUtils","DS/MPFDataProxy/DataProxy","DS/MPFServices/ObjectService","DS/MPFError/NotImplementedError","DS/MPFModel/MPFCollection"],function(e,t,o,n,r,c){"use strict";return o.extend({init:function(e){this._parent(e,"/mdpeoplecompany/personkycs/{0}")},urlGet:function(t){return n.requiredOfPrototype(t,c,"GET only implemented for collections"),this.connector.url(e.format(this.resourcePath,t.parentResourceId))},urlPost:function(o,{stripeFileToken:n,stripePersonToken:r}={}){const c=o.parentResourceId||o.collection.parentResourceId,u=e.format(this.resourcePath,c)+"/"+o.getKycType(),i=new t(this.connector.url(u));return n&&i.addParameter("fileTokenIdStripe",n),r&&i.addParameter("personToken",r),i.getUrl()},urlPatch:r.emit,urlPut:function(e,t){return this.urlPost(e,t)},urlDelete:r.emit})}),define("DS/MPFKYCDocumentModel/KycDocumentStatus",[],function(){"use strict";function e(e){this.status=e}return e.prototype.toString=function(){return this.status},e.NONE=new e("none"),e.CREATED=new e("created"),e.UPLOADED=new e("uploaded"),e.VALIDATED=new e("validated"),e.NOK=new e("nok"),e.fromString=function(t){var o;return o=e.NONE,e.CREATED.toString()===t?o=e.CREATED:e.UPLOADED.toString()===t?o=e.UPLOADED:e.VALIDATED.toString()===t?o=e.VALIDATED:e.NOK.toString()===t&&(o=e.NOK),o},Object.freeze(e)}),define("DS/MPFKYCDocumentModel/KycDocumentService",["DS/MPFError/BadArgumentError","DS/MPFKYCDocumentModel/KycDocumentModel","DS/MPFKYCDocumentModel/KycDocumentStatus"],function(e,t,o){"use strict";var n={isKycDocument:function(e){return t.prototype.isPrototypeOf(e)},isEditable:function(t){var r;if(!n.isKycDocument(t))throw new e("kycDocument param must be a KycDocumentModel");return(r=o.fromString(t.getStatus()))===o.NONE||r===o.NOK}};return Object.freeze(n)}),define("DS/MPFKYCDocumentModel/UboDocumentCollection",["DS/MPFModel/MPFCollection","DS/MPFKYCDocumentModel/UboDocumentModel"],function(e,t){"use strict";return e.extend({model:t,setup:function(e,t){this.constraints=t.constraints||null,this._parent(e,t)},hasDocument:function(e){return!(!this.get(e)||this.get(e).getState()!==t.States.UPLOADED&&this.get(e).getState()!==t.States.VALIDATED)},isComplete:function(){return this.hasDocument(t.DocumentTypes.ID)&&this.hasDocument(t.DocumentTypes.ADDRESS)}})}),define("DS/MPFKYCDocumentModel/UboDocumentFactory",["DS/MPFModelFactory/Factory","DS/MPFKYCDocumentModel/UboDocumentModel","DS/MPFKYCDocumentModel/UboDocumentCollection","DS/MPFKYCDocumentModel/UboDocumentDataProxy"],function(e,t,o,n){"use strict";const r={UBO_DOCUMENT:"UboDocument"},c=e.extend({createModel:function(e,o){var n=r.UBO_DOCUMENT;return this._parent(t,n,e,o)},createCollection:function(e,t){var n=r.UBO_DOCUMENT;return this._parent(o,n,e,t)},getDataProxy:function(){return this.dataProxies[r.UBO_DOCUMENT]||(this.dataProxies[r.UBO_DOCUMENT]=new n(this.connector)),this.dataProxies[r.UBO_DOCUMENT]}});return c.Types=r,c}),define("DS/MPFKYCDocumentModel/KycDocumentCollection",["UWA/Core","DS/MPFModel/MPFCollection","DS/MPFKYCDocumentModel/KycDocumentModel"],function(e,t,o){"use strict";return t.extend({model:o,uploadDocument:function(e,t,{stripeAccountToken:n,stripeFileToken:r}={}){const c=new o({[o.Fields.KYC_TYPE]:e},{dataProxy:this.dataProxy});return c.parentResourceId=this.parentResourceId,this.push(c),c.saveFile(t,{stripeAccountToken:n,stripeFileToken:r})}})}),define("DS/MPFKYCDocumentModel/KycDocumentFactory",["DS/MPFKYCDocumentModel/KycDocumentModel","DS/MPFKYCDocumentModel/KycDocumentCollection","DS/MPFKYCDocumentModel/ShopKycDocumentDataProxy"],function(e,t,o){"use strict";function n(e){this.connector=e,this.dataProxies={}}return n.prototype.createModel=function(t,o,n){return n||(n={}),o||(o={}),n.dataProxy=this._getDataProxy(t),new e(o,n)},n.prototype.createCollection=function(e,o,n){return n||(n={}),o||(o=[]),n.dataProxy=this._getDataProxy(e),new t(o,n)},n.prototype._getDataProxy=function(e){var t=null;return"shop"===e&&(this.dataProxies.shop||(this.dataProxies.shop=new o(this.connector)),t=this.dataProxies.shop),t},n});