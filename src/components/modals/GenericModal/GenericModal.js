import React from 'react';

const GenericModal = ({ children, closeModal }) => {
	return (
		<>
			<div className={classes.BackDrop} onClick={closeModal} />
		</>
	);
};

export default GenericModal;
