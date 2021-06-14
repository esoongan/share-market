import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';

//action types
const WRITE_POST = 'editor/WRITE_POST';
const UPLOAD_FILES = 'editor/UPLOAD_FILES';
const EDIT_POST = 'editor/EDIT_POST';
const EDIT_FILES = 'editor/EDIT_FILES';

//action creators
export const writePost = createAction(WRITE_POST, api.writePost);
export const uploadFiles = createAction(UPLOAD_FILES, api.uploadFiles);
export const editPost = createAction(EDIT_POST, api.editPost);
export const editFiles = createAction(EDIT_FILES, api.editFiles);

//initial state
const initialState = {};

//reducer
export default handleActions({}, initialState);
