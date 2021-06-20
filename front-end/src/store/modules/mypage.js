import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

//action types
const GET_MY_POST = 'mypage/GET_MY_POST';
const GET_SELLER_CONTRACT = 'mypage/GET_SELLER_CONTRACT';
const ACCEPT_CONTRACT = 'mypage/ACCEPT_CONTRACT';
const REFUSE_CONTRACT = 'mypage/REFUSE_CONTRACT';
const GET_BUYER_CONTRACT = 'mypage/GET_BUYER_CONTRACT';

const GET_BUYER_RENTING = 'mypage/GET_BUYER_RENTING';
const GET_SELLER_RENTING = 'mypage/GET_SELLER_RENTING';

const GET_FILES = 'mypage/GET_FILES';



//action creators
export const getMyPost = createAction(GET_MY_POST, api.getMyPost);
export const getSellerContract = createAction(GET_SELLER_CONTRACT, api.getSellerContract)
export const acceptContract = createAction(ACCEPT_CONTRACT, api.acceptContract);
export const refuseContract = createAction(REFUSE_CONTRACT, api.refuseContract);
export const getBuyerContract = createAction(GET_BUYER_CONTRACT, api.getBuyerContract);
export const getSellerRenting = createAction(GET_SELLER_RENTING, api.getSellerRenting);
export const getBuyerRenting = createAction(GET_BUYER_RENTING, api.getBuyerRenting);
export const getFiles = createAction(GET_FILES, api.getFiles);
//renting을 위한 것 --> state == accept인 것들만 받아옴

//initial state
const initialState = {
	myPosts: [],
	sellerContract: [],
	buyerContract: [],
	buyerrenting: [],
	sellerrenting:[],
};

//reducer
export default handleActions(
	{

		...pender({
			type: GET_FILES,
			onSuccess: (state, action) => {
				const { data: images } = action.payload;
				return {
					...state,
					images,
				};
			},
			onFailure: (state, action) => initialState,
		}),
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
			/* 	const { data } = action.payload.data; */
				let { data } = action.payload.data;
				// 아이템이 없을 때 처리
				if(!data){
					data = [];
				}
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
		...pender({
			type: GET_SELLER_RENTING,
			onSuccess: (state, action) => {
				const { data } = action.payload.data;
				return {
					...state,
					sellerrenting: data,
				};
			},
		}),
		...pender({
			type: GET_BUYER_RENTING,
			onSuccess: (state, action) => {
				const { data } = action.payload.data;
				return {
					...state,
					buyerrenting: data,
				};
			},
		}),
	},
	initialState,
);
