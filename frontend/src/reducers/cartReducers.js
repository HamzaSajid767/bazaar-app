import {
  SHOPPING_CART_ADD_ITEM,
  SHOPPING_CART_ADD_ITEM_FAIL,
  SHOPPING_CART_EMPTY,
  SHOPPING_CART_REMOVE_ITEM,
  SHOPPING_CART_SAVE_PAYMENT_METHOD,
  SHOPPING_CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case SHOPPING_CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          error: '',
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, error: '', cartItems: [...state.cartItems, item] };
      }
    case SHOPPING_CART_REMOVE_ITEM:
      return {
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case SHOPPING_CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case SHOPPING_CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case SHOPPING_CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };
    case SHOPPING_CART_EMPTY:
      return { ...state, error: '', cartItems: [] };
    default:
      return state;
  }
};
