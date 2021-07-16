import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser as loadUserAction } from '../redux/actions/authAction.js';

export const PrivateRoute = ({
	component: Component,
	isAuthenticated,
	isLoading,
	loadUser,
	...rest
}) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			await loadUser();
			setLoading(false);
		};
		load();
	}, []);

	if (loading) {
		// create loading component
		return <h1>LOADING...</h1>;
	}
	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated ? <Redirect to='/auth' /> : <Component {...props} />
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state?.auth?.isAuthenticated,
	isLoading: state?.auth?.isLoading,
});

export default connect(mapStateToProps, {
	loadUser: loadUserAction,
})(PrivateRoute);
