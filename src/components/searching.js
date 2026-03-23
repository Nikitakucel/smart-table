import { rules, createComparison } from "../lib/compare.js";

export function initSearching(elements, searchField) {
    // Правило поиска по нескольким полям
    const searchRule = rules.searchMultipleFields(
        searchField,
        ["date", "customer", "seller"],
        false
    );

    // Компаратор с правилом (без skipEmptyTargetValues, т.к. searchMultipleFields уже обрабатывает пустоту)
    const compare = createComparison([searchRule]);

    return (data, state, action) => {
        // Применяем фильтрацию по поиску
        return data.filter((row) => compare(row, state));
    };
}