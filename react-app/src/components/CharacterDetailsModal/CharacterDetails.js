import { Link } from 'react-router-dom';

import './CharacterDetails.css';

const CharacterDetails = ({ setShowModal, character, user }) => {
	return (
		<div className='character-details-container'>
			<p
				style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }}
				onClick={() => setShowModal(false)}
			>
				X
			</p>
			{character.user.id === user.id && (
				<Link to={`/characters/${character.id}`} id='edit-character-button'>
					Edit your character
				</Link>
			)}
			<div id='character-details'>
				<h2>Character Details</h2>
				<p>
					Name:{' '}
					{character.name.length > 60
						? `${character.name.slice(0, 60)}...`
						: character.name}
				</p>
				<p>
					Race:{' '}
					{character.race.length > 60
						? `${character.race.slice(0, 60)}...`
						: character.race}
				</p>
				<p>
					Class:{' '}
					{character.class_name.length > 60
						? `${character.class_name.slice(0, 60)}...`
						: character.class_name}
				</p>
				<p>Biography: </p>
				<pre id='details-biography'>
					{character.biography.length > 0
						? character.biography
						: 'This character is a mystery. No biography available.'}
				</pre>
			</div>
		</div>
	);
};

export default CharacterDetails;
