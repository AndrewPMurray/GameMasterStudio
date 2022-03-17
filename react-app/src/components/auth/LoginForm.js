import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
	const history = useHistory();
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		setErrors([]);
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
			return;
		}
		if (!errors.length) history.push('/home');
	};

	console.log(errors);

	const demoLogin = async () => {
		await dispatch(login('demo@aa.io', 'password'));
		history.push('/home');
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (
		<div
			id='login-background'
			style={{
				backgroundImage: 'url(/images/login-logo.jpg)',
				backgroundSize: '2400px',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className='login-container'>
				<form id='login-form' onSubmit={(e) => onLogin(e)}>
					<div id='errors-div'>
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
					<div id='login-form-field'>
						<label htmlFor='email'>Email</label>
						<input
							name='email'
							type='text'
							placeholder='Email'
							value={email}
							onChange={updateEmail}
						/>
					</div>
					<div id='login-form-field'>
						<label htmlFor='password'>Password</label>
						<input
							name='password'
							type='password'
							placeholder='Password'
							value={password}
							onChange={updatePassword}
						/>
					</div>
					<div id='login-button-div'>
						<button id='login-button' type='submit'>
							Login
						</button>
						<div id='demo-button' onClick={demoLogin}>
							Demo
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
