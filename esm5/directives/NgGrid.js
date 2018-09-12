/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Renderer, EventEmitter, ComponentFactoryResolver, KeyValueDiffers, Output } from '@angular/core';
import * as NgGridHelper from '../helpers/NgGridHelpers';
import { NgGridPlaceholder } from '../components/NgGridPlaceholder';
import { fromEvent } from 'rxjs';
var NgGrid = /** @class */ (function () {
    // Constructor
    function NgGrid(_differs, _ngEl, _renderer, componentFactoryResolver) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        this.componentFactoryResolver = componentFactoryResolver;
        // Event Emitters
        this.onDragStart = new EventEmitter();
        this.onDrag = new EventEmitter();
        this.onDragStop = new EventEmitter();
        this.onResizeStart = new EventEmitter();
        this.onResize = new EventEmitter();
        this.onResizeStop = new EventEmitter();
        this.onItemChange = new EventEmitter();
        this.colWidth = 250;
        this.rowHeight = 250;
        this.minCols = 1;
        this.minRows = 1;
        this.marginTop = 10;
        this.marginRight = 10;
        this.marginBottom = 10;
        this.marginLeft = 10;
        this.screenMargin = 0;
        this.isDragging = false;
        this.isResizing = false;
        this.autoStyle = true;
        this.resizeEnable = true;
        this.dragEnable = true;
        this.cascade = 'up';
        this.minWidth = 100;
        this.minHeight = 100;
        this.resizeDirections = NgGrid.CONST_DEFAULT_RESIZE_DIRECTIONS;
        this._items = new Map();
        this._draggingItem = null;
        this._resizingItem = null;
        this._resizeDirection = null;
        this._itemsInGrid = new Set();
        this._maxCols = 0;
        this._maxRows = 0;
        this._visibleCols = 0;
        this._visibleRows = 0;
        this._setWidth = 250;
        this._setHeight = 250;
        this._posOffset = null;
        this._adding = false;
        this._placeholderRef = null;
        this._fixToGrid = false;
        this._autoResize = false;
        this._destroyed = false;
        this._maintainRatio = false;
        this._preferNew = false;
        this._zoomOnDrag = false;
        this._limitToScreen = false;
        this._centerToScreen = false;
        this._curMaxRow = 0;
        this._curMaxCol = 0;
        this._dragReady = false;
        this._resizeReady = false;
        this._elementBasedDynamicRowHeight = false;
        this._itemFixDirection = 'cascade';
        this._collisionFixDirection = 'cascade';
        this._allowOverlap = false;
        this._lastZValue = 1;
        this._subscriptions = [];
        this._enabledListener = false;
        this._config = NgGrid.CONST_DEFAULT_CONFIG;
        this._defineListeners();
    }
    Object.defineProperty(NgGrid.prototype, "config", {
        // [ng-grid] attribute handler
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v == null || typeof v !== 'object') {
                return;
            }
            this.setConfig(v);
            if (this._differ == null && v != null) {
                this._differ = this._differs.find(this._config).create();
            }
            this._differ.diff(this._config);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgGrid.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._renderer.setElementClass(this._ngEl.nativeElement, 'grid', true);
        if (this.autoStyle)
            this._renderer.setElementStyle(this._ngEl.nativeElement, 'position', 'relative');
        this.setConfig(this._config);
    };
    /**
     * @return {?}
     */
    NgGrid.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed = true;
        this._disableListeners();
    };
    /**
     * @return {?}
     */
    NgGrid.prototype.generateItemUid = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ uid = NgGridHelper.generateUuid();
        if (this._items.has(uid)) {
            return this.generateItemUid();
        }
        return uid;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    NgGrid.prototype.setConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        this._config = config;
        var /** @type {?} */ maxColRowChanged = false;
        for (var /** @type {?} */ x in config) {
            var /** @type {?} */ val = config[x];
            var /** @type {?} */ intVal = !val ? 0 : parseInt(val);
            switch (x) {
                case 'margins':
                    this.setMargins(val);
                    break;
                case 'col_width':
                    this.colWidth = Math.max(intVal, 1);
                    break;
                case 'row_height':
                    this.rowHeight = Math.max(intVal, 1);
                    break;
                case 'auto_style':
                    this.autoStyle = val ? true : false;
                    break;
                case 'auto_resize':
                    this._autoResize = val ? true : false;
                    break;
                case 'draggable':
                    this.dragEnable = val ? true : false;
                    break;
                case 'resizable':
                    this.resizeEnable = val ? true : false;
                    break;
                case 'max_rows':
                    maxColRowChanged = maxColRowChanged || this._maxRows != intVal;
                    this._maxRows = intVal < 0 ? 0 : intVal;
                    break;
                case 'max_cols':
                    maxColRowChanged = maxColRowChanged || this._maxCols != intVal;
                    this._maxCols = intVal < 0 ? 0 : intVal;
                    break;
                case 'visible_rows':
                    this._visibleRows = Math.max(intVal, 0);
                    break;
                case 'visible_cols':
                    this._visibleCols = Math.max(intVal, 0);
                    break;
                case 'min_rows':
                    this.minRows = Math.max(intVal, 1);
                    break;
                case 'min_cols':
                    this.minCols = Math.max(intVal, 1);
                    break;
                case 'min_height':
                    this.minHeight = Math.max(intVal, 1);
                    break;
                case 'min_width':
                    this.minWidth = Math.max(intVal, 1);
                    break;
                case 'zoom_on_drag':
                    this._zoomOnDrag = val ? true : false;
                    break;
                case 'cascade':
                    if (this.cascade != val) {
                        this.cascade = val;
                        this._cascadeGrid();
                    }
                    break;
                case 'fix_to_grid':
                    this._fixToGrid = val ? true : false;
                    break;
                case 'maintain_ratio':
                    this._maintainRatio = val ? true : false;
                    break;
                case 'prefer_new':
                    this._preferNew = val ? true : false;
                    break;
                case 'limit_to_screen':
                    this._limitToScreen = !this._autoResize && !!val;
                    break;
                case 'center_to_screen':
                    this._centerToScreen = val ? true : false;
                    break;
                case 'resize_directions':
                    this.resizeDirections = val || ['bottomright', 'bottomleft', 'topright', 'topleft', 'right', 'left', 'bottom', 'top'];
                    break;
                case 'element_based_row_height':
                    this._elementBasedDynamicRowHeight = !!val;
                    break;
                case 'fix_item_position_direction':
                    this._itemFixDirection = val;
                    break;
                case 'fix_collision_position_direction':
                    this._collisionFixDirection = val;
                    break;
                case 'allow_overlap':
                    this._allowOverlap = !!val;
                    break;
            }
        }
        if (this._allowOverlap && this.cascade !== 'off' && this.cascade !== '') {
            console.warn('Unable to overlap items when a cascade direction is set.');
            this._allowOverlap = false;
        }
        if (this.dragEnable || this.resizeEnable) {
            this._enableListeners();
        }
        else {
            this._disableListeners();
        }
        if (this._itemFixDirection === 'cascade') {
            this._itemFixDirection = this._getFixDirectionFromCascade();
        }
        if (this._collisionFixDirection === 'cascade') {
            this._collisionFixDirection = this._getFixDirectionFromCascade();
        }
        if (this._limitToScreen) {
            var /** @type {?} */ newMaxCols = this._getContainerColumns();
            if (this._maxCols != newMaxCols) {
                this._maxCols = newMaxCols;
                maxColRowChanged = true;
            }
        }
        if (this._limitToScreen && this._centerToScreen) {
            this.screenMargin = this._getScreenMargin();
        }
        else {
            this.screenMargin = 0;
        }
        if (this._maintainRatio) {
            if (this.colWidth && this.rowHeight) {
                this._aspectRatio = this.colWidth / this.rowHeight;
            }
            else {
                this._maintainRatio = false;
            }
        }
        if (maxColRowChanged) {
            if (this._maxCols > 0 && this._maxRows > 0) {
                //    Can't have both, prioritise on cascade
                switch (this.cascade) {
                    case 'left':
                    case 'right':
                        this._maxCols = 0;
                        break;
                    case 'up':
                    case 'down':
                    default:
                        this._maxRows = 0;
                        break;
                }
            }
            this._updatePositionsAfterMaxChange();
        }
        this._calculateColWidth();
        this._calculateRowHeight();
        var /** @type {?} */ maxWidth = this._maxCols * this.colWidth;
        var /** @type {?} */ maxHeight = this._maxRows * this.rowHeight;
        if (maxWidth > 0 && this.minWidth > maxWidth)
            this.minWidth = 0.75 * this.colWidth;
        if (maxHeight > 0 && this.minHeight > maxHeight)
            this.minHeight = 0.75 * this.rowHeight;
        if (this.minWidth > this.colWidth)
            this.minCols = Math.max(this.minCols, Math.ceil(this.minWidth / this.colWidth));
        if (this.minHeight > this.rowHeight)
            this.minRows = Math.max(this.minRows, Math.ceil(this.minHeight / this.rowHeight));
        if (this._maxCols > 0 && this.minCols > this._maxCols)
            this.minCols = 1;
        if (this._maxRows > 0 && this.minRows > this._maxRows)
            this.minRows = 1;
        this._updateRatio();
        this._items.forEach(function (item) {
            _this._removeFromGrid(item);
            item.setCascadeMode(_this.cascade);
        });
        this._items.forEach(function (item) {
            item.recalculateSelf();
            _this._addToGrid(item);
        });
        this._cascadeGrid();
        this._updateSize();
    };
    /**
     * @param {?} itemId
     * @return {?}
     */
    NgGrid.prototype.getItemPosition = /**
     * @param {?} itemId
     * @return {?}
     */
    function (itemId) {
        return this._items.has(itemId) ? this._items.get(itemId).getGridPosition() : null;
    };
    /**
     * @param {?} itemId
     * @return {?}
     */
    NgGrid.prototype.getItemSize = /**
     * @param {?} itemId
     * @return {?}
     */
    function (itemId) {
        return this._items.has(itemId) ? this._items.get(itemId).getSize() : null;
    };
    /**
     * @return {?}
     */
    NgGrid.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this._differ != null) {
            var /** @type {?} */ changes = this._differ.diff(this._config);
            if (changes != null) {
                this._applyChanges(changes);
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} margins
     * @return {?}
     */
    NgGrid.prototype.setMargins = /**
     * @param {?} margins
     * @return {?}
     */
    function (margins) {
        this.marginTop = Math.max(parseInt(margins[0]), 0);
        this.marginRight = margins.length >= 2 ? Math.max(parseInt(margins[1]), 0) : this.marginTop;
        this.marginBottom = margins.length >= 3 ? Math.max(parseInt(margins[2]), 0) : this.marginTop;
        this.marginLeft = margins.length >= 4 ? Math.max(parseInt(margins[3]), 0) : this.marginRight;
    };
    /**
     * @return {?}
     */
    NgGrid.prototype.enableDrag = /**
     * @return {?}
     */
    function () {
        this.dragEnable = true;
    };
    /**
     * @return {?}
     */
    NgGrid.prototype.disableDrag = /**
     * @return {?}
     */
    function () {
        this.dragEnable = false;
    };
    /**
     * @return {?}
     */
    NgGrid.prototype.enableResize = /**
     * @return {?}
     */
    function () {
        this.resizeEnable = true;
    };
    /**
     * @return {?}
     */
    NgGrid.prototype.disableResize = /**
     * @return {?}
     */
    function () {
        this.resizeEnable = false;
    };
    /**
     * @param {?} ngItem
     * @return {?}
     */
    NgGrid.prototype.addItem = /**
     * @param {?} ngItem
     * @return {?}
     */
    function (ngItem) {
        var _this = this;
        ngItem.setCascadeMode(this.cascade);
        if (!this._preferNew) {
            var /** @type {?} */ newPos = this._fixGridPosition(ngItem.getGridPosition(), ngItem.getSize());
            ngItem.setGridPosition(newPos);
        }
        if (ngItem.uid === null || this._items.has(ngItem.uid)) {
            ngItem.uid = this.generateItemUid();
        }
        this._items.set(ngItem.uid, ngItem);
        this._addToGrid(ngItem);
        this._updateSize();
        this.triggerCascade().then(function () {
            ngItem.recalculateSelf();
            ngItem.onCascadeEvent();
            _this._emitOnItemChange();
        });
    };
    /**
     * @param {?} ngItem
     * @return {?}
     */
    NgGrid.prototype.removeItem = /**
     * @param {?} ngItem
     * @return {?}
     */
    function (ngItem) {
        var _this = this;
        this._removeFromGrid(ngItem);
        this._items.delete(ngItem.uid);
        if (this._destroyed)
            return;
        this.triggerCascade().then(function () {
            _this._updateSize();
            _this._items.forEach(function (item) { return item.recalculateSelf(); });
            _this._emitOnItemChange();
        });
    };
    /**
     * @param {?} ngItem
     * @return {?}
     */
    NgGrid.prototype.updateItem = /**
     * @param {?} ngItem
     * @return {?}
     */
    function (ngItem) {
        var _this = this;
        this._removeFromGrid(ngItem);
        this._addToGrid(ngItem);
        this.triggerCascade().then(function () {
            _this._updateSize();
            ngItem.onCascadeEvent();
        });
    };
    /**
     * @return {?}
     */
    NgGrid.prototype.triggerCascade = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._cascadePromise) {
            this._cascadePromise = new Promise(function (resolve) {
                setTimeout(function () {
                    _this._cascadePromise = null;
                    _this._cascadeGrid(null, null);
                    resolve();
                }, 0);
            });
        }
        return this._cascadePromise;
    };
    /**
     * @return {?}
     */
    NgGrid.prototype.triggerResize = /**
     * @return {?}
     */
    function () {
        this.resizeEventHandler(null);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype.resizeEventHandler = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._calculateColWidth();
        this._calculateRowHeight();
        this._updateRatio();
        if (this._limitToScreen) {
            var /** @type {?} */ newMaxColumns = this._getContainerColumns();
            if (this._maxCols !== newMaxColumns) {
                this._maxCols = newMaxColumns;
                this._updatePositionsAfterMaxChange();
                this._cascadeGrid();
            }
            if (this._centerToScreen) {
                this.screenMargin = this._getScreenMargin();
                this._items.forEach(function (item) {
                    item.recalculateSelf();
                });
            }
        }
        else if (this._autoResize) {
            this._items.forEach(function (item) {
                item.recalculateSelf();
            });
        }
        this._updateSize();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype.mouseDownEventHandler = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var /** @type {?} */ mousePos = this._getMousePosition(e);
        var /** @type {?} */ item = this._getItemFromPosition(mousePos);
        if (item == null)
            return;
        var /** @type {?} */ resizeDirection = item.canResize(e);
        if (this.resizeEnable && resizeDirection) {
            this._resizeReady = true;
            this._resizingItem = item;
            this._resizeDirection = resizeDirection;
            e.preventDefault();
        }
        else if (this.dragEnable && item.canDrag(e)) {
            this._dragReady = true;
            this._draggingItem = item;
            var /** @type {?} */ itemPos = item.getPosition();
            this._posOffset = { 'left': (mousePos.left - itemPos.left), 'top': (mousePos.top - itemPos.top) };
            e.preventDefault();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype.mouseUpEventHandler = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.isDragging) {
            this._dragStop(e);
        }
        else if (this.isResizing) {
            this._resizeStop(e);
        }
        else if (this._dragReady || this._resizeReady) {
            this._cleanDrag();
            this._cleanResize();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype.mouseMoveEventHandler = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this._resizeReady) {
            this._resizeStart(e);
            e.preventDefault();
            return;
        }
        else if (this._dragReady) {
            this._dragStart(e);
            e.preventDefault();
            return;
        }
        if (this.isDragging) {
            this._drag(e);
        }
        else if (this.isResizing) {
            this._resize(e);
        }
        else {
            var /** @type {?} */ mousePos = this._getMousePosition(e);
            var /** @type {?} */ item = this._getItemFromPosition(mousePos);
            if (item) {
                item.onMouseMove(e);
            }
        }
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._getFixDirectionFromCascade = /**
     * @return {?}
     */
    function () {
        switch (this.cascade) {
            case 'up':
            case 'down':
            default:
                return 'vertical';
            case 'left':
            case 'right':
                return 'horizontal';
        }
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._updatePositionsAfterMaxChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._items.forEach(function (item) {
            var /** @type {?} */ pos = item.getGridPosition();
            var /** @type {?} */ dims = item.getSize();
            if (!_this._hasGridCollision(pos, dims) && _this._isWithinBounds(pos, dims) && dims.x <= _this._maxCols && dims.y <= _this._maxRows) {
                return;
            }
            _this._removeFromGrid(item);
            if (_this._maxCols > 0 && dims.x > _this._maxCols) {
                dims.x = _this._maxCols;
                item.setSize(dims);
            }
            else if (_this._maxRows > 0 && dims.y > _this._maxRows) {
                dims.y = _this._maxRows;
                item.setSize(dims);
            }
            if (_this._hasGridCollision(pos, dims) || !_this._isWithinBounds(pos, dims, true)) {
                var /** @type {?} */ newPosition = _this._fixGridPosition(pos, dims);
                item.setGridPosition(newPosition);
            }
            _this._addToGrid(item);
        });
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._calculateColWidth = /**
     * @return {?}
     */
    function () {
        if (this._autoResize) {
            if (this._maxCols > 0 || this._visibleCols > 0) {
                var /** @type {?} */ maxCols = this._maxCols > 0 ? this._maxCols : this._visibleCols;
                var /** @type {?} */ maxWidth = this._ngEl.nativeElement.getBoundingClientRect().width;
                var /** @type {?} */ colWidth = Math.floor(maxWidth / maxCols);
                colWidth -= (this.marginLeft + this.marginRight);
                if (colWidth > 0)
                    this.colWidth = colWidth;
            }
        }
        if (this.colWidth < this.minWidth || this.minCols > this._config.min_cols) {
            this.minCols = Math.max(this._config.min_cols, Math.ceil(this.minWidth / this.colWidth));
        }
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._calculateRowHeight = /**
     * @return {?}
     */
    function () {
        if (this._autoResize) {
            if (this._maxRows > 0 || this._visibleRows > 0) {
                var /** @type {?} */ maxRows = this._maxRows > 0 ? this._maxRows : this._visibleRows;
                var /** @type {?} */ maxHeight = void 0;
                if (this._elementBasedDynamicRowHeight) {
                    maxHeight = this._ngEl.nativeElement.getBoundingClientRect().height;
                }
                else {
                    maxHeight = window.innerHeight - this.marginTop - this.marginBottom;
                }
                var /** @type {?} */ rowHeight = Math.max(Math.floor(maxHeight / maxRows), this.minHeight);
                rowHeight -= (this.marginTop + this.marginBottom);
                if (rowHeight > 0)
                    this.rowHeight = rowHeight;
            }
        }
        if (this.rowHeight < this.minHeight || this.minRows > this._config.min_rows) {
            this.minRows = Math.max(this._config.min_rows, Math.ceil(this.minHeight / this.rowHeight));
        }
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._updateRatio = /**
     * @return {?}
     */
    function () {
        if (!this._autoResize || !this._maintainRatio)
            return;
        if (this._maxCols > 0 && this._visibleRows <= 0) {
            this.rowHeight = this.colWidth / this._aspectRatio;
        }
        else if (this._maxRows > 0 && this._visibleCols <= 0) {
            this.colWidth = this._aspectRatio * this.rowHeight;
        }
        else if (this._maxCols == 0 && this._maxRows == 0) {
            if (this._visibleCols > 0) {
                this.rowHeight = this.colWidth / this._aspectRatio;
            }
            else if (this._visibleRows > 0) {
                this.colWidth = this._aspectRatio * this.rowHeight;
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgGrid.prototype._applyChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) { _this._config[record.key] = record.currentValue; });
        changes.forEachChangedItem(function (record) { _this._config[record.key] = record.currentValue; });
        changes.forEachRemovedItem(function (record) { delete _this._config[record.key]; });
        this.setConfig(this._config);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype._resizeStart = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.resizeEnable || !this._resizingItem)
            return;
        //    Setup
        this._resizingItem.startMoving();
        this._removeFromGrid(this._resizingItem);
        this._createPlaceholder(this._resizingItem);
        if (this._allowOverlap) {
            this._resizingItem.zIndex = this._lastZValue++;
        }
        //    Status Flags
        this.isResizing = true;
        this._resizeReady = false;
        //    Events
        this.onResizeStart.emit(this._resizingItem);
        this._resizingItem.onResizeStartEvent();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype._dragStart = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.dragEnable || !this._draggingItem)
            return;
        //    Start dragging
        this._draggingItem.startMoving();
        this._removeFromGrid(this._draggingItem);
        this._createPlaceholder(this._draggingItem);
        if (this._allowOverlap) {
            this._draggingItem.zIndex = this._lastZValue++;
        }
        //    Status Flags
        this.isDragging = true;
        this._dragReady = false;
        //    Events
        this.onDragStart.emit(this._draggingItem);
        this._draggingItem.onDragStartEvent();
        //    Zoom
        if (this._zoomOnDrag) {
            this._zoomOut();
        }
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._zoomOut = /**
     * @return {?}
     */
    function () {
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'transform', 'scale(0.5, 0.5)');
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._resetZoom = /**
     * @return {?}
     */
    function () {
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'transform', '');
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype._drag = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.isDragging)
            return;
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        }
        else if ((/** @type {?} */ (document)).selection) {
            (/** @type {?} */ (document)).selection.empty();
        }
        var /** @type {?} */ mousePos = this._getMousePosition(e);
        var /** @type {?} */ newL = (mousePos.left - this._posOffset.left);
        var /** @type {?} */ newT = (mousePos.top - this._posOffset.top);
        var /** @type {?} */ itemPos = this._draggingItem.getGridPosition();
        var /** @type {?} */ gridPos = this._calculateGridPosition(newL, newT);
        var /** @type {?} */ dims = this._draggingItem.getSize();
        gridPos = this._fixPosToBoundsX(gridPos, dims);
        if (!this._isWithinBoundsY(gridPos, dims)) {
            gridPos = this._fixPosToBoundsY(gridPos, dims);
        }
        if (gridPos.col != itemPos.col || gridPos.row != itemPos.row) {
            this._draggingItem.setGridPosition(gridPos, this._fixToGrid);
            this._placeholderRef.instance.setGridPosition(gridPos);
            if (['up', 'down', 'left', 'right'].indexOf(this.cascade) >= 0) {
                this._fixGridCollisions(gridPos, dims);
                this._cascadeGrid(gridPos, dims);
            }
        }
        if (!this._fixToGrid) {
            this._draggingItem.setPosition(newL, newT);
        }
        this.onDrag.emit(this._draggingItem);
        this._draggingItem.onDragEvent();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype._resize = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.isResizing) {
            return;
        }
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges();
            }
        }
        else if ((/** @type {?} */ (document)).selection) {
            (/** @type {?} */ (document)).selection.empty();
        }
        var /** @type {?} */ mousePos = this._getMousePosition(e);
        var /** @type {?} */ itemPos = this._resizingItem.getPosition();
        var /** @type {?} */ itemDims = this._resizingItem.getDimensions();
        var /** @type {?} */ endCorner = {
            left: itemPos.left + itemDims.width,
            top: itemPos.top + itemDims.height,
        };
        var /** @type {?} */ resizeTop = this._resizeDirection.includes('top');
        var /** @type {?} */ resizeBottom = this._resizeDirection.includes('bottom');
        var /** @type {?} */ resizeLeft = this._resizeDirection.includes('left');
        var /** @type {?} */ resizeRight = this._resizeDirection.includes('right');
        // Calculate new width and height based upon resize direction
        var /** @type {?} */ newW = resizeRight
            ? (mousePos.left - itemPos.left + 1)
            : resizeLeft
                ? (endCorner.left - mousePos.left + 1)
                : itemDims.width;
        var /** @type {?} */ newH = resizeBottom
            ? (mousePos.top - itemPos.top + 1)
            : resizeTop
                ? (endCorner.top - mousePos.top + 1)
                : itemDims.height;
        if (newW < this.minWidth)
            newW = this.minWidth;
        if (newH < this.minHeight)
            newH = this.minHeight;
        if (newW < this._resizingItem.minWidth)
            newW = this._resizingItem.minWidth;
        if (newH < this._resizingItem.minHeight)
            newH = this._resizingItem.minHeight;
        var /** @type {?} */ newX = itemPos.left;
        var /** @type {?} */ newY = itemPos.top;
        if (resizeLeft)
            newX = endCorner.left - newW;
        if (resizeTop)
            newY = endCorner.top - newH;
        var /** @type {?} */ calcSize = this._calculateGridSize(newW, newH);
        var /** @type {?} */ itemSize = this._resizingItem.getSize();
        var /** @type {?} */ iGridPos = this._resizingItem.getGridPosition();
        var /** @type {?} */ bottomRightCorner = {
            col: iGridPos.col + itemSize.x,
            row: iGridPos.row + itemSize.y,
        };
        var /** @type {?} */ targetPos = Object.assign({}, iGridPos);
        if (this._resizeDirection.includes('top'))
            targetPos.row = bottomRightCorner.row - calcSize.y;
        if (this._resizeDirection.includes('left'))
            targetPos.col = bottomRightCorner.col - calcSize.x;
        if (!this._isWithinBoundsX(targetPos, calcSize))
            calcSize = this._fixSizeToBoundsX(targetPos, calcSize);
        if (!this._isWithinBoundsY(targetPos, calcSize))
            calcSize = this._fixSizeToBoundsY(targetPos, calcSize);
        calcSize = this._resizingItem.fixResize(calcSize);
        if (calcSize.x != itemSize.x || calcSize.y != itemSize.y) {
            this._resizingItem.setGridPosition(targetPos, this._fixToGrid);
            this._placeholderRef.instance.setGridPosition(targetPos);
            this._resizingItem.setSize(calcSize, this._fixToGrid);
            this._placeholderRef.instance.setSize(calcSize);
            if (['up', 'down', 'left', 'right'].indexOf(this.cascade) >= 0) {
                this._fixGridCollisions(targetPos, calcSize);
                this._cascadeGrid(targetPos, calcSize);
            }
        }
        if (!this._fixToGrid) {
            this._resizingItem.setDimensions(newW, newH);
            this._resizingItem.setPosition(newX, newY);
        }
        this.onResize.emit(this._resizingItem);
        this._resizingItem.onResizeEvent();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype._dragStop = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        var /** @type {?} */ itemPos = this._draggingItem.getGridPosition();
        this._draggingItem.setGridPosition(itemPos);
        this._addToGrid(this._draggingItem);
        this._cascadeGrid();
        this._updateSize();
        this._draggingItem.stopMoving();
        this._draggingItem.onDragStopEvent();
        this.onDragStop.emit(this._draggingItem);
        this._cleanDrag();
        this._placeholderRef.destroy();
        this._emitOnItemChange();
        if (this._zoomOnDrag) {
            this._resetZoom();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype._resizeStop = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.isResizing)
            return;
        this.isResizing = false;
        var /** @type {?} */ itemDims = this._resizingItem.getSize();
        this._resizingItem.setSize(itemDims);
        var /** @type {?} */ itemPos = this._resizingItem.getGridPosition();
        this._resizingItem.setGridPosition(itemPos);
        this._addToGrid(this._resizingItem);
        this._cascadeGrid();
        this._updateSize();
        this._resizingItem.stopMoving();
        this._resizingItem.onResizeStopEvent();
        this.onResizeStop.emit(this._resizingItem);
        this._cleanResize();
        this._placeholderRef.destroy();
        this._emitOnItemChange();
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._cleanDrag = /**
     * @return {?}
     */
    function () {
        this._draggingItem = null;
        this._posOffset = null;
        this.isDragging = false;
        this._dragReady = false;
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._cleanResize = /**
     * @return {?}
     */
    function () {
        this._resizingItem = null;
        this._resizeDirection = null;
        this.isResizing = false;
        this._resizeReady = false;
    };
    /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    NgGrid.prototype._calculateGridSize = /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (width, height) {
        width += this.marginLeft + this.marginRight;
        height += this.marginTop + this.marginBottom;
        var /** @type {?} */ sizex = Math.max(this.minCols, Math.round(width / (this.colWidth + this.marginLeft + this.marginRight)));
        var /** @type {?} */ sizey = Math.max(this.minRows, Math.round(height / (this.rowHeight + this.marginTop + this.marginBottom)));
        if (!this._isWithinBoundsX({ col: 1, row: 1 }, { x: sizex, y: sizey }))
            sizex = this._maxCols;
        if (!this._isWithinBoundsY({ col: 1, row: 1 }, { x: sizex, y: sizey }))
            sizey = this._maxRows;
        return { 'x': sizex, 'y': sizey };
    };
    /**
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    NgGrid.prototype._calculateGridPosition = /**
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    function (left, top) {
        var /** @type {?} */ col = Math.max(1, Math.round(left / (this.colWidth + this.marginLeft + this.marginRight)) + 1);
        var /** @type {?} */ row = Math.max(1, Math.round(top / (this.rowHeight + this.marginTop + this.marginBottom)) + 1);
        if (!this._isWithinBoundsX({ col: col, row: row }, { x: 1, y: 1 }))
            col = this._maxCols;
        if (!this._isWithinBoundsY({ col: col, row: row }, { x: 1, y: 1 }))
            row = this._maxRows;
        return { 'col': col, 'row': row };
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._hasGridCollision = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        var /** @type {?} */ positions = this._getCollisions(pos, dims);
        if (positions == null || positions.length == 0)
            return false;
        return positions.some(function (v) {
            return !(v === null);
        });
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._getCollisions = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        var _this = this;
        if (this._allowOverlap)
            return [];
        var /** @type {?} */ returns = [];
        if (!pos.col) {
            pos.col = 1;
        }
        if (!pos.row) {
            pos.row = 1;
        }
        var /** @type {?} */ leftCol = pos.col;
        var /** @type {?} */ rightCol = pos.col + dims.x;
        var /** @type {?} */ topRow = pos.row;
        var /** @type {?} */ bottomRow = pos.row + dims.y;
        this._itemsInGrid.forEach(function (itemId) {
            var /** @type {?} */ item = _this._items.get(itemId);
            if (!item) {
                _this._itemsInGrid.delete(itemId);
                return;
            }
            var /** @type {?} */ itemLeftCol = item.col;
            var /** @type {?} */ itemRightCol = item.col + item.sizex;
            var /** @type {?} */ itemTopRow = item.row;
            var /** @type {?} */ itemBottomRow = item.row + item.sizey;
            var /** @type {?} */ withinColumns = leftCol < itemRightCol && itemLeftCol < rightCol;
            var /** @type {?} */ withinRows = topRow < itemBottomRow && itemTopRow < bottomRow;
            if (withinColumns && withinRows) {
                returns.push(item);
            }
        });
        return returns;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._fixGridCollisions = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        var /** @type {?} */ collisions = this._getCollisions(pos, dims);
        if (collisions.length === 0) {
            return;
        }
        try {
            for (var collisions_1 = tslib_1.__values(collisions), collisions_1_1 = collisions_1.next(); !collisions_1_1.done; collisions_1_1 = collisions_1.next()) {
                var collision = collisions_1_1.value;
                this._removeFromGrid(collision);
                var /** @type {?} */ itemDims = collision.getSize();
                var /** @type {?} */ itemPos = collision.getGridPosition();
                var /** @type {?} */ newItemPos = { col: itemPos.col, row: itemPos.row };
                if (this._collisionFixDirection === 'vertical') {
                    newItemPos.row = pos.row + dims.y;
                    if (!this._isWithinBoundsY(newItemPos, itemDims)) {
                        newItemPos.col = pos.col + dims.x;
                        newItemPos.row = 1;
                    }
                }
                else if (this._collisionFixDirection === 'horizontal') {
                    newItemPos.col = pos.col + dims.x;
                    if (!this._isWithinBoundsX(newItemPos, itemDims)) {
                        newItemPos.col = 1;
                        newItemPos.row = pos.row + dims.y;
                    }
                }
                collision.setGridPosition(newItemPos);
                this._fixGridCollisions(newItemPos, itemDims);
                this._addToGrid(collision);
                collision.onCascadeEvent();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (collisions_1_1 && !collisions_1_1.done && (_a = collisions_1.return)) _a.call(collisions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._fixGridCollisions(pos, dims);
        var e_1, _a;
    };
    /**
     * @param {?=} pos
     * @param {?=} dims
     * @return {?}
     */
    NgGrid.prototype._cascadeGrid = /**
     * @param {?=} pos
     * @param {?=} dims
     * @return {?}
     */
    function (pos, dims) {
        var _this = this;
        if (this._destroyed)
            return;
        if (this._allowOverlap)
            return;
        if (!pos !== !dims)
            throw new Error('Cannot cascade with only position and not dimensions');
        if (this.isDragging && this._draggingItem && !pos && !dims) {
            pos = this._draggingItem.getGridPosition();
            dims = this._draggingItem.getSize();
        }
        else if (this.isResizing && this._resizingItem && !pos && !dims) {
            pos = this._resizingItem.getGridPosition();
            dims = this._resizingItem.getSize();
        }
        var /** @type {?} */ itemsInGrid = Array.from(this._itemsInGrid, function (itemId) { return _this._items.get(itemId); });
        switch (this.cascade) {
            case 'up':
            case 'down':
                itemsInGrid = itemsInGrid.sort(NgGridHelper.sortItemsByPositionVertical);
                var /** @type {?} */ lowestRowPerColumn = new Map();
                try {
                    for (var itemsInGrid_1 = tslib_1.__values(itemsInGrid), itemsInGrid_1_1 = itemsInGrid_1.next(); !itemsInGrid_1_1.done; itemsInGrid_1_1 = itemsInGrid_1.next()) {
                        var item = itemsInGrid_1_1.value;
                        if (item.isFixed)
                            continue;
                        var /** @type {?} */ itemDims = item.getSize();
                        var /** @type {?} */ itemPos = item.getGridPosition();
                        var /** @type {?} */ lowestRowForItem = lowestRowPerColumn.get(itemPos.col) || 1;
                        for (var /** @type {?} */ i = 1; i < itemDims.x; i++) {
                            var /** @type {?} */ lowestRowForColumn = lowestRowPerColumn.get(itemPos.col + i) || 1;
                            lowestRowForItem = Math.max(lowestRowForColumn, lowestRowForItem);
                        }
                        var /** @type {?} */ leftCol = itemPos.col;
                        var /** @type {?} */ rightCol = itemPos.col + itemDims.x;
                        if (pos && dims) {
                            var /** @type {?} */ withinColumns = rightCol > pos.col && leftCol < (pos.col + dims.x);
                            if (withinColumns) {
                                // If our element is in one of the item's columns
                                var /** @type {?} */ roomAboveItem = itemDims.y <= (pos.row - lowestRowForItem);
                                if (!roomAboveItem) {
                                    // Item can't fit above our element
                                    lowestRowForItem = Math.max(lowestRowForItem, pos.row + dims.y); // Set the lowest row to be below it
                                }
                            }
                        }
                        var /** @type {?} */ newPos = { col: itemPos.col, row: lowestRowForItem };
                        //    What if it's not within bounds Y?
                        if (lowestRowForItem != itemPos.row && this._isWithinBoundsY(newPos, itemDims)) {
                            // If the item is not already on this row move it up
                            this._removeFromGrid(item);
                            item.setGridPosition(newPos);
                            item.onCascadeEvent();
                            this._addToGrid(item);
                        }
                        for (var /** @type {?} */ i = 0; i < itemDims.x; i++) {
                            lowestRowPerColumn.set(itemPos.col + i, lowestRowForItem + itemDims.y); // Update the lowest row to be below the item
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (itemsInGrid_1_1 && !itemsInGrid_1_1.done && (_a = itemsInGrid_1.return)) _a.call(itemsInGrid_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                break;
            case 'left':
            case 'right':
                itemsInGrid = itemsInGrid.sort(NgGridHelper.sortItemsByPositionHorizontal);
                var /** @type {?} */ lowestColumnPerRow = new Map();
                try {
                    for (var itemsInGrid_2 = tslib_1.__values(itemsInGrid), itemsInGrid_2_1 = itemsInGrid_2.next(); !itemsInGrid_2_1.done; itemsInGrid_2_1 = itemsInGrid_2.next()) {
                        var item = itemsInGrid_2_1.value;
                        var /** @type {?} */ itemDims = item.getSize();
                        var /** @type {?} */ itemPos = item.getGridPosition();
                        var /** @type {?} */ lowestColumnForItem = lowestColumnPerRow.get(itemPos.row) || 1;
                        for (var /** @type {?} */ i = 1; i < itemDims.y; i++) {
                            var /** @type {?} */ lowestOffsetColumn = lowestColumnPerRow.get(itemPos.row + i) || 1;
                            lowestColumnForItem = Math.max(lowestOffsetColumn, lowestColumnForItem);
                        }
                        var /** @type {?} */ topRow = itemPos.row;
                        var /** @type {?} */ bottomRow = itemPos.row + itemDims.y;
                        if (pos && dims) {
                            var /** @type {?} */ withinRows = bottomRow > pos.col && topRow < (pos.col + dims.x);
                            if (withinRows) {
                                // If our element is in one of the item's rows
                                var /** @type {?} */ roomNextToItem = itemDims.x <= (pos.col - lowestColumnForItem);
                                if (!roomNextToItem) {
                                    // Item can't fit next to our element
                                    lowestColumnForItem = Math.max(lowestColumnForItem, pos.col + dims.x); // Set the lowest col to be the other side of it
                                }
                            }
                        }
                        var /** @type {?} */ newPos = { col: lowestColumnForItem, row: itemPos.row };
                        if (lowestColumnForItem != itemPos.col && this._isWithinBoundsX(newPos, itemDims)) {
                            // If the item is not already on this col move it up
                            this._removeFromGrid(item);
                            item.setGridPosition(newPos);
                            item.onCascadeEvent();
                            this._addToGrid(item);
                        }
                        for (var /** @type {?} */ i = 0; i < itemDims.y; i++) {
                            lowestColumnPerRow.set(itemPos.row + i, lowestColumnForItem + itemDims.x); // Update the lowest col to be below the item
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (itemsInGrid_2_1 && !itemsInGrid_2_1.done && (_b = itemsInGrid_2.return)) _b.call(itemsInGrid_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                break;
            default:
                break;
        }
        var e_2, _a, e_3, _b;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._fixGridPosition = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        if (!this._hasGridCollision(pos, dims))
            return pos;
        var /** @type {?} */ maxRow = this._maxRows === 0 ? this._getMaxRow() : this._maxRows;
        var /** @type {?} */ maxCol = this._maxCols === 0 ? this._getMaxCol() : this._maxCols;
        var /** @type {?} */ newPos = {
            col: pos.col,
            row: pos.row,
        };
        if (this._itemFixDirection === 'vertical') {
            fixLoop: for (; newPos.col <= maxRow;) {
                var /** @type {?} */ itemsInPath = this._getItemsInVerticalPath(newPos, dims, newPos.row);
                var /** @type {?} */ nextRow = newPos.row;
                try {
                    for (var itemsInPath_1 = tslib_1.__values(itemsInPath), itemsInPath_1_1 = itemsInPath_1.next(); !itemsInPath_1_1.done; itemsInPath_1_1 = itemsInPath_1.next()) {
                        var item = itemsInPath_1_1.value;
                        if (item.row - nextRow >= dims.y) {
                            newPos.row = nextRow;
                            break fixLoop;
                        }
                        nextRow = item.row + item.sizey;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (itemsInPath_1_1 && !itemsInPath_1_1.done && (_a = itemsInPath_1.return)) _a.call(itemsInPath_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                if (maxRow - nextRow >= dims.y) {
                    newPos.row = nextRow;
                    break fixLoop;
                }
                newPos.col = Math.max(newPos.col + 1, Math.min.apply(Math, itemsInPath.map(function (item) { return item.col + dims.x; })));
                newPos.row = 1;
            }
        }
        else if (this._itemFixDirection === 'horizontal') {
            fixLoop: for (; newPos.row <= maxRow;) {
                var /** @type {?} */ itemsInPath = this._getItemsInHorizontalPath(newPos, dims, newPos.col);
                var /** @type {?} */ nextCol = newPos.col;
                try {
                    for (var itemsInPath_2 = tslib_1.__values(itemsInPath), itemsInPath_2_1 = itemsInPath_2.next(); !itemsInPath_2_1.done; itemsInPath_2_1 = itemsInPath_2.next()) {
                        var item = itemsInPath_2_1.value;
                        if (item.col - nextCol >= dims.x) {
                            newPos.col = nextCol;
                            break fixLoop;
                        }
                        nextCol = item.col + item.sizex;
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (itemsInPath_2_1 && !itemsInPath_2_1.done && (_b = itemsInPath_2.return)) _b.call(itemsInPath_2);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                if (maxCol - nextCol >= dims.x) {
                    newPos.col = nextCol;
                    break fixLoop;
                }
                newPos.row = Math.max(newPos.row + 1, Math.min.apply(Math, itemsInPath.map(function (item) { return item.row + dims.y; })));
                newPos.col = 1;
            }
        }
        return newPos;
        var e_4, _a, e_5, _b;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} startColumn
     * @return {?}
     */
    NgGrid.prototype._getItemsInHorizontalPath = /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} startColumn
     * @return {?}
     */
    function (pos, dims, startColumn) {
        var _this = this;
        if (startColumn === void 0) { startColumn = 0; }
        var /** @type {?} */ itemsInPath = [];
        var /** @type {?} */ topRow = pos.row + dims.y - 1;
        this._itemsInGrid.forEach(function (itemId) {
            var /** @type {?} */ item = _this._items.get(itemId);
            if (item.col + item.sizex - 1 < startColumn) {
                return;
            } // Item falls after start column
            if (item.row > topRow) {
                return;
            } // Item falls above path
            if (item.row + item.sizey - 1 < pos.row) {
                return;
            } // Item falls below path
            itemsInPath.push(item);
        });
        return itemsInPath;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} startRow
     * @return {?}
     */
    NgGrid.prototype._getItemsInVerticalPath = /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} startRow
     * @return {?}
     */
    function (pos, dims, startRow) {
        var _this = this;
        if (startRow === void 0) { startRow = 0; }
        var /** @type {?} */ itemsInPath = [];
        var /** @type {?} */ rightCol = pos.col + dims.x - 1;
        this._itemsInGrid.forEach(function (itemId) {
            var /** @type {?} */ item = _this._items.get(itemId);
            if (item.row + item.sizey - 1 < startRow) {
                return;
            } // Item falls above start row
            if (item.col > rightCol) {
                return;
            } // Item falls after path
            if (item.col + item.sizex - 1 < pos.col) {
                return;
            } // Item falls before path
            itemsInPath.push(item);
        });
        return itemsInPath;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} allowExcessiveItems
     * @return {?}
     */
    NgGrid.prototype._isWithinBoundsX = /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} allowExcessiveItems
     * @return {?}
     */
    function (pos, dims, allowExcessiveItems) {
        if (allowExcessiveItems === void 0) { allowExcessiveItems = false; }
        return this._maxCols == 0 || (allowExcessiveItems && pos.col == 1) || (pos.col + dims.x - 1) <= this._maxCols;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._fixPosToBoundsX = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        if (!this._isWithinBoundsX(pos, dims)) {
            pos.col = Math.max(this._maxCols - (dims.x - 1), 1);
            pos.row++;
        }
        return pos;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._fixSizeToBoundsX = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        if (!this._isWithinBoundsX(pos, dims)) {
            dims.x = Math.max(this._maxCols - (pos.col - 1), 1);
            dims.y++;
        }
        return dims;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} allowExcessiveItems
     * @return {?}
     */
    NgGrid.prototype._isWithinBoundsY = /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} allowExcessiveItems
     * @return {?}
     */
    function (pos, dims, allowExcessiveItems) {
        if (allowExcessiveItems === void 0) { allowExcessiveItems = false; }
        return this._maxRows == 0 || (allowExcessiveItems && pos.row == 1) || (pos.row + dims.y - 1) <= this._maxRows;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._fixPosToBoundsY = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        if (!this._isWithinBoundsY(pos, dims)) {
            pos.row = Math.max(this._maxRows - (dims.y - 1), 1);
            pos.col++;
        }
        return pos;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._fixSizeToBoundsY = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        if (!this._isWithinBoundsY(pos, dims)) {
            dims.y = Math.max(this._maxRows - (pos.row - 1), 1);
            dims.x++;
        }
        return dims;
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} allowExcessiveItems
     * @return {?}
     */
    NgGrid.prototype._isWithinBounds = /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} allowExcessiveItems
     * @return {?}
     */
    function (pos, dims, allowExcessiveItems) {
        if (allowExcessiveItems === void 0) { allowExcessiveItems = false; }
        return this._isWithinBoundsX(pos, dims, allowExcessiveItems) && this._isWithinBoundsY(pos, dims, allowExcessiveItems);
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._fixPosToBounds = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        return this._fixPosToBoundsX(this._fixPosToBoundsY(pos, dims), dims);
    };
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    NgGrid.prototype._fixSizeToBounds = /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    function (pos, dims) {
        return this._fixSizeToBoundsX(pos, this._fixSizeToBoundsY(pos, dims));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgGrid.prototype._addToGrid = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ pos = item.getGridPosition();
        var /** @type {?} */ dims = item.getSize();
        if (this._hasGridCollision(pos, dims)) {
            this._fixGridCollisions(pos, dims);
            pos = item.getGridPosition();
        }
        if (this._allowOverlap) {
            item.zIndex = this._lastZValue++;
        }
        this._itemsInGrid.add(item.uid);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgGrid.prototype._removeFromGrid = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this._itemsInGrid.delete(item.uid);
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._updateSize = /**
     * @return {?}
     */
    function () {
        if (this._destroyed)
            return;
        var /** @type {?} */ maxCol = this._getMaxCol();
        var /** @type {?} */ maxRow = this._getMaxRow();
        if (maxCol != this._curMaxCol || maxRow != this._curMaxRow) {
            this._curMaxCol = maxCol;
            this._curMaxRow = maxRow;
        }
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'width', '100%'); //(maxCol * (this.colWidth + this.marginLeft + this.marginRight))+'px');
        if (!this._elementBasedDynamicRowHeight) {
            this._renderer.setElementStyle(this._ngEl.nativeElement, 'height', (maxRow * (this.rowHeight + this.marginTop + this.marginBottom)) + 'px');
        }
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._getMaxRow = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ itemsRows = Array.from(this._itemsInGrid, function (itemId) {
            var /** @type {?} */ item = _this._items.get(itemId);
            if (!item)
                return 0;
            return item.row + item.sizey - 1;
        });
        return Math.max.apply(null, itemsRows);
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._getMaxCol = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ itemsCols = Array.from(this._itemsInGrid, function (itemId) {
            var /** @type {?} */ item = _this._items.get(itemId);
            if (!item)
                return 0;
            return item.col + item.sizex - 1;
        });
        return Math.max.apply(null, itemsCols);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype._getMousePosition = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (((/** @type {?} */ (window)).TouchEvent && e instanceof TouchEvent) || (e.touches || e.changedTouches)) {
            e = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
        }
        var /** @type {?} */ refPos = this._ngEl.nativeElement.getBoundingClientRect();
        var /** @type {?} */ left = e.clientX - refPos.left;
        var /** @type {?} */ top = e.clientY - refPos.top;
        if (this.cascade == 'down')
            top = refPos.top + refPos.height - e.clientY;
        if (this.cascade == 'right')
            left = refPos.left + refPos.width - e.clientX;
        if (this.isDragging && this._zoomOnDrag) {
            left *= 2;
            top *= 2;
        }
        return {
            left: left,
            top: top
        };
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgGrid.prototype._getAbsoluteMousePosition = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (((/** @type {?} */ (window)).TouchEvent && e instanceof TouchEvent) || (e.touches || e.changedTouches)) {
            e = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
        }
        return {
            left: e.clientX,
            top: e.clientY
        };
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._getContainerColumns = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ maxWidth = this._ngEl.nativeElement.getBoundingClientRect().width;
        var /** @type {?} */ itemWidth = this.colWidth + this.marginLeft + this.marginRight;
        return Math.floor(maxWidth / itemWidth);
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._getContainerRows = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ maxHeight = window.innerHeight - this.marginTop - this.marginBottom;
        return Math.floor(maxHeight / (this.rowHeight + this.marginTop + this.marginBottom));
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._getScreenMargin = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ maxWidth = this._ngEl.nativeElement.getBoundingClientRect().width;
        var /** @type {?} */ itemWidth = this.colWidth + this.marginLeft + this.marginRight;
        return Math.floor((maxWidth - (this._maxCols * itemWidth)) / 2);
        ;
    };
    /**
     * @param {?} position
     * @return {?}
     */
    NgGrid.prototype._getItemFromPosition = /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        var _this = this;
        return Array.from(this._itemsInGrid, function (itemId) { return _this._items.get(itemId); }).find(function (item) {
            if (!item)
                return false;
            var /** @type {?} */ size = item.getDimensions();
            var /** @type {?} */ pos = item.getPosition();
            return position.left >= pos.left && position.left < (pos.left + size.width) &&
                position.top >= pos.top && position.top < (pos.top + size.height);
        });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgGrid.prototype._createPlaceholder = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var /** @type {?} */ pos = item.getGridPosition();
        var /** @type {?} */ dims = item.getSize();
        var /** @type {?} */ factory = this.componentFactoryResolver.resolveComponentFactory(NgGridPlaceholder);
        var /** @type {?} */ componentRef = item.containerRef.createComponent(factory);
        this._placeholderRef = componentRef;
        var /** @type {?} */ placeholder = componentRef.instance;
        placeholder.registerGrid(this);
        placeholder.setCascadeMode(this.cascade);
        placeholder.setGridPosition({ col: pos.col, row: pos.row });
        placeholder.setSize({ x: dims.x, y: dims.y });
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._emitOnItemChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ itemOutput = Array.from(this._itemsInGrid)
            .map(function (itemId) { return _this._items.get(itemId); })
            .filter(function (item) { return !!item; })
            .map(function (item) { return item.getEventOutput(); });
        this.onItemChange.emit(itemOutput);
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._defineListeners = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ element = this._ngEl.nativeElement;
        this._documentMousemove$ = fromEvent(document, 'mousemove');
        this._documentMouseup$ = fromEvent(document, 'mouseup');
        this._mousedown$ = fromEvent(element, 'mousedown');
        this._mousemove$ = fromEvent(element, 'mousemove');
        this._mouseup$ = fromEvent(element, 'mouseup');
        this._touchstart$ = fromEvent(element, 'touchstart');
        this._touchmove$ = fromEvent(element, 'touchmove');
        this._touchend$ = fromEvent(element, 'touchend');
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._enableListeners = /**
     * @return {?}
     */
    function () {
        if (this._enabledListener) {
            return;
        }
        this._enableMouseListeners();
        if (this._isTouchDevice()) {
            this._enableTouchListeners();
        }
        this._enabledListener = true;
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._disableListeners = /**
     * @return {?}
     */
    function () {
        this._subscriptions.forEach(function (subs) { return subs.unsubscribe(); });
        this._enabledListener = false;
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._isTouchDevice = /**
     * @return {?}
     */
    function () {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    ;
    /**
     * @return {?}
     */
    NgGrid.prototype._enableTouchListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ touchstartSubs = this._touchstart$.subscribe(function (e) { return _this.mouseDownEventHandler(e); });
        var /** @type {?} */ touchmoveSubs = this._touchmove$.subscribe(function (e) { return _this.mouseMoveEventHandler(e); });
        var /** @type {?} */ touchendSubs = this._touchend$.subscribe(function (e) { return _this.mouseUpEventHandler(e); });
        this._subscriptions.push(touchstartSubs, touchmoveSubs, touchendSubs);
    };
    /**
     * @return {?}
     */
    NgGrid.prototype._enableMouseListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ documentMousemoveSubs = this._documentMousemove$.subscribe(function (e) { return _this.mouseMoveEventHandler(e); });
        var /** @type {?} */ documentMouseupSubs = this._documentMouseup$.subscribe(function (e) { return _this.mouseUpEventHandler(e); });
        var /** @type {?} */ mousedownSubs = this._mousedown$.subscribe(function (e) { return _this.mouseDownEventHandler(e); });
        var /** @type {?} */ mousemoveSubs = this._mousemove$.subscribe(function (e) { return _this.mouseMoveEventHandler(e); });
        var /** @type {?} */ mouseupSubs = this._mouseup$.subscribe(function (e) { return _this.mouseUpEventHandler(e); });
        this._subscriptions.push(documentMousemoveSubs, documentMouseupSubs, mousedownSubs, mousemoveSubs, mouseupSubs);
    };
    NgGrid.CONST_DEFAULT_RESIZE_DIRECTIONS = [
        'bottomright',
        'bottomleft',
        'topright',
        'topleft',
        'right',
        'left',
        'bottom',
        'top',
    ];
    NgGrid.CONST_DEFAULT_CONFIG = {
        margins: [10],
        draggable: true,
        resizable: true,
        max_cols: 0,
        max_rows: 0,
        visible_cols: 0,
        visible_rows: 0,
        col_width: 250,
        row_height: 250,
        cascade: 'up',
        min_width: 100,
        min_height: 100,
        fix_to_grid: false,
        auto_style: true,
        auto_resize: false,
        maintain_ratio: false,
        prefer_new: false,
        zoom_on_drag: false,
        limit_to_screen: false,
        center_to_screen: false,
        resize_directions: NgGrid.CONST_DEFAULT_RESIZE_DIRECTIONS,
        element_based_row_height: false,
        fix_item_position_direction: 'cascade',
        fix_collision_position_direction: 'cascade',
        allow_overlap: false,
    };
    NgGrid.decorators = [
        { type: Directive, args: [{
                    selector: '[ngGrid]',
                    inputs: ['config: ngGrid'],
                    host: {
                        '(window:resize)': 'resizeEventHandler($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    NgGrid.ctorParameters = function () { return [
        { type: KeyValueDiffers },
        { type: ElementRef },
        { type: Renderer },
        { type: ComponentFactoryResolver }
    ]; };
    NgGrid.propDecorators = {
        onDragStart: [{ type: Output }],
        onDrag: [{ type: Output }],
        onDragStop: [{ type: Output }],
        onResizeStart: [{ type: Output }],
        onResize: [{ type: Output }],
        onResizeStop: [{ type: Output }],
        onItemChange: [{ type: Output }]
    };
    return NgGrid;
}());
export { NgGrid };
function NgGrid_tsickle_Closure_declarations() {
    /** @type {?} */
    NgGrid.CONST_DEFAULT_RESIZE_DIRECTIONS;
    /** @type {?} */
    NgGrid.CONST_DEFAULT_CONFIG;
    /** @type {?} */
    NgGrid.prototype.onDragStart;
    /** @type {?} */
    NgGrid.prototype.onDrag;
    /** @type {?} */
    NgGrid.prototype.onDragStop;
    /** @type {?} */
    NgGrid.prototype.onResizeStart;
    /** @type {?} */
    NgGrid.prototype.onResize;
    /** @type {?} */
    NgGrid.prototype.onResizeStop;
    /** @type {?} */
    NgGrid.prototype.onItemChange;
    /** @type {?} */
    NgGrid.prototype.colWidth;
    /** @type {?} */
    NgGrid.prototype.rowHeight;
    /** @type {?} */
    NgGrid.prototype.minCols;
    /** @type {?} */
    NgGrid.prototype.minRows;
    /** @type {?} */
    NgGrid.prototype.marginTop;
    /** @type {?} */
    NgGrid.prototype.marginRight;
    /** @type {?} */
    NgGrid.prototype.marginBottom;
    /** @type {?} */
    NgGrid.prototype.marginLeft;
    /** @type {?} */
    NgGrid.prototype.screenMargin;
    /** @type {?} */
    NgGrid.prototype.isDragging;
    /** @type {?} */
    NgGrid.prototype.isResizing;
    /** @type {?} */
    NgGrid.prototype.autoStyle;
    /** @type {?} */
    NgGrid.prototype.resizeEnable;
    /** @type {?} */
    NgGrid.prototype.dragEnable;
    /** @type {?} */
    NgGrid.prototype.cascade;
    /** @type {?} */
    NgGrid.prototype.minWidth;
    /** @type {?} */
    NgGrid.prototype.minHeight;
    /** @type {?} */
    NgGrid.prototype.resizeDirections;
    /** @type {?} */
    NgGrid.prototype._items;
    /** @type {?} */
    NgGrid.prototype._draggingItem;
    /** @type {?} */
    NgGrid.prototype._resizingItem;
    /** @type {?} */
    NgGrid.prototype._resizeDirection;
    /** @type {?} */
    NgGrid.prototype._itemsInGrid;
    /** @type {?} */
    NgGrid.prototype._containerWidth;
    /** @type {?} */
    NgGrid.prototype._containerHeight;
    /** @type {?} */
    NgGrid.prototype._maxCols;
    /** @type {?} */
    NgGrid.prototype._maxRows;
    /** @type {?} */
    NgGrid.prototype._visibleCols;
    /** @type {?} */
    NgGrid.prototype._visibleRows;
    /** @type {?} */
    NgGrid.prototype._setWidth;
    /** @type {?} */
    NgGrid.prototype._setHeight;
    /** @type {?} */
    NgGrid.prototype._posOffset;
    /** @type {?} */
    NgGrid.prototype._adding;
    /** @type {?} */
    NgGrid.prototype._placeholderRef;
    /** @type {?} */
    NgGrid.prototype._fixToGrid;
    /** @type {?} */
    NgGrid.prototype._autoResize;
    /** @type {?} */
    NgGrid.prototype._differ;
    /** @type {?} */
    NgGrid.prototype._destroyed;
    /** @type {?} */
    NgGrid.prototype._maintainRatio;
    /** @type {?} */
    NgGrid.prototype._aspectRatio;
    /** @type {?} */
    NgGrid.prototype._preferNew;
    /** @type {?} */
    NgGrid.prototype._zoomOnDrag;
    /** @type {?} */
    NgGrid.prototype._limitToScreen;
    /** @type {?} */
    NgGrid.prototype._centerToScreen;
    /** @type {?} */
    NgGrid.prototype._curMaxRow;
    /** @type {?} */
    NgGrid.prototype._curMaxCol;
    /** @type {?} */
    NgGrid.prototype._dragReady;
    /** @type {?} */
    NgGrid.prototype._resizeReady;
    /** @type {?} */
    NgGrid.prototype._elementBasedDynamicRowHeight;
    /** @type {?} */
    NgGrid.prototype._itemFixDirection;
    /** @type {?} */
    NgGrid.prototype._collisionFixDirection;
    /** @type {?} */
    NgGrid.prototype._allowOverlap;
    /** @type {?} */
    NgGrid.prototype._cascadePromise;
    /** @type {?} */
    NgGrid.prototype._lastZValue;
    /** @type {?} */
    NgGrid.prototype._documentMousemove$;
    /** @type {?} */
    NgGrid.prototype._documentMouseup$;
    /** @type {?} */
    NgGrid.prototype._mousedown$;
    /** @type {?} */
    NgGrid.prototype._mousemove$;
    /** @type {?} */
    NgGrid.prototype._mouseup$;
    /** @type {?} */
    NgGrid.prototype._touchstart$;
    /** @type {?} */
    NgGrid.prototype._touchmove$;
    /** @type {?} */
    NgGrid.prototype._touchend$;
    /** @type {?} */
    NgGrid.prototype._subscriptions;
    /** @type {?} */
    NgGrid.prototype._enabledListener;
    /** @type {?} */
    NgGrid.prototype._config;
    /** @type {?} */
    NgGrid.prototype._differs;
    /** @type {?} */
    NgGrid.prototype._ngEl;
    /** @type {?} */
    NgGrid.prototype._renderer;
    /** @type {?} */
    NgGrid.prototype.componentFactoryResolver;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmdHcmlkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItZ3JpZC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvTmdHcmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFhLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSx3QkFBd0IsRUFBK0QsZUFBZSxFQUFnRCxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdlAsT0FBTyxLQUFLLFlBQVksTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQTRCLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7SUFrSnZELGNBQWM7SUFDZCxnQkFDWSxVQUNBLE9BQ0EsV0FDQTtRQUhBLGFBQVEsR0FBUixRQUFRO1FBQ1IsVUFBSyxHQUFMLEtBQUs7UUFDTCxjQUFTLEdBQVQsU0FBUztRQUNULDZCQUF3QixHQUF4Qix3QkFBd0I7OzJCQWpJcUIsSUFBSSxZQUFZLEVBQWM7c0JBQ25DLElBQUksWUFBWSxFQUFjOzBCQUMxQixJQUFJLFlBQVksRUFBYzs2QkFDM0IsSUFBSSxZQUFZLEVBQWM7d0JBQ25DLElBQUksWUFBWSxFQUFjOzRCQUMxQixJQUFJLFlBQVksRUFBYzs0QkFDbEIsSUFBSSxZQUFZLEVBQTBCO3dCQUd0RixHQUFHO3lCQUNGLEdBQUc7dUJBQ0wsQ0FBQzt1QkFDRCxDQUFDO3lCQUNDLEVBQUU7MkJBQ0EsRUFBRTs0QkFDRCxFQUFFOzBCQUNKLEVBQUU7NEJBQ0EsQ0FBQzswQkFDRixLQUFLOzBCQUNMLEtBQUs7eUJBQ04sSUFBSTs0QkFDRCxJQUFJOzBCQUNOLElBQUk7dUJBQ1IsSUFBSTt3QkFDSCxHQUFHO3lCQUNGLEdBQUc7Z0NBQ00sTUFBTSxDQUFDLCtCQUErQjtzQkFHaEMsSUFBSSxHQUFHLEVBQXNCOzZCQUNuQyxJQUFJOzZCQUNKLElBQUk7Z0NB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b250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlciwgRXZlbnRFbWl0dGVyLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEhvc3QsIFZpZXdFbmNhcHN1bGF0aW9uLCBUeXBlLCBDb21wb25lbnRSZWYsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlcnMsIE9uSW5pdCwgT25EZXN0cm95LCBEb0NoZWNrLCBWaWV3Q29udGFpbmVyUmVmLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nR3JpZENvbmZpZywgTmdHcmlkSXRlbUV2ZW50LCBOZ0dyaWRJdGVtUG9zaXRpb24sIE5nR3JpZEl0ZW1TaXplLCBOZ0dyaWRSYXdQb3NpdGlvbiwgTmdHcmlkSXRlbURpbWVuc2lvbnMsIE5nQ29uZmlnRml4RGlyZWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JTmdHcmlkJztcbmltcG9ydCB7IE5nR3JpZEl0ZW0gfSBmcm9tICcuL05nR3JpZEl0ZW0nO1xuaW1wb3J0ICogYXMgTmdHcmlkSGVscGVyIGZyb20gJy4uL2hlbHBlcnMvTmdHcmlkSGVscGVycyc7XG5pbXBvcnQgeyBOZ0dyaWRQbGFjZWhvbGRlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvTmdHcmlkUGxhY2Vob2xkZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmdHcmlkXScsXG4gICAgaW5wdXRzOiBbJ2NvbmZpZzogbmdHcmlkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnKHdpbmRvdzpyZXNpemUpJzogJ3Jlc2l6ZUV2ZW50SGFuZGxlcigkZXZlbnQpJyxcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE5nR3JpZCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgICBwdWJsaWMgc3RhdGljIENPTlNUX0RFRkFVTFRfUkVTSVpFX0RJUkVDVElPTlM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnYm90dG9tcmlnaHQnLFxuICAgICAgICAnYm90dG9tbGVmdCcsXG4gICAgICAgICd0b3ByaWdodCcsXG4gICAgICAgICd0b3BsZWZ0JyxcbiAgICAgICAgJ3JpZ2h0JyxcbiAgICAgICAgJ2xlZnQnLFxuICAgICAgICAnYm90dG9tJyxcbiAgICAgICAgJ3RvcCcsXG4gICAgXTtcblxuICAgIC8vIEV2ZW50IEVtaXR0ZXJzXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWdTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZVN0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNpemVTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkl0ZW1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBcnJheTxOZ0dyaWRJdGVtRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8TmdHcmlkSXRlbUV2ZW50Pj4oKTtcblxuICAgIC8vIFB1YmxpYyB2YXJpYWJsZXNcbiAgICBwdWJsaWMgY29sV2lkdGg6IG51bWJlciA9IDI1MDtcbiAgICBwdWJsaWMgcm93SGVpZ2h0OiBudW1iZXIgPSAyNTA7XG4gICAgcHVibGljIG1pbkNvbHM6IG51bWJlciA9IDE7XG4gICAgcHVibGljIG1pblJvd3M6IG51bWJlciA9IDE7XG4gICAgcHVibGljIG1hcmdpblRvcDogbnVtYmVyID0gMTA7XG4gICAgcHVibGljIG1hcmdpblJpZ2h0OiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgbWFyZ2luQm90dG9tOiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgbWFyZ2luTGVmdDogbnVtYmVyID0gMTA7XG4gICAgcHVibGljIHNjcmVlbk1hcmdpbjogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc1Jlc2l6aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGF1dG9TdHlsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIHJlc2l6ZUVuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGRyYWdFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBjYXNjYWRlOiBzdHJpbmcgPSAndXAnO1xuICAgIHB1YmxpYyBtaW5XaWR0aDogbnVtYmVyID0gMTAwO1xuICAgIHB1YmxpYyBtaW5IZWlnaHQ6IG51bWJlciA9IDEwMDtcbiAgICBwdWJsaWMgcmVzaXplRGlyZWN0aW9uczogc3RyaW5nW10gPSBOZ0dyaWQuQ09OU1RfREVGQVVMVF9SRVNJWkVfRElSRUNUSU9OUztcblxuICAgIC8vIFByaXZhdGUgdmFyaWFibGVzXG4gICAgcHJpdmF0ZSBfaXRlbXM6IE1hcDxzdHJpbmcsIE5nR3JpZEl0ZW0+ID0gbmV3IE1hcDxzdHJpbmcsIE5nR3JpZEl0ZW0+KCk7XG4gICAgcHJpdmF0ZSBfZHJhZ2dpbmdJdGVtOiBOZ0dyaWRJdGVtID0gbnVsbDtcbiAgICBwcml2YXRlIF9yZXNpemluZ0l0ZW06IE5nR3JpZEl0ZW0gPSBudWxsO1xuICAgIHByaXZhdGUgX3Jlc2l6ZURpcmVjdGlvbjogc3RyaW5nID0gbnVsbDtcbiAgICBwcml2YXRlIF9pdGVtc0luR3JpZDogU2V0PHN0cmluZz4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBwcml2YXRlIF9jb250YWluZXJXaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2NvbnRhaW5lckhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgX21heENvbHM6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWF4Um93czogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF92aXNpYmxlQ29sczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF92aXNpYmxlUm93czogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9zZXRXaWR0aDogbnVtYmVyID0gMjUwO1xuICAgIHByaXZhdGUgX3NldEhlaWdodDogbnVtYmVyID0gMjUwO1xuICAgIHByaXZhdGUgX3Bvc09mZnNldDogTmdHcmlkUmF3UG9zaXRpb24gPSBudWxsO1xuICAgIHByaXZhdGUgX2FkZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyUmVmOiBDb21wb25lbnRSZWY8TmdHcmlkUGxhY2Vob2xkZXI+ID0gbnVsbDtcbiAgICBwcml2YXRlIF9maXhUb0dyaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9hdXRvUmVzaXplOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47XG4gICAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbWFpbnRhaW5SYXRpbzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2FzcGVjdFJhdGlvOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfcHJlZmVyTmV3OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfem9vbU9uRHJhZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2xpbWl0VG9TY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9jZW50ZXJUb1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2N1ck1heFJvdzogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9jdXJNYXhDb2w6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfZHJhZ1JlYWR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcmVzaXplUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9lbGVtZW50QmFzZWREeW5hbWljUm93SGVpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaXRlbUZpeERpcmVjdGlvbjogTmdDb25maWdGaXhEaXJlY3Rpb24gPSAnY2FzY2FkZSc7XG4gICAgcHJpdmF0ZSBfY29sbGlzaW9uRml4RGlyZWN0aW9uOiBOZ0NvbmZpZ0ZpeERpcmVjdGlvbiA9ICdjYXNjYWRlJztcbiAgICBwcml2YXRlIF9hbGxvd092ZXJsYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9jYXNjYWRlUHJvbWlzZTogUHJvbWlzZTx2b2lkPjtcbiAgICBwcml2YXRlIF9sYXN0WlZhbHVlOiBudW1iZXIgPSAxO1xuXG4gICAgLy8gRXZlbnRzXG4gICAgcHJpdmF0ZSBfZG9jdW1lbnRNb3VzZW1vdmUkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICAgIHByaXZhdGUgX2RvY3VtZW50TW91c2V1cCQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfbW91c2Vkb3duJDogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PjtcbiAgICBwcml2YXRlIF9tb3VzZW1vdmUkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICAgIHByaXZhdGUgX21vdXNldXAkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICAgIHByaXZhdGUgX3RvdWNoc3RhcnQkOiBPYnNlcnZhYmxlPFRvdWNoRXZlbnQ+O1xuICAgIHByaXZhdGUgX3RvdWNobW92ZSQ6IE9ic2VydmFibGU8VG91Y2hFdmVudD47XG4gICAgcHJpdmF0ZSBfdG91Y2hlbmQkOiBPYnNlcnZhYmxlPFRvdWNoRXZlbnQ+O1xuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBwcml2YXRlIF9lbmFibGVkTGlzdGVuZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIERlZmF1bHQgY29uZmlnXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ09OU1RfREVGQVVMVF9DT05GSUc6IE5nR3JpZENvbmZpZyA9IHtcbiAgICAgICAgbWFyZ2luczogWzEwXSxcbiAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICByZXNpemFibGU6IHRydWUsXG4gICAgICAgIG1heF9jb2xzOiAwLFxuICAgICAgICBtYXhfcm93czogMCxcbiAgICAgICAgdmlzaWJsZV9jb2xzOiAwLFxuICAgICAgICB2aXNpYmxlX3Jvd3M6IDAsXG4gICAgICAgIGNvbF93aWR0aDogMjUwLFxuICAgICAgICByb3dfaGVpZ2h0OiAyNTAsXG4gICAgICAgIGNhc2NhZGU6ICd1cCcsXG4gICAgICAgIG1pbl93aWR0aDogMTAwLFxuICAgICAgICBtaW5faGVpZ2h0OiAxMDAsXG4gICAgICAgIGZpeF90b19ncmlkOiBmYWxzZSxcbiAgICAgICAgYXV0b19zdHlsZTogdHJ1ZSxcbiAgICAgICAgYXV0b19yZXNpemU6IGZhbHNlLFxuICAgICAgICBtYWludGFpbl9yYXRpbzogZmFsc2UsXG4gICAgICAgIHByZWZlcl9uZXc6IGZhbHNlLFxuICAgICAgICB6b29tX29uX2RyYWc6IGZhbHNlLFxuICAgICAgICBsaW1pdF90b19zY3JlZW46IGZhbHNlLFxuICAgICAgICBjZW50ZXJfdG9fc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgcmVzaXplX2RpcmVjdGlvbnM6IE5nR3JpZC5DT05TVF9ERUZBVUxUX1JFU0laRV9ESVJFQ1RJT05TLFxuICAgICAgICBlbGVtZW50X2Jhc2VkX3Jvd19oZWlnaHQ6IGZhbHNlLFxuICAgICAgICBmaXhfaXRlbV9wb3NpdGlvbl9kaXJlY3Rpb246ICdjYXNjYWRlJyxcbiAgICAgICAgZml4X2NvbGxpc2lvbl9wb3NpdGlvbl9kaXJlY3Rpb246ICdjYXNjYWRlJyxcbiAgICAgICAgYWxsb3dfb3ZlcmxhcDogZmFsc2UsXG4gICAgfTtcbiAgICBwcml2YXRlIF9jb25maWcgPSBOZ0dyaWQuQ09OU1RfREVGQVVMVF9DT05GSUc7XG5cbiAgICAvLyBbbmctZ3JpZF0gYXR0cmlidXRlIGhhbmRsZXJcbiAgICBzZXQgY29uZmlnKHY6IE5nR3JpZENvbmZpZykge1xuICAgICAgICBpZiAodiA9PSBudWxsIHx8IHR5cGVvZiB2ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRDb25maWcodik7XG5cbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlciA9PSBudWxsICYmIHYgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKHRoaXMuX2NvbmZpZykuY3JlYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl9jb25maWcpO1xuICAgIH1cblxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2RpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgcHJpdmF0ZSBfbmdFbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLl9kZWZpbmVMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWMgbWV0aG9kc1xuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2dyaWQnLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1N0eWxlKSB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgICAgdGhpcy5zZXRDb25maWcodGhpcy5fY29uZmlnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2VuZXJhdGVJdGVtVWlkKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHVpZDogc3RyaW5nID0gTmdHcmlkSGVscGVyLmdlbmVyYXRlVXVpZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5oYXModWlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVJdGVtVWlkKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdWlkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDb25maWcoY29uZmlnOiBOZ0dyaWRDb25maWcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIHZhciBtYXhDb2xSb3dDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIHggaW4gY29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gY29uZmlnW3hdO1xuICAgICAgICAgICAgdmFyIGludFZhbCA9ICF2YWwgPyAwIDogcGFyc2VJbnQodmFsKTtcblxuICAgICAgICAgICAgc3dpdGNoICh4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWFyZ2lucyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWFyZ2lucyh2YWwpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjb2xfd2lkdGgnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbFdpZHRoID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncm93X2hlaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93SGVpZ2h0ID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXV0b19zdHlsZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1N0eWxlID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhdXRvX3Jlc2l6ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F1dG9SZXNpemUgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RyYWdnYWJsZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0VuYWJsZSA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVzaXphYmxlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVFbmFibGUgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21heF9yb3dzJzpcbiAgICAgICAgICAgICAgICAgICAgbWF4Q29sUm93Q2hhbmdlZCA9IG1heENvbFJvd0NoYW5nZWQgfHwgdGhpcy5fbWF4Um93cyAhPSBpbnRWYWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21heFJvd3MgPSBpbnRWYWwgPCAwID8gMCA6IGludFZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWF4X2NvbHMnOlxuICAgICAgICAgICAgICAgICAgICBtYXhDb2xSb3dDaGFuZ2VkID0gbWF4Q29sUm93Q2hhbmdlZCB8fCB0aGlzLl9tYXhDb2xzICE9IGludFZhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IGludFZhbCA8IDAgPyAwIDogaW50VmFsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2aXNpYmxlX3Jvd3MnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aXNpYmxlUm93cyA9IE1hdGgubWF4KGludFZhbCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVfY29scyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGVDb2xzID0gTWF0aC5tYXgoaW50VmFsLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluX3Jvd3MnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblJvd3MgPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtaW5fY29scyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluQ29scyA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbl9oZWlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbkhlaWdodCA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbl93aWR0aCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluV2lkdGggPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd6b29tX29uX2RyYWcnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b29tT25EcmFnID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjYXNjYWRlJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FzY2FkZSAhPSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FzY2FkZSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nhc2NhZGVHcmlkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZml4X3RvX2dyaWQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXhUb0dyaWQgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21haW50YWluX3JhdGlvJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbnRhaW5SYXRpbyA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJlZmVyX25ldyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZWZlck5ldyA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGltaXRfdG9fc2NyZWVuJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGltaXRUb1NjcmVlbiA9ICF0aGlzLl9hdXRvUmVzaXplICYmICEhdmFsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXJfdG9fc2NyZWVuJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2VudGVyVG9TY3JlZW4gPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Jlc2l6ZV9kaXJlY3Rpb25zJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVEaXJlY3Rpb25zID0gdmFsIHx8IFsnYm90dG9tcmlnaHQnLCAnYm90dG9tbGVmdCcsICd0b3ByaWdodCcsICd0b3BsZWZ0JywgJ3JpZ2h0JywgJ2xlZnQnLCAnYm90dG9tJywgJ3RvcCddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlbGVtZW50X2Jhc2VkX3Jvd19oZWlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50QmFzZWREeW5hbWljUm93SGVpZ2h0ID0gISF2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpeF9pdGVtX3Bvc2l0aW9uX2RpcmVjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpeF9jb2xsaXNpb25fcG9zaXRpb25fZGlyZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29sbGlzaW9uRml4RGlyZWN0aW9uID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhbGxvd19vdmVybGFwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dPdmVybGFwID0gISF2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCAmJiB0aGlzLmNhc2NhZGUgIT09ICdvZmYnICYmIHRoaXMuY2FzY2FkZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVW5hYmxlIHRvIG92ZXJsYXAgaXRlbXMgd2hlbiBhIGNhc2NhZGUgZGlyZWN0aW9uIGlzIHNldC4nKTtcbiAgICAgICAgICAgIHRoaXMuX2FsbG93T3ZlcmxhcCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ0VuYWJsZSB8fCB0aGlzLnJlc2l6ZUVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlTGlzdGVuZXJzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXRlbUZpeERpcmVjdGlvbiA9PT0gJ2Nhc2NhZGUnKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtRml4RGlyZWN0aW9uID0gdGhpcy5fZ2V0Rml4RGlyZWN0aW9uRnJvbUNhc2NhZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPT09ICdjYXNjYWRlJykge1xuICAgICAgICAgICAgdGhpcy5fY29sbGlzaW9uRml4RGlyZWN0aW9uID0gdGhpcy5fZ2V0Rml4RGlyZWN0aW9uRnJvbUNhc2NhZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saW1pdFRvU2NyZWVuKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdNYXhDb2xzID0gdGhpcy5fZ2V0Q29udGFpbmVyQ29sdW1ucygpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyAhPSBuZXdNYXhDb2xzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IG5ld01heENvbHM7XG4gICAgICAgICAgICAgICAgbWF4Q29sUm93Q2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGltaXRUb1NjcmVlbiAmJiB0aGlzLl9jZW50ZXJUb1NjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5zY3JlZW5NYXJnaW4gPSB0aGlzLl9nZXRTY3JlZW5NYXJnaW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NyZWVuTWFyZ2luID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tYWludGFpblJhdGlvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2xXaWR0aCAmJiB0aGlzLnJvd0hlaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FzcGVjdFJhdGlvID0gdGhpcy5jb2xXaWR0aCAvIHRoaXMucm93SGVpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWludGFpblJhdGlvID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF4Q29sUm93Q2hhbmdlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwICYmIHRoaXMuX21heFJvd3MgPiAwKSB7ICAgIC8vICAgIENhbid0IGhhdmUgYm90aCwgcHJpb3JpdGlzZSBvbiBjYXNjYWRlXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNhc2NhZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21heENvbHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXhSb3dzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb25zQWZ0ZXJNYXhDaGFuZ2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNvbFdpZHRoKCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVJvd0hlaWdodCgpO1xuXG4gICAgICAgIHZhciBtYXhXaWR0aCA9IHRoaXMuX21heENvbHMgKiB0aGlzLmNvbFdpZHRoO1xuICAgICAgICB2YXIgbWF4SGVpZ2h0ID0gdGhpcy5fbWF4Um93cyAqIHRoaXMucm93SGVpZ2h0O1xuXG4gICAgICAgIGlmIChtYXhXaWR0aCA+IDAgJiYgdGhpcy5taW5XaWR0aCA+IG1heFdpZHRoKSB0aGlzLm1pbldpZHRoID0gMC43NSAqIHRoaXMuY29sV2lkdGg7XG4gICAgICAgIGlmIChtYXhIZWlnaHQgPiAwICYmIHRoaXMubWluSGVpZ2h0ID4gbWF4SGVpZ2h0KSB0aGlzLm1pbkhlaWdodCA9IDAuNzUgKiB0aGlzLnJvd0hlaWdodDtcblxuICAgICAgICBpZiAodGhpcy5taW5XaWR0aCA+IHRoaXMuY29sV2lkdGgpIHRoaXMubWluQ29scyA9IE1hdGgubWF4KHRoaXMubWluQ29scywgTWF0aC5jZWlsKHRoaXMubWluV2lkdGggLyB0aGlzLmNvbFdpZHRoKSk7XG4gICAgICAgIGlmICh0aGlzLm1pbkhlaWdodCA+IHRoaXMucm93SGVpZ2h0KSB0aGlzLm1pblJvd3MgPSBNYXRoLm1heCh0aGlzLm1pblJvd3MsIE1hdGguY2VpbCh0aGlzLm1pbkhlaWdodCAvIHRoaXMucm93SGVpZ2h0KSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwICYmIHRoaXMubWluQ29scyA+IHRoaXMuX21heENvbHMpIHRoaXMubWluQ29scyA9IDE7XG4gICAgICAgIGlmICh0aGlzLl9tYXhSb3dzID4gMCAmJiB0aGlzLm1pblJvd3MgPiB0aGlzLl9tYXhSb3dzKSB0aGlzLm1pblJvd3MgPSAxO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJhdGlvKCk7XG5cbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQoaXRlbSk7XG4gICAgICAgICAgICBpdGVtLnNldENhc2NhZGVNb2RlKHRoaXMuY2FzY2FkZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVjYWxjdWxhdGVTZWxmKCk7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2Nhc2NhZGVHcmlkKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbVBvc2l0aW9uKGl0ZW1JZDogc3RyaW5nKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhcyhpdGVtSWQpID8gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkuZ2V0R3JpZFBvc2l0aW9uKCkgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtU2l6ZShpdGVtSWQ6IHN0cmluZyk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhcyhpdGVtSWQpID8gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkuZ2V0U2l6ZSgpIDogbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdEb0NoZWNrKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5fZGlmZmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyLmRpZmYodGhpcy5fY29uZmlnKTtcblxuICAgICAgICAgICAgaWYgKGNoYW5nZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXJnaW5zKG1hcmdpbnM6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXJnaW5Ub3AgPSBNYXRoLm1heChwYXJzZUludChtYXJnaW5zWzBdKSwgMCk7XG4gICAgICAgIHRoaXMubWFyZ2luUmlnaHQgPSBtYXJnaW5zLmxlbmd0aCA+PSAyID8gTWF0aC5tYXgocGFyc2VJbnQobWFyZ2luc1sxXSksIDApIDogdGhpcy5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMubWFyZ2luQm90dG9tID0gbWFyZ2lucy5sZW5ndGggPj0gMyA/IE1hdGgubWF4KHBhcnNlSW50KG1hcmdpbnNbMl0pLCAwKSA6IHRoaXMubWFyZ2luVG9wO1xuICAgICAgICB0aGlzLm1hcmdpbkxlZnQgPSBtYXJnaW5zLmxlbmd0aCA+PSA0ID8gTWF0aC5tYXgocGFyc2VJbnQobWFyZ2luc1szXSksIDApIDogdGhpcy5tYXJnaW5SaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlRHJhZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmFnRW5hYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzYWJsZURyYWcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhZ0VuYWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGVSZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzaXplRW5hYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzYWJsZVJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNpemVFbmFibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkSXRlbShuZ0l0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgbmdJdGVtLnNldENhc2NhZGVNb2RlKHRoaXMuY2FzY2FkZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wcmVmZXJOZXcpIHtcbiAgICAgICAgICAgIHZhciBuZXdQb3MgPSB0aGlzLl9maXhHcmlkUG9zaXRpb24obmdJdGVtLmdldEdyaWRQb3NpdGlvbigpLCBuZ0l0ZW0uZ2V0U2l6ZSgpKTtcbiAgICAgICAgICAgIG5nSXRlbS5zZXRHcmlkUG9zaXRpb24obmV3UG9zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZ0l0ZW0udWlkID09PSBudWxsIHx8IHRoaXMuX2l0ZW1zLmhhcyhuZ0l0ZW0udWlkKSkge1xuICAgICAgICAgICAgbmdJdGVtLnVpZCA9IHRoaXMuZ2VuZXJhdGVJdGVtVWlkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pdGVtcy5zZXQobmdJdGVtLnVpZCwgbmdJdGVtKTtcbiAgICAgICAgdGhpcy5fYWRkVG9HcmlkKG5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckNhc2NhZGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIG5nSXRlbS5yZWNhbGN1bGF0ZVNlbGYoKTtcbiAgICAgICAgICAgIG5nSXRlbS5vbkNhc2NhZGVFdmVudCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9lbWl0T25JdGVtQ2hhbmdlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUl0ZW0obmdJdGVtOiBOZ0dyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKG5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5faXRlbXMuZGVsZXRlKG5nSXRlbS51aWQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHJldHVybjtcblxuICAgICAgICB0aGlzLnRyaWdnZXJDYXNjYWRlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiBpdGVtLnJlY2FsY3VsYXRlU2VsZigpKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXRPbkl0ZW1DaGFuZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUl0ZW0obmdJdGVtOiBOZ0dyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKG5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2FkZFRvR3JpZChuZ0l0ZW0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckNhc2NhZGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgICAgIG5nSXRlbS5vbkNhc2NhZGVFdmVudCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHJpZ2dlckNhc2NhZGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICghdGhpcy5fY2FzY2FkZVByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nhc2NhZGVQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmU6ICgpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZVByb21pc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZChudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fY2FzY2FkZVByb21pc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHRyaWdnZXJSZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzaXplRXZlbnRIYW5kbGVyKG51bGwpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNpemVFdmVudEhhbmRsZXIoZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNvbFdpZHRoKCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVJvd0hlaWdodCgpO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJhdGlvKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpbWl0VG9TY3JlZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld01heENvbHVtbnMgPSB0aGlzLl9nZXRDb250YWluZXJDb2x1bW5zKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyAhPT0gbmV3TWF4Q29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuX21heENvbHMgPSBuZXdNYXhDb2x1bW5zO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uc0FmdGVyTWF4Q2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX2NlbnRlclRvU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5NYXJnaW4gPSB0aGlzLl9nZXRTY3JlZW5NYXJnaW4oKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZWNhbGN1bGF0ZVNlbGYoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9hdXRvUmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZWNhbGN1bGF0ZVNlbGYoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3VzZURvd25FdmVudEhhbmRsZXIoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1vdXNlUG9zID0gdGhpcy5fZ2V0TW91c2VQb3NpdGlvbihlKTtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9nZXRJdGVtRnJvbVBvc2l0aW9uKG1vdXNlUG9zKTtcblxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmVzaXplRGlyZWN0aW9uOiBzdHJpbmcgPSBpdGVtLmNhblJlc2l6ZShlKTtcblxuICAgICAgICBpZiAodGhpcy5yZXNpemVFbmFibGUgJiYgcmVzaXplRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy5fcmVzaXplRGlyZWN0aW9uID0gcmVzaXplRGlyZWN0aW9uO1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnRW5hYmxlICYmIGl0ZW0uY2FuRHJhZyhlKSkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbSA9IGl0ZW07XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Qb3MgPSBpdGVtLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9wb3NPZmZzZXQgPSB7ICdsZWZ0JzogKG1vdXNlUG9zLmxlZnQgLSBpdGVtUG9zLmxlZnQpLCAndG9wJzogKG1vdXNlUG9zLnRvcCAtIGl0ZW1Qb3MudG9wKSB9XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtb3VzZVVwRXZlbnRIYW5kbGVyKGU6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTdG9wKGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNSZXNpemluZykge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXplU3RvcChlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kcmFnUmVhZHkgfHwgdGhpcy5fcmVzaXplUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuRHJhZygpO1xuICAgICAgICAgICAgdGhpcy5fY2xlYW5SZXNpemUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtb3VzZU1vdmVFdmVudEhhbmRsZXIoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZVJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVTdGFydChlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kcmFnUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTdGFydChlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWcoZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemUoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbW91c2VQb3MgPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9nZXRJdGVtRnJvbVBvc2l0aW9uKG1vdXNlUG9zKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLm9uTW91c2VNb3ZlKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gICAgUHJpdmF0ZSBtZXRob2RzXG4gICAgcHJpdmF0ZSBfZ2V0Rml4RGlyZWN0aW9uRnJvbUNhc2NhZGUoKTogTmdDb25maWdGaXhEaXJlY3Rpb24ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuY2FzY2FkZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAndmVydGljYWwnO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdob3Jpem9udGFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF91cGRhdGVQb3NpdGlvbnNBZnRlck1heENoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIHBvcyA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgZGltcyA9IGl0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhc0dyaWRDb2xsaXNpb24ocG9zLCBkaW1zKSAmJiB0aGlzLl9pc1dpdGhpbkJvdW5kcyhwb3MsIGRpbXMpICYmIGRpbXMueCA8PSB0aGlzLl9tYXhDb2xzICYmIGRpbXMueSA8PSB0aGlzLl9tYXhSb3dzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZChpdGVtKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwICYmIGRpbXMueCA+IHRoaXMuX21heENvbHMpIHtcbiAgICAgICAgICAgICAgICBkaW1zLnggPSB0aGlzLl9tYXhDb2xzO1xuICAgICAgICAgICAgICAgIGl0ZW0uc2V0U2l6ZShkaW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF4Um93cyA+IDAgJiYgZGltcy55ID4gdGhpcy5fbWF4Um93cykge1xuICAgICAgICAgICAgICAgIGRpbXMueSA9IHRoaXMuX21heFJvd3M7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXRTaXplKGRpbXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzR3JpZENvbGxpc2lvbihwb3MsIGRpbXMpIHx8ICF0aGlzLl9pc1dpdGhpbkJvdW5kcyhwb3MsIGRpbXMsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gdGhpcy5fZml4R3JpZFBvc2l0aW9uKHBvcywgZGltcyk7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXRHcmlkUG9zaXRpb24obmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NhbGN1bGF0ZUNvbFdpZHRoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fYXV0b1Jlc2l6ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwIHx8IHRoaXMuX3Zpc2libGVDb2xzID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXhDb2xzID0gdGhpcy5fbWF4Q29scyA+IDAgPyB0aGlzLl9tYXhDb2xzIDogdGhpcy5fdmlzaWJsZUNvbHM7XG4gICAgICAgICAgICAgICAgdmFyIG1heFdpZHRoOiBudW1iZXIgPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29sV2lkdGg6IG51bWJlciA9IE1hdGguZmxvb3IobWF4V2lkdGggLyBtYXhDb2xzKTtcbiAgICAgICAgICAgICAgICBjb2xXaWR0aCAtPSAodGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbFdpZHRoID4gMCkgdGhpcy5jb2xXaWR0aCA9IGNvbFdpZHRoO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb2xXaWR0aCA8IHRoaXMubWluV2lkdGggfHwgdGhpcy5taW5Db2xzID4gdGhpcy5fY29uZmlnLm1pbl9jb2xzKSB7XG4gICAgICAgICAgICB0aGlzLm1pbkNvbHMgPSBNYXRoLm1heCh0aGlzLl9jb25maWcubWluX2NvbHMsIE1hdGguY2VpbCh0aGlzLm1pbldpZHRoIC8gdGhpcy5jb2xXaWR0aCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlUm93SGVpZ2h0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fYXV0b1Jlc2l6ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21heFJvd3MgPiAwIHx8IHRoaXMuX3Zpc2libGVSb3dzID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXhSb3dzID0gdGhpcy5fbWF4Um93cyA+IDAgPyB0aGlzLl9tYXhSb3dzIDogdGhpcy5fdmlzaWJsZVJvd3M7XG4gICAgICAgICAgICAgICAgbGV0IG1heEhlaWdodDogbnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0ID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLm1hcmdpblRvcCAtIHRoaXMubWFyZ2luQm90dG9tO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByb3dIZWlnaHQ6IG51bWJlciA9IE1hdGgubWF4KE1hdGguZmxvb3IobWF4SGVpZ2h0IC8gbWF4Um93cyksIHRoaXMubWluSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQgLT0gKHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b20pO1xuICAgICAgICAgICAgICAgIGlmIChyb3dIZWlnaHQgPiAwKSB0aGlzLnJvd0hlaWdodCA9IHJvd0hlaWdodDtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm93SGVpZ2h0IDwgdGhpcy5taW5IZWlnaHQgfHwgdGhpcy5taW5Sb3dzID4gdGhpcy5fY29uZmlnLm1pbl9yb3dzKSB7XG4gICAgICAgICAgICB0aGlzLm1pblJvd3MgPSBNYXRoLm1heCh0aGlzLl9jb25maWcubWluX3Jvd3MsIE1hdGguY2VpbCh0aGlzLm1pbkhlaWdodCAvIHRoaXMucm93SGVpZ2h0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVSYXRpbygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hdXRvUmVzaXplIHx8ICF0aGlzLl9tYWludGFpblJhdGlvKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwICYmIHRoaXMuX3Zpc2libGVSb3dzIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucm93SGVpZ2h0ID0gdGhpcy5jb2xXaWR0aCAvIHRoaXMuX2FzcGVjdFJhdGlvO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX21heFJvd3MgPiAwICYmIHRoaXMuX3Zpc2libGVDb2xzIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29sV2lkdGggPSB0aGlzLl9hc3BlY3RSYXRpbyAqIHRoaXMucm93SGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX21heENvbHMgPT0gMCAmJiB0aGlzLl9tYXhSb3dzID09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl92aXNpYmxlQ29scyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd0hlaWdodCA9IHRoaXMuY29sV2lkdGggLyB0aGlzLl9hc3BlY3RSYXRpbztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fdmlzaWJsZVJvd3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xXaWR0aCA9IHRoaXMuX2FzcGVjdFJhdGlvICogdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hcHBseUNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgocmVjb3JkOiBhbnkpID0+IHsgdGhpcy5fY29uZmlnW3JlY29yZC5rZXldID0gcmVjb3JkLmN1cnJlbnRWYWx1ZTsgfSk7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKChyZWNvcmQ6IGFueSkgPT4geyB0aGlzLl9jb25maWdbcmVjb3JkLmtleV0gPSByZWNvcmQuY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZDogYW55KSA9PiB7IGRlbGV0ZSB0aGlzLl9jb25maWdbcmVjb3JkLmtleV07IH0pO1xuXG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzaXplU3RhcnQoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5yZXNpemVFbmFibGUgfHwgIXRoaXMuX3Jlc2l6aW5nSXRlbSkgcmV0dXJuO1xuXG4gICAgICAgIC8vICAgIFNldHVwXG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zdGFydE1vdmluZygpO1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZCh0aGlzLl9yZXNpemluZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9jcmVhdGVQbGFjZWhvbGRlcih0aGlzLl9yZXNpemluZ0l0ZW0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9hbGxvd092ZXJsYXApIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS56SW5kZXggPSB0aGlzLl9sYXN0WlZhbHVlKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAgICBTdGF0dXMgRmxhZ3NcbiAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVzaXplUmVhZHkgPSBmYWxzZTtcblxuICAgICAgICAvLyAgICBFdmVudHNcbiAgICAgICAgdGhpcy5vblJlc2l6ZVN0YXJ0LmVtaXQodGhpcy5fcmVzaXppbmdJdGVtKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLm9uUmVzaXplU3RhcnRFdmVudCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RyYWdTdGFydChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdFbmFibGUgfHwgIXRoaXMuX2RyYWdnaW5nSXRlbSkgcmV0dXJuO1xuXG4gICAgICAgIC8vICAgIFN0YXJ0IGRyYWdnaW5nXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5zdGFydE1vdmluZygpO1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZCh0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9jcmVhdGVQbGFjZWhvbGRlcih0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9hbGxvd092ZXJsYXApIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS56SW5kZXggPSB0aGlzLl9sYXN0WlZhbHVlKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAgICBTdGF0dXMgRmxhZ3NcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZHJhZ1JlYWR5ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gICAgRXZlbnRzXG4gICAgICAgIHRoaXMub25EcmFnU3RhcnQuZW1pdCh0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0ub25EcmFnU3RhcnRFdmVudCgpO1xuXG4gICAgICAgIC8vICAgIFpvb21cbiAgICAgICAgaWYgKHRoaXMuX3pvb21PbkRyYWcpIHtcbiAgICAgICAgICAgIHRoaXMuX3pvb21PdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3pvb21PdXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMC41LCAwLjUpJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzZXRab29tKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RyYWcoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0RyYWdnaW5nKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbW91c2VQb3MgPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgICB2YXIgbmV3TCA9IChtb3VzZVBvcy5sZWZ0IC0gdGhpcy5fcG9zT2Zmc2V0LmxlZnQpO1xuICAgICAgICB2YXIgbmV3VCA9IChtb3VzZVBvcy50b3AgLSB0aGlzLl9wb3NPZmZzZXQudG9wKTtcblxuICAgICAgICB2YXIgaXRlbVBvcyA9IHRoaXMuX2RyYWdnaW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGdyaWRQb3MgPSB0aGlzLl9jYWxjdWxhdGVHcmlkUG9zaXRpb24obmV3TCwgbmV3VCk7XG4gICAgICAgIHZhciBkaW1zID0gdGhpcy5fZHJhZ2dpbmdJdGVtLmdldFNpemUoKTtcblxuICAgICAgICBncmlkUG9zID0gdGhpcy5fZml4UG9zVG9Cb3VuZHNYKGdyaWRQb3MsIGRpbXMpO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKGdyaWRQb3MsIGRpbXMpKSB7XG4gICAgICAgICAgICBncmlkUG9zID0gdGhpcy5fZml4UG9zVG9Cb3VuZHNZKGdyaWRQb3MsIGRpbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdyaWRQb3MuY29sICE9IGl0ZW1Qb3MuY29sIHx8IGdyaWRQb3Mucm93ICE9IGl0ZW1Qb3Mucm93KSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0uc2V0R3JpZFBvc2l0aW9uKGdyaWRQb3MsIHRoaXMuX2ZpeFRvR3JpZCk7XG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5pbnN0YW5jZS5zZXRHcmlkUG9zaXRpb24oZ3JpZFBvcyk7XG5cbiAgICAgICAgICAgIGlmIChbJ3VwJywgJ2Rvd24nLCAnbGVmdCcsICdyaWdodCddLmluZGV4T2YodGhpcy5jYXNjYWRlKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnMoZ3JpZFBvcywgZGltcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoZ3JpZFBvcywgZGltcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2ZpeFRvR3JpZCkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnNldFBvc2l0aW9uKG5ld0wsIG5ld1QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkRyYWcuZW1pdCh0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0ub25EcmFnRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNpemUoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1Jlc2l6aW5nKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLmVtcHR5KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLmVtcHR5KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoKDxhbnk+ZG9jdW1lbnQpLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgKDxhbnk+ZG9jdW1lbnQpLnNlbGVjdGlvbi5lbXB0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VQb3MgPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgICBjb25zdCBpdGVtUG9zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGl0ZW1EaW1zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldERpbWVuc2lvbnMoKTtcbiAgICAgICAgY29uc3QgZW5kQ29ybmVyID0ge1xuICAgICAgICAgICAgbGVmdDogaXRlbVBvcy5sZWZ0ICsgaXRlbURpbXMud2lkdGgsXG4gICAgICAgICAgICB0b3A6IGl0ZW1Qb3MudG9wICsgaXRlbURpbXMuaGVpZ2h0LFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzaXplVG9wID0gdGhpcy5fcmVzaXplRGlyZWN0aW9uLmluY2x1ZGVzKCd0b3AnKTtcbiAgICAgICAgY29uc3QgcmVzaXplQm90dG9tID0gdGhpcy5fcmVzaXplRGlyZWN0aW9uLmluY2x1ZGVzKCdib3R0b20nKTtcbiAgICAgICAgY29uc3QgcmVzaXplTGVmdCA9IHRoaXMuX3Jlc2l6ZURpcmVjdGlvbi5pbmNsdWRlcygnbGVmdCcpXG4gICAgICAgIGNvbnN0IHJlc2l6ZVJpZ2h0ID0gdGhpcy5fcmVzaXplRGlyZWN0aW9uLmluY2x1ZGVzKCdyaWdodCcpO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgd2lkdGggYW5kIGhlaWdodCBiYXNlZCB1cG9uIHJlc2l6ZSBkaXJlY3Rpb25cbiAgICAgICAgbGV0IG5ld1cgPSByZXNpemVSaWdodFxuICAgICAgICAgICAgPyAobW91c2VQb3MubGVmdCAtIGl0ZW1Qb3MubGVmdCArIDEpXG4gICAgICAgICAgICA6IHJlc2l6ZUxlZnRcbiAgICAgICAgICAgICAgICA/IChlbmRDb3JuZXIubGVmdCAtIG1vdXNlUG9zLmxlZnQgKyAxKVxuICAgICAgICAgICAgICAgIDogaXRlbURpbXMud2lkdGg7XG4gICAgICAgIGxldCBuZXdIID0gcmVzaXplQm90dG9tXG4gICAgICAgICAgICA/IChtb3VzZVBvcy50b3AgLSBpdGVtUG9zLnRvcCArIDEpXG4gICAgICAgICAgICA6IHJlc2l6ZVRvcFxuICAgICAgICAgICAgICAgID8gKGVuZENvcm5lci50b3AgLSBtb3VzZVBvcy50b3AgKyAxKVxuICAgICAgICAgICAgICAgIDogaXRlbURpbXMuaGVpZ2h0O1xuXG4gICAgICAgIGlmIChuZXdXIDwgdGhpcy5taW5XaWR0aClcbiAgICAgICAgICAgIG5ld1cgPSB0aGlzLm1pbldpZHRoO1xuICAgICAgICBpZiAobmV3SCA8IHRoaXMubWluSGVpZ2h0KVxuICAgICAgICAgICAgbmV3SCA9IHRoaXMubWluSGVpZ2h0O1xuICAgICAgICBpZiAobmV3VyA8IHRoaXMuX3Jlc2l6aW5nSXRlbS5taW5XaWR0aClcbiAgICAgICAgICAgIG5ld1cgPSB0aGlzLl9yZXNpemluZ0l0ZW0ubWluV2lkdGg7XG4gICAgICAgIGlmIChuZXdIIDwgdGhpcy5fcmVzaXppbmdJdGVtLm1pbkhlaWdodClcbiAgICAgICAgICAgIG5ld0ggPSB0aGlzLl9yZXNpemluZ0l0ZW0ubWluSGVpZ2h0O1xuXG4gICAgICAgIGxldCBuZXdYID0gaXRlbVBvcy5sZWZ0O1xuICAgICAgICBsZXQgbmV3WSA9IGl0ZW1Qb3MudG9wO1xuXG4gICAgICAgIGlmIChyZXNpemVMZWZ0KVxuICAgICAgICAgICAgbmV3WCA9IGVuZENvcm5lci5sZWZ0IC0gbmV3VztcbiAgICAgICAgaWYgKHJlc2l6ZVRvcClcbiAgICAgICAgICAgIG5ld1kgPSBlbmRDb3JuZXIudG9wIC0gbmV3SDtcblxuICAgICAgICBsZXQgY2FsY1NpemUgPSB0aGlzLl9jYWxjdWxhdGVHcmlkU2l6ZShuZXdXLCBuZXdIKTtcbiAgICAgICAgY29uc3QgaXRlbVNpemUgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICBjb25zdCBpR3JpZFBvcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgYm90dG9tUmlnaHRDb3JuZXIgPSB7XG4gICAgICAgICAgICBjb2w6IGlHcmlkUG9zLmNvbCArIGl0ZW1TaXplLngsXG4gICAgICAgICAgICByb3c6IGlHcmlkUG9zLnJvdyArIGl0ZW1TaXplLnksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHRhcmdldFBvczogTmdHcmlkSXRlbVBvc2l0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwgaUdyaWRQb3MpO1xuXG4gICAgICAgIGlmICh0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ3RvcCcpKVxuICAgICAgICAgICAgdGFyZ2V0UG9zLnJvdyA9IGJvdHRvbVJpZ2h0Q29ybmVyLnJvdyAtIGNhbGNTaXplLnk7XG4gICAgICAgIGlmICh0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ2xlZnQnKSlcbiAgICAgICAgICAgIHRhcmdldFBvcy5jb2wgPSBib3R0b21SaWdodENvcm5lci5jb2wgLSBjYWxjU2l6ZS54O1xuXG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHRhcmdldFBvcywgY2FsY1NpemUpKVxuICAgICAgICAgICAgY2FsY1NpemUgPSB0aGlzLl9maXhTaXplVG9Cb3VuZHNYKHRhcmdldFBvcywgY2FsY1NpemUpO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHRhcmdldFBvcywgY2FsY1NpemUpKVxuICAgICAgICAgICAgY2FsY1NpemUgPSB0aGlzLl9maXhTaXplVG9Cb3VuZHNZKHRhcmdldFBvcywgY2FsY1NpemUpO1xuXG4gICAgICAgIGNhbGNTaXplID0gdGhpcy5fcmVzaXppbmdJdGVtLmZpeFJlc2l6ZShjYWxjU2l6ZSk7XG5cbiAgICAgICAgaWYgKGNhbGNTaXplLnggIT0gaXRlbVNpemUueCB8fCBjYWxjU2l6ZS55ICE9IGl0ZW1TaXplLnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zZXRHcmlkUG9zaXRpb24odGFyZ2V0UG9zLCB0aGlzLl9maXhUb0dyaWQpO1xuICAgICAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJSZWYuaW5zdGFuY2Uuc2V0R3JpZFBvc2l0aW9uKHRhcmdldFBvcyk7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0uc2V0U2l6ZShjYWxjU2l6ZSwgdGhpcy5fZml4VG9HcmlkKTtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyUmVmLmluc3RhbmNlLnNldFNpemUoY2FsY1NpemUpO1xuXG4gICAgICAgICAgICBpZiAoWyd1cCcsICdkb3duJywgJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKHRoaXMuY2FzY2FkZSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpeEdyaWRDb2xsaXNpb25zKHRhcmdldFBvcywgY2FsY1NpemUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nhc2NhZGVHcmlkKHRhcmdldFBvcywgY2FsY1NpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9maXhUb0dyaWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zZXREaW1lbnNpb25zKG5ld1csIG5ld0gpO1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldFBvc2l0aW9uKG5ld1gsIG5ld1kpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblJlc2l6ZS5lbWl0KHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5vblJlc2l6ZUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhZ1N0b3AoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0RyYWdnaW5nKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGl0ZW1Qb3MgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnNldEdyaWRQb3NpdGlvbihpdGVtUG9zKTtcbiAgICAgICAgdGhpcy5fYWRkVG9HcmlkKHRoaXMuX2RyYWdnaW5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5zdG9wTW92aW5nKCk7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5vbkRyYWdTdG9wRXZlbnQoKTtcbiAgICAgICAgdGhpcy5vbkRyYWdTdG9wLmVtaXQodGhpcy5fZHJhZ2dpbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jbGVhbkRyYWcoKTtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJSZWYuZGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuX2VtaXRPbkl0ZW1DaGFuZ2UoKTtcblxuICAgICAgICBpZiAodGhpcy5fem9vbU9uRHJhZykge1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRab29tKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNpemVTdG9wKGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNSZXNpemluZykgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaXNSZXNpemluZyA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1EaW1zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldFNpemUoKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldFNpemUoaXRlbURpbXMpO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1Qb3MgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zZXRHcmlkUG9zaXRpb24oaXRlbVBvcyk7XG5cbiAgICAgICAgdGhpcy5fYWRkVG9HcmlkKHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuXG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zdG9wTW92aW5nKCk7XG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5vblJlc2l6ZVN0b3BFdmVudCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RvcC5lbWl0KHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYW5SZXNpemUoKTtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJSZWYuZGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuX2VtaXRPbkl0ZW1DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGVhbkRyYWcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Bvc09mZnNldCA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kcmFnUmVhZHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGVhblJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzaXplRGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZVJlYWR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlR3JpZFNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIHdpZHRoICs9IHRoaXMubWFyZ2luTGVmdCArIHRoaXMubWFyZ2luUmlnaHQ7XG4gICAgICAgIGhlaWdodCArPSB0aGlzLm1hcmdpblRvcCArIHRoaXMubWFyZ2luQm90dG9tO1xuXG4gICAgICAgIHZhciBzaXpleCA9IE1hdGgubWF4KHRoaXMubWluQ29scywgTWF0aC5yb3VuZCh3aWR0aCAvICh0aGlzLmNvbFdpZHRoICsgdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodCkpKTtcbiAgICAgICAgdmFyIHNpemV5ID0gTWF0aC5tYXgodGhpcy5taW5Sb3dzLCBNYXRoLnJvdW5kKGhlaWdodCAvICh0aGlzLnJvd0hlaWdodCArIHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b20pKSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1goeyBjb2w6IDEsIHJvdzogMSB9LCB7IHg6IHNpemV4LCB5OiBzaXpleSB9KSkgc2l6ZXggPSB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWSh7IGNvbDogMSwgcm93OiAxIH0sIHsgeDogc2l6ZXgsIHk6IHNpemV5IH0pKSBzaXpleSA9IHRoaXMuX21heFJvd3M7XG5cbiAgICAgICAgcmV0dXJuIHsgJ3gnOiBzaXpleCwgJ3knOiBzaXpleSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NhbGN1bGF0ZUdyaWRQb3NpdGlvbihsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgdmFyIGNvbCA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQobGVmdCAvICh0aGlzLmNvbFdpZHRoICsgdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodCkpICsgMSk7XG4gICAgICAgIHZhciByb3cgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHRvcCAvICh0aGlzLnJvd0hlaWdodCArIHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b20pKSArIDEpO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHsgY29sOiBjb2wsIHJvdzogcm93IH0sIHsgeDogMSwgeTogMSB9KSkgY29sID0gdGhpcy5fbWF4Q29scztcbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1koeyBjb2w6IGNvbCwgcm93OiByb3cgfSwgeyB4OiAxLCB5OiAxIH0pKSByb3cgPSB0aGlzLl9tYXhSb3dzO1xuXG4gICAgICAgIHJldHVybiB7ICdjb2wnOiBjb2wsICdyb3cnOiByb3cgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYXNHcmlkQ29sbGlzaW9uKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IGJvb2xlYW4ge1xuICAgICAgICB2YXIgcG9zaXRpb25zID0gdGhpcy5fZ2V0Q29sbGlzaW9ucyhwb3MsIGRpbXMpO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbnMgPT0gbnVsbCB8fCBwb3NpdGlvbnMubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gcG9zaXRpb25zLnNvbWUoKHY6IE5nR3JpZEl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhKHYgPT09IG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRDb2xsaXNpb25zKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IEFycmF5PE5nR3JpZEl0ZW0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IHJldHVybnM6IEFycmF5PE5nR3JpZEl0ZW0+ID0gW107XG5cbiAgICAgICAgaWYgKCFwb3MuY29sKSB7IHBvcy5jb2wgPSAxOyB9XG4gICAgICAgIGlmICghcG9zLnJvdykgeyBwb3Mucm93ID0gMTsgfVxuXG4gICAgICAgIGNvbnN0IGxlZnRDb2wgPSBwb3MuY29sO1xuICAgICAgICBjb25zdCByaWdodENvbCA9IHBvcy5jb2wgKyBkaW1zLng7XG4gICAgICAgIGNvbnN0IHRvcFJvdyA9IHBvcy5yb3c7XG4gICAgICAgIGNvbnN0IGJvdHRvbVJvdyA9IHBvcy5yb3cgKyBkaW1zLnk7XG5cbiAgICAgICAgdGhpcy5faXRlbXNJbkdyaWQuZm9yRWFjaCgoaXRlbUlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW06IE5nR3JpZEl0ZW0gPSB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKTtcblxuICAgICAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXNJbkdyaWQuZGVsZXRlKGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpdGVtTGVmdENvbCA9IGl0ZW0uY29sO1xuICAgICAgICAgICAgY29uc3QgaXRlbVJpZ2h0Q29sID0gaXRlbS5jb2wgKyBpdGVtLnNpemV4O1xuICAgICAgICAgICAgY29uc3QgaXRlbVRvcFJvdyA9IGl0ZW0ucm93O1xuICAgICAgICAgICAgY29uc3QgaXRlbUJvdHRvbVJvdyA9IGl0ZW0ucm93ICsgaXRlbS5zaXpleTtcblxuICAgICAgICAgICAgY29uc3Qgd2l0aGluQ29sdW1ucyA9IGxlZnRDb2wgPCBpdGVtUmlnaHRDb2wgJiYgaXRlbUxlZnRDb2wgPCByaWdodENvbDtcbiAgICAgICAgICAgIGNvbnN0IHdpdGhpblJvd3MgPSB0b3BSb3cgPCBpdGVtQm90dG9tUm93ICYmIGl0ZW1Ub3BSb3cgPCBib3R0b21Sb3c7XG5cbiAgICAgICAgICAgIGlmICh3aXRoaW5Db2x1bW5zICYmIHdpdGhpblJvd3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeEdyaWRDb2xsaXNpb25zKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb2xsaXNpb25zOiBBcnJheTxOZ0dyaWRJdGVtPiA9IHRoaXMuX2dldENvbGxpc2lvbnMocG9zLCBkaW1zKTtcbiAgICAgICAgaWYgKGNvbGxpc2lvbnMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGZvciAobGV0IGNvbGxpc2lvbiBvZiBjb2xsaXNpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZChjb2xsaXNpb24pO1xuXG4gICAgICAgICAgICBjb25zdCBpdGVtRGltczogTmdHcmlkSXRlbVNpemUgPSBjb2xsaXNpb24uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgY29uc3QgaXRlbVBvczogTmdHcmlkSXRlbVBvc2l0aW9uID0gY29sbGlzaW9uLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgbGV0IG5ld0l0ZW1Qb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IHsgY29sOiBpdGVtUG9zLmNvbCwgcm93OiBpdGVtUG9zLnJvdyB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fY29sbGlzaW9uRml4RGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICAgICAgbmV3SXRlbVBvcy5yb3cgPSBwb3Mucm93ICsgZGltcy55O1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1kobmV3SXRlbVBvcywgaXRlbURpbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW1Qb3MuY29sID0gcG9zLmNvbCArIGRpbXMueDtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbVBvcy5yb3cgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY29sbGlzaW9uRml4RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLmNvbCA9IHBvcy5jb2wgKyBkaW1zLng7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWChuZXdJdGVtUG9zLCBpdGVtRGltcykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbVBvcy5jb2wgPSAxO1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLnJvdyA9IHBvcy5yb3cgKyBkaW1zLnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb2xsaXNpb24uc2V0R3JpZFBvc2l0aW9uKG5ld0l0ZW1Qb3MpO1xuXG4gICAgICAgICAgICB0aGlzLl9maXhHcmlkQ29sbGlzaW9ucyhuZXdJdGVtUG9zLCBpdGVtRGltcyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoY29sbGlzaW9uKTtcbiAgICAgICAgICAgIGNvbGxpc2lvbi5vbkNhc2NhZGVFdmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnMocG9zLCBkaW1zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYXNjYWRlR3JpZChwb3M/OiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM/OiBOZ0dyaWRJdGVtU2l6ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9hbGxvd092ZXJsYXApIHJldHVybjtcbiAgICAgICAgaWYgKCFwb3MgIT09ICFkaW1zKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYXNjYWRlIHdpdGggb25seSBwb3NpdGlvbiBhbmQgbm90IGRpbWVuc2lvbnMnKTtcblxuICAgICAgICBpZiAodGhpcy5pc0RyYWdnaW5nICYmIHRoaXMuX2RyYWdnaW5nSXRlbSAmJiAhcG9zICYmICFkaW1zKSB7XG4gICAgICAgICAgICBwb3MgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBkaW1zID0gdGhpcy5fZHJhZ2dpbmdJdGVtLmdldFNpemUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmVzaXppbmcgJiYgdGhpcy5fcmVzaXppbmdJdGVtICYmICFwb3MgJiYgIWRpbXMpIHtcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgIGRpbXMgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGl0ZW1zSW5HcmlkOiBOZ0dyaWRJdGVtW10gPSBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zSW5HcmlkLCAoaXRlbUlkOiBzdHJpbmcpID0+IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuY2FzY2FkZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgaXRlbXNJbkdyaWQgPSBpdGVtc0luR3JpZC5zb3J0KE5nR3JpZEhlbHBlci5zb3J0SXRlbXNCeVBvc2l0aW9uVmVydGljYWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VzdFJvd1BlckNvbHVtbjogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zSW5HcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzRml4ZWQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1EaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGl0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtUG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBsb3dlc3RSb3dGb3JJdGVtOiBudW1iZXIgPSBsb3dlc3RSb3dQZXJDb2x1bW4uZ2V0KGl0ZW1Qb3MuY29sKSB8fCAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBpdGVtRGltcy54OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VzdFJvd0ZvckNvbHVtbiA9IGxvd2VzdFJvd1BlckNvbHVtbi5nZXQoaXRlbVBvcy5jb2wgKyBpKSB8fCAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0Um93Rm9ySXRlbSA9IE1hdGgubWF4KGxvd2VzdFJvd0ZvckNvbHVtbiwgbG93ZXN0Um93Rm9ySXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZWZ0Q29sID0gaXRlbVBvcy5jb2w7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0Q29sID0gaXRlbVBvcy5jb2wgKyBpdGVtRGltcy54O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3MgJiYgZGltcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2l0aGluQ29sdW1ucyA9IHJpZ2h0Q29sID4gcG9zLmNvbCAmJiBsZWZ0Q29sIDwgKHBvcy5jb2wgKyBkaW1zLngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l0aGluQ29sdW1ucykgeyAgICAgICAgICAvLyBJZiBvdXIgZWxlbWVudCBpcyBpbiBvbmUgb2YgdGhlIGl0ZW0ncyBjb2x1bW5zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vbUFib3ZlSXRlbSA9IGl0ZW1EaW1zLnkgPD0gKHBvcy5yb3cgLSBsb3dlc3RSb3dGb3JJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm9vbUFib3ZlSXRlbSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXRlbSBjYW4ndCBmaXQgYWJvdmUgb3VyIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0Um93Rm9ySXRlbSA9IE1hdGgubWF4KGxvd2VzdFJvd0Zvckl0ZW0sIHBvcy5yb3cgKyBkaW1zLnkpOyAgIC8vIFNldCB0aGUgbG93ZXN0IHJvdyB0byBiZSBiZWxvdyBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BvczogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IGl0ZW1Qb3MuY29sLCByb3c6IGxvd2VzdFJvd0Zvckl0ZW0gfTtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgICBXaGF0IGlmIGl0J3Mgbm90IHdpdGhpbiBib3VuZHMgWT9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvd2VzdFJvd0Zvckl0ZW0gIT0gaXRlbVBvcy5yb3cgJiYgdGhpcy5faXNXaXRoaW5Cb3VuZHNZKG5ld1BvcywgaXRlbURpbXMpKSB7IC8vIElmIHRoZSBpdGVtIGlzIG5vdCBhbHJlYWR5IG9uIHRoaXMgcm93IG1vdmUgaXQgdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbURpbXMueDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RSb3dQZXJDb2x1bW4uc2V0KGl0ZW1Qb3MuY29sICsgaSwgbG93ZXN0Um93Rm9ySXRlbSArIGl0ZW1EaW1zLnkpOyAvLyBVcGRhdGUgdGhlIGxvd2VzdCByb3cgdG8gYmUgYmVsb3cgdGhlIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGl0ZW1zSW5HcmlkID0gaXRlbXNJbkdyaWQuc29ydChOZ0dyaWRIZWxwZXIuc29ydEl0ZW1zQnlQb3NpdGlvbkhvcml6b250YWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VzdENvbHVtblBlclJvdzogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zSW5HcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1EaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGl0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtUG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBsb3dlc3RDb2x1bW5Gb3JJdGVtOiBudW1iZXIgPSBsb3dlc3RDb2x1bW5QZXJSb3cuZ2V0KGl0ZW1Qb3Mucm93KSB8fCAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBpdGVtRGltcy55OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb3dlc3RPZmZzZXRDb2x1bW46IG51bWJlciA9IGxvd2VzdENvbHVtblBlclJvdy5nZXQoaXRlbVBvcy5yb3cgKyBpKSB8fCAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0Q29sdW1uRm9ySXRlbSA9IE1hdGgubWF4KGxvd2VzdE9mZnNldENvbHVtbiwgbG93ZXN0Q29sdW1uRm9ySXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3BSb3cgPSBpdGVtUG9zLnJvdztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUm93ID0gaXRlbVBvcy5yb3cgKyBpdGVtRGltcy55O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3MgJiYgZGltcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2l0aGluUm93cyA9IGJvdHRvbVJvdyA+IHBvcy5jb2wgJiYgdG9wUm93IDwgKHBvcy5jb2wgKyBkaW1zLngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l0aGluUm93cykgeyAgICAgICAgICAvLyBJZiBvdXIgZWxlbWVudCBpcyBpbiBvbmUgb2YgdGhlIGl0ZW0ncyByb3dzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vbU5leHRUb0l0ZW0gPSBpdGVtRGltcy54IDw9IChwb3MuY29sIC0gbG93ZXN0Q29sdW1uRm9ySXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJvb21OZXh0VG9JdGVtKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXRlbSBjYW4ndCBmaXQgbmV4dCB0byBvdXIgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RDb2x1bW5Gb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0Q29sdW1uRm9ySXRlbSwgcG9zLmNvbCArIGRpbXMueCk7ICAvLyBTZXQgdGhlIGxvd2VzdCBjb2wgdG8gYmUgdGhlIG90aGVyIHNpZGUgb2YgaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IHsgY29sOiBsb3dlc3RDb2x1bW5Gb3JJdGVtLCByb3c6IGl0ZW1Qb3Mucm93IH07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvd2VzdENvbHVtbkZvckl0ZW0gIT0gaXRlbVBvcy5jb2wgJiYgdGhpcy5faXNXaXRoaW5Cb3VuZHNYKG5ld1BvcywgaXRlbURpbXMpKSB7IC8vIElmIHRoZSBpdGVtIGlzIG5vdCBhbHJlYWR5IG9uIHRoaXMgY29sIG1vdmUgaXQgdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbURpbXMueTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RDb2x1bW5QZXJSb3cuc2V0KGl0ZW1Qb3Mucm93ICsgaSwgbG93ZXN0Q29sdW1uRm9ySXRlbSArIGl0ZW1EaW1zLngpOyAvLyBVcGRhdGUgdGhlIGxvd2VzdCBjb2wgdG8gYmUgYmVsb3cgdGhlIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9maXhHcmlkUG9zaXRpb24ocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgaWYgKCF0aGlzLl9oYXNHcmlkQ29sbGlzaW9uKHBvcywgZGltcykpIHJldHVybiBwb3M7XG5cbiAgICAgICAgY29uc3QgbWF4Um93ID0gdGhpcy5fbWF4Um93cyA9PT0gMCA/IHRoaXMuX2dldE1heFJvdygpIDogdGhpcy5fbWF4Um93cztcbiAgICAgICAgY29uc3QgbWF4Q29sID0gdGhpcy5fbWF4Q29scyA9PT0gMCA/IHRoaXMuX2dldE1heENvbCgpIDogdGhpcy5fbWF4Q29scztcbiAgICAgICAgY29uc3QgbmV3UG9zID0ge1xuICAgICAgICAgICAgY29sOiBwb3MuY29sLFxuICAgICAgICAgICAgcm93OiBwb3Mucm93LFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtRml4RGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBmaXhMb29wOlxuICAgICAgICAgICAgZm9yICg7IG5ld1Bvcy5jb2wgPD0gbWF4Um93Oykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zSW5QYXRoID0gdGhpcy5fZ2V0SXRlbXNJblZlcnRpY2FsUGF0aChuZXdQb3MsIGRpbXMsIG5ld1Bvcy5yb3cpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Um93ID0gbmV3UG9zLnJvdztcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJblBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucm93IC0gbmV4dFJvdyA+PSBkaW1zLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSBuZXh0Um93O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZml4TG9vcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG5leHRSb3cgPSBpdGVtLnJvdyArIGl0ZW0uc2l6ZXk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1heFJvdyAtIG5leHRSb3cgPj0gZGltcy55KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSBuZXh0Um93O1xuICAgICAgICAgICAgICAgICAgICBicmVhayBmaXhMb29wO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld1Bvcy5jb2wgPSBNYXRoLm1heChuZXdQb3MuY29sICsgMSwgTWF0aC5taW4uYXBwbHkoTWF0aCwgaXRlbXNJblBhdGgubWFwKChpdGVtKSA9PiBpdGVtLmNvbCArIGRpbXMueCkpKTtcbiAgICAgICAgICAgICAgICBuZXdQb3Mucm93ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9pdGVtRml4RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGZpeExvb3A6XG4gICAgICAgICAgICBmb3IgKDsgbmV3UG9zLnJvdyA8PSBtYXhSb3c7KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblBhdGggPSB0aGlzLl9nZXRJdGVtc0luSG9yaXpvbnRhbFBhdGgobmV3UG9zLCBkaW1zLCBuZXdQb3MuY29sKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENvbCA9IG5ld1Bvcy5jb2w7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zSW5QYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNvbCAtIG5leHRDb2wgPj0gZGltcy54KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3MuY29sID0gbmV4dENvbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGZpeExvb3A7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBuZXh0Q29sID0gaXRlbS5jb2wgKyBpdGVtLnNpemV4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtYXhDb2wgLSBuZXh0Q29sID49IGRpbXMueCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdQb3MuY29sID0gbmV4dENvbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWsgZml4TG9vcDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBuZXdQb3Mucm93ID0gTWF0aC5tYXgobmV3UG9zLnJvdyArIDEsIE1hdGgubWluLmFwcGx5KE1hdGgsIGl0ZW1zSW5QYXRoLm1hcCgoaXRlbSkgPT4gaXRlbS5yb3cgKyBkaW1zLnkpKSk7XG4gICAgICAgICAgICAgICAgbmV3UG9zLmNvbCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3UG9zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEl0ZW1zSW5Ib3Jpem9udGFsUGF0aChwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUsIHN0YXJ0Q29sdW1uOiBudW1iZXIgPSAwKTogTmdHcmlkSXRlbVtdIHtcbiAgICAgICAgY29uc3QgaXRlbXNJblBhdGg6IE5nR3JpZEl0ZW1bXSA9IFtdO1xuICAgICAgICBjb25zdCB0b3BSb3c6IG51bWJlciA9IHBvcy5yb3cgKyBkaW1zLnkgLSAxO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zSW5HcmlkLmZvckVhY2goKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5jb2wgKyBpdGVtLnNpemV4IC0gMSA8IHN0YXJ0Q29sdW1uKSB7IHJldHVybjsgfSAgICAvLyBJdGVtIGZhbGxzIGFmdGVyIHN0YXJ0IGNvbHVtblxuICAgICAgICAgICAgaWYgKGl0ZW0ucm93ID4gdG9wUm93KSB7IHJldHVybjsgfSAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXRlbSBmYWxscyBhYm92ZSBwYXRoXG4gICAgICAgICAgICBpZiAoaXRlbS5yb3cgKyBpdGVtLnNpemV5IC0gMSA8IHBvcy5yb3cpIHsgcmV0dXJuOyB9ICAgICAgICAvLyBJdGVtIGZhbGxzIGJlbG93IHBhdGhcbiAgICAgICAgICAgIGl0ZW1zSW5QYXRoLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpdGVtc0luUGF0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRJdGVtc0luVmVydGljYWxQYXRoKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgc3RhcnRSb3c6IG51bWJlciA9IDApOiBOZ0dyaWRJdGVtW10ge1xuICAgICAgICBjb25zdCBpdGVtc0luUGF0aDogTmdHcmlkSXRlbVtdID0gW107XG4gICAgICAgIGNvbnN0IHJpZ2h0Q29sOiBudW1iZXIgPSBwb3MuY29sICsgZGltcy54IC0gMTtcblxuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5mb3JFYWNoKChpdGVtSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpO1xuICAgICAgICAgICAgaWYgKGl0ZW0ucm93ICsgaXRlbS5zaXpleSAtIDEgPCBzdGFydFJvdykgeyByZXR1cm47IH0gICAvLyBJdGVtIGZhbGxzIGFib3ZlIHN0YXJ0IHJvd1xuICAgICAgICAgICAgaWYgKGl0ZW0uY29sID4gcmlnaHRDb2wpIHsgcmV0dXJuOyB9ICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGZhbGxzIGFmdGVyIHBhdGhcbiAgICAgICAgICAgIGlmIChpdGVtLmNvbCArIGl0ZW0uc2l6ZXggLSAxIDwgcG9zLmNvbCkgeyByZXR1cm47IH0gICAgLy8gSXRlbSBmYWxscyBiZWZvcmUgcGF0aFxuICAgICAgICAgICAgaXRlbXNJblBhdGgucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zSW5QYXRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzV2l0aGluQm91bmRzWChwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUsIGFsbG93RXhjZXNzaXZlSXRlbXM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4Q29scyA9PSAwIHx8IChhbGxvd0V4Y2Vzc2l2ZUl0ZW1zICYmIHBvcy5jb2wgPT0gMSkgfHwgKHBvcy5jb2wgKyBkaW1zLnggLSAxKSA8PSB0aGlzLl9tYXhDb2xzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFBvc1RvQm91bmRzWChwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWChwb3MsIGRpbXMpKSB7XG4gICAgICAgICAgICBwb3MuY29sID0gTWF0aC5tYXgodGhpcy5fbWF4Q29scyAtIChkaW1zLnggLSAxKSwgMSk7XG4gICAgICAgICAgICBwb3Mucm93ICsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4U2l6ZVRvQm91bmRzWChwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIGRpbXMueCA9IE1hdGgubWF4KHRoaXMuX21heENvbHMgLSAocG9zLmNvbCAtIDEpLCAxKTtcbiAgICAgICAgICAgIGRpbXMueSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzV2l0aGluQm91bmRzWShwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUsIGFsbG93RXhjZXNzaXZlSXRlbXM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4Um93cyA9PSAwIHx8IChhbGxvd0V4Y2Vzc2l2ZUl0ZW1zICYmIHBvcy5yb3cgPT0gMSkgfHwgKHBvcy5yb3cgKyBkaW1zLnkgLSAxKSA8PSB0aGlzLl9tYXhSb3dzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFBvc1RvQm91bmRzWShwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWShwb3MsIGRpbXMpKSB7XG4gICAgICAgICAgICBwb3Mucm93ID0gTWF0aC5tYXgodGhpcy5fbWF4Um93cyAtIChkaW1zLnkgLSAxKSwgMSk7XG4gICAgICAgICAgICBwb3MuY29sKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maXhTaXplVG9Cb3VuZHNZKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1kocG9zLCBkaW1zKSkge1xuICAgICAgICAgICAgZGltcy55ID0gTWF0aC5tYXgodGhpcy5fbWF4Um93cyAtIChwb3Mucm93IC0gMSksIDEpO1xuICAgICAgICAgICAgZGltcy54Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNXaXRoaW5Cb3VuZHMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplLCBhbGxvd0V4Y2Vzc2l2ZUl0ZW1zOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzV2l0aGluQm91bmRzWChwb3MsIGRpbXMsIGFsbG93RXhjZXNzaXZlSXRlbXMpICYmIHRoaXMuX2lzV2l0aGluQm91bmRzWShwb3MsIGRpbXMsIGFsbG93RXhjZXNzaXZlSXRlbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFBvc1RvQm91bmRzKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1Qb3NpdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXhQb3NUb0JvdW5kc1godGhpcy5fZml4UG9zVG9Cb3VuZHNZKHBvcywgZGltcyksIGRpbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFNpemVUb0JvdW5kcyhwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXhTaXplVG9Cb3VuZHNYKHBvcywgdGhpcy5fZml4U2l6ZVRvQm91bmRzWShwb3MsIGRpbXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRUb0dyaWQoaXRlbTogTmdHcmlkSXRlbSk6IHZvaWQge1xuICAgICAgICBsZXQgcG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGl0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9oYXNHcmlkQ29sbGlzaW9uKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpeEdyaWRDb2xsaXNpb25zKHBvcywgZGltcyk7XG4gICAgICAgICAgICBwb3MgPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkge1xuICAgICAgICAgICAgaXRlbS56SW5kZXggPSB0aGlzLl9sYXN0WlZhbHVlKys7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5hZGQoaXRlbS51aWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbW92ZUZyb21HcmlkKGl0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXRlbXNJbkdyaWQuZGVsZXRlKGl0ZW0udWlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVTaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGxldCBtYXhDb2w6IG51bWJlciA9IHRoaXMuX2dldE1heENvbCgpO1xuICAgICAgICBsZXQgbWF4Um93OiBudW1iZXIgPSB0aGlzLl9nZXRNYXhSb3coKTtcblxuICAgICAgICBpZiAobWF4Q29sICE9IHRoaXMuX2N1ck1heENvbCB8fCBtYXhSb3cgIT0gdGhpcy5fY3VyTWF4Um93KSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJNYXhDb2wgPSBtYXhDb2w7XG4gICAgICAgICAgICB0aGlzLl9jdXJNYXhSb3cgPSBtYXhSb3c7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpOy8vKG1heENvbCAqICh0aGlzLmNvbFdpZHRoICsgdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodCkpKydweCcpO1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCAobWF4Um93ICogKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpICsgJ3B4Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRNYXhSb3coKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgaXRlbXNSb3dzOiBudW1iZXJbXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQsIChpdGVtSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpO1xuICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnJvdyArIGl0ZW0uc2l6ZXkgLSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgaXRlbXNSb3dzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRNYXhDb2woKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgaXRlbXNDb2xzOiBudW1iZXJbXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQsIChpdGVtSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpO1xuICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNvbCArIGl0ZW0uc2l6ZXggLSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgaXRlbXNDb2xzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRNb3VzZVBvc2l0aW9uKGU6IGFueSk6IE5nR3JpZFJhd1Bvc2l0aW9uIHtcbiAgICAgICAgaWYgKCgoPGFueT53aW5kb3cpLlRvdWNoRXZlbnQgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHx8IChlLnRvdWNoZXMgfHwgZS5jaGFuZ2VkVG91Y2hlcykpIHtcbiAgICAgICAgICAgIGUgPSBlLnRvdWNoZXMubGVuZ3RoID4gMCA/IGUudG91Y2hlc1swXSA6IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZWZQb3M6IGFueSA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBsZXQgbGVmdDogbnVtYmVyID0gZS5jbGllbnRYIC0gcmVmUG9zLmxlZnQ7XG4gICAgICAgIGxldCB0b3A6IG51bWJlciA9IGUuY2xpZW50WSAtIHJlZlBvcy50b3A7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FzY2FkZSA9PSAnZG93bicpIHRvcCA9IHJlZlBvcy50b3AgKyByZWZQb3MuaGVpZ2h0IC0gZS5jbGllbnRZO1xuICAgICAgICBpZiAodGhpcy5jYXNjYWRlID09ICdyaWdodCcpIGxlZnQgPSByZWZQb3MubGVmdCArIHJlZlBvcy53aWR0aCAtIGUuY2xpZW50WDtcblxuICAgICAgICBpZiAodGhpcy5pc0RyYWdnaW5nICYmIHRoaXMuX3pvb21PbkRyYWcpIHtcbiAgICAgICAgICAgIGxlZnQgKj0gMjtcbiAgICAgICAgICAgIHRvcCAqPSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgICB0b3A6IHRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEFic29sdXRlTW91c2VQb3NpdGlvbihlOiBhbnkpOiBOZ0dyaWRSYXdQb3NpdGlvbiB7XG4gICAgICAgIGlmICgoKDxhbnk+d2luZG93KS5Ub3VjaEV2ZW50ICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB8fCAoZS50b3VjaGVzIHx8IGUuY2hhbmdlZFRvdWNoZXMpKSB7XG4gICAgICAgICAgICBlID0gZS50b3VjaGVzLmxlbmd0aCA+IDAgPyBlLnRvdWNoZXNbMF0gOiBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGUuY2xpZW50WCxcbiAgICAgICAgICAgIHRvcDogZS5jbGllbnRZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Q29udGFpbmVyQ29sdW1ucygpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBtYXhXaWR0aDogbnVtYmVyID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCBpdGVtV2lkdGg6IG51bWJlciA9IHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0O1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihtYXhXaWR0aCAvIGl0ZW1XaWR0aCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Q29udGFpbmVyUm93cygpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBtYXhIZWlnaHQ6IG51bWJlciA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMubWFyZ2luVG9wIC0gdGhpcy5tYXJnaW5Cb3R0b207XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG1heEhlaWdodCAvICh0aGlzLnJvd0hlaWdodCArIHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b20pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRTY3JlZW5NYXJnaW4oKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbWF4V2lkdGg6IG51bWJlciA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgY29uc3QgaXRlbVdpZHRoOiBudW1iZXIgPSB0aGlzLmNvbFdpZHRoICsgdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodDtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKG1heFdpZHRoIC0gKHRoaXMuX21heENvbHMgKiBpdGVtV2lkdGgpKSAvIDIpOztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRJdGVtRnJvbVBvc2l0aW9uKHBvc2l0aW9uOiBOZ0dyaWRSYXdQb3NpdGlvbik6IE5nR3JpZEl0ZW0ge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9pdGVtc0luR3JpZCwgKGl0ZW1JZDogc3RyaW5nKSA9PiB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKSkuZmluZCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IHNpemU6IE5nR3JpZEl0ZW1EaW1lbnNpb25zID0gaXRlbS5nZXREaW1lbnNpb25zKCk7XG4gICAgICAgICAgICBjb25zdCBwb3M6IE5nR3JpZFJhd1Bvc2l0aW9uID0gaXRlbS5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ubGVmdCA+PSBwb3MubGVmdCAmJiBwb3NpdGlvbi5sZWZ0IDwgKHBvcy5sZWZ0ICsgc2l6ZS53aWR0aCkgJiZcbiAgICAgICAgICAgIHBvc2l0aW9uLnRvcCA+PSBwb3MudG9wICYmIHBvc2l0aW9uLnRvcCA8IChwb3MudG9wICsgc2l6ZS5oZWlnaHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVQbGFjZWhvbGRlcihpdGVtOiBOZ0dyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBvczogTmdHcmlkSXRlbVBvc2l0aW9uID0gaXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgZGltczogTmdHcmlkSXRlbVNpemUgPSBpdGVtLmdldFNpemUoKTtcblxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdHcmlkUGxhY2Vob2xkZXIpO1xuICAgICAgICB2YXIgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8TmdHcmlkUGxhY2Vob2xkZXI+ID0gaXRlbS5jb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZiA9IGNvbXBvbmVudFJlZjtcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXI6IE5nR3JpZFBsYWNlaG9sZGVyID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgICAgICBwbGFjZWhvbGRlci5yZWdpc3RlckdyaWQodGhpcyk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnNldENhc2NhZGVNb2RlKHRoaXMuY2FzY2FkZSk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnNldEdyaWRQb3NpdGlvbih7IGNvbDogcG9zLmNvbCwgcm93OiBwb3Mucm93IH0pO1xuICAgICAgICBwbGFjZWhvbGRlci5zZXRTaXplKHsgeDogZGltcy54LCB5OiBkaW1zLnkgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW1pdE9uSXRlbUNoYW5nZSgpIHtcbiAgICAgICAgY29uc3QgaXRlbU91dHB1dDogYW55W10gPSBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zSW5HcmlkKVxuICAgICAgICAgICAgLm1hcCgoaXRlbUlkOiBzdHJpbmcpID0+IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpKVxuICAgICAgICAgICAgLmZpbHRlcigoaXRlbTogTmdHcmlkSXRlbSkgPT4gISFpdGVtKVxuICAgICAgICAgICAgLm1hcCgoaXRlbTogTmdHcmlkSXRlbSkgPT4gaXRlbS5nZXRFdmVudE91dHB1dCgpKTtcblxuICAgICAgICB0aGlzLm9uSXRlbUNoYW5nZS5lbWl0KGl0ZW1PdXRwdXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RlZmluZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLl9kb2N1bWVudE1vdXNlbW92ZSQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRNb3VzZXVwJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNldXAnKTtcbiAgICAgICAgdGhpcy5fbW91c2Vkb3duJCA9IGZyb21FdmVudChlbGVtZW50LCAnbW91c2Vkb3duJyk7XG4gICAgICAgIHRoaXMuX21vdXNlbW92ZSQgPSBmcm9tRXZlbnQoZWxlbWVudCwgJ21vdXNlbW92ZScpO1xuICAgICAgICB0aGlzLl9tb3VzZXVwJCA9IGZyb21FdmVudChlbGVtZW50LCAnbW91c2V1cCcpO1xuICAgICAgICB0aGlzLl90b3VjaHN0YXJ0JCA9IGZyb21FdmVudChlbGVtZW50LCAndG91Y2hzdGFydCcpO1xuICAgICAgICB0aGlzLl90b3VjaG1vdmUkID0gZnJvbUV2ZW50KGVsZW1lbnQsICd0b3VjaG1vdmUnKTtcbiAgICAgICAgdGhpcy5fdG91Y2hlbmQkID0gZnJvbUV2ZW50KGVsZW1lbnQsICd0b3VjaGVuZCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2VuYWJsZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2VuYWJsZWRMaXN0ZW5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZW5hYmxlTW91c2VMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5faXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVUb3VjaExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZW5hYmxlZExpc3RlbmVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnM6IFN1YnNjcmlwdGlvbikgPT4gc3Vicy51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZExpc3RlbmVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNUb3VjaERldmljZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuICAgIH07XG5cbiAgICBwcml2YXRlIF9lbmFibGVUb3VjaExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG91Y2hzdGFydFN1YnMgPSB0aGlzLl90b3VjaHN0YXJ0JC5zdWJzY3JpYmUoKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMubW91c2VEb3duRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgdG91Y2htb3ZlU3VicyA9IHRoaXMuX3RvdWNobW92ZSQuc3Vic2NyaWJlKChlOiBUb3VjaEV2ZW50KSA9PiB0aGlzLm1vdXNlTW92ZUV2ZW50SGFuZGxlcihlKSk7XG4gICAgICAgIGNvbnN0IHRvdWNoZW5kU3VicyA9IHRoaXMuX3RvdWNoZW5kJC5zdWJzY3JpYmUoKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMubW91c2VVcEV2ZW50SGFuZGxlcihlKSk7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgdG91Y2hzdGFydFN1YnMsXG4gICAgICAgICAgICB0b3VjaG1vdmVTdWJzLFxuICAgICAgICAgICAgdG91Y2hlbmRTdWJzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW5hYmxlTW91c2VMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50TW91c2Vtb3ZlU3VicyA9IHRoaXMuX2RvY3VtZW50TW91c2Vtb3ZlJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VNb3ZlRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRNb3VzZXVwU3VicyA9IHRoaXMuX2RvY3VtZW50TW91c2V1cCQuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm1vdXNlVXBFdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCBtb3VzZWRvd25TdWJzID0gdGhpcy5fbW91c2Vkb3duJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VEb3duRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgbW91c2Vtb3ZlU3VicyA9IHRoaXMuX21vdXNlbW92ZSQuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm1vdXNlTW92ZUV2ZW50SGFuZGxlcihlKSk7XG4gICAgICAgIGNvbnN0IG1vdXNldXBTdWJzID0gdGhpcy5fbW91c2V1cCQuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm1vdXNlVXBFdmVudEhhbmRsZXIoZSkpO1xuXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgIGRvY3VtZW50TW91c2Vtb3ZlU3VicyxcbiAgICAgICAgICAgIGRvY3VtZW50TW91c2V1cFN1YnMsXG4gICAgICAgICAgICBtb3VzZWRvd25TdWJzLFxuICAgICAgICAgICAgbW91c2Vtb3ZlU3VicyxcbiAgICAgICAgICAgIG1vdXNldXBTdWJzXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19