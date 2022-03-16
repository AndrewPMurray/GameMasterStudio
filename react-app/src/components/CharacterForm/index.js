import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CharacterForm.css';

const CharacterForm = () => {
	const { characterId } = useParams() || null;
	// todo: set character once store set up
	const character = null;
	const user = useSelector((state) => state.session.user);

	const type = '5e';
	const [name, setName] = useState(character?.name || '');
	const [className, setClassName] = useState(character?.class_name || '');
	const [level, setLevel] = useState(character?.level || 1);
	const [background, setBackground] = useState(character?.background || '');
	const [race, setRace] = useState(character?.race || '');
	const [alignment, setAlignment] = useState(character?.alignment || '');
	const [experience, setExperience] = useState(character?.experience || 0);
	const [strength, setStrength] = useState(character?.strength || 0);
	const [dexterity, setDexterity] = useState(character?.dexterity || 0);
	const [constitution, setConstitution] = useState(character?.constitution || 0);
	const [intelligence, setIntelligence] = useState(character?.intelligence || 0);
	const [wisdom, setWisdom] = useState(character?.wisdom || 0);
	const [charisma, setCharisma] = useState(character?.charisma || 0);
	const [armorClass, setArmorClass] = useState(character?.armor_class || 0);
	const [speed, setSpeed] = useState(character?.speed || 0);
	const [maxHP, setMaxHP] = useState(character?.max_hp || 0);
	const [currentHP, setCurrentHP] = useState(character?.current_hp || 0);
	const [temporaryHP, setTemporaryHP] = useState(character?.temporary_hp || 0);
	const [hitDiceTotal, setHitDiceTotal] = useState(character?.hit_dice_total || 0);
	const [hitDice, setHitDice] = useState(character?.hit_dice || 0);
	const [weapons, setWeapons] = useState({});
	const [equipment, setEquipment] = useState({});
	const [goldPieces, setGoldPieces] = useState(character?.gold_pieces || 0);
	const [silverPieces, setSilverPieces] = useState(character?.gold_pieces || 0);
	const [copperPieces, setCopperPieces] = useState(character?.gold_pieces || 0);
	const [features, setFeatures] = useState({});
	const [bio, setBio] = useState(character?.biography || '');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Todo: Set logic for adding weapons, equipment, and features to object for JSON stringification

		const newCharacter = {
			name,
			type,
			class_name: className,
			level: +level,
			background,
			race,
			alignment,
			experience,
			strength,
			dexterity,
			constitution,
			intelligence,
			wisdom,
			charisma,
			armor_class: armorClass,
			speed,
			max_hp: maxHP,
			current_hp: currentHP,
			temporary_hp: temporaryHP,
			hit_dice_total: hitDiceTotal,
			hit_dice: hitDice,
			weapons: JSON.stringify(weapons),
			equipment: JSON.stringify(equipment),
			gold_pieces: goldPieces,
			silver_pieces: silverPieces,
			copper_pieces: copperPieces,
			features: JSON.stringify(features),
			biography: bio,
			user_id: user.id,
		};

		// Todo: set up character store with logic to send payload to backend to add to db and handle errors.
		// Just print to console for now
		console.log(newCharacter);
	};

	return (
		<div className='character-form-container'>
			<div id='character-header-container'>
				<div id='character-name-container'>
					<img alt='DnD Logo' />
					<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
					<p>Character Name</p>
				</div>
				<div id='character-sheet-header'>
					<div id='class-level-background'>
						<label>
							<input
								type='text'
								value={className}
								onChange={(e) => setClassName(e.target.value)}
							/>
							<p>Class</p>
						</label>
						<label>
							<input
								type='text'
								value={level}
								onChange={(e) => setLevel(e.target.value)}
							/>
							<p>Level</p>
						</label>
						<label>
							<input
								type='text'
								value={background}
								onChange={(e) => setBackground(e.target.value)}
							/>
							<p>Background</p>
						</label>
					</div>
					<div id='race-alignment-experience'></div>
				</div>
			</div>
			<div id='character-sheet'>
				<div id='sheet-left'>
					<div id='attributes-skills'>
						<div id='attributes'></div>
						<div id='skills-and-throws'></div>
					</div>
					<div id='passive-perception'></div>
				</div>
				<div id='sheet-middle'>
					<div id='hp-weapons'>
						<div id='armor-initiative-speed'></div>
						<div id='hit-dice-death-saves'></div>
						<div id='money'></div>
					</div>
				</div>
				<div id='sheet-right'>
					<div id='features'></div>
				</div>
			</div>
		</div>
	);
};

export default CharacterForm;
