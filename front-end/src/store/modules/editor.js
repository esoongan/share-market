import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

//action types
const WRITE_POST = 'editor/WRITE_POST';
const UPLOAD_FILES = 'editor/UPLOAD_FILES';
const TOGGLE_EDIT_MODE = 'editor/TOGGLE_EDIT_MODE';	//이미 작성한 게시물 수정하는 모드로 전환
const EDIT_POST = 'editor/EDIT_POST';
const EDIT_FILES = 'editor/EDIT_FILES';

//action creators
export const writePost = createAction(WRITE_POST, api.writePost);
export const uploadFiles = createAction(UPLOAD_FILES, api.uploadFiles);
export const toggleEditMode = createAction(TOGGLE_EDIT_MODE)
export const editPost = createAction(EDIT_POST, api.editPost);
export const editFiles = createAction(EDIT_FILES, api.editFiles);


//initial state
const initialState = {
	post_id: null,
	editMode: false,
};

//reducer
export default handleActions(
	{
		[TOGGLE_EDIT_MODE]: (state, action) =>{
			const on = action.payload;
			return {...state, editMode:on}
		},
		...pender(
			{
				type: WRITE_POST,
				onSuccess: (state, action) => {
					const { id } = action.payload.data;
					return {
						...state,
						post_id: id,
					};
				},
			},
		),
	},
	initialState,
);
