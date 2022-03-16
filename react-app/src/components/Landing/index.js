import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useShowHide } from '../../context/ShowHide';

import './Landing.css';

const Landing = () => {
	const user = useSelector((state) => state.session.user);
	const history = useHistory();

	useEffect(() => {
		if (user.length) history.push('/home');
	}, [user]);

	return <h1>GameMasterStudio</h1>;
};

export default Landing;
