import React from 'react';

export const FacebookButton = () => {
	return (
		<div>
			<button className="loginButton" style={{ backgroundColor: 'blue' }}>
				<i class="fa fa-4x fa-facebook" aria-hidden="true"></i>
								Login with Facebook
			</button>
		</div>
	);
};

export const GoogleButton = () => {
	return (
		<button className="loginButton" style={{ backgroundColor: 'red' }}>
			<i class=" fa fa-4x fa-google" aria-hidden="true"></i>
			Login with Google
		</button>
	);
};

export const TwitterButton = () => {
	return (
		<div>
			<button className="loginButton" style={{ backgroundColor: 'skyblue' }}>
				<i class="fa fa-4x fa-twitter" aria-hidden="true"></i>
				Login with Twitter
			</button>
		</div>
	);
};
