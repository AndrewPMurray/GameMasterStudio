import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './Landing.css';

const Landing = () => {
	const user = useSelector((state) => state.session.user);
	const history = useHistory();

	useEffect(() => {
		if (user) history.push('/home');
	}, [user, history]);

	return (
		<div className='landing-container fade-in-slide-up'>
			<h1 id='header'>Game Master Studio</h1>
			<h2>
				Create characters and campaigns to keep track of what happened in all of your
				sessions
			</h2>
			<img
				id='splash-image'
				src='https://gamemasterstudio.s3.us-east-2.amazonaws.com/splash-image.jpg'
				alt='splash'
			/>
			<p>
				Every NPC, every item of importance in your bag of holding, every action that
				chaotic-evil player ever performed. None of it needs to be forgotten. Here you can
				keep all of that information organized and accessible with the click of a button.
				There be dragons here. Best to keep track of them.
			</p>
			<p>
				<Link to='/sign-up'>Click here to sign up</Link>
			</p>
		</div>
	);
};

export default Landing;
