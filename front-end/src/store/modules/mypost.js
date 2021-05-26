import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import axios from 'axios';
import produce from 'immer';


//action types
const GET_POST = 'mypost/GET_POST';
const GET_FILES = 'mypost/GET_FILES';
const GET_MYPOST = 'mypost/GET_MYPOST'

//action creators
export const getPost = createAction(GET_POST, api.getPost);
export const getFiles = createAction(GET_FILES, api.getFiles);
export const getMyPost = createAction(GET_MYPOST, api.getMypost);

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
			
			type: GET_POST,
			onSuccess: (state, action) => {
				const { data: post } = action.payload;
				return {
					...state,
					post,
				};
			},
		}), 

        ...pender({
			
			type: GET_MYPOST,
			onSuccess: (state, action) => {
				const { data: content } = action.payload;
				return {
					...state,
					content,
				};
			},
		}),


		...pender({
			// token으로 나임을 확인
				  type: CHECK_USER,
				  onSuccess: (state, action) => {
					const { data: content } = action.payload; 
				    const token = localStorage.getItem('X-AUTH-TOKEN');  
					  axios.defaults.headers.common['X-AUTH-TOKEN'] = `${token}`;
					  return {
						  ...state,
						  content,
					  };
				  },
				  onFailure: (state, action) => {
			  localStorage.removeItem('X-AUTH-TOKEN');  //저장된 토큰 지움  
					  return {
						  ...state,
						  content: null,
						  
					  };
				  },
			  }),




	},
	initialState,
);


