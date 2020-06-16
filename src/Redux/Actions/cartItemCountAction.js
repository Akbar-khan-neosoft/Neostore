import { CART_ITEM_COUNT} from '../Constants';

const cartitemcount = () => ({ type: CART_ITEM_COUNT});

export const cartitemcounthandle = () =>  dispatch => {
        dispatch(cartitemcount());
};
