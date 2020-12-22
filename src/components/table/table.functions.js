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
