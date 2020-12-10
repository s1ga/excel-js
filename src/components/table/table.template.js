const CODES = {
    A: 65,
    Z: 90
}

function createCell(_, col) {
    return `
        <div class="excel__table__row__data__cell" data-col="${col}" contenteditable="true"></div>
    `
}

function createCol(content, index) {
    return `
        <div class="excel__table__row__data__column" data-type="resizable" data-col="${index}">
            ${content}
            <div class="excel__table__row__data__column-resize" data-resize="col"></div>
        </div>       
    `
}

function createRow(index, content) {
    const resize = index ? `<div class="excel__table__row__info-resize" data-resize="row"></div>` : ''
    return `
        <div class="excel__table__row">
            <div class="excel__table__row__info" data-type="resizable">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="excel__table__row__data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols))
    for (let i = 1; i <= rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('')
        rows.push(createRow(i, cells))
    }

    return rows.join('')
}
