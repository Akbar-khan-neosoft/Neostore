import React, { Component } from 'react';
import axios from 'axios';
import '../../Dashboard/Dashboard_Slider/Dashboard_Slider.css';

class DashboardCarousel extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		axios.get('http://180.149.241.208:3022/getAllCategories').then(result => {
			this.setState({ data: result.data.category_details });
		});
	}

	render() {
		return (
			<div className="dashboard-slider">
				<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
					<div class="carousel-inner">
						{this.state.data.map((item, index) => (
							<div class={`carousel-item ${index == 0 ? 'active' : ''}`} key={index}>
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

export default DashboardCarousel;
