import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class NoProduct extends Component{

    onCick=()=>{
		this.props.history.push("/product")	
	}
    

    render(){

        const style = {
            textAlign:"center",
            marginTop:"10%",
            marginBottom:"10%"
        }
        return(
            <div style={style}>
                <div> <h1>YOUR CART IS CURRENTLY EMPTY</h1></div>
                <div><p>Before proceed to checkout you must add some products to you shopping cart.</p></div>
                <div><p>You will find lots of intresting products on our products page</p></div>
                <div><button onClick={this.onCick}>Return To Product Page</button></div>
            </div>
        )
    }
}


export default withRouter(NoProduct)