import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { pender } from 'redux-pender'
import * as api from 'lib/api'

//action types
const WRITE_POST = 'editor/WRITE_POST'
const INITIALIZE = 'editor/INITIALIZE'
const CHANGE_INPUT = 'editor/CHANGE_INPUT'
const SELECT_CATEGORY = 'editor/SELECT_CATEGORY'
const UPLOAD_FILES = 'editor/UPLOAD_FILES'

//action creators
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const writePost = createAction(WRITE_POST, api.writePost)
export const selectCategory = createAction(SELECT_CATEGORY)
export const uploadFiles = createAction(UPLOAD_FILES)


//initial state
const initialState = Map({
    post_id: null,
    title:'',
    content:'',
    category:'',
    price:'',
    deposit:'',
})

//reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const {name, value} = action.payload
        return state.set(name, value)
    },
    [SELECT_CATEGORY]: (state, action) => {
        const { inputValue } = action.payload
        return state.set('category', inputValue)
    },
    ...pender({
        type: WRITE_POST,
        onSuccess: (state, action) =>{
            const { id } = action.payload.data
            return state.set('post_id', id)
        }
    })
}, initialState)