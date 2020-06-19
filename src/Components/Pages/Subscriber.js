import React, { Component } from "react"

class Subscriber extends Component{
    render()
    {
        return(
            <div style={{textAlign:"center",marginTop:"10%",marginBottom:"15%"}}>
                <h1>Thank You, {this.props.location.state.email}</h1>
               <h3>You Will Receive Regular Update Of Our New Products And Offers</h3> 
            </div>
        )
    }
}

export default Subscriber