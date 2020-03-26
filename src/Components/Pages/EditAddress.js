import React, { Component } from "react"
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import "../../Assets/CSS/AddNewAddress.css"
import { FormControl, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { URL } from '../../Redux/Constants/index';

const localData = JSON.parse(localStorage.getItem("loginData"))  

class EditAddress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            pincode: "",
            city: '',
            state: '',
            country: "",
            isDeliveryAddress: false
        }
    }

    onChangeHandle = e => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log("one--",e.target)
        
        this.setState({ [name]: value });
    };

    onSubmitHandle=async()=>{
        
		
		const { address, pincode, city, state, country,isDeliveryAddress} = this.state;
			let addAddressData = {
                address_id:this.props.add_id,
				address: address,
				pincode: pincode,
				city: city,
				state: state,
                country: country,
                isDeliveryAddress:isDeliveryAddress,
                }

                const res = await axios.put(URL + "updateAddress",addAddressData,{headers : {"Authorization": "Brearer " + localData.token }})
                alert(res.data.message + ",You Are Redirected To HomePage Now");
                this.props.history.push("/")
               
    }

    getIndex = (value, arr, prop)=>{
        for(var i = 0; i < arr.length; i++) {
            if(arr[i][prop] === value) {
                return i;
            }
        }
      
    }

    render() {
        
        const index = this.getIndex(this.props.add_id,this.props.custAddress,"address_id")      
        const custaddress=this.props.custAddress[index]
        return (
            <div className="newaddresscontainer">
                <div><h3>Edit Address</h3></div>
                <hr></hr>
                <div className="formcontainer">
                    <form>
                        <div className="addnewaddressformcontrol">
                            <FormControl>
                                <TextField id="outlined-basic"
                                    label="Address"
                                    multiline="true"
                                    rows="3"
                                    variant="outlined"
                                    placeholder="Address"
                                    name="address"
                                    defaultValue={custaddress.address}
                                    onChange={this.onChangeHandle}
                                />
                            </FormControl>
                        </div>
                        <div className="addnewaddressformcontrol">
                            <FormControl>
                                <TextField id="outlined-basic"
                                    label="Pincode"
                                    variant="outlined"
                                    placeholder="Pincode"
                                    name="pincode"
                                    defaultValue={custaddress.pincode}
                                    onChange={this.onChangeHandle}
                                    inputProps={
                                        { maxLength: 6 }
                                    }
                                />
                            </FormControl>
                        </div>
                        <div className="addnewaddressformcontrol">
                            <FormControl>
                                <TextField id="outlined-basic"
                                    label="City"
                                    variant="outlined"
                                    placeholder="City"
                                    name="city"
                                    defaultValue={custaddress.city}
                                    onChange={this.onChangeHandle}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField id="outlined-basic"
                                    label="State"
                                    variant="outlined"
                                    placeholder="State"
                                    name="state"
                                    defaultValue={custaddress.state}
                                    onChange={this.onChangeHandle}
                                />
                            </FormControl>
                        </div>
                        <div className="addnewaddressformcontrol">
                            <FormControl>
                                <TextField id="outlined-basic"
                                    label="Country"
                                    variant="outlined"
                                    placeholder="Country"
                                    name="country"
                                    defaultValue={custaddress.country}
                                    onChange={this.onChangeHandle}
                                />
                            </FormControl>
                        </div>
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
                        <div className="addnewaddressformcontrol">
                            <FormControl component="fieldset">
                                <button
                                    class="btn"
                                    type="button"
                                    style={{ backgroundColor: 'rgb(21, 103, 226)', color: 'white' }}
                                 onClick={this.onSubmitHandle}
                                >
                                    Save
							</button>
                            </FormControl>
                            <FormControl component="fieldset">
                                <button
                                    class="btn"
                                    type="button"
                                    style={{ backgroundColor: 'rgb(21, 103, 226)', color: 'white' }}
                                    onClick={this.props.cancel}
                                >
                                    Cancel
							</button>
                            </FormControl>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(EditAddress)