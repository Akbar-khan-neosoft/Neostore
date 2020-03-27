import React, { Component } from "react"
import axios from "axios"
import AddNewAddress from "./AddNewAddress"
import {URL} from "../../Redux/Constants"
import EditDeliveryAddress from "./EditDeliveryAddress"


class DeliveryAddress extends Component{
    constructor(){
        super()
        this.state={
            custAddress:[],
            editAddress:false,
            addAddress:false,
            address_id:""
        }
    }

    async componentDidMount(){
        const localData = JSON.parse(localStorage.getItem("loginData"))
        
        const res = await axios.get(URL + "getCustAddress", {headers : {"Authorization": "Brearer " + localData.token }})
        console.log(res.data.customer_address)
        
        this.setState({custAddress:res.data.customer_address})
    }

    editAddressHandle=(add_id)=>{
        this.setState({editAddress:!this.state.editAddress,address_id:add_id})
    }

    addNewAddressHandle=()=>{
        this.setState({addAddress:!this.state.addAddress})
    }

    // deleteAddressHandle= async(add_id)=>{
    //     const localData = JSON.parse(localStorage.getItem("loginData"))
    //     const res = await axios.delete(URL + "deladdress/" + add_id, {headers : {"Authorization": "Brearer " + localData.token }})
    //     alert(res.data.message)
    //     // this.props.history.push('/myaccount');
       
    // }

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
                   <div><button onClick={()=>this.editAddressHandle(res.address_id)}>Edit</button></div>
                   {/* <div><button onClick={()=>this.deleteAddressHandle(res.address_id)} >Delete</button></div> */}
                   <hr></hr>
               </div>
               )
               })}  
            <div><button onClick={this.addNewAddressHandle}>Add New Address</button><span>&nbsp;&nbsp;</span>
            <button >Place Order</button></div>
            <br></br>
            </div>
            
        )
    }
}

export default DeliveryAddress