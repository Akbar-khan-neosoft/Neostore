import React, { Component } from "react"
import StarRatingComponent from "react-star-rating-component"
import Rating from '@material-ui/lab/Rating';
import Swal from "sweetalert2"
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import "../../Assets/CSS/ProductDetails.css"
import { URL } from "../../Redux/Constants"
import { addToCart } from "../../API/API"
import { cartitemcounthandle } from '../../Redux/Actions/cartItemCountAction'
import axios from "axios"
import ReactImageMagnify from 'react-image-magnify';
import Loading from "../Common/Loading";

const localData = JSON.parse(localStorage.getItem("loginData"));

class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productDetails: [],
            changeImage: true,
            showDescription: true,
            showFeature: false,
            imageId: '',
            showRateProduct: false,
            rateProductValue: 0,
            disableSubmitRateProduct: true
        }

    }

    onchangerateproduct = (e) => {
        e.preventDefault();
        this.setState({ rateProductValue: e.target.value, disableSubmitRateProduct: false })
    }

    onClickRateProduct = () => {
        const localData = JSON.parse(localStorage.getItem("loginData"));
        if (localData === null) {
            Swal.fire({
				icon: 'info',
				title: 'Login First',
				text:  "You need to logged-In,Before rating a product",
                showConfirmButton: false,
                timer: 1500
			})
            this.props.history.push("/login")
        }
        else {
            this.setState({ showRateProduct: !this.state.showRateProduct })
        }
    }

    onCancelRateProduct = () => {
        this.setState({ showRateProduct: !this.state.showRateProduct })
    }

    onSubmitRateProduct = async () => {
        const data = {
            product_id: this.props.location.state.productid,
            product_rating: this.state.rateProductValue
        }

        const res = await axios.put(URL + "updateProductRatingByCustomer", data, { headers: { "Authorization": "Brearer " + localData.token } })
        Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 2000
        })
        this.setState({ showRateProduct: false })
    }


    async componentDidMount() {
        const res = await axios.get(URL + "getProductByProdId/" + this.props.location.state.productid)
        this.setState({ productDetails: res.data.product_details[0] })
    }

    async componentWillReceiveProps(nextProps) {
        const res = await axios.get(URL + "getProductByProdId/" + nextProps.location.state.productid)
        this.setState({ productDetails: res.data.product_details[0] || [] })
    }

    onDescriptionButtonhandle = (param) => {

        if (param === "desc") {
            this.setState({ showDescription: true, showFeature: false })
        } else if (param === "feature") {
            this.setState({ showDescription: false, showFeature: true })
        }


    }

    onSubImageClickHandle = (param) => {
        this.setState({ changeImage: false, imageId: param })
    }

    addToCartHandler = async (data) => {
        data["quantity"] = 1;
        await addToCart(data)
        this.props.cartItemCount()
    }

    render() {
        const productData = this.state.productDetails
        
        let descriptionData, imageData;

        this.state.showDescription ? descriptionData = productData.product_desc : descriptionData = <div>
            <b>Dimensions</b>: {productData.product_dimension}  (Width*Height in inch)<br></br>
            <b>Material</b>: {productData.product_material}<br></br>
            <b>Manufacturer</b>: {productData.product_producer}<br></br>
        </div>

        this.state.changeImage ? imageData =
            <ReactImageMagnify
                {...{
                    smallImage: {
                        alt: "main",
                        src: URL + productData.product_image,
                        isFluidWidth: true,
                        // width: 500,
                        // height: 250
                    },
                    largeImage: {
                        src: URL + productData.product_image,
                        width: 1000,
                        height: 500,
                    },
                }}
            />
            : imageData =
            <ReactImageMagnify
                {...{
                    smallImage: {
                        alt: "main",
                        src: URL + this.state.imageId,
                        width: 500,
                        height: 250
                    },
                    largeImage: {
                        src: URL + this.state.imageId,
                        width: 1000,
                        height: 500,
                    },
                }} />
            
        return ( productData.length === undefined ? 
                <div className="productdetailscontainer">
                    <div className="productdata">
                        <div className="productdetailsimages">
                            <div className="mainimagecontainer">
                                {imageData}
                            </div>
                            <div className="subimagescontainer">
                                {productData.subImages_id ? [productData.subImages_id].map((res) => {
                                    return [res.product_subImages].map((item) => {
                                        return (item.map((result) => {
                                            return (
                                                <div className="subimages btn" key={result} onClick={() => this.onSubImageClickHandle(result)}>
                                                    <img src={URL + result} alt="productimage" style={{ width: "100%", height: "60px" }} />
                                                </div>
                                            )
                                        })

                                        )

                                    })
                                }) : []}

                            </div>
                        </div>
                        <div className="productdetailsdata">
                            <div>{productData.product_name}</div>
                            <div><StarRatingComponent
                                name="starrating"
                                value={productData.product_rating}
                                editing={false}
                                starCount={5}
                            /><hr></hr></div>

                            <div><i className="fa fa-inr" aria-hidden="true"></i> {productData.product_cost}</div>
                            <div className="productcolorcontainer"><div style={{ paddingTop: "5px" }}>color :</div> {productData.color_id ? [productData.color_id].map((res) => {
                                return (<div className="colorbox" key={res.color_code} style={{ backgroundColor: res.color_code }}></div>)
                            }) : []}</div>



                            <div>Share</div>
                            <div className="sharingbutton">
                                <button className="sharebutton fa fa-facebook"></button>
                                <button className="sharebutton fa fa-twitter"></button>
                                <button className="sharebutton fa fa-google"></button>
                                <button className="sharebutton fa fa-linkedin"></button>
                                <button className="sharebutton fa fa-youtube"></button>
                                <button className="sharebutton fa fa-instagram"></button>

                            </div>
                            <div className="otherbuttonssection">
                                <div className="addandratebuttons">
                                    <div>
                                        <button className="addandratebutton"
                                            onClick={() => { this.addToCartHandler(this.state.productDetails) }}
                                        >
                                            <span
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                Add To Card
											</span>
                                        </button>
                                    </div>
                                    <div>
                                        <button className="addandratebutton"
                                            onClick={this.onClickRateProduct}
                                        >
                                            <span
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                Rate Product
											</span>
                                        </button>
                                    </div>
                                </div>
                                {this.state.showRateProduct ? <div className="rateproduct">
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Rate The Product</Typography><hr></hr>
                                        <span>  <Rating
                                            name="rateproduct"
                                            value={this.state.rateProductValue}
                                            precision={0.5}
                                            onChange={this.onchangerateproduct}
                                        /></span><span>
                                            <button disabled={this.state.disableSubmitRateProduct} onClick={this.onSubmitRateProduct} style={{ marginLeft: "3%" }}>Done</button></span>
                                        <span>
                                            <button onClick={this.onCancelRateProduct} style={{ marginLeft: "3%" }}>Cancel</button></span>
                                    </Box>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="productdetailsdescription">
                        <div className="descriptionbuttons"><button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.onDescriptionButtonhandle("desc")}>{this.state.showDescription ? <b>Description</b> : "Description"}</button>
                            <button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.onDescriptionButtonhandle("feature")}>{this.state.showFeature ? <b>Features</b> : "Features"}</button></div>
                        <div className="descriptiondata">{descriptionData}</div>
                    </div>
                </div> : <Loading/> ) 
                
    }
}

const mapDispatchToProps = dispatch => ({
    cartItemCount: () => dispatch(cartitemcounthandle())
});

export default connect(null, mapDispatchToProps)(ProductDetails)