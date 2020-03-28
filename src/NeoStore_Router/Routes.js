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
import ProtectedRoutes from "../NeoStore_Router/ProtectedRoutes"

import ChangePassword from "../Components/Pages/ChangePassword";
import Order from "../Components/Pages/Order";
import Cart from "../Components/Pages/Cart";

function Routes(){
    return(

					
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/contactus" component={ContactForm} />
                        <Route exact path="/forgotpassword" component={ForgotPassword} />
                        <Route exact path="/product" component={Product} />
                        <Route exact path="/recoverpassword" component={RecoverPassword} />
                        <Route exact path="/productdetails" component={ProductDetails} />
                        <ProtectedRoutes exact path="/myaccount" component={Profile} />
                        <Route exact path="/address" component={AddNewAddress} />
                        <Route exact path="/changepassword" component={ChangePassword} />
                        <Route exact path="/cart" component={Cart} />

                        <ProtectedRoutes exact path="/order" component={Order} />
                    </Switch>
 
    )
}

export default Routes

