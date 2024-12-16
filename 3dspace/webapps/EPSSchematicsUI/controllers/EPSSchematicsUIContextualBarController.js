/// <amd-module name='DS/EPSSchematicsUI/controllers/EPSSchematicsUIContextualBarController'/>
define("DS/EPSSchematicsUI/controllers/EPSSchematicsUIContextualBarController", ["require", "exports", "DS/EPSSchematicsUI/nodes/EPSSchematicsUIBlock", "DS/EPSSchematicsUI/components/EPSSchematicsUIContextualBar", "DS/EPSSchematicsCSI/EPSSchematicsCSITools"], function (require, exports, UIBlock, UIContextualBar, CSITools) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI contextual bar controller.
     * @class UIContextualBarController
     * @alias module:DS/EPSSchematicsUI/controllers/EPSSchematicsUIContextualBarController
     * @private
     */
    class UIContextualBarController {
        /**
         * @constructor
         * @param {UIViewer} viewer - The viewer.
         */
        constructor(viewer) {
            this._commands = [];
            this._viewer = viewer;
        }
        /**
         * Removes the controller.
         * @public
         */
        remove() {
            this._viewer = undefined;
            this._contextualBar = undefined;
            this._commands = undefined;
        }
        /**
         * Gets the list of commands.
         * @public
         * @returns {UICommand[]} The list of commands.
         */
        getCommands() {
            return this._commands;
        }
        /**
         * Gets the contextual bar.
         * @public
         * @returns {UIContextualBar} The contextual bar.
         */
        getContextualBar() {
            return this._contextualBar;
        }
        /**
         * Displays the contextual bar.
         * @public
         * @param {number} mouseLeft - The mouse left position.
         * @param {number} mouseTop - The mouse top position.
         */
        displayContextualBar(mouseLeft, mouseTop) {
            if (this._contextualBar === undefined && this._commands.length > 0) {
                this._contextualBar = new UIContextualBar(this._viewer, this, this._commands);
                this._contextualBar.setPosition(mouseLeft, mouseTop);
            }
        }
        /**
         * Hides the contextual bar.
         * @public
         */
        hideContextualBar() {
            if (this._contextualBar !== undefined) {
                this._contextualBar.remove();
                this.clearContextualBar();
            }
        }
        /**
         * Clears the contextual bar.
         * @public
         */
        clearContextualBar() {
            this._contextualBar = undefined;
        }
        /**
         * Checks if the contextual bar is displayed.
         * @public
         * @returns {boolean} True if the contextual bar is displayed else false.
         */
        isContextualBarDisplayed() {
            return this._contextualBar !== undefined;
        }
        /**
         * Registers a selection.
         * @public
         * @param {Array<UINode|UILink|UIPort>} selection - A list of blocks, links and ports.
         */
        registerSelection(selection) {
            this.hideContextualBar();
            if (selection.length > 0) {
                if (selection.length === 1) {
                    this._commands = selection[0].getCommands();
                }
                else {
                    const blocks = selection.filter(elt => elt instanceof UIBlock);
                    if (blocks.length > 1) {
                        if (this._viewer.areSelectedBlocksConsistent()) {
                            const options = this._viewer.getEditor().getOptions();
                            if (!options.hideDefaultGraph) {
                                this._commands = [blocks[0].getCreateGraphFromSelectionCommand()];
                            }
                            if (CSITools.isCSIGraphBlockRegistered()) {
                                this._commands.push(blocks[0].getCreateCSIGraphFromSelectionCommand());
                            }
                        }
                    }
                }
            }
        }
        /**
         * Clears the registered commands.
         * @public
         */
        clearCommands() {
            this._commands = [];
            this.hideContextualBar();
        }
    }
    return UIContextualBarController;
});
