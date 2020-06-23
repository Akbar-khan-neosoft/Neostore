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
import { EMAIL_REGEX, NAME_REGEX, customErrorMessages } from '../../Utils/validation'



class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: this.props.data.first_name,
			lastName: this.props.data.last_name,
			_email: this.props.data.email,
			_dob: this.props.data.dob,
			profilePic: this.props.data.profile_img,
			mobile: this.props.data.phone_no,
			_gender: this.props.data.gender,
			disablebutton: true,

			formErrors: {
				firstName: '',
				lastName: '',
				email: '',
				mobile: '',
				gender: '',
				dob: '',
			},
		};
	}

	handleSubmit = async e => {
		e.preventDefault()
		const localData = JSON.parse(localStorage.getItem("loginData"))
		const { firstName, lastName, _gender, _email, mobile, _dob, profilePic } = this.state
		let profileData = new FormData();
			profileData.append("first_name", firstName);
			profileData.append("last_name", lastName);
			profileData.append("email", _email);
			profileData.append("phone_no", mobile);
			profileData.append("gender", _gender);
			profileData.append("dob", _dob);
			profileData.append("profile_img", profilePic);

		await axios.put(URL + "profile", profileData, { headers: { "Authorization": "Brearer " + localData.token } });
		alert("Profile updated,Redirecting to dashboard")
		this.props.history.push("/")
	};

	imageUploadHandle = (e) => {
		const imagefile = e.target.files[0]
		this.setState({ profilePic: imagefile })
	}
	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	validate = (name) => {
		let formErrors = { ...this.state.formErrors };
		const { firstName, lastName, _email, _dob, mobile, _gender } = this.state
		this.setState({ disablebutton: true })

		switch (name) {
			case 'firstName':
				if (firstName.length === 0 || !NAME_REGEX.test(firstName)) {
					const { valueMissing, patternMismatch } = customErrorMessages.name;
					formErrors.firstName = firstName === "" ? valueMissing : patternMismatch;
					this.setState({ disablebutton: true })
				} else {
					formErrors.firstName = '';
				}

				break;

			case 'lastName':
				if (lastName.length === 0 || !NAME_REGEX.test(lastName)) {
					const { valueMissing, patternMismatch } = customErrorMessages.name;
					formErrors.lastName = lastName === "" ? valueMissing : patternMismatch;
					this.setState({ disablebutton: true })
				} else {
					formErrors.lastName = '';

				}

				break;
			case '_email':
				if (_email.length === 0 || !EMAIL_REGEX.test(_email)) {
					const { valueMissing, typeMismatch } = customErrorMessages.email;
					formErrors.email = _email === "" ? valueMissing : typeMismatch;
					this.setState({ disablebutton: true })
				} else {
					formErrors.email = '';

				}

				break;
			case 'mobile':
				if (mobile.length === 0 || isNaN(mobile) || mobile.length < 10 || mobile.length > 10) {
					const { valueMissing, patternMismatch } = customErrorMessages.mobile;
					formErrors.mobile = mobile === "" ? valueMissing : patternMismatch;
					this.setState({ disablebutton: true })
				} else {
					formErrors.mobile = '';
				}

				break;
			case '_dob':
				if (_dob.length === 0) {
					formErrors.dob = "Full DOB Required"
					this.setState({ disablebutton: true })
				} else {
					formErrors.dob = '';
				}

				break;

			case '_gender':
				if (_gender.length === 0) {
					formErrors.gender = "Gender field can't be left blank";
					this.setState({ disablebutton: true })
				} else {
					formErrors.gender = '';
				}

				break;
			default:
				break;
		}

		if (formErrors.firstName.length === 0 && formErrors.lastName.length === 0 && formErrors.email.length === 0 &&
			formErrors.dob.length === 0 && formErrors.mobile.length === 0 &&
			formErrors.gender.length === 0) {
			this.setState({ disablebutton: false })
		}


		this.setState({ formErrors });
	}



	render() {
		const { firstName, lastName, _gender, _email, mobile, _dob,profilePic } = this.state

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
										defaultValue={firstName}
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
										onBlur={() => this.validate("firstName")}
									/>
								</FormControl>
								{(formErrors.firstName.length > 0) && (
									<span className="errorMessage">{formErrors.firstName}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-lastName"
										label="Last Name"
										name="lastName"
										defaultValue={lastName}
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
										onBlur={() => this.validate("lastName")}

									/>
								</FormControl>
								{(formErrors.lastName.length > 0) && (
									<span className="errorMessage">{formErrors.lastName}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl component="fieldset">
									<RadioGroup
										//defaultValue="male"
										aria-label="gender"
										name="_gender"
										defaultValue={_gender}
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
										defaultValue={_dob}
										onChange={this.handleChange}
										onBlur={() => this.validate("_dob")}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</FormControl>
								{(formErrors.dob.length > 0) && (
									<span className="errorMessage">{formErrors.dob}</span>
								)}
							</div>
							<div className="form_textfield">
								<FormControl fullWidth>
									<TextField
										id="outlined-email"
										label="Email Address"
										name="_email"
										defaultValue={_email}
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
										onBlur={() => this.validate("_email")}

									/>
								</FormControl>
								{(formErrors.email.length > 0) && (
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
									onChange={this.imageUploadHandle}
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
										defaultValue={mobile}
										placeholder="Mobile Number"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<CallIcon />
												</InputAdornment>
											),
										}}
										onChange={this.handleChange}
										onBlur={() => this.validate("mobile")}
									/>
								</FormControl>
								{(formErrors.mobile.length > 0) && (
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
								</FormControl> &nbsp;&nbsp;&nbsp;&nbsp;
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
