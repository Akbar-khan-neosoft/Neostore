import React from 'react';
import '../../Assets/CSS/ContactForm.css';
import { FormControl, TextField } from '@material-ui/core';

function ContactForm() {
	return (
		<div className="contactus">
			<div className="contactform">
				<div className="contactformcontrol">
					<h1>Contact Form</h1>
				</div>
				<form>
					<div className="contactformcontrol">
						<FormControl fullWidth className="contactformcontrol">
							<TextField id="outlined-basic" label="Name" variant="outlined" placeholder="Name" />
						</FormControl>
					</div>
					<div className="contactformcontrol">
						<FormControl fullWidth className="contactformcontrol">
							<TextField id="outlined-basic" label="Email" variant="outlined" placeholder="Email" />
						</FormControl>
					</div>
					<div className="contactformcontrol">
						<FormControl fullWidth className="contactformcontrol">
							<TextField
								id="outlined-basic"
								label="Mobile Number"
								variant="outlined"
								placeholder="Mobile Number"
							/>
						</FormControl>
					</div>
					<div className="contactformcontrol">
						<FormControl fullWidth>
							<TextField id="outlined-basic" label="Subject" variant="outlined" placeholder="Subject" />
						</FormControl>
					</div>
					<div className="contactformcontrol">
						<FormControl fullWidth className="contactformcontrol">
							<TextField id="outlined-basic" label="Message" variant="outlined" placeholder="Message" />
						</FormControl>
					</div>
					<div className="contactformcontrol">
						<FormControl component="fieldset" className="contactformcontrol">
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

export default ContactForm;
