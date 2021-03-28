import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { pender } from 'redux-pender'

//action types
const SELECT = 'locationSelector/SELECT'
//action creators
export const select = createAction(SELECT)

//initial state
const initialState = Map({
    location: ''
})

//reducer
export default handleActions({
    [SELECT] : (state, action) => {
        const { inputValue } = action.payload
        return state.set('location', inputValue)
    }
}, initialState)