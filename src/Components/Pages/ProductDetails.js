import React, { Component } from "react"
import StarRatingComponent from "react-star-rating-component"
import "../../Assets/CSS/ProductDetails.css"
import { URL } from "../../Redux/Constants"
import { addToCart } from "../../API/API"
import axios from "axios"
import ReactImageMagnify from 'react-image-magnify';


class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productDetails: [],
            changeImage: true,
            showDescription: true,
            showFeature: false,
            imageId: ''
        }

    }

    async componentDidMount() {
        const res = await axios.get(URL + "getProductByProdId/" + this.props.location.state.productid)
        this.setState({ productDetails: res.data.product_details[0] })


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
                        width: 500,
                        height: 250
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

        return (
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

                        <div><i class="fa fa-inr" aria-hidden="true"></i> {productData.product_cost}</div>
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
                            <button className="sharebutton fa-instagram"></button>

                        </div>
                        <div>
                            <div><button
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
                                onClick={() => { this.addToCartHandler(this.state.productDetails) }}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    Add To Card
											</span>
                            </button> </div>
                            <div><button
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
                                <span
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    Rate Product
											</span>
                            </button></div>
                        </div></div>
                </div>
                <div className="productdetailsdescription">
                    <div className="descriptionbuttons"><button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.onDescriptionButtonhandle("desc")}>Description</button>
                        <button style={{ backgroundColor: "transparent", border: "none" }} onClick={() => this.onDescriptionButtonhandle("feature")}>Features</button></div>
                    <div className="descriptiondata">{descriptionData}</div>
                </div>
            </div>)
    }
}

export default ProductDetails