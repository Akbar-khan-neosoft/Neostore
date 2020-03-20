import React, { Component } from 'react';
import axios from "axios"
import '../../Assets/CSS/ChangePassword.css';
import {URL} from "../../Redux/Constants"
import { FormControl, TextField,OutlinedInput,InputLabel,IconButton ,InputAdornment } from '@material-ui/core';
import {Visibility,VisibilityOff} from '@material-ui/icons';



class ChangePassword extends Component{

    constructor() {
        super()
        this.state = {
            oldpassword: '',
            newpassword: '',
            confirmpassword: '',
            newpasswordError: false,
            oldpasswordError: false,
            confirmpasswordError: false,
            newpassworderrorMessage: '',
            oldpassworderrorMessage: '',
            confirmpassworderrorMessage: '',
            showOldPassword:false,
            showNewPassword:false,
            showConfirmPassword:false

        }
    }

    onChangeHandle = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleClickShowPassword =(param)=>{
        if(param==="showOldPassword")
        this.setState({showOldPassword: !this.state.showOldPassword})
        else  if(param==="showNewPassword")
        this.setState({showNewPassword: !this.state.showNewPassword})
        else  if(param==="showConfirmPassword")
        this.setState({showConfirmPassword: !this.state.showConfirmPassword})
    }
    onSubmitHandle = async() =>{

        if(this.validate())
        {
            const localData = JSON.parse(localStorage.getItem("data"));
                const data = {
                oldpass: this.state.oldpassword,
                newPass : this.state.newpassword,
                confirmPass :this.state.confirmpassword}
                console.log("data>>",data);
               
                console.log(localData)
                
                //  const res = await axios.post(URL + 'changepassword' , data, {headers:{"Authorization": 'Bearer ' + localData.token}})
                //  console.log("res =-" ,res);
            
            }
            else{
                console.log("error ");
                
            }

    }

    validate = () => {
        // const data = JSON.parse(localStorage.getItem("data"));

        this.setState({oldpasswordError:false,newpasswordError:false,confirmpasswordError:false})

          
        if (this.state.oldpassword === '') {
            this.setState({ oldpasswordError: true, oldpassworderrorMessage: "Old Password Field Can't Be Left Blank" });
            return false;
        }else if (this.state.oldpassword !== "oldpassword" ) { //ned to add old password here for validation
            this.setState({
                oldpasswordError: true,
                oldpassworderrorMessage: "Old Password In Incorrect",
                
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
                confirmpassworderrorMessage: "Confirm Password Field Can't Be Left Blank",

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
                                    // variant="outlined" 
                                    type={this.state.showOldPassword ? 'text' : 'password'}
                                    placeholder="Old Password"
                                     name="oldpassword" 
                                     value={this.state.oldpassword} 
                                     onChange={this.onChangeHandle} 
                                     endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>{this.handleClickShowPassword("showOldPassword")}}
                
                >
                  {this.state.showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }/>
                            </FormControl>
                            {this.state.oldpasswordError ? (
                                <span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
                                    {this.state.oldpassworderrorMessage}
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
                                    value={this.state.newpassword} 
                                    onChange={this.onChangeHandle} endAdornment={
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>{this.handleClickShowPassword("showNewPassword")}}
                                          
                                          >
                                            {this.state.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                          </IconButton>
                                        </InputAdornment>
                                      }/>
                            </FormControl>
                            {this.state.newpasswordError ? (
                                <span style={{ color: 'red', fontSize: '10px', fontWeight: '700' }}>
                                    {this.state.newpassworderrorMessage}
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
                                    value={this.state.confirmpassword} 
                                    onChange={this.onChangeHandle} endAdornment={
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>{this.handleClickShowPassword("showConfirmPassword")}}
                                          
                                          >
                                            {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                          </IconButton>
                                        </InputAdornment>
                                      }/>
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

export default ChangePassword