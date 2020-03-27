import React from "react";
import axios from "axios";
import {URL} from "../Redux/Constants"


const localData = JSON.parse(localStorage.getItem("loginData")) 

export const addToCartAPI =  (prd_id) => {
    const data={
        product_id:prd_id,
        quantity : 1
    }    
	return (axios.post(URL + 'addDataToCart',data, {headers : {"Authorization": "Brearer " + localData.token }}));
};

// const res = await axios.get(URL + "getOrderDetails",{headers : {"Authorization": "Brearer " + localData.token }})
export const getOrderDetailsAPI =  () => {
   
	return (axios.get(URL + 'getOrderDetails', {headers : {"Authorization": "Brearer " + localData.token }}));
};  