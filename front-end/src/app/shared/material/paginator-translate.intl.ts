import { MatPaginatorIntl } from '@angular/material/paginator';

const polishPaginatorIntl = new MatPaginatorIntl();

polishPaginatorIntl.itemsPerPageLabel = 'Pozycji na stronę:';
polishPaginatorIntl.nextPageLabel = 'Następna strona';
polishPaginatorIntl.previousPageLabel = 'Poprzednia strona';
polishPaginatorIntl.firstPageLabel = 'Pierwsza strona';
polishPaginatorIntl.lastPageLabel = 'Ostatnia strona';
polishPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
        return `0 z ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} z ${length}`;
};

export function getPolishPaginatorIntl() {
    return polishPaginatorIntl;
}
