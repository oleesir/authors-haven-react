import React, { useReducer } from 'react';
import ModalContext from './ModalContext';
import modalReducer from './ModalReducer';
import { SET_MODAL, REMOVE_MODAL } from '../../types';
import { SIGNUP_MODAL } from './ModalType';
import Signup from '../../pages/modals/signup/Signup';

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
