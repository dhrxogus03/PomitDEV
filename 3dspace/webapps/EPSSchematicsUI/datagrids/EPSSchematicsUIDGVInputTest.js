/// <amd-module name='DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVInputTest'/>
define("DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVInputTest", ["require", "exports", "DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVIOTestAbstract"], function (require, exports, UIDGVIOTestAbstract) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the UI data grid view input test.
     * @class UIDGVInputTest
     * @alias module:DS/EPSSchematicsUI/datagrids/EPSSchematicsUIDGVInputTest
     * @extends UIDGVIOTestAbstract
     * @private
     */
    class UIDGVInputTest extends UIDGVIOTestAbstract {
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         * @param {DataPort} [dataPort] - The single data port.
         */
        constructor(editor, dataPort) {
            super(editor, 'sch-datagridview-inputtest', dataPort);
        }
        /**
         * Initializes the data grid view.
         * @protected
         */
        _initialize() {
            this._dataPorts = this._graph.getInputDataDrawer().getModelDataPorts();
            super._initialize();
        }
    }
    return UIDGVInputTest;
});
