define("DS/VCXWebPlatformGUI/VCX3DDriveSelectorPanel",["require","exports","DS/Windows/Dialog","DS/Controls/Button","DS/Windows/ImmersiveFrame","DS/W3DDriveComponent/DriveContentSelector","DS/VCXWebPlatform/VCXPlatformServices","i18n!DS/VCXWebPlatformGUI/assets/nls/VCX3DDriveSelectorPanel"],function(e,t,i,n,r,l,o,s){"use strict";return new class{_createDriveBrowser(e){try{const t=l.create3DDriveChooser(e);if(null!=t&&t.container)return t.container}catch(e){throw e}}_onSelectCB(e){if(Array.isArray(e)&&e.length>0&&""!==e[0].envId){const t=e[0].displayName;this._selectedNode={fileId:e[0].objectId,filePath:t,fileName:e[0].displayName}}this.publishButton.disabled=!0}async _buildLayout(e){let t=UWA.Promise.deferred();this.publishButton=new n({emphasize:"primary",label:"Select",onClick:()=>{t.resolve(this._selectedNode)}});let l=new n({emphasize:"default",label:"Cancel",onClick:()=>{t.resolve(null)}}),o=new r({identifier:"WebUIPanelDocumentation_3ddriveselectorIF"}),a=new i({immersiveFrame:o,title:s["VCXPublish.3DDrive.Selector.Title"],resizableFlag:!1,movableFlag:!1,modalFlag:!0,touchMode:!0,identifier:"WebUIPanelDocumentation_3ddriveselector",customButtonsDefinition:[this.publishButton,l]});try{const t=this._createDriveBrowser(e.viewOptions);if(a&&t&&t.children&&t.children.length>1&&t.children[1]){a.content=t;const i=(.35*window.innerHeight).toString()+"px";t.children[1].style.height=i;const n="600px";t.children[1].style.width=n,o.inject(e.frmWindow.elements.modalDialogContainer)}}catch(e){throw e}a.addEventListener("close",()=>t.resolve(null));let c=await t.promise;return a.close(),c}async generateEnovia3DDriveBrowser(e){const t={frmWindow:e,viewOptions:{envId:await o.GetTenantId(),multiEnv:!1,select:{multiSelect:!1,type:"DriveFolder",createFolder:!0,accessright:"edit"},filter:{type:"DriveFolder",extension:[]},onSelect:e=>{this._onSelectCB(e)}}};return this._buildLayout(t)}}});