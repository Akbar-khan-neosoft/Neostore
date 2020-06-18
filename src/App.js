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
					</Layout>
				</Router>
			</Provider>
		</div>
	);
}


export default App;
