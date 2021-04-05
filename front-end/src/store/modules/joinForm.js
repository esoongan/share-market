import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { pender } from 'redux-pender'
import * as api from 'lib/api'

//action types
const CHANGE_INPUT = 'join/CHANGE_INPUT'
const POST_USERS = 'join/POST_USERS'
const INITIALIZE = 'join/INITIALIZE'
const SELECT_LOCATION = 'join/SELECT_LOCATION'

//action creators
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const postUsers = createAction(POST_USERS, api.join)
export const selectLocation = createAction(SELECT_LOCATION)

//initial state
const initialState = Map({
    username : '',
    password : '',
    email : '',
    location: '',
})

//reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT] : (state, action) => {
        const {name, value} = action.payload
        return state.set(name, value)
    },    
    [SELECT_LOCATION] : (state, action) => {
        const { inputValue } = action.payload
        return state.set('location', inputValue)
    },
    ...pender({
        type: POST_USERS,
        //onFailure: (state, action)=>{}
    })
}, initialState)