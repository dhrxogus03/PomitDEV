define("DS/WebViewer/SceneGraphHelper",["UWA/Class","DS/Visualization/PathElement"],function(e,t){return e.extend({dispose:function(){this.name=null,this.SceneGraphOverrideSet=null},init:function(e,t){this.name=t,this.SceneGraphOverrideSet=e},getSceneGraphOverride:function(e,t,i){var r,n=!1,a=!0;return 1==t&&(n=!0),0==i&&(a=!1),1==a&&(r=this.SceneGraphOverrideSet.getUniqueOverrideFromPathElement(e)),r||(r=this.SceneGraphOverrideSet.createOverride({pathes:e,propagateToChildren:n})),r},setPosition:function(e,t){var i=this.getSceneGraphOverride(e);i&&i.setPosition(t)},getPosition:function(e){var t=this.getSceneGraphOverride(e);return t?t.getPosition():null},setOpacity:function(e,t,i){var r=this.getSceneGraphOverride(e);r&&r.setOpacity(t,i)},getOpacity:function(e){var t=this.getSceneGraphOverride(e);return t?t.getOpacity():null},setVisibility:function(e,t,i){var r=this.getSceneGraphOverride(e);r&&r.setVisibility(t,i)},setVisibilityOnRoot:function(e,t){var i=this.getSceneGraphOverride(e,!0);i&&i.setVisibility(t)},setPickabilityOnRoot:function(e,t){var i=this.getSceneGraphOverride(e,!0);i&&i.setPickability(t)},setOpacityOnRoot:function(e,t,i){var r=this.getSceneGraphOverride(e,!1,!1);r&&r.setOpacity(t,i)},getVisibility:function(e){var t=this.getSceneGraphOverride(e);return t?t.getVisibility():null},setPickability:function(e,t,i){var r=this.getSceneGraphOverride(e);r&&r.setPickability(t,i)},getPickability:function(e){var t=this.getSceneGraphOverride(e);return t?t.getPickability():null},getOverridesFromPathElement:function(e){return this.SceneGraphOverrideSet.getOverridesTargetingNode(e)},deleteOverridesFromPathElement:function(e){this.SceneGraphOverrideSet.deleteOverrides(this.SceneGraphOverrideSet.getOverridesTargetingNode(e))},deleteOverrides:function(e){this.SceneGraphOverrideSet.deleteOverrides(e)},deleteOverride:function(e){this.SceneGraphOverrideSet.deleteOverride(e)},createAndModifyConcatinatedOverrides:function(e,i){var r;if(e.externalPath){for(var n=[],a=0;a<e.externalPath.length;a++){for(var o=new t,d=0;d<=a;d++)o.addElement(e.externalPath[d]);n.push(o)}r=this.SceneGraphOverrideSet.createOverride({pathes:n}),1==i?r.setPickability("PICKABLE"):r.setVisibility(!0)}return r},getConcatinatedOverride:function(e,t){var r;if(e.externalPath){var n=e.externalPath.length,a=e.getKey(),o=this.getOverridesFromPathElement(t);for(i=0;i<o.length;i++)if(override=o[i],override._pathes.length==n){for(j=0;j<override._pathes.length;j++){if(a===override._pathes[j].getKey()){r=override;break}}if(r)break}}return r},getRootsAndConcatinatedPaths:function(e){var r=null,n=null,a=[],o=this.getOverridesFromPathElement(e),d=function(e){var i=new t;return i.addElement(e),e.children&&e.children.length>0&&i.addElement(e.children[0]),i}(e).getKey(),h=-1,s=-1;for(i=0;i<o.length;i++){if(override=o[i],1==override._pathes.length){var v=override._pathes[0].getKey();v===d&&override._propagationMode>0&&!r?(r=override,h=i):v===d&&override._propagationMode<=0&&!n&&.2==override.getOpacity()&&(n=override,s=i)}s!=i&&h!=i&&a.push(override)}return{mainroot:r,opaqueroot:n,concatinated:a}}})});