import './Footer.css';

function Footer() {
	return (
		<footer>
			<div id='footer'>
				<div id='programmer-info'>
					Created by Andrew Murray
					<div>
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
				</div>
			</div>
		</footer>
	);
}

export default Footer;