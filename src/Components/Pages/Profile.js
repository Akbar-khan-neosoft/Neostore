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
                    <hr></hr>
                    <div className="profilebox">
                        <div className="leftsidebox">
                            <div className="profilepicture"><i class="fa fa-5x fa-user" aria-hidden="true"></i></div>
                            <div className="profilename "><h5 style={{color:"red"}}>Akbar Khan</h5></div>
                            <div className="profileorder btn" onClick={()=>this.onClickHandle("order")}><i class="fa fa-bars" aria-hidden="true"></i>Order</div>
                            <div className="profiledata btn" onClick={()=>this.onClickHandle("profile")}><i class="fa fa-user" aria-hidden="true"></i>Profile</div>
                            <div className="profileaddress btn" onClick={()=>this.onClickHandle("address")}><i class="fa fa-address-book" aria-hidden="true"></i>Address</div>
                            <div className="changeprofilepassword btn" onClick={()=>this.onClickHandle("changepassword")}><i class="fa fa-key" aria-hidden="true"></i>
Change Password</div>
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