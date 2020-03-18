import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Login from './Components/Pages/Login';
import Layout from './Components/Main/Layout';
import Register from './Components/Pages/Register';
import store from '../src/Redux/Store';
import ContactForm from './Components/Common/ContactForm';
import ForgotPassword from './Components/Common/ForgotPassword';
import Product from './Components/Pages/Dashboard/Product';
import RecoverPassword from './Components/Pages/RecoverPassword';
// console.log(store.getState());

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Layout>
						<Switch>
							<Route exact path="/" component={Dashboard} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/contactus" component={ContactForm} />
							<Route excat path="/forgotpassword" component={ForgotPassword} />
							<Route excat path="/product" component={Product} />
							<Route excat path="/recoverpassword" component={RecoverPassword} />

						</Switch>
					</Layout>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
