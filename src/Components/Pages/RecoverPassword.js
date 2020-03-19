import React, { Component } from 'react';
import axios from "axios"
import '../../Assets/CSS/RecoverPassword.css';
import {URL} from "../../Redux/Constants"
import { FormControl, TextField } from '@material-ui/core';

class RecoverPassword extends Component {

    constructor() {
        super()
        this.state = {
            verificationcode: '',
            newpassword: '',
            confirmpassword: '',


            newpasswordError: false,
            verificationcodeError: false,
            confirmpasswordError: false,
            newpassworderrorMessage: '',
            verificationcodeerrorMessage: '',
            confirmpassworderrorMessage: ''

        }
    }

    onChangeHandle = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    onSubmitHandle = async() =>{

        if(this.validate())
        {
            const data = {
                otpCode: this.state.verificationcode,
                newPass : this.state.newpassword,
                confirmPass :this.state.confirmpassword}
                console.log("data>>",data);
                
                 const res = await axios.post(URL + 'recoverPassword' , data)
                 console.log("res =-" ,res);
            
            }
            else{
                console.log("error ");
                
            }

    }

    validate = () => {
        // this.setState({ passwordError: false, emailError: false, errorMessage: '' });
        const otp = localStorage.getItem("otp");
        console.log("otp:",otp);
        
        if (this.state.verificationcode === '') {
            this.setState({ verificationcodeError: true, verificationcodeerrorMessage: "Verification Code Field Can't Be Left Blank" });
            return false;
        }else if (this.state.verificationcode !== otp) {
            this.setState({
                verificationcodeError: true,
                verificationcodeerrorMessage: "OTP Mismatched",
                
            });
            return false;

        }  
        else if (this.state.newpassword === '') {
            this.setState({
                newpasswordError: true,
                newpassworderrorMessage: "New Password Field Can't Be Left Blank",
                
            });
            return false;

        } else if (this.state.newpassword.length < 8 || this.state.newpassword.length > 12) {
            this.setState({
                newpasswordError: true,
                newpassworderrorMessage: 'Password Length Should Be InBetween 8-12 characters',
            });
            return false;
        } else if (this.state.confirmpassword === '') {
            this.setState({
                confirmpasswordError: true,
                confirmpassworderrorMessage: "New Password Field Can't Be Left Blank",

            });
            return false;


        } else if (this.state.confirmpassword !== this.state.newpassword) {
            this.setState({
                confirmpasswordError: true,
                confirmpassworderrorMessage: 'Password & ConfirmPassword Mismatched',
            });
            return false;


        } else{
            return true;
        }


    };

   

    render() {
        const otp = localStorage.getItem("otp");
        console.log("otp:",otp);
        return (
            <div className="recoverpassword">
                <div className="recoverpasswordform">
                    <div className="recoverpasswordformcontrol">
                        <h1>Recover Password</h1>
                    </div>
                    <hr></hr>
                    <form>
                        <div className="recoverpasswordformcontrol">
                            <FormControl fullWidth>
                                <TextField id="outlined-basic"
                                    label="Verification Code"
                                    variant="outlined" placeholder="Verification Code" name="verificationcode" value={this.state.verificationcode} onChange={this.onChangeHandle} />
                            </FormControl>
                            {this.state.verificationcodeError ? (
                                <span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
                                    {this.state.verificationcodeerrorMessage}
                                </span>
                            ) : null}
                        </div>
                        <div className="recoverpasswordformcontrol">
                            <FormControl fullWidth>
                                <TextField id="outlined-basic"
                                type="password"
                                    label="New Password"
                                    variant="outlined" placeholder="New Password" name="newpassword" value={this.state.newpassword} onChange={this.onChangeHandle} />
                            </FormControl>
                            {this.state.newpasswordError ? (
                                <span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
                                    {this.state.newpassworderrorMessage}
                                </span>
                            ) : null}
                        </div>
                        <div className="recoverpasswordformcontrol">
                            <FormControl fullWidth>
                                <TextField id="outlined-basic"
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined" placeholder="Confirm Password" name="confirmpassword" value={this.state.confirmpassword} onChange={this.onChangeHandle} />
                            </FormControl>
                            {this.state.confirmpasswordError ? (
                                <span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
                                    {this.state.confirmpassworderrorMessage}
                                </span>
                            ) : null}
                        </div>

                        <div className="contactformcontrol">
                            <FormControl component="fieldset">
                                <button
                                    class="btn"
                                    type="button"
                                    style={{ backgroundColor: 'rgb(21, 103, 226)', color: 'white' }}
                                    onClick={this.onSubmitHandle}
                                >
                                    Submit
							</button>
                            </FormControl>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RecoverPassword;
