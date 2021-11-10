import { take, takeLatest, put, call, select, race, spawn } from 'redux-saga/effects';
import Api from '../api/index';
import { 
  FETCH_SALES_REQUEST,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCTS_REQUEST,
  SELECT_CATEGORY,
  CART_SEND_REQUEST
} from '../actions/actionTypes';
import { 
  fetchSalesFailure, 
  fetchSalesSuccess,
  fetchProductFailure,
  fetchProductSuccess,
  fetchProductsRequest,
  fetchCategoriesSuccess,
  fetchProductsFailure,
  fetchProductsSuccess,
  sendOrderFailure,
  sendOrderSuccess,
  catalogFetchSuccess
} from '../actions/actionCreators';
import { LOCATION_CHANGE } from 'connected-react-router';


function* handleHitsSalesFetchSaga() {
  try {
    const data = yield call(Api.fetchHitsSales);
    yield put(fetchSalesSuccess(data));
  } catch (error) {
    yield put(fetchSalesFailure(error.message));
  }
}

function* handleItemFetchSaga(action) {
  try {
    const data = yield call(Api.fetchCatalogItem, action.payload.id); 
    yield put(fetchProductSuccess(data));
  } catch (error) {
    yield put(fetchProductFailure(error.message));
  }
}

function* handleCatalogFetchSaga(action) {
  const catalog = yield select((state) => state.catalog);
  const { append } = action.payload;

  try {
    let data = null;

    if (catalog.categories.length === 0) {
      data = yield call(Api.fetchCatalogCategories);
      yield put(fetchCategoriesSuccess(data));
    }

    const params = {};

    if (catalog.category) {
      params.categoryId = catalog.category;
    }

    if (append && catalog.products.length) {
      params.offset = catalog.products.length;
    }

    if (catalog.search) {
      params.q = catalog.search;
    }

    data = yield call(Api.fetchCatalogItems, params); 
    yield put(fetchProductsSuccess(data, append));
    yield put(catalogFetchSuccess());
  } catch (error) {
    if (catalog.categories.length && catalog.products.length) {
      yield put(catalogFetchSuccess());
    }

    yield put(fetchProductsFailure(error.message));
  }
}

function* handleCartSendSaga(action) {
  try {
    const { owner } = action.payload;
    const { items } = yield select((state) => state.cart);
    const data = {
      owner,
      items: items.map(({ id, price, count, size }) => ({ id, price, count, size })),
    };

    const { result } = yield race({
      result: call(Api.sendCart, data), 
      location: take(LOCATION_CHANGE),
    });

    if (result) {
      yield put(sendOrderSuccess());
    }
  } catch (error) {
    yield put(sendOrderFailure(error.message));
  }
}

export function* watchHitsSalesFetchSaga() {
  yield takeLatest(FETCH_SALES_REQUEST, handleHitsSalesFetchSaga);
}

export function* watchItemFetchSaga() {
  yield takeLatest(FETCH_PRODUCT_REQUEST, handleItemFetchSaga);
}

export function* watchCatalogFetchSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, handleCatalogFetchSaga);
}

export function* watchCatalogRefetchSaga() {
  while (true) {
    yield take(SELECT_CATEGORY);
    yield put(fetchProductsRequest(false));
  }
}

export function* watchCartSendSaga() {
  yield takeLatest(CART_SEND_REQUEST, handleCartSendSaga);
}

export default function* saga() {
  yield spawn(watchItemFetchSaga);
  yield spawn(watchHitsSalesFetchSaga);
  yield spawn(watchCatalogFetchSaga);
  yield spawn(watchCatalogRefetchSaga);
  yield spawn(watchCartSendSaga);
}