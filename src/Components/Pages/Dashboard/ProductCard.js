import React, { Component } from 'react';
import { Link,withRouter } from "react-router-dom"

import { URL } from '../../../Redux/Constants/index';
import { addToCartAPI } from "../../../API/API"
import StarRatingComponent from 'react-star-rating-component';
import '../../../Assets/CSS/Product.css';

class ProductCard extends Component {
	constructor(props) {
		super(props)
	}

	addToCartHandler = async (prd_id) => {
		const loginAuth = localStorage.getItem("loginAuth");
		// console.log(loginAuth);
		if(loginAuth){
				try {
			const res = await addToCartAPI(prd_id);
			alert(res.data.message)
		} catch (error) {
			// console.log(error.message)
			if (error.message === "Request failed with status code 404")
				alert("This Product Is Already Available In Your Cart")
			else {
				alert("Error")
			}

		}
	}else{
		alert("Kindly Login,To add this product to your cart")
		this.props.history.push("/login")
	}}

	render() {


		return (
			<div className="all_product_card">
				{this.props.data ? this.props.data.map(res => {
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
												<Link to={{
													pathname: "/productdetails",
													state: {
														productid: d.product_id
													}
												}}>{d.product_name}</Link>
												{/* <a href="#">{d.product_name}</a> */}
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
												onClick={() => this.addToCartHandler(d.product_id)}
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
				}) : []}
			</div>
		);
	}
}

export default withRouter(ProductCard);
