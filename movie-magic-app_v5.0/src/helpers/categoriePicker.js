export default function categoryPicker(curCategory) {
    const categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short Film'
    };

    const categories = Object.keys(categoriesMap).map(category => ({
        category,
        label: categoriesMap[category],
        selected: category === curCategory ? "selected" : ''
    }));

    return categories;
}