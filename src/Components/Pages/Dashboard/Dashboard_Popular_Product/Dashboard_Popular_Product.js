import React, { Component } from 'react';
import axios from 'axios';

class Dashboard_Popular_Product extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		axios.get('http://180.149.241.208:3022/defaultTopRatingProduct').then(result => {
			this.setState({ data: result.data.product_details });
		});
	}

	render() {
		return (
			<div className="Dashboard_Popular_Product_Body">
				<div className="Dashboard_Popular_Product_Heading">Popular Product</div>
				<div className="Dashboard_Popular_Product_Link">
					<button>View All</button>
				</div>
				<div className="Dashboard_Popular_Product_Card">
					{this.state.data.map(item => {
						return item.DashboardProducts.map(result => {
							return (
								<div class="card" style={{ width: '18rem' }} key={result.product_id}>
									<img
										src={'http://180.149.241.208:3022/' + result.product_image}
										// src={'http://180.149.241.208:3022/2019-06-20T05-52-53.191Zam2.jpg'}
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										{/* <h5 class="card-title">Card title</h5> */}
										<p class="card-text">{result.product_name}</p>
										<p class="card-text">{result.product_cost}</p>
										<a href="#" class="btn btn-primary">
											Add To Card
										</a>
									</div>
								</div>
							);
						});
					})}
				</div>
			</div>
		);
	}
}

export default Dashboard_Popular_Product;
