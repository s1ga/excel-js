import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input'],
            ...options
        })
    }

    onInput(event) {
        const text = event.target.innerText.trim()
        this.$emit('formula:input', text)
    }

    toHTML() {
        return `
            <div class="excel__formula__info">fx</div>
            <div class="excel__formula__input" contenteditable="true" spellcheck="false"></div>
        `
    }
}
