import {range} from '@core/utils';

export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    return cols.reduce((total, col) => {
        rows.forEach(row => total.push(`${row}:${col}`))
        return total
    }, [])
}

export function nextSelector(key, {col, row}) {
    const MIN_ROW = 1
    const MIN_COL = 0

    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row += 1
            break
        case 'Tab':
        case 'ArrowRight':
            col += 1
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_COL ? MIN_COL : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < MIN_ROW ? MIN_ROW : row - 1
            break
    }

    return `[data-id="${row}:${col}"]`
}

