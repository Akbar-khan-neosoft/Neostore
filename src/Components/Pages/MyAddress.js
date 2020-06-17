import React, { Component } from "react"
import axios from "axios"
import { withRouter } from "react-router-dom"
import AddNewAddress from "./AddNewAddress"
import EditAddress from "./EditAddress"
import { URL } from "../../Redux/Constants"


class MyAddress extends Component {
    constructor() {
        super()
        this.state = {
            custAddress: [],
            editAddress: false,
            addAddress: false,
            address_id: ""
        }
    }

    async componentDidMount() {
        const localData = JSON.parse(localStorage.getItem("loginData"))
        const res = await axios.get(URL + "getCustAddress", { headers: { "Authorization": "Brearer " + localData.token } })
        this.setState({ custAddress: res.data.customer_address })
    }

    editAddressHandle = (add_id) => {
        this.setState({ editAddress: !this.state.editAddress, address_id: add_id })
    }

    addNewAddressHandle = () => {
        this.setState({ addAddress: !this.state.addAddress })
    }

    deleteAddressHandle = async (add_id) => {
        const localData = JSON.parse(localStorage.getItem("loginData"))
        const res = await axios.delete(URL + "deladdress/" + add_id, { headers: { "Authorization": "Brearer " + localData.token } })
        alert(res.data.message)
        this.props.history.push('/');

    }

    render() {
        const { custAddress } = this.state

        return (
            custAddress.length !== 0 ?
                this.state.addAddress ? <AddNewAddress cancel={this.addNewAddressHandle} /> : this.state.editAddress ? <EditAddress custAddress={custAddress} cancel={this.editAddressHandle} add_id={this.state.address_id} /> :
                    <div>
                        <div>Addresses :</div>
                        <hr></hr>
                        {this.state.custAddress.map(res => {
                            return (<div key={res.address_id}>

                                {res.address}<br></br>
                                {res.city} -{res.pincode}<br></br>
                                {res.state}<br></br>
                                {res.country}<br></br>
                                <div>
                                    <span><button onClick={() => this.editAddressHandle(res.address_id)}>Edit</button></span> &nbsp;&nbsp;&nbsp;
                                    <span> <button onClick={() => this.deleteAddressHandle(res.address_id)} >Delete</button></span>
                                </div>
                                <hr></hr>
                            </div>
                            )
                        })}
                        <div><button onClick={this.addNewAddressHandle}>Add New Address</button></div>
                    </div> : this.state.addAddress ? <AddNewAddress cancel={this.addNewAddressHandle} /> :
                    <div><h1>You Have Not Added Any Address, Kindly Add your Address</h1><br></br>
                        <div><button onClick={this.addNewAddressHandle}>Add New Address</button></div></div>
        )
    }
}

export default withRouter(MyAddress)