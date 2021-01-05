import {ExcelComponent} from '@core/ExcelComponent'
import {changeTitle} from '@/store/actions'
import {createHeader} from './header.template'
import {$} from '@core/dom'
import {defaultTitle} from '@/constants'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    toHTML() {
        const title = this.store.getState().title || defaultTitle
        return createHeader(title)
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
}
