import React, { Component } from 'react';
import axios from 'axios';
import '../../Assets/CSS/Product.css';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { URL } from '../../Redux/Constants/index';
import ProductCard from '../../Components/Pages/Dashboard/ProductCard';
import Pagination from '../../Components/Pages/Dashboard/Pagination';
import ErrorPage from "../Common/ErrorPage"
import Loading from "../Common/Loading"
import {getCommonProducts} from '../../API/API'



let indexOfLastPost;
let indexOfFirstPost;
let currentCard;

class AllProduct extends Component {
	constructor() {
		super();
		this.state = {
			post: [],
			allCategories: [],
			allColor: [],
			currentPage: 1,
			cardsPerPage: 9,
            heading: "All Categories",
            categoryId:'',
            colorId:'',
            totalCount:0,
		};
	}

	async componentDidMount() {
        const data = await getCommonProducts({"category_id":""});
        
		if(this.props.location.state){
			this.allCategoriesHandler({"category_id":this.props.location.state.category_id})
		} else {
			this.setState({ post: data.data.product_details,totalCount:data.data.total_count });
		}
		
		const categoriesData = await axios.get(URL + 'getAllCategories');
		this.setState({ allCategories: categoriesData.data.category_details });

		const colorData = await axios.get(URL + 'getAllColors');
		this.setState({ allColor: colorData.data.color_details });
	}

	handlePageChange = async pageNumber => {
        const data = await getCommonProducts({"category_id":"","pageNo":pageNumber});
		this.setState({ post: data.data.product_details });
	};

	allCategoriesHandler = async category_id => {
        const categoriesData = await getCommonProducts(category_id);
		this.setState({ post: categoriesData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: categoriesData.data.product_details[0].category_id.category_name,categoryId:category_id.category_id,colorId:'',totalCount:categoriesData.data.total_count });
	};

	allColorHandler = async color_id => {
        const colorData = await getCommonProducts(color_id);
        
		Array.isArray(colorData.data.product_details)
			? this.setState({ post: colorData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: "All Categories",colorId:color_id.color_id,categoryId:'',totalCount:colorData.data.total_count  })
			: this.setState({ post: [], currentPage: 0, cardsPerPage: 9, heading: "" });
	};

	onAllProductClickHandle = async () => {
        const data = await getCommonProducts({"category_id":""});
		this.setState({ post: data.data.product_details, currentPage: 1, cardsPerPage: 9, heading: "All Categories",totalCount:data.data.total_count });
	};

	sortByRating = async data => {
        const ratingSortedData = await getCommonProducts(data);
		this.setState({ post: ratingSortedData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: "All Categories" });
	};

	sortByAscending = async data => {
        const ascSortedData = await getCommonProducts(data);
		this.setState({ post: ascSortedData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: "All Categories" });
	};

	sortByDescending = async data => {
        const desSortedData = await getCommonProducts(data);
		this.setState({ post: desSortedData.data.product_details, currentPage: 1, cardsPerPage: 9, heading: "All Categories" });

	};

	render() {
        console.log(this.state.totalCount);
        
		const heading = this.state.heading
		const { allCategories, allColor } = this.state

		indexOfLastPost = this.state.currentPage * this.state.cardsPerPage;
		indexOfFirstPost = indexOfLastPost - this.state.cardsPerPage;
		currentCard = this.state.post.slice(indexOfFirstPost, indexOfLastPost);

		return (

			this.state.totalCount > 0 ? <div className="product_container">
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
														onClick={() => this.allCategoriesHandler({"category_id":res.category_id})}
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
														onClick={() => this.allColorHandler({"color_id":res.color_id})}
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
							<button className="sortingbutton" onClick={()=>this.sortByRating({"category_id":this.state.categoryId, "color_id":this.state.colorId, sortBy:"product_rating",sortIn:true})}>
									<i className="fa fa-star" aria-hidden="true"></i>
								</button>
								<button className="sortingbutton" onClick={()=>this.sortByAscending({"category_id":this.state.categoryId, "color_id":this.state.colorId, sortBy:"product_cost",sortIn:false})}>
									<i className="fa fa-inr fa-lg" aria-hidden="true"></i>
									<i className="fa fa-arrow-up" aria-hidden="true"></i>
								</button>
								<button className="sortingbutton" onClick={()=>this.sortByDescending({"category_id":this.state.categoryId, "color_id":this.state.colorId, sortBy:"product_cost",sortIn:true})}>
									<i className="fa fa-inr fa-lg" aria-hidden="true"></i>
									<i className="fa fa-arrow-down" aria-hidden="true"></i>
								</button>
							</div>
						</div>
						{this.state.totalCount > 0 ? currentCard.length !== 0 ?
							<ProductCard data={currentCard} />
							: <ErrorPage /> 
						: <Loading />}
					</div>
				</div>
				{(this.state.totalCount > this.state.cardsPerPage) ?
					<div className="product_pagination">
						<Pagination
							cardsPerPage={this.state.cardsPerPage}
							// totalPosts={this.props.data.length}
							totalPosts={this.state.totalCount}
							paginate={this.handlePageChange}
						/>
					</div> : null}
			</div> : <Loading />
		);
	}
}

// const mapStateToProps = state => {
// 	return { data: state.productReducer.data || [] };
// };

// const mapDispatchToProps = dispatch => ({
// 	onFetch: () => dispatch(fetchProductData()),
// });

export default AllProduct;
