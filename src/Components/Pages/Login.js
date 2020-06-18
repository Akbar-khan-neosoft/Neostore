import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchlogin } from '../../Redux/Actions/loginAction';
import { fetchCartData } from '../../Redux/Actions/cartAction'
import '../../Assets/CSS/Login.css';
import { EMAIL_REGEX, customErrorMessages } from '../../Utils/validation'
import {
	FacebookButton,
	GoogleButton,
	TwitterButton,
} from '../../Components/Common/SocialLoginButtons/SocialLoginButtons';
import { Link } from 'react-router-dom';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				email: '',
				password: '',
			},
			disableButton: true,
			error: {
				emailError: false,
				passwordError: false,
				errorMessage: '',
			}
		};
	}

	componentDidMount() {
		if (this.props.login) {
			this.props.history.push("/")
		}
	}

	onSubmitHandler = async () => {
		const localCartData = JSON.parse(localStorage.getItem("cart")) || []
		const data = {
			email: this.state.data.email,
			pass: this.state.data.password,
		};

		await this.props.onFetch(data);
		if (this.props.data.success) {
			localStorage.setItem('loginData', JSON.stringify(this.props.data));
			await this.props.onFetchCart()
			const result = this.props.cartdata.map(res => {
				const product_id = res.product_id
				product_id.quantity = res.quantity
				return product_id
			})
			if (this.props.cartdata.length > 0) {
				localStorage.setItem('cart', JSON.stringify(localCartData.concat(result)));
			}
			this.props.history.push('/');
		} else if (!this.props.loginError.success) {
			alert(this.props.loginError.message)
		}
	};

	onChangeHandler = ({ target: input }) => {
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data });
	};

	validate = () => {
		const { email, password } = this.state.data
		this.setState({ error: { passwordError: false, emailError: false, errorMessage: '' } });

		if (email === '' || !EMAIL_REGEX.test(email)) {
			const { valueMissing, typeMismatch } = customErrorMessages.email;
			const erroremail = email === "" ? valueMissing : typeMismatch;
			this.setState({ error: { emailError: true, errorMessage: erroremail }, disableButton: true });

		} else if (password === '' || password.length < 8) {
			const { valueMissing, patternMismatch } = customErrorMessages.password;
			const errorpassowrd = password === "" ? valueMissing : patternMismatch;

			this.setState({
				error: {
					passwordError: true,
					errorMessage: errorpassowrd
				},
				disableButton: true,
			});

		} else {
			this.setState({
				disableButton: false,
			});
		}
	};

	render() {

		const { email, password } = this.state.data
		const { emailError, passwordError, errorMessage } = this.state.error

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
									value={email}
									onChange={this.onChangeHandler}
									name="email"
									onBlur={this.validate}
								/>
								{emailError ? (
									<span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
										{errorMessage}
									</span>
								) : null}
							</div>
							<div class="form-group" style={{ marginTop: '25px' }}>
								<input
									type="password"
									class="form-control"
									placeholder="Password"
									value={password}
									onChange={this.onChangeHandler}
									name="password"
									onBlur={this.validate}
								/>
								{passwordError ? (
									<span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
										{errorMessage}
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
	return {
		data: state.loginReducer.data || [],
		login: state.loginReducer.isAuthenticated,
		cartdata: state.cartReducer.data || [],
		loginError: state.loginReducer.error || []
	};
};

const mapDispatchToProps = dispatch => ({
	onFetch: data => dispatch(fetchlogin(data)),
	onFetchCart: () => dispatch(fetchCartData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
