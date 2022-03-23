import './Footer.css';

function Footer() {
	return (
		<footer>
			<div id='footer'>
				<div id='programmer-info'>
					<pre id='about-text'>
						{`Game Master Studio is inspired by Dungeons & Dragons character creators such as Roll20.net and DnDBeyond.
						It has the additional feature of adding sections and articles to specific campaigns.`}
					</pre>
					<div id='links-div'>
						<a
							style={{ color: 'white' }}
							href='https://github.com/AndrewPMurray/GameMasterStudio'
							target='_blank'
							rel='noreferrer'
						>
							<i className='fab fa-github'></i>
						</a>
						<a
							href='https://www.linkedin.com/in/andrew-murray-304b39231/'
							target='_blank'
							rel='noreferrer'
						>
							<i className='fab fa-linkedin'></i>
						</a>
					</div>
					<p id='footer-bottom'>Developed by: Andrew Murray</p>
					<p id='footer-bottom'>
						Notice: This website is not affiliated with or used by Wizards of the Coast
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
