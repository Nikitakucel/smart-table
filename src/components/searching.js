import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    // Создаем правило поиска по нескольким полям
    const searchRule = rules.searchMultipleFields(
        searchField,                      // имя поля в state (например, 'search')
        ['date', 'customer', 'seller'],   // поля в данных, по которым ищем
        false                             // false = поиск без учета регистра
    );
    
    // Создаем компаратор с правилом поиска
    // skipEmptyTargetValues - пропускаем пустые значения (если поле поиска пустое)
    const compare = createComparison([searchRule]);

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        // Фильтруем данные: оставляем только те строки, которые прошли проверку поиском
        return data.filter(row => compare(row, state));
    }
}