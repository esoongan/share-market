import { createAction, handleActions } from 'redux-actions'
import { List, Map } from 'immutable'
import { pender } from 'redux-pender'
import * as api from 'lib/api'

//action types
const WRITE_POST = 'editor/WRITE_POST'
const INITIALIZE = 'editor/INITIALIZE'
const CHANGE_INPUT = 'editor/CHANGE_INPUT'
const SELECT_CATEGORY = 'editor/SELECT_CATEGORY'
const UPLOAD_FILES = 'editor/UPLOAD_FILES'
const SELECT_FILES = 'editor/SELECT_FILES'

//action creators
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const writePost = createAction(WRITE_POST, api.writePost)
export const selectCategory = createAction(SELECT_CATEGORY)
export const uploadFiles = createAction(UPLOAD_FILES, api.uploadFiles)
export const selectFiles = createAction(SELECT_FILES)

//initial state
const initialState = Map({
    post_id: null,
    title: '',
    content: '',
    category: '',
    price: '',
    deposit: '',
    imageList: []
    /* imageList: 사용자가 선택한 이미지 데이터들의 리스트
    [
        {
            file: File객체,      => api 호출 때 넣어주는 데이터
            data_url: 미리보기에 사용되는 url
        },
        {...},
        {...},
        ...
    ]
    */
})

//reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload
        return state.set(name, value)
    },
    [SELECT_CATEGORY]: (state, action) => {
        const { inputValue } = action.payload
        return state.set('category', inputValue)
    },
    [SELECT_FILES]: (state, action) => {
        const { imageList } = action.payload
        return state.set('imageList', imageList)
    },
    ...pender(
        {
            type: WRITE_POST,
            onSuccess: (state, action) => {
                const { id } = action.payload.data
                console.log(action);
                return state.set('post_id', id)
            },
            onError: (state, action) => {
                console.log('WRITE_POST onError',action);
                return state
            },
        },
        {
            type: UPLOAD_FILES,
            onError: (state, action) => {
                console.log('UPLOAD_FILES onError',action);
                return state
            },
        })
}, initialState)