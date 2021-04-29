import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
// TODO: 중복 검사하는 action 추가


//action types
const POST_USER = 'join/POST_USER';

//action creators
export const postUser = createAction(POST_USER, api.join);

//initial state
const initialState = {};

//reducer
export default handleActions(
	{
		...pender({
			type: POST_USER,
			onError: (state, action) => {
        console.log(action);
      },
		}),
	},
	initialState,
);
