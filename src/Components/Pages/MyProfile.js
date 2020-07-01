import React, { Component } from "react"
import axios from "axios"
import { withRouter } from 'react-router-dom'
import { URL } from "../../Redux/Constants"
import EditProfile from "../Pages/EditProfile"
import Loading from "../Common/Loading"

class MyProfile extends Component {
    constructor() {
        super()
        this.state = {
            custData: [],
            edit: false
        }
    }

    async componentDidMount() {
        const localData = JSON.parse(localStorage.getItem("loginData"))
        const res = await axios.get(URL + "getCustProfile", { headers: { "Authorization": "Brearer " + localData.token } })
        this.props.profilePicture(res.data.customer_proile.profile_img)
        this.setState({ custData: res.data.customer_proile })
    }

    onClickEditHandle = () => {
        this.setState({ edit: !this.state.edit })
    }


    render() {
        const { first_name, last_name, gender, dob, phone_no, email } = this.state.custData
        return (
            this.state.custData.length === undefined ?
                !this.state.edit ?
                    <div className="myprofilecontainer">
                        <div><h1>Profile</h1></div>
                        <hr></hr>
                        <div className="profilebody">
                            <br></br>
                            <div><b>First Name </b>: {first_name} </div>
                            <br></br>
                            <div><b>Last Name </b>: {last_name} </div>
                            <br></br>
                            <div><b>Gender </b>:  {gender} </div>
                            <br></br>
                            <div><b>Date Of Birth </b>:  {dob}</div>
                            <br></br>
                            <div><b>Mobile Number </b>:  {phone_no}</div>
                            <br></br>
                            <div><b>Email </b>: {email} </div>
                            <br></br>
                        </div>
                        <hr></hr>
                        <div className="profileeditbuttom"><button onClick={this.onClickEditHandle}>Edit</button></div>
                    </div> : <EditProfile data={this.state.custData} cancel={this.onClickEditHandle} />
                : <Loading />)
    }
}

export default withRouter(MyProfile)