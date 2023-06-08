export interface Bbox {
    top: number;
    bottom: number;
}

export const getScrollOffset = (
    containerBbox: Bbox | null,
    itemBbox: Bbox | null,
    additionalOffset: number
): number => {
    let scrollOffset = 0;
    if (containerBbox && itemBbox) {
        if (itemBbox.top < containerBbox.top) {
            scrollOffset = itemBbox.top - containerBbox.top - additionalOffset;
        }
        if (itemBbox.bottom > containerBbox.bottom) {
            scrollOffset = itemBbox.bottom - containerBbox.bottom + additionalOffset;
        }
    }
    return scrollOffset;
};
