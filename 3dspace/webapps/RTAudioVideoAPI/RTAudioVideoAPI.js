define("DS/RTAudioVideoAPI/RTAVcontact",["UWA/Class","UWA/Class/Model"],function(e,t){"use strict";return e.extend(t,{defaults:{login:null,username:null,isCallable:!0,presence:null,tenant:null},setup:function(e){if(!e)return console.error("RTAVcontact needs params");if(!e.login)return console.error("RTAVcontact needs login");this.addEvent("onChange:presence",this.updateCallability);this.getStatus()},getStatus:function(){},updateCallability:function(){var e=this.get("presence");e&&"busy"==e.toLowerCase()?this.set("isCallable",!1):this.set("isCallable",!0)}})}),define("DS/RTAudioVideoAPI/RTAVbtn",["UWA/Class/View","i18n!DS/RTAudioVideoAPI/assets/nls/feed","DS/UIKIT/Tooltip","DS/UIKIT/DropdownMenu","css!../RTAudioVideoAPI/RTAudioVideoAPI.css"],function(e,t,n,i){"use strict";return e.extend({tagName:"div",className:"RTAVbtn",render:function(){var e,s="audio"==this.type&&1==this.model.conversation.get("users").length&&this.model.conversation.get("users")[0].isPhoneCallable()&&this.model.conversation.get("users")[0].get("phone");this.undelegateDOMEvents();this.type;var o="video"==this.type,l="screen"==this.type;e=this.svgIcon?{tag:"span",class:" RTAVbtnSpan RTAVbtnSVG",html:"audio"==this.type?'<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path xmlns="http://www.w3.org/2000/svg" d="m 8.768474,11.230366 c -1.582,-1.5830005 -3.096,-3.4170005 -2.371,-4.1420005 1.037,-1.037 1.941,-1.677 0.102,-3.965 -1.838,-2.28699995 -3.064,-0.53 -4.068,0.475 -1.16,1.16 -0.062,5.484 4.211,9.7580005 4.274001,4.273 8.598001,5.368 9.758001,4.207 1.006,-1.005 2.762,-2.225 0.475,-4.063 -2.287,-1.839 -2.927,-0.936 -3.965,0.103 -0.725,0.722 -2.559,-0.791 -4.142001,-2.373 z" id="path4571"/><path xmlns="http://www.w3.org/2000/svg" d="m 8.768474,11.230366 c -1.582,-1.5830005 -3.096,-3.4170005 -2.371,-4.1420005 1.037,-1.037 1.941,-1.677 0.102,-3.965 -1.838,-2.28699995 -3.064,-0.53 -4.068,0.475 -1.16,1.16 -0.062,5.484 4.211,9.7580005 4.274001,4.273 8.598001,5.368 9.758001,4.207 1.006,-1.005 2.762,-2.225 0.475,-4.063 -2.287,-1.839 -2.927,-0.936 -3.965,0.103 -0.725,0.722 -2.559,-0.791 -4.142001,-2.373 z" id="path4571"/></svg>':'<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path xmlns="http://www.w3.org/2000/svg" d="M10.5,10c0,1.380249-1.119751,2.5-2.5,2.5c-1.3810425,0-2.5-1.119751-2.5-2.5S6.6189575,7.5,8,7.5  C9.380249,7.5,10.5,8.619751,10.5,10z M16,4v12c0,1.0996094-0.9003906,2-2,2H2c-1.0996094,0-2-0.9003906-2-2V4  c0-1.0996094,0.9003906-2,2-2h12C15.0996094,2,16,2.9003906,16,4z M12.5,10c0-2.4855347-2.0153809-4.5-4.5-4.5  c-2.4855347,0-4.5,2.0144653-4.5,4.5s2.0144653,4.5,4.5,4.5C10.4846191,14.5,12.5,12.4855347,12.5,10z M19.2151489,5.0856323  L17,6.5623779v7l2.2151489,1.4768066C19.5506592,15.2628174,20,15.0223389,20,14.6191406V5.5056763  C20,5.102478,19.5506592,4.8619385,19.2151489,5.0856323z" id="path4532"/></svg>'}:{tag:"span",class:"RTAVbtnSpan fonticon fonticon-"+(l?"monitor":o?"videocamera":"phone")};var a,r,c=this.model.conversation.get("isJoinable"),d=this.model.conversation.get("isCallable"),h=this.model.get("isConnected");if(!this.isOnPremises&&(h&&d||c))if(s&&document.callPhoneAvailable?this.callOptions=new i({target:this.container,items:[{text:t.call3DEXP||"3DExperience",fonticon:"computer-laptop"},{text:s,fonticon:"mobile",title:s}],events:{onClick:(r=this,function(e,t){let n={sip:!!t.title,uri:t.title};r.clickListnr(!0,n)})}}):this.delegateDOMEvents({"click .RTAVbtnSpan":"clickListnr"}),this.container.addClassName("callAvailable"),c?l?(this.undelegateDOMEvents(),this.container.removeClassName("callAvailable"),this.container.removeClassName("callJoinable"),a=t.joinScreenNotAvailable):a=o?t.joinVideoCall:t.joinAudioCall:a=l?t.startScreenCall:o?t.startVideoCall:t.startAudioCall,this.tooltip=new n({target:this.container,body:a,position:"left"}),c){if(this.container.addClassName("callJoinable"),this._alert&&"function"==typeof this._alert.show){this._alert.show();try{this._alert.elements.container.querySelector(".fonticon-cancel")&&this._alert.elements.container.querySelector(".fonticon-cancel").hide(),this._alert.elements.container.querySelector("a").onclick=function(e){return function(){e.clickListnr(!0)}}(this)}catch(e){}}}else this.container.removeClassName("callJoinable"),this._alert&&"function"==typeof this._alert.hide&&this._alert.hide();else this.undelegateDOMEvents(),this.container.removeClassName("callAvailable"),this.container.removeClassName("callJoinable"),this._alert&&"function"==typeof this._alert.hide&&this._alert.hide(),this.tooltip=new n({target:this.container,body:!this.isOnPremises&&h?t.callNotAvailable:t.featureNotAvailable,position:"left"});return this.tooltip.elements.container.addClassName("RTAVbtnTooltip"),this.container.setContent([e]),this.container.style.width=this.model.get("size")||"50px",this.container.style.height=this.model.get("size")||"50px",this.container.style["font-size"]=this.model.get("size")||"50px",this.container.style["line-height"]=this.model.get("size")||"50px",this},clickListnr:function(e,t){this.model.startCall(!0===e?null:this.type,t)},setup:function(e){this.type=e.type||"audio",this.svgIcon=this.model.get("svgIcon"),this.isOnPremises=e.isOnPremises,this.listenTo(this.model.conversation,"onChange:isCallable",this.render),this.listenTo(this.model,"onChange:isConnected",this.render),this.listenTo(this.model.conversation,"onChange:isJoinable",this.render),1==this.model.conversation.get("users").length&&this.listenTo(this.model.conversation.get("users")[0],"onChange:phone",this.render),e.alerte&&"function"==typeof e.alerte.add&&(this._alert=e.alerte.add({message:"<div style='justify-content:space-between; display:flex'>"+t.callIsRunning+" <a>"+t.joinCall+"</a></div>",className:"warning"}))},inject:function(e){return this.container.inject(e),this},destroy:function(){this.stopListening();try{this._alert.destroy()}catch(e){}delete this._alert,this._parent()}})}),document.callAlwaysAvailable=!1,document.callBtnAlwaysDisplayed=!1,document.swymCallMessage=!0,document.joinCallFeature=!0,document.callPhoneAvailable=!1,define("DS/RTAudioVideoAPI/RTAudioVideoAPI",["DS/UWPClientCode/PublicAPI","DS/PlatformAPI/PlatformAPI","UWA/Class","UWA/Class/Model","UWA/Class/Collection","i18n!DS/RTAudioVideoAPI/assets/nls/feed","DS/RTAudioVideoAPI/RTAVbtn","DS/RTAPIManager/RTAPIManager","DS/UIKIT/Alert"],function(e,t,n,i,s,o,l,a,r){"use strict";var c=window.ds&&"MOBILE"===window.ds.env||window.top&&window.top.ds&&"MOBILE"===window.top.ds.env;e.getApplicationConfiguration("app.rtc.callAlwaysAvailable")&&(document.callAlwaysAvailable=!0),e.getApplicationConfiguration("app.swymfeature.activatePhoneCallDropdown")&&(document.callPhoneAvailable=!0);var d=n.extend(i,{defaults:{isJoinable:!1,isConnected:document.callBtnAlwaysDisplayed||c,size:"50px",svgIcon:!0,topic:null,isRendered:!1,renderAlertTo:null,dmId:null,type:null},setup:function(e){if(!e)return console.error("RTAudioVideoAPI needs params");if(!e.tenantId)return console.error("RTAudioVideoAPI needs tenantId");if(this.tenant=e.tenantId,!e.logins)return console.error("RTAudioVideoAPI needs logins");var n;"string"==typeof e.logins?this.logins=[e.logins]:this.logins=e.logins,null!=e.svgIcon&&this.set("svgIcon",e.svgIcon),this.contacts={add:function(){console.error("discontinued")}},this.conversation=a.getConv(this.logins,e.dmId),document.callBtnAlwaysDisplayed||c||(this.listenTo(a.manager,"onChange:isConnected",this._updateConnected),this._updateConnected()),c&&t.subscribe("from.wap.mobile.swym",(n=this,function(e){return e&&e.callId&&e.logins&&e.type&&e.logins.length?"startCall"!=e.action?console.error("RTAudioVideoAPI mobile didnt send startCall : "+e.action):e.callId!=n.callId||void n.startCall(e.type,e):console.error("RTAudioVideoAPI incomplete data from mobile")})),"function"!=typeof e.onClick&&"function"!=typeof e.onclick||(this.onBeforeStartcall=e.onClick||e.onclick),e.dmId||e.renderAlertTo?(this._alert=new r({visibile:!0,fullWidth:!0,autoHide:!1,closeOnClick:!1,closable:!1}),this.renderAlertTo=e.renderAlertTo||document.querySelector(".community-central-list-view-container"),this._alert.elements.container.style.position="absolute",this._alert.elements.container.style.width="99%",this._alert.elements.container.style["z-index"]=10):this._alert=null;const i="OnPremise"===e.tenantId;this.btnAudio=new l({model:this,type:"audio",isOnPremises:i}),this.btnVideo=new l({model:this,type:"video",alerte:this._alert,isOnPremises:i}),this.btnScreen=new l({model:this,type:"screen",isOnPremises:i})},_onContactAdd:function(e){},_updateConnected:function(){this.set("isConnected",a.manager.get("isConnected"))},renderTo:function(e){var t=e.container,n=e.type,i=e.size;if(i&&this.set("size",i),this.get("isRendered")||!this.renderAlertTo&&!e.renderAlertTo||this.renderAlert(e),n&&"audio"!=n)if("video"==n)this.btnVideo.render().inject(t);else if("screen"==n)this.btnScreen.render().inject(t);else if("both"==n)this.btnAudio.render().inject(t),this.btnVideo.render().inject(t);else{if("all"!=n)return console.error("RTAudioVideoAPI does not know the type "+n);this.btnAudio.render().inject(t),this.btnVideo.render().inject(t),this.btnScreen.render().inject(t)}else this.btnAudio.render().inject(t);this.set("isRendered",!0)},renderAlert:function(e){if(this._alert&&this._alert.inject(e&&e.renderAlertTo||this.renderAlertTo),this.conversation.get("isJoinable")){if(this._alert&&"function"==typeof this._alert.show){this._alert.show();try{this._alert.elements.container.querySelector(".fonticon-cancel")&&this._alert.elements.container.querySelector(".fonticon-cancel").hide(),this._alert.elements.container.querySelector("a").onclick=(t=this,function(){t.startCall(null)})}catch(e){}}}else this._alert&&"function"==typeof this._alert.hide&&this._alert.hide();
//! ************************ FOR SWYM V3  **************************
var t},handlerFactory:function(e){return t=this,function(){t.startCall(e)};var t},getItem:function(e){return"video"==e?[{text:o.startVideoCall||"Start a video call",fonticon:"videocamera",handler:this.handlerFactory("video")}]:[{text:o.startAudioCall||"Start an audio call",fonticon:"phone",handler:this.handlerFactory("audio")}]},getItems:function(){return this.getItem("audio").concat(this.getItem("video"))},startCall:function(e,n){(n=n||{}).logins=n.logins||this.logins,n.action="startCall",n.type=e||this.get("type")||"audio",n.topic=n.topic||this.get("topic")||null,n.dmId=n.dmId||this.get("dmId"),n.callId=n.callId,n.dbConvId=n.dbConvId,n.options=n.options||{},n.options.rtconvEnable=n.rtconvEnable,n.options.dmId=n.dmId,n.options.dbConvId=n.dbConvId,n.options.callId=n.callId,n.options.swymUrl=n.swymUrl||this.get("swymUrl"),n.isJoinable=this.conversation.get("isJoinable"),(n.sip||n.uri)&&(n.options.sip=!0),this.onBeforeStartcall&&!n.dmId&&document.swymCallMessage?this.onBeforeStartcall(n.type,this):(this.dispatchEvent("onStartCall",n),!c||n.callId?t.publish("im.ds.com",n):this.startCallMobile(n))},startCallMobile:function(e){var n=e||{};n.logins=this.logins,n.action="startCall",n.type=n.type||"audio",this.callId=UWA.Utils.getUUID(),n.callId=this.callId,n.dmId=e&&e.dmId,t.publish("wap.mobile.swym",n)},destroy:function(e){this.stopListening(),this.btnAudio.destroy(),this.btnVideo.destroy(),this.btnScreen.destroy(),this._parent()}});return d.startCall=function(e){var n=Object.assign({},e,{action:"startCall",type:e.type||"audio"});if(!(n&&(n.logins&&n.logins.length||n.phone)))return console.error("RTAudioVideoAPI needs an array of logins or a phone to start a call");!c||n.callId?t.publish("im.ds.com",n):t.publish("wap.mobile.swym",n)},d});