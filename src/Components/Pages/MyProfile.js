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

         const localData = JSON.parse(localStorage.getItem("loginData"))
         console.log(localData.token)
        
         const res = await axios.get(URL + "getCustProfile" , {headers : {"Authorization": "Brearer " + localData.token }})
        // const res = await axios.get("http://localhost:3000/userprofileAPI", {headers : {"Authorization": "Brearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwLCJpYXQiOjE1Nzc3MDQ3OTF9.Xp4iolxxpQDskEIBZTA37hkXlhrmuPpf53auTxD0tNo" }})
        
        this.setState({custData:res.data.customer_proile})
        console.log(res.data.customer_proile)
        }

        onClickEditHandle =()=>{
            this.setState({edit:!this.state.edit})
        }


    render(){
        const {first_name,last_name,gender,dob,phone_no,email}= this.state.custData
        return(
            !this.state.edit ? 
            <div className="myprofilecontainer">
                <div><h1>Profile</h1></div>
                <hr></hr>
                <div className="profilebody">
                <br></br>
                    <div>First Name : {first_name} </div>
                    <br></br>
                    <div>Last Name : {last_name} </div>
                    <br></br>
                    <div>Gender :  {gender} </div>
                    <br></br>
                    <div>Date Of Birth :  {dob}</div>
                    <br></br>
                    <div>Mobile Number :  {phone_no}</div>
                    <br></br>
                    <div>Email : {email} </div>
                    <br></br>
                </div>
                <hr></hr>
                <div className="profileeditbuttom"><button onClick={this.onClickEditHandle}>Edit</button></div>
            </div> : <EditProfile data = {this.state.custData} cancel={this.onClickEditHandle}/>
        )
    }
}

export default MyProfile