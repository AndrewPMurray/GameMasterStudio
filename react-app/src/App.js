import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import UserHome from './components/UserHome/';
import Landing from './components/Landing';
import CharacterForm from './components/CharacterForm';
import CampaignPage from './components/CampaignPage';
import Footer from './components/Footer';

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path='/' exact={true}>
					<Landing />
					<Footer />
				</Route>
				<Route path='/login' exact={true}>
					<LoginForm />
				</Route>
				<Route path='/sign-up' exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path='/characters/' exact={true}>
					<CharacterForm />
				</ProtectedRoute>
				<ProtectedRoute path='/characters/:characterId'>
					<CharacterForm />
				</ProtectedRoute>
				<ProtectedRoute path='/campaigns/:campaignId' exact={true}>
					<CampaignPage />
				</ProtectedRoute>
				<ProtectedRoute path='/home' exact={true}>
					<UserHome />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
