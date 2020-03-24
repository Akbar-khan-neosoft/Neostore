import React, { Component } from "react"
import axios from "axios"
import {URL} from "../../Redux/Constants"
import EditProfile from "../Pages/EditProfile"

class MyProfile extends Component{
    constructor(){
        super()
        this.state={
            custData:[],
            edit:false
        }
    }

    async componentDidMount(){

        // const localData = JSON.parse(localStorage.getItem("loginData"))
        // console.log(localData.token)
        
        // const res = await axios.get(URL + "getCustProfile" , {headers : {"Authorization": "Brearer " + localData.token }})
        const res = await axios.get("http://localhost:3000/userprofileAPI", {headers : {"Authorization": "Brearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwLCJpYXQiOjE1Nzc3MDQ3OTF9.Xp4iolxxpQDskEIBZTA37hkXlhrmuPpf53auTxD0tNo" }})
        
        this.setState({custData:res.data.customer_proile})
        console.log(res.data.customer_proile)
        }

        onClickEditHandle =()=>{
            this.setState({edit:!this.state.edit})
        }


    render(){
        return(
            !this.state.edit ? 
            <div className="myprofilecontainer">
                <div><h1>Profile</h1></div>
                <hr></hr>
                <div className="profilebody">
                <br></br>
                    <div>First Name : {this.state.custData.first_name} </div>
                    <br></br>
                    <div>Last Name : {this.state.custData.last_name} </div>
                    <br></br>
                    <div>Gender :  {this.state.custData.gender} </div>
                    <br></br>
                    <div>Date Of Birth :  {this.state.custData.dob}</div>
                    <br></br>
                    <div>Mobile Number :  {this.state.custData.phone_no}</div>
                    <br></br>
                    <div>Email : {this.state.custData.email} </div>
                    <br></br>
                </div>
                <hr></hr>
                <div className="profileeditbuttom"><button onClick={this.onClickEditHandle}>Edit</button></div>
            </div> : <EditProfile data = {this.state.custData} cancel={this.onClickEditHandle}/>
        )
    }
}

export default MyProfile