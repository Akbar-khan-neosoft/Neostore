import React, { Component } from 'react';
import axios from 'axios';
import '../../../../Assets/CSS/Dashboard_Popular_Product.css';

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
					<button style={{ background: 'transparent', border: 'none' }}>View All</button>
				</div>
				<div className="Dashboard_Popular_Product_Card">
					{this.state.data.map(item => {
						return item.DashboardProducts.map(result => {
							return (
								<div class="card" key={result.product_id}>
									<div className="class-thumbnail">
										<img
											style={{ height: '120px', width: '230px', borderRadius: '10px' }}
											src={'http://180.149.241.208:3022/' + result.product_image}
											// src={'http://180.149.241.208:3022/2019-06-20T05-52-53.191Zam2.jpg'}
											class="card-img-top"
											alt="..."
										/>
										<div class="card-body">
											{/* <h5 class="card-title">Card title</h5> */}
											<p
												style={{
													fontWeight: '700',
													fontSize: '15px',
													color: 'black',
													textAlign: 'center',
												}}
											>
												<a href="#">{result.product_name}</a>
											</p>
											<p
												style={{
													fontWeight: '700',
													fontSize: '13px',
													color: 'black',
													textAlign: 'center',
												}}
											>
												<i class="fa fa-inr" aria-hidden="true"></i>
												{result.product_cost}
											</p>
											<button
												style={{
													fontSize: '15px',
													color: 'white',
													fontWeight: '700',
													width: '150px',
													height: '30px',
													backgroundColor: 'red',
													borderRadius: '10px',
													margin: 'auto',
												}}
											>
												<a
													href="#"
													style={{
														color: 'white',
													}}
												>
													Add To Card
												</a>
											</button>
										</div>
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
