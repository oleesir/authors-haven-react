import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/UI/Button/Button';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import ModalContext from '../../../context/Modal/ModalContext';
import {
	login as loginAction,
	loadUser as loadUserAction,
	clearErrors as clearErrorsAction,
} from '../../../redux/actions/authAction.js';
import classes from './Login.module.scss';

export const Login = ({ login, error, clearErrors }) => {
	const modalContext = useContext(ModalContext);
	const { showModal, removeModal } = modalContext;

	const clearFormError = () => {
		removeModal();
		clearErrors();
	};

	const formik = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Invalid email address')
				.required('Email is required'),
			password: Yup.string()
				.min(8, 'Password should be be at least 8 characters')
				.required('Password is required'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);
			await login(values, () => {
				setSubmitting(false);
				clearFormError(),
					() => {
						setSubmitting(false);
					};
			});
		},
	});

	const handleChange = (event) => {
		clearErrors();
		return formik.handleChange(event);
	};

	return (
		<>
			<Backdrop showModal={showModal} removeModal={clearFormError} />
			<div className={classes.signup}>
				<img
					className={classes.close}
					src='/src/images/closed.svg'
					onClick={clearFormError}
				/>
				<div className={classes.loginContent}>
					<div className={classes.Messages}>
						<div className={classes.leftMessage}>
							<p className={classes.leftMessageOne}>Share your stories</p>
							<p className={classes.leftMessageTwo}>Welcome</p>
							<p className={classes.leftMessageThree}>
								Sign into your account to serve you more personalized stories
								from creatives.
							</p>
						</div>
					</div>

					<div className={classes.loginForm}>
						<p className={classes.select}>Select one to get started</p>
						<div className={classes.social}>
							<a>
								<img
									src='/src/images/google.svg'
									className={classes.socialIcon}
								/>
							</a>
							<a>
								<img
									src='/src/images/twitter.svg'
									className={classes.socialIcon}
								/>
							</a>
							<a>
								<img
									src='/src/images/facebook.svg'
									className={classes.socialIcon}
								/>
							</a>
						</div>

						{error?.form && (
							<div data-testid='loginFormError' className={classes.errors}>
								{error?.form}
							</div>
						)}

						<form
							onSubmit={formik.handleSubmit}
							className={classes.theForm}
							data-testid='form'
						>
							<div className={classes.formContent}>
								<input
									id='email'
									name='email'
									type='email'
									placeholder='Email'
									onChange={handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
									data-testid='loginFieldEmail'
								/>
								{formik.touched.email && (formik.errors.email || error?.email) && (
									<span
										data-testid='loginFieldEmailError'
										className={classes.errors}
									>
										{formik.errors.email || error?.email}
									</span>
								)}

								<input
									id='password'
									name='password'
									type='password'
									placeholder='Password'
									onChange={handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.password}
									data-testid='loginFieldPassword'
								/>
								{formik.touched.password &&
									(formik.errors.password || error?.password) && (
										<span
											data-testid='loginFieldPasswordError'
											className={classes.errors}
										>
											{formik.errors.password || error?.password}
										</span>
									)}
							</div>

							<div className={classes.signupButton}>
								<Button
									btnType='authBtn'
									types='submit'
									disabled={formik.isSubmitting}
								>
									Login
								</Button>
							</div>
						</form>
						<p className={classes.already}>Don't have an account? Signup`</p>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	error: state?.auth?.error,
	isAuthenticated: state?.auth?.isAuthenticated,
});

const mapDispatchToProps = {
	login: loginAction,
	loadUser: loadUserAction,
	clearErrors: clearErrorsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
