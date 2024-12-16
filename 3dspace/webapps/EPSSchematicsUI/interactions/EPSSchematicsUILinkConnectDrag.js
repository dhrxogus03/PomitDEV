/// <amd-module name='DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkConnectDrag'/>
define("DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkConnectDrag", ["require", "exports", "DS/EPSSchematicsUI/typings/WebUX/EPSWUXEGraphIact"], function (require, exports, EGraphIact) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a link connect drag interaction.
     * @class UILinkConnectDrag
     * @alias module:DS/EPSSchematicsUI/interactions/EPSSchematicsUILinkConnectDrag
     * @extends EGraphIact.ConnConnectDrag
     * @abstract
     * @private
     */
    class UILinkConnectDrag extends EGraphIact.ConnConnectDrag {
        /**
         * @constructor
         * @param {EGraphCore.EGraph} gr - The concerned graph.
         * @param {EGraphCore.Connector} c - The concerned connector.
         */
        constructor(gr, c) {
            super(gr, c);
            this._port = c.data.uiElement;
            this._graph = this._port.getParentGraph();
        }
        /**
         * The connector drag end callback.
         * @override
         * @public
         * @param {boolean} cancel - True when the drag is cancel else false.
         */
        onend(cancel) {
            super.onend(cancel);
        }
    }
    return UILinkConnectDrag;
});
