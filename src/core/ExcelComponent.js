import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
    }

    init() {
        this.initDOMListeners()
    }

    // return component template
    toHTML() {
        return ''
    }
}
