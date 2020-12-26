import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubs = []
        this.prepare()
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubs.push(unsub)
    }

    // настройка компонента до init
    prepare() {}

    // инициализация и добавление DOM слушателей
    init() {
        this.initDOMListeners()
    }

    // remove DOM listeners
    remove() {
        this.removeDOMListeners()
        this.unsubs.forEach(unsub => unsub())
    }

    // return component template
    toHTML() {
        return ''
    }
}
