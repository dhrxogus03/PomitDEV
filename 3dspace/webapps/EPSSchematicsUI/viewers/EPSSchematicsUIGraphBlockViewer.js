/// <amd-module name='DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphBlockViewer'/>
define("DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphBlockViewer", ["require", "exports", "DS/EPSSchematicsUI/viewers/EPSSchematicsUIViewer"], function (require, exports, UIViewer) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defgines the graph block viewer.
     * @private
     * @class UIGraphBlockViewer
     * @alias module:DS/EPSSchematicsUI/viewers/EPSSchematicsUIGraphBlockViewer
     * @extends UIViewer
     */
    class UIGraphBlockViewer extends UIViewer {
        /**
         * @public
         * @constructor
         * @param {HTMLElement} container - The HTML parent container that will hold the graph viewer.
         * @param {UIEditor} editor - The editor.
         * @param {UIGraphBlock} graphBlockUI - The graph block.
         */
        constructor(container, editor, graphBlockUI) {
            super(container, editor);
            this._graphBlockUI = graphBlockUI;
            this._initialize();
        }
        /**
         * Removes the viewer.
         * @public
         */
        remove() {
            const traceController = this._editor.getTraceController();
            if (traceController) {
                traceController.removeSubGraphEvents(this._graphBlockUI);
            }
            this._editor.getDebugController().onSubGraphRemoved(this._graphBlockUI);
            this._graphBlockUI.removeGraphView();
            this._graphBlockUI = undefined;
            super.remove();
        }
        /**
         * Initializes the graph block viewer.
         * @private
         */
        _initialize() {
            this.createGraph(this._graphBlockUI.getModel(), this._graphBlockUI.getJSONGraphBlockUI());
            this._graphBlockUI.setGraphView(this.getMainGraph());
            this.getMainGraph().setBlockView(this._graphBlockUI);
            this.zoomGraphToFitInView();
            const traceController = this._editor.getTraceController();
            if (traceController) {
                traceController.dispatchSubGraphEvents(this._graphBlockUI);
            }
            this._editor.getDebugController().onSubGraphOpened(this._graphBlockUI);
        }
    }
    return UIGraphBlockViewer;
});
