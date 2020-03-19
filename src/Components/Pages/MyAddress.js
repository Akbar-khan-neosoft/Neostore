import React, { Component } from "react"

class MyAddress extends Component{
    constructor(){
        super()
        this.state={
            custAddress:[],
            edit:false
        }
    }

    render(){
        return(
            <div>Address :</div>
        )
    }
}

export default MyAddress