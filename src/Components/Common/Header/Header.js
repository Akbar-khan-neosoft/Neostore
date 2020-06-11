import React, { Component } from 'react';
import '../../../Assets/CSS/Header.css';
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { fetchlogout } from "../../../Redux/Actions/loginAction"
import Searchbox from '../../Searchbox';

class Header extends Component {

	onLogoutHandle = async () => {

		await this.props.onFetch()
		localStorage.clear();
		this.props.history.push("/")

	}
	render() {
		let success = false;
		const localData = JSON.parse(localStorage.getItem("loginData"))
		const localCartData = JSON.parse(localStorage.getItem("cart"))
		const cartItemCount = localCartData ? localCartData.length : 0
		if (localData !== null) {
			success = localData.success
		}

		return (
			<div className="container-fluid">
				<div className="Header-logo btn">
					<Link to="/" style={{ textDecoration: 'none' }}>
						<h1 style={{ color: 'white', fontSize: '50px' }}>
							Neo<span style={{ color: 'red' }}>Store</span>
						</h1>
					</Link>
				</div>
				<div className="Header-Links">
					<ul className="navbar">
						<li>
							<Link to="/" style={{ textDecoration: 'none' }}>
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Home</span>
							</Link>
						</li>
						<li>
							<Link to="/product" style={{ textDecoration: 'none' }}>
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Products</span>
							</Link>
						</li>
						<li>
							<Link to="/order" style={{ textDecoration: 'none' }}>
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Order</span>
							</Link>
						</li>
					</ul>
				</div>
				<div className="Header-search">
					<div className="searchbox">
						<Searchbox />
					</div>
					<div>
						<button className="Header-Button" >
							<Link to="cart" >
								<span><i className="fa fa-cart-plus" aria-hidden="true"></i>
		Cart<sup><span className="badge badge-pill badge-danger">{cartItemCount}</span></sup></span>
							</Link>
						</button>
					</div>
					<div>
						<button className="Header-Button">
							<div className="nav-item dropdown">
								<span
									className="nav-link dropdown-toggle"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i className="fa fa-user-circle" aria-hidden="true"></i>
								</span>
								{(this.props.data || success) ? <div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<Link to="myaccount" className="dropdown-item">
										Profile
									</Link>
									<Link to="#" className="dropdown-item" onClick={this.onLogoutHandle}>
										Logout
									</Link>
								</div> : <div className="dropdown-menu" aria-labelledby="navbarDropdown">
										<Link to="/login" className="dropdown-item">
											Login
									</Link>
										<Link to="/register" className="dropdown-item">
											Register
									</Link>
									</div>}
							</div>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { data: state.loginReducer.isAuthenticated, button_value: state.cartReducer.data || 0 };
};

const mapDispatchToProps = dispatch => ({
	onFetch: () => dispatch(fetchlogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
