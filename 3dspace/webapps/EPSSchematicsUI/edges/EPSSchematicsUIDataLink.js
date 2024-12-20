/// <amd-module name='DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink'/>
define("DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink", ["require", "exports", "DS/EPSSchematicsUI/edges/EPSSchematicsUILink", "DS/EPSSchematicsUI/edges/views/EPSSchematicsUIDataLinkView", "DS/EPSSchematicsUI/geometries/EPSSchematicsUIDataLinkGeometry", "DS/EPSSchematicsUI/connectors/EPSSchematicsUIShortcutDataPort", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents"], function (require, exports, UILink, UIDataLinkView, UIDataLinkGeometry, UIShortcutDataPort, Events) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines a UI data link.
     * @class UIDataLink
     * @alias module:DS/EPSSchematicsUI/edges/EPSSchematicsUIDataLink
     * @extends UILink
     * @private
     */
    class UIDataLink extends UILink {
        /**
         * @constructor
         * @param {UIGraph} graph - The UI Graph that owns this link.
         * @param {DataLink} model - The data link model.
         * @param {boolean} [forceMaximizedState=false] - True to force the data link to be maximized.
         */
        constructor(graph, model, forceMaximizedState = false) {
            super(graph, model);
            this._forceMaximizedState = false;
            this._onCastLevelChangeCB = this._onCastLevelChange.bind(this);
            this._forceMaximizedState = forceMaximizedState || !this._graph.getDataLinksMinimizerState();
            this.setView(this.createView());
            this._display.set('geometry', new UIDataLinkGeometry());
            this._model.addListener(Events.DataLinkCastLevelChangeEvent, this._onCastLevelChangeCB);
            this._model.addListener(Events.DataLinkValidityChangeEvent, this._onValidityChangeCB);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                             ____  _   _ ____  _     ___ ____                                   //
        //                            |  _ \| | | | __ )| |   |_ _/ ___|                                  //
        //                            | |_) | | | |  _ \| |    | | |                                      //
        //                            |  __/| |_| | |_) | |___ | | |___                                   //
        //                            |_|    \___/|____/|_____|___\____|                                  //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * Removes the link.
         * @public
         */
        remove() {
            if (this._startPort instanceof UIShortcutDataPort) {
                const dataPortUI = this._startPort.getParent().getDataPortUI();
                if (dataPortUI !== undefined) {
                    dataPortUI.removeShortcutLink();
                }
            }
            else if (this._endPort instanceof UIShortcutDataPort) {
                const dataPortUI = this._endPort.getParent().getDataPortUI();
                if (dataPortUI !== undefined) {
                    dataPortUI.removeShortcutLink();
                }
            }
            this._model.removeListener(Events.DataLinkCastLevelChangeEvent, this._onCastLevelChangeCB);
            this._model.removeListener(Events.DataLinkValidityChangeEvent, this._onValidityChangeCB);
            this._forceMaximizedState = undefined;
            this._onCastLevelChangeCB = undefined;
            super.remove();
        }
        /**
         * Creates the data link view.
         * @public
         * @returns {UIDataLinkView} The data link view.
         */
        createView() {
            return new UIDataLinkView(this, this._forceMaximizedState);
        }
        /**
         * Gets the link view.
         * @public
         * @returns {UIDataLinkView} The link view.
         */
        getView() {
            return super.getView();
        }
        /**
         * Gets the link model.
         * @public
         * @returns {DataLink} The link model.
         */
        getModel() {
            return this._model;
        }
        /**
         * Projects the specified JSON object to the link.
         * @public
         * @param {IJSONDataLinkUI} _iJSONLink - The JSON object representing the link.
         */
        // eslint-disable-next-line class-methods-use-this
        fromJSON(_iJSONLink) { }
        /**
         * Projects the link to the specified JSON object.
         * @public
         * @param {IJSONDataLinkUI} oJSONLink - The JSON object representing the link.
         */
        toJSON(oJSONLink) {
            const isStartShortcut = this._startPort instanceof UIShortcutDataPort;
            const isEndShortcut = this._endPort instanceof UIShortcutDataPort;
            if (isStartShortcut || isEndShortcut) {
                oJSONLink.shortcut = {
                    startPort: isStartShortcut ? this._startPort.toPath() : undefined,
                    endPort: isEndShortcut ? this._endPort.toPath() : undefined
                };
            }
        }
        /**
         * Gets the link start port.
         * @public
         * @returns {UIDataPort} The link start port.
         */
        getStartPort() {
            return this._startPort;
        }
        /**
         * Sets the link start port.
         * @public
         * @param {UIDataPort} startPort - The link start port.
         */
        setStartPort(startPort) {
            this._startPort = startPort;
            if (this._startPort instanceof UIShortcutDataPort) {
                const dataPortUI = this._startPort.getParent().getDataPortUI();
                if (dataPortUI !== undefined) {
                    dataPortUI.addShortcutLink();
                }
            }
        }
        /**
         * Gets the link end port.
         * @public
         * @returns {UIDataPort} The link end port.
         */
        getEndPort() {
            return this._endPort;
        }
        /**
         * Sets the link end port.
         * @public
         * @param {UIDataPort} endPort - The link end port.
         */
        setEndPort(endPort) {
            this._endPort = endPort;
            if (this._endPort instanceof UIShortcutDataPort) {
                const dataPortUI = this._endPort.getParent().getDataPortUI();
                if (dataPortUI !== undefined) {
                    dataPortUI.addShortcutLink();
                }
            }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                           ____  ____  _____     ___  _____ _____                               //
        //                          |  _ \|  _ \|_ _\ \   / / \|_   _| ____|                              //
        //                          | |_) | |_) || | \ \ / / _ \ | | |  _|                                //
        //                          |  __/|  _ < | |  \ V / ___ \| | | |___                               //
        //                          |_|   |_| \_\___|  \_/_/   \_\_| |_____|                              //
        //                                                                                                //
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /**
         * The callback on the data link cast level change event.
         * @private
         */
        _onCastLevelChange() {
            this.getView().onCastLevelChange();
        }
    }
    return UIDataLink;
});
