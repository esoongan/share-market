import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { pender } from 'redux-pender'
import * as api from 'lib/api'
import axios from 'axios'

//action types
const SHOW_MODAL = 'base/SHOW_MODAL'
const HIDE_MODAL = 'base/HIDE_MODAL'
const TOGGLE_MODAL = 'base/TOGGLE_MODAL'

const INITIALIZE_LOGIN_MODAL = 'base/INITIALIZE_LOGIN_MODAL'
const LOGIN = 'base/LOGIN'
const LOGOUT = 'base/LOGOUT'
const CHECK_LOGIN = 'base/CHECK_LOGIN'
const CHANGE_LOGIN_INPUT = 'login/CHANGE_INPUT'


//action creators
export const showModal = createAction(SHOW_MODAL)
export const hideModal = createAction(HIDE_MODAL)
export const toggleModal = createAction(TOGGLE_MODAL)

export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL)
export const login = createAction(LOGIN, api.login)
export const logout = createAction(LOGOUT)  //TODO: api.logout
export const checkLogin = createAction(CHECK_LOGIN) //TODO: api.checkLogin
export const changeLoginInput = createAction(CHANGE_LOGIN_INPUT)

//initial state
const initialState = Map({
    modal: Map({
        login: false,        //로그인 모달 visibility 상태
    }),
    loginModal: Map({
        username: '',
        password: '',
        error: false,
    }),
    logged: false,
    JWT: undefined,     //login 성공 시 서버가 JWT를 Secret Key로 생성 후 전달
})

//reducer
export default handleActions({
    [SHOW_MODAL] : (state, action) => {
        const { payload: modalName } = action
        return state.setIn(['modal', modalName], true)
    },
    [HIDE_MODAL] : (state, action) => {
        const { payload: modalName } = action
        return state.setIn(['modal', modalName], false)
    },
    [TOGGLE_MODAL] : (state, action) =>{
        const { payload: modalName } = action
        return state.setIn(['modal', modalName], !['modal', modalName])
    },
    /* 로그인 관련 */
    ...pender({
        /* 로그인 요청: POST /login */
        type: LOGIN,
        onSuccess: (state, action) =>{
            const {data: token} = action.payload
            // API 요청하는 콜마다 헤더에 token(JWT) 담아 보내도록 설정
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            return state.set('logged', true)
                        .set('JWT', token)
        },
        onError: (state, action) =>{
            //로그인 실패 시 error=true, username과 password 초기화
            return state.setIn(['loginModal', 'error'], true)       
                        .setIn(['loginModal', 'password'], '')
                        .setIn(['loginModal', 'username'], '')
        }
    }),
    [CHANGE_LOGIN_INPUT]: (state, action) => {
        //name: 'username' 또는 'password'
        const {name, value} = action.payload
        return state.setIn(['loginModal', name], value)
    },
    [INITIALIZE_LOGIN_MODAL]: (state, action) =>{
        //로그인 모달의 상태를 초기 상태로 설정: 텍스트 또는 오류 초기화
        return state.set('loginModal', initialState.get('loginModal'))
    },
    /* *** */

}, initialState)