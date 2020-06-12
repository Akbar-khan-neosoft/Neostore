import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { withRouter } from "react-router";



class Seacrhbox extends Component {

  onChangeHandle = (e,itemname) => {
    e.preventDefault()
    const index = this.props.data.findIndex(res => {
      return (res.product_name === itemname)
    })
    
    if (index >= 0) {
      this.props.history.push({
        pathname: "/productdetails",
        state: {
          productid: this.props.data[index].product_id
        }
      })
    }


  }
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={this.props.data.map(option => { return option.product_name }
          )}
          onChange={(event, value) => this.onChangeHandle(event, value)}
          renderInput={(params) => (
            <TextField {...params} margin="normal" placeholder="Search..." variant="outlined" style={{ backgroundColor: "white" }} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { data: state.productReducer.data || [] };
};

export default connect(mapStateToProps) (withRouter(Seacrhbox));