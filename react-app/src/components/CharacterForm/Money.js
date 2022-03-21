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
			<i className='fas fa-question-circle' id='tooltip'>
				<pre id='popup-text'>
					{`Currency: This determines how much you have to buy stuff at shops. More is usually better.
					
					One gold piece is worth ten silver pieces, the most prevalent coin among commoners. A silver piece buys a laborer's work for half a day, a flask of lamp oil, or a night's rest in a poor inn.

					One silver piece is worth ten copper pieces, which are common among laborers and beggars. A single copper piece buys a candle, a torch, or a piece of chalk.`}
				</pre>
			</i>
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
