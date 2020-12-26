import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    init() {
        super.init()

        this.$formula = this.$root.find('[data-type="input"]')

        this.$on('table:select', $cell => this.$formula.text($cell.text()))
        this.$on('table:input', text => this.$formula.text(text))
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:enter')
        }
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    toHTML() {
        return `
            <div class="excel__formula__info">fx</div>
            <div class="excel__formula__input" data-type="input" contenteditable="true" spellcheck="false"></div>
        `
    }
}
