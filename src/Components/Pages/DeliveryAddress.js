import React, { Component } from "react"
import axios from "axios"
import AddNewAddress from "./AddNewAddress"
import {URL} from "../../Redux/Constants"
import EditDeliveryAddress from "./EditDeliveryAddress"
import { FormControl, Checkbox, FormControlLabel } from '@material-ui/core';
import {placeOrderAPI} from "../../API/API"



class DeliveryAddress extends Component{
    constructor(props){
        super(props)
        this.state={
            custAddress:[], 
            editAddress:false,
            addAddress:false,
            address_id:"",
            isDeliveryAddress: false
        }
    }

    async componentDidMount(){
        const localData = JSON.parse(localStorage.getItem("loginData"))

        if(localData){
        
        const res = await axios.get(URL + "getCustAddress", {headers : {"Authorization": "Brearer " + localData.token }})
        console.log(res.data.customer_address)
        
        this.setState({custAddress:res.data.customer_address})
        }
    }

    editAddressHandle=(add_id)=>{
        this.setState({editAddress:!this.state.editAddress,address_id:add_id})
    }

    addNewAddressHandle=()=>{
        this.setState({addAddress:!this.state.addAddress})
    }

    onClickPlaceOrder = async()=>{
        console.log("hit")
        console.log(this.props.data)
    }

    render(){
        const {custAddress}=this.state

        return(
            this.state.addAddress ? <AddNewAddress cancel={this.addNewAddressHandle} save={this.props.save}/> : this.state.editAddress ? <EditDeliveryAddress save={this.props.save} custAddress = {custAddress} cancel={this.editAddressHandle} add_id={this.state.address_id}/> :
            <div>
            <div><h1>Addresses :</h1></div>
            <hr></hr>
               {this.state.custAddress.map(res=>{
                   return ( <div  key={res.address_id}>
                  
                   {res.address}<br></br>
                   {res.city} -{res.pincode}<br></br>
                   {res.state}<br></br>
                   {res.country}<br></br>
                   <div>
                            <FormControl>
                                <FormControlLabel
                                    name="isDeliveryAddress"
                                    // value="isDeliveryAddress"
                                    control={<Checkbox color="primary" />}
                                    label="Is Delivery Address"
                                    labelPlacement="start"
                                    onChange={this.onChangeHandle}
                                /></FormControl>
                        </div>
                   <div><button onClick={()=>this.editAddressHandle(res.address_id)}>Edit</button></div>
                   {/* <div><button onClick={()=>this.deleteAddressHandle(res.address_id)} >Delete</button></div> */}
                   <hr></hr>
               </div>
               )
               })}  
            <div><button onClick={this.addNewAddressHandle}>Add New Address</button><span>&nbsp;&nbsp;</span>
            <button onClick={this.onClickPlaceOrder}>Place Order</button></div>
            <br></br>
            </div>
            
        )
    }
}

export default DeliveryAddress