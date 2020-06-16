import axios from "axios";
import { URL } from "../Redux/Constants"



export const addToCart = (data) => {
    console.log("hh", data);

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

export const updateQuantityAPI = (prd_id, quantity) => {
    const localData = JSON.parse(localStorage.getItem("loginData"))
    console.log(prd_id, quantity, localData.token);

    const data = {
        product_id: prd_id,
        quantity: quantity,
    }

    return (axios.post(URL + 'updateQuantityByCustId', data, { headers: { "Authorization": "Brearer " + localData.token } }));
};


export const addToCartLogoutAPI = (prd_id) => {
    // const localData = JSON.parse(localStorage.getItem("loginData")) 
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
    console.log(prd_id, localData.token);

    return (axios.delete(URL + 'deleteCustomerCart/' + prd_id, { headers: { "Authorization": "Brearer " + localData.token } }));
};

export const placeOrderAPI = (data) => {
    const localData = JSON.parse(localStorage.getItem("loginData"))
    console.log(data, localData.token);

    return (axios.post(URL + 'addProductToCartCheckout', data, { headers: { "Authorization": "Brearer " + localData.token } }));
};


