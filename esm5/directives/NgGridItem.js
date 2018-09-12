/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgGrid } from './NgGrid';
import { Directive, ElementRef, Renderer2, EventEmitter, KeyValueDiffers, ViewContainerRef, Output } from '@angular/core';
var NgGridItem = /** @class */ (function () {
    // Constructor
    function NgGridItem(_differs, _ngEl, _renderer, _ngGrid, containerRef) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        this._ngGrid = _ngGrid;
        this.containerRef = containerRef;
        // Event Emitters
        this.onItemChange = new EventEmitter(false);
        this.onDragStart = new EventEmitter();
        this.onDrag = new EventEmitter();
        this.onDragStop = new EventEmitter();
        this.onDragAny = new EventEmitter();
        this.onResizeStart = new EventEmitter();
        this.onResize = new EventEmitter();
        this.onResizeStop = new EventEmitter();
        this.onResizeAny = new EventEmitter();
        this.onChangeStart = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onChangeStop = new EventEmitter();
        this.onChangeAny = new EventEmitter();
        this.ngGridItemChange = new EventEmitter();
        this.isFixed = false;
        this.isDraggable = true;
        this.isResizable = true;
        this.minWidth = 0;
        this.minHeight = 0;
        this.uid = null;
        this._currentPosition = { col: 1, row: 1 };
        this._size = { x: 1, y: 1 };
        this._config = NgGridItem.CONST_DEFAULT_CONFIG;
        this._userConfig = null;
        this._added = false;
        this._maxCols = 0;
        this._minCols = 0;
        this._maxRows = 0;
        this._minRows = 0;
        this._resizeDirections = [];
        this._zIndex = 0;
    }
    Object.defineProperty(NgGridItem.prototype, "zIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._zIndex;
        },
        set: /**
         * @param {?} zIndex
         * @return {?}
         */
        function (zIndex) {
            this._renderer.setStyle(this._ngEl.nativeElement, 'z-index', zIndex.toString());
            this._zIndex = zIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgGridItem.prototype, "config", {
        // [ng-grid-item] handler
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._userConfig = v;
            var /** @type {?} */ configObject = Object.assign({}, NgGridItem.CONST_DEFAULT_CONFIG, v);
            for (var /** @type {?} */ x in NgGridItem.CONST_DEFAULT_CONFIG)
                if (configObject[x] == null)
                    configObject[x] = NgGridItem.CONST_DEFAULT_CONFIG[x];
            this.setConfig(configObject);
            if (this._userConfig != null) {
                if (this._differ == null) {
                    this._differ = this._differs.find(this._userConfig).create();
                }
                this._differ.diff(this._userConfig);
            }
            if (!this._added) {
                this._added = true;
                this._ngGrid.addItem(this);
            }
            this._recalculateDimensions();
            this._recalculatePosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgGridItem.prototype, "sizex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgGridItem.prototype, "sizey", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgGridItem.prototype, "col", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentPosition.col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgGridItem.prototype, "row", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentPosition.row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgGridItem.prototype, "currentCol", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentPosition.col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgGridItem.prototype, "currentRow", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentPosition.row;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgGridItem.prototype.onResizeStartEvent = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = this.getEventOutput();
        this.onResizeStart.emit(event);
        this.onResizeAny.emit(event);
        this.onChangeStart.emit(event);
        this.onChangeAny.emit(event);
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.onResizeEvent = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = this.getEventOutput();
        this.onResize.emit(event);
        this.onResizeAny.emit(event);
        this.onChange.emit(event);
        this.onChangeAny.emit(event);
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.onResizeStopEvent = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = this.getEventOutput();
        this.onResizeStop.emit(event);
        this.onResizeAny.emit(event);
        this.onChangeStop.emit(event);
        this.onChangeAny.emit(event);
        this.onConfigChangeEvent();
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.onDragStartEvent = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = this.getEventOutput();
        this.onDragStart.emit(event);
        this.onDragAny.emit(event);
        this.onChangeStart.emit(event);
        this.onChangeAny.emit(event);
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.onDragEvent = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = this.getEventOutput();
        this.onDrag.emit(event);
        this.onDragAny.emit(event);
        this.onChange.emit(event);
        this.onChangeAny.emit(event);
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.onDragStopEvent = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = this.getEventOutput();
        this.onDragStop.emit(event);
        this.onDragAny.emit(event);
        this.onChangeStop.emit(event);
        this.onChangeAny.emit(event);
        this.onConfigChangeEvent();
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.onCascadeEvent = /**
     * @return {?}
     */
    function () {
        this.onConfigChangeEvent();
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._renderer.addClass(this._ngEl.nativeElement, 'grid-item');
        if (this._ngGrid.autoStyle)
            this._renderer.setStyle(this._ngEl.nativeElement, 'position', 'absolute');
        this._recalculateDimensions();
        this._recalculatePosition();
        // Force a config update in case there is no config assigned
        this.config = this._userConfig;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGridItem.prototype.canDrag = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.isDraggable)
            return false;
        if (this._dragHandle) {
            return this.findHandle(this._dragHandle, e.target);
        }
        return true;
    };
    /**
     * @param {?} handleSelector
     * @param {?} startElement
     * @return {?}
     */
    NgGridItem.prototype.findHandle = /**
     * @param {?} handleSelector
     * @param {?} startElement
     * @return {?}
     */
    function (handleSelector, startElement) {
        try {
            var /** @type {?} */ targetElem = startElement;
            while (targetElem && targetElem != this._ngEl.nativeElement) {
                if (this.elementMatches(targetElem, handleSelector))
                    return true;
                targetElem = targetElem.parentElement;
            }
        }
        catch (/** @type {?} */ err) { }
        return false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGridItem.prototype.canResize = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.isResizable)
            return null;
        if (this._resizeHandle) {
            if (typeof this._resizeHandle === 'string') {
                return this.findHandle(this._resizeHandle, e.target) ? 'bottomright' : null;
            }
            if (typeof this._resizeHandle !== 'object')
                return null;
            var /** @type {?} */ resizeDirections = ['bottomright', 'bottomleft', 'topright', 'topleft', 'right', 'left', 'bottom', 'top'];
            try {
                for (var resizeDirections_1 = tslib_1.__values(resizeDirections), resizeDirections_1_1 = resizeDirections_1.next(); !resizeDirections_1_1.done; resizeDirections_1_1 = resizeDirections_1.next()) {
                    var direction = resizeDirections_1_1.value;
                    if (direction in this._resizeHandle) {
                        if (this.findHandle(this._resizeHandle[direction], e.target)) {
                            return direction;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (resizeDirections_1_1 && !resizeDirections_1_1.done && (_a = resizeDirections_1.return)) _a.call(resizeDirections_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return null;
        }
        if (this._borderSize <= 0)
            return null;
        var /** @type {?} */ mousePos = this._getMousePosition(e);
        try {
            for (var _b = tslib_1.__values(this._resizeDirections), _c = _b.next(); !_c.done; _c = _b.next()) {
                var direction = _c.value;
                if (this.canResizeInDirection(direction, mousePos)) {
                    return direction;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return null;
        var e_1, _a, e_2, _d;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGridItem.prototype.onMouseMove = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this._ngGrid.autoStyle) {
            if (this._ngGrid.resizeEnable) {
                var /** @type {?} */ resizeDirection = this.canResize(e);
                var /** @type {?} */ cursor = 'default';
                switch (resizeDirection) {
                    case 'bottomright':
                    case 'topleft':
                        cursor = 'nwse-resize';
                        break;
                    case 'topright':
                    case 'bottomleft':
                        cursor = 'nesw-resize';
                        break;
                    case 'top':
                    case 'bottom':
                        cursor = 'ns-resize';
                        break;
                    case 'left':
                    case 'right':
                        cursor = 'ew-resize';
                        break;
                    default:
                        if (this._ngGrid.dragEnable && this.canDrag(e)) {
                            cursor = 'move';
                        }
                        break;
                }
                this._renderer.setStyle(this._ngEl.nativeElement, 'cursor', cursor);
            }
            else if (this._ngGrid.dragEnable && this.canDrag(e)) {
                this._renderer.setStyle(this._ngEl.nativeElement, 'cursor', 'move');
            }
            else {
                this._renderer.setStyle(this._ngEl.nativeElement, 'cursor', 'default');
            }
        }
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._added)
            this._ngGrid.removeItem(this);
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.getElement = /**
     * @return {?}
     */
    function () {
        return this._ngEl;
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.getDragHandle = /**
     * @return {?}
     */
    function () {
        return this._dragHandle;
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.getResizeHandle = /**
     * @return {?}
     */
    function () {
        return this._resizeHandle;
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.getDimensions = /**
     * @return {?}
     */
    function () {
        return { 'width': this._elemWidth, 'height': this._elemHeight };
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.getSize = /**
     * @return {?}
     */
    function () {
        return this._size;
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.getPosition = /**
     * @return {?}
     */
    function () {
        return { 'left': this._elemLeft, 'top': this._elemTop };
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.getGridPosition = /**
     * @return {?}
     */
    function () {
        return this._currentPosition;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    NgGridItem.prototype.setConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this._config = config;
        this._payload = config.payload;
        this._currentPosition.col = config.col ? config.col : NgGridItem.CONST_DEFAULT_CONFIG.col;
        this._currentPosition.row = config.row ? config.row : NgGridItem.CONST_DEFAULT_CONFIG.row;
        this._size.x = config.sizex ? config.sizex : NgGridItem.CONST_DEFAULT_CONFIG.sizex;
        this._size.y = config.sizey ? config.sizey : NgGridItem.CONST_DEFAULT_CONFIG.sizey;
        this._dragHandle = config.dragHandle;
        this._resizeHandle = config.resizeHandle;
        this._borderSize = config.borderSize;
        this.isDraggable = config.draggable ? true : false;
        this.isResizable = config.resizable ? true : false;
        this.isFixed = config.fixed ? true : false;
        this._resizeDirections = config.resizeDirections || this._ngGrid.resizeDirections;
        this._maxCols = !isNaN(config.maxCols) && isFinite(config.maxCols) ? config.maxCols : 0;
        this._minCols = !isNaN(config.minCols) && isFinite(config.minCols) ? config.minCols : 0;
        this._maxRows = !isNaN(config.maxRows) && isFinite(config.maxRows) ? config.maxRows : 0;
        this._minRows = !isNaN(config.minRows) && isFinite(config.minRows) ? config.minRows : 0;
        this.minWidth = !isNaN(config.minWidth) && isFinite(config.minWidth) ? config.minWidth : 0;
        this.minHeight = !isNaN(config.minHeight) && isFinite(config.minHeight) ? config.minHeight : 0;
        if (this._minCols > 0 && this._maxCols > 0 && this._minCols > this._maxCols)
            this._minCols = 0;
        if (this._minRows > 0 && this._maxRows > 0 && this._minRows > this._maxRows)
            this._minRows = 0;
        if (this._added) {
            this._ngGrid.updateItem(this);
        }
        this._size = this.fixResize(this._size);
        this._recalculatePosition();
        this._recalculateDimensions();
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this._differ != null) {
            var /** @type {?} */ changes = this._differ.diff(this._userConfig);
            if (changes != null) {
                return this._applyChanges(changes);
            }
        }
        return false;
    };
    /**
     * @param {?} newSize
     * @param {?=} update
     * @return {?}
     */
    NgGridItem.prototype.setSize = /**
     * @param {?} newSize
     * @param {?=} update
     * @return {?}
     */
    function (newSize, update) {
        if (update === void 0) { update = true; }
        newSize = this.fixResize(newSize);
        this._size = newSize;
        if (update)
            this._recalculateDimensions();
        this.onItemChange.emit(this.getEventOutput());
    };
    /**
     * @param {?} gridPosition
     * @param {?=} update
     * @return {?}
     */
    NgGridItem.prototype.setGridPosition = /**
     * @param {?} gridPosition
     * @param {?=} update
     * @return {?}
     */
    function (gridPosition, update) {
        if (update === void 0) { update = true; }
        this._currentPosition = gridPosition;
        if (update)
            this._recalculatePosition();
        this.onItemChange.emit(this.getEventOutput());
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.getEventOutput = /**
     * @return {?}
     */
    function () {
        return /** @type {?} */ ({
            uid: this.uid,
            payload: this._payload,
            col: this._currentPosition.col,
            row: this._currentPosition.row,
            sizex: this._size.x,
            sizey: this._size.y,
            width: this._elemWidth,
            height: this._elemHeight,
            left: this._elemLeft,
            top: this._elemTop
        });
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    NgGridItem.prototype.setPosition = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        switch (this._cascadeMode) {
            case 'up':
            case 'left':
            default:
                this._renderer.setStyle(this._ngEl.nativeElement, 'left', x + 'px');
                this._renderer.setStyle(this._ngEl.nativeElement, 'top', y + 'px');
                break;
            case 'right':
                this._renderer.setStyle(this._ngEl.nativeElement, 'right', x + 'px');
                this._renderer.setStyle(this._ngEl.nativeElement, 'top', y + 'px');
                break;
            case 'down':
                this._renderer.setStyle(this._ngEl.nativeElement, 'left', x + 'px');
                this._renderer.setStyle(this._ngEl.nativeElement, 'bottom', y + 'px');
                break;
        }
        this._elemLeft = x;
        this._elemTop = y;
    };
    /**
     * @param {?} cascade
     * @return {?}
     */
    NgGridItem.prototype.setCascadeMode = /**
     * @param {?} cascade
     * @return {?}
     */
    function (cascade) {
        this._cascadeMode = cascade;
        switch (cascade) {
            case 'up':
            case 'left':
            default:
                this._renderer.setStyle(this._ngEl.nativeElement, 'left', this._elemLeft + 'px');
                this._renderer.setStyle(this._ngEl.nativeElement, 'top', this._elemTop + 'px');
                this._renderer.setStyle(this._ngEl.nativeElement, 'right', null);
                this._renderer.setStyle(this._ngEl.nativeElement, 'bottom', null);
                break;
            case 'right':
                this._renderer.setStyle(this._ngEl.nativeElement, 'right', this._elemLeft + 'px');
                this._renderer.setStyle(this._ngEl.nativeElement, 'top', this._elemTop + 'px');
                this._renderer.setStyle(this._ngEl.nativeElement, 'left', null);
                this._renderer.setStyle(this._ngEl.nativeElement, 'bottom', null);
                break;
            case 'down':
                this._renderer.setStyle(this._ngEl.nativeElement, 'left', this._elemLeft + 'px');
                this._renderer.setStyle(this._ngEl.nativeElement, 'bottom', this._elemTop + 'px');
                this._renderer.setStyle(this._ngEl.nativeElement, 'right', null);
                this._renderer.setStyle(this._ngEl.nativeElement, 'top', null);
                break;
        }
    };
    /**
     * @param {?} w
     * @param {?} h
     * @return {?}
     */
    NgGridItem.prototype.setDimensions = /**
     * @param {?} w
     * @param {?} h
     * @return {?}
     */
    function (w, h) {
        if (w < this.minWidth)
            w = this.minWidth;
        if (h < this.minHeight)
            h = this.minHeight;
        this._renderer.setStyle(this._ngEl.nativeElement, 'width', w + 'px');
        this._renderer.setStyle(this._ngEl.nativeElement, 'height', h + 'px');
        this._elemWidth = w;
        this._elemHeight = h;
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.startMoving = /**
     * @return {?}
     */
    function () {
        this._renderer.addClass(this._ngEl.nativeElement, 'moving');
        var /** @type {?} */ style = window.getComputedStyle(this._ngEl.nativeElement);
        if (this._ngGrid.autoStyle)
            this._renderer.setStyle(this._ngEl.nativeElement, 'z-index', (parseInt(style.getPropertyValue('z-index')) + 1).toString());
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.stopMoving = /**
     * @return {?}
     */
    function () {
        this._renderer.removeClass(this._ngEl.nativeElement, 'moving');
        var /** @type {?} */ style = window.getComputedStyle(this._ngEl.nativeElement);
        if (this._ngGrid.autoStyle)
            this._renderer.setStyle(this._ngEl.nativeElement, 'z-index', (parseInt(style.getPropertyValue('z-index')) - 1).toString());
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.recalculateSelf = /**
     * @return {?}
     */
    function () {
        this._recalculatePosition();
        this._recalculateDimensions();
    };
    /**
     * @param {?} newSize
     * @return {?}
     */
    NgGridItem.prototype.fixResize = /**
     * @param {?} newSize
     * @return {?}
     */
    function (newSize) {
        if (this._maxCols > 0 && newSize.x > this._maxCols)
            newSize.x = this._maxCols;
        if (this._maxRows > 0 && newSize.y > this._maxRows)
            newSize.y = this._maxRows;
        if (this._minCols > 0 && newSize.x < this._minCols)
            newSize.x = this._minCols;
        if (this._minRows > 0 && newSize.y < this._minRows)
            newSize.y = this._minRows;
        var /** @type {?} */ itemWidth = (newSize.x * this._ngGrid.colWidth) + ((this._ngGrid.marginLeft + this._ngGrid.marginRight) * (newSize.x - 1));
        if (itemWidth < this.minWidth)
            newSize.x = Math.ceil((this.minWidth + this._ngGrid.marginRight + this._ngGrid.marginLeft) / (this._ngGrid.colWidth + this._ngGrid.marginRight + this._ngGrid.marginLeft));
        var /** @type {?} */ itemHeight = (newSize.y * this._ngGrid.rowHeight) + ((this._ngGrid.marginTop + this._ngGrid.marginBottom) * (newSize.y - 1));
        if (itemHeight < this.minHeight)
            newSize.y = Math.ceil((this.minHeight + this._ngGrid.marginBottom + this._ngGrid.marginTop) / (this._ngGrid.rowHeight + this._ngGrid.marginBottom + this._ngGrid.marginTop));
        return newSize;
    };
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    NgGridItem.prototype.elementMatches = /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    function (element, selector) {
        if (!element)
            return false;
        if (element.matches)
            return element.matches(selector);
        if (element.oMatchesSelector)
            return element.oMatchesSelector(selector);
        if (element.msMatchesSelector)
            return element.msMatchesSelector(selector);
        if (element.mozMatchesSelector)
            return element.mozMatchesSelector(selector);
        if (element.webkitMatchesSelector)
            return element.webkitMatchesSelector(selector);
        if (!element.document || !element.ownerDocument)
            return false;
        var /** @type {?} */ matches = (element.document || element.ownerDocument).querySelectorAll(selector);
        var /** @type {?} */ i = matches.length;
        while (--i >= 0 && matches.item(i) !== element) { }
        return i > -1;
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype._recalculatePosition = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ x = (this._ngGrid.colWidth + this._ngGrid.marginLeft + this._ngGrid.marginRight) * (this._currentPosition.col - 1) + this._ngGrid.marginLeft + this._ngGrid.screenMargin;
        var /** @type {?} */ y = (this._ngGrid.rowHeight + this._ngGrid.marginTop + this._ngGrid.marginBottom) * (this._currentPosition.row - 1) + this._ngGrid.marginTop;
        this.setPosition(x, y);
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype._recalculateDimensions = /**
     * @return {?}
     */
    function () {
        if (this._size.x < this._ngGrid.minCols)
            this._size.x = this._ngGrid.minCols;
        if (this._size.y < this._ngGrid.minRows)
            this._size.y = this._ngGrid.minRows;
        var /** @type {?} */ newWidth = (this._ngGrid.colWidth * this._size.x) + ((this._ngGrid.marginLeft + this._ngGrid.marginRight) * (this._size.x - 1));
        var /** @type {?} */ newHeight = (this._ngGrid.rowHeight * this._size.y) + ((this._ngGrid.marginTop + this._ngGrid.marginBottom) * (this._size.y - 1));
        var /** @type {?} */ w = Math.max(this.minWidth, this._ngGrid.minWidth, newWidth);
        var /** @type {?} */ h = Math.max(this.minHeight, this._ngGrid.minHeight, newHeight);
        this.setDimensions(w, h);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGridItem.prototype._getMousePosition = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.originalEvent && e.originalEvent.touches) {
            var /** @type {?} */ oe = e.originalEvent;
            e = oe.touches.length ? oe.touches[0] : (oe.changedTouches.length ? oe.changedTouches[0] : e);
        }
        else if (e.touches) {
            e = e.touches.length ? e.touches[0] : (e.changedTouches.length ? e.changedTouches[0] : e);
        }
        var /** @type {?} */ refPos = this._ngEl.nativeElement.getBoundingClientRect();
        return {
            left: e.clientX - refPos.left,
            top: e.clientY - refPos.top
        };
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgGridItem.prototype._applyChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        var /** @type {?} */ changed = false;
        var /** @type {?} */ changeCheck = function (record) {
            if (_this._config[record.key] !== record.currentValue) {
                _this._config[record.key] = record.currentValue;
                changed = true;
            }
        };
        changes.forEachAddedItem(changeCheck);
        changes.forEachChangedItem(changeCheck);
        changes.forEachRemovedItem(function (record) {
            changed = true;
            delete _this._config[record.key];
        });
        if (changed) {
            this.setConfig(this._config);
        }
        return changed;
    };
    /**
     * @return {?}
     */
    NgGridItem.prototype.onConfigChangeEvent = /**
     * @return {?}
     */
    function () {
        if (this._userConfig === null)
            return;
        this._config.sizex = this._userConfig.sizex = this._size.x;
        this._config.sizey = this._userConfig.sizey = this._size.y;
        this._config.col = this._userConfig.col = this._currentPosition.col;
        this._config.row = this._userConfig.row = this._currentPosition.row;
        this.ngGridItemChange.emit(this._userConfig);
    };
    /**
     * @param {?} direction
     * @param {?} mousePos
     * @return {?}
     */
    NgGridItem.prototype.canResizeInDirection = /**
     * @param {?} direction
     * @param {?} mousePos
     * @return {?}
     */
    function (direction, mousePos) {
        switch (direction) {
            case 'bottomright':
                return mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize
                    && mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize; // tslint:disable-line:indent
            case 'bottomleft':
                return mousePos.left < this._borderSize && mousePos.top < this._elemHeight
                    && mousePos.top > this._elemHeight - this._borderSize; // tslint:disable-line:indent
            case 'topright':
                return mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize
                    && mousePos.top < this._borderSize; // tslint:disable-line:indent
            case 'topleft':
                return mousePos.left < this._borderSize && mousePos.top < this._borderSize;
            case 'right':
                return mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize;
            case 'left':
                return mousePos.left < this._borderSize;
            case 'bottom':
                return mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize;
            case 'top':
                return mousePos.top < this._borderSize;
            default:
                return false;
        }
    };
    NgGridItem.CONST_DEFAULT_CONFIG = {
        uid: null,
        col: 1,
        row: 1,
        sizex: 1,
        sizey: 1,
        dragHandle: null,
        resizeHandle: null,
        fixed: false,
        draggable: true,
        resizable: true,
        borderSize: 25,
        resizeDirections: null,
    };
    NgGridItem.decorators = [
        { type: Directive, args: [{
                    selector: '[ngGridItem]',
                    inputs: ['config: ngGridItem']
                },] },
    ];
    /** @nocollapse */
    NgGridItem.ctorParameters = function () { return [
        { type: KeyValueDiffers },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgGrid },
        { type: ViewContainerRef }
    ]; };
    NgGridItem.propDecorators = {
        onItemChange: [{ type: Output }],
        onDragStart: [{ type: Output }],
        onDrag: [{ type: Output }],
        onDragStop: [{ type: Output }],
        onDragAny: [{ type: Output }],
        onResizeStart: [{ type: Output }],
        onResize: [{ type: Output }],
        onResizeStop: [{ type: Output }],
        onResizeAny: [{ type: Output }],
        onChangeStart: [{ type: Output }],
        onChange: [{ type: Output }],
        onChangeStop: [{ type: Output }],
        onChangeAny: [{ type: Output }],
        ngGridItemChange: [{ type: Output }]
    };
    return NgGridItem;
}());
export { NgGridItem };
function NgGridItem_tsickle_Closure_declarations() {
    /** @type {?} */
    NgGridItem.CONST_DEFAULT_CONFIG;
    /** @type {?} */
    NgGridItem.prototype.onItemChange;
    /** @type {?} */
    NgGridItem.prototype.onDragStart;
    /** @type {?} */
    NgGridItem.prototype.onDrag;
    /** @type {?} */
    NgGridItem.prototype.onDragStop;
    /** @type {?} */
    NgGridItem.prototype.onDragAny;
    /** @type {?} */
    NgGridItem.prototype.onResizeStart;
    /** @type {?} */
    NgGridItem.prototype.onResize;
    /** @type {?} */
    NgGridItem.prototype.onResizeStop;
    /** @type {?} */
    NgGridItem.prototype.onResizeAny;
    /** @type {?} */
    NgGridItem.prototype.onChangeStart;
    /** @type {?} */
    NgGridItem.prototype.onChange;
    /** @type {?} */
    NgGridItem.prototype.onChangeStop;
    /** @type {?} */
    NgGridItem.prototype.onChangeAny;
    /** @type {?} */
    NgGridItem.prototype.ngGridItemChange;
    /** @type {?} */
    NgGridItem.prototype.isFixed;
    /** @type {?} */
    NgGridItem.prototype.isDraggable;
    /** @type {?} */
    NgGridItem.prototype.isResizable;
    /** @type {?} */
    NgGridItem.prototype.minWidth;
    /** @type {?} */
    NgGridItem.prototype.minHeight;
    /** @type {?} */
    NgGridItem.prototype.uid;
    /** @type {?} */
    NgGridItem.prototype._payload;
    /** @type {?} */
    NgGridItem.prototype._currentPosition;
    /** @type {?} */
    NgGridItem.prototype._size;
    /** @type {?} */
    NgGridItem.prototype._config;
    /** @type {?} */
    NgGridItem.prototype._userConfig;
    /** @type {?} */
    NgGridItem.prototype._dragHandle;
    /** @type {?} */
    NgGridItem.prototype._resizeHandle;
    /** @type {?} */
    NgGridItem.prototype._borderSize;
    /** @type {?} */
    NgGridItem.prototype._elemWidth;
    /** @type {?} */
    NgGridItem.prototype._elemHeight;
    /** @type {?} */
    NgGridItem.prototype._elemLeft;
    /** @type {?} */
    NgGridItem.prototype._elemTop;
    /** @type {?} */
    NgGridItem.prototype._added;
    /** @type {?} */
    NgGridItem.prototype._differ;
    /** @type {?} */
    NgGridItem.prototype._cascadeMode;
    /** @type {?} */
    NgGridItem.prototype._maxCols;
    /** @type {?} */
    NgGridItem.prototype._minCols;
    /** @type {?} */
    NgGridItem.prototype._maxRows;
    /** @type {?} */
    NgGridItem.prototype._minRows;
    /** @type {?} */
    NgGridItem.prototype._resizeDirections;
    /** @type {?} */
    NgGridItem.prototype._zIndex;
    /** @type {?} */
    NgGridItem.prototype._differs;
    /** @type {?} */
    NgGridItem.prototype._ngEl;
    /** @type {?} */
    NgGridItem.prototype._renderer;
    /** @type {?} */
    NgGridItem.prototype._ngGrid;
    /** @type {?} */
    NgGridItem.prototype.containerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmdHcmlkSXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWdyaWQvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL05nR3JpZEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWxDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWtCLGVBQWUsRUFBcUIsZ0JBQWdCLEVBQUUsTUFBTSxFQUFXLE1BQU0sZUFBZSxDQUFDOztJQWtJbEssY0FBYztJQUNkLG9CQUNZLFVBQ0EsT0FDQSxXQUNBLFNBQ0Q7UUFKQyxhQUFRLEdBQVIsUUFBUTtRQUNSLFVBQUssR0FBTCxLQUFLO1FBQ0wsY0FBUyxHQUFULFNBQVM7UUFDVCxZQUFPLEdBQVAsT0FBTztRQUNSLGlCQUFZLEdBQVosWUFBWTs7NEJBaEl3QyxJQUFJLFlBQVksQ0FBa0IsS0FBSyxDQUFDOzJCQUN6QyxJQUFJLFlBQVksRUFBbUI7c0JBQ3hDLElBQUksWUFBWSxFQUFtQjswQkFDL0IsSUFBSSxZQUFZLEVBQW1CO3lCQUNwQyxJQUFJLFlBQVksRUFBbUI7NkJBQy9CLElBQUksWUFBWSxFQUFtQjt3QkFDeEMsSUFBSSxZQUFZLEVBQW1COzRCQUMvQixJQUFJLFlBQVksRUFBbUI7MkJBQ3BDLElBQUksWUFBWSxFQUFtQjs2QkFDakMsSUFBSSxZQUFZLEVBQW1CO3dCQUN4QyxJQUFJLFlBQVksRUFBbUI7NEJBQy9CLElBQUksWUFBWSxFQUFtQjsyQkFDcEMsSUFBSSxZQUFZLEVBQW1CO2dDQUM3QixJQUFJLFlBQVksRUFBb0I7dUJBa0I5RSxLQUFLOzJCQUNELElBQUk7MkJBQ0osSUFBSTt3QkFDUixDQUFDO3lCQUNBLENBQUM7bUJBQ1AsSUFBSTtnQ0FJc0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7cUJBQ2pDLEVBQUUsQ0FBQyxF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QUFJLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhGLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDL0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxD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QUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFOUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUU5RSxxQkFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakksRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFFMU0scUJBQU0sVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMs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QUM7UUFDUixVQUFVLEVBQUUsSUFBSTtRQUNoQixZQUFZLEVBQUUsSUFBSTtRQUNsQixLQUFLLEVBQUUsS0FBSztRQUNaLFNBQVMsRUFBRSxJQUFJO1FBQ2YsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsRUFBRTtRQUNkLGdCQUFnQixFQUFFLElBQUk7S0FDekI7O2dCQW5DSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUNqQzs7OztnQkFMd0UsZUFBZTtnQkFBcEUsVUFBVTtnQkFBRSxTQUFTO2dCQUZoQyxNQUFNO2dCQUU4RixnQkFBZ0I7OzsrQkFReEgsTUFBTTs4QkFDTixNQUFNO3lCQUNOLE1BQU07NkJBQ04sTUFBTTs0QkFDTixNQUFNO2dDQUNOLE1BQU07MkJBQ04sTUFBTTsrQkFDTixNQUFNOzhCQUNOLE1BQU07Z0NBQ04sTUFBTTsyQkFDTixNQUFNOytCQUNOLE1BQU07OEJBQ04sTUFBTTttQ0FDTixNQUFNOztxQkF2Qlg7O1NBUWEsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nR3JpZCB9IGZyb20gJy4vTmdHcmlkJztcbmltcG9ydCB7IE5nR3JpZEl0ZW1Db25maWcsIE5nR3JpZEl0ZW1FdmVudCwgTmdHcmlkSXRlbVBvc2l0aW9uLCBOZ0dyaWRJdGVtU2l6ZSwgTmdHcmlkUmF3UG9zaXRpb24sIE5nR3JpZEl0ZW1EaW1lbnNpb25zLCBSZXNpemVIYW5kbGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL0lOZ0dyaWQnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIEV2ZW50RW1pdHRlciwgS2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVycywgT25Jbml0LCBPbkRlc3Ryb3ksIFZpZXdDb250YWluZXJSZWYsIE91dHB1dCwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tuZ0dyaWRJdGVtXScsXG4gICAgaW5wdXRzOiBbJ2NvbmZpZzogbmdHcmlkSXRlbSddXG59KVxuZXhwb3J0IGNsYXNzIE5nR3JpZEl0ZW0gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgRG9DaGVjayB7XG4gICAgLy8gRXZlbnQgRW1pdHRlcnNcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uSXRlbUNoYW5nZTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oZmFsc2UpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWc6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWdTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnQW55OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNpemVTdGFydDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNpemVTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNpemVBbnk6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkNoYW5nZVN0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkNoYW5nZVN0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkNoYW5nZUFueTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG5nR3JpZEl0ZW1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtQ29uZmlnPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUNvbmZpZz4oKTtcblxuICAgIC8vIERlZmF1bHQgY29uZmlnXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ09OU1RfREVGQVVMVF9DT05GSUc6IE5nR3JpZEl0ZW1Db25maWcgPSB7XG4gICAgICAgIHVpZDogbnVsbCxcbiAgICAgICAgY29sOiAxLFxuICAgICAgICByb3c6IDEsXG4gICAgICAgIHNpemV4OiAxLFxuICAgICAgICBzaXpleTogMSxcbiAgICAgICAgZHJhZ0hhbmRsZTogbnVsbCxcbiAgICAgICAgcmVzaXplSGFuZGxlOiBudWxsLFxuICAgICAgICBmaXhlZDogZmFsc2UsXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgcmVzaXphYmxlOiB0cnVlLFxuICAgICAgICBib3JkZXJTaXplOiAyNSxcbiAgICAgICAgcmVzaXplRGlyZWN0aW9uczogbnVsbCxcbiAgICB9O1xuXG4gICAgcHVibGljIGlzRml4ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNEcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc1Jlc2l6YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIG1pbldpZHRoOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBtaW5IZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHVpZDogc3RyaW5nID0gbnVsbDtcblxuICAgIC8vIFByaXZhdGUgdmFyaWFibGVzXG4gICAgcHJpdmF0ZSBfcGF5bG9hZDogYW55O1xuICAgIHByaXZhdGUgX2N1cnJlbnRQb3NpdGlvbjogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IDEsIHJvdzogMSB9O1xuICAgIHByaXZhdGUgX3NpemU6IE5nR3JpZEl0ZW1TaXplID0geyB4OiAxLCB5OiAxIH07XG4gICAgcHJpdmF0ZSBfY29uZmlnID0gTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRztcbiAgICBwcml2YXRlIF91c2VyQ29uZmlnID0gbnVsbDtcbiAgICBwcml2YXRlIF9kcmFnSGFuZGxlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfcmVzaXplSGFuZGxlOiBSZXNpemVIYW5kbGU7XG4gICAgcHJpdmF0ZSBfYm9yZGVyU2l6ZTogbnVtYmVyO1xuICAgIHByaXZhdGUgX2VsZW1XaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2VsZW1IZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9lbGVtTGVmdDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2VsZW1Ub3A6IG51bWJlcjtcbiAgICBwcml2YXRlIF9hZGRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2RpZmZlcjogS2V5VmFsdWVEaWZmZXI8c3RyaW5nLCBhbnk+O1xuICAgIHByaXZhdGUgX2Nhc2NhZGVNb2RlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfbWF4Q29sczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9taW5Db2xzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX21heFJvd3M6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWluUm93czogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9yZXNpemVEaXJlY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByaXZhdGUgX3pJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHNldCB6SW5kZXgoekluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsIHpJbmRleC50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5fekluZGV4ID0gekluZGV4O1xuICAgIH1cblxuICAgIGdldCB6SW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3pJbmRleDtcbiAgICB9XG5cbiAgICAvLyBbbmctZ3JpZC1pdGVtXSBoYW5kbGVyXG4gICAgc2V0IGNvbmZpZyh2OiBOZ0dyaWRJdGVtQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuX3VzZXJDb25maWcgPSB2O1xuXG4gICAgICAgIGNvbnN0IGNvbmZpZ09iamVjdCA9IE9iamVjdC5hc3NpZ24oe30sIE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcsIHYpO1xuICAgICAgICBmb3IgKGxldCB4IGluIE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcpXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqZWN0W3hdID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29uZmlnT2JqZWN0W3hdID0gTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJR1t4XTtcblxuICAgICAgICB0aGlzLnNldENvbmZpZyhjb25maWdPYmplY3QpO1xuXG4gICAgICAgIGlmICh0aGlzLl91c2VyQ29uZmlnICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaWZmZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZCh0aGlzLl91c2VyQ29uZmlnKS5jcmVhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZGlmZmVyLmRpZmYodGhpcy5fdXNlckNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9uZ0dyaWQuYWRkSXRlbSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNpemV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplLng7XG4gICAgfVxuXG4gICAgZ2V0IHNpemV5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplLnk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbDtcbiAgICB9XG5cbiAgICBnZXQgcm93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UG9zaXRpb24ucm93O1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50Q29sKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UG9zaXRpb24uY29sO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50Um93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UG9zaXRpb24ucm93O1xuICAgIH1cblxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2RpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgcHJpdmF0ZSBfbmdFbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBfbmdHcmlkOiBOZ0dyaWQsXG4gICAgICAgIHB1YmxpYyBjb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBvblJlc2l6ZVN0YXJ0RXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25SZXNpemVTdGFydC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUFueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVN0YXJ0LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBwdWJsaWMgb25SZXNpemVFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUFueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgcHVibGljIG9uUmVzaXplU3RvcEV2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RvcC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUFueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVN0b3AuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG5cbiAgICAgICAgdGhpcy5vbkNvbmZpZ0NoYW5nZUV2ZW50KCk7XG4gICAgfVxuICAgIHB1YmxpYyBvbkRyYWdTdGFydEV2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uRHJhZ1N0YXJ0LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uRHJhZ0FueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVN0YXJ0LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBwdWJsaWMgb25EcmFnRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25EcmFnLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uRHJhZ0FueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgcHVibGljIG9uRHJhZ1N0b3BFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vbkRyYWdTdG9wLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uRHJhZ0FueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVN0b3AuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG5cbiAgICAgICAgdGhpcy5vbkNvbmZpZ0NoYW5nZUV2ZW50KCk7XG4gICAgfVxuICAgIHB1YmxpYyBvbkNhc2NhZGVFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNvbmZpZ0NoYW5nZUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdncmlkLWl0ZW0nKTtcbiAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5hdXRvU3R5bGUpIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgLy8gRm9yY2UgYSBjb25maWcgdXBkYXRlIGluIGNhc2UgdGhlcmUgaXMgbm8gY29uZmlnIGFzc2lnbmVkXG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5fdXNlckNvbmZpZztcbiAgICB9XG5cbiAgICAvLyBQdWJsaWMgbWV0aG9kc1xuICAgIHB1YmxpYyBjYW5EcmFnKGU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuaXNEcmFnZ2FibGUpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5fZHJhZ0hhbmRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEhhbmRsZSh0aGlzLl9kcmFnSGFuZGxlLCBlLnRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmluZEhhbmRsZShoYW5kbGVTZWxlY3Rvcjogc3RyaW5nLCBzdGFydEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0RWxlbTogYW55ID0gc3RhcnRFbGVtZW50O1xuXG4gICAgICAgICAgICB3aGlsZSAodGFyZ2V0RWxlbSAmJiB0YXJnZXRFbGVtICE9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRNYXRjaGVzKHRhcmdldEVsZW0sIGhhbmRsZVNlbGVjdG9yKSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICB0YXJnZXRFbGVtID0gdGFyZ2V0RWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYW5SZXNpemUoZTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVzaXphYmxlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5fcmVzaXplSGFuZGxlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3Jlc2l6ZUhhbmRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kSGFuZGxlKHRoaXMuX3Jlc2l6ZUhhbmRsZSwgZS50YXJnZXQpID8gJ2JvdHRvbXJpZ2h0JyA6IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcmVzaXplSGFuZGxlICE9PSAnb2JqZWN0JykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc2l6ZURpcmVjdGlvbnMgPSBbICdib3R0b21yaWdodCcsICdib3R0b21sZWZ0JywgJ3RvcHJpZ2h0JywgJ3RvcGxlZnQnLCAncmlnaHQnLCAnbGVmdCcsICdib3R0b20nLCAndG9wJyBdO1xuICAgICAgICAgICAgZm9yIChsZXQgZGlyZWN0aW9uIG9mIHJlc2l6ZURpcmVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uIGluIHRoaXMuX3Jlc2l6ZUhhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maW5kSGFuZGxlKHRoaXMuX3Jlc2l6ZUhhbmRsZVtkaXJlY3Rpb25dLCBlLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvcmRlclNpemUgPD0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgY29uc3QgbW91c2VQb3M6IE5nR3JpZFJhd1Bvc2l0aW9uID0gdGhpcy5fZ2V0TW91c2VQb3NpdGlvbihlKTtcblxuICAgICAgICBmb3IgKGxldCBkaXJlY3Rpb24gb2YgdGhpcy5fcmVzaXplRGlyZWN0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FuUmVzaXplSW5EaXJlY3Rpb24oZGlyZWN0aW9uLCBtb3VzZVBvcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTW91c2VNb3ZlKGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmF1dG9TdHlsZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5yZXNpemVFbmFibGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNpemVEaXJlY3Rpb24gPSB0aGlzLmNhblJlc2l6ZShlKTtcblxuICAgICAgICAgICAgICAgIGxldCBjdXJzb3I6IHN0cmluZyA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc2l6ZURpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdib3R0b21yaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yID0gJ253c2UtcmVzaXplJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0b3ByaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbWxlZnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yID0gJ25lc3ctcmVzaXplJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yID0gJ25zLXJlc2l6ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICdldy1yZXNpemUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmRyYWdFbmFibGUgJiYgdGhpcy5jYW5EcmFnKGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgY3Vyc29yKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmdHcmlkLmRyYWdFbmFibGUgJiYgdGhpcy5jYW5EcmFnKGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ21vdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2FkZGVkKSB0aGlzLl9uZ0dyaWQucmVtb3ZlSXRlbSh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyAgICBHZXR0ZXJzXG4gICAgcHVibGljIGdldEVsZW1lbnQoKTogRWxlbWVudFJlZiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uZ0VsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREcmFnSGFuZGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kcmFnSGFuZGxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSZXNpemVIYW5kbGUoKTogUmVzaXplSGFuZGxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZUhhbmRsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGltZW5zaW9ucygpOiBOZ0dyaWRJdGVtRGltZW5zaW9ucyB7XG4gICAgICAgIHJldHVybiB7ICd3aWR0aCc6IHRoaXMuX2VsZW1XaWR0aCwgJ2hlaWdodCc6IHRoaXMuX2VsZW1IZWlnaHQgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2l6ZSgpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQb3NpdGlvbigpOiBOZ0dyaWRSYXdQb3NpdGlvbiB7XG4gICAgICAgIHJldHVybiB7ICdsZWZ0JzogdGhpcy5fZWxlbUxlZnQsICd0b3AnOiB0aGlzLl9lbGVtVG9wIH07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEdyaWRQb3NpdGlvbigpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uO1xuICAgIH1cblxuICAgIC8vICAgIFNldHRlcnNcbiAgICBwdWJsaWMgc2V0Q29uZmlnKGNvbmZpZzogTmdHcmlkSXRlbUNvbmZpZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IGNvbmZpZy5wYXlsb2FkO1xuICAgICAgICB0aGlzLl9jdXJyZW50UG9zaXRpb24uY29sID0gY29uZmlnLmNvbCA/IGNvbmZpZy5jb2wgOiBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHLmNvbDtcbiAgICAgICAgdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdyA9IGNvbmZpZy5yb3cgPyBjb25maWcucm93IDogTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRy5yb3c7XG4gICAgICAgIHRoaXMuX3NpemUueCA9IGNvbmZpZy5zaXpleCA/IGNvbmZpZy5zaXpleCA6IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcuc2l6ZXg7XG4gICAgICAgIHRoaXMuX3NpemUueSA9IGNvbmZpZy5zaXpleSA/IGNvbmZpZy5zaXpleSA6IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcuc2l6ZXk7XG4gICAgICAgIHRoaXMuX2RyYWdIYW5kbGUgPSBjb25maWcuZHJhZ0hhbmRsZTtcbiAgICAgICAgdGhpcy5fcmVzaXplSGFuZGxlID0gY29uZmlnLnJlc2l6ZUhhbmRsZTtcbiAgICAgICAgdGhpcy5fYm9yZGVyU2l6ZSA9IGNvbmZpZy5ib3JkZXJTaXplO1xuICAgICAgICB0aGlzLmlzRHJhZ2dhYmxlID0gY29uZmlnLmRyYWdnYWJsZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Jlc2l6YWJsZSA9IGNvbmZpZy5yZXNpemFibGUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuaXNGaXhlZCA9IGNvbmZpZy5maXhlZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVzaXplRGlyZWN0aW9ucyA9IGNvbmZpZy5yZXNpemVEaXJlY3Rpb25zIHx8IHRoaXMuX25nR3JpZC5yZXNpemVEaXJlY3Rpb25zO1xuXG4gICAgICAgIHRoaXMuX21heENvbHMgPSAhaXNOYU4oY29uZmlnLm1heENvbHMpICYmIGlzRmluaXRlKGNvbmZpZy5tYXhDb2xzKSA/IGNvbmZpZy5tYXhDb2xzIDogMDtcbiAgICAgICAgdGhpcy5fbWluQ29scyA9ICFpc05hTihjb25maWcubWluQ29scykgJiYgaXNGaW5pdGUoY29uZmlnLm1pbkNvbHMpID8gY29uZmlnLm1pbkNvbHMgOiAwO1xuICAgICAgICB0aGlzLl9tYXhSb3dzID0gIWlzTmFOKGNvbmZpZy5tYXhSb3dzKSAmJiBpc0Zpbml0ZShjb25maWcubWF4Um93cykgPyBjb25maWcubWF4Um93cyA6IDA7XG4gICAgICAgIHRoaXMuX21pblJvd3MgPSAhaXNOYU4oY29uZmlnLm1pblJvd3MpICYmIGlzRmluaXRlKGNvbmZpZy5taW5Sb3dzKSA/IGNvbmZpZy5taW5Sb3dzIDogMDtcblxuICAgICAgICB0aGlzLm1pbldpZHRoID0gIWlzTmFOKGNvbmZpZy5taW5XaWR0aCkgJiYgaXNGaW5pdGUoY29uZmlnLm1pbldpZHRoKSA/IGNvbmZpZy5taW5XaWR0aCA6IDA7XG4gICAgICAgIHRoaXMubWluSGVpZ2h0ID0gIWlzTmFOKGNvbmZpZy5taW5IZWlnaHQpICYmIGlzRmluaXRlKGNvbmZpZy5taW5IZWlnaHQpID8gY29uZmlnLm1pbkhlaWdodCA6IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX21pbkNvbHMgPiAwICYmIHRoaXMuX21heENvbHMgPiAwICYmIHRoaXMuX21pbkNvbHMgPiB0aGlzLl9tYXhDb2xzKSB0aGlzLl9taW5Db2xzID0gMDtcbiAgICAgICAgaWYgKHRoaXMuX21pblJvd3MgPiAwICYmIHRoaXMuX21heFJvd3MgPiAwICYmIHRoaXMuX21pblJvd3MgPiB0aGlzLl9tYXhSb3dzKSB0aGlzLl9taW5Sb3dzID0gMDtcblxuICAgICAgICBpZiAodGhpcy5fYWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX25nR3JpZC51cGRhdGVJdGVtKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuZml4UmVzaXplKHRoaXMuX3NpemUpO1xuXG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nRG9DaGVjaygpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzOiBhbnkgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl91c2VyQ29uZmlnKTtcblxuICAgICAgICAgICAgaWYgKGNoYW5nZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseUNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNpemUobmV3U2l6ZTogTmdHcmlkSXRlbVNpemUsIHVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgbmV3U2l6ZSA9IHRoaXMuZml4UmVzaXplKG5ld1NpemUpO1xuICAgICAgICB0aGlzLl9zaXplID0gbmV3U2l6ZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkgdGhpcy5fcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5vbkl0ZW1DaGFuZ2UuZW1pdCh0aGlzLmdldEV2ZW50T3V0cHV0KCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRHcmlkUG9zaXRpb24oZ3JpZFBvc2l0aW9uOiBOZ0dyaWRJdGVtUG9zaXRpb24sIHVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFBvc2l0aW9uID0gZ3JpZFBvc2l0aW9uO1xuICAgICAgICBpZiAodXBkYXRlKSB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vbkl0ZW1DaGFuZ2UuZW1pdCh0aGlzLmdldEV2ZW50T3V0cHV0KCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRFdmVudE91dHB1dCgpOiBOZ0dyaWRJdGVtRXZlbnQge1xuICAgICAgICByZXR1cm4gPE5nR3JpZEl0ZW1FdmVudD57XG4gICAgICAgICAgICB1aWQ6IHRoaXMudWlkLFxuICAgICAgICAgICAgcGF5bG9hZDogdGhpcy5fcGF5bG9hZCxcbiAgICAgICAgICAgIGNvbDogdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbCxcbiAgICAgICAgICAgIHJvdzogdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdyxcbiAgICAgICAgICAgIHNpemV4OiB0aGlzLl9zaXplLngsXG4gICAgICAgICAgICBzaXpleTogdGhpcy5fc2l6ZS55LFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuX2VsZW1XaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5fZWxlbUhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMuX2VsZW1MZWZ0LFxuICAgICAgICAgICAgdG9wOiB0aGlzLl9lbGVtVG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fY2FzY2FkZU1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgeCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHkgKyAncHgnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIHggKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB5ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgeCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIHkgKyAncHgnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VsZW1MZWZ0ID0geDtcbiAgICAgICAgdGhpcy5fZWxlbVRvcCA9IHk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENhc2NhZGVNb2RlKGNhc2NhZGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jYXNjYWRlTW9kZSA9IGNhc2NhZGU7XG4gICAgICAgIHN3aXRjaCAoY2FzY2FkZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCB0aGlzLl9lbGVtTGVmdCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHRoaXMuX2VsZW1Ub3AgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgdGhpcy5fZWxlbUxlZnQgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0aGlzLl9lbGVtVG9wICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHRoaXMuX2VsZW1MZWZ0ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnYm90dG9tJywgdGhpcy5fZWxlbVRvcCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGltZW5zaW9ucyh3OiBudW1iZXIsIGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodyA8IHRoaXMubWluV2lkdGgpIHcgPSB0aGlzLm1pbldpZHRoO1xuICAgICAgICBpZiAoaCA8IHRoaXMubWluSGVpZ2h0KSBoID0gdGhpcy5taW5IZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB3ICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGggKyAncHgnKTtcblxuICAgICAgICB0aGlzLl9lbGVtV2lkdGggPSB3O1xuICAgICAgICB0aGlzLl9lbGVtSGVpZ2h0ID0gaDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnRNb3ZpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ21vdmluZycpO1xuICAgICAgICBjb25zdCBzdHlsZTogYW55ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5hdXRvU3R5bGUpIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCAocGFyc2VJbnQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnei1pbmRleCcpKSArIDEpLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wTW92aW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdtb3ZpbmcnKTtcbiAgICAgICAgY29uc3Qgc3R5bGU6IGFueSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGlmICh0aGlzLl9uZ0dyaWQuYXV0b1N0eWxlKSB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd6LWluZGV4JywgKHBhcnNlSW50KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3otaW5kZXgnKSkgLSAxKS50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVjYWxjdWxhdGVTZWxmKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaXhSZXNpemUobmV3U2l6ZTogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXhDb2xzID4gMCAmJiBuZXdTaXplLnggPiB0aGlzLl9tYXhDb2xzKSBuZXdTaXplLnggPSB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBpZiAodGhpcy5fbWF4Um93cyA+IDAgJiYgbmV3U2l6ZS55ID4gdGhpcy5fbWF4Um93cykgbmV3U2l6ZS55ID0gdGhpcy5fbWF4Um93cztcblxuICAgICAgICBpZiAodGhpcy5fbWluQ29scyA+IDAgJiYgbmV3U2l6ZS54IDwgdGhpcy5fbWluQ29scykgbmV3U2l6ZS54ID0gdGhpcy5fbWluQ29scztcbiAgICAgICAgaWYgKHRoaXMuX21pblJvd3MgPiAwICYmIG5ld1NpemUueSA8IHRoaXMuX21pblJvd3MpIG5ld1NpemUueSA9IHRoaXMuX21pblJvd3M7XG5cbiAgICAgICAgY29uc3QgaXRlbVdpZHRoID0gKG5ld1NpemUueCAqIHRoaXMuX25nR3JpZC5jb2xXaWR0aCkgKyAoKHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0KSAqIChuZXdTaXplLnggLSAxKSk7XG4gICAgICAgIGlmIChpdGVtV2lkdGggPCB0aGlzLm1pbldpZHRoKSBuZXdTaXplLnggPSBNYXRoLmNlaWwoKHRoaXMubWluV2lkdGggKyB0aGlzLl9uZ0dyaWQubWFyZ2luUmlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCkgLyAodGhpcy5fbmdHcmlkLmNvbFdpZHRoICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQpKTtcblxuICAgICAgICBjb25zdCBpdGVtSGVpZ2h0ID0gKG5ld1NpemUueSAqIHRoaXMuX25nR3JpZC5yb3dIZWlnaHQpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luVG9wICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSkgKiAobmV3U2l6ZS55IC0gMSkpO1xuICAgICAgICBpZiAoaXRlbUhlaWdodCA8IHRoaXMubWluSGVpZ2h0KSBuZXdTaXplLnkgPSBNYXRoLmNlaWwoKHRoaXMubWluSGVpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSArIHRoaXMuX25nR3JpZC5tYXJnaW5Ub3ApIC8gKHRoaXMuX25nR3JpZC5yb3dIZWlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luQm90dG9tICsgdGhpcy5fbmdHcmlkLm1hcmdpblRvcCkpO1xuXG4gICAgICAgIHJldHVybiBuZXdTaXplO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGUgbWV0aG9kc1xuICAgIHByaXZhdGUgZWxlbWVudE1hdGNoZXMoZWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghZWxlbWVudCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZWxlbWVudC5tYXRjaGVzKSByZXR1cm4gZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsZW1lbnQub01hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsZW1lbnQub01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWxlbWVudC5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbGVtZW50Lm1vek1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICghZWxlbWVudC5kb2N1bWVudCB8fCAhZWxlbWVudC5vd25lckRvY3VtZW50KSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgbWF0Y2hlczogYW55ID0gKGVsZW1lbnQuZG9jdW1lbnQgfHwgZWxlbWVudC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2hlcy5pdGVtKGkpICE9PSBlbGVtZW50KSB7IH1cbiAgICAgICAgcmV0dXJuIGkgPiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB4OiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLmNvbFdpZHRoICsgdGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luUmlnaHQpICogKHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2wgLSAxKSArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLnNjcmVlbk1hcmdpbjtcbiAgICAgICAgY29uc3QgeTogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5yb3dIZWlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSkgKiAodGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdyAtIDEpICsgdGhpcy5fbmdHcmlkLm1hcmdpblRvcDtcblxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHgsIHkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpemUueCA8IHRoaXMuX25nR3JpZC5taW5Db2xzKSB0aGlzLl9zaXplLnggPSB0aGlzLl9uZ0dyaWQubWluQ29scztcbiAgICAgICAgaWYgKHRoaXMuX3NpemUueSA8IHRoaXMuX25nR3JpZC5taW5Sb3dzKSB0aGlzLl9zaXplLnkgPSB0aGlzLl9uZ0dyaWQubWluUm93cztcblxuICAgICAgICBjb25zdCBuZXdXaWR0aDogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5jb2xXaWR0aCAqIHRoaXMuX3NpemUueCkgKyAoKHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0KSAqICh0aGlzLl9zaXplLnggLSAxKSk7XG4gICAgICAgIGNvbnN0IG5ld0hlaWdodDogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5yb3dIZWlnaHQgKiB0aGlzLl9zaXplLnkpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luVG9wICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSkgKiAodGhpcy5fc2l6ZS55IC0gMSkpO1xuXG4gICAgICAgIGNvbnN0IHc6IG51bWJlciA9IE1hdGgubWF4KHRoaXMubWluV2lkdGgsIHRoaXMuX25nR3JpZC5taW5XaWR0aCwgbmV3V2lkdGgpO1xuICAgICAgICBjb25zdCBoOiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLm1pbkhlaWdodCwgdGhpcy5fbmdHcmlkLm1pbkhlaWdodCwgbmV3SGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnNldERpbWVuc2lvbnModywgaCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0TW91c2VQb3NpdGlvbihlOiBhbnkpOiBOZ0dyaWRSYXdQb3NpdGlvbiB7XG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9lOiBhbnkgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgICBlID0gb2UudG91Y2hlcy5sZW5ndGggPyBvZS50b3VjaGVzWzBdIDogKG9lLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/IG9lLmNoYW5nZWRUb3VjaGVzWzBdIDogZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50b3VjaGVzKSB7XG4gICAgICAgICAgICBlID0gZS50b3VjaGVzLmxlbmd0aCA/IGUudG91Y2hlc1swXSA6IChlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY29uc3QgcmVmUG9zOiBOZ0dyaWRSYXdQb3NpdGlvbiA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogZS5jbGllbnRYIC0gcmVmUG9zLmxlZnQsXG4gICAgICAgICAgICB0b3A6IGUuY2xpZW50WSAtIHJlZlBvcy50b3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hcHBseUNoYW5nZXMoY2hhbmdlczogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNoYW5nZUNoZWNrID0gKHJlY29yZDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnW3JlY29yZC5rZXldICE9PSByZWNvcmQuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnW3JlY29yZC5rZXldID0gcmVjb3JkLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKGNoYW5nZUNoZWNrKTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0oY2hhbmdlQ2hlY2spO1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVjb3JkOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29uZmlnKHRoaXMuX2NvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29uZmlnQ2hhbmdlRXZlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2VyQ29uZmlnID09PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fY29uZmlnLnNpemV4ID0gdGhpcy5fdXNlckNvbmZpZy5zaXpleCA9IHRoaXMuX3NpemUueDtcbiAgICAgICAgdGhpcy5fY29uZmlnLnNpemV5ID0gdGhpcy5fdXNlckNvbmZpZy5zaXpleSA9IHRoaXMuX3NpemUueTtcbiAgICAgICAgdGhpcy5fY29uZmlnLmNvbCA9IHRoaXMuX3VzZXJDb25maWcuY29sID0gdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbDtcbiAgICAgICAgdGhpcy5fY29uZmlnLnJvdyA9IHRoaXMuX3VzZXJDb25maWcucm93ID0gdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdztcbiAgICAgICAgdGhpcy5uZ0dyaWRJdGVtQ2hhbmdlLmVtaXQodGhpcy5fdXNlckNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5SZXNpemVJbkRpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZywgbW91c2VQb3M6IE5nR3JpZFJhd1Bvc2l0aW9uKTogYm9vbGVhbiB7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdib3R0b21yaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLmxlZnQgPCB0aGlzLl9lbGVtV2lkdGggJiYgbW91c2VQb3MubGVmdCA+IHRoaXMuX2VsZW1XaWR0aCAtIHRoaXMuX2JvcmRlclNpemVcbiAgICAgICAgICAgICAgICAgICAgJiYgbW91c2VQb3MudG9wIDwgdGhpcy5fZWxlbUhlaWdodCAmJiBtb3VzZVBvcy50b3AgPiB0aGlzLl9lbGVtSGVpZ2h0IC0gdGhpcy5fYm9yZGVyU2l6ZTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTppbmRlbnRcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbWxlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fYm9yZGVyU2l6ZSAmJiBtb3VzZVBvcy50b3AgPCB0aGlzLl9lbGVtSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICYmIG1vdXNlUG9zLnRvcCA+IHRoaXMuX2VsZW1IZWlnaHQgLSB0aGlzLl9ib3JkZXJTaXplOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmluZGVudFxuICAgICAgICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fZWxlbVdpZHRoICYmIG1vdXNlUG9zLmxlZnQgPiB0aGlzLl9lbGVtV2lkdGggLSB0aGlzLl9ib3JkZXJTaXplXG4gICAgICAgICAgICAgICAgICAgICYmIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2JvcmRlclNpemU7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6aW5kZW50XG4gICAgICAgICAgICBjYXNlICd0b3BsZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2JvcmRlclNpemUgJiYgbW91c2VQb3MudG9wIDwgdGhpcy5fYm9yZGVyU2l6ZTtcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2VsZW1XaWR0aCAmJiBtb3VzZVBvcy5sZWZ0ID4gdGhpcy5fZWxlbVdpZHRoIC0gdGhpcy5fYm9yZGVyU2l6ZTtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fYm9yZGVyU2l6ZTtcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2VsZW1IZWlnaHQgJiYgbW91c2VQb3MudG9wID4gdGhpcy5fZWxlbUhlaWdodCAtIHRoaXMuX2JvcmRlclNpemU7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy50b3AgPCB0aGlzLl9ib3JkZXJTaXplO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=