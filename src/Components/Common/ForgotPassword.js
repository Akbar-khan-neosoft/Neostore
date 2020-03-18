import React, { Component } from 'react';
import axios from "axios";
import '../../Assets/CSS/ForgotPassword.css';
import { FormControl, TextField } from '@material-ui/core';
import {URL} from "../../Redux/Constants"

class ForgotPassword extends Component {

	constructor(){
		super()
		this.state={
			email:''
		}
	}

	onChangeHandle=(e)=>{
		this.setState({email:e.target.value})
	}

	onSubmitHandle= async()=>{
		const data ={
			email : this.state.email
		} ;
			console.log("button clicked");
		const res = await axios.post(URL + 'forgotPassword' , data);
		if(res.data.success){
			
			localStorage.setItem('otp', JSON.stringify(res.data.otp));
			alert(res.data.message)
			this.props.history.push("recoverpassword")
		}
		
		
	}

	render(){
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
							 variant="outlined" placeholder="Email" name="email" value={this.state.email} onChange={this.onChangeHandle}/>
						</FormControl>
					</div>

					<div className="contactformcontrol">
						<FormControl component="fieldset">
							<button
								class="btn"
								type="button"
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
}}

export default ForgotPassword;
