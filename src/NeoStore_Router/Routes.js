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
import ProtectedRoutesLogin from "../NeoStore_Router/ProtectedRoutesLogin"
import ProtectedRoutesLogout from "../NeoStore_Router/ProtectedRoutesLogout"
import ChangePassword from "../Components/Pages/ChangePassword";
import Order from "../Components/Pages/Order";
import Cart from "../Components/Pages/Cart";
import LocateUs from "../Components/Pages/LocateUs";
import OrderPlaced from "../Components/Pages/OrderPlaced";
import NoProductError from "../Components/Pages/NoProductError";
import PageNotFound from "../Components/Pages/PageNotFound";

function Routes(){
    return(

                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <ProtectedRoutesLogin exact path="/login" component={Login} />
                        <ProtectedRoutesLogin exact path="/register" component={Register} />
                        <Route exact path="/contactus" component={ContactForm} />
                        <Route exact path="/forgotpassword" component={ForgotPassword} />
                        <Route path="/product" component={Product} />
                        <Route exact path="/recoverpassword" component={RecoverPassword} />
                        <Route exact path="/productdetails" component={ProductDetails} />
                        <ProtectedRoutesLogout exact path="/myaccount" component={Profile} />
                        <ProtectedRoutesLogout exact path="/address" component={AddNewAddress} />
                        <ProtectedRoutesLogout exact path="/changepassword" component={ChangePassword} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/locateus" component={LocateUs} />
                        <ProtectedRoutesLogout exact path="/order" component={Order} />
                        <ProtectedRoutesLogin exact path="/orderplaced" component={OrderPlaced} />
                        <Route exact path="/productnotavailable" component={NoProductError} />
                        <Route component={PageNotFound}/>

                    </Switch>
 
    )
}

export default Routes

