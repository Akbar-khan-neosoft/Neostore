import React, { Component } from 'react';
import DashboardCarousel from './Dashboard_Slider/Dashboard_Slider';
import Dashboard_Popular_Product from './Dashboard_Popular_Product/Dashboard_Popular_Product';

class Dashboard extends Component {
	render() {
		return (
			<div>
				<DashboardCarousel />
				<Dashboard_Popular_Product />
			</div>
		);
	}
}

export default Dashboard;
