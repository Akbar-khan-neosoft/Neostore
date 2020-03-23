import React from "react"
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Components/Pages/Dashboard/Dashboard';
import Login from '../Components/Pages/Login';
import Register from '../Components/Pages/Register';
import ContactForm from '../Components/Common/ContactForm';
import ForgotPassword from '../Components/Common/ForgotPassword';
import Product from '../Components/Pages/Dashboard/Product';
import RecoverPassword from '../Components/Pages/RecoverPassword';
import ProductDetails from '../Components/Pages/ProductDetails';
import Profile from '../Components/Pages/Profile';
import AddNewAddress from '../Components/Pages/AddNewAddress';
import ProtectedRoutes from './ProtectedRoutes'
import ChangePassword from "../Components/Pages/ChangePassword";

function Routes(){
    return(

					
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <ProtectedRoutes exact path="/login" component={Login} />
                        {/* <Route exact path="/login" component={Login} /> */}
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/contactus" component={ContactForm} />
                        <Route excat path="/forgotpassword" component={ForgotPassword} />
                        <Route excat path="/product" component={Product} />
                        <Route excat path="/recoverpassword" component={RecoverPassword} />
                        <Route excat path="/productdetails" component={ProductDetails} />
                        <Route excat path="/myaccount" component={Profile} />
                        <Route excat path="/address" component={AddNewAddress} />
                        <Route excat path="/changepassword" component={ChangePassword} />
                        <ProtectedRoutes excat path="/order" component={Login} />
                    </Switch>
 
    )
}

export default Routes

