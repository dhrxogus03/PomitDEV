define("DS/VisuLoaders/CGRReader",["DS/Visualization/ThreeJS_DS","WebappsUtils/WebappsUtils","UWA/Utils","DS/Visualization/Utils","DS/Visualization/ProxyAbstraction","DS/Visualization/Node3D","DS/Visualization/Mesh3D","DS/Visualization/MaterialManager","DS/SceneGraphNodes/AxisSystemNode","DS/Mesh/Mesh","DS/SceneGraphNodes/BillBoardNode3D","DS/Visualization/LoaderUtils","DS/ZipJS2/LoaderInflate"],function(e,r,a,o,t,i,s,n,l,d,h,u,c){"use strict";var k=a.matchUrl(r.getWebappsBaseUrl(),window.location)?null:"Passport",p={provider:"FILE",filename:"AmdLoader.js",serverurl:r.getWebappsBaseUrl()+"AmdLoader/",module:"AmdLoader",requiredAuth:k},f={provider:"FILE",filename:"ThreeJS_Base.js",serverurl:r.getWebappsBaseUrl()+"Mesh/",module:"Mesh",requiredAuth:k},w={provider:"FILE",filename:"Mesh.js",serverurl:r.getWebappsBaseUrl()+"Mesh/",module:"Mesh",requiredAuth:k},m={provider:"FILE",filename:"CGRFile.js",serverurl:r.getWebappsBaseUrl()+"Formats/",module:"Formats",requiredAuth:k},v={provider:"FILE",filename:"CGRWorkerNewInfra.js",serverurl:r.getWebappsBaseUrl()+"Workers/",module:"Workers",requiredAuth:k},b=function(r,a,i){i||(i={}),this.gl=r;var s=void 0;e.supportedExtensions&&(s=!!e.supportedExtensions.elementIndexUint||void 0),this.renderCallbackFunc=void 0!==a?a:null,this.isWorkerLoading=!1,this.workers=null,this.workerJobs=null,this.workerJobsId=[],this.urlToRevoke="",this.keepLoader=!!i.keepLoader&&i.keepLoader,this.type="",this.dataArray=[],this.materials=[];this.modelsToLoad=new Map,this.modelsToLoadCount=0,this.loadIndex=0,this.actualLoadIndex=0,this.nbWorkers=4,this.workersLoaded=[],this.workerActivate=!1,this.currentDownload=0,this.maxParrallelDownload=40,this.currentWorkerTask=0,this.maxTaskPerWorker=10,this.maxWorkerTask=this.maxTaskPerWorker*this.nbWorkers;b.prototype.cleanLoader=function(){this.materials=[],[]};var n=function(e,r,a){var o=a;if(r&&r.applicativeContainersNode&&(o=r.applicativeContainersNode),r&&e)for(var t in r){var i=r[t].doneCallback,s=r[t].errorCallback;if(e[t]){var n=e[t];if(!n){s({node:o});continue}var l=n.buffer.subarray(n.options.offset,n.options.compressed+n.options.offset);if(l.length<=2){s({node:o});continue}if(120!==l[0]){s({node:o});continue}if(218!==l[1]){s({node:o});continue}var d=l.subarray(2,n.options.compressed),h=(new c).Inflate(d),u=new TextDecoder("UTF-8").decode(h);i&&i({xml:u,node:o})}else i&&i({node:o})}};this.jobsScheduler=function(e){for(var r=[this.nbWorkers],a=0;a<this.nbWorkers;++a)r[a]=-1;for(a=0;a<this.workersLoaded.length;++a){for(var o=0,t=0;t<this.workerJobs[this.workersLoaded[a]].length;++t)o+=this.workerJobs[this.workersLoaded[a]][t];r[this.workersLoaded[a]]=o}var i=0,s=-1;for(a=0;a<this.nbWorkers;++a)-1!=r[a]&&(-1==s||r[a]<s)&&(s=r[a],i=a);this.workerJobs[i].push(e.inputFile.byteLength),this.workerJobsId[i].push(e.loadIndex),this.currentWorkerTask++,this.workers[i].postMessage(e,[e.inputFile])},this.internalLoad=function(){var e,r=this,a=this.actualLoadIndex,i=null,n=this.modelsToLoad.get(this.actualLoadIndex++),l=n.url;n.launched=!0;var d=function(e){var r=[];if(!e)return r;for(var a in e)r.push(a);return r}(n.applicativeContainers);n.isBuffer?((i=n.url)&&i.buffer&&(i=i.buffer),e="CGR"):l&&l.filename&&(e=l.filename);var h={loadIndex:a,inputFile:i,readDecoration:n.readDecoration,primitiveWithBS:n.primitiveWithBS,repWithBS:n.repWithBS,withSAG:n.withSAG,withBagUUID:n.withBagUUID,sagInfo:n.sagInfo,optimizeCurvedPipes:n.optimizeCurvedPipes,withSceneGraph:n.withSceneGraph,udlMode:n.udlMode,withBlanking:n.withBlanking,useDefaultTCSet:n.useDefaultTCSet,smartStaticBatching:n.smartStaticBatching,mode2D:n.mode2D,sceneGraphOrderMode:n.sceneGraphOrderMode,edgeTransparency:n.edgeTransparency,node:e,uint32Index:s,applicativesContainers:d,processText:n.processText};if(n.isBuffer)this.jobsScheduler(h);else{this.currentDownload++;var u=new t;o.setProxyFromSpec(l,u);var c=l.serverurl?l.serverurl:"";c+=l.filename?l.filename:"";u.executeGetHttpRequest(c,"arraybuffer",null,function(e){r.currentDownload--;h.inputFile=e,r.jobsScheduler(h)},function(e){r.currentDownload--,n.errorCallback(e)})}},this.setKeepLoaderMode=function(e){this.keepLoader=e,this.keepLoader||0!=this.modelsToLoadCount||this.abort()},this.load=function(e,r,a){var t=this;this.cleanLoader();void 0!==a.isBuffer&&a.isBuffer;var i,s,l=(i=this.loadIndex,s=r.errorCallback,function(e){console.log("index :  "+i),s&&s(e);var r=t.modelsToLoad.get(i);if(r.applicativeContainers)for(var a in r.applicativeContainers)r.applicativeContainers[a].errorCallback&&r.applicativeContainers[a].errorCallback(e);for(t.modelsToLoad.delete(i),t.modelsToLoadCount--,0==t.modelsToLoadCount&&(null!==t.renderCallbackFunc&&t.renderCallbackFunc({hack:!0,updateInfinitePlane:!0,reframe:!0}),r.doneCallback&&r.doneCallback()),[];t.currentDownload<t.maxParrallelDownload&&t.currentWorkerTask<t.maxWorkerTask;){var o=t.modelsToLoad.get(t.actualLoadIndex);if(!o||!1!==o.launched)break;t.internalLoad()}}),d={url:e,readyCallback:r.readyCallback,progressCallback:r.progressCallback,doneCallback:r.doneCallback,errorCallback:l,isBuffer:a.isBuffer,destinationNode:a.destination,readDecoration:a.readDeco,optimizeCurvedPipes:a.optimizeCurvedPipes,primitiveWithBS:a.primWithBS,repWithBS:a.repWithBS,smartStaticBatching:a.smartStaticBatching,sceneGraphOrderMode:a.sceneGraphOrderMode,withSAG:a.withSAG,withBagUUID:a.withBagUUID,sagInfo:a.sagInfo,withSceneGraph:a.withSceneGraph,udlMode:a.udlMode,withBlanking:a.withBlanking,useDefaultTCSet:a.useDefaultTCSet,edgeTransparency:a.edgeTransparency,sharedBuffers:a.sharedBuffers,noMeshInRAM:a.noMeshInRAM,unlinkToSG:a.unlinkToSG,mode2D:a.mode2D,applicativeContainers:a.applicativeContainers?a.applicativeContainers:null,launched:!1,processText:a.processText,accelStruct:a.accelStruct};if(this.modelsToLoad.set(this.loadIndex++,d),this.modelsToLoadCount++,this.workers)this.currentDownload<this.maxParrallelDownload&&this.currentWorkerTask<this.maxWorkerTask&&this.workerActivate&&this.internalLoad();else if(!this.isWorkerLoading){var h;this.type="cgr",this.isWorkerLoading=!0,h=[p,f,w,m,v],o.getWorkerBlobFromSpecs(h,function(e){t.workers=[];var r=t.workers;t.workerJobs=[],t.workerJobsId=[],t.urlToRevoke=e;for(var a=0;a<t.nbWorkers;++a){t.workers[a]=new Worker(e),t.workerJobs[a]=[],t.workerJobsId[a]=[];!function(e){t.workers[e].onerror=function(a){if(r[e]){var o=t.workerJobsId[e].shift();for(t.workerJobs[e].shift(),t.modelsToLoad.get(o).errorCallback(a),console.log("error worker: numWorker : "+e+" id : "+o);t.currentDownload<t.maxParrallelDownload&&t.currentWorkerTask<t.maxWorkerTask;){var i=t.modelsToLoad.get(t.actualLoadIndex);if(!i||!1!==i.launched)break;t.internalLoad()}}},t.workers[e].onmessage=function(a){if(r[e]){var o=a.data;if(o.error&&o.loadIndex)return t.currentWorkerTask--,void((s=t.modelsToLoad.get(o.loadIndex)).errorCallback&&s.errorCallback(o));if(o.loaded){if(t.workersLoaded.push(e),!t.workerActivate)for(t.workerActivate=!0;t.currentDownload<t.maxParrallelDownload&&t.currentWorkerTask<t.maxWorkerTask;){var i=t.modelsToLoad.get(t.actualLoadIndex);if(!i||!1!==i.launched)break;t.internalLoad()}}else{t.currentWorkerTask--,t.workerJobs[e].shift(),t.workerJobsId[e].shift();var s,l={accelStruct:(s=t.modelsToLoad.get(a.data.loadIndex)).accelStruct,processText:s.processText,edgeTransparency:s.edgeTransparency,sharedBuffers:s.sharedBuffers,noMeshInRAM:s.noMeshInRAM,fromCGR:!0,sceneGraphOrderMode:s.sceneGraphOrderMode,primitiveWithBS:s.primitiveWithBS,repWithBS:s.repWithBS,unlinkToSG:s.unlinkToSG,withSAG:s.withSAG,withBagUUID:s.withBagUUID,sagInfo:s.sagInfo,withSG:s.withSceneGraph,udlMode:s.udlMode,withBlanking:s.withBlanking};u.processData([s.destinationNode],o,void 0,s.withSceneGraph,l,function(e){if(s.readyCallback&&s.readyCallback({nodes:e}),o.applicativesContainers&&n(o.applicativesContainers,s.applicativeContainers,s.destinationNode),t.modelsToLoad.delete(a.data.loadIndex),t.modelsToLoadCount--,[],0==t.modelsToLoadCount?(null!==t.renderCallbackFunc&&t.renderCallbackFunc({hack:!0,updateInfinitePlane:!0,reframe:!0}),s.doneCallback&&s.doneCallback({isLast:!0})):null!==t.renderCallbackFunc&&t.renderCallbackFunc({hack:!0,updateInfinitePlane:!0,budgeted:!0}),[],t.keepLoader||0!=t.modelsToLoadCount)for(;t.currentDownload<t.maxParrallelDownload&&t.currentWorkerTask<t.maxWorkerTask;){var r=t.modelsToLoad.get(t.actualLoadIndex);if(!r||!1!==r.launched)break;t.internalLoad()}else t.abort();s=null})}}}}(a)}})}},this.loadUVR=function(e,r,a,o,t){this.load(e,r,a,o,t)},b.prototype.abort=function(){if(this.workers){for(var e=0;e<this.workers.length;++e)this.workers[e].terminate(),this.workers[e]=null;window.URL.revokeObjectURL(this.urlToRevoke)}this.workers=null,this.urlToRevoke="",this.isWorkerLoading=!1,this.modelsToLoad=new Map,this.modelsToLoadCount=0,this.loadIndex=0,this.actualLoadIndex=0,this.workersLoaded=[],this.workerActivate=!1,this.cleanLoader()}};return b});