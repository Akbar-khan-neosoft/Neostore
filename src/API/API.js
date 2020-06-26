import axios from "axios";
import { URL } from "../Redux/Constants"



export const addToCart = (data) => {

    const cartData = JSON.parse(localStorage.getItem("cart")) || []
    const duplicateProduct = cartData.map(res => {
        return res._id
    }).find((id) => { return id === data._id })

    if (duplicateProduct === data._id) {
        alert("Product already available  in cart")
    } else {
        localStorage.setItem('cart', JSON.stringify(cartData.concat(data)));
        alert("Product added to cart")
    }

};

export const getCommonProducts = (data) => {
    return axios.get(URL + "commonProducts", { params: { "category_id": data.category_id, "color_id": data.color_id, "sortBy": data.sortBy, "sortIn": data.sortIn, "name": data.name, "pageNo": data.pageNo ? data.pageNo : 1, "perPage": data.perPage ? data.perPage : 9 } });
};


export const addToCartLogoutAPI = (prd_id) => {
    const data = {
        product_id: prd_id,
        quantity: 1
    }
    return (axios.post(URL + 'addProductToCartLogout', data));
}


// const res = await axios.get(URL + "getOrderDetails",{headers : {"Authorization": "Brearer " + localData.token }})
export const getOrderDetailsAPI = () => {
    const localData = JSON.parse(localStorage.getItem("loginData"))
    return (axios.get(URL + 'getOrderDetails', { headers: { "Authorization": "Brearer " + localData.token } }));
};

export const deleteCustomerCartAPI = (prd_id) => {
    const localData = JSON.parse(localStorage.getItem("loginData"))

    return (axios.delete(URL + 'deleteCustomerCart/' + prd_id, { headers: { "Authorization": "Brearer " + localData.token } }));
};

export const placeOrderAPI = (data) => {
    const localData = JSON.parse(localStorage.getItem("loginData"))

    return (axios.post(URL + 'addProductToCartCheckout', data, { headers: { "Authorization": "Brearer " + localData.token } }));
};


