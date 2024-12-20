/* global WUXDockAreaEnum */
/// <amd-module name='DS/EPSSchematicsUI/EPSSchematicsUIEditor'/>
define("DS/EPSSchematicsUI/EPSSchematicsUIEditor", ["require", "exports", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIBreakpointController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIDebugConsoleController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIDebugController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIHistoryController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIKeyboardController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUILocalStorageController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUISessionStorageController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIPanelStateController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUITraceController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIBlockStateController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUITypeLibraryController", "DS/EPSSchematicsUI/controllers/EPSSchematicsUIViewerController", "DS/EPSSchematicsUI/components/EPSSchematicsUITabViewSwitcher", "DS/EPSSchematicsUI/libraries/EPSSchematicsUITypesCatalog", "DS/EPSSchematicsUI/components/EPSSchematicsUIFileDropper", "DS/EPSSchematicsUI/tools/EPSSchematicsUIDom", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "DS/EPSSchematicsUI/EPSSchematicsUIEnums", "DS/EPSSchematicsUI/panels/EPSSchematicsUIBlockLibraryPanel", "DS/EPSSchematicsUI/panels/EPSSchematicsUIDebugConsolePanel", "DS/EPSSchematicsUI/panels/EPSSchematicsUIHistoryPanel", "DS/EPSSchematicsUI/panels/EPSSchematicsUINodeIdSelectorsPanel", "DS/EPSSchematicsUI/panels/EPSSchematicsUIPlayPanel", "DS/EPSSchematicsUI/panels/EPSSchematicsUIWatchPanel", "DS/EPSSchematicsUI/panels/EPSSchematicsUITypeLibraryPanel", "DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary", "DS/EPEventServices/EPEventTarget", "DS/Windows/ImmersiveFrame", "DS/EPSSchematicsUI/typings/WebUX/notifications/EPSWUXNotificationsManagerUXMessages", "DS/EPSSchematicsUI/typings/WebUX/notifications/EPSWUXNotificationsManagerViewOnScreen", "i18n!DS/EPSSchematicsUI/assets/nls/EPSSchematicsUINLS", "text!DS/EPSSchematicsUI/assets/EPSSchematicsUIDefaultGraph.json", "css!DS/EPSSchematicsUI/css/EPSSchematicsUIEditor"], function (require, exports, UIBreakpointController, UIDebugConsoleController, UIDebugController, UIHistoryController, UIKeyboardController, UILocalStorageController, UISessionStorageController, UIPanelStateController, UITraceController, UIBlockStateController, UITypeLibraryController, UIViewerController, UITabViewSwitcher, UITypesCatalog, UIFileDropper, UIDom, UITools, UIEnums, UIBlockLibraryPanel, UIDebugConsolePanel, UIHistoryPanel, UINodeIdSelectorsPanel, UIPlayPanel, UIWatchPanel, UITypeLibraryPanel, BlockLibrary, EventTarget, ImmersiveFrame, WUXNotificationsManagerUXMessages, WUXNotificationsManagerViewOnScreen, UINLS, UIDefaultGraph) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the ExecutionGraph/Schematics editor.
     * @class UIEditor
     * @alias module:DS/EPSSchematicsUI/EPSSchematicsUIEditor
     * @protected
     */
    class UIEditor {
        /**
         * @constructor
         * @param {IEditorOptions} options - The editor options.
         */
        constructor(options) {
            this.eventTarget = new EventTarget();
            this.markHasEdited = false;
            globalThis.EPSDGVPROTO = true;
            this.initializeOptions(options);
            // Create the DOM element
            this.domElement = UIDom.createElement('div', { className: 'epsSchematicsEditor' });
            this.domElement.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; });
            // Append editor on domContainer
            if (this.options.domContainer instanceof HTMLElement) {
                if (this.options.domContainer === document.body) {
                    UIDom.addClassName(document.body, 'epsSchematicsBody');
                    UIDom.addClassName(document.documentElement, 'epsSchematicsBody');
                }
            }
            // Create a default immersive frame
            this.immersiveFrame = this.options.immersiveFrame;
            if (!(this.immersiveFrame instanceof ImmersiveFrame)) {
                this.immersiveFrame = new ImmersiveFrame({
                    identifier: 'EPSSchematicsUI_ImmersiveFrame',
                    reactToPointerEventsFlag: false
                    //_ActionBar_V3: true // Option to change immersive frame look!
                });
                this.immersiveFrame.inject(this.options.domContainer);
            }
            this.immersiveFrame.reactToPointerEventsFlag = false;
            this.immersiveFrame.setContentInBackgroundLayer(this.domElement);
            UIDom.addClassName(this.immersiveFrame.getContent(), 'sch-immersive-frame');
            // Configure the notifications manager
            this.notificationsManager = WUXNotificationsManagerUXMessages;
            this.notificationsViewManager = WUXNotificationsManagerViewOnScreen;
            this.notificationsViewManager.setNotificationManager(this.notificationsManager);
            // Initialize controllers
            this.breakpointController = new UIBreakpointController(this);
            this.debugConsoleController = new UIDebugConsoleController(this);
            this.debugController = new UIDebugController(this);
            this.historyController = new UIHistoryController(this);
            this.keyboardController = new UIKeyboardController(this);
            this.localStorageController = new UILocalStorageController(this);
            this._sessionStorageController = new UISessionStorageController();
            this.typeLibraryController = new UITypeLibraryController(this);
            this.viewerController = this._createViewerController();
            this.traceController = new UITraceController(this);
            this._blockStateController = new UIBlockStateController(this);
            this.typesCatalog = new UITypesCatalog(this);
            this.fileDropper = new UIFileDropper(this);
            // Initialize panels
            this.blockLibraryPanel = new UIBlockLibraryPanel(this);
            this.debugConsolePanel = new UIDebugConsolePanel(this);
            this.historyPanel = new UIHistoryPanel(this);
            this.nodeIdSelectorsPanel = new UINodeIdSelectorsPanel(this);
            this.typeLibraryPanel = new UITypeLibraryPanel(this);
            if (this.options.tabViewMode) {
                this.panelStateController = new UIPanelStateController(this);
                this.tabViewSwitcher = new UITabViewSwitcher(this);
            }
            // Create the play panel
            if (this.options.playCommands !== undefined) {
                this.playPanel = new UIPlayPanel(this);
                this.playPanel.open();
                if (this.options.tabViewMode !== undefined) {
                    this.playPanel.getWUXPanel().visibleFlag = false;
                }
            }
            this.createEditor();
        }
        /**
         * Removes the editor.
         * @public
         */
        remove() {
            if (this.tabViewSwitcher !== undefined) {
                this.tabViewSwitcher.remove();
                this.tabViewSwitcher = undefined;
            }
            this.breakpointController.remove();
            this.breakpointController = undefined;
            this.blockLibraryPanel.remove();
            this.blockLibraryPanel = undefined;
            this.debugConsolePanel.remove();
            this.debugConsolePanel = undefined;
            this.historyPanel.remove();
            this.historyPanel = undefined;
            this.nodeIdSelectorsPanel.remove();
            this.nodeIdSelectorsPanel = undefined;
            this.typeLibraryPanel.remove();
            this.typeLibraryPanel = undefined;
            if (this.playPanel !== undefined) {
                this.playPanel.remove();
                this.playPanel = undefined;
            }
            if (this._watchPanel !== undefined) {
                this._watchPanel.remove();
                this._watchPanel = undefined;
            }
            this.typesCatalog.remove();
            this.typesCatalog = undefined;
            this.viewerController.remove();
            this.viewerController = undefined;
            this.debugConsoleController.remove();
            this.debugConsoleController = undefined;
            this.debugController.remove();
            this.debugController = undefined;
            this.historyController.remove();
            this.historyController = undefined;
            this.keyboardController.remove();
            this.keyboardController = undefined;
            this.localStorageController.remove();
            this.localStorageController = undefined;
            this._sessionStorageController.remove();
            this._sessionStorageController = undefined;
            if (this.panelStateController !== undefined) {
                this.panelStateController.remove();
                this.panelStateController = undefined;
            }
            this.traceController.remove();
            this.traceController = undefined;
            this._blockStateController.remove();
            this._blockStateController = undefined;
            this.typeLibraryController.remove();
            this.typeLibraryController = undefined;
            this.fileDropper.remove();
            this.fileDropper = undefined;
            this.notificationsViewManager.removeNotifications();
            this.notificationsViewManager = undefined;
            if (this._isImmersiveFrameCreated()) {
                this.immersiveFrame.remove();
            }
            this.domElement.parentNode.removeChild(this.domElement);
            this.options = undefined;
            this.eventTarget = undefined;
            this.viewer = undefined;
            this.immersiveFrame = undefined;
            this.domElement = undefined;
            this.markHasEdited = undefined;
            this.jsonOriginal = undefined;
        }
        /**
         * Closes the editor.
         * @public
         * @deprecated Use {@link #remove} instead.
         */
        onClose() {
            this.remove();
        }
        /**
         * Gets the editor's current graph model and ui to JSON object.
         * @public
         * @returns {string} The JSON string representing the graph model and ui.
         */
        getContent() {
            if (!this.markHasEdited && this.jsonOriginal !== undefined) {
                return this.jsonOriginal;
            }
            return JSON.stringify(this.viewer.save());
        }
        /**
         * Sets the editor's current graph model and ui from JSON object.
         * @public
         * @param {string} json - The JSON string representing the graph model and ui.
         */
        setContent(json) {
            if (typeof json === 'string') {
                this.debugController.clear();
                this.breakpointController.unregisterAllBreakpoints();
                this.viewerController.removeAllViewers();
                this.jsonOriginal = json;
                this.viewer.load(this.jsonOriginal);
                this.markHasEdited = false;
                this.historyController.registerLoadGraphAction();
            }
        }
        /**
         * Gets the editor immersive frame.
         * @public
         * @returns {ImmersiveFrame} The editor immersive frame.
         */
        getImmersiveFrame() {
            return this.immersiveFrame;
        }
        /**
         * Gets the editor options.
         * @public
         * @returns {IEditorOptions} The editor options.
         */
        getOptions() {
            return this.options;
        }
        /**
         * Gets the editor DOM element.
         * This DOM element can be appended to a DOM container after the editor creation.
         * @public
         * @returns {HTMLDivElement} The DOM element.
         */
        getDomElement() {
            return this.domElement;
        }
        /**
         * Gets the editor graph model.
         * @public
         * @returns {GraphBlock} The editor graph model.
         */
        getGraphModel() {
            return this.viewer.getMainGraph().getModel();
        }
        /**
         * Displays a notification into the editor.
         * @public
         * @param {IWUXNotificationOptions} [options] - Notification display options.
         * @param {string} [options.level] - The level of the notification (info, warning, error or success).
         * @param {string} [options.title] - The title of the notification
         * @param {string} [options.subtitle] - The subtitle of the notification.
         * @param {string} [options.message] - The message to display into the notification.
         */
        displayNotification(options) {
            this.notificationsManager.addNotif({
                level: options.level,
                title: options.title || UINLS.get('notificationSchematicsEditorTitle'),
                subtitle: options.subtitle,
                message: options.message
            });
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
         * Creates the editor.
         * The dependent modules are loaded asynchronously with a require and
         * initialization of the graph is performed afterwards.
         * If no modules are needed the schematics editor will be loaded synchronously.
         * @private
         */
        createEditor() {
            if (this.options.defaultLibrary === true) {
                this.options.modules.push('DS/EPSSchematicsCoreLibrary/EPSSchematicsCoreLibraryDefine');
                this.options.modules.push('DS/EPSSchematicsScriptsLibrary/EPSSchematicsScriptsLibraryDefine');
                this.options.modules.push('DS/EPSSchematicsInputsLibrary/EPSSchematicsInputsLibraryDefine');
            }
            if (this.options.modules.length > 0) {
                // Temporary fix to load block documentation icon by default!
                const initCB = this.initializeEditor.bind(this);
                require(this.options.modules, function () {
                    BlockLibrary.loadDocumentation(initCB);
                }, () => {
                    BlockLibrary.loadDocumentation(initCB);
                    this.displayNotification({
                        level: 'error',
                        title: UINLS.get('notificationLoadingBlockTitleError'),
                        message: UINLS.get('notificationLoadingBlockError')
                    });
                });
            }
            else {
                this.initializeEditor();
            }
        }
        /**
         * Initializes the editor synchronously.
         * @protected
         */
        initializeEditor() {
            this.viewer = this.viewerController.createRootViewer();
            if (this.options.json) {
                this.jsonOriginal = this.options.json;
                this.viewer.load(this.jsonOriginal);
            }
            else {
                this.viewer.loadDefaultGraph();
            }
            const interval = setInterval(() => {
                if (this.typesCatalog.isReady()) {
                    clearInterval(interval);
                    if (this.options.onInitialized) {
                        this.options.onInitialized(this);
                    }
                    if (this.historyController) {
                        this.historyController.registerCreateNewGraphAction();
                    }
                }
            }, 100);
            // Create the watch panel
            if (this.options.watchPanel !== undefined) {
                this._watchPanel = new UIWatchPanel(this);
                this._watchPanel.open();
                if (this.options.tabViewMode !== undefined) {
                    this._watchPanel.getWUXPanel().visibleFlag = false;
                }
            }
            if (this.panelStateController !== undefined) {
                this.panelStateController.initialize();
            }
            if (this.tabViewSwitcher !== undefined) {
                this.tabViewSwitcher.setEditActiveTab();
            }
            /*
            const MySuperColor = {
                r: { type: 'Integer', mandatory: true, defaultValue: 0 },
                g: { type: 'Integer', mandatory: true, defaultValue: 0 },
                b: { type: 'Integer', mandatory: true, defaultValue: 0 },
                a: { type: 'Integer', mandatory: true, defaultValue: 0 }
            };
            const MySuperVector3D = {
                x: { type: 'Integer', mandatory: true, defaultValue: 0 },
                y: { type: 'Integer', mandatory: true, defaultValue: 0 },
                z: { type: 'Integer', mandatory: true, defaultValue: 0 }
            };
            const MySuperObject = {
                color: { type: 'MySuperColor', mandatory: true, defaultValue: { r: 128, g: 255, b: 0, a: 99 } },
                vector: { type: 'MySuperVector3D', mandatory: true, defaultValue: { x: 1, y: 2, z: 3 } },
                objectFilled: { type: 'Object', mandatory: true, defaultValue: undefined },
                objectEmpty: { type: 'Object', mandatory: true, defaultValue: undefined },
                arrayDouble: { type: 'Array<Double>', mandatory: true, defaultValue: [] }
            };
            const MySuperActor = {
                name: { type: 'String', mandatory: true, defaultValue: '' },
                isActive: { type: 'Boolean', mandatory: true, defaultValue: true },
                power: { type: 'Double', mandatory: true, defaultValue: 0.0 },
                obj: { type: 'MySuperObject', mandatory: true, defaultValue: undefined },
                arrayBool: { type: 'Array<Boolean>', mandatory: true, defaultValue: [] },
                arrayVector: { type: 'Array<MySuperVector3D>', mandatory: true, defaultValue: [] }
            };
            const MySuperArray = {
                arrayDouble: { type: 'Array<Double>', mandatory: true, defaultValue: [] }
            };
            class MyClassType {
                public boolean = false;
                public double = 0.0;
                public integer = 0;
                public string = '';
            }
            var MyClassDesc = {
                'boolean': { type: 'Boolean', mandatory: true, defaultValue: false },
                'double': { type: 'Double', mandatory: true, defaultValue: 0.0 },
                integer: { type: 'Integer', mandatory: true, defaultValue: 0 },
                object: { type: 'Object', mandatory: false },
                string: { type: 'String', mandatory: true, defaultValue: '' },
                array: { type: 'Array', mandatory: false },
                arrayBoolean: { type: 'Array<Boolean>', mandatory: false },
                arrayDouble: { type: 'Array<Double>', mandatory: false },
                arrayInteger: { type: 'Array<Integer>', mandatory: false },
                arrayObject: { type: 'Array<Object>', mandatory: false },
                arrayString: { type: 'Array<String>', mandatory: false },
                arrayArray: { type: 'Array<Array>', mandatory: false }
            };
    
            const TypeLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary');
            TypeLibrary.registerGlobalClassType('MyClassType', MyClassType, MyClassDesc);
    
            //TypeLibrary.registerGlobalObjectType('MySuperColor', MySuperColor);
            TypeLibrary.registerLocalCustomObjectType(this.viewer.getMainGraph().getModel().getGraphContext(), 'MySuperColor', MySuperColor);
            TypeLibrary.registerLocalCustomObjectType(this.viewer.getMainGraph().getModel().getGraphContext(), 'MySuperVector3D', MySuperVector3D);
            TypeLibrary.registerLocalCustomObjectType(this.viewer.getMainGraph().getModel().getGraphContext(), 'MySuperObject', MySuperObject);
            TypeLibrary.registerLocalCustomObjectType(this.viewer.getMainGraph().getModel().getGraphContext(), 'MySuperActor', MySuperActor);
            TypeLibrary.registerLocalCustomObjectType(this.viewer.getMainGraph().getModel().getGraphContext(), 'MySuperArray', MySuperArray);*/
            /*const TypeLibrary = require('DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary');
            TypeLibrary.registerAdvancedTypes();*/
        }
        /**
         * Initializes the editor options default values.
         * @param {IEditorOptions} options - The options of the editor.
         * @private
         */
        initializeOptions(options) {
            this.options = (typeof options === 'object' && options !== null) ? options : {};
            this.options.json = (typeof options.json === 'string' && options.json !== '') ? options.json : undefined;
            this.options.modules = Array.isArray(options.modules) ? options.modules : [];
            this.options.defaultJSONGraph = UITools.getOptionValue(options.defaultJSONGraph, UIDefaultGraph);
            this.options.defaultLibrary = UITools.getOptionValue(options.defaultLibrary, true);
            this.options.traceMode = UITools.getOptionValue(options.traceMode, true);
            this.options.gridSnapping = UITools.getOptionValue(options.gridSnapping, true);
            this.options.onInitialized = (typeof options.onInitialized === 'function') ? options.onInitialized : undefined;
            this.options.templates = options.templates || {};
            this.options.templates = {
                enableLocalTemplates: UITools.getOptionValue(options.templates.enableLocalTemplates, true),
                enableGlobalTemplates: UITools.getOptionValue(options.templates.enableGlobalTemplates, true)
            };
            this.options.enableFramebreaks = UITools.getOptionValue(options.enableFramebreaks, true);
            this.options.hideOutputLocalDataDrawer = UITools.getOptionValue(options.hideOutputLocalDataDrawer, false);
            this.options.blockLibraryDockArea = UITools.getOptionValue(options.blockLibraryDockArea, WUXDockAreaEnum.LeftDockArea);
            this.options.debugConsoleDockArea = UITools.getOptionValue(options.debugConsoleDockArea, WUXDockAreaEnum.BottomDockArea);
            this.options.historyDockArea = UITools.getOptionValue(options.historyDockArea, WUXDockAreaEnum.LeftDockArea);
            this.options.typeLibraryDockArea = UITools.getOptionValue(options.typeLibraryDockArea, WUXDockAreaEnum.LeftDockArea);
            this.options.hideDefaultGraph = UITools.getOptionValue(options.hideDefaultGraph, false);
            this.options.rootInputDataDefaultValueSettable = UITools.getOptionValue(options.rootInputDataDefaultValueSettable, true);
            this.options.hideGraphToolbarButton = UITools.getOptionValue(options.hideGraphToolbarButton, 0 /* UIEnums.FGraphToolbarButton.fNone */);
            this.options.expandGraphToolbarButton = UITools.getOptionValue(options.expandGraphToolbarButton, 0 /* UIEnums.FGraphToolbarButton.fNone */);
        }
        /**
         * Creates the new viewController.
         * @protected
         * @returns {UIViewerController} The viewerController to be instantiated
         */
        _createViewerController() {
            return new UIViewerController(this);
        }
        /**
         * Sets the editor graph model.
         * @private
         * @param {GraphBlock} model - The graph model.
         * @param {IJSONGraphUI} [modelUI] - The graph model UI.
         * @returns {UIGraph} The created graph.
         */
        setGraphModel(model, modelUI) {
            return this.viewer.createGraph(model, modelUI);
        }
        /**
         * Gets the editor viewer.
         * @private
         * @returns {UIViewer} The editor viewer.
         */
        _getViewer() {
            return this.viewer;
        }
        /**
         * Gets the breakpoint controller.
         * @private
         * @returns {UIBreakpointController} The breakpoint controller.
         */
        getBreakpointController() {
            return this.breakpointController;
        }
        /**
         * Gets the debug console controller.
         * @private
         * @returns {UIDebugConsoleController} The debug console controller.
         */
        getDebugConsoleController() {
            return this.debugConsoleController;
        }
        /**
         * Gets the debug controller.
         * @private
         * @returns {UIDebugController} The debug controller.
         */
        getDebugController() {
            return this.debugController;
        }
        /**
         * Gets the history controller.
         * @private
         * @returns {UIHistoryController} The history controller.
         */
        getHistoryController() {
            return this.historyController;
        }
        /**
         * Gets the keyboard controller.
         * @private
         * @returns {UIKeyboardController} The keyboard controller.
         */
        getKeyboardController() {
            return this.keyboardController;
        }
        /**
         * Gets the local storage controller.
         * @private
         * @returns {UILocalStorageController} The local storage controller.
         */
        getLocalStorageController() {
            return this.localStorageController;
        }
        /**
         * Gets the session storage controller.
         * @private
         * @returns {UISessionStorageController} The session storage controller.
         */
        getSessionStorageController() {
            return this._sessionStorageController;
        }
        /**
         * Gets the panel state controller.
         * @private
         * @returns {UIPanelStateController} The panel state controller.
         */
        getPanelStateController() {
            return this.panelStateController;
        }
        /**
          * Gets the trace controller.
         * @private
          * @returns {UITraceController} The trace controller.
          */
        getTraceController() {
            return this.traceController;
        }
        /**
         * Gets the type library controller.
         * @private
         * @returns {UITypeLibraryController} The type library controller.
         */
        getTypeLibraryController() {
            return this.typeLibraryController;
        }
        /**
         * Gets the viewer controller.
         * @private
         * @returns {UIViewerController} The viewer controller.
         */
        getViewerController() {
            return this.viewerController;
        }
        /**
         * Gets the types catalog.
         * @private
         * @returns {UITypesCatalog} The types catalog.
         */
        getTypesCatalog() {
            return this.typesCatalog;
        }
        /**
         * Gets the block library panel.
         * @private
         * @returns {UIBlockLibraryPanel} The block library panel.
         */
        getBlockLibraryPanel() {
            return this.blockLibraryPanel;
        }
        /**
         * Gets the debug console panel.
         * @private
         * @returns {UIDebugConsolePanel} The debug console panel.
         */
        getDebugConsolePanel() {
            return this.debugConsolePanel;
        }
        /**
         * Gets the history panel.
         * @private
         * @returns {UIHistoryPanel} The history panel.
         */
        getHistoryPanel() {
            return this.historyPanel;
        }
        /**
         * Gets the nodeId selectors panel.
         * @private
         * @returns {UINodeIdSelectorsPanel} The nodeId selectors panel.
         */
        getNodeIdSelectorsPanel() {
            return this.nodeIdSelectorsPanel;
        }
        /**
         * Gets the play panel.
         * @private
         * @returns {UIPlayPanel} The play panel.
         */
        getPlayPanel() {
            return this.playPanel;
        }
        /**
         * Gets the watch panel.
         * @private
         * @returns {UIWatchPanel} The watch panel.
         */
        getWatchPanel() {
            return this._watchPanel;
        }
        /**
         * Gets the type library panel.
         * @private
         * @returns {UITypeLibraryPanel} The type library panel.
         */
        getTypeLibraryPanel() {
            return this.typeLibraryPanel;
        }
        /**
         * Gets the file dropper.
         * @private
         * @returns {UIFileDropper} The file dropper.
         */
        getFileDropper() {
            return this.fileDropper;
        }
        /**
         * Gets the notification manager.
         * @private
         * @returns {WUXNotificationsManagerUXMessages} The notification manager.
         */
        _getNotificationsManager() {
            return this.notificationsManager;
        }
        /**
         * Gets the tab view switcher.
         * @private
         * @returns {UITabViewSwitcher} The tab view switcher.
         */
        _getTabViewSwitcher() {
            return this.tabViewSwitcher;
        }
        /**
         * Displays a message into the debug console.
         * @private
         * @param {ModelEnums.ESeverity} severity - The severity of the message.
         * @param {string|string[]} message - The message.
         */
        displayDebugConsoleMessage(severity, message) {
            this.debugConsoleController.displayMessage(UIEnums.EMessageOrigin.eApplication, severity, new Date(), message);
        }
        /**
         * Adds an event listener.
         * @private
         * @param {EPEvent} iEventCtor - The event constructor.
         * @param {Function} iListener - The callback function.
         */
        addListener(iEventCtor, iListener) {
            this.eventTarget.addListener(iEventCtor, iListener);
        }
        /**
         * Removes an event listener.
         * @private
         * @param {EPEvent} iEventCtor - The event constructor.
         * @param {Function} iListener - The callback function.
         */
        removeListener(iEventCtor, iListener) {
            this.eventTarget.removeListener(iEventCtor, iListener);
        }
        /**
         * Dispatches the event.
         * @private
         * @param {EPEvent} iEvent - The event.
         */
        dispatchEvent(iEvent) {
            this.eventTarget.dispatchEvent(iEvent);
        }
        /**
         * Injects data block into the editor at a specified drop position.
         * @private
         * @param {Object} data - The data block structure to be injected into the editor.
         * @param {DragEvent} dropInfo - The drop info specifying the position.
         */
        injectData(data, dropInfo) {
            if (data !== undefined && data.uid !== undefined) {
                const viewer = this.viewerController.getCurrentViewer();
                const position = viewer.clientToViewpoint(dropInfo.clientX, dropInfo.clientY);
                const block = viewer.getMainGraph().createBlock(data.uid, position[0], position[1]);
                block.automaticExpandDataPorts();
            }
        }
        /**
         * The callback on the editor change event.
         * @private
         */
        onChange() {
            if (!this.viewer.isLoading()) {
                this.markHasEdited = true;
                this.typeLibraryController.updateOccurenceCount();
                if (this.options.onChange) {
                    this.options.onChange();
                }
            }
        }
        /**
         * Checks if the breakpoints are enabled.
         * @private
         * @returns {boolean} True if the breakpoints are enabled, false otherwise.
         */
        _areBreakpointsEnabled() {
            return this.options.playCommands !== undefined && this.options.playCommands.callbacks !== undefined &&
                this.options.playCommands.callbacks.onBreakpointsChange !== undefined;
        }
        /**
         * Checks if an immersive frame hase been created by the editor.
         * @private
         * @returns {boolean} True if an immersive frame has been created by the editor, false otherwise.
         */
        _isImmersiveFrameCreated() {
            return !(this.options.immersiveFrame instanceof ImmersiveFrame);
        }
    }
    return UIEditor;
});
