import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => (
	<button
		className={[classes.Button, classes[props.btnType]].join(' ')}
		onClick={props.onClickProps}
		type={props.types}
	>
		{props.children}
	</button>
);

export default Button;
