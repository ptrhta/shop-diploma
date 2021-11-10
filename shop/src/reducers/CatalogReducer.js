import {
  CATALOG_INIT,
  FETCH_CATEGORIES_SUCCESS,
  SELECT_CATEGORY,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CATALOG_SEARCH_CHANGE,
} from '../actions/actionTypes'

const initialState = {
  categories: [],
  products: [],
  search: '',
  category: 0,
  error: null,
  loading: false,
  more: true,
}

export default function CatalogReducer (state = initialState, action) {
  switch (action.type) {
    case CATALOG_INIT:
      return { ...initialState, search: action.payload.search }
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [ { id: 0, title: 'Все' }, ...action.payload.categories ],
      };
    case SELECT_CATEGORY:
      return { ...state, category: action.payload.category }
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        ...action.payload.properties,
        products: action.payload.append ? [...state.products] : [],
        loading: true,
        error: null
      }
    case FETCH_PRODUCTS_SUCCESS:
      const { products, append } = action.payload

      return {
        ...state,
        loading: false,
        error: null,
        products: append ? [...state.products, ...products] : products,
        more: products.length > 5
      }
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload.error }
    case CATALOG_SEARCH_CHANGE:
      return { ...state, search: action.payload.value }
    default:
      return state
  }
}
