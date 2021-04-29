import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { pender } from 'redux-pender'
import * as api from 'lib/api'

//action types
const CHANGE_INPUT = 'join/CHANGE_INPUT'
const POST_USERS = 'join/POST_USERS'
const INITIALIZE = 'join/INITIALIZE'
const SELECT_ADDR = 'join/SELECT_ADDR'
const CHECK_VALID = 'join/CHECK_VALID'

//action creators
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const postUsers = createAction(POST_USERS, api.join)
export const selectAddr = createAction(SELECT_ADDR)
export const checkValid = createAction(CHECK_VALID)

//initial state
const initialState = Map({
    username : '',
    password : '',
    email : '',
    addr: '',
    valid: Map({
        username: '',
        password: '',
        email: '',
    })
})

//reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT] : (state, action) => {
        const {name, value} = action.payload
        return state.set(name, value)
    },    
    [SELECT_ADDR] : (state, action) => {
        const { inputValue } = action.payload
        return state.set('addr', inputValue)
    },
    [CHECK_VALID] : (state, action) => {
        const {form, valid} = action.payload
        return state.setIn(['valid', form], valid)
    },
    ...pender({
        type: POST_USERS,
        onFailure: (state, action)=>{
            console.log(action);
        }
    })
}, initialState)