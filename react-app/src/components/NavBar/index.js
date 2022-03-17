import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
	const user = useSelector((state) => state.session.user);

	return (
		<div>
			<nav id='navbar-container'>
				<div id='nav-items'>
					{user ? (
						<NavLink to='/' exact={true} activeClassName='active'>
							Home
						</NavLink>
					) : (
						<div style={{ width: '50px' }}></div>
					)}
					<div id='login-logout-container'>
						{!user && (
							<div>
								<NavLink to='/login' exact={true} activeClassName='active'>
									Login
								</NavLink>
								<NavLink to='/sign-up' exact={true} activeClassName='active'>
									Sign Up
								</NavLink>
							</div>
						)}
						{user && <LogoutButton />}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
