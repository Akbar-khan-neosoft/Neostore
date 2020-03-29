import React, { Component } from "react"
import { connect } from 'react-redux';
import "../../Assets/CSS/Cart.css"
import { fetchCartData } from "../../Redux/Actions/cartAction"
import DeliveryAddress from "./DeliveryAddress";
import axios from "axios";
import { URL } from "../../Redux/Constants"
import { addToCartAPI, deleteCustomerCartAPI,updateQuantityAPI } from "../../API/API"



class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cartData: [],
            totalCartItem: '',
            showCartDetail: true,
            showAddressDetail: false,
            tempData:[]
        }
    }

    onClickCartHandle = () => {
        this.setState({ showCartDetail: true, showAddressDetail: false })
    }

    onClickAddressHandle = () => {
        this.setState({ showCartDetail: false, showAddressDetail: true })
    }

    async componentDidMount() {
        const loginAuth = JSON.parse(localStorage.getItem("loginData"));
        // console.log(loginAuth);

        if (loginAuth) {
            await this.props.onFetch()
            this.setState({ cartData: this.props.data, totalCartItem: 2 })
        }
        else {
            this.setState({ cartData: [], totalCartItem: 0 })
        }
    }

    onClickdeleteProductHandle = async (prd_id) => {

        const res = await deleteCustomerCartAPI(prd_id);
        // console.log("res", res)

        await this.props.onFetch()
        this.setState({ cartData: this.props.data, totalCartItem: 2 })

    }



    onClickQuantityHandle = async (prd_id, quant) => {
        const quantity = quant + 1;
        const res = await updateQuantityAPI(prd_id, quantity);
        console.log(res)
    }

    render() {
        let tempdata = [];
        console.log("this.props.data",this.props.data)
        // console.log(this.state.cartData)
        console.log("temp",this.state.tempData)
        

        if(this.state.cartData){
            this.state.cartData.map(res=>{
                // console.log("res",res) 
         tempdata =  tempdata.concat({product_id :res.product_id._id,
            quantity:res.quantity,
            _id:res.product_id._id})})
        }
        // console.log("temp",tempdata)

        let orderTotal = 0
        orderTotal = this.state.cartData.map(val => {
            // console.log("val", val)

            return (val.total_productCost)
        }).reduce((sum, total_productCost) => {
            return Number(sum) + Number(total_productCost)
        }, 0)
        const gst = Math.round(orderTotal / 100 * 5);
        const total = Number(gst) + Number(orderTotal)

        return (
            <div className="cartcontainer">
                <div className="cartheader">
                    <div onClick={this.onClickCartHandle} className="btn">{this.state.showCartDetail ?
                        <i class="fa fa-check-square" aria-hidden="true">&nbsp;Cart</i>
                        : <i class="fa fa-square" aria-hidden="true">&nbsp;Cart</i>

                    }</div>
                    <hr></hr>
                    <div onClick={this.onClickAddressHandle} className="btn">{this.state.showAddressDetail ?
                        <i class="fa fa-check-square" aria-hidden="true">&nbsp;Address</i>
                        : <i class="fa fa-square" aria-hidden="true">&nbsp;Address</i>

                    }</div>
                </div>
                {this.state.showCartDetail ?
                    <div className="cartdata">
                        <div className="productdetail">
                            <table style={{ width: "90%", marginLeft: "5%", marginRight: "5%", textAlign: "start" }}>
                                <thead >
                                    <tr style={{ border: "1px solid grey" }}>
                                        <th style={{ marginLeft: "10%", marginRight: "10%" }}>  Product  </th>
                                        <th style={{ marginLeft: "10%", marginRight: "10%" }}>  Quantity  </th>
                                        <th style={{ marginLeft: "10%", marginRight: "10%" }}>  Price   </th>
                                        <th style={{ marginLeft: "10%", marginRight: "10%" }}>  Total  </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.props.data ? this.props.data.map(res => {
                                        return (
                                            <tr key={res._id}>
                                                <td><div className="productdata">
                                                    <div style={{ marginRight: "2%" }}><img src={"http://180.149.241.208:3022/" + res.product_id.product_image} width="70px" height="80px" /></div>
                                                    <div style={{ marginLeft: "2%" }}>
                                                        <div>{res.product_id.product_name}</div>
                                                        <div>By : {res.product_id.product_producer}</div>
                                                        <div>Status: In Stock</div>
                                                    </div></div>
                                                </td>
                                                <td><div>
                                                    <button style={{ backgroundColor: "transparent", border: "none" }}><i class="fa fa-minus-circle" aria-hidden="true"></i>
                                                    </button>
                                                    {res.quantity}
                                                    <button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.onClickQuantityHandle(res._id, res.quantity)}><i class="fa fa-plus-circle" aria-hidden="true"></i>
                                                    </button></div></td>
                                                <td><div>{res.product_cost}</div></td>
                                                <td>{res.total_cost}</td>
                                                <td><button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.onClickdeleteProductHandle(res._id)}><i class="fa fa-trash" aria-hidden="true"></i>

                                                </button></td>
                                            </tr>
                                           
                                        )
                                    }) : []}

                                </tbody>
                            </table>
                        </div>
                        <div className="revieworder">
                            <div><h3>Review Order</h3></div>
                            <hr></hr>
                            <div style={{ width: "80%", marginRight: "5%", marginLeft: "10%" }}>
                                Subtotal
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                {orderTotal}
                            </div><hr></hr>
                            <div style={{ width: "80%", marginRight: "5%", marginLeft: "10%" }}>
                                GST(5%)
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                {gst}
                            </div><hr></hr>
                            <div style={{ width: "80%", marginRight: "5%", marginLeft: "10%" }}>
                                Order Total
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                {total}
                            </div><hr></hr>
                            <div><button style={{ width: "90%", marginRight: "5%", marginLeft: "5%", marginBottom: "3%", backgroundColor: "lightblue" }} onClick={this.onClickAddressHandle}>Proceed To Pay</button></div>
                        </div>
                    </div> : <div className="addresscontainer">
                        <DeliveryAddress save={this.onClickCartHandle} data={tempdata.concat({flag:"checkout"})} />
                    </div>}
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log("cart", state);

    return { data: state.cartReducer.data || [] };
};

const mapDispatchToProps = dispatch => ({
    onFetch: () => dispatch(fetchCartData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)