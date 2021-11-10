import { STORAGE_CART_ORDERS } from '../actions/actionTypes';

export const storageCartMiddleware = store => next => action => {
  const result = next(action);
  const cartOrdersFromStore = JSON.stringify(store.getState().cart.items);
  localStorage.setItem(STORAGE_CART_ORDERS, cartOrdersFromStore);
  return result;
};

export const storageCartInit = () => ({
  items: JSON.parse(localStorage.getItem(STORAGE_CART_ORDERS)) || [],
});