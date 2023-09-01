let data = null;

const escapeString = (string) => {
    const symbols = {
        "<": "&l;",
        ">": "&gt;",
        "&": "&amp;",
    }
    return string.replace(/[&<>]/g, (tag) => {
        return symbols[tag] || tag;
    })
}
const createMainNewsItem = (item) => {

    const categoryData = data.categories.find((categoryItem) => categoryItem.id === item.category_id);
    const sourceData = data.sources.find((sourceItem) => sourceItem.id === item.source_id);
    return `
        <article class ="main-article">
        <div class ="main-article__image-container">
            <img class ="main-article__image" src="${encodeURI(item.image)}" alt="Изображение к блоку новостей">
        </div>
        <div class ="main-article__content">
            <span class ="article-category main-article__category">${escapeString(categoryData.name)}</span>
            <h2 class ="main-article__title">${escapeString(item.title)}</h2>
            <p class ="main-article__text">${escapeString(item.description)}</p>
            <span class ="article-source main-article__source">${escapeString(sourceData.name)}</span>
        </div>
    </article>
    `;
}


const createSmallNewsItem = (item) => {

    const dateData = new Date(item.date).toLocaleDateString("ru-Ru", {month: "long", day: "numeric"});
    const sourceData = data.sources.find((sourceItem) => sourceItem.id === item.source_id);
    return `
        <article class ="small-article">
        <h2 class ="small-article__title">${escapeString(item.title)}</h2>
        <p class ="small-article__caption">
            <span class ="article-date small-article__date">${dateData}</span>
            <span class ="article-source small-article__source">${escapeString(sourceData.name)}</span>
        </p>
    </article>
    `;
}

const renderNews = (categoryId) => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId ? categoryId : ''))
        .then(response => response.json())
        .then((responseJson) => {
            data = responseJson;
            const mainNews = data.items.slice(0, 3);
            const mainNewsContainer = document.querySelector('.articles__big-column');

            mainNews.forEach((item) => {
                const template = document.createElement('template');
                template.innerHTML = createMainNewsItem(item);
                mainNewsContainer.appendChild(template.content);
            })

            const smallNews = data.items.slice(3, 12);
            const smallNewsContainer = document.querySelector('.articles__small-column');

            smallNews.forEach((item) => {
                const template = document.createElement('template');
                template.innerHTML = createSmallNewsItem(item);
                smallNewsContainer.appendChild(template.content);
            })
        })
}
