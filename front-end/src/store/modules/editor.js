import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';

//action types
const WRITE_POST = 'editor/WRITE_POST';
const UPLOAD_FILES = 'editor/UPLOAD_FILES';
const EDIT_POST = 'editor/EDIT_POST';
const DELETE_FILE = 'editor/DELETE_FILE';

//action creators
export const writePost = createAction(WRITE_POST, api.writePost);
export const uploadFiles = createAction(UPLOAD_FILES, api.uploadFiles);
export const editPost = createAction(EDIT_POST, api.editPost);
export const deleteFile = createAction(DELETE_FILE, api.deleteFile);

//initial state
const initialState = {};

//reducer
export default handleActions({}, initialState);
