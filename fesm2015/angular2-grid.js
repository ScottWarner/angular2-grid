import { Component, ElementRef, Renderer, Directive, EventEmitter, ComponentFactoryResolver, KeyValueDiffers, Output, Renderer2, ViewContainerRef, NgModule } from '@angular/core';
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
        let /** @type {?} */ r = Math.random() * 16 | 0, /** @type {?} */ v = c == 'x' ? r : (r & 0x3 | 0x8);
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
class NgGridPlaceholder {
    /**
     * @param {?} _ngEl
     * @param {?} _renderer
     */
    constructor(_ngEl, _renderer) {
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    /**
     * @param {?} ngGrid
     * @return {?}
     */
    registerGrid(ngGrid) {
        this._ngGrid = ngGrid;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._renderer.setElementClass(this._ngEl.nativeElement, 'grid-placeholder', true);
        if (this._ngGrid.autoStyle)
            this._renderer.setElementStyle(this._ngEl.nativeElement, 'position', 'absolute');
    }
    /**
     * @param {?} newSize
     * @return {?}
     */
    setSize(newSize) {
        this._size = newSize;
        this._recalculateDimensions();
    }
    /**
     * @param {?} newPosition
     * @return {?}
     */
    setGridPosition(newPosition) {
        this._position = newPosition;
        this._recalculatePosition();
    }
    /**
     * @param {?} cascade
     * @return {?}
     */
    setCascadeMode(cascade) {
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
    }
    /**
     * @param {?} w
     * @param {?} h
     * @return {?}
     */
    _setDimensions(w, h) {
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'width', w + 'px');
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'height', h + 'px');
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    _setPosition(x, y) {
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
    }
    /**
     * @return {?}
     */
    _recalculatePosition() {
        const /** @type {?} */ x = (this._ngGrid.colWidth + this._ngGrid.marginLeft + this._ngGrid.marginRight) * (this._position.col - 1) + this._ngGrid.marginLeft + this._ngGrid.screenMargin;
        const /** @type {?} */ y = (this._ngGrid.rowHeight + this._ngGrid.marginTop + this._ngGrid.marginBottom) * (this._position.row - 1) + this._ngGrid.marginTop;
        this._setPosition(x, y);
    }
    /**
     * @return {?}
     */
    _recalculateDimensions() {
        const /** @type {?} */ w = (this._ngGrid.colWidth * this._size.x) + ((this._ngGrid.marginLeft + this._ngGrid.marginRight) * (this._size.x - 1));
        const /** @type {?} */ h = (this._ngGrid.rowHeight * this._size.y) + ((this._ngGrid.marginTop + this._ngGrid.marginBottom) * (this._size.y - 1));
        this._setDimensions(w, h);
    }
}
NgGridPlaceholder.decorators = [
    { type: Component, args: [{
                selector: 'ng-grid-placeholder',
                template: ''
            },] },
];
/** @nocollapse */
NgGridPlaceholder.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgGrid {
    /**
     * @param {?} _differs
     * @param {?} _ngEl
     * @param {?} _renderer
     * @param {?} componentFactoryResolver
     */
    constructor(_differs, _ngEl, _renderer, componentFactoryResolver) {
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
    /**
     * @param {?} v
     * @return {?}
     */
    set config(v) {
        if (v == null || typeof v !== 'object') {
            return;
        }
        this.setConfig(v);
        if (this._differ == null && v != null) {
            this._differ = this._differs.find(this._config).create();
        }
        this._differ.diff(this._config);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._renderer.setElementClass(this._ngEl.nativeElement, 'grid', true);
        if (this.autoStyle)
            this._renderer.setElementStyle(this._ngEl.nativeElement, 'position', 'relative');
        this.setConfig(this._config);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed = true;
        this._disableListeners();
    }
    /**
     * @return {?}
     */
    generateItemUid() {
        const /** @type {?} */ uid = generateUuid();
        if (this._items.has(uid)) {
            return this.generateItemUid();
        }
        return uid;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
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
            const /** @type {?} */ newMaxCols = this._getContainerColumns();
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
        this._items.forEach((item) => {
            this._removeFromGrid(item);
            item.setCascadeMode(this.cascade);
        });
        this._items.forEach((item) => {
            item.recalculateSelf();
            this._addToGrid(item);
        });
        this._cascadeGrid();
        this._updateSize();
    }
    /**
     * @param {?} itemId
     * @return {?}
     */
    getItemPosition(itemId) {
        return this._items.has(itemId) ? this._items.get(itemId).getGridPosition() : null;
    }
    /**
     * @param {?} itemId
     * @return {?}
     */
    getItemSize(itemId) {
        return this._items.has(itemId) ? this._items.get(itemId).getSize() : null;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._differ != null) {
            var /** @type {?} */ changes = this._differ.diff(this._config);
            if (changes != null) {
                this._applyChanges(changes);
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} margins
     * @return {?}
     */
    setMargins(margins) {
        this.marginTop = Math.max(parseInt(margins[0]), 0);
        this.marginRight = margins.length >= 2 ? Math.max(parseInt(margins[1]), 0) : this.marginTop;
        this.marginBottom = margins.length >= 3 ? Math.max(parseInt(margins[2]), 0) : this.marginTop;
        this.marginLeft = margins.length >= 4 ? Math.max(parseInt(margins[3]), 0) : this.marginRight;
    }
    /**
     * @return {?}
     */
    enableDrag() {
        this.dragEnable = true;
    }
    /**
     * @return {?}
     */
    disableDrag() {
        this.dragEnable = false;
    }
    /**
     * @return {?}
     */
    enableResize() {
        this.resizeEnable = true;
    }
    /**
     * @return {?}
     */
    disableResize() {
        this.resizeEnable = false;
    }
    /**
     * @param {?} ngItem
     * @return {?}
     */
    addItem(ngItem) {
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
        this.triggerCascade().then(() => {
            ngItem.recalculateSelf();
            ngItem.onCascadeEvent();
            this._emitOnItemChange();
        });
    }
    /**
     * @param {?} ngItem
     * @return {?}
     */
    removeItem(ngItem) {
        this._removeFromGrid(ngItem);
        this._items.delete(ngItem.uid);
        if (this._destroyed)
            return;
        this.triggerCascade().then(() => {
            this._updateSize();
            this._items.forEach((item) => item.recalculateSelf());
            this._emitOnItemChange();
        });
    }
    /**
     * @param {?} ngItem
     * @return {?}
     */
    updateItem(ngItem) {
        this._removeFromGrid(ngItem);
        this._addToGrid(ngItem);
        this.triggerCascade().then(() => {
            this._updateSize();
            ngItem.onCascadeEvent();
        });
    }
    /**
     * @return {?}
     */
    triggerCascade() {
        if (!this._cascadePromise) {
            this._cascadePromise = new Promise((resolve) => {
                setTimeout(() => {
                    this._cascadePromise = null;
                    this._cascadeGrid(null, null);
                    resolve();
                }, 0);
            });
        }
        return this._cascadePromise;
    }
    /**
     * @return {?}
     */
    triggerResize() {
        this.resizeEventHandler(null);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    resizeEventHandler(e) {
        this._calculateColWidth();
        this._calculateRowHeight();
        this._updateRatio();
        if (this._limitToScreen) {
            const /** @type {?} */ newMaxColumns = this._getContainerColumns();
            if (this._maxCols !== newMaxColumns) {
                this._maxCols = newMaxColumns;
                this._updatePositionsAfterMaxChange();
                this._cascadeGrid();
            }
            if (this._centerToScreen) {
                this.screenMargin = this._getScreenMargin();
                this._items.forEach((item) => {
                    item.recalculateSelf();
                });
            }
        }
        else if (this._autoResize) {
            this._items.forEach((item) => {
                item.recalculateSelf();
            });
        }
        this._updateSize();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mouseDownEventHandler(e) {
        var /** @type {?} */ mousePos = this._getMousePosition(e);
        var /** @type {?} */ item = this._getItemFromPosition(mousePos);
        if (item == null)
            return;
        const /** @type {?} */ resizeDirection = item.canResize(e);
        if (this.resizeEnable && resizeDirection) {
            this._resizeReady = true;
            this._resizingItem = item;
            this._resizeDirection = resizeDirection;
            e.preventDefault();
        }
        else if (this.dragEnable && item.canDrag(e)) {
            this._dragReady = true;
            this._draggingItem = item;
            const /** @type {?} */ itemPos = item.getPosition();
            this._posOffset = { 'left': (mousePos.left - itemPos.left), 'top': (mousePos.top - itemPos.top) };
            e.preventDefault();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mouseUpEventHandler(e) {
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    mouseMoveEventHandler(e) {
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
    }
    /**
     * @return {?}
     */
    _getFixDirectionFromCascade() {
        switch (this.cascade) {
            case 'up':
            case 'down':
            default:
                return 'vertical';
            case 'left':
            case 'right':
                return 'horizontal';
        }
    }
    /**
     * @return {?}
     */
    _updatePositionsAfterMaxChange() {
        this._items.forEach((item) => {
            var /** @type {?} */ pos = item.getGridPosition();
            var /** @type {?} */ dims = item.getSize();
            if (!this._hasGridCollision(pos, dims) && this._isWithinBounds(pos, dims) && dims.x <= this._maxCols && dims.y <= this._maxRows) {
                return;
            }
            this._removeFromGrid(item);
            if (this._maxCols > 0 && dims.x > this._maxCols) {
                dims.x = this._maxCols;
                item.setSize(dims);
            }
            else if (this._maxRows > 0 && dims.y > this._maxRows) {
                dims.y = this._maxRows;
                item.setSize(dims);
            }
            if (this._hasGridCollision(pos, dims) || !this._isWithinBounds(pos, dims, true)) {
                var /** @type {?} */ newPosition = this._fixGridPosition(pos, dims);
                item.setGridPosition(newPosition);
            }
            this._addToGrid(item);
        });
    }
    /**
     * @return {?}
     */
    _calculateColWidth() {
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
    }
    /**
     * @return {?}
     */
    _calculateRowHeight() {
        if (this._autoResize) {
            if (this._maxRows > 0 || this._visibleRows > 0) {
                var /** @type {?} */ maxRows = this._maxRows > 0 ? this._maxRows : this._visibleRows;
                let /** @type {?} */ maxHeight;
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
    }
    /**
     * @return {?}
     */
    _updateRatio() {
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyChanges(changes) {
        changes.forEachAddedItem((record) => { this._config[record.key] = record.currentValue; });
        changes.forEachChangedItem((record) => { this._config[record.key] = record.currentValue; });
        changes.forEachRemovedItem((record) => { delete this._config[record.key]; });
        this.setConfig(this._config);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _resizeStart(e) {
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _dragStart(e) {
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
    }
    /**
     * @return {?}
     */
    _zoomOut() {
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'transform', 'scale(0.5, 0.5)');
    }
    /**
     * @return {?}
     */
    _resetZoom() {
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'transform', '');
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _drag(e) {
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _resize(e) {
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
        const /** @type {?} */ mousePos = this._getMousePosition(e);
        const /** @type {?} */ itemPos = this._resizingItem.getPosition();
        const /** @type {?} */ itemDims = this._resizingItem.getDimensions();
        const /** @type {?} */ endCorner = {
            left: itemPos.left + itemDims.width,
            top: itemPos.top + itemDims.height,
        };
        const /** @type {?} */ resizeTop = this._resizeDirection.includes('top');
        const /** @type {?} */ resizeBottom = this._resizeDirection.includes('bottom');
        const /** @type {?} */ resizeLeft = this._resizeDirection.includes('left');
        const /** @type {?} */ resizeRight = this._resizeDirection.includes('right');
        // Calculate new width and height based upon resize direction
        let /** @type {?} */ newW = resizeRight
            ? (mousePos.left - itemPos.left + 1)
            : resizeLeft
                ? (endCorner.left - mousePos.left + 1)
                : itemDims.width;
        let /** @type {?} */ newH = resizeBottom
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
        let /** @type {?} */ newX = itemPos.left;
        let /** @type {?} */ newY = itemPos.top;
        if (resizeLeft)
            newX = endCorner.left - newW;
        if (resizeTop)
            newY = endCorner.top - newH;
        let /** @type {?} */ calcSize = this._calculateGridSize(newW, newH);
        const /** @type {?} */ itemSize = this._resizingItem.getSize();
        const /** @type {?} */ iGridPos = this._resizingItem.getGridPosition();
        const /** @type {?} */ bottomRightCorner = {
            col: iGridPos.col + itemSize.x,
            row: iGridPos.row + itemSize.y,
        };
        const /** @type {?} */ targetPos = Object.assign({}, iGridPos);
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _dragStop(e) {
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _resizeStop(e) {
        if (!this.isResizing)
            return;
        this.isResizing = false;
        const /** @type {?} */ itemDims = this._resizingItem.getSize();
        this._resizingItem.setSize(itemDims);
        const /** @type {?} */ itemPos = this._resizingItem.getGridPosition();
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
    }
    /**
     * @return {?}
     */
    _cleanDrag() {
        this._draggingItem = null;
        this._posOffset = null;
        this.isDragging = false;
        this._dragReady = false;
    }
    /**
     * @return {?}
     */
    _cleanResize() {
        this._resizingItem = null;
        this._resizeDirection = null;
        this.isResizing = false;
        this._resizeReady = false;
    }
    /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    _calculateGridSize(width, height) {
        width += this.marginLeft + this.marginRight;
        height += this.marginTop + this.marginBottom;
        var /** @type {?} */ sizex = Math.max(this.minCols, Math.round(width / (this.colWidth + this.marginLeft + this.marginRight)));
        var /** @type {?} */ sizey = Math.max(this.minRows, Math.round(height / (this.rowHeight + this.marginTop + this.marginBottom)));
        if (!this._isWithinBoundsX({ col: 1, row: 1 }, { x: sizex, y: sizey }))
            sizex = this._maxCols;
        if (!this._isWithinBoundsY({ col: 1, row: 1 }, { x: sizex, y: sizey }))
            sizey = this._maxRows;
        return { 'x': sizex, 'y': sizey };
    }
    /**
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    _calculateGridPosition(left, top) {
        var /** @type {?} */ col = Math.max(1, Math.round(left / (this.colWidth + this.marginLeft + this.marginRight)) + 1);
        var /** @type {?} */ row = Math.max(1, Math.round(top / (this.rowHeight + this.marginTop + this.marginBottom)) + 1);
        if (!this._isWithinBoundsX({ col: col, row: row }, { x: 1, y: 1 }))
            col = this._maxCols;
        if (!this._isWithinBoundsY({ col: col, row: row }, { x: 1, y: 1 }))
            row = this._maxRows;
        return { 'col': col, 'row': row };
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _hasGridCollision(pos, dims) {
        var /** @type {?} */ positions = this._getCollisions(pos, dims);
        if (positions == null || positions.length == 0)
            return false;
        return positions.some((v) => {
            return !(v === null);
        });
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _getCollisions(pos, dims) {
        if (this._allowOverlap)
            return [];
        const /** @type {?} */ returns = [];
        if (!pos.col) {
            pos.col = 1;
        }
        if (!pos.row) {
            pos.row = 1;
        }
        const /** @type {?} */ leftCol = pos.col;
        const /** @type {?} */ rightCol = pos.col + dims.x;
        const /** @type {?} */ topRow = pos.row;
        const /** @type {?} */ bottomRow = pos.row + dims.y;
        this._itemsInGrid.forEach((itemId) => {
            const /** @type {?} */ item = this._items.get(itemId);
            if (!item) {
                this._itemsInGrid.delete(itemId);
                return;
            }
            const /** @type {?} */ itemLeftCol = item.col;
            const /** @type {?} */ itemRightCol = item.col + item.sizex;
            const /** @type {?} */ itemTopRow = item.row;
            const /** @type {?} */ itemBottomRow = item.row + item.sizey;
            const /** @type {?} */ withinColumns = leftCol < itemRightCol && itemLeftCol < rightCol;
            const /** @type {?} */ withinRows = topRow < itemBottomRow && itemTopRow < bottomRow;
            if (withinColumns && withinRows) {
                returns.push(item);
            }
        });
        return returns;
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _fixGridCollisions(pos, dims) {
        const /** @type {?} */ collisions = this._getCollisions(pos, dims);
        if (collisions.length === 0) {
            return;
        }
        for (let /** @type {?} */ collision of collisions) {
            this._removeFromGrid(collision);
            const /** @type {?} */ itemDims = collision.getSize();
            const /** @type {?} */ itemPos = collision.getGridPosition();
            let /** @type {?} */ newItemPos = { col: itemPos.col, row: itemPos.row };
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
        this._fixGridCollisions(pos, dims);
    }
    /**
     * @param {?=} pos
     * @param {?=} dims
     * @return {?}
     */
    _cascadeGrid(pos, dims) {
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
        let /** @type {?} */ itemsInGrid = Array.from(this._itemsInGrid, (itemId) => this._items.get(itemId));
        switch (this.cascade) {
            case 'up':
            case 'down':
                itemsInGrid = itemsInGrid.sort(sortItemsByPositionVertical);
                const /** @type {?} */ lowestRowPerColumn = new Map();
                for (let /** @type {?} */ item of itemsInGrid) {
                    if (item.isFixed)
                        continue;
                    const /** @type {?} */ itemDims = item.getSize();
                    const /** @type {?} */ itemPos = item.getGridPosition();
                    let /** @type {?} */ lowestRowForItem = lowestRowPerColumn.get(itemPos.col) || 1;
                    for (let /** @type {?} */ i = 1; i < itemDims.x; i++) {
                        const /** @type {?} */ lowestRowForColumn = lowestRowPerColumn.get(itemPos.col + i) || 1;
                        lowestRowForItem = Math.max(lowestRowForColumn, lowestRowForItem);
                    }
                    const /** @type {?} */ leftCol = itemPos.col;
                    const /** @type {?} */ rightCol = itemPos.col + itemDims.x;
                    if (pos && dims) {
                        const /** @type {?} */ withinColumns = rightCol > pos.col && leftCol < (pos.col + dims.x);
                        if (withinColumns) {
                            // If our element is in one of the item's columns
                            const /** @type {?} */ roomAboveItem = itemDims.y <= (pos.row - lowestRowForItem);
                            if (!roomAboveItem) {
                                // Item can't fit above our element
                                lowestRowForItem = Math.max(lowestRowForItem, pos.row + dims.y); // Set the lowest row to be below it
                            }
                        }
                    }
                    const /** @type {?} */ newPos = { col: itemPos.col, row: lowestRowForItem };
                    //    What if it's not within bounds Y?
                    if (lowestRowForItem != itemPos.row && this._isWithinBoundsY(newPos, itemDims)) {
                        // If the item is not already on this row move it up
                        this._removeFromGrid(item);
                        item.setGridPosition(newPos);
                        item.onCascadeEvent();
                        this._addToGrid(item);
                    }
                    for (let /** @type {?} */ i = 0; i < itemDims.x; i++) {
                        lowestRowPerColumn.set(itemPos.col + i, lowestRowForItem + itemDims.y); // Update the lowest row to be below the item
                    }
                }
                break;
            case 'left':
            case 'right':
                itemsInGrid = itemsInGrid.sort(sortItemsByPositionHorizontal);
                const /** @type {?} */ lowestColumnPerRow = new Map();
                for (let /** @type {?} */ item of itemsInGrid) {
                    const /** @type {?} */ itemDims = item.getSize();
                    const /** @type {?} */ itemPos = item.getGridPosition();
                    let /** @type {?} */ lowestColumnForItem = lowestColumnPerRow.get(itemPos.row) || 1;
                    for (let /** @type {?} */ i = 1; i < itemDims.y; i++) {
                        let /** @type {?} */ lowestOffsetColumn = lowestColumnPerRow.get(itemPos.row + i) || 1;
                        lowestColumnForItem = Math.max(lowestOffsetColumn, lowestColumnForItem);
                    }
                    const /** @type {?} */ topRow = itemPos.row;
                    const /** @type {?} */ bottomRow = itemPos.row + itemDims.y;
                    if (pos && dims) {
                        const /** @type {?} */ withinRows = bottomRow > pos.col && topRow < (pos.col + dims.x);
                        if (withinRows) {
                            // If our element is in one of the item's rows
                            const /** @type {?} */ roomNextToItem = itemDims.x <= (pos.col - lowestColumnForItem);
                            if (!roomNextToItem) {
                                // Item can't fit next to our element
                                lowestColumnForItem = Math.max(lowestColumnForItem, pos.col + dims.x); // Set the lowest col to be the other side of it
                            }
                        }
                    }
                    const /** @type {?} */ newPos = { col: lowestColumnForItem, row: itemPos.row };
                    if (lowestColumnForItem != itemPos.col && this._isWithinBoundsX(newPos, itemDims)) {
                        // If the item is not already on this col move it up
                        this._removeFromGrid(item);
                        item.setGridPosition(newPos);
                        item.onCascadeEvent();
                        this._addToGrid(item);
                    }
                    for (let /** @type {?} */ i = 0; i < itemDims.y; i++) {
                        lowestColumnPerRow.set(itemPos.row + i, lowestColumnForItem + itemDims.x); // Update the lowest col to be below the item
                    }
                }
                break;
            default:
                break;
        }
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _fixGridPosition(pos, dims) {
        if (!this._hasGridCollision(pos, dims))
            return pos;
        const /** @type {?} */ maxRow = this._maxRows === 0 ? this._getMaxRow() : this._maxRows;
        const /** @type {?} */ maxCol = this._maxCols === 0 ? this._getMaxCol() : this._maxCols;
        const /** @type {?} */ newPos = {
            col: pos.col,
            row: pos.row,
        };
        if (this._itemFixDirection === 'vertical') {
            fixLoop: for (; newPos.col <= maxRow;) {
                const /** @type {?} */ itemsInPath = this._getItemsInVerticalPath(newPos, dims, newPos.row);
                let /** @type {?} */ nextRow = newPos.row;
                for (let /** @type {?} */ item of itemsInPath) {
                    if (item.row - nextRow >= dims.y) {
                        newPos.row = nextRow;
                        break fixLoop;
                    }
                    nextRow = item.row + item.sizey;
                }
                if (maxRow - nextRow >= dims.y) {
                    newPos.row = nextRow;
                    break fixLoop;
                }
                newPos.col = Math.max(newPos.col + 1, Math.min.apply(Math, itemsInPath.map((item) => item.col + dims.x)));
                newPos.row = 1;
            }
        }
        else if (this._itemFixDirection === 'horizontal') {
            fixLoop: for (; newPos.row <= maxRow;) {
                const /** @type {?} */ itemsInPath = this._getItemsInHorizontalPath(newPos, dims, newPos.col);
                let /** @type {?} */ nextCol = newPos.col;
                for (let /** @type {?} */ item of itemsInPath) {
                    if (item.col - nextCol >= dims.x) {
                        newPos.col = nextCol;
                        break fixLoop;
                    }
                    nextCol = item.col + item.sizex;
                }
                if (maxCol - nextCol >= dims.x) {
                    newPos.col = nextCol;
                    break fixLoop;
                }
                newPos.row = Math.max(newPos.row + 1, Math.min.apply(Math, itemsInPath.map((item) => item.row + dims.y)));
                newPos.col = 1;
            }
        }
        return newPos;
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} startColumn
     * @return {?}
     */
    _getItemsInHorizontalPath(pos, dims, startColumn = 0) {
        const /** @type {?} */ itemsInPath = [];
        const /** @type {?} */ topRow = pos.row + dims.y - 1;
        this._itemsInGrid.forEach((itemId) => {
            const /** @type {?} */ item = this._items.get(itemId);
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
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} startRow
     * @return {?}
     */
    _getItemsInVerticalPath(pos, dims, startRow = 0) {
        const /** @type {?} */ itemsInPath = [];
        const /** @type {?} */ rightCol = pos.col + dims.x - 1;
        this._itemsInGrid.forEach((itemId) => {
            const /** @type {?} */ item = this._items.get(itemId);
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
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} allowExcessiveItems
     * @return {?}
     */
    _isWithinBoundsX(pos, dims, allowExcessiveItems = false) {
        return this._maxCols == 0 || (allowExcessiveItems && pos.col == 1) || (pos.col + dims.x - 1) <= this._maxCols;
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _fixPosToBoundsX(pos, dims) {
        if (!this._isWithinBoundsX(pos, dims)) {
            pos.col = Math.max(this._maxCols - (dims.x - 1), 1);
            pos.row++;
        }
        return pos;
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _fixSizeToBoundsX(pos, dims) {
        if (!this._isWithinBoundsX(pos, dims)) {
            dims.x = Math.max(this._maxCols - (pos.col - 1), 1);
            dims.y++;
        }
        return dims;
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} allowExcessiveItems
     * @return {?}
     */
    _isWithinBoundsY(pos, dims, allowExcessiveItems = false) {
        return this._maxRows == 0 || (allowExcessiveItems && pos.row == 1) || (pos.row + dims.y - 1) <= this._maxRows;
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _fixPosToBoundsY(pos, dims) {
        if (!this._isWithinBoundsY(pos, dims)) {
            pos.row = Math.max(this._maxRows - (dims.y - 1), 1);
            pos.col++;
        }
        return pos;
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _fixSizeToBoundsY(pos, dims) {
        if (!this._isWithinBoundsY(pos, dims)) {
            dims.y = Math.max(this._maxRows - (pos.row - 1), 1);
            dims.x++;
        }
        return dims;
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @param {?=} allowExcessiveItems
     * @return {?}
     */
    _isWithinBounds(pos, dims, allowExcessiveItems = false) {
        return this._isWithinBoundsX(pos, dims, allowExcessiveItems) && this._isWithinBoundsY(pos, dims, allowExcessiveItems);
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _fixPosToBounds(pos, dims) {
        return this._fixPosToBoundsX(this._fixPosToBoundsY(pos, dims), dims);
    }
    /**
     * @param {?} pos
     * @param {?} dims
     * @return {?}
     */
    _fixSizeToBounds(pos, dims) {
        return this._fixSizeToBoundsX(pos, this._fixSizeToBoundsY(pos, dims));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _addToGrid(item) {
        let /** @type {?} */ pos = item.getGridPosition();
        const /** @type {?} */ dims = item.getSize();
        if (this._hasGridCollision(pos, dims)) {
            this._fixGridCollisions(pos, dims);
            pos = item.getGridPosition();
        }
        if (this._allowOverlap) {
            item.zIndex = this._lastZValue++;
        }
        this._itemsInGrid.add(item.uid);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _removeFromGrid(item) {
        this._itemsInGrid.delete(item.uid);
    }
    /**
     * @return {?}
     */
    _updateSize() {
        if (this._destroyed)
            return;
        let /** @type {?} */ maxCol = this._getMaxCol();
        let /** @type {?} */ maxRow = this._getMaxRow();
        if (maxCol != this._curMaxCol || maxRow != this._curMaxRow) {
            this._curMaxCol = maxCol;
            this._curMaxRow = maxRow;
        }
        this._renderer.setElementStyle(this._ngEl.nativeElement, 'width', '100%'); //(maxCol * (this.colWidth + this.marginLeft + this.marginRight))+'px');
        if (!this._elementBasedDynamicRowHeight) {
            this._renderer.setElementStyle(this._ngEl.nativeElement, 'height', (maxRow * (this.rowHeight + this.marginTop + this.marginBottom)) + 'px');
        }
    }
    /**
     * @return {?}
     */
    _getMaxRow() {
        const /** @type {?} */ itemsRows = Array.from(this._itemsInGrid, (itemId) => {
            const /** @type {?} */ item = this._items.get(itemId);
            if (!item)
                return 0;
            return item.row + item.sizey - 1;
        });
        return Math.max.apply(null, itemsRows);
    }
    /**
     * @return {?}
     */
    _getMaxCol() {
        const /** @type {?} */ itemsCols = Array.from(this._itemsInGrid, (itemId) => {
            const /** @type {?} */ item = this._items.get(itemId);
            if (!item)
                return 0;
            return item.col + item.sizex - 1;
        });
        return Math.max.apply(null, itemsCols);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _getMousePosition(e) {
        if (((/** @type {?} */ (window)).TouchEvent && e instanceof TouchEvent) || (e.touches || e.changedTouches)) {
            e = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
        }
        const /** @type {?} */ refPos = this._ngEl.nativeElement.getBoundingClientRect();
        let /** @type {?} */ left = e.clientX - refPos.left;
        let /** @type {?} */ top = e.clientY - refPos.top;
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _getAbsoluteMousePosition(e) {
        if (((/** @type {?} */ (window)).TouchEvent && e instanceof TouchEvent) || (e.touches || e.changedTouches)) {
            e = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
        }
        return {
            left: e.clientX,
            top: e.clientY
        };
    }
    /**
     * @return {?}
     */
    _getContainerColumns() {
        const /** @type {?} */ maxWidth = this._ngEl.nativeElement.getBoundingClientRect().width;
        const /** @type {?} */ itemWidth = this.colWidth + this.marginLeft + this.marginRight;
        return Math.floor(maxWidth / itemWidth);
    }
    /**
     * @return {?}
     */
    _getContainerRows() {
        const /** @type {?} */ maxHeight = window.innerHeight - this.marginTop - this.marginBottom;
        return Math.floor(maxHeight / (this.rowHeight + this.marginTop + this.marginBottom));
    }
    /**
     * @return {?}
     */
    _getScreenMargin() {
        const /** @type {?} */ maxWidth = this._ngEl.nativeElement.getBoundingClientRect().width;
        const /** @type {?} */ itemWidth = this.colWidth + this.marginLeft + this.marginRight;
        return Math.floor((maxWidth - (this._maxCols * itemWidth)) / 2);
    }
    /**
     * @param {?} position
     * @return {?}
     */
    _getItemFromPosition(position) {
        return Array.from(this._itemsInGrid, (itemId) => this._items.get(itemId)).find((item) => {
            if (!item)
                return false;
            const /** @type {?} */ size = item.getDimensions();
            const /** @type {?} */ pos = item.getPosition();
            return position.left >= pos.left && position.left < (pos.left + size.width) &&
                position.top >= pos.top && position.top < (pos.top + size.height);
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _createPlaceholder(item) {
        const /** @type {?} */ pos = item.getGridPosition();
        const /** @type {?} */ dims = item.getSize();
        const /** @type {?} */ factory = this.componentFactoryResolver.resolveComponentFactory(NgGridPlaceholder);
        var /** @type {?} */ componentRef = item.containerRef.createComponent(factory);
        this._placeholderRef = componentRef;
        const /** @type {?} */ placeholder = componentRef.instance;
        placeholder.registerGrid(this);
        placeholder.setCascadeMode(this.cascade);
        placeholder.setGridPosition({ col: pos.col, row: pos.row });
        placeholder.setSize({ x: dims.x, y: dims.y });
    }
    /**
     * @return {?}
     */
    _emitOnItemChange() {
        const /** @type {?} */ itemOutput = Array.from(this._itemsInGrid)
            .map((itemId) => this._items.get(itemId))
            .filter((item) => !!item)
            .map((item) => item.getEventOutput());
        this.onItemChange.emit(itemOutput);
    }
    /**
     * @return {?}
     */
    _defineListeners() {
        const /** @type {?} */ element = this._ngEl.nativeElement;
        this._documentMousemove$ = fromEvent(document, 'mousemove');
        this._documentMouseup$ = fromEvent(document, 'mouseup');
        this._mousedown$ = fromEvent(element, 'mousedown');
        this._mousemove$ = fromEvent(element, 'mousemove');
        this._mouseup$ = fromEvent(element, 'mouseup');
        this._touchstart$ = fromEvent(element, 'touchstart');
        this._touchmove$ = fromEvent(element, 'touchmove');
        this._touchend$ = fromEvent(element, 'touchend');
    }
    /**
     * @return {?}
     */
    _enableListeners() {
        if (this._enabledListener) {
            return;
        }
        this._enableMouseListeners();
        if (this._isTouchDevice()) {
            this._enableTouchListeners();
        }
        this._enabledListener = true;
    }
    /**
     * @return {?}
     */
    _disableListeners() {
        this._subscriptions.forEach((subs) => subs.unsubscribe());
        this._enabledListener = false;
    }
    /**
     * @return {?}
     */
    _isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    ;
    /**
     * @return {?}
     */
    _enableTouchListeners() {
        const /** @type {?} */ touchstartSubs = this._touchstart$.subscribe((e) => this.mouseDownEventHandler(e));
        const /** @type {?} */ touchmoveSubs = this._touchmove$.subscribe((e) => this.mouseMoveEventHandler(e));
        const /** @type {?} */ touchendSubs = this._touchend$.subscribe((e) => this.mouseUpEventHandler(e));
        this._subscriptions.push(touchstartSubs, touchmoveSubs, touchendSubs);
    }
    /**
     * @return {?}
     */
    _enableMouseListeners() {
        const /** @type {?} */ documentMousemoveSubs = this._documentMousemove$.subscribe((e) => this.mouseMoveEventHandler(e));
        const /** @type {?} */ documentMouseupSubs = this._documentMouseup$.subscribe((e) => this.mouseUpEventHandler(e));
        const /** @type {?} */ mousedownSubs = this._mousedown$.subscribe((e) => this.mouseDownEventHandler(e));
        const /** @type {?} */ mousemoveSubs = this._mousemove$.subscribe((e) => this.mouseMoveEventHandler(e));
        const /** @type {?} */ mouseupSubs = this._mouseup$.subscribe((e) => this.mouseUpEventHandler(e));
        this._subscriptions.push(documentMousemoveSubs, documentMouseupSubs, mousedownSubs, mousemoveSubs, mouseupSubs);
    }
}
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
NgGrid.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: ElementRef },
    { type: Renderer },
    { type: ComponentFactoryResolver }
];
NgGrid.propDecorators = {
    onDragStart: [{ type: Output }],
    onDrag: [{ type: Output }],
    onDragStop: [{ type: Output }],
    onResizeStart: [{ type: Output }],
    onResize: [{ type: Output }],
    onResizeStop: [{ type: Output }],
    onItemChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgGridItem {
    /**
     * @param {?} _differs
     * @param {?} _ngEl
     * @param {?} _renderer
     * @param {?} _ngGrid
     * @param {?} containerRef
     */
    constructor(_differs, _ngEl, _renderer, _ngGrid, containerRef) {
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
    /**
     * @param {?} zIndex
     * @return {?}
     */
    set zIndex(zIndex) {
        this._renderer.setStyle(this._ngEl.nativeElement, 'z-index', zIndex.toString());
        this._zIndex = zIndex;
    }
    /**
     * @return {?}
     */
    get zIndex() {
        return this._zIndex;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set config(v) {
        this._userConfig = v;
        const /** @type {?} */ configObject = Object.assign({}, NgGridItem.CONST_DEFAULT_CONFIG, v);
        for (let /** @type {?} */ x in NgGridItem.CONST_DEFAULT_CONFIG)
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
    }
    /**
     * @return {?}
     */
    get sizex() {
        return this._size.x;
    }
    /**
     * @return {?}
     */
    get sizey() {
        return this._size.y;
    }
    /**
     * @return {?}
     */
    get col() {
        return this._currentPosition.col;
    }
    /**
     * @return {?}
     */
    get row() {
        return this._currentPosition.row;
    }
    /**
     * @return {?}
     */
    get currentCol() {
        return this._currentPosition.col;
    }
    /**
     * @return {?}
     */
    get currentRow() {
        return this._currentPosition.row;
    }
    /**
     * @return {?}
     */
    onResizeStartEvent() {
        const /** @type {?} */ event = this.getEventOutput();
        this.onResizeStart.emit(event);
        this.onResizeAny.emit(event);
        this.onChangeStart.emit(event);
        this.onChangeAny.emit(event);
    }
    /**
     * @return {?}
     */
    onResizeEvent() {
        const /** @type {?} */ event = this.getEventOutput();
        this.onResize.emit(event);
        this.onResizeAny.emit(event);
        this.onChange.emit(event);
        this.onChangeAny.emit(event);
    }
    /**
     * @return {?}
     */
    onResizeStopEvent() {
        const /** @type {?} */ event = this.getEventOutput();
        this.onResizeStop.emit(event);
        this.onResizeAny.emit(event);
        this.onChangeStop.emit(event);
        this.onChangeAny.emit(event);
        this.onConfigChangeEvent();
    }
    /**
     * @return {?}
     */
    onDragStartEvent() {
        const /** @type {?} */ event = this.getEventOutput();
        this.onDragStart.emit(event);
        this.onDragAny.emit(event);
        this.onChangeStart.emit(event);
        this.onChangeAny.emit(event);
    }
    /**
     * @return {?}
     */
    onDragEvent() {
        const /** @type {?} */ event = this.getEventOutput();
        this.onDrag.emit(event);
        this.onDragAny.emit(event);
        this.onChange.emit(event);
        this.onChangeAny.emit(event);
    }
    /**
     * @return {?}
     */
    onDragStopEvent() {
        const /** @type {?} */ event = this.getEventOutput();
        this.onDragStop.emit(event);
        this.onDragAny.emit(event);
        this.onChangeStop.emit(event);
        this.onChangeAny.emit(event);
        this.onConfigChangeEvent();
    }
    /**
     * @return {?}
     */
    onCascadeEvent() {
        this.onConfigChangeEvent();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._renderer.addClass(this._ngEl.nativeElement, 'grid-item');
        if (this._ngGrid.autoStyle)
            this._renderer.setStyle(this._ngEl.nativeElement, 'position', 'absolute');
        this._recalculateDimensions();
        this._recalculatePosition();
        // Force a config update in case there is no config assigned
        this.config = this._userConfig;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    canDrag(e) {
        if (!this.isDraggable)
            return false;
        if (this._dragHandle) {
            return this.findHandle(this._dragHandle, e.target);
        }
        return true;
    }
    /**
     * @param {?} handleSelector
     * @param {?} startElement
     * @return {?}
     */
    findHandle(handleSelector, startElement) {
        try {
            let /** @type {?} */ targetElem = startElement;
            while (targetElem && targetElem != this._ngEl.nativeElement) {
                if (this.elementMatches(targetElem, handleSelector))
                    return true;
                targetElem = targetElem.parentElement;
            }
        }
        catch (/** @type {?} */ err) { }
        return false;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    canResize(e) {
        if (!this.isResizable)
            return null;
        if (this._resizeHandle) {
            if (typeof this._resizeHandle === 'string') {
                return this.findHandle(this._resizeHandle, e.target) ? 'bottomright' : null;
            }
            if (typeof this._resizeHandle !== 'object')
                return null;
            const /** @type {?} */ resizeDirections = ['bottomright', 'bottomleft', 'topright', 'topleft', 'right', 'left', 'bottom', 'top'];
            for (let /** @type {?} */ direction of resizeDirections) {
                if (direction in this._resizeHandle) {
                    if (this.findHandle(this._resizeHandle[direction], e.target)) {
                        return direction;
                    }
                }
            }
            return null;
        }
        if (this._borderSize <= 0)
            return null;
        const /** @type {?} */ mousePos = this._getMousePosition(e);
        for (let /** @type {?} */ direction of this._resizeDirections) {
            if (this.canResizeInDirection(direction, mousePos)) {
                return direction;
            }
        }
        return null;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMouseMove(e) {
        if (this._ngGrid.autoStyle) {
            if (this._ngGrid.resizeEnable) {
                const /** @type {?} */ resizeDirection = this.canResize(e);
                let /** @type {?} */ cursor = 'default';
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._added)
            this._ngGrid.removeItem(this);
    }
    /**
     * @return {?}
     */
    getElement() {
        return this._ngEl;
    }
    /**
     * @return {?}
     */
    getDragHandle() {
        return this._dragHandle;
    }
    /**
     * @return {?}
     */
    getResizeHandle() {
        return this._resizeHandle;
    }
    /**
     * @return {?}
     */
    getDimensions() {
        return { 'width': this._elemWidth, 'height': this._elemHeight };
    }
    /**
     * @return {?}
     */
    getSize() {
        return this._size;
    }
    /**
     * @return {?}
     */
    getPosition() {
        return { 'left': this._elemLeft, 'top': this._elemTop };
    }
    /**
     * @return {?}
     */
    getGridPosition() {
        return this._currentPosition;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
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
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._differ != null) {
            const /** @type {?} */ changes = this._differ.diff(this._userConfig);
            if (changes != null) {
                return this._applyChanges(changes);
            }
        }
        return false;
    }
    /**
     * @param {?} newSize
     * @param {?=} update
     * @return {?}
     */
    setSize(newSize, update = true) {
        newSize = this.fixResize(newSize);
        this._size = newSize;
        if (update)
            this._recalculateDimensions();
        this.onItemChange.emit(this.getEventOutput());
    }
    /**
     * @param {?} gridPosition
     * @param {?=} update
     * @return {?}
     */
    setGridPosition(gridPosition, update = true) {
        this._currentPosition = gridPosition;
        if (update)
            this._recalculatePosition();
        this.onItemChange.emit(this.getEventOutput());
    }
    /**
     * @return {?}
     */
    getEventOutput() {
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
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    setPosition(x, y) {
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
    }
    /**
     * @param {?} cascade
     * @return {?}
     */
    setCascadeMode(cascade) {
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
    }
    /**
     * @param {?} w
     * @param {?} h
     * @return {?}
     */
    setDimensions(w, h) {
        if (w < this.minWidth)
            w = this.minWidth;
        if (h < this.minHeight)
            h = this.minHeight;
        this._renderer.setStyle(this._ngEl.nativeElement, 'width', w + 'px');
        this._renderer.setStyle(this._ngEl.nativeElement, 'height', h + 'px');
        this._elemWidth = w;
        this._elemHeight = h;
    }
    /**
     * @return {?}
     */
    startMoving() {
        this._renderer.addClass(this._ngEl.nativeElement, 'moving');
        const /** @type {?} */ style = window.getComputedStyle(this._ngEl.nativeElement);
        if (this._ngGrid.autoStyle)
            this._renderer.setStyle(this._ngEl.nativeElement, 'z-index', (parseInt(style.getPropertyValue('z-index')) + 1).toString());
    }
    /**
     * @return {?}
     */
    stopMoving() {
        this._renderer.removeClass(this._ngEl.nativeElement, 'moving');
        const /** @type {?} */ style = window.getComputedStyle(this._ngEl.nativeElement);
        if (this._ngGrid.autoStyle)
            this._renderer.setStyle(this._ngEl.nativeElement, 'z-index', (parseInt(style.getPropertyValue('z-index')) - 1).toString());
    }
    /**
     * @return {?}
     */
    recalculateSelf() {
        this._recalculatePosition();
        this._recalculateDimensions();
    }
    /**
     * @param {?} newSize
     * @return {?}
     */
    fixResize(newSize) {
        if (this._maxCols > 0 && newSize.x > this._maxCols)
            newSize.x = this._maxCols;
        if (this._maxRows > 0 && newSize.y > this._maxRows)
            newSize.y = this._maxRows;
        if (this._minCols > 0 && newSize.x < this._minCols)
            newSize.x = this._minCols;
        if (this._minRows > 0 && newSize.y < this._minRows)
            newSize.y = this._minRows;
        const /** @type {?} */ itemWidth = (newSize.x * this._ngGrid.colWidth) + ((this._ngGrid.marginLeft + this._ngGrid.marginRight) * (newSize.x - 1));
        if (itemWidth < this.minWidth)
            newSize.x = Math.ceil((this.minWidth + this._ngGrid.marginRight + this._ngGrid.marginLeft) / (this._ngGrid.colWidth + this._ngGrid.marginRight + this._ngGrid.marginLeft));
        const /** @type {?} */ itemHeight = (newSize.y * this._ngGrid.rowHeight) + ((this._ngGrid.marginTop + this._ngGrid.marginBottom) * (newSize.y - 1));
        if (itemHeight < this.minHeight)
            newSize.y = Math.ceil((this.minHeight + this._ngGrid.marginBottom + this._ngGrid.marginTop) / (this._ngGrid.rowHeight + this._ngGrid.marginBottom + this._ngGrid.marginTop));
        return newSize;
    }
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    elementMatches(element, selector) {
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
        const /** @type {?} */ matches = (element.document || element.ownerDocument).querySelectorAll(selector);
        let /** @type {?} */ i = matches.length;
        while (--i >= 0 && matches.item(i) !== element) { }
        return i > -1;
    }
    /**
     * @return {?}
     */
    _recalculatePosition() {
        const /** @type {?} */ x = (this._ngGrid.colWidth + this._ngGrid.marginLeft + this._ngGrid.marginRight) * (this._currentPosition.col - 1) + this._ngGrid.marginLeft + this._ngGrid.screenMargin;
        const /** @type {?} */ y = (this._ngGrid.rowHeight + this._ngGrid.marginTop + this._ngGrid.marginBottom) * (this._currentPosition.row - 1) + this._ngGrid.marginTop;
        this.setPosition(x, y);
    }
    /**
     * @return {?}
     */
    _recalculateDimensions() {
        if (this._size.x < this._ngGrid.minCols)
            this._size.x = this._ngGrid.minCols;
        if (this._size.y < this._ngGrid.minRows)
            this._size.y = this._ngGrid.minRows;
        const /** @type {?} */ newWidth = (this._ngGrid.colWidth * this._size.x) + ((this._ngGrid.marginLeft + this._ngGrid.marginRight) * (this._size.x - 1));
        const /** @type {?} */ newHeight = (this._ngGrid.rowHeight * this._size.y) + ((this._ngGrid.marginTop + this._ngGrid.marginBottom) * (this._size.y - 1));
        const /** @type {?} */ w = Math.max(this.minWidth, this._ngGrid.minWidth, newWidth);
        const /** @type {?} */ h = Math.max(this.minHeight, this._ngGrid.minHeight, newHeight);
        this.setDimensions(w, h);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _getMousePosition(e) {
        if (e.originalEvent && e.originalEvent.touches) {
            const /** @type {?} */ oe = e.originalEvent;
            e = oe.touches.length ? oe.touches[0] : (oe.changedTouches.length ? oe.changedTouches[0] : e);
        }
        else if (e.touches) {
            e = e.touches.length ? e.touches[0] : (e.changedTouches.length ? e.changedTouches[0] : e);
        }
        const /** @type {?} */ refPos = this._ngEl.nativeElement.getBoundingClientRect();
        return {
            left: e.clientX - refPos.left,
            top: e.clientY - refPos.top
        };
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyChanges(changes) {
        let /** @type {?} */ changed = false;
        const /** @type {?} */ changeCheck = (record) => {
            if (this._config[record.key] !== record.currentValue) {
                this._config[record.key] = record.currentValue;
                changed = true;
            }
        };
        changes.forEachAddedItem(changeCheck);
        changes.forEachChangedItem(changeCheck);
        changes.forEachRemovedItem((record) => {
            changed = true;
            delete this._config[record.key];
        });
        if (changed) {
            this.setConfig(this._config);
        }
        return changed;
    }
    /**
     * @return {?}
     */
    onConfigChangeEvent() {
        if (this._userConfig === null)
            return;
        this._config.sizex = this._userConfig.sizex = this._size.x;
        this._config.sizey = this._userConfig.sizey = this._size.y;
        this._config.col = this._userConfig.col = this._currentPosition.col;
        this._config.row = this._userConfig.row = this._currentPosition.row;
        this.ngGridItemChange.emit(this._userConfig);
    }
    /**
     * @param {?} direction
     * @param {?} mousePos
     * @return {?}
     */
    canResizeInDirection(direction, mousePos) {
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
    }
}
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
NgGridItem.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgGrid },
    { type: ViewContainerRef }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgGridModule {
}
NgGridModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgGrid, NgGridItem, NgGridPlaceholder],
                entryComponents: [NgGridPlaceholder],
                exports: [NgGrid, NgGridItem]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgGrid, NgGridItem, NgGridPlaceholder, NgGridModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZ3JpZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhcjItZ3JpZC9oZWxwZXJzL05nR3JpZEhlbHBlcnMudHMiLCJuZzovL2FuZ3VsYXIyLWdyaWQvY29tcG9uZW50cy9OZ0dyaWRQbGFjZWhvbGRlci50cyIsIm5nOi8vYW5ndWxhcjItZ3JpZC9kaXJlY3RpdmVzL05nR3JpZC50cyIsIm5nOi8vYW5ndWxhcjItZ3JpZC9kaXJlY3RpdmVzL05nR3JpZEl0ZW0udHMiLCJuZzovL2FuZ3VsYXIyLWdyaWQvbW9kdWxlcy9OZ0dyaWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nR3JpZEl0ZW0gfSBmcm9tIFwiLi4vZGlyZWN0aXZlcy9OZ0dyaWRJdGVtXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVV1aWQoKTogc3RyaW5nIHtcblx0cmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24oYykge1xuXHRcdGxldCByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMCwgdiA9IGMgPT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KTtcblx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc29ydEl0ZW1zQnlQb3NpdGlvbkhvcml6b250YWwoYTogTmdHcmlkSXRlbSwgYjogTmdHcmlkSXRlbSk6IG51bWJlciB7XG5cdGlmIChhLmNvbCA9PT0gYi5jb2wpIHsgcmV0dXJuIGEucm93IC0gYi5yb3c7IH1cblx0cmV0dXJuIGEuY29sIC0gYi5jb2w7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0SXRlbXNCeVBvc2l0aW9uVmVydGljYWwoYTogTmdHcmlkSXRlbSwgYjogTmdHcmlkSXRlbSk6IG51bWJlciB7XG5cdGlmIChhLnJvdyA9PT0gYi5yb3cpIHsgcmV0dXJuIGEuY29sIC0gYi5jb2w7IH1cblx0cmV0dXJuIGEucm93IC0gYi5yb3c7XG59XG4iLCJpbXBvcnQgeyBOZ0dyaWQgfSBmcm9tICcuLi9kaXJlY3RpdmVzL05nR3JpZCc7XG5pbXBvcnQgeyBOZ0dyaWRJdGVtUG9zaXRpb24sIE5nR3JpZEl0ZW1TaXplIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JTmdHcmlkJztcbmltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlciwgRXZlbnRFbWl0dGVyLCBIb3N0LCBWaWV3RW5jYXBzdWxhdGlvbiwgVHlwZSwgQ29tcG9uZW50UmVmLCBLZXlWYWx1ZURpZmZlciwgS2V5VmFsdWVEaWZmZXJzLCBPbkluaXQsIE9uRGVzdHJveSwgRG9DaGVjaywgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmctZ3JpZC1wbGFjZWhvbGRlcicsXG4gICAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIE5nR3JpZFBsYWNlaG9sZGVyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIF9zaXplOiBOZ0dyaWRJdGVtU2l6ZTtcbiAgICBwcml2YXRlIF9wb3NpdGlvbjogTmdHcmlkSXRlbVBvc2l0aW9uO1xuICAgIHByaXZhdGUgX25nR3JpZDogTmdHcmlkO1xuICAgIHByaXZhdGUgX2Nhc2NhZGVNb2RlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIpIHsgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyR3JpZChuZ0dyaWQ6IE5nR3JpZCkge1xuICAgICAgICB0aGlzLl9uZ0dyaWQgPSBuZ0dyaWQ7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnZ3JpZC1wbGFjZWhvbGRlcicsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmF1dG9TdHlsZSkgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNpemUobmV3U2l6ZTogTmdHcmlkSXRlbVNpemUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ld1NpemU7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRHcmlkUG9zaXRpb24obmV3UG9zaXRpb246IE5nR3JpZEl0ZW1Qb3NpdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IG5ld1Bvc2l0aW9uO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENhc2NhZGVNb2RlKGNhc2NhZGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jYXNjYWRlTW9kZSA9IGNhc2NhZGU7XG4gICAgICAgIHN3aXRjaCAoY2FzY2FkZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgJzBweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCAnMHB4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsICcwcHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgJzBweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCAnMHB4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsICcwcHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgICBwcml2YXRlIF9zZXREaW1lbnNpb25zKHc6IG51bWJlciwgaDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHcgKyAncHgnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGggKyAncHgnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX2Nhc2NhZGVNb2RlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4KScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyAteCArICdweCwgJyArIHkgKyAncHgpJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgeCArICdweCwgJyArIC15ICsgJ3B4KScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjYWxjdWxhdGVQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgeDogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5jb2xXaWR0aCArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0KSAqICh0aGlzLl9wb3NpdGlvbi5jb2wgLSAxKSArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLnNjcmVlbk1hcmdpbjtcbiAgICAgICAgY29uc3QgeTogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5yb3dIZWlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSkgKiAodGhpcy5fcG9zaXRpb24ucm93IC0gMSkgKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wO1xuICAgICAgICB0aGlzLl9zZXRQb3NpdGlvbih4LCB5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHc6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQuY29sV2lkdGggKiB0aGlzLl9zaXplLngpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCkgKiAodGhpcy5fc2l6ZS54IC0gMSkpO1xuICAgICAgICBjb25zdCBoOiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLnJvd0hlaWdodCAqIHRoaXMuX3NpemUueSkgKyAoKHRoaXMuX25nR3JpZC5tYXJnaW5Ub3AgKyB0aGlzLl9uZ0dyaWQubWFyZ2luQm90dG9tKSAqICh0aGlzLl9zaXplLnkgLSAxKSk7XG4gICAgICAgIHRoaXMuX3NldERpbWVuc2lvbnModywgaCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSG9zdCwgVmlld0VuY2Fwc3VsYXRpb24sIFR5cGUsIENvbXBvbmVudFJlZiwgS2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVycywgT25Jbml0LCBPbkRlc3Ryb3ksIERvQ2hlY2ssIFZpZXdDb250YWluZXJSZWYsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdHcmlkQ29uZmlnLCBOZ0dyaWRJdGVtRXZlbnQsIE5nR3JpZEl0ZW1Qb3NpdGlvbiwgTmdHcmlkSXRlbVNpemUsIE5nR3JpZFJhd1Bvc2l0aW9uLCBOZ0dyaWRJdGVtRGltZW5zaW9ucywgTmdDb25maWdGaXhEaXJlY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL0lOZ0dyaWQnO1xuaW1wb3J0IHsgTmdHcmlkSXRlbSB9IGZyb20gJy4vTmdHcmlkSXRlbSc7XG5pbXBvcnQgKiBhcyBOZ0dyaWRIZWxwZXIgZnJvbSAnLi4vaGVscGVycy9OZ0dyaWRIZWxwZXJzJztcbmltcG9ydCB7IE5nR3JpZFBsYWNlaG9sZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9OZ0dyaWRQbGFjZWhvbGRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tuZ0dyaWRdJyxcbiAgICBpbnB1dHM6IFsnY29uZmlnOiBuZ0dyaWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAncmVzaXplRXZlbnRIYW5kbGVyKCRldmVudCknLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdHcmlkIGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICAgIHB1YmxpYyBzdGF0aWMgQ09OU1RfREVGQVVMVF9SRVNJWkVfRElSRUNUSU9OUzogc3RyaW5nW10gPSBbXG4gICAgICAgICdib3R0b21yaWdodCcsXG4gICAgICAgICdib3R0b21sZWZ0JyxcbiAgICAgICAgJ3RvcHJpZ2h0JyxcbiAgICAgICAgJ3RvcGxlZnQnLFxuICAgICAgICAncmlnaHQnLFxuICAgICAgICAnbGVmdCcsXG4gICAgICAgICdib3R0b20nLFxuICAgICAgICAndG9wJyxcbiAgICBdO1xuXG4gICAgLy8gRXZlbnQgRW1pdHRlcnNcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWc6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ1N0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplU3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZVN0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uSXRlbUNoYW5nZTogRXZlbnRFbWl0dGVyPEFycmF5PE5nR3JpZEl0ZW1FdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxOZ0dyaWRJdGVtRXZlbnQ+PigpO1xuXG4gICAgLy8gUHVibGljIHZhcmlhYmxlc1xuICAgIHB1YmxpYyBjb2xXaWR0aDogbnVtYmVyID0gMjUwO1xuICAgIHB1YmxpYyByb3dIZWlnaHQ6IG51bWJlciA9IDI1MDtcbiAgICBwdWJsaWMgbWluQ29sczogbnVtYmVyID0gMTtcbiAgICBwdWJsaWMgbWluUm93czogbnVtYmVyID0gMTtcbiAgICBwdWJsaWMgbWFyZ2luVG9wOiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgbWFyZ2luUmlnaHQ6IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyBtYXJnaW5Cb3R0b206IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyBtYXJnaW5MZWZ0OiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgc2NyZWVuTWFyZ2luOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzUmVzaXppbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgYXV0b1N0eWxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgcmVzaXplRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgZHJhZ0VuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGNhc2NhZGU6IHN0cmluZyA9ICd1cCc7XG4gICAgcHVibGljIG1pbldpZHRoOiBudW1iZXIgPSAxMDA7XG4gICAgcHVibGljIG1pbkhlaWdodDogbnVtYmVyID0gMTAwO1xuICAgIHB1YmxpYyByZXNpemVEaXJlY3Rpb25zOiBzdHJpbmdbXSA9IE5nR3JpZC5DT05TVF9ERUZBVUxUX1JFU0laRV9ESVJFQ1RJT05TO1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICBwcml2YXRlIF9pdGVtczogTWFwPHN0cmluZywgTmdHcmlkSXRlbT4gPSBuZXcgTWFwPHN0cmluZywgTmdHcmlkSXRlbT4oKTtcbiAgICBwcml2YXRlIF9kcmFnZ2luZ0l0ZW06IE5nR3JpZEl0ZW0gPSBudWxsO1xuICAgIHByaXZhdGUgX3Jlc2l6aW5nSXRlbTogTmdHcmlkSXRlbSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfcmVzaXplRGlyZWN0aW9uOiBzdHJpbmcgPSBudWxsO1xuICAgIHByaXZhdGUgX2l0ZW1zSW5HcmlkOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHByaXZhdGUgX2NvbnRhaW5lcldpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfY29udGFpbmVySGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbWF4Q29sczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9tYXhSb3dzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3Zpc2libGVDb2xzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3Zpc2libGVSb3dzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3NldFdpZHRoOiBudW1iZXIgPSAyNTA7XG4gICAgcHJpdmF0ZSBfc2V0SGVpZ2h0OiBudW1iZXIgPSAyNTA7XG4gICAgcHJpdmF0ZSBfcG9zT2Zmc2V0OiBOZ0dyaWRSYXdQb3NpdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfYWRkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXJSZWY6IENvbXBvbmVudFJlZjxOZ0dyaWRQbGFjZWhvbGRlcj4gPSBudWxsO1xuICAgIHByaXZhdGUgX2ZpeFRvR3JpZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2F1dG9SZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9kaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjtcbiAgICBwcml2YXRlIF9kZXN0cm95ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9tYWludGFpblJhdGlvOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfYXNwZWN0UmF0aW86IG51bWJlcjtcbiAgICBwcml2YXRlIF9wcmVmZXJOZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF96b29tT25EcmFnOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbGltaXRUb1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2NlbnRlclRvU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfY3VyTWF4Um93OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2N1ck1heENvbDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9kcmFnUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9yZXNpemVSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pdGVtRml4RGlyZWN0aW9uOiBOZ0NvbmZpZ0ZpeERpcmVjdGlvbiA9ICdjYXNjYWRlJztcbiAgICBwcml2YXRlIF9jb2xsaXNpb25GaXhEaXJlY3Rpb246IE5nQ29uZmlnRml4RGlyZWN0aW9uID0gJ2Nhc2NhZGUnO1xuICAgIHByaXZhdGUgX2FsbG93T3ZlcmxhcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2Nhc2NhZGVQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xuICAgIHByaXZhdGUgX2xhc3RaVmFsdWU6IG51bWJlciA9IDE7XG5cbiAgICAvLyBFdmVudHNcbiAgICBwcml2YXRlIF9kb2N1bWVudE1vdXNlbW92ZSQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnRNb3VzZXVwJDogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PjtcbiAgICBwcml2YXRlIF9tb3VzZWRvd24kOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICAgIHByaXZhdGUgX21vdXNlbW92ZSQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfbW91c2V1cCQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfdG91Y2hzdGFydCQ6IE9ic2VydmFibGU8VG91Y2hFdmVudD47XG4gICAgcHJpdmF0ZSBfdG91Y2htb3ZlJDogT2JzZXJ2YWJsZTxUb3VjaEV2ZW50PjtcbiAgICBwcml2YXRlIF90b3VjaGVuZCQ6IE9ic2VydmFibGU8VG91Y2hFdmVudD47XG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIHByaXZhdGUgX2VuYWJsZWRMaXN0ZW5lcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gRGVmYXVsdCBjb25maWdcbiAgICBwcml2YXRlIHN0YXRpYyBDT05TVF9ERUZBVUxUX0NPTkZJRzogTmdHcmlkQ29uZmlnID0ge1xuICAgICAgICBtYXJnaW5zOiBbMTBdLFxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgIHJlc2l6YWJsZTogdHJ1ZSxcbiAgICAgICAgbWF4X2NvbHM6IDAsXG4gICAgICAgIG1heF9yb3dzOiAwLFxuICAgICAgICB2aXNpYmxlX2NvbHM6IDAsXG4gICAgICAgIHZpc2libGVfcm93czogMCxcbiAgICAgICAgY29sX3dpZHRoOiAyNTAsXG4gICAgICAgIHJvd19oZWlnaHQ6IDI1MCxcbiAgICAgICAgY2FzY2FkZTogJ3VwJyxcbiAgICAgICAgbWluX3dpZHRoOiAxMDAsXG4gICAgICAgIG1pbl9oZWlnaHQ6IDEwMCxcbiAgICAgICAgZml4X3RvX2dyaWQ6IGZhbHNlLFxuICAgICAgICBhdXRvX3N0eWxlOiB0cnVlLFxuICAgICAgICBhdXRvX3Jlc2l6ZTogZmFsc2UsXG4gICAgICAgIG1haW50YWluX3JhdGlvOiBmYWxzZSxcbiAgICAgICAgcHJlZmVyX25ldzogZmFsc2UsXG4gICAgICAgIHpvb21fb25fZHJhZzogZmFsc2UsXG4gICAgICAgIGxpbWl0X3RvX3NjcmVlbjogZmFsc2UsXG4gICAgICAgIGNlbnRlcl90b19zY3JlZW46IGZhbHNlLFxuICAgICAgICByZXNpemVfZGlyZWN0aW9uczogTmdHcmlkLkNPTlNUX0RFRkFVTFRfUkVTSVpFX0RJUkVDVElPTlMsXG4gICAgICAgIGVsZW1lbnRfYmFzZWRfcm93X2hlaWdodDogZmFsc2UsXG4gICAgICAgIGZpeF9pdGVtX3Bvc2l0aW9uX2RpcmVjdGlvbjogJ2Nhc2NhZGUnLFxuICAgICAgICBmaXhfY29sbGlzaW9uX3Bvc2l0aW9uX2RpcmVjdGlvbjogJ2Nhc2NhZGUnLFxuICAgICAgICBhbGxvd19vdmVybGFwOiBmYWxzZSxcbiAgICB9O1xuICAgIHByaXZhdGUgX2NvbmZpZyA9IE5nR3JpZC5DT05TVF9ERUZBVUxUX0NPTkZJRztcblxuICAgIC8vIFtuZy1ncmlkXSBhdHRyaWJ1dGUgaGFuZGxlclxuICAgIHNldCBjb25maWcodjogTmdHcmlkQ29uZmlnKSB7XG4gICAgICAgIGlmICh2ID09IG51bGwgfHwgdHlwZW9mIHYgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldENvbmZpZyh2KTtcblxuICAgICAgICBpZiAodGhpcy5fZGlmZmVyID09IG51bGwgJiYgdiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9kaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQodGhpcy5fY29uZmlnKS5jcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX2RlZmluZUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBtZXRob2RzXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnZ3JpZCcsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5hdXRvU3R5bGUpIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgICAgICB0aGlzLnNldENvbmZpZyh0aGlzLl9jb25maWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZW5lcmF0ZUl0ZW1VaWQoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdWlkOiBzdHJpbmcgPSBOZ0dyaWRIZWxwZXIuZ2VuZXJhdGVVdWlkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmhhcyh1aWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUl0ZW1VaWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1aWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENvbmZpZyhjb25maWc6IE5nR3JpZENvbmZpZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgdmFyIG1heENvbFJvd0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgeCBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBjb25maWdbeF07XG4gICAgICAgICAgICB2YXIgaW50VmFsID0gIXZhbCA/IDAgOiBwYXJzZUludCh2YWwpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHgpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdtYXJnaW5zJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXJnaW5zKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbF93aWR0aCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sV2lkdGggPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyb3dfaGVpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhdXRvX3N0eWxlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvU3R5bGUgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2F1dG9fcmVzaXplJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXV0b1Jlc2l6ZSA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZHJhZ2dhYmxlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnRW5hYmxlID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXNpemFibGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUVuYWJsZSA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWF4X3Jvd3MnOlxuICAgICAgICAgICAgICAgICAgICBtYXhDb2xSb3dDaGFuZ2VkID0gbWF4Q29sUm93Q2hhbmdlZCB8fCB0aGlzLl9tYXhSb3dzICE9IGludFZhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4Um93cyA9IGludFZhbCA8IDAgPyAwIDogaW50VmFsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtYXhfY29scyc6XG4gICAgICAgICAgICAgICAgICAgIG1heENvbFJvd0NoYW5nZWQgPSBtYXhDb2xSb3dDaGFuZ2VkIHx8IHRoaXMuX21heENvbHMgIT0gaW50VmFsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXhDb2xzID0gaW50VmFsIDwgMCA/IDAgOiBpbnRWYWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVfcm93cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGVSb3dzID0gTWF0aC5tYXgoaW50VmFsLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndmlzaWJsZV9jb2xzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZUNvbHMgPSBNYXRoLm1heChpbnRWYWwsIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtaW5fcm93cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluUm93cyA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbl9jb2xzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5Db2xzID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluX2hlaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluSGVpZ2h0ID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluX3dpZHRoJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5XaWR0aCA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3pvb21fb25fZHJhZyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvb21PbkRyYWcgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Nhc2NhZGUnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXNjYWRlICE9IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNjYWRlID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmaXhfdG9fZ3JpZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpeFRvR3JpZCA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWFpbnRhaW5fcmF0aW8nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWludGFpblJhdGlvID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVmZXJfbmV3JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJlZmVyTmV3ID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsaW1pdF90b19zY3JlZW4nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saW1pdFRvU2NyZWVuID0gIXRoaXMuX2F1dG9SZXNpemUgJiYgISF2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcl90b19zY3JlZW4nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZW50ZXJUb1NjcmVlbiA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVzaXplX2RpcmVjdGlvbnMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZURpcmVjdGlvbnMgPSB2YWwgfHwgWydib3R0b21yaWdodCcsICdib3R0b21sZWZ0JywgJ3RvcHJpZ2h0JywgJ3RvcGxlZnQnLCAncmlnaHQnLCAnbGVmdCcsICdib3R0b20nLCAndG9wJ107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRfYmFzZWRfcm93X2hlaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZml4X2l0ZW1fcG9zaXRpb25fZGlyZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbUZpeERpcmVjdGlvbiA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZml4X2NvbGxpc2lvbl9wb3NpdGlvbl9kaXJlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FsbG93X292ZXJsYXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd092ZXJsYXAgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYWxsb3dPdmVybGFwICYmIHRoaXMuY2FzY2FkZSAhPT0gJ29mZicgJiYgdGhpcy5jYXNjYWRlICE9PSAnJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gb3ZlcmxhcCBpdGVtcyB3aGVuIGEgY2FzY2FkZSBkaXJlY3Rpb24gaXMgc2V0LicpO1xuICAgICAgICAgICAgdGhpcy5fYWxsb3dPdmVybGFwID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnRW5hYmxlIHx8IHRoaXMucmVzaXplRW5hYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtRml4RGlyZWN0aW9uID09PSAnY2FzY2FkZScpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPSB0aGlzLl9nZXRGaXhEaXJlY3Rpb25Gcm9tQ2FzY2FkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbGxpc2lvbkZpeERpcmVjdGlvbiA9PT0gJ2Nhc2NhZGUnKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPSB0aGlzLl9nZXRGaXhEaXJlY3Rpb25Gcm9tQ2FzY2FkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpbWl0VG9TY3JlZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld01heENvbHMgPSB0aGlzLl9nZXRDb250YWluZXJDb2x1bW5zKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhDb2xzICE9IG5ld01heENvbHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhDb2xzID0gbmV3TWF4Q29scztcbiAgICAgICAgICAgICAgICBtYXhDb2xSb3dDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saW1pdFRvU2NyZWVuICYmIHRoaXMuX2NlbnRlclRvU2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLnNjcmVlbk1hcmdpbiA9IHRoaXMuX2dldFNjcmVlbk1hcmdpbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zY3JlZW5NYXJnaW4gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21haW50YWluUmF0aW8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbFdpZHRoICYmIHRoaXMucm93SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXNwZWN0UmF0aW8gPSB0aGlzLmNvbFdpZHRoIC8gdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX21haW50YWluUmF0aW8gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXhDb2xSb3dDaGFuZ2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5fbWF4Um93cyA+IDApIHsgICAgLy8gICAgQ2FuJ3QgaGF2ZSBib3RoLCBwcmlvcml0aXNlIG9uIGNhc2NhZGVcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY2FzY2FkZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21heFJvd3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbnNBZnRlck1heENoYW5nZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29sV2lkdGgoKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlUm93SGVpZ2h0KCk7XG5cbiAgICAgICAgdmFyIG1heFdpZHRoID0gdGhpcy5fbWF4Q29scyAqIHRoaXMuY29sV2lkdGg7XG4gICAgICAgIHZhciBtYXhIZWlnaHQgPSB0aGlzLl9tYXhSb3dzICogdGhpcy5yb3dIZWlnaHQ7XG5cbiAgICAgICAgaWYgKG1heFdpZHRoID4gMCAmJiB0aGlzLm1pbldpZHRoID4gbWF4V2lkdGgpIHRoaXMubWluV2lkdGggPSAwLjc1ICogdGhpcy5jb2xXaWR0aDtcbiAgICAgICAgaWYgKG1heEhlaWdodCA+IDAgJiYgdGhpcy5taW5IZWlnaHQgPiBtYXhIZWlnaHQpIHRoaXMubWluSGVpZ2h0ID0gMC43NSAqIHRoaXMucm93SGVpZ2h0O1xuXG4gICAgICAgIGlmICh0aGlzLm1pbldpZHRoID4gdGhpcy5jb2xXaWR0aCkgdGhpcy5taW5Db2xzID0gTWF0aC5tYXgodGhpcy5taW5Db2xzLCBNYXRoLmNlaWwodGhpcy5taW5XaWR0aCAvIHRoaXMuY29sV2lkdGgpKTtcbiAgICAgICAgaWYgKHRoaXMubWluSGVpZ2h0ID4gdGhpcy5yb3dIZWlnaHQpIHRoaXMubWluUm93cyA9IE1hdGgubWF4KHRoaXMubWluUm93cywgTWF0aC5jZWlsKHRoaXMubWluSGVpZ2h0IC8gdGhpcy5yb3dIZWlnaHQpKTtcblxuICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5taW5Db2xzID4gdGhpcy5fbWF4Q29scykgdGhpcy5taW5Db2xzID0gMTtcbiAgICAgICAgaWYgKHRoaXMuX21heFJvd3MgPiAwICYmIHRoaXMubWluUm93cyA+IHRoaXMuX21heFJvd3MpIHRoaXMubWluUm93cyA9IDE7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmF0aW8oKTtcblxuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZChpdGVtKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0Q2FzY2FkZU1vZGUodGhpcy5jYXNjYWRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5yZWNhbGN1bGF0ZVNlbGYoKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtUG9zaXRpb24oaXRlbUlkOiBzdHJpbmcpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzKGl0ZW1JZCkgPyB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKS5nZXRHcmlkUG9zaXRpb24oKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEl0ZW1TaXplKGl0ZW1JZDogc3RyaW5nKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzKGl0ZW1JZCkgPyB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKS5nZXRTaXplKCkgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0RvQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9kaWZmZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZXMgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl9jb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoY2hhbmdlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1hcmdpbnMobWFyZ2luczogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcmdpblRvcCA9IE1hdGgubWF4KHBhcnNlSW50KG1hcmdpbnNbMF0pLCAwKTtcbiAgICAgICAgdGhpcy5tYXJnaW5SaWdodCA9IG1hcmdpbnMubGVuZ3RoID49IDIgPyBNYXRoLm1heChwYXJzZUludChtYXJnaW5zWzFdKSwgMCkgOiB0aGlzLm1hcmdpblRvcDtcbiAgICAgICAgdGhpcy5tYXJnaW5Cb3R0b20gPSBtYXJnaW5zLmxlbmd0aCA+PSAzID8gTWF0aC5tYXgocGFyc2VJbnQobWFyZ2luc1syXSksIDApIDogdGhpcy5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMubWFyZ2luTGVmdCA9IG1hcmdpbnMubGVuZ3RoID49IDQgPyBNYXRoLm1heChwYXJzZUludChtYXJnaW5zWzNdKSwgMCkgOiB0aGlzLm1hcmdpblJpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGVEcmFnKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYWdFbmFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlRHJhZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmFnRW5hYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZVJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNpemVFbmFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlc2l6ZUVuYWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRJdGVtKG5nSXRlbTogTmdHcmlkSXRlbSk6IHZvaWQge1xuICAgICAgICBuZ0l0ZW0uc2V0Q2FzY2FkZU1vZGUodGhpcy5jYXNjYWRlKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3ByZWZlck5ldykge1xuICAgICAgICAgICAgdmFyIG5ld1BvcyA9IHRoaXMuX2ZpeEdyaWRQb3NpdGlvbihuZ0l0ZW0uZ2V0R3JpZFBvc2l0aW9uKCksIG5nSXRlbS5nZXRTaXplKCkpO1xuICAgICAgICAgICAgbmdJdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5nSXRlbS51aWQgPT09IG51bGwgfHwgdGhpcy5faXRlbXMuaGFzKG5nSXRlbS51aWQpKSB7XG4gICAgICAgICAgICBuZ0l0ZW0udWlkID0gdGhpcy5nZW5lcmF0ZUl0ZW1VaWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2l0ZW1zLnNldChuZ0l0ZW0udWlkLCBuZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9hZGRUb0dyaWQobmdJdGVtKTtcblxuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyQ2FzY2FkZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbmdJdGVtLnJlY2FsY3VsYXRlU2VsZigpO1xuICAgICAgICAgICAgbmdJdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2VtaXRPbkl0ZW1DaGFuZ2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlSXRlbShuZ0l0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQobmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9pdGVtcy5kZWxldGUobmdJdGVtLnVpZCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckNhc2NhZGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IGl0ZW0ucmVjYWxjdWxhdGVTZWxmKCkpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdE9uSXRlbUNoYW5nZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlSXRlbShuZ0l0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQobmdJdGVtKTtcbiAgICAgICAgdGhpcy5fYWRkVG9HcmlkKG5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyQ2FzY2FkZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgICAgICAgbmdJdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0cmlnZ2VyQ2FzY2FkZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYXNjYWRlUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FzY2FkZVByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlUHJvbWlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nhc2NhZGVHcmlkKG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXNjYWRlUHJvbWlzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHJpZ2dlclJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNpemVFdmVudEhhbmRsZXIobnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2l6ZUV2ZW50SGFuZGxlcihlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29sV2lkdGgoKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlUm93SGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmF0aW8oKTtcblxuICAgICAgICBpZiAodGhpcy5fbGltaXRUb1NjcmVlbikge1xuICAgICAgICAgICAgY29uc3QgbmV3TWF4Q29sdW1ucyA9IHRoaXMuX2dldENvbnRhaW5lckNvbHVtbnMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhDb2xzICE9PSBuZXdNYXhDb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IG5ld01heENvbHVtbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb25zQWZ0ZXJNYXhDaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fY2VudGVyVG9TY3JlZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcmVlbk1hcmdpbiA9IHRoaXMuX2dldFNjcmVlbk1hcmdpbigpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlY2FsY3VsYXRlU2VsZigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F1dG9SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlY2FsY3VsYXRlU2VsZigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdXNlRG93bkV2ZW50SGFuZGxlcihlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgICAgICB2YXIgbW91c2VQb3MgPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX2dldEl0ZW1Gcm9tUG9zaXRpb24obW91c2VQb3MpO1xuXG4gICAgICAgIGlmIChpdGVtID09IG51bGwpIHJldHVybjtcblxuICAgICAgICBjb25zdCByZXNpemVEaXJlY3Rpb246IHN0cmluZyA9IGl0ZW0uY2FuUmVzaXplKGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZUVuYWJsZSAmJiByZXNpemVEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZVJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbSA9IGl0ZW07XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVEaXJlY3Rpb24gPSByZXNpemVEaXJlY3Rpb247XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyYWdFbmFibGUgJiYgaXRlbS5jYW5EcmFnKGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtID0gaXRlbTtcblxuICAgICAgICAgICAgY29uc3QgaXRlbVBvcyA9IGl0ZW0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX3Bvc09mZnNldCA9IHsgJ2xlZnQnOiAobW91c2VQb3MubGVmdCAtIGl0ZW1Qb3MubGVmdCksICd0b3AnOiAobW91c2VQb3MudG9wIC0gaXRlbVBvcy50b3ApIH1cblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1vdXNlVXBFdmVudEhhbmRsZXIoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ1N0b3AoZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVTdG9wKGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RyYWdSZWFkeSB8fCB0aGlzLl9yZXNpemVSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYW5EcmFnKCk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhblJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1vdXNlTW92ZUV2ZW50SGFuZGxlcihlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fcmVzaXplUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZVN0YXJ0KGUpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RyYWdSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ1N0YXJ0KGUpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5fZHJhZyhlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZShlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBtb3VzZVBvcyA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX2dldEl0ZW1Gcm9tUG9zaXRpb24obW91c2VQb3MpO1xuXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ub25Nb3VzZU1vdmUoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAgICBQcml2YXRlIG1ldGhvZHNcbiAgICBwcml2YXRlIF9nZXRGaXhEaXJlY3Rpb25Gcm9tQ2FzY2FkZSgpOiBOZ0NvbmZpZ0ZpeERpcmVjdGlvbiB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jYXNjYWRlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZXJ0aWNhbCc7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hvcml6b250YWwnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX3VwZGF0ZVBvc2l0aW9uc0FmdGVyTWF4Q2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgcG9zID0gaXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBkaW1zID0gaXRlbS5nZXRTaXplKCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5faGFzR3JpZENvbGxpc2lvbihwb3MsIGRpbXMpICYmIHRoaXMuX2lzV2l0aGluQm91bmRzKHBvcywgZGltcykgJiYgZGltcy54IDw9IHRoaXMuX21heENvbHMgJiYgZGltcy55IDw9IHRoaXMuX21heFJvd3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgZGltcy54ID4gdGhpcy5fbWF4Q29scykge1xuICAgICAgICAgICAgICAgIGRpbXMueCA9IHRoaXMuX21heENvbHM7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXRTaXplKGRpbXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYXhSb3dzID4gMCAmJiBkaW1zLnkgPiB0aGlzLl9tYXhSb3dzKSB7XG4gICAgICAgICAgICAgICAgZGltcy55ID0gdGhpcy5fbWF4Um93cztcbiAgICAgICAgICAgICAgICBpdGVtLnNldFNpemUoZGltcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNHcmlkQ29sbGlzaW9uKHBvcywgZGltcykgfHwgIXRoaXMuX2lzV2l0aGluQm91bmRzKHBvcywgZGltcywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB0aGlzLl9maXhHcmlkUG9zaXRpb24ocG9zLCBkaW1zKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlQ29sV2lkdGgoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvUmVzaXplKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgfHwgdGhpcy5fdmlzaWJsZUNvbHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1heENvbHMgPSB0aGlzLl9tYXhDb2xzID4gMCA/IHRoaXMuX21heENvbHMgOiB0aGlzLl92aXNpYmxlQ29scztcbiAgICAgICAgICAgICAgICB2YXIgbWF4V2lkdGg6IG51bWJlciA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICAgICAgICAgIHZhciBjb2xXaWR0aDogbnVtYmVyID0gTWF0aC5mbG9vcihtYXhXaWR0aCAvIG1heENvbHMpO1xuICAgICAgICAgICAgICAgIGNvbFdpZHRoIC09ICh0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgICAgICAgICBpZiAoY29sV2lkdGggPiAwKSB0aGlzLmNvbFdpZHRoID0gY29sV2lkdGg7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbFdpZHRoIDwgdGhpcy5taW5XaWR0aCB8fCB0aGlzLm1pbkNvbHMgPiB0aGlzLl9jb25maWcubWluX2NvbHMpIHtcbiAgICAgICAgICAgIHRoaXMubWluQ29scyA9IE1hdGgubWF4KHRoaXMuX2NvbmZpZy5taW5fY29scywgTWF0aC5jZWlsKHRoaXMubWluV2lkdGggLyB0aGlzLmNvbFdpZHRoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYWxjdWxhdGVSb3dIZWlnaHQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvUmVzaXplKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Um93cyA+IDAgfHwgdGhpcy5fdmlzaWJsZVJvd3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1heFJvd3MgPSB0aGlzLl9tYXhSb3dzID4gMCA/IHRoaXMuX21heFJvd3MgOiB0aGlzLl92aXNpYmxlUm93cztcbiAgICAgICAgICAgICAgICBsZXQgbWF4SGVpZ2h0OiBudW1iZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZWxlbWVudEJhc2VkRHluYW1pY1Jvd0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQgPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMubWFyZ2luVG9wIC0gdGhpcy5tYXJnaW5Cb3R0b207XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJvd0hlaWdodDogbnVtYmVyID0gTWF0aC5tYXgoTWF0aC5mbG9vcihtYXhIZWlnaHQgLyBtYXhSb3dzKSwgdGhpcy5taW5IZWlnaHQpO1xuICAgICAgICAgICAgICAgIHJvd0hlaWdodCAtPSAodGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSk7XG4gICAgICAgICAgICAgICAgaWYgKHJvd0hlaWdodCA+IDApIHRoaXMucm93SGVpZ2h0ID0gcm93SGVpZ2h0O1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb3dIZWlnaHQgPCB0aGlzLm1pbkhlaWdodCB8fCB0aGlzLm1pblJvd3MgPiB0aGlzLl9jb25maWcubWluX3Jvd3MpIHtcbiAgICAgICAgICAgIHRoaXMubWluUm93cyA9IE1hdGgubWF4KHRoaXMuX2NvbmZpZy5taW5fcm93cywgTWF0aC5jZWlsKHRoaXMubWluSGVpZ2h0IC8gdGhpcy5yb3dIZWlnaHQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVJhdGlvKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2F1dG9SZXNpemUgfHwgIXRoaXMuX21haW50YWluUmF0aW8pIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5fdmlzaWJsZVJvd3MgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSB0aGlzLmNvbFdpZHRoIC8gdGhpcy5fYXNwZWN0UmF0aW87XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF4Um93cyA+IDAgJiYgdGhpcy5fdmlzaWJsZUNvbHMgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb2xXaWR0aCA9IHRoaXMuX2FzcGVjdFJhdGlvICogdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF4Q29scyA9PSAwICYmIHRoaXMuX21heFJvd3MgPT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2libGVDb2xzID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm93SGVpZ2h0ID0gdGhpcy5jb2xXaWR0aCAvIHRoaXMuX2FzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl92aXNpYmxlUm93cyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbFdpZHRoID0gdGhpcy5fYXNwZWN0UmF0aW8gKiB0aGlzLnJvd0hlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChyZWNvcmQ6IGFueSkgPT4geyB0aGlzLl9jb25maWdbcmVjb3JkLmtleV0gPSByZWNvcmQuY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0oKHJlY29yZDogYW55KSA9PiB7IHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XSA9IHJlY29yZC5jdXJyZW50VmFsdWU7IH0pO1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVjb3JkOiBhbnkpID0+IHsgZGVsZXRlIHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XTsgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRDb25maWcodGhpcy5fY29uZmlnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNpemVTdGFydChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc2l6ZUVuYWJsZSB8fCAhdGhpcy5fcmVzaXppbmdJdGVtKSByZXR1cm47XG5cbiAgICAgICAgLy8gICAgU2V0dXBcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnN0YXJ0TW92aW5nKCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyKHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnpJbmRleCA9IHRoaXMuX2xhc3RaVmFsdWUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICAgIFN0YXR1cyBGbGFnc1xuICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZXNpemVSZWFkeSA9IGZhbHNlO1xuXG4gICAgICAgIC8vICAgIEV2ZW50c1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RhcnQuZW1pdCh0aGlzLl9yZXNpemluZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0ub25SZXNpemVTdGFydEV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhZ1N0YXJ0KGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ0VuYWJsZSB8fCAhdGhpcy5fZHJhZ2dpbmdJdGVtKSByZXR1cm47XG5cbiAgICAgICAgLy8gICAgU3RhcnQgZHJhZ2dpbmdcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnN0YXJ0TW92aW5nKCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKHRoaXMuX2RyYWdnaW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyKHRoaXMuX2RyYWdnaW5nSXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnpJbmRleCA9IHRoaXMuX2xhc3RaVmFsdWUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICAgIFN0YXR1cyBGbGFnc1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kcmFnUmVhZHkgPSBmYWxzZTtcblxuICAgICAgICAvLyAgICBFdmVudHNcbiAgICAgICAgdGhpcy5vbkRyYWdTdGFydC5lbWl0KHRoaXMuX2RyYWdnaW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5vbkRyYWdTdGFydEV2ZW50KCk7XG5cbiAgICAgICAgLy8gICAgWm9vbVxuICAgICAgICBpZiAodGhpcy5fem9vbU9uRHJhZykge1xuICAgICAgICAgICAgdGhpcy5fem9vbU91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfem9vbU91dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICdzY2FsZSgwLjUsIDAuNSknKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNldFpvb20oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhZyhlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PmRvY3VtZW50KS5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICg8YW55PmRvY3VtZW50KS5zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtb3VzZVBvcyA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICAgIHZhciBuZXdMID0gKG1vdXNlUG9zLmxlZnQgLSB0aGlzLl9wb3NPZmZzZXQubGVmdCk7XG4gICAgICAgIHZhciBuZXdUID0gKG1vdXNlUG9zLnRvcCAtIHRoaXMuX3Bvc09mZnNldC50b3ApO1xuXG4gICAgICAgIHZhciBpdGVtUG9zID0gdGhpcy5fZHJhZ2dpbmdJdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgZ3JpZFBvcyA9IHRoaXMuX2NhbGN1bGF0ZUdyaWRQb3NpdGlvbihuZXdMLCBuZXdUKTtcbiAgICAgICAgdmFyIGRpbXMgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGdyaWRQb3MgPSB0aGlzLl9maXhQb3NUb0JvdW5kc1goZ3JpZFBvcywgZGltcyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1koZ3JpZFBvcywgZGltcykpIHtcbiAgICAgICAgICAgIGdyaWRQb3MgPSB0aGlzLl9maXhQb3NUb0JvdW5kc1koZ3JpZFBvcywgZGltcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ3JpZFBvcy5jb2wgIT0gaXRlbVBvcy5jb2wgfHwgZ3JpZFBvcy5yb3cgIT0gaXRlbVBvcy5yb3cpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5zZXRHcmlkUG9zaXRpb24oZ3JpZFBvcywgdGhpcy5fZml4VG9HcmlkKTtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyUmVmLmluc3RhbmNlLnNldEdyaWRQb3NpdGlvbihncmlkUG9zKTtcblxuICAgICAgICAgICAgaWYgKFsndXAnLCAnZG93bicsICdsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZih0aGlzLmNhc2NhZGUpID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXhHcmlkQ29sbGlzaW9ucyhncmlkUG9zLCBkaW1zKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZChncmlkUG9zLCBkaW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fZml4VG9HcmlkKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0uc2V0UG9zaXRpb24obmV3TCwgbmV3VCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRHJhZy5lbWl0KHRoaXMuX2RyYWdnaW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5vbkRyYWdFdmVudCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc2l6ZShlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVzaXppbmcpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZVBvcyA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICAgIGNvbnN0IGl0ZW1Qb3MgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgaXRlbURpbXMgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0RGltZW5zaW9ucygpO1xuICAgICAgICBjb25zdCBlbmRDb3JuZXIgPSB7XG4gICAgICAgICAgICBsZWZ0OiBpdGVtUG9zLmxlZnQgKyBpdGVtRGltcy53aWR0aCxcbiAgICAgICAgICAgIHRvcDogaXRlbVBvcy50b3AgKyBpdGVtRGltcy5oZWlnaHQsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNpemVUb3AgPSB0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ3RvcCcpO1xuICAgICAgICBjb25zdCByZXNpemVCb3R0b20gPSB0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ2JvdHRvbScpO1xuICAgICAgICBjb25zdCByZXNpemVMZWZ0ID0gdGhpcy5fcmVzaXplRGlyZWN0aW9uLmluY2x1ZGVzKCdsZWZ0JylcbiAgICAgICAgY29uc3QgcmVzaXplUmlnaHQgPSB0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ3JpZ2h0Jyk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyB3aWR0aCBhbmQgaGVpZ2h0IGJhc2VkIHVwb24gcmVzaXplIGRpcmVjdGlvblxuICAgICAgICBsZXQgbmV3VyA9IHJlc2l6ZVJpZ2h0XG4gICAgICAgICAgICA/IChtb3VzZVBvcy5sZWZ0IC0gaXRlbVBvcy5sZWZ0ICsgMSlcbiAgICAgICAgICAgIDogcmVzaXplTGVmdFxuICAgICAgICAgICAgICAgID8gKGVuZENvcm5lci5sZWZ0IC0gbW91c2VQb3MubGVmdCArIDEpXG4gICAgICAgICAgICAgICAgOiBpdGVtRGltcy53aWR0aDtcbiAgICAgICAgbGV0IG5ld0ggPSByZXNpemVCb3R0b21cbiAgICAgICAgICAgID8gKG1vdXNlUG9zLnRvcCAtIGl0ZW1Qb3MudG9wICsgMSlcbiAgICAgICAgICAgIDogcmVzaXplVG9wXG4gICAgICAgICAgICAgICAgPyAoZW5kQ29ybmVyLnRvcCAtIG1vdXNlUG9zLnRvcCArIDEpXG4gICAgICAgICAgICAgICAgOiBpdGVtRGltcy5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKG5ld1cgPCB0aGlzLm1pbldpZHRoKVxuICAgICAgICAgICAgbmV3VyA9IHRoaXMubWluV2lkdGg7XG4gICAgICAgIGlmIChuZXdIIDwgdGhpcy5taW5IZWlnaHQpXG4gICAgICAgICAgICBuZXdIID0gdGhpcy5taW5IZWlnaHQ7XG4gICAgICAgIGlmIChuZXdXIDwgdGhpcy5fcmVzaXppbmdJdGVtLm1pbldpZHRoKVxuICAgICAgICAgICAgbmV3VyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5taW5XaWR0aDtcbiAgICAgICAgaWYgKG5ld0ggPCB0aGlzLl9yZXNpemluZ0l0ZW0ubWluSGVpZ2h0KVxuICAgICAgICAgICAgbmV3SCA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5taW5IZWlnaHQ7XG5cbiAgICAgICAgbGV0IG5ld1ggPSBpdGVtUG9zLmxlZnQ7XG4gICAgICAgIGxldCBuZXdZID0gaXRlbVBvcy50b3A7XG5cbiAgICAgICAgaWYgKHJlc2l6ZUxlZnQpXG4gICAgICAgICAgICBuZXdYID0gZW5kQ29ybmVyLmxlZnQgLSBuZXdXO1xuICAgICAgICBpZiAocmVzaXplVG9wKVxuICAgICAgICAgICAgbmV3WSA9IGVuZENvcm5lci50b3AgLSBuZXdIO1xuXG4gICAgICAgIGxldCBjYWxjU2l6ZSA9IHRoaXMuX2NhbGN1bGF0ZUdyaWRTaXplKG5ld1csIG5ld0gpO1xuICAgICAgICBjb25zdCBpdGVtU2l6ZSA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRTaXplKCk7XG4gICAgICAgIGNvbnN0IGlHcmlkUG9zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBib3R0b21SaWdodENvcm5lciA9IHtcbiAgICAgICAgICAgIGNvbDogaUdyaWRQb3MuY29sICsgaXRlbVNpemUueCxcbiAgICAgICAgICAgIHJvdzogaUdyaWRQb3Mucm93ICsgaXRlbVNpemUueSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdGFyZ2V0UG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBPYmplY3QuYXNzaWduKHt9LCBpR3JpZFBvcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZURpcmVjdGlvbi5pbmNsdWRlcygndG9wJykpXG4gICAgICAgICAgICB0YXJnZXRQb3Mucm93ID0gYm90dG9tUmlnaHRDb3JuZXIucm93IC0gY2FsY1NpemUueTtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZURpcmVjdGlvbi5pbmNsdWRlcygnbGVmdCcpKVxuICAgICAgICAgICAgdGFyZ2V0UG9zLmNvbCA9IGJvdHRvbVJpZ2h0Q29ybmVyLmNvbCAtIGNhbGNTaXplLng7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1godGFyZ2V0UG9zLCBjYWxjU2l6ZSkpXG4gICAgICAgICAgICBjYWxjU2l6ZSA9IHRoaXMuX2ZpeFNpemVUb0JvdW5kc1godGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1kodGFyZ2V0UG9zLCBjYWxjU2l6ZSkpXG4gICAgICAgICAgICBjYWxjU2l6ZSA9IHRoaXMuX2ZpeFNpemVUb0JvdW5kc1kodGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG5cbiAgICAgICAgY2FsY1NpemUgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZml4UmVzaXplKGNhbGNTaXplKTtcblxuICAgICAgICBpZiAoY2FsY1NpemUueCAhPSBpdGVtU2l6ZS54IHx8IGNhbGNTaXplLnkgIT0gaXRlbVNpemUueSkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldEdyaWRQb3NpdGlvbih0YXJnZXRQb3MsIHRoaXMuX2ZpeFRvR3JpZCk7XG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5pbnN0YW5jZS5zZXRHcmlkUG9zaXRpb24odGFyZ2V0UG9zKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zZXRTaXplKGNhbGNTaXplLCB0aGlzLl9maXhUb0dyaWQpO1xuICAgICAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJSZWYuaW5zdGFuY2Uuc2V0U2l6ZShjYWxjU2l6ZSk7XG5cbiAgICAgICAgICAgIGlmIChbJ3VwJywgJ2Rvd24nLCAnbGVmdCcsICdyaWdodCddLmluZGV4T2YodGhpcy5jYXNjYWRlKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnModGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQodGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2ZpeFRvR3JpZCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldERpbWVuc2lvbnMobmV3VywgbmV3SCk7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0uc2V0UG9zaXRpb24obmV3WCwgbmV3WSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUmVzaXplLmVtaXQodGhpcy5fcmVzaXppbmdJdGVtKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLm9uUmVzaXplRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kcmFnU3RvcChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICB2YXIgaXRlbVBvcyA9IHRoaXMuX2RyYWdnaW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0uc2V0R3JpZFBvc2l0aW9uKGl0ZW1Qb3MpO1xuICAgICAgICB0aGlzLl9hZGRUb0dyaWQodGhpcy5fZHJhZ2dpbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnN0b3BNb3ZpbmcoKTtcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLm9uRHJhZ1N0b3BFdmVudCgpO1xuICAgICAgICB0aGlzLm9uRHJhZ1N0b3AuZW1pdCh0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFuRHJhZygpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5fZW1pdE9uSXRlbUNoYW5nZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl96b29tT25EcmFnKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNldFpvb20oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc2l6ZVN0b3AoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1Jlc2l6aW5nKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgaXRlbURpbXMgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0uc2V0U2l6ZShpdGVtRGltcyk7XG5cbiAgICAgICAgY29uc3QgaXRlbVBvcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldEdyaWRQb3NpdGlvbihpdGVtUG9zKTtcblxuICAgICAgICB0aGlzLl9hZGRUb0dyaWQodGhpcy5fcmVzaXppbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnN0b3BNb3ZpbmcoKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLm9uUmVzaXplU3RvcEV2ZW50KCk7XG4gICAgICAgIHRoaXMub25SZXNpemVTdG9wLmVtaXQodGhpcy5fcmVzaXppbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jbGVhblJlc2l6ZSgpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5fZW1pdE9uSXRlbUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFuRHJhZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcG9zT2Zmc2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RyYWdSZWFkeSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFuUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNpemVEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVzaXplUmVhZHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYWxjdWxhdGVHcmlkU2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgd2lkdGggKz0gdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodDtcbiAgICAgICAgaGVpZ2h0ICs9IHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b207XG5cbiAgICAgICAgdmFyIHNpemV4ID0gTWF0aC5tYXgodGhpcy5taW5Db2xzLCBNYXRoLnJvdW5kKHdpZHRoIC8gKHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KSkpO1xuICAgICAgICB2YXIgc2l6ZXkgPSBNYXRoLm1heCh0aGlzLm1pblJvd3MsIE1hdGgucm91bmQoaGVpZ2h0IC8gKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWCh7IGNvbDogMSwgcm93OiAxIH0sIHsgeDogc2l6ZXgsIHk6IHNpemV5IH0pKSBzaXpleCA9IHRoaXMuX21heENvbHM7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHsgY29sOiAxLCByb3c6IDEgfSwgeyB4OiBzaXpleCwgeTogc2l6ZXkgfSkpIHNpemV5ID0gdGhpcy5fbWF4Um93cztcblxuICAgICAgICByZXR1cm4geyAneCc6IHNpemV4LCAneSc6IHNpemV5IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlR3JpZFBvc2l0aW9uKGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICB2YXIgY29sID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChsZWZ0IC8gKHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KSkgKyAxKTtcbiAgICAgICAgdmFyIHJvdyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQodG9wIC8gKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpICsgMSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1goeyBjb2w6IGNvbCwgcm93OiByb3cgfSwgeyB4OiAxLCB5OiAxIH0pKSBjb2wgPSB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWSh7IGNvbDogY29sLCByb3c6IHJvdyB9LCB7IHg6IDEsIHk6IDEgfSkpIHJvdyA9IHRoaXMuX21heFJvd3M7XG5cbiAgICAgICAgcmV0dXJuIHsgJ2NvbCc6IGNvbCwgJ3Jvdyc6IHJvdyB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hhc0dyaWRDb2xsaXNpb24ocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogYm9vbGVhbiB7XG4gICAgICAgIHZhciBwb3NpdGlvbnMgPSB0aGlzLl9nZXRDb2xsaXNpb25zKHBvcywgZGltcyk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9ucyA9PSBudWxsIHx8IHBvc2l0aW9ucy5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBwb3NpdGlvbnMuc29tZSgodjogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICEodiA9PT0gbnVsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldENvbGxpc2lvbnMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogQXJyYXk8TmdHcmlkSXRlbT4ge1xuICAgICAgICBpZiAodGhpcy5fYWxsb3dPdmVybGFwKSByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3QgcmV0dXJuczogQXJyYXk8TmdHcmlkSXRlbT4gPSBbXTtcblxuICAgICAgICBpZiAoIXBvcy5jb2wpIHsgcG9zLmNvbCA9IDE7IH1cbiAgICAgICAgaWYgKCFwb3Mucm93KSB7IHBvcy5yb3cgPSAxOyB9XG5cbiAgICAgICAgY29uc3QgbGVmdENvbCA9IHBvcy5jb2w7XG4gICAgICAgIGNvbnN0IHJpZ2h0Q29sID0gcG9zLmNvbCArIGRpbXMueDtcbiAgICAgICAgY29uc3QgdG9wUm93ID0gcG9zLnJvdztcbiAgICAgICAgY29uc3QgYm90dG9tUm93ID0gcG9zLnJvdyArIGRpbXMueTtcblxuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5mb3JFYWNoKChpdGVtSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbTogTmdHcmlkSXRlbSA9IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpO1xuXG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5kZWxldGUoaXRlbUlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1MZWZ0Q29sID0gaXRlbS5jb2w7XG4gICAgICAgICAgICBjb25zdCBpdGVtUmlnaHRDb2wgPSBpdGVtLmNvbCArIGl0ZW0uc2l6ZXg7XG4gICAgICAgICAgICBjb25zdCBpdGVtVG9wUm93ID0gaXRlbS5yb3c7XG4gICAgICAgICAgICBjb25zdCBpdGVtQm90dG9tUm93ID0gaXRlbS5yb3cgKyBpdGVtLnNpemV5O1xuXG4gICAgICAgICAgICBjb25zdCB3aXRoaW5Db2x1bW5zID0gbGVmdENvbCA8IGl0ZW1SaWdodENvbCAmJiBpdGVtTGVmdENvbCA8IHJpZ2h0Q29sO1xuICAgICAgICAgICAgY29uc3Qgd2l0aGluUm93cyA9IHRvcFJvdyA8IGl0ZW1Cb3R0b21Sb3cgJiYgaXRlbVRvcFJvdyA8IGJvdHRvbVJvdztcblxuICAgICAgICAgICAgaWYgKHdpdGhpbkNvbHVtbnMgJiYgd2l0aGluUm93cykge1xuICAgICAgICAgICAgICAgIHJldHVybnMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4R3JpZENvbGxpc2lvbnMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbGxpc2lvbnM6IEFycmF5PE5nR3JpZEl0ZW0+ID0gdGhpcy5fZ2V0Q29sbGlzaW9ucyhwb3MsIGRpbXMpO1xuICAgICAgICBpZiAoY29sbGlzaW9ucy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZm9yIChsZXQgY29sbGlzaW9uIG9mIGNvbGxpc2lvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGNvbGxpc2lvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGNvbGxpc2lvbi5nZXRTaXplKCk7XG4gICAgICAgICAgICBjb25zdCBpdGVtUG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBjb2xsaXNpb24uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBsZXQgbmV3SXRlbVBvczogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IGl0ZW1Qb3MuY29sLCByb3c6IGl0ZW1Qb3Mucm93IH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLnJvdyA9IHBvcy5yb3cgKyBkaW1zLnk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWShuZXdJdGVtUG9zLCBpdGVtRGltcykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbVBvcy5jb2wgPSBwb3MuY29sICsgZGltcy54O1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLnJvdyA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgIG5ld0l0ZW1Qb3MuY29sID0gcG9zLmNvbCArIGRpbXMueDtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKG5ld0l0ZW1Qb3MsIGl0ZW1EaW1zKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLmNvbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW1Qb3Mucm93ID0gcG9zLnJvdyArIGRpbXMueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbi5zZXRHcmlkUG9zaXRpb24obmV3SXRlbVBvcyk7XG5cbiAgICAgICAgICAgIHRoaXMuX2ZpeEdyaWRDb2xsaXNpb25zKG5ld0l0ZW1Qb3MsIGl0ZW1EaW1zKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChjb2xsaXNpb24pO1xuICAgICAgICAgICAgY29sbGlzaW9uLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maXhHcmlkQ29sbGlzaW9ucyhwb3MsIGRpbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Nhc2NhZGVHcmlkKHBvcz86IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltcz86IE5nR3JpZEl0ZW1TaXplKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkgcmV0dXJuO1xuICAgICAgICBpZiAoIXBvcyAhPT0gIWRpbXMpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhc2NhZGUgd2l0aCBvbmx5IHBvc2l0aW9uIGFuZCBub3QgZGltZW5zaW9ucycpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5fZHJhZ2dpbmdJdGVtICYmICFwb3MgJiYgIWRpbXMpIHtcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuX2RyYWdnaW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgIGRpbXMgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNSZXNpemluZyAmJiB0aGlzLl9yZXNpemluZ0l0ZW0gJiYgIXBvcyAmJiAhZGltcykge1xuICAgICAgICAgICAgcG9zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgZGltcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRTaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXRlbXNJbkdyaWQ6IE5nR3JpZEl0ZW1bXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQsIChpdGVtSWQ6IHN0cmluZykgPT4gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5jYXNjYWRlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICBpdGVtc0luR3JpZCA9IGl0ZW1zSW5HcmlkLnNvcnQoTmdHcmlkSGVscGVyLnNvcnRJdGVtc0J5UG9zaXRpb25WZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXN0Um93UGVyQ29sdW1uOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJbkdyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNGaXhlZCkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbURpbXM6IE5nR3JpZEl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Qb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvd2VzdFJvd0Zvckl0ZW06IG51bWJlciA9IGxvd2VzdFJvd1BlckNvbHVtbi5nZXQoaXRlbVBvcy5jb2wpIHx8IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMTsgaSA8IGl0ZW1EaW1zLng7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG93ZXN0Um93Rm9yQ29sdW1uID0gbG93ZXN0Um93UGVyQ29sdW1uLmdldChpdGVtUG9zLmNvbCArIGkpIHx8IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RSb3dGb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0Um93Rm9yQ29sdW1uLCBsb3dlc3RSb3dGb3JJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRDb2wgPSBpdGVtUG9zLmNvbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmlnaHRDb2wgPSBpdGVtUG9zLmNvbCArIGl0ZW1EaW1zLng7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyAmJiBkaW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aXRoaW5Db2x1bW5zID0gcmlnaHRDb2wgPiBwb3MuY29sICYmIGxlZnRDb2wgPCAocG9zLmNvbCArIGRpbXMueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXRoaW5Db2x1bW5zKSB7ICAgICAgICAgIC8vIElmIG91ciBlbGVtZW50IGlzIGluIG9uZSBvZiB0aGUgaXRlbSdzIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb29tQWJvdmVJdGVtID0gaXRlbURpbXMueSA8PSAocG9zLnJvdyAtIGxvd2VzdFJvd0Zvckl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyb29tQWJvdmVJdGVtKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGNhbid0IGZpdCBhYm92ZSBvdXIgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RSb3dGb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0Um93Rm9ySXRlbSwgcG9zLnJvdyArIGRpbXMueSk7ICAgLy8gU2V0IHRoZSBsb3dlc3Qgcm93IHRvIGJlIGJlbG93IGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSB7IGNvbDogaXRlbVBvcy5jb2wsIHJvdzogbG93ZXN0Um93Rm9ySXRlbSB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIFdoYXQgaWYgaXQncyBub3Qgd2l0aGluIGJvdW5kcyBZP1xuICAgICAgICAgICAgICAgICAgICBpZiAobG93ZXN0Um93Rm9ySXRlbSAhPSBpdGVtUG9zLnJvdyAmJiB0aGlzLl9pc1dpdGhpbkJvdW5kc1kobmV3UG9zLCBpdGVtRGltcykpIHsgLy8gSWYgdGhlIGl0ZW0gaXMgbm90IGFscmVhZHkgb24gdGhpcyByb3cgbW92ZSBpdCB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0R3JpZFBvc2l0aW9uKG5ld1Bvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub25DYXNjYWRlRXZlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtRGltcy54OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdFJvd1BlckNvbHVtbi5zZXQoaXRlbVBvcy5jb2wgKyBpLCBsb3dlc3RSb3dGb3JJdGVtICsgaXRlbURpbXMueSk7IC8vIFVwZGF0ZSB0aGUgbG93ZXN0IHJvdyB0byBiZSBiZWxvdyB0aGUgaXRlbVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaXRlbXNJbkdyaWQgPSBpdGVtc0luR3JpZC5zb3J0KE5nR3JpZEhlbHBlci5zb3J0SXRlbXNCeVBvc2l0aW9uSG9yaXpvbnRhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXN0Q29sdW1uUGVyUm93OiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJbkdyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbURpbXM6IE5nR3JpZEl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Qb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvd2VzdENvbHVtbkZvckl0ZW06IG51bWJlciA9IGxvd2VzdENvbHVtblBlclJvdy5nZXQoaXRlbVBvcy5yb3cpIHx8IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMTsgaSA8IGl0ZW1EaW1zLnk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvd2VzdE9mZnNldENvbHVtbjogbnVtYmVyID0gbG93ZXN0Q29sdW1uUGVyUm93LmdldChpdGVtUG9zLnJvdyArIGkpIHx8IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RDb2x1bW5Gb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0T2Zmc2V0Q29sdW1uLCBsb3dlc3RDb2x1bW5Gb3JJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvcFJvdyA9IGl0ZW1Qb3Mucm93O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Sb3cgPSBpdGVtUG9zLnJvdyArIGl0ZW1EaW1zLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyAmJiBkaW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aXRoaW5Sb3dzID0gYm90dG9tUm93ID4gcG9zLmNvbCAmJiB0b3BSb3cgPCAocG9zLmNvbCArIGRpbXMueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXRoaW5Sb3dzKSB7ICAgICAgICAgIC8vIElmIG91ciBlbGVtZW50IGlzIGluIG9uZSBvZiB0aGUgaXRlbSdzIHJvd3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb29tTmV4dFRvSXRlbSA9IGl0ZW1EaW1zLnggPD0gKHBvcy5jb2wgLSBsb3dlc3RDb2x1bW5Gb3JJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm9vbU5leHRUb0l0ZW0pIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGNhbid0IGZpdCBuZXh0IHRvIG91ciBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdENvbHVtbkZvckl0ZW0gPSBNYXRoLm1heChsb3dlc3RDb2x1bW5Gb3JJdGVtLCBwb3MuY29sICsgZGltcy54KTsgIC8vIFNldCB0aGUgbG93ZXN0IGNvbCB0byBiZSB0aGUgb3RoZXIgc2lkZSBvZiBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BvczogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IGxvd2VzdENvbHVtbkZvckl0ZW0sIHJvdzogaXRlbVBvcy5yb3cgfTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG93ZXN0Q29sdW1uRm9ySXRlbSAhPSBpdGVtUG9zLmNvbCAmJiB0aGlzLl9pc1dpdGhpbkJvdW5kc1gobmV3UG9zLCBpdGVtRGltcykpIHsgLy8gSWYgdGhlIGl0ZW0gaXMgbm90IGFscmVhZHkgb24gdGhpcyBjb2wgbW92ZSBpdCB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0R3JpZFBvc2l0aW9uKG5ld1Bvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub25DYXNjYWRlRXZlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtRGltcy55OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdENvbHVtblBlclJvdy5zZXQoaXRlbVBvcy5yb3cgKyBpLCBsb3dlc3RDb2x1bW5Gb3JJdGVtICsgaXRlbURpbXMueCk7IC8vIFVwZGF0ZSB0aGUgbG93ZXN0IGNvbCB0byBiZSBiZWxvdyB0aGUgaXRlbVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeEdyaWRQb3NpdGlvbihwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICBpZiAoIXRoaXMuX2hhc0dyaWRDb2xsaXNpb24ocG9zLCBkaW1zKSkgcmV0dXJuIHBvcztcblxuICAgICAgICBjb25zdCBtYXhSb3cgPSB0aGlzLl9tYXhSb3dzID09PSAwID8gdGhpcy5fZ2V0TWF4Um93KCkgOiB0aGlzLl9tYXhSb3dzO1xuICAgICAgICBjb25zdCBtYXhDb2wgPSB0aGlzLl9tYXhDb2xzID09PSAwID8gdGhpcy5fZ2V0TWF4Q29sKCkgOiB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBjb25zdCBuZXdQb3MgPSB7XG4gICAgICAgICAgICBjb2w6IHBvcy5jb2wsXG4gICAgICAgICAgICByb3c6IHBvcy5yb3csXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIGZpeExvb3A6XG4gICAgICAgICAgICBmb3IgKDsgbmV3UG9zLmNvbCA8PSBtYXhSb3c7KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblBhdGggPSB0aGlzLl9nZXRJdGVtc0luVmVydGljYWxQYXRoKG5ld1BvcywgZGltcywgbmV3UG9zLnJvdyk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRSb3cgPSBuZXdQb3Mucm93O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtc0luUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5yb3cgLSBuZXh0Um93ID49IGRpbXMueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zLnJvdyA9IG5leHRSb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBmaXhMb29wO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvdyA9IGl0ZW0ucm93ICsgaXRlbS5zaXpleTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWF4Um93IC0gbmV4dFJvdyA+PSBkaW1zLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zLnJvdyA9IG5leHRSb3c7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrIGZpeExvb3A7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmV3UG9zLmNvbCA9IE1hdGgubWF4KG5ld1Bvcy5jb2wgKyAxLCBNYXRoLm1pbi5hcHBseShNYXRoLCBpdGVtc0luUGF0aC5tYXAoKGl0ZW0pID0+IGl0ZW0uY29sICsgZGltcy54KSkpO1xuICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgZml4TG9vcDpcbiAgICAgICAgICAgIGZvciAoOyBuZXdQb3Mucm93IDw9IG1heFJvdzspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtc0luUGF0aCA9IHRoaXMuX2dldEl0ZW1zSW5Ib3Jpem9udGFsUGF0aChuZXdQb3MsIGRpbXMsIG5ld1Bvcy5jb2wpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sID0gbmV3UG9zLmNvbDtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJblBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29sIC0gbmV4dENvbCA+PSBkaW1zLngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5jb2wgPSBuZXh0Q29sO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZml4TG9vcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG5leHRDb2wgPSBpdGVtLmNvbCArIGl0ZW0uc2l6ZXg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1heENvbCAtIG5leHRDb2wgPj0gZGltcy54KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5jb2wgPSBuZXh0Q29sO1xuICAgICAgICAgICAgICAgICAgICBicmVhayBmaXhMb29wO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSBNYXRoLm1heChuZXdQb3Mucm93ICsgMSwgTWF0aC5taW4uYXBwbHkoTWF0aCwgaXRlbXNJblBhdGgubWFwKChpdGVtKSA9PiBpdGVtLnJvdyArIGRpbXMueSkpKTtcbiAgICAgICAgICAgICAgICBuZXdQb3MuY29sID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXdQb3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0SXRlbXNJbkhvcml6b250YWxQYXRoKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgc3RhcnRDb2x1bW46IG51bWJlciA9IDApOiBOZ0dyaWRJdGVtW10ge1xuICAgICAgICBjb25zdCBpdGVtc0luUGF0aDogTmdHcmlkSXRlbVtdID0gW107XG4gICAgICAgIGNvbnN0IHRvcFJvdzogbnVtYmVyID0gcG9zLnJvdyArIGRpbXMueSAtIDE7XG5cbiAgICAgICAgdGhpcy5faXRlbXNJbkdyaWQuZm9yRWFjaCgoaXRlbUlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKTtcbiAgICAgICAgICAgIGlmIChpdGVtLmNvbCArIGl0ZW0uc2l6ZXggLSAxIDwgc3RhcnRDb2x1bW4pIHsgcmV0dXJuOyB9ICAgIC8vIEl0ZW0gZmFsbHMgYWZ0ZXIgc3RhcnQgY29sdW1uXG4gICAgICAgICAgICBpZiAoaXRlbS5yb3cgPiB0b3BSb3cpIHsgcmV0dXJuOyB9ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGZhbGxzIGFib3ZlIHBhdGhcbiAgICAgICAgICAgIGlmIChpdGVtLnJvdyArIGl0ZW0uc2l6ZXkgLSAxIDwgcG9zLnJvdykgeyByZXR1cm47IH0gICAgICAgIC8vIEl0ZW0gZmFsbHMgYmVsb3cgcGF0aFxuICAgICAgICAgICAgaXRlbXNJblBhdGgucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zSW5QYXRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEl0ZW1zSW5WZXJ0aWNhbFBhdGgocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplLCBzdGFydFJvdzogbnVtYmVyID0gMCk6IE5nR3JpZEl0ZW1bXSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zSW5QYXRoOiBOZ0dyaWRJdGVtW10gPSBbXTtcbiAgICAgICAgY29uc3QgcmlnaHRDb2w6IG51bWJlciA9IHBvcy5jb2wgKyBkaW1zLnggLSAxO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zSW5HcmlkLmZvckVhY2goKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5yb3cgKyBpdGVtLnNpemV5IC0gMSA8IHN0YXJ0Um93KSB7IHJldHVybjsgfSAgIC8vIEl0ZW0gZmFsbHMgYWJvdmUgc3RhcnQgcm93XG4gICAgICAgICAgICBpZiAoaXRlbS5jb2wgPiByaWdodENvbCkgeyByZXR1cm47IH0gICAgICAgICAgICAgICAgICAgIC8vIEl0ZW0gZmFsbHMgYWZ0ZXIgcGF0aFxuICAgICAgICAgICAgaWYgKGl0ZW0uY29sICsgaXRlbS5zaXpleCAtIDEgPCBwb3MuY29sKSB7IHJldHVybjsgfSAgICAvLyBJdGVtIGZhbGxzIGJlZm9yZSBwYXRoXG4gICAgICAgICAgICBpdGVtc0luUGF0aC5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbXNJblBhdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNXaXRoaW5Cb3VuZHNYKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgYWxsb3dFeGNlc3NpdmVJdGVtczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhDb2xzID09IDAgfHwgKGFsbG93RXhjZXNzaXZlSXRlbXMgJiYgcG9zLmNvbCA9PSAxKSB8fCAocG9zLmNvbCArIGRpbXMueCAtIDEpIDw9IHRoaXMuX21heENvbHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4UG9zVG9Cb3VuZHNYKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1Qb3NpdGlvbiB7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIHBvcy5jb2wgPSBNYXRoLm1heCh0aGlzLl9tYXhDb2xzIC0gKGRpbXMueCAtIDEpLCAxKTtcbiAgICAgICAgICAgIHBvcy5yb3cgKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maXhTaXplVG9Cb3VuZHNYKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1gocG9zLCBkaW1zKSkge1xuICAgICAgICAgICAgZGltcy54ID0gTWF0aC5tYXgodGhpcy5fbWF4Q29scyAtIChwb3MuY29sIC0gMSksIDEpO1xuICAgICAgICAgICAgZGltcy55Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNXaXRoaW5Cb3VuZHNZKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgYWxsb3dFeGNlc3NpdmVJdGVtczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhSb3dzID09IDAgfHwgKGFsbG93RXhjZXNzaXZlSXRlbXMgJiYgcG9zLnJvdyA9PSAxKSB8fCAocG9zLnJvdyArIGRpbXMueSAtIDEpIDw9IHRoaXMuX21heFJvd3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4UG9zVG9Cb3VuZHNZKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1Qb3NpdGlvbiB7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIHBvcy5yb3cgPSBNYXRoLm1heCh0aGlzLl9tYXhSb3dzIC0gKGRpbXMueSAtIDEpLCAxKTtcbiAgICAgICAgICAgIHBvcy5jb2wrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFNpemVUb0JvdW5kc1kocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWShwb3MsIGRpbXMpKSB7XG4gICAgICAgICAgICBkaW1zLnkgPSBNYXRoLm1heCh0aGlzLl9tYXhSb3dzIC0gKHBvcy5yb3cgLSAxKSwgMSk7XG4gICAgICAgICAgICBkaW1zLngrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGltcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1dpdGhpbkJvdW5kcyhwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUsIGFsbG93RXhjZXNzaXZlSXRlbXM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHBvcywgZGltcywgYWxsb3dFeGNlc3NpdmVJdGVtcykgJiYgdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHBvcywgZGltcywgYWxsb3dFeGNlc3NpdmVJdGVtcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4UG9zVG9Cb3VuZHMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeFBvc1RvQm91bmRzWCh0aGlzLl9maXhQb3NUb0JvdW5kc1kocG9zLCBkaW1zKSwgZGltcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4U2l6ZVRvQm91bmRzKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeFNpemVUb0JvdW5kc1gocG9zLCB0aGlzLl9maXhTaXplVG9Cb3VuZHNZKHBvcywgZGltcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZFRvR3JpZChpdGVtOiBOZ0dyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIGxldCBwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGRpbXM6IE5nR3JpZEl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2hhc0dyaWRDb2xsaXNpb24ocG9zLCBkaW1zKSkge1xuICAgICAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnMocG9zLCBkaW1zKTtcbiAgICAgICAgICAgIHBvcyA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYWxsb3dPdmVybGFwKSB7XG4gICAgICAgICAgICBpdGVtLnpJbmRleCA9IHRoaXMuX2xhc3RaVmFsdWUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2l0ZW1zSW5HcmlkLmFkZChpdGVtLnVpZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlRnJvbUdyaWQoaXRlbTogTmdHcmlkSXRlbSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5kZWxldGUoaXRlbS51aWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVNpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgbGV0IG1heENvbDogbnVtYmVyID0gdGhpcy5fZ2V0TWF4Q29sKCk7XG4gICAgICAgIGxldCBtYXhSb3c6IG51bWJlciA9IHRoaXMuX2dldE1heFJvdygpO1xuXG4gICAgICAgIGlmIChtYXhDb2wgIT0gdGhpcy5fY3VyTWF4Q29sIHx8IG1heFJvdyAhPSB0aGlzLl9jdXJNYXhSb3cpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1ck1heENvbCA9IG1heENvbDtcbiAgICAgICAgICAgIHRoaXMuX2N1ck1heFJvdyA9IG1heFJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsICcxMDAlJyk7Ly8obWF4Q29sICogKHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KSkrJ3B4Jyk7XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudEJhc2VkRHluYW1pY1Jvd0hlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIChtYXhSb3cgKiAodGhpcy5yb3dIZWlnaHQgKyB0aGlzLm1hcmdpblRvcCArIHRoaXMubWFyZ2luQm90dG9tKSkgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1heFJvdygpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpdGVtc1Jvd3M6IG51bWJlcltdID0gQXJyYXkuZnJvbSh0aGlzLl9pdGVtc0luR3JpZCwgKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiAwO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucm93ICsgaXRlbS5zaXpleSAtIDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBpdGVtc1Jvd3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1heENvbCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpdGVtc0NvbHM6IG51bWJlcltdID0gQXJyYXkuZnJvbSh0aGlzLl9pdGVtc0luR3JpZCwgKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiAwO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY29sICsgaXRlbS5zaXpleCAtIDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBpdGVtc0NvbHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1vdXNlUG9zaXRpb24oZTogYW55KTogTmdHcmlkUmF3UG9zaXRpb24ge1xuICAgICAgICBpZiAoKCg8YW55PndpbmRvdykuVG91Y2hFdmVudCAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkgfHwgKGUudG91Y2hlcyB8fCBlLmNoYW5nZWRUb3VjaGVzKSkge1xuICAgICAgICAgICAgZSA9IGUudG91Y2hlcy5sZW5ndGggPiAwID8gZS50b3VjaGVzWzBdIDogZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlZlBvczogYW55ID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGxldCBsZWZ0OiBudW1iZXIgPSBlLmNsaWVudFggLSByZWZQb3MubGVmdDtcbiAgICAgICAgbGV0IHRvcDogbnVtYmVyID0gZS5jbGllbnRZIC0gcmVmUG9zLnRvcDtcblxuICAgICAgICBpZiAodGhpcy5jYXNjYWRlID09ICdkb3duJykgdG9wID0gcmVmUG9zLnRvcCArIHJlZlBvcy5oZWlnaHQgLSBlLmNsaWVudFk7XG4gICAgICAgIGlmICh0aGlzLmNhc2NhZGUgPT0gJ3JpZ2h0JykgbGVmdCA9IHJlZlBvcy5sZWZ0ICsgcmVmUG9zLndpZHRoIC0gZS5jbGllbnRYO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5fem9vbU9uRHJhZykge1xuICAgICAgICAgICAgbGVmdCAqPSAyO1xuICAgICAgICAgICAgdG9wICo9IDI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgIHRvcDogdG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0QWJzb2x1dGVNb3VzZVBvc2l0aW9uKGU6IGFueSk6IE5nR3JpZFJhd1Bvc2l0aW9uIHtcbiAgICAgICAgaWYgKCgoPGFueT53aW5kb3cpLlRvdWNoRXZlbnQgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHx8IChlLnRvdWNoZXMgfHwgZS5jaGFuZ2VkVG91Y2hlcykpIHtcbiAgICAgICAgICAgIGUgPSBlLnRvdWNoZXMubGVuZ3RoID4gMCA/IGUudG91Y2hlc1swXSA6IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogZS5jbGllbnRYLFxuICAgICAgICAgICAgdG9wOiBlLmNsaWVudFlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRDb250YWluZXJDb2x1bW5zKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoOiBudW1iZXIgPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IGl0ZW1XaWR0aDogbnVtYmVyID0gdGhpcy5jb2xXaWR0aCArIHRoaXMubWFyZ2luTGVmdCArIHRoaXMubWFyZ2luUmlnaHQ7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG1heFdpZHRoIC8gaXRlbVdpZHRoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRDb250YWluZXJSb3dzKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG1heEhlaWdodDogbnVtYmVyID0gd2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5tYXJnaW5Ub3AgLSB0aGlzLm1hcmdpbkJvdHRvbTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobWF4SGVpZ2h0IC8gKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFNjcmVlbk1hcmdpbigpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBtYXhXaWR0aDogbnVtYmVyID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCBpdGVtV2lkdGg6IG51bWJlciA9IHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0O1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigobWF4V2lkdGggLSAodGhpcy5fbWF4Q29scyAqIGl0ZW1XaWR0aCkpIC8gMik7O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEl0ZW1Gcm9tUG9zaXRpb24ocG9zaXRpb246IE5nR3JpZFJhd1Bvc2l0aW9uKTogTmdHcmlkSXRlbSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zSW5HcmlkLCAoaXRlbUlkOiBzdHJpbmcpID0+IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpKS5maW5kKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgY29uc3Qgc2l6ZTogTmdHcmlkSXRlbURpbWVuc2lvbnMgPSBpdGVtLmdldERpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgIGNvbnN0IHBvczogTmdHcmlkUmF3UG9zaXRpb24gPSBpdGVtLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbi5sZWZ0ID49IHBvcy5sZWZ0ICYmIHBvc2l0aW9uLmxlZnQgPCAocG9zLmxlZnQgKyBzaXplLndpZHRoKSAmJlxuICAgICAgICAgICAgcG9zaXRpb24udG9wID49IHBvcy50b3AgJiYgcG9zaXRpb24udG9wIDwgKHBvcy50b3AgKyBzaXplLmhlaWdodCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVBsYWNlaG9sZGVyKGl0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGl0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ0dyaWRQbGFjZWhvbGRlcik7XG4gICAgICAgIHZhciBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxOZ0dyaWRQbGFjZWhvbGRlcj4gPSBpdGVtLmNvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyUmVmID0gY29tcG9uZW50UmVmO1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlcjogTmdHcmlkUGxhY2Vob2xkZXIgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgICAgIHBsYWNlaG9sZGVyLnJlZ2lzdGVyR3JpZCh0aGlzKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuc2V0Q2FzY2FkZU1vZGUodGhpcy5jYXNjYWRlKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuc2V0R3JpZFBvc2l0aW9uKHsgY29sOiBwb3MuY29sLCByb3c6IHBvcy5yb3cgfSk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnNldFNpemUoeyB4OiBkaW1zLngsIHk6IGRpbXMueSB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9lbWl0T25JdGVtQ2hhbmdlKCkge1xuICAgICAgICBjb25zdCBpdGVtT3V0cHV0OiBhbnlbXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQpXG4gICAgICAgICAgICAubWFwKChpdGVtSWQ6IHN0cmluZykgPT4gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkpXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiAhIWl0ZW0pXG4gICAgICAgICAgICAubWFwKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiBpdGVtLmdldEV2ZW50T3V0cHV0KCkpO1xuXG4gICAgICAgIHRoaXMub25JdGVtQ2hhbmdlLmVtaXQoaXRlbU91dHB1dCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVmaW5lTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuX2RvY3VtZW50TW91c2Vtb3ZlJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudE1vdXNldXAkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAgICAgICB0aGlzLl9tb3VzZWRvd24kID0gZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZWRvd24nKTtcbiAgICAgICAgdGhpcy5fbW91c2Vtb3ZlJCA9IGZyb21FdmVudChlbGVtZW50LCAnbW91c2Vtb3ZlJyk7XG4gICAgICAgIHRoaXMuX21vdXNldXAkID0gZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZXVwJyk7XG4gICAgICAgIHRoaXMuX3RvdWNoc3RhcnQkID0gZnJvbUV2ZW50KGVsZW1lbnQsICd0b3VjaHN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuX3RvdWNobW92ZSQgPSBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNobW92ZScpO1xuICAgICAgICB0aGlzLl90b3VjaGVuZCQgPSBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNoZW5kJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW5hYmxlTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlZExpc3RlbmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbmFibGVNb3VzZUxpc3RlbmVycygpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZVRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbmFibGVkTGlzdGVuZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViczogU3Vic2NyaXB0aW9uKSA9PiBzdWJzLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICB0aGlzLl9lbmFibGVkTGlzdGVuZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1RvdWNoRGV2aWNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDA7XG4gICAgfTtcblxuICAgIHByaXZhdGUgX2VuYWJsZVRvdWNoTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b3VjaHN0YXJ0U3VicyA9IHRoaXMuX3RvdWNoc3RhcnQkLnN1YnNjcmliZSgoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5tb3VzZURvd25FdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCB0b3VjaG1vdmVTdWJzID0gdGhpcy5fdG91Y2htb3ZlJC5zdWJzY3JpYmUoKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMubW91c2VNb3ZlRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgdG91Y2hlbmRTdWJzID0gdGhpcy5fdG91Y2hlbmQkLnN1YnNjcmliZSgoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5tb3VzZVVwRXZlbnRIYW5kbGVyKGUpKTtcblxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgICB0b3VjaHN0YXJ0U3VicyxcbiAgICAgICAgICAgIHRvdWNobW92ZVN1YnMsXG4gICAgICAgICAgICB0b3VjaGVuZFN1YnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9lbmFibGVNb3VzZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRNb3VzZW1vdmVTdWJzID0gdGhpcy5fZG9jdW1lbnRNb3VzZW1vdmUkLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5tb3VzZU1vdmVFdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCBkb2N1bWVudE1vdXNldXBTdWJzID0gdGhpcy5fZG9jdW1lbnRNb3VzZXVwJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VVcEV2ZW50SGFuZGxlcihlKSk7XG4gICAgICAgIGNvbnN0IG1vdXNlZG93blN1YnMgPSB0aGlzLl9tb3VzZWRvd24kLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5tb3VzZURvd25FdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCBtb3VzZW1vdmVTdWJzID0gdGhpcy5fbW91c2Vtb3ZlJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VNb3ZlRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgbW91c2V1cFN1YnMgPSB0aGlzLl9tb3VzZXVwJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VVcEV2ZW50SGFuZGxlcihlKSk7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgZG9jdW1lbnRNb3VzZW1vdmVTdWJzLFxuICAgICAgICAgICAgZG9jdW1lbnRNb3VzZXVwU3VicyxcbiAgICAgICAgICAgIG1vdXNlZG93blN1YnMsXG4gICAgICAgICAgICBtb3VzZW1vdmVTdWJzLFxuICAgICAgICAgICAgbW91c2V1cFN1YnNcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ0dyaWQgfSBmcm9tICcuL05nR3JpZCc7XG5pbXBvcnQgeyBOZ0dyaWRJdGVtQ29uZmlnLCBOZ0dyaWRJdGVtRXZlbnQsIE5nR3JpZEl0ZW1Qb3NpdGlvbiwgTmdHcmlkSXRlbVNpemUsIE5nR3JpZFJhd1Bvc2l0aW9uLCBOZ0dyaWRJdGVtRGltZW5zaW9ucywgUmVzaXplSGFuZGxlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JTmdHcmlkJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBFdmVudEVtaXR0ZXIsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlcnMsIE9uSW5pdCwgT25EZXN0cm95LCBWaWV3Q29udGFpbmVyUmVmLCBPdXRwdXQsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmdHcmlkSXRlbV0nLFxuICAgIGlucHV0czogWydjb25maWc6IG5nR3JpZEl0ZW0nXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0dyaWRJdGVtIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIERvQ2hlY2sge1xuICAgIC8vIEV2ZW50IEVtaXR0ZXJzXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkl0ZW1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KGZhbHNlKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnU3RvcDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ0FueTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplU3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplU3RvcDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplQW55OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25DaGFuZ2VTdGFydDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25DaGFuZ2VTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25DaGFuZ2VBbnk6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBuZ0dyaWRJdGVtQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUNvbmZpZz4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1Db25maWc+KCk7XG5cbiAgICAvLyBEZWZhdWx0IGNvbmZpZ1xuICAgIHByaXZhdGUgc3RhdGljIENPTlNUX0RFRkFVTFRfQ09ORklHOiBOZ0dyaWRJdGVtQ29uZmlnID0ge1xuICAgICAgICB1aWQ6IG51bGwsXG4gICAgICAgIGNvbDogMSxcbiAgICAgICAgcm93OiAxLFxuICAgICAgICBzaXpleDogMSxcbiAgICAgICAgc2l6ZXk6IDEsXG4gICAgICAgIGRyYWdIYW5kbGU6IG51bGwsXG4gICAgICAgIHJlc2l6ZUhhbmRsZTogbnVsbCxcbiAgICAgICAgZml4ZWQ6IGZhbHNlLFxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgIHJlc2l6YWJsZTogdHJ1ZSxcbiAgICAgICAgYm9yZGVyU2l6ZTogMjUsXG4gICAgICAgIHJlc2l6ZURpcmVjdGlvbnM6IG51bGwsXG4gICAgfTtcblxuICAgIHB1YmxpYyBpc0ZpeGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzRHJhZ2dhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgaXNSZXNpemFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBtaW5XaWR0aDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgbWluSGVpZ2h0OiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyB1aWQ6IHN0cmluZyA9IG51bGw7XG5cbiAgICAvLyBQcml2YXRlIHZhcmlhYmxlc1xuICAgIHByaXZhdGUgX3BheWxvYWQ6IGFueTtcbiAgICBwcml2YXRlIF9jdXJyZW50UG9zaXRpb246IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IHsgY29sOiAxLCByb3c6IDEgfTtcbiAgICBwcml2YXRlIF9zaXplOiBOZ0dyaWRJdGVtU2l6ZSA9IHsgeDogMSwgeTogMSB9O1xuICAgIHByaXZhdGUgX2NvbmZpZyA9IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUc7XG4gICAgcHJpdmF0ZSBfdXNlckNvbmZpZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZHJhZ0hhbmRsZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3Jlc2l6ZUhhbmRsZTogUmVzaXplSGFuZGxlO1xuICAgIHByaXZhdGUgX2JvcmRlclNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9lbGVtV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIF9lbGVtSGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfZWxlbUxlZnQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9lbGVtVG9wOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYWRkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9kaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjtcbiAgICBwcml2YXRlIF9jYXNjYWRlTW9kZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX21heENvbHM6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWluQ29sczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9tYXhSb3dzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX21pblJvd3M6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfcmVzaXplRGlyZWN0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIF96SW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBzZXQgekluZGV4KHpJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCB6SW5kZXgudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuX3pJbmRleCA9IHpJbmRleDtcbiAgICB9XG5cbiAgICBnZXQgekluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl96SW5kZXg7XG4gICAgfVxuXG4gICAgLy8gW25nLWdyaWQtaXRlbV0gaGFuZGxlclxuICAgIHNldCBjb25maWcodjogTmdHcmlkSXRlbUNvbmZpZykge1xuICAgICAgICB0aGlzLl91c2VyQ29uZmlnID0gdjtcblxuICAgICAgICBjb25zdCBjb25maWdPYmplY3QgPSBPYmplY3QuYXNzaWduKHt9LCBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHLCB2KTtcbiAgICAgICAgZm9yIChsZXQgeCBpbiBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHKVxuICAgICAgICAgICAgaWYgKGNvbmZpZ09iamVjdFt4XSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbmZpZ09iamVjdFt4XSA9IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUdbeF07XG5cbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnT2JqZWN0KTtcblxuICAgICAgICBpZiAodGhpcy5fdXNlckNvbmZpZyAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlmZmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQodGhpcy5fdXNlckNvbmZpZykuY3JlYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX3VzZXJDb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fbmdHcmlkLmFkZEl0ZW0odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIGdldCBzaXpleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZS54O1xuICAgIH1cblxuICAgIGdldCBzaXpleSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZS55O1xuICAgIH1cblxuICAgIGdldCBjb2woKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2w7XG4gICAgfVxuXG4gICAgZ2V0IHJvdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdztcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudENvbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbDtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFJvdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdztcbiAgICB9XG5cbiAgICAvLyBDb25zdHJ1Y3RvclxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9kaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgICAgIHByaXZhdGUgX25nRWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgX25nR3JpZDogTmdHcmlkLFxuICAgICAgICBwdWJsaWMgY29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICkgeyB9XG5cbiAgICBwdWJsaWMgb25SZXNpemVTdGFydEV2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RhcnQuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25SZXNpemVBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VTdGFydC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgcHVibGljIG9uUmVzaXplRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25SZXNpemUuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25SZXNpemVBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG4gICAgfVxuICAgIHB1YmxpYyBvblJlc2l6ZVN0b3BFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZVN0b3AuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25SZXNpemVBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VTdG9wLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuXG4gICAgICAgIHRoaXMub25Db25maWdDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgICBwdWJsaWMgb25EcmFnU3RhcnRFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vbkRyYWdTdGFydC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkRyYWdBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VTdGFydC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgcHVibGljIG9uRHJhZ0V2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uRHJhZy5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkRyYWdBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG4gICAgfVxuICAgIHB1YmxpYyBvbkRyYWdTdG9wRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25EcmFnU3RvcC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkRyYWdBbnkuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VTdG9wLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuXG4gICAgICAgIHRoaXMub25Db25maWdDaGFuZ2VFdmVudCgpO1xuICAgIH1cbiAgICBwdWJsaWMgb25DYXNjYWRlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Db25maWdDaGFuZ2VFdmVudCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnZ3JpZC1pdGVtJyk7XG4gICAgICAgIGlmICh0aGlzLl9uZ0dyaWQuYXV0b1N0eWxlKSB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIC8vIEZvcmNlIGEgY29uZmlnIHVwZGF0ZSBpbiBjYXNlIHRoZXJlIGlzIG5vIGNvbmZpZyBhc3NpZ25lZFxuICAgICAgICB0aGlzLmNvbmZpZyA9IHRoaXMuX3VzZXJDb25maWc7XG4gICAgfVxuXG4gICAgLy8gUHVibGljIG1ldGhvZHNcbiAgICBwdWJsaWMgY2FuRHJhZyhlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dhYmxlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX2RyYWdIYW5kbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRIYW5kbGUodGhpcy5fZHJhZ0hhbmRsZSwgZS50YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGZpbmRIYW5kbGUoaGFuZGxlU2VsZWN0b3I6IHN0cmluZywgc3RhcnRFbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHRhcmdldEVsZW06IGFueSA9IHN0YXJ0RWxlbWVudDtcblxuICAgICAgICAgICAgd2hpbGUgKHRhcmdldEVsZW0gJiYgdGFyZ2V0RWxlbSAhPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50TWF0Y2hlcyh0YXJnZXRFbGVtLCBoYW5kbGVTZWxlY3RvcikpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbSA9IHRhcmdldEVsZW0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FuUmVzaXplKGU6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5pc1Jlc2l6YWJsZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZUhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9yZXNpemVIYW5kbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEhhbmRsZSh0aGlzLl9yZXNpemVIYW5kbGUsIGUudGFyZ2V0KSA/ICdib3R0b21yaWdodCcgOiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3Jlc2l6ZUhhbmRsZSAhPT0gJ29iamVjdCcpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICBjb25zdCByZXNpemVEaXJlY3Rpb25zID0gWyAnYm90dG9tcmlnaHQnLCAnYm90dG9tbGVmdCcsICd0b3ByaWdodCcsICd0b3BsZWZ0JywgJ3JpZ2h0JywgJ2xlZnQnLCAnYm90dG9tJywgJ3RvcCcgXTtcbiAgICAgICAgICAgIGZvciAobGV0IGRpcmVjdGlvbiBvZiByZXNpemVEaXJlY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiBpbiB0aGlzLl9yZXNpemVIYW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmluZEhhbmRsZSh0aGlzLl9yZXNpemVIYW5kbGVbZGlyZWN0aW9uXSwgZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib3JkZXJTaXplIDw9IDApIHJldHVybiBudWxsO1xuXG4gICAgICAgIGNvbnN0IG1vdXNlUG9zOiBOZ0dyaWRSYXdQb3NpdGlvbiA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG5cbiAgICAgICAgZm9yIChsZXQgZGlyZWN0aW9uIG9mIHRoaXMuX3Jlc2l6ZURpcmVjdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhblJlc2l6ZUluRGlyZWN0aW9uKGRpcmVjdGlvbiwgbW91c2VQb3MpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk1vdXNlTW92ZShlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5hdXRvU3R5bGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZ0dyaWQucmVzaXplRW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzaXplRGlyZWN0aW9uID0gdGhpcy5jYW5SZXNpemUoZSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgY3Vyc29yOiBzdHJpbmcgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChyZXNpemVEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICd0b3BsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICdud3NlLXJlc2l6ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdib3R0b21sZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICduZXN3LXJlc2l6ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICducy1yZXNpemUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgPSAnZXctcmVzaXplJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5kcmFnRW5hYmxlICYmIHRoaXMuY2FuRHJhZyhlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICdtb3ZlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsIGN1cnNvcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25nR3JpZC5kcmFnRW5hYmxlICYmIHRoaXMuY2FuRHJhZyhlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsICdtb3ZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2N1cnNvcicsICdkZWZhdWx0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hZGRlZCkgdGhpcy5fbmdHcmlkLnJlbW92ZUl0ZW0odGhpcyk7XG4gICAgfVxuXG4gICAgLy8gICAgR2V0dGVyc1xuICAgIHB1YmxpYyBnZXRFbGVtZW50KCk6IEVsZW1lbnRSZWYge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmdFbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RHJhZ0hhbmRsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHJhZ0hhbmRsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmVzaXplSGFuZGxlKCk6IFJlc2l6ZUhhbmRsZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNpemVIYW5kbGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERpbWVuc2lvbnMoKTogTmdHcmlkSXRlbURpbWVuc2lvbnMge1xuICAgICAgICByZXR1cm4geyAnd2lkdGgnOiB0aGlzLl9lbGVtV2lkdGgsICdoZWlnaHQnOiB0aGlzLl9lbGVtSGVpZ2h0IH07XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNpemUoKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKTogTmdHcmlkUmF3UG9zaXRpb24ge1xuICAgICAgICByZXR1cm4geyAnbGVmdCc6IHRoaXMuX2VsZW1MZWZ0LCAndG9wJzogdGhpcy5fZWxlbVRvcCB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRHcmlkUG9zaXRpb24oKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQb3NpdGlvbjtcbiAgICB9XG5cbiAgICAvLyAgICBTZXR0ZXJzXG4gICAgcHVibGljIHNldENvbmZpZyhjb25maWc6IE5nR3JpZEl0ZW1Db25maWcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIHRoaXMuX3BheWxvYWQgPSBjb25maWcucGF5bG9hZDtcbiAgICAgICAgdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbCA9IGNvbmZpZy5jb2wgPyBjb25maWcuY29sIDogTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRy5jb2w7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3cgPSBjb25maWcucm93ID8gY29uZmlnLnJvdyA6IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcucm93O1xuICAgICAgICB0aGlzLl9zaXplLnggPSBjb25maWcuc2l6ZXggPyBjb25maWcuc2l6ZXggOiBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHLnNpemV4O1xuICAgICAgICB0aGlzLl9zaXplLnkgPSBjb25maWcuc2l6ZXkgPyBjb25maWcuc2l6ZXkgOiBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHLnNpemV5O1xuICAgICAgICB0aGlzLl9kcmFnSGFuZGxlID0gY29uZmlnLmRyYWdIYW5kbGU7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUhhbmRsZSA9IGNvbmZpZy5yZXNpemVIYW5kbGU7XG4gICAgICAgIHRoaXMuX2JvcmRlclNpemUgPSBjb25maWcuYm9yZGVyU2l6ZTtcbiAgICAgICAgdGhpcy5pc0RyYWdnYWJsZSA9IGNvbmZpZy5kcmFnZ2FibGUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuaXNSZXNpemFibGUgPSBjb25maWcucmVzaXphYmxlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRml4ZWQgPSBjb25maWcuZml4ZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZURpcmVjdGlvbnMgPSBjb25maWcucmVzaXplRGlyZWN0aW9ucyB8fCB0aGlzLl9uZ0dyaWQucmVzaXplRGlyZWN0aW9ucztcblxuICAgICAgICB0aGlzLl9tYXhDb2xzID0gIWlzTmFOKGNvbmZpZy5tYXhDb2xzKSAmJiBpc0Zpbml0ZShjb25maWcubWF4Q29scykgPyBjb25maWcubWF4Q29scyA6IDA7XG4gICAgICAgIHRoaXMuX21pbkNvbHMgPSAhaXNOYU4oY29uZmlnLm1pbkNvbHMpICYmIGlzRmluaXRlKGNvbmZpZy5taW5Db2xzKSA/IGNvbmZpZy5taW5Db2xzIDogMDtcbiAgICAgICAgdGhpcy5fbWF4Um93cyA9ICFpc05hTihjb25maWcubWF4Um93cykgJiYgaXNGaW5pdGUoY29uZmlnLm1heFJvd3MpID8gY29uZmlnLm1heFJvd3MgOiAwO1xuICAgICAgICB0aGlzLl9taW5Sb3dzID0gIWlzTmFOKGNvbmZpZy5taW5Sb3dzKSAmJiBpc0Zpbml0ZShjb25maWcubWluUm93cykgPyBjb25maWcubWluUm93cyA6IDA7XG5cbiAgICAgICAgdGhpcy5taW5XaWR0aCA9ICFpc05hTihjb25maWcubWluV2lkdGgpICYmIGlzRmluaXRlKGNvbmZpZy5taW5XaWR0aCkgPyBjb25maWcubWluV2lkdGggOiAwO1xuICAgICAgICB0aGlzLm1pbkhlaWdodCA9ICFpc05hTihjb25maWcubWluSGVpZ2h0KSAmJiBpc0Zpbml0ZShjb25maWcubWluSGVpZ2h0KSA/IGNvbmZpZy5taW5IZWlnaHQgOiAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9taW5Db2xzID4gMCAmJiB0aGlzLl9tYXhDb2xzID4gMCAmJiB0aGlzLl9taW5Db2xzID4gdGhpcy5fbWF4Q29scykgdGhpcy5fbWluQ29scyA9IDA7XG4gICAgICAgIGlmICh0aGlzLl9taW5Sb3dzID4gMCAmJiB0aGlzLl9tYXhSb3dzID4gMCAmJiB0aGlzLl9taW5Sb3dzID4gdGhpcy5fbWF4Um93cykgdGhpcy5fbWluUm93cyA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FkZGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9uZ0dyaWQudXBkYXRlSXRlbSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NpemUgPSB0aGlzLmZpeFJlc2l6ZSh0aGlzLl9zaXplKTtcblxuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0RvQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9kaWZmZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlczogYW55ID0gdGhpcy5fZGlmZmVyLmRpZmYodGhpcy5fdXNlckNvbmZpZyk7XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTaXplKG5ld1NpemU6IE5nR3JpZEl0ZW1TaXplLCB1cGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIG5ld1NpemUgPSB0aGlzLmZpeFJlc2l6ZShuZXdTaXplKTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ld1NpemU7XG4gICAgICAgIGlmICh1cGRhdGUpIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuXG4gICAgICAgIHRoaXMub25JdGVtQ2hhbmdlLmVtaXQodGhpcy5nZXRFdmVudE91dHB1dCgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0R3JpZFBvc2l0aW9uKGdyaWRQb3NpdGlvbjogTmdHcmlkSXRlbVBvc2l0aW9uLCB1cGRhdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9IGdyaWRQb3NpdGlvbjtcbiAgICAgICAgaWYgKHVwZGF0ZSkgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuXG4gICAgICAgIHRoaXMub25JdGVtQ2hhbmdlLmVtaXQodGhpcy5nZXRFdmVudE91dHB1dCgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRPdXRwdXQoKTogTmdHcmlkSXRlbUV2ZW50IHtcbiAgICAgICAgcmV0dXJuIDxOZ0dyaWRJdGVtRXZlbnQ+e1xuICAgICAgICAgICAgdWlkOiB0aGlzLnVpZCxcbiAgICAgICAgICAgIHBheWxvYWQ6IHRoaXMuX3BheWxvYWQsXG4gICAgICAgICAgICBjb2w6IHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2wsXG4gICAgICAgICAgICByb3c6IHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3csXG4gICAgICAgICAgICBzaXpleDogdGhpcy5fc2l6ZS54LFxuICAgICAgICAgICAgc2l6ZXk6IHRoaXMuX3NpemUueSxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9lbGVtV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuX2VsZW1IZWlnaHQsXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLl9lbGVtTGVmdCxcbiAgICAgICAgICAgIHRvcDogdGhpcy5fZWxlbVRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX2Nhc2NhZGVNb2RlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHggKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB5ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCB4ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgeSArICdweCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHggKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCB5ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbGVtTGVmdCA9IHg7XG4gICAgICAgIHRoaXMuX2VsZW1Ub3AgPSB5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDYXNjYWRlTW9kZShjYXNjYWRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FzY2FkZU1vZGUgPSBjYXNjYWRlO1xuICAgICAgICBzd2l0Y2ggKGNhc2NhZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgdGhpcy5fZWxlbUxlZnQgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0aGlzLl9lbGVtVG9wICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIHRoaXMuX2VsZW1MZWZ0ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgdGhpcy5fZWxlbVRvcCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCB0aGlzLl9lbGVtTGVmdCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIHRoaXMuX2VsZW1Ub3AgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldERpbWVuc2lvbnModzogbnVtYmVyLCBoOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHcgPCB0aGlzLm1pbldpZHRoKSB3ID0gdGhpcy5taW5XaWR0aDtcbiAgICAgICAgaWYgKGggPCB0aGlzLm1pbkhlaWdodCkgaCA9IHRoaXMubWluSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdyArICdweCcpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBoICsgJ3B4Jyk7XG5cbiAgICAgICAgdGhpcy5fZWxlbVdpZHRoID0gdztcbiAgICAgICAgdGhpcy5fZWxlbUhlaWdodCA9IGg7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0TW92aW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdtb3ZpbmcnKTtcbiAgICAgICAgY29uc3Qgc3R5bGU6IGFueSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGlmICh0aGlzLl9uZ0dyaWQuYXV0b1N0eWxlKSB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd6LWluZGV4JywgKHBhcnNlSW50KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3otaW5kZXgnKSkgKyAxKS50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcE1vdmluZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbW92aW5nJyk7XG4gICAgICAgIGNvbnN0IHN0eWxlOiBhbnkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmF1dG9TdHlsZSkgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsIChwYXJzZUludChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd6LWluZGV4JykpIC0gMSkudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlY2FsY3VsYXRlU2VsZigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZml4UmVzaXplKG5ld1NpemU6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgbmV3U2l6ZS54ID4gdGhpcy5fbWF4Q29scykgbmV3U2l6ZS54ID0gdGhpcy5fbWF4Q29scztcbiAgICAgICAgaWYgKHRoaXMuX21heFJvd3MgPiAwICYmIG5ld1NpemUueSA+IHRoaXMuX21heFJvd3MpIG5ld1NpemUueSA9IHRoaXMuX21heFJvd3M7XG5cbiAgICAgICAgaWYgKHRoaXMuX21pbkNvbHMgPiAwICYmIG5ld1NpemUueCA8IHRoaXMuX21pbkNvbHMpIG5ld1NpemUueCA9IHRoaXMuX21pbkNvbHM7XG4gICAgICAgIGlmICh0aGlzLl9taW5Sb3dzID4gMCAmJiBuZXdTaXplLnkgPCB0aGlzLl9taW5Sb3dzKSBuZXdTaXplLnkgPSB0aGlzLl9taW5Sb3dzO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1XaWR0aCA9IChuZXdTaXplLnggKiB0aGlzLl9uZ0dyaWQuY29sV2lkdGgpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCkgKiAobmV3U2l6ZS54IC0gMSkpO1xuICAgICAgICBpZiAoaXRlbVdpZHRoIDwgdGhpcy5taW5XaWR0aCkgbmV3U2l6ZS54ID0gTWF0aC5jZWlsKCh0aGlzLm1pbldpZHRoICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQpIC8gKHRoaXMuX25nR3JpZC5jb2xXaWR0aCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0KSk7XG5cbiAgICAgICAgY29uc3QgaXRlbUhlaWdodCA9IChuZXdTaXplLnkgKiB0aGlzLl9uZ0dyaWQucm93SGVpZ2h0KSArICgodGhpcy5fbmdHcmlkLm1hcmdpblRvcCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20pICogKG5ld1NpemUueSAtIDEpKTtcbiAgICAgICAgaWYgKGl0ZW1IZWlnaHQgPCB0aGlzLm1pbkhlaWdodCkgbmV3U2l6ZS55ID0gTWF0aC5jZWlsKCh0aGlzLm1pbkhlaWdodCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20gKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wKSAvICh0aGlzLl9uZ0dyaWQucm93SGVpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSArIHRoaXMuX25nR3JpZC5tYXJnaW5Ub3ApKTtcblxuICAgICAgICByZXR1cm4gbmV3U2l6ZTtcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgICBwcml2YXRlIGVsZW1lbnRNYXRjaGVzKGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGVsZW1lbnQubWF0Y2hlcykgcmV0dXJuIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudC5tc01hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbGVtZW50Lm1vek1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoIWVsZW1lbnQuZG9jdW1lbnQgfHwgIWVsZW1lbnQub3duZXJEb2N1bWVudCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoZXM6IGFueSA9IChlbGVtZW50LmRvY3VtZW50IHx8IGVsZW1lbnQub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIGxldCBpOiBudW1iZXIgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gZWxlbWVudCkgeyB9XG4gICAgICAgIHJldHVybiBpID4gLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjYWxjdWxhdGVQb3NpdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgeDogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5jb2xXaWR0aCArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0KSAqICh0aGlzLl9jdXJyZW50UG9zaXRpb24uY29sIC0gMSkgKyB0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5zY3JlZW5NYXJnaW47XG4gICAgICAgIGNvbnN0IHk6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQucm93SGVpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblRvcCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20pICogKHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3cgLSAxKSArIHRoaXMuX25nR3JpZC5tYXJnaW5Ub3A7XG5cbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih4LCB5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplLnggPCB0aGlzLl9uZ0dyaWQubWluQ29scykgdGhpcy5fc2l6ZS54ID0gdGhpcy5fbmdHcmlkLm1pbkNvbHM7XG4gICAgICAgIGlmICh0aGlzLl9zaXplLnkgPCB0aGlzLl9uZ0dyaWQubWluUm93cykgdGhpcy5fc2l6ZS55ID0gdGhpcy5fbmdHcmlkLm1pblJvd3M7XG5cbiAgICAgICAgY29uc3QgbmV3V2lkdGg6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQuY29sV2lkdGggKiB0aGlzLl9zaXplLngpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCkgKiAodGhpcy5fc2l6ZS54IC0gMSkpO1xuICAgICAgICBjb25zdCBuZXdIZWlnaHQ6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQucm93SGVpZ2h0ICogdGhpcy5fc2l6ZS55KSArICgodGhpcy5fbmdHcmlkLm1hcmdpblRvcCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20pICogKHRoaXMuX3NpemUueSAtIDEpKTtcblxuICAgICAgICBjb25zdCB3OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLm1pbldpZHRoLCB0aGlzLl9uZ0dyaWQubWluV2lkdGgsIG5ld1dpZHRoKTtcbiAgICAgICAgY29uc3QgaDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5taW5IZWlnaHQsIHRoaXMuX25nR3JpZC5taW5IZWlnaHQsIG5ld0hlaWdodCk7XG5cbiAgICAgICAgdGhpcy5zZXREaW1lbnNpb25zKHcsIGgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1vdXNlUG9zaXRpb24oZTogYW55KTogTmdHcmlkUmF3UG9zaXRpb24ge1xuICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC50b3VjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBvZTogYW55ID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgICAgZSA9IG9lLnRvdWNoZXMubGVuZ3RoID8gb2UudG91Y2hlc1swXSA6IChvZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPyBvZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGUudG91Y2hlcykge1xuICAgICAgICAgICAgZSA9IGUudG91Y2hlcy5sZW5ndGggPyBlLnRvdWNoZXNbMF0gOiAoZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPyBlLmNoYW5nZWRUb3VjaGVzWzBdIDogZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvbnN0IHJlZlBvczogTmdHcmlkUmF3UG9zaXRpb24gPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGUuY2xpZW50WCAtIHJlZlBvcy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBlLmNsaWVudFkgLSByZWZQb3MudG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYXBwbHlDaGFuZ2VzKGNoYW5nZXM6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjaGFuZ2VDaGVjayA9IChyZWNvcmQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XSAhPT0gcmVjb3JkLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XSA9IHJlY29yZC5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbShjaGFuZ2VDaGVjayk7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKGNoYW5nZUNoZWNrKTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZDogYW55KSA9PiB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jb25maWdbcmVjb3JkLmtleV07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNldENvbmZpZyh0aGlzLl9jb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoYW5nZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvbmZpZ0NoYW5nZUV2ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5fdXNlckNvbmZpZyA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zaXpleCA9IHRoaXMuX3VzZXJDb25maWcuc2l6ZXggPSB0aGlzLl9zaXplLng7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5zaXpleSA9IHRoaXMuX3VzZXJDb25maWcuc2l6ZXkgPSB0aGlzLl9zaXplLnk7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5jb2wgPSB0aGlzLl91c2VyQ29uZmlnLmNvbCA9IHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2w7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5yb3cgPSB0aGlzLl91c2VyQ29uZmlnLnJvdyA9IHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3c7XG4gICAgICAgIHRoaXMubmdHcmlkSXRlbUNoYW5nZS5lbWl0KHRoaXMuX3VzZXJDb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuUmVzaXplSW5EaXJlY3Rpb24oZGlyZWN0aW9uOiBzdHJpbmcsIG1vdXNlUG9zOiBOZ0dyaWRSYXdQb3NpdGlvbik6IGJvb2xlYW4ge1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fZWxlbVdpZHRoICYmIG1vdXNlUG9zLmxlZnQgPiB0aGlzLl9lbGVtV2lkdGggLSB0aGlzLl9ib3JkZXJTaXplXG4gICAgICAgICAgICAgICAgICAgICYmIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2VsZW1IZWlnaHQgJiYgbW91c2VQb3MudG9wID4gdGhpcy5fZWxlbUhlaWdodCAtIHRoaXMuX2JvcmRlclNpemU7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6aW5kZW50XG4gICAgICAgICAgICBjYXNlICdib3R0b21sZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2JvcmRlclNpemUgJiYgbW91c2VQb3MudG9wIDwgdGhpcy5fZWxlbUhlaWdodFxuICAgICAgICAgICAgICAgICAgICAmJiBtb3VzZVBvcy50b3AgPiB0aGlzLl9lbGVtSGVpZ2h0IC0gdGhpcy5fYm9yZGVyU2l6ZTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTppbmRlbnRcbiAgICAgICAgICAgIGNhc2UgJ3RvcHJpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2VsZW1XaWR0aCAmJiBtb3VzZVBvcy5sZWZ0ID4gdGhpcy5fZWxlbVdpZHRoIC0gdGhpcy5fYm9yZGVyU2l6ZVxuICAgICAgICAgICAgICAgICAgICAmJiBtb3VzZVBvcy50b3AgPCB0aGlzLl9ib3JkZXJTaXplOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmluZGVudFxuICAgICAgICAgICAgY2FzZSAndG9wbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLmxlZnQgPCB0aGlzLl9ib3JkZXJTaXplICYmIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2JvcmRlclNpemU7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLmxlZnQgPCB0aGlzLl9lbGVtV2lkdGggJiYgbW91c2VQb3MubGVmdCA+IHRoaXMuX2VsZW1XaWR0aCAtIHRoaXMuX2JvcmRlclNpemU7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2JvcmRlclNpemU7XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy50b3AgPCB0aGlzLl9lbGVtSGVpZ2h0ICYmIG1vdXNlUG9zLnRvcCA+IHRoaXMuX2VsZW1IZWlnaHQgLSB0aGlzLl9ib3JkZXJTaXplO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MudG9wIDwgdGhpcy5fYm9yZGVyU2l6ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nR3JpZCB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvTmdHcmlkJztcbmltcG9ydCB7IE5nR3JpZEl0ZW0gfSBmcm9tICcuLi9kaXJlY3RpdmVzL05nR3JpZEl0ZW0nO1xuaW1wb3J0IHsgTmdHcmlkUGxhY2Vob2xkZXIgfSBmcm9tICcuLi9jb21wb25lbnRzL05nR3JpZFBsYWNlaG9sZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiAgICAgWyBOZ0dyaWQsIE5nR3JpZEl0ZW0sIE5nR3JpZFBsYWNlaG9sZGVyIF0sXG4gIGVudHJ5Q29tcG9uZW50czogIFsgTmdHcmlkUGxhY2Vob2xkZXIgXSxcbiAgZXhwb3J0czogICAgICAgICAgWyBOZ0dyaWQsIE5nR3JpZEl0ZW0gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ0dyaWRNb2R1bGUge31cbiJdLCJuYW1lcyI6WyJOZ0dyaWRIZWxwZXIuZ2VuZXJhdGVVdWlkIiwiTmdHcmlkSGVscGVyLnNvcnRJdGVtc0J5UG9zaXRpb25WZXJ0aWNhbCIsIk5nR3JpZEhlbHBlci5zb3J0SXRlbXNCeVBvc2l0aW9uSG9yaXpvbnRhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBO0lBQ0MsT0FBTyxzQ0FBc0MsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBQztRQUN4RSxxQkFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLG1CQUFFLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN0QixDQUFDLENBQUM7Q0FDSDs7Ozs7O0FBRUQsdUNBQThDLENBQWEsRUFBRSxDQUFhO0lBQ3pFLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFO1FBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FBRTtJQUM5QyxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUNyQjs7Ozs7O0FBRUQscUNBQTRDLENBQWEsRUFBRSxDQUFhO0lBQ3ZFLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFO1FBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FBRTtJQUM5QyxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUNyQjs7Ozs7O0FDZkQ7Ozs7O0lBWUksWUFBb0IsS0FBaUIsRUFBVSxTQUFtQjtRQUE5QyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FB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O1FBQ3BDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5RSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFOUUsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlFLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUU5RSx1QkFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pJLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENB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QUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztZQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzdFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFFN0UsdUJBQU0sUUFBUSxHQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlJLHVCQUFNLFNBQVMsR0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoSix1QkFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNFLHVCQUFNLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFOUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUdyQixpQkFBaUIsQ0FBQyxDQUFNO1FBQzVCLElBQUksQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUM1Qyx1QkFBTSxFQUFFLEdBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNoQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pHO2FBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ2xCLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0Y7UUFHRCx1QkFBTSxNQUFNLEdBQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFbkYsT0FBTztZQUNILElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJO1lBQzdCLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHO1NBQzlCLENBQUM7Ozs7OztJQUdFLGFBQWEsQ0FBQyxPQUFZO1FBQzlCLHFCQUFJLE9BQU8sR0FBWSxLQUFLLENBQUM7UUFDN0IsdUJBQU0sV0FBVyxHQUFHLENBQUMsTUFBVztZQUM1QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQy9DLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDbEI7U0FDSixDQUFDO1FBQ0YsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFXO1lBQ25DLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25DLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDaEM7UUFFRCxPQUFPLE9BQU8sQ0FBQzs7Ozs7SUFHWCxtQkFBbUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUk7WUFBRSxPQUFPO1FBRXRDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7UUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQztRQUNwRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztJQUd6QyxvQkFBb0IsQ0FBQyxTQUFpQixFQUFFLFFBQTJCO1FBQ3ZFLFFBQVEsU0FBUztZQUNiLEtBQUssYUFBYTtnQkFDZCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVc7dUJBQ3JGLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNqRyxLQUFLLFlBQVk7Z0JBQ2IsT0FBTyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVzt1QkFDbkUsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDOUQsS0FBSyxVQUFVO2dCQUNYLE9BQU8sUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVzt1QkFDckYsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzNDLEtBQUssU0FBUztnQkFDVixPQUFPLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDL0UsS0FBSyxPQUFPO2dCQUNSLE9BQU8sUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2pHLEtBQUssTUFBTTtnQkFDUCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUM1QyxLQUFLLFFBQVE7Z0JBQ1QsT0FBTyxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDakcsS0FBSyxLQUFLO2dCQUNOLE9BQU8sUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzNDO2dCQUNJLE9BQU8sS0FBSyxDQUFDO1NBQ3BCOzs7a0NBNWtCbUQ7SUFDcEQsR0FBRyxFQUFFLElBQUk7SUFDVCxHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLEVBQUUsQ0FBQztJQUNSLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLEtBQUssRUFBRSxLQUFLO0lBQ1osU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTLEVBQUUsSUFBSTtJQUNmLFVBQVUsRUFBRSxFQUFFO0lBQ2QsZ0JBQWdCLEVBQUUsSUFBSTtDQUN6Qjs7WUFuQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUNqQzs7OztZQUx3RSxlQUFlO1lBQXBFLFVBQVU7WUFBRSxTQUFTO1lBRmhDLE1BQU07WUFFOEYsZ0JBQWdCOzs7MkJBUXhILE1BQU07MEJBQ04sTUFBTTtxQkFDTixNQUFNO3lCQUNOLE1BQU07d0JBQ04sTUFBTTs0QkFDTixNQUFNO3VCQUNOLE1BQU07MkJBQ04sTUFBTTswQkFDTixNQUFNOzRCQUNOLE1BQU07dUJBQ04sTUFBTTsyQkFDTixNQUFNOzBCQUNOLE1BQU07K0JBQ04sTUFBTTs7Ozs7OztBQ3ZCWDs7O1lBS0MsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBTSxDQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLENBQUU7Z0JBQzNELGVBQWUsRUFBRyxDQUFFLGlCQUFpQixDQUFFO2dCQUN2QyxPQUFPLEVBQVcsQ0FBRSxNQUFNLEVBQUUsVUFBVSxDQUFFO2FBQ3pDOzs7Ozs7Ozs7Ozs7Ozs7In0=