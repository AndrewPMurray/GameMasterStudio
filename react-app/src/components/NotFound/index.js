import './NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div className='not-found-container'>
			<img
				id='not-found-image'
				src='https://gamemasterstudio.s3.us-east-2.amazonaws.com/notfound.jpg'
				alt='not-found'
			/>
			<p id='not-found-text'>
				Whatever you're looking for, adventurer, it cannot be found here
			</p>
			<Link to='/home'>Click here to turn back and go home</Link>
		</div>
	);
}
