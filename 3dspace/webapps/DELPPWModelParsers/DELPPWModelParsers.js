define("DS/DELPPWModelParsers/ConnectionParser",["UWA/Core","UWA/Class","UWA/Class/Promise","DS/DELPPWLoggerModel/LoggerUtils"],function(e,t,n,s){"use strict";return t.singleton({name:"ConnectionParser",collectionUtils:null,init:function(e){if(e=e||{},this._parent(e),!e.collectionUtils)throw new Error("collectionUtils options not defined");this.collectionUtils=e.collectionUtils},parse:function(t,n,i,o){var r=this,a=o||{},l=!e.is(a.silentMode,"boolean")||a.silentMode,c=!e.is(a.mergeMode,"boolean")||a.mergeMode,u=!e.is(a.parseMode,"boolean")||a.parseMode,d={},f={},p={},P=e.is(i),g=e.is(n),I=g&&Array.isArray(n.stackedReferences),R=function(t){return s=t,i=!I,I&&(i=n.stackedReferences.some(function(e){return s===e.attributesValue.PID})),!i&&!e.is(r.collectionUtils.getReferenceFromCollection(t));var s,i};return function(){var o,a,I,b,m,y,A=null;if(!e.is(t))return p;for(A in t)t.hasOwnProperty(A)&&(A.contains("from.")?(o=A.substring(A.indexOf("from.")+5),d[o]=t[A]):A.contains("to.")?(o=A.substring(A.indexOf("to.")+3),f[o]=t[A]):A.contains("usagePoint")?m=t[A]:A.contains("attributesValue")?p=t.attributesValue:p[A]=t[A]);return p.from=e.is(d.PID)?d.PID:e.is(d.attributesValue)?d.attributesValue.PID:null,p.to=e.is(f.PID)?f.PID:e.is(f.attributesValue)?f.attributesValue.PID:null,e.is(m)&&m.length>0&&(p.usagePoint=m),e.is(p.type)||(a=p.PID,e.is(a,"string")?(I=a.split("|"),Array.isArray(I)?0<I.length?(b=I[0],p.type=b):s.debug(r.name,"ERROR: no | to split on in pid "+a):s.debug(r.name,"ERROR: Could not split "+a+" on |")):s.debug(r.name,"ERROR: No PID Attribute")),(y=function(t){var s=e.is(t.attributesValue)?t.attributesValue:null;if(s){if("DELAsmProcessCanUseCnx"===s.type||"SecondaryCandidateResourceLink"===s.type)return;s.isInstanceOf?(g&&Array.isArray(n.stackedInstances)?n.stackedInstances.push(t):r.collectionUtils.addInst(t,{silent:l,merge:c,parse:u}),P&&R(s.isInstanceOf)&&i.push(s.isInstanceOf)):(g&&Array.isArray(n.stackedReferences)?n.stackedReferences.unshift(t):r.collectionUtils.addRef(t,{silent:l,merge:c,parse:u}),P&&R(s.PID)&&i.push(s.PID))}})(d),y(f),g&&Array.isArray(n.stackedConnections)?n.stackedConnections.push(p):r.collectionUtils.addConn(p,{silent:l,merge:c,parse:u}),p}()},parseAuthoringResponse:function(t,n){var s,i=this,o=e.is(n)&&e.is(n.data)&&""!==n.data?JSON.parse(n.data):null,r={stackedConnections:[]};return t=t||{},(t=e.merge(t,{instancesAndReferences:[],connections:[]})).instancesAndReferences.forEach(function(t){var n,s,o=t.attributesValue;o.hasOwnProperty("isInstanceOf")?(n=i.collectionUtils.getInstanceFromCollection(o.PID),e.is(n)&&n.set(o)):(s=i.collectionUtils.getReferenceFromCollection(o.PID),e.is(s)&&s.set(o))}),t.connections.forEach(function(t){var n=i.parse(t,r);e.is(o)&&o.type.contains(n.type)?s=n:i.collectionUtils.addConn(n)}),s}})});