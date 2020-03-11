import React, { Component } from 'react';
import '../../Assets/CSS/Login.css';

class Login extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="login_container">
				<div className="login_main">
					<div className="login_buttons">
						<div>
							<button className="loginButton" style={{ backgroundColor: 'blue' }}>
								<i class="fa fa-4x fa-facebook" aria-hidden="true"></i>
								Login with Facebook
							</button>
						</div>
						<div>
							<button className="loginButton" style={{ backgroundColor: 'red' }}>
								<i class=" fa fa-4x fa-google" aria-hidden="true"></i>
								Login with Google
							</button>
						</div>
						<div>
							<button className="loginButton" style={{ backgroundColor: 'skyblue' }}>
								<i class="fa fa-4x fa-twitter" aria-hidden="true"></i>
								Login with Twitter
							</button>
						</div>
					</div>
					<div className="login_form">
						<form>
							<h3>Login to NeoSTORE</h3>
							<div class="form-group" style={{ marginTop: '25px' }}>
								<input type="email" class="form-control" placeholder="Email Address" />
							</div>
							<div class="form-group" style={{ marginTop: '25px' }}>
								<input type="password" class="form-control" placeholder="Password" />
							</div>

							<button type="submit" style={{ marginTop: '15px' }} class="btn btn-primary">
								Login
							</button>
						</form>
					</div>
				</div>
				<div className="login_others">
					<button style={{ backgroundColor: 'transparent', border: 'none' }}>
						<a href="#" style={{ color: 'black' }}>
							Register Now
						</a>
					</button>
					|
					<button style={{ backgroundColor: 'transparent', border: 'none' }}>
						<a href="#" style={{ color: 'black' }}>
							Forgot Password
						</a>
					</button>
				</div>
			</div>
		);
	}
}

export default Login;
