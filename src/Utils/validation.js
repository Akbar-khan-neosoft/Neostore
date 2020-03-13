export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const NAME_REGEX = /^[a-zA-Z '.-]+$/;
export const MOBILE_REGEX = /^\d{10}$/;

export const customErrorMessages = {
	name: {
		valueMissing: 'Please enter your name',
		patternMismatch: 'Invalid Name',
	},
	mobile: {
		valueMissing: 'Please enter your mobile number',
		patternMismatch: 'Invalid Mobile Number',
	},
	email: {
		valueMissing: 'Please enter email address',
		typeMismatch: 'Invalid email address',
	},
	password: {
		valueMissing: 'Please enter password',
		patternMismatch: 'Password should have a minimum of 8 characters',
	},
};
