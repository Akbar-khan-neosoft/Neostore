import React, { Component } from 'react';
import '../../Assets/CSS/Login.css';
// import { customErrorMessages, EMAIL_REGEX } from '../../Utils';
import { Link } from 'react-router-dom';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			error: false,
			errorMessage: 'error',
			disableButton: true,
		};
	}

	onChangeHandler = e => {
		console.log('hey');

		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value });
	};

	validate = () => {
		if (this.state.email === '') {
			this.setState({ error: true });
		}
	};

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
								<input
									type="email"
									class="form-control"
									placeholder="Email Address"
									value={this.state.email}
									onChange={this.onChangeHandler}
									name="email"
									onBlur={this.validate}
								/>
								{this.state.error ? <span>{this.state.errorMessage}</span> : null}
							</div>
							<div class="form-group" style={{ marginTop: '25px' }}>
								<input
									type="password"
									class="form-control"
									placeholder="Password"
									value={this.state.password}
									onChange={this.onChangeHandler}
									name="password"
								/>
								{this.state.error ? <span>{this.state.errorMessage}</span> : null}
							</div>

							<button type="submit" style={{ marginTop: '15px' }} class="btn btn-primary">
								Login
							</button>
						</form>
					</div>
				</div>
				<div className="login_others">
					<button style={{ backgroundColor: 'transparent', border: 'none' }}>
						<Link to="/register" style={{ color: 'black' }}>
							Register Now
						</Link>
					</button>
					|
					<button style={{ backgroundColor: 'transparent', border: 'none' }}>
						<Link to="/forgotpassword" style={{ color: 'black' }}>
							Forgot Password
						</Link>
					</button>
				</div>
			</div>
		);
	}
}

export default Login;
