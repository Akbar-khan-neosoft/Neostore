import React, { Component } from 'react';
import '../../../Assets/CSS/Product.css';
import { connect } from 'react-redux';
import { fetchProductData } from '../../../Redux/Actions/productAction';
import Pagination from 'react-js-pagination';
import ProductCard from './ProductCard';

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
		this.setState({ currentPage: pageNumber });
	};

	render() {
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
						activePage={this.state.currentPage}
						itemsCountPerPage={this.state.cardsPerPage}
						totalItemsCount={40}
						pageRangeDisplayed={5}
						onChange={this.handlePageChange}
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
