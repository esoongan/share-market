import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//action types
const TOGGLE_MODAL = 'base/TOGGLE_MODAL';
const TOGGLE_SNACKBAR = 'base/TOGGLE_SNACKBAR';
const HIDE_MODAL = 'base/HIDE_MODAL';
//action creators
export const hideModal = createAction(HIDE_MODAL);
export const toggleModal = createAction(TOGGLE_MODAL);
export const toggleSnackbar = createAction(TOGGLE_SNACKBAR);

//initial state
const initialState = {
	modals: {
		loginModal: false,
	},
	snackbars: {},
};

//reducer
export default handleActions(
	{
		[HIDE_MODAL]: (state, { payload: modal }) =>
			produce(state, draft => {
				draft.modals[modal] = false;
			}),
		[TOGGLE_MODAL]: (state, { payload: modal }) =>
			produce(state, draft => {
				draft.modals[modal] = !draft.modals[modal];
			}),
		[TOGGLE_SNACKBAR]: (state, { payload: snackbar }) =>
			produce(state, draft => {
				draft.snackbars[snackbar] = !draft.snackbars[snackbar];
			}),
	},
	initialState,
);
