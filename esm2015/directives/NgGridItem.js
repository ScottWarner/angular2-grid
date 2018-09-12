/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgGrid } from './NgGrid';
import { Directive, ElementRef, Renderer2, EventEmitter, KeyValueDiffers, ViewContainerRef, Output } from '@angular/core';
export class NgGridItem {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmdHcmlkSXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWdyaWQvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL05nR3JpZEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFbEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBa0IsZUFBZSxFQUFxQixnQkFBZ0IsRUFBRSxNQUFNLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFNdEssTUFBTTs7Ozs7Ozs7SUE2SEYsWUFDWSxVQUNBLE9BQ0EsV0FDQSxTQUNEO1FBSkMsYUFBUSxHQUFSLFFBQVE7UUFDUixVQUFLLEdBQUwsS0FBSztRQUNMLGNBQVMsR0FBVCxTQUFTO1FBQ1QsWUFBTyxHQUFQLE9BQU87UUFDUixpQkFBWSxHQUFaLFlBQVk7OzRCQWhJd0MsSUFBSSxZQUFZLENBQWtCLEtBQUssQ0FBQzsyQkFDekMsSUFBSSxZQUFZLEVBQW1CO3NCQUN4QyxJQUFJLFlBQVksRUFBbUI7MEJBQy9CLElBQUksWUFBWSxFQUFtQjt5QkFDcEMsSUFBSSxZQUFZLEVBQW1COzZCQUMvQixJQUFJLFlBQVksRUFBbUI7d0JBQ3hDLElBQUksWUFBWSxFQUFtQjs0QkFDL0IsSUFBSSxZQUFZLEVBQW1COzJCQUNwQyxJQUFJLFlBQVksRUFBbUI7NkJBQ2pDLElBQUksWUFBWSxFQUFtQjt3QkFDeEMsSUFBSSxZQUFZLEVBQW1COzRCQUMvQixJQUFJLFlBQVksRUFBbUI7MkJBQ3BDLElBQUksWUFBWSxFQUFtQjtnQ0FDN0IsSUFBSSxZQUFZLEVBQW9CO3VCQWtCOUUsS0FBSzsyQkFDRCxJQUFJOzJCQUNKLElBQUk7d0JBQ1IsQ0FBQzt5QkFDQSxDQUFDO21CQUNQLElBQUk7Z0NBSXNCLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO3FCQUNqQyxFQUFFLENB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LElBQUksQ0FBQyxRQUFRLENBQUM7UUFFOUUsdUJBQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRTFNLHVCQUFNLFVBQVUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuSSxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FB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QkFDTixNQUFNO3VCQUNOLE1BQU07MkJBQ04sTUFBTTswQkFDTixNQUFNOzRCQUNOLE1BQU07dUJBQ04sTUFBTTsyQkFDTixNQUFNOzBCQUNOLE1BQU07K0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nR3JpZCB9IGZyb20gJy4vTmdHcmlkJztcbmltcG9ydCB7IE5nR3JpZEl0ZW1Db25maWcsIE5nR3JpZEl0ZW1FdmVudCwgTmdHcmlkSXRlbVBvc2l0aW9uLCBOZ0dyaWRJdGVtU2l6ZSwgTmdHcmlkUmF3UG9zaXRpb24sIE5nR3JpZEl0ZW1EaW1lbnNpb25zLCBSZXNpemVIYW5kbGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL0lOZ0dyaWQnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIEV2ZW50RW1pdHRlciwgS2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVycywgT25Jbml0LCBPbkRlc3Ryb3ksIFZpZXdDb250YWluZXJSZWYsIE91dHB1dCwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tuZ0dyaWRJdGVtXScsXG4gICAgaW5wdXRzOiBbJ2NvbmZpZzogbmdHcmlkSXRlbSddXG59KVxuZXhwb3J0IGNsYXNzIE5nR3JpZEl0ZW0gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgRG9DaGVjayB7XG4gICAgLy8gRXZlbnQgRW1pdHRlcnNcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uSXRlbUNoYW5nZTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oZmFsc2UpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWc6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWdTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnQW55OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNpemVTdGFydDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uUmVzaXplOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNpemVTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNpemVBbnk6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkNoYW5nZVN0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkNoYW5nZVN0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkNoYW5nZUFueTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG5nR3JpZEl0ZW1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtQ29uZmlnPiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUNvbmZpZz4oKTtcblxuICAgIC8vIERlZmF1bHQgY29uZmlnXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ09OU1RfREVGQVVMVF9DT05GSUc6IE5nR3JpZEl0ZW1Db25maWcgPSB7XG4gICAgICAgIHVpZDogbnVsbCxcbiAgICAgICAgY29sOiAxLFxuICAgICAgICByb3c6IDEsXG4gICAgICAgIHNpemV4OiAxLFxuICAgICAgICBzaXpleTogMSxcbiAgICAgICAgZHJhZ0hhbmRsZTogbnVsbCxcbiAgICAgICAgcmVzaXplSGFuZGxlOiBudWxsLFxuICAgICAgICBmaXhlZDogZmFsc2UsXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgcmVzaXphYmxlOiB0cnVlLFxuICAgICAgICBib3JkZXJTaXplOiAyNSxcbiAgICAgICAgcmVzaXplRGlyZWN0aW9uczogbnVsbCxcbiAgICB9O1xuXG4gICAgcHVibGljIGlzRml4ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNEcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBpc1Jlc2l6YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIG1pbldpZHRoOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyBtaW5IZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHVibGljIHVpZDogc3RyaW5nID0gbnVsbDtcblxuICAgIC8vIFByaXZhdGUgdmFyaWFibGVzXG4gICAgcHJpdmF0ZSBfcGF5bG9hZDogYW55O1xuICAgIHByaXZhdGUgX2N1cnJlbnRQb3NpdGlvbjogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IDEsIHJvdzogMSB9O1xuICAgIHByaXZhdGUgX3NpemU6IE5nR3JpZEl0ZW1TaXplID0geyB4OiAxLCB5OiAxIH07XG4gICAgcHJpdmF0ZSBfY29uZmlnID0gTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRztcbiAgICBwcml2YXRlIF91c2VyQ29uZmlnID0gbnVsbDtcbiAgICBwcml2YXRlIF9kcmFnSGFuZGxlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfcmVzaXplSGFuZGxlOiBSZXNpemVIYW5kbGU7XG4gICAgcHJpdmF0ZSBfYm9yZGVyU2l6ZTogbnVtYmVyO1xuICAgIHByaXZhdGUgX2VsZW1XaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2VsZW1IZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9lbGVtTGVmdDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2VsZW1Ub3A6IG51bWJlcjtcbiAgICBwcml2YXRlIF9hZGRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2RpZmZlcjogS2V5VmFsdWVEaWZmZXI8c3RyaW5nLCBhbnk+O1xuICAgIHByaXZhdGUgX2Nhc2NhZGVNb2RlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfbWF4Q29sczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9taW5Db2xzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX21heFJvd3M6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWluUm93czogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9yZXNpemVEaXJlY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByaXZhdGUgX3pJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHNldCB6SW5kZXgoekluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsIHpJbmRleC50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5fekluZGV4ID0gekluZGV4O1xuICAgIH1cblxuICAgIGdldCB6SW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3pJbmRleDtcbiAgICB9XG5cbiAgICAvLyBbbmctZ3JpZC1pdGVtXSBoYW5kbGVyXG4gICAgc2V0IGNvbmZpZyh2OiBOZ0dyaWRJdGVtQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuX3VzZXJDb25maWcgPSB2O1xuXG4gICAgICAgIGNvbnN0IGNvbmZpZ09iamVjdCA9IE9iamVjdC5hc3NpZ24oe30sIE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcsIHYpO1xuICAgICAgICBmb3IgKGxldCB4IGluIE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcpXG4gICAgICAgICAgICBpZiAoY29uZmlnT2JqZWN0W3hdID09IG51bGwpXG4gICAgICAgICAgICAgICAgY29uZmlnT2JqZWN0W3hdID0gTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJR1t4XTtcblxuICAgICAgICB0aGlzLnNldENvbmZpZyhjb25maWdPYmplY3QpO1xuXG4gICAgICAgIGlmICh0aGlzLl91c2VyQ29uZmlnICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaWZmZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZCh0aGlzLl91c2VyQ29uZmlnKS5jcmVhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZGlmZmVyLmRpZmYodGhpcy5fdXNlckNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2FkZGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9uZ0dyaWQuYWRkSXRlbSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNpemV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplLng7XG4gICAgfVxuXG4gICAgZ2V0IHNpemV5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplLnk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbDtcbiAgICB9XG5cbiAgICBnZXQgcm93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UG9zaXRpb24ucm93O1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50Q29sKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UG9zaXRpb24uY29sO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50Um93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UG9zaXRpb24ucm93O1xuICAgIH1cblxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2RpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgcHJpdmF0ZSBfbmdFbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBfbmdHcmlkOiBOZ0dyaWQsXG4gICAgICAgIHB1YmxpYyBjb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgKSB7IH1cblxuICAgIHB1YmxpYyBvblJlc2l6ZVN0YXJ0RXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25SZXNpemVTdGFydC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUFueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVN0YXJ0LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBwdWJsaWMgb25SZXNpemVFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUFueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgcHVibGljIG9uUmVzaXplU3RvcEV2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RvcC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZUFueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVN0b3AuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG5cbiAgICAgICAgdGhpcy5vbkNvbmZpZ0NoYW5nZUV2ZW50KCk7XG4gICAgfVxuICAgIHB1YmxpYyBvbkRyYWdTdGFydEV2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uRHJhZ1N0YXJ0LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uRHJhZ0FueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVN0YXJ0LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBwdWJsaWMgb25EcmFnRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25EcmFnLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uRHJhZ0FueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgcHVibGljIG9uRHJhZ1N0b3BFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vbkRyYWdTdG9wLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uRHJhZ0FueS5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZVN0b3AuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG5cbiAgICAgICAgdGhpcy5vbkNvbmZpZ0NoYW5nZUV2ZW50KCk7XG4gICAgfVxuICAgIHB1YmxpYyBvbkNhc2NhZGVFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNvbmZpZ0NoYW5nZUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdncmlkLWl0ZW0nKTtcbiAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5hdXRvU3R5bGUpIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgLy8gRm9yY2UgYSBjb25maWcgdXBkYXRlIGluIGNhc2UgdGhlcmUgaXMgbm8gY29uZmlnIGFzc2lnbmVkXG4gICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5fdXNlckNvbmZpZztcbiAgICB9XG5cbiAgICAvLyBQdWJsaWMgbWV0aG9kc1xuICAgIHB1YmxpYyBjYW5EcmFnKGU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuaXNEcmFnZ2FibGUpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5fZHJhZ0hhbmRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEhhbmRsZSh0aGlzLl9kcmFnSGFuZGxlLCBlLnRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmluZEhhbmRsZShoYW5kbGVTZWxlY3Rvcjogc3RyaW5nLCBzdGFydEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0RWxlbTogYW55ID0gc3RhcnRFbGVtZW50O1xuXG4gICAgICAgICAgICB3aGlsZSAodGFyZ2V0RWxlbSAmJiB0YXJnZXRFbGVtICE9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRNYXRjaGVzKHRhcmdldEVsZW0sIGhhbmRsZVNlbGVjdG9yKSkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgICAgICB0YXJnZXRFbGVtID0gdGFyZ2V0RWxlbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYW5SZXNpemUoZTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVzaXphYmxlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5fcmVzaXplSGFuZGxlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3Jlc2l6ZUhhbmRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kSGFuZGxlKHRoaXMuX3Jlc2l6ZUhhbmRsZSwgZS50YXJnZXQpID8gJ2JvdHRvbXJpZ2h0JyA6IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcmVzaXplSGFuZGxlICE9PSAnb2JqZWN0JykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc2l6ZURpcmVjdGlvbnMgPSBbICdib3R0b21yaWdodCcsICdib3R0b21sZWZ0JywgJ3RvcHJpZ2h0JywgJ3RvcGxlZnQnLCAncmlnaHQnLCAnbGVmdCcsICdib3R0b20nLCAndG9wJyBdO1xuICAgICAgICAgICAgZm9yIChsZXQgZGlyZWN0aW9uIG9mIHJlc2l6ZURpcmVjdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uIGluIHRoaXMuX3Jlc2l6ZUhhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maW5kSGFuZGxlKHRoaXMuX3Jlc2l6ZUhhbmRsZVtkaXJlY3Rpb25dLCBlLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvcmRlclNpemUgPD0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgY29uc3QgbW91c2VQb3M6IE5nR3JpZFJhd1Bvc2l0aW9uID0gdGhpcy5fZ2V0TW91c2VQb3NpdGlvbihlKTtcblxuICAgICAgICBmb3IgKGxldCBkaXJlY3Rpb24gb2YgdGhpcy5fcmVzaXplRGlyZWN0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FuUmVzaXplSW5EaXJlY3Rpb24oZGlyZWN0aW9uLCBtb3VzZVBvcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTW91c2VNb3ZlKGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmF1dG9TdHlsZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5yZXNpemVFbmFibGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNpemVEaXJlY3Rpb24gPSB0aGlzLmNhblJlc2l6ZShlKTtcblxuICAgICAgICAgICAgICAgIGxldCBjdXJzb3I6IHN0cmluZyA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc2l6ZURpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdib3R0b21yaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yID0gJ253c2UtcmVzaXplJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0b3ByaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbWxlZnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yID0gJ25lc3ctcmVzaXplJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yID0gJ25zLXJlc2l6ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA9ICdldy1yZXNpemUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmRyYWdFbmFibGUgJiYgdGhpcy5jYW5EcmFnKGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yID0gJ21vdmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgY3Vyc29yKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmdHcmlkLmRyYWdFbmFibGUgJiYgdGhpcy5jYW5EcmFnKGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ21vdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2FkZGVkKSB0aGlzLl9uZ0dyaWQucmVtb3ZlSXRlbSh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyAgICBHZXR0ZXJzXG4gICAgcHVibGljIGdldEVsZW1lbnQoKTogRWxlbWVudFJlZiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uZ0VsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREcmFnSGFuZGxlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kcmFnSGFuZGxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSZXNpemVIYW5kbGUoKTogUmVzaXplSGFuZGxlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZUhhbmRsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGltZW5zaW9ucygpOiBOZ0dyaWRJdGVtRGltZW5zaW9ucyB7XG4gICAgICAgIHJldHVybiB7ICd3aWR0aCc6IHRoaXMuX2VsZW1XaWR0aCwgJ2hlaWdodCc6IHRoaXMuX2VsZW1IZWlnaHQgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2l6ZSgpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQb3NpdGlvbigpOiBOZ0dyaWRSYXdQb3NpdGlvbiB7XG4gICAgICAgIHJldHVybiB7ICdsZWZ0JzogdGhpcy5fZWxlbUxlZnQsICd0b3AnOiB0aGlzLl9lbGVtVG9wIH07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEdyaWRQb3NpdGlvbigpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFBvc2l0aW9uO1xuICAgIH1cblxuICAgIC8vICAgIFNldHRlcnNcbiAgICBwdWJsaWMgc2V0Q29uZmlnKGNvbmZpZzogTmdHcmlkSXRlbUNvbmZpZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IGNvbmZpZy5wYXlsb2FkO1xuICAgICAgICB0aGlzLl9jdXJyZW50UG9zaXRpb24uY29sID0gY29uZmlnLmNvbCA/IGNvbmZpZy5jb2wgOiBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHLmNvbDtcbiAgICAgICAgdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdyA9IGNvbmZpZy5yb3cgPyBjb25maWcucm93IDogTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRy5yb3c7XG4gICAgICAgIHRoaXMuX3NpemUueCA9IGNvbmZpZy5zaXpleCA/IGNvbmZpZy5zaXpleCA6IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcuc2l6ZXg7XG4gICAgICAgIHRoaXMuX3NpemUueSA9IGNvbmZpZy5zaXpleSA/IGNvbmZpZy5zaXpleSA6IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcuc2l6ZXk7XG4gICAgICAgIHRoaXMuX2RyYWdIYW5kbGUgPSBjb25maWcuZHJhZ0hhbmRsZTtcbiAgICAgICAgdGhpcy5fcmVzaXplSGFuZGxlID0gY29uZmlnLnJlc2l6ZUhhbmRsZTtcbiAgICAgICAgdGhpcy5fYm9yZGVyU2l6ZSA9IGNvbmZpZy5ib3JkZXJTaXplO1xuICAgICAgICB0aGlzLmlzRHJhZ2dhYmxlID0gY29uZmlnLmRyYWdnYWJsZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Jlc2l6YWJsZSA9IGNvbmZpZy5yZXNpemFibGUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuaXNGaXhlZCA9IGNvbmZpZy5maXhlZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVzaXplRGlyZWN0aW9ucyA9IGNvbmZpZy5yZXNpemVEaXJlY3Rpb25zIHx8IHRoaXMuX25nR3JpZC5yZXNpemVEaXJlY3Rpb25zO1xuXG4gICAgICAgIHRoaXMuX21heENvbHMgPSAhaXNOYU4oY29uZmlnLm1heENvbHMpICYmIGlzRmluaXRlKGNvbmZpZy5tYXhDb2xzKSA/IGNvbmZpZy5tYXhDb2xzIDogMDtcbiAgICAgICAgdGhpcy5fbWluQ29scyA9ICFpc05hTihjb25maWcubWluQ29scykgJiYgaXNGaW5pdGUoY29uZmlnLm1pbkNvbHMpID8gY29uZmlnLm1pbkNvbHMgOiAwO1xuICAgICAgICB0aGlzLl9tYXhSb3dzID0gIWlzTmFOKGNvbmZpZy5tYXhSb3dzKSAmJiBpc0Zpbml0ZShjb25maWcubWF4Um93cykgPyBjb25maWcubWF4Um93cyA6IDA7XG4gICAgICAgIHRoaXMuX21pblJvd3MgPSAhaXNOYU4oY29uZmlnLm1pblJvd3MpICYmIGlzRmluaXRlKGNvbmZpZy5taW5Sb3dzKSA/IGNvbmZpZy5taW5Sb3dzIDogMDtcblxuICAgICAgICB0aGlzLm1pbldpZHRoID0gIWlzTmFOKGNvbmZpZy5taW5XaWR0aCkgJiYgaXNGaW5pdGUoY29uZmlnLm1pbldpZHRoKSA/IGNvbmZpZy5taW5XaWR0aCA6IDA7XG4gICAgICAgIHRoaXMubWluSGVpZ2h0ID0gIWlzTmFOKGNvbmZpZy5taW5IZWlnaHQpICYmIGlzRmluaXRlKGNvbmZpZy5taW5IZWlnaHQpID8gY29uZmlnLm1pbkhlaWdodCA6IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX21pbkNvbHMgPiAwICYmIHRoaXMuX21heENvbHMgPiAwICYmIHRoaXMuX21pbkNvbHMgPiB0aGlzLl9tYXhDb2xzKSB0aGlzLl9taW5Db2xzID0gMDtcbiAgICAgICAgaWYgKHRoaXMuX21pblJvd3MgPiAwICYmIHRoaXMuX21heFJvd3MgPiAwICYmIHRoaXMuX21pblJvd3MgPiB0aGlzLl9tYXhSb3dzKSB0aGlzLl9taW5Sb3dzID0gMDtcblxuICAgICAgICBpZiAodGhpcy5fYWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX25nR3JpZC51cGRhdGVJdGVtKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuZml4UmVzaXplKHRoaXMuX3NpemUpO1xuXG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nRG9DaGVjaygpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzOiBhbnkgPSB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl91c2VyQ29uZmlnKTtcblxuICAgICAgICAgICAgaWYgKGNoYW5nZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseUNoYW5nZXMoY2hhbmdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNpemUobmV3U2l6ZTogTmdHcmlkSXRlbVNpemUsIHVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgbmV3U2l6ZSA9IHRoaXMuZml4UmVzaXplKG5ld1NpemUpO1xuICAgICAgICB0aGlzLl9zaXplID0gbmV3U2l6ZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkgdGhpcy5fcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgdGhpcy5vbkl0ZW1DaGFuZ2UuZW1pdCh0aGlzLmdldEV2ZW50T3V0cHV0KCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRHcmlkUG9zaXRpb24oZ3JpZFBvc2l0aW9uOiBOZ0dyaWRJdGVtUG9zaXRpb24sIHVwZGF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFBvc2l0aW9uID0gZ3JpZFBvc2l0aW9uO1xuICAgICAgICBpZiAodXBkYXRlKSB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vbkl0ZW1DaGFuZ2UuZW1pdCh0aGlzLmdldEV2ZW50T3V0cHV0KCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRFdmVudE91dHB1dCgpOiBOZ0dyaWRJdGVtRXZlbnQge1xuICAgICAgICByZXR1cm4gPE5nR3JpZEl0ZW1FdmVudD57XG4gICAgICAgICAgICB1aWQ6IHRoaXMudWlkLFxuICAgICAgICAgICAgcGF5bG9hZDogdGhpcy5fcGF5bG9hZCxcbiAgICAgICAgICAgIGNvbDogdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbCxcbiAgICAgICAgICAgIHJvdzogdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdyxcbiAgICAgICAgICAgIHNpemV4OiB0aGlzLl9zaXplLngsXG4gICAgICAgICAgICBzaXpleTogdGhpcy5fc2l6ZS55LFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuX2VsZW1XaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5fZWxlbUhlaWdodCxcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMuX2VsZW1MZWZ0LFxuICAgICAgICAgICAgdG9wOiB0aGlzLl9lbGVtVG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fY2FzY2FkZU1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgeCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHkgKyAncHgnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIHggKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB5ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgeCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIHkgKyAncHgnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VsZW1MZWZ0ID0geDtcbiAgICAgICAgdGhpcy5fZWxlbVRvcCA9IHk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENhc2NhZGVNb2RlKGNhc2NhZGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jYXNjYWRlTW9kZSA9IGNhc2NhZGU7XG4gICAgICAgIHN3aXRjaCAoY2FzY2FkZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCB0aGlzLl9lbGVtTGVmdCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHRoaXMuX2VsZW1Ub3AgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgdGhpcy5fZWxlbUxlZnQgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCB0aGlzLl9lbGVtVG9wICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2JvdHRvbScsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHRoaXMuX2VsZW1MZWZ0ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnYm90dG9tJywgdGhpcy5fZWxlbVRvcCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGltZW5zaW9ucyh3OiBudW1iZXIsIGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodyA8IHRoaXMubWluV2lkdGgpIHcgPSB0aGlzLm1pbldpZHRoO1xuICAgICAgICBpZiAoaCA8IHRoaXMubWluSGVpZ2h0KSBoID0gdGhpcy5taW5IZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB3ICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGggKyAncHgnKTtcblxuICAgICAgICB0aGlzLl9lbGVtV2lkdGggPSB3O1xuICAgICAgICB0aGlzLl9lbGVtSGVpZ2h0ID0gaDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnRNb3ZpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ21vdmluZycpO1xuICAgICAgICBjb25zdCBzdHlsZTogYW55ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5hdXRvU3R5bGUpIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCAocGFyc2VJbnQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnei1pbmRleCcpKSArIDEpLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wTW92aW5nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdtb3ZpbmcnKTtcbiAgICAgICAgY29uc3Qgc3R5bGU6IGFueSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGlmICh0aGlzLl9uZ0dyaWQuYXV0b1N0eWxlKSB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd6LWluZGV4JywgKHBhcnNlSW50KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3otaW5kZXgnKSkgLSAxKS50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVjYWxjdWxhdGVTZWxmKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaXhSZXNpemUobmV3U2l6ZTogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXhDb2xzID4gMCAmJiBuZXdTaXplLnggPiB0aGlzLl9tYXhDb2xzKSBuZXdTaXplLnggPSB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBpZiAodGhpcy5fbWF4Um93cyA+IDAgJiYgbmV3U2l6ZS55ID4gdGhpcy5fbWF4Um93cykgbmV3U2l6ZS55ID0gdGhpcy5fbWF4Um93cztcblxuICAgICAgICBpZiAodGhpcy5fbWluQ29scyA+IDAgJiYgbmV3U2l6ZS54IDwgdGhpcy5fbWluQ29scykgbmV3U2l6ZS54ID0gdGhpcy5fbWluQ29scztcbiAgICAgICAgaWYgKHRoaXMuX21pblJvd3MgPiAwICYmIG5ld1NpemUueSA8IHRoaXMuX21pblJvd3MpIG5ld1NpemUueSA9IHRoaXMuX21pblJvd3M7XG5cbiAgICAgICAgY29uc3QgaXRlbVdpZHRoID0gKG5ld1NpemUueCAqIHRoaXMuX25nR3JpZC5jb2xXaWR0aCkgKyAoKHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0KSAqIChuZXdTaXplLnggLSAxKSk7XG4gICAgICAgIGlmIChpdGVtV2lkdGggPCB0aGlzLm1pbldpZHRoKSBuZXdTaXplLnggPSBNYXRoLmNlaWwoKHRoaXMubWluV2lkdGggKyB0aGlzLl9uZ0dyaWQubWFyZ2luUmlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCkgLyAodGhpcy5fbmdHcmlkLmNvbFdpZHRoICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQpKTtcblxuICAgICAgICBjb25zdCBpdGVtSGVpZ2h0ID0gKG5ld1NpemUueSAqIHRoaXMuX25nR3JpZC5yb3dIZWlnaHQpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luVG9wICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSkgKiAobmV3U2l6ZS55IC0gMSkpO1xuICAgICAgICBpZiAoaXRlbUhlaWdodCA8IHRoaXMubWluSGVpZ2h0KSBuZXdTaXplLnkgPSBNYXRoLmNlaWwoKHRoaXMubWluSGVpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSArIHRoaXMuX25nR3JpZC5tYXJnaW5Ub3ApIC8gKHRoaXMuX25nR3JpZC5yb3dIZWlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luQm90dG9tICsgdGhpcy5fbmdHcmlkLm1hcmdpblRvcCkpO1xuXG4gICAgICAgIHJldHVybiBuZXdTaXplO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGUgbWV0aG9kc1xuICAgIHByaXZhdGUgZWxlbWVudE1hdGNoZXMoZWxlbWVudDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghZWxlbWVudCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoZWxlbWVudC5tYXRjaGVzKSByZXR1cm4gZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsZW1lbnQub01hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsZW1lbnQub01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWxlbWVudC5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChlbGVtZW50Lm1vek1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmICghZWxlbWVudC5kb2N1bWVudCB8fCAhZWxlbWVudC5vd25lckRvY3VtZW50KSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgbWF0Y2hlczogYW55ID0gKGVsZW1lbnQuZG9jdW1lbnQgfHwgZWxlbWVudC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2hlcy5pdGVtKGkpICE9PSBlbGVtZW50KSB7IH1cbiAgICAgICAgcmV0dXJuIGkgPiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB4OiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLmNvbFdpZHRoICsgdGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luUmlnaHQpICogKHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2wgLSAxKSArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLnNjcmVlbk1hcmdpbjtcbiAgICAgICAgY29uc3QgeTogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5yb3dIZWlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSkgKiAodGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdyAtIDEpICsgdGhpcy5fbmdHcmlkLm1hcmdpblRvcDtcblxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHgsIHkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpemUueCA8IHRoaXMuX25nR3JpZC5taW5Db2xzKSB0aGlzLl9zaXplLnggPSB0aGlzLl9uZ0dyaWQubWluQ29scztcbiAgICAgICAgaWYgKHRoaXMuX3NpemUueSA8IHRoaXMuX25nR3JpZC5taW5Sb3dzKSB0aGlzLl9zaXplLnkgPSB0aGlzLl9uZ0dyaWQubWluUm93cztcblxuICAgICAgICBjb25zdCBuZXdXaWR0aDogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5jb2xXaWR0aCAqIHRoaXMuX3NpemUueCkgKyAoKHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0KSAqICh0aGlzLl9zaXplLnggLSAxKSk7XG4gICAgICAgIGNvbnN0IG5ld0hlaWdodDogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5yb3dIZWlnaHQgKiB0aGlzLl9zaXplLnkpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luVG9wICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSkgKiAodGhpcy5fc2l6ZS55IC0gMSkpO1xuXG4gICAgICAgIGNvbnN0IHc6IG51bWJlciA9IE1hdGgubWF4KHRoaXMubWluV2lkdGgsIHRoaXMuX25nR3JpZC5taW5XaWR0aCwgbmV3V2lkdGgpO1xuICAgICAgICBjb25zdCBoOiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLm1pbkhlaWdodCwgdGhpcy5fbmdHcmlkLm1pbkhlaWdodCwgbmV3SGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnNldERpbWVuc2lvbnModywgaCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0TW91c2VQb3NpdGlvbihlOiBhbnkpOiBOZ0dyaWRSYXdQb3NpdGlvbiB7XG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9lOiBhbnkgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgICBlID0gb2UudG91Y2hlcy5sZW5ndGggPyBvZS50b3VjaGVzWzBdIDogKG9lLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/IG9lLmNoYW5nZWRUb3VjaGVzWzBdIDogZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50b3VjaGVzKSB7XG4gICAgICAgICAgICBlID0gZS50b3VjaGVzLmxlbmd0aCA/IGUudG91Y2hlc1swXSA6IChlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY29uc3QgcmVmUG9zOiBOZ0dyaWRSYXdQb3NpdGlvbiA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogZS5jbGllbnRYIC0gcmVmUG9zLmxlZnQsXG4gICAgICAgICAgICB0b3A6IGUuY2xpZW50WSAtIHJlZlBvcy50b3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hcHBseUNoYW5nZXMoY2hhbmdlczogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNoYW5nZUNoZWNrID0gKHJlY29yZDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnW3JlY29yZC5rZXldICE9PSByZWNvcmQuY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnW3JlY29yZC5rZXldID0gcmVjb3JkLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQWRkZWRJdGVtKGNoYW5nZUNoZWNrKTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoQ2hhbmdlZEl0ZW0oY2hhbmdlQ2hlY2spO1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hSZW1vdmVkSXRlbSgocmVjb3JkOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NvbmZpZ1tyZWNvcmQua2V5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29uZmlnKHRoaXMuX2NvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29uZmlnQ2hhbmdlRXZlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl91c2VyQ29uZmlnID09PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fY29uZmlnLnNpemV4ID0gdGhpcy5fdXNlckNvbmZpZy5zaXpleCA9IHRoaXMuX3NpemUueDtcbiAgICAgICAgdGhpcy5fY29uZmlnLnNpemV5ID0gdGhpcy5fdXNlckNvbmZpZy5zaXpleSA9IHRoaXMuX3NpemUueTtcbiAgICAgICAgdGhpcy5fY29uZmlnLmNvbCA9IHRoaXMuX3VzZXJDb25maWcuY29sID0gdGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbDtcbiAgICAgICAgdGhpcy5fY29uZmlnLnJvdyA9IHRoaXMuX3VzZXJDb25maWcucm93ID0gdGhpcy5fY3VycmVudFBvc2l0aW9uLnJvdztcbiAgICAgICAgdGhpcy5uZ0dyaWRJdGVtQ2hhbmdlLmVtaXQodGhpcy5fdXNlckNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYW5SZXNpemVJbkRpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZywgbW91c2VQb3M6IE5nR3JpZFJhd1Bvc2l0aW9uKTogYm9vbGVhbiB7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdib3R0b21yaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLmxlZnQgPCB0aGlzLl9lbGVtV2lkdGggJiYgbW91c2VQb3MubGVmdCA+IHRoaXMuX2VsZW1XaWR0aCAtIHRoaXMuX2JvcmRlclNpemVcbiAgICAgICAgICAgICAgICAgICAgJiYgbW91c2VQb3MudG9wIDwgdGhpcy5fZWxlbUhlaWdodCAmJiBtb3VzZVBvcy50b3AgPiB0aGlzLl9lbGVtSGVpZ2h0IC0gdGhpcy5fYm9yZGVyU2l6ZTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTppbmRlbnRcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbWxlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fYm9yZGVyU2l6ZSAmJiBtb3VzZVBvcy50b3AgPCB0aGlzLl9lbGVtSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICYmIG1vdXNlUG9zLnRvcCA+IHRoaXMuX2VsZW1IZWlnaHQgLSB0aGlzLl9ib3JkZXJTaXplOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmluZGVudFxuICAgICAgICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fZWxlbVdpZHRoICYmIG1vdXNlUG9zLmxlZnQgPiB0aGlzLl9lbGVtV2lkdGggLSB0aGlzLl9ib3JkZXJTaXplXG4gICAgICAgICAgICAgICAgICAgICYmIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2JvcmRlclNpemU7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6aW5kZW50XG4gICAgICAgICAgICBjYXNlICd0b3BsZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2JvcmRlclNpemUgJiYgbW91c2VQb3MudG9wIDwgdGhpcy5fYm9yZGVyU2l6ZTtcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2VsZW1XaWR0aCAmJiBtb3VzZVBvcy5sZWZ0ID4gdGhpcy5fZWxlbVdpZHRoIC0gdGhpcy5fYm9yZGVyU2l6ZTtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fYm9yZGVyU2l6ZTtcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2VsZW1IZWlnaHQgJiYgbW91c2VQb3MudG9wID4gdGhpcy5fZWxlbUhlaWdodCAtIHRoaXMuX2JvcmRlclNpemU7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy50b3AgPCB0aGlzLl9ib3JkZXJTaXplO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=