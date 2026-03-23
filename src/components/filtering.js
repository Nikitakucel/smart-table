import { createComparison, defaultRules } from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    // 4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        // Очищаем select
        elements[elementName].innerHTML = "";
        // Пустая опция для сброса
        const emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.textContent = "Все";
        elements[elementName].append(emptyOption);
        // Опции из индекса
        Object.values(indexes[elementName]).forEach((name) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            elements[elementName].append(option);
        });
    });

    // 4.3 — настроить компаратор
    const compare = createComparison(defaultRules);

    return (data, state, action) => {
        // 4.2 — обработать очистку поля (опционально)
        if (action && action.name === "clear") {
            const parent = action.closest(".filter-group");
            if (parent) {
                const input = parent.querySelector("input, select");
                if (input) {
                    input.value = "";
                    const field = action.dataset.field;
                    if (field) {
                        state[field] = "";
                    }
                }
            }
        }

        // 4.5 — отфильтровать данные
        return data.filter((row) => compare(row, state));
    };
}