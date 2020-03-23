import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import Layout from './Components/Main/Layout';
import store from '../src/Redux/Store';
import Routes from './NeoStore_Router/Routes';


function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Layout>
						<Routes/>
						{/* <Switch>
							<Route exact path="/" component={Dashboard} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/contactus" component={ContactForm} />
							<Route excat path="/forgotpassword" component={ForgotPassword} />
							<Route excat path="/product" component={Product} />
							<Route excat path="/recoverpassword" component={RecoverPassword} />
							<Route excat path="/productdetails" component={ProductDetails} />
							<Route excat path="/myaccount" component={Profile} />
							<Route excat path="/address" component={AddNewAddress} />
						</Switch> */}
					</Layout>
					
				</Router>
			</Provider>
		</div>
	);
}


export default App;
