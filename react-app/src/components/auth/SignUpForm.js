import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();

		const data = await dispatch(signUp(username, email, password));
		if (data) {
			setErrors(data);
			if (password !== repeatPassword)
				setErrors({ ...data, repeat_password: 'Passwords do not match' });
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (
		<div
			id='signup-background'
			style={{
				backgroundImage:
					'url(https://gamemasterstudio.s3.us-east-2.amazonaws.com/login-logo.jpg)',
				backgroundSize: '2400px',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className='signup-container'>
				<form id='signup-form' onSubmit={onSignUp}>
					<div id='signup-form-field'>
						<label>Username</label>
						{errors?.username && <p id='error'>{errors.username}</p>}
						<input
							type='text'
							name='username'
							onChange={updateUsername}
							value={username}
						></input>
					</div>
					<div id='signup-form-field'>
						<label>Email</label>
						{errors?.email && <p id='error'>{errors.email}</p>}
						<input
							type='text'
							name='email'
							onChange={updateEmail}
							value={email}
						></input>
					</div>
					<div id='signup-form-field'>
						<label>Password</label>
						{errors?.password && <p id='error'>{errors.password}</p>}
						<input
							type='password'
							name='password'
							onChange={updatePassword}
							value={password}
						></input>
					</div>
					<div id='signup-form-field'>
						<label>Confirm Password</label>
						{errors?.repeat_password && <p id='error'>{errors.repeat_password}</p>}
						<input
							type='password'
							name='repeat_password'
							onChange={updateRepeatPassword}
							value={repeatPassword}
						></input>
					</div>
					<button id='signup-button' type='submit'>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
