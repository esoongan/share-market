import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import { categories } from 'constant/locale';
import { getLabel } from 'lib/util';

//action types
const INITIALIZE = 'post/INITIALIZE';
const GET_POST = 'post/GET_POST';
const GET_FILES = 'post/GET_FILES';
const DELETE_POST = 'post/DELETE_POST';
const RESERVE = 'post/RESERVE';
const GET_BLOCKED_DATES = 'post/GET_BLOCKED_DATES';

//action creators
export const initialize = createAction(INITIALIZE);
export const getPost = createAction(GET_POST, api.getPost);
export const getFiles = createAction(GET_FILES, api.getFiles);
export const deletePost = createAction(DELETE_POST, api.deletePost);
export const reserve = createAction(RESERVE, api.reserve);
export const getBlockedDates = createAction(GET_BLOCKED_DATES, api.getBlockedDates);

//initial state
const initialState = {
	post: {
		id: null,
		user_id: '',
		title: '',
		content: '',
		category: '',
		addr: '',
		price: '',
		deposit: '',
	},
	blocked: [],
	images: null,
	reserved: null,
};

//reducer
export default handleActions(
	{
		[INITIALIZE]: (state, action) => initialState,
		...pender({
			type: GET_FILES,
			onSuccess: (state, action) => {
				const { data: images } = action.payload;
				return {
					...state,
					images,
				};
			},
			onFailure: (state, action) => initialState,
		}),
		...pender({
			// 게시물 정보 가져오기: GET /posts/{post_id}
			type: GET_POST,
			onSuccess: (state, action) => {
				let post = action.payload.data;
				// 서버에서 받는 값은 category.value -> category.label로 바꿔서 저장하기
				post.category = getLabel(categories, post.category);
				return {
					...state,
					post,
				};
			},
			onFailure: (state, action) => initialState,
		}),
		...pender({
			// 게시물 삭제하기: DELETE /posts/{post_id}
			type: DELETE_POST,
			onSuccess: (state, action) => {
				return {
					...state,
					post:initialState.post,
				};
			},
		}),
		...pender({
			// 이미 예약된 날짜 불러오기
			type: GET_BLOCKED_DATES,
			onSuccess: (state, action) => {
				return {
					...state,
					blocked: action.payload.data.data,
				};
			},
		}),
		...pender({
			// 예약하기
			type: RESERVE,
			onSuccess: (state, action) => {
				return {
					...state,
					reserved: true,
				};
			},
			onFailure: (state, action) => {
				return {
					...state,
					reserved: false,
				};
			}
		}),
	},
	initialState,
);
