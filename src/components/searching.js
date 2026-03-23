export function initSearching(elements, searchField) {
    return (data, state, action) => {
        const searchTerm = state[searchField];
        
        // Если поиск пустой, возвращаем все данные
        if (!searchTerm) return data;
        
        const searchLower = searchTerm.toLowerCase();
        
        // Фильтруем данные по трем полям
        return data.filter(row => {
            return (
                (row.date && row.date.toLowerCase().includes(searchLower)) ||
                (row.customer && row.customer.toLowerCase().includes(searchLower)) ||
                (row.seller && row.seller.toLowerCase().includes(searchLower))
            );
        });
    };
}