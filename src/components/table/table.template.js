const CODES = {
    A: 65,
    Z: 90
}

// function createCell(row, col) {
//     return `
//         <div class="excel__table__row__data__cell" data-row="${row}" data-col="${col}" contenteditable="true"></div>
//     `
// }

function createCell(row) {
    return function(_, col) {
        return `
            <div 
                class="excel__table__row__data__cell" 
                data-id="${row}:${col}" 
                data-type="cell"
                data-col="${col}" 
                contenteditable="true"
             ></div>
        `
    }
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
        <div class="excel__table__row"  data-type="resizable">
            <div class="excel__table__row__info">
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
    for (let row = 1; row <= rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, col) => createCell(row, col))
            .map(createCell(row))
            .join('')
        rows.push(createRow(row, cells))
    }

    return rows.join('')
}
