const categoryIds = {
    index: 0,
    technologies: 1,
    sport: 2,
    fashion: 3,
    politics: 4,
    other: 5
}

const categoryNames = {
    index: 'Главная',
    fashion: 'Мода',
    technologies: 'Технологии',
    politics: 'Политика',
    sport: 'Спорт'
}

const Navigation = ({ onNavClick, currentCategory, className = '' }) => {
    return (
        <nav className = {`navigation grid ${className}`}>
            <a className = "navigation__logo" data-href="index" href="#">
                <img className = "navigation__image" src = "./images/logo.svg" alt = "Логотип"/>
            </a>
            <ul className = "navigation__list">
                {['index', 'fashion', 'technologies', 'politics', 'sport'].map((item) => {
                    return(
                        <li className="navigation__item" key={item}>
                            <a
                                onClick = {onNavClick}
                                className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : ''}`}  // the ternary operator is used: if the category matches the item value, then the link is active (orange), otherwise we have the empty line
                                data-href={item}
                                href="#"
                            >
                                {categoryNames[item]}    {/*display the category name (Главная,Мода,Технологии,Политика,Спорт)*/}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

const MainArticle = ({ title, image, category, description, source }) => {
    return (
        <article className = "main-article">
            <div className = "main-article__image-container">
                <img className = "article-img main-article__image" src = {image} alt = "Изображение к блоку новостей"/>
            </div>
            <div className = "main-article__content">
                <span className = "article-category main-article__category">
                     {category}
                </span>
                <h2 className = "main-article__title">{title}</h2>
                <p className = "main-article__text">{description}</p>
                <span className = "article-source main-article__source">
                    {source}
                </span>
            </div>
        </article>
    )
}

const SmallArticle = ({ title, source, date }) => {
    return (
        <article className ="small-article">
            <h2 className ="small-article__title">{title}</h2>
            <p className ="small-article__caption">
                <span className ="article-date small-article__date">
                    {source}
                </span>
                <span className ="article-source small-article__source">
                    {new Date(date).toLocaleDateString('ru-Ru', {
                        month: 'long',
                        day: 'numeric'
                    })}
                </span>
            </p>
        </article>
    )
}

const App = () => {
    const [category, setCategory] = React.useState('index');  // set the initial category and function for its changing
    const [articles, setArticles] = React.useState({ items: [], categories: [], sources: []}); // set the default state of the data with empty arrays

    // Creation of a function to handle a navigation menu click
    const onNavClick = (e) => {                // e is a synthetic event. A synthetic event is a shell around the native DOM event with additional
                                                     // information for React
        e.preventDefault();                          // preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
        setCategory(e.currentTarget.dataset.href);   // property of the Event interface identifies the current target for the event, as the event traverses the
                                                     // DOM. Sets the category when clicking on the link specified in data-href=" "
    }

    // console.log(category)

        React.useEffect(() => {
            fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[category] || '')
                .then(response => response.json())
                .then((response) => {
                    setArticles(response);
                })
        }, [category])                               //used during the first render and when the dependency [category] changes further


    // console.log(articles)

    return (
        <React.Fragment>
            <header className="header">
                <div className="container">
                    <Navigation
                        onNavClick = {onNavClick}
                        currentCategory = {category}
                        className = "header__navigation"
                    />
                </div>
            </header>
            <main className="main">
                <section className="articles">
                    <div className="container grid">
                        <section className="articles__big-column">
                            {articles.items.slice(0, 3).map((item) => {
                                return (
                                    <MainArticle
                                        key = {item.title}
                                        title = {item.title}
                                        description = {item.description}
                                        image = {item.image}
                                        category = {articles.categories.find(({id}) => item.category_id === id).name}
                                        source = {articles.sources.find(({id}) => item.source_id === id).name}
                                    />
                                )
                            })}
                        </section>
                        <section className="articles__small-column">
                            {articles.items.slice(3, 12).map((item) => {
                                return (
                                    <SmallArticle
                                        key = {item.title}
                                        title = {item.title}
                                        source = {articles.sources.find(({id}) => item.source_id === id).name}
                                        date = {item.date}
                                    />
                                )
                            })}
                        </section>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container">
                    <Navigation
                        onNavClick = {onNavClick}
                        currentCategory = {category}
                        className = "footer__navigation"
                    />
                    <div className="footer__info">
                        <p className = "footer__text">Сделано на Frontend курсе в <a href="https://karpov.cources/frontend" target="_blank" className="footer__link">Karpov.Courses</a></p>
                        <p className = "footer__text footer__copyright">© 2023</p>
                    </div>
                </div>
            </footer>

        </React.Fragment>
    )
}

// ReactDOM.createRoot(document.getElementById("root")).render(<App />) // для React18
ReactDOM.render(<App />, document.getElementById("root")) // для React17