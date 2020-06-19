import React, { Component } from "react"
import axios from 'axios';
import { connect } from 'react-redux';
import "../../Assets/CSS/Cart.css"
import { fetchCartData } from "../../Redux/Actions/cartAction"
import DeliveryAddress from "./DeliveryAddress";
import { cartitemcounthandle } from '../../Redux/Actions/cartItemCountAction'
import NoProduct from "./NoProduct";
import { URL } from '../../Redux/Constants'




class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cartData: [],
            totalCartItem: '',
            temp: false,
            flag: true,
            showCartDetail: true,
            showAddressDetail: false,
        }
    }

    onClickCartHandle = () => {
        this.setState({ showCartDetail: true, showAddressDetail: false })
    }

    onClickAddressHandle = () => {
        this.setState({ showCartDetail: false, showAddressDetail: true })
    }

    async componentDidMount() {
        const localCartData = JSON.parse(localStorage.getItem("cart")) || []
        this.setState({ cartData: localCartData })
    }

    onClickdeleteProductHandle = (prd_id) => {
        const localData = JSON.parse(localStorage.getItem("loginData"));
        if(localData){
            axios.delete(URL + `deleteCustomerCart/${prd_id}`, { headers: { "Authorization": 'Bearer ' + localData.token } });
        }
        const localCartData = JSON.parse(localStorage.getItem("cart"))
        const index = localCartData.findIndex(res => { return res._id === prd_id })
        localCartData.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(localCartData));
        this.setState({ cartData: JSON.parse(localStorage.getItem("cart")) })
        this.props.cartItemCount()
    }


    onClickSubQuantityHandle = (prd_id) => {
        const localCartData = JSON.parse(localStorage.getItem("cart"))
        console.log("localCartData", prd_id)
        const index = localCartData.findIndex(res => { return res._id === prd_id })
        console.log(localCartData[index].quantity)

        if (localCartData[index].quantity <= 1) {
            console.log("you are here");

            window.confirm("Are you sure,to remove this item from cart")
            this.onClickdeleteProductHandle(prd_id);
        }
        else {
            localCartData[index].quantity = localCartData[index].quantity - 1;
            localStorage.setItem('cart', JSON.stringify(localCartData));
            this.setState({ cartData: JSON.parse(localStorage.getItem("cart")) })
        }


    }

    onClickAddQuantityHandle = (prd_id) => {
        const localCartData = JSON.parse(localStorage.getItem("cart"))
        const index = localCartData.findIndex(res => { return res._id === prd_id })
        localCartData[index].quantity = localCartData[index].quantity + 1;
        localStorage.setItem('cart', JSON.stringify(localCartData));
        this.setState({ cartData: JSON.parse(localStorage.getItem("cart")) })

    }


    render() {

        let orderTotal = 0
        this.state.cartData ? orderTotal = this.state.cartData.map(val => {
            return (val.product_cost * val.quantity)
        }).reduce((sum, product_cost) => { return Number(sum) + Number(product_cost) }, 0) : orderTotal = 0;
        const gst = Math.round(orderTotal / 100 * 5);
        const total = Number(gst) + Number(orderTotal)

        return (this.state.cartData.length ?
            <div className="cartcontainer">
                <div className="cartheader">
                    <div onClick={this.onClickCartHandle} className="btn">{this.state.showCartDetail ?
                        <i className="fa fa-check-square" aria-hidden="true">&nbsp;Cart</i>
                        : <i className="fa fa-square" aria-hidden="true">&nbsp;Cart</i>

                    }</div>
                    <hr></hr>
                    <div onClick={this.onClickAddressHandle} className="btn">{this.state.showAddressDetail ?
                        <i className="fa fa-check-square" aria-hidden="true">&nbsp;Address</i>
                        : <i className="fa fa-square" aria-hidden="true">&nbsp;Address</i>

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
                                    {this.state.cartData ? this.state.cartData.map(res => {
                                        return (
                                            <tr key={res._id}>
                                                <td><div className="productdata">
                                                    <div style={{ marginRight: "2%" }}><img className="productimage" src={"http://180.149.241.208:3022/" + res.product_image} alt="cartproductimage" /></div>
                                                    <div style={{ marginLeft: "2%" }}>
                                                        <div>{res.product_name}</div>
                                                        <div>By : {res.product_producer}</div>
                                                        <div>Status: In Stock</div>
                                                    </div></div>
                                                </td>
                                                <td><div>
                                                    <button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.onClickSubQuantityHandle(res._id)}><i className="fa fa-minus-circle" aria-hidden="true"></i>
                                                    </button>{res.quantity}
                                                    <button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.onClickAddQuantityHandle(res._id)}><i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                    </button></div></td>
                                                <td><div>{res.product_cost}</div></td>
                                                <td>{res.product_cost * res.quantity}</td>
                                                <td><button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.onClickdeleteProductHandle(res._id)}><i className="fa fa-trash" aria-hidden="true"></i>

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
                        <DeliveryAddress save={this.onClickCartHandle} />
                    </div>}
            </div> : <NoProduct />
        )
    }
}
const mapDispatchToProps = dispatch => ({
    onFetch: () => dispatch(fetchCartData()),
    cartItemCount: () => dispatch(cartitemcounthandle())
});

export default connect(null, mapDispatchToProps)(Cart)