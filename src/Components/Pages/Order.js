import React, { Component } from "react";

import { getOrderDetailsAPI } from "../../API/API"
import "../../Assets/CSS/Order.css"
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

    render() {        
        return (
            this.state.orderdata.length > 0 ?
                <div className="ordercontainer">
                    {this.state.orderdata.map((res) => {
                        return (<div className="orderdetails">
                            <div className="order_">Order Detail : {res._id}</div>
                            <div className="orderdatacontainer">
                                {res.product_details.map(r => {
                                    return (

                                        <div className="orderdata" key={res._id + r.product_details[0].product_image}>
                                            <div><img src={"http://180.149.241.208:3022/" + r.product_details[0].product_image} alt="orderproductimage" width="100%" height="70px" /></div>
                                            <div style={{ width: "100%" }}>{r.product_details[0].product_name}</div>
                                            <div>Cost : <i class="fa fa-inr fa-lg" aria-hidden="true"></i> {r.product_details[0].product_cost}</div>
                                            <div>Manufacturer : {r.product_details[0].product_producer}</div>

                                        </div>
                                        /* </div>                       */
                                    )
                                })}  </div>
                            <div className="order_">Order Total : <i class="fa fa-inr" aria-hidden="true"></i>
                                {res.product_details[0].total_cartCost}</div>
                            <div className="order_">Invoice</div>
                        </div>

                        )
                    })}

                </div> : <NoOrder/>
        )
    }
}

export default Order