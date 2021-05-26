import {createAction, handleActions} from 'redux-actions';
import * as api from 'lib/api';
import axios from 'axios';


//action type
const GET_CONTRACT = 'contract_buyer/GET_CONTRACT';
const GET_FILES = 'contract_buyer/GET_FILES';


//action creators
export const getContractBuyer = createAction(GET_CONTRACT, api.getContractBuyer);
export const getFiles = createAction(GET_FILES, api.getFiles);


//initial state
const initialState = {
    id: null,
    postId: '',
    sellerId: '',
    buyerId: '',
    startDate: '',
    endDate: '',
    state: '',
};


///요기부터////////////////////////////////////////////



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
			// 이부분이 필요한지 모르겠음
			type: GET_CONTRACT,
			onSuccess: (state, action) => {
				let post = action.payload.data;
				
				post.category = getLabel(categories, post.category);
				return {
					...state,
					post,
				};
			},
			onFailure: (state, action) => initialState,
		}),
		
	},
	initialState,
);
