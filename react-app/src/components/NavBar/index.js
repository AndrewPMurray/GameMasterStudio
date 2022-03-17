import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
	return (
		<div style={{ backgroundImage: 'url(/images/navbar-background.jpg)' }}>
			<nav id='navbar-container'>
				<div id='nav-items'>
					<NavLink to='/' exact={true} activeClassName='active'>
						Home
					</NavLink>
					<div id='login-logout-container'>
						<NavLink to='/login' exact={true} activeClassName='active'>
							Login
						</NavLink>
						<NavLink to='/sign-up' exact={true} activeClassName='active'>
							Sign Up
						</NavLink>
						<LogoutButton />
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
