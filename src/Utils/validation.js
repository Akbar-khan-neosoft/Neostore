export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const NAME_REGEX = /^[a-zA-Z '.-]+$/;
export const MOBILE_REGEX = /^\d{10}$/;

export const customErrorMessages = {
	name: {
		valueMissing: "Name field can't be left blank,minimum 3 characaters required",
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
		patternMismatch: 'Password should be inbetween 8-12 character',
	},
};
