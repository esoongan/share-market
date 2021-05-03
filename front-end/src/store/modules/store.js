import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import axios from 'axios';
import produce from 'immer';

//action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GET_USER = 'GET_USER';
const TOGGLE_MODAL = 'TOGGLE_MODAL';
const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR';

//action creators
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT);
export const getUser = createAction(GET_USER, api.getUser);
export const toggleModal = createAction(TOGGLE_MODAL);
export const toggleSnackbar = createAction(TOGGLE_SNACKBAR);

//initial state
const initialState = {
	logged: false,
	user: {
		id: null,
		username: '',
		email: '',
		addr: '',
	},
	modals: {
		loginModal: false,
	},
	snackbars: {},
};

//reducer
export default handleActions(
	{
		[TOGGLE_MODAL]: (state, { payload: modal }) =>
			produce(state, draft => {
				draft.modals[modal] = !draft.modals[modal];
			}),
		[TOGGLE_SNACKBAR]: (state, { payload: snackbar }) =>
			produce(state, draft => {
				draft.snackbars[snackbar] = !draft.snackbars[snackbar];
			}),
		/* 로그인 관련 */
		...pender({
			// 로그인 요청: POST /login
			type: LOGIN,
			onSuccess: (state, action) => {
				const { data: token } = action.payload;
				console.log(action);
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
				console.log(action);
				return state;
				//로그인 실패 시
			},
		}),
		...pender({
			type: GET_USER,
			onSuccess: (state, action) => {
				console.log(action);
				const user = action.payload.data;
				return {
					...state,
					user,
				};
			},
			onFailure: (state, action) => {
				console.log(action);
				return {
					...state,
					user: initialState.user,
					logged: false,
				};
			},
		}),
		[LOGOUT]: (state, action) => ({
			...state,
			user: initialState.user,
			logged: false,
      //todo: token도 지워야함
		}),
	},
	initialState,
);
