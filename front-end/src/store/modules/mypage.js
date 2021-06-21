import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import produce from 'immer';

//action types
const GET_MY_POST = 'mypage/GET_MY_POST';
const GET_CONTRACTS = 'mypage/GET_CONTRACTS';
const ACCEPT_CONTRACT = 'mypage/ACCEPT_CONTRACT';
const REFUSE_CONTRACT = 'mypage/REFUSE_CONTRACT';


//action creators
export const getMyPost = createAction(GET_MY_POST, api.getMyPost);
export const getContracts = createAction(GET_CONTRACTS, api.getContracts)
export const acceptContract = createAction(ACCEPT_CONTRACT, api.acceptContract);
export const refuseContract = createAction(REFUSE_CONTRACT, api.refuseContract);


//initial state
const initialState = {
	myPosts: [],
	contracts: {
		seller: [],
		buyer: [],
	}
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
					myPosts: content,
				};
			},
		}),	
		...pender({
			type: GET_CONTRACTS,
			onSuccess: (state, action) => {
				let { data } = action.payload.data;
				let url = action.payload.config.url;
				const idx = url.indexOf('=');
				const version = url.substring(idx+1);
				// 아이템이 없을 때 처리
				if(!data){
					data = [];
				}
				return produce(state, draft => {
					draft.contracts[version] = data;
				});
			},
		}),
	},
	initialState,
);
