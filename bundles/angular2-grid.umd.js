(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('angular2-grid', ['exports', '@angular/core', 'rxjs'], factory) :
    (factory((global['angular2-grid'] = {}),global.ng.core,global.rxjs));
}(this, (function (exports,core,rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

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
    var NgGridPlaceholder = (function () {
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
            { type: core.Component, args: [{
                        selector: 'ng-grid-placeholder',
                        template: ''
                    },] },
        ];
        /** @nocollapse */
        NgGridPlaceholder.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer }
            ];
        };
        return NgGridPlaceholder;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgGrid = (function () {
        // Constructor
        function NgGrid(_differs, _ngEl, _renderer, componentFactoryResolver) {
            this._differs = _differs;
            this._ngEl = _ngEl;
            this._renderer = _renderer;
            this.componentFactoryResolver = componentFactoryResolver;
            // Event Emitters
            this.onDragStart = new core.EventEmitter();
            this.onDrag = new core.EventEmitter();
            this.onDragStop = new core.EventEmitter();
            this.onResizeStart = new core.EventEmitter();
            this.onResize = new core.EventEmitter();
            this.onResizeStop = new core.EventEmitter();
            this.onItemChange = new core.EventEmitter();
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
             */ function (v) {
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
                else if (((document)).selection) {
                    ((document)).selection.empty();
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
                else if (((document)).selection) {
                    ((document)).selection.empty();
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (collisions_1_1 && !collisions_1_1.done && (_a = collisions_1.return))
                            _a.call(collisions_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (itemsInGrid_1_1 && !itemsInGrid_1_1.done && (_a = itemsInGrid_1.return))
                                    _a.call(itemsInGrid_1);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
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
                        catch (e_3_1) {
                            e_3 = { error: e_3_1 };
                        }
                        finally {
                            try {
                                if (itemsInGrid_2_1 && !itemsInGrid_2_1.done && (_b = itemsInGrid_2.return))
                                    _b.call(itemsInGrid_2);
                            }
                            finally {
                                if (e_3)
                                    throw e_3.error;
                            }
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
                        catch (e_4_1) {
                            e_4 = { error: e_4_1 };
                        }
                        finally {
                            try {
                                if (itemsInPath_1_1 && !itemsInPath_1_1.done && (_a = itemsInPath_1.return))
                                    _a.call(itemsInPath_1);
                            }
                            finally {
                                if (e_4)
                                    throw e_4.error;
                            }
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
                        catch (e_5_1) {
                            e_5 = { error: e_5_1 };
                        }
                        finally {
                            try {
                                if (itemsInPath_2_1 && !itemsInPath_2_1.done && (_b = itemsInPath_2.return))
                                    _b.call(itemsInPath_2);
                            }
                            finally {
                                if (e_5)
                                    throw e_5.error;
                            }
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
                if (startColumn === void 0) {
                    startColumn = 0;
                }
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
                if (startRow === void 0) {
                    startRow = 0;
                }
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
                if (allowExcessiveItems === void 0) {
                    allowExcessiveItems = false;
                }
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
                if (allowExcessiveItems === void 0) {
                    allowExcessiveItems = false;
                }
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
                if (allowExcessiveItems === void 0) {
                    allowExcessiveItems = false;
                }
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
                if ((((window)).TouchEvent && e instanceof TouchEvent) || (e.touches || e.changedTouches)) {
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
                if ((((window)).TouchEvent && e instanceof TouchEvent) || (e.touches || e.changedTouches)) {
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
                this._documentMousemove$ = rxjs.fromEvent(document, 'mousemove');
                this._documentMouseup$ = rxjs.fromEvent(document, 'mouseup');
                this._mousedown$ = rxjs.fromEvent(element, 'mousedown');
                this._mousemove$ = rxjs.fromEvent(element, 'mousemove');
                this._mouseup$ = rxjs.fromEvent(element, 'mouseup');
                this._touchstart$ = rxjs.fromEvent(element, 'touchstart');
                this._touchmove$ = rxjs.fromEvent(element, 'touchmove');
                this._touchend$ = rxjs.fromEvent(element, 'touchend');
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
            { type: core.Directive, args: [{
                        selector: '[ngGrid]',
                        inputs: ['config: ngGrid'],
                        host: {
                            '(window:resize)': 'resizeEventHandler($event)',
                        }
                    },] },
        ];
        /** @nocollapse */
        NgGrid.ctorParameters = function () {
            return [
                { type: core.KeyValueDiffers },
                { type: core.ElementRef },
                { type: core.Renderer },
                { type: core.ComponentFactoryResolver }
            ];
        };
        NgGrid.propDecorators = {
            onDragStart: [{ type: core.Output }],
            onDrag: [{ type: core.Output }],
            onDragStop: [{ type: core.Output }],
            onResizeStart: [{ type: core.Output }],
            onResize: [{ type: core.Output }],
            onResizeStop: [{ type: core.Output }],
            onItemChange: [{ type: core.Output }]
        };
        return NgGrid;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgGridItem = (function () {
        // Constructor
        function NgGridItem(_differs, _ngEl, _renderer, _ngGrid, containerRef) {
            this._differs = _differs;
            this._ngEl = _ngEl;
            this._renderer = _renderer;
            this._ngGrid = _ngGrid;
            this.containerRef = containerRef;
            // Event Emitters
            this.onItemChange = new core.EventEmitter(false);
            this.onDragStart = new core.EventEmitter();
            this.onDrag = new core.EventEmitter();
            this.onDragStop = new core.EventEmitter();
            this.onDragAny = new core.EventEmitter();
            this.onResizeStart = new core.EventEmitter();
            this.onResize = new core.EventEmitter();
            this.onResizeStop = new core.EventEmitter();
            this.onResizeAny = new core.EventEmitter();
            this.onChangeStart = new core.EventEmitter();
            this.onChange = new core.EventEmitter();
            this.onChangeStop = new core.EventEmitter();
            this.onChangeAny = new core.EventEmitter();
            this.ngGridItemChange = new core.EventEmitter();
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
             */ function () {
                return this._zIndex;
            },
            set: /**
             * @param {?} zIndex
             * @return {?}
             */ function (zIndex) {
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
             */ function (v) {
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
             */ function () {
                return this._size.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgGridItem.prototype, "sizey", {
            get: /**
             * @return {?}
             */ function () {
                return this._size.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgGridItem.prototype, "col", {
            get: /**
             * @return {?}
             */ function () {
                return this._currentPosition.col;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgGridItem.prototype, "row", {
            get: /**
             * @return {?}
             */ function () {
                return this._currentPosition.row;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgGridItem.prototype, "currentCol", {
            get: /**
             * @return {?}
             */ function () {
                return this._currentPosition.col;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgGridItem.prototype, "currentRow", {
            get: /**
             * @return {?}
             */ function () {
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
                catch (err) { }
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (resizeDirections_1_1 && !resizeDirections_1_1.done && (_a = resizeDirections_1.return))
                                _a.call(resizeDirections_1);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_d = _b.return))
                            _d.call(_b);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
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
                if (update === void 0) {
                    update = true;
                }
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
                if (update === void 0) {
                    update = true;
                }
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
            { type: core.Directive, args: [{
                        selector: '[ngGridItem]',
                        inputs: ['config: ngGridItem']
                    },] },
        ];
        /** @nocollapse */
        NgGridItem.ctorParameters = function () {
            return [
                { type: core.KeyValueDiffers },
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: NgGrid },
                { type: core.ViewContainerRef }
            ];
        };
        NgGridItem.propDecorators = {
            onItemChange: [{ type: core.Output }],
            onDragStart: [{ type: core.Output }],
            onDrag: [{ type: core.Output }],
            onDragStop: [{ type: core.Output }],
            onDragAny: [{ type: core.Output }],
            onResizeStart: [{ type: core.Output }],
            onResize: [{ type: core.Output }],
            onResizeStop: [{ type: core.Output }],
            onResizeAny: [{ type: core.Output }],
            onChangeStart: [{ type: core.Output }],
            onChange: [{ type: core.Output }],
            onChangeStop: [{ type: core.Output }],
            onChangeAny: [{ type: core.Output }],
            ngGridItemChange: [{ type: core.Output }]
        };
        return NgGridItem;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgGridModule = (function () {
        function NgGridModule() {
        }
        NgGridModule.decorators = [
            { type: core.NgModule, args: [{
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

    exports.NgGrid = NgGrid;
    exports.NgGridItem = NgGridItem;
    exports.NgGridPlaceholder = NgGridPlaceholder;
    exports.NgGridModule = NgGridModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItZ3JpZC51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vYW5ndWxhcjItZ3JpZC9oZWxwZXJzL05nR3JpZEhlbHBlcnMudHMiLCJuZzovL2FuZ3VsYXIyLWdyaWQvY29tcG9uZW50cy9OZ0dyaWRQbGFjZWhvbGRlci50cyIsIm5nOi8vYW5ndWxhcjItZ3JpZC9kaXJlY3RpdmVzL05nR3JpZC50cyIsIm5nOi8vYW5ndWxhcjItZ3JpZC9kaXJlY3RpdmVzL05nR3JpZEl0ZW0udHMiLCJuZzovL2FuZ3VsYXIyLWdyaWQvbW9kdWxlcy9OZ0dyaWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ0dyaWRJdGVtIH0gZnJvbSBcIi4uL2RpcmVjdGl2ZXMvTmdHcmlkSXRlbVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVVdWlkKCk6IHN0cmluZyB7XG5cdHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcblx0XHRsZXQgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRJdGVtc0J5UG9zaXRpb25Ib3Jpem9udGFsKGE6IE5nR3JpZEl0ZW0sIGI6IE5nR3JpZEl0ZW0pOiBudW1iZXIge1xuXHRpZiAoYS5jb2wgPT09IGIuY29sKSB7IHJldHVybiBhLnJvdyAtIGIucm93OyB9XG5cdHJldHVybiBhLmNvbCAtIGIuY29sO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc29ydEl0ZW1zQnlQb3NpdGlvblZlcnRpY2FsKGE6IE5nR3JpZEl0ZW0sIGI6IE5nR3JpZEl0ZW0pOiBudW1iZXIge1xuXHRpZiAoYS5yb3cgPT09IGIucm93KSB7IHJldHVybiBhLmNvbCAtIGIuY29sOyB9XG5cdHJldHVybiBhLnJvdyAtIGIucm93O1xufVxuIiwiaW1wb3J0IHsgTmdHcmlkIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9OZ0dyaWQnO1xuaW1wb3J0IHsgTmdHcmlkSXRlbVBvc2l0aW9uLCBOZ0dyaWRJdGVtU2l6ZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvSU5nR3JpZCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIsIEV2ZW50RW1pdHRlciwgSG9zdCwgVmlld0VuY2Fwc3VsYXRpb24sIFR5cGUsIENvbXBvbmVudFJlZiwgS2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVycywgT25Jbml0LCBPbkRlc3Ryb3ksIERvQ2hlY2ssIFZpZXdDb250YWluZXJSZWYsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nLWdyaWQtcGxhY2Vob2xkZXInLFxuICAgIHRlbXBsYXRlOiAnJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ0dyaWRQbGFjZWhvbGRlciBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBfc2l6ZTogTmdHcmlkSXRlbVNpemU7XG4gICAgcHJpdmF0ZSBfcG9zaXRpb246IE5nR3JpZEl0ZW1Qb3NpdGlvbjtcbiAgICBwcml2YXRlIF9uZ0dyaWQ6IE5nR3JpZDtcbiAgICBwcml2YXRlIF9jYXNjYWRlTW9kZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdFbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyKSB7IH1cblxuICAgIHB1YmxpYyByZWdpc3RlckdyaWQobmdHcmlkOiBOZ0dyaWQpIHtcbiAgICAgICAgdGhpcy5fbmdHcmlkID0gbmdHcmlkO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2dyaWQtcGxhY2Vob2xkZXInLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5hdXRvU3R5bGUpIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTaXplKG5ld1NpemU6IE5nR3JpZEl0ZW1TaXplKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXdTaXplO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0R3JpZFBvc2l0aW9uKG5ld1Bvc2l0aW9uOiBOZ0dyaWRJdGVtUG9zaXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBuZXdQb3NpdGlvbjtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDYXNjYWRlTW9kZShjYXNjYWRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2FzY2FkZU1vZGUgPSBjYXNjYWRlO1xuICAgICAgICBzd2l0Y2ggKGNhc2NhZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsICcwcHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgJzBweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCAnMHB4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsICcwcHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgJzBweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCAnMHB4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgcHJpdmF0ZSBfc2V0RGltZW5zaW9ucyh3OiBudW1iZXIsIGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCB3ICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBoICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9jYXNjYWRlTW9kZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgLXggKyAncHgsICcgKyB5ICsgJ3B4KScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIHggKyAncHgsICcgKyAteSArICdweCknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY2FsY3VsYXRlUG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHg6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQuY29sV2lkdGggKyB0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCkgKiAodGhpcy5fcG9zaXRpb24uY29sIC0gMSkgKyB0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5zY3JlZW5NYXJnaW47XG4gICAgICAgIGNvbnN0IHk6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQucm93SGVpZ2h0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblRvcCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20pICogKHRoaXMuX3Bvc2l0aW9uLnJvdyAtIDEpICsgdGhpcy5fbmdHcmlkLm1hcmdpblRvcDtcbiAgICAgICAgdGhpcy5fc2V0UG9zaXRpb24oeCwgeSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB3OiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLmNvbFdpZHRoICogdGhpcy5fc2l6ZS54KSArICgodGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luUmlnaHQpICogKHRoaXMuX3NpemUueCAtIDEpKTtcbiAgICAgICAgY29uc3QgaDogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5yb3dIZWlnaHQgKiB0aGlzLl9zaXplLnkpICsgKCh0aGlzLl9uZ0dyaWQubWFyZ2luVG9wICsgdGhpcy5fbmdHcmlkLm1hcmdpbkJvdHRvbSkgKiAodGhpcy5fc2l6ZS55IC0gMSkpO1xuICAgICAgICB0aGlzLl9zZXREaW1lbnNpb25zKHcsIGgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBSZW5kZXJlciwgRXZlbnRFbWl0dGVyLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEhvc3QsIFZpZXdFbmNhcHN1bGF0aW9uLCBUeXBlLCBDb21wb25lbnRSZWYsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlcnMsIE9uSW5pdCwgT25EZXN0cm95LCBEb0NoZWNrLCBWaWV3Q29udGFpbmVyUmVmLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nR3JpZENvbmZpZywgTmdHcmlkSXRlbUV2ZW50LCBOZ0dyaWRJdGVtUG9zaXRpb24sIE5nR3JpZEl0ZW1TaXplLCBOZ0dyaWRSYXdQb3NpdGlvbiwgTmdHcmlkSXRlbURpbWVuc2lvbnMsIE5nQ29uZmlnRml4RGlyZWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JTmdHcmlkJztcbmltcG9ydCB7IE5nR3JpZEl0ZW0gfSBmcm9tICcuL05nR3JpZEl0ZW0nO1xuaW1wb3J0ICogYXMgTmdHcmlkSGVscGVyIGZyb20gJy4uL2hlbHBlcnMvTmdHcmlkSGVscGVycyc7XG5pbXBvcnQgeyBOZ0dyaWRQbGFjZWhvbGRlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvTmdHcmlkUGxhY2Vob2xkZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmdHcmlkXScsXG4gICAgaW5wdXRzOiBbJ2NvbmZpZzogbmdHcmlkJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnKHdpbmRvdzpyZXNpemUpJzogJ3Jlc2l6ZUV2ZW50SGFuZGxlcigkZXZlbnQpJyxcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE5nR3JpZCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgICBwdWJsaWMgc3RhdGljIENPTlNUX0RFRkFVTFRfUkVTSVpFX0RJUkVDVElPTlM6IHN0cmluZ1tdID0gW1xuICAgICAgICAnYm90dG9tcmlnaHQnLFxuICAgICAgICAnYm90dG9tbGVmdCcsXG4gICAgICAgICd0b3ByaWdodCcsXG4gICAgICAgICd0b3BsZWZ0JyxcbiAgICAgICAgJ3JpZ2h0JyxcbiAgICAgICAgJ2xlZnQnLFxuICAgICAgICAnYm90dG9tJyxcbiAgICAgICAgJ3RvcCcsXG4gICAgXTtcblxuICAgIC8vIEV2ZW50IEVtaXR0ZXJzXG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25EcmFnOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWdTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZVN0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtPigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNpemVTdG9wOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW0+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkl0ZW1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBcnJheTxOZ0dyaWRJdGVtRXZlbnQ+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8TmdHcmlkSXRlbUV2ZW50Pj4oKTtcblxuICAgIC8vIFB1YmxpYyB2YXJpYWJsZXNcbiAgICBwdWJsaWMgY29sV2lkdGg6IG51bWJlciA9IDI1MDtcbiAgICBwdWJsaWMgcm93SGVpZ2h0OiBudW1iZXIgPSAyNTA7XG4gICAgcHVibGljIG1pbkNvbHM6IG51bWJlciA9IDE7XG4gICAgcHVibGljIG1pblJvd3M6IG51bWJlciA9IDE7XG4gICAgcHVibGljIG1hcmdpblRvcDogbnVtYmVyID0gMTA7XG4gICAgcHVibGljIG1hcmdpblJpZ2h0OiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgbWFyZ2luQm90dG9tOiBudW1iZXIgPSAxMDtcbiAgICBwdWJsaWMgbWFyZ2luTGVmdDogbnVtYmVyID0gMTA7XG4gICAgcHVibGljIHNjcmVlbk1hcmdpbjogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc1Jlc2l6aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGF1dG9TdHlsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIHJlc2l6ZUVuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGRyYWdFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyBjYXNjYWRlOiBzdHJpbmcgPSAndXAnO1xuICAgIHB1YmxpYyBtaW5XaWR0aDogbnVtYmVyID0gMTAwO1xuICAgIHB1YmxpYyBtaW5IZWlnaHQ6IG51bWJlciA9IDEwMDtcbiAgICBwdWJsaWMgcmVzaXplRGlyZWN0aW9uczogc3RyaW5nW10gPSBOZ0dyaWQuQ09OU1RfREVGQVVMVF9SRVNJWkVfRElSRUNUSU9OUztcblxuICAgIC8vIFByaXZhdGUgdmFyaWFibGVzXG4gICAgcHJpdmF0ZSBfaXRlbXM6IE1hcDxzdHJpbmcsIE5nR3JpZEl0ZW0+ID0gbmV3IE1hcDxzdHJpbmcsIE5nR3JpZEl0ZW0+KCk7XG4gICAgcHJpdmF0ZSBfZHJhZ2dpbmdJdGVtOiBOZ0dyaWRJdGVtID0gbnVsbDtcbiAgICBwcml2YXRlIF9yZXNpemluZ0l0ZW06IE5nR3JpZEl0ZW0gPSBudWxsO1xuICAgIHByaXZhdGUgX3Jlc2l6ZURpcmVjdGlvbjogc3RyaW5nID0gbnVsbDtcbiAgICBwcml2YXRlIF9pdGVtc0luR3JpZDogU2V0PHN0cmluZz4gPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBwcml2YXRlIF9jb250YWluZXJXaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2NvbnRhaW5lckhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgX21heENvbHM6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWF4Um93czogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF92aXNpYmxlQ29sczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF92aXNpYmxlUm93czogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9zZXRXaWR0aDogbnVtYmVyID0gMjUwO1xuICAgIHByaXZhdGUgX3NldEhlaWdodDogbnVtYmVyID0gMjUwO1xuICAgIHByaXZhdGUgX3Bvc09mZnNldDogTmdHcmlkUmF3UG9zaXRpb24gPSBudWxsO1xuICAgIHByaXZhdGUgX2FkZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3BsYWNlaG9sZGVyUmVmOiBDb21wb25lbnRSZWY8TmdHcmlkUGxhY2Vob2xkZXI+ID0gbnVsbDtcbiAgICBwcml2YXRlIF9maXhUb0dyaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9hdXRvUmVzaXplOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47XG4gICAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfbWFpbnRhaW5SYXRpbzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2FzcGVjdFJhdGlvOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfcHJlZmVyTmV3OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfem9vbU9uRHJhZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2xpbWl0VG9TY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9jZW50ZXJUb1NjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2N1ck1heFJvdzogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9jdXJNYXhDb2w6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfZHJhZ1JlYWR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcmVzaXplUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9lbGVtZW50QmFzZWREeW5hbWljUm93SGVpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaXRlbUZpeERpcmVjdGlvbjogTmdDb25maWdGaXhEaXJlY3Rpb24gPSAnY2FzY2FkZSc7XG4gICAgcHJpdmF0ZSBfY29sbGlzaW9uRml4RGlyZWN0aW9uOiBOZ0NvbmZpZ0ZpeERpcmVjdGlvbiA9ICdjYXNjYWRlJztcbiAgICBwcml2YXRlIF9hbGxvd092ZXJsYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9jYXNjYWRlUHJvbWlzZTogUHJvbWlzZTx2b2lkPjtcbiAgICBwcml2YXRlIF9sYXN0WlZhbHVlOiBudW1iZXIgPSAxO1xuXG4gICAgLy8gRXZlbnRzXG4gICAgcHJpdmF0ZSBfZG9jdW1lbnRNb3VzZW1vdmUkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICAgIHByaXZhdGUgX2RvY3VtZW50TW91c2V1cCQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gICAgcHJpdmF0ZSBfbW91c2Vkb3duJDogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PjtcbiAgICBwcml2YXRlIF9tb3VzZW1vdmUkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICAgIHByaXZhdGUgX21vdXNldXAkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICAgIHByaXZhdGUgX3RvdWNoc3RhcnQkOiBPYnNlcnZhYmxlPFRvdWNoRXZlbnQ+O1xuICAgIHByaXZhdGUgX3RvdWNobW92ZSQ6IE9ic2VydmFibGU8VG91Y2hFdmVudD47XG4gICAgcHJpdmF0ZSBfdG91Y2hlbmQkOiBPYnNlcnZhYmxlPFRvdWNoRXZlbnQ+O1xuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBwcml2YXRlIF9lbmFibGVkTGlzdGVuZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIERlZmF1bHQgY29uZmlnXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ09OU1RfREVGQVVMVF9DT05GSUc6IE5nR3JpZENvbmZpZyA9IHtcbiAgICAgICAgbWFyZ2luczogWzEwXSxcbiAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICByZXNpemFibGU6IHRydWUsXG4gICAgICAgIG1heF9jb2xzOiAwLFxuICAgICAgICBtYXhfcm93czogMCxcbiAgICAgICAgdmlzaWJsZV9jb2xzOiAwLFxuICAgICAgICB2aXNpYmxlX3Jvd3M6IDAsXG4gICAgICAgIGNvbF93aWR0aDogMjUwLFxuICAgICAgICByb3dfaGVpZ2h0OiAyNTAsXG4gICAgICAgIGNhc2NhZGU6ICd1cCcsXG4gICAgICAgIG1pbl93aWR0aDogMTAwLFxuICAgICAgICBtaW5faGVpZ2h0OiAxMDAsXG4gICAgICAgIGZpeF90b19ncmlkOiBmYWxzZSxcbiAgICAgICAgYXV0b19zdHlsZTogdHJ1ZSxcbiAgICAgICAgYXV0b19yZXNpemU6IGZhbHNlLFxuICAgICAgICBtYWludGFpbl9yYXRpbzogZmFsc2UsXG4gICAgICAgIHByZWZlcl9uZXc6IGZhbHNlLFxuICAgICAgICB6b29tX29uX2RyYWc6IGZhbHNlLFxuICAgICAgICBsaW1pdF90b19zY3JlZW46IGZhbHNlLFxuICAgICAgICBjZW50ZXJfdG9fc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgcmVzaXplX2RpcmVjdGlvbnM6IE5nR3JpZC5DT05TVF9ERUZBVUxUX1JFU0laRV9ESVJFQ1RJT05TLFxuICAgICAgICBlbGVtZW50X2Jhc2VkX3Jvd19oZWlnaHQ6IGZhbHNlLFxuICAgICAgICBmaXhfaXRlbV9wb3NpdGlvbl9kaXJlY3Rpb246ICdjYXNjYWRlJyxcbiAgICAgICAgZml4X2NvbGxpc2lvbl9wb3NpdGlvbl9kaXJlY3Rpb246ICdjYXNjYWRlJyxcbiAgICAgICAgYWxsb3dfb3ZlcmxhcDogZmFsc2UsXG4gICAgfTtcbiAgICBwcml2YXRlIF9jb25maWcgPSBOZ0dyaWQuQ09OU1RfREVGQVVMVF9DT05GSUc7XG5cbiAgICAvLyBbbmctZ3JpZF0gYXR0cmlidXRlIGhhbmRsZXJcbiAgICBzZXQgY29uZmlnKHY6IE5nR3JpZENvbmZpZykge1xuICAgICAgICBpZiAodiA9PSBudWxsIHx8IHR5cGVvZiB2ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRDb25maWcodik7XG5cbiAgICAgICAgaWYgKHRoaXMuX2RpZmZlciA9PSBudWxsICYmIHYgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKHRoaXMuX2NvbmZpZykuY3JlYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl9jb25maWcpO1xuICAgIH1cblxuICAgIC8vIENvbnN0cnVjdG9yXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2RpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgcHJpdmF0ZSBfbmdFbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLl9kZWZpbmVMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWMgbWV0aG9kc1xuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2dyaWQnLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1N0eWxlKSB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgICAgdGhpcy5zZXRDb25maWcodGhpcy5fY29uZmlnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2VuZXJhdGVJdGVtVWlkKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHVpZDogc3RyaW5nID0gTmdHcmlkSGVscGVyLmdlbmVyYXRlVXVpZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5oYXModWlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVJdGVtVWlkKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdWlkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDb25maWcoY29uZmlnOiBOZ0dyaWRDb25maWcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIHZhciBtYXhDb2xSb3dDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIHggaW4gY29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gY29uZmlnW3hdO1xuICAgICAgICAgICAgdmFyIGludFZhbCA9ICF2YWwgPyAwIDogcGFyc2VJbnQodmFsKTtcblxuICAgICAgICAgICAgc3dpdGNoICh4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWFyZ2lucyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWFyZ2lucyh2YWwpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjb2xfd2lkdGgnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbFdpZHRoID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncm93X2hlaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93SGVpZ2h0ID0gTWF0aC5tYXgoaW50VmFsLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXV0b19zdHlsZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1N0eWxlID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhdXRvX3Jlc2l6ZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F1dG9SZXNpemUgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RyYWdnYWJsZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0VuYWJsZSA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVzaXphYmxlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVFbmFibGUgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21heF9yb3dzJzpcbiAgICAgICAgICAgICAgICAgICAgbWF4Q29sUm93Q2hhbmdlZCA9IG1heENvbFJvd0NoYW5nZWQgfHwgdGhpcy5fbWF4Um93cyAhPSBpbnRWYWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21heFJvd3MgPSBpbnRWYWwgPCAwID8gMCA6IGludFZhbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWF4X2NvbHMnOlxuICAgICAgICAgICAgICAgICAgICBtYXhDb2xSb3dDaGFuZ2VkID0gbWF4Q29sUm93Q2hhbmdlZCB8fCB0aGlzLl9tYXhDb2xzICE9IGludFZhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IGludFZhbCA8IDAgPyAwIDogaW50VmFsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2aXNpYmxlX3Jvd3MnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aXNpYmxlUm93cyA9IE1hdGgubWF4KGludFZhbCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVfY29scyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGVDb2xzID0gTWF0aC5tYXgoaW50VmFsLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWluX3Jvd3MnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblJvd3MgPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtaW5fY29scyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluQ29scyA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbl9oZWlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbkhlaWdodCA9IE1hdGgubWF4KGludFZhbCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21pbl93aWR0aCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluV2lkdGggPSBNYXRoLm1heChpbnRWYWwsIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd6b29tX29uX2RyYWcnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl96b29tT25EcmFnID0gdmFsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjYXNjYWRlJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FzY2FkZSAhPSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FzY2FkZSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nhc2NhZGVHcmlkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZml4X3RvX2dyaWQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXhUb0dyaWQgPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21haW50YWluX3JhdGlvJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbnRhaW5SYXRpbyA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJlZmVyX25ldyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZWZlck5ldyA9IHZhbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGltaXRfdG9fc2NyZWVuJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGltaXRUb1NjcmVlbiA9ICF0aGlzLl9hdXRvUmVzaXplICYmICEhdmFsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXJfdG9fc2NyZWVuJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2VudGVyVG9TY3JlZW4gPSB2YWwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Jlc2l6ZV9kaXJlY3Rpb25zJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVEaXJlY3Rpb25zID0gdmFsIHx8IFsnYm90dG9tcmlnaHQnLCAnYm90dG9tbGVmdCcsICd0b3ByaWdodCcsICd0b3BsZWZ0JywgJ3JpZ2h0JywgJ2xlZnQnLCAnYm90dG9tJywgJ3RvcCddO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdlbGVtZW50X2Jhc2VkX3Jvd19oZWlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50QmFzZWREeW5hbWljUm93SGVpZ2h0ID0gISF2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpeF9pdGVtX3Bvc2l0aW9uX2RpcmVjdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1GaXhEaXJlY3Rpb24gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpeF9jb2xsaXNpb25fcG9zaXRpb25fZGlyZWN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29sbGlzaW9uRml4RGlyZWN0aW9uID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhbGxvd19vdmVybGFwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dPdmVybGFwID0gISF2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCAmJiB0aGlzLmNhc2NhZGUgIT09ICdvZmYnICYmIHRoaXMuY2FzY2FkZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVW5hYmxlIHRvIG92ZXJsYXAgaXRlbXMgd2hlbiBhIGNhc2NhZGUgZGlyZWN0aW9uIGlzIHNldC4nKTtcbiAgICAgICAgICAgIHRoaXMuX2FsbG93T3ZlcmxhcCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ0VuYWJsZSB8fCB0aGlzLnJlc2l6ZUVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlTGlzdGVuZXJzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXRlbUZpeERpcmVjdGlvbiA9PT0gJ2Nhc2NhZGUnKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtRml4RGlyZWN0aW9uID0gdGhpcy5fZ2V0Rml4RGlyZWN0aW9uRnJvbUNhc2NhZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb2xsaXNpb25GaXhEaXJlY3Rpb24gPT09ICdjYXNjYWRlJykge1xuICAgICAgICAgICAgdGhpcy5fY29sbGlzaW9uRml4RGlyZWN0aW9uID0gdGhpcy5fZ2V0Rml4RGlyZWN0aW9uRnJvbUNhc2NhZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9saW1pdFRvU2NyZWVuKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdNYXhDb2xzID0gdGhpcy5fZ2V0Q29udGFpbmVyQ29sdW1ucygpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyAhPSBuZXdNYXhDb2xzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4Q29scyA9IG5ld01heENvbHM7XG4gICAgICAgICAgICAgICAgbWF4Q29sUm93Q2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGltaXRUb1NjcmVlbiAmJiB0aGlzLl9jZW50ZXJUb1NjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5zY3JlZW5NYXJnaW4gPSB0aGlzLl9nZXRTY3JlZW5NYXJnaW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NyZWVuTWFyZ2luID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tYWludGFpblJhdGlvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2xXaWR0aCAmJiB0aGlzLnJvd0hlaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FzcGVjdFJhdGlvID0gdGhpcy5jb2xXaWR0aCAvIHRoaXMucm93SGVpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWludGFpblJhdGlvID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF4Q29sUm93Q2hhbmdlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwICYmIHRoaXMuX21heFJvd3MgPiAwKSB7ICAgIC8vICAgIENhbid0IGhhdmUgYm90aCwgcHJpb3JpdGlzZSBvbiBjYXNjYWRlXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNhc2NhZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21heENvbHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXhSb3dzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb25zQWZ0ZXJNYXhDaGFuZ2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNvbFdpZHRoKCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVJvd0hlaWdodCgpO1xuXG4gICAgICAgIHZhciBtYXhXaWR0aCA9IHRoaXMuX21heENvbHMgKiB0aGlzLmNvbFdpZHRoO1xuICAgICAgICB2YXIgbWF4SGVpZ2h0ID0gdGhpcy5fbWF4Um93cyAqIHRoaXMucm93SGVpZ2h0O1xuXG4gICAgICAgIGlmIChtYXhXaWR0aCA+IDAgJiYgdGhpcy5taW5XaWR0aCA+IG1heFdpZHRoKSB0aGlzLm1pbldpZHRoID0gMC43NSAqIHRoaXMuY29sV2lkdGg7XG4gICAgICAgIGlmIChtYXhIZWlnaHQgPiAwICYmIHRoaXMubWluSGVpZ2h0ID4gbWF4SGVpZ2h0KSB0aGlzLm1pbkhlaWdodCA9IDAuNzUgKiB0aGlzLnJvd0hlaWdodDtcblxuICAgICAgICBpZiAodGhpcy5taW5XaWR0aCA+IHRoaXMuY29sV2lkdGgpIHRoaXMubWluQ29scyA9IE1hdGgubWF4KHRoaXMubWluQ29scywgTWF0aC5jZWlsKHRoaXMubWluV2lkdGggLyB0aGlzLmNvbFdpZHRoKSk7XG4gICAgICAgIGlmICh0aGlzLm1pbkhlaWdodCA+IHRoaXMucm93SGVpZ2h0KSB0aGlzLm1pblJvd3MgPSBNYXRoLm1heCh0aGlzLm1pblJvd3MsIE1hdGguY2VpbCh0aGlzLm1pbkhlaWdodCAvIHRoaXMucm93SGVpZ2h0KSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwICYmIHRoaXMubWluQ29scyA+IHRoaXMuX21heENvbHMpIHRoaXMubWluQ29scyA9IDE7XG4gICAgICAgIGlmICh0aGlzLl9tYXhSb3dzID4gMCAmJiB0aGlzLm1pblJvd3MgPiB0aGlzLl9tYXhSb3dzKSB0aGlzLm1pblJvd3MgPSAxO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJhdGlvKCk7XG5cbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbUdyaWQoaXRlbSk7XG4gICAgICAgICAgICBpdGVtLnNldENhc2NhZGVNb2RlKHRoaXMuY2FzY2FkZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0ucmVjYWxjdWxhdGVTZWxmKCk7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2Nhc2NhZGVHcmlkKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SXRlbVBvc2l0aW9uKGl0ZW1JZDogc3RyaW5nKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhcyhpdGVtSWQpID8gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkuZ2V0R3JpZFBvc2l0aW9uKCkgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtU2l6ZShpdGVtSWQ6IHN0cmluZyk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmhhcyhpdGVtSWQpID8gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCkuZ2V0U2l6ZSgpIDogbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdEb0NoZWNrKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5fZGlmZmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2VzID0gdGhpcy5fZGlmZmVyLmRpZmYodGhpcy5fY29uZmlnKTtcblxuICAgICAgICAgICAgaWYgKGNoYW5nZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXJnaW5zKG1hcmdpbnM6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXJnaW5Ub3AgPSBNYXRoLm1heChwYXJzZUludChtYXJnaW5zWzBdKSwgMCk7XG4gICAgICAgIHRoaXMubWFyZ2luUmlnaHQgPSBtYXJnaW5zLmxlbmd0aCA+PSAyID8gTWF0aC5tYXgocGFyc2VJbnQobWFyZ2luc1sxXSksIDApIDogdGhpcy5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMubWFyZ2luQm90dG9tID0gbWFyZ2lucy5sZW5ndGggPj0gMyA/IE1hdGgubWF4KHBhcnNlSW50KG1hcmdpbnNbMl0pLCAwKSA6IHRoaXMubWFyZ2luVG9wO1xuICAgICAgICB0aGlzLm1hcmdpbkxlZnQgPSBtYXJnaW5zLmxlbmd0aCA+PSA0ID8gTWF0aC5tYXgocGFyc2VJbnQobWFyZ2luc1szXSksIDApIDogdGhpcy5tYXJnaW5SaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlRHJhZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmFnRW5hYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzYWJsZURyYWcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhZ0VuYWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGVSZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzaXplRW5hYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzYWJsZVJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNpemVFbmFibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkSXRlbShuZ0l0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgbmdJdGVtLnNldENhc2NhZGVNb2RlKHRoaXMuY2FzY2FkZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wcmVmZXJOZXcpIHtcbiAgICAgICAgICAgIHZhciBuZXdQb3MgPSB0aGlzLl9maXhHcmlkUG9zaXRpb24obmdJdGVtLmdldEdyaWRQb3NpdGlvbigpLCBuZ0l0ZW0uZ2V0U2l6ZSgpKTtcbiAgICAgICAgICAgIG5nSXRlbS5zZXRHcmlkUG9zaXRpb24obmV3UG9zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZ0l0ZW0udWlkID09PSBudWxsIHx8IHRoaXMuX2l0ZW1zLmhhcyhuZ0l0ZW0udWlkKSkge1xuICAgICAgICAgICAgbmdJdGVtLnVpZCA9IHRoaXMuZ2VuZXJhdGVJdGVtVWlkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pdGVtcy5zZXQobmdJdGVtLnVpZCwgbmdJdGVtKTtcbiAgICAgICAgdGhpcy5fYWRkVG9HcmlkKG5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckNhc2NhZGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIG5nSXRlbS5yZWNhbGN1bGF0ZVNlbGYoKTtcbiAgICAgICAgICAgIG5nSXRlbS5vbkNhc2NhZGVFdmVudCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9lbWl0T25JdGVtQ2hhbmdlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUl0ZW0obmdJdGVtOiBOZ0dyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKG5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5faXRlbXMuZGVsZXRlKG5nSXRlbS51aWQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHJldHVybjtcblxuICAgICAgICB0aGlzLnRyaWdnZXJDYXNjYWRlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiBpdGVtLnJlY2FsY3VsYXRlU2VsZigpKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXRPbkl0ZW1DaGFuZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUl0ZW0obmdJdGVtOiBOZ0dyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKG5nSXRlbSk7XG4gICAgICAgIHRoaXMuX2FkZFRvR3JpZChuZ0l0ZW0pO1xuXG4gICAgICAgIHRoaXMudHJpZ2dlckNhc2NhZGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgICAgIG5nSXRlbS5vbkNhc2NhZGVFdmVudCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdHJpZ2dlckNhc2NhZGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICghdGhpcy5fY2FzY2FkZVByb21pc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nhc2NhZGVQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmU6ICgpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZVByb21pc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYXNjYWRlR3JpZChudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fY2FzY2FkZVByb21pc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHRyaWdnZXJSZXNpemUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzaXplRXZlbnRIYW5kbGVyKG51bGwpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNpemVFdmVudEhhbmRsZXIoZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNvbFdpZHRoKCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVJvd0hlaWdodCgpO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJhdGlvKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpbWl0VG9TY3JlZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld01heENvbHVtbnMgPSB0aGlzLl9nZXRDb250YWluZXJDb2x1bW5zKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4Q29scyAhPT0gbmV3TWF4Q29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuX21heENvbHMgPSBuZXdNYXhDb2x1bW5zO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uc0FmdGVyTWF4Q2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX2NlbnRlclRvU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5NYXJnaW4gPSB0aGlzLl9nZXRTY3JlZW5NYXJnaW4oKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW06IE5nR3JpZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZWNhbGN1bGF0ZVNlbGYoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9hdXRvUmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtOiBOZ0dyaWRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZWNhbGN1bGF0ZVNlbGYoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3VzZURvd25FdmVudEhhbmRsZXIoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdmFyIG1vdXNlUG9zID0gdGhpcy5fZ2V0TW91c2VQb3NpdGlvbihlKTtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9nZXRJdGVtRnJvbVBvc2l0aW9uKG1vdXNlUG9zKTtcblxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmVzaXplRGlyZWN0aW9uOiBzdHJpbmcgPSBpdGVtLmNhblJlc2l6ZShlKTtcblxuICAgICAgICBpZiAodGhpcy5yZXNpemVFbmFibGUgJiYgcmVzaXplRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgdGhpcy5fcmVzaXplRGlyZWN0aW9uID0gcmVzaXplRGlyZWN0aW9uO1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcmFnRW5hYmxlICYmIGl0ZW0uY2FuRHJhZyhlKSkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbSA9IGl0ZW07XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Qb3MgPSBpdGVtLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9wb3NPZmZzZXQgPSB7ICdsZWZ0JzogKG1vdXNlUG9zLmxlZnQgLSBpdGVtUG9zLmxlZnQpLCAndG9wJzogKG1vdXNlUG9zLnRvcCAtIGl0ZW1Qb3MudG9wKSB9XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtb3VzZVVwRXZlbnRIYW5kbGVyKGU6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTdG9wKGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNSZXNpemluZykge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXplU3RvcChlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kcmFnUmVhZHkgfHwgdGhpcy5fcmVzaXplUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuRHJhZygpO1xuICAgICAgICAgICAgdGhpcy5fY2xlYW5SZXNpemUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtb3VzZU1vdmVFdmVudEhhbmRsZXIoZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZVJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVTdGFydChlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kcmFnUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTdGFydChlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWcoZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1Jlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemUoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbW91c2VQb3MgPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9nZXRJdGVtRnJvbVBvc2l0aW9uKG1vdXNlUG9zKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpdGVtLm9uTW91c2VNb3ZlKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gICAgUHJpdmF0ZSBtZXRob2RzXG4gICAgcHJpdmF0ZSBfZ2V0Rml4RGlyZWN0aW9uRnJvbUNhc2NhZGUoKTogTmdDb25maWdGaXhEaXJlY3Rpb24ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuY2FzY2FkZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAndmVydGljYWwnO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdob3Jpem9udGFsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF91cGRhdGVQb3NpdGlvbnNBZnRlck1heENoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIHBvcyA9IGl0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgZGltcyA9IGl0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2hhc0dyaWRDb2xsaXNpb24ocG9zLCBkaW1zKSAmJiB0aGlzLl9pc1dpdGhpbkJvdW5kcyhwb3MsIGRpbXMpICYmIGRpbXMueCA8PSB0aGlzLl9tYXhDb2xzICYmIGRpbXMueSA8PSB0aGlzLl9tYXhSb3dzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZChpdGVtKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwICYmIGRpbXMueCA+IHRoaXMuX21heENvbHMpIHtcbiAgICAgICAgICAgICAgICBkaW1zLnggPSB0aGlzLl9tYXhDb2xzO1xuICAgICAgICAgICAgICAgIGl0ZW0uc2V0U2l6ZShkaW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF4Um93cyA+IDAgJiYgZGltcy55ID4gdGhpcy5fbWF4Um93cykge1xuICAgICAgICAgICAgICAgIGRpbXMueSA9IHRoaXMuX21heFJvd3M7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXRTaXplKGRpbXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5faGFzR3JpZENvbGxpc2lvbihwb3MsIGRpbXMpIHx8ICF0aGlzLl9pc1dpdGhpbkJvdW5kcyhwb3MsIGRpbXMsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gdGhpcy5fZml4R3JpZFBvc2l0aW9uKHBvcywgZGltcyk7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXRHcmlkUG9zaXRpb24obmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NhbGN1bGF0ZUNvbFdpZHRoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fYXV0b1Jlc2l6ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwIHx8IHRoaXMuX3Zpc2libGVDb2xzID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXhDb2xzID0gdGhpcy5fbWF4Q29scyA+IDAgPyB0aGlzLl9tYXhDb2xzIDogdGhpcy5fdmlzaWJsZUNvbHM7XG4gICAgICAgICAgICAgICAgdmFyIG1heFdpZHRoOiBudW1iZXIgPSB0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29sV2lkdGg6IG51bWJlciA9IE1hdGguZmxvb3IobWF4V2lkdGggLyBtYXhDb2xzKTtcbiAgICAgICAgICAgICAgICBjb2xXaWR0aCAtPSAodGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbFdpZHRoID4gMCkgdGhpcy5jb2xXaWR0aCA9IGNvbFdpZHRoO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb2xXaWR0aCA8IHRoaXMubWluV2lkdGggfHwgdGhpcy5taW5Db2xzID4gdGhpcy5fY29uZmlnLm1pbl9jb2xzKSB7XG4gICAgICAgICAgICB0aGlzLm1pbkNvbHMgPSBNYXRoLm1heCh0aGlzLl9jb25maWcubWluX2NvbHMsIE1hdGguY2VpbCh0aGlzLm1pbldpZHRoIC8gdGhpcy5jb2xXaWR0aCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlUm93SGVpZ2h0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fYXV0b1Jlc2l6ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21heFJvd3MgPiAwIHx8IHRoaXMuX3Zpc2libGVSb3dzID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXhSb3dzID0gdGhpcy5fbWF4Um93cyA+IDAgPyB0aGlzLl9tYXhSb3dzIDogdGhpcy5fdmlzaWJsZVJvd3M7XG4gICAgICAgICAgICAgICAgbGV0IG1heEhlaWdodDogbnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0ID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLm1hcmdpblRvcCAtIHRoaXMubWFyZ2luQm90dG9tO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByb3dIZWlnaHQ6IG51bWJlciA9IE1hdGgubWF4KE1hdGguZmxvb3IobWF4SGVpZ2h0IC8gbWF4Um93cyksIHRoaXMubWluSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQgLT0gKHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b20pO1xuICAgICAgICAgICAgICAgIGlmIChyb3dIZWlnaHQgPiAwKSB0aGlzLnJvd0hlaWdodCA9IHJvd0hlaWdodDtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm93SGVpZ2h0IDwgdGhpcy5taW5IZWlnaHQgfHwgdGhpcy5taW5Sb3dzID4gdGhpcy5fY29uZmlnLm1pbl9yb3dzKSB7XG4gICAgICAgICAgICB0aGlzLm1pblJvd3MgPSBNYXRoLm1heCh0aGlzLl9jb25maWcubWluX3Jvd3MsIE1hdGguY2VpbCh0aGlzLm1pbkhlaWdodCAvIHRoaXMucm93SGVpZ2h0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVSYXRpbygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hdXRvUmVzaXplIHx8ICF0aGlzLl9tYWludGFpblJhdGlvKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwICYmIHRoaXMuX3Zpc2libGVSb3dzIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucm93SGVpZ2h0ID0gdGhpcy5jb2xXaWR0aCAvIHRoaXMuX2FzcGVjdFJhdGlvO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX21heFJvd3MgPiAwICYmIHRoaXMuX3Zpc2libGVDb2xzIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29sV2lkdGggPSB0aGlzLl9hc3BlY3RSYXRpbyAqIHRoaXMucm93SGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX21heENvbHMgPT0gMCAmJiB0aGlzLl9tYXhSb3dzID09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl92aXNpYmxlQ29scyA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd0hlaWdodCA9IHRoaXMuY29sV2lkdGggLyB0aGlzLl9hc3BlY3RSYXRpbztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fdmlzaWJsZVJvd3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xXaWR0aCA9IHRoaXMuX2FzcGVjdFJhdGlvICogdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hcHBseUNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaEFkZGVkSXRlbSgocmVjb3JkOiBhbnkpID0+IHsgdGhpcy5fY29uZmlnW3JlY29yZC5rZXldID0gcmVjb3JkLmN1cnJlbnRWYWx1ZTsgfSk7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaENoYW5nZWRJdGVtKChyZWNvcmQ6IGFueSkgPT4geyB0aGlzLl9jb25maWdbcmVjb3JkLmtleV0gPSByZWNvcmQuY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoUmVtb3ZlZEl0ZW0oKHJlY29yZDogYW55KSA9PiB7IGRlbGV0ZSB0aGlzLl9jb25maWdbcmVjb3JkLmtleV07IH0pO1xuXG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzaXplU3RhcnQoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5yZXNpemVFbmFibGUgfHwgIXRoaXMuX3Jlc2l6aW5nSXRlbSkgcmV0dXJuO1xuXG4gICAgICAgIC8vICAgIFNldHVwXG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zdGFydE1vdmluZygpO1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZCh0aGlzLl9yZXNpemluZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9jcmVhdGVQbGFjZWhvbGRlcih0aGlzLl9yZXNpemluZ0l0ZW0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9hbGxvd092ZXJsYXApIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS56SW5kZXggPSB0aGlzLl9sYXN0WlZhbHVlKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAgICBTdGF0dXMgRmxhZ3NcbiAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVzaXplUmVhZHkgPSBmYWxzZTtcblxuICAgICAgICAvLyAgICBFdmVudHNcbiAgICAgICAgdGhpcy5vblJlc2l6ZVN0YXJ0LmVtaXQodGhpcy5fcmVzaXppbmdJdGVtKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLm9uUmVzaXplU3RhcnRFdmVudCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RyYWdTdGFydChlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdFbmFibGUgfHwgIXRoaXMuX2RyYWdnaW5nSXRlbSkgcmV0dXJuO1xuXG4gICAgICAgIC8vICAgIFN0YXJ0IGRyYWdnaW5nXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5zdGFydE1vdmluZygpO1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZCh0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9jcmVhdGVQbGFjZWhvbGRlcih0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9hbGxvd092ZXJsYXApIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS56SW5kZXggPSB0aGlzLl9sYXN0WlZhbHVlKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAgICBTdGF0dXMgRmxhZ3NcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZHJhZ1JlYWR5ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gICAgRXZlbnRzXG4gICAgICAgIHRoaXMub25EcmFnU3RhcnQuZW1pdCh0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0ub25EcmFnU3RhcnRFdmVudCgpO1xuXG4gICAgICAgIC8vICAgIFpvb21cbiAgICAgICAgaWYgKHRoaXMuX3pvb21PbkRyYWcpIHtcbiAgICAgICAgICAgIHRoaXMuX3pvb21PdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3pvb21PdXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMC41LCAwLjUpJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzZXRab29tKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RyYWcoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0RyYWdnaW5nKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZW1wdHkoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAoPGFueT5kb2N1bWVudCkuc2VsZWN0aW9uLmVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbW91c2VQb3MgPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgICB2YXIgbmV3TCA9IChtb3VzZVBvcy5sZWZ0IC0gdGhpcy5fcG9zT2Zmc2V0LmxlZnQpO1xuICAgICAgICB2YXIgbmV3VCA9IChtb3VzZVBvcy50b3AgLSB0aGlzLl9wb3NPZmZzZXQudG9wKTtcblxuICAgICAgICB2YXIgaXRlbVBvcyA9IHRoaXMuX2RyYWdnaW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGdyaWRQb3MgPSB0aGlzLl9jYWxjdWxhdGVHcmlkUG9zaXRpb24obmV3TCwgbmV3VCk7XG4gICAgICAgIHZhciBkaW1zID0gdGhpcy5fZHJhZ2dpbmdJdGVtLmdldFNpemUoKTtcblxuICAgICAgICBncmlkUG9zID0gdGhpcy5fZml4UG9zVG9Cb3VuZHNYKGdyaWRQb3MsIGRpbXMpO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKGdyaWRQb3MsIGRpbXMpKSB7XG4gICAgICAgICAgICBncmlkUG9zID0gdGhpcy5fZml4UG9zVG9Cb3VuZHNZKGdyaWRQb3MsIGRpbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdyaWRQb3MuY29sICE9IGl0ZW1Qb3MuY29sIHx8IGdyaWRQb3Mucm93ICE9IGl0ZW1Qb3Mucm93KSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0uc2V0R3JpZFBvc2l0aW9uKGdyaWRQb3MsIHRoaXMuX2ZpeFRvR3JpZCk7XG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZi5pbnN0YW5jZS5zZXRHcmlkUG9zaXRpb24oZ3JpZFBvcyk7XG5cbiAgICAgICAgICAgIGlmIChbJ3VwJywgJ2Rvd24nLCAnbGVmdCcsICdyaWdodCddLmluZGV4T2YodGhpcy5jYXNjYWRlKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnMoZ3JpZFBvcywgZGltcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoZ3JpZFBvcywgZGltcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2ZpeFRvR3JpZCkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnNldFBvc2l0aW9uKG5ld0wsIG5ld1QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkRyYWcuZW1pdCh0aGlzLl9kcmFnZ2luZ0l0ZW0pO1xuICAgICAgICB0aGlzLl9kcmFnZ2luZ0l0ZW0ub25EcmFnRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNpemUoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1Jlc2l6aW5nKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbigpLmVtcHR5KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLmVtcHR5KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoKDxhbnk+ZG9jdW1lbnQpLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgKDxhbnk+ZG9jdW1lbnQpLnNlbGVjdGlvbi5lbXB0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VQb3MgPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgICBjb25zdCBpdGVtUG9zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGl0ZW1EaW1zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldERpbWVuc2lvbnMoKTtcbiAgICAgICAgY29uc3QgZW5kQ29ybmVyID0ge1xuICAgICAgICAgICAgbGVmdDogaXRlbVBvcy5sZWZ0ICsgaXRlbURpbXMud2lkdGgsXG4gICAgICAgICAgICB0b3A6IGl0ZW1Qb3MudG9wICsgaXRlbURpbXMuaGVpZ2h0LFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzaXplVG9wID0gdGhpcy5fcmVzaXplRGlyZWN0aW9uLmluY2x1ZGVzKCd0b3AnKTtcbiAgICAgICAgY29uc3QgcmVzaXplQm90dG9tID0gdGhpcy5fcmVzaXplRGlyZWN0aW9uLmluY2x1ZGVzKCdib3R0b20nKTtcbiAgICAgICAgY29uc3QgcmVzaXplTGVmdCA9IHRoaXMuX3Jlc2l6ZURpcmVjdGlvbi5pbmNsdWRlcygnbGVmdCcpXG4gICAgICAgIGNvbnN0IHJlc2l6ZVJpZ2h0ID0gdGhpcy5fcmVzaXplRGlyZWN0aW9uLmluY2x1ZGVzKCdyaWdodCcpO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgd2lkdGggYW5kIGhlaWdodCBiYXNlZCB1cG9uIHJlc2l6ZSBkaXJlY3Rpb25cbiAgICAgICAgbGV0IG5ld1cgPSByZXNpemVSaWdodFxuICAgICAgICAgICAgPyAobW91c2VQb3MubGVmdCAtIGl0ZW1Qb3MubGVmdCArIDEpXG4gICAgICAgICAgICA6IHJlc2l6ZUxlZnRcbiAgICAgICAgICAgICAgICA/IChlbmRDb3JuZXIubGVmdCAtIG1vdXNlUG9zLmxlZnQgKyAxKVxuICAgICAgICAgICAgICAgIDogaXRlbURpbXMud2lkdGg7XG4gICAgICAgIGxldCBuZXdIID0gcmVzaXplQm90dG9tXG4gICAgICAgICAgICA/IChtb3VzZVBvcy50b3AgLSBpdGVtUG9zLnRvcCArIDEpXG4gICAgICAgICAgICA6IHJlc2l6ZVRvcFxuICAgICAgICAgICAgICAgID8gKGVuZENvcm5lci50b3AgLSBtb3VzZVBvcy50b3AgKyAxKVxuICAgICAgICAgICAgICAgIDogaXRlbURpbXMuaGVpZ2h0O1xuXG4gICAgICAgIGlmIChuZXdXIDwgdGhpcy5taW5XaWR0aClcbiAgICAgICAgICAgIG5ld1cgPSB0aGlzLm1pbldpZHRoO1xuICAgICAgICBpZiAobmV3SCA8IHRoaXMubWluSGVpZ2h0KVxuICAgICAgICAgICAgbmV3SCA9IHRoaXMubWluSGVpZ2h0O1xuICAgICAgICBpZiAobmV3VyA8IHRoaXMuX3Jlc2l6aW5nSXRlbS5taW5XaWR0aClcbiAgICAgICAgICAgIG5ld1cgPSB0aGlzLl9yZXNpemluZ0l0ZW0ubWluV2lkdGg7XG4gICAgICAgIGlmIChuZXdIIDwgdGhpcy5fcmVzaXppbmdJdGVtLm1pbkhlaWdodClcbiAgICAgICAgICAgIG5ld0ggPSB0aGlzLl9yZXNpemluZ0l0ZW0ubWluSGVpZ2h0O1xuXG4gICAgICAgIGxldCBuZXdYID0gaXRlbVBvcy5sZWZ0O1xuICAgICAgICBsZXQgbmV3WSA9IGl0ZW1Qb3MudG9wO1xuXG4gICAgICAgIGlmIChyZXNpemVMZWZ0KVxuICAgICAgICAgICAgbmV3WCA9IGVuZENvcm5lci5sZWZ0IC0gbmV3VztcbiAgICAgICAgaWYgKHJlc2l6ZVRvcClcbiAgICAgICAgICAgIG5ld1kgPSBlbmRDb3JuZXIudG9wIC0gbmV3SDtcblxuICAgICAgICBsZXQgY2FsY1NpemUgPSB0aGlzLl9jYWxjdWxhdGVHcmlkU2l6ZShuZXdXLCBuZXdIKTtcbiAgICAgICAgY29uc3QgaXRlbVNpemUgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICBjb25zdCBpR3JpZFBvcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgYm90dG9tUmlnaHRDb3JuZXIgPSB7XG4gICAgICAgICAgICBjb2w6IGlHcmlkUG9zLmNvbCArIGl0ZW1TaXplLngsXG4gICAgICAgICAgICByb3c6IGlHcmlkUG9zLnJvdyArIGl0ZW1TaXplLnksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHRhcmdldFBvczogTmdHcmlkSXRlbVBvc2l0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwgaUdyaWRQb3MpO1xuXG4gICAgICAgIGlmICh0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ3RvcCcpKVxuICAgICAgICAgICAgdGFyZ2V0UG9zLnJvdyA9IGJvdHRvbVJpZ2h0Q29ybmVyLnJvdyAtIGNhbGNTaXplLnk7XG4gICAgICAgIGlmICh0aGlzLl9yZXNpemVEaXJlY3Rpb24uaW5jbHVkZXMoJ2xlZnQnKSlcbiAgICAgICAgICAgIHRhcmdldFBvcy5jb2wgPSBib3R0b21SaWdodENvcm5lci5jb2wgLSBjYWxjU2l6ZS54O1xuXG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHRhcmdldFBvcywgY2FsY1NpemUpKVxuICAgICAgICAgICAgY2FsY1NpemUgPSB0aGlzLl9maXhTaXplVG9Cb3VuZHNYKHRhcmdldFBvcywgY2FsY1NpemUpO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNZKHRhcmdldFBvcywgY2FsY1NpemUpKVxuICAgICAgICAgICAgY2FsY1NpemUgPSB0aGlzLl9maXhTaXplVG9Cb3VuZHNZKHRhcmdldFBvcywgY2FsY1NpemUpO1xuXG4gICAgICAgIGNhbGNTaXplID0gdGhpcy5fcmVzaXppbmdJdGVtLmZpeFJlc2l6ZShjYWxjU2l6ZSk7XG5cbiAgICAgICAgaWYgKGNhbGNTaXplLnggIT0gaXRlbVNpemUueCB8fCBjYWxjU2l6ZS55ICE9IGl0ZW1TaXplLnkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zZXRHcmlkUG9zaXRpb24odGFyZ2V0UG9zLCB0aGlzLl9maXhUb0dyaWQpO1xuICAgICAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJSZWYuaW5zdGFuY2Uuc2V0R3JpZFBvc2l0aW9uKHRhcmdldFBvcyk7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemluZ0l0ZW0uc2V0U2l6ZShjYWxjU2l6ZSwgdGhpcy5fZml4VG9HcmlkKTtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyUmVmLmluc3RhbmNlLnNldFNpemUoY2FsY1NpemUpO1xuXG4gICAgICAgICAgICBpZiAoWyd1cCcsICdkb3duJywgJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKHRoaXMuY2FzY2FkZSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpeEdyaWRDb2xsaXNpb25zKHRhcmdldFBvcywgY2FsY1NpemUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nhc2NhZGVHcmlkKHRhcmdldFBvcywgY2FsY1NpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9maXhUb0dyaWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zZXREaW1lbnNpb25zKG5ld1csIG5ld0gpO1xuICAgICAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldFBvc2l0aW9uKG5ld1gsIG5ld1kpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblJlc2l6ZS5lbWl0KHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5vblJlc2l6ZUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhZ1N0b3AoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0RyYWdnaW5nKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIGl0ZW1Qb3MgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5fZHJhZ2dpbmdJdGVtLnNldEdyaWRQb3NpdGlvbihpdGVtUG9zKTtcbiAgICAgICAgdGhpcy5fYWRkVG9HcmlkKHRoaXMuX2RyYWdnaW5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuXG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5zdG9wTW92aW5nKCk7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbS5vbkRyYWdTdG9wRXZlbnQoKTtcbiAgICAgICAgdGhpcy5vbkRyYWdTdG9wLmVtaXQodGhpcy5fZHJhZ2dpbmdJdGVtKTtcblxuICAgICAgICB0aGlzLl9jbGVhbkRyYWcoKTtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJSZWYuZGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuX2VtaXRPbkl0ZW1DaGFuZ2UoKTtcblxuICAgICAgICBpZiAodGhpcy5fem9vbU9uRHJhZykge1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRab29tKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNpemVTdG9wKGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNSZXNpemluZykgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaXNSZXNpemluZyA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1EaW1zID0gdGhpcy5fcmVzaXppbmdJdGVtLmdldFNpemUoKTtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtLnNldFNpemUoaXRlbURpbXMpO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1Qb3MgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zZXRHcmlkUG9zaXRpb24oaXRlbVBvcyk7XG5cbiAgICAgICAgdGhpcy5fYWRkVG9HcmlkKHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5fY2FzY2FkZUdyaWQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuXG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5zdG9wTW92aW5nKCk7XG4gICAgICAgIHRoaXMuX3Jlc2l6aW5nSXRlbS5vblJlc2l6ZVN0b3BFdmVudCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplU3RvcC5lbWl0KHRoaXMuX3Jlc2l6aW5nSXRlbSk7XG5cbiAgICAgICAgdGhpcy5fY2xlYW5SZXNpemUoKTtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJSZWYuZGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuX2VtaXRPbkl0ZW1DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGVhbkRyYWcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RyYWdnaW5nSXRlbSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Bvc09mZnNldCA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kcmFnUmVhZHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGVhblJlc2l6ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVzaXppbmdJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzaXplRGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc1Jlc2l6aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZVJlYWR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2FsY3VsYXRlR3JpZFNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIHdpZHRoICs9IHRoaXMubWFyZ2luTGVmdCArIHRoaXMubWFyZ2luUmlnaHQ7XG4gICAgICAgIGhlaWdodCArPSB0aGlzLm1hcmdpblRvcCArIHRoaXMubWFyZ2luQm90dG9tO1xuXG4gICAgICAgIHZhciBzaXpleCA9IE1hdGgubWF4KHRoaXMubWluQ29scywgTWF0aC5yb3VuZCh3aWR0aCAvICh0aGlzLmNvbFdpZHRoICsgdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodCkpKTtcbiAgICAgICAgdmFyIHNpemV5ID0gTWF0aC5tYXgodGhpcy5taW5Sb3dzLCBNYXRoLnJvdW5kKGhlaWdodCAvICh0aGlzLnJvd0hlaWdodCArIHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b20pKSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1goeyBjb2w6IDEsIHJvdzogMSB9LCB7IHg6IHNpemV4LCB5OiBzaXpleSB9KSkgc2l6ZXggPSB0aGlzLl9tYXhDb2xzO1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWSh7IGNvbDogMSwgcm93OiAxIH0sIHsgeDogc2l6ZXgsIHk6IHNpemV5IH0pKSBzaXpleSA9IHRoaXMuX21heFJvd3M7XG5cbiAgICAgICAgcmV0dXJuIHsgJ3gnOiBzaXpleCwgJ3knOiBzaXpleSB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NhbGN1bGF0ZUdyaWRQb3NpdGlvbihsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgdmFyIGNvbCA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQobGVmdCAvICh0aGlzLmNvbFdpZHRoICsgdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodCkpICsgMSk7XG4gICAgICAgIHZhciByb3cgPSBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHRvcCAvICh0aGlzLnJvd0hlaWdodCArIHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b20pKSArIDEpO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHsgY29sOiBjb2wsIHJvdzogcm93IH0sIHsgeDogMSwgeTogMSB9KSkgY29sID0gdGhpcy5fbWF4Q29scztcbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1koeyBjb2w6IGNvbCwgcm93OiByb3cgfSwgeyB4OiAxLCB5OiAxIH0pKSByb3cgPSB0aGlzLl9tYXhSb3dzO1xuXG4gICAgICAgIHJldHVybiB7ICdjb2wnOiBjb2wsICdyb3cnOiByb3cgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYXNHcmlkQ29sbGlzaW9uKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IGJvb2xlYW4ge1xuICAgICAgICB2YXIgcG9zaXRpb25zID0gdGhpcy5fZ2V0Q29sbGlzaW9ucyhwb3MsIGRpbXMpO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbnMgPT0gbnVsbCB8fCBwb3NpdGlvbnMubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gcG9zaXRpb25zLnNvbWUoKHY6IE5nR3JpZEl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhKHYgPT09IG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRDb2xsaXNpb25zKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IEFycmF5PE5nR3JpZEl0ZW0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IHJldHVybnM6IEFycmF5PE5nR3JpZEl0ZW0+ID0gW107XG5cbiAgICAgICAgaWYgKCFwb3MuY29sKSB7IHBvcy5jb2wgPSAxOyB9XG4gICAgICAgIGlmICghcG9zLnJvdykgeyBwb3Mucm93ID0gMTsgfVxuXG4gICAgICAgIGNvbnN0IGxlZnRDb2wgPSBwb3MuY29sO1xuICAgICAgICBjb25zdCByaWdodENvbCA9IHBvcy5jb2wgKyBkaW1zLng7XG4gICAgICAgIGNvbnN0IHRvcFJvdyA9IHBvcy5yb3c7XG4gICAgICAgIGNvbnN0IGJvdHRvbVJvdyA9IHBvcy5yb3cgKyBkaW1zLnk7XG5cbiAgICAgICAgdGhpcy5faXRlbXNJbkdyaWQuZm9yRWFjaCgoaXRlbUlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW06IE5nR3JpZEl0ZW0gPSB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKTtcblxuICAgICAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXNJbkdyaWQuZGVsZXRlKGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpdGVtTGVmdENvbCA9IGl0ZW0uY29sO1xuICAgICAgICAgICAgY29uc3QgaXRlbVJpZ2h0Q29sID0gaXRlbS5jb2wgKyBpdGVtLnNpemV4O1xuICAgICAgICAgICAgY29uc3QgaXRlbVRvcFJvdyA9IGl0ZW0ucm93O1xuICAgICAgICAgICAgY29uc3QgaXRlbUJvdHRvbVJvdyA9IGl0ZW0ucm93ICsgaXRlbS5zaXpleTtcblxuICAgICAgICAgICAgY29uc3Qgd2l0aGluQ29sdW1ucyA9IGxlZnRDb2wgPCBpdGVtUmlnaHRDb2wgJiYgaXRlbUxlZnRDb2wgPCByaWdodENvbDtcbiAgICAgICAgICAgIGNvbnN0IHdpdGhpblJvd3MgPSB0b3BSb3cgPCBpdGVtQm90dG9tUm93ICYmIGl0ZW1Ub3BSb3cgPCBib3R0b21Sb3c7XG5cbiAgICAgICAgICAgIGlmICh3aXRoaW5Db2x1bW5zICYmIHdpdGhpblJvd3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeEdyaWRDb2xsaXNpb25zKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb2xsaXNpb25zOiBBcnJheTxOZ0dyaWRJdGVtPiA9IHRoaXMuX2dldENvbGxpc2lvbnMocG9zLCBkaW1zKTtcbiAgICAgICAgaWYgKGNvbGxpc2lvbnMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGZvciAobGV0IGNvbGxpc2lvbiBvZiBjb2xsaXNpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tR3JpZChjb2xsaXNpb24pO1xuXG4gICAgICAgICAgICBjb25zdCBpdGVtRGltczogTmdHcmlkSXRlbVNpemUgPSBjb2xsaXNpb24uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgY29uc3QgaXRlbVBvczogTmdHcmlkSXRlbVBvc2l0aW9uID0gY29sbGlzaW9uLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgbGV0IG5ld0l0ZW1Qb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IHsgY29sOiBpdGVtUG9zLmNvbCwgcm93OiBpdGVtUG9zLnJvdyB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fY29sbGlzaW9uRml4RGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICAgICAgbmV3SXRlbVBvcy5yb3cgPSBwb3Mucm93ICsgZGltcy55O1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1kobmV3SXRlbVBvcywgaXRlbURpbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0l0ZW1Qb3MuY29sID0gcG9zLmNvbCArIGRpbXMueDtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbVBvcy5yb3cgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY29sbGlzaW9uRml4RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLmNvbCA9IHBvcy5jb2wgKyBkaW1zLng7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWChuZXdJdGVtUG9zLCBpdGVtRGltcykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SXRlbVBvcy5jb2wgPSAxO1xuICAgICAgICAgICAgICAgICAgICBuZXdJdGVtUG9zLnJvdyA9IHBvcy5yb3cgKyBkaW1zLnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb2xsaXNpb24uc2V0R3JpZFBvc2l0aW9uKG5ld0l0ZW1Qb3MpO1xuXG4gICAgICAgICAgICB0aGlzLl9maXhHcmlkQ29sbGlzaW9ucyhuZXdJdGVtUG9zLCBpdGVtRGltcyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoY29sbGlzaW9uKTtcbiAgICAgICAgICAgIGNvbGxpc2lvbi5vbkNhc2NhZGVFdmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZml4R3JpZENvbGxpc2lvbnMocG9zLCBkaW1zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jYXNjYWRlR3JpZChwb3M/OiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM/OiBOZ0dyaWRJdGVtU2l6ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9hbGxvd092ZXJsYXApIHJldHVybjtcbiAgICAgICAgaWYgKCFwb3MgIT09ICFkaW1zKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYXNjYWRlIHdpdGggb25seSBwb3NpdGlvbiBhbmQgbm90IGRpbWVuc2lvbnMnKTtcblxuICAgICAgICBpZiAodGhpcy5pc0RyYWdnaW5nICYmIHRoaXMuX2RyYWdnaW5nSXRlbSAmJiAhcG9zICYmICFkaW1zKSB7XG4gICAgICAgICAgICBwb3MgPSB0aGlzLl9kcmFnZ2luZ0l0ZW0uZ2V0R3JpZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBkaW1zID0gdGhpcy5fZHJhZ2dpbmdJdGVtLmdldFNpemUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUmVzaXppbmcgJiYgdGhpcy5fcmVzaXppbmdJdGVtICYmICFwb3MgJiYgIWRpbXMpIHtcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuX3Jlc2l6aW5nSXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgICAgIGRpbXMgPSB0aGlzLl9yZXNpemluZ0l0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGl0ZW1zSW5HcmlkOiBOZ0dyaWRJdGVtW10gPSBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zSW5HcmlkLCAoaXRlbUlkOiBzdHJpbmcpID0+IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuY2FzY2FkZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgaXRlbXNJbkdyaWQgPSBpdGVtc0luR3JpZC5zb3J0KE5nR3JpZEhlbHBlci5zb3J0SXRlbXNCeVBvc2l0aW9uVmVydGljYWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VzdFJvd1BlckNvbHVtbjogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zSW5HcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzRml4ZWQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1EaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGl0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtUG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBsb3dlc3RSb3dGb3JJdGVtOiBudW1iZXIgPSBsb3dlc3RSb3dQZXJDb2x1bW4uZ2V0KGl0ZW1Qb3MuY29sKSB8fCAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBpdGVtRGltcy54OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VzdFJvd0ZvckNvbHVtbiA9IGxvd2VzdFJvd1BlckNvbHVtbi5nZXQoaXRlbVBvcy5jb2wgKyBpKSB8fCAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0Um93Rm9ySXRlbSA9IE1hdGgubWF4KGxvd2VzdFJvd0ZvckNvbHVtbiwgbG93ZXN0Um93Rm9ySXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZWZ0Q29sID0gaXRlbVBvcy5jb2w7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0Q29sID0gaXRlbVBvcy5jb2wgKyBpdGVtRGltcy54O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3MgJiYgZGltcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2l0aGluQ29sdW1ucyA9IHJpZ2h0Q29sID4gcG9zLmNvbCAmJiBsZWZ0Q29sIDwgKHBvcy5jb2wgKyBkaW1zLngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l0aGluQ29sdW1ucykgeyAgICAgICAgICAvLyBJZiBvdXIgZWxlbWVudCBpcyBpbiBvbmUgb2YgdGhlIGl0ZW0ncyBjb2x1bW5zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vbUFib3ZlSXRlbSA9IGl0ZW1EaW1zLnkgPD0gKHBvcy5yb3cgLSBsb3dlc3RSb3dGb3JJdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm9vbUFib3ZlSXRlbSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXRlbSBjYW4ndCBmaXQgYWJvdmUgb3VyIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0Um93Rm9ySXRlbSA9IE1hdGgubWF4KGxvd2VzdFJvd0Zvckl0ZW0sIHBvcy5yb3cgKyBkaW1zLnkpOyAgIC8vIFNldCB0aGUgbG93ZXN0IHJvdyB0byBiZSBiZWxvdyBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BvczogTmdHcmlkSXRlbVBvc2l0aW9uID0geyBjb2w6IGl0ZW1Qb3MuY29sLCByb3c6IGxvd2VzdFJvd0Zvckl0ZW0gfTtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgICBXaGF0IGlmIGl0J3Mgbm90IHdpdGhpbiBib3VuZHMgWT9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvd2VzdFJvd0Zvckl0ZW0gIT0gaXRlbVBvcy5yb3cgJiYgdGhpcy5faXNXaXRoaW5Cb3VuZHNZKG5ld1BvcywgaXRlbURpbXMpKSB7IC8vIElmIHRoZSBpdGVtIGlzIG5vdCBhbHJlYWR5IG9uIHRoaXMgcm93IG1vdmUgaXQgdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbURpbXMueDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RSb3dQZXJDb2x1bW4uc2V0KGl0ZW1Qb3MuY29sICsgaSwgbG93ZXN0Um93Rm9ySXRlbSArIGl0ZW1EaW1zLnkpOyAvLyBVcGRhdGUgdGhlIGxvd2VzdCByb3cgdG8gYmUgYmVsb3cgdGhlIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGl0ZW1zSW5HcmlkID0gaXRlbXNJbkdyaWQuc29ydChOZ0dyaWRIZWxwZXIuc29ydEl0ZW1zQnlQb3NpdGlvbkhvcml6b250YWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VzdENvbHVtblBlclJvdzogTWFwPG51bWJlciwgbnVtYmVyPiA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zSW5HcmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1EaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGl0ZW0uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtUG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBsb3dlc3RDb2x1bW5Gb3JJdGVtOiBudW1iZXIgPSBsb3dlc3RDb2x1bW5QZXJSb3cuZ2V0KGl0ZW1Qb3Mucm93KSB8fCAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBpdGVtRGltcy55OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb3dlc3RPZmZzZXRDb2x1bW46IG51bWJlciA9IGxvd2VzdENvbHVtblBlclJvdy5nZXQoaXRlbVBvcy5yb3cgKyBpKSB8fCAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0Q29sdW1uRm9ySXRlbSA9IE1hdGgubWF4KGxvd2VzdE9mZnNldENvbHVtbiwgbG93ZXN0Q29sdW1uRm9ySXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3BSb3cgPSBpdGVtUG9zLnJvdztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm90dG9tUm93ID0gaXRlbVBvcy5yb3cgKyBpdGVtRGltcy55O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3MgJiYgZGltcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2l0aGluUm93cyA9IGJvdHRvbVJvdyA+IHBvcy5jb2wgJiYgdG9wUm93IDwgKHBvcy5jb2wgKyBkaW1zLngpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l0aGluUm93cykgeyAgICAgICAgICAvLyBJZiBvdXIgZWxlbWVudCBpcyBpbiBvbmUgb2YgdGhlIGl0ZW0ncyByb3dzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vbU5leHRUb0l0ZW0gPSBpdGVtRGltcy54IDw9IChwb3MuY29sIC0gbG93ZXN0Q29sdW1uRm9ySXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJvb21OZXh0VG9JdGVtKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXRlbSBjYW4ndCBmaXQgbmV4dCB0byBvdXIgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RDb2x1bW5Gb3JJdGVtID0gTWF0aC5tYXgobG93ZXN0Q29sdW1uRm9ySXRlbSwgcG9zLmNvbCArIGRpbXMueCk7ICAvLyBTZXQgdGhlIGxvd2VzdCBjb2wgdG8gYmUgdGhlIG90aGVyIHNpZGUgb2YgaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiA9IHsgY29sOiBsb3dlc3RDb2x1bW5Gb3JJdGVtLCByb3c6IGl0ZW1Qb3Mucm93IH07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvd2VzdENvbHVtbkZvckl0ZW0gIT0gaXRlbVBvcy5jb2wgJiYgdGhpcy5faXNXaXRoaW5Cb3VuZHNYKG5ld1BvcywgaXRlbURpbXMpKSB7IC8vIElmIHRoZSBpdGVtIGlzIG5vdCBhbHJlYWR5IG9uIHRoaXMgY29sIG1vdmUgaXQgdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21HcmlkKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnNldEdyaWRQb3NpdGlvbihuZXdQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uQ2FzY2FkZUV2ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb0dyaWQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgaXRlbURpbXMueTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlc3RDb2x1bW5QZXJSb3cuc2V0KGl0ZW1Qb3Mucm93ICsgaSwgbG93ZXN0Q29sdW1uRm9ySXRlbSArIGl0ZW1EaW1zLngpOyAvLyBVcGRhdGUgdGhlIGxvd2VzdCBjb2wgdG8gYmUgYmVsb3cgdGhlIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9maXhHcmlkUG9zaXRpb24ocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplKTogTmdHcmlkSXRlbVBvc2l0aW9uIHtcbiAgICAgICAgaWYgKCF0aGlzLl9oYXNHcmlkQ29sbGlzaW9uKHBvcywgZGltcykpIHJldHVybiBwb3M7XG5cbiAgICAgICAgY29uc3QgbWF4Um93ID0gdGhpcy5fbWF4Um93cyA9PT0gMCA/IHRoaXMuX2dldE1heFJvdygpIDogdGhpcy5fbWF4Um93cztcbiAgICAgICAgY29uc3QgbWF4Q29sID0gdGhpcy5fbWF4Q29scyA9PT0gMCA/IHRoaXMuX2dldE1heENvbCgpIDogdGhpcy5fbWF4Q29scztcbiAgICAgICAgY29uc3QgbmV3UG9zID0ge1xuICAgICAgICAgICAgY29sOiBwb3MuY29sLFxuICAgICAgICAgICAgcm93OiBwb3Mucm93LFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLl9pdGVtRml4RGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBmaXhMb29wOlxuICAgICAgICAgICAgZm9yICg7IG5ld1Bvcy5jb2wgPD0gbWF4Um93Oykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zSW5QYXRoID0gdGhpcy5fZ2V0SXRlbXNJblZlcnRpY2FsUGF0aChuZXdQb3MsIGRpbXMsIG5ld1Bvcy5yb3cpO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Um93ID0gbmV3UG9zLnJvdztcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXNJblBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucm93IC0gbmV4dFJvdyA+PSBkaW1zLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSBuZXh0Um93O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZml4TG9vcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG5leHRSb3cgPSBpdGVtLnJvdyArIGl0ZW0uc2l6ZXk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1heFJvdyAtIG5leHRSb3cgPj0gZGltcy55KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvcy5yb3cgPSBuZXh0Um93O1xuICAgICAgICAgICAgICAgICAgICBicmVhayBmaXhMb29wO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld1Bvcy5jb2wgPSBNYXRoLm1heChuZXdQb3MuY29sICsgMSwgTWF0aC5taW4uYXBwbHkoTWF0aCwgaXRlbXNJblBhdGgubWFwKChpdGVtKSA9PiBpdGVtLmNvbCArIGRpbXMueCkpKTtcbiAgICAgICAgICAgICAgICBuZXdQb3Mucm93ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9pdGVtRml4RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGZpeExvb3A6XG4gICAgICAgICAgICBmb3IgKDsgbmV3UG9zLnJvdyA8PSBtYXhSb3c7KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblBhdGggPSB0aGlzLl9nZXRJdGVtc0luSG9yaXpvbnRhbFBhdGgobmV3UG9zLCBkaW1zLCBuZXdQb3MuY29sKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENvbCA9IG5ld1Bvcy5jb2w7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zSW5QYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNvbCAtIG5leHRDb2wgPj0gZGltcy54KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3MuY29sID0gbmV4dENvbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGZpeExvb3A7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBuZXh0Q29sID0gaXRlbS5jb2wgKyBpdGVtLnNpemV4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtYXhDb2wgLSBuZXh0Q29sID49IGRpbXMueCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdQb3MuY29sID0gbmV4dENvbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWsgZml4TG9vcDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBuZXdQb3Mucm93ID0gTWF0aC5tYXgobmV3UG9zLnJvdyArIDEsIE1hdGgubWluLmFwcGx5KE1hdGgsIGl0ZW1zSW5QYXRoLm1hcCgoaXRlbSkgPT4gaXRlbS5yb3cgKyBkaW1zLnkpKSk7XG4gICAgICAgICAgICAgICAgbmV3UG9zLmNvbCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3UG9zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEl0ZW1zSW5Ib3Jpem9udGFsUGF0aChwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUsIHN0YXJ0Q29sdW1uOiBudW1iZXIgPSAwKTogTmdHcmlkSXRlbVtdIHtcbiAgICAgICAgY29uc3QgaXRlbXNJblBhdGg6IE5nR3JpZEl0ZW1bXSA9IFtdO1xuICAgICAgICBjb25zdCB0b3BSb3c6IG51bWJlciA9IHBvcy5yb3cgKyBkaW1zLnkgLSAxO1xuXG4gICAgICAgIHRoaXMuX2l0ZW1zSW5HcmlkLmZvckVhY2goKGl0ZW1JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXMuZ2V0KGl0ZW1JZCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5jb2wgKyBpdGVtLnNpemV4IC0gMSA8IHN0YXJ0Q29sdW1uKSB7IHJldHVybjsgfSAgICAvLyBJdGVtIGZhbGxzIGFmdGVyIHN0YXJ0IGNvbHVtblxuICAgICAgICAgICAgaWYgKGl0ZW0ucm93ID4gdG9wUm93KSB7IHJldHVybjsgfSAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXRlbSBmYWxscyBhYm92ZSBwYXRoXG4gICAgICAgICAgICBpZiAoaXRlbS5yb3cgKyBpdGVtLnNpemV5IC0gMSA8IHBvcy5yb3cpIHsgcmV0dXJuOyB9ICAgICAgICAvLyBJdGVtIGZhbGxzIGJlbG93IHBhdGhcbiAgICAgICAgICAgIGl0ZW1zSW5QYXRoLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpdGVtc0luUGF0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRJdGVtc0luVmVydGljYWxQYXRoKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSwgc3RhcnRSb3c6IG51bWJlciA9IDApOiBOZ0dyaWRJdGVtW10ge1xuICAgICAgICBjb25zdCBpdGVtc0luUGF0aDogTmdHcmlkSXRlbVtdID0gW107XG4gICAgICAgIGNvbnN0IHJpZ2h0Q29sOiBudW1iZXIgPSBwb3MuY29sICsgZGltcy54IC0gMTtcblxuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5mb3JFYWNoKChpdGVtSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpO1xuICAgICAgICAgICAgaWYgKGl0ZW0ucm93ICsgaXRlbS5zaXpleSAtIDEgPCBzdGFydFJvdykgeyByZXR1cm47IH0gICAvLyBJdGVtIGZhbGxzIGFib3ZlIHN0YXJ0IHJvd1xuICAgICAgICAgICAgaWYgKGl0ZW0uY29sID4gcmlnaHRDb2wpIHsgcmV0dXJuOyB9ICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGZhbGxzIGFmdGVyIHBhdGhcbiAgICAgICAgICAgIGlmIChpdGVtLmNvbCArIGl0ZW0uc2l6ZXggLSAxIDwgcG9zLmNvbCkgeyByZXR1cm47IH0gICAgLy8gSXRlbSBmYWxscyBiZWZvcmUgcGF0aFxuICAgICAgICAgICAgaXRlbXNJblBhdGgucHVzaChpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zSW5QYXRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzV2l0aGluQm91bmRzWChwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUsIGFsbG93RXhjZXNzaXZlSXRlbXM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4Q29scyA9PSAwIHx8IChhbGxvd0V4Y2Vzc2l2ZUl0ZW1zICYmIHBvcy5jb2wgPT0gMSkgfHwgKHBvcy5jb2wgKyBkaW1zLnggLSAxKSA8PSB0aGlzLl9tYXhDb2xzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFBvc1RvQm91bmRzWChwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWChwb3MsIGRpbXMpKSB7XG4gICAgICAgICAgICBwb3MuY29sID0gTWF0aC5tYXgodGhpcy5fbWF4Q29scyAtIChkaW1zLnggLSAxKSwgMSk7XG4gICAgICAgICAgICBwb3Mucm93ICsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZml4U2l6ZVRvQm91bmRzWChwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIGlmICghdGhpcy5faXNXaXRoaW5Cb3VuZHNYKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIGRpbXMueCA9IE1hdGgubWF4KHRoaXMuX21heENvbHMgLSAocG9zLmNvbCAtIDEpLCAxKTtcbiAgICAgICAgICAgIGRpbXMueSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzV2l0aGluQm91bmRzWShwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUsIGFsbG93RXhjZXNzaXZlSXRlbXM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4Um93cyA9PSAwIHx8IChhbGxvd0V4Y2Vzc2l2ZUl0ZW1zICYmIHBvcy5yb3cgPT0gMSkgfHwgKHBvcy5yb3cgKyBkaW1zLnkgLSAxKSA8PSB0aGlzLl9tYXhSb3dzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFBvc1RvQm91bmRzWShwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtUG9zaXRpb24ge1xuICAgICAgICBpZiAoIXRoaXMuX2lzV2l0aGluQm91bmRzWShwb3MsIGRpbXMpKSB7XG4gICAgICAgICAgICBwb3Mucm93ID0gTWF0aC5tYXgodGhpcy5fbWF4Um93cyAtIChkaW1zLnkgLSAxKSwgMSk7XG4gICAgICAgICAgICBwb3MuY29sKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9maXhTaXplVG9Cb3VuZHNZKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1dpdGhpbkJvdW5kc1kocG9zLCBkaW1zKSkge1xuICAgICAgICAgICAgZGltcy55ID0gTWF0aC5tYXgodGhpcy5fbWF4Um93cyAtIChwb3Mucm93IC0gMSksIDEpO1xuICAgICAgICAgICAgZGltcy54Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNXaXRoaW5Cb3VuZHMocG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24sIGRpbXM6IE5nR3JpZEl0ZW1TaXplLCBhbGxvd0V4Y2Vzc2l2ZUl0ZW1zOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzV2l0aGluQm91bmRzWChwb3MsIGRpbXMsIGFsbG93RXhjZXNzaXZlSXRlbXMpICYmIHRoaXMuX2lzV2l0aGluQm91bmRzWShwb3MsIGRpbXMsIGFsbG93RXhjZXNzaXZlSXRlbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFBvc1RvQm91bmRzKHBvczogTmdHcmlkSXRlbVBvc2l0aW9uLCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1Qb3NpdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXhQb3NUb0JvdW5kc1godGhpcy5fZml4UG9zVG9Cb3VuZHNZKHBvcywgZGltcyksIGRpbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpeFNpemVUb0JvdW5kcyhwb3M6IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgZGltczogTmdHcmlkSXRlbVNpemUpOiBOZ0dyaWRJdGVtU2l6ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXhTaXplVG9Cb3VuZHNYKHBvcywgdGhpcy5fZml4U2l6ZVRvQm91bmRzWShwb3MsIGRpbXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRUb0dyaWQoaXRlbTogTmdHcmlkSXRlbSk6IHZvaWQge1xuICAgICAgICBsZXQgcG9zOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCBkaW1zOiBOZ0dyaWRJdGVtU2l6ZSA9IGl0ZW0uZ2V0U2l6ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9oYXNHcmlkQ29sbGlzaW9uKHBvcywgZGltcykpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpeEdyaWRDb2xsaXNpb25zKHBvcywgZGltcyk7XG4gICAgICAgICAgICBwb3MgPSBpdGVtLmdldEdyaWRQb3NpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2FsbG93T3ZlcmxhcCkge1xuICAgICAgICAgICAgaXRlbS56SW5kZXggPSB0aGlzLl9sYXN0WlZhbHVlKys7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pdGVtc0luR3JpZC5hZGQoaXRlbS51aWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbW92ZUZyb21HcmlkKGl0ZW06IE5nR3JpZEl0ZW0pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faXRlbXNJbkdyaWQuZGVsZXRlKGl0ZW0udWlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVTaXplKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGxldCBtYXhDb2w6IG51bWJlciA9IHRoaXMuX2dldE1heENvbCgpO1xuICAgICAgICBsZXQgbWF4Um93OiBudW1iZXIgPSB0aGlzLl9nZXRNYXhSb3coKTtcblxuICAgICAgICBpZiAobWF4Q29sICE9IHRoaXMuX2N1ck1heENvbCB8fCBtYXhSb3cgIT0gdGhpcy5fY3VyTWF4Um93KSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJNYXhDb2wgPSBtYXhDb2w7XG4gICAgICAgICAgICB0aGlzLl9jdXJNYXhSb3cgPSBtYXhSb3c7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpOy8vKG1heENvbCAqICh0aGlzLmNvbFdpZHRoICsgdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodCkpKydweCcpO1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRCYXNlZER5bmFtaWNSb3dIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCAobWF4Um93ICogKHRoaXMucm93SGVpZ2h0ICsgdGhpcy5tYXJnaW5Ub3AgKyB0aGlzLm1hcmdpbkJvdHRvbSkpICsgJ3B4Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRNYXhSb3coKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgaXRlbXNSb3dzOiBudW1iZXJbXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQsIChpdGVtSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpO1xuICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnJvdyArIGl0ZW0uc2l6ZXkgLSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgaXRlbXNSb3dzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRNYXhDb2woKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgaXRlbXNDb2xzOiBudW1iZXJbXSA9IEFycmF5LmZyb20odGhpcy5faXRlbXNJbkdyaWQsIChpdGVtSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpO1xuICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNvbCArIGl0ZW0uc2l6ZXggLSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgaXRlbXNDb2xzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRNb3VzZVBvc2l0aW9uKGU6IGFueSk6IE5nR3JpZFJhd1Bvc2l0aW9uIHtcbiAgICAgICAgaWYgKCgoPGFueT53aW5kb3cpLlRvdWNoRXZlbnQgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHx8IChlLnRvdWNoZXMgfHwgZS5jaGFuZ2VkVG91Y2hlcykpIHtcbiAgICAgICAgICAgIGUgPSBlLnRvdWNoZXMubGVuZ3RoID4gMCA/IGUudG91Y2hlc1swXSA6IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZWZQb3M6IGFueSA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBsZXQgbGVmdDogbnVtYmVyID0gZS5jbGllbnRYIC0gcmVmUG9zLmxlZnQ7XG4gICAgICAgIGxldCB0b3A6IG51bWJlciA9IGUuY2xpZW50WSAtIHJlZlBvcy50b3A7XG5cbiAgICAgICAgaWYgKHRoaXMuY2FzY2FkZSA9PSAnZG93bicpIHRvcCA9IHJlZlBvcy50b3AgKyByZWZQb3MuaGVpZ2h0IC0gZS5jbGllbnRZO1xuICAgICAgICBpZiAodGhpcy5jYXNjYWRlID09ICdyaWdodCcpIGxlZnQgPSByZWZQb3MubGVmdCArIHJlZlBvcy53aWR0aCAtIGUuY2xpZW50WDtcblxuICAgICAgICBpZiAodGhpcy5pc0RyYWdnaW5nICYmIHRoaXMuX3pvb21PbkRyYWcpIHtcbiAgICAgICAgICAgIGxlZnQgKj0gMjtcbiAgICAgICAgICAgIHRvcCAqPSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgICB0b3A6IHRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEFic29sdXRlTW91c2VQb3NpdGlvbihlOiBhbnkpOiBOZ0dyaWRSYXdQb3NpdGlvbiB7XG4gICAgICAgIGlmICgoKDxhbnk+d2luZG93KS5Ub3VjaEV2ZW50ICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB8fCAoZS50b3VjaGVzIHx8IGUuY2hhbmdlZFRvdWNoZXMpKSB7XG4gICAgICAgICAgICBlID0gZS50b3VjaGVzLmxlbmd0aCA+IDAgPyBlLnRvdWNoZXNbMF0gOiBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGUuY2xpZW50WCxcbiAgICAgICAgICAgIHRvcDogZS5jbGllbnRZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Q29udGFpbmVyQ29sdW1ucygpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBtYXhXaWR0aDogbnVtYmVyID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCBpdGVtV2lkdGg6IG51bWJlciA9IHRoaXMuY29sV2lkdGggKyB0aGlzLm1hcmdpbkxlZnQgKyB0aGlzLm1hcmdpblJpZ2h0O1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihtYXhXaWR0aCAvIGl0ZW1XaWR0aCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Q29udGFpbmVyUm93cygpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBtYXhIZWlnaHQ6IG51bWJlciA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMubWFyZ2luVG9wIC0gdGhpcy5tYXJnaW5Cb3R0b207XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG1heEhlaWdodCAvICh0aGlzLnJvd0hlaWdodCArIHRoaXMubWFyZ2luVG9wICsgdGhpcy5tYXJnaW5Cb3R0b20pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRTY3JlZW5NYXJnaW4oKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbWF4V2lkdGg6IG51bWJlciA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgY29uc3QgaXRlbVdpZHRoOiBudW1iZXIgPSB0aGlzLmNvbFdpZHRoICsgdGhpcy5tYXJnaW5MZWZ0ICsgdGhpcy5tYXJnaW5SaWdodDtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKG1heFdpZHRoIC0gKHRoaXMuX21heENvbHMgKiBpdGVtV2lkdGgpKSAvIDIpOztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRJdGVtRnJvbVBvc2l0aW9uKHBvc2l0aW9uOiBOZ0dyaWRSYXdQb3NpdGlvbik6IE5nR3JpZEl0ZW0ge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9pdGVtc0luR3JpZCwgKGl0ZW1JZDogc3RyaW5nKSA9PiB0aGlzLl9pdGVtcy5nZXQoaXRlbUlkKSkuZmluZCgoaXRlbTogTmdHcmlkSXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IHNpemU6IE5nR3JpZEl0ZW1EaW1lbnNpb25zID0gaXRlbS5nZXREaW1lbnNpb25zKCk7XG4gICAgICAgICAgICBjb25zdCBwb3M6IE5nR3JpZFJhd1Bvc2l0aW9uID0gaXRlbS5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ubGVmdCA+PSBwb3MubGVmdCAmJiBwb3NpdGlvbi5sZWZ0IDwgKHBvcy5sZWZ0ICsgc2l6ZS53aWR0aCkgJiZcbiAgICAgICAgICAgIHBvc2l0aW9uLnRvcCA+PSBwb3MudG9wICYmIHBvc2l0aW9uLnRvcCA8IChwb3MudG9wICsgc2l6ZS5oZWlnaHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVQbGFjZWhvbGRlcihpdGVtOiBOZ0dyaWRJdGVtKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBvczogTmdHcmlkSXRlbVBvc2l0aW9uID0gaXRlbS5nZXRHcmlkUG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgZGltczogTmdHcmlkSXRlbVNpemUgPSBpdGVtLmdldFNpemUoKTtcblxuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdHcmlkUGxhY2Vob2xkZXIpO1xuICAgICAgICB2YXIgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8TmdHcmlkUGxhY2Vob2xkZXI+ID0gaXRlbS5jb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZiA9IGNvbXBvbmVudFJlZjtcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXI6IE5nR3JpZFBsYWNlaG9sZGVyID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgICAgICBwbGFjZWhvbGRlci5yZWdpc3RlckdyaWQodGhpcyk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnNldENhc2NhZGVNb2RlKHRoaXMuY2FzY2FkZSk7XG4gICAgICAgIHBsYWNlaG9sZGVyLnNldEdyaWRQb3NpdGlvbih7IGNvbDogcG9zLmNvbCwgcm93OiBwb3Mucm93IH0pO1xuICAgICAgICBwbGFjZWhvbGRlci5zZXRTaXplKHsgeDogZGltcy54LCB5OiBkaW1zLnkgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW1pdE9uSXRlbUNoYW5nZSgpIHtcbiAgICAgICAgY29uc3QgaXRlbU91dHB1dDogYW55W10gPSBBcnJheS5mcm9tKHRoaXMuX2l0ZW1zSW5HcmlkKVxuICAgICAgICAgICAgLm1hcCgoaXRlbUlkOiBzdHJpbmcpID0+IHRoaXMuX2l0ZW1zLmdldChpdGVtSWQpKVxuICAgICAgICAgICAgLmZpbHRlcigoaXRlbTogTmdHcmlkSXRlbSkgPT4gISFpdGVtKVxuICAgICAgICAgICAgLm1hcCgoaXRlbTogTmdHcmlkSXRlbSkgPT4gaXRlbS5nZXRFdmVudE91dHB1dCgpKTtcblxuICAgICAgICB0aGlzLm9uSXRlbUNoYW5nZS5lbWl0KGl0ZW1PdXRwdXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RlZmluZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX25nRWwubmF0aXZlRWxlbWVudDtcblxuICAgICAgICB0aGlzLl9kb2N1bWVudE1vdXNlbW92ZSQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRNb3VzZXVwJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ21vdXNldXAnKTtcbiAgICAgICAgdGhpcy5fbW91c2Vkb3duJCA9IGZyb21FdmVudChlbGVtZW50LCAnbW91c2Vkb3duJyk7XG4gICAgICAgIHRoaXMuX21vdXNlbW92ZSQgPSBmcm9tRXZlbnQoZWxlbWVudCwgJ21vdXNlbW92ZScpO1xuICAgICAgICB0aGlzLl9tb3VzZXVwJCA9IGZyb21FdmVudChlbGVtZW50LCAnbW91c2V1cCcpO1xuICAgICAgICB0aGlzLl90b3VjaHN0YXJ0JCA9IGZyb21FdmVudChlbGVtZW50LCAndG91Y2hzdGFydCcpO1xuICAgICAgICB0aGlzLl90b3VjaG1vdmUkID0gZnJvbUV2ZW50KGVsZW1lbnQsICd0b3VjaG1vdmUnKTtcbiAgICAgICAgdGhpcy5fdG91Y2hlbmQkID0gZnJvbUV2ZW50KGVsZW1lbnQsICd0b3VjaGVuZCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2VuYWJsZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2VuYWJsZWRMaXN0ZW5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZW5hYmxlTW91c2VMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAodGhpcy5faXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVUb3VjaExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZW5hYmxlZExpc3RlbmVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnM6IFN1YnNjcmlwdGlvbikgPT4gc3Vicy51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZExpc3RlbmVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNUb3VjaERldmljZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuICAgIH07XG5cbiAgICBwcml2YXRlIF9lbmFibGVUb3VjaExpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG91Y2hzdGFydFN1YnMgPSB0aGlzLl90b3VjaHN0YXJ0JC5zdWJzY3JpYmUoKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMubW91c2VEb3duRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgdG91Y2htb3ZlU3VicyA9IHRoaXMuX3RvdWNobW92ZSQuc3Vic2NyaWJlKChlOiBUb3VjaEV2ZW50KSA9PiB0aGlzLm1vdXNlTW92ZUV2ZW50SGFuZGxlcihlKSk7XG4gICAgICAgIGNvbnN0IHRvdWNoZW5kU3VicyA9IHRoaXMuX3RvdWNoZW5kJC5zdWJzY3JpYmUoKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMubW91c2VVcEV2ZW50SGFuZGxlcihlKSk7XG5cbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICAgICAgdG91Y2hzdGFydFN1YnMsXG4gICAgICAgICAgICB0b3VjaG1vdmVTdWJzLFxuICAgICAgICAgICAgdG91Y2hlbmRTdWJzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW5hYmxlTW91c2VMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50TW91c2Vtb3ZlU3VicyA9IHRoaXMuX2RvY3VtZW50TW91c2Vtb3ZlJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VNb3ZlRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRNb3VzZXVwU3VicyA9IHRoaXMuX2RvY3VtZW50TW91c2V1cCQuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm1vdXNlVXBFdmVudEhhbmRsZXIoZSkpO1xuICAgICAgICBjb25zdCBtb3VzZWRvd25TdWJzID0gdGhpcy5fbW91c2Vkb3duJC5zdWJzY3JpYmUoKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMubW91c2VEb3duRXZlbnRIYW5kbGVyKGUpKTtcbiAgICAgICAgY29uc3QgbW91c2Vtb3ZlU3VicyA9IHRoaXMuX21vdXNlbW92ZSQuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm1vdXNlTW92ZUV2ZW50SGFuZGxlcihlKSk7XG4gICAgICAgIGNvbnN0IG1vdXNldXBTdWJzID0gdGhpcy5fbW91c2V1cCQuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm1vdXNlVXBFdmVudEhhbmRsZXIoZSkpO1xuXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgIGRvY3VtZW50TW91c2Vtb3ZlU3VicyxcbiAgICAgICAgICAgIGRvY3VtZW50TW91c2V1cFN1YnMsXG4gICAgICAgICAgICBtb3VzZWRvd25TdWJzLFxuICAgICAgICAgICAgbW91c2Vtb3ZlU3VicyxcbiAgICAgICAgICAgIG1vdXNldXBTdWJzXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdHcmlkIH0gZnJvbSAnLi9OZ0dyaWQnO1xuaW1wb3J0IHsgTmdHcmlkSXRlbUNvbmZpZywgTmdHcmlkSXRlbUV2ZW50LCBOZ0dyaWRJdGVtUG9zaXRpb24sIE5nR3JpZEl0ZW1TaXplLCBOZ0dyaWRSYXdQb3NpdGlvbiwgTmdHcmlkSXRlbURpbWVuc2lvbnMsIFJlc2l6ZUhhbmRsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvSU5nR3JpZCc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgRXZlbnRFbWl0dGVyLCBLZXlWYWx1ZURpZmZlciwgS2V5VmFsdWVEaWZmZXJzLCBPbkluaXQsIE9uRGVzdHJveSwgVmlld0NvbnRhaW5lclJlZiwgT3V0cHV0LCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW25nR3JpZEl0ZW1dJyxcbiAgICBpbnB1dHM6IFsnY29uZmlnOiBuZ0dyaWRJdGVtJ11cbn0pXG5leHBvcnQgY2xhc3MgTmdHcmlkSXRlbSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBEb0NoZWNrIHtcbiAgICAvLyBFdmVudCBFbWl0dGVyc1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25JdGVtQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PihmYWxzZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZzogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uRHJhZ1N0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkRyYWdBbnk6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZVN0YXJ0OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgb25SZXNpemU6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZVN0b3A6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvblJlc2l6ZUFueTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQ2hhbmdlU3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQ2hhbmdlU3RvcDogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1FdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIG9uQ2hhbmdlQW55OiBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TmdHcmlkSXRlbUV2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgbmdHcmlkSXRlbUNoYW5nZTogRXZlbnRFbWl0dGVyPE5nR3JpZEl0ZW1Db25maWc+ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ0dyaWRJdGVtQ29uZmlnPigpO1xuXG4gICAgLy8gRGVmYXVsdCBjb25maWdcbiAgICBwcml2YXRlIHN0YXRpYyBDT05TVF9ERUZBVUxUX0NPTkZJRzogTmdHcmlkSXRlbUNvbmZpZyA9IHtcbiAgICAgICAgdWlkOiBudWxsLFxuICAgICAgICBjb2w6IDEsXG4gICAgICAgIHJvdzogMSxcbiAgICAgICAgc2l6ZXg6IDEsXG4gICAgICAgIHNpemV5OiAxLFxuICAgICAgICBkcmFnSGFuZGxlOiBudWxsLFxuICAgICAgICByZXNpemVIYW5kbGU6IG51bGwsXG4gICAgICAgIGZpeGVkOiBmYWxzZSxcbiAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICByZXNpemFibGU6IHRydWUsXG4gICAgICAgIGJvcmRlclNpemU6IDI1LFxuICAgICAgICByZXNpemVEaXJlY3Rpb25zOiBudWxsLFxuICAgIH07XG5cbiAgICBwdWJsaWMgaXNGaXhlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc0RyYWdnYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIGlzUmVzaXphYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgbWluV2lkdGg6IG51bWJlciA9IDA7XG4gICAgcHVibGljIG1pbkhlaWdodDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgdWlkOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgLy8gUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICBwcml2YXRlIF9wYXlsb2FkOiBhbnk7XG4gICAgcHJpdmF0ZSBfY3VycmVudFBvc2l0aW9uOiBOZ0dyaWRJdGVtUG9zaXRpb24gPSB7IGNvbDogMSwgcm93OiAxIH07XG4gICAgcHJpdmF0ZSBfc2l6ZTogTmdHcmlkSXRlbVNpemUgPSB7IHg6IDEsIHk6IDEgfTtcbiAgICBwcml2YXRlIF9jb25maWcgPSBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHO1xuICAgIHByaXZhdGUgX3VzZXJDb25maWcgPSBudWxsO1xuICAgIHByaXZhdGUgX2RyYWdIYW5kbGU6IHN0cmluZztcbiAgICBwcml2YXRlIF9yZXNpemVIYW5kbGU6IFJlc2l6ZUhhbmRsZTtcbiAgICBwcml2YXRlIF9ib3JkZXJTaXplOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfZWxlbVdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfZWxlbUhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2VsZW1MZWZ0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfZWxlbVRvcDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2FkZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxzdHJpbmcsIGFueT47XG4gICAgcHJpdmF0ZSBfY2FzY2FkZU1vZGU6IHN0cmluZztcbiAgICBwcml2YXRlIF9tYXhDb2xzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX21pbkNvbHM6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfbWF4Um93czogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9taW5Sb3dzOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3Jlc2l6ZURpcmVjdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgcHJpdmF0ZSBfekluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgc2V0IHpJbmRleCh6SW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd6LWluZGV4JywgekluZGV4LnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLl96SW5kZXggPSB6SW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0IHpJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fekluZGV4O1xuICAgIH1cblxuICAgIC8vIFtuZy1ncmlkLWl0ZW1dIGhhbmRsZXJcbiAgICBzZXQgY29uZmlnKHY6IE5nR3JpZEl0ZW1Db25maWcpIHtcbiAgICAgICAgdGhpcy5fdXNlckNvbmZpZyA9IHY7XG5cbiAgICAgICAgY29uc3QgY29uZmlnT2JqZWN0ID0gT2JqZWN0LmFzc2lnbih7fSwgTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRywgdik7XG4gICAgICAgIGZvciAobGV0IHggaW4gTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRylcbiAgICAgICAgICAgIGlmIChjb25maWdPYmplY3RbeF0gPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb25maWdPYmplY3RbeF0gPSBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHW3hdO1xuXG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZ09iamVjdCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3VzZXJDb25maWcgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RpZmZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKHRoaXMuX3VzZXJDb25maWcpLmNyZWF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9kaWZmZXIuZGlmZih0aGlzLl91c2VyQ29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fYWRkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX25nR3JpZC5hZGRJdGVtKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBnZXQgc2l6ZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemUueDtcbiAgICB9XG5cbiAgICBnZXQgc2l6ZXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemUueTtcbiAgICB9XG5cbiAgICBnZXQgY29sKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UG9zaXRpb24uY29sO1xuICAgIH1cblxuICAgIGdldCByb3coKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3c7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRDb2woKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2w7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRSb3coKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5yb3c7XG4gICAgfVxuXG4gICAgLy8gQ29uc3RydWN0b3JcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICBwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIF9uZ0dyaWQ6IE5nR3JpZCxcbiAgICAgICAgcHVibGljIGNvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICApIHsgfVxuXG4gICAgcHVibGljIG9uUmVzaXplU3RhcnRFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vblJlc2l6ZVN0YXJ0LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uUmVzaXplQW55LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlU3RhcnQuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG4gICAgfVxuICAgIHB1YmxpYyBvblJlc2l6ZUV2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uUmVzaXplLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uUmVzaXplQW55LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBwdWJsaWMgb25SZXNpemVTdG9wRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25SZXNpemVTdG9wLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uUmVzaXplQW55LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlU3RvcC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcblxuICAgICAgICB0aGlzLm9uQ29uZmlnQ2hhbmdlRXZlbnQoKTtcbiAgICB9XG4gICAgcHVibGljIG9uRHJhZ1N0YXJ0RXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ0dyaWRJdGVtRXZlbnQgPSB0aGlzLmdldEV2ZW50T3V0cHV0KCk7XG4gICAgICAgIHRoaXMub25EcmFnU3RhcnQuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25EcmFnQW55LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlU3RhcnQuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VBbnkuZW1pdChldmVudCk7XG4gICAgfVxuICAgIHB1YmxpYyBvbkRyYWdFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IE5nR3JpZEl0ZW1FdmVudCA9IHRoaXMuZ2V0RXZlbnRPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5vbkRyYWcuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25EcmFnQW55LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQW55LmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBwdWJsaWMgb25EcmFnU3RvcEV2ZW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBldmVudDogTmdHcmlkSXRlbUV2ZW50ID0gdGhpcy5nZXRFdmVudE91dHB1dCgpO1xuICAgICAgICB0aGlzLm9uRHJhZ1N0b3AuZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMub25EcmFnQW55LmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlU3RvcC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUFueS5lbWl0KGV2ZW50KTtcblxuICAgICAgICB0aGlzLm9uQ29uZmlnQ2hhbmdlRXZlbnQoKTtcbiAgICB9XG4gICAgcHVibGljIG9uQ2FzY2FkZUV2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ29uZmlnQ2hhbmdlRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2dyaWQtaXRlbScpO1xuICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmF1dG9TdHlsZSkgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlUG9zaXRpb24oKTtcblxuICAgICAgICAvLyBGb3JjZSBhIGNvbmZpZyB1cGRhdGUgaW4gY2FzZSB0aGVyZSBpcyBubyBjb25maWcgYXNzaWduZWRcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLl91c2VyQ29uZmlnO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBtZXRob2RzXG4gICAgcHVibGljIGNhbkRyYWcoZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5pc0RyYWdnYWJsZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLl9kcmFnSGFuZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kSGFuZGxlKHRoaXMuX2RyYWdIYW5kbGUsIGUudGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaW5kSGFuZGxlKGhhbmRsZVNlbGVjdG9yOiBzdHJpbmcsIHN0YXJ0RWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRFbGVtOiBhbnkgPSBzdGFydEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHdoaWxlICh0YXJnZXRFbGVtICYmIHRhcmdldEVsZW0gIT0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudE1hdGNoZXModGFyZ2V0RWxlbSwgaGFuZGxlU2VsZWN0b3IpKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRhcmdldEVsZW0gPSB0YXJnZXRFbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge31cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNhblJlc2l6ZShlOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNSZXNpemFibGUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl9yZXNpemVIYW5kbGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcmVzaXplSGFuZGxlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRIYW5kbGUodGhpcy5fcmVzaXplSGFuZGxlLCBlLnRhcmdldCkgPyAnYm90dG9tcmlnaHQnIDogbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9yZXNpemVIYW5kbGUgIT09ICdvYmplY3QnKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgY29uc3QgcmVzaXplRGlyZWN0aW9ucyA9IFsgJ2JvdHRvbXJpZ2h0JywgJ2JvdHRvbWxlZnQnLCAndG9wcmlnaHQnLCAndG9wbGVmdCcsICdyaWdodCcsICdsZWZ0JywgJ2JvdHRvbScsICd0b3AnIF07XG4gICAgICAgICAgICBmb3IgKGxldCBkaXJlY3Rpb24gb2YgcmVzaXplRGlyZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gaW4gdGhpcy5fcmVzaXplSGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRIYW5kbGUodGhpcy5fcmVzaXplSGFuZGxlW2RpcmVjdGlvbl0sIGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9yZGVyU2l6ZSA8PSAwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBjb25zdCBtb3VzZVBvczogTmdHcmlkUmF3UG9zaXRpb24gPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uKGUpO1xuXG4gICAgICAgIGZvciAobGV0IGRpcmVjdGlvbiBvZiB0aGlzLl9yZXNpemVEaXJlY3Rpb25zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jYW5SZXNpemVJbkRpcmVjdGlvbihkaXJlY3Rpb24sIG1vdXNlUG9zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Nb3VzZU1vdmUoZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9uZ0dyaWQuYXV0b1N0eWxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbmdHcmlkLnJlc2l6ZUVuYWJsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc2l6ZURpcmVjdGlvbiA9IHRoaXMuY2FuUmVzaXplKGUpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvcjogc3RyaW5nID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzaXplRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbXJpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndG9wbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgPSAnbndzZS1yZXNpemUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RvcHJpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgPSAnbmVzdy1yZXNpemUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgPSAnbnMtcmVzaXplJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yID0gJ2V3LXJlc2l6ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uZ0dyaWQuZHJhZ0VuYWJsZSAmJiB0aGlzLmNhbkRyYWcoZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgPSAnbW92ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCBjdXJzb3IpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9uZ0dyaWQuZHJhZ0VuYWJsZSAmJiB0aGlzLmNhbkRyYWcoZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCAnbW92ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCAnZGVmYXVsdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fYWRkZWQpIHRoaXMuX25nR3JpZC5yZW1vdmVJdGVtKHRoaXMpO1xuICAgIH1cblxuICAgIC8vICAgIEdldHRlcnNcbiAgICBwdWJsaWMgZ2V0RWxlbWVudCgpOiBFbGVtZW50UmVmIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25nRWw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERyYWdIYW5kbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RyYWdIYW5kbGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJlc2l6ZUhhbmRsZSgpOiBSZXNpemVIYW5kbGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzaXplSGFuZGxlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREaW1lbnNpb25zKCk6IE5nR3JpZEl0ZW1EaW1lbnNpb25zIHtcbiAgICAgICAgcmV0dXJuIHsgJ3dpZHRoJzogdGhpcy5fZWxlbVdpZHRoLCAnaGVpZ2h0JzogdGhpcy5fZWxlbUhlaWdodCB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTaXplKCk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBvc2l0aW9uKCk6IE5nR3JpZFJhd1Bvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHsgJ2xlZnQnOiB0aGlzLl9lbGVtTGVmdCwgJ3RvcCc6IHRoaXMuX2VsZW1Ub3AgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0R3JpZFBvc2l0aW9uKCk6IE5nR3JpZEl0ZW1Qb3NpdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50UG9zaXRpb247XG4gICAgfVxuXG4gICAgLy8gICAgU2V0dGVyc1xuICAgIHB1YmxpYyBzZXRDb25maWcoY29uZmlnOiBOZ0dyaWRJdGVtQ29uZmlnKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcblxuICAgICAgICB0aGlzLl9wYXlsb2FkID0gY29uZmlnLnBheWxvYWQ7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQb3NpdGlvbi5jb2wgPSBjb25maWcuY29sID8gY29uZmlnLmNvbCA6IE5nR3JpZEl0ZW0uQ09OU1RfREVGQVVMVF9DT05GSUcuY29sO1xuICAgICAgICB0aGlzLl9jdXJyZW50UG9zaXRpb24ucm93ID0gY29uZmlnLnJvdyA/IGNvbmZpZy5yb3cgOiBOZ0dyaWRJdGVtLkNPTlNUX0RFRkFVTFRfQ09ORklHLnJvdztcbiAgICAgICAgdGhpcy5fc2l6ZS54ID0gY29uZmlnLnNpemV4ID8gY29uZmlnLnNpemV4IDogTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRy5zaXpleDtcbiAgICAgICAgdGhpcy5fc2l6ZS55ID0gY29uZmlnLnNpemV5ID8gY29uZmlnLnNpemV5IDogTmdHcmlkSXRlbS5DT05TVF9ERUZBVUxUX0NPTkZJRy5zaXpleTtcbiAgICAgICAgdGhpcy5fZHJhZ0hhbmRsZSA9IGNvbmZpZy5kcmFnSGFuZGxlO1xuICAgICAgICB0aGlzLl9yZXNpemVIYW5kbGUgPSBjb25maWcucmVzaXplSGFuZGxlO1xuICAgICAgICB0aGlzLl9ib3JkZXJTaXplID0gY29uZmlnLmJvcmRlclNpemU7XG4gICAgICAgIHRoaXMuaXNEcmFnZ2FibGUgPSBjb25maWcuZHJhZ2dhYmxlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUmVzaXphYmxlID0gY29uZmlnLnJlc2l6YWJsZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0ZpeGVkID0gY29uZmlnLmZpeGVkID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLl9yZXNpemVEaXJlY3Rpb25zID0gY29uZmlnLnJlc2l6ZURpcmVjdGlvbnMgfHwgdGhpcy5fbmdHcmlkLnJlc2l6ZURpcmVjdGlvbnM7XG5cbiAgICAgICAgdGhpcy5fbWF4Q29scyA9ICFpc05hTihjb25maWcubWF4Q29scykgJiYgaXNGaW5pdGUoY29uZmlnLm1heENvbHMpID8gY29uZmlnLm1heENvbHMgOiAwO1xuICAgICAgICB0aGlzLl9taW5Db2xzID0gIWlzTmFOKGNvbmZpZy5taW5Db2xzKSAmJiBpc0Zpbml0ZShjb25maWcubWluQ29scykgPyBjb25maWcubWluQ29scyA6IDA7XG4gICAgICAgIHRoaXMuX21heFJvd3MgPSAhaXNOYU4oY29uZmlnLm1heFJvd3MpICYmIGlzRmluaXRlKGNvbmZpZy5tYXhSb3dzKSA/IGNvbmZpZy5tYXhSb3dzIDogMDtcbiAgICAgICAgdGhpcy5fbWluUm93cyA9ICFpc05hTihjb25maWcubWluUm93cykgJiYgaXNGaW5pdGUoY29uZmlnLm1pblJvd3MpID8gY29uZmlnLm1pblJvd3MgOiAwO1xuXG4gICAgICAgIHRoaXMubWluV2lkdGggPSAhaXNOYU4oY29uZmlnLm1pbldpZHRoKSAmJiBpc0Zpbml0ZShjb25maWcubWluV2lkdGgpID8gY29uZmlnLm1pbldpZHRoIDogMDtcbiAgICAgICAgdGhpcy5taW5IZWlnaHQgPSAhaXNOYU4oY29uZmlnLm1pbkhlaWdodCkgJiYgaXNGaW5pdGUoY29uZmlnLm1pbkhlaWdodCkgPyBjb25maWcubWluSGVpZ2h0IDogMDtcblxuICAgICAgICBpZiAodGhpcy5fbWluQ29scyA+IDAgJiYgdGhpcy5fbWF4Q29scyA+IDAgJiYgdGhpcy5fbWluQ29scyA+IHRoaXMuX21heENvbHMpIHRoaXMuX21pbkNvbHMgPSAwO1xuICAgICAgICBpZiAodGhpcy5fbWluUm93cyA+IDAgJiYgdGhpcy5fbWF4Um93cyA+IDAgJiYgdGhpcy5fbWluUm93cyA+IHRoaXMuX21heFJvd3MpIHRoaXMuX21pblJvd3MgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9hZGRlZCkge1xuICAgICAgICAgICAgdGhpcy5fbmdHcmlkLnVwZGF0ZUl0ZW0odGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zaXplID0gdGhpcy5maXhSZXNpemUodGhpcy5fc2l6ZSk7XG5cbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLl9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdEb0NoZWNrKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5fZGlmZmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXM6IGFueSA9IHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX3VzZXJDb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoY2hhbmdlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2l6ZShuZXdTaXplOiBOZ0dyaWRJdGVtU2l6ZSwgdXBkYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBuZXdTaXplID0gdGhpcy5maXhSZXNpemUobmV3U2l6ZSk7XG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXdTaXplO1xuICAgICAgICBpZiAodXBkYXRlKSB0aGlzLl9yZWNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcblxuICAgICAgICB0aGlzLm9uSXRlbUNoYW5nZS5lbWl0KHRoaXMuZ2V0RXZlbnRPdXRwdXQoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEdyaWRQb3NpdGlvbihncmlkUG9zaXRpb246IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgdXBkYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jdXJyZW50UG9zaXRpb24gPSBncmlkUG9zaXRpb247XG4gICAgICAgIGlmICh1cGRhdGUpIHRoaXMuX3JlY2FsY3VsYXRlUG9zaXRpb24oKTtcblxuICAgICAgICB0aGlzLm9uSXRlbUNoYW5nZS5lbWl0KHRoaXMuZ2V0RXZlbnRPdXRwdXQoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEV2ZW50T3V0cHV0KCk6IE5nR3JpZEl0ZW1FdmVudCB7XG4gICAgICAgIHJldHVybiA8TmdHcmlkSXRlbUV2ZW50PntcbiAgICAgICAgICAgIHVpZDogdGhpcy51aWQsXG4gICAgICAgICAgICBwYXlsb2FkOiB0aGlzLl9wYXlsb2FkLFxuICAgICAgICAgICAgY29sOiB0aGlzLl9jdXJyZW50UG9zaXRpb24uY29sLFxuICAgICAgICAgICAgcm93OiB0aGlzLl9jdXJyZW50UG9zaXRpb24ucm93LFxuICAgICAgICAgICAgc2l6ZXg6IHRoaXMuX3NpemUueCxcbiAgICAgICAgICAgIHNpemV5OiB0aGlzLl9zaXplLnksXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5fZWxlbVdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLl9lbGVtSGVpZ2h0LFxuICAgICAgICAgICAgbGVmdDogdGhpcy5fZWxlbUxlZnQsXG4gICAgICAgICAgICB0b3A6IHRoaXMuX2VsZW1Ub3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9jYXNjYWRlTW9kZSkge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCB4ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgeSArICdweCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgeCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHkgKyAncHgnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCB4ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnYm90dG9tJywgeSArICdweCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbUxlZnQgPSB4O1xuICAgICAgICB0aGlzLl9lbGVtVG9wID0geTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q2FzY2FkZU1vZGUoY2FzY2FkZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Nhc2NhZGVNb2RlID0gY2FzY2FkZTtcbiAgICAgICAgc3dpdGNoIChjYXNjYWRlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIHRoaXMuX2VsZW1MZWZ0ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndG9wJywgdGhpcy5fZWxlbVRvcCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnYm90dG9tJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCB0aGlzLl9lbGVtTGVmdCArICdweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsIHRoaXMuX2VsZW1Ub3AgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnYm90dG9tJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgdGhpcy5fZWxlbUxlZnQgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdib3R0b20nLCB0aGlzLl9lbGVtVG9wICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXREaW1lbnNpb25zKHc6IG51bWJlciwgaDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh3IDwgdGhpcy5taW5XaWR0aCkgdyA9IHRoaXMubWluV2lkdGg7XG4gICAgICAgIGlmIChoIDwgdGhpcy5taW5IZWlnaHQpIGggPSB0aGlzLm1pbkhlaWdodDtcblxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIHcgKyAncHgnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgaCArICdweCcpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1XaWR0aCA9IHc7XG4gICAgICAgIHRoaXMuX2VsZW1IZWlnaHQgPSBoO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydE1vdmluZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbW92aW5nJyk7XG4gICAgICAgIGNvbnN0IHN0eWxlOiBhbnkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBpZiAodGhpcy5fbmdHcmlkLmF1dG9TdHlsZSkgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnei1pbmRleCcsIChwYXJzZUludChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd6LWluZGV4JykpICsgMSkudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3BNb3ZpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ21vdmluZycpO1xuICAgICAgICBjb25zdCBzdHlsZTogYW55ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKHRoaXMuX25nR3JpZC5hdXRvU3R5bGUpIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3otaW5kZXgnLCAocGFyc2VJbnQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnei1pbmRleCcpKSAtIDEpLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWNhbGN1bGF0ZVNlbGYoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGZpeFJlc2l6ZShuZXdTaXplOiBOZ0dyaWRJdGVtU2l6ZSk6IE5nR3JpZEl0ZW1TaXplIHtcbiAgICAgICAgaWYgKHRoaXMuX21heENvbHMgPiAwICYmIG5ld1NpemUueCA+IHRoaXMuX21heENvbHMpIG5ld1NpemUueCA9IHRoaXMuX21heENvbHM7XG4gICAgICAgIGlmICh0aGlzLl9tYXhSb3dzID4gMCAmJiBuZXdTaXplLnkgPiB0aGlzLl9tYXhSb3dzKSBuZXdTaXplLnkgPSB0aGlzLl9tYXhSb3dzO1xuXG4gICAgICAgIGlmICh0aGlzLl9taW5Db2xzID4gMCAmJiBuZXdTaXplLnggPCB0aGlzLl9taW5Db2xzKSBuZXdTaXplLnggPSB0aGlzLl9taW5Db2xzO1xuICAgICAgICBpZiAodGhpcy5fbWluUm93cyA+IDAgJiYgbmV3U2l6ZS55IDwgdGhpcy5fbWluUm93cykgbmV3U2l6ZS55ID0gdGhpcy5fbWluUm93cztcblxuICAgICAgICBjb25zdCBpdGVtV2lkdGggPSAobmV3U2l6ZS54ICogdGhpcy5fbmdHcmlkLmNvbFdpZHRoKSArICgodGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luUmlnaHQpICogKG5ld1NpemUueCAtIDEpKTtcbiAgICAgICAgaWYgKGl0ZW1XaWR0aCA8IHRoaXMubWluV2lkdGgpIG5ld1NpemUueCA9IE1hdGguY2VpbCgodGhpcy5taW5XaWR0aCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCArIHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0KSAvICh0aGlzLl9uZ0dyaWQuY29sV2lkdGggKyB0aGlzLl9uZ0dyaWQubWFyZ2luUmlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCkpO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSAobmV3U2l6ZS55ICogdGhpcy5fbmdHcmlkLnJvd0hlaWdodCkgKyAoKHRoaXMuX25nR3JpZC5tYXJnaW5Ub3AgKyB0aGlzLl9uZ0dyaWQubWFyZ2luQm90dG9tKSAqIChuZXdTaXplLnkgLSAxKSk7XG4gICAgICAgIGlmIChpdGVtSGVpZ2h0IDwgdGhpcy5taW5IZWlnaHQpIG5ld1NpemUueSA9IE1hdGguY2VpbCgodGhpcy5taW5IZWlnaHQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luQm90dG9tICsgdGhpcy5fbmdHcmlkLm1hcmdpblRvcCkgLyAodGhpcy5fbmdHcmlkLnJvd0hlaWdodCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20gKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wKSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld1NpemU7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgcHJpdmF0ZSBlbGVtZW50TWF0Y2hlcyhlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChlbGVtZW50Lm1hdGNoZXMpIHJldHVybiBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50LmRvY3VtZW50IHx8ICFlbGVtZW50Lm93bmVyRG9jdW1lbnQpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb25zdCBtYXRjaGVzOiBhbnkgPSAoZWxlbWVudC5kb2N1bWVudCB8fCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICBsZXQgaTogbnVtYmVyID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IGVsZW1lbnQpIHsgfVxuICAgICAgICByZXR1cm4gaSA+IC0xO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY2FsY3VsYXRlUG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHg6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQuY29sV2lkdGggKyB0aGlzLl9uZ0dyaWQubWFyZ2luTGVmdCArIHRoaXMuX25nR3JpZC5tYXJnaW5SaWdodCkgKiAodGhpcy5fY3VycmVudFBvc2l0aW9uLmNvbCAtIDEpICsgdGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQgKyB0aGlzLl9uZ0dyaWQuc2NyZWVuTWFyZ2luO1xuICAgICAgICBjb25zdCB5OiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLnJvd0hlaWdodCArIHRoaXMuX25nR3JpZC5tYXJnaW5Ub3AgKyB0aGlzLl9uZ0dyaWQubWFyZ2luQm90dG9tKSAqICh0aGlzLl9jdXJyZW50UG9zaXRpb24ucm93IC0gMSkgKyB0aGlzLl9uZ0dyaWQubWFyZ2luVG9wO1xuXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24oeCwgeSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZS54IDwgdGhpcy5fbmdHcmlkLm1pbkNvbHMpIHRoaXMuX3NpemUueCA9IHRoaXMuX25nR3JpZC5taW5Db2xzO1xuICAgICAgICBpZiAodGhpcy5fc2l6ZS55IDwgdGhpcy5fbmdHcmlkLm1pblJvd3MpIHRoaXMuX3NpemUueSA9IHRoaXMuX25nR3JpZC5taW5Sb3dzO1xuXG4gICAgICAgIGNvbnN0IG5ld1dpZHRoOiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLmNvbFdpZHRoICogdGhpcy5fc2l6ZS54KSArICgodGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luUmlnaHQpICogKHRoaXMuX3NpemUueCAtIDEpKTtcbiAgICAgICAgY29uc3QgbmV3SGVpZ2h0OiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLnJvd0hlaWdodCAqIHRoaXMuX3NpemUueSkgKyAoKHRoaXMuX25nR3JpZC5tYXJnaW5Ub3AgKyB0aGlzLl9uZ0dyaWQubWFyZ2luQm90dG9tKSAqICh0aGlzLl9zaXplLnkgLSAxKSk7XG5cbiAgICAgICAgY29uc3QgdzogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5taW5XaWR0aCwgdGhpcy5fbmdHcmlkLm1pbldpZHRoLCBuZXdXaWR0aCk7XG4gICAgICAgIGNvbnN0IGg6IG51bWJlciA9IE1hdGgubWF4KHRoaXMubWluSGVpZ2h0LCB0aGlzLl9uZ0dyaWQubWluSGVpZ2h0LCBuZXdIZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuc2V0RGltZW5zaW9ucyh3LCBoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRNb3VzZVBvc2l0aW9uKGU6IGFueSk6IE5nR3JpZFJhd1Bvc2l0aW9uIHtcbiAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQudG91Y2hlcykge1xuICAgICAgICAgICAgY29uc3Qgb2U6IGFueSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIGUgPSBvZS50b3VjaGVzLmxlbmd0aCA/IG9lLnRvdWNoZXNbMF0gOiAob2UuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID8gb2UuY2hhbmdlZFRvdWNoZXNbMF0gOiBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRvdWNoZXMpIHtcbiAgICAgICAgICAgIGUgPSBlLnRvdWNoZXMubGVuZ3RoID8gZS50b3VjaGVzWzBdIDogKGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGUpO1xuICAgICAgICB9XG5cblxuICAgICAgICBjb25zdCByZWZQb3M6IE5nR3JpZFJhd1Bvc2l0aW9uID0gdGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiBlLmNsaWVudFggLSByZWZQb3MubGVmdCxcbiAgICAgICAgICAgIHRvcDogZS5jbGllbnRZIC0gcmVmUG9zLnRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGNoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2hhbmdlQ2hlY2sgPSAocmVjb3JkOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb25maWdbcmVjb3JkLmtleV0gIT09IHJlY29yZC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWdbcmVjb3JkLmtleV0gPSByZWNvcmQuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oY2hhbmdlQ2hlY2spO1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbShjaGFuZ2VDaGVjayk7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKChyZWNvcmQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY29uZmlnW3JlY29yZC5rZXldO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDb25maWcodGhpcy5fY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Db25maWdDaGFuZ2VFdmVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJDb25maWcgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgICB0aGlzLl9jb25maWcuc2l6ZXggPSB0aGlzLl91c2VyQ29uZmlnLnNpemV4ID0gdGhpcy5fc2l6ZS54O1xuICAgICAgICB0aGlzLl9jb25maWcuc2l6ZXkgPSB0aGlzLl91c2VyQ29uZmlnLnNpemV5ID0gdGhpcy5fc2l6ZS55O1xuICAgICAgICB0aGlzLl9jb25maWcuY29sID0gdGhpcy5fdXNlckNvbmZpZy5jb2wgPSB0aGlzLl9jdXJyZW50UG9zaXRpb24uY29sO1xuICAgICAgICB0aGlzLl9jb25maWcucm93ID0gdGhpcy5fdXNlckNvbmZpZy5yb3cgPSB0aGlzLl9jdXJyZW50UG9zaXRpb24ucm93O1xuICAgICAgICB0aGlzLm5nR3JpZEl0ZW1DaGFuZ2UuZW1pdCh0aGlzLl91c2VyQ29uZmlnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhblJlc2l6ZUluRGlyZWN0aW9uKGRpcmVjdGlvbjogc3RyaW5nLCBtb3VzZVBvczogTmdHcmlkUmF3UG9zaXRpb24pOiBib29sZWFuIHtcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbXJpZ2h0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MubGVmdCA8IHRoaXMuX2VsZW1XaWR0aCAmJiBtb3VzZVBvcy5sZWZ0ID4gdGhpcy5fZWxlbVdpZHRoIC0gdGhpcy5fYm9yZGVyU2l6ZVxuICAgICAgICAgICAgICAgICAgICAmJiBtb3VzZVBvcy50b3AgPCB0aGlzLl9lbGVtSGVpZ2h0ICYmIG1vdXNlUG9zLnRvcCA+IHRoaXMuX2VsZW1IZWlnaHQgLSB0aGlzLl9ib3JkZXJTaXplOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmluZGVudFxuICAgICAgICAgICAgY2FzZSAnYm90dG9tbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLmxlZnQgPCB0aGlzLl9ib3JkZXJTaXplICYmIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2VsZW1IZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgJiYgbW91c2VQb3MudG9wID4gdGhpcy5fZWxlbUhlaWdodCAtIHRoaXMuX2JvcmRlclNpemU7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6aW5kZW50XG4gICAgICAgICAgICBjYXNlICd0b3ByaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLmxlZnQgPCB0aGlzLl9lbGVtV2lkdGggJiYgbW91c2VQb3MubGVmdCA+IHRoaXMuX2VsZW1XaWR0aCAtIHRoaXMuX2JvcmRlclNpemVcbiAgICAgICAgICAgICAgICAgICAgJiYgbW91c2VQb3MudG9wIDwgdGhpcy5fYm9yZGVyU2l6ZTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTppbmRlbnRcbiAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fYm9yZGVyU2l6ZSAmJiBtb3VzZVBvcy50b3AgPCB0aGlzLl9ib3JkZXJTaXplO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBtb3VzZVBvcy5sZWZ0IDwgdGhpcy5fZWxlbVdpZHRoICYmIG1vdXNlUG9zLmxlZnQgPiB0aGlzLl9lbGVtV2lkdGggLSB0aGlzLl9ib3JkZXJTaXplO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLmxlZnQgPCB0aGlzLl9ib3JkZXJTaXplO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91c2VQb3MudG9wIDwgdGhpcy5fZWxlbUhlaWdodCAmJiBtb3VzZVBvcy50b3AgPiB0aGlzLl9lbGVtSGVpZ2h0IC0gdGhpcy5fYm9yZGVyU2l6ZTtcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vdXNlUG9zLnRvcCA8IHRoaXMuX2JvcmRlclNpemU7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0dyaWQgfSBmcm9tICcuLi9kaXJlY3RpdmVzL05nR3JpZCc7XG5pbXBvcnQgeyBOZ0dyaWRJdGVtIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9OZ0dyaWRJdGVtJztcbmltcG9ydCB7IE5nR3JpZFBsYWNlaG9sZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9OZ0dyaWRQbGFjZWhvbGRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogICAgIFsgTmdHcmlkLCBOZ0dyaWRJdGVtLCBOZ0dyaWRQbGFjZWhvbGRlciBdLFxuICBlbnRyeUNvbXBvbmVudHM6ICBbIE5nR3JpZFBsYWNlaG9sZGVyIF0sXG4gIGV4cG9ydHM6ICAgICAgICAgIFsgTmdHcmlkLCBOZ0dyaWRJdGVtIF1cbn0pXG5leHBvcnQgY2xhc3MgTmdHcmlkTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIlJlbmRlcmVyIiwiRXZlbnRFbWl0dGVyIiwiTmdHcmlkSGVscGVyLmdlbmVyYXRlVXVpZCIsInRzbGliXzEuX192YWx1ZXMiLCJOZ0dyaWRIZWxwZXIuc29ydEl0ZW1zQnlQb3NpdGlvblZlcnRpY2FsIiwiTmdHcmlkSGVscGVyLnNvcnRJdGVtc0J5UG9zaXRpb25Ib3Jpem9udGFsIiwiZnJvbUV2ZW50IiwiRGlyZWN0aXZlIiwiS2V5VmFsdWVEaWZmZXJzIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiT3V0cHV0IiwiUmVuZGVyZXIyIiwiVmlld0NvbnRhaW5lclJlZiIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxzQkFzRnlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxD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QUMsUUFBUSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRO29CQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFFOUUscUJBQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVE7b0JBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBRTFNLHFCQUFNLFVBQVUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25JLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTO29CQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFT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