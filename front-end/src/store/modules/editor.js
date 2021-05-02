import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

//action types
const WRITE_POST = 'editor/WRITE_POST';
const UPLOAD_FILES = 'editor/UPLOAD_FILES';

//action creators
export const writePost = createAction(WRITE_POST, api.writePost);
export const uploadFiles = createAction(UPLOAD_FILES, api.uploadFiles);

//initial state
const initialState = {
	post_id: null,
};

//reducer
export default handleActions(
	{
		...pender(
			{
				type: WRITE_POST,
				onSuccess: (state, action) => {
					const { id } = action.payload.data;
					console.log(action);
					return {
						...state,
						post_id: id,
					};
				},
				onError: (state, action) => {
					console.log('WRITE_POST onError', action);
					return state;
				},
			},
			{
				type: UPLOAD_FILES,
				onError: (state, action) => {
					console.log('UPLOAD_FILES onError', action);
					return state;
				},
			},
		),
	},
	initialState,
);
