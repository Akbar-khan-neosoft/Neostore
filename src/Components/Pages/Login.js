import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchlogin } from '../../Redux/Actions/loginAction';
import '../../Assets/CSS/Login.css';
import {
	FacebookButton,
	GoogleButton,
	TwitterButton,
} from '../../Components/Common/SocialLoginButtons/SocialLoginButtons';
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
			errorMessage: '',
		};
	}

	onSubmitHandler = async () => {
		console.log('button clicked');

		const data = {
			email: this.state.email,
			pass: this.state.password,
		};

		await this.props.onFetch(data);
		console.log('data - >', this.props.data);

		localStorage.setItem('loginData', JSON.stringify(this.props.data));
		this.props.history.push('/');
	};

	onChangeHandler = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value });
	};

	validate = () => {
		this.setState({ passwordError: false, emailError: false, errorMessage: '' });

		if (this.state.email === '') {
			this.setState({ emailError: true, errorMessage: "Email Field Can't Be Left Blank", disableButton: true });
		} else if (this.state.password === '') {
			this.setState({
				passwordError: true,
				errorMessage: "Password Field Can't Be Left Blank",
				disableButton: true,
			});
			// return false;
			// errorMessage = "Password Field Can't Be Left Blank";
		} else if (this.state.password.length < 8) {
			this.setState({
				passwordError: true,
				errorMessage: 'Password Length Should Be More Than 8',
				disableButton: true,
			});
			// return false;
			// errorMessage = 'Password Length Should Be More Than 8';
		} else {
			this.setState({
				disableButton: false,
			});
		}
	};

	render() {
		return (
			<div className="login_container">
				<div className="login_main">
					<div className="login_buttons">
						<FacebookButton />
						<GoogleButton />
						<TwitterButton />
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
								{this.state.emailError ? (
									<span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
										{this.state.errorMessage}
									</span>
								) : null}
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
								{this.state.passwordError ? (
									<span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
										{this.state.errorMessage}
									</span>
								) : null}
							</div>

							<button
								type="button"
								disabled={this.state.disableButton}
								style={{ marginTop: '15px' }}
								class="btn btn-primary"
								onClick={this.onSubmitHandler}
							>
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

const mapStateToProps = state => {
	console.log('state - >', state.loginReducer.data);

	return { data: state.loginReducer.data || [] };
};

const mapDispatchToProps = dispatch => ({
	onFetch: data => dispatch(fetchlogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
