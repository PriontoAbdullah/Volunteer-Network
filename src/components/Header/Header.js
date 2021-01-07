import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logos/logo.png';
import './Header.css';

const Header = () => {
	return (
		<header className="px-lg-5 px-0">
			<nav className="navbar navbar-expand-md navbar-light">
				<Link className="navbar-brand" to="/">
					<img style={{ width: '202.81px' }} src={logo} alt="" />
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarTogglerDemo02"
					aria-controls="navbarTogglerDemo02"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav ml-auto align-items-md-center">
						<li className="nav-item">
							<Link className="nav-link px-3" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link px-3" to="/events">
								Events
							</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link px-3" to="/login">
								Login
							</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link" to="/login">
								<button className="btn btn-primary px-3 py-2">Register</button>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
