import React, { Component } from 'react';
import '../../../Assets/CSS/Header.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Header extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="Header-logo">
					<h1 style={{ color: 'white', fontSize: '50px' }}>
						Neo<span style={{ color: 'red' }}>Store</span>
					</h1>
				</div>
				<div className="Header-Links">
					<ul className="navbar">
						<li>
							<Link to="/">
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Home</span>
							</Link>
						</li>
						<li>
							<a style={{ textDecoration: 'none' }} href="#">
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Products</span>
							</a>
						</li>
						<li>
							<a style={{ textDecoration: 'none' }} href="#">
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Order</span>
							</a>
						</li>
					</ul>
				</div>
				<div className="Header-search">
					<div className="searchbox">
						<input
							class="form-control form-control-lg form-control-borderless"
							type="search"
							placeholder="Search.."
						/>
					</div>
					<div>
						<button className="Header-Button">
							<i class="fa fa-cart-plus" aria-hidden="true"></i> Cart
						</button>
					</div>
					<div>
						<button className="Header-Button">
							<div class="nav-item dropdown">
								<a
									class="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i class="fa fa-user-circle" aria-hidden="true"></i>
								</a>
								<div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<Link to="/login" class="dropdown-item">
										Login
									</Link>
									<Link to="/register" class="dropdown-item">
										Register
									</Link>
								</div>
							</div>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
