import React, { Component } from 'react';
import '../../../Assets/CSS/Product.css';
import { connect } from 'react-redux';
import { fetchProductData } from '../../../Redux/Actions/productAction';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

let indexOfLastPost;
let indexOfFirstPost;
let currentCard;
class Product extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			cardsPerPage: 9,
		};
	}

	componentDidMount() {
		this.props.onFetch();
	}

	handlePageChange = pageNumber => {
		console.log(pageNumber);

		this.setState({ currentPage: pageNumber });
	};

	onAllProductClickHandle = () => {
		this.setState({ currentPage: 1, cardsPerPage: 9 });
	};

	render() {
		console.log('state - >', this.state);

		console.log('cc : ', this.state.currentPage);
		console.log('currentPage ->', this.state.currentPage);
		console.log('cardsPerPage ->', this.state.cardsPerPage);
		console.log('indexOfLastPost ->', indexOfLastPost);
		console.log('indexOfFirstPost ->', indexOfFirstPost);
		console.log('currentPage ->', currentCard);

		indexOfLastPost = this.state.currentPage * this.state.cardsPerPage;
		indexOfFirstPost = indexOfLastPost - this.state.cardsPerPage;
		currentCard = this.props.data.slice(indexOfFirstPost, indexOfLastPost);
		console.log('a indexOfLastPost ->', indexOfLastPost);
		console.log('a indexOfFirstPost ->', indexOfFirstPost);
		console.log('a currentPage ->', currentCard);

		return (
			<div className="product_container">
				<div className="product">
					<div className="side_filter">
						<div>
							<button onClick={this.onAllProductClickHandle}>All Products</button>
						</div>
					</div>
					<div className="all_product">
						<div className="all_product_header"></div>

						<ProductCard data={currentCard} />
					</div>
				</div>
				<div className="product_pagination">
					<Pagination
						cardsPerPage={this.state.cardsPerPage}
						totalPosts={this.props.data.length}
						paginate={this.handlePageChange}
					/>
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
