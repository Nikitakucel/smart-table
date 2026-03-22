import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        // Очищаем select перед заполнением
        elements[elementName].innerHTML = '';
        
        // Добавляем пустую опцию для возможности сброса
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Все';
        elements[elementName].append(emptyOption);
        
        // Добавляем опции из индекса
        Object.values(indexes[elementName]).forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            elements[elementName].append(option);
        });
    });
    
    // @todo: #4.3 — настроить компаратор
    const compare = createComparison(defaultRules);

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            // Находим родительский элемент кнопки
            const parent = action.closest('.filter-group');
            if (parent) {
                const input = parent.querySelector('input, select');
                if (input) {
                    input.value = '';
                    // Обновляем state
                    const field = action.dataset.field;
                    if (field) {
                        state[field] = '';
                    }
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}