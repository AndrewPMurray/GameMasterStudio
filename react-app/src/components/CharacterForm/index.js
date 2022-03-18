import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addCharacter, getCharacters, updateCharacter } from '../../store/characters';
import './CharacterForm.css';

const CharacterForm = () => {
	const { characterId } = useParams() || null;
	const user = useSelector((state) => state.session.user);
	const character = useSelector((state) => state.characters[characterId]);
	const dispatch = useDispatch();
	const history = useHistory();
	const [errors, setErrors] = useState([]);

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
		strength: strength && strength <= 30 ? `${Math.floor(strength / 2) - 5}` : 0,
		dexterity: dexterity && dexterity <= 30 ? `${Math.floor(dexterity / 2) - 5}` : 0,
		constitution:
			constitution && constitution <= 30 ? `${Math.floor(constitution / 2) - 5}` : 0,
		intelligence:
			intelligence && intelligence <= 30 ? `${Math.floor(intelligence / 2) - 5}` : 0,
		wisdom: wisdom && wisdom <= 30 ? `${Math.floor(wisdom / 2) - 5}` : 0,
		charisma: charisma && charisma <= 30 ? `${Math.floor(charisma / 2) - 5}` : 0,
	};

	useEffect(() => {
		if (!user) history.push('/login');
		dispatch(getCharacters(user?.id));
	}, [dispatch, user, history, user?.id]);

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
			setGoldPieces(character.gold_pieces || 0);
			setSilverPieces(character.silver_pieces || 0);
			setCopperPieces(character.copper_pieces || 0);
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
			setErrors(newCharacter);
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
			setErrors(editedCharacter);
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

	if (page === 2)
		return (
			<div className='character-form-container'>
				<div id='tabs'>
					<button onClick={() => setPage(1)}>Character Sheet</button>
					<button onClick={() => setPage(2)}>Bio</button>
					<button onClick={character ? handleEdit : handleSubmit}>Save Character</button>
				</div>
				<label>Character Biography</label>
				<textarea id='bio-input' value={bio} onChange={(e) => setBio(e.target.value)} />
			</div>
		);

	return (
		<div className='character-form-container' onClick={(e) => resetActiveFeature(e)}>
			<div id='tabs'>
				<button onClick={() => setPage(1)}>Character Sheet</button>
				<button onClick={() => setPage(2)}>Bio</button>
				<button onClick={character ? handleEdit : handleSubmit}>Save Character</button>
			</div>
			<div id='character-form'>
				<div id='character-header-container'>
					<div id='character-name-container'>
						<img
							id='logo'
							src='https://gamemasterstudio.s3.us-east-2.amazonaws.com/dndlogo.png'
							alt='DnD Logo'
						/>
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
						<div id='race-alignment-experience'>
							<label>
								<input
									type='text'
									value={race}
									onChange={(e) => setRace(e.target.value)}
								/>
								<p>Race</p>
							</label>
							<label>
								<input
									type='text'
									value={alignment}
									onChange={(e) => setAlignment(e.target.value)}
								/>
								<p>Alignment</p>
							</label>
							<label>
								<input
									type='text'
									value={experience}
									onChange={(e) => setExperience(e.target.value)}
								/>
								<p>Experience</p>
							</label>
						</div>
					</div>
				</div>
				<div id='character-sheet'>
					<div id='sheet-left'>
						<div id='attributes-skills'>
							<div id='attributes'>
								<div id='attribute-div'>
									<label>STRENGTH</label>
									<h3>{modifiers.strength}</h3>
									<input
										type='text'
										value={strength}
										onChange={(e) => setStrength(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>DEXTERITY</label>
									<h3>{modifiers.dexterity}</h3>
									<input
										type='text'
										value={dexterity}
										onChange={(e) => setDexterity(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>CONSTITUTION</label>
									<h3>{modifiers.constitution}</h3>
									<input
										type='text'
										value={constitution}
										onChange={(e) => setConstitution(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>INTELLIGENCE</label>
									<h3>{modifiers.intelligence}</h3>
									<input
										type='text'
										value={intelligence}
										onChange={(e) => setIntelligence(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>WISDOM</label>
									<h3>{modifiers.wisdom}</h3>
									<input
										type='text'
										value={wisdom}
										onChange={(e) => setWisdom(e.target.value)}
									/>
								</div>
								<div id='attribute-div'>
									<label>CHARISMA</label>
									<h3>{modifiers.charisma}</h3>
									<input
										type='text'
										value={charisma}
										onChange={(e) => setCharisma(e.target.value)}
									/>
								</div>
							</div>
							<div id='skills-and-throws'>
								<div id='proficiency'>
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
							<p id='passive-perception-value'>{+modifiers.wisdom + 10}</p>
							<p id='passive-perception-text'>PASSIVE WISDOM(perception)</p>
						</div>
					</div>
					<div id='sheet-middle'>
						<div id='hp-weapons'>
							<div id='armor-initiative-speed'>
								<div id='armor-class'>
									<input
										type='text'
										value={armorClass}
										onChange={(e) => setArmorClass(e.target.value)}
									/>
									<p id='ac-initiative-speed-text'>ARMOR CLASS</p>
								</div>
								<div id='initiative'>
									<p style={{ marginTop: '3px' }}>{modifiers.dexterity}</p>
									<p id='ac-initiative-speed-text'>INITIATIVE</p>
								</div>
								<div id='speed'>
									<input
										type='text'
										value={speed}
										onChange={(e) => setSpeed(e.target.value)}
									/>
									<p id='ac-initiative-speed-text'>SPEED</p>
								</div>
							</div>
							<div id='current-hp'>
								<div id='hp-max'>
									<label>Hit Point Maximum</label>
									<input
										type='text'
										value={maxHP}
										onChange={(e) => setMaxHP(e.target.value)}
									/>
								</div>
								<div id='current-hp-input'>
									<input
										type='number'
										value={currentHP}
										onChange={(e) => setCurrentHP(e.target.value)}
									/>
									<p>CURRENT HIT POINTS</p>
								</div>
							</div>
							<div id='temporary-hp'>
								<div id='temporary-hp-input'>
									<input
										type='number'
										value={temporaryHP}
										onChange={(e) => setTemporaryHP(e.target.value)}
									/>
									<p>TEMPORARY HIT POINTS</p>
								</div>
							</div>
							<div id='hit-dice-death-saves'>
								<div id='hit-dice'>
									<div id='total-hit-dice'>
										<label>Total</label>
										<input
											type='text'
											value={hitDiceTotal}
											onChange={(e) => setHitDiceTotal(e.target.value)}
										/>
									</div>
									<input
										type='number'
										value={hitDice}
										onChange={(e) => setHitDice(e.target.value)}
									/>
									<p>HIT DICE</p>
								</div>
							</div>
							<div id='weapons-container'>
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
									<div id='money'>
										<div id='gold'>
											<div id='gp'>gp</div>
											<input
												type='text'
												value={goldPieces}
												onChange={(e) => setGoldPieces(e.target.value)}
											/>
										</div>
										<div id='silver'>
											<div id='sp'>sp</div>
											<input
												type='text'
												value={silverPieces}
												onChange={(e) => setSilverPieces(e.target.value)}
											/>
										</div>
										<div id='copper'>
											<div id='cp'>cp</div>
											<input
												type='text'
												value={copperPieces}
												onChange={(e) => setCopperPieces(e.target.value)}
											/>
										</div>
									</div>
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
