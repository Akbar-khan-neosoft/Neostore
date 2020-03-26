import React, { Component } from "react"
import { Redirect } from "react-router-dom";
import axios from "axios"
import AddNewAddress from "./AddNewAddress"
import EditAddress from "./EditAddress"
import {URL} from "../../Redux/Constants"


const localData = JSON.parse(localStorage.getItem("loginData"))


class MyAddress extends Component{
    constructor(){
        super()
        this.state={
            custAddress:[],
            editAddress:false,
            addAddress:false
        }
    }

    async componentDidMount(){
        
        const res = await axios.get(URL + "getCustAddress", {headers : {"Authorization": "Brearer " + localData.token }})
        console.log(res.data.customer_address)
        
        this.setState({custAddress:res.data.customer_address})
    }

    editAddressHandle=()=>{
        this.setState({editAddress:!this.state.editAddress})
    }

    addNewAddressHandle=()=>{
        this.setState({addAddress:!this.state.addAddress})
    }

    deleteAddressHandle= async(add_id)=>{
        const res = await axios.delete(URL + "deladdress/" + add_id, {headers : {"Authorization": "Brearer " + localData.token }})
        alert(res.data.message)
        // this.props.history.push('/myaccount');
       
    }

    render(){
        const {custAddress}=this.state

        return(
            this.state.addAddress ? <AddNewAddress cancel={this.addNewAddressHandle}/> : this.state.editAddress ? <EditAddress custAddress = {custAddress} cancel={this.editAddressHandle}/> :
            <div>
            <div>Addresses :</div>
            <hr></hr>
               {this.state.custAddress.map(res=>{
                   return ( <div key={res.address_id}>
                  
                   {res.address}<br></br>
                   {res.city} -{res.pincode}<br></br>
                   {res.state}<br></br>
                   {res.country}<br></br>
                   <div><button onClick={this.editAddressHandle}>Edit</button></div>
                   <div><button onClick={()=>this.deleteAddressHandle(res.address_id)} >Delete</button></div>
                   <hr></hr>
               </div>
               )
               })}  
            <div><button onClick={this.addNewAddressHandle}>Add New Address</button></div>
            </div>
        )
    }
}

export default MyAddress