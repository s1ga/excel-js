const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120

function createCell(state, row) {
    return function(_, col) {
        const width = getWidth(state.colState, col)
        return `
            <div 
                class="excel__table__row__data__cell" 
                data-id="${row}:${col}" 
                data-type="cell"
                data-col="${col}" 
                style="width: ${width}"
                contenteditable="true"
             ></div>
        `
    }
}

function createCol({content, index, width}) {
    return `
        <div class="excel__table__row__data__column" data-type="resizable" data-col="${index}" style="width: ${width}">
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

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function withWidthFrom(state) {
    return function(content, index) {
        return {
            content,
            index,
            width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols))
    for (let row = 1; row <= rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(state, row))
            .join('')
        rows.push(createRow(row, cells))
    }

    return rows.join('')
}
