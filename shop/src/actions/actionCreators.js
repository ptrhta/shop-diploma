import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    FETCH_SALES_REQUEST,
    FETCH_SALES_SUCCESS,
    FETCH_SALES_FAILURE,
    FETCH_CATEGORIES_SUCCESS,
    CHANGE_SEARCH_FIELD,
    CATALOG_SEARCH_CHANGE,
    SELECT_CATEGORY,
    CHANGE_ORDER_DETAILS,
    SEND_ORDER_REQUEST,
    CART_SEND_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILURE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_COUNTER,
    SELECT_SIZE,
    CART_SEND_INIT,
    CATALOG_INIT,
    CATALOG_FETCH_SUCCESS,
    CATALOG_FETCH_FAILURE
  } from './actionTypes';

  export function catalogInit(search = '') {
    return { type: CATALOG_INIT, payload: { search }, }
  }
  export function fetchProductsRequest(append) {
    return { type: FETCH_PRODUCTS_REQUEST, payload: { append } };
  }
  export function fetchProductsSuccess(products, append) {
    return { type: FETCH_PRODUCTS_SUCCESS, payload: { products, append }};
  }
  export function fetchProductsFailure(error) {
    return { type: FETCH_PRODUCTS_FAILURE, payload: { error } };
  }
  
  export function fetchSalesRequest() {
    return { type: FETCH_SALES_REQUEST };
  }
  export function fetchSalesSuccess(sales) {
    return { type: FETCH_SALES_SUCCESS, payload: { sales } };
  }
  export function fetchSalesFailure(error) {
    return { type: FETCH_SALES_FAILURE, payload: { error } };
  }
  
  export function fetchProductRequest(id) {
    return { type: FETCH_PRODUCT_REQUEST, payload: { id } };
  }
  export function fetchProductSuccess(product) {
    return { type: FETCH_PRODUCT_SUCCESS, payload: { product } };
  }
  export function fetchProductFailure(error) {
    return { type: FETCH_PRODUCT_FAILURE, payload: { error } };
  }
  
  export function fetchCategoriesSuccess(categories) {
    return { type: FETCH_CATEGORIES_SUCCESS, payload: { categories } };
  }
  
  export function selectCategory(category) {
    return { type: SELECT_CATEGORY, payload: { category } };
  }
  
  export function changeSearchField(search) {
    return { type: CHANGE_SEARCH_FIELD, payload: { search } };
  }
  
  export function changeOrderDetails(phone, address, agreement) {
    return { type: CHANGE_ORDER_DETAILS, payload: { phone, address, agreement } };
  }
  
  export function sendOrderRequest() {
    return { type: SEND_ORDER_REQUEST };
  }
  export function sendOrderSuccess() {
    return { type: SEND_ORDER_SUCCESS };
  }
  export function sendOrderFailure(error) {
    return { type: SEND_ORDER_FAILURE, payload: { error } };
  }

  export function cartSendRequest(owner) {
    return { type: CART_SEND_REQUEST, payload: { owner },}
  }

  export function cartSendInit() {
    return { type: CART_SEND_INIT, }
  }
  
  export function addToCart(item) {
    return { type: ADD_TO_CART, payload: { item } };
  }
  export function removeFromCart(id) {
    return { type: REMOVE_FROM_CART, payload: { id } };
  }

  export function changeCounter(counter) {
    return { type: CHANGE_COUNTER, payload: { counter } };
  }
  export function selectSize(size) {
    return { type: SELECT_SIZE, payload: { size } };
  }

  export function getUrl(path, q = '') {
    if (!path) return;
    const search = q ? new URLSearchParams({q}).toString() : '';
    return `${path}?${search}`;
  };

  export function catalogSearchChange(value) {
    return { type: CATALOG_SEARCH_CHANGE, payload: { value }, }
  };

  export function catalogFetchSuccess() {
    return { type: CATALOG_FETCH_SUCCESS, }
  };

  export function catalogFetchFailure(error) {
    return { type: CATALOG_FETCH_FAILURE, payload: { error }, }
  };