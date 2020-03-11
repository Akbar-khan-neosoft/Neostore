import React from 'react';
import '../../Assets/CSS/Register.css';
import { TextField, FormControl, InputAdornment, IconButton, InputLabel, Icon, OutlinedInput } from '@material-ui/core';
import { Visibility } from '@material-ui/icons/Visibility';
import { VisibilityOff } from '@material-ui/icons/VisibilityOff';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import { FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';

function Register() {
	const [values, setValues] = React.useState({
		password: '',
		showPassword: false,
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};

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
									id="outlined-basic"
									label="First Name"
									variant="outlined"
									placeholder="First Name"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<TextFieldsIcon />
											</InputAdornment>
										),
									}}
								/>
							</FormControl>
						</div>
						<div className="form_textfield">
							<FormControl fullWidth>
								<TextField
									id="outlined-basic"
									label="Last Name"
									variant="outlined"
									placeholder="Last Name"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<TextFieldsIcon />
											</InputAdornment>
										),
									}}
								/>
							</FormControl>
						</div>
						<div className="form_textfield">
							<FormControl fullWidth>
								<TextField
									id="outlined-basic"
									label="Email Address"
									variant="outlined"
									placeholder="Email Address"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<EmailIcon />
											</InputAdornment>
										),
									}}
								/>
							</FormControl>
						</div>
						<div className="form_textfield">
							<FormControl fullWidth>
								<TextField
									id="outlined-basic"
									label="Password"
									variant="outlined"
									placeholder="Password"
									type={values.showPassword ? 'text' : 'password'}
									value={values.password}
									onChange={handleChange('password')}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{values.showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</div>
						<div className="form_textfield">
							<FormControl fullWidth>
								<TextField
									id="outlined-basic"
									label="Confirm Password"
									variant="outlined"
									placeholder="Confirm Password"
									type={values.showPassword ? 'text' : 'password'}
									value={values.password}
									onChange={handleChange('password')}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{values.showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</div>
						<div className="form_textfield">
							<FormControl fullWidth>
								<TextField
									id="outlined-basic"
									label="Mobile Number"
									variant="outlined"
									placeholder="Mobile Number"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<CallIcon />
											</InputAdornment>
										),
									}}
								/>
							</FormControl>
						</div>
						<div className="form_textfield">
							<FormControl component="fieldset">
								<RadioGroup defaultValue="male" aria-label="gender" name="customized-radios">
									<FormControlLabel value="male" control={<Radio />} label="Male" />
									<FormControlLabel value="female" control={<Radio />} label="Female" />
								</RadioGroup>
							</FormControl>
						</div>
						<div className="form_textfield">
							<FormControl component="fieldset">
								<button class="btn btn-danger text-uppercase float-left" type="submit">
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

export default Register;
