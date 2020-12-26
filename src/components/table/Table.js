import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {matrix, nextSelector} from '@/components/table/table.functions';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="1:0"]')
        this.selection.select($cell)

        this.$on('formula:input', text => this.selection.current.text(text))
        this.$on('formula:enter', () => this.selection.current.focus())
    }

    onInput(event) {
        const text = event.target.textContent.trim()
        this.$emit('table:input', text)
    }

    onMousedown(event) {
        const eventType = event.target.dataset.type
        const resize = event.target.dataset.resize

        if (resize) {
            tableResizeHandler(resize, this.$root, event)
        } else if (eventType === 'cell') {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()

            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selection.select($next)
        }
    }
}

