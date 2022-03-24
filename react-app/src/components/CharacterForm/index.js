import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addCharacter, getCharacters, updateCharacter } from '../../store/characters';
import './CharacterForm.css';
import Money from './Money';

const CharacterForm = () => {
	const { characterId } = useParams();
	const user = useSelector((state) => state.session.user);
	const character = useSelector((state) => state.characters[characterId]);
	const dispatch = useDispatch();
	const history = useHistory();
	const [errors, setErrors] = useState({});

	const type = '5e';
	const [name, setName] = useState('');
	const [className, setClassName] = useState('');
	const [level, setLevel] = useState(1);
	const [background, setBackground] = useState('');
	const [race, setRace] = useState('');
	const [alignment, setAlignment] = useState('');
	const [experience, setExperience] = useState(0);
	const [strength, setStrength] = useState(0);
	const [dexterity, setDexterity] = useState(0);
	const [constitution, setConstitution] = useState(0);
	const [intelligence, setIntelligence] = useState(0);
	const [wisdom, setWisdom] = useState(0);
	const [charisma, setCharisma] = useState(0);
	const [armorClass, setArmorClass] = useState(0);
	const [speed, setSpeed] = useState(0);
	const [maxHP, setMaxHP] = useState(0);
	const [currentHP, setCurrentHP] = useState(0);
	const [temporaryHP, setTemporaryHP] = useState(0);
	const [hitDiceTotal, setHitDiceTotal] = useState(0);
	const [hitDice, setHitDice] = useState(0);
	const [weapons, setWeapons] = useState([]);
	const [weaponFields, setWeaponFields] = useState(1);
	const [equipment, setEquipment] = useState([]);
	const [equipmentFields, setEquipmentFields] = useState(1);
	const [goldPieces, setGoldPieces] = useState(0);
	const [silverPieces, setSilverPieces] = useState(0);
	const [copperPieces, setCopperPieces] = useState(0);
	const [features, setFeatures] = useState([]);
	const [featureFields, setFeatureFields] = useState(0);
	const [activeFeature, setActiveFeature] = useState(-1);
	const [bio, setBio] = useState('');

	const [page, setPage] = useState(1);

	const modifiers = {
		strength: strength >= 0 && strength <= 30 ? Math.floor(strength / 2) - 5 : 0,
		dexterity: dexterity >= 0 && dexterity <= 30 ? Math.floor(dexterity / 2) - 5 : 0,
		constitution:
			constitution >= 0 && constitution <= 30 ? Math.floor(constitution / 2) - 5 : 0,
		intelligence:
			intelligence >= 0 && intelligence <= 30 ? Math.floor(intelligence / 2) - 5 : 0,
		wisdom: wisdom >= 0 && wisdom <= 30 ? Math.floor(wisdom / 2) - 5 : 0,
		charisma: charisma >= 0 && charisma <= 30 ? Math.floor(charisma / 2) - 5 : 0,
	};

	useEffect(() => {
		dispatch(getCharacters(user?.id)).then((res) => {
			if (!characterId) return;
			let characterExists = false;
			res.every((char) => {
				if (char.id === +characterId) {
					characterExists = true;
					return false;
				}
				return true;
			});
			if (!characterExists) history.push('/not-found');
		});
	}, [dispatch, user, history, user?.id, characterId]);

	useEffect(() => {
		if (character) {
			setName(character.name || '');
			setClassName(character.class_name || '');
			setLevel(character.level || 1);
			setBackground(character.background || '');
			setRace(character.race || '');
			setAlignment(character.alignment || '');
			setExperience(character.experience || 0);
			setStrength(character.strength || 0);
			setDexterity(character.dexterity || 0);
			setConstitution(character.constitution || 0);
			setIntelligence(character.intelligence || 0);
			setWisdom(character.wisdom || 0);
			setCharisma(character.charisma || 0);
			setArmorClass(character.armor_class || 0);
			setSpeed(character.speed || 0);
			setMaxHP(character.max_hp || 0);
			setCurrentHP(character.current_hp || 0);
			setTemporaryHP(character.temporary_hp || 0);
			setHitDiceTotal(character.hit_dice_total || 0);
			setHitDice(character.hit_dice || 0);
			setWeapons(character?.weapons || []);
			setWeaponFields(character?.weapons?.length > 0 ? character.weapons.length : 1);
			setEquipment(character?.equipment || []);
			setEquipmentFields(character?.equipment?.length > 0 ? character.equipment.length : 1);
			setGoldPieces(character.gold_pieces);
			setSilverPieces(character.silver_pieces);
			setCopperPieces(character.copper_pieces);
			setFeatures(character?.features || []);
			setFeatureFields(character?.features?.length || 0);
			setBio(character.biography || '');
		}
	}, [character]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});

		const filteredWeapons = weapons.filter((weapon) => {
			return weapon?.name?.length || weapon?.attack?.length || weapon?.damage?.length;
		});

		const filteredEquipment = equipment.filter((item) => {
			return item?.name?.length || item?.quantity?.length || item?.weight?.length;
		});

		const filteredFeatures = features.filter((feature) => {
			return feature?.name?.length || feature?.description?.length;
		});

		const newCharacter = await dispatch(
			addCharacter({
				name,
				type,
				class_name: className,
				level,
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
				weapons: JSON.stringify(filteredWeapons),
				equipment: JSON.stringify(filteredEquipment),
				gold_pieces: goldPieces,
				silver_pieces: silverPieces,
				copper_pieces: copperPieces,
				features: JSON.stringify(filteredFeatures),
				biography: bio,
				user_id: user.id,
			})
		);

		if (newCharacter.errors) {
			setErrors(newCharacter.errors);
			return;
		} else {
			history.push('/home');
		}
	};

	const handleEdit = async (e) => {
		e.preventDefault();
		setErrors({});

		const filteredWeapons = weapons.filter((weapon) => {
			return weapon?.name?.length || weapon?.attack?.length || weapon?.damage?.length;
		});

		const filteredEquipment = equipment.filter((item) => {
			return item?.name?.length || item?.quantity?.length || item?.weight?.length;
		});

		const filteredFeatures = features.filter((feature) => {
			return feature?.name?.length || feature?.description?.length;
		});

		const editedCharacter = await dispatch(
			updateCharacter({
				name,
				type,
				class_name: className,
				level,
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
				weapons: JSON.stringify(filteredWeapons),
				equipment: JSON.stringify(filteredEquipment),
				gold_pieces: goldPieces,
				silver_pieces: silverPieces,
				copper_pieces: copperPieces,
				features: JSON.stringify(filteredFeatures),
				biography: bio,
				user_id: user.id,
				character_id: characterId,
			})
		);

		if (editedCharacter.errors) {
			setErrors(editedCharacter.errors);
			return;
		} else {
			history.push('/home');
		}
	};

	const resetActiveFeature = (e) => {
		if (activeFeature !== -1) {
			const featureContainer = document.querySelector('#feature-editor');
			const featureNameInput = document.querySelector('#feature-name-input');
			const featureDescription = document.querySelector('#feature-description');
			const featureDescriptionInput = document.querySelector('#feature-description-input');
			if (
				e.target === featureContainer ||
				e.target === featureNameInput ||
				e.target === featureDescription ||
				e.target === featureDescriptionInput
			)
				return;
			setActiveFeature(-1);
		}
	};

	console.log(errors);

	if (page === 2)
		return (
			<div className='character-form-container'>
				{Object.keys(errors).length > 0 && (
					<p id='error'>
						Missing or incorrect data on character sheet. Please review before trying to
						save again.
					</p>
				)}
				<div id='tabs'>
					<button id='character-sheet-button' onClick={() => setPage(1)}>
						Character Sheet
					</button>
					<button
						id='character-sheet-button'
						onClick={character ? handleEdit : handleSubmit}
					>
						Save Character
					</button>
				</div>
				<label style={{ marginBottom: '10px' }}>Character Biography</label>
				<textarea id='bio-input' value={bio} onChange={(e) => setBio(e.target.value)} />
			</div>
		);

	return (
		<div className='character-form-container' onClick={(e) => resetActiveFeature(e)}>
			{Object.keys(errors).length > 0 && (
				<p id='error'>
					Missing or incorrect data on character sheet. Please review before trying to
					save again.
				</p>
			)}
			<div id='tabs'>
				<button id='character-sheet-button' onClick={() => setPage(2)}>
					Bio
				</button>
				<button id='character-sheet-button' onClick={character ? handleEdit : handleSubmit}>
					Save Character
				</button>
			</div>
			<div id='character-form'>
				<div id='character-header-container'>
					<div id='character-name-container'>
						<img
							id='logo'
							src='https://gamemasterstudio.s3.us-east-2.amazonaws.com/dndlogo.png'
							alt='DnD Logo'
						/>
						<input
							style={
								errors?.name ? { border: '2px solid red', borderRadius: '5px' } : {}
							}
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<p style={{ borderTop: '1px solid gray' }}>Character Name*</p>
					</div>
					<div id='character-sheet-header'>
						<div id='class-level-background'>
							<i className='fas fa-question-circle' id='tooltip'>
								<p id='popup-text'>
									Class, Level, and Experience: These fields are for basic
									information about your character. Class is for whether they're a
									warrior, rogue, wizard, etc. Level is based on experience
									(usually starts at 1), and background is usually additional info
									about your character that provides skills in addition to the
									class. Please see the Dungeons and Dragons playbook for more
									information
								</p>
							</i>
							<label
								style={
									errors?.class_name
										? { border: '2px solid red', borderRadius: '5px' }
										: {}
								}
							>
								<input
									type='text'
									value={className}
									onChange={(e) => setClassName(e.target.value)}
								/>
								<p style={{ borderTop: '1px solid gray' }}>Class*</p>
							</label>
							<label
								style={
									errors?.level
										? { border: '2px solid red', borderRadius: '5px' }
										: {}
								}
							>
								<input
									type='text'
									value={level}
									onChange={(e) => setLevel(e.target.value)}
								/>
								<p style={{ borderTop: '1px solid gray' }}>Level*</p>
							</label>
							<label
								style={
									errors?.background
										? { border: '2px solid red', borderRadius: '5px' }
										: {}
								}
							>
								<input
									type='text'
									value={background}
									onChange={(e) => setBackground(e.target.value)}
								/>
								<p style={{ borderTop: '1px solid gray', width: '100px' }}>
									Background*
								</p>
							</label>
						</div>
						<div id='race-alignment-experience'>
							<i className='fas fa-question-circle' id='tooltip'>
								<p id='popup-text'>
									Race, Alignment, and Experience: These fields determine the race
									of your character (elf, human, dwarf, etc), their alignment
									(i.e. lawful good or chaotic evil), and the experience points
									gained during their adventure
								</p>
							</i>
							<label
								style={
									errors?.race
										? { border: '2px solid red', borderRadius: '5px' }
										: {}
								}
							>
								<input
									type='text'
									value={race}
									onChange={(e) => setRace(e.target.value)}
								/>
								<p style={{ borderTop: '1px solid gray' }}>Race*</p>
							</label>
							<label
								style={
									errors?.alignment
										? { border: '2px solid red', borderRadius: '5px' }
										: {}
								}
							>
								<input
									type='text'
									value={alignment}
									onChange={(e) => setAlignment(e.target.value)}
								/>
								<p style={{ borderTop: '1px solid gray' }}>Alignment*</p>
							</label>
							<label
								style={
									errors?.experience
										? { border: '2px solid red', borderRadius: '5px' }
										: {}
								}
							>
								<input
									type='text'
									value={experience}
									onChange={(e) => setExperience(e.target.value)}
								/>
								<p style={{ borderTop: '1px solid gray', width: '100px' }}>
									Experience*
								</p>
							</label>
						</div>
					</div>
				</div>
				<div id='character-sheet'>
					<div id='sheet-left'>
						<div id='attributes-skills'>
							<div id='attributes'>
								<div id='attribute-div'>
									<i className='fas fa-question-circle' id='tooltip'>
										<p id='popup-text'>
											Attributes: These determine the abilities of your
											character. They also affect saving throws and skills
											related to them (ie a strength modifier of 4 will
											increase all checks in Athletics by 4 as well). The big
											number in the center is your modifier and requires no
											input. The actual attribute goes in the circle on the
											bottom of these areas.
										</p>
									</i>
									<label>STRENGTH*</label>
									<h3>{modifiers.strength}</h3>
									<input
										style={errors?.strength ? { border: '3px solid red' } : {}}
										type='text'
										value={strength}
										onChange={(e) => setStrength(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>DEXTERITY*</label>
									<h3>{modifiers.dexterity}</h3>
									<input
										style={errors?.dexterity ? { border: '3px solid red' } : {}}
										type='text'
										value={dexterity}
										onChange={(e) => setDexterity(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>CONSTITUTION*</label>
									<h3>{modifiers.constitution}</h3>
									<input
										style={
											errors?.constitution ? { border: '3px solid red' } : {}
										}
										type='text'
										value={constitution}
										onChange={(e) => setConstitution(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>INTELLIGENCE*</label>
									<h3>{modifiers.intelligence}</h3>
									<input
										style={
											errors?.intelligence ? { border: '3px solid red' } : {}
										}
										type='text'
										value={intelligence}
										onChange={(e) => setIntelligence(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>WISDOM*</label>
									<h3>{modifiers.wisdom}</h3>
									<input
										style={errors?.wisdom ? { border: '3px solid red' } : {}}
										type='text'
										value={wisdom}
										onChange={(e) => setWisdom(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>CHARISMA*</label>
									<h3>{modifiers.charisma}</h3>
									<input
										style={errors?.charisma ? { border: '3px solid red' } : {}}
										type='text'
										value={charisma}
										onChange={(e) => setCharisma(e.target.value)}
									/>
								</div>
							</div>
							<div id='skills-and-throws'>
								<div id='proficiency'>
									<i className='fas fa-question-circle' id='tooltip'>
										<pre id='popup-text'>
											{`Proficiency: This number is based on your level and
											cannot be modified. If you are proficient in a skill or
											attribute, add your proficiency to those checks.
											
											Savings Throws & Skills: These are used in various checks. Your attribute modifiers directly affect these skills, either increasing or decreasing your dice roll by the amount next to the skill being checked. If you are proficient in that skill or attribute, add your proficiency bonus.`}
										</pre>
									</i>
									<h3>
										{level
											? level < 5
												? '2'
												: level < 9
												? '3'
												: level < 13
												? '4'
												: level < 17
												? '5'
												: '6'
											: '2'}
									</h3>
									<label>PROFICIENCY BONUS</label>
								</div>
								<div id='saving-throws'>
									<div id='saving-throw'>
										<p>{modifiers.strength}</p>
										<p>Strength</p>
									</div>
									<div id='saving-throw'>
										<p>{modifiers.dexterity}</p>
										<p>Dexterity</p>
									</div>
									<div id='saving-throw'>
										<p>{modifiers.constitution}</p>
										<p>Constitution</p>
									</div>
									<div id='saving-throw'>
										<p>{modifiers.intelligence}</p>
										<p>Intelligence</p>
									</div>
									<div id='saving-throw'>
										<p>{modifiers.wisdom}</p>
										<p>Wisdom</p>
									</div>
									<div id='saving-throw'>
										<p>{modifiers.charisma}</p>
										<p>Charisma</p>
									</div>
									<p id='saving-throws-text'>SAVING THROWS</p>
								</div>
								<div id='skills'>
									<div id='skill'>
										<p>{modifiers.dexterity}</p>
										<p>Acrobatics</p>
									</div>
									<div id='skill'>
										<p>{modifiers.wisdom}</p>
										<p>Animal Handling</p>
									</div>
									<div id='skill'>
										<p>{modifiers.intelligence}</p>
										<p>Arcana</p>
									</div>
									<div id='skill'>
										<p>{modifiers.strength}</p>
										<p>Athletics</p>
									</div>
									<div id='skill'>
										<p>{modifiers.charisma}</p>
										<p>Deception</p>
									</div>
									<div id='skill'>
										<p>{modifiers.intelligence}</p>
										<p>History</p>
									</div>
									<div id='skill'>
										<p>{modifiers.wisdom}</p>
										<p>Insight</p>
									</div>
									<div id='skill'>
										<p>{modifiers.charisma}</p>
										<p>Intimidation</p>
									</div>
									<div id='skill'>
										<p>{modifiers.intelligence}</p>
										<p>Investigation</p>
									</div>
									<div id='skill'>
										<p>{modifiers.wisdom}</p>
										<p>Medicine</p>
									</div>
									<div id='skill'>
										<p>{modifiers.intelligence}</p>
										<p>Nature</p>
									</div>
									<div id='skill'>
										<p>{modifiers.wisdom}</p>
										<p>Perception</p>
									</div>
									<div id='skill'>
										<p>{modifiers.charisma}</p>
										<p>Performance</p>
									</div>
									<div id='skill'>
										<p>{modifiers.charisma}</p>
										<p>Persuasion</p>
									</div>
									<div id='skill'>
										<p>{modifiers.intelligence}</p>
										<p>Religion</p>
									</div>
									<div id='skill'>
										<p>{modifiers.dexterity}</p>
										<p>Sleight of Hand</p>
									</div>
									<div id='skill'>
										<p>{modifiers.dexterity}</p>
										<p>Stealth</p>
									</div>
									<div id='skill'>
										<p>{modifiers.wisdom}</p>
										<p>Survival</p>
									</div>
									<p id='skills-text'>SKILLS</p>
								</div>
							</div>
						</div>
						<div id='passive-perception'>
							<i className='fas fa-question-circle' id='tooltip'>
								<p id='popup-text'>
									Passive Wisdom: Your wisdom modifier + 10. Lets your character
									see certain things based on DC set by the game master. Cannot be
									rolled for, and can only be modified by increasing your wisdom
									modifier
								</p>
							</i>
							<p id='passive-perception-value'>{+modifiers.wisdom + 10}</p>
							<p id='passive-perception-text'>PASSIVE WISDOM(perception)</p>
						</div>
					</div>
					<div id='sheet-middle'>
						<div id='hp-weapons'>
							<div id='armor-initiative-speed'>
								<i className='fas fa-question-circle' id='tooltip'>
									<p id='popup-text'>
										Armor class, Initiative, and Speed: These values determine
										various things in battle. Armor class is how high an enemy
										needs to roll to land a hit on you. Initiative is a bonus to
										your initiative rolls and determines your turn order in
										battle (This is determined by your dex modifier and cannot
										be changed). Speed determines how fast you move and how far
										you can move on the battlefield per turn.
									</p>
								</i>
								<div
									id='armor-class'
									style={errors?.armor_class ? { border: '3px solid red' } : {}}
								>
									<input
										type='text'
										value={armorClass}
										onChange={(e) => setArmorClass(e.target.value)}
									/>
									<p id='ac-initiative-speed-text'>ARMOR CLASS*</p>
								</div>
								<div id='initiative'>
									<p style={{ marginTop: '3px' }}>{modifiers.dexterity}</p>
									<p id='ac-initiative-speed-text'>INITIATIVE</p>
								</div>
								<div
									id='speed'
									style={errors?.speed ? { border: '3px solid red' } : {}}
								>
									<input
										type='text'
										value={speed}
										onChange={(e) => setSpeed(e.target.value)}
									/>
									<p id='ac-initiative-speed-text'>SPEED*</p>
								</div>
							</div>
							<div id='current-hp'>
								<i className='fas fa-question-circle' id='tooltip'>
									<p id='popup-text'>
										Hit Points: These determine how well you stay alive. Taking
										damage reduces hit points. Once they hit 0, you must perform
										death saving throws. 3 failed death saving throws will
										result in death. Hit points can be recovered up to max
										during short and long rests, and by certain spells and
										abilities. Certain abilities also allow temporary hit
										points.
									</p>
								</i>
								<div id='hp-max'>
									<label>Hit Point Maximum*</label>
									<input
										style={
											errors?.max_hp
												? { border: '2px solid red', borderRadius: '3px' }
												: {}
										}
										type='text'
										value={maxHP}
										onChange={(e) => setMaxHP(e.target.value)}
									/>
								</div>
								<div id='current-hp-input'>
									<input
										style={
											errors?.current_hp
												? {
														border: '3px solid red',
														borderRadius: '3px',
												  }
												: {}
										}
										type='number'
										value={currentHP}
										onChange={(e) => setCurrentHP(e.target.value)}
									/>
									<p>CURRENT HIT POINTS*</p>
								</div>
							</div>
							<div id='temporary-hp'>
								<div id='temporary-hp-input'>
									<input
										style={
											errors?.temporary_hp
												? { border: '3px solid red', borderRadius: '3px' }
												: {}
										}
										type='number'
										value={temporaryHP}
										onChange={(e) => setTemporaryHP(e.target.value)}
									/>
									<p>TEMPORARY HIT POINTS*</p>
								</div>
							</div>
							<div id='hit-dice-death-saves'>
								<i className='fas fa-question-circle' id='tooltip'>
									<pre id='popup-text'>
										{`Hit Dice: To summarize, Hit Dice are a reservoir of natural healing all creatures have. 
										
										In order to spend Hit Dice, you need to take a rest, specifically a Short Rest. This allows you to expend and roll as many Hit Dice as you want from your available pool, adding your Constitution Modifier to the result in order to heal. The size of your pool is equal to your character level, for example, a 5th level Fighter will have a maximum of five Hit Dice (in this case, D10s).
										
										Another time to roll Hit Dice is when you level up, you can either take the average result of your new Hit Die (so if you gained a D8 and use an average of 5), or you can roll.  This allows you to roll the Hit Die you gain from your new class level (which determines its size) once, adding your Constitution Modifier, and increasing your current and maximum HP by that amount; using a Hit Die in this way doesn’t expend one from your available pool. No matter what you roll, or how low your Constitution modifier is, you always gain a minimum of 1 Hit Point each level.

										These are the two uses available to all characters, some features will allow you to use your Hit Dice in other ways. An example of this is the Dwarf exclusive feat Dwarven Fortitude which, among other things, allows you to roll a single Hit Die when you take the Dodge action, regaining Hit Points as if you had rolled it during a short rest.`}
									</pre>
								</i>
								<div id='hit-dice'>
									<div id='total-hit-dice'>
										<label>Total*</label>
										<input
											style={
												errors?.hit_dice_total
													? {
															border: '3px solid red',
															borderRadius: '3px',
													  }
													: {}
											}
											type='text'
											value={hitDiceTotal}
											onChange={(e) => setHitDiceTotal(e.target.value)}
										/>
									</div>
									<input
										style={
											errors?.hit_dice
												? { border: '3px solid red', borderRadius: '3px' }
												: {}
										}
										type='number'
										value={hitDice}
										onChange={(e) => setHitDice(e.target.value)}
									/>
									<p>HIT DICE*</p>
								</div>
							</div>
							<div id='weapons-container'>
								<i className='fas fa-question-circle' id='tooltip'>
									<pre id='popup-text'>
										{`Weapons & Equipment: What good is an adventure without equipment to defend or protect yourself, or trinkets to use against the enemy?
										
										All classes start with specific weapons that the character is proficient in. The name of the weapon indicates what type of weapon it is, with the attack being a modifier based on a specific attribute (ie daggers use the dexterity attribute to increase their attack). The damage determines which dice to roll on an attack, such as a 1d8, 1d10, or 1d12. The type of damage determines if it does slashing, piercing, or blunt damage. Enemies may be weak to or strong against a specific attack type, so best to keep a few different weapons handy.
										
										As for equipment, these can be anything in the characters inventory, from jewelry to potions to bags to increase the weight they may carry. Characters have a certain maximum weight before it starts to encumber them so don't be too careless in picking up everything you see.`}
									</pre>
								</i>
								<table id='weapons-table'>
									<thead>
										<tr id='weapons-header'>
											<th>NAME</th>
											<th>ATK</th>
											<th>DAMAGE/TYPE</th>
										</tr>
									</thead>
									<tbody>
										{Array.apply(null, { length: weaponFields }).map(
											(el, i) => (
												<tr id='weapons-body' key={`weapon-${i}`}>
													<td id='weapon-name'>
														<input
															type='text'
															value={weapons[i]?.name || ''}
															onChange={(e) =>
																setWeapons((prev) => {
																	const newWeapons = [...prev];
																	newWeapons[i] = {
																		...prev[i],
																		name: e.target.value,
																	};
																	return newWeapons;
																})
															}
														/>
													</td>
													<td id='weapon-atk'>
														<input
															type='text'
															value={weapons[i]?.attack || ''}
															onChange={(e) =>
																setWeapons((prev) => {
																	const newWeapons = [...prev];
																	newWeapons[i] = {
																		...prev[i],
																		attack: e.target.value,
																	};
																	return newWeapons;
																})
															}
														/>
													</td>
													<td id='weapon-damage'>
														<input
															type='text'
															value={weapons[i]?.damage || ''}
															onChange={(e) =>
																setWeapons((prev) => {
																	const newWeapons = [...prev];
																	newWeapons[i] = {
																		...prev[i],
																		damage: e.target.value,
																	};
																	return newWeapons;
																})
															}
														/>
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
								<div
									id='add-weapon-button'
									onClick={() => setWeaponFields((prev) => prev + 1)}
								>
									<i className='fas fa-plus'></i>
								</div>
								<p>WEAPONS</p>
							</div>
							<div id='equipment-container'>
								<div id='money-table-container'>
									<Money
										errors={errors}
										setErrors={setErrors}
										goldPieces={goldPieces}
										silverPieces={silverPieces}
										copperPieces={copperPieces}
										setGoldPieces={setGoldPieces}
										setSilverPieces={setSilverPieces}
										setCopperPieces={setCopperPieces}
									/>
									<table id='equipment-table'>
										<thead>
											<tr id='equipment-header'>
												<th>NAME</th>
												<th>QTY</th>
												<th>WEIGHT</th>
											</tr>
										</thead>
										<tbody>
											{Array.apply(null, { length: equipmentFields }).map(
												(el, i) => (
													<tr id='equipment-body' key={`equipment-${i}`}>
														<td id='equipment-name'>
															<input
																type='text'
																value={equipment[i]?.name || ''}
																onChange={(e) =>
																	setEquipment((prev) => {
																		const newEquipment = [
																			...prev,
																		];
																		newEquipment[i] = {
																			...prev[i],
																			name: e.target.value,
																		};
																		return newEquipment;
																	})
																}
															/>
														</td>
														<td id='quantity'>
															<input
																type='text'
																value={equipment[i]?.quantity || ''}
																onChange={(e) =>
																	setEquipment((prev) => {
																		const newEquipment = [
																			...prev,
																		];
																		newEquipment[i] = {
																			...prev[i],
																			quantity:
																				e.target.value,
																		};
																		return newEquipment;
																	})
																}
															/>
														</td>
														<td id='weight'>
															<input
																type='text'
																value={equipment[i]?.weight || ''}
																onChange={(e) =>
																	setEquipment((prev) => {
																		const newEquipment = [
																			...prev,
																		];
																		newEquipment[i] = {
																			...prev[i],
																			weight: e.target.value,
																		};
																		return newEquipment;
																	})
																}
															/>
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
								<div
									id='add-equipment-button'
									onClick={() => setEquipmentFields((prev) => prev + 1)}
								>
									<i className='fas fa-plus'></i>
								</div>
								<p>EQUIPMENT</p>
							</div>
						</div>
					</div>
					<div id='sheet-right'>
						<div id='features-container'>
							<i className='fas fa-question-circle' id='tooltip'>
								<p id='popup-text'>{`Features & Traits: Traits are aspects of a character's personality, background, or physique that make him better at some activities and worse at others. In many ways, traits resemble feats: A character can have only a limited number of traits, and each trait provides some benefit. Unlike feats, however, traits always carry a corresponding drawback. In addition to their game effects, traits suggest characteristics about the character's personality that might lead to interesting roleplaying opportunities. Together with a character's class and feat selection, traits offer a way for game mechanics to encourage deeper character backgrounds and consistent roleplaying.

													Traits serve as an interesting starting point for roleplaying, reminding players of their characters' most prominent strengths and weaknesses. However, roleplaying a certain aspect of a character's personality does not require possessing the trait. For example, a paladin can be honest and forthright without the Honest trait. The player should roleplay the character consistently even though the character's honesty has no effect on his skill checks.

													A character can begin play with up to two traits, chosen by the player at the time of character creation. Alternatively, the game master can require players to roll on Table: Character Traits to determine the traits possessed by their characters.

													As characters advance in level and ability, they might want to get rid of the traits that they chose at the beginning of play. Although characters cannot rid themselves of a trait directly, specific feats, skill ranks, or magic items can compensate for the penalties imposed by a trait. For example, an abrasive character can work on becoming more personable by spending skill points to gain a rank in Bluff and a rank in Diplomacy, thereby offsetting the drawback from the Abrasive trait.

													If the game master allows it, players may add traits to their characters after 1st level. The game master might allow a player to assign a trait to her character after she has roleplayed the character in a manner consistent with the trait in question, or after a traumatic or life changing experience (after dying, a character might develop the Cautious trait or the Aggressive trait). If the game master includes this option, a character should gain a new trait no more frequently than once every five levels.`}</p>
							</i>
							<div id='features'>
								{Array.apply(null, { length: featureFields }).map((el, i) =>
									activeFeature === i ? (
										<div id='feature-editor' key={`feature-${i}`}>
											<p id='feature-name'>Name</p>
											<input
												id='feature-name-input'
												type='text'
												value={features[i]?.name || ''}
												onChange={(e) =>
													setFeatures((prev) => {
														const newFeatures = [...prev];
														newFeatures[i] = {
															...prev[i],
															name: e.target.value,
														};
														return newFeatures;
													})
												}
											/>
											<p id='feature-description'>Description</p>
											<textarea
												id='feature-description-input'
												style={{ resize: 'none' }}
												value={features[i]?.description || ''}
												onChange={(e) =>
													setFeatures((prev) => {
														const newFeatures = [...prev];
														newFeatures[i] = {
															...prev[i],
															description: e.target.value,
														};
														return newFeatures;
													})
												}
											/>
										</div>
									) : (
										<p
											id='feature-name-view'
											style={{ cursor: 'pointer' }}
											key={`feature-${i}`}
											onClick={() => setActiveFeature(i)}
										>
											{features[i]?.name || 'Untitled'}
										</p>
									)
								)}
							</div>
							<div
								id='add-feature-button'
								onClick={() => {
									setFeatureFields((prev) => prev + 1);
									setActiveFeature(featureFields);
								}}
							>
								<i className='fas fa-plus'></i>
							</div>
							<p>FEATURES & TRAITS</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CharacterForm;
