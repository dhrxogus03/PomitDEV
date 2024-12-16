/// <amd-module name='DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockEventPort'/>
define("DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockEventPort", ["require", "exports", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockControlPort", "DS/EPSSchematicsUI/connectors/views/EPSSchematicsUIBlockEventPortView"], function (require, exports, UIBlockControlPort, UIBlockEventPortView) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI block event port.
     * @class UIBlockEventPort
     * @alias module:DS/EPSSchematicsUI/connectors/EPSSchematicsUIBlockEventPort
     * @extends UIBlockControlPort
     * @private
     */
    class UIBlockEventPort extends UIBlockControlPort {
        /**
         * @constructor
         * @param {UIBlock} parent - The UI block that owns this UI block event port.
         * @param {EventPort} model - The event port model.
         */
        constructor(parent, model) {
            super(parent, model);
        }
        /**
         * Creates the view of the connector.
         * @protected
         * @override
         * @returns {UIBlockEventPortView} The view of the connector.
         */
        _createView() {
            return new UIBlockEventPortView(this);
        }
    }
    return UIBlockEventPort;
});
