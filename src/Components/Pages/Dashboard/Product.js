import React, { Component } from 'react';
import { URL } from '../../../Redux/Constants/index';
import '../../../Assets/CSS/Product.css';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import { fetchProductData } from '../../../Redux/Actions/productAction';

class Product extends Component {
	componentDidMount() {
		this.props.onFetch();
	}

	render() {
		return (
			<div className="product_container">
				<div className="product">
					<div className="side_filter"></div>
					<div className="all_product">
						<div className="all_product_header"></div>
						<div className="all_product_card">
							{this.props.data.map(res => {
								return [res].map(d => {
									return (
										<div className="card" key={d.product_id}>
											<div className="product_card_thumbnail">
												<img
													style={{
														height: '120px',
														width: '230px',
														borderRadius: '10px',
														margin: 'auto',
													}}
													src={URL + d.product_image}
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
															<a href="#">{d.product_name}</a>
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
															{d.product_cost}
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
													<div className="text-center">
														<StarRatingComponent
															name="rating"
															value={parseInt(d.product_rating)}
															editing={false}
															starCount={5}
														/>
													</div>
												</div>
											</div>
										</div>
									);
								});
							})}
						</div>
					</div>
				</div>
				<div className="product_pagination">
					<nav aria-label="Page navigation example">
						<ul class="pagination">
							<li class="page-item">
								<a class="page-link" href="#">
									Previous
								</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="#">
									1
								</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="#">
									2
								</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="#">
									3
								</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="#">
									Next
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { data: state.productReducer.data || [] };
};

const mapDispatchToProps = dispatch => ({
	onFetch: () => dispatch(fetchProductData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
