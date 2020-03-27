import React, { Component } from "react"
import { connect } from 'react-redux';
import "../../Assets/CSS/Cart.css"
import {fetchCartData} from "../../Redux/Actions/cartAction"

class Cart extends Component{
constructor(){
    super()
    this.state={
        cartData:[],
        totalCartItem:''
    }
}

async componentDidMount(){
    const loginAuth = localStorage.getItem("loginAuth");
    if(loginAuth)
    {   
       await this.props.onFetch()
       this.setState({cartData:this.props.data,totalCartItem:2}) 
    }
    else{
        this.setState({cartData:[],totalCartItem:0})
    }
}

render(){
    // console.log("dddd",this.props.data)
    
       return(
        <div className="cartcontainer">
            <div className="cartheader">
                <div>aa</div>
                <hr></hr>
                <div>bbb</div>
            </div>
            <div className="cartdata">
                <div className="productdetail">
                    <table style={{width:"90%",marginLeft:"5%",marginRight:"5%",textAlign:"start"}}>
                        <thead >
                            <tr style={{border:"1px solid grey"}}>
                                <th style={{marginLeft:"10%",marginRight:"10%"}}>  Product  </th>
                                <th style={{marginLeft:"10%",marginRight:"10%"}}>  Quantity  </th>
                                <th style={{marginLeft:"10%",marginRight:"10%"}}>  Price   </th>
                                <th style={{marginLeft:"10%",marginRight:"10%"}}>  Total  </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {this.props.data ? this.props.data.map(res=>{
                            return(
                                <tr key={res._id}>
                                    {console.log(res)}
                                    
                                <td><div classname="productdata">
                                    <div ><img src={URL + res.product_id.product_image} width="50px" height="50px"/></div>
                                    <div>
                                        <div>{res.product_id.product_name}</div>
                                        <div>By : {res.product_id.product_producer}</div>
                                        <div>Status: In Stock</div>
                                    </div></div></td>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                                <button>a</button>
                            </tr>
                            )
                        }):[]}
                           
                        </tbody>
                    </table>
                </div>
                <div className="revieworder">
                    <div><h3>Review Order</h3></div>
                    <hr></hr>
                    <div style={{width:"80%",marginRight:"5%",marginLeft:"10%"}}>Subtotal</div><hr></hr>
                    <div style={{width:"80%",marginRight:"5%",marginLeft:"10%"}}>GST(5%)</div><hr></hr>
                    <div style={{width:"80%",marginRight:"5%",marginLeft:"10%"}}>Order Total</div><hr></hr>
                    <div><button style={{width:"90%",marginRight:"5%",marginLeft:"5%",marginBottom:"3%"}}>Proceed To Pay</button></div>
                </div>
            </div>
        </div>
    )
}
}
const mapStateToProps = state => {
    console.log("cart",state);
    
	return { data: state.cartReducer.data || [] };
};

const mapDispatchToProps = dispatch => ({
	onFetch: () => dispatch(fetchCartData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)