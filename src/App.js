import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Login from './Components/Pages/Login';
import Layout from './Components/Main/Layout';
import Register from './Components/Pages/Register';

function App() {
	return (
		<div className="App">
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
					</Switch>
				</Layout>
			</Router>
		</div>
	);
}

export default App;
