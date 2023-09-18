import React from 'react';
import './SmallArticle.css';

export const SmallArticle = ({ title, source, date, onClick }) => {
    return (
        <article className="small-article" onClick = {onClick}>
            <h2 className="small-article__title">{title}</h2>
            <span className="article-date">
        {source}
      </span>
            <span className="article-source">
        {new Date(date).toLocaleDateString('ru-RU', {
            month: 'long',
            day: 'numeric'
        })}
      </span>
        </article>
    )
}
