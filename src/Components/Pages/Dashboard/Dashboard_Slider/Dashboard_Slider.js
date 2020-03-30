import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios"

import { withRouter } from 'react-router-dom'
import '../../../../Assets/CSS/Dashboard_Slider.css';
import { fetchSliderData } from '../../../../Redux/Actions/sliderAction';
import { URL } from '../../../../Redux/Constants/index';

class DashboardCarousel extends Component {
	constructor() {
		super();
		// this.state = {
		// 	data: [],
		// };
	}

	componentDidMount() {
		this.props.onFetch();
	}

	onSliderClickHandle=async()=>{

		this.props.history.push("/product");
		
		// const 	category_id = id;
		// const	color_id="";
		// const	sortBy='';
		// const	sortIn='';
		// const	name='';
		// const	pageNo=0;
		// const	perPage=0;
		
		// const res = await axios.get(URL + 'commonProducts/' + category_id + color_id + sortBy + sortIn + name + pageNo + perPage )        
		// alert(res + ",You Are Redirected To HomePage Now");
	}

	render() {
		return (
			<div className="dashboard-slider">
				<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
					<div class="carousel-inner">
						{this.props.data.map((item, index) => (
							<div  class={`carousel-item ${index == 0 ? 'active' : ''}`} key={index}>
								<img className ="btn" src={URL + item.product_image} width="100%" height="350px" alt="..." onClick={this.onSliderClickHandle} />
							</div>
						))}
					</div>
					<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="sr-only">Previous</span>
					</a>
					<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="sr-only">Next</span>
					</a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { data: state.sliderReducer.data.category_details || [] };
};

const mapDispatchToProps = dispatch => ({
	onFetch: () => dispatch(fetchSliderData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardCarousel));
