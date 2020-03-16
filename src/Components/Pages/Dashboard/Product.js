import React, { Component } from 'react';
import '../../../Assets/CSS/Product.css';
import { connect } from 'react-redux';
import { fetchProductData } from '../../../Redux/Actions/productAction';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

class Product extends Component {
	constructor() {
		super();
		this.state = {
			post: [],
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

	render() {
		console.log('cc : ', this.state.currentPage);

		const indexOfLastPost = this.state.currentPage * this.state.cardsPerPage;
		const indexOfFirstPost = indexOfLastPost - this.state.cardsPerPage;
		const currentCard = this.props.data.slice(indexOfFirstPost, indexOfLastPost);

		return (
			<div className="product_container">
				<div className="product">
					<div className="side_filter"></div>
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
