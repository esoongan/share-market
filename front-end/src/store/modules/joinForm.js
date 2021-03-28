import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { pender } from 'redux-pender'
import * as api from 'lib/api'

//action types
const CHANGE_INPUT = 'join/CHANGE_INPUT'
const POST_USERS = 'join/POST_USERS'

//action creators
export const changeInput = createAction(CHANGE_INPUT)
export const postUsers = createAction(POST_USERS, api.join)

//initial state
const initialState = Map({
    username : '',
    password : '',
    email : '',
})

//reducer
export default handleActions({
    [CHANGE_INPUT] : (state, action) => {
        const {name, value} = action.payload
        return state.set(name, value)
    },
    ...pender({
        type: POST_USERS,
        //onFailure: (state, action)=>{}
    })
}, initialState)