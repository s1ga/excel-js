function toHTML() {
    return `
        <li class="db__table__list__record">
            <a href="#">Таблица №1</a>
            <strong>12.06.2020</strong>
        </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }

        keys.push(key)
    }

    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `<p>Вы пока не создали ни одной таблицы</p>`
    }

    return `
        <div class="db__table__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
    
        <ul class="db__table__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `
}
