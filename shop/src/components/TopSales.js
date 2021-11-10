import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from './Product';
import { Loader } from './Loader';
import { ErrorAlert } from './ErrorAlert';
import {
  fetchSalesRequest,
} from '../actions/actionCreators';

export function TopSales() {
  const { sales, loading, error } = useSelector((state) => state.sales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSalesRequest());
  }, [dispatch]);

  return (
    (sales.length || loading || error) ? <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {(error) ? <ErrorAlert onRetry={() => dispatch(fetchSalesRequest())} /> : null}
      {(loading) ? <Loader /> : <div className="row">
        {sales.map((o) => <Product key={o.id} {...o} />)}
      </div>}
    </section> : null
  );
}