define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTypeEndpointClient = void 0;
    function isTypeEndpointClient(endpoint) {
        if (endpoint.connected &&
            typeof endpoint.send === 'function' &&
            typeof endpoint.sendRequest === 'function' &&
            typeof endpoint.request === 'function' &&
            typeof endpoint.bufferedRequest === 'function') {
            return true;
        }
        return false;
    }
    exports.isTypeEndpointClient = isTypeEndpointClient;
});
