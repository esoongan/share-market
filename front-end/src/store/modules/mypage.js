import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import produce from 'immer';

//action types
const GET_MY_POST = 'mypage/GET_MY_POST';
const GET_CONTRACTS = 'mypage/GET_CONTRACTS';
const ACCEPT_CONTRACT = 'mypage/ACCEPT_CONTRACT';
const REFUSE_CONTRACT = 'mypage/REFUSE_CONTRACT';
const GET_BUYER_CONTRACT = 'mypage/GET_BUYER_CONTRACT';

const GET_RENTING = 'mypage/GET_RENTING';

const GET_FILES = 'mypage/GET_FILES';

//action creators
export const getMyPost = createAction(GET_MY_POST, api.getMyPost);
export const getContracts = createAction(GET_CONTRACTS, api.getContracts);
export const acceptContract = createAction(ACCEPT_CONTRACT, api.acceptContract);
export const refuseContract = createAction(REFUSE_CONTRACT, api.refuseContract);
export const getRenting = createAction(GET_RENTING, api.getRenting);
// export const getSellerRenting = createAction(GET_SELLER_RENTING, api.getSellerRenting);
// export const getBuyerRenting = createAction(GET_BUYER_RENTING, api.getBuyerRenting);
//renting을 위한 것 --> state == accept인 것들만 받아옴

//initial state
const initialState = {
	myPosts: [],
	contracts: {
		seller: [],
		buyer: [],
	},
	renting: {
		seller: [],
		buyer: [],
	},
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
				const version = url.substring(idx + 1);
				// 아이템이 없을 때 처리
				if (!data) {
					data = [];
				}
				return produce(state, draft => {
					draft.contracts[version] = data;
				});
			},
		}),
		...pender({
			type: GET_RENTING,
			onSuccess: (state, action) => {
				let { data } = action.payload.data;
				let url = action.payload.config.url;
				const idx = url.indexOf('=');
				const version = url.substring(idx + 1);
				return produce(state, draft => {
					draft.renting[version] = data;
				});
			},
		}),
	},
	initialState,
);
