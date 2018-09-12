/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @return {?}
 */
export function generateUuid() {
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
export function sortItemsByPositionHorizontal(a, b) {
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
export function sortItemsByPositionVertical(a, b) {
    if (a.row === b.row) {
        return a.col - b.col;
    }
    return a.row - b.row;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmdHcmlkSGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWdyaWQvIiwic291cmNlcyI6WyJoZWxwZXJzL05nR3JpZEhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLE1BQU07SUFDTCxNQUFNLENBQUMsc0NBQXNDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUM7UUFDeEUscUJBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxtQkFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDdEIsQ0FBQyxDQUFDO0NBQ0g7Ozs7OztBQUVELE1BQU0sd0NBQXdDLENBQWEsRUFBRSxDQUFhO0lBQ3pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0tBQUU7SUFDOUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztDQUNyQjs7Ozs7O0FBRUQsTUFBTSxzQ0FBc0MsQ0FBYSxFQUFFLENBQWE7SUFDdkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FBRTtJQUM5QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0NBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdHcmlkSXRlbSB9IGZyb20gXCIuLi9kaXJlY3RpdmVzL05nR3JpZEl0ZW1cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlVXVpZCgpOiBzdHJpbmcge1xuXHRyZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG5cdFx0bGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xuXHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0SXRlbXNCeVBvc2l0aW9uSG9yaXpvbnRhbChhOiBOZ0dyaWRJdGVtLCBiOiBOZ0dyaWRJdGVtKTogbnVtYmVyIHtcblx0aWYgKGEuY29sID09PSBiLmNvbCkgeyByZXR1cm4gYS5yb3cgLSBiLnJvdzsgfVxuXHRyZXR1cm4gYS5jb2wgLSBiLmNvbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRJdGVtc0J5UG9zaXRpb25WZXJ0aWNhbChhOiBOZ0dyaWRJdGVtLCBiOiBOZ0dyaWRJdGVtKTogbnVtYmVyIHtcblx0aWYgKGEucm93ID09PSBiLnJvdykgeyByZXR1cm4gYS5jb2wgLSBiLmNvbDsgfVxuXHRyZXR1cm4gYS5yb3cgLSBiLnJvdztcbn1cbiJdfQ==