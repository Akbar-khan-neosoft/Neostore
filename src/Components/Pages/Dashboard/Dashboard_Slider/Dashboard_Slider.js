import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../Assets/CSS/Dashboard_Slider.css';
import { fetchSliderData } from '../../../../Redux/Actions/sliderAction';

class DashboardCarousel extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		this.props.onFetch();

		// this.setState({ data: result.data.category_details });
	}

	render() {
		return (
			<div className="dashboard-slider">
				<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
					<div class="carousel-inner">
						{console.log('dashboard : ', this.props.data)}
						{[this.props.data].map((item, index) => (
							<div class={`carousel-item ${index == 0 ? 'active' : ''}`} key={index}>
								{console.log('inside : ', item.sliderReducer.data.data)}

								<img
									src={'http://180.149.241.208:3022/' + item.product_image}
									width="100%"
									height="350px"
									alt="..."
								/>
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
	{
		console.log('redu:', state);
	}
	return { data: state };
};

const mapDispatchToProps = dispatch => ({
	onFetch: () => dispatch(fetchSliderData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCarousel);
