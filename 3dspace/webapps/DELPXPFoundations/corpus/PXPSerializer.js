define(["require", "exports", "./CorpusManager"], function (require, exports, CorpusManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeToPXPJSON = exports.deserializeFromPXPJSON = exports.reviverFinalizeObject = exports.enSerializerLevel = void 0;
    var enSerializerLevel;
    (function (enSerializerLevel) {
        /// generate with JSON.Stringify
        enSerializerLevel[enSerializerLevel["StdStringify"] = 0] = "StdStringify";
        // inject PXP information (@class)
        enSerializerLevel[enSerializerLevel["PXP"] = 1] = "PXP";
    })(enSerializerLevel = exports.enSerializerLevel || (exports.enSerializerLevel = {}));
    /// Reviver - Finalize Object
    function reviverFinalizeObject(type, value) {
        if (typeof value === 'object') {
            const newObj = new type();
            Object.assign(newObj, value);
            // @ts-ignore
            delete newObj['@class']; // nettoyage uniquement si PXPObject...
            return newObj;
        }
        throw new Error('deserialize failed (class ' + type.constructor.name + ')');
    }
    exports.reviverFinalizeObject = reviverFinalizeObject;
    function deserializeFromPXPJSON(type, jsonString, serializerLevel) {
        const streamObj = JSON.parse(jsonString, CorpusManager_1.CorpusManager.globalReviver(serializerLevel));
        return reviverFinalizeObject(type, streamObj);
    }
    exports.deserializeFromPXPJSON = deserializeFromPXPJSON;
    class stringifyCtx {
        constructor() {
            this._id = 0;
        }
        get id() {
            return ++this._id;
        }
    }
    function serializeToPXPJSON(instance, serializerLevel = enSerializerLevel.PXP) {
        if (enSerializerLevel.StdStringify == serializerLevel) {
            return JSON.stringify(instance);
        }
        let ctx = new stringifyCtx();
        const streamJSON = JSON.stringify(instance, (key, value) => {
            if (key == '@class') {
                return value + '~' + ctx.id;
            }
            return value;
        });
        return streamJSON;
    }
    exports.serializeToPXPJSON = serializeToPXPJSON;
});
