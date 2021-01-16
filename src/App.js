import React from 'react';
import Home from '../src/pages/home/Home';
import Aux from '../hoc/Aux.js';
import ModalState from './context/Modal/ModalState';

const App = () => (
	<Aux>
		<ModalState>
			<Home />
		</ModalState>
	</Aux>
);

export default App;
