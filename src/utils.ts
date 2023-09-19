export const categoryIds = {
    index: 0,
    technologies: 1,
    sport: 2,
    fashion: 3,
    politics: 4,
    other: 5
}

export const categoryNames = {
    index: 'Главная',
    fashion: 'Мода',
    technologies: 'Технологии',
    politics: 'Политика',
    sport: 'Спорт'
}

export const beautifyDate = (date: string): string => {
    return new Date(date).toLocaleDateString('ru-RU', {
            month: 'long',
            day: 'numeric'
        });
}
