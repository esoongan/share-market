import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { pender } from 'redux-pender'
import * as api from 'lib/api'

//action types
const SELECT_LOCATION = 'search/SELECT_LOCATION'
const SELECT_PERIOD = 'search/SELECT_PERIOD'
const CHANGE_INPUT_KEYWORD = 'search/CHANGE_INPUT_KEYWORD'

//action creators
export const selectLocation = createAction(SELECT_LOCATION)
export const selectPeriod = createAction(SELECT_PERIOD)
export const changeInputKeyword = createAction(CHANGE_INPUT_KEYWORD)

//initial state
const initialState = Map({
    loc: '',
    period: Map({
        start: '',
        end: ''
    }),
    keyword: '',
})

//reducer
export default handleActions({
    [SELECT_LOCATION]: (state, action) => {
        const { inputValue } = action.payload
        state.set('loc', inputValue)
    },
    [SELECT_PERIOD]: (state, action) => {
        const { start, end } = action.payload
        state.setIn(['period', 'start'], start)
            .setIn(['period', 'end'], end)
    },
    [CHANGE_INPUT_KEYWORD]: (state, action) => {
        const { value } = action.payload
        state.set('keyword', value)
    }
}, initialState)