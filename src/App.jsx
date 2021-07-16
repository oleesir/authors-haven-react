import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthPage from './pages/authPage/AuthPage.jsx';
import Home from './pages/home/Home';
import PrivateRoute from './routing/PrivateRoute';
import ModalState from './context/Modal/ModalState';

const App = () => {
	return (
		<Router>
			<ModalState>
				<Switch>
					<Route path='/auth' component={AuthPage} />
					<PrivateRoute path='/home' component={Home} />
				</Switch>
			</ModalState>
		</Router>
	);
};

export default App;
