import React, { Component } from 'react';
import axios from 'axios';
import '../../../../Assets/CSS/Dashboard_Popular_Product.css';
import { connect } from 'react-redux';
import { fetchPopularProductData } from '../../../../Redux/Actions/popularProductAction';

class Dashboard_Popular_Product extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.onFetch();
		// axios.get('http://180.149.241.208:3022/defaultTopRatingProduct').then(result => {
		// 	this.setState({ data: result.data.product_details });
	}

	render() {
		return (
			<div className="Dashboard_Popular_Product_Body">
				<div className="Dashboard_Popular_Product_Heading">Popular Product</div>
				<div className="Dashboard_Popular_Product_Link">
					<button style={{ background: 'transparent', border: 'none' }}>View All</button>
				</div>
				<div className="Dashboard_Popular_Product_Card">
					{console.log('dashboard', this.props.data)}
					{this.props.data.map(item => {
						return [item].map(result => {
							return (
								<div class="card" key={result.DashboardProducts[0].product_id}>
									<div className="class-thumbnail">
										<img
											style={{ height: '120px', width: '230px', borderRadius: '10px' }}
											src={
												'http://180.149.241.208:3022/' +
												result.DashboardProducts[0].product_image
											}
											class="card-img-top"
											alt="..."
										/>
										<div class="card-body">
											<div
												style={{
													height: '50px',
												}}
											>
												<p
													style={{
														fontWeight: '700',
														fontSize: '15px',
														color: 'black',
														textAlign: 'center',
													}}
												>
													<a href="#">{result.DashboardProducts[0].product_name}</a>
												</p>
											</div>
											<div>
												<p
													style={{
														fontWeight: '700',
														fontSize: '13px',
														color: 'black',
														textAlign: 'center',
													}}
												>
													<i class="fa fa-inr" aria-hidden="true"></i>
													{result.DashboardProducts[0].product_cost}
												</p>
											</div>
											<div className="text-center">
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
								</div>
							);
						});
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('redux:- ', state);

	return { data: state.popularProductReducer.data || [] };
};

const mapDispatchToProps = dispatch => ({
	onFetch: () => dispatch(fetchPopularProductData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard_Popular_Product);
