define("DS/SwymRequestor/script/swym-requestor",["require","exports","DS/SwymUICore/script/feature/community/media/model/media-model","DS/SwymUICore/script/utils/utils","DS/SwymUICore/script/feature/core/config/bootstrap-model","DS/SwymUICore/script/utils/compass-proxy"],function(e,t,i,o,r,n){"use strict";return function(){function e(e){if(this._createdMediaObject={},this._requestorIsReady=!1,!e||!e.platformId)throw new Error("The platformId is mandatory to use the SwymRequestor's APIs");this._requestorIsReadyEvent=new Event("requestorIsReady"),this._bootstrapModel=r.getInstance(),this._bootstrapModel.resetLoaded(),this._initBaseUrl(e.platformId)}return e.prototype._executeWhenRequestorIsReady=function(e){!0===this._requestorIsReady?e.call(this):addEventListener("requestorIsReady",e.bind(this))},e.prototype._initBaseUrl=function(e){var t=this;n.getPlatformServices({platforms:[e],services:["3DSwym"]}).then(function(e){var i=e[0].services[0].url;o.initBaseUrl(i),t._bootstrapModel.initialize(null,{baseUrl:i}),t._bootstrapModel.executeWhenReady(function(){t._requestorIsReady=!0,dispatchEvent(t._requestorIsReadyEvent)})},function(e){throw new Error("Error while fetching platform from Registry".concat(e))})},e.prototype.createMedia=function(e){var t=this,o=e.userFile,r=e.threadId,n=e.title,d=e.fileName,a=e.description,s=e.draft,c=void 0!==s&&s,u=e.displayOnWhatsNew,l=void 0===u||u,f=e.base64_encoded,h=void 0!==f&&f,m=e.linkedMedia;if(o&&r&&d&&n)return new Promise(function(e,s){t._executeWhenRequestorIsReady(function(){var u=new i({},{headers:{"X-DS-SWYM-CSRFTOKEN":t._bootstrapModel.getCSRFToken()}});u.save({community_id:r,base64_encoded:h?1:0,title:n,description:a,userFile:o,fileName:d,published:c?0:1,is_illustration:l?0:1},{onComplete:function(){this._createdMediaObject[u.get("mid")]=m||[],e(u)}.bind(t),onFailure:function(e){s(e)}},{})})});throw new Error("Userfile, Thread Id and fileName and title options are mandatory to create a media")},e.prototype.updateMedia=function(e){var t=this,o=e.modelId,r=e.threadId,n=e.title,d=e.description,a=e.userFile,s=e.draft,c=void 0!==s&&s,u=e.displayOnWhatsNew,l=void 0===u||u,f=e.linkedMedia,h=e.deleteUnlinkedMedia,m=void 0===h||h;if(o&&r)return new Promise(function(e,s){t._executeWhenRequestorIsReady(function(){var u=new i({id:o,community_id:r},{headers:{"X-DS-SWYM-CSRFTOKEN":t._bootstrapModel.getCSRFToken()}});u.save({title:n,description:d,userFile:a,published:c?0:1,is_illustration:l?0:1},{onComplete:function(){var t=this;f?this._createdMediaObject[u.get("mid")].length>0&&m?Promise.all(this._deleteUnlinkedMedia(u,f)).then(function(){t._createdMediaObject[u.get("mid")]=f,e(u)}):(this._createdMediaObject[u.get("mid")]=f,e(u)):e(u)}.bind(t),onFailure:function(e){s(e)}},{})})});throw new Error("Userfile and Thread Id options are mandatory to create a media")},e.prototype._deleteUnlinkedMedia=function(e,t){var o=this,r=this._createdMediaObject[e.get("mid")].filter(function(e){return!t.includes(e)}).filter(function(e){return Object.keys(o._createdMediaObject).includes(e)}),n=[];return this._getMediaLinkedToNothingElse(e.get("mid"),r).forEach(function(e){var t=new i({id:e},{headers:{"X-DS-SWYM-CSRFTOKEN":o._bootstrapModel.getCSRFToken()}});n.push(new Promise(function(i,r){return t.destroy({onComplete:function(){delete this._createdMediaObject[e],i()}.bind(o),onFailure:function(e){r(e)}})}))}),n},e.prototype._getMediaLinkedToNothingElse=function(e,t){var i=this;return Object.keys(this._createdMediaObject).filter(function(t){return t!==e}).forEach(function(e){t=t.filter(function(t){return!i._createdMediaObject[e].includes(t)})}),t},e.prototype.deleteMedia=function(e){var t=this,o=e.modelId,r=e.threadId,n=e.deleteLinkedMedia,d=void 0===n||n;if(o&&r)return new Promise(function(e,n){t._executeWhenRequestorIsReady(function(){var a,s=new i({id:o,community_id:r},{headers:{"X-DS-SWYM-CSRFTOKEN":t._bootstrapModel.getCSRFToken()}}),c=[];d?(a=t._createdMediaObject[o].filter(function(e){return Object.keys(t._createdMediaObject).includes(e)}),t._getMediaLinkedToNothingElse(o,a).forEach(function(e){var o=new i({id:e,community_id:r},{headers:{"X-DS-SWYM-CSRFTOKEN":t._bootstrapModel.getCSRFToken()}});c.push(new Promise(function(i,r){o.destroy({onComplete:function(){delete this._createdMediaObject[e],i()}.bind(t),onFailure:function(e){r(e)}})}))}),Promise.all(c).then(function(){s.destroy({onComplete:function(){delete this._createdMediaObject[o],e()}.bind(t),onFailure:function(e){n(e)}})})):s.destroy({onComplete:function(){delete this._createdMediaObject[o],e()}.bind(t),onFailure:function(e){n(e)}})})});throw new Error("Model Id is mandatory")},e}()});