import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import { categories } from 'constant/locale';

//action types
const GET_POST = 'post/GET_POST';
const GET_FILES = 'post/GET_FILES';
const DELETE_POST = 'post/DELETE_POST';

//action creators
export const getPost = createAction(GET_POST, api.getPost);
export const getFiles = createAction(GET_FILES, api.getFiles);
export const deletePost = createAction(DELETE_POST, api.deletePost);

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
	images: null,
};

//reducer
export default handleActions(
	{
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
				let { data: post } = action.payload;
				// 서버에서 받는 값은 category.value -> category.label로 바꿔서 저장하기
				const category = categories.filter(x => x.value === post.category);
				post.category = category[0].label;
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
	},
	initialState,
);
