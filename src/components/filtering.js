export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].innerHTML = '';
            const emptyOption = document.createElement('option');
            emptyOption.value = '';
            emptyOption.textContent = 'Все';
            elements[elementName].append(emptyOption);

            Object.values(indexes[elementName]).forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                elements[elementName].append(option);
            });
        });
    };

    const applyFiltering = (query, state, action) => {
        // Обработка кнопки очистки
        if (action && action.name === 'clear') {
            const parent = action.closest('.filter-group');
            if (parent) {
                const input = parent.querySelector('input, select');
                if (input) {
                    input.value = '';
                    const field = action.dataset.field;
                    if (field) {
                        state[field] = '';
                    }
                }
            }
        }

        // Сбор параметров фильтрации из полей ввода
        const filter = {};
        Object.keys(elements).forEach(key => {
            const el = elements[key];
            if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT') && el.value) {
                filter[`filter[${el.name}]`] = el.value;
            }
        });

        return Object.keys(filter).length ? { ...query, ...filter } : query;
    };

    return { updateIndexes, applyFiltering };
}