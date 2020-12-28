import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {tableResizeHandler} from '@/components/table/table.resize'
import {TableSelection} from '@/components/table/TableSelection'
import {matrix, nextSelector} from '@/components/table/table.functions'
import {$} from '@core/dom'
import * as actions from '@/store/actions'

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

        const $startCell = this.$root.find('[data-id="1:0"]')
        this.selectCell($startCell)

        this.$on('formula:input', text => this.selection.current.text(text))
        this.$on('formula:enter', () => this.selection.current.focus())

        // this.$subscribe(state => console.log('Table state: ', state))
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    onInput(event) {
        this.$emit('table:input', $(event.target).text())
    }

    async resizeTable(event) {
        try {
            const data = await tableResizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.error('Resize error: ', e.message)
        }
    }

    onMousedown(event) {
        const eventType = event.target.dataset.type

        if (event.target.dataset.resize) {
            this.resizeTable(event)
        } else if (eventType === 'cell') {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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
            this.selectCell($next)
        }
    }
}

