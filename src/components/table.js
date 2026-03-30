import { cloneTemplate } from '../lib/utils.js';

export function initTable(settings, onAction) {
    const { tableTemplate, rowTemplate, before, after } = settings;
    const root = cloneTemplate(tableTemplate);

    if (before && before.length) {
        [...before].reverse().forEach(subName => {
            const cloned = cloneTemplate(subName);
            if (cloned?.container) {
                root[subName] = cloned;
                root.container.prepend(cloned.container);
            }
        });
    }

    if (after && after.length) {
        after.forEach(subName => {
            const cloned = cloneTemplate(subName);
            if (cloned?.container) {
                root[subName] = cloned;
                root.container.append(cloned.container);
            }
        });
    }

    root.container.addEventListener('change', () => onAction());
    root.container.addEventListener('reset', () => setTimeout(onAction, 0));
    root.container.addEventListener('submit', e => {
        e.preventDefault();
        onAction(e.submitter);
    });

    const render = data => {
        const nextRows = data.map(item => {
            const row = cloneTemplate(rowTemplate);
            if (!row) return null;
            Object.keys(item).forEach(key => {
                const el = row.elements[key];
                if (el) {
                    if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
                        el.value = item[key];
                    } else {
                        el.textContent = item[key];
                    }
                }
            });
            return row.container;
        }).filter(Boolean);

        if (root.elements?.rows) {
            root.elements.rows.replaceChildren(...nextRows);
        }
    };

    return { ...root, render };
}