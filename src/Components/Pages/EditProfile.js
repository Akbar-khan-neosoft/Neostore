import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom"
import { URL } from '../../Redux/Constants/index';
import '../../Assets/CSS/Register.css';
import { TextField, FormControl, InputAdornment, Button } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import { RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: this.props.data.first_name,
			lastName: this.props.data.last_name,
			_email: this.props.data.email,
			_dob: this.props.data.dob,
			profilePic: '',
			mobile: this.props.data.phone_no,
			_gender: this.props.data.gender,
			disablebutton: true,

			formErrors: {
				firstName: '',
				lastName: '',
				email: '',
				mobile: '',
				gender: '',
				dob: ''
			},
		};
	}

	handleSubmit = async e => {
		e.preventDefault()
		const localData = JSON.parse(localStorage.getItem("loginData"))
		const { firstName, lastName, _gender, _email, mobile, _dob } = this.state

		let editProfileData = {
			first_name: firstName,
			last_name: lastName,
			email: _email,
			phone_no: mobile,
			gender: _gender,
			dob: _dob,
		}
		await axios.put(URL + "profile", editProfileData, { headers: { "Authorization": "Brearer " + localData.token } });

		alert("Profile updated,Redirecting to dashboard")
		this.props.history.push("/")
	};


	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };

		switch (name) {
			case 'firstName':
				if (value.length === 0) {
					formErrors.firstName = "Firstname field can't be left blank,minimum 3 characaters required";
				} else if (!isNaN(value)) {
					formErrors.firstName = 'Numbers not allowed in Firstname';
				} else {
					formErrors.firstName = 'pass';
				}

				break;
			case 'lastName':
				if (value.length === 0) {
					formErrors.lastName = "Lastname field can't be left blank,minimum 3 characaters required";
				} else if (!isNaN(value)) {
					formErrors.lastName = 'Numbers not allowed in Lastname';
				} else {
					formErrors.lastName = 'pass';
				}

				break;
			case 'email':
				if (value.length === 0) {
					formErrors.email = "Email field can't be left blank";
				} else if (!emailRegex.test(value)) {
					formErrors.email = 'invalid email address';

				} else {
					formErrors.email = 'pass';
				}

				break;
			case 'dob':
				if (value.length === 0) {
					formErrors.dob = "Date Of Birth field can't be left blank";
				} else {
					formErrors.dob = 'pass';
				}
				break;
			case 'mobile':
				if (value.length === 0) {
					formErrors.mobile = "Mobile Number field can't be left blank";

				} else if (isNaN(value)) {
					formErrors.mobile = 'Only Numbers allowed in Mobile';

				} else if (value.length < 10 || value.length > 10) {
					formErrors.mobile = 'Only 10 characaters allowed';

				} else {
					formErrors.mobile = 'pass';
				}

				break;
			case 'gender':
				if (value.length === 0) {
					formErrors.gender = "Gender field can't be left blank";
				} else {
					formErrors.gender = 'pass';
				}

				break;
			default:
				break;
		}
		this.setState({ formErrors, [name]: value });
		const { firstName, lastName, _gender, _email, mobile, _dob } = this.state

		if (firstName.length > 0 && lastName.length > 0 && _gender.length > 0 && _email.length > 0 &&
			mobile.length > 0 && _dob !== null) {
			this.setState({ disablebutton: false })
		}

	};

	render() {
		const { first_name, last_name, gender, email, phone_no, dob } = this.props.data
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
								{(formErrors.firstName.length > 0 && formErrors.firstName !== "pass") && (
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
								{(formErrors.lastName.length > 0 && formErrors.lastName !== "pass") && (
									<span className="errorMessage">{formErrors.lastName}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl component="fieldset">
									<RadioGroup
										//defaultValue="male"
										aria-label="gender"
										name="_gender"
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
										name="_dob"
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
								{(formErrors.dob.length > 0 && formErrors.dob !== "pass") && (
									<span className="errorMessage">{formErrors.password}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-email"
										label="Email Address"
										name="_email"
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
								{(formErrors.email.length > 0 && formErrors.email !== "pass") && (
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
								{(formErrors.mobile.length > 0 && formErrors.mobile !== "pass") && (
									<span className="errorMessage">{formErrors.mobile}</span>
								)}
							</div>

							<div className="form_textfield">
								<FormControl component="fieldset">
									<button
										class="btn btn-danger text-uppercase float-left"
										onClick={this.handleSubmit}
										disabled={this.state.disablebutton}
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

export default withRouter(EditProfile);
