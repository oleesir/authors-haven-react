import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Aux from '../../../../hoc/Aux';
import Button from '../../../components/UI/Button/Button';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import ModalContext from '../../../context/Modal/ModalContext';
import {
	signup as signupAction,
	clearErrors as clearErrorsAction,
} from '../../../redux/actions/authAction';
import classes from './Signup.module.scss';

export const Signup = ({ signup, error, clearErrors }) => {
	const modalContext = useContext(ModalContext);
	const { showModal, removeModal } = modalContext;
	const [message, setMessage] = useState('');

	const clearFormError = () => {
		removeModal();
		clearErrors();
	};

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.min(2, 'First name should be at least 2 characters')
				.matches(/^[A-Z\s]*$/i, 'First name must contain only letters')
				.required('First name is required'),
			lastName: Yup.string()
				.min(2, 'Last name should be at least 2 characters')
				.matches(/^[A-Z\s]*$/i, 'Last name must contain only letters')
				.required('Last name is required'),
			email: Yup.string()
				.email('Invalid email address')
				.required('Email is required'),
			password: Yup.string()
				.min(8, 'Password should be be at least 8 characters')
				.required('Password is required'),
		}),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			setSubmitting(true);

			await signup(
				values,
				() => {
					setMessage('Please check your email to confirm');
					setSubmitting(false);
					resetForm();
				},
				() => {
					setSubmitting(false);
				},
			);
		},
	});

	const handleChange = (event) => {
		clearErrors();
		setMessage('');
		return formik.handleChange(event);
	};

	return (
		<Aux>
			<Backdrop showModal={showModal} removeModal={clearFormError} />

			<div className={classes.signup}>
				<img
					className={classes.close}
					src='/src/images/closed.svg'
					onClick={clearFormError}
				/>
				<div className={classes.signupContent}>
					<div className={classes.Messages}>
						<div className={classes.leftMessage}>
							<p className={classes.leftMessageOne}>Share your stories</p>
							<p className={classes.leftMessageTwo}>Create your free Account</p>
							<p className={classes.leftMessageThree}>
								Sign into your account to serve you more personalized stories
								from creatives.
							</p>
						</div>
					</div>

					<div className={classes.signupForm}>
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

						{message && (
							<div className={classes.success} data-testid='signupFormSuccess'>
								{message}
							</div>
						)}

						{error?.form && (
							<div data-testid='signupFormError' className={classes.errors}>
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
									id='firstName'
									name='firstName'
									type='text'
									placeholder='Firstname'
									onChange={handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName}
									data-testid='signupFieldFN'
								/>
								{formik.touched.firstName &&
									(formik.errors.firstName || error?.firstName) && (
										<span
											data-testid='signupFieldFNError'
											className={classes.errors}
										>
											{formik.errors.firstName || error?.firstName}
										</span>
									)}

								<input
									id='lastName'
									name='lastName'
									type='text'
									placeholder='Lastname'
									onChange={handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.lastName}
									data-testid='signupFieldLN'
								/>
								{formik.touched.lastName &&
									(formik.errors.lastName || error?.lastName) && (
										<span
											data-testid='signupFieldLNError'
											className={classes.errors}
										>
											{formik.errors.lastName || error?.lastName}
										</span>
									)}

								<input
									id='email'
									name='email'
									type='email'
									placeholder='Email'
									onChange={handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
									data-testid='signupFieldEmail'
								/>
								{formik.touched.email && (formik.errors.email || error?.email) && (
									<span
										data-testid='signupFieldEmailError'
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
									data-testid='signupFieldPassword'
								/>
								{formik.touched.password &&
									(formik.errors.password || error?.password) && (
										<span
											data-testid='signupFieldPasswordError'
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
									Signup
								</Button>
							</div>
						</form>
						<p className={classes.already}>Already have an account? Login.</p>
					</div>
				</div>
			</div>
		</Aux>
	);
};

const mapStateToProps = (state) => ({
	error: state?.auth?.error,
});

const mapDispatchToProps = {
	signup: signupAction,
	clearErrors: clearErrorsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
