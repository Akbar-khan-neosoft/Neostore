import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../Assets/CSS/Dashboard_Slider.css';
import { fetchSliderData } from '../../../../Redux/Actions/sliderAction';
import { URL } from '../../../../Redux/Constants/index';

class DashboardCarousel extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		this.props.onFetch();
	}

	render() {
		return (
			<div className="dashboard-slider">
				<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
					<div class="carousel-inner">
						{this.props.data.map((item, index) => (
							<div class={`carousel-item ${index == 0 ? 'active' : ''}`} key={index}>
								<img src={URL + item.product_image} width="100%" height="350px" alt="..." />
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCarousel);
