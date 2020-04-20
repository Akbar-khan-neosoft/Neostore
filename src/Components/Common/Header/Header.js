import React, { Component } from 'react';
import '../../../Assets/CSS/Header.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {connect} from "react-redux"
import { withRouter } from 'react-router-dom'
import {fetchlogout} from "../../../Redux/Actions/loginAction"

class Header extends Component {

	onLogoutHandle=async()=>{
		localStorage.clear();
		const res = await this.props.onFetch()
		this.props.history.push("/")
		
	}
	render() {
		let success=false;
		const localData = JSON.parse(localStorage.getItem("loginData"))
		const localCartData = JSON.parse(localStorage.getItem("cart"))
		const cartItemCount = localCartData.length
		if(localData !== null)
		{
			success = localData.success
		}
		console.log("localData",localData,this.props.data)
		
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
						<input
							class="form-control form-control-lg form-control-borderless"
							type="search"
							placeholder="Search.."
						/>
					</div>
					<div>
						<button className="Header-Button" >
						<Link to="cart" >
						<span><i class="fa fa-cart-plus" aria-hidden="true"></i>
		Cart<sup><span class="badge badge-pill badge-danger">{cartItemCount}</span></sup></span>	
						</Link>						
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
								{console.log("login - >>",this.props.data,success)}
								{(this.props.data || success) ? <div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<Link to="myaccount" class="dropdown-item">
										Profile
									</Link>
									<Link to="#" class="dropdown-item" onClick={this.onLogoutHandle}>
										Logout
									</Link>
								</div> : <div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<Link to="/login" class="dropdown-item">
										Login
									</Link>
									<Link to="/register" class="dropdown-item">
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
	console.log("akbar",state)
	return { data: state.loginReducer.isAuthenticated , button_value: state.cartReducer.data || 0 };
};

const mapDispatchToProps = dispatch => ({
	onFetch: () => dispatch(fetchlogout()),
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header));
