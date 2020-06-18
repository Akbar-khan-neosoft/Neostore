import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import { connect } from 'react-redux';
import { URL } from '../../../Redux/Constants/index';
import { addToCart } from "../../../API/API"
import StarRatingComponent from 'react-star-rating-component';
import '../../../Assets/CSS/Product.css';
import {cartitemcounthandle} from '../../../Redux/Actions/cartItemCountAction'


class ProductCard extends Component {

	addToCartHandler = async (data) => {
		data["quantity"] = 1;
		await addToCart(data)
		this.props.cartItemCount()
	}

	render() {


		return (
			<div className="all_product_card">
				{this.props.data ? this.props.data.map(res => {
					return [res].map(d => {
						return (
							<div className="card" key={d.product_id}>
								<div className="product_card_thumbnail">
									<div><img
										style={{
											height: '120px',
											width: '230px',
											borderRadius: '10px',
											margin: 'auto',
										}}
										src={URL + d.product_image}
										className="card-img-top"
										alt="..."
									/></div>
									<div className="card-body">
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
												<Link to={{
													pathname: "/productdetails",
													state: {
														productid: d.product_id
													}
												}}>{d.product_name}</Link>
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
												<i className="fa fa-inr" aria-hidden="true"></i>
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
												onClick={() => this.addToCartHandler(res)}
											>
												<span
													style={{color: 'white'}}
												>
													Add To Card
												</span>
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
				}) : []}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
    cartItemCount: () => dispatch(cartitemcounthandle())
});

export default connect(null, mapDispatchToProps)(withRouter(ProductCard));
