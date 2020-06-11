import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import "../../Assets/CSS/AddNewAddress.css"
import { FormControl, TextField } from '@material-ui/core';
import axios from "axios"
import { URL } from "../../Redux/Constants"


class AddNewAddress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            pincode: "",
            city: '',
            state: '',
            country: "",
            disableButton: true,
            formErrors: {
                address: '',
                pincode: '',
                city: '',
                state: '',
                country: ''
            },
        }
    }

    onChangeHandle = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        this.setState({ disableButton: true })

        switch (name) {
            case 'address':
                if (value.length === 0) {
                    formErrors.address = value === "" ? "Address field can't be left blank" : "Invalid Address";
                    this.setState({ disableButton: true })
                } else {
                    formErrors.address = '';
                }

                break;

            case 'pincode':
                if (value.length === 0 || isNaN(value)) {
                    formErrors.pincode = value === "" ? "pincode field can't be left blank"
                        : isNaN(value) ? "Invalid pincode,Only Number Allowed"
                            : (value.length < 6) ? "Invalid pincode,6 Digit Pincode required"
                                : " ";
                    this.setState({ disableButton: true })
                } else {
                    formErrors.pincode = '';
                }

                break;

            case 'city':
                if (value.length === 0) {
                    formErrors.city = value === "" ? "city field can't be left blank" : "Invalid city";
                    this.setState({ disableButton: true })
                } else {
                    formErrors.city = '';

                }

                break;

            case 'state':
                if (value.length === 0) {
                    formErrors.state = value === "" ? "state field can't be left blank" : "Invalid state";
                    this.setState({ disableButton: true })
                } else {
                    formErrors.state = '';

                }

                break;

            case 'country':
                if (value.length === 0) {
                    formErrors.country = value === "" ? "Country field can't be left blank" : "Invalid Country";
                    this.setState({ disableButton: true })
                } else {
                    formErrors.country = '';

                }

                break;
                default:

        }

        console.log("test : ", this.state.formErrors);

        if (formErrors.address.length === 0 && formErrors.pincode.length === 0 && formErrors.city.length === 0 &&
            formErrors.state.length === 0 && formErrors.country.length === 0) {
            this.setState({ disableButton: false })
        }
        this.setState({ formErrors, [name]: value });

    };

    handleSubmit = async () => {
        console.log("submit");

        const localData = JSON.parse(localStorage.getItem("loginData"))

        const { address, pincode, city, state, country } = this.state;
        let addAddressData = {
            address: `${address}`,
            pincode: `${pincode}`,
            city: `${city}`,
            state: `${state}`,
            country: `${country}`,
        }

        const res = await axios.post(URL + "address", addAddressData, { headers: { "Authorization": "Brearer " + localData.token } })
        alert(res.data.message + ",You Are Redirected To HomePage Now");
        this.props.history.push("/")


    };

    render() {
        const { formErrors } = this.state;

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
                            {formErrors.address.length > 0 && (
                                <span className="errorMessage">{formErrors.address}</span>
                            )}
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
                            {formErrors.pincode.length > 0 && (
                                <span className="errorMessage">{formErrors.pincode}</span>
                            )}
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
                            {formErrors.city.length > 0 && (
                                <span className="errorMessage">{formErrors.city}</span>
                            )}
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
                            {formErrors.state.length > 0 && (
                                <span className="errorMessage">{formErrors.state}</span>
                            )}
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
                            {formErrors.country.length > 0 && (
                                <span className="errorMessage">{formErrors.country}</span>
                            )}
                        </div>
                        <div className="addnewaddressformcontrol">
                            <FormControl component="fieldset">
                                <button
                                    class="btn"
                                    type="button"
                                    style={{ backgroundColor: 'rgb(21, 103, 226)', color: 'white' }}
                                    onClick={this.handleSubmit}
                                    disabled={this.state.disableButton}
                                >
                                    Save
							</button><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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

export default withRouter(AddNewAddress)