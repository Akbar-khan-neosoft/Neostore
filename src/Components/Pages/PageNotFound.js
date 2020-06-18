import React, { Component } from 'react'


class PageNotFound extends Component{
    

    render(){

        const style = {
            textAlign:"center",
            marginTop:"10%",
            marginBottom:"10%"
        }
        return(
            <div style={style}>
                <div> <h1>404, Page Not Found</h1></div>
                <div><p>No such page found,Request you to check the URL which you have entered.</p></div>
            </div>
        )
    }
}


export default PageNotFound