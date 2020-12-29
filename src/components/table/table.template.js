const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function createCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`
        const width = getWidth(state.colState, col)
        const data = state.dataState[id]
        return `
            <div 
                class="excel__table__row__data__cell" 
                data-id="${id}" 
                data-type="cell"
                data-col="${col}" 
                style="width: ${width}"
                contenteditable="true"
             >${data || ''}</div>
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

function createRow(index, content, state) {
    index = index || ''
    const height = getHeight(state, index)
    const resize = index ? `<div class="excel__table__row__info-resize" data-resize="row"></div>` : ''
    return `
        <div class="excel__table__row" data-row="${index}" data-type="resizable" style="height: ${height}">
            <div class="excel__table__row__info">
                ${index}
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

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
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

    rows.push(createRow(null, cols, {}))
    for (let row = 1; row <= rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(state, row))
            .join('')
        rows.push(createRow(row, cells, state.rowState))
    }

    return rows.join('')
}
