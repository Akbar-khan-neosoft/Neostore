import React from 'react';
import Layout from './Components/Main/Layout';
import DashboardCarousel from './Components/Pages/Dashboard/Dashboard_Slider/Dashboard_Slider';
import Dashboard_Popular_Product from './Components/Pages/Dashboard/Dashboard_Popular_Product/Dashboard_Popular_Product';

function App() {
	return (
		<div className="App">
			<Layout>
				<DashboardCarousel />
				<Dashboard_Popular_Product />
			</Layout>
		</div>
	);
}

export default App;
