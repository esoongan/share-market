import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import axios from 'axios';
import produce from 'immer';

//action types
const GET_POST = 'post/GET_POST';
const GET_FILES = 'post/GET_FILES';

//action creators
export const getPost = createAction(GET_POST, api.getPost);
export const getFiles = createAction(GET_FILES, api.getFiles);

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
		}),
		...pender({
			// 게시물 정보 가져오기: GET /post/{post_id}
			type: GET_POST,
			onSuccess: (state, action) => {
				const { data: post } = action.payload;
				console.log(post);
				return {
					...state,
					post,
				};
			},
		}),
	},
	initialState,
);
