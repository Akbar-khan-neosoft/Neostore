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

	onSliderClickHandle=async(category_id)=>{

		this.props.history.push("/product/" + category_id);
		
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
	// <Carousel.Item>
    //                     <img
    //                         className="d-block w-100"
    //                         src={URL + item.product_image}
    //                         alt={item.category_name}
    //                         key={i}
    //                         height="500px"
    //                         onClick={()=>{
    //                             sweetalert2.fire({
    //                                 'text':'Getting products ready for you in 2 seconds',
    //                                 'icon':'success'
    //                             });
    //                             setTimeout(()=>{
    //                                 props.history.push(`/products/${item.category_id}`)
    //                                 // props.history.push(`/products/${item.category_id}`)
    //                             },1000) 
    //                         }
    //                         }

    //                     />

	render() {
		return (
			<div className="dashboard-slider">
				<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
					<div class="carousel-inner">
						{this.props.data.map((item, index) => (
							<div  class={`carousel-item ${index == 0 ? 'active' : ''}`} key={index}>
								{console.log("item",item)}
								
								<img className ="btn" src={URL + item.product_image} width="100%" height="350px" alt="..." onClick={()=>{this.onSliderClickHandle(item.category_id)}} />
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
