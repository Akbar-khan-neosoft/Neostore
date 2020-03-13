import React from 'react';
import '../../Assets/CSS/ForgotPassword.css';
import { FormControl, TextField } from '@material-ui/core';

function ForgotPassword() {
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
							<TextField id="outlined-basic" label="Email" variant="outlined" placeholder="Email" />
						</FormControl>
					</div>

					<div className="contactformcontrol">
						<FormControl component="fieldset">
							<button
								class="btn"
								type="submit"
								style={{ backgroundColor: 'rgb(21, 103, 226)', color: 'white' }}
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

export default ForgotPassword;
