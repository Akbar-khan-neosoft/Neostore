import React from "react"
import {connect} from "react-redux"
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

function Routes (){

    return(    
        <div>{console.log("jhjhjhg ",this.props.data)}
        {this.props.data ? <ProtectedRoutes/> : <PublicRoutes/>}
        </div> 
        //  {console.log(this.props.data);
        //  this.props.data ? <ProtectedRoutes/> : <PublicRoutes/>
        //  }
         )
}

const mapStateToProps = state => {
    console.log("test : " ,state.loginReducer.isAuthenticated)

	return { data: state.loginReducer.isAuthenticated };
};

export default connect(mapStateToProps,null) (Routes);

