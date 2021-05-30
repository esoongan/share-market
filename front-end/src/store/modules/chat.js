import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';


//action types
const CREATE_CHATROOM = 'chat/CREATE_CHATROOM';

//action creators
export const createChatroom = createAction(CREATE_CHATROOM, api.createChatroom);

//initial state
const initialState = {
	
};

//reducer
export default handleActions(
	{
		// ...pender({
		// 		type: CREATE_CHATROOM,
		// 		onSuccess: (state, action) => {
		// 			return {
		// 				...state,
		// 			};
		// 		},
		// 		onFailure: (state, action) => (initialState),
    // })
	},
	initialState,
);
