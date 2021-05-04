import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

//action types
const POST_USER = 'join/POST_USER';

//action creators
export const postUser = createAction(POST_USER, api.join);

//initial state
const initialState = {
	isSucceed: null,		//api 호출 응답 (success: true, failed: false)
	status: null,
};

//reducer
export default handleActions(
	{
		...pender({
			type: POST_USER,
			onSuccess: (state, action) => {
				return {...state, isSucceed: true}
			},
			onError: (state, action) => {
				return {...state, isSucceed: false }
      },
			onFailure: (state, action) => {
				let status = action.payload.response ? action.payload.response.status : action.payload.message
				return {...state, isSucceed: false, status}
				//status 500: 중복된 아이디
			},
		}),
	},
	initialState,
);
