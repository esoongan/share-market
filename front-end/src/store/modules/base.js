import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//action types
const TOGGLE_MODAL = 'base/TOGGLE_MODAL';
const TOGGLE_SNACKBAR = 'base/TOGGLE_SNACKBAR';
//action creators
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

		[TOGGLE_MODAL]: (state, { payload }) =>{
			const {modal, visible} = payload;
			return produce(state, draft => {
				draft.modals[modal] = visible;
			})},
		[TOGGLE_SNACKBAR]: (state, { payload: snackbar }) =>
			produce(state, draft => {
				draft.snackbars[snackbar] = !draft.snackbars[snackbar];
			}),
	},
	initialState,
);
