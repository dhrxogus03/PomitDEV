define("DS/CSICommandBinder/CSIValueTypePrivateAPI",["DS/CSICommandBinder/CSIValueType"],function(r){"use strict";var e={valueTypeError:"ValueType error",valueTypeToString:function(e){return e<0||e>=r.endOfTypes?this.valueTypeError:r.typeNames[e]},readObjectTypeAsString:function(r){var e=r.readString();return void 0===e?this.valueTypeError:e},readObjectArrayTypeAsString:function(e){var t=function(e,t){var a=t.readUint64();if(void 0===a)return this.valueTypeError;var i=t.tell();if(t.readUint32()!==r.CSIParametersGuid)return this.valueTypeError;var n=e.readObjectTypeAsString(t);return t.seek(i+a),n},a="Parameters",i=e.readUint64();if(void 0===i)return this.valueTypeError;if(0===i){if(void 0===(a=e.readString()))return this.valueTypeError}else{a=t(this,e);for(var n=1;n<i;++n)if(t(this,e)!==a){a="Parameters";break}}return a+"[]"}};return e});