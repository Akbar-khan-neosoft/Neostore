import { CART_ITEM_COUNT } from '../Constants';

const initialState = {
    data:''
};

function cartitemcount(state = initialState, action) {
    const localCartData = JSON.parse(localStorage.getItem("cart"))
    const cartItemCount = localCartData ? localCartData.length : 0
    switch (action.type) {
        case CART_ITEM_COUNT:
            return { ...state, data: cartItemCount };
        default:
            return state;
    }
}

export default cartitemcount;
