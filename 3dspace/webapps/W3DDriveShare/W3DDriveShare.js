define("DS/W3DDriveShare/utils/Metrics",["DS/Usage/TrackerAPI"],function(e){"use strict";return{trackPageEvent:function(t={}){if(t.model&&t.platformId&&t.eventCategory&&t.eventAction){const i=t.model,n="application/folder"===i.mimetype?"folder":"file",s=i.extension,a={pd1:t.contextAppId,pd2:n,pd3:s,pd4:t.nbNewAuthorizedUsers,pd5:t.hasCustomMessage},o=e=>{for(let t in e){const i=e[t];null!=i&&""!==i?e[t]=e[t].toString():delete e[t]}return e};e.trackPageEvent({eventCategory:`3ddrive.${t.eventCategory}`,eventAction:t.eventAction,appID:"X3DDRIV_AP",tenant:t.platformId,persDim:o(a)})}else console.error("A mandatory parameter is missing.")}}}),define("DS/W3DDriveShare/components/UIElements",["DS/UIKIT/Form","i18n!DS/W3DDriveShare/assets/nls/ui-elements","css!DS/UIKIT/UIKIT.css","css!DS/W3DDriveShare/W3DDriveShare.css"],function(e,t){"use strict";return{createTextAreaWithCharsCounter:function({name:i="message",label:n="",placeholder:s="",maxlength:a=255,disabled:o=!1}={}){const r=new e({fields:[{type:"textarea",name:i,label:n,placeholder:s,required:!1,spellcheck:!1,maxlength:a,rows:4,disabled:o,helperText:t.get("charactersCounter",{count:0,max:a})}]});return r.getContent().addEventListener("keyup",()=>{const e=r.getInput(i).getValue().length||0,n=r.getField(i).nextSibling;r.getField(i).nextSibling&&r.getField(i).nextSibling.classList.contains("form-control-helper-text")&&(n.textContent=t.get("charactersCounter",{count:e,max:a}))}),r}}}),define("DS/W3DDriveShare/utils/Helpers",[],function(){"use strict";return{getDateStr:function(e,t){if(!e)throw new Error("Missing input");const i=new Date(e),n=i.toLocaleString("en",{year:"numeric",month:"short",day:"2-digit"}),s=i.toLocaleString("en",{hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});return t?n:n+" - "+s},getMultiselectActions:function(e=[]){if(!e.length)return[];const t=e.map(e=>e.actions);return t.length?t.reduce((e,t)=>e.filter(e=>-1!==t.indexOf(e))):t}}}),define("DS/W3DDriveShare/components/EmailBadgesForm",["UWA/Class/View","UWA/Core","UWA/String","DS/UIKIT/Badge","DS/UIKIT/Form","i18n!DS/W3DDriveShare/assets/nls/email-badges-form","css!DS/W3DDriveShare/W3DDriveShare.css"],function(e,t,i,n,s,a){"use strict";return e.extend({tagName:"div",className:"emailbadges__component",existingRestrictedEmails:[],initialBadgesCount:null,maxBadgesLimit:null,ongoingRestrictions:[],setup:function(e={}){if(!e.hasOwnProperty("initialBadgesCount")||!e.existingRestrictedEmails||!e.hasOwnProperty("maxBadgesLimit"))throw new Error("Missing input");return this.existingRestrictedEmails=e.existingRestrictedEmails,this.initialBadgesCount=e.initialBadgesCount,this.maxBadgesLimit=e.maxBadgesLimit,this.ongoingRestrictions=[],this.render()},render:function(){const e=this;this.elements.form=new s({fields:[{type:"text",name:"email",placeholder:a.get("enterAnEmail"),required:!1,spellcheck:!1,disabled:this.initialBadgesCount>=this.maxBadgesLimit,helperText:a.get("addAuthorizedEmailInstructions")}]});const n=this.elements.form.getInput("email");this.elements.badgesContainerElement=t.createElement("div",{class:"badges__container"}),this.elements.badgesWarningMessageElement=t.createElement("div",{class:"badges__warningmessage hidden"}),this._isBadgesLimitReached()&&this._toggleLimitReachedMessage(!0);const o=(t="")=>{t.trim(),t.endsWith(";")&&(t=t.substring(0,t.length-1));const s=t.split(";"),a=[],o=[];s.forEach(e=>{i.isEmail(e)?a.push(e):o.push(e)}),a.forEach(t=>{e._addNewBadge(t)}),n.setValue(o.join(";"))};return n.getContent().addEventListener("drop",function(e){const t=e.dataTransfer.getData("text");setTimeout(()=>{o(t)},0)}),n.getContent().addEventListener("paste",function(){setTimeout(()=>{o(n.getValue())},0)}),n.getContent().addEventListener("keydown",function(e){"Tab"===e.key&&(e.preventDefault(),e.stopPropagation())}),n.getContent().addEventListener("keyup",function(e){[";","Tab","Enter"].includes(e.key)&&o(n.getValue())}),n.getContent().addEventListener("blur",function(){let t=n.getValue().trim();i.isEmail(t)&&(e._addNewBadge(t),n.setValue(""))}),[this.elements.form,this.elements.badgesWarningMessageElement,this.elements.badgesContainerElement].reduce((e,t)=>(t.nodeName||(t=t.getContent()),e.appendChild(t),e),this.container),this},updateExistingRestrictedEmails:function(e=[]){this.existingRestrictedEmails=e},resetOngoingRestrictions:function(){this.ongoingRestrictions=[],this.elements.badgesContainerElement&&this.elements.badgesContainerElement.replaceChildren()},resetInputState:function(){this.elements.form.getInput("email").enable(),this.elements.badgesWarningMessageElement.classList.toggle("hidden",!0)},_addNewBadge:function(e){const t=this;if(this._checkDuplicatedBadges(e))return this.elements.badgesWarningMessageElement.innerHTML=a.get("duplicatedRestriction",{name:e}),this.elements.badgesWarningMessageElement.classList.toggle("hidden",!1),void window.setTimeout(()=>{this.elements.badgesWarningMessageElement.classList.toggle("hidden",!0)},3e3);const i=new n({content:e,selectable:!0,closable:!0,events:{onClose:function(){t.elements.badgesContainerElement.removeChild(i.elements.container),t.ongoingRestrictions.indexOf(e)>-1&&t.ongoingRestrictions.splice(t.ongoingRestrictions.indexOf(e),1),t._isBadgesLimitReached()||(t.elements.form.getInput("email").enable(),t._toggleLimitReachedMessage(!1)),t._dispatchEvent({eventName:"onBadgeChange",eventOptions:{restrictionsCount:t._getRestrictionsCount(),ongoingRestrictionsCount:t.ongoingRestrictions.length}})}}});this.elements.badgesContainerElement.prepend(i.elements.container),this.ongoingRestrictions.push(e),this._isBadgesLimitReached()&&(this.elements.form.getInput("email").disable(),this._toggleLimitReachedMessage(!0)),t._dispatchEvent({eventName:"onBadgeChange",eventOptions:{restrictionsCount:this._getRestrictionsCount(),ongoingRestrictionsCount:this.ongoingRestrictions.length}})},_getRestrictionsCount:function(){return this.existingRestrictedEmails.length+this._getBadgesCount()},_isBadgesLimitReached:function(){return this._getRestrictionsCount()>=this.maxBadgesLimit},_getBadgesCount:function(){return Array.prototype.slice.call(this.elements.badgesContainerElement.childNodes).length},_checkDuplicatedBadges:function(e){return this.existingRestrictedEmails.indexOf(e)>-1||[...this.elements.badgesContainerElement.childNodes].some(t=>t.textContent.toLowerCase()===e.toLowerCase())},_toggleLimitReachedMessage:function(e){this.elements.badgesWarningMessageElement.innerHTML=a.get("restrictedEmailsNumberLimitReached"),this.elements.badgesWarningMessageElement.classList.toggle("hidden",!e)},_dispatchEvent:function(e={}){if(!e.eventName)throw new Error("Missing input");let t;const i=e.eventName;document.createEvent?(t=document.createEvent("Event")).initEvent(i,!0,!0):t=new Event(i),Object.assign(t,e.eventOptions),this.container.dispatchEvent(t)}})}),define("DS/W3DDriveShare/components/CopyLinkToClipboard",["DS/UIKIT/Input/Button","i18n!DS/W3DDriveShare/assets/nls/copy-to-clipboard","css!DS/W3DDriveShare/W3DDriveShare.css"],function(e,t){"use strict";return e.extend({link:"",init:function(e,{label:i=t.get("copyLink"),footerMode:n=!1,disabled:s=!1}={}){const a=this;this.link=e,this._parent({className:n?"copy-link__footer-mode":"copy-link",value:i,disabled:s,events:{onClick:function(){navigator.clipboard.writeText(a.link).then(()=>{this.dispatchEvent("onLinkCopied")})}}})},updateLink:function(e){this.link=e}})}),define("DS/W3DDriveShare/views/ShareWithExternalView",["DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","DS/WAFData/WAFData","UWA/Core","UWA/Class/View","DS/UIKIT/Input/Button","DS/UIKIT/Accordion","DS/UIKIT/Spinner","DS/UIKIT/Scroller","DS/UIKIT/Input/Toggle","DS/UIKIT/Tooltip","DS/W3DDriveShare/components/CopyLinkToClipboard","DS/W3DDriveShare/utils/Helpers","DS/W3DDriveShare/components/EmailBadgesForm","DS/W3DDriveShare/components/UIElements","DS/W3DDriveShare/utils/Metrics","i18n!DS/W3DDriveShare/assets/nls/share-with-external","css!DS/UIKIT/UIKIT.css","css!DS/W3DDriveShare/W3DDriveShare.css"],function(e,t,i,n,s,a,o,r,l,c,d,h,m,g,u,p){"use strict";return n.extend({className:"share-with-external-view",lastModifier:"",platformId:null,inodeId:null,contextAppId:null,automaticLinkActivation:!1,automaticCommentsActivation:!1,automaticRestrictAccessActivation:!1,platform:null,inode:null,linkData:{},csrfToken:null,maxRestricted:50,adminConfig:{},setup:function(e={}){this.platformId=e.platformId,this.inodeId=e.inodeId,this.contextAppId=e.contextAppId,e.hasOwnProperty("automaticLinkActivation")&&(this.automaticLinkActivation=this.convertToBoolean(e.automaticLinkActivation)),e.hasOwnProperty("automaticCommentsActivation")&&(this.automaticCommentsActivation=this.convertToBoolean(e.automaticCommentsActivation)),e.hasOwnProperty("automaticRestrictAccessActivation")&&(this.automaticRestrictAccessActivation=this.convertToBoolean(e.automaticRestrictAccessActivation)),this.lastModifier=`DC-${"undefined"!=typeof crypto&&"function"==typeof crypto.randomUUID?crypto.randomUUID():Date.now()}`,this.render()},render:function(){const e=this;this.container.empty(),this.elements.mainSpinner=new o({visible:!0,renderTo:this.container});const t=(e={})=>{e=e||{};const t=this,n=Boolean(Object.keys(e).length),a=this.convertToBoolean(this.adminConfig.sharebylink),o=!!this.inode&&Boolean(Object.keys(this.inode).length),r=[];if(this.container.empty(),this.elements.bodyContainer=i.createElement("div",{class:"share-with-external__body",html:[]}),a&&o){if(this.elements.bodyContainer.appendChild(i.createElement("span",{text:p.get("activateShareByLinkDescription")})),this.elements.externalLinkToggle=new l({id:"external-link-toggle",type:"switch",label:p.get("activateExternalShareLink"),checked:Boolean(e&&e.hasOwnProperty("objectid")),disabled:!this.isExternalSharingAllowed(this.inode.actions),events:{onChange:function(){const e=this;this.isChecked()?(t.trackPageEvent({eventCategory:"sharewithexternal.enableLink",eventAction:"click"}),t.enableLink(t.inode.id).then(e=>{t.refreshView(e),t.dispatchEvent("onLinkEnabled",JSON.stringify({link:e.url}))},()=>{e.uncheck(),t.dispatchEvent("onLinkActivationFailed")})):(t.trackPageEvent({eventCategory:"sharewithexternal.disableLink",eventAction:"click"}),t.disableLink(t.inode.id).then(e=>{t.refreshView(e),t.dispatchEvent("onLinkDisabled")},()=>{e.check(),t.dispatchEvent("onLinkDeactivationFailed")}))}}}),this.elements.bodyContainer.appendChild(i.createElement("div",{class:"external-link-toggle__container",html:[this.elements.externalLinkToggle,this.elements.expirationDate=i.createElement("i",{id:"external-link-expirationdate",html:e&&e.expiration?`(${p.get("expirationDate",{date:h.getDateStr(e.expiration)})})`:""})]})),this.convertToBoolean(this.adminConfig.guestcomments)&&"application/folder"!==this.inode.mimetype){this.elements.commentToggle=new l({type:"switch",id:"external-share-comments-toggle",label:p.get("enableGuestComments"),checked:Boolean(e.comment),disabled:!n||!this.isExternalSharingAllowed(this.inode.actions),events:{onChange:function(){const e=this;this.isChecked()?(t.trackPageEvent({eventCategory:"sharewithexternal.enableComments",eventAction:"click"}),t.enableComment(t.inode.id).then(()=>{t.dispatchEvent("onCommentsEnabled")},()=>{e.uncheck(),t.dispatchEvent("onCommentsActivationFailed")})):(t.trackPageEvent({eventCategory:"sharewithexternal.disableComments",eventAction:"click"}),t.disableComment(t.inode.id).then(()=>{t.dispatchEvent("onCommentsDisabled")},()=>{e.check(),t.dispatchEvent("onCommentsDeactivationFailed")}))}}});const s=i.createElement("span",{class:"fonticon fonticon-info fonticon-clickable"});new c({target:s,position:"bottom",body:p.get("enableGuestCommentsDescription"),events:{onShow:function(){t.trackPageEvent({eventCategory:"sharewithexternal.commentsToggleTooltip",eventAction:"over"})}}}),this.elements.bodyContainer.appendChild(i.createElement("div",{class:"toggle-with-info-icon",html:[this.elements.commentToggle,s]}))}this.elements.restrictAccessToggle=new l({type:"switch",id:"external-share-restrict-toggle",label:p.get("restrictAccessToSpecificUsers"),checked:Boolean(e.restricted),disabled:!n||!this.isExternalSharingAllowed(this.inode.actions),events:{onChange:function(){const e=this;this.isChecked()?(t.trackPageEvent({eventCategory:"sharewithexternal.enableRestrictedAccess",eventAction:"click"}),t.enableLinkRestriction(t.inode.id).then(e=>{t.createRestrictionsView(e.restrictions,!0),t.dispatchEvent("onRestrictedEnabled")},()=>{e.uncheck(),t.dispatchEvent("onRestrictedActivationFailed")})):(t.trackPageEvent({eventCategory:"sharewithexternal.disableRestrictedAccess",eventAction:"click"}),t.disableLinkRestriction(t.inode.id).then(()=>{t.removeRestrictionsView(),t.dispatchEvent("onRestrictedDisabled")},()=>{e.check(),t.dispatchEvent("onRestrictedDeactivationFailed")}))}}});const a=i.createElement("span",{class:"fonticon fonticon-info fonticon-clickable"});new c({target:a,position:"bottom",body:p.get("addRestrictedUsersDescription"),events:{onShow:function(){t.trackPageEvent({eventCategory:"sharewithexternal.restrictedAccessToggleTooltip",eventAction:"over"})}}}),this.elements.bodyContainer.appendChild(i.createElement("div",{class:"toggle-with-info-icon",html:[this.elements.restrictAccessToggle,a]})),this.elements.restrictionsView=i.createElement("div",{class:"restrictions-view"}),this.elements.bodyContainer.appendChild(this.elements.restrictionsView),e.restricted&&this.createRestrictionsView(e.restrictions),this.elements.bodyContainer.appendChild(i.createElement("div",{id:"share-with-external__dedicated-container"})),this.elements.copyLink=new d(e&&e.url,{label:p.get("copyExternalLink"),footerMode:!0,disabled:e&&!e.url}),this.elements.copyLink.addEvent("onLinkCopied",()=>{this.dispatchEvent("onLinkCopied"),this.trackPageEvent({eventCategory:"sharewithexternal.copyLink",eventAction:"click"})}),this.elements.shareButton=new s({value:p.get("share"),className:`primary ${this.isExternalSharingAllowed(this.inode.actions)?null:"hidden"}`,disabled:!0,events:{onClick:()=>{if(this.linkData){this.trackPageEvent({eventCategory:"sharewithexternal.addAuthorizedUsers",eventAction:"click",nbNewAuthorizedUsers:this.elements.emailBadgesForm.ongoingRestrictions.length,hasCustomMessage:Boolean(this.elements.addMessageForm.getValue("message"))});const e=new URLSearchParams(this.linkData.url.split("?")[1]).get("token");this.addRestrictedEmails({restrictedEmails:this.elements.emailBadgesForm.ongoingRestrictions,token:e,title:this.inode.title,message:this.elements.addMessageForm.getValue("message"),expiration:this.linkData.expiration}).then(()=>{const e=this.elements.emailBadgesForm.ongoingRestrictions.map(e=>({mail:e})),t=[...this.linkData.restrictions,...e];this.linkData.restrictions=t,this.elements.shareButton.disable(),this.elements.addMessageForm.getInput("message").setValue(""),t.length>=this.maxRestricted&&this.elements.addMessageForm.getInput("message").disable(),this.elements.emailBadgesForm.resetOngoingRestrictions(),this.elements.accordion&&this.elements.accordion.setContent("restrictedEmails",this.buildRestrictionsList(t)),this.dispatchEvent("onShared",JSON.stringify({link:this.linkData.url}))},()=>{this.dispatchEvent("onShareFailed")})}}}}),r.push(this.elements.copyLink,this.elements.shareButton)}a||this.elements.bodyContainer.appendChild(i.createElement("div",{styles:{height:"150px",display:"flex","justify-content":"center","align-items":"center"},html:p.get("externalSharingFeatureDisabled")})),a&&!o&&this.elements.bodyContainer.appendChild(i.createElement("div",{styles:{height:"150px",display:"flex","justify-content":"center","align-items":"center"},html:p.get("cannotAccessContent")})),this.elements.closeButton=new s({value:p.get("close"),events:{onClick:()=>{const e=this.linkData&&this.linkData.url;this.dispatchEvent("onCancel",JSON.stringify({link:e||""})),this.trackPageEvent({eventCategory:"sharewithexternal.close",eventAction:"click"})}}}),r.push(this.elements.closeButton),i.createElement("div",{class:"share-with-external__form",html:[this.elements.bodyContainer,{tag:"div",class:"modal-footer",html:r}]}).inject(this.container)};return this.getPlatform().then(()=>{this.getGlobalConfig().then((i={})=>{this.convertToBoolean(i.sharebylink)?this.getInode(this.inodeId).then(n=>{this.inode=n,this.fetchExternalSharingData(this.inodeId).then((n={})=>{const s=n.xhr&&n.xhr.status;!this.linkData&&204===s&&this.automaticLinkActivation?(this.trackPageEvent({eventCategory:"sharewithexternal.enableLink",eventAction:"auto"}),this.enableLink(e.inode.id).then(e=>{this.dispatchEvent("onLinkEnabled",JSON.stringify({link:e.url}));const n={};this.automaticCommentsActivation&&this.convertToBoolean(i.guestcomments)&&(this.trackPageEvent({eventCategory:"sharewithexternal.enableComments",eventAction:"auto"}),n.comment=!0),this.automaticRestrictAccessActivation&&(this.trackPageEvent({eventCategory:"sharewithexternal.enableRestrictedAccess",eventAction:"auto"}),n.restricted=!0),this.changeLinkAttributes(this.inode.id,n).then(e=>{n.hasOwnProperty("comment")&&(e.comment?this.dispatchEvent("onCommentsEnabled"):this.dispatchEvent("onCommentsActivationFailed")),n.hasOwnProperty("restricted")&&(e.restricted?this.dispatchEvent("onRestrictedEnabled"):this.dispatchEvent("onRestrictedActivationFailed")),t(e)}).catch(()=>{n.hasOwnProperty("comment")&&this.dispatchEvent("onCommentsActivationFailed"),n.hasOwnProperty("restricted")&&this.dispatchEvent("onRestrictedActivationFailed"),t(this.linkData)})}).catch(()=>{this.dispatchEvent("onLinkActivationFailed"),t()})):t(n.linkData)}).catch(()=>{t()})}).catch(()=>{t()}):t()}).catch(()=>{t()})}),this},convertToBoolean:function(e){return"true"===`${e}`.toLowerCase()},getPlatform:function(){return new Promise(t=>{e.getPlatformServices({onComplete:e=>{e=e.map(e=>({platformId:e.platformId,url:e["3DDrive"]})),this.platform=e.find(e=>e.platformId===this.platformId),t(this.platform)}})})},_buildUrl:function(e,t={}){return(e=new URL(e)).searchParams.set("lastmodifier",this.lastModifier),e.searchParams.set("tenant",this.platformId),Object.entries(t).forEach(([t,i])=>{e.searchParams.set(t,i)}),e.toString()},getUrl:function(e,t){if(!e)throw new Error("Missing input: inodeId");let i=`${this.platform.url}/resources/share/accesses`;return"edit"===t&&(i=`${i}/${e}`),"restrictions"===t&&(i=`${i}/${e}/restrictions`),this._buildUrl(i)},getInode:function(e){if(!e)throw new Error("Missing input: inodeId");return new Promise((i,n)=>{const s=this._buildUrl(`${this.platform.url}/resources/3ddrive/v1/bos/${e}`);t.authenticatedRequest(s,{method:"GET",data:{withactions:!0},type:"json",onComplete:(e,t)=>{this.csrfToken=t["x-ds-csrftoken"],i(e)},onFailure:n})})},getGlobalConfig:function(){return new Promise((e,i)=>{const n=this._buildUrl(`${this.platform.url}/resources/3ddrive/v1/admin/config`);t.authenticatedRequest(n,{method:"GET",type:"json",onComplete:t=>{this.adminConfig=t,e(t)},onFailure:i})})},fetchExternalSharingData:function(e){if(!e)throw new Error("Missing input: inodeId");return new Promise((i,n)=>{t.authenticatedRequest(this.getUrl(e,"edit"),{method:"GET",type:"json",onComplete:(e,t,n)=>{this.linkData=e,i({linkData:e,xhr:n})},onFailure:n})})},changeLinkAttributes:function(e,i={}){if(!e)throw new Error("Missing input: inodeId");return new Promise((n,s)=>{t.authenticatedRequest(this.getUrl(e,"edit"),{method:"PUT",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},data:JSON.stringify({objectid:e,...i}),onComplete:e=>{this.linkData=e,n(e)},onFailure:s})})},enableLink:function(e){if(!e)throw new Error("Missing input: inodeId");return new Promise((i,n)=>{t.authenticatedRequest(this.getUrl(e),{method:"POST",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},data:JSON.stringify({objectid:e,service:"drive",tenant:this.platformId}),onComplete:e=>{this.linkData=e,i(e)},onFailure:n})})},disableLink:function(e){if(!e)throw new Error("Missing input: inodeId");return new Promise((i,n)=>{t.authenticatedRequest(this.getUrl(e,"edit"),{method:"DELETE",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},onComplete:()=>{this.linkData={},i(this.linkData)},onFailure:n})})},enableComment:function(e){if(!e)throw new Error("Missing input: inodeId");return new Promise((i,n)=>{t.authenticatedRequest(this.getUrl(e,"edit"),{method:"PUT",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},data:JSON.stringify({objectid:e,comment:!0}),onComplete:e=>{this.linkData=e,i(e)},onFailure:n})})},disableComment:function(e){if(!e)throw new Error("Missing input: inodeId");return new Promise((i,n)=>{t.authenticatedRequest(this.getUrl(e,"edit"),{method:"PUT",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},data:JSON.stringify({objectid:e,comment:!1}),onComplete:e=>{this.linkData=e,i(e)},onFailure:n})})},enableLinkRestriction:function(e){if(!e)throw new Error("Missing input: inodeId");return new Promise((i,n)=>{t.authenticatedRequest(this.getUrl(e,"edit"),{method:"PUT",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},data:JSON.stringify({objectid:e,restricted:!0}),onComplete:e=>{this.linkData=e,i(e)},onFailure:n})})},disableLinkRestriction:function(e){if(!e)throw new Error("Missing input: inodeId");return new Promise((i,n)=>{t.authenticatedRequest(this.getUrl(e,"edit"),{method:"PUT",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},data:JSON.stringify({objectid:e,restricted:!1}),onComplete:e=>{this.linkData=e,i(e)},onFailure:n})})},addRestrictedEmails:function({restrictedEmails:e=[],token:i=null,title:n=null,message:s=null,expiration:a=null}){return new Promise((o,r)=>{t.authenticatedRequest(this.getUrl(this.inodeId,"restrictions"),{method:"PUT",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},data:JSON.stringify({operation:"add",items:e.map(e=>({mail:e})),proxyinfos:{token:i,title:n,message:s,expiration:a}}),onComplete:o,onFailure:r})})},removeRestrictedEmail:function(e={}){return new Promise((i,n)=>{t.authenticatedRequest(this.getUrl(this.inodeId,"restrictions"),{method:"PUT",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},data:JSON.stringify({operation:"remove",items:[{mail:e.mail}]}),onComplete:i,onFailure:n})})},isExternalSharingAllowed:function(e=[]){if(!e)throw new Error("Missing input: actions");return e.includes("share.link")},buildRestrictionsList:function(e=[]){const t=this;return i.createElement("div",{class:"permissions-view",html:[e.length?{tag:"div",class:"permissions-view__restricted-accesses",html:e.map(e=>({tag:"div",class:"restricted-email__item",html:[{tag:"span",class:"restricted-email__label",text:e.mail},{tag:"span",class:"fonticon fonticon-trash fonticon-clickable",events:{click:function(){t.trackPageEvent({eventCategory:"sharewithexternal.removeAuthorizedUser",eventAction:"click"}),t.removeRestrictedEmail(e).then(()=>{if(t.dispatchEvent("onAuthorizedUserRemoved",JSON.stringify({user:{email:e.mail}})),this.parentElement){this.parentElement.remove();const i=t.linkData.restrictions.findIndex(t=>t.mail===e.mail);i>-1&&t.linkData.restrictions.splice(i,1),t.elements.accordion&&t.elements.accordion.setTitle("restrictedEmails",'<i class="caret-left"></i>'+p.get("authorizedList",{count:t.linkData.restrictions.length,max:t.maxRestricted})),t.elements.emailBadgesForm.updateExistingRestrictedEmails(t.linkData.restrictions.map(e=>e.mail)),t.elements.emailBadgesForm.resetInputState(),t.elements.addMessageForm.getInput("message").enable()}},()=>{t.dispatchEvent("onAuthorizedUserRemovalFailed",JSON.stringify({user:{email:e.mail}}))})}}}]}))}:{tag:"div",class:"permissions-view__empty-view",html:[{tag:"div",text:p.get("noRestrictedEmails")}]}]})},createRestrictionsView:function(e=[],t=!1){const i=this,n=[];e.length&&e&&(this.elements.accordion=new a({items:[{name:"restrictedEmails",title:p.get("authorizedList",{count:e.length,max:this.maxRestricted}),content:this.buildRestrictionsList(e)}],events:{onOpen:function(){i.trackPageEvent({eventCategory:"sharewithexternal.openAuthorizedList",eventAction:"click"})},onClose:function(){i.trackPageEvent({eventCategory:"sharewithexternal.closeAuthorizedList",eventAction:"click"})}}}),n.push(this.elements.accordion),new r({element:this.elements.accordion.getContent().querySelector(".content")})),this.isExternalSharingAllowed(this.inode.actions)&&(this.elements.emailBadgesForm=new m({initialBadgesCount:e.length,existingRestrictedEmails:e.map(e=>e.mail),maxBadgesLimit:this.maxRestricted}),this.elements.emailBadgesForm.container.addEventListener("onBadgeChange",e=>{this.elements.accordion&&this.elements.accordion.setTitle("restrictedEmails",'<i class="caret-left"></i>'+p.get("authorizedList",{count:e.restrictionsCount,max:this.maxRestricted})),this.elements.shareButton&&(e.ongoingRestrictionsCount>0?this.elements.shareButton.enable():this.elements.shareButton.disable())}),this.elements.addMessageForm=g.createTextAreaWithCharsCounter({label:p.get("addMessage"),placeholder:p.get("enterMessageDescription"),disabled:e.length>=this.maxRestricted}),n.push(this.elements.emailBadgesForm,this.elements.addMessageForm)),n.reduce((e,t)=>(t.nodeName||(t=t.getContent()),e.appendChild(t),e),this.elements.restrictionsView),t&&this.elements.addMessageForm.getContent().scrollIntoView({behavior:"smooth"})},removeRestrictionsView:function(){if(this.elements.restrictionsView)for(;this.elements.restrictionsView.firstChild;)this.elements.restrictionsView.removeChild(this.elements.restrictionsView.firstChild)},refreshView:function(e={}){const t=Boolean(Object.keys(e).length);this.elements.copyLink&&(e&&e.url?(this.elements.copyLink.enable(),this.elements.copyLink.updateLink(e.url)):this.elements.copyLink.disable()),this.elements.expirationDate&&(this.elements.expirationDate.textContent=e&&e.expiration?`(${p.get("expirationDate",{date:h.getDateStr(e.expiration)})})`:""),this.elements.commentToggle&&(t&&this.isExternalSharingAllowed(this.inode.actions)?this.elements.commentToggle.enable():this.elements.commentToggle.disable(),e&&e.comment?this.elements.commentToggle.check():this.elements.commentToggle.uncheck()),this.elements.restrictAccessToggle&&(t&&this.isExternalSharingAllowed(this.inode.actions)?this.elements.restrictAccessToggle.enable():this.elements.restrictAccessToggle.disable(),e&&e.restricted?this.elements.restrictAccessToggle.check():this.elements.restrictAccessToggle.uncheck()),this.elements.restrictionsView&&e&&!e.restricted&&this.removeRestrictionsView()},trackPageEvent:function(e={}){u.trackPageEvent({model:this.inode,platformId:this.platformId,contextAppId:this.contextAppId,...e})}})}),define("DS/W3DDriveShare/views/ShareWithUsersView",["UWA/Class/View","UWA/Core","UWA/String","DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices","DS/WAFData/WAFData","DS/UIKIT/Spinner","DS/UIKIT/Input/Toggle","DS/W3DDriveShare/components/UIElements","DS/W3DDriveShare/components/CopyLinkToClipboard","DS/W3DDriveShare/utils/Helpers","i18n!DS/W3DDriveShare/assets/nls/share-with-users","css!DS/UIKIT/UIKIT.css","css!DS/W3DDriveShare/W3DDriveShare.css"],function(e,t,i,n,s,a,o,r,l,c,d){"use strict";return e.extend({className:"share-with-users-view",lastModifier:"",platformId:null,currentUserId:null,inodeId:null,platform:null,csrfToken:null,inodes:[],shareMultiple:!1,render:function(){return this.elements.spinner=new a({visible:!0,renderTo:this.container}),this._getPlatform().then(()=>{this._getPlatformConfig().then(()=>{this.shareMultiple?(this.elements.spinner.hide(),this._createView(this.inodes)):this._getInode(this.inodeId).then(()=>{this._createView(this.inodes)}).finally(()=>{this.elements.spinner.hide()})})}),this},_getPlatform:function(){return new Promise(e=>{n.getPlatformServices({onComplete:t=>{t=t.map(e=>({platformId:e.platformId,url3DDrive:e["3DDrive"],url3DDashboard:e["3DDashboard"],url3DSearch:e["3DSearch"]})),this.platform=t.find(e=>e.platformId===this.platformId),e(this.platform)}})})},_getPlatformConfig:function(){return new Promise(e=>{n.getPlatformConfig({key:"share",platformId:this.platformId,onComplete:t=>{this.shareWithInvitation=t,e()}})})},_buildUrl:function(e,t={}){return(e=new URL(e)).searchParams.set("lastmodifier",this.lastModifier),e.searchParams.set("tenant",this.platformId),Object.entries(t).forEach(([t,i])=>{e.searchParams.set(t,i)}),e.toString()},_getCSRFToken:function(){return new Promise((e,t)=>{const i=this._buildUrl(`${this.platform.url3DDrive}/resources/3ddrive/v1/bos/ticket`,{id:Date.now()});s.authenticatedRequest(i,{method:"GET",type:"json",onComplete:(t,i)=>{this.csrfToken=i["x-ds-csrftoken"],e()},onFailure:t})})},_getInode:function(e){if(!e)throw new Error("Missing input: inodeId");return new Promise((t,i)=>{const n=this._buildUrl(`${this.platform.url3DDrive}/resources/3ddrive/v1/bos/${e}`);s.authenticatedRequest(n,{method:"GET",data:{withactions:!0},type:"json",onComplete:(e,i)=>{this.csrfToken=i["x-ds-csrftoken"],this.inodes=[{...e}],t(e)},onFailure:i})})},_shareInode:function(e,t={}){if(!e)throw new Error("Missing input: inodeId");const i=this._buildUrl(`${this.platform.url3DDrive}/resources/3ddrive/v1/bos/${e}/allaccesses`,{withactions:!0});return new Promise((e,n)=>{s.authenticatedRequest(i,{method:"POST",type:"json",headers:{"X-DS-CSRFTOKEN":this.csrfToken,"Content-Type":"application/json"},data:JSON.stringify({id:t.id,type:t.type,accessright:t.accessright,message:t.message}),onComplete:e,onFailure:n})})},_isMultipleContentShare:function(){return this.inodes.length>1},_canBeSharedWithInvite:function(){return!!this.inodes.length&&this.shareWithInvitation},_convertCategoryToAccessRight:function(e,t="read"){return e?("giveReadAccess"===e&&(t="read"),"giveEditAccess"===e&&(t="edit"),"giveShareAccess"===e&&(t+="_share"),t):t},_getInputCategories:function(e=[]){return["share.read","giveReadAccess","share.edit","giveEditAccess"].filter(t=>e.includes(t)).map(e=>{let t,i;switch(e){case"share.read":case"giveReadAccess":t="giveReadAccess",i="can_view";break;case"share.edit":case"giveEditAccess":t="giveEditAccess",i="can_edit"}return{id:t,name:d.get(i)}})},_getDirectLink:function(){const e=this.platform.url3DDashboard,t=this.platformId,i=this.inodes&&this.inodes[0],n=i&&i.id;return e&&t&&n?`${e}/#app:X3DDRIV_AP/content:driveId=${t}&contentId=${n}&contentType=${"application/folder"===i.mimetype?"folder":"file"}`:null},_createView:function(e=[]){const i=c.getMultiselectActions(e),n=this._createInvitationView(i);n.render();const s=n.container.querySelector(".paneladdmember-item-view-buttons");this.container.appendChild(t.createElement("div",{class:"share-with-users-view__form",html:[{tag:"div",class:"share-with-users-view__body",html:[{tag:"div",class:"share-with-users-view__description",html:this._canBeSharedWithInvite()?d.get("shareInfoUsersExt"):d.get("shareInfoMembers")},n.container,i.includes("share.reshare")||i.includes("giveShareAccess")?this.elements.reshareToggle=new o({id:"toggle__reshare",type:"switch",label:d.get("allowReshare")}):null,this.elements.addMessageForm=r.createTextAreaWithCharsCounter({label:d.get("addMessage"),placeholder:d.get("enterMessageDescription")})]},s]}));const a=this.container.querySelector("input.temp-autocomplete-input");a&&a.focus(),this._isMultipleContentShare()||(this.elements.copyLink=new l(this._getDirectLink(),{footerMode:!0}),s.prepend(this.elements.copyLink.getContent()),this.elements.copyLink.addEvent("onLinkCopied",()=>{this.dispatchEvent("onLinkCopied")}))},_createInvitationView:function(e=[]){let t;const n=this,a=function(){let e;const t=n.inodes[0].owner||n.inodes[0].owners[0].id,i=n.currentUserId;return function(a=""){const o=a.trim();return e&&(e.cancel(),e=null),new Promise((a,r)=>{e=s.authenticatedRequest(`${n.platform.url3DSearch}/search`,{method:"POST",type:"json",headers:{"Content-Type":"application/json"},data:JSON.stringify({source:["swym","usersgroup"],specific_source_parameter:{usersgroup:{additional_query:'AND ([ds6w:label]:"'+o+'" OR [ds6w:label]:('+o+"*))"},swym:{additional_query:"AND personOrGroup:("+o+")"}},query:'[ds6w:type]:("foaf:Group" OR "pno:Person")',order_by:"asc",order_field:"ds6w:label",select_predicate:["ds6w:label","ds6w:type","ds6w:identifier","dsaccess:groupMemberCount"],nresults:8,label:`3DDrive-${i}-${Date.now()}`,with_synthesis:!1,with_synthesis_attribute:!1,tenant:n.platformId,locale:""}),onComplete:e=>{let n=[];e.hasOwnProperty("results")&&(n=e.results.filter(function(e){return e.hasOwnProperty("attributes")}).map(function(e){return e.attributes.filter(function(e){return e.hasOwnProperty("name")&&e.hasOwnProperty("value")}).filter(function(e){return"dsbase:TemplateInstance"!==e.value}).map(function(e){return-1!==e.name.indexOf("ds6w:")&&(e.name=e.name.split("ds6w:")[e.name.split("ds6w:").length-1]),"resourceid"===e.name&&(e.value=e.value.split("iam:")[e.value.split("iam:").length-1]),-1!==e.name.indexOf("dsaccess:")&&(e.name=e.name.split("dsaccess:")[e.name.split("dsaccess:").length-1]),"type"===e.name&&(-1!==e.value.indexOf("pno:")&&(e.value=e.value.split("pno:")[e.value.split("pno:").length-1]),-1!==e.value.indexOf("foaf:")&&(e.value=e.value.split("foaf:")[e.value.split("foaf:").length-1])),e}).filter(function(e){return"resourceid"===e.name||"label"===e.name||"type"===e.name||"groupMemberCount"===e.name}).reduce(function(e,t){return e[t.name]=t.value,e},{})}).map(function(e){if("Group"===e.type){var t=e.groupMemberCount||0,i=1==t?d.get("groupMemberCount"):d.get("groupMembersCount");e.label+=" ("+d.replace(i,{total:t})+")"}else-1!==e.resourceid.indexOf("mailto:")&&(e.label+=" ("+d.get("pending")+")");return e}).filter(function(e){return e.resourceid!==i&&e.resourceid!==t})),a(n)},onFailure:r})})}}(),o={suggestFormat:"{label}",suggestKey:"resourceid",labelFormat:"{label}",placeholder:d.get("enterName"),categories:this._getInputCategories(e),typeDelay:500,minLength:2,getSuggestions:function(e,i,n){return t=function(){Object.keys(i).forEach(e=>{delete i[e]})},e?i[e]?n(i[e]):a(e).then(n,function(){}):null},saveProcess:function(e=[]){n.dispatchEvent("onShare");const t=n.elements.reshareToggle,s=n.elements.addMessageForm,a=e.map(e=>{const a=e.item,o=a.hasOwnProperty("resourceid")?a.resourceid.replace(/^mailto:/,""):a.resourceid;let r=n._convertCategoryToAccessRight(e.categoryId);return t&&t.isChecked()&&(r=n._convertCategoryToAccessRight("giveShareAccess",r)),{id:o,type:i.isEmail(e.selection)?"Person":a.type,accessright:r,message:s&&s.getValue("message")}});n._getCSRFToken().then(()=>{if(1===n.inodes.length)Promise.all(a.map(e=>n._shareInode(n.inodes[0].id,{id:e.id,type:e.type,accessright:e.accessright,message:e.message}))).then(e=>{n.dispatchEvent("onShared",JSON.stringify({accesses:e}))},e=>{Array.isArray(e)||(e=[e]);const t=e.some(e=>"timeout"===e.reason);if(a.length===e.length&&!t)return void n.dispatchEvent("onShareFailed");const i=e.filter(e=>"function"==typeof e.permission.get).map(e=>e.permission.get("displayName"));n.dispatchEvent("onShareFailed",JSON.stringify({failedUsers:i})),t&&n.dispatchEvent("onShareTimeout")});else if(n.inodes.length>1){const e=[];n.inodes.forEach(t=>{a.forEach(i=>{e.push(n._shareInode(t.id,{id:i.id,type:i.type,accessright:i.accessright,message:i.message}))})}),Promise.all(e).then(e=>{n.dispatchEvent("onShared",JSON.stringify({accesses:e}))},e=>{})}})},onClose:function(){n.dispatchEvent("onShareCancel")}};this._canBeSharedWithInvite()&&(o.onEmailAddress=(e=>({resourceid:e,label:e,email:e})));const r=new PanelAddMemberView(o);r.container.querySelector("button.btn-primary").textContent=d.get("share"),r.elements.buttons.classList.add("modal-footer");const l=r.render,c=r.destroy;return Object.assign(r,{render:function(){const e=l.apply(r,arguments);return r.show(),e},destroy:function(){return"function"==typeof t&&t(),c.apply(this,arguments)}})}})});