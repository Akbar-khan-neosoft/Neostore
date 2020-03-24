import React, { Component } from 'react';
import axios from "axios"
import '../../Assets/CSS/ChangePassword.css';
import { URL } from "../../Redux/Constants"
import { FormControl, TextField, OutlinedInput, inputProps, InputLabel, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { customErrorMessages } from '../../Utils/validation'



class ChangePassword extends Component {

    constructor() {
        super()
        this.state = {
            data: {
                oldpassword: '',
                newpassword: '',
                confirmpassword: '',
            },
            error: {
                newpasswordError: false,
                oldpasswordError: false,
                confirmpasswordError: false,
                newpassworderrorMessage: '',
                oldpassworderrorMessage: '',
                confirmpassworderrorMessage: '',
            },
            showOldPassword: false,
            showNewPassword: false,
            showConfirmPassword: false

        }
    }

    onChangeHandle = ({ target: input }) => {
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data });
        console.log(
            data
        )

    };

    handleClickShowPassword = (param) => {
        if (param === "showOldPassword")
            this.setState({ showOldPassword: !this.state.showOldPassword })
        else if (param === "showNewPassword")
            this.setState({ showNewPassword: !this.state.showNewPassword })
        else if (param === "showConfirmPassword")
            this.setState({ showConfirmPassword: !this.state.showConfirmPassword })
    }
    onSubmitHandle = async () => {

        if (this.validate()) {
            // const localData = JSON.parse(localStorage.getItem("data"));
            const {oldpassword,newpassword,confirmpassword} =this.state.data
            const data = {
                oldPass: oldpassword,
                newPass:newpassword,
                confirmPass: confirmpassword
            }
            console.log("data>>", data);

            // console.log(localData)

            //  const res = await axios.post(URL + 'changepassword' , data, {headers:{"Authorization": 'Bearer ' + localData.token}})
            //  console.log("res =-" ,res);
              const res = await axios.post("http://localhost:3000/resetpasswordAPI" , data, {headers:{"Authorization": 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwLCJpYXQiOjE1Nzc3MDQ3OTF9.Xp4iolxxpQDskEIBZTA37hkXlhrmuPpf53auTxD0tNo"
              }})

             alert("res =-" ,res);



        }
        else {
            console.log("error ");

        }

    }

    validate = () => {
        const { oldpassword, newpassword, confirmpassword } = this.state.data

        this.setState({ error: { oldpasswordError: false, newpasswordError: false, confirmpasswordError: false } })


        if (oldpassword === '' || oldpassword !== "naveenp123") {//need to add old password here for validation
            const { valueMissing } = customErrorMessages.password;
            const errorpassword = oldpassword === "" ? valueMissing : "Old Password In Incorrect";
            this.setState({ error: { oldpasswordError: true, oldpassworderrorMessage: errorpassword } });
            return false;
        }
        else if (newpassword === '' || newpassword.length < 8 || newpassword.length > 12) {
            const { valueMissing, patternMismatch } = customErrorMessages.password;
            const errorpassword = newpassword === "" ? valueMissing : patternMismatch;
            this.setState({
                error: {
                    newpasswordError: true,
                    newpassworderrorMessage: errorpassword,

                }
            });
            return false;

        } else if (confirmpassword === '' || confirmpassword.length < 8 || confirmpassword.length > 12) {
            const { valueMissing, patternMismatch } = customErrorMessages.password;
            const errorpassword = confirmpassword === "" ? valueMissing : patternMismatch;
            this.setState({
                error: {
                    confirmpasswordError: true,
                    confirmpassworderrorMessage: "Confirm Password Field Can't Be Left Blank",

                }
            });
            return false;


        } else if (confirmpassword !== newpassword) {
            this.setState({
                error: {
                    confirmpasswordError: true,
                    confirmpassworderrorMessage: 'Password & ConfirmPassword Mismatched',
                }
            });
            return false;
        } else {
            return true;
        }


    };



    render() {

        const { newpasswordError,
            oldpasswordError,
            confirmpasswordError,
            newpassworderrorMessage,
            oldpassworderrorMessage,
            confirmpassworderrorMessage } = this.state.error

        return (
            <div className="changepassword">
                <div className="changepasswordform">
                    <div className="changepasswordformcontrol">
                        <h1>Change Password</h1>
                    </div>
                    <hr></hr>
                    <form>
                        <div className="changepasswordformcontrol">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                                <OutlinedInput id="outlined-adornment-password"
                                    label="Old Password"
                                    type={this.state.showOldPassword ? 'text' : 'password'}
                                    placeholder="Old Password"
                                    name="oldpassword"
                                    inputProps={
                                        { maxLength: 12 }
                                    }
                                    onChange={this.onChangeHandle}
                                    onBlur={this.validate}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => { this.handleClickShowPassword("showOldPassword") }}

                                            >
                                                {this.state.showOldPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    } />
                            </FormControl>
                            {oldpasswordError ? (
                                <span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
                                    {oldpassworderrorMessage}
                                </span>
                            ) : null}
                        </div>
                        <div className="changepasswordformcontrol">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                <OutlinedInput id="outlined-adornment-password"
                                    type={this.state.showNewPassword ? 'text' : 'password'}
                                    label="New Password"
                                    placeholder="New Password"
                                    name="newpassword"
                                    inputProps={
                                        { maxLength: 12 }
                                    }
                                    onChange={this.onChangeHandle}
                                    onBlur={this.validate} endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => { this.handleClickShowPassword("showNewPassword") }}

                                            >
                                                {this.state.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    } />
                            </FormControl>
                            {newpasswordError ? (
                                <span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
                                    {newpassworderrorMessage}
                                </span>
                            ) : null}
                        </div>
                        <div className="changepasswordformcontrol">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput id="outlined-adornment-password"
                                    type={this.state.showConfirmPassword ? 'text' : 'password'}
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    name="confirmpassword"
                                    inputProps={
                                        { maxLength: 12 }
                                    }
                                    onChange={this.onChangeHandle}
                                    onBlur={this.validate} endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => { this.handleClickShowPassword("showConfirmPassword") }}

                                            >
                                                {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    } />
                            </FormControl>
                            {confirmpasswordError ? (
                                <span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
                                    {confirmpassworderrorMessage}
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

export default ChangePassword