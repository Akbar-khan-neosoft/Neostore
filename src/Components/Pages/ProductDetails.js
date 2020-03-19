import React, { Component } from "react"
import StarRatingComponent from "react-star-rating-component"
import  "../../Assets/CSS/ProductDetails.css"
import {URL} from "../../Redux/Constants"
import axios from "axios"


class ProductDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            productDetails:[],
            changeImage:true,
            showDescription:true,
            showFeature:false,
            imageId:''
        }

    }

    async componentDidMount(){
        const res = await axios.get(URL + "getProductByProdId/" + this.props.location.state.productid)
        this.setState({productDetails:res.data.product_details[0]})
        console.log("akbar >",this.state.productDetails)
        
    }

    onDescriptionButtonhandle=(param)=>{

        if(param == "desc"){
            this.setState({showDescription:true , showFeature : false})
         } else if (param == "feature")
        {
            this.setState({showDescription:false , showFeature : true})
        }

        
    }

    onSubImageClickHandle=(param)=>{
        this.setState({changeImage:false , imageId : param})                
    }

    render(){
        const productData = this.state.productDetails
        let descriptionData , imageData;

        {this.state.showDescription ? descriptionData = productData.product_desc : descriptionData = <div>
            Dimensions: {productData.product_dimension}  (Width*Hieght in inc)<br></br>
            Material: {productData.product_material}<br></br>
            Manufacturer: {productData.product_producer}<br></br>
        </div>}  

        {this.state.changeImage ? imageData = <img src="abc.gif" alt ="main" /> : imageData=<img scr="#" alt= {this.state.imageId}/>}
        return(
        <div className="productdetailscontainer">
            <div className="productdata">
                <div className="productdetailsimages">
                    <div className="mainimagecontainer">
                        {imageData}
                        {/* {this.state.changeImage ? <img src="#" /> : <img scr="#"/>} */}
                    </div>
                    <div className="subimagescontainer">
                        <div className="subimages btn"  onClick={()=>this.onSubImageClickHandle("1")} style={{backgroundImage: ("#")}}></div>
                        <div className="subimages btn"  onClick={()=>this.onSubImageClickHandle("2")}style={{backgroundImage: ("#")}}></div>
                        <div className="subimages btn"  onClick={()=>this.onSubImageClickHandle("3")}style={{backgroundImage: ("#")}}></div>
                    </div>
                </div>
                <div className="productdetailsdata">
                    <div>Product Name</div>
                    <div><StarRatingComponent 
                    value={4}
					editing={false}
					starCount={5}
					/></div>
                    <hr></hr>
                    <div><i class="fa fa-inr" aria-hidden="true"></i> Price</div>
                    <div>color</div>
                    <div>Share</div>
                    <div>Sharing buttons</div>
                    <div>
                    <div>add to cart </div> <div>rate product</div>
                    </div></div>
            </div>
            <div className="productdetailsdescription">
                <div className="descriptionbuttons"><button onClick={()=>this.onDescriptionButtonhandle("desc")}>Description</button>
                <button onClick={()=>this.onDescriptionButtonhandle("feature")}>Features</button></div>
    <div className="descriptiondata">{descriptionData}</div>
            </div>
        </div>)
    }
}

export default ProductDetails