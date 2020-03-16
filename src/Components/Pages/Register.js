import React, { Component } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { URL } from '../../Redux/Constants/index';
import '../../Assets/CSS/Register.css';
import { TextField, FormControl, InputAdornment } from '@material-ui/core';

import TextFieldsIcon from '@material-ui/icons/TextFields';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const allOk = true;
const formValid = ({ formErrors, ...rest }) => {
	let valid = false;

	Object.values(formErrors).forEach(val => {
		val.length > 0 && (valid = false);
	});

	Object.values(rest).forEach(val => {
		val === null && (valid = false);
	});
	return valid;
};
class Register extends Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			mobile: '',
			gender: '',
			formErrors: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
				mobile: '',
				gender: '',
			},
		};
	}

	handleSubmit = async e => {
		e.preventDefault();
		// formValid(this.state)
		console.log(allOk);

		if (allOk === false) {
			const { firstName, lastName, email, password, mobile, confirmPassword, gender } = this.state;
			let registrationData = {
				first_name: `${firstName}`,
				last_name: `${lastName}`,
				email: `${email}`,
				pass: `${password}`,
				phone_no: `${mobile}`,
				confirmPass: `${confirmPassword}`,
				gender: `${gender}`,
			};

			const res = await axios.post(URL + 'register', registrationData);
			alert(res.data.message);
			this.props.history.push('login');
		} else {
			alert('FORM INVALID - Kindly Fill The form Completly');
		}
	};

	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };

		switch (name) {
			case 'firstName':
				formErrors.firstName =
					value.length === 0
						? "Firstname field can't be left blank,minimum 3 characaters required"
						: isNaN(value)
						? ''
						: 'Numbers not allowed in Firstname';

				allOk = true;
				break;
			case 'lastName':
				formErrors.lastName =
					value.length === 0
						? "Lastname field can't be left blank,minimum 3 characaters required"
						: isNaN(value)
						? ''
						: 'Numbers not allowed in Lastname';
				allOk = true;
				break;
			case 'email':
				formErrors.email =
					value.length === 0
						? "Email field can't be left blank"
						: emailRegex.test(value)
						? ''
						: 'invalid email address';

				allOk = true;
				break;
			case 'password':
				formErrors.password =
					value.length === 0
						? "Password field can't be left blank"
						: value.length < 8
						? 'minimum 8 characaters required'
						: '';

				allOk = true;
				break;
			case 'confirmPassword':
				formErrors.confirmPassword =
					value.length === 0
						? "Confirm password field can't be left blank"
						: value.length < 8
						? 'minimum 8 characaters required'
						: '';

				allOk = true;
				break;
			case 'mobile':
				formErrors.mobile =
					value.length === 0
						? "Mobile Number field can't be left blank"
						: isNaN(value)
						? 'Only Numbers allowed in Mobile'
						: value.length < 10 || value.length > 10
						? 'Only 10 characaters allowed'
						: '';

				allOk = true;
				break;
			case 'gender':
				formErrors.gender = value.length === 0 ? "Gender field can't be left blank" : '';

				allOk = true;
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value });
		// return allOk;
	};

	render() {
		const { formErrors } = this.state;
		return (
			<div className="register">
				<div className="register_button">
					<button className="registerButton" style={{ backgroundColor: 'blue' }}>
						<i class="fa fa-4x fa-facebook" aria-hidden="true"></i>
						Login with Facebook
					</button>

					<button className="registerButton" style={{ backgroundColor: 'red' }}>
						<i class=" fa fa-4x fa-google" aria-hidden="true"></i>
						Login with Google
					</button>
				</div>
				<hr></hr>
				<div class="form_card" style={{ width: '90%' }}>
					<div className="register_form">
						<form>
							<h3 className="form_textfield">Register to NeoSTORE</h3>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-firstName"
										label="First Name"
										name="firstName"
										value={this.state.firstName}
										variant="outlined"
										placeholder="First Name"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<TextFieldsIcon />
												</InputAdornment>
											),
										}}
										onChange={this.handleChange}
									/>
								</FormControl>
								{formErrors.firstName.length > 0 && (
									<span className="errorMessage">{formErrors.firstName}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-lastName"
										label="Last Name"
										name="lastName"
										variant="outlined"
										placeholder="Last Name"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<TextFieldsIcon />
												</InputAdornment>
											),
										}}
										onChange={this.handleChange}
									/>
								</FormControl>
								{formErrors.lastName.length > 0 && (
									<span className="errorMessage">{formErrors.lastName}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-email"
										label="Email Address"
										name="email"
										variant="outlined"
										placeholder="Email Address"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<EmailIcon />
												</InputAdornment>
											),
										}}
										onChange={this.handleChange}
									/>
								</FormControl>
								{formErrors.email.length > 0 && (
									<span className="errorMessage">{formErrors.email}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-password"
										label="Password"
										name="password"
										type="password"
										variant="outlined"
										placeholder="Password"
										onChange={this.handleChange}
									/>
								</FormControl>
								{formErrors.password.length > 0 && (
									<span className="errorMessage">{formErrors.password}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-confirmPassword"
										label="Confirm Password"
										name="confirmPassword"
										variant="outlined"
										type="password"
										placeholder="Confirm Password"
										onChange={this.handleChange}
									/>
								</FormControl>
								{formErrors.confirmPassword.length > 0 && (
									<span className="errorMessage">{formErrors.confirmPassword}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-mobile"
										label="Mobile Number"
										name="mobile"
										variant="outlined"
										placeholder="Mobile Number"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<CallIcon />
												</InputAdornment>
											),
										}}
										onChange={this.handleChange}
									/>
								</FormControl>
								{formErrors.mobile.length > 0 && (
									<span className="errorMessage">{formErrors.mobile}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl component="fieldset">
									<RadioGroup
										//defaultValue="male"
										aria-label="gender"
										name="gender"
										onChange={this.handleChange}
									>
										<FormControlLabel value="male" control={<Radio />} label="Male" />
										<FormControlLabel value="female" control={<Radio />} label="Female" />
									</RadioGroup>
								</FormControl>
							</div>
							<div className="form_textfield">
								<FormControl component="fieldset">
									<button
										class="btn btn-danger text-uppercase float-left"
										onClick={this.handleSubmit}
										type="submit"
									>
										Register
									</button>
								</FormControl>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
