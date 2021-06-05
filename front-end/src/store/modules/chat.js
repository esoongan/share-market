import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';


//action types
const INITIALIZE = 'chat/INITIALIZE';
const CREATE_CHATROOM = 'chat/CREATE_CHATROOM';
const GET_CHATROOMS = 'chat/GET_CHATROOM';
const SEND_CHAT = 'chat/SEND_CHAT';


//action creators
export const initialize = createAction(INITIALIZE);
export const createChatroom = createAction(CREATE_CHATROOM, api.createChatroom);
export const getChatrooms = createAction(GET_CHATROOMS, api.getChatrooms);
export const sendChat = createAction(SEND_CHAT, api.sendChat);

//initial state
const initialState = {
	createdChatroom : false,
	chatRooms : [],
	totalElements : 0, 
};

//reducer
export default handleActions(
	{
		[INITIALIZE]: (state, action) => initialState,
		...pender({
			//처음 대화 시작 시 채팅방 생성
				type: CREATE_CHATROOM,
				onSuccess: (state, action) => {
					return {
						createdChatroom: action.data.data.id,		//생성된 chatroom id
						...state,
					};
				},
				onFailure: (state, action) => (initialState),
    }),
		...pender({
			//ChatPage의 Chatrooms 컴포넌트의 props로
			type: GET_CHATROOMS,
			onSuccess: (state, action) => ({
				chatRooms : action.data.data.content,
				totalElements: action.data.data.totalElements,
				...state,
			}),
			onFailure: (state, action) => (initialState),
		}),
	},
	initialState,
);
