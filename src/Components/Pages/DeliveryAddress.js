import React, { Component } from "react"
import axios from "axios"
import { withRouter } from 'react-router-dom'
import AddNewAddress from "./AddNewAddress"
import { URL } from "../../Redux/Constants"
import EditDeliveryAddress from "./EditDeliveryAddress"
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import Loading from "../Common/Loading"



class DeliveryAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            custAddress: [],
            editAddress: false,
            addAddress: false,
            address_id: 0,
            isDeliveryAddress: false,
            disablePlaceOrderButton: true,
            addressLength: 0
        }
    }

    async componentDidMount() {
        const localData = JSON.parse(localStorage.getItem("loginData"))

        if (localData) {
            try {
                const res = await axios.get(URL + "getCustAddress", { headers: { "Authorization": "Brearer " + localData.token } })
                this.setState({ custAddress: res.data.customer_address, addressLength: res.data.customer_address.length })
            } catch (error) {
                this.setState({ custAddress: [], addressLength: -1 })
            }
        }
    }

    handleChange = async (event) => {
        this.setState({ address_id: event.target.value })
        const data = this.state.custAddress.map(res => {
            if (res.address_id == event.target.value) {
                res.isDeliveryAddress = true
                return res
            }
            // else {
            //     return {
            //         address: res.address,
            //         address_id: res.address_id,
            //         city: res.city,
            //         country: res.country,
            //         createdAt: res.createdAt,
            //         customer_id: res.customer_id,
            //         isDeliveryAddress: false,
            //         pincode: res.pincode,
            //         state: res.state,
            //         updatedAt: res.state,
            //     }
            // }
        })
        const localData = JSON.parse(localStorage.getItem("loginData"))
        const res = await axios.put(URL + "updateAddress", data[0], { headers: { "Authorization": "Brearer " + localData.token } })
        if (res.data.success === true) {
            alert("Delivery Address Updated")
            this.setState({ disablePlaceOrderButton: false })
        } else {
            alert("Some Error Occured")
        }
    };

    editAddressHandle = (add_id) => {
        this.setState({ editAddress: !this.state.editAddress, address_id: add_id })
    }

    addNewAddressHandle = () => {
        this.setState({ addAddress: !this.state.addAddress })
    }

    onClickPlaceOrder = async () => {
        const localData = JSON.parse(localStorage.getItem("loginData"));
        const localcart = JSON.parse(localStorage.getItem("cart"));
        const data = localcart ? localcart : null
        data.push({ flag: "checkout" })
        try {
            await axios.post(URL + 'addProductToCartCheckout', data, { headers: { "Authorization": "Brearer " + localData.token } });
            localStorage.removeItem('cart');
            this.props.history.push('/orderplaced')
        } catch (error) {
            alert(error);
        }
    }

    render() {
        const { custAddress } = this.state

        return (
            this.state.addAddress ? <AddNewAddress cancel={this.addNewAddressHandle} save={this.props.save} /> : this.state.editAddress ? <EditDeliveryAddress save={this.props.save} custAddress={custAddress} cancel={this.editAddressHandle} add_id={this.state.address_id} /> :

                this.state.addressLength === 0 ? <Loading /> : this.state.addressLength > 0 ?
                    <div>
                        <div><h1>Addresses :</h1></div>
                        <hr></hr>
                        {this.state.custAddress.map(res => {
                            return (
                                <div key={res.address_id}>

                                    {res.address}<br></br>
                                    {res.city} -{res.pincode}<br></br>
                                    {res.state}<br></br>
                                    {res.country}<br></br>
                                    <div>
                                        <FormControl component="fieldset">
                                            <RadioGroup name="isDeliveryAddress" value={this.state.address_id} onChange={this.handleChange}>
                                                <FormControlLabel value={res.address_id} control={<Radio checked={this.state.address_id == res.address_id} />} label="Is Delivery Address" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div><button onClick={() => this.editAddressHandle(res.address_id)}>Edit</button></div>
                                    <hr></hr>
                                </div>
                            )
                        })}
                        <div><button onClick={this.addNewAddressHandle}>Add New Address</button><span>&nbsp;&nbsp;</span>
                            <button disabled={this.state.disablePlaceOrderButton} onClick={this.onClickPlaceOrder}>Place Order</button></div>
                        <br></br>
                    </div> : <div>
                        <div><h1>You Have Not Added Any Address, Kindly Add your Address</h1></div>
                        <div><button onClick={this.addNewAddressHandle}>Add New Address</button></div>
                    </div>


        )
    }
}

export default withRouter(DeliveryAddress)