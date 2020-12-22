import {$} from '@core/dom';

export function tableResizeHandler(resize, $root, event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const sideProp = resize === 'col' ? 'bottom' : 'right'
    let value = 0

    $resizer.css({
        opacity: 1,
        zIndex: 10,
        [sideProp]: '-5000px'
    })

    document.onmousemove = e => {
        if (resize === 'col') {
            const delta = e.pageX - coords.right
            value = (coords.width + delta)

            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = e.pageY - coords.bottom
            value = (coords.height + delta)

            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null


        if (resize === 'col') {
            const col = $parent.data.col
            const cells = $root.findAll(`[data-col="${col}"]`)

            cells.forEach(cell => cell.style.width = value + 'px')
            $parent.css({width: value + 'px'})
        } else {
            $parent.css({height: value + 'px'})
        }

        $resizer.css({
            opacity: 0,
            right: 0,
            bottom: 0
        })
    }
}