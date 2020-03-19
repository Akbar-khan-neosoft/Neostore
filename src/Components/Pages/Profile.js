import React, { Component } from "react"
import MyOrder from "./MyOrder"
import MyProfile from "./MyProfile"
import ChangePassword from "./ChangePassword"
import MyAddress from "./MyAddress"
import "../../Assets/CSS/Profile.css"

class Profile extends Component{

    constructor(props){
        super(props)
            this.state={
                showComponent:"profile"

            }
        }

        onClickHandle=(param)=>{
            if(param==="order"){
                this.setState({showComponent:"order"})
            }
            else if(param==="profile"){
                this.setState({showComponent:"profile"})
            } else if(param==="address"){
                this.setState({showComponent:"address"})
            }else if(param === "changepassword"){
                this.setState({showComponent:"changepassword"})
            }
        }


        render(){

            let component;
            if(this.state.showComponent==="order"){
                component = <MyOrder/>
            }
            else if(this.state.showComponent==="profile"){
                component = <MyProfile/>
            } else if(this.state.showComponent==="address"){
                component = <MyAddress/>
            }else if(this.state.showComponent === "changepassword"){
                component = <ChangePassword/>
            }

            
            
            return(
                <div className="profilecontainer">
                    <div><h1>My Account</h1></div>
                    <div className="profilebox">
                        <div className="leftsidebox">
                            <div className="profilepicture btn">Image</div>
                            <div className="profilename btn">Akbar Khan</div>
                            <div className="profileorder btn" onClick={()=>this.onClickHandle("order")}>Order</div>
                            <div className="profiledata btn" onClick={()=>this.onClickHandle("profile")}>Profile</div>
                            <div className="profileaddress btn" onClick={()=>this.onClickHandle("address")}>Address</div>
                            <div className="changeprofilepassword btn" onClick={()=>this.onClickHandle("changepassword")}>Change Password</div>
                        </div>
                        <div className="rightsidebox">
                        {component}
                        </div>
                    </div>
                </div>
            )
        }
    
}

export default Profile