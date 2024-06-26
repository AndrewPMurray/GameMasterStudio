import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserHome from './components/UserHome/';
import Landing from './components/Landing';
import CharacterForm from './components/CharacterForm';
import CampaignPage from './components/CampaignPage';
import Footer from './components/Footer';
import SectionPage from './components/SectionPage';
import ArticlePage from './components/ArticlePage';
import ArticleForm from './components/ArticleForm';
import NotFound from './components/NotFound';

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
				<ProtectedRoute path='/home' exact={true}>
					<UserHome />
				</ProtectedRoute>
				<ProtectedRoute path='/characters/' exact={true}>
					<CharacterForm />
				</ProtectedRoute>
				<ProtectedRoute path='/characters/:characterId'>
					<CharacterForm />
				</ProtectedRoute>
				<ProtectedRoute path='/campaigns/:campaignId' exact={true}>
					<CampaignPage />
				</ProtectedRoute>
				<ProtectedRoute path='/campaigns/:campaignId/:sectionId' exact={true}>
					<SectionPage />
				</ProtectedRoute>
				<ProtectedRoute
					path='/campaigns/:campaignId/:sectionId/:articleId(\d+)'
					exact={true}
				>
					<ArticlePage />
				</ProtectedRoute>
				<ProtectedRoute path='/campaigns/:campaignId/:sectionId/new-article' exact={true}>
					<ArticleForm />
				</ProtectedRoute>
				<ProtectedRoute
					path='/campaigns/:campaignId/:sectionId/:articleId(\d+)/edit'
					exact={true}
				>
					<ArticleForm />
				</ProtectedRoute>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
