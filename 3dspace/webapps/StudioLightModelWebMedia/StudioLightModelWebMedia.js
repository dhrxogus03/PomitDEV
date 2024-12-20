define("DS/StudioLightModelWebMedia/extensions/CATELightActor3DGeoVisu",["UWA/Core","DS/CATCXPModel/extensions/CATE3DActor3DGeoVisu","DS/Visualization/ThreeJS_DS","DS/MathematicsES/MathsDef"],function(e,t,i,r){"use strict";return t.extend({init:function(){this._parent(),this._solidAngleInSteradian=1,this._illuminatedAreaInSquareMeters=1},Dispose:function(){this._parent(),this._colorListener.stopListening(),this._colorListener=null},_Fill:function(e){this._parent(e),this._createOrRefreshLight();var t=this;this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"diffuseColor.CHANGED",function(){t._createOrRefreshDiffuseColorListeners(),t.frameVisuChanges.push(t._refreshColor),t.RequestVisuRefresh()}),this._createOrRefreshDiffuseColorListeners(),this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"temperature.CHANGED",function(){t.frameVisuChanges.push(t._refreshTemperature),t.RequestVisuRefresh()}),this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"colorMode.CHANGED",function(){t.frameVisuChanges.push(t._refreshColor),t.frameVisuChanges.push(t._refreshTemperature),t.RequestVisuRefresh()}),this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"power.CHANGED",function(){t.frameVisuChanges.push(t._refreshPower),t.RequestVisuRefresh()}),this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"_powered.CHANGED",function(){t.frameVisuChanges.push(t._refreshPowered),t.RequestVisuRefresh()}),this.setReady(!0)},_createOrRefreshDiffuseColorListeners:function(){this._colorListener?this._colorListener.stopListening():this._colorListener=new e.Class.Listener;var t=this.QueryInterface("CATI3DExperienceObject").GetValueByName("diffuseColor"),i=this;t&&(this._colorListener.listenTo(t.QueryInterface("CATI3DExperienceObject"),"r.CHANGED",function(){i.frameVisuChanges.push(i._refreshColor),i.RequestVisuRefresh()}),this._colorListener.listenTo(t.QueryInterface("CATI3DExperienceObject"),"g.CHANGED",function(){i.frameVisuChanges.push(i._refreshColor),i.RequestVisuRefresh()}),this._colorListener.listenTo(t.QueryInterface("CATI3DExperienceObject"),"b.CHANGED",function(){i.frameVisuChanges.push(i._refreshColor),i.RequestVisuRefresh()}))},_createOrRefreshLight:function(){e.is(this._lightNode)&&(this._node3D.removeChild(this._lightNode),this._lightNode.removeChildren())},_refreshPower:function(){return this._lightNode.setPower(this._getIntensityLumen()),!0},_getIntensityLumen:function(){let e=this.QueryInterface("CATI3DExperienceObject").GetValueByName("power"),t=this.QueryInterface("CATI3DExperienceObject").GetValueByName("intensityUnit");return 1==t?e*=this._solidAngleInSteradian:2==t?e*=this._illuminatedAreaInSquareMeters:3==t&&(e=e*this._solidAngleInSteradian*this._illuminatedAreaInSquareMeters),e},_refreshPowered:function(){return this._lightNode.setVisibility(this.QueryInterface("CATI3DExperienceObject").GetValueByName("_powered")),!0},_refreshColor:function(){return 0===this.QueryInterface("CATI3DExperienceObject").GetValueByName("colorMode")&&(this._lightNode.setColor(this._getThreeColor(this.QueryInterface("CATI3DExperienceObject").GetValueByName("diffuseColor"))),!0)},_refreshTemperature:function(){return 1===this.QueryInterface("CATI3DExperienceObject").GetValueByName("colorMode")&&(this._lightNode.setColor(this._getTemperatureColor(this.QueryInterface("CATI3DExperienceObject").GetValueByName("temperature"))),!0)},_refreshCastShadow:function(){var e=this.QueryInterface("CATI3DExperienceObject").GetValueByName("castShadows");this._lightNode.castShadows(e),e?this._lightNode.updateShadowMap(!0):this._lightNode.updateShadowMap(!1)},GetLocalNodes:function(){return this._lightNode},_getThreeColor:function(e){var t=e.QueryInterface("CATI3DExperienceObject");return new i.Color("rgb("+t.GetValueByName("r")+","+t.GetValueByName("g")+","+t.GetValueByName("b")+")")},_getTemperatureColor:function(e){let t=0,r=0,s=0,h=e/100;return h<=66?t=255:(t=h-60,(t=329.698727446*Math.pow(t,-.1332047592))<0&&(t=0),t>255&&(t=255)),h<=66?(r=h,(r=99.4708025861*Math.log(r)-161.1195681661)<0&&(r=0),r>255&&(r=255)):(r=h-60,(r=288.1221695283*Math.pow(r,-.0755148492))<0&&(r=0),r>255&&(r=255)),h>=66?s=255:h<=19?s=0:(s=h-10,(s=138.5177312231*Math.log(s)-305.0447927307)<0&&(s=0),s>255&&(s=255)),t=Math.round(t),r=Math.round(r),s=Math.round(s),new i.Color("rgb("+t+","+r+","+s+")")},GetBoundingBox:function(e){var t,s=this.Get();if(e=e||0,t=s.visible?new i.Box3(new i.Vector3(0,0,0),new i.Vector3(0,0,0)):s.getBoundingBox("invisibleSpace"),0===e){var h=new r.Transformation;this.QueryInterface("CATIMovable").GetAbsPosition(h);var n=h.getArray(),o=new i.Matrix4(n[0],n[3],n[6],n[9],n[1],n[4],n[7],n[10],n[2],n[5],n[8],n[11],0,0,0,1);t.applyMatrix4(o)}return t}})}),define("DS/StudioLightModelWebMedia/extensions/CATEDirectionalLightActor3DGeoVisu",["UWA/Core","DS/StudioLightModelWebMedia/extensions/CATELightActor3DGeoVisu","DS/SceneGraphNodes/DirectionalLightNode","DS/CATCXPModel/CATCXPRefreshUtils","DS/Visualization/ThreeJS_DS"],function(e,t,i,r,s){"use strict";return t.extend({init:function(){this._parent(),this._lightNode=null},_Fill:function(e){this._parent(e);var t=this;this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"castShadows.CHANGED",function(){t.frameVisuChanges.push(t._refreshCastShadow),t.RequestVisuRefresh()}),this.frameVisuChanges.push(this._refreshCastShadow)},_createOrRefreshLight:function(){let t=this.QueryInterface("CATI3DExperienceObject"),h=t.GetValueByName("power");var n=null;n=0===t.GetValueByName("colorMode")?this._getThreeColor(t.GetValueByName("diffuseColor")):this._getTemperatureColor(t.GetValueByName("temperature"));let o=!1;if(e.is(this._lightNode)&&e.is(this._lightNode.color)&&(o=r.compareColor(n,this._lightNode.color)),e.is(this._lightNode)){if(o&&h===this._lightNode.intensity)return!1;this._parent()}return this._lightNode=new i({color:n,intensity:h}),this._lightNode.setMatrix(new s.Matrix4(0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,1)),this._lightNode.setName(t.GetValueByName("_varName")),this._node3D.addChild(this._lightNode),!0},_refreshPower:function(){let e=this.QueryInterface("CATI3DExperienceObject").GetValueByName("power");return null!==e&&e!==this._lightNode.intensity&&(this._lightNode.setIntensity(e),!0)}})}),define("DS/StudioLightModelWebMedia/extensions/CATEPointLightActor3DGeoVisu",["UWA/Core","DS/StudioLightModelWebMedia/extensions/CATELightActor3DGeoVisu","DS/SceneGraphNodes/PointLightNode","DS/CATCXPModel/CATCXPRefreshUtils"],function(e,t,i,r){"use strict";return t.extend({init:function(){this._parent(),this._lightNode=null,this._solidAngleInSteradian=4*Math.PI},_Fill:function(e){this._parent(e);var t=this;this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"castShadows.CHANGED",function(){t.frameVisuChanges.push(t._refreshCastShadow),t.RequestVisuRefresh()}),this.frameVisuChanges.push(this._refreshCastShadow)},_createOrRefreshLight:function(){var t=this.QueryInterface("CATI3DExperienceObject"),s=this._getIntensityLumen(),h=null;h=0===t.GetValueByName("colorMode")?this._getThreeColor(t.GetValueByName("diffuseColor")):this._getTemperatureColor(t.GetValueByName("temperature"));var n=!1;if(e.is(this._lightNode)&&e.is(this._lightNode.color)&&(n=r.compareColor(h,this._lightNode.color)),e.is(this._lightNode)){if(n&&s===this._lightNode.power)return!1;this._parent()}return this._lightNode=new i({color:h,power:s,distance:0,physicalAttenuation:!0}),this._lightNode.setName(t.GetValueByName("_varName")),this._node3D.addChild(this._lightNode),!0}})}),define("DS/StudioLightModelWebMedia/extensions/CATESpotLightActor3DGeoVisu",["UWA/Core","DS/StudioLightModelWebMedia/extensions/CATELightActor3DGeoVisu","DS/SceneGraphNodes/SpotLightNode","DS/Visualization/ThreeJS_DS","DS/CATCXPModel/CATCXPRefreshUtils"],function(e,t,i,r,s){"use strict";return t.extend({_Fill:function(e){this._parent(e);var t=this;this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"innerAngle.CHANGED",function(){t.frameVisuChanges.push(t._refreshAngles),t.RequestVisuRefresh()}),this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"outerAngle.CHANGED",function(){t.frameVisuChanges.push(t._refreshAngles),t.RequestVisuRefresh()}),this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"castShadows.CHANGED",function(){t.frameVisuChanges.push(t._refreshCastShadow),t.RequestVisuRefresh()}),this.frameVisuChanges.push(this._refreshCastShadow),this.frameVisuChanges.push(this._refreshAngles)},_createOrRefreshLight:function(){var t=this.QueryInterface("CATI3DExperienceObject"),h=this._getIntensityLumen(),n=null;n=0===t.GetValueByName("colorMode")?this._getThreeColor(t.GetValueByName("diffuseColor")):this._getTemperatureColor(t.GetValueByName("temperature"));var o=!1;e.is(this._lightNode)&&e.is(this._lightNode.color)&&(o=s.compareColor(n,this._lightNode.color));var a=t.GetValueByName("outerAngle")/2*Math.PI/180,u=a*t.GetValueByName("innerAngle")/100;if(e.is(this._lightNode)){if(o&&h===this._lightNode.power&&a===this._lightNode.outerAngle&&u===this._lightNode.innerAngle)return!1;this._parent()}return this._lightNode=new i({color:n,power:h,outerAngle:a,innerAngle:u,distance:0,physicalAttenuation:!0}),this._lightNode.setMatrix(new r.Matrix4(0,0,-1,0,0,-1,0,0,-1,0,0,0,0,0,0,1)),this._lightNode.setName(t.GetValueByName("_varName")),this._node3D.addChild(this._lightNode),!0},_refreshAngles:function(){var e=this.QueryInterface("CATI3DExperienceObject"),t=e.GetValueByName("outerAngle")/2*Math.PI/180,i=t*e.GetValueByName("innerAngle")/100;return(t!==this._lightNode.outerAngle||i!==this._lightNode.innerAngle)&&(this._lightNode.setAngles(t,i,!1),this._solidAngleInSteradian=2*Math.PI*(1-Math.cos(t*(Math.PI/180))),!0)}})}),define("DS/StudioLightModelWebMedia/extensions/CATEAreaLightActor3DGeoVisu",["DS/StudioLightModelWebMedia/extensions/CATELightActor3DGeoVisu"],function(e){"use strict";return e.extend({_refreshPower:function(){return this._lightNode.setIntensity(this._getIntensityLumen()),!0}})}),define("DS/StudioLightModelWebMedia/extensions/CATERectangleLightActor3DGeoVisu",["UWA/Core","DS/StudioLightModelWebMedia/extensions/CATEAreaLightActor3DGeoVisu","DS/SceneGraphNodes/RectangleLightNode","DS/Visualization/ThreeJS_DS","DS/CATCXPModel/CATCXPRefreshUtils"],function(e,t,i,r,s){"use strict";return t.extend({init:function(){this._parent(),this._lightNode=null,this._solidAngleInSteradian=2*Math.PI},_Fill:function(e){this._parent(e);var t=this;this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"length.CHANGED",function(){t.frameVisuChanges.push(t._refreshRectangleSize),t.RequestVisuRefresh()}),this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"height.CHANGED",function(){t.frameVisuChanges.push(t._refreshRectangleSize),t.RequestVisuRefresh()}),this.frameVisuChanges.push(this._refreshRectangleSize)},_createOrRefreshLight:function(){var t=this.QueryInterface("CATI3DExperienceObject"),h=this._getIntensityLumen(),n=null;n=0===t.GetValueByName("colorMode")?this._getThreeColor(t.GetValueByName("diffuseColor")):this._getTemperatureColor(t.GetValueByName("temperature"));var o=!1;e.is(this._lightNode)&&e.is(this._lightNode.color)&&(o=s.compareColor(n,this._lightNode.color));var a=t.GetValueByName("length"),u=t.GetValueByName("height");if(e.is(this._lightNode)){if(o&&h===this._lightNode.intensity&&a===this._lightNode.length&&u===this._lightNode.height)return!1;this._parent()}return this._lightNode=new i({color:n,intensity:h,length:a,height:u}),this._lightNode.setMatrix(new r.Matrix4(0,0,-1,0,0,-1,0,0,-1,0,0,0,0,0,0,1)),this._lightNode.setName(t.GetValueByName("_varName")),this._node3D.addChild(this._lightNode),!0},_refreshRectangleSize:function(){var e=this.QueryInterface("CATI3DExperienceObject"),t=e.GetValueByName("length"),i=e.GetValueByName("height");return(t!==this._lightNode.length||i!==this._lightNode.height)&&(this._lightNode.setRectangleSize(i,t),this._illuminatedAreaInSquareMeters=t*i,!0)}})}),define("DS/StudioLightModelWebMedia/extensions/CATESphereLightActor3DGeoVisu",["UWA/Core","DS/StudioLightModelWebMedia/extensions/CATEAreaLightActor3DGeoVisu","DS/SceneGraphNodes/SphereLightNode","DS/Visualization/ThreeJS_DS","DS/CATCXPModel/CATCXPRefreshUtils"],function(e,t,i,r,s){"use strict";return t.extend({init:function(){this._parent(),this._lightNode=null,this._solidAngleInSteradian=4*Math.PI},_Fill:function(e){this._parent(e);var t=this;this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"radius.CHANGED",function(){t.frameVisuChanges.push(t._refreshRadius),t.RequestVisuRefresh()}),this.frameVisuChanges.push(this._refreshRadius)},_createOrRefreshLight:function(){var t=this.QueryInterface("CATI3DExperienceObject"),h=this._getIntensityLumen(),n=null;n=0===t.GetValueByName("colorMode")?this._getThreeColor(t.GetValueByName("diffuseColor")):this._getTemperatureColor(t.GetValueByName("temperature"));var o=!1;e.is(this._lightNode)&&e.is(this._lightNode.color)&&(o=s.compareColor(n,this._lightNode.color));var a=t.GetValueByName("radius");if(e.is(this._lightNode)){if(o&&h===this._lightNode.intensity&&a===this._lightNode.radius)return!1;this._parent()}return this._lightNode=new i({color:n,intensity:h,radius:a}),this._lightNode.setMatrix(new r.Matrix4(0,0,-1,0,0,-1,0,0,-1,0,0,0,0,0,0,1)),this._lightNode.setName(t.GetValueByName("_varName")),this._node3D.addChild(this._lightNode),!0},_refreshRadius:function(){var e=this.QueryInterface("CATI3DExperienceObject").GetValueByName("radius");return e!==this._lightNode.radius&&(this._lightNode.setRadius(e),this._illuminatedAreaInSquareMeters=4*Math.PI*e*e,!0)}})}),define("DS/StudioLightModelWebMedia/extensions/CATEDiskLightActor3DGeoVisu",["UWA/Core","DS/StudioLightModelWebMedia/extensions/CATEAreaLightActor3DGeoVisu","DS/SceneGraphNodes/DiskLightNode","DS/Visualization/ThreeJS_DS","DS/CATCXPModel/CATCXPRefreshUtils"],function(e,t,i,r,s){"use strict";return t.extend({init:function(){this._parent(),this._lightNode=null,this._solidAngleInSteradian=2*Math.PI},_Fill:function(e){this._parent(e);var t=this;this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"radius.CHANGED",function(){t.frameVisuChanges.push(t._refreshRadius),t.RequestVisuRefresh()}),this.frameVisuChanges.push(this._refreshRadius)},_createOrRefreshLight:function(){var t=this.QueryInterface("CATI3DExperienceObject"),h=this._getIntensityLumen(),n=null;n=0===t.GetValueByName("colorMode")?this._getThreeColor(t.GetValueByName("diffuseColor")):this._getTemperatureColor(t.GetValueByName("temperature"));var o=!1;e.is(this._lightNode)&&e.is(this._lightNode.color)&&(o=s.compareColor(n,this._lightNode.color));var a=t.GetValueByName("radius");if(e.is(this._lightNode)){if(o&&h===this._lightNode.intensity&&a===this._lightNode.radius)return!1;this._parent()}return this._lightNode=new i({color:n,intensity:h,radius:a}),this._lightNode.setMatrix(new r.Matrix4(0,0,-1,0,0,-1,0,0,-1,0,0,0,0,0,0,1)),this._lightNode.setName(t.GetValueByName("_varName")),this._node3D.addChild(this._lightNode),!0},_refreshRadius:function(){var e=this.QueryInterface("CATI3DExperienceObject").GetValueByName("radius");return e!==this._lightNode.radius&&(this._lightNode.setRadius(e),this._illuminatedAreaInSquareMeters=Math.PI*e*e,!0)}})}),define("DS/StudioLightModelWebMedia/extensions/CATECylinderLightActor3DGeoVisu",["UWA/Core","DS/StudioLightModelWebMedia/extensions/CATEAreaLightActor3DGeoVisu","DS/SceneGraphNodes/TubeLightNode","DS/Visualization/ThreeJS_DS","DS/CATCXPModel/CATCXPRefreshUtils"],function(e,t,i,r,s){"use strict";return t.extend({init:function(){this._parent(),this._lightNode=null},_Fill:function(e){this._parent(e);var t=this;this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"radius.CHANGED",function(){t.frameVisuChanges.push(t._refreshRadius),t.RequestVisuRefresh()}),this.listenTo(this.QueryInterface("CATI3DExperienceObject"),"length.CHANGED",function(){t.frameVisuChanges.push(t._refreshWidth),t.RequestVisuRefresh()}),this.frameVisuChanges.push(this._refreshRadius),this.frameVisuChanges.push(this._refreshWidth)},_createOrRefreshLight:function(){var t=this.QueryInterface("CATI3DExperienceObject"),h=this._getIntensityLumen(),n=null;n=0===t.GetValueByName("colorMode")?this._getThreeColor(t.GetValueByName("diffuseColor")):this._getTemperatureColor(t.GetValueByName("temperature"));var o=!1;e.is(this._lightNode)&&e.is(this._lightNode.color)&&(o=s.compareColor(n,this._lightNode.color));var a=t.GetValueByName("radius"),u=t.GetValueByName("length");if(e.is(this._lightNode)){if(o&&h===this._lightNode.intensity&&a===this._lightNode.radius&&u===this._lightNode.width)return!1;this._parent()}return this._lightNode=new i({color:n,intensity:h,radius:a,width:u}),this._lightNode.setMatrix(new r.Matrix4(0,0,-1,0,0,-1,0,0,-1,0,0,0,0,0,0,1)),this._lightNode.setName(t.GetValueByName("_varName")),this._node3D.addChild(this._lightNode),!0},_refreshRadius:function(){var e=this.QueryInterface("CATI3DExperienceObject").GetValueByName("radius");return e!==this._lightNode.radius&&(this._lightNode.setRadius(e),this._refreshAreaStatus(),!0)},_refreshWidth:function(){var e=this.QueryInterface("CATI3DExperienceObject").GetValueByName("length");return e!==this._lightNode.width&&(this._lightNode.setWidth(e),this._refreshAreaStatus(),!0)},_refreshAreaStatus:function(){var e=this.QueryInterface("CATI3DExperienceObject"),t=e.GetValueByName("radius"),i=e.GetValueByName("length");this._solidAngleInSteradian=4*Math.PI*i/Math.sqrt(i*i+4*t*t),this._IlluminatedAreaInSquareMeters=2*Math.PI*t*i}})});