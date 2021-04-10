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
    selectedFiles: Map({
        fileList: [],  //사용자가 선택한 File 객체들의 리스트(input 태그의 이벤트에서 받은 값)
        previewUrl: []  //미리보기 시 사용함, FileReader.readAsDataURL(file)의 리턴값
    }),
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
        console.log(state.get('selectedFiles'));
        return state.set('category', inputValue)
    },
    [SELECT_FILES]: (state, action) => {
        const { fileList, previewUrl } = action.payload     //fileList: Array, previewUrl: Array
        return state.setIn(['selectedFiles', 'fileList'], fileList)
            .setIn(['selectedFiles', 'previewUrl'], previewUrl)
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
                console.log(action);
                return state
            },
        },
        {
            type: UPLOAD_FILES,
            onError: (state, action) => {
                console.log(action)
                return state
            },
        })
}, initialState)