define("DS/AfrHomePageV3Guidance/ModalCarousel",["DS/AfrHomePageV3/mod_AfrHomePageControllers"],function(e){"use strict";const t=e.HomePageButtonController,o={IMAGE:e=>{const t=UWA.createElement("div");t.classList.add("afr-home-page-carousel-slide-container");const o=document.createElement("p");o.classList.add("afr-home-page-carousel-slide-title"),o.appendChild(document.createTextNode(e.title));const s=document.createElement("p");s.classList.add("afr-home-page-carousel-slide-description"),s.appendChild(document.createTextNode(e.text));const a=document.createElement("img");return a.setAttribute("src",e.img),a.classList.add("afr-home-page-carousel-slide-image"),t.append(a,o,s),t},VIDEO:e=>{const t=UWA.createElement("div");t.classList.add("afr-home-page-carousel-slide-container");const o=document.createElement("p");o.classList.add("afr-home-page-carousel-slide-title"),o.appendChild(document.createTextNode(e.title));const s=document.createElement("p");s.classList.add("afr-home-page-carousel-slide-description"),s.appendChild(document.createTextNode(e.text));const a=document.createElement("video");a.setAttribute("controls",!0),a.setAttribute("preload","metadata"),a.classList.add("afr-home-page-carousel-slide-video");const r=document.createElement("source");return r.setAttribute("src",e.video),r.setAttribute("type","video/mp4"),a.appendChild(r),t.append(a,o,s),t}};class s{constructor(){this._private=Object.create(null)}buildViewAsync(e){return new Promise((t,s)=>{require(["DS/UIKIT/Carousel","DS/Windows/Dialog","DS/Windows/ImmersiveFrame","DS/Controls/Button","i18n!DS/AfrHomePageV3Guidance/assets/nls/afr-home-page-guidance","css!DS/AfrHomePageV3Guidance/afr-home-page-v3-guidance.css","css!DS/UIKIT/UIKIT.css"],(s,a,r,n,i)=>{const l=Object.create(null);this._private.views=l;const d=new r({});l.immersiveFrame=d;const c=[],m=e.items;for(let e of m){let t=e.type;if(!o.hasOwnProperty(t))throw new Error("Unsupported type",t);c.push(o[t](e))}const u=new s({animation:"slide",dots:!0,autoPlay:!1});u.add(c),l.carousel=u;const p=new a({immersiveFrame:d,title:e.title,content:u,modalFlag:!0,closeButtonFlag:!1,autoCloseFlag:!1,width:600,buttons:{Yes:new n({label:i.get("NLS_CarouselValidation"),onClick:function(){p.close(),e.onClose()}})}});return p.getContent().classList.add("afr-home-page-carousel-modal"),l.modal=p,t()},s)})}getDOM(){return this._private.views.immersiveFrame.getContent()}destroy(){let e=this._private.views;if(e){const t=e.modal,o=e.immersiveFrame;t.destroy(),o.destroy()}delete this._private.views,delete this._private}}return{createController:function(e){return new t({onAction:function(t){let o=Promise.resolve();return this._modalCarousel||(this._onModalClose=(()=>{t.hideOverlay()}),this._modalCarousel=new s,o=this._modalCarousel.buildViewAsync({...e,onClose:this._onModalClose.bind(this)})),o.then(()=>{const e=this._modalCarousel.getDOM();t.showOverlay(e)})},destroy:function(){this._modalCarousel&&this._modalCarousel.destroy()}})}}});