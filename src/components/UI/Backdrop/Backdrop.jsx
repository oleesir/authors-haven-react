import React from 'react';
import classes from './Backdrop.module.scss';

const Backdrop = ({ showModal, removeModal }) =>
	showModal ? <div className={classes.backDrop} onClick={removeModal} /> : null;

export default Backdrop;
