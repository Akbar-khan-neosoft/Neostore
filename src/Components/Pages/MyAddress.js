import React, { Component } from "react"
import axios from "axios"
import AddNewAddress from "./AddNewAddress"
import EditAddress from "./EditAddress"

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
        const res = await axios.get("http://localhost:3000/listaddressAPI", {headers : {"Authorization": "Brearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwLCJpYXQiOjE1Nzc3MDQ3OTF9.Xp4iolxxpQDskEIBZTA37hkXlhrmuPpf53auTxD0tNo" }})
        console.log(res.data.customer_address[0])
        
        this.setState({custAddress:res.data.customer_address[0]})
    }

    editAddressHandle=()=>{
        this.setState({editAddress:!this.state.editAddress})
    }

    addNewAddressHandle=()=>{
        this.setState({addAddress:!this.state.addAddress})
    }

    render(){
        const {custAddress}=this.state

        return(
            this.state.addAddress ? <AddNewAddress cancel={this.addNewAddressHandle}/> : this.state.editAddress ? <EditAddress custAddress = {custAddress} cancel={this.editAddressHandle}/> :
            <div>
            <div>Addresses :</div>
            <hr></hr>
                 
            <div>
                {custAddress.address}<br></br>
                {custAddress.city} -{custAddress.pincode}<br></br>
                {custAddress.state}<br></br>
                {custAddress.country}<br></br>
                <div><button onClick={this.editAddressHandle}>Edit</button></div>
                <div><button >Delete</button></div>
            </div>
            <hr></hr>
            <div><button onClick={this.addNewAddressHandle}>Add New Address</button></div>
            </div>
        )
    }
}

export default MyAddress