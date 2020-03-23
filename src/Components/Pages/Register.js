import React, { Component } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { URL } from '../../Redux/Constants/index';
import '../../Assets/CSS/Register.css';
import { TextField, FormControl,OutlinedInput,InputLabel,IconButton ,inputprops, InputAdornment } from '@material-ui/core';
import {Visibility,VisibilityOff} from '@material-ui/icons';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { GoogleButton, FacebookButton } from '../Common/SocialLoginButtons/SocialLoginButtons';
import {EMAIL_REGEX,NAME_REGEX,customErrorMessages} from '../../Utils/validation'


const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
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
			data:{
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			mobile: '',
			gender: ''
			},
			showPassword:false,
			showConfirmPassword:false,
			disableButton:true,
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
	

		if (this.state.disableButton === false) {
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
		}};

	handleClickShowPassword =(param)=>{
        if(param==="showPassword")
        this.setState({showPassword: !this.state.showPassword})
        else  if(param==="showConfirmPassword")
        this.setState({showConfirmPassword: !this.state.showConfirmPassword})
    }
	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		this.setState({disableButton:true})

		switch (name) {
			case 'firstName':
				if (value.length === 0 ||!NAME_REGEX.test(value)) {
					const { valueMissing, patternMismatch } = customErrorMessages.name;
					formErrors.firstName = value === "" ? valueMissing : patternMismatch;
					this.setState({disableButton:true})
				}else {
					formErrors.firstName = '';
					
				}

				break;

			case 'lastName':
				if (value.length === 0|| !NAME_REGEX.test(value)) {
					const { valueMissing, patternMismatch } = customErrorMessages.name;
					formErrors.lastName = value === "" ? valueMissing : patternMismatch;
					this.setState({disableButton:true})
				} else {
					formErrors.lastName = '';
					
				}

				break;
			case 'email':
				if (value.length === 0|| !EMAIL_REGEX.test(value)) {
					const { valueMissing, typeMismatch } = customErrorMessages.email;
					formErrors.email = value === "" ? valueMissing : typeMismatch;
					this.setState({disableButton:true})
				} else {
					formErrors.email = '';
				
				}

				break;
			case 'password':
				if (value.length === 0 ||value.length < 8 || value.length > 12) {
					const { valueMissing, patternMismatch } = customErrorMessages.password;
					formErrors.password = value === "" ? valueMissing : patternMismatch;
					this.setState({disableButton:true})
				} else if(value===this.state.confirmPassword) {
					formErrors.confirmPassword = '';
				}else {
					formErrors.password = '';
				}

				break;
			case 'confirmPassword':
				if (value.length === 0 ||value.length < 8 || value.length > 12) {
					const { valueMissing, patternMismatch } = customErrorMessages.password;
					formErrors.confirmPassword = value === "" ? valueMissing : patternMismatch;
					this.setState({disableButton:true})
				} else if (!(this.state.password === value)) {
					formErrors.confirmPassword = 'Password and Confirm Password Mismatched';
					this.setState({disableButton:true})
				} else {
					formErrors.confirmPassword = '';
				}

				break;
			case 'mobile':
				if (value.length === 0||isNaN(value)||value.length < 10 || value.length > 10) {
					const { valueMissing, patternMismatch } = customErrorMessages.mobile;
					formErrors.mobile = value === "" ? valueMissing : patternMismatch;
					this.setState({disableButton:true})
				} else {
					formErrors.mobile = '';
				}

				break;
			case 'gender':
				if (value.length === 0) {
					formErrors.gender = "Gender field can't be left blank";
					this.setState({disableButton:true})
				} else {
					formErrors.gender = '';
				}

				break;
			default:
				break;
		}
		
		console.log("test : ",formErrors.firstName.length,);
		
		if(formErrors.firstName.length === 0 && formErrors.lastName.length === 0 && formErrors.email.length === 0 &&
			formErrors.password.length === 0 && formErrors.confirmPassword.length === 0 && formErrors.mobile.length === 0 && 
			formErrors.gender.length === 0){
				this.setState({disableButton:false})
			}



		this.setState({ formErrors, [name]: value });
	};

	render() {
		// const{firstName,lastName,email,password,confirmPassword,mobile,gender} =this.state.data
		const { formErrors } = this.state;
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
							<FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput id="outlined-adornment-password"
                                   type={this.state.showPassword ? 'text' : 'password'}
                                   label="Password"
                                    placeholder="Password" 
									name="password" 
									inputProps={
										{ maxLength: 12 }
									}
                                    onChange={this.handleChange} endAdornment={
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>{this.handleClickShowPassword("showPassword")}}
                                          
                                          >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                          </IconButton>
                                        </InputAdornment>
                                      }/>
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
                                    onChange={this.handleChange} endAdornment={
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>{this.handleClickShowPassword("showConfirmPassword")}}
                                          
                                          >
                                            {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                          </IconButton>
                                        </InputAdornment>
                                      }/>
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
