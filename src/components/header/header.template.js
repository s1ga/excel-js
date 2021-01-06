export function createHeader(title) {
    return `
            <input type="text" class="excel__header__input" value="${title}" />
            <div class="excel__header__wrapper__btn">
                <div class="excel__header__btn" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>
                <div class="excel__header__btn" data-button="remove">
                    <i class="material-icons" data-button="remove">delete</i>
                </div>
            </div>
        `
}
