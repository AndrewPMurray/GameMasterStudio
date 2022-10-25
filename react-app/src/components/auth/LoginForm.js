import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
	const [errors, setErrors] = useState({});
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
	};

	const demoLogin = async () => {
		await dispatch(login('demo@aa.io', 'password'));
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
				backgroundImage: 'url(http://theelderwan.us.to:9000/gamemasterstudio/dragon.svg)',
				backgroundSize: '2400px',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className='login-container'>
				<form id='login-form' onSubmit={(e) => onLogin(e)}>
					<div id='errors-div'>
						{Object.keys(errors).length > 0 && (
							<div>Unable to log in with provided credentials</div>
						)}
					</div>
					<div id='login-form-field'>
						<label htmlFor='email'>Email</label>
						<input name='email' type='text' value={email} onChange={updateEmail} />
					</div>
					<div id='login-form-field'>
						<label htmlFor='password'>Password</label>
						<input
							name='password'
							type='password'
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
