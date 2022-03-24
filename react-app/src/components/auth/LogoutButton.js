import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearCampaignState } from '../../store/campaigns';
import { clearCharacterState } from '../../store/characters';
import { clearSectionState } from '../../store/sections';
import { clearArticleState } from '../../store/articles';
import './auth.css';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const onLogout = async (e) => {
		await dispatch(clearCampaignState());
		await dispatch(clearCharacterState());
		await dispatch(clearSectionState());
		await dispatch(clearArticleState());
		await dispatch(logout());
		history.push('/');
	};

	return (
		<button id='logout-button' onClick={onLogout}>
			Logout
		</button>
	);
};

export default LogoutButton;
