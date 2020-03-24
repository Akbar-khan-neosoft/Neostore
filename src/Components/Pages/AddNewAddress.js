import React, { Component } from "react"
import "../../Assets/CSS/AddNewAddress.css"
import { FormControl, TextField, InputProps } from '@material-ui/core';
import axios from "axios"



class AddNewAddress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            pincode: "",
            city: '',
            state: '',
            country: ""
        }
    }

    onChangeHandle = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleSubmit = async () => {
        console.log("submit");
        
		
		const { address, pincode, city, state, country} = this.state;
			let addAddressData = {
				address: `${address}`,
				pincode: `${pincode}`,
				city: `${city}`,
				state: `${state}`,
				country: `${country}`,
                }
                
                const res = await axios.post("http://localhost:3000/addaddressAPI", addAddressData,{headers : {"Authorization": "Brearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwLCJpYXQiOjE1Nzc3MDQ3OTF9.Xp4iolxxpQDskEIBZTA37hkXlhrmuPpf53auTxD0tNo" }})
        
                // this.setState({custData:res.data.customer_proile})
                console.log(res)

		
	};

    render() {
        return (
            <div className="newaddresscontainer">
                <div><h3>Add New Address</h3></div>
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
                                    value={this.state.address}
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
                                    value={this.state.pincode}
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
                                    value={this.state.city}
                                    onChange={this.onChangeHandle}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField id="outlined-basic"
                                    label="State"
                                    variant="outlined"
                                    placeholder="State"
                                    name="state"
                                    value={this.state.state}
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
                                    value={this.state.country}
                                    onChange={this.onChangeHandle}
                                    />
                            </FormControl>
                        </div>
                        <div className="addnewaddressformcontrol">
                            <FormControl component="fieldset">
                                <button
                                    class="btn"
                                    type="button"
                                    style={{ backgroundColor: 'rgb(21, 103, 226)', color: 'white' }}
                                    onClick={this.handleSubmit}
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

export default AddNewAddress