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
	const [weapons, setWeapons] = useState(character?.weapons || []);
	const [weaponFields, setWeaponFields] = useState(character?.weapons.length || 1);
	const [equipment, setEquipment] = useState(character?.equipment || []);
	const [equipmentFields, setEquipmentFields] = useState(character?.equipment.length || 1);
	const [goldPieces, setGoldPieces] = useState(character?.gold_pieces || 0);
	const [silverPieces, setSilverPieces] = useState(character?.gold_pieces || 0);
	const [copperPieces, setCopperPieces] = useState(character?.gold_pieces || 0);
	const [features, setFeatures] = useState([]);
	const [featureFields, setFeatureFields] = useState(character?.features.length || 0);
	const [activeFeature, setActiveFeature] = useState(-1);
	const [bio, setBio] = useState(character?.biography || '');
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

	const handleSubmit = (e) => {
		e.preventDefault();

		const filteredWeapons = weapons.filter((weapon) => {
			return weapon?.name?.length || weapon?.attack?.length || weapon?.damage?.length;
		});

		const filteredEquipment = equipment.filter((item) => {
			return item?.name?.length || item?.quantity?.length || item?.weight?.length;
		});

		const filteredFeatures = features.filter((feature) => {
			return feature?.name?.length || feature?.description?.length;
		});

		const newCharacter = {
			name,
			type,
			class_name: className,
			level: +level,
			background,
			race,
			alignment,
			experience: +experience,
			strength: +strength,
			dexterity: +dexterity,
			constitution: +constitution,
			intelligence: +intelligence,
			wisdom: +wisdom,
			charisma: +charisma,
			armor_class: armorClass,
			speed: +speed,
			max_hp: +maxHP,
			current_hp: +currentHP,
			temporary_hp: +temporaryHP,
			hit_dice_total: +hitDiceTotal,
			hit_dice: +hitDice,
			weapons: JSON.stringify(filteredWeapons),
			equipment: JSON.stringify(filteredEquipment),
			gold_pieces: +goldPieces,
			silver_pieces: +silverPieces,
			copper_pieces: +copperPieces,
			features: JSON.stringify(filteredFeatures),
			biography: bio,
			user_id: +user.id,
		};

		// Todo: set up character store with logic to send payload to backend to add to db and handle errors.
		// Just print to console for now
		console.log(newCharacter);
	};

	const resetActiveFeature = (e) => {
		if (activeFeature !== -1) {
			const featureContainer = document.querySelector('#feature-editor');
			const featureName = document.querySelector('#feature-name');
			const featureNameInput = document.querySelector('#feature-name-input');
			const featureDescription = document.querySelector('#feature-description');
			const featureDescriptionInput = document.querySelector('#feature-description-input');
			if (
				e.target === featureContainer ||
				e.target === featureName ||
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
					<button onClick={handleSubmit}>Save Character</button>
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
				<button onClick={handleSubmit}>Save Character</button>
			</div>
			<div id='character-form'>
				<div id='character-header-container'>
					<div id='character-name-container'>
						<img
							id='logo'
							src='https://hipfonts.com/wp-content/uploads/2020/11/Dungeon-and-Dragons-Logo-min.jpg'
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
							<div>
								<p>{+modifiers.wisdom + 10}</p>
								<p id='passive-perception-text'>PASSIVE WISDOM(perception)</p>
							</div>
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
