import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable()
    }

    onMousedown(event) {
        const resize = event.target.dataset.resize
        if (resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()

            const col = $parent.data.col
            const cells = this.$root.findAll(`[data-col="${col}"]`)

            document.onmousemove = e => {
                if (resize === 'col') {
                    const delta = e.pageX - coords.right
                    const value = (coords.width + delta)

                    cells.forEach(cell => cell.style.width = value + 'px')
                    $parent.css({width: value + 'px'})
                } else {
                    const delta = e.pageY - coords.bottom
                    const value = (coords.height + delta)

                    $parent.css({height: value + 'px'})
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}
