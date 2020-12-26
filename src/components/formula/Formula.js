import {ExcelComponent} from '@core/ExcelComponent';

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

        const $input = this.$root.find('[data-type="input"]')
        this.$on('table:input', text => $input.text(text))
    }

    onKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.$emit('formula:enter')
        }
    }

    onInput(event) {
        const text = event.target.innerText.trim()
        this.$emit('formula:input', text)
    }

    toHTML() {
        return `
            <div class="excel__formula__info">fx</div>
            <div class="excel__formula__input" data-type="input" contenteditable="true" spellcheck="false"></div>
        `
    }
}
