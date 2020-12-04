import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    toHTML() {
        return `
            <div class="excel__table__row">

                <div class="excel__table__row__info">

                </div>

                <div class="excel__table__row__data">
                    <div class="excel__table__row__data__column">
                        A
                    </div>
                    <div class="excel__table__row__data__column">
                        B
                    </div>
                    <div class="excel__table__row__data__column">
                        C
                    </div>
                </div>

            </div>

            <div class="excel__table__row">

                <div class="excel__table__row__info">
                    1
                </div>

                <div class="excel__table__row__data">
                    <div class="excel__table__row__data__cell selected" contenteditable="true"></div>
                    <div class="excel__table__row__data__cell" contenteditable="true"></div>
                    <div class="excel__table__row__data__cell" contenteditable="true"></div>
                </div>

            </div>
        `
    }
}
