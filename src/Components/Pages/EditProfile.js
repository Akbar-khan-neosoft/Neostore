import React, { Component } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { URL } from '../../Redux/Constants/index';
import '../../Assets/CSS/Register.css';
import { TextField, FormControl, InputAdornment, Button } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { GoogleButton, FacebookButton } from '../Common/SocialLoginButtons/SocialLoginButtons';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
let allOk = false;
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
class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				firstName: '',
				lastName: '',
				email: '',
				dob: '',
				profilePic: '',
				mobile: '',
				gender: ''
			},
			formErrors: {
				firstName: '',
				lastName: '',
				email: '',
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
			const { firstName, lastName, email, dob, mobile, profilePic, gender } = this.state.data;
			let editProfileData = {
				first_name: `${firstName}`,
				last_name: `${lastName}`,
				email: `${email}`,
				gender: `${gender}`,
				phone_no: `${mobile}`,
				dob:`${dob}`,
				profile_img:`${profilePic}`
			};


			} else {
			alert('FORM INVALID - Kindly Fill The form Completly');
		}
	};

	// handleCancel=()=>{
	// 	this.props.history.push("/myaccount");
	// }
	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		allOk = false;

		switch (name) {
			case 'firstName':
				if (value.length === 0) {
					formErrors.firstName = "Firstname field can't be left blank,minimum 3 characaters required";
					allOk = true;
				} else if (!isNaN(value)) {
					formErrors.firstName = 'Numbers not allowed in Firstname';
					allOk = true;
				} else {
					formErrors.firstName = '';
				}

				break;
			case 'lastName':
				if (value.length === 0) {
					formErrors.lastName = "Lastname field can't be left blank,minimum 3 characaters required";
					allOk = true;
				} else if (!isNaN(value)) {
					formErrors.lastName = 'Numbers not allowed in Lastname';
					allOk = true;
				} else {
					formErrors.lastName = '';
				}

				break;
			case 'email':
				if (value.length === 0) {
					formErrors.email = "Email field can't be left blank";
					allOk = true;
				} else if (!emailRegex.test(value)) {
					formErrors.email = 'invalid email address';
					allOk = true;
				} else {
					formErrors.email = '';
				}

				break;
			// // case 'password':
			// // 	if (value.length === 0) {
			// // 		formErrors.password = "Password field can't be left blank";
			// // 		allOk = true;
			// // 	} else if (value.length < 8) {
			// // 		formErrors.password = 'invalid email address';
			// // 		allOk = true;
			// // 	} else {
			// // 		formErrors.password = '';
			// // 	}

			// // 	break;
			// // case 'confirmPassword':
			// // 	if (value.length === 0) {
			// // 		formErrors.confirmPassword = "Confirm Password field can't be left blank";
			// // 		allOk = true;
			// // 	} else if (value.length < 8) {
			// // 		formErrors.confirmPassword = 'invalid email address';
			// // 		allOk = true;
			// // 	} else if (!(this.state.password === value)) {
			// // 		formErrors.confirmPassword = 'Password and Confirm Password Mismatched';
			// // 	} else {
			// // 		formErrors.confirmPassword = '';
			// // 	}

			// 	break;
			case 'mobile':
				if (value.length === 0) {
					formErrors.mobile = "Mobile Number field can't be left blank";
					allOk = true;
				} else if (isNaN(value)) {
					formErrors.mobile = 'Only Numbers allowed in Mobile';
					allOk = true;
				} else if (value.length < 10 || value.length > 10) {
					formErrors.mobile = 'Only 10 characaters allowed';
					allOk = true;
				} else {
					formErrors.mobile = '';
				}

				break;
			case 'gender':
				if (value.length === 0) {
					formErrors.gender = "Gender field can't be left blank";
					allOk = true;
				} else {
					formErrors.gender = '';
				}

				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value });
	};

	render() {
		const { first_name, last_name, gender, email, phone_no, dob,profilePic } = this.props.data
		const { formErrors } = this.state;
		return (
			<div className="register">
				<div class="form_card" style={{ width: '90%' }}>
					<div className="register_form">
						<form>
							<h3 className="form_textfield">Edit Profile</h3>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-firstName"
										label="First Name"
										name="firstName"
										defaultValue={first_name}
										// value={this.state.firstName}
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
										defaultValue={last_name}
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
								<FormControl component="fieldset">
									<RadioGroup
										//defaultValue="male"
										aria-label="gender"
										name="gender"
										defaultValue={gender}
										onChange={this.handleChange}
									>Gender :
										<FormControlLabel value="male" control={<Radio />} label="Male" />
										<FormControlLabel value="female" control={<Radio />} label="Female" />
									</RadioGroup>
								</FormControl>
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-dob"
										label="Date Of Birth"
										name="dob"
										type="date"
										variant="outlined"
										// placeholder=""
										defaultValue={dob}
										onChange={this.handleChange}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</FormControl>
								{/* {formErrors.dob.length > 0 && (
									<span className="errorMessage">{formErrors.password}</span>
								)} */}
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-email"
										label="Email Address"
										name="email"
										defaultValue={email}
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
								<input
									accept="image/*"
									name="profilePic"
									style={{ display: 'none' }}
									id="raised-button-file"
									multiple
									type="file"
								/>
								<label htmlFor="raised-button-file">
									<Button variant="raised" component="span">
										Upload Profile Picture
  </Button>
								</label>
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-mobile"
										label="Mobile Number"
										name="mobile"
										variant="outlined"
										defaultValue={phone_no}
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
									<button
										class="btn btn-danger text-uppercase float-left"
										onClick={this.handleSubmit}
										type="submit"
									>
										save
									</button>
								</FormControl>
								<FormControl component="fieldset">
									<button
										class="btn btn-danger text-uppercase float-left"
										onClick={this.props.cancel}
										type="submit"
									>
										Cancel
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

export default EditProfile;
