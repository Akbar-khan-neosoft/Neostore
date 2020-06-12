import React, { Component } from 'react';
import axios from "axios";
import '../../Assets/CSS/ForgotPassword.css';
import { FormControl, TextField } from '@material-ui/core';
import { URL } from "../../Redux/Constants"
import { EMAIL_REGEX } from '../../Utils/validation'


class ForgotPassword extends Component {

	constructor() {
		super()
		this.state = {
			email: '',
			disableButton: true,
			formError: false,
			errorMsg: ''
		}
	}

	onChangeHandle = (e) => {
		this.setState({ email: e.target.value })
	}

	validate = () => {
		if (this.state.email.length === 0) {
			this.setState({ formError: true, errorMsg:"Email is required", disableButton: true })
		} else if (!EMAIL_REGEX.test(this.state.email)) {
			this.setState({ formError: true, errorMsg:"Invalid Email", disableButton: true })
		} else {
			this.setState({  formError: false, disableButton: false })
		}
	}

	onSubmitHandle = async () => {
		const data = {
			email: this.state.email
		};

		const res = await axios.post(URL + 'forgotPassword', data);
		if (res.data.success) {
			localStorage.setItem('data', JSON.stringify(res.data));
			alert(res.data.otp)
			this.props.history.push("recoverpassword")
		}


	}

	render() {
		return (
			<div className="forgotpassword">
				<div className="forgotpasswordform">
					<div className="forgotpasswordformcontrol">
						<h1>Recover Password</h1>
					</div>
					<hr></hr>
					<form>
						<div className="forgotpasswordformcontrol">
							<FormControl fullWidth>
								<TextField id="outlined-basic"
									label="Email"
									variant="outlined" placeholder="Email" name="email" value={this.state.email} onChange={this.onChangeHandle}  onBlur={this.validate}/>
							</FormControl>
							{this.state.formError && (
									<span style={{color: "red",fontsize: "12px",fontweight: "700"}}>{this.state.errorMsg}</span>
								)}
						</div>

						<div className="contactformcontrol">
							<FormControl component="fieldset">
								<button
									class="btn"
									type="button"
									disabled={this.state.disableButton}
									style={{ backgroundColor: 'rgb(21, 103, 226)', color: 'white' }}
									onClick={this.onSubmitHandle}
								>
									Submit
							</button>
							</FormControl>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
