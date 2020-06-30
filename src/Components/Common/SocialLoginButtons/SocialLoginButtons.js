import React from 'react';

export const FacebookButton = () => {
	return (
		<div>
			<button className="loginButton" style={{ backgroundColor: 'blue' }}>
				<i className="fa fa-4x fa-facebook" aria-hidden="true"></i>
								Login with Facebook
			</button>
		</div>
	);
};

export const GoogleButton = () => {
	return (
		<button className="loginButton" style={{ backgroundColor: 'red' }}>
			<i className=" fa fa-4x fa-google">    </i> 
			<span>Login with Google</span>
		</button>
	);
};

export const TwitterButton = () => {
	return (
		<div>
			<button className="loginButton" style={{ backgroundColor: 'skyblue' }}>
				<i className="fa fa-4x fa-twitter" aria-hidden="true"></i>
				Login with Twitter
			</button>
		</div>
	);
};
