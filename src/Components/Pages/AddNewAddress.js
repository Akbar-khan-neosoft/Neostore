import React, { Component } from "react"
import "../../Assets/CSS/AddNewAddress.css"
import { FormControl, TextField, InputProps } from '@material-ui/core';


class AddNewAddress extends Component {

    constructor() {
        super()
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
                                    // onClick={this.onSubmitHandle}
                                >
                                    Save
							</button>
                            </FormControl>
                            <FormControl component="fieldset">
                                <button
                                    class="btn"
                                    type="button"
                                    style={{ backgroundColor: 'rgb(21, 103, 226)', color: 'white' }}
                                    // onClick={this.onSubmitHandle}
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