import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'
import { connect } from 'react-redux';


class Seacrhbox extends Component {
 
  render() {
      console.log("akbar",this.props.data);
      
    return (
      <ReactSearchBox
        placeholder="Placeholder"
        value="Doe"
        data={this.props.data}
        callback={record => console.log("record",record)}
      />
    )
  }
}

const mapStateToProps = state => {
	return { data: state.productReducer.data || [] };
};

export default connect(mapStateToProps)(Seacrhbox);