/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Renderer } from '@angular/core';
export class NgGridPlaceholder {
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
function NgGridPlaceholder_tsickle_Closure_declarations() {
    /** @type {?} */
    NgGridPlaceholder.prototype._size;
    /** @type {?} */
    NgGridPlaceholder.prototype._position;
    /** @type {?} */
    NgGridPlaceholder.prototype._ngGrid;
    /** @type {?} */
    NgGridPlaceholder.prototype._cascadeMode;
    /** @type {?} */
    NgGridPlaceholder.prototype._ngEl;
    /** @type {?} */
    NgGridPlaceholder.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmdHcmlkUGxhY2Vob2xkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyMi1ncmlkLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9OZ0dyaWRQbGFjZWhvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxVQUFVLEVBQUUsUUFBUSxFQUFvSixNQUFNLGVBQWUsQ0FBQztBQU03TixNQUFNOzs7OztJQU1GLFlBQW9CLEtBQWlCLEVBQVUsU0FBbUI7UUFBOUMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7S0FBSzs7Ozs7SUFFaEUsWUFBWSxDQUFDLE1BQWM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Ozs7O0lBR25CLFFBQVE7UUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzs7Ozs7O0lBRzFHLE9BQU8sQ0FBQyxPQUF1QjtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUNyQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzs7Ozs7O0lBRzNCLGVBQWUsQ0FBQyxXQUErQjtRQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztRQUM3QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7Ozs7O0lBR3pCLGNBQWMsQ0FBQyxPQUFlO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLE9BQU8s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QUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZJLHVCQUFNLENBQUMsR0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7O1lBeEZqQyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFLEVBQUU7YUFDZjs7OztZQUw4QixVQUFVO1lBQUUsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nR3JpZCB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvTmdHcmlkJztcbmltcG9ydCB7IE5nR3JpZEl0ZW1Qb3NpdGlvbiwgTmdHcmlkSXRlbVNpemUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL0lOZ0dyaWQnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyLCBFdmVudEVtaXR0ZXIsIEhvc3QsIFZpZXdFbmNhcHN1bGF0aW9uLCBUeXBlLCBDb21wb25lbnRSZWYsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlcnMsIE9uSW5pdCwgT25EZXN0cm95LCBEb0NoZWNrLCBWaWV3Q29udGFpbmVyUmVmLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZy1ncmlkLXBsYWNlaG9sZGVyJyxcbiAgICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgY2xhc3MgTmdHcmlkUGxhY2Vob2xkZXIgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHByaXZhdGUgX3NpemU6IE5nR3JpZEl0ZW1TaXplO1xuICAgIHByaXZhdGUgX3Bvc2l0aW9uOiBOZ0dyaWRJdGVtUG9zaXRpb247XG4gICAgcHJpdmF0ZSBfbmdHcmlkOiBOZ0dyaWQ7XG4gICAgcHJpdmF0ZSBfY2FzY2FkZU1vZGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nRWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcikgeyB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJHcmlkKG5nR3JpZDogTmdHcmlkKSB7XG4gICAgICAgIHRoaXMuX25nR3JpZCA9IG5nR3JpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdncmlkLXBsYWNlaG9sZGVyJywgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLl9uZ0dyaWQuYXV0b1N0eWxlKSB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2l6ZShuZXdTaXplOiBOZ0dyaWRJdGVtU2l6ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zaXplID0gbmV3U2l6ZTtcbiAgICAgICAgdGhpcy5fcmVjYWxjdWxhdGVEaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEdyaWRQb3NpdGlvbihuZXdQb3NpdGlvbjogTmdHcmlkSXRlbVBvc2l0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gbmV3UG9zaXRpb247XG4gICAgICAgIHRoaXMuX3JlY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q2FzY2FkZU1vZGUoY2FzY2FkZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2Nhc2NhZGVNb2RlID0gY2FzY2FkZTtcbiAgICAgICAgc3dpdGNoIChjYXNjYWRlKSB7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCAnMHB4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RvcCcsICcwcHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAncmlnaHQnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnYm90dG9tJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3JpZ2h0JywgJzBweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCAnMHB4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnYm90dG9tJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnbGVmdCcsICcwcHgnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnYm90dG9tJywgJzBweCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCBudWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByaXZhdGUgbWV0aG9kc1xuICAgIHByaXZhdGUgX3NldERpbWVuc2lvbnModzogbnVtYmVyLCBoOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgdyArICdweCcpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgaCArICdweCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fY2FzY2FkZU1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5fbmdFbC5uYXRpdmVFbGVtZW50LCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgeCArICdweCwgJyArIHkgKyAncHgpJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIC14ICsgJ3B4LCAnICsgeSArICdweCknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLl9uZ0VsLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCAnICsgLXkgKyAncHgpJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZWNhbGN1bGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB4OiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLmNvbFdpZHRoICsgdGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQgKyB0aGlzLl9uZ0dyaWQubWFyZ2luUmlnaHQpICogKHRoaXMuX3Bvc2l0aW9uLmNvbCAtIDEpICsgdGhpcy5fbmdHcmlkLm1hcmdpbkxlZnQgKyB0aGlzLl9uZ0dyaWQuc2NyZWVuTWFyZ2luO1xuICAgICAgICBjb25zdCB5OiBudW1iZXIgPSAodGhpcy5fbmdHcmlkLnJvd0hlaWdodCArIHRoaXMuX25nR3JpZC5tYXJnaW5Ub3AgKyB0aGlzLl9uZ0dyaWQubWFyZ2luQm90dG9tKSAqICh0aGlzLl9wb3NpdGlvbi5yb3cgLSAxKSArIHRoaXMuX25nR3JpZC5tYXJnaW5Ub3A7XG4gICAgICAgIHRoaXMuX3NldFBvc2l0aW9uKHgsIHkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlY2FsY3VsYXRlRGltZW5zaW9ucygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdzogbnVtYmVyID0gKHRoaXMuX25nR3JpZC5jb2xXaWR0aCAqIHRoaXMuX3NpemUueCkgKyAoKHRoaXMuX25nR3JpZC5tYXJnaW5MZWZ0ICsgdGhpcy5fbmdHcmlkLm1hcmdpblJpZ2h0KSAqICh0aGlzLl9zaXplLnggLSAxKSk7XG4gICAgICAgIGNvbnN0IGg6IG51bWJlciA9ICh0aGlzLl9uZ0dyaWQucm93SGVpZ2h0ICogdGhpcy5fc2l6ZS55KSArICgodGhpcy5fbmdHcmlkLm1hcmdpblRvcCArIHRoaXMuX25nR3JpZC5tYXJnaW5Cb3R0b20pICogKHRoaXMuX3NpemUueSAtIDEpKTtcbiAgICAgICAgdGhpcy5fc2V0RGltZW5zaW9ucyh3LCBoKTtcbiAgICB9XG59XG4iXX0=