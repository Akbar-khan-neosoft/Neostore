import React, { Component } from 'react';
import '../../../Assets/CSS/Header.css';
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { fetchlogout } from "../../../Redux/Actions/loginAction"
import Searchbox from '../../Searchbox';

class Header extends Component {

	onLogoutHandle = async () => {
		const localCartData = JSON.parse(localStorage.getItem("cart"))
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
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="navbar-brand" style={{ marginRight: "5%" }}>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<h1 style={{ color: 'white', fontSize: '50px' }}>
							Neo<span style={{ color: 'red' }}>Store</span>
						</h1>
					</Link>
				</div>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="headerother collapse navbar-collapse" id="navbarSupportedContent" >
					<ul className="navbar-nav mr-auto">
						<li className="nav-item navitemlink">
							<Link className="nav-link " to="/" style={{ textDecoration: 'none' }}>
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Home</span>
							</Link>
						</li>
						<li className="nav-item navitemlink">
							<Link className="nav-link" to="/product" style={{ textDecoration: 'none' }}>
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Products</span>
							</Link>
						</li>
						<li className="nav-item navitemlink">
							<Link className="nav-link" to="/order" style={{ textDecoration: 'none' }}>
								<span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Order</span>
							</Link>
						</li>
					</ul>
					<div className="searchbox nav-item"><Searchbox /></div>
					<div className="Header-Cart-Button nav-item" >
						<button className="otherbutton btn btn-outline-success my-2 my-sm-0">
							<Link to="cart" >
								<span><i className="fa fa-cart-plus" aria-hidden="true"></i>
								Cart<sup><span className="badge badge-pill badge-danger">{cartItemCount}</span></sup></span>
							</Link>
						</button>
					</div>
					<div className="Header-Profile-Button nav-item">
						<div>
							<button className="otherbutton btn btn-outline-success my-2 my-sm-0" id="profilebutton" >
								<div className="nav-item dropdown">
									<span
										className="nav-link dropdown-toggle"
										id="navbarDropdown"
										role="button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
										style={{ padding: "0px" }}
									>
										<i className="fa fa-user-circle" aria-hidden="true"></i>
									</span>
									{(this.props.data || success) ? <div className="dropdown-menu" aria-labelledby="navbarDropdown">
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
							</button></div>
					</div>

				</div>
			</nav >
		);
	}
}

const mapStateToProps = state => {
	return { data: state.loginReducer.isAuthenticated, button_value: state.cartItemCountReducer.data };
};

const mapDispatchToProps = dispatch => ({
	onFetch: () => dispatch(fetchlogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
