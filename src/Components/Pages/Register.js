import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../Redux/Constants/index';
import '../../Assets/CSS/Register.css';
import { TextField, FormControl, OutlinedInput, InputLabel, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { GoogleButton, FacebookButton } from '../Common/SocialLoginButtons/SocialLoginButtons';
import { EMAIL_REGEX, NAME_REGEX, customErrorMessages } from '../../Utils/validation'



class Register extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
				mobile: '',
				gender: "male"
			},
			showPassword: false,
			showConfirmPassword: false,
			disableButton: true,
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
		e.preventDefault()
			const { firstName, lastName, email, password, mobile, confirmPassword, gender } = this.state.data;
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
		
	};

	handleClickShowPassword = (param) => {
		if (param === "showPassword")
			this.setState({ showPassword: !this.state.showPassword })
		else if (param === "showConfirmPassword")
			this.setState({ showConfirmPassword: !this.state.showConfirmPassword })
	}
	handleChange = ({ target: input }) => {
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data });
	};

	validate = (name) => {
		// const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		const { firstName, lastName, email, password, confirmPassword, mobile, gender } = this.state.data
		this.setState({ disableButton: true })

		switch (name) {
			case 'firstName':
				if (firstName.length === 0 || !NAME_REGEX.test(firstName)) {
					const { valueMissing, patternMismatch } = customErrorMessages.name;
					formErrors.firstName = firstName === "" ? valueMissing : patternMismatch;
					this.setState({ disableButton: true })
				} else {
					formErrors.firstName = '';

				}

				break;

			case 'lastName':
				if (lastName.length === 0 || !NAME_REGEX.test(lastName)) {
					const { valueMissing, patternMismatch } = customErrorMessages.name;
					formErrors.lastName = lastName === "" ? valueMissing : patternMismatch;
					this.setState({ disableButton: true })
				} else {
					formErrors.lastName = '';

				}

				break;
			case 'email':
				if (email.length === 0 || !EMAIL_REGEX.test(email)) {
					const { valueMissing, typeMismatch } = customErrorMessages.email;
					formErrors.email = email === "" ? valueMissing : typeMismatch;
					this.setState({ disableButton: true })
				} else {
					formErrors.email = '';

				}

				break;
			case 'password':
				if (password.length === 0 || password.length < 8 || password.length > 12) {
					const { valueMissing, patternMismatch } = customErrorMessages.password;
					formErrors.password = password === "" ? valueMissing : patternMismatch;
					this.setState({ disableButton: true })
				} else if (password === confirmPassword) {
					formErrors.confirmPassword = '';
				} else if (confirmPassword.length > 0 && password !== confirmPassword) {
					formErrors.confirmPassword = 'Password and Confirm Password Mismatched';
				}else {
					formErrors.password = '';
				}

				break;
			case 'confirmPassword':
				if (confirmPassword.length === 0 || confirmPassword.length < 8 || confirmPassword.length > 12) {
					const { valueMissing, patternMismatch } = customErrorMessages.password;
					formErrors.confirmPassword = confirmPassword === "" ? valueMissing : patternMismatch;
					this.setState({ disableButton: true })
				} else if (!(password === confirmPassword)) {
					formErrors.confirmPassword = 'Password and Confirm Password Mismatched';
					this.setState({ disableButton: true })
				} else {
					formErrors.confirmPassword = '';
				}

				break;
			case 'mobile':
				if (mobile.length === 0 || isNaN(mobile) || mobile.length < 10 || mobile.length > 10) {
					const { valueMissing, patternMismatch } = customErrorMessages.mobile;
					formErrors.mobile = mobile === "" ? valueMissing : patternMismatch;
					this.setState({ disableButton: true })
				} else {
					formErrors.mobile = '';
				}

				break;
			case 'gender':
				if (gender.length === 0) {
					formErrors.gender = "Gender field can't be left blank";
					this.setState({ disableButton: true })
				} else {
					formErrors.gender = '';
				}

				break;
			default:
				break;
		}

		console.log("test : ", name);

		if (formErrors.firstName.length === 0 && formErrors.lastName.length === 0 && formErrors.email.length === 0 &&
			formErrors.password.length === 0 && formErrors.confirmPassword.length === 0 && formErrors.mobile.length === 0 &&
			formErrors.gender.length === 0) {
			this.setState({ disableButton: false })
		}


		this.setState({ formErrors });
	}

	render() {

		const { firstName, lastName, email, password, confirmPassword, mobile, gender } = this.state.data
		console.log("data==", firstName, lastName, email, password, confirmPassword, mobile, gender)

		const { formErrors } = this.state;
		console.log("err==",formErrors)
		return (
			<div className="register">
				<div className="register_button">
					<FacebookButton />
					<GoogleButton />
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
										onBlur={()=>this.validate("firstName")}
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
										onBlur={()=>this.validate("lastName")}
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
										onBlur={()=>this.validate("email")}
									/>
								</FormControl>
								{formErrors.email.length > 0 && (
									<span className="errorMessage">{formErrors.email}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl variant="outlined" fullWidth>
									<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
									<OutlinedInput id="outlined-adornment-password"
										type={this.state.showPassword ? 'text' : 'password'}
										label="Password"
										placeholder="Password"
										name="password"
										inputProps={
											{maxLength: 12} 
										}
										onChange={this.handleChange}
										onBlur={()=>this.validate("password")} 
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={() => { this.handleClickShowPassword("showPassword") }}

												>
													{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										} />
								</FormControl>
								{formErrors.password.length > 0 && (
									<span className="errorMessage">{formErrors.password}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl variant="outlined" fullWidth>
									<InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
									<OutlinedInput id="outlined-adornment-password"
										type={this.state.showConfirmPassword ? 'text' : 'password'}
										label="Confirm Password"
										placeholder="Confirm Password"
										name="confirmPassword"
										inputProps={
											{ maxLength: 12 }
										}
										onChange={this.handleChange}
										onBlur={()=>this.validate("confirmPassword")} endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={() => { this.handleClickShowPassword("showConfirmPassword") }}

												>
													{this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										} />
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
										inputProps={
											{ maxLength: 10 }
										}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<CallIcon />
												</InputAdornment>
											),
										}}
										onChange={this.handleChange}
										onBlur={()=>this.validate("mobile")}
									/>
								</FormControl>
								{formErrors.mobile.length > 0 && (
									<span className="errorMessage">{formErrors.mobile}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl component="fieldset">
									<RadioGroup
										aria-label="gender"
										name="gender"
										defaultValue="male"
										onChange={this.handleChange}
										onBlur={()=>this.validate("gender")}
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
										disabled={this.state.disableButton}
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
