import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import axios from 'axios';

//action types
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const CHECK_USER = 'auth/GET_USER';
const TEMP_SET_LOGGED = 'authTEMP_SET_LOGGED'

//action creators
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT);
export const checkUser = createAction(CHECK_USER, api.checkUser);
export const tempSetUser = createAction(TEMP_SET_LOGGED)

//initial state
const initialState = {
	logged: false,
	user: null,
};

//reducer
export default handleActions(
	{
		...pender({
			// 로그인 요청: POST /login
			type: LOGIN,
			onSuccess: (state, action) => {
				const { data: token } = action.payload;
				// API 요청하는 콜마다 헤더에 token(JWT) 담아 보내도록 설정
				axios.defaults.headers.common['X-AUTH-TOKEN'] = `${token}`;
				try {
					//로컬스토리지에 토큰 저장
					localStorage.setItem('X-AUTH-TOKEN', token);
				} catch (e) {
					console.log('localStorage is not working');
					return {
						...state,
						logged: false,
					};
				}
				return {
					...state,
					logged: true,
				};
			},
			onFailure: (state, action) => {
				return state;
				//로그인 실패 시
			},
		}),
		...pender({
      // token으로 사용자 정보 가져오기 -> 토큰 유효한지 체크할 때 사용
			type: CHECK_USER,
			onSuccess: (state, action) => {
				const user = action.payload.data;
        const token = localStorage.getItem('X-AUTH-TOKEN');  
				axios.defaults.headers.common['X-AUTH-TOKEN'] = `${token}`;
				return {
					...state,
					user,
				};
			},
			onFailure: (state, action) => {
        localStorage.removeItem('X-AUTH-TOKEN');  //저장된 토큰 지움  
				return {
					...state,
					user: null,
					logged: false,
				};
			},
		}),
		[LOGOUT]: (state, action) => {
      localStorage.removeItem('X-AUTH-TOKEN');  //저장된 토큰 지움
			axios.defaults.headers.common['X-AUTH-TOKEN'] = ``;
      return {
				...state,
				user: null,
				logged: false,
			};
		},
    [TEMP_SET_LOGGED]: (state, action) =>{
			axios.defaults.headers.common['X-AUTH-TOKEN'] = `${action.payload}`;
			return {
      ...state,
      logged: true,
    }
	}
	},
	initialState,
);
