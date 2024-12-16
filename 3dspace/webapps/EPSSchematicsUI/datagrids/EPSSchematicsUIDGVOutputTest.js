/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVOutputTest'/>
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVOutputTest", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVIOTestAbstract"], function (require, exports, UIDGVIOTestAbstract) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view output test.
     * @class UIDGVInputTest
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVInputTest
     * @extends UIDGVIOTestAbstract
     * @private
     */
    class UIDGVOutputTest extends UIDGVIOTestAbstract {
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         * @param {DataPort} [dataPort] - The single data port.
         */
        constructor(editor, dataPort) {
            super(editor, 'sch-datagridview-outputtest', dataPort);
        }
        /**
         * Initializes the data grid view.
         * @protected
         */
        _initialize() {
            this._dataPorts = this._graph.getOutputDataDrawer().getModelDataPorts();
            super._initialize();
        }
    }
    return UIDGVOutputTest;
});
