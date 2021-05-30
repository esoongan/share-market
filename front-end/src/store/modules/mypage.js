import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

//action types
const GET_MY_POST = 'mypage/GET_MY_POST';
const GET_CONTRACT = 'mypage/GET_CONTRACT';

//action creators
export const getMyPost = createAction(GET_MY_POST, api.getMyPost);

//initial state
const initialState = {
	content: [],
};

//reducer
export default handleActions(
	{
			...pender({
			type: GET_MY_POST,
			onSuccess: (state, action) => {
				const { content } = action.payload.data.data;
				return {
					...state,
					content,
				};
			},
		}),
	},
	initialState,
);
