import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import axios from 'axios';
import produce from 'immer';


//action types
const GET_CONTENT = 'mypost/GET_CONTENT';
const GET_FILES = 'mypost/GET_FILES';

//action creators
export const getContent = createAction(GET_CONTENT, api.getContent);
export const getFiles = createAction(GET_FILES, api.getFiles);
export const getMyPost = createAction(GET_CONTENT, api.getContent);

//initial state
const initialState = {
	content: {
		id: null,
		user_id: '',//이부분 질뭉
		title: '',
		category: '',
		addr: '',
        createdDate:'',
        thumbnail:{
            id: null,
            post_id:'',
            origFilename:'',
            filename:'',
            filepath:'',
        },
	},
	
};

//reducer
export default handleActions(
	{
		...pender({
            
			type: GET_FILES,
			onSuccess: (state, action) => {
				const { data: thumbnail } = action.payload;
				return {
					...state,
					thumbnail,
				};
			},
		}),
		...pender({
			
			type: GET_CONTENT,
			onSuccess: (state, action) => {
				const { data: content } = action.payload;
				return {
					...state,
					content,
				};
			},
		}),
	},
	initialState,
);


