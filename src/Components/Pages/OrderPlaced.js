import React, { Component } from 'react'
import '../../Assets/CSS/OrderPlaced.css'

class OrderPlaced extends Component{

    onClickHandle=()=>{
        this.props.history.push("/")
    }
    render(){
        return(
            <div className="thankyoucontainer">
                <div className="thankyoubox">
                    <div className="thankyouheader">
                        <h1>Thank you for your order</h1>
                    </div>
                    <div className="thankyoustatement">Your order has been placed and is being processed</div>
                    <div className="thankyoubacktohomepage">
                        <button style={{width:"100%",border:"none", background:"transparent"}} onClick={this.onClickHandle}>Back To Homepage</button>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default OrderPlaced