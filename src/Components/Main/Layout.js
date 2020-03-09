import React, { Component } from 'react';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';

class Layout extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Header />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

export default Layout;
