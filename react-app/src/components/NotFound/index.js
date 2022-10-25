import './NotFound.css';
import { Link } from 'react-router-dom';
import { getDomain } from '../../util/getDomain';

export default function NotFound() {
	const domain = getDomain();

	return (
		<div className='not-found-container'>
			<img id='not-found-image' src={`${domain}notfound.jpg`} alt='not-found' />
			<p id='not-found-text'>
				Whatever you're looking for, adventurer, it cannot be found here
			</p>
			<Link to='/home'>Click here to turn back and go home</Link>
		</div>
	);
}
