import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter 
        this.prepare()
    }

    prepare() {}

    init() {
        this.initDOMListeners()
    }

    remove() {
        this.removeDOMListeners()
    }

    // return component template
    toHTML() {
        return ''
    }
}
