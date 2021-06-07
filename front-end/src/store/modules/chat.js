import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';
import produce from 'immer';

//action types
const INITIALIZE = 'chat/INITIALIZE';
const CREATE_CHATROOM = 'chat/CREATE_CHATROOM';
const GET_CHATROOMS = 'chat/GET_CHATROOM';
const SEND_CHAT = 'chat/SEND_CHAT';
const GET_CHATS = 'chat/GET_CHATS';

//action creators
export const initialize = createAction(INITIALIZE);
export const createChatroom = createAction(CREATE_CHATROOM, api.createChatroom);
export const getChatrooms = createAction(GET_CHATROOMS, api.getChatrooms);
export const sendChat = createAction(SEND_CHAT, api.sendChat);
export const getChats = createAction(GET_CHATS, api.getChats);

//initial state
const initialState = {
	createdChatroom: false,
	chatRooms: {
		seller: {
			chatRooms: [],
			totalElements: 0,
		},
		buyer: {
			chatRooms: [],
			totalElements: 0,
		},
	},
	totalElements: 0,
};
//reducer
export default handleActions(
	{
		[INITIALIZE]: (state, action) => initialState,
		...pender({
			//처음 대화 시작 시 채팅방 생성
			type: CREATE_CHATROOM,
			onSuccess: (state, action) => {
				const chatroom = action.payload.data.data;
				return {
					...state,
					createdChatroom: chatroom.id, //생성된 chatroom id
				};
			},
			onFailure: (state, action) => initialState,
		}),
		...pender({
			//ChatPage의 Chatrooms 컴포넌트의 props로
			type: GET_CHATROOMS,
			onSuccess: (state, action) => {
				const chatRooms = action.payload.data.data.content;
				const totalElements = action.payload.data.data.totalElements;
				const url = action.payload.config.url;
				const version = url.includes('seller') ? 'seller' : 'buyer';
				return produce(state, draft => {
					draft.chatRooms[version] = { chatRooms, totalElements };
				});
			},
			onFailure: (state, action) => initialState,
		}),
	},
	initialState,
);
