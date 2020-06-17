import React, { Component } from "react"

class NoProductError extends Component{
    onCick=()=>{
		this.props.history.push("/product")	
	}
    render()
    {
        return(
            <div style={{width:"80%",marginLeft:"10%",marginRight:"10%",marginBottom:"20%", textAlign:"center",marginTop:"10%"}}>
               <div style={{marginBottom:"5%"}}><h1>SORRY,No Such Product Available</h1> </div>
               <div style={{marginBottom:"5%"}}><span className="btn" onClick={this.onCick}>Click Here, To Visit Product Page For Alternate Product</span></div>
            </div>
        )
    }
}

export default NoProductError