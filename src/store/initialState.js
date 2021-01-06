import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentStyles: defaultStyles,
    currentText: '',
    title: defaultTitle
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : defaultState
}
