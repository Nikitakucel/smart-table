import { getPages } from "../lib/utils.js";

export const initPagination = ({ pages, fromRow, toRow, totalRows }, createPage) => {
    // 2.3 — подготовить шаблон кнопки и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.innerHTML = "";

    return (data, state, action) => {
        // 2.1 — посчитать количество страниц
        const rowsPerPage = state.rowsPerPage;
        const pageCount = Math.ceil(data.length / rowsPerPage);
        let page = state.page;

        // 2.6 — обработать действия
        if (action) {
            switch (action.name) {
                case "prev":
                    page = Math.max(1, page - 1);
                    break;
                case "next":
                    page = Math.min(pageCount, page + 1);
                    break;
                case "first":
                    page = 1;
                    break;
                case "last":
                    page = pageCount;
                    break;
            }
        }

        // 2.4 — получить список видимых страниц и вывести их
        const visiblePages = getPages(page, pageCount, 5);
        pages.replaceChildren(
            ...visiblePages.map((pageNumber) => {
                const el = pageTemplate.cloneNode(true);
                return createPage(el, pageNumber, pageNumber === page);
            })
        );

        // 2.5 — обновить статус пагинации
        fromRow.textContent = (page - 1) * rowsPerPage + 1;
        toRow.textContent = Math.min(page * rowsPerPage, data.length);
        totalRows.textContent = data.length;

        // 2.2 — вернуть нужный срез данных
        const skip = (page - 1) * rowsPerPage;
        return data.slice(skip, skip + rowsPerPage);
    };
};