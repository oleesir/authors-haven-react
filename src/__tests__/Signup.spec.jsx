import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, act } from '@testing-library/react';
import { fireEvent, getByTestId } from '@testing-library/dom';
import axios from '../../axios';
import Signup from '../pages/modals/signup/Signup';
import ModalState from '../context/Modal/ModalState';
import { getStore } from '../store';

let mockPost;

jest.mock('axios', () => {
	mockPost = jest.fn();
	const realAxios = jest.requireActual('axios');

	return {
		...realAxios,
		create: jest.fn().mockImplementation((config) => ({
			...realAxios.create(config),
			post: mockPost,
		})),
		post: mockPost,
	};
});

const startingState = {
	auth: {
		user: null,
		isLoading: false,
		isAuthenticated: false,
		error: null,
	},
};

const renderWithRedux = (component, initialState = startingState) => {
	const store = getStore(initialState);

	return render(<Provider store={store}>{component}</Provider>);
};

it('renders signup form correctly', () => {
	const { container } = renderWithRedux(
		<ModalState>
			<Signup />
		</ModalState>,
	);
	expect(getByTestId(container, 'form')).toBeVisible();
	expect(getByTestId(container, 'signupFieldFN')).toBeInTheDocument();
	expect(getByTestId(container, 'signupFieldLN')).toBeInTheDocument();
	expect(getByTestId(container, 'signupFieldEmail')).toBeInTheDocument();
	expect(getByTestId(container, 'signupFieldPassword')).toBeInTheDocument();
	expect(container.firstChild).toMatchSnapshot();
});

it('should validate firstname input field', async () => {
	const { getByTestId, queryByTestId } = renderWithRedux(
		<ModalState>
			<Signup />
		</ModalState>,
	);

	const firstNameInput = getByTestId('signupFieldFN');
	expect(queryByTestId('signupFieldFNError')).toBeNull();

	await act(async () => {
		await fireEvent.change(firstNameInput, { target: { value: '' } });
		await fireEvent.blur(firstNameInput);
	});

	await waitFor(async () => {
		expect(getByTestId('signupFieldFNError')).toBeInTheDocument();
		expect(getByTestId('signupFieldFNError').innerHTML).toEqual(
			'First name is required',
		);
	});

	await act(async () => {
		await fireEvent.change(firstNameInput, { target: { value: 22 } });
		await fireEvent.blur(firstNameInput);
	});

	await waitFor(async () => {
		expect(getByTestId('signupFieldFNError')).toBeInTheDocument();
		expect(getByTestId('signupFieldFNError').innerHTML).toEqual(
			'First name must contain only letters',
		);
	});

	await act(async () => {
		await fireEvent.change(firstNameInput, { target: { value: 'N' } });
		await fireEvent.blur(firstNameInput);
	});

	await waitFor(async () => {
		expect(getByTestId('signupFieldFNError')).toBeInTheDocument();
		expect(getByTestId('signupFieldFNError').innerHTML).toEqual(
			'First name should be at least 2 characters',
		);
	});

	await act(async () => {
		await fireEvent.change(firstNameInput, { target: { value: 'Olisa' } });
		await fireEvent.blur(firstNameInput);
	});

	await waitFor(async () => {
		expect(queryByTestId('signupFieldFNError')).toBeNull();
	});
});

it('should validate lastname input field', async () => {
	const { getByTestId, queryByTestId } = renderWithRedux(
		<ModalState>
			<Signup />
		</ModalState>,
	);
	const lastNameInput = getByTestId('signupFieldLN');

	expect(queryByTestId('signupFieldLNError')).toBeNull();

	await act(async () => {
		await fireEvent.change(lastNameInput, { target: { value: '' } });
		await fireEvent.blur(lastNameInput);
	});

	await waitFor(async () => {
		expect(getByTestId('signupFieldLNError')).toBeInTheDocument();
		expect(getByTestId('signupFieldLNError').innerHTML).toEqual(
			'Last name is required',
		);
	});

	await act(async () => {
		await fireEvent.change(lastNameInput, { target: { value: 22 } });
		await fireEvent.blur(lastNameInput);
	});

	await waitFor(async () => {
		expect(getByTestId('signupFieldLNError')).toBeInTheDocument();
		expect(getByTestId('signupFieldLNError').innerHTML).toEqual(
			'Last name must contain only letters',
		);
	});

	await act(async () => {
		await fireEvent.change(lastNameInput, { target: { value: 'N' } });
		await fireEvent.blur(lastNameInput);
	});

	await waitFor(async () => {
		expect(getByTestId('signupFieldLNError')).toBeInTheDocument();
		expect(getByTestId('signupFieldLNError').innerHTML).toEqual(
			'Last name should be at least 2 characters',
		);
	});

	await act(async () => {
		await fireEvent.change(lastNameInput, { target: { value: 'Name' } });
		await fireEvent.blur(lastNameInput);
	});

	await waitFor(async () => {
		expect(queryByTestId('signupFieldLNError')).toBeNull();
	});
});

it('should validate email input field', async () => {
	const { getByTestId, queryByTestId } = renderWithRedux(
		<ModalState>
			<Signup />
		</ModalState>,
	);
	const emailInput = getByTestId('signupFieldEmail');
	expect(queryByTestId('signupFieldEmailError')).toBeNull();

	await act(async () => {
		await fireEvent.change(emailInput, { target: { value: '' } });
		await fireEvent.blur(emailInput);
	});

	await waitFor(() => {
		expect(getByTestId('signupFieldEmailError')).toBeInTheDocument();
		expect(getByTestId('signupFieldEmailError').innerHTML).toEqual(
			'Email is required',
		);
	});

	await act(async () => {
		await fireEvent.change(emailInput, { target: { value: 'help.com' } });
		await fireEvent.blur(emailInput);
	});

	await waitFor(() => {
		expect(getByTestId('signupFieldEmailError')).toBeInTheDocument();
		expect(getByTestId('signupFieldEmailError').innerHTML).toEqual(
			'Invalid email address',
		);
	});

	await act(async () => {
		await fireEvent.change(emailInput, { target: { value: 'help@gil.com' } });
		await fireEvent.blur(emailInput);
	});

	await waitFor(async () => {
		expect(queryByTestId('signupFieldEmailError')).toBeNull();
	});
});

it('should validate password input field', async () => {
	const { getByTestId, queryByTestId } = renderWithRedux(
		<ModalState>
			<Signup />
		</ModalState>,
	);
	const passwordInput = getByTestId('signupFieldPassword');
	expect(queryByTestId('signupFieldPasswordError')).toBeNull();

	await act(async () => {
		await fireEvent.change(passwordInput, { target: { value: '' } });
		await fireEvent.blur(passwordInput);
	});

	await waitFor(() => {
		expect(getByTestId('signupFieldPasswordError')).toBeInTheDocument();
		expect(getByTestId('signupFieldPasswordError').innerHTML).toEqual(
			'Password is required',
		);
	});

	await act(async () => {
		await fireEvent.change(passwordInput, { target: { value: 'qwerty' } });
		await fireEvent.blur(passwordInput);
	});

	await waitFor(() => {
		expect(getByTestId('signupFieldPasswordError')).toBeInTheDocument();
		expect(getByTestId('signupFieldPasswordError').innerHTML).toEqual(
			'Password should be be at least 8 characters',
		);
	});

	await act(async () => {
		await fireEvent.change(passwordInput, {
			target: { value: 'qwertyuiopas' },
		});
		await fireEvent.blur(passwordInput);
	});

	await waitFor(async () => {
		expect(queryByTestId('signupFieldPasswordError')).toBeNull();
	});
});

it('should submit a validated form', async () => {
	const { getByTestId, getByText, queryByTestId } = renderWithRedux(
		<ModalState>
			<Signup />
		</ModalState>,
	);

	mockPost.mockResolvedValueOnce({
		data: {
			data: {
				firstName: 'test',
				lastName: 'test',
				email: 'test@test.com',
			},
		},
	});

	const firstNameInput = getByTestId('signupFieldFN');
	const lastNameInput = getByTestId('signupFieldLN');
	const emailInput = getByTestId('signupFieldEmail');
	const passwordInput = getByTestId('signupFieldPassword');
	const submitBtn = getByText(/signup/i);

	expect(queryByTestId('signupFormSuccess')).toBeNull();

	await act(async () => {
		await fireEvent.change(firstNameInput, {
			target: { value: 'Hello' },
		});
		await fireEvent.blur(firstNameInput);

		await fireEvent.change(lastNameInput, {
			target: { value: 'World' },
		});
		await fireEvent.blur(lastNameInput);

		await fireEvent.change(emailInput, {
			target: { value: 'hello@gnail.com' },
		});
		await fireEvent.blur(emailInput);

		await fireEvent.change(passwordInput, {
			target: { value: 'Helloqwewrtty' },
		});
		await fireEvent.blur(passwordInput);

		await fireEvent.click(submitBtn);
	});

	await waitFor(() => {
		expect(queryByTestId('signupFormError')).toBeNull();
		expect(getByTestId('signupFormSuccess')).toBeInTheDocument();
		expect(getByTestId('signupFormSuccess').innerHTML).toEqual(
			'Please check your email to confirm',
		);
		expect(axios.post).toHaveBeenCalledTimes(1);

		axios.post.mockReset();
	});
});

it('should show a form error when submit fails', async () => {
	const { getByTestId, getByText, queryByTestId, container } = renderWithRedux(
		<ModalState>
			<Signup />
		</ModalState>,
	);

	mockPost.mockRejectedValueOnce({
		response: { data: { error: 'User with that email already exists' } },
	});

	const firstNameInput = getByTestId('signupFieldFN');
	const lastNameInput = getByTestId('signupFieldLN');
	const emailInput = getByTestId('signupFieldEmail');
	const passwordInput = getByTestId('signupFieldPassword');
	const submitBtn = getByText(/signup/i);

	expect(queryByTestId('signupFormError')).toBeNull();

	await act(async () => {
		await fireEvent.change(firstNameInput, {
			target: { value: 'Hello' },
		});
		await fireEvent.blur(firstNameInput);

		await fireEvent.change(lastNameInput, {
			target: { value: 'World' },
		});
		await fireEvent.blur(lastNameInput);

		await fireEvent.change(emailInput, {
			target: { value: 'hello@gnail.com' },
		});
		await fireEvent.blur(emailInput);

		await fireEvent.change(passwordInput, {
			target: { value: 'Helloqwewrtty' },
		});
		await fireEvent.blur(passwordInput);

		await fireEvent.click(submitBtn);
	});

	await waitFor(() => {
		expect(queryByTestId('signupFormSuccess')).toBeNull();
		expect(getByTestId('signupFormError')).toBeInTheDocument();
		expect(getByTestId('signupFormError').innerHTML).toEqual(
			'User with that email already exists',
		);
		expect(axios.post).toHaveBeenCalledTimes(1);
	});
});
