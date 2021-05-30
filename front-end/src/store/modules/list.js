import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

//action types
const SEARCH = 'list/SEARCH';
const INITIALIZE = 'list/INITIALIZE'

//action creators
export const search = createAction(SEARCH, api.search);
export const initialize = createAction(INITIALIZE);

//initial state
const initialState = {
	size: 8,  //한 페이지의 결과 수
  totalElements: 0,
  content: [],
};

//reducer
export default handleActions(
	{
		...pender({
			type: SEARCH,
			onSuccess: (state, action) => {
				const { totalElements, content } = action.payload.data.data;
				return {
          ...state,
          // page: pageable.pageNumber,
          totalElements,
          content,
				};
			},
		}),
    [INITIALIZE]: (state, action) => initialState,
	},
	initialState,
);
