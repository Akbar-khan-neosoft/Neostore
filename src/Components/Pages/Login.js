import React, { Component } from 'react';
import '../../Assets/CSS/Login.css';
import { EMAIL_REGEX } from '../../Utils/validation';
import { Link } from 'react-router-dom';

let errorMessage = '';
class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			disableButton: true,

			emailError: false,
			passwordError: false,
		};
	}

	onChangeHandler = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value });
	};

	validate = () => {
		errorMessage = '';
		this.setState({ passwordError: false, emailError: false });

		if (this.state.email === '') {
			this.setState({ emailError: true });
			errorMessage = "Email Field Can't Be Left Blank";
		} else if (this.state.email.match(EMAIL_REGEX)) {
			this.setState({ emailError: true });
			errorMessage = 'Invalid Email';
		} else if (this.state.password === '') {
			this.setState({ passwordError: true });
			errorMessage = "Password Field Can't Be Left Blank";
		} else if (this.state.password.length < 8) {
			this.setState({ passwordError: true });
			errorMessage = 'Password Length Should Be More Than 8';
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
								{this.state.emailError ? <span>{errorMessage}</span> : null}
							</div>
							<div class="form-group" style={{ marginTop: '25px' }}>
								<input
									type="password"
									class="form-control"
									placeholder="Password"
									value={this.state.password}
									onChange={this.onChangeHandler}
									name="password"
									onBlur={this.validate}
								/>
								{this.state.passwordError ? <span>{errorMessage}</span> : null}
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
