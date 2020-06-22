import React, { Component } from "react";
import { getOrderDetailsAPI } from "../../API/API"
import axios from "axios"
import "../../Assets/CSS/Order.css"
import { URL } from '../../Redux/Constants/index'
import NoOrder from "../NoOrder";

class Order extends Component {
    constructor() {
        super()
        this.state = {
            orderdata: []
        }
    }

    async componentDidMount() {
        const res = await getOrderDetailsAPI()
        this.setState({ orderdata: res.data.product_details || [] })
    }

    onClickDownloadReceipt = async (data) => {
        
        const localData = JSON.parse(localStorage.getItem("loginData"))
        try {
            const res = await axios.post(URL + "getInvoiceOfOrder", data, { headers: { "Authorization": "Brearer " + localData.token } })
            window.open(URL +  res.data.receipt , '_blank')
        } catch (error) {
            alert('error ', error);
        }
    }

    render() {
        return (
            this.state.orderdata.length > 0 ?
                <div className="ordercontainer">
                    {this.state.orderdata.map((res) => {
                        return (<div className="orderdetails">
                            <div className="order_" key={res._id}>Order Detail : {res._id}</div>
                            <div className="orderdatacontainer">
                                {res.product_details.map(r => {
                                    return (

                                        <div className="orderdata" key={res._id + r.product_details[0].product_image}>
                                            <div><img src={"http://180.149.241.208:3022/" + r.product_details[0].product_image} alt="orderproductimage" width="100%" height="70px" /></div>
                                            <div style={{ width: "100%" }}>{r.product_details[0].product_name}</div>
                                            <div>Cost : <i className="fa fa-inr fa-lg" aria-hidden="true"></i> {r.product_details[0].product_cost}</div>
                                            <div>Manufacturer : {r.product_details[0].product_producer}</div>

                                        </div>
                                    )
                                })}  </div>
                            <div className="order_">Order Total : <i className="fa fa-inr" aria-hidden="true"></i>
                                {res.product_details[0].total_cartCost}</div>
                            <div className="order_"><button onClick={()=>this.onClickDownloadReceipt(res)} style={{backgroundColor:"rgb(70, 47, 170)",color:"white"}}>Download Invoice As PDF</button></div>
                        </div>

                        )
                    })}

                </div> : <NoOrder />
        )
    }
}

export default Order