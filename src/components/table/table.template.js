const CODES = {
    A: 65,
    Z: 90
}

// function createCell() {
//     return `
//         <div class="excel__table__row__data__cell" contenteditable="true"></div>
//     `
// }

function createCol(content) {
    return `
        <div class="excel__table__row__data__column">${content}</div>       
    `
}

function createRow(content) {
    return `
        <div class="excel__table__row">
            <div class="excel__table__row__info"></div>
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

    rows.push(createRow(cols))
    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow())
    }

    return rows.join('')
}
