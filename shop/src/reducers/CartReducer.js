import {
    CHANGE_ORDER_DETAILS,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CART_SEND_INIT,
    CART_SEND_REQUEST
  } from '../actions/actionTypes';
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
    success: false
  };

  const compareOrder = (a, b) => (
    a.id === b.id && a.size === b.size && a.price === b.price
  );
  
  export default function CartReducer(state = initialState, action) {
    switch (action.type) {
      case CART_SEND_INIT:
        return { ...state, sending: false, error: null, success: false };
      case CART_SEND_REQUEST:
        return { ...state, sending: true, error: null, success: false };
      case CHANGE_ORDER_DETAILS:
        const { phone, address, agreement } = action.payload;
        return { ...state, owner: { ...state.owner, phone, address }, agreement };
      case SEND_ORDER_REQUEST:
        return { ...state, sending: true, error: null, success: false };
      case SEND_ORDER_SUCCESS:
        return { ...state, items: [], sending: false, success: true };
      case SEND_ORDER_FAILURE:
        return { ...state, sending: false, error: action.payload.error };
      case ADD_TO_CART:
        const items = [...state.items];
        const orderIndex = items.findIndex((el) => compareOrder(el, action.payload.item));

        if (orderIndex === -1) {
          items.push(action.payload.item);
        } else {
          items[orderIndex].count += action.payload.item.count;
        }

        return { ...state, items };
      case REMOVE_FROM_CART:
        return { ...state, items: state.items.filter((o) => o.id !== action.payload.id) };
      default:
        return state;
    }
  }