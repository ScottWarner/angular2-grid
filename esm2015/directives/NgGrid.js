/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Renderer, EventEmitter, ComponentFactoryResolver, KeyValueDiffers, Output } from '@angular/core';
import * as NgGridHelper from '../helpers/NgGridHelpers';
import { NgGridPlaceholder } from '../components/NgGridPlaceholder';
import { fromEvent } from 'rxjs';
export class NgGrid {
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
        const /** @type {?} */ uid = NgGridHelper.generateUuid();
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
                itemsInGrid = itemsInGrid.sort(NgGridHelper.sortItemsByPositionVertical);
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
                itemsInGrid = itemsInGrid.sort(NgGridHelper.sortItemsByPositionHorizontal);
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
        ;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmdHcmlkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcjItZ3JpZC8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvTmdHcmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWEsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLHdCQUF3QixFQUErRCxlQUFlLEVBQWdELE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2UCxPQUFPLEtBQUssWUFBWSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBNEIsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBUzNELE1BQU07Ozs7Ozs7SUEwSUYsWUFDWSxVQUNBLE9BQ0EsV0FDQTtRQUhBLGFBQVEsR0FBUixRQUFRO1FBQ1IsVUFBSyxHQUFMLEtBQUs7UUFDTCxjQUFTLEdBQVQsU0FBUztRQUNULDZCQUF3QixHQUF4Qix3QkFBd0I7OzJCQWpJcUIsSUFBSSxZQUFZLEVBQWM7c0JBQ25DLElBQUksWUFBWSxFQUFjOzBCQUMxQixJQUFJLFlBQVksRUFBYzs2QkFDM0IsSUFBSSxZQUFZLEVBQWM7d0JBQ25DLElBQUksWUFBWSxFQUFjOzRCQUMxQixJQUFJLFlBQVksRUFBYzs0QkFDbEIsSUFBSSxZQUFZLEVBQTBCO3dCQUd0RixHQUFHO3lCQUNGLEdBQUc7dUJBQ0wsQ0FBQzt1QkFDRCxDQUFDO3lCQUNDLEVBQUU7MkJBQ0EsRUFBRTs0QkFDRCxFQUFFOzBCQUNKLEVBQUU7NEJBQ0EsQ0FBQzswQkFDRixLQUFLOzBCQUNMLEtBQUs7eUJBQ04sSUFBSTs0QkFDRCxJQUFJOzBCQUNOLElBQUk7dUJBQ1IsSUFBSTt3QkFDSCxHQUFHO3lCQUNGLEdBQUc7Z0NBQ00sTUFBTSxDQUFDLCtCQUErQjtzQkFHaEMsSUFBSSxHQUFHLEVBQXNCOzZCQUNuQyxJQUFJOzZCQUNKLElBQUk7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RSxNQUFNLENBQUMsK0JBQStCO0lBQ3pELHdCQUF3QixFQUFFLEtBQUs7SUFDL0IsMkJBQTJCLEVBQUUsU0FBUztJQUN0QyxnQ0FBZ0MsRUFBRSxTQUFTO0lBQzNDLGFBQWEsRUFBRSxLQUFLO0NBQ3ZCOztZQTlISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUMxQixJQUFJLEVBQUU7b0JBQ0YsaUJBQWlCLEVBQUUsNEJBQTRCO2lCQUNsRDthQUNKOzs7O1lBYnlKLGVBQWU7WUFBMUksVUFBVTtZQUFFLFFBQVE7WUFBZ0Isd0JBQXdCOzs7MEJBMkJ0RixNQUFNO3FCQUNOLE1BQU07eUJBQ04sTUFBTTs0QkFDTixNQUFNO3VCQUNOLE1BQU07MkJBQ04sTUFBTTsyQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBFdmVudEVtaXR0ZXIsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSG9zdCwgVmlld0VuY2Fwc3VsYXRpb24sIFR5cGUsIENvbXBvbmVudFJlZiwgS2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVycywgT25Jbml0LCBPbkRlc3Ryb3ksIERvQ2hlY2ssIFZpZXdDb250YWluZXJSZWYsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdHcmlkQ29uZmlnLCBOZ0dyaWRJdGVtRXZlbnQsIE5nR3JpZEl0ZW1Qb3NpdGlvbiwgTmdHcmlkSXRlbVNpemUsIE5nR3JpZFJhd1Bvc2l0aW9uLCBOZ0dyaWRJdGVtRGltZW5zaW9ucywgTmdDb25maWdGaXhEaXJlY3Rpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL0lOZ0dyaWQnO1xuaW1wb3J0IHsgTmdHcmlkSXRlbSB9IGZyb20gJy4vTmdHcmlkSXRlbSc7XG5pbXBvcnQgKiBhcyBOZ0dyaWRIZWxwZXIgZnJvbSAnLi4vaGVscGVycy9OZ0dyaWRIZWxwZXJzJztcbmltcG9ydCB7IE5nR3JpZFBsYWNlaG9sZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9OZ0dyaWRQbGFjZWhvbGRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tuZ0dyaWRdJyxcbiAgICBpbnB1dHM6IFsnY29uZmlnOiBuZ0dyaWQnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcod2luZG93OnJlc2l6ZSknOiAncmVzaXplRXZlbnRIYW5kbGVyKCRldmVudCknLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdHcmlkIGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICAgIHB1YmxpYyBzdGF0aWMgQ09OU1RfREVGQVVMVF9SRVNJWkVfRElSRUNUSU9OUzogc3RyaW5nW10gPSBbXG4gICAgICAgICdib3R0b21yaWdodCcsXG4gICAgICAgICdib3R0b21sZWZ0JyxcbiAgICAgICAgJ3RvcHJpZ2h0JyxcbiAgICAgICAgJ3RvcGxlZnQnLFxuICAgICAgICAncmlnaHQnLFxuICAgICAgICAnbGVmdCcsXG4gICAgICAgICdib3R0b20nLFxuICAgICAgICAndG9wJyxcbiAgICBdO1xuXG4gICAgLy8gRXZlbnQgRW1pdHRlcnNcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWc6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ1N0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplU3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZVN0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uSXRlbUNoYW5nZTogRXZlbnRFbWl0dGVyPEFycmF5PE5nR3JpZEl0ZW1FdmVudD4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxOZ0dyaWRJdGVtRXZlbnQ+PigpO1xuXG4gICAgLy8gUHVibGljIHZhcmlhYmxlc1xuICAgIHB1YmxpYyBjb2xXaWR0aDogbnVtYmVyID0gMjUwO1xuICAgIHB1YmxpYyByb3dIZWlnaHQ6IG51bWJlciA9IDI1MDtcbiAgICBwdWJsaWMgbWluQ29sczogbnVtYmVyID0gMTtcbiAgICBwdWJsaWMgbWluUm93czogbnVtYmVyID0gMTtcbiAgICBwdWJsaWMgbWFyZ2luVG9wOiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgbWFyZ2luUmlnaHQ6IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyBtYXJnaW5Cb3R0b206IG51bWJlciA9IDEwO1xuICAgIHB1YmxpYyBtYXJnaW5MZWZ0OiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgc2NyZWVuTWFyZ2luOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzUmVzaXppbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgYXV0b1N0eWxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgcmVzaXplRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgZHJhZ0VuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGNhc2NhZGU6IHN0cmluZyA9ICd1cCc7XG4gICAgcHVibGljIG1pbldpZHRoOiBudW1iZXIgPSAxMDA7XG4gICAgcHVibGljIG1pbkhlaWdodDogbnVtYmVyID0gMTAwO1xuICAgIHB1YmxpYyByZXNpemVEaXJlY3Rpb25zOiBzdHJpbmdbXSA9IE5nR3JpZC5DT05TVF9ERUZBVUxUX1JFU0laRV9ESVJFQ1RJT05TO1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICBwcml2YXRlIF9pdGVtczogTWFwPHN0cmluZywgTmdHcmlkSXRlbT4gPSBuZXcgTWFwPHN0cmluZywgTmdHcmlkSXRlbT4oKTtcbiAgICBwcml2YXRlIF9kcmFnZ2luZ0l0ZW06IE5nR3JpZEl0ZW0gPSBudWxsO1xuICAgIHByaXZhdGUgX3Jlc2l6aW5nSXRlbTogTmdHcmlkSXRlbSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfcmVzaXplRGlyZWN0aW9uOiBzdHJpbmcgPSBudWxsO1xuICAgIHByaXZhdGUgX2l0ZW1zSW5HcmlkOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHByaXZhdGUgX2NvbnRhaW5lcldpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfY29udGFpbmVySGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbWF4Q29sczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9tYXhSb3dzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3Zpc2libGVDb2xzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3Zpc2libGVSb3dzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3NldFdpZHRoOiBudW1iZXIgPSAyNTA7XG4gICAgcHJpdmF0ZSBfc2V0SGVpZ2h0OiBudW1iZXIgPSAyNTA7XG4gICAgcHJpdmF0ZSBfcG9zT2Zmc2V0OiBOZ0dyaWRSYXdQb3NpdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfYWRkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXJSZWY6IENvbXBvbmVudFJlZjxOZ0dyaWRQbGFjZWhvbGRlcj4gPSBudWxsO1xuICAgIHByaXZhdGUgX2ZpeFRvR3JpZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2F1dG9SZXNpemU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9kaWZmZXI6IEtleVZhbHVlRGlmZmVyPHN0cmluZywgYW55PjtcbiAgICBwcml2YXRlIF9kZXN0cm95ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9tYWludGFpblJhdGlvOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfYXNwZWN0UmF0aW86IG51bWJlcjtcbiAgICBwcml2YXRlIF9wcmVmZXJOZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF96b29tT25EcmFnOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbGltaXRUb1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2NlbnRlclRvU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfY3VyTWF4Um93OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2N1ck1heENvbDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9kcmFnUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9yZXNpemVSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pdGVtRml4RGlyZWN0aW9uOiBOZ0NvbmZpZ0ZpeERpcmVjdGlvbiA9ICdjYXNjYWRlJztcbiAgICBwcml2YXRlIF9jb2xsaXNpb25GaXhEaXJlY3Rpb246IE5nQ29uZmlnRml4RGlyZWN0aW9uID0gJ2Nhc2NhZGUnO1xuICAgIHByaXZhdGUgX2FsbG93T3ZlcmxhcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2Nhc2NhZGVQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xuICAgIHByaXZhdGUgX2xhc3RaVmFsdWU6IG51bWJlciA9IDE7XG5cbiAgICAvLyBFdmVudHNcbiAgICBwcml2YXRlIF9kb2N1bWVudE1vdXNlbW92ZSQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnRNb3VzZXVwJDogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PjtcbiAgICBwcml2YXRlIF9tb3VzZWRvd24kOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICAgIHByaXZhdGUgX21vdXNlbW92ZSQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfbW91c2V1cCQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfdG91Y2hzdGFydCQ6IE9ic2VydmFibGU8VG91Y2hFdmVudD47XG4gICAgcHJpdmF0ZSBfdG91Y2htb3ZlJDogT2JzZXJ2YWJsZTxUb3VjaEV2ZW50PjtcbiAgICBwcml2YXRlIF90b3VjaGVuZCQ6IE9ic2VydmFibGU8VG91Y2hFdmVudD47XG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIHByaXZhdGUgX2VuYWJsZWRMaXN0ZW5lcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gRGVmYXVsdCBjb25maWdcbiAgICBwcml2YXRlIHN0YXRpYyBDT05TVF9ERUZBVUxUX0NPTkZJRzogTmdHcmlkQ29uZmlnID0ge1xuICAgICAgICBtYXJnaW5zOiBbMTBdLFxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgIHJlc2l6YWJsZTogdHJ1ZSxcbiAgICAgICAgbWF4X2NvbHM6IDAsXG4gICAgICAgIG1heF9yb3dzOiAwLFxuICAgICAgICB2aXNpYmxlX2NvbHM6IDAsXG4gICAgICAgIHZpc2libGVfcm93czogMCxcbiAgICAgICAgY29sX3dpZHRoOiAyNTAsXG4gICAgICAgIHJvd19oZWlnaHQ6IDI1MCxcbiAgICAgICAgY2FzY2FkZTogJ3VwJyxcbiAgICAgICAgbWluX3dpZHRoOiAxMDAsXG4gICAgICAgIG1pbl9oZWlnaHQ6IDEwMCxcbiAgICAgICAgZml4X3RvX2dyaWQ6IGZhbHNlLFxuICAgICAgICBhdXRvX3N0eWxlOiB0cnVlLFxuICAgICAgICBhdXRvX3Jlc2l6ZTogZmFsc2UsXG4gICAgICAgIG1haW50YWluX3JhdGlvOiBmYWxzZSxcbiAgICAgICAgcHJlZmVyX25ldzogZmFsc2UsXG4gICAgICAgIHpvb21fb25fZHJhZzogZmFsc2UsXG4gICAgICAgIGxpbWl0X3RvX3NjcmVlbjogZmFsc2UsXG4gICAgICAgIGNlbnRlcl90b19zY3JlZW46IGZhbHNlLFxuICAgICAgICByZXNpemVfZGlyZWN0aW9uczogTmdHcmlkLkNPTlNUX0RFRkFVTFRfUkVTSVpFX0RJUkVDVElPTlMsXG4gICAgICAgIGVsZW1lbnRfYmFzZWRfcm93X2hlaWdodDogZmFsc2UsXG4gICAgICAgIGZpeF9pdGVtX3Bvc2l0aW9uX2RpcmVjdGlvbjogJ2Nhc2NhZGUnLFxuICAgICAgICBmaXhfY29sbGlzaW9uX3Bvc2l0aW9uX2RpcmVjdGlvbjogJ2Nhc2NhZGUnLFxuICAgICAgICBhbGxvd19vdmVybGFwOiBmYWxzZSxcbiAgICB9O1xuICAgIHByaXZhdGUgX2NvbmZpZyA9IE5nR3JpZC5DT05TVF9ERUZBVUxUX0NPTkZJRztcblxuICAgIC8vIFtuZy1ncmlkXSBhdHRyaWJ1dGUgaGFuZGxlclxuICAgIHNldCBjb25maWcodjogTmdHcmlkQ29uZmlnKSB7XG4gICAgICAgIGlmICh2ID09IG51bGwgfHwgdHlwZW9mIHYgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldENvbmZpZyh2KTtcblxuICAgICAgICBpZiAodGhpcy5fZGlmZmVyID09IG51bGwgJiYgdiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9kaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQodGhpcy5fY29uZmlnKS5jcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIsXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX2RlZmluZUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBtZXRob2RzXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnZ3JpZCcsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5hdXRvU3R5bGUpIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgICAgICB0aGlzLnNldENvbmZpZyh0aGlzLl9jb25maWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZW5lcmF0ZUl0ZW1VaWQoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdWlkOiBzdHJpbmcgPSBOZ0dyaWRIZWxwZXIuZ2VuZXJhdGVVdWlkKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zLmhhcyh1aWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUl0ZW1VaWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1aWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENvbmZpZyhjb25maWc6IE5nR3JpZENvbmZpZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgdmFyIG1heENvbFJvd0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgeCBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBjb25maWdbeF07XG4gICAgICAgICAgICB2YXIgaW50VmFsID0gIXZhbCA/IDAgOiBwYXJzZUludCh2YWwpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHgpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdtYXJnaW5zJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXJnaW5zKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbF93aWR0aCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sV2lkdGggPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyb3dfaGVpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhdXRvX3N0eWxlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvU3R5bGUgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2F1dG9fcmVzaXplJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXV0b1Jlc2l6ZSA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZHJhZ2dhYmxlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnRW5hYmxlID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXNpemFibGUnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUVuYWJsZSA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWF4X3Jvd3MnOlxuICAgICAgICAgICAgICAgICAgICBtYXhDb2xSb3dDaGFuZ2VkID0gbWF4Q29sUm93Q2hhbmdlZCB8fCB0aGlzLl9tYXhSb3dzICE9IGludFZhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4Um93cyA9IGludFZhbCA8IDAgPyAwIDogaW50VmFsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtYXhfY29scyc6XG4gICAgICAgICAgICAgICAgICAgIG1heENvbFJvd0NoYW5nZWQgPSBtYXhDb2xSb3dDaGFuZ2VkIHx8IHRoaXMuX21heENvbHMgIT0gaW50VmFsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXhDb2xzID0gaW50VmFsIDwgMCA/IDAgOiBpbnRWYWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVfcm93cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGVSb3dzID0gTWF0aC5tYXgoaW50VmFsLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndmlzaWJsZV9jb2xzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZUNvbHMgPSBNYXRoLm1heChpbnRWYWwsIDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtaW5fcm93cyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluUm93cyA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbl9jb2xzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5Db2xzID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluX2hlaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluSGVpZ2h0ID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluX3dpZHRoJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5XaWR0aCA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3pvb21fb25fZHJhZyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvb21PbkRyYWcgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Nhc2NhZGUnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXNjYWRlICE9IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNjYWRlID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmaXhfdG9fZ3JpZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpeFRvR3JpZCA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWFpbnRhaW5fcmF0aW8nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWludGFpblJhdGlvID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVmZXJfbmV3JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJlZmVyTmV3ID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsaW1pdF90b19zY3JlZW4nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saW1pdFRvU2NyZWVuID0gIXRoaXMuX2F1dG9SZXNpemUgJiYgISF2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcl90b19zY3JlZW4nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZW50ZXJUb1NjcmVlbiA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVzaXplX2RpcmVjdGlvbnMnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZURpcmVjdGlvbnMgPSB2YWwgfHwgWydib3R0b21yaWdodCcsICdib3R0b21sZWZ0JywgJ3RvcHJpZ2h0JywgJ3RvcGxlZnQnLCAncmlnaHQnLCAnbGVmdCcsICdib3R0b20nLCAndG9wJ107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRfYmFzZWRfcm93X2hlaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZml4X2l0ZW1fcG9zaXRpb25fZGlyZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbUZpeERpcmVjdGlvbiA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZml4X2NvbGxpc2lvbl9wb3NpdGlvbl9kaXJlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FsbG93X292ZXJsYXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd092ZXJsYXAgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYWxsb3dPdmVybGFwICYmIHRoaXMuY2FzY2FkZSAhPT0gJ29mZicgJiYgdGhpcy5jYXNjYWRlICE9PSAnJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gb3ZlcmxhcCBpdGVtcyB3aGVuIGEgY2FzY2FkZSBkaXJlY3Rpb24gaXMgc2V0LicpO1xuICAgICAgICAgICAgdGhpcy5fYWxsb3dPdmVybGFwID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnRW5hYmxlIHx8IHRoaXMucmVzaXplRW5hYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtRml4RGlyZWN0aW9uID09PSAnY2FzY2FkZScpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPSB0aGlzLl9nZXRGaXhEaXJlY3Rpb25Gcm9tQ2FzY2FkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbGxpc2lvbkZpeERpcmVjdGlvbiA9PT0gJ2Nhc2NhZGUnKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPSB0aGlzLl9nZXRGaXhEaXJlY3Rpb25Gcm9tQ2FzY2FkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpbWl0VG9TY3JlZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld01heENvbHMgPSB0aGlzLl9nZXRDb250YWluZXJDb2x1bW5zKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhDb2xzICE9IG5ld01heENvbHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhDb2xzID0gbmV3TWF4Q29scztcbiAgICAgICAgICAgICAgICBtYXhDb2xSb3dDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saW1pdFRvU2NyZWVuICYmIHRoaXMuX2NlbnRlclRvU2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLnNjcmVlbk1hcmdpbiA9IHRoaXMuX2dldFNjcmVlbk1hcmdpbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zY3JlZW5NYXJnaW4gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX21haW50YWluUmF0aW8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbFdpZHRoICYmIHRoaXMucm93SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXNwZWN0UmF0aW8gPSB0aGlzLmNvbFdpZHRoIC8gdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX21haW50YWluUmF0aW8gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXhDb2xSb3dDaGFuZ2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5fbWF4Um93cyA+IDApIHsgICAgLy8gICAgQ2FuJ3QgaGF2ZSBib3RoLCBwcmlvcml0aXNlIG9uIGNhc2NhZGVcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY2FzY2FkZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21heFJvd3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbnNBZnRlck1heENoYW5nZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29sV2lkdGgoKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlUm93SGVpZ2h0KCk7XG5cbiAgICAgICAgdmFyIG1heFdpZHRoID0gdGhpcy5fbWF4Q29scyAqIHRoaXMuY29sV2lkdGg7XG4gICAgICAgIHZhciBtYXhIZWlnaHQgPSB0aGlzLl9tYXhSb3dzICogdGhpcy5yb3dIZWlnaHQ7XG5cbiAgICAgICAgaWYgKG1heFdpZHRoID4gMCAmJiB0aGlzLm1pbldpZHRoID4gbWF4V2lkdGgpIHRoaXMubWluV2lkdGggPSAwLjc1ICogdGhpcy5jb2xXaWR0aDtcbiAgICAgICAgaWYgKG1heEhlaWdodCA+IDAgJiYgdGhpcy5taW5IZWlnaHQgPiBtYXhIZWlnaHQpIHRoaXMubWluSGVpZ2h0ID0gMC43NSAqIHRoaXMucm93SGVpZ2h0O1xuXG4gICAgICAgIGlmICh0aGlzLm1pbldpZHRoID4gdGhpcy5jb2xXaWR0aCkgdGhpcy5taW5Db2xzID0gTWF0aC5tYXgodGhpcy5taW5Db2xzLCBNYXRoLmNlaWwodGhpcy5taW5XaWR0aCAvIHRoaXMuY29sV2lkdGgpKTtcbiAgICAgICAgaWYgKHRoaXMubWluSGVpZ2h0ID4gdGhpcy5yb3dIZWlnaHQpIHRoaXMubWluUm93cyA9IE1hdGgubWF4KHRoaXMubWluUm93cywgTWF0aC5jZWlsKHRoaXMubWluSGVpZ2h0IC8gdGhpcy5yb3dIZWlnaHQpKTtcblxuICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5taW5Db2xzID4gdGhpcy5fbWF4Q29scykgdGhpcy5taW5Db2xzID0gMTtcbiAgICAgICAgaWYgKHRoaXMuX21heFJvd3MgPiAwICYmIHRoaXMubWluUm93cyA+IHRoaXMuX21heFJvd3MpIHRoaXMubWluUm93cyA9IDE7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmF0aW8oKTtcblxuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZChpdGVtKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0Q2FzY2FkZU1vZGUodGhpcy5jYXNjYWRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5yZWNhbGN1bGF0ZVNlbGYoKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtUG9zaXRpb24oaXRlbUlkOiBzdHJpbmcpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzKGl0ZW1JZCkgPyB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKS5nZXRHcmlkUG9zaXRpb24oKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEl0ZW1TaXplKGl0ZW1JZDogc3RyaW5nKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzKGl0ZW1JZCkgPyB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKS5nZXRTaXplKCkgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0RvQ2hlY2soKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9kaWZmZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZXMgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl9jb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoY2hhbmdlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1hcmdpbnMobWFyZ2luczogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcmdpblRvcCA9IE1hdGgubWF4KHBhcnNlSW50KG1hcmdpbnNbMF0pLCAwKTtcbiAgICAgICAgdGhpcy5tYXJnaW5SaWdodCA9IG1hcmdpbnMubGVuZ3RoID49IDIgPyBNYXRoLm1heChwYXJzZUludChtYXJnaW5zWzFdKSwgMCkgOiB0aGlzLm1hcmdpblRvcDtcbiAgICAgICAgdGhpcy5tYXJnaW5Cb3R0b20gPSBtYXJnaW5zLmxlbmd0aCA+PSAzID8gTWF0aC5tYXgocGFyc2VJbnQobWFyZ2luc1syXSksIDApIDogdGhpcy5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMubWFyZ2luTGVmdCA9IG1hcmdpbnMubGVuZ3RoID49IDQgPyBNYXRoLm1heChwYXJzZUludChtYXJnaW5zWzNdKSwgMCkgOiB0aGlzLm1hcmdpblJpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGVEcmFnKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYWdFbmFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlRHJhZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmFnRW5hYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZVJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNpemVFbmFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlc2l6ZUVuYWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRJdGVtKG5nSXRlbTogTmdHcmlkSXRlbSk6IHZvaWQge1xuICAgICAgICBuZ0l0ZW0uc2V0Q2FzY2FkZU1vZGUodGhpcy5jYXNjYWRlKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3ByZWZlck5ldykge1xuICAgICAgICAgICAgdmFyIG5ld1BvcyA9IHRoaXMuX2ZpeEdyaWRQb3NpdGlvbihuZ0l0ZW0uZ2V0R3JpZFBvc2l0aW9uKCksIG5nSXRlbS5nZXRTaXplKCkpO1xuICAgICAgICAgICAgbmdJdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5nSXRlbS51aWQgPT09IG51bGwgfHwgdGhpcy5faXRlbXMuaGFzKG5nSXRlbS51aWQpKSB7XG4gICAgICAgICAgICBuZ0l0ZW0udWlkID0gdGhpcy5nZW5lcmF0ZUl0ZW1VaWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2l0ZW1zLnNldChuZ0l0ZW0udWlkLCBuZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9hZGRUb0dyaWQobmdJdGVtKTtcblxuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyQ2FzY2FkZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbmdJdGVtLnJlY2FsY3VsYXRlU2VsZigpO1xuICAgICAgICAgICAgbmdJdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2VtaXRPbkl0ZW1DaGFuZ2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlSXRlbShuZ0l0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQobmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9pdGVtcy5kZWxldGUobmdJdGVtLnVpZCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckNhc2NhZGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IGl0ZW0ucmVjYWxjdWxhdGVTZWxmKCkpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdE9uSXRlbUNoYW5nZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlSXRlbShuZ0l0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQobmdJdGVtKTtcbiAgICAgICAgdGhpcy5fYWRkVG9HcmlkKG5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyQ2FzY2FkZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgICAgICAgbmdJdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0cmlnZ2VyQ2FzY2FkZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYXNjYWRlUHJvbWlzZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FzY2FkZVByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlUHJvbWlzZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nhc2NhZGVHcmlkKG51bGwsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXNjYWRlUHJvbWlzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHJpZ2dlclJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNpemVFdmVudEhhbmRsZXIobnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2l6ZUV2ZW50SGFuZGxlcihlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlQ29sV2lkdGgoKTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlUm93SGVpZ2h0KCk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmF0aW8oKTtcblxuICAgICAgICBpZiAodGhpcy5fbGltaXRUb1NjcmVlbikge1xuICAgICAgICAgICAgY29uc3QgbmV3TWF4Q29sdW1ucyA9IHRoaXMuX2dldENvbnRhaW5lckNvbHVtbnMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXhDb2xzICE9PSBuZXdNYXhDb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IG5ld01heENvbHVtbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb25zQWZ0ZXJNYXhDaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fY2VudGVyVG9TY3JlZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcmVlbk1hcmdpbiA9IHRoaXMuX2dldFNjcmVlbk1hcmdpbigpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlY2FsY3VsYXRlU2VsZigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F1dG9SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlY2FsY3VsYXRlU2VsZigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdXNlRG93bkV2ZW50SGFuZGxlcihlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgICAgICB2YXIgbW91c2VQb3MgPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX2dldEl0ZW1Gcm9tUG9zaXRpb24obW91c2VQb3MpO1xuXG4gICAgICAgIGlmIChpdGVtID09IG51bGwpIHJldHVybjtcblxuICAgICAgICBjb25zdCByZXNpemVEaXJlY3Rpb246IHN0cmluZyA9IGl0ZW0uY2FuUmVzaXplKGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZUVuYWJsZSAmJiByZXNpemVEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZVJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbSA9IGl0ZW07XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVEaXJlY3Rpb24gPSByZXNpemVEaXJlY3Rpb247XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyYWdFbmFibGUgJiYgaXRlbS5jYW5EcmFnKGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtID0gaXRlbTtcblxuICAgICAgICAgICAgY29uc3QgaXRlbVBvcyA9IGl0ZW0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX3Bvc09mZnNldCA9IHsgJ2xlZnQnOiAobW91c2VQb3MubGVmdCAtIGl0ZW1Qb3MubGVmdCksICd0b3AnOiAobW91c2VQb3MudG9wIC0gaXRlbVBvcy50b3ApIH1cblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1vdXNlVXBFdmVudEhhbmRsZXIoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ1N0b3AoZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVTdG9wKGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RyYWdSZWFkeSB8fCB0aGlzLl9yZXNpemVSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYW5EcmFnKCk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhblJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1vdXNlTW92ZUV2ZW50SGFuZGxlcihlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fcmVzaXplUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZVN0YXJ0KGUpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RyYWdSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ1N0YXJ0KGUpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5fZHJhZyhlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZShlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBtb3VzZVBvcyA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX2dldEl0ZW1Gcm9tUG9zaXRpb24obW91c2VQb3MpO1xuXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGl0ZW0ub25Nb3VzZU1vdmUoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAgICBQcml2YXRlIG1ldGhvZHNcbiAgICBwcml2YXRlIF9nZXRGaXhEaXJlY3Rpb25Gcm9tQ2FzY2FkZSgpOiBOZ0NvbmZpZ0ZpeERpcmVjdGlvbiB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jYXNjYWRlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZXJ0aWNhbCc7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hvcml6b250YWwnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX3VwZGF0ZVBvc2l0aW9uc0FmdGVyTWF4Q2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgcG9zID0gaXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBkaW1zID0gaXRlbS5nZXRTaXplKCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5faGFzR3JpZENvbGxpc2lvbihwb3MsIGRpbXMpICYmIHRoaXMuX2lzV2l0aGluQm91bmRzKHBvcywgZGltcykgJiYgZGltcy54IDw9IHRoaXMuX21heENvbHMgJiYgZGltcy55IDw9IHRoaXMuX21heFJvd3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgZGltcy54ID4gdGhpcy5fbWF4Q29scykge1xuICAgICAgICAgICAgICAgIGRpbXMueCA9IHRoaXMuX21heENvbHM7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXRTaXplKGRpbXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYXhSb3dzID4gMCAmJiBkaW1zLnkgPiB0aGlzLl9tYXhSb3dzKSB7XG4gICAgICAgICAgICAgICAgZGltcy55ID0gdGhpcy5fbWF4Um93cztcbiAgICAgICAgICAgICAgICBpdGVtLnNldFNpemUoZGltcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9oYXNHcmlkQ29sbGlzaW9uKHBvcywgZGltcykgfHwgIXRoaXMuX2lzV2l0aGluQm91bmRzKHBvcywgZGltcywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB0aGlzLl9maXhHcmlkUG9zaXRpb24ocG9zLCBkaW1zKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlQ29sV2lkdGgoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvUmVzaXplKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgfHwgdGhpcy5fdmlzaWJsZUNvbHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1heENvbHMgPSB0aGlzLl9tYXhDb2xzID4gMCA/IHRoaXMuX21heENvbHMgOiB0aGlzLl92aXNpYmxlQ29scztcbiAgICAgICAgICAgICAgICB2YXIgbWF4V2lkdGg6IG51bWJlciA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuICAgICAgICAgICAgICAgIHZhciBjb2xXaWR0aDogbnVtYmVyID0gTWF0aC5mbG9vcihtYXhXaWR0aCAvIG1heENvbHMpO1xuICAgICAgICAgICAgICAgIGNvbFdpZHRoIC09ICh0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgICAgICAgICBpZiAoY29sV2lkdGggPiAwKSB0aGlzLmNvbFdpZHRoID0gY29sV2lkdGg7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbFdpZHRoIDwgdGhpcy5taW5XaWR0aCB8fCB0aGlzLm1pbkNvbHMgPiB0aGlzLl9jb25maWcubWluX2NvbHMpIHtcbiAgICAgICAgICAgIHRoaXMubWluQ29scyA9IE1hdGgubWF4KHRoaXMuX2NvbmZpZy5taW5fY29scywgTWF0aC5jZWlsKHRoaXMubWluV2lkdGggLyB0aGlzLmNvbFdpZHRoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYWxjdWxhdGVSb3dIZWlnaHQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvUmVzaXplKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Um93cyA+IDAgfHwgdGhpcy5fdmlzaWJsZVJvd3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1heFJvd3MgPSB0aGlzLl9tYXhSb3dzID4gMCA/IHRoaXMuX21heFJvd3MgOiB0aGlzLl92aXNpYmxlUm93cztcbiAgICAgICAgICAgICAgICBsZXQgbWF4SGVpZ2h0OiBudW1iZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZWxlbWVudEJhc2VkRHluYW1pY1Jvd0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQgPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMubWFyZ2luVG9wIC0gdGhpcy5tYXJnaW5Cb3R0b207XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJvd0hlaWdodDogbnVtYmVyID0gTWF0aC5tYXgoTWF0aC5mbG9vcihtYXhIZWlnaHQgLyBtYXhSb3dzKSwgdGhpcy5taW5IZWlnaHQpO1xuICAgICAgICAgICAgICAgIHJvd0hlaWdodCAtPSAodGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSk7XG4gICAgICAgICAgICAgICAgaWYgKHJvd0hlaWdodCA+IDApIHRoaXMucm93SGVpZ2h0ID0gcm93SGVpZ2h0O1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb3dIZWlnaHQgPCB0aGlzLm1pbkhlaWdodCB8fCB0aGlzLm1pblJvd3MgPiB0aGlzLl9jb25maWcubWluX3Jvd3MpIHtcbiAgICAgICAgICAgIHRoaXMubWluUm93cyA9IE1hdGgubWF4KHRoaXMuX2NvbmZpZy5taW5fcm93cywgTWF0aC5jZWlsKHRoaXMubWluSGVpZ2h0IC8gdGhpcy5yb3dIZWlnaHQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVJhdGlvKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2F1dG9SZXNpemUgfHwgIXRoaXMuX21haW50YWluUmF0aW8pIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5fdmlzaWJsZVJvd3MgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yb3dIZWlnaHQgPSB0aGlzLmNvbFdpZHRoIC8gdGhpcy5fYXNwZWN0UmF0aW87XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF4Um93cyA+IDAgJiYgdGhpcy5fdmlzaWJsZUNvbHMgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb2xXaWR0aCA9IHRoaXMuX2FzcGVjdFJhdGlvICogdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF4Q29scyA9PSAwICYmIHRoaXMuX21heFJvd3MgPT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2libGVDb2xzID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm93SGVpZ2h0ID0gdGhpcy5jb2xXaWR0aCAvIHRoaXMuX2FzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl92aXNpYmxlUm93cyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbFdpZHRoID0gdGhpcy5fYXNwZWN0UmF0aW8gKiB0aGlzLnJvd0hlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKChyZWNvcmQ6IGFueSkgPT4geyB0aGlzLl9jb25maWdbcmVjb3JkLmtleV0gPSByZWNvcmQuY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0oKHJlY29yZDogYW55KSA9PiB7IHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XSA9IHJlY29yZC5jdXJyZW50VmFsdWU7IH0pO1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVjb3JkOiBhbnkpID0+IHsgZGVsZXRlIHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XTsgfSk7XG5cbiAgICAgICAgdGhpcy5zZXRDb25maWcodGhpcy5fY29uZmlnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNpemVTdGFydChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlc2l6ZUVuYWJsZSB8fCAhdGhpcy5fcmVzaXppbmdJdGVtKSByZXR1cm47XG5cbiAgICAgICAgLy8gICAgU2V0dXBcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnN0YXJ0TW92aW5nKCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyKHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnpJbmRleCA9IHRoaXMuX2xhc3RaVmFsdWUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICAgIFN0YXR1cyBGbGFnc1xuICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZXNpemVSZWFkeSA9IGZhbHNlO1xuXG4gICAgICAgIC8vICAgIEV2ZW50c1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RhcnQuZW1pdCh0aGlzLl9yZXNpemluZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0ub25SZXNpemVTdGFydEV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhZ1N0YXJ0KGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ0VuYWJsZSB8fCAhdGhpcy5fZHJhZ2dpbmdJdGVtKSByZXR1cm47XG5cbiAgICAgICAgLy8gICAgU3RhcnQgZHJhZ2dpbmdcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnN0YXJ0TW92aW5nKCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKHRoaXMuX2RyYWdnaW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyKHRoaXMuX2RyYWdnaW5nSXRlbSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnpJbmRleCA9IHRoaXMuX2xhc3RaVmFsdWUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICAgIFN0YXR1cyBGbGFnc1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kcmFnUmVhZHkgPSBmYWxzZTtcblxuICAgICAgICAvLyAgICBFdmVudHNcbiAgICAgICAgdGhpcy5vbkRyYWdTdGFydC5lbWl0KHRoaXMuX2RyYWdnaW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5vbkRyYWdTdGFydEV2ZW50KCk7XG5cbiAgICAgICAgLy8gICAgWm9vbVxuICAgICAgICBpZiAodGhpcy5fem9vbU9uRHJhZykge1xuICAgICAgICAgICAgdGhpcy5fem9vbU91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfem9vbU91dCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICdzY2FsZSgwLjUsIDAuNSknKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNldFpvb20oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhZyhlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PmRvY3VtZW50KS5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICg8YW55PmRvY3VtZW50KS5zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtb3VzZVBvcyA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICAgIHZhciBuZXdMID0gKG1vdXNlUG9zLmxlZnQgLSB0aGlzLl9wb3NPZmZzZXQubGVmdCk7XG4gICAgICAgIHZhciBuZXdUID0gKG1vdXNlUG9zLnRvcCAtIHRoaXMuX3Bvc09mZnNldC50b3ApO1xuXG4gICAgICAgIHZhciBpdGVtUG9zID0gdGhpcy5fZHJhZ2dpbmdJdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgZ3JpZFBvcyA9IHRoaXMuX2NhbGN1bGF0ZUdyaWRQb3NpdGlvbihuZXdMLCBuZXdUKTtcbiAgICAgICAgdmFyIGRpbXMgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGdyaWRQb3MgPSB0aGlzLl9maXhQb3NUb0JvdW5kc1goZ3JpZFBvcywgZGltcyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1koZ3JpZFBvcywgZGltcykpIHtcbiAgICAgICAgICAgIGdyaWRQb3MgPSB0aGlzLl9maXhQb3NUb0JvdW5kc1koZ3JpZFBvcywgZGltcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ3JpZFBvcy5jb2wgIT0gaXRlbVBvcy5jb2wgfHwgZ3JpZFBvcy5yb3cgIT0gaXRlbVBvcy5yb3cpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5zZXRHcmlkUG9zaXRpb24oZ3JpZFBvcywgdGhpcy5fZml4VG9HcmlkKTtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyUmVmLmluc3RhbmNlLnNldEdyaWRQb3NpdGlvbihncmlkUG9zKTtcblxuICAgICAgICAgICAgaWYgKFsndXAnLCAnZG93bicsICdsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZih0aGlzLmNhc2NhZGUpID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXhHcmlkQ29sbGlzaW9ucyhncmlkUG9zLCBkaW1zKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZChncmlkUG9zLCBkaW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fZml4VG9HcmlkKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0uc2V0UG9zaXRpb24obmV3TCwgbmV3VCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRHJhZy5lbWl0KHRoaXMuX2RyYWdnaW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5vbkRyYWdFdmVudCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc2l6ZShlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVzaXppbmcpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZVBvcyA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICAgIGNvbnN0IGl0ZW1Qb3MgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgaXRlbURpbXMgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0RGltZW5zaW9ucygpO1xuICAgICAgICBjb25zdCBlbmRDb3JuZXIgPSB7XG4gICAgICAgICAgICBsZWZ0OiBpdGVtUG9zLmxlZnQgKyBpdGVtRGltcy53aWR0aCxcbiAgICAgICAgICAgIHRvcDogaXRlbVBvcy50b3AgKyBpdGVtRGltcy5oZWlnaHQsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNpemVUb3AgPSB0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ3RvcCcpO1xuICAgICAgICBjb25zdCByZXNpemVCb3R0b20gPSB0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ2JvdHRvbScpO1xuICAgICAgICBjb25zdCByZXNpemVMZWZ0ID0gdGhpcy5fcmVzaXplRGlyZWN0aW9uLmluY2x1ZGVzKCdsZWZ0JylcbiAgICAgICAgY29uc3QgcmVzaXplUmlnaHQgPSB0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ3JpZ2h0Jyk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyB3aWR0aCBhbmQgaGVpZ2h0IGJhc2VkIHVwb24gcmVzaXplIGRpcmVjdGlvblxuICAgICAgICBsZXQgbmV3VyA9IHJlc2l6ZVJpZ2h0XG4gICAgICAgICAgICA/IChtb3VzZVBvcy5sZWZ0IC0gaXRlbVBvcy5sZWZ0ICsgMSlcbiAgICAgICAgICAgIDogcmVzaXplTGVmdFxuICAgICAgICAgICAgICAgID8gKGVuZENvcm5lci5sZWZ0IC0gbW91c2VQb3MubGVmdCArIDEpXG4gICAgICAgICAgICAgICAgOiBpdGVtRGltcy53aWR0aDtcbiAgICAgICAgbGV0IG5ld0ggPSByZXNpemVCb3R0b21cbiAgICAgICAgICAgID8gKG1vdXNlUG9zLnRvcCAtIGl0ZW1Qb3MudG9wICsgMSlcbiAgICAgICAgICAgIDogcmVzaXplVG9wXG4gICAgICAgICAgICAgICAgPyAoZW5kQ29ybmVyLnRvcCAtIG1vdXNlUG9zLnRvcCArIDEpXG4gICAgICAgICAgICAgICAgOiBpdGVtRGltcy5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKG5ld1cgPCB0aGlzLm1pbldpZHRoKVxuICAgICAgICAgICAgbmV3VyA9IHRoaXMubWluV2lkdGg7XG4gICAgICAgIGlmIChuZXdIIDwgdGhpcy5taW5IZWlnaHQpXG4gICAgICAgICAgICBuZXdIID0gdGhpcy5taW5IZWlnaHQ7XG4gICAgICAgIGlmIChuZXdXIDwgdGhpcy5fcmVzaXppbmdJdGVtLm1pbldpZHRoKVxuICAgICAgICAgICAgbmV3VyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5taW5XaWR0aDtcbiAgICAgICAgaWYgKG5ld0ggPCB0aGlzLl9yZXNpemluZ0l0ZW0ubWluSGVpZ2h0KVxuICAgICAgICAgICAgbmV3SCA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5taW5IZWlnaHQ7XG5cbiAgICAgICAgbGV0IG5ld1ggPSBpdGVtUG9zLmxlZnQ7XG4gICAgICAgIGxldCBuZXdZID0gaXRlbVBvcy50b3A7XG5cbiAgICAgICAgaWYgKHJlc2l6ZUxlZnQpXG4gICAgICAgICAgICBuZXdYID0gZW5kQ29ybmVyLmxlZnQgLSBuZXdXO1xuICAgICAgICBpZiAocmVzaXplVG9wKVxuICAgICAgICAgICAgbmV3WSA9IGVuZENvcm5lci50b3AgLSBuZXdIO1xuXG4gICAgICAgIGxldCBjYWxjU2l6ZSA9IHRoaXMuX2NhbGN1bGF0ZUdyaWRTaXplKG5ld1csIG5ld0gpO1xuICAgICAgICBjb25zdCBpdGVtU2l6ZSA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRTaXplKCk7XG4gICAgICAgIGNvbnN0IGlHcmlkUG9zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBib3R0b21SaWdodENvcm5lciA9IHtcbiAgICAgICAgICAgIGNvbDogaUdyaWRQb3MuY29sICsgaXRlbVNpemUueCxcbiAgICAgICAgICAgIHJvdzogaUdyaWRQb3Mucm93ICsgaXRlbVNpemUueSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdGFyZ2V0UG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBPYmplY3QuYXNzaWduKHt9LCBpR3JpZFBvcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZURpcmVjdGlvbi5pbmNsdWRlcygndG9wJykpXG4gICAgICAgICAgICB0YXJnZXRQb3Mucm93ID0gYm90dG9tUmlnaHRDb3JuZXIucm93IC0gY2FsY1NpemUueTtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZURpcmVjdGlvbi5pbmNsdWRlcygnbGVmdCcpKVxuICAgICAgICAgICAgdGFyZ2V0UG9zLmNvbCA9IGJvdHRvbVJpZ2h0Q29ybmVyLmNvbCAtIGNhbGNTaXplLng7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1godGFyZ2V0UG9zLCBjYWxjU2l6ZSkpXG4gICAgICAgICAgICBjYWxjU2l6ZSA9IHRoaXMuX2ZpeFNpemVUb0JvdW5kc1godGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1kodGFyZ2V0UG9zLCBjYWxjU2l6ZSkpXG4gICAgICAgICAgICBjYWxjU2l6ZSA9IHRoaXMuX2ZpeFNpemVUb0JvdW5kc1kodGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG5cbiAgICAgICAgY2FsY1NpemUgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZml4UmVzaXplKGNhbGNTaXplKTtcblxuICAgICAgICBpZiAoY2FsY1NpemUueCAhPSBpdGVtU2l6ZS54IHx8IGNhbGNTaXplLnkgIT0gaXRlbVNpemUueSkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldEdyaWRQb3NpdGlvbih0YXJnZXRQb3MsIHRoaXMuX2ZpeFRvR3JpZCk7XG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5pbnN0YW5jZS5zZXRHcmlkUG9zaXRpb24odGFyZ2V0UG9zKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zZXRTaXplKGNhbGNTaXplLCB0aGlzLl9maXhUb0dyaWQpO1xuICAgICAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJSZWYuaW5zdGFuY2Uuc2V0U2l6ZShjYWxjU2l6ZSk7XG5cbiAgICAgICAgICAgIGlmIChbJ3VwJywgJ2Rvd24nLCAnbGVmdCcsICdyaWdodCddLmluZGV4T2YodGhpcy5jYXNjYWRlKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnModGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQodGFyZ2V0UG9zLCBjYWxjU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2ZpeFRvR3JpZCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldERpbWVuc2lvbnMobmV3VywgbmV3SCk7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0uc2V0UG9zaXRpb24obmV3WCwgbmV3WSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUmVzaXplLmVtaXQodGhpcy5fcmVzaXppbmdJdGVtKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLm9uUmVzaXplRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kcmFnU3RvcChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRHJhZ2dpbmcpIHJldHVybjtcblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICB2YXIgaXRlbVBvcyA9IHRoaXMuX2RyYWdnaW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0uc2V0R3JpZFBvc2l0aW9uKGl0ZW1Qb3MpO1xuICAgICAgICB0aGlzLl9hZGRUb0dyaWQodGhpcy5fZHJhZ2dpbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnN0b3BNb3ZpbmcoKTtcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLm9uRHJhZ1N0b3BFdmVudCgpO1xuICAgICAgICB0aGlzLm9uRHJhZ1N0b3AuZW1pdCh0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuXG4gICAgICAgIHRoaXMuX2NsZWFuRHJhZygpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5fZW1pdE9uSXRlbUNoYW5nZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl96b29tT25EcmFnKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNldFpvb20oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc2l6ZVN0b3AoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1Jlc2l6aW5nKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgaXRlbURpbXMgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0uc2V0U2l6ZShpdGVtRGltcyk7XG5cbiAgICAgICAgY29uc3QgaXRlbVBvcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldEdyaWRQb3NpdGlvbihpdGVtUG9zKTtcblxuICAgICAgICB0aGlzLl9hZGRUb0dyaWQodGhpcy5fcmVzaXppbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnN0b3BNb3ZpbmcoKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLm9uUmVzaXplU3RvcEV2ZW50KCk7XG4gICAgICAgIHRoaXMub25SZXNpemVTdG9wLmVtaXQodGhpcy5fcmVzaXppbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jbGVhblJlc2l6ZSgpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgdGhpcy5fZW1pdE9uSXRlbUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFuRHJhZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcG9zT2Zmc2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RyYWdSZWFkeSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFuUmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNpemVEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmlzUmVzaXppbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVzaXplUmVhZHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYWxjdWxhdGVHcmlkU2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgd2lkdGggKz0gdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodDtcbiAgICAgICAgaGVpZ2h0ICs9IHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b207XG5cbiAgICAgICAgdmFyIHNpemV4ID0gTWF0aC5tYXgodGhpcy5taW5Db2xzLCBNYXRoLnJvdW5kKHdpZHRoIC8gKHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KSkpO1xuICAgICAgICB2YXIgc2l6ZXkgPSBNYXRoLm1heCh0aGlzLm1pblJvd3MsIE1hdGgucm91bmQoaGVpZ2h0IC8gKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWCh7IGNvbDogMSwgcm93OiAxIH0sIHsgeDogc2l6ZXgsIHk6IHNpemV5IH0pKSBzaXpleCA9IHRoaXMuX21heENvbHM7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHsgY29sOiAxLCByb3c6IDEgfSwgeyB4OiBzaXpleCwgeTogc2l6ZXkgfSkpIHNpemV5ID0gdGhpcy5fbWF4Um93cztcblxuICAgICAgICByZXR1cm4geyAneCc6IHNpemV4LCAneSc6IHNpemV5IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlR3JpZFBvc2l0aW9uKGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICB2YXIgY29sID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChsZWZ0IC8gKHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KSkgKyAxKTtcbiAgICAgICAgdmFyIHJvdyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQodG9wIC8gKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpICsgMSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1goeyBjb2w6IGNvbCwgcm93OiByb3cgfSwgeyB4OiAxLCB5OiAxIH0pKSBjb2wgPSB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWSh7IGNvbDogY29sLCByb3c6IHJvdyB9LCB7IHg6IDEsIHk6IDEgfSkpIHJvdyA9IHRoaXMuX21heFJvd3M7XG5cbiAgICAgICAgcmV0dXJuIHsgJ2NvbCc6IGNvbCwgJ3Jvdyc6IHJvdyB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hhc0dyaWRDb2xsaXNpb24ocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogYm9vbGVhbiB7XG4gICAgICAgIHZhciBwb3NpdGlvbnMgPSB0aGlzLl9nZXRDb2xsaXNpb25zKHBvcywgZGltcyk7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9ucyA9PSBudWxsIHx8IHBvc2l0aW9ucy5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiBwb3NpdGlvbnMuc29tZSgodjogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICEodiA9PT0gbnVsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldENvbGxpc2lvbnMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogQXJyYXk8TmdHcmlkSXRlbT4ge1xuICAgICAgICBpZiAodGhpcy5fYWxsb3dPdmVybGFwKSByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3QgcmV0dXJuczogQXJyYXk8TmdHcmlkSXRlbT4gPSBbXTtcblxuICAgICAgICBpZiAoIXBvcy5jb2wpIHsgcG9zLmNvbCA9IDE7IH1cbiAgICAgICAgaWYgKCFwb3Mucm93KSB7IHBvcy5yb3cgPSAxOyB9XG5cbiAgICAgICAgY29uc3QgbGVmdENvbCA9IHBvcy5jb2w7XG4gICAgICAgIGNvbnN0IHJpZ2h0Q29sID0gcG9zLmNvbCArIGRpbXMueDtcbiAgICAgICAgY29uc3QgdG9wUm93ID0gcG9zLnJvdztcbiAgICAgICAgY29uc3QgYm90dG9tUm93ID0gcG9zLnJvdyArIGRpbXMueTtcblxuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5mb3JFYWNoKChpdGVtSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbTogTmdHcmlkSXRlbSA9IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpO1xuXG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5kZWxldGUoaXRlbUlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1MZWZ0Q29sID0gaXRlbS5jb2w7XG4gICAgICAgICAgICBjb25zdCBpdGVtUmlnaHRDb2wgPSBpdGVtLmNvbCArIGl0ZW0uc2l6ZXg7XG4gICAgICAgICAgICBjb25zdCBpdGVtVG9wUm93ID0gaXRlbS5yb3c7XG4gICAgICAgICAgICBjb25zdCBpdGVtQm90dG9tUm93ID0gaXRlbS5yb3cgKyBpdGVtLnNpemV5O1xuXG4gICAgICAgICAgICBjb25zdCB3aXRoaW5Db2x1bW5zID0gbGVmdENvbCA8IGl0ZW1SaWdodENvbCAmJiBpdGVtTGVmdENvbCA8IHJpZ2h0Q29sO1xuICAgICAgICAgICAgY29uc3Qgd2l0aGluUm93cyA9IHRvcFJvdyA8IGl0ZW1Cb3R0b21Sb3cgJiYgaXRlbVRvcFJvdyA8IGJvdHRvbVJvdztcblxuICAgICAgICAgICAgaWYgKHdpdGhpbkNvbHVtbnMgJiYgd2l0aGluUm93cykge1xuICAgICAgICAgICAgICAgIHJldHVybnMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4R3JpZENvbGxpc2lvbnMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbGxpc2lvbnM6IEFycmF5PE5nR3JpZEl0ZW0+ID0gdGhpcy5fZ2V0Q29sbGlzaW9ucyhwb3MsIGRpbXMpO1xuICAgICAgICBpZiAoY29sbGlzaW9ucy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgZm9yIChsZXQgY29sbGlzaW9uIG9mIGNvbGxpc2lvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGNvbGxpc2lvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGNvbGxpc2lvbi5nZXRTaXplKCk7XG4gICAgICAgICAgICBjb25zdCBpdGVtUG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBjb2xsaXNpb24uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBsZXQgbmV3SXRlbVBvczogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IGl0ZW1Qb3MuY29sLCByb3c6IGl0ZW1Qb3Mucm93IH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLnJvdyA9IHBvcy5yb3cgKyBkaW1zLnk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWShuZXdJdGVtUG9zLCBpdGVtRGltcykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbVBvcy5jb2wgPSBwb3MuY29sICsgZGltcy54O1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLnJvdyA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgIG5ld0l0ZW1Qb3MuY29sID0gcG9zLmNvbCArIGRpbXMueDtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKG5ld0l0ZW1Qb3MsIGl0ZW1EaW1zKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLmNvbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW1Qb3Mucm93ID0gcG9zLnJvdyArIGRpbXMueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbGxpc2lvbi5zZXRHcmlkUG9zaXRpb24obmV3SXRlbVBvcyk7XG5cbiAgICAgICAgICAgIHRoaXMuX2ZpeEdyaWRDb2xsaXNpb25zKG5ld0l0ZW1Qb3MsIGl0ZW1EaW1zKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChjb2xsaXNpb24pO1xuICAgICAgICAgICAgY29sbGlzaW9uLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maXhHcmlkQ29sbGlzaW9ucyhwb3MsIGRpbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Nhc2NhZGVHcmlkKHBvcz86IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltcz86IE5nR3JpZEl0ZW1TaXplKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkgcmV0dXJuO1xuICAgICAgICBpZiAoIXBvcyAhPT0gIWRpbXMpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhc2NhZGUgd2l0aCBvbmx5IHBvc2l0aW9uIGFuZCBub3QgZGltZW5zaW9ucycpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5fZHJhZ2dpbmdJdGVtICYmICFwb3MgJiYgIWRpbXMpIHtcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuX2RyYWdnaW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgIGRpbXMgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNSZXNpemluZyAmJiB0aGlzLl9yZXNpemluZ0l0ZW0gJiYgIXBvcyAmJiAhZGltcykge1xuICAgICAgICAgICAgcG9zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgZGltcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRTaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXRlbXNJbkdyaWQ6IE5nR3JpZEl0ZW1bXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQsIChpdGVtSWQ6IHN0cmluZykgPT4gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5jYXNjYWRlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICBpdGVtc0luR3JpZCA9IGl0ZW1zSW5HcmlkLnNvcnQoTmdHcmlkSGVscGVyLnNvcnRJdGVtc0J5UG9zaXRpb25WZXJ0aWNhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXN0Um93UGVyQ29sdW1uOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJbkdyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNGaXhlZCkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbURpbXM6IE5nR3JpZEl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Qb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvd2VzdFJvd0Zvckl0ZW06IG51bWJlciA9IGxvd2VzdFJvd1BlckNvbHVtbi5nZXQoaXRlbVBvcy5jb2wpIHx8IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMTsgaSA8IGl0ZW1EaW1zLng7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG93ZXN0Um93Rm9yQ29sdW1uID0gbG93ZXN0Um93UGVyQ29sdW1uLmdldChpdGVtUG9zLmNvbCArIGkpIHx8IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RSb3dGb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0Um93Rm9yQ29sdW1uLCBsb3dlc3RSb3dGb3JJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRDb2wgPSBpdGVtUG9zLmNvbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmlnaHRDb2wgPSBpdGVtUG9zLmNvbCArIGl0ZW1EaW1zLng7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyAmJiBkaW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aXRoaW5Db2x1bW5zID0gcmlnaHRDb2wgPiBwb3MuY29sICYmIGxlZnRDb2wgPCAocG9zLmNvbCArIGRpbXMueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXRoaW5Db2x1bW5zKSB7ICAgICAgICAgIC8vIElmIG91ciBlbGVtZW50IGlzIGluIG9uZSBvZiB0aGUgaXRlbSdzIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb29tQWJvdmVJdGVtID0gaXRlbURpbXMueSA8PSAocG9zLnJvdyAtIGxvd2VzdFJvd0Zvckl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyb29tQWJvdmVJdGVtKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGNhbid0IGZpdCBhYm92ZSBvdXIgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RSb3dGb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0Um93Rm9ySXRlbSwgcG9zLnJvdyArIGRpbXMueSk7ICAgLy8gU2V0IHRoZSBsb3dlc3Qgcm93IHRvIGJlIGJlbG93IGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSB7IGNvbDogaXRlbVBvcy5jb2wsIHJvdzogbG93ZXN0Um93Rm9ySXRlbSB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIFdoYXQgaWYgaXQncyBub3Qgd2l0aGluIGJvdW5kcyBZP1xuICAgICAgICAgICAgICAgICAgICBpZiAobG93ZXN0Um93Rm9ySXRlbSAhPSBpdGVtUG9zLnJvdyAmJiB0aGlzLl9pc1dpdGhpbkJvdW5kc1kobmV3UG9zLCBpdGVtRGltcykpIHsgLy8gSWYgdGhlIGl0ZW0gaXMgbm90IGFscmVhZHkgb24gdGhpcyByb3cgbW92ZSBpdCB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0R3JpZFBvc2l0aW9uKG5ld1Bvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub25DYXNjYWRlRXZlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtRGltcy54OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdFJvd1BlckNvbHVtbi5zZXQoaXRlbVBvcy5jb2wgKyBpLCBsb3dlc3RSb3dGb3JJdGVtICsgaXRlbURpbXMueSk7IC8vIFVwZGF0ZSB0aGUgbG93ZXN0IHJvdyB0byBiZSBiZWxvdyB0aGUgaXRlbVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaXRlbXNJbkdyaWQgPSBpdGVtc0luR3JpZC5zb3J0KE5nR3JpZEhlbHBlci5zb3J0SXRlbXNCeVBvc2l0aW9uSG9yaXpvbnRhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXN0Q29sdW1uUGVyUm93OiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJbkdyaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbURpbXM6IE5nR3JpZEl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Qb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvd2VzdENvbHVtbkZvckl0ZW06IG51bWJlciA9IGxvd2VzdENvbHVtblBlclJvdy5nZXQoaXRlbVBvcy5yb3cpIHx8IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMTsgaSA8IGl0ZW1EaW1zLnk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvd2VzdE9mZnNldENvbHVtbjogbnVtYmVyID0gbG93ZXN0Q29sdW1uUGVyUm93LmdldChpdGVtUG9zLnJvdyArIGkpIHx8IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RDb2x1bW5Gb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0T2Zmc2V0Q29sdW1uLCBsb3dlc3RDb2x1bW5Gb3JJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvcFJvdyA9IGl0ZW1Qb3Mucm93O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3R0b21Sb3cgPSBpdGVtUG9zLnJvdyArIGl0ZW1EaW1zLnk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyAmJiBkaW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aXRoaW5Sb3dzID0gYm90dG9tUm93ID4gcG9zLmNvbCAmJiB0b3BSb3cgPCAocG9zLmNvbCArIGRpbXMueCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXRoaW5Sb3dzKSB7ICAgICAgICAgIC8vIElmIG91ciBlbGVtZW50IGlzIGluIG9uZSBvZiB0aGUgaXRlbSdzIHJvd3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb29tTmV4dFRvSXRlbSA9IGl0ZW1EaW1zLnggPD0gKHBvcy5jb2wgLSBsb3dlc3RDb2x1bW5Gb3JJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm9vbU5leHRUb0l0ZW0pIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGNhbid0IGZpdCBuZXh0IHRvIG91ciBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdENvbHVtbkZvckl0ZW0gPSBNYXRoLm1heChsb3dlc3RDb2x1bW5Gb3JJdGVtLCBwb3MuY29sICsgZGltcy54KTsgIC8vIFNldCB0aGUgbG93ZXN0IGNvbCB0byBiZSB0aGUgb3RoZXIgc2lkZSBvZiBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BvczogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IGxvd2VzdENvbHVtbkZvckl0ZW0sIHJvdzogaXRlbVBvcy5yb3cgfTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobG93ZXN0Q29sdW1uRm9ySXRlbSAhPSBpdGVtUG9zLmNvbCAmJiB0aGlzLl9pc1dpdGhpbkJvdW5kc1gobmV3UG9zLCBpdGVtRGltcykpIHsgLy8gSWYgdGhlIGl0ZW0gaXMgbm90IGFscmVhZHkgb24gdGhpcyBjb2wgbW92ZSBpdCB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0R3JpZFBvc2l0aW9uKG5ld1Bvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub25DYXNjYWRlRXZlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRvR3JpZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBpdGVtRGltcy55OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdENvbHVtblBlclJvdy5zZXQoaXRlbVBvcy5yb3cgKyBpLCBsb3dlc3RDb2x1bW5Gb3JJdGVtICsgaXRlbURpbXMueCk7IC8vIFVwZGF0ZSB0aGUgbG93ZXN0IGNvbCB0byBiZSBiZWxvdyB0aGUgaXRlbVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeEdyaWRQb3NpdGlvbihwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICBpZiAoIXRoaXMuX2hhc0dyaWRDb2xsaXNpb24ocG9zLCBkaW1zKSkgcmV0dXJuIHBvcztcblxuICAgICAgICBjb25zdCBtYXhSb3cgPSB0aGlzLl9tYXhSb3dzID09PSAwID8gdGhpcy5fZ2V0TWF4Um93KCkgOiB0aGlzLl9tYXhSb3dzO1xuICAgICAgICBjb25zdCBtYXhDb2wgPSB0aGlzLl9tYXhDb2xzID09PSAwID8gdGhpcy5fZ2V0TWF4Q29sKCkgOiB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBjb25zdCBuZXdQb3MgPSB7XG4gICAgICAgICAgICBjb2w6IHBvcy5jb2wsXG4gICAgICAgICAgICByb3c6IHBvcy5yb3csXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIGZpeExvb3A6XG4gICAgICAgICAgICBmb3IgKDsgbmV3UG9zLmNvbCA8PSBtYXhSb3c7KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblBhdGggPSB0aGlzLl9nZXRJdGVtc0luVmVydGljYWxQYXRoKG5ld1BvcywgZGltcywgbmV3UG9zLnJvdyk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRSb3cgPSBuZXdQb3Mucm93O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtc0luUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5yb3cgLSBuZXh0Um93ID49IGRpbXMueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zLnJvdyA9IG5leHRSb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBmaXhMb29wO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvdyA9IGl0ZW0ucm93ICsgaXRlbS5zaXpleTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWF4Um93IC0gbmV4dFJvdyA+PSBkaW1zLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zLnJvdyA9IG5leHRSb3c7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrIGZpeExvb3A7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmV3UG9zLmNvbCA9IE1hdGgubWF4KG5ld1Bvcy5jb2wgKyAxLCBNYXRoLm1pbi5hcHBseShNYXRoLCBpdGVtc0luUGF0aC5tYXAoKGl0ZW0pID0+IGl0ZW0uY29sICsgZGltcy54KSkpO1xuICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgZml4TG9vcDpcbiAgICAgICAgICAgIGZvciAoOyBuZXdQb3Mucm93IDw9IG1heFJvdzspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtc0luUGF0aCA9IHRoaXMuX2dldEl0ZW1zSW5Ib3Jpem9udGFsUGF0aChuZXdQb3MsIGRpbXMsIG5ld1Bvcy5jb2wpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sID0gbmV3UG9zLmNvbDtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJblBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29sIC0gbmV4dENvbCA+PSBkaW1zLngpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5jb2wgPSBuZXh0Q29sO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZml4TG9vcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG5leHRDb2wgPSBpdGVtLmNvbCArIGl0ZW0uc2l6ZXg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1heENvbCAtIG5leHRDb2wgPj0gZGltcy54KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5jb2wgPSBuZXh0Q29sO1xuICAgICAgICAgICAgICAgICAgICBicmVhayBmaXhMb29wO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSBNYXRoLm1heChuZXdQb3Mucm93ICsgMSwgTWF0aC5taW4uYXBwbHkoTWF0aCwgaXRlbXNJblBhdGgubWFwKChpdGVtKSA9PiBpdGVtLnJvdyArIGRpbXMueSkpKTtcbiAgICAgICAgICAgICAgICBuZXdQb3MuY29sID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXdQb3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0SXRlbXNJbkhvcml6b250YWxQYXRoKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgc3RhcnRDb2x1bW46IG51bWJlciA9IDApOiBOZ0dyaWRJdGVtW10ge1xuICAgICAgICBjb25zdCBpdGVtc0luUGF0aDogTmdHcmlkSXRlbVtdID0gW107XG4gICAgICAgIGNvbnN0IHRvcFJvdzogbnVtYmVyID0gcG9zLnJvdyArIGRpbXMueSAtIDE7XG5cbiAgICAgICAgdGhpcy5faXRlbXNJbkdyaWQuZm9yRWFjaCgoaXRlbUlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKTtcbiAgICAgICAgICAgIGlmIChpdGVtLmNvbCArIGl0ZW0uc2l6ZXggLSAxIDwgc3RhcnRDb2x1bW4pIHsgcmV0dXJuOyB9ICAgIC8vIEl0ZW0gZmFsbHMgYWZ0ZXIgc3RhcnQgY29sdW1uXG4gICAgICAgICAgICBpZiAoaXRlbS5yb3cgPiB0b3BSb3cpIHsgcmV0dXJuOyB9ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGZhbGxzIGFib3ZlIHBhdGhcbiAgICAgICAgICAgIGlmIChpdGVtLnJvdyArIGl0ZW0uc2l6ZXkgLSAxIDwgcG9zLnJvdykgeyByZXR1cm47IH0gICAgICAgIC8vIEl0ZW0gZmFsbHMgYmVsb3cgcGF0aFxuICAgICAgICAgICAgaXRlbXNJblBhdGgucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zSW5QYXRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEl0ZW1zSW5WZXJ0aWNhbFBhdGgocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplLCBzdGFydFJvdzogbnVtYmVyID0gMCk6IE5nR3JpZEl0ZW1bXSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zSW5QYXRoOiBOZ0dyaWRJdGVtW10gPSBbXTtcbiAgICAgICAgY29uc3QgcmlnaHRDb2w6IG51bWJlciA9IHBvcy5jb2wgKyBkaW1zLnggLSAxO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zSW5HcmlkLmZvckVhY2goKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5yb3cgKyBpdGVtLnNpemV5IC0gMSA8IHN0YXJ0Um93KSB7IHJldHVybjsgfSAgIC8vIEl0ZW0gZmFsbHMgYWJvdmUgc3RhcnQgcm93XG4gICAgICAgICAgICBpZiAoaXRlbS5jb2wgPiByaWdodENvbCkgeyByZXR1cm47IH0gICAgICAgICAgICAgICAgICAgIC8vIEl0ZW0gZmFsbHMgYWZ0ZXIgcGF0aFxuICAgICAgICAgICAgaWYgKGl0ZW0uY29sICsgaXRlbS5zaXpleCAtIDEgPCBwb3MuY29sKSB7IHJldHVybjsgfSAgICAvLyBJdGVtIGZhbGxzIGJlZm9yZSBwYXRoXG4gICAgICAgICAgICBpdGVtc0luUGF0aC5wdXNoKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaXRlbXNJblBhdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNXaXRoaW5Cb3VuZHNYKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgYWxsb3dFeGNlc3NpdmVJdGVtczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhDb2xzID09IDAgfHwgKGFsbG93RXhjZXNzaXZlSXRlbXMgJiYgcG9zLmNvbCA9PSAxKSB8fCAocG9zLmNvbCArIGRpbXMueCAtIDEpIDw9IHRoaXMuX21heENvbHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4UG9zVG9Cb3VuZHNYKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1Qb3NpdGlvbiB7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIHBvcy5jb2wgPSBNYXRoLm1heCh0aGlzLl9tYXhDb2xzIC0gKGRpbXMueCAtIDEpLCAxKTtcbiAgICAgICAgICAgIHBvcy5yb3cgKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maXhTaXplVG9Cb3VuZHNYKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1gocG9zLCBkaW1zKSkge1xuICAgICAgICAgICAgZGltcy54ID0gTWF0aC5tYXgodGhpcy5fbWF4Q29scyAtIChwb3MuY29sIC0gMSksIDEpO1xuICAgICAgICAgICAgZGltcy55Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNXaXRoaW5Cb3VuZHNZKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgYWxsb3dFeGNlc3NpdmVJdGVtczogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhSb3dzID09IDAgfHwgKGFsbG93RXhjZXNzaXZlSXRlbXMgJiYgcG9zLnJvdyA9PSAxKSB8fCAocG9zLnJvdyArIGRpbXMueSAtIDEpIDw9IHRoaXMuX21heFJvd3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4UG9zVG9Cb3VuZHNZKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1Qb3NpdGlvbiB7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIHBvcy5yb3cgPSBNYXRoLm1heCh0aGlzLl9tYXhSb3dzIC0gKGRpbXMueSAtIDEpLCAxKTtcbiAgICAgICAgICAgIHBvcy5jb2wrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFNpemVUb0JvdW5kc1kocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVNpemUge1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWShwb3MsIGRpbXMpKSB7XG4gICAgICAgICAgICBkaW1zLnkgPSBNYXRoLm1heCh0aGlzLl9tYXhSb3dzIC0gKHBvcy5yb3cgLSAxKSwgMSk7XG4gICAgICAgICAgICBkaW1zLngrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGltcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1dpdGhpbkJvdW5kcyhwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUsIGFsbG93RXhjZXNzaXZlSXRlbXM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHBvcywgZGltcywgYWxsb3dFeGNlc3NpdmVJdGVtcykgJiYgdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHBvcywgZGltcywgYWxsb3dFeGNlc3NpdmVJdGVtcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4UG9zVG9Cb3VuZHMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeFBvc1RvQm91bmRzWCh0aGlzLl9maXhQb3NUb0JvdW5kc1kocG9zLCBkaW1zKSwgZGltcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4U2l6ZVRvQm91bmRzKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeFNpemVUb0JvdW5kc1gocG9zLCB0aGlzLl9maXhTaXplVG9Cb3VuZHNZKHBvcywgZGltcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZFRvR3JpZChpdGVtOiBOZ0dyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIGxldCBwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGRpbXM6IE5nR3JpZEl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2hhc0dyaWRDb2xsaXNpb24ocG9zLCBkaW1zKSkge1xuICAgICAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnMocG9zLCBkaW1zKTtcbiAgICAgICAgICAgIHBvcyA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYWxsb3dPdmVybGFwKSB7XG4gICAgICAgICAgICBpdGVtLnpJbmRleCA9IHRoaXMuX2xhc3RaVmFsdWUrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2l0ZW1zSW5HcmlkLmFkZChpdGVtLnVpZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlRnJvbUdyaWQoaXRlbTogTmdHcmlkSXRlbSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5kZWxldGUoaXRlbS51aWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVNpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgbGV0IG1heENvbDogbnVtYmVyID0gdGhpcy5fZ2V0TWF4Q29sKCk7XG4gICAgICAgIGxldCBtYXhSb3c6IG51bWJlciA9IHRoaXMuX2dldE1heFJvdygpO1xuXG4gICAgICAgIGlmIChtYXhDb2wgIT0gdGhpcy5fY3VyTWF4Q29sIHx8IG1heFJvdyAhPSB0aGlzLl9jdXJNYXhSb3cpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1ck1heENvbCA9IG1heENvbDtcbiAgICAgICAgICAgIHRoaXMuX2N1ck1heFJvdyA9IG1heFJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsICcxMDAlJyk7Ly8obWF4Q29sICogKHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0KSkrJ3B4Jyk7XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudEJhc2VkRHluYW1pY1Jvd0hlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIChtYXhSb3cgKiAodGhpcy5yb3dIZWlnaHQgKyB0aGlzLm1hcmdpblRvcCArIHRoaXMubWFyZ2luQm90dG9tKSkgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1heFJvdygpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpdGVtc1Jvd3M6IG51bWJlcltdID0gQXJyYXkuZnJvbSh0aGlzLl9pdGVtc0luR3JpZCwgKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiAwO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucm93ICsgaXRlbS5zaXpleSAtIDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBpdGVtc1Jvd3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1heENvbCgpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBpdGVtc0NvbHM6IG51bWJlcltdID0gQXJyYXkuZnJvbSh0aGlzLl9pdGVtc0luR3JpZCwgKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiAwO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY29sICsgaXRlbS5zaXpleCAtIDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBpdGVtc0NvbHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1vdXNlUG9zaXRpb24oZTogYW55KTogTmdHcmlkUmF3UG9zaXRpb24ge1xuICAgICAgICBpZiAoKCg8YW55PndpbmRvdykuVG91Y2hFdmVudCAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkgfHwgKGUudG91Y2hlcyB8fCBlLmNoYW5nZWRUb3VjaGVzKSkge1xuICAgICAgICAgICAgZSA9IGUudG91Y2hlcy5sZW5ndGggPiAwID8gZS50b3VjaGVzWzBdIDogZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlZlBvczogYW55ID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGxldCBsZWZ0OiBudW1iZXIgPSBlLmNsaWVudFggLSByZWZQb3MubGVmdDtcbiAgICAgICAgbGV0IHRvcDogbnVtYmVyID0gZS5jbGllbnRZIC0gcmVmUG9zLnRvcDtcblxuICAgICAgICBpZiAodGhpcy5jYXNjYWRlID09ICdkb3duJykgdG9wID0gcmVmUG9zLnRvcCArIHJlZlBvcy5oZWlnaHQgLSBlLmNsaWVudFk7XG4gICAgICAgIGlmICh0aGlzLmNhc2NhZGUgPT0gJ3JpZ2h0JykgbGVmdCA9IHJlZlBvcy5sZWZ0ICsgcmVmUG9zLndpZHRoIC0gZS5jbGllbnRYO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5fem9vbU9uRHJhZykge1xuICAgICAgICAgICAgbGVmdCAqPSAyO1xuICAgICAgICAgICAgdG9wICo9IDI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgIHRvcDogdG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0QWJzb2x1dGVNb3VzZVBvc2l0aW9uKGU6IGFueSk6IE5nR3JpZFJhd1Bvc2l0aW9uIHtcbiAgICAgICAgaWYgKCgoPGFueT53aW5kb3cpLlRvdWNoRXZlbnQgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHx8IChlLnRvdWNoZXMgfHwgZS5jaGFuZ2VkVG91Y2hlcykpIHtcbiAgICAgICAgICAgIGUgPSBlLnRvdWNoZXMubGVuZ3RoID4gMCA/IGUudG91Y2hlc1swXSA6IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogZS5jbGllbnRYLFxuICAgICAgICAgICAgdG9wOiBlLmNsaWVudFlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRDb250YWluZXJDb2x1bW5zKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoOiBudW1iZXIgPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IGl0ZW1XaWR0aDogbnVtYmVyID0gdGhpcy5jb2xXaWR0aCArIHRoaXMubWFyZ2luTGVmdCArIHRoaXMubWFyZ2luUmlnaHQ7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG1heFdpZHRoIC8gaXRlbVdpZHRoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRDb250YWluZXJSb3dzKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IG1heEhlaWdodDogbnVtYmVyID0gd2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5tYXJnaW5Ub3AgLSB0aGlzLm1hcmdpbkJvdHRvbTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobWF4SGVpZ2h0IC8gKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFNjcmVlbk1hcmdpbigpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBtYXhXaWR0aDogbnVtYmVyID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCBpdGVtV2lkdGg6IG51bWJlciA9IHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0O1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigobWF4V2lkdGggLSAodGhpcy5fbWF4Q29scyAqIGl0ZW1XaWR0aCkpIC8gMik7O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEl0ZW1Gcm9tUG9zaXRpb24ocG9zaXRpb246IE5nR3JpZFJhd1Bvc2l0aW9uKTogTmdHcmlkSXRlbSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zSW5HcmlkLCAoaXRlbUlkOiBzdHJpbmcpID0+IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpKS5maW5kKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgY29uc3Qgc2l6ZTogTmdHcmlkSXRlbURpbWVuc2lvbnMgPSBpdGVtLmdldERpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgIGNvbnN0IHBvczogTmdHcmlkUmF3UG9zaXRpb24gPSBpdGVtLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbi5sZWZ0ID49IHBvcy5sZWZ0ICYmIHBvc2l0aW9uLmxlZnQgPCAocG9zLmxlZnQgKyBzaXplLndpZHRoKSAmJlxuICAgICAgICAgICAgcG9zaXRpb24udG9wID49IHBvcy50b3AgJiYgcG9zaXRpb24udG9wIDwgKHBvcy50b3AgKyBzaXplLmhlaWdodCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVBsYWNlaG9sZGVyKGl0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGl0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ0dyaWRQbGFjZWhvbGRlcik7XG4gICAgICAgIHZhciBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxOZ0dyaWRQbGFjZWhvbGRlcj4gPSBpdGVtLmNvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyUmVmID0gY29tcG9uZW50UmVmO1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlcjogTmdHcmlkUGxhY2Vob2xkZXIgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgICAgIHBsYWNlaG9sZGVyLnJlZ2lzdGVyR3JpZCh0aGlzKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuc2V0Q2FzY2FkZU1vZGUodGhpcy5jYXNjYWRlKTtcbiAgICAgICAgcGxhY2Vob2xkZXIuc2V0R3JpZFBvc2l0aW9uKHsgY29sOiBwb3MuY29sLCByb3c6IHBvcy5yb3cgfSk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnNldFNpemUoeyB4OiBkaW1zLngsIHk6IGRpbXMueSB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9lbWl0T25JdGVtQ2hhbmdlKCkge1xuICAgICAgICBjb25zdCBpdGVtT3V0cHV0OiBhbnlbXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQpXG4gICAgICAgICAgICAubWFwKChpdGVtSWQ6IHN0cmluZykgPT4gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkpXG4gICAgICAgICAgICAuZmlsdGVyKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiAhIWl0ZW0pXG4gICAgICAgICAgICAubWFwKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiBpdGVtLmdldEV2ZW50T3V0cHV0KCkpO1xuXG4gICAgICAgIHRoaXMub25JdGVtQ2hhbmdlLmVtaXQoaXRlbU91dHB1dCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVmaW5lTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHRoaXMuX2RvY3VtZW50TW91c2Vtb3ZlJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudE1vdXNldXAkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAgICAgICB0aGlzLl9tb3VzZWRvd24kID0gZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZWRvd24nKTtcbiAgICAgICAgdGhpcy5fbW91c2Vtb3ZlJCA9IGZyb21FdmVudChlbGVtZW50LCAnbW91c2Vtb3ZlJyk7XG4gICAgICAgIHRoaXMuX21vdXNldXAkID0gZnJvbUV2ZW50KGVsZW1lbnQsICdtb3VzZXVwJyk7XG4gICAgICAgIHRoaXMuX3RvdWNoc3RhcnQkID0gZnJvbUV2ZW50KGVsZW1lbnQsICd0b3VjaHN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuX3RvdWNobW92ZSQgPSBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNobW92ZScpO1xuICAgICAgICB0aGlzLl90b3VjaGVuZCQgPSBmcm9tRXZlbnQoZWxlbWVudCwgJ3RvdWNoZW5kJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW5hYmxlTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlZExpc3RlbmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbmFibGVNb3VzZUxpc3RlbmVycygpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZVRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbmFibGVkTGlzdGVuZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc2FibGVMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3ViczogU3Vic2NyaXB0aW9uKSA9PiBzdWJzLnVuc3Vic2NyaWJlKCkpO1xuICAgICAgICB0aGlzLl9lbmFibGVkTGlzdGVuZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1RvdWNoRGV2aWNlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDA7XG4gICAgfTtcblxuICAgIHByaXZhdGUgX2VuYWJsZVRvdWNoTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b3VjaHN0YXJ0U3VicyA9IHRoaXMuX3RvdWNoc3RhcnQkLnN1YnNjcmliZSgoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5tb3VzZURvd25FdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCB0b3VjaG1vdmVTdWJzID0gdGhpcy5fdG91Y2htb3ZlJC5zdWJzY3JpYmUoKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMubW91c2VNb3ZlRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgdG91Y2hlbmRTdWJzID0gdGhpcy5fdG91Y2hlbmQkLnN1YnNjcmliZSgoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5tb3VzZVVwRXZlbnRIYW5kbGVyKGUpKTtcblxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgICAgICB0b3VjaHN0YXJ0U3VicyxcbiAgICAgICAgICAgIHRvdWNobW92ZVN1YnMsXG4gICAgICAgICAgICB0b3VjaGVuZFN1YnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9lbmFibGVNb3VzZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRNb3VzZW1vdmVTdWJzID0gdGhpcy5fZG9jdW1lbnRNb3VzZW1vdmUkLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5tb3VzZU1vdmVFdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCBkb2N1bWVudE1vdXNldXBTdWJzID0gdGhpcy5fZG9jdW1lbnRNb3VzZXVwJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VVcEV2ZW50SGFuZGxlcihlKSk7XG4gICAgICAgIGNvbnN0IG1vdXNlZG93blN1YnMgPSB0aGlzLl9tb3VzZWRvd24kLnN1YnNjcmliZSgoZTogTW91c2VFdmVudCkgPT4gdGhpcy5tb3VzZURvd25FdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCBtb3VzZW1vdmVTdWJzID0gdGhpcy5fbW91c2Vtb3ZlJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VNb3ZlRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgbW91c2V1cFN1YnMgPSB0aGlzLl9tb3VzZXVwJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VVcEV2ZW50SGFuZGxlcihlKSk7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgZG9jdW1lbnRNb3VzZW1vdmVTdWJzLFxuICAgICAgICAgICAgZG9jdW1lbnRNb3VzZXVwU3VicyxcbiAgICAgICAgICAgIG1vdXNlZG93blN1YnMsXG4gICAgICAgICAgICBtb3VzZW1vdmVTdWJzLFxuICAgICAgICAgICAgbW91c2V1cFN1YnNcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=