import React, { Component } from 'react';
import '../../../Assets/CSS/Header.css';

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
							<a style={{ textDecoration: 'none' }} href="#">
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Home</span>
							</a>
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
									<a class="dropdown-item" href="#">
										Login
									</a>
									<a class="dropdown-item" href="#">
										Register
									</a>
								</div>
							</div>
						</button>
					</div>
				</div>

				{/* <nav class="navbar navbar-expand-lg ">
					<a class="navbar-brand" href="#">
						
					</a>

					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav mr-auto">
							<li class="nav-item active">
								<a class="nav-link" href="#">
									Home <span class="sr-only">(current)</span>
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">
									Link
								</a>
							</li>

							<li class="nav-item">
								<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
									Disabled
								</a>
							</li>
						</ul>
						<form class="form-inline my-2 my-lg-0">
							<input
								class="form-control mr-sm-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button class="btn btn-outline-success my-2 my-sm-0" type="submit">
								Search
							</button>
						</form>
					</div>
				</nav> */}
			</div>
		);
	}
}

export default Header;
