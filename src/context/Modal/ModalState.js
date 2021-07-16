import React, { useReducer } from 'react';
import ModalContext from './ModalContext';
import modalReducer from './ModalReducer';
import Signup from '../../pages/modals/signup/Signup.jsx';
import Login from '../../pages/modals/login/Login.jsx';
import {
	SIGNUP_MODAL,
	LOGIN_MODAL,
	SET_MODAL,
	REMOVE_MODAL,
} from './ModalType';

const ModalState = (props) => {
	const initialState = {
		showModal: false,
		modal: null,
	};

	const [state, dispatch] = useReducer(modalReducer, initialState);

	const setModal = (modal) => {
		dispatch({
			type: SET_MODAL,
			payload: modal,
		});
	};

	const removeModal = () => {
		dispatch({ type: REMOVE_MODAL });
	};

	const renderModal = (modal) => {
		switch (modal) {
			case SIGNUP_MODAL:
				return <Signup />;
			case LOGIN_MODAL:
				return <Login />;
			default:
				return null;
		}
	};

	return (
		<ModalContext.Provider
			value={{
				showModal: state.showModal,
				modal: state.modal,
				setModal,
				removeModal,
			}}
		>
			{props.children}
			{renderModal(state.modal)}
		</ModalContext.Provider>
	);
};

export default ModalState;
