import { Component, ElementRef, Renderer, Directive, EventEmitter, ComponentFactoryResolver, KeyValueDiffers, Output, Renderer2, ViewContainerRef, NgModule } from '@angular/core';
import { __values } from 'tslib';
import { fromEvent } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @return {?}
 */
function generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var /** @type {?} */ r = Math.random() * 16 | 0, /** @type {?} */ v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sortItemsByPositionHorizontal(a, b) {
    if (a.col === b.col) {
        return a.row - b.row;
    }
    return a.col - b.col;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sortItemsByPositionVertical(a, b) {
    if (a.row === b.row) {
        return a.col - b.col;
    }
    return a.row - b.row;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgGridPlaceholder = /** @class */ (function () {
    function NgGridPlaceholder(_ngEl, _renderer) {
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    /**
     * @param {?} ngGrid
     * @return {?}
     */
    NgGridPlaceholder.prototype.registerGrid = /**
     * @param {?} ngGrid
     * @return {?}
     */
    function (ngGrid) {
        this._ngGrid = ngGrid;
    };
    /**
     * @return {?}
     */
    NgGridPlaceholder.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._renderer.setElementClass(this._ngEl.nativeElement, 'grid-placeholder', true);
        if (this._ngGrid.autoStyle)
            this._renderer.setElementStyle(this._ngEl.nativeElement, 'position', 'absolute');
    };
    /**
     * @param {?} newSize
     * @return {?}
     */
    NgGridPlaceholder.prototype.setSize = /**
     * @param {?} newSize
     * @return {?}
     */
    function (newSize) {
        this._size = newSize;
        this._recalculateDimensions();
    };
    /**
     * @param {?} newPosition
     * @return {?}
     */
    NgGridPlaceholder.prototype.setGridPosition = /**
     * @param {?} newPosition
     * @return {?}
     */
    function (newPosition) {
        this._position = newPosition;
        this._recalculatePosition();
    };
    /**
     * @param {?} cascade
     * @return {?}
     */
    NgGridPlaceholder.prototype.setCascadeMode = /**
     * @param {?} cascade
     * @return {?}
     */
    function (cascade) {
        this._cascadeMode = cascade;
        switch (cascade) {
            case 'up':
            case 'left':
            default:
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'left', '0px');
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'top', '0px');
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'right', null);
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'bottom', null);
                break;
            case 'right':
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'right', '0px');
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'top', '0px');
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'left', null);
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'bottom', null);
                break;
            case 'down':
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'left', '0px');
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'bottom', '0px');
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'right', null);
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'top', null);
                break;
        }
    };
    /**
     * @param {?} w
     * @param {?} h
     * @return {?}
     */
    NgGridPlaceholder.prototype._setDimensions = /**
     * @param {?} w
     * @param {?} h
     * @return {?}
     */
    function (w, h) {
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'width', w + 'px');
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'height', h + 'px');
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    NgGridPlaceholder.prototype._setPosition = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        switch (this._cascadeMode) {
            case 'up':
            case 'left':
            default:
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'transform', 'translate(' + x + 'px, ' + y + 'px)');
                break;
            case 'right':
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'transform', 'translate(' + -x + 'px, ' + y + 'px)');
                break;
            case 'down':
                this._renderer.setElementStyle(this._ngEl.nativeElement, 'transform', 'translate(' + x + 'px, ' + -y + 'px)');
                break;
        }
    };
    /**
     * @return {?}
     */
    NgGridPlaceholder.prototype._recalculatePosition = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ x = (this._ngGrid.colWidth + this._ngGrid.marginLeft + this._ngGrid.marginRight) * (this._position.col - 1) + this._ngGrid.marginLeft + this._ngGrid.screenMargin;
        var /** @type {?} */ y = (this._ngGrid.rowHeight + this._ngGrid.marginTop + this._ngGrid.marginBottom) * (this._position.row - 1) + this._ngGrid.marginTop;
        this._setPosition(x, y);
    };
    /**
     * @return {?}
     */
    NgGridPlaceholder.prototype._recalculateDimensions = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ w = (this._ngGrid.colWidth * this._size.x) + ((this._ngGrid.marginLeft + this._ngGrid.marginRight) * (this._size.x - 1));
        var /** @type {?} */ h = (this._ngGrid.rowHeight * this._size.y) + ((this._ngGrid.marginTop + this._ngGrid.marginBottom) * (this._size.y - 1));
        this._setDimensions(w, h);
    };
    NgGridPlaceholder.decorators = [
        { type: Component, args: [{
                    selector: 'ng-grid-placeholder',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NgGridPlaceholder.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer }
    ]; };
    return NgGridPlaceholder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        var /** @type {?} */ uid = generateUuid();
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
            for (var collisions_1 = __values(collisions), collisions_1_1 = collisions_1.next(); !collisions_1_1.done; collisions_1_1 = collisions_1.next()) {
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
                itemsInGrid = itemsInGrid.sort(sortItemsByPositionVertical);
                var /** @type {?} */ lowestRowPerColumn = new Map();
                try {
                    for (var itemsInGrid_1 = __values(itemsInGrid), itemsInGrid_1_1 = itemsInGrid_1.next(); !itemsInGrid_1_1.done; itemsInGrid_1_1 = itemsInGrid_1.next()) {
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
                itemsInGrid = itemsInGrid.sort(sortItemsByPositionHorizontal);
                var /** @type {?} */ lowestColumnPerRow = new Map();
                try {
                    for (var itemsInGrid_2 = __values(itemsInGrid), itemsInGrid_2_1 = itemsInGrid_2.next(); !itemsInGrid_2_1.done; itemsInGrid_2_1 = itemsInGrid_2.next()) {
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
                    for (var itemsInPath_1 = __values(itemsInPath), itemsInPath_1_1 = itemsInPath_1.next(); !itemsInPath_1_1.done; itemsInPath_1_1 = itemsInPath_1.next()) {
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
                    for (var itemsInPath_2 = __values(itemsInPath), itemsInPath_2_1 = itemsInPath_2.next(); !itemsInPath_2_1.done; itemsInPath_2_1 = itemsInPath_2.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
                for (var resizeDirections_1 = __values(resizeDirections), resizeDirections_1_1 = resizeDirections_1.next(); !resizeDirections_1_1.done; resizeDirections_1_1 = resizeDirections_1.next()) {
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
            for (var _b = __values(this._resizeDirections), _c = _b.next(); !_c.done; _c = _b.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgGridModule = /** @class */ (function () {
    function NgGridModule() {
    }
    NgGridModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgGrid, NgGridItem, NgGridPlaceholder],
                    entryComponents: [NgGridPlaceholder],
                    exports: [NgGrid, NgGridItem]
                },] },
    ];
    return NgGridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgGrid, NgGridItem, NgGridPlaceholder, NgGridModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZ3JpZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhcjItZ3JpZC9oZWxwZXJzL05nR3JpZEhlbHBlcnMudHMiLCJuZzovL2FuZ3VsYXIyLWdyaWQvY29tcG9uZW50cy9OZ0dyaWRQbGFjZWhvbGRlci50cyIsIm5nOi8vYW5ndWxhcjItZ3JpZC9kaXJlY3RpdmVzL05nR3JpZC50cyIsIm5nOi8vYW5ndWxhcjItZ3JpZC9kaXJlY3RpdmVzL05nR3JpZEl0ZW0udHMiLCJuZzovL2FuZ3VsYXIyLWdyaWQvbW9kdWxlcy9OZ0dyaWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nR3JpZEl0ZW0gfSBmcm9tIFwiLi4vZGlyZWN0aXZlcy9OZ0dyaWRJdGVtXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVV1aWQoKTogc3RyaW5nIHtcblx0cmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24oYykge1xuXHRcdGxldCByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMCwgdiA9IGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KTtcblx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc29ydEl0ZW1zQnlQb3NpdGlvbkhvcml6b250YWwoYTogTmdHcmlkSXRlbSwgYjogTmdHcmlkSXRlbSk6IG51bWJlciB7XG5cdGlmIChhLmNvbCA9PT0gYi5jb2wpIHsgcmV0dXJuIGEucm93IC0gYi5yb3c7IH1cblx0cmV0dXJuIGEuY29sIC0gYi5jb2w7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0SXRlbXNCeVBvc2l0aW9uVmVydGljYWwoYTogTmdHcmlkSXRlbSwgYjogTmdHcmlkSXRlbSk6IG51bWJlciB7XG5cdGlmIChhLnJvdyA9PT0gYi5yb3cpIHsgcmV0dXJuIGEuY29sIC0gYi5jb2w7IH1cblx0cmV0dXJuIGEucm93IC0gYi5yb3c7XG59XG4iLCJpbXBvcnQgeyBOZ0dyaWQgfSBmcm9tICcuLi9kaXJlY3RpdmVzL05nR3JpZCc7XG5pbXBvcnQgeyBOZ0dyaWRJdGVtUG9zaXRpb24sIE5nR3JpZEl0ZW1TaXplIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JTmdHcmlkJztcbmltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlciwgRXZlbnRFbWl0dGVyLCBIb3N0LCBWaWV3RW5jYXBzdWxhdGlvbiwgVHlwZSwgQ29tcG9uZW50UmVmLCBLZXlWYWx1ZURpZmZlciwgS2V5VmFsdWVEaWZmZXJzLCBPbkluaXQsIE9uRGVzdHJveSwgRG9DaGVjaywgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmctZ3JpZC1wbGFjZWhvbGRlcicsXG4gICAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIE5nR3JpZFBsYWNlaG9sZGVyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIF9zaXplOiBOZ0dyaWRJdGVtU2l6ZTtcbiAgICBwcml2YXRlIF9wb3NpdGlvbjogTmdHcmlkSXRlbVBvc2l0aW9uO1xuICAgIHByaXZhdGUgX25nR3JpZDogTmdHcmlkO1xuICAgIHByaXZhdGUgX2Nhc2NhZGVNb2RlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIpIHsgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyR3JpZChuZ0dyaWQ6IE5nR3JpZCkge1xuICAgICAgICB0aGlzLl9uZ0dyaWQgPSBuZ0dyaWQ7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnZ3JpZC1wbGFjZWhvbGRlcicsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmF1dG9TdHlsZSkgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNpemUobmV3U2l6ZTogTmdHcmlkSXRlbVNpemUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ld1NpemU7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRHcmlkUG9zaXRpb24obmV3UG9zaXRpb246IE5nR3JpZEl0ZW1Qb3NpdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IG5ld1Bvc2l0aW9uO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENhc2NhZGVNb2RlKGNhc2NhZGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jYXNjYWRlTW9kZSA9IGNhc2NhZGU7XG4gICAgICAgIHN3aXRjaCAoY2FzY2FkZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgJzBweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCAnMHB4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsICcwcHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgJzBweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCAnMHB4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsICcwcHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgICBwcml2YXRlIF9zZXREaW1lbnNpb25zKHc6IG51bWJlciwgaDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHcgKyAncHgnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGggKyAncHgnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX2Nhc2NhZGVNb2RlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4KScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAteCArICdweCwgJyArIHkgKyAncHgpJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgeCArICdweCwgJyArIC15ICsgJ3B4KScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjYWxjdWxhdGVQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgeDogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5jb2xXaWR0aCArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0KSAqICh0aGlzLl9wb3NpdGlvbi5jb2wgLSAxKSArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLnNjcmVlbk1hcmdpbjtcbiAgICAgICAgY29uc3QgeTogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5yb3dIZWlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSkgKiAodGhpcy5fcG9zaXRpb24ucm93IC0gMSkgKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wO1xuICAgICAgICB0aGlzLl9zZXRQb3NpdGlvbih4LCB5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHc6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQuY29sV2lkdGggKiB0aGlzLl9zaXplLngpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCkgKiAodGhpcy5fc2l6ZS54IC0gMSkpO1xuICAgICAgICBjb25zdCBoOiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLnJvd0hlaWdodCAqIHRoaXMuX3NpemUueSkgKyAoKHRoaXMuX25nR3JpZC5tYXJnaW5Ub3AgKyB0aGlzLl9uZ0dyaWQubWFyZ2luQm90dG9tKSAqICh0aGlzLl9zaXplLnkgLSAxKSk7XG4gICAgICAgIHRoaXMuX3NldERpbWVuc2lvbnModywgaCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSG9zdCwgVmlld0VuY2Fwc3VsYXRpb24sIFR5cGUsIENvbXBvbmVudFJlZiwgS2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVycywgT25Jbml0LCBPbkRlc3Ryb3ksIERvQ2hlY2ssIFZpZXdDb250YWluZXJSZWYsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdHcmlkQ29uZmlnLCBOZ0dyaWRJdGVtRXZlbnQsIE5nR3JpZEl0ZW1Qb3NpdGlvbiwgTmdHcmlkSXRlbVNpemUsIE5nR3JpZFJhd1Bvc2l0aW9uLCBOZ0dyaWRJdGVtRGltZW5zaW9ucywgTmdDb25maWdGaXhEaXJlY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL0lOZ0dyaWQnO1xuaW1wb3J0IHsgTmdHcmlkSXRlbSB9IGZyb20gJy4vTmdHcmlkSXRlbSc7XG5pbXBvcnQgKiBhcyBOZ0dyaWRIZWxwZXIgZnJvbSAnLi4vaGVscGVycy9OZ0dyaWRIZWxwZXJzJztcbmltcG9ydCB7IE5nR3JpZFBsYWNlaG9sZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9OZ0dyaWRQbGFjZWhvbGRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tuZ0dyaWRdJyxcbiAgICBpbnB1dHM6IFsnY29uZmlnOiBuZ0dyaWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAncmVzaXplRXZlbnRIYW5kbGVyKCRldmVudCknLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdHcmlkIGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICAgIHB1YmxpYyBzdGF0aWMgQ09OU1RfREVGQVVMVF9SRVNJWkVfRElSRUNUSU9OUzogc3RyaW5nW10gPSBbXG4gICAgICAgICdib3R0b21yaWdodCcsXG4gICAgICAgICdib3R0b21sZWZ0JyxcbiAgICAgICAgJ3RvcHJpZ2h0JyxcbiAgICAgICAgJ3RvcGxlZnQnLFxuICAgICAgICAncmlnaHQnLFxuICAgICAgICAnbGVmdCcsXG4gICAgICAgICdib3R0b20nLFxuICAgICAgICAndG9wJyxcbiAgICBdO1xuXG4gICAgLy8gRXZlbnQgRW1pdHRlcnNcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWc6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ1N0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplU3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZVN0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uSXRlbUNoYW5nZTogRXZlbnRFbWl0dGVyPEFycmF5PE5nR3JpZEl0ZW1FdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxOZ0dyaWRJdGVtRXZlbnQ+PigpO1xuXG4gICAgLy8gUHVibGljIHZhcmlhYmxlc1xuICAgIHB1YmxpYyBjb2xXaWR0aDogbnVtYmVyID0gMjUwO1xuICAgIHB1YmxpYyByb3dIZWlnaHQ6IG51bWJlciA9IDI1MDtcbiAgICBwdWJsaWMgbWluQ29sczogbnVtYmVyID0gMTtcbiAgICBwdWJsaWMgbWluUm93czogbnVtYmVyID0gMTtcbiAgICBwdWJsaWMgbWFyZ2luVG9wOiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgbWFyZ2luUmlnaHQ6IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyBtYXJnaW5Cb3R0b206IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyBtYXJnaW5MZWZ0OiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgc2NyZWVuTWFyZ2luOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzUmVzaXppbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgYXV0b1N0eWxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgcmVzaXplRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgZHJhZ0VuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGNhc2NhZGU6IHN0cmluZyA9ICd1cCc7XG4gICAgcHVibGljIG1pbldpZHRoOiBudW1iZXIgPSAxMDA7XG4gICAgcHVibGljIG1pbkhlaWdodDogbnVtYmVyID0gMTAwO1xuICAgIHB1YmxpYyByZXNpemVEaXJlY3Rpb25zOiBzdHJpbmdbXSA9IE5nR3JpZC5DT05TVF9ERUZBVUxUX1JFU0laRV9ESVJFQ1RJT05TO1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICBwcml2YXRlIF9pdGVtczogTWFwPHN0cmluZywgTmdHcmlkSXRlbT4gPSBuZXcgTWFwPHN0cmluZywgTmdHcmlkSXRlbT4oKTtcbiAgICBwcml2YXRlIF9kcmFnZ2luZ0l0ZW06IE5nR3JpZEl0ZW0gPSBudWxsO1xuICAgIHByaXZhdGUgX3Jlc2l6aW5nSXRlbTogTmdHcmlkSXRlbSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfcmVzaXplRGlyZWN0aW9uOiBzdHJpbmcgPSBudWxsO1xuICAgIHByaXZhdGUgX2l0ZW1zSW5HcmlkOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHByaXZhdGUgX2NvbnRhaW5lcldpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfY29udGFpbmVySGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbWF4Q29sczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9tYXhSb3dzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3Zpc2libGVDb2xzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3Zpc2libGVSb3dzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3NldFdpZHRoOiBudW1iZXIgPSAyNTA7XG4gICAgcHJpdmF0ZSBfc2V0SGVpZ2h0OiBudW1iZXIgPSAyNTA7XG4gICAgcHJpdmF0ZSBfcG9zT2Zmc2V0OiBOZ0dyaWRSYXdQb3NpdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfYWRkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXJSZWY6IENvbXBvbmVudFJlZjxOZ0dyaWRQbGFjZWhvbGRlcj4gPSBudWxsO1xuICAgIHByaXZhdGUgX2ZpeFRvR3JpZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2F1dG9SZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9kaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjtcbiAgICBwcml2YXRlIF9kZXN0cm95ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9tYWludGFpblJhdGlvOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfYXNwZWN0UmF0aW86IG51bWJlcjtcbiAgICBwcml2YXRlIF9wcmVmZXJOZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF96b29tT25EcmFnOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbGltaXRUb1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2NlbnRlclRvU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfY3VyTWF4Um93OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2N1ck1heENvbDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9kcmFnUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9yZXNpemVSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pdGVtRml4RGlyZWN0aW9uOiBOZ0NvbmZpZ0ZpeERpcmVjdGlvbiA9ICdjYXNjYWRlJztcbiAgICBwcml2YXRlIF9jb2xsaXNpb25GaXhEaXJlY3Rpb246IE5nQ29uZmlnRml4RGlyZWN0aW9uID0gJ2Nhc2NhZGUnO1xuICAgIHByaXZhdGUgX2FsbG93T3ZlcmxhcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2Nhc2NhZGVQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xuICAgIHByaXZhdGUgX2xhc3RaVmFsdWU6IG51bWJlciA9IDE7XG5cbiAgICAvLyBFdmVudHNcbiAgICBwcml2YXRlIF9kb2N1bWVudE1vdXNlbW92ZSQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnRNb3VzZXVwJDogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PjtcbiAgICBwcml2YXRlIF9tb3VzZWRvd24kOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICAgIHByaXZhdGUgX21vdXNlbW92ZSQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfbW91c2V1cCQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfdG91Y2hzdGFydCQ6IE9ic2VydmFibGU8VG91Y2hFdmVudD47XG4gICAgcHJpdmF0ZSBfdG91Y2htb3ZlJDogT2JzZXJ2YWJsZTxUb3VjaEV2ZW50PjtcbiAgICBwcml2YXRlIF90b3VjaGVuZCQ6IE9ic2VydmFibGU8VG91Y2hFdmVudD47XG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIHByaXZhdGUgX2VuYWJsZWRMaXN0ZW5lcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gRGVmYXVsdCBjb25maWdcbiAgICBwcml2YXRlIHN0YXRpYyBDT05TVF9ERUZBVUxUX0NPTkZJRzogTmdHcmlkQ29uZmlnID0ge1xuICAgICAgICBtYXJnaW5zOiBbMTBdLFxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgIHJlc2l6YWJsZTogdHJ1ZSxcbiAgICAgICAgbWF4X2NvbHM6IDAsXG4gICAgICAgIG1heF9yb3dzOiAwLFxuICAgICAgICB2aXNpYmxlX2NvbHM6IDAsXG4gICAgICAgIHZpc2libGVfcm93czogMCxcbiAgICAgICAgY29sX3dpZHRoOiAyNTAsXG4gICAgICAgIHJvd19oZWlnaHQ6IDI1MCxcbiAgICAgICAgY2FzY2FkZTogJ3VwJyxcbiAgICAgICAgbWluX3dpZHRoOiAxMDAsXG4gICAgICAgIG1pbl9oZWlnaHQ6IDEwMCxcbiAgICAgICAgZml4X3RvX2dyaWQ6IGZhbHNlLFxuICAgICAgICBhdXRvX3N0eWxlOiB0cnVlLFxuICAgICAgICBhdXRvX3Jlc2l6ZTogZmFsc2UsXG4gICAgICAgIG1haW50YWluX3JhdGlvOiBmYWxzZSxcbiAgICAgICAgcHJlZmVyX25ldzogZmFsc2UsXG4gICAgICAgIHpvb21fb25fZHJhZzogZmFsc2UsXG4gICAgICAgIGxpbWl0X3RvX3NjcmVlbjogZmFsc2UsXG4gICAgICAgIGNlbnRlcl90b19zY3JlZW46IGZhbHNlLFxuICAgICAgICByZXNpemVfZGlyZWN0aW9uczogTmdHcmlkLkNPTlNUX0RFRkFVTFRfUkVTSVpFX0RJUkVDVElPTlMsXG4gICAgICAgIGVsZW1lbnRfYmFzZWRfcm93X2hlaWdodDogZmFsc2UsXG4gICAgICAgIGZpeF9pdGVtX3Bvc2l0aW9uX2RpcmVjdGlvbjogJ2Nhc2NhZGUnLFxuICAgICAgICBmaXhfY29sbGlzaW9uX3Bvc2l0aW9uX2RpcmVjdGlvbjogJ2Nhc2NhZGUnLFxuICAgICAgICBhbGxvd19vdmVybGFwOiBmYWxzZSxcbiAgICB9O1xuICAgIHByaXZhdGUgX2NvbmZpZyA9IE5nR3JpZC5DT05TVF9ERUZBVUxUX0NPTkZJRztcblxuICAgIC8vIFtuZy1ncmlkXSBhdHRyaWJ1dGUgaGFuZGxlclxuICAgIHNldCBjb25maWcodjogTmdHcmlkQ29uZmlnKSB7XG4gICAgICAgIGlmICh2ID09IG51bGwgfHwgdHlwZW9mIHYgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldENvbmZpZyh2KTtcblxuICAgICAgICBpZiAodGhpcy5fZGlmZmVyID09IG51bGwgJiYgdiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9kaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQodGhpcy5fY29uZmlnKS5jcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX2RlZmluZUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBtZXRob2RzXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnZ3JpZCcsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5hdXRvU3R5bGUpIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgICAgICB0aGlzLnNldENvbmZpZyh0aGlzLl9jb25maWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZW5lcmF0ZUl0ZW1VaWQoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdWlkOiBzdHJpbmcgPSBOZ0dyaWRIZWxwZXIuZ2VuZXJhdGVVdWlkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmhhcyh1aWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUl0ZW1VaWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1aWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENvbmZpZyhjb25maWc6IE5nR3JpZENvbmZpZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgdmFyIG1heENvbFJvd0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgeCBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBjb25maWdbeF07XG4gICAgICAgICAgICB2YXIgaW50VmFsID0gIXZhbCA/IDAgOiBwYXJzZUludCh2YWwpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHgpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdtYXJnaW5zJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXJnaW5zKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbF93aWR0aCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sV2lkdGggPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyb3dfaGVpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhdXRvX3N0eWxlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvU3R5bGUgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2F1dG9fcmVzaXplJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXV0b1Jlc2l6ZSA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZHJhZ2dhYmxlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnRW5hYmxlID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXNpemFibGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUVuYWJsZSA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWF4X3Jvd3MnOlxuICAgICAgICAgICAgICAgICAgICBtYXhDb2xSb3dDaGFuZ2VkID0gbWF4Q29sUm93Q2hhbmdlZCB8fCB0aGlzLl9tYXhSb3dzICE9IGludFZhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4Um93cyA9IGludFZhbCA8IDAgPyAwIDogaW50VmFsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtYXhfY29scyc6XG4gICAgICAgICAgICAgICAgICAgIG1heENvbFJvd0NoYW5nZWQgPSBtYXhDb2xSb3dDaGFuZ2VkIHx8IHRoaXMuX21heENvbHMgIT0gaW50VmFsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXhDb2xzID0gaW50VmFsIDwgMCA/IDAgOiBpbnRWYWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVfcm93cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGVSb3dzID0gTWF0aC5tYXgoaW50VmFsLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndmlzaWJsZV9jb2xzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZUNvbHMgPSBNYXRoLm1heChpbnRWYWwsIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtaW5fcm93cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluUm93cyA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbl9jb2xzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5Db2xzID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluX2hlaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluSGVpZ2h0ID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluX3dpZHRoJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5XaWR0aCA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3pvb21fb25fZHJhZyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvb21PbkRyYWcgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Nhc2NhZGUnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXNjYWRlICE9IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNjYWRlID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmaXhfdG9fZ3JpZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpeFRvR3JpZCA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWFpbnRhaW5fcmF0aW8nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWludGFpblJhdGlvID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVmZXJfbmV3JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJlZmVyTmV3ID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsaW1pdF90b19zY3JlZW4nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saW1pdFRvU2NyZWVuID0gIXRoaXMuX2F1dG9SZXNpemUgJiYgISF2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcl90b19zY3JlZW4nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZW50ZXJUb1NjcmVlbiA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVzaXplX2RpcmVjdGlvbnMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZURpcmVjdGlvbnMgPSB2YWwgfHwgWydib3R0b21yaWdodCcsICdib3R0b21sZWZ0JywgJ3RvcHJpZ2h0JywgJ3RvcGxlZnQnLCAncmlnaHQnLCAnbGVmdCcsICdib3R0b20nLCAndG9wJ107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRfYmFzZWRfcm93X2hlaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZml4X2l0ZW1fcG9zaXRpb25fZGlyZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbUZpeERpcmVjdGlvbiA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZml4X2NvbGxpc2lvbl9wb3NpdGlvbl9kaXJlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FsbG93X292ZXJsYXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd092ZXJsYXAgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYWxsb3dPdmVybGFwICYmIHRoaXMuY2FzY2FkZSAhPT0gJ29mZicgJiYgdGhpcy5jYXNjYWRlICE9PSAnJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gb3ZlcmxhcCBpdGVtcyB3aGVuIGEgY2FzY2FkZSBkaXJlY3Rpb24gaXMgc2V0LicpO1xuICAgICAgICAgICAgdGhpcy5fYWxsb3dPdmVybGFwID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnRW5hYmxlIHx8IHRoaXMucmVzaXplRW5hYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtRml4RGlyZWN0aW9uID09PSAnY2FzY2FkZScpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPSB0aGlzLl9nZXRGaXhEaXJlY3Rpb25Gcm9tQ2FzY2FkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbGxpc2lvbkZpeERpcmVjdGlvbiA9PT0gJ2Nhc2NhZGUnKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPSB0aGlzLl9nZXRGaXhEaXJlY3Rpb25Gcm9tQ2FzY2FkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpbWl0VG9TY3JlZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld01heENvbHMgPSB0aGlzLl9nZXRDb250YWluZXJDb2x1bW5zKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhDb2xzICE9IG5ld01heENvbHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhDb2xzID0gbmV3TWF4Q29scztcbiAgICAgICAgICAgICAgICBtYXhDb2xSb3dDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saW1pdFRvU2NyZWVuICYmIHRoaXMuX2NlbnRlclRvU2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLnNjcmVlbk1hcmdpbiA9IHRoaXMuX2dldFNjcmVlbk1hcmdpbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zY3JlZW5NYXJnaW4gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21haW50YWluUmF0aW8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbFdpZHRoICYmIHRoaXMucm93SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXNwZWN0UmF0aW8gPSB0aGlzLmNvbFdpZHRoIC8gdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX21haW50YWluUmF0aW8gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXhDb2xSb3dDaGFuZ2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5fbWF4Um93cyA+IDApIHsgICAgLy8gICAgQ2FuJ3QgaGF2ZSBib3RoLCBwcmlvcml0aXNlIG9uIGNhc2NhZGVcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY2FzY2FkZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21heFJvd3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbnNBZnRlck1heENoYW5nZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29sV2lkdGgoKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlUm93SGVpZ2h0KCk7XG5cbiAgICAgICAgdmFyIG1heFdpZHRoID0gdGhpcy5fbWF4Q29scyAqIHRoaXMuY29sV2lkdGg7XG4gICAgICAgIHZhciBtYXhIZWlnaHQgPSB0aGlzLl9tYXhSb3dzICogdGhpcy5yb3dIZWlnaHQ7XG5cbiAgICAgICAgaWYgKG1heFdpZHRoID4gMCAmJiB0aGlzLm1pbldpZHRoID4gbWF4V2lkdGgpIHRoaXMubWluV2lkdGggPSAwLjc1ICogdGhpcy5jb2xXaWR0aDtcbiAgICAgICAgaWYgKG1heEhlaWdodCA+IDAgJiYgdGhpcy5taW5IZWlnaHQgPiBtYXhIZWlnaHQpIHRoaXMubWluSGVpZ2h0ID0gMC43NSAqIHRoaXMucm93SGVpZ2h0O1xuXG4gICAgICAgIGlmICh0aGlzLm1pbldpZHRoID4gdGhpcy5jb2xXaWR0aCkgdGhpcy5taW5Db2xzID0gTWF0aC5tYXgodGhpcy5taW5Db2xzLCBNYXRoLmNlaWwodGhpcy5taW5XaWR0aCAvIHRoaXMuY29sV2lkdGgpKTtcbiAgICAgICAgaWYgKHRoaXMubWluSGVpZ2h0ID4gdGhpcy5yb3dIZWlnaHQpIHRoaXMubWluUm93cyA9IE1hdGgubWF4KHRoaXMubWluUm93cywgTWF0aC5jZWlsKHRoaXMubWluSGVpZ2h0IC8gdGhpcy5yb3dIZWlnaHQpKTtcblxuICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5taW5Db2xzID4gdGhpcy5fbWF4Q29scykgdGhpcy5taW5Db2xzID0gMTtcbiAgICAgICAgaWYgKHRoaXMuX21heFJvd3MgPiAwICYmIHRoaXMubWluUm93cyA+IHRoaXMuX21heFJvd3MpIHRoaXMubWluUm93cyA9IDE7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmF0aW8oKTtcblxuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZChpdGVtKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0Q2FzY2FkZU1vZGUodGhpcy5jYXNjYWRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5yZWNhbGN1bGF0ZVNlbGYoKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtUG9zaXRpb24oaXRlbUlkOiBzdHJpbmcpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzKGl0ZW1JZCkgPyB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKS5nZXRHcmlkUG9zaXRpb24oKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEl0ZW1TaXplKGl0ZW1JZDogc3RyaW5nKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzKGl0ZW1JZCkgPyB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKS5nZXRTaXplKCkgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0RvQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9kaWZmZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZXMgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl9jb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoY2hhbmdlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1hcmdpbnMobWFyZ2luczogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcmdpblRvcCA9IE1hdGgubWF4KHBhcnNlSW50KG1hcmdpbnNbMF0pLCAwKTtcbiAgICAgICAgdGhpcy5tYXJnaW5SaWdodCA9IG1hcmdpbnMubGVuZ3RoID49IDIgPyBNYXRoLm1heChwYXJzZUludChtYXJnaW5zWzFdKSwgMCkgOiB0aGlzLm1hcmdpblRvcDtcbiAgICAgICAgdGhpcy5tYXJnaW5Cb3R0b20gPSBtYXJnaW5zLmxlbmd0aCA+PSAzID8gTWF0aC5tYXgocGFyc2VJbnQobWFyZ2luc1syXSksIDApIDogdGhpcy5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMubWFyZ2luTGVmdCA9IG1hcmdpbnMubGVuZ3RoID49IDQgPyBNYXRoLm1heChwYXJzZUludChtYXJnaW5zWzNdKSwgMCkgOiB0aGlzLm1hcmdpblJpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGVEcmFnKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYWdFbmFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlRHJhZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmFnRW5hYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZVJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNpemVFbmFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlc2l6ZUVuYWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRJdGVtKG5nSXRlbTogTmdHcmlkSXRlbSk6IHZvaWQge1xuICAgICAgICBuZ0l0ZW0uc2V0Q2FzY2FkZU1vZGUodGhpcy5jYXNjYWRlKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3ByZWZlck5ldykge1xuICAgICAgICAgICAgdmFyIG5ld1BvcyA9IHRoaXMuX2ZpeEdyaWRQb3NpdGlvbihuZ0l0ZW0uZ2V0R3JpZFBvc2l0aW9uKCksIG5nSXRlbS5nZXRTaXplKCkpO1xuICAgICAgICAgICAgbmdJdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5nSXRlbS51aWQgPT09IG51bGwgfHwgdGhpcy5faXRlbXMuaGFzKG5nSXRlbS51aWQpKSB7XG4gICAgICAgICAgICBuZ0l0ZW0udWlkID0gdGhpcy5nZW5lcmF0ZUl0ZW1VaWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2l0ZW1zLnNldChuZ0l0ZW0udWlkLCBuZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9hZGRUb0dyaWQobmdJdGVtKTtcblxuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyQ2FzY2FkZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbmdJdGVtLnJlY2FsY3VsYXRlU2VsZigpO1xuICAgICAgICAgICAgbmdJdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2VtaXRPbkl0ZW1DaGFuZ2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlSXRlbShuZ0l0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQobmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9pdGVtcy5kZWxldGUobmdJdGVtLnVpZCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckNhc2NhZGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IGl0ZW0ucmVjYWxjdWxhdGVTZWxmKCkpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdE9uSXRlbUNoYW5nZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlSXRlbShuZ0l0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQobmdJdGVtKTtcbiAgICAgICAgdGhpcy5fYWRkVG9HcmlkKG5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyQ2FzY2FkZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgICAgICAgbmdJdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0cmlnZ2VyQ2FzY2FkZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYXNjYWRlUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FzY2FkZVByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlUHJvbWlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nhc2NhZGVHcmlkKG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXNjYWRlUHJvbWlzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHJpZ2dlclJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNpemVFdmVudEhhbmRsZXIobnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2l6ZUV2ZW50SGFuZGxlcihlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29sV2lkdGgoKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlUm93SGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmF0aW8oKTtcblxuICAgICAgICBpZiAodGhpcy5fbGltaXRUb1NjcmVlbikge1xuICAgICAgICAgICAgY29uc3QgbmV3TWF4Q29sdW1ucyA9IHRoaXMuX2dldENvbnRhaW5lckNvbHVtbnMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhDb2xzICE9PSBuZXdNYXhDb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IG5ld01heENvbHVtbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb25zQWZ0ZXJNYXhDaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fY2VudGVyVG9TY3JlZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcmVlbk1hcmdpbiA9IHRoaXMuX2dldFNjcmVlbk1hcmdpbigpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlY2FsY3VsYXRlU2VsZigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F1dG9SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlY2FsY3VsYXRlU2VsZigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdXNlRG93bkV2ZW50SGFuZGxlcihlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgICAgICB2YXIgbW91c2VQb3MgPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX2dldEl0ZW1Gcm9tUG9zaXRpb24obW91c2VQb3MpO1xuXG4gICAgICAgIGlmIChpdGVtID09IG51bGwpIHJldHVybjtcblxuICAgICAgICBjb25zdCByZXNpemVEaXJlY3Rpb246IHN0cmluZyA9IGl0ZW0uY2FuUmVzaXplKGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZUVuYWJsZSAmJiByZXNpemVEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZVJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbSA9IGl0ZW07XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVEaXJlY3Rpb24gPSByZXNpemVEaXJlY3Rpb247XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyYWdFbmFibGUgJiYgaXRlbS5jYW5EcmFnKGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtID0gaXRlbTtcblxuICAgICAgICAgICAgY29uc3QgaXRlbVBvcyA9IGl0ZW0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX3Bvc09mZnNldCA9IHsgJ2xlZnQnOiAobW91c2VQb3MubGVmdCAtIGl0ZW1Qb3MubGVmdCksICd0b3AnOiAobW91c2VQb3MudG9wIC0gaXRlbVBvcy50b3ApIH1cblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1vdXNlVXBFdmVudEhhbmRsZXIoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ1N0b3AoZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVTdG9wKGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RyYWdSZWFkeSB8fCB0aGlzLl9yZXNpemVSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYW5EcmFnKCk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhblJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1vdXNlTW92ZUV2ZW50SGFuZGxlcihlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fcmVzaXplUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZVN0YXJ0KGUpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RyYWdSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ1N0YXJ0KGUpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5fZHJhZyhlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZShlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBtb3VzZVBvcyA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX2dldEl0ZW1Gcm9tUG9zaXRpb24obW91c2VQb3MpO1xuXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ub25Nb3VzZU1vdmUoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAgICBQcml2YXRlIG1ldGhvZHNcbiAgICBwcml2YXRlIF9nZXRGaXhEaXJlY3Rpb25Gcm9tQ2FzY2FkZSgpOiBOZ0NvbmZpZ0ZpeERpcmVjdGlvbiB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jYXNjYWRlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZXJ0aWNhbCc7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hvcml6b250YWwnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX3VwZGF0ZVBvc2l0aW9uc0FmdGVyTWF4Q2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgcG9zID0gaXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBkaW1zID0gaXRlbS5nZXRTaXplKCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5faGFzR3JpZENvbGxpc2lvbihwb3MsIGRpbXMpICYmIHRoaXMuX2lzV2l0aGluQm91bmRzKHBvcywgZGltcykgJiYgZGltcy54IDw9IHRoaXMuX21heENvbHMgJiYgZGltcy55IDw9IHRoaXMuX21heFJvd3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgZGltcy54ID4gdGhpcy5fbWF4Q29scykge1xuICAgICAgICAgICAgICAgIGRpbXMueCA9IHRoaXMuX21heENvbHM7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXRTaXplKGRpbXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYXhSb3dzID4gMCAmJiBkaW1zLnkgPiB0aGlzLl9tYXhSb3dzKSB7XG4gICAgICAgICAgICAgICAgZGltcy55ID0gdGhpcy5fbWF4Um93cztcbiAgICAgICAgICAgICAgICBpdGVtLnNldFNpemUoZGltcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNHcmlkQ29sbGlzaW9uKHBvcywgZGltcykgfHwgIXRoaXMuX2lzV2l0aGluQm91bmRzKHBvcywgZGltcywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB0aGlzLl9maXhHcmlkUG9zaXRpb24ocG9zLCBkaW1zKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlQ29sV2lkdGgoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvUmVzaXplKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgfHwgdGhpcy5fdmlzaWJsZUNvbHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1heENvbHMgPSB0aGlzLl9tYXhDb2xzID4gMCA/IHRoaXMuX21heENvbHMgOiB0aGlzLl92aXNpYmxlQ29scztcbiAgICAgICAgICAgICAgICB2YXIgbWF4V2lkdGg6IG51bWJlciA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICAgICAgICAgIHZhciBjb2xXaWR0aDogbnVtYmVyID0gTWF0aC5mbG9vcihtYXhXaWR0aCAvIG1heENvbHMpO1xuICAgICAgICAgICAgICAgIGNvbFdpZHRoIC09ICh0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgICAgICAgICBpZiAoY29sV2lkdGggPiAwKSB0aGlzLmNvbFdpZHRoID0gY29sV2lkdGg7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbFdpZHRoIDwgdGhpcy5taW5XaWR0aCB8fCB0aGlzLm1pbkNvbHMgPiB0aGlzLl9jb25maWcubWluX2NvbHMpIHtcbiAgICAgICAgICAgIHRoaXMubWluQ29scyA9IE1hdGgubWF4KHRoaXMuX2NvbmZpZy5taW5fY29scywgTWF0aC5jZWlsKHRoaXMubWluV2lkdGggLyB0aGlzLmNvbFdpZHRoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYWxjdWxhdGVSb3dIZWlnaHQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvUmVzaXplKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Um93cyA+IDAgfHwgdGhpcy5fdmlzaWJsZVJvd3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1heFJvd3MgPSB0aGlzLl9tYXhSb3dzID4gMCA/IHRoaXMuX21heFJvd3MgOiB0aGlzLl92aXNpYmxlUm93cztcbiAgICAgICAgICAgICAgICBsZXQgbWF4SGVpZ2h0OiBudW1iZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZWxlbWVudEJhc2VkRHluYW1pY1Jvd0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQgPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMubWFyZ2luVG9wIC0gdGhpcy5tYXJnaW5Cb3R0b207XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJvd0hlaWdodDogbnVtYmVyID0gTWF0aC5tYXgoTWF0aC5mbG9vcihtYXhIZWlnaHQgLyBtYXhSb3dzKSwgdGhpcy5taW5IZWlnaHQpO1xuICAgICAgICAgICAgICAgIHJvd0hlaWdodCAtPSAodGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSk7XG4gICAgICAgICAgICAgICAgaWYgKHJvd0hlaWdodCA+IDApIHRoaXMucm93SGVpZ2h0ID0gcm93SGVpZ2h0O1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb3dIZWlnaHQgPCB0aGlzLm1pbkhlaWdodCB8fCB0aGlzLm1pblJvd3MgPiB0aGlzLl9jb25maWcubWluX3Jvd3MpIHtcbiAgICAgICAgICAgIHRoaXMubWluUm93cyA9IE1hdGgubWF4KHRoaXMuX2NvbmZpZy5taW5fcm93cywgTWF0aC5jZWlsKHRoaXMubWluSGVpZ2h0IC8gdGhpcy5yb3dIZWlnaHQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVJhdGlvKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2F1dG9SZXNpemUgfHwgIXRoaXMuX21haW50YWluUmF0aW8pIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5fdmlzaWJsZVJvd3MgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSB0aGlzLmNvbFdpZHRoIC8gdGhpcy5fYXNwZWN0UmF0aW87XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF4Um93cyA+IDAgJiYgdGhpcy5fdmlzaWJsZUNvbHMgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb2xXaWR0aCA9IHRoaXMuX2FzcGVjdFJhdGlvICogdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF4Q29scyA9PSAwICYmIHRoaXMuX21heFJvd3MgPT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2libGVDb2xzID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm93SGVpZ2h0ID0gdGhpcy5jb2xXaWR0aCAvIHRoaXMuX2FzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl92aXNpYmxlUm93cyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbFdpZHRoID0gdGhpcy5fYXNwZWN0UmF0aW8gKiB0aGlzLnJvd0hlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChyZWNvcmQ6IGFueSkgPT4geyB0aGlzLl9jb25maWdbcmVjb3JkLmtleV0gPSByZWNvcmQuY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0oKHJlY29yZDogYW55KSA9PiB7IHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XSA9IHJlY29yZC5jdXJyZW50VmFsdWU7IH0pO1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVjb3JkOiBhbnkpID0+IHsgZGVsZXRlIHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XTsgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRDb25maWcodGhpcy5fY29uZmlnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNpemVTdGFydChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc2l6ZUVuYWJsZSB8fCAhdGhpcy5fcmVzaXppbmdJdGVtKSByZXR1cm47XG5cbiAgICAgICAgLy8gICAgU2V0dXBcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnN0YXJ0TW92aW5nKCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyKHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnpJbmRleCA9IHRoaXMuX2xhc3RaVmFsdWUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICAgIFN0YXR1cyBGbGFnc1xuICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZXNpemVSZWFkeSA9IGZhbHNlO1xuXG4gICAgICAgIC8vICAgIEV2ZW50c1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RhcnQuZW1pdCh0aGlzLl9yZXNpemluZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0ub25SZXNpemVTdGFydEV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhZ1N0YXJ0KGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ0VuYWJsZSB8fCAhdGhpcy5fZHJhZ2dpbmdJdGVtKSByZXR1cm47XG5cbiAgICAgICAgLy8gICAgU3RhcnQgZHJhZ2dpbmdcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnN0YXJ0TW92aW5nKCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKHRoaXMuX2RyYWdnaW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyKHRoaXMuX2RyYWdnaW5nSXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnpJbmRleCA9IHRoaXMuX2xhc3RaVmFsdWUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICAgIFN0YXR1cyBGbGFnc1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kcmFnUmVhZHkgPSBmYWxzZTtcblxuICAgICAgICAvLyAgICBFdmVudHNcbiAgICAgICAgdGhpcy5vbkRyYWdTdGFydC5lbWl0KHRoaXMuX2RyYWdnaW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5vbkRyYWdTdGFydEV2ZW50KCk7XG5cbiAgICAgICAgLy8gICAgWm9vbVxuICAgICAgICBpZiAodGhpcy5fem9vbU9uRHJhZykge1xuICAgICAgICAgICAgdGhpcy5fem9vbU91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfem9vbU91dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICdzY2FsZSgwLjUsIDAuNSknKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNldFpvb20oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhZyhlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PmRvY3VtZW50KS5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICg8YW55PmRvY3VtZW50KS5zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtb3VzZVBvcyA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICAgIHZhciBuZXdMID0gKG1vdXNlUG9zLmxlZnQgLSB0aGlzLl9wb3NPZmZzZXQubGVmdCk7XG4gICAgICAgIHZhciBuZXdUID0gKG1vdXNlUG9zLnRvcCAtIHRoaXMuX3Bvc09mZnNldC50b3ApO1xuXG4gICAgICAgIHZhciBpdGVtUG9zID0gdGhpcy5fZHJhZ2dpbmdJdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgZ3JpZFBvcyA9IHRoaXMuX2NhbGN1bGF0ZUdyaWRQb3NpdGlvbihuZXdMLCBuZXdUKTtcbiAgICAgICAgdmFyIGRpbXMgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGdyaWRQb3MgPSB0aGlzLl9maXhQb3NUb0JvdW5kc1goZ3JpZFBvcywgZGltcyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1koZ3JpZFBvcywgZGltcykpIHtcbiAgICAgICAgICAgIGdyaWRQb3MgPSB0aGlzLl9maXhQb3NUb0JvdW5kc1koZ3JpZFBvcywgZGltcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ3JpZFBvcy5jb2wgIT0gaXRlbVBvcy5jb2wgfHwgZ3JpZFBvcy5yb3cgIT0gaXRlbVBvcy5yb3cpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5zZXRHcmlkUG9zaXRpb24oZ3JpZFBvcywgdGhpcy5fZml4VG9HcmlkKTtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyUmVmLmluc3RhbmNlLnNldEdyaWRQb3NpdGlvbihncmlkUG9zKTtcblxuICAgICAgICAgICAgaWYgKFsndXAnLCAnZG93bicsICdsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZih0aGlzLmNhc2NhZGUpID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXhHcmlkQ29sbGlzaW9ucyhncmlkUG9zLCBkaW1zKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZChncmlkUG9zLCBkaW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fZml4VG9HcmlkKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0uc2V0UG9zaXRpb24obmV3TCwgbmV3VCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRHJhZy5lbWl0KHRoaXMuX2RyYWdnaW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5vbkRyYWdFdmVudCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc2l6ZShlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVzaXppbmcpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZVBvcyA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICAgIGNvbnN0IGl0ZW1Qb3MgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgaXRlbURpbXMgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0RGltZW5zaW9ucygpO1xuICAgICAgICBjb25zdCBlbmRDb3JuZXIgPSB7XG4gICAgICAgICAgICBsZWZ0OiBpdGVtUG9zLmxlZnQgKyBpdGVtRGltcy53aWR0aCxcbiAgICAgICAgICAgIHRvcDogaXRlbVBvcy50b3AgKyBpdGVtRGltcy5oZWlnaHQsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNpemVUb3AgPSB0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ3RvcCcpO1xuICAgICAgICBjb25zdCByZXNpemVCb3R0b20gPSB0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ2JvdHRvbScpO1xuICAgICAgICBjb25zdCByZXNpemVMZWZ0ID0gdGhpcy5fcmVzaXplRGlyZWN0aW9uLmluY2x1ZGVzKCdsZWZ0JylcbiAgICAgICAgY29uc3QgcmVzaXplUmlnaHQgPSB0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ3JpZ2h0Jyk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyB3aWR0aCBhbmQgaGVpZ2h0IGJhc2VkIHVwb24gcmVzaXplIGRpcmVjdGlvblxuICAgICAgICBsZXQgbmV3VyA9IHJlc2l6ZVJpZ2h0XG4gICAgICAgICAgICA/IChtb3VzZVBvcy5sZWZ0IC0gaXRlbVBvcy5sZWZ0ICsgMSlcbiAgICAgICAgICAgIDogcmVzaXplTGVmdFxuICAgICAgICAgICAgICAgID8gKGVuZENvcm5lci5sZWZ0IC0gbW91c2VQb3MubGVmdCArIDEpXG4gICAgICAgICAgICAgICAgOiBpdGVtRGltcy53aWR0aDtcbiAgICAgICAgbGV0IG5ld0ggPSByZXNpemVCb3R0b21cbiAgICAgICAgICAgID8gKG1vdXNlUG9zLnRvcCAtIGl0ZW1Qb3MudG9wICsgMSlcbiAgICAgICAgICAgIDogcmVzaXplVG9wXG4gICAgICAgICAgICAgICAgPyAoZW5kQ29ybmVyLnRvcCAtIG1vdXNlUG9zLnRvcCArIDEpXG4gICAgICAgICAgICAgICAgOiBpdGVtRGltcy5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKG5ld1cgPCB0aGlzLm1pbldpZHRoKVxuICAgICAgICAgICAgbmV3VyA9IHRoaXMubWluV2lkdGg7XG4gICAgICAgIGlmIChuZXdIIDwgdGhpcy5taW5IZWlnaHQpXG4gICAgICAgICAgICBuZXdIID0gdGhpcy5taW5IZWlnaHQ7XG4gICAgICAgIGlmIChuZXdXIDwgdGhpcy5fcmVzaXppbmdJdGVtLm1pbldpZHRoKVxuICAgICAgICAgICAgbmV3VyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5taW5XaWR0aDtcbiAgICAgICAgaWYgKG5ld0ggPCB0aGlzLl9yZXNpemluZ0l0ZW0ubWluSGVpZ2h0KVxuICAgICAgICAgICAgbmV3SCA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5taW5IZWlnaHQ7XG5cbiAgICAgICAgbGV0IG5ld1ggPSBpdGVtUG9zLmxlZnQ7XG4gICAgICAgIGxldCBuZXdZID0gaXRlbVBvcy50b3A7XG5cbiAgICAgICAgaWYgKHJlc2l6ZUxlZnQpXG4gICAgICAgICAgICBuZXdYID0gZW5kQ29ybmVyLmxlZnQgLSBuZXdXO1xuICAgICAgICBpZiAocmVzaXplVG9wKVxuICAgICAgICAgICAgbmV3WSA9IGVuZENvcm5lci50b3AgLSBuZXdIO1xuXG4gICAgICAgIGxldCBjYWxjU2l6ZSA9IHRoaXMuX2NhbGN1bGF0ZUdyaWRTaXplKG5ld1csIG5ld0gpO1xuICAgICAgICBjb25zdCBpdGVtU2l6ZSA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRTaXplKCk7XG4gICAgICAgIGNvbnN0IGlHcmlkUG9zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBib3R0b21SaWdodENvcm5lciA9IHtcbiAgICAgICAgICAgIGNvbDogaUdyaWRQb3MuY29sICsgaXRlbVNpemUueCxcbiAgICAgICAgICAgIHJvdzogaUdyaWRQb3Mucm93ICsgaXRlbVNpemUueSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdGFyZ2V0UG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBPYmplY3QuYXNzaWduKHt9LCBpR3JpZFBvcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZURpcmVjdGlvbi5pbmNsdWRlcygndG9wJykpXG4gICAgICAgICAgICB0YXJnZXRQb3Mucm93ID0gYm90dG9tUmlnaHRDb3JuZXIucm93IC0gY2FsY1NpemUueTtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZURpcmVjdGlvbi5pbmNsdWRlcygnbGVmdCcpKVxuICAgICAgICAgICAgdGFyZ2V0UG9zLmNvbCA9IGJvdHRvbVJpZ2h0Q29ybmVyLmNvbCAtIGNhbGNTaXplLng7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1godGFyZ2V0UG9zLCBjYWxjU2l6ZSkpXG4gICAgICAgICAgICBjYWxjU2l6ZSA9IHRoaXMuX2ZpeFNpemVUb0JvdW5kc1godGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1kodGFyZ2V0UG9zLCBjYWxjU2l6ZSkpXG4gICAgICAgICAgICBjYWxjU2l6ZSA9IHRoaXMuX2ZpeFNpemVUb0JvdW5kc1kodGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG5cbiAgICAgICAgY2FsY1NpemUgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZml4UmVzaXplKGNhbGNTaXplKTtcblxuICAgICAgICBpZiAoY2FsY1NpemUueCAhPSBpdGVtU2l6ZS54IHx8IGNhbGNTaXplLnkgIT0gaXRlbVNpemUueSkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldEdyaWRQb3NpdGlvbih0YXJnZXRQb3MsIHRoaXMuX2ZpeFRvR3JpZCk7XG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5pbnN0YW5jZS5zZXRHcmlkUG9zaXRpb24odGFyZ2V0UG9zKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zZXRTaXplKGNhbGNTaXplLCB0aGlzLl9maXhUb0dyaWQpO1xuICAgICAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJSZWYuaW5zdGFuY2Uuc2V0U2l6ZShjYWxjU2l6ZSk7XG5cbiAgICAgICAgICAgIGlmIChbJ3VwJywgJ2Rvd24nLCAnbGVmdCcsICdyaWdodCddLmluZGV4T2YodGhpcy5jYXNjYWRlKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnModGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQodGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2ZpeFRvR3JpZCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldERpbWVuc2lvbnMobmV3VywgbmV3SCk7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0uc2V0UG9zaXRpb24obmV3WCwgbmV3WSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUmVzaXplLmVtaXQodGhpcy5fcmVzaXppbmdJdGVtKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLm9uUmVzaXplRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kcmFnU3RvcChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICB2YXIgaXRlbVBvcyA9IHRoaXMuX2RyYWdnaW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0uc2V0R3JpZFBvc2l0aW9uKGl0ZW1Qb3MpO1xuICAgICAgICB0aGlzLl9hZGRUb0dyaWQodGhpcy5fZHJhZ2dpbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnN0b3BNb3ZpbmcoKTtcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLm9uRHJhZ1N0b3BFdmVudCgpO1xuICAgICAgICB0aGlzLm9uRHJhZ1N0b3AuZW1pdCh0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFuRHJhZygpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5fZW1pdE9uSXRlbUNoYW5nZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl96b29tT25EcmFnKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNldFpvb20oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc2l6ZVN0b3AoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1Jlc2l6aW5nKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgaXRlbURpbXMgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0uc2V0U2l6ZShpdGVtRGltcyk7XG5cbiAgICAgICAgY29uc3QgaXRlbVBvcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldEdyaWRQb3NpdGlvbihpdGVtUG9zKTtcblxuICAgICAgICB0aGlzLl9hZGRUb0dyaWQodGhpcy5fcmVzaXppbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnN0b3BNb3ZpbmcoKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLm9uUmVzaXplU3RvcEV2ZW50KCk7XG4gICAgICAgIHRoaXMub25SZXNpemVTdG9wLmVtaXQodGhpcy5fcmVzaXppbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jbGVhblJlc2l6ZSgpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5fZW1pdE9uSXRlbUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFuRHJhZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcG9zT2Zmc2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RyYWdSZWFkeSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFuUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNpemVEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVzaXplUmVhZHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYWxjdWxhdGVHcmlkU2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgd2lkdGggKz0gdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodDtcbiAgICAgICAgaGVpZ2h0ICs9IHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b207XG5cbiAgICAgICAgdmFyIHNpemV4ID0gTWF0aC5tYXgodGhpcy5taW5Db2xzLCBNYXRoLnJvdW5kKHdpZHRoIC8gKHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KSkpO1xuICAgICAgICB2YXIgc2l6ZXkgPSBNYXRoLm1heCh0aGlzLm1pblJvd3MsIE1hdGgucm91bmQoaGVpZ2h0IC8gKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWCh7IGNvbDogMSwgcm93OiAxIH0sIHsgeDogc2l6ZXgsIHk6IHNpemV5IH0pKSBzaXpleCA9IHRoaXMuX21heENvbHM7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHsgY29sOiAxLCByb3c6IDEgfSwgeyB4OiBzaXpleCwgeTogc2l6ZXkgfSkpIHNpemV5ID0gdGhpcy5fbWF4Um93cztcblxuICAgICAgICByZXR1cm4geyAneCc6IHNpemV4LCAneSc6IHNpemV5IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlR3JpZFBvc2l0aW9uKGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICB2YXIgY29sID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChsZWZ0IC8gKHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KSkgKyAxKTtcbiAgICAgICAgdmFyIHJvdyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQodG9wIC8gKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpICsgMSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1goeyBjb2w6IGNvbCwgcm93OiByb3cgfSwgeyB4OiAxLCB5OiAxIH0pKSBjb2wgPSB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWSh7IGNvbDogY29sLCByb3c6IHJvdyB9LCB7IHg6IDEsIHk6IDEgfSkpIHJvdyA9IHRoaXMuX21heFJvd3M7XG5cbiAgICAgICAgcmV0dXJuIHsgJ2NvbCc6IGNvbCwgJ3Jvdyc6IHJvdyB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hhc0dyaWRDb2xsaXNpb24ocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogYm9vbGVhbiB7XG4gICAgICAgIHZhciBwb3NpdGlvbnMgPSB0aGlzLl9nZXRDb2xsaXNpb25zKHBvcywgZGltcyk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9ucyA9PSBudWxsIHx8IHBvc2l0aW9ucy5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBwb3NpdGlvbnMuc29tZSgodjogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICEodiA9PT0gbnVsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldENvbGxpc2lvbnMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogQXJyYXk8TmdHcmlkSXRlbT4ge1xuICAgICAgICBpZiAodGhpcy5fYWxsb3dPdmVybGFwKSByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3QgcmV0dXJuczogQXJyYXk8TmdHcmlkSXRlbT4gPSBbXTtcblxuICAgICAgICBpZiAoIXBvcy5jb2wpIHsgcG9zLmNvbCA9IDE7IH1cbiAgICAgICAgaWYgKCFwb3Mucm93KSB7IHBvcy5yb3cgPSAxOyB9XG5cbiAgICAgICAgY29uc3QgbGVmdENvbCA9IHBvcy5jb2w7XG4gICAgICAgIGNvbnN0IHJpZ2h0Q29sID0gcG9zLmNvbCArIGRpbXMueDtcbiAgICAgICAgY29uc3QgdG9wUm93ID0gcG9zLnJvdztcbiAgICAgICAgY29uc3QgYm90dG9tUm93ID0gcG9zLnJvdyArIGRpbXMueTtcblxuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5mb3JFYWNoKChpdGVtSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbTogTmdHcmlkSXRlbSA9IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpO1xuXG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5kZWxldGUoaXRlbUlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1MZWZ0Q29sID0gaXRlbS5jb2w7XG4gICAgICAgICAgICBjb25zdCBpdGVtUmlnaHRDb2wgPSBpdGVtLmNvbCArIGl0ZW0uc2l6ZXg7XG4gICAgICAgICAgICBjb25zdCBpdGVtVG9wUm93ID0gaXRlbS5yb3c7XG4gICAgICAgICAgICBjb25zdCBpdGVtQm90dG9tUm93ID0gaXRlbS5yb3cgKyBpdGVtLnNpemV5O1xuXG4gICAgICAgICAgICBjb25zdCB3aXRoaW5Db2x1bW5zID0gbGVmdENvbCA8IGl0ZW1SaWdodENvbCAmJiBpdGVtTGVmdENvbCA8IHJpZ2h0Q29sO1xuICAgICAgICAgICAgY29uc3Qgd2l0aGluUm93cyA9IHRvcFJvdyA8IGl0ZW1Cb3R0b21Sb3cgJiYgaXRlbVRvcFJvdyA8IGJvdHRvbVJvdztcblxuICAgICAgICAgICAgaWYgKHdpdGhpbkNvbHVtbnMgJiYgd2l0aGluUm93cykge1xuICAgICAgICAgICAgICAgIHJldHVybnMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4R3JpZENvbGxpc2lvbnMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbGxpc2lvbnM6IEFycmF5PE5nR3JpZEl0ZW0+ID0gdGhpcy5fZ2V0Q29sbGlzaW9ucyhwb3MsIGRpbXMpO1xuICAgICAgICBpZiAoY29sbGlzaW9ucy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZm9yIChsZXQgY29sbGlzaW9uIG9mIGNvbGxpc2lvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGNvbGxpc2lvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGNvbGxpc2lvbi5nZXRTaXplKCk7XG4gICAgICAgICAgICBjb25zdCBpdGVtUG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBjb2xsaXNpb24uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBsZXQgbmV3SXRlbVBvczogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IGl0ZW1Qb3MuY29sLCByb3c6IGl0ZW1Qb3Mucm93IH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLnJvdyA9IHBvcy5yb3cgKyBkaW1zLnk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWShuZXdJdGVtUG9zLCBpdGVtRGltcykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbVBvcy5jb2wgPSBwb3MuY29sICsgZGltcy54O1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLnJvdyA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgIG5ld0l0ZW1Qb3MuY29sID0gcG9zLmNvbCArIGRpbXMueDtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKG5ld0l0ZW1Qb3MsIGl0ZW1EaW1zKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLmNvbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW1Qb3Mucm93ID0gcG9zLnJvdyArIGRpbXMueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbi5zZXRHcmlkUG9zaXRpb24obmV3SXRlbVBvcyk7XG5cbiAgICAgICAgICAgIHRoaXMuX2ZpeEdyaWRDb2xsaXNpb25zKG5ld0l0ZW1Qb3MsIGl0ZW1EaW1zKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChjb2xsaXNpb24pO1xuICAgICAgICAgICAgY29sbGlzaW9uLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maXhHcmlkQ29sbGlzaW9ucyhwb3MsIGRpbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Nhc2NhZGVHcmlkKHBvcz86IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltcz86IE5nR3JpZEl0ZW1TaXplKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkgcmV0dXJuO1xuICAgICAgICBpZiAoIXBvcyAhPT0gIWRpbXMpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhc2NhZGUgd2l0aCBvbmx5IHBvc2l0aW9uIGFuZCBub3QgZGltZW5zaW9ucycpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5fZHJhZ2dpbmdJdGVtICYmICFwb3MgJiYgIWRpbXMpIHtcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuX2RyYWdnaW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgIGRpbXMgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNSZXNpemluZyAmJiB0aGlzLl9yZXNpemluZ0l0ZW0gJiYgIXBvcyAmJiAhZGltcykge1xuICAgICAgICAgICAgcG9zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgZGltcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRTaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXRlbXNJbkdyaWQ6IE5nR3JpZEl0ZW1bXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQsIChpdGVtSWQ6IHN0cmluZykgPT4gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5jYXNjYWRlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICBpdGVtc0luR3JpZCA9IGl0ZW1zSW5HcmlkLnNvcnQoTmdHcmlkSGVscGVyLnNvcnRJdGVtc0J5UG9zaXRpb25WZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXN0Um93UGVyQ29sdW1uOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJbkdyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNGaXhlZCkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbURpbXM6IE5nR3JpZEl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Qb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvd2VzdFJvd0Zvckl0ZW06IG51bWJlciA9IGxvd2VzdFJvd1BlckNvbHVtbi5nZXQoaXRlbVBvcy5jb2wpIHx8IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMTsgaSA8IGl0ZW1EaW1zLng7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG93ZXN0Um93Rm9yQ29sdW1uID0gbG93ZXN0Um93UGVyQ29sdW1uLmdldChpdGVtUG9zLmNvbCArIGkpIHx8IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RSb3dGb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0Um93Rm9yQ29sdW1uLCBsb3dlc3RSb3dGb3JJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRDb2wgPSBpdGVtUG9zLmNvbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmlnaHRDb2wgPSBpdGVtUG9zLmNvbCArIGl0ZW1EaW1zLng7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyAmJiBkaW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aXRoaW5Db2x1bW5zID0gcmlnaHRDb2wgPiBwb3MuY29sICYmIGxlZnRDb2wgPCAocG9zLmNvbCArIGRpbXMueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXRoaW5Db2x1bW5zKSB7ICAgICAgICAgIC8vIElmIG91ciBlbGVtZW50IGlzIGluIG9uZSBvZiB0aGUgaXRlbSdzIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb29tQWJvdmVJdGVtID0gaXRlbURpbXMueSA8PSAocG9zLnJvdyAtIGxvd2VzdFJvd0Zvckl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyb29tQWJvdmVJdGVtKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGNhbid0IGZpdCBhYm92ZSBvdXIgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RSb3dGb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0Um93Rm9ySXRlbSwgcG9zLnJvdyArIGRpbXMueSk7ICAgLy8gU2V0IHRoZSBsb3dlc3Qgcm93IHRvIGJlIGJlbG93IGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSB7IGNvbDogaXRlbVBvcy5jb2wsIHJvdzogbG93ZXN0Um93Rm9ySXRlbSB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIFdoYXQgaWYgaXQncyBub3Qgd2l0aGluIGJvdW5kcyBZP1xuICAgICAgICAgICAgICAgICAgICBpZiAobG93ZXN0Um93Rm9ySXRlbSAhPSBpdGVtUG9zLnJvdyAmJiB0aGlzLl9pc1dpdGhpbkJvdW5kc1kobmV3UG9zLCBpdGVtRGltcykpIHsgLy8gSWYgdGhlIGl0ZW0gaXMgbm90IGFscmVhZHkgb24gdGhpcyByb3cgbW92ZSBpdCB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0R3JpZFBvc2l0aW9uKG5ld1Bvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub25DYXNjYWRlRXZlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtRGltcy54OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdFJvd1BlckNvbHVtbi5zZXQoaXRlbVBvcy5jb2wgKyBpLCBsb3dlc3RSb3dGb3JJdGVtICsgaXRlbURpbXMueSk7IC8vIFVwZGF0ZSB0aGUgbG93ZXN0IHJvdyB0byBiZSBiZWxvdyB0aGUgaXRlbVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaXRlbXNJbkdyaWQgPSBpdGVtc0luR3JpZC5zb3J0KE5nR3JpZEhlbHBlci5zb3J0SXRlbXNCeVBvc2l0aW9uSG9yaXpvbnRhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXN0Q29sdW1uUGVyUm93OiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJbkdyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbURpbXM6IE5nR3JpZEl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Qb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvd2VzdENvbHVtbkZvckl0ZW06IG51bWJlciA9IGxvd2VzdENvbHVtblBlclJvdy5nZXQoaXRlbVBvcy5yb3cpIHx8IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMTsgaSA8IGl0ZW1EaW1zLnk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvd2VzdE9mZnNldENvbHVtbjogbnVtYmVyID0gbG93ZXN0Q29sdW1uUGVyUm93LmdldChpdGVtUG9zLnJvdyArIGkpIHx8IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RDb2x1bW5Gb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0T2Zmc2V0Q29sdW1uLCBsb3dlc3RDb2x1bW5Gb3JJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvcFJvdyA9IGl0ZW1Qb3Mucm93O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Sb3cgPSBpdGVtUG9zLnJvdyArIGl0ZW1EaW1zLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyAmJiBkaW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aXRoaW5Sb3dzID0gYm90dG9tUm93ID4gcG9zLmNvbCAmJiB0b3BSb3cgPCAocG9zLmNvbCArIGRpbXMueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXRoaW5Sb3dzKSB7ICAgICAgICAgIC8vIElmIG91ciBlbGVtZW50IGlzIGluIG9uZSBvZiB0aGUgaXRlbSdzIHJvd3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb29tTmV4dFRvSXRlbSA9IGl0ZW1EaW1zLnggPD0gKHBvcy5jb2wgLSBsb3dlc3RDb2x1bW5Gb3JJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm9vbU5leHRUb0l0ZW0pIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGNhbid0IGZpdCBuZXh0IHRvIG91ciBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdENvbHVtbkZvckl0ZW0gPSBNYXRoLm1heChsb3dlc3RDb2x1bW5Gb3JJdGVtLCBwb3MuY29sICsgZGltcy54KTsgIC8vIFNldCB0aGUgbG93ZXN0IGNvbCB0byBiZSB0aGUgb3RoZXIgc2lkZSBvZiBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BvczogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IGxvd2VzdENvbHVtbkZvckl0ZW0sIHJvdzogaXRlbVBvcy5yb3cgfTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG93ZXN0Q29sdW1uRm9ySXRlbSAhPSBpdGVtUG9zLmNvbCAmJiB0aGlzLl9pc1dpdGhpbkJvdW5kc1gobmV3UG9zLCBpdGVtRGltcykpIHsgLy8gSWYgdGhlIGl0ZW0gaXMgbm90IGFscmVhZHkgb24gdGhpcyBjb2wgbW92ZSBpdCB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0R3JpZFBvc2l0aW9uKG5ld1Bvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub25DYXNjYWRlRXZlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtRGltcy55OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdENvbHVtblBlclJvdy5zZXQoaXRlbVBvcy5yb3cgKyBpLCBsb3dlc3RDb2x1bW5Gb3JJdGVtICsgaXRlbURpbXMueCk7IC8vIFVwZGF0ZSB0aGUgbG93ZXN0IGNvbCB0byBiZSBiZWxvdyB0aGUgaXRlbVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeEdyaWRQb3NpdGlvbihwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICBpZiAoIXRoaXMuX2hhc0dyaWRDb2xsaXNpb24ocG9zLCBkaW1zKSkgcmV0dXJuIHBvcztcblxuICAgICAgICBjb25zdCBtYXhSb3cgPSB0aGlzLl9tYXhSb3dzID09PSAwID8gdGhpcy5fZ2V0TWF4Um93KCkgOiB0aGlzLl9tYXhSb3dzO1xuICAgICAgICBjb25zdCBtYXhDb2wgPSB0aGlzLl9tYXhDb2xzID09PSAwID8gdGhpcy5fZ2V0TWF4Q29sKCkgOiB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBjb25zdCBuZXdQb3MgPSB7XG4gICAgICAgICAgICBjb2w6IHBvcy5jb2wsXG4gICAgICAgICAgICByb3c6IHBvcy5yb3csXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIGZpeExvb3A6XG4gICAgICAgICAgICBmb3IgKDsgbmV3UG9zLmNvbCA8PSBtYXhSb3c7KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblBhdGggPSB0aGlzLl9nZXRJdGVtc0luVmVydGljYWxQYXRoKG5ld1BvcywgZGltcywgbmV3UG9zLnJvdyk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRSb3cgPSBuZXdQb3Mucm93O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtc0luUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5yb3cgLSBuZXh0Um93ID49IGRpbXMueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zLnJvdyA9IG5leHRSb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBmaXhMb29wO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvdyA9IGl0ZW0ucm93ICsgaXRlbS5zaXpleTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWF4Um93IC0gbmV4dFJvdyA+PSBkaW1zLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zLnJvdyA9IG5leHRSb3c7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrIGZpeExvb3A7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmV3UG9zLmNvbCA9IE1hdGgubWF4KG5ld1Bvcy5jb2wgKyAxLCBNYXRoLm1pbi5hcHBseShNYXRoLCBpdGVtc0luUGF0aC5tYXAoKGl0ZW0pID0+IGl0ZW0uY29sICsgZGltcy54KSkpO1xuICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgZml4TG9vcDpcbiAgICAgICAgICAgIGZvciAoOyBuZXdQb3Mucm93IDw9IG1heFJvdzspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtc0luUGF0aCA9IHRoaXMuX2dldEl0ZW1zSW5Ib3Jpem9udGFsUGF0aChuZXdQb3MsIGRpbXMsIG5ld1Bvcy5jb2wpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sID0gbmV3UG9zLmNvbDtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJblBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29sIC0gbmV4dENvbCA+PSBkaW1zLngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5jb2wgPSBuZXh0Q29sO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZml4TG9vcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG5leHRDb2wgPSBpdGVtLmNvbCArIGl0ZW0uc2l6ZXg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1heENvbCAtIG5leHRDb2wgPj0gZGltcy54KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5jb2wgPSBuZXh0Q29sO1xuICAgICAgICAgICAgICAgICAgICBicmVhayBmaXhMb29wO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSBNYXRoLm1heChuZXdQb3Mucm93ICsgMSwgTWF0aC5taW4uYXBwbHkoTWF0aCwgaXRlbXNJblBhdGgubWFwKChpdGVtKSA9PiBpdGVtLnJvdyArIGRpbXMueSkpKTtcbiAgICAgICAgICAgICAgICBuZXdQb3MuY29sID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXdQb3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0SXRlbXNJbkhvcml6b250YWxQYXRoKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgc3RhcnRDb2x1bW46IG51bWJlciA9IDApOiBOZ0dyaWRJdGVtW10ge1xuICAgICAgICBjb25zdCBpdGVtc0luUGF0aDogTmdHcmlkSXRlbVtdID0gW107XG4gICAgICAgIGNvbnN0IHRvcFJvdzogbnVtYmVyID0gcG9zLnJvdyArIGRpbXMueSAtIDE7XG5cbiAgICAgICAgdGhpcy5faXRlbXNJbkdyaWQuZm9yRWFjaCgoaXRlbUlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKTtcbiAgICAgICAgICAgIGlmIChpdGVtLmNvbCArIGl0ZW0uc2l6ZXggLSAxIDwgc3RhcnRDb2x1bW4pIHsgcmV0dXJuOyB9ICAgIC8vIEl0ZW0gZmFsbHMgYWZ0ZXIgc3RhcnQgY29sdW1uXG4gICAgICAgICAgICBpZiAoaXRlbS5yb3cgPiB0b3BSb3cpIHsgcmV0dXJuOyB9ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGZhbGxzIGFib3ZlIHBhdGhcbiAgICAgICAgICAgIGlmIChpdGVtLnJvdyArIGl0ZW0uc2l6ZXkgLSAxIDwgcG9zLnJvdykgeyByZXR1cm47IH0gICAgICAgIC8vIEl0ZW0gZmFsbHMgYmVsb3cgcGF0aFxuICAgICAgICAgICAgaXRlbXNJblBhdGgucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zSW5QYXRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEl0ZW1zSW5WZXJ0aWNhbFBhdGgocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplLCBzdGFydFJvdzogbnVtYmVyID0gMCk6IE5nR3JpZEl0ZW1bXSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zSW5QYXRoOiBOZ0dyaWRJdGVtW10gPSBbXTtcbiAgICAgICAgY29uc3QgcmlnaHRDb2w6IG51bWJlciA9IHBvcy5jb2wgKyBkaW1zLnggLSAxO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zSW5HcmlkLmZvckVhY2goKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5yb3cgKyBpdGVtLnNpemV5IC0gMSA8IHN0YXJ0Um93KSB7IHJldHVybjsgfSAgIC8vIEl0ZW0gZmFsbHMgYWJvdmUgc3RhcnQgcm93XG4gICAgICAgICAgICBpZiAoaXRlbS5jb2wgPiByaWdodENvbCkgeyByZXR1cm47IH0gICAgICAgICAgICAgICAgICAgIC8vIEl0ZW0gZmFsbHMgYWZ0ZXIgcGF0aFxuICAgICAgICAgICAgaWYgKGl0ZW0uY29sICsgaXRlbS5zaXpleCAtIDEgPCBwb3MuY29sKSB7IHJldHVybjsgfSAgICAvLyBJdGVtIGZhbGxzIGJlZm9yZSBwYXRoXG4gICAgICAgICAgICBpdGVtc0luUGF0aC5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbXNJblBhdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNXaXRoaW5Cb3VuZHNYKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgYWxsb3dFeGNlc3NpdmVJdGVtczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhDb2xzID09IDAgfHwgKGFsbG93RXhjZXNzaXZlSXRlbXMgJiYgcG9zLmNvbCA9PSAxKSB8fCAocG9zLmNvbCArIGRpbXMueCAtIDEpIDw9IHRoaXMuX21heENvbHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4UG9zVG9Cb3VuZHNYKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1Qb3NpdGlvbiB7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIHBvcy5jb2wgPSBNYXRoLm1heCh0aGlzLl9tYXhDb2xzIC0gKGRpbXMueCAtIDEpLCAxKTtcbiAgICAgICAgICAgIHBvcy5yb3cgKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maXhTaXplVG9Cb3VuZHNYKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1gocG9zLCBkaW1zKSkge1xuICAgICAgICAgICAgZGltcy54ID0gTWF0aC5tYXgodGhpcy5fbWF4Q29scyAtIChwb3MuY29sIC0gMSksIDEpO1xuICAgICAgICAgICAgZGltcy55Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNXaXRoaW5Cb3VuZHNZKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgYWxsb3dFeGNlc3NpdmVJdGVtczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhSb3dzID09IDAgfHwgKGFsbG93RXhjZXNzaXZlSXRlbXMgJiYgcG9zLnJvdyA9PSAxKSB8fCAocG9zLnJvdyArIGRpbXMueSAtIDEpIDw9IHRoaXMuX21heFJvd3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4UG9zVG9Cb3VuZHNZKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1Qb3NpdGlvbiB7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIHBvcy5yb3cgPSBNYXRoLm1heCh0aGlzLl9tYXhSb3dzIC0gKGRpbXMueSAtIDEpLCAxKTtcbiAgICAgICAgICAgIHBvcy5jb2wrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFNpemVUb0JvdW5kc1kocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWShwb3MsIGRpbXMpKSB7XG4gICAgICAgICAgICBkaW1zLnkgPSBNYXRoLm1heCh0aGlzLl9tYXhSb3dzIC0gKHBvcy5yb3cgLSAxKSwgMSk7XG4gICAgICAgICAgICBkaW1zLngrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGltcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1dpdGhpbkJvdW5kcyhwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUsIGFsbG93RXhjZXNzaXZlSXRlbXM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHBvcywgZGltcywgYWxsb3dFeGNlc3NpdmVJdGVtcykgJiYgdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHBvcywgZGltcywgYWxsb3dFeGNlc3NpdmVJdGVtcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4UG9zVG9Cb3VuZHMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeFBvc1RvQm91bmRzWCh0aGlzLl9maXhQb3NUb0JvdW5kc1kocG9zLCBkaW1zKSwgZGltcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4U2l6ZVRvQm91bmRzKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeFNpemVUb0JvdW5kc1gocG9zLCB0aGlzLl9maXhTaXplVG9Cb3VuZHNZKHBvcywgZGltcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZFRvR3JpZChpdGVtOiBOZ0dyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIGxldCBwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGRpbXM6IE5nR3JpZEl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2hhc0dyaWRDb2xsaXNpb24ocG9zLCBkaW1zKSkge1xuICAgICAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnMocG9zLCBkaW1zKTtcbiAgICAgICAgICAgIHBvcyA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYWxsb3dPdmVybGFwKSB7XG4gICAgICAgICAgICBpdGVtLnpJbmRleCA9IHRoaXMuX2xhc3RaVmFsdWUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2l0ZW1zSW5HcmlkLmFkZChpdGVtLnVpZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlRnJvbUdyaWQoaXRlbTogTmdHcmlkSXRlbSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5kZWxldGUoaXRlbS51aWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVNpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgbGV0IG1heENvbDogbnVtYmVyID0gdGhpcy5fZ2V0TWF4Q29sKCk7XG4gICAgICAgIGxldCBtYXhSb3c6IG51bWJlciA9IHRoaXMuX2dldE1heFJvdygpO1xuXG4gICAgICAgIGlmIChtYXhDb2wgIT0gdGhpcy5fY3VyTWF4Q29sIHx8IG1heFJvdyAhPSB0aGlzLl9jdXJNYXhSb3cpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1ck1heENvbCA9IG1heENvbDtcbiAgICAgICAgICAgIHRoaXMuX2N1ck1heFJvdyA9IG1heFJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsICcxMDAlJyk7Ly8obWF4Q29sICogKHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KSkrJ3B4Jyk7XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudEJhc2VkRHluYW1pY1Jvd0hlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIChtYXhSb3cgKiAodGhpcy5yb3dIZWlnaHQgKyB0aGlzLm1hcmdpblRvcCArIHRoaXMubWFyZ2luQm90dG9tKSkgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1heFJvdygpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpdGVtc1Jvd3M6IG51bWJlcltdID0gQXJyYXkuZnJvbSh0aGlzLl9pdGVtc0luR3JpZCwgKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiAwO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucm93ICsgaXRlbS5zaXpleSAtIDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBpdGVtc1Jvd3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1heENvbCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpdGVtc0NvbHM6IG51bWJlcltdID0gQXJyYXkuZnJvbSh0aGlzLl9pdGVtc0luR3JpZCwgKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiAwO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY29sICsgaXRlbS5zaXpleCAtIDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBpdGVtc0NvbHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1vdXNlUG9zaXRpb24oZTogYW55KTogTmdHcmlkUmF3UG9zaXRpb24ge1xuICAgICAgICBpZiAoKCg8YW55PndpbmRvdykuVG91Y2hFdmVudCAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkgfHwgKGUudG91Y2hlcyB8fCBlLmNoYW5nZWRUb3VjaGVzKSkge1xuICAgICAgICAgICAgZSA9IGUudG91Y2hlcy5sZW5ndGggPiAwID8gZS50b3VjaGVzWzBdIDogZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlZlBvczogYW55ID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGxldCBsZWZ0OiBudW1iZXIgPSBlLmNsaWVudFggLSByZWZQb3MubGVmdDtcbiAgICAgICAgbGV0IHRvcDogbnVtYmVyID0gZS5jbGllbnRZIC0gcmVmUG9zLnRvcDtcblxuICAgICAgICBpZiAodGhpcy5jYXNjYWRlID09ICdkb3duJykgdG9wID0gcmVmUG9zLnRvcCArIHJlZlBvcy5oZWlnaHQgLSBlLmNsaWVudFk7XG4gICAgICAgIGlmICh0aGlzLmNhc2NhZGUgPT0gJ3JpZ2h0JykgbGVmdCA9IHJlZlBvcy5sZWZ0ICsgcmVmUG9zLndpZHRoIC0gZS5jbGllbnRYO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5fem9vbU9uRHJhZykge1xuICAgICAgICAgICAgbGVmdCAqPSAyO1xuICAgICAgICAgICAgdG9wICo9IDI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgIHRvcDogdG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0QWJzb2x1dGVNb3VzZVBvc2l0aW9uKGU6IGFueSk6IE5nR3JpZFJhd1Bvc2l0aW9uIHtcbiAgICAgICAgaWYgKCgoPGFueT53aW5kb3cpLlRvdWNoRXZlbnQgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHx8IChlLnRvdWNoZXMgfHwgZS5jaGFuZ2VkVG91Y2hlcykpIHtcbiAgICAgICAgICAgIGUgPSBlLnRvdWNoZXMubGVuZ3RoID4gMCA/IGUudG91Y2hlc1swXSA6IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogZS5jbGllbnRYLFxuICAgICAgICAgICAgdG9wOiBlLmNsaWVudFlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRDb250YWluZXJDb2x1bW5zKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoOiBudW1iZXIgPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IGl0ZW1XaWR0aDogbnVtYmVyID0gdGhpcy5jb2xXaWR0aCArIHRoaXMubWFyZ2luTGVmdCArIHRoaXMubWFyZ2luUmlnaHQ7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG1heFdpZHRoIC8gaXRlbVdpZHRoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRDb250YWluZXJSb3dzKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG1heEhlaWdodDogbnVtYmVyID0gd2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5tYXJnaW5Ub3AgLSB0aGlzLm1hcmdpbkJvdHRvbTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobWF4SGVpZ2h0IC8gKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFNjcmVlbk1hcmdpbigpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBtYXhXaWR0aDogbnVtYmVyID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCBpdGVtV2lkdGg6IG51bWJlciA9IHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0O1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigobWF4V2lkdGggLSAodGhpcy5fbWF4Q29scyAqIGl0ZW1XaWR0aCkpIC8gMik7O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEl0ZW1Gcm9tUG9zaXRpb24ocG9zaXRpb246IE5nR3JpZFJhd1Bvc2l0aW9uKTogTmdHcmlkSXRlbSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zSW5HcmlkLCAoaXRlbUlkOiBzdHJpbmcpID0+IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpKS5maW5kKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgY29uc3Qgc2l6ZTogTmdHcmlkSXRlbURpbWVuc2lvbnMgPSBpdGVtLmdldERpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgIGNvbnN0IHBvczogTmdHcmlkUmF3UG9zaXRpb24gPSBpdGVtLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbi5sZWZ0ID49IHBvcy5sZWZ0ICYmIHBvc2l0aW9uLmxlZnQgPCAocG9zLmxlZnQgKyBzaXplLndpZHRoKSAmJlxuICAgICAgICAgICAgcG9zaXRpb24udG9wID49IHBvcy50b3AgJiYgcG9zaXRpb24udG9wIDwgKHBvcy50b3AgKyBzaXplLmhlaWdodCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVBsYWNlaG9sZGVyKGl0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGl0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ0dyaWRQbGFjZWhvbGRlcik7XG4gICAgICAgIHZhciBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxOZ0dyaWRQbGFjZWhvbGRlcj4gPSBpdGVtLmNvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyUmVmID0gY29tcG9uZW50UmVmO1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlcjogTmdHcmlkUGxhY2Vob2xkZXIgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgICAgIHBsYWNlaG9sZGVyLnJlZ2lzdGVyR3JpZCh0aGlzKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuc2V0Q2FzY2FkZU1vZGUodGhpcy5jYXNjYWRlKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuc2V0R3JpZFBvc2l0aW9uKHsgY29sOiBwb3MuY29sLCByb3c6IHBvcy5yb3cgfSk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnNldFNpemUoeyB4OiBkaW1zLngsIHk6IGRpbXMueSB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9lbWl0T25JdGVtQ2hhbmdlKCkge1xuICAgICAgICBjb25zdCBpdGVtT3V0cHV0OiBhbnlbXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQpXG4gICAgICAgICAgICAubWFwKChpdGVtSWQ6IHN0cmluZykgPT4gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkpXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiAhIWl0ZW0pXG4gICAgICAgICAgICAubWFwKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiBpdGVtLmdldEV2ZW50T3V0cHV0KCkpO1xuXG4gICAgICAgIHRoaXMub25JdGVtQ2hhbmdlLmVtaXQoaXRlbU91dHB1dCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVmaW5lTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuX2RvY3VtZW50TW91c2Vtb3ZlJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudE1vdXNldXAkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAgICAgICB0aGlzLl9tb3VzZWRvd24kID0gZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZWRvd24nKTtcbiAgICAgICAgdGhpcy5fbW91c2Vtb3ZlJCA9IGZyb21FdmVudChlbGVtZW50LCAnbW91c2Vtb3ZlJyk7XG4gICAgICAgIHRoaXMuX21vdXNldXAkID0gZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZXVwJyk7XG4gICAgICAgIHRoaXMuX3RvdWNoc3RhcnQkID0gZnJvbUV2ZW50KGVsZW1lbnQsICd0b3VjaHN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuX3RvdWNobW92ZSQgPSBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNobW92ZScpO1xuICAgICAgICB0aGlzLl90b3VjaGVuZCQgPSBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNoZW5kJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW5hYmxlTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlZExpc3RlbmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbmFibGVNb3VzZUxpc3RlbmVycygpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZVRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbmFibGVkTGlzdGVuZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViczogU3Vic2NyaXB0aW9uKSA9PiBzdWJzLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICB0aGlzLl9lbmFibGVkTGlzdGVuZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1RvdWNoRGV2aWNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDA7XG4gICAgfTtcblxuICAgIHByaXZhdGUgX2VuYWJsZVRvdWNoTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b3VjaHN0YXJ0U3VicyA9IHRoaXMuX3RvdWNoc3RhcnQkLnN1YnNjcmliZSgoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5tb3VzZURvd25FdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCB0b3VjaG1vdmVTdWJzID0gdGhpcy5fdG91Y2htb3ZlJC5zdWJzY3JpYmUoKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMubW91c2VNb3ZlRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgdG91Y2hlbmRTdWJzID0gdGhpcy5fdG91Y2hlbmQkLnN1YnNjcmliZSgoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5tb3VzZVVwRXZlbnRIYW5kbGVyKGUpKTtcblxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgICB0b3VjaHN0YXJ0U3VicyxcbiAgICAgICAgICAgIHRvdWNobW92ZVN1YnMsXG4gICAgICAgICAgICB0b3VjaGVuZFN1YnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9lbmFibGVNb3VzZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRNb3VzZW1vdmVTdWJzID0gdGhpcy5fZG9jdW1lbnRNb3VzZW1vdmUkLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5tb3VzZU1vdmVFdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCBkb2N1bWVudE1vdXNldXBTdWJzID0gdGhpcy5fZG9jdW1lbnRNb3VzZXVwJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VVcEV2ZW50SGFuZGxlcihlKSk7XG4gICAgICAgIGNvbnN0IG1vdXNlZG93blN1YnMgPSB0aGlzLl9tb3VzZWRvd24kLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5tb3VzZURvd25FdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCBtb3VzZW1vdmVTdWJzID0gdGhpcy5fbW91c2Vtb3ZlJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VNb3ZlRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgbW91c2V1cFN1YnMgPSB0aGlzLl9tb3VzZXVwJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VVcEV2ZW50SGFuZGxlcihlKSk7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgZG9jdW1lbnRNb3VzZW1vdmVTdWJzLFxuICAgICAgICAgICAgZG9jdW1lbnRNb3VzZXVwU3VicyxcbiAgICAgICAgICAgIG1vdXNlZG93blN1YnMsXG4gICAgICAgICAgICBtb3VzZW1vdmVTdWJzLFxuICAgICAgICAgICAgbW91c2V1cFN1YnNcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ0dyaWQgfSBmcm9tICcuL05nR3JpZCc7XG5pbXBvcnQgeyBOZ0dyaWRJdGVtQ29uZmlnLCBOZ0dyaWRJdGVtRXZlbnQsIE5nR3JpZEl0ZW1Qb3NpdGlvbiwgTmdHcmlkSXRlbVNpemUsIE5nR3JpZFJhd1Bvc2l0aW9uLCBOZ0dyaWRJdGVtRGltZW5zaW9ucywgUmVzaXplSGFuZGxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JTmdHcmlkJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBFdmVudEVtaXR0ZXIsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlcnMsIE9uSW5pdCwgT25EZXN0cm95LCBWaWV3Q29udGFpbmVyUmVmLCBPdXRwdXQsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmdHcmlkSXRlbV0nLFxuICAgIGlucHV0czogWydjb25maWc6IG5nR3JpZEl0ZW0nXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0dyaWRJdGVtIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIERvQ2hlY2sge1xuICAgIC8vIEV2ZW50IEVtaXR0ZXJzXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkl0ZW1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KGZhbHNlKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnU3RvcDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ0FueTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplU3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplU3RvcDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplQW55OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25DaGFuZ2VTdGFydDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25DaGFuZ2VTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25DaGFuZ2VBbnk6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBuZ0dyaWRJdGVtQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUNvbmZpZz4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1Db25maWc+KCk7XG5cbiAgICAvLyBEZWZhdWx0IGNvbmZpZ1xuICAgIHByaXZhdGUgc3RhdGljIENPTlNUX0RFRkFVTFRfQ09ORklHOiBOZ0dyaWRJdGVtQ29uZmlnID0ge1xuICAgICAgICB1aWQ6IG51bGwsXG4gICAgICAgIGNvbDogMSxcbiAgICAgICAgcm93OiAxLFxuICAgICAgICBzaXpleDogMSxcbiAgICAgICAgc2l6ZXk6IDEsXG4gICAgICAgIGRyYWdIYW5kbGU6IG51bGwsXG4gICAgICAgIHJlc2l6ZUhhbmRsZTogbnVsbCxcbiAgICAgICAgZml4ZWQ6IGZhbHNlLFxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgIHJlc2l6YWJsZTogdHJ1ZSxcbiAgICAgICAgYm9yZGVyU2l6ZTogMjUsXG4gICAgICAgIHJlc2l6ZURpcmVjdGlvbnM6IG51bGwsXG4gICAgfTtcblxuICAgIHB1YmxpYyBpc0ZpeGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzRHJhZ2dhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNSZXNpemFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBtaW5XaWR0aDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgbWluSGVpZ2h0OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyB1aWQ6IHN0cmluZyA9IG51bGw7XG5cbiAgICAvLyBQcml2YXRlIHZhcmlhYmxlc1xuICAgIHByaXZhdGUgX3BheWxvYWQ6IGFueTtcbiAgICBwcml2YXRlIF9jdXJyZW50UG9zaXRpb246IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICBwcml2YXRlIF9zaXplOiBOZ0dyaWRJdGVtU2l6ZSA9IHsgeDogMSwgeTogMSB9O1xuICAgIHByaXZhdGUgX2NvbmZpZyA9IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUc7XG4gICAgcHJpdmF0ZSBfdXNlckNvbmZpZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZHJhZ0hhbmRsZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3Jlc2l6ZUhhbmRsZTogUmVzaXplSGFuZGxlO1xuICAgIHByaXZhdGUgX2JvcmRlclNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9lbGVtV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIF9lbGVtSGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfZWxlbUxlZnQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9lbGVtVG9wOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYWRkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9kaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjtcbiAgICBwcml2YXRlIF9jYXNjYWRlTW9kZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX21heENvbHM6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWluQ29sczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9tYXhSb3dzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX21pblJvd3M6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfcmVzaXplRGlyZWN0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIF96SW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBzZXQgekluZGV4KHpJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCB6SW5kZXgudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuX3pJbmRleCA9IHpJbmRleDtcbiAgICB9XG5cbiAgICBnZXQgekluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl96SW5kZXg7XG4gICAgfVxuXG4gICAgLy8gW25nLWdyaWQtaXRlbV0gaGFuZGxlclxuICAgIHNldCBjb25maWcodjogTmdHcmlkSXRlbUNvbmZpZykge1xuICAgICAgICB0aGlzLl91c2VyQ29uZmlnID0gdjtcblxuICAgICAgICBjb25zdCBjb25maWdPYmplY3QgPSBPYmplY3QuYXNzaWduKHt9LCBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHLCB2KTtcbiAgICAgICAgZm9yIChsZXQgeCBpbiBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHKVxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iamVjdFt4XSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbmZpZ09iamVjdFt4XSA9IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUdbeF07XG5cbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnT2JqZWN0KTtcblxuICAgICAgICBpZiAodGhpcy5fdXNlckNvbmZpZyAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlmZmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQodGhpcy5fdXNlckNvbmZpZykuY3JlYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX3VzZXJDb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fbmdHcmlkLmFkZEl0ZW0odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIGdldCBzaXpleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZS54O1xuICAgIH1cblxuICAgIGdldCBzaXpleSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZS55O1xuICAgIH1cblxuICAgIGdldCBjb2woKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2w7XG4gICAgfVxuXG4gICAgZ2V0IHJvdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdztcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudENvbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbDtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFJvdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdztcbiAgICB9XG5cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9kaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgICAgIHByaXZhdGUgX25nRWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgX25nR3JpZDogTmdHcmlkLFxuICAgICAgICBwdWJsaWMgY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgb25SZXNpemVTdGFydEV2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RhcnQuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25SZXNpemVBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VTdGFydC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgcHVibGljIG9uUmVzaXplRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25SZXNpemUuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25SZXNpemVBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG4gICAgfVxuICAgIHB1YmxpYyBvblJlc2l6ZVN0b3BFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZVN0b3AuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25SZXNpemVBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VTdG9wLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuXG4gICAgICAgIHRoaXMub25Db25maWdDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgICBwdWJsaWMgb25EcmFnU3RhcnRFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vbkRyYWdTdGFydC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkRyYWdBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VTdGFydC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgcHVibGljIG9uRHJhZ0V2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uRHJhZy5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkRyYWdBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG4gICAgfVxuICAgIHB1YmxpYyBvbkRyYWdTdG9wRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25EcmFnU3RvcC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkRyYWdBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VTdG9wLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuXG4gICAgICAgIHRoaXMub25Db25maWdDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgICBwdWJsaWMgb25DYXNjYWRlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Db25maWdDaGFuZ2VFdmVudCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnZ3JpZC1pdGVtJyk7XG4gICAgICAgIGlmICh0aGlzLl9uZ0dyaWQuYXV0b1N0eWxlKSB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIC8vIEZvcmNlIGEgY29uZmlnIHVwZGF0ZSBpbiBjYXNlIHRoZXJlIGlzIG5vIGNvbmZpZyBhc3NpZ25lZFxuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuX3VzZXJDb25maWc7XG4gICAgfVxuXG4gICAgLy8gUHVibGljIG1ldGhvZHNcbiAgICBwdWJsaWMgY2FuRHJhZyhlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dhYmxlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2RyYWdIYW5kbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRIYW5kbGUodGhpcy5fZHJhZ0hhbmRsZSwgZS50YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGZpbmRIYW5kbGUoaGFuZGxlU2VsZWN0b3I6IHN0cmluZywgc3RhcnRFbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHRhcmdldEVsZW06IGFueSA9IHN0YXJ0RWxlbWVudDtcblxuICAgICAgICAgICAgd2hpbGUgKHRhcmdldEVsZW0gJiYgdGFyZ2V0RWxlbSAhPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50TWF0Y2hlcyh0YXJnZXRFbGVtLCBoYW5kbGVTZWxlY3RvcikpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbSA9IHRhcmdldEVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FuUmVzaXplKGU6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5pc1Jlc2l6YWJsZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZUhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9yZXNpemVIYW5kbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEhhbmRsZSh0aGlzLl9yZXNpemVIYW5kbGUsIGUudGFyZ2V0KSA/ICdib3R0b21yaWdodCcgOiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3Jlc2l6ZUhhbmRsZSAhPT0gJ29iamVjdCcpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICBjb25zdCByZXNpemVEaXJlY3Rpb25zID0gWyAnYm90dG9tcmlnaHQnLCAnYm90dG9tbGVmdCcsICd0b3ByaWdodCcsICd0b3BsZWZ0JywgJ3JpZ2h0JywgJ2xlZnQnLCAnYm90dG9tJywgJ3RvcCcgXTtcbiAgICAgICAgICAgIGZvciAobGV0IGRpcmVjdGlvbiBvZiByZXNpemVEaXJlY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiBpbiB0aGlzLl9yZXNpemVIYW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmluZEhhbmRsZSh0aGlzLl9yZXNpemVIYW5kbGVbZGlyZWN0aW9uXSwgZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib3JkZXJTaXplIDw9IDApIHJldHVybiBudWxsO1xuXG4gICAgICAgIGNvbnN0IG1vdXNlUG9zOiBOZ0dyaWRSYXdQb3NpdGlvbiA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG5cbiAgICAgICAgZm9yIChsZXQgZGlyZWN0aW9uIG9mIHRoaXMuX3Jlc2l6ZURpcmVjdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhblJlc2l6ZUluRGlyZWN0aW9uKGRpcmVjdGlvbiwgbW91c2VQb3MpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk1vdXNlTW92ZShlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5hdXRvU3R5bGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZ0dyaWQucmVzaXplRW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzaXplRGlyZWN0aW9uID0gdGhpcy5jYW5SZXNpemUoZSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgY3Vyc29yOiBzdHJpbmcgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChyZXNpemVEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICd0b3BsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICdud3NlLXJlc2l6ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdib3R0b21sZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICduZXN3LXJlc2l6ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICducy1yZXNpemUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgPSAnZXctcmVzaXplJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5kcmFnRW5hYmxlICYmIHRoaXMuY2FuRHJhZyhlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICdtb3ZlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsIGN1cnNvcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25nR3JpZC5kcmFnRW5hYmxlICYmIHRoaXMuY2FuRHJhZyhlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsICdtb3ZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsICdkZWZhdWx0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hZGRlZCkgdGhpcy5fbmdHcmlkLnJlbW92ZUl0ZW0odGhpcyk7XG4gICAgfVxuXG4gICAgLy8gICAgR2V0dGVyc1xuICAgIHB1YmxpYyBnZXRFbGVtZW50KCk6IEVsZW1lbnRSZWYge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmdFbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RHJhZ0hhbmRsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHJhZ0hhbmRsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmVzaXplSGFuZGxlKCk6IFJlc2l6ZUhhbmRsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNpemVIYW5kbGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERpbWVuc2lvbnMoKTogTmdHcmlkSXRlbURpbWVuc2lvbnMge1xuICAgICAgICByZXR1cm4geyAnd2lkdGgnOiB0aGlzLl9lbGVtV2lkdGgsICdoZWlnaHQnOiB0aGlzLl9lbGVtSGVpZ2h0IH07XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNpemUoKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKTogTmdHcmlkUmF3UG9zaXRpb24ge1xuICAgICAgICByZXR1cm4geyAnbGVmdCc6IHRoaXMuX2VsZW1MZWZ0LCAndG9wJzogdGhpcy5fZWxlbVRvcCB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRHcmlkUG9zaXRpb24oKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQb3NpdGlvbjtcbiAgICB9XG5cbiAgICAvLyAgICBTZXR0ZXJzXG4gICAgcHVibGljIHNldENvbmZpZyhjb25maWc6IE5nR3JpZEl0ZW1Db25maWcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIHRoaXMuX3BheWxvYWQgPSBjb25maWcucGF5bG9hZDtcbiAgICAgICAgdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbCA9IGNvbmZpZy5jb2wgPyBjb25maWcuY29sIDogTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRy5jb2w7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3cgPSBjb25maWcucm93ID8gY29uZmlnLnJvdyA6IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcucm93O1xuICAgICAgICB0aGlzLl9zaXplLnggPSBjb25maWcuc2l6ZXggPyBjb25maWcuc2l6ZXggOiBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHLnNpemV4O1xuICAgICAgICB0aGlzLl9zaXplLnkgPSBjb25maWcuc2l6ZXkgPyBjb25maWcuc2l6ZXkgOiBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHLnNpemV5O1xuICAgICAgICB0aGlzLl9kcmFnSGFuZGxlID0gY29uZmlnLmRyYWdIYW5kbGU7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUhhbmRsZSA9IGNvbmZpZy5yZXNpemVIYW5kbGU7XG4gICAgICAgIHRoaXMuX2JvcmRlclNpemUgPSBjb25maWcuYm9yZGVyU2l6ZTtcbiAgICAgICAgdGhpcy5pc0RyYWdnYWJsZSA9IGNvbmZpZy5kcmFnZ2FibGUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuaXNSZXNpemFibGUgPSBjb25maWcucmVzaXphYmxlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRml4ZWQgPSBjb25maWcuZml4ZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZURpcmVjdGlvbnMgPSBjb25maWcucmVzaXplRGlyZWN0aW9ucyB8fCB0aGlzLl9uZ0dyaWQucmVzaXplRGlyZWN0aW9ucztcblxuICAgICAgICB0aGlzLl9tYXhDb2xzID0gIWlzTmFOKGNvbmZpZy5tYXhDb2xzKSAmJiBpc0Zpbml0ZShjb25maWcubWF4Q29scykgPyBjb25maWcubWF4Q29scyA6IDA7XG4gICAgICAgIHRoaXMuX21pbkNvbHMgPSAhaXNOYU4oY29uZmlnLm1pbkNvbHMpICYmIGlzRmluaXRlKGNvbmZpZy5taW5Db2xzKSA/IGNvbmZpZy5taW5Db2xzIDogMDtcbiAgICAgICAgdGhpcy5fbWF4Um93cyA9ICFpc05hTihjb25maWcubWF4Um93cykgJiYgaXNGaW5pdGUoY29uZmlnLm1heFJvd3MpID8gY29uZmlnLm1heFJvd3MgOiAwO1xuICAgICAgICB0aGlzLl9taW5Sb3dzID0gIWlzTmFOKGNvbmZpZy5taW5Sb3dzKSAmJiBpc0Zpbml0ZShjb25maWcubWluUm93cykgPyBjb25maWcubWluUm93cyA6IDA7XG5cbiAgICAgICAgdGhpcy5taW5XaWR0aCA9ICFpc05hTihjb25maWcubWluV2lkdGgpICYmIGlzRmluaXRlKGNvbmZpZy5taW5XaWR0aCkgPyBjb25maWcubWluV2lkdGggOiAwO1xuICAgICAgICB0aGlzLm1pbkhlaWdodCA9ICFpc05hTihjb25maWcubWluSGVpZ2h0KSAmJiBpc0Zpbml0ZShjb25maWcubWluSGVpZ2h0KSA/IGNvbmZpZy5taW5IZWlnaHQgOiAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9taW5Db2xzID4gMCAmJiB0aGlzLl9tYXhDb2xzID4gMCAmJiB0aGlzLl9taW5Db2xzID4gdGhpcy5fbWF4Q29scykgdGhpcy5fbWluQ29scyA9IDA7XG4gICAgICAgIGlmICh0aGlzLl9taW5Sb3dzID4gMCAmJiB0aGlzLl9tYXhSb3dzID4gMCAmJiB0aGlzLl9taW5Sb3dzID4gdGhpcy5fbWF4Um93cykgdGhpcy5fbWluUm93cyA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FkZGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0dyaWQudXBkYXRlSXRlbSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NpemUgPSB0aGlzLmZpeFJlc2l6ZSh0aGlzLl9zaXplKTtcblxuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0RvQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9kaWZmZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlczogYW55ID0gdGhpcy5fZGlmZmVyLmRpZmYodGhpcy5fdXNlckNvbmZpZyk7XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTaXplKG5ld1NpemU6IE5nR3JpZEl0ZW1TaXplLCB1cGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIG5ld1NpemUgPSB0aGlzLmZpeFJlc2l6ZShuZXdTaXplKTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ld1NpemU7XG4gICAgICAgIGlmICh1cGRhdGUpIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMub25JdGVtQ2hhbmdlLmVtaXQodGhpcy5nZXRFdmVudE91dHB1dCgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0R3JpZFBvc2l0aW9uKGdyaWRQb3NpdGlvbjogTmdHcmlkSXRlbVBvc2l0aW9uLCB1cGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9IGdyaWRQb3NpdGlvbjtcbiAgICAgICAgaWYgKHVwZGF0ZSkgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIHRoaXMub25JdGVtQ2hhbmdlLmVtaXQodGhpcy5nZXRFdmVudE91dHB1dCgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRPdXRwdXQoKTogTmdHcmlkSXRlbUV2ZW50IHtcbiAgICAgICAgcmV0dXJuIDxOZ0dyaWRJdGVtRXZlbnQ+e1xuICAgICAgICAgICAgdWlkOiB0aGlzLnVpZCxcbiAgICAgICAgICAgIHBheWxvYWQ6IHRoaXMuX3BheWxvYWQsXG4gICAgICAgICAgICBjb2w6IHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2wsXG4gICAgICAgICAgICByb3c6IHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3csXG4gICAgICAgICAgICBzaXpleDogdGhpcy5fc2l6ZS54LFxuICAgICAgICAgICAgc2l6ZXk6IHRoaXMuX3NpemUueSxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9lbGVtV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuX2VsZW1IZWlnaHQsXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLl9lbGVtTGVmdCxcbiAgICAgICAgICAgIHRvcDogdGhpcy5fZWxlbVRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX2Nhc2NhZGVNb2RlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHggKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB5ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCB4ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgeSArICdweCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHggKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCB5ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbGVtTGVmdCA9IHg7XG4gICAgICAgIHRoaXMuX2VsZW1Ub3AgPSB5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDYXNjYWRlTW9kZShjYXNjYWRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FzY2FkZU1vZGUgPSBjYXNjYWRlO1xuICAgICAgICBzd2l0Y2ggKGNhc2NhZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgdGhpcy5fZWxlbUxlZnQgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0aGlzLl9lbGVtVG9wICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIHRoaXMuX2VsZW1MZWZ0ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgdGhpcy5fZWxlbVRvcCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCB0aGlzLl9lbGVtTGVmdCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIHRoaXMuX2VsZW1Ub3AgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldERpbWVuc2lvbnModzogbnVtYmVyLCBoOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHcgPCB0aGlzLm1pbldpZHRoKSB3ID0gdGhpcy5taW5XaWR0aDtcbiAgICAgICAgaWYgKGggPCB0aGlzLm1pbkhlaWdodCkgaCA9IHRoaXMubWluSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdyArICdweCcpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBoICsgJ3B4Jyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbVdpZHRoID0gdztcbiAgICAgICAgdGhpcy5fZWxlbUhlaWdodCA9IGg7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0TW92aW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdtb3ZpbmcnKTtcbiAgICAgICAgY29uc3Qgc3R5bGU6IGFueSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGlmICh0aGlzLl9uZ0dyaWQuYXV0b1N0eWxlKSB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd6LWluZGV4JywgKHBhcnNlSW50KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3otaW5kZXgnKSkgKyAxKS50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcE1vdmluZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbW92aW5nJyk7XG4gICAgICAgIGNvbnN0IHN0eWxlOiBhbnkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmF1dG9TdHlsZSkgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsIChwYXJzZUludChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd6LWluZGV4JykpIC0gMSkudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlY2FsY3VsYXRlU2VsZigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZml4UmVzaXplKG5ld1NpemU6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgbmV3U2l6ZS54ID4gdGhpcy5fbWF4Q29scykgbmV3U2l6ZS54ID0gdGhpcy5fbWF4Q29scztcbiAgICAgICAgaWYgKHRoaXMuX21heFJvd3MgPiAwICYmIG5ld1NpemUueSA+IHRoaXMuX21heFJvd3MpIG5ld1NpemUueSA9IHRoaXMuX21heFJvd3M7XG5cbiAgICAgICAgaWYgKHRoaXMuX21pbkNvbHMgPiAwICYmIG5ld1NpemUueCA8IHRoaXMuX21pbkNvbHMpIG5ld1NpemUueCA9IHRoaXMuX21pbkNvbHM7XG4gICAgICAgIGlmICh0aGlzLl9taW5Sb3dzID4gMCAmJiBuZXdTaXplLnkgPCB0aGlzLl9taW5Sb3dzKSBuZXdTaXplLnkgPSB0aGlzLl9taW5Sb3dzO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1XaWR0aCA9IChuZXdTaXplLnggKiB0aGlzLl9uZ0dyaWQuY29sV2lkdGgpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCkgKiAobmV3U2l6ZS54IC0gMSkpO1xuICAgICAgICBpZiAoaXRlbVdpZHRoIDwgdGhpcy5taW5XaWR0aCkgbmV3U2l6ZS54ID0gTWF0aC5jZWlsKCh0aGlzLm1pbldpZHRoICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQpIC8gKHRoaXMuX25nR3JpZC5jb2xXaWR0aCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0KSk7XG5cbiAgICAgICAgY29uc3QgaXRlbUhlaWdodCA9IChuZXdTaXplLnkgKiB0aGlzLl9uZ0dyaWQucm93SGVpZ2h0KSArICgodGhpcy5fbmdHcmlkLm1hcmdpblRvcCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20pICogKG5ld1NpemUueSAtIDEpKTtcbiAgICAgICAgaWYgKGl0ZW1IZWlnaHQgPCB0aGlzLm1pbkhlaWdodCkgbmV3U2l6ZS55ID0gTWF0aC5jZWlsKCh0aGlzLm1pbkhlaWdodCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20gKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wKSAvICh0aGlzLl9uZ0dyaWQucm93SGVpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSArIHRoaXMuX25nR3JpZC5tYXJnaW5Ub3ApKTtcblxuICAgICAgICByZXR1cm4gbmV3U2l6ZTtcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgICBwcml2YXRlIGVsZW1lbnRNYXRjaGVzKGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGVsZW1lbnQubWF0Y2hlcykgcmV0dXJuIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudC5tc01hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbGVtZW50Lm1vek1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoIWVsZW1lbnQuZG9jdW1lbnQgfHwgIWVsZW1lbnQub3duZXJEb2N1bWVudCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoZXM6IGFueSA9IChlbGVtZW50LmRvY3VtZW50IHx8IGVsZW1lbnQub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIGxldCBpOiBudW1iZXIgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gZWxlbWVudCkgeyB9XG4gICAgICAgIHJldHVybiBpID4gLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjYWxjdWxhdGVQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgeDogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5jb2xXaWR0aCArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0KSAqICh0aGlzLl9jdXJyZW50UG9zaXRpb24uY29sIC0gMSkgKyB0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5zY3JlZW5NYXJnaW47XG4gICAgICAgIGNvbnN0IHk6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQucm93SGVpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblRvcCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20pICogKHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3cgLSAxKSArIHRoaXMuX25nR3JpZC5tYXJnaW5Ub3A7XG5cbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih4LCB5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplLnggPCB0aGlzLl9uZ0dyaWQubWluQ29scykgdGhpcy5fc2l6ZS54ID0gdGhpcy5fbmdHcmlkLm1pbkNvbHM7XG4gICAgICAgIGlmICh0aGlzLl9zaXplLnkgPCB0aGlzLl9uZ0dyaWQubWluUm93cykgdGhpcy5fc2l6ZS55ID0gdGhpcy5fbmdHcmlkLm1pblJvd3M7XG5cbiAgICAgICAgY29uc3QgbmV3V2lkdGg6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQuY29sV2lkdGggKiB0aGlzLl9zaXplLngpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCkgKiAodGhpcy5fc2l6ZS54IC0gMSkpO1xuICAgICAgICBjb25zdCBuZXdIZWlnaHQ6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQucm93SGVpZ2h0ICogdGhpcy5fc2l6ZS55KSArICgodGhpcy5fbmdHcmlkLm1hcmdpblRvcCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20pICogKHRoaXMuX3NpemUueSAtIDEpKTtcblxuICAgICAgICBjb25zdCB3OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLm1pbldpZHRoLCB0aGlzLl9uZ0dyaWQubWluV2lkdGgsIG5ld1dpZHRoKTtcbiAgICAgICAgY29uc3QgaDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5taW5IZWlnaHQsIHRoaXMuX25nR3JpZC5taW5IZWlnaHQsIG5ld0hlaWdodCk7XG5cbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKHcsIGgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1vdXNlUG9zaXRpb24oZTogYW55KTogTmdHcmlkUmF3UG9zaXRpb24ge1xuICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC50b3VjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBvZTogYW55ID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgICAgZSA9IG9lLnRvdWNoZXMubGVuZ3RoID8gb2UudG91Y2hlc1swXSA6IChvZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPyBvZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGUudG91Y2hlcykge1xuICAgICAgICAgICAgZSA9IGUudG91Y2hlcy5sZW5ndGggPyBlLnRvdWNoZXNbMF0gOiAoZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPyBlLmNoYW5nZWRUb3VjaGVzWzBdIDogZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvbnN0IHJlZlBvczogTmdHcmlkUmF3UG9zaXRpb24gPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGUuY2xpZW50WCAtIHJlZlBvcy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBlLmNsaWVudFkgLSByZWZQb3MudG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYXBwbHlDaGFuZ2VzKGNoYW5nZXM6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjaGFuZ2VDaGVjayA9IChyZWNvcmQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XSAhPT0gcmVjb3JkLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XSA9IHJlY29yZC5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbShjaGFuZ2VDaGVjayk7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKGNoYW5nZUNoZWNrKTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZDogYW55KSA9PiB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jb25maWdbcmVjb3JkLmtleV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNldENvbmZpZyh0aGlzLl9jb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoYW5nZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvbmZpZ0NoYW5nZUV2ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5fdXNlckNvbmZpZyA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zaXpleCA9IHRoaXMuX3VzZXJDb25maWcuc2l6ZXggPSB0aGlzLl9zaXplLng7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5zaXpleSA9IHRoaXMuX3VzZXJDb25maWcuc2l6ZXkgPSB0aGlzLl9zaXplLnk7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5jb2wgPSB0aGlzLl91c2VyQ29uZmlnLmNvbCA9IHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2w7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5yb3cgPSB0aGlzLl91c2VyQ29uZmlnLnJvdyA9IHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3c7XG4gICAgICAgIHRoaXMubmdHcmlkSXRlbUNoYW5nZS5lbWl0KHRoaXMuX3VzZXJDb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuUmVzaXplSW5EaXJlY3Rpb24oZGlyZWN0aW9uOiBzdHJpbmcsIG1vdXNlUG9zOiBOZ0dyaWRSYXdQb3NpdGlvbik6IGJvb2xlYW4ge1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fZWxlbVdpZHRoICYmIG1vdXNlUG9zLmxlZnQgPiB0aGlzLl9lbGVtV2lkdGggLSB0aGlzLl9ib3JkZXJTaXplXG4gICAgICAgICAgICAgICAgICAgICYmIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2VsZW1IZWlnaHQgJiYgbW91c2VQb3MudG9wID4gdGhpcy5fZWxlbUhlaWdodCAtIHRoaXMuX2JvcmRlclNpemU7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6aW5kZW50XG4gICAgICAgICAgICBjYXNlICdib3R0b21sZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2JvcmRlclNpemUgJiYgbW91c2VQb3MudG9wIDwgdGhpcy5fZWxlbUhlaWdodFxuICAgICAgICAgICAgICAgICAgICAmJiBtb3VzZVBvcy50b3AgPiB0aGlzLl9lbGVtSGVpZ2h0IC0gdGhpcy5fYm9yZGVyU2l6ZTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTppbmRlbnRcbiAgICAgICAgICAgIGNhc2UgJ3RvcHJpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2VsZW1XaWR0aCAmJiBtb3VzZVBvcy5sZWZ0ID4gdGhpcy5fZWxlbVdpZHRoIC0gdGhpcy5fYm9yZGVyU2l6ZVxuICAgICAgICAgICAgICAgICAgICAmJiBtb3VzZVBvcy50b3AgPCB0aGlzLl9ib3JkZXJTaXplOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmluZGVudFxuICAgICAgICAgICAgY2FzZSAndG9wbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLmxlZnQgPCB0aGlzLl9ib3JkZXJTaXplICYmIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2JvcmRlclNpemU7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLmxlZnQgPCB0aGlzLl9lbGVtV2lkdGggJiYgbW91c2VQb3MubGVmdCA+IHRoaXMuX2VsZW1XaWR0aCAtIHRoaXMuX2JvcmRlclNpemU7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2JvcmRlclNpemU7XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy50b3AgPCB0aGlzLl9lbGVtSGVpZ2h0ICYmIG1vdXNlUG9zLnRvcCA+IHRoaXMuX2VsZW1IZWlnaHQgLSB0aGlzLl9ib3JkZXJTaXplO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MudG9wIDwgdGhpcy5fYm9yZGVyU2l6ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nR3JpZCB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvTmdHcmlkJztcbmltcG9ydCB7IE5nR3JpZEl0ZW0gfSBmcm9tICcuLi9kaXJlY3RpdmVzL05nR3JpZEl0ZW0nO1xuaW1wb3J0IHsgTmdHcmlkUGxhY2Vob2xkZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL05nR3JpZFBsYWNlaG9sZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiAgICAgWyBOZ0dyaWQsIE5nR3JpZEl0ZW0sIE5nR3JpZFBsYWNlaG9sZGVyIF0sXG4gIGVudHJ5Q29tcG9uZW50czogIFsgTmdHcmlkUGxhY2Vob2xkZXIgXSxcbiAgZXhwb3J0czogICAgICAgICAgWyBOZ0dyaWQsIE5nR3JpZEl0ZW0gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0dyaWRNb2R1bGUge31cbiJdLCJuYW1lcyI6WyJOZ0dyaWRIZWxwZXIuZ2VuZXJhdGVVdWlkIiwidHNsaWJfMS5fX3ZhbHVlcyIsIk5nR3JpZEhlbHBlci5zb3J0SXRlbXNCeVBvc2l0aW9uVmVydGljYWwiLCJOZ0dyaWRIZWxwZXIuc29ydEl0ZW1zQnlQb3NpdGlvbkhvcml6b250YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUE7SUFDQyxPQUFPLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFDO1FBQ3hFLHFCQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsbUJBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbkUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3RCLENBQUMsQ0FBQztDQUNIOzs7Ozs7QUFFRCx1Q0FBOEMsQ0FBYSxFQUFFLENBQWE7SUFDekUsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUU7UUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUFFO0lBQzlDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQ3JCOzs7Ozs7QUFFRCxxQ0FBNEMsQ0FBYSxFQUFFLENBQWE7SUFDdkUsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUU7UUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUFFO0lBQzlDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQ3JCOzs7Ozs7QUNmRDtJQVlJLDJCQUFvQixLQUFpQixFQUFVLFNBQW1CO1FBQTlDLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxj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