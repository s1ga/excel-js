import {storage} from '@core/utils'

function getDate(ms) {
    const date = new Date(+ms)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`.toLocaleString()
}

function toHTML(value) {
    const param = value.split(':')[1]
    const date = getDate(param)
    return `
        <li class="db__table__list__record">
            <a href="#excel/${param}">${storage(value).title}</a>
            <strong>${date}</strong>
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
