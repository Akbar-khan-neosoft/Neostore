import React, { Component } from 'react';

class Login extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="login_container">
				<div className="login_main">
					<div className="login_buttons"></div>
					<div className="login_form"></div>
				</div>
				<div className="login_others"></div>
			</div>
		);
	}
}
