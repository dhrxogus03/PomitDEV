/*!  Copyright 2015 Dassault Systemes. All rights reserved. */
define("DS/SPAContentOptimizer/Ping",["DS/CSICommandBinder/CSICommandBinder"],function(n){"use strict";var e=function(e){this._node=e,this._nodeId=null,this._serverRequest=null,this.onPong=null,this._response=new n.Response};return e.prototype={constructor:e,callback:function(n){this._response.callDomains(n)},onAnswerPong:function(n){if(null!=this.onPong&&"function"==typeof this.onPong){var e=n.readString("Message");this.onPong(e)}this.dispose()},ping:function(){if(this._nodeId=this._node.select("ContentOptimizer"),this._response.onAnswerDomain("Pong",this.onAnswerPong.bind(this)),this._serverRequest=this._node.createRequest({destinationNodeId:this._nodeId,command:"Ping",version:1,onComplete:this.callback.bind(this)}),null!=this._serverRequest){var e=new n.Parameters;this._serverRequest.send(e,e,e)}},dispose:function(){null!=this._nodeId&&(this._nodeId.close(),this._nodeId=null)}},e});