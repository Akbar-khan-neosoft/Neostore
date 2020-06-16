import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class NoOrder extends Component{

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
                <div> <h1>You Have Not Order any Product Till Now</h1></div>
                <div><p>You will find lots of intresting products on our products page</p></div>
                <div><button onClick={this.onCick}>Return To Product Page</button></div>
            </div>
        )
    }
}


export default withRouter(NoOrder)