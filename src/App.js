import React from 'react';
import Layout from './Components/Main/Layout';
import DashboardCarousel from './Components/Pages/Dashboard_Slider/Dashboard_Slider';

function App() {
	return (
		<div className="App">
			<Layout>
				<DashboardCarousel />
			</Layout>
		</div>
	);
}

export default App;
