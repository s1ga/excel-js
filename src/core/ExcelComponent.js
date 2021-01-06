import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
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

    $dispatch(action) {
        this.store.dispatch(action)
    }

    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key)
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
        // this.storeSub.unsubscribe()
    }

    // return component template
    toHTML() {
        return ''
    }
}
