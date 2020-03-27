import React, { Component } from "react";
import axios from "axios"
import {URL} from "../../Redux/Constants"
import {getOrderDetailsAPI} from "../../API/API"
import "../../Assets/CSS/Order.css"

class Order extends Component{
    constructor(){
        super()
        this.state={
            orderdata:[]
        }
    }

    async componentDidMount(){
       const res = await getOrderDetailsAPI()
       console.log(res.data.product_details)
       this.setState({orderdata:res.data.product_details})
    }

    render(){

        return(
            <div className="ordercontainer">Order Page
            {this.state.orderdata.map((res)=>{
                return(res.product_details.map(r=>{
                    return (
                        <div className="orderdetails">
                        {console.log(res.product_details)}
                        {console.log(r)}
                  <div className="orderheader">TRANSIT Order By: {res._id} <br></br>Placed on: 27/03/2020 / ₹404562 </div>
            <div className="orderdata"></div>
            <div className="orderinvoice"></div>
            </div>
                    )
                })
                   
                )
            })}
            
            </div>
        )
    }
}

export default Order