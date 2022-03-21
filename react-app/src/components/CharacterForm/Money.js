import './CharacterForm.css';

export default function Money({
	errors,
	goldPieces,
	silverPieces,
	copperPieces,
	setGoldPieces,
	setSilverPieces,
	setCopperPieces,
}) {
	return (
		<div id='money'>
			<div id='gold' style={errors?.gold_pieces ? { border: '3px solid red' } : {}}>
				<div id='gp'>gp*</div>
				<input
					type='text'
					value={goldPieces}
					onChange={(e) => setGoldPieces(e.target.value)}
				/>
			</div>
			<div id='silver' style={errors?.silver_pieces ? { border: '3px solid red' } : {}}>
				<div id='sp'>sp*</div>
				<input
					type='text'
					value={silverPieces}
					onChange={(e) => setSilverPieces(e.target.value)}
				/>
			</div>
			<div id='copper' style={errors.copper_pieces ? { border: '3px solid red' } : {}}>
				<div id='cp'>cp*</div>
				<input
					type='text'
					value={copperPieces}
					onChange={(e) => setCopperPieces(e.target.value)}
				/>
			</div>
		</div>
	);
}
