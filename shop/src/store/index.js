
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas/index';
import { storageCartMiddleware, storageCartInit } from '../api/apiCartLocalStorage';

import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import CatalogReducer from '../reducers/CatalogReducer';
import SalesReducer from '../reducers/SalesReducer';
import DetailsReducer from '../reducers/DetailsReducer';
import SearchReducer from '../reducers/SearchReducer';
import CartReducer from '../reducers/CartReducer';

export const history = createBrowserHistory();

const reducer = combineReducers({
  router: connectRouter(history),
  catalog: CatalogReducer,
  sales: SalesReducer,
  details: DetailsReducer,
  search: SearchReducer,
  cart: CartReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  { cart: storageCartInit() },
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware, storageCartMiddleware)),
);

sagaMiddleware.run(saga);

export default store;

//const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(api), routerMiddleware(history))));
