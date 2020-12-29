function toButton(button) {
    const style = JSON.stringify(button.value)
    const meta = `
        data-type="button"
        data-style='${style}'
    `
    return `
        <div class="excel__toolbar__btn ${button.active ? 'active' : ''}" ${meta}>
            <i class="material-icons" ${meta}>${button.icon}</i>
        </div>
    `
}

export function createToolbar() {
    const buttons = [
        {
            icon: 'format_align_left',
            active: false,
            value: {
                textAlign: 'left'
            }
        },
        {
            icon: 'format_align_center',
            active: true,
            value: {
                textAlign: 'center'
            }
        },
        {
            icon: 'format_align_right',
            active: false,
            value: {
                textAlign: 'right'
            }
        },
        {
            icon: 'format_bold',
            active: true,
            value: {
                fontWeight: 'bold'
            }
        },
        {
            icon: 'format_italic',
            active: false,
            value: {
                fontStyle: 'italic'
            }
        },
        {
            icon: 'format_underline',
            active: false,
            value: {
                textDecoration: 'underline'
            }
        },

    ]
    return buttons.map(toButton).join('')
}
