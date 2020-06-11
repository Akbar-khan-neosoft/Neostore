import React, { Component } from 'react';
import axios from 'axios';
import '../../../Assets/CSS/Product.css';
import { connect } from 'react-redux';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchProductData } from '../../../Redux/Actions/productAction';
import { URL } from '../../../Redux/Constants';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import ErrorPage from "../../Common/ErrorPage"
import Loading from "../../Common/Loading"



let indexOfLastPost;
let indexOfFirstPost;
let currentCard;

class Product extends Component {
	constructor() {
		super();
		this.state = {
			post: [],
			allCategories: [],
			allColor: [],
			currentPage: 1,
			cardsPerPage: 9,
			heading: "All Categories"
		};
	}

	async componentDidMount() {
		await this.props.onFetch();
		this.setState({ post: this.props.data });

		const categoriesData = await axios.get(URL + 'getAllCategories');
		this.setState({ allCategories: categoriesData.data.category_details });

		const colorData = await axios.get(URL + 'getAllColors');
		this.setState({ allColor: colorData.data.color_details });
	}

	handlePageChange = pageNumber => {
		this.setState({ currentPage: pageNumber });
	};

	allCategoriesHandler = async category_id => {
		const categoriesData = await axios.get(URL + 'getProductByCateg/' + category_id);
		this.setState({ post: categoriesData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: categoriesData.data.product_details[0].category_id.category_name });
	};

	allColorHandler = async color_id => {
		const colorData = await axios.get(URL + 'getProductByColor/' + color_id);
		Array.isArray(colorData.data.product_details)
			? this.setState({ post: colorData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: colorData.data.product_details[0].category_id.category_name })
			: this.setState({ post: [], currentPage: 1, cardsPerPage: 9, heading: "" });
	};

	onAllProductClickHandle = () => {
		this.setState({ post: this.props.data, currentPage: 1, cardsPerPage: 9, heading: "All Categories" });
	};

	sortByRating = async () => {
		const ratingSortedData = await axios.get(URL + 'getAllProductsInHighestRating');
		this.setState({ post: ratingSortedData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: "All Categories" });
	};

	sortByAscending = async () => {
		const ascSortedData = await axios.get(URL + 'getAllProductsInAscending');
		this.setState({ post: ascSortedData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: "All Categories" });
	};

	sortByDescending = async () => {
		const desSortedData = await axios.get(URL + 'getAllProductsInDescending');
		this.setState({ post: desSortedData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: "All Categories" });

	};

	render() {
		const heading = this.state.heading
		const { allCategories, allColor } = this.state

		indexOfLastPost = this.state.currentPage * this.state.cardsPerPage;
		indexOfFirstPost = indexOfLastPost - this.state.cardsPerPage;
		currentCard = this.state.post.slice(indexOfFirstPost, indexOfLastPost);

		return (

			this.state.post.length > 0 ? <div className="product_container">
				<div className="product">
					<div className="side_filter">
						<div className="allProductButton btn" onClick={this.onAllProductClickHandle}>
							All Products
						</div>
						<div className="allCategoryExpansionPanel">
							<ExpansionPanel>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>Categories</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography className="col-12 mb-2 ">
										{allCategories
											? allCategories.map(res => {
												return (
													<span
														className="btn"
														style={{ textAlign: 'center', width: '100%' }}
														key={res._id}
														onClick={() => this.allCategoriesHandler(res.category_id)}
													>
														{res.category_name}
														<hr></hr>
													</span>
												);
											})
											: []}
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</div>
						<div className="allColorExpansionPanel">
							<ExpansionPanel>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>Colors</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography className="col-12 mb-2 ">
										{allColor
											? allColor.map(res => {
												return (
													<span
														className="colorfilter btn"
														style={{ backgroundColor: res.color_code }}
														key={res._id}
														onClick={() => this.allColorHandler(res.color_id)}
													></span>
												);
											})
											: []}
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</div>
					</div>
					<div className="all_product">
						<div className="all_product_header">
							<div className="headingcontent"><h3>{heading}</h3></div>
							<div className="sortingbuttoncontainer">Sort By:
							<button className="sortingbutton" onClick={this.sortByRating}>
									<i class="fa fa-star" aria-hidden="true"></i>
								</button>
								<button className="sortingbutton" onClick={this.sortByAscending}>
									<i class="fa fa-inr fa-lg" aria-hidden="true"></i>
									<i class="fa fa-arrow-up" aria-hidden="true"></i>
								</button>
								<button className="sortingbutton" onClick={this.sortByDescending}>
									<i class="fa fa-inr fa-lg" aria-hidden="true"></i>
									<i class="fa fa-arrow-down" aria-hidden="true"></i>
								</button>
							</div>
						</div>
						{currentCard.length !== 0 ? (
							<ProductCard data={currentCard} />
						) : (<ErrorPage />)}
					</div>
				</div>
				<div className="product_pagination">
					<Pagination
						cardsPerPage={this.state.cardsPerPage}
						totalPosts={this.props.data.length}
						paginate={this.handlePageChange}
					/>
				</div>
			</div> : <Loading />
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
