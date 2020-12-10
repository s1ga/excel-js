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
        if (resize === 'col') {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()

            document.onmousemove = e => {
               const delta = e.pageX - coords.right
               const value = (coords.width + delta) + 'px'
               const col = $parent.data.col

               document.querySelectorAll(`[data-col="${col}"]`)
                   .forEach(cell => cell.style.width = value)

               $parent.$el.style.width = value
            }

            document.onmouseup = () => {
               document.onmousemove = null
            }
       }
    }
}
