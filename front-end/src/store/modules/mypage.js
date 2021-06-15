import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

//action types
const GET_MY_POST = 'mypage/GET_MY_POST';
const GET_SELLER_CONTRACT = 'mypage/GET_SELLER_CONTRACT';
const ACCEPT_CONTRACT = 'mypage/ACCEPT_CONTRACT';
const REFUSE_CONTRACT = 'mypage/REFUSE_CONTRACT';
const GET_BUYER_CONTRACT = 'mypage/GET_BUYER_CONTRACT';

const GET_RESERVATION = 'mypage/GET_RESERVATION';


//action creators
export const getMyPost = createAction(GET_MY_POST, api.getMyPost);
export const getSellerContract = createAction(GET_SELLER_CONTRACT, api.getSellerContract)
export const acceptContract = createAction(ACCEPT_CONTRACT, api.acceptContract);
export const refuseContract = createAction(REFUSE_CONTRACT, api.refuseContract);
export const getBuyerContract = createAction(GET_BUYER_CONTRACT, api.getBuyerContract);


//initial state
const initialState = {
	myPosts: [],
	sellerContract: [],
	buyerContract: [],
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
			type: GET_SELLER_CONTRACT,
			onSuccess: (state, action) => {
				const { data } = action.payload.data;
				return {
					...state,
					sellerContract: data,
				};
			},
		}),
		...pender({
			type: GET_BUYER_CONTRACT,
			onSuccess: (state, action) => {
				const { content } = action.payload.data.data;
				return {
					...state,
					buyerContract: content,
				};
			},
		}),	
	},
	initialState,
);
