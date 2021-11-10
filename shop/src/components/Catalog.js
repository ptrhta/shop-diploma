import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Categories } from './Categories'
import { Products } from './Products'
import { Loader } from './Loader'
import { ErrorAlert } from './ErrorAlert'
import {
  catalogInit,
  fetchProductsRequest,
  selectCategory
} from '../actions/actionCreators'

import ApiSearch from '../api/apiSearch'

export function Catalog (props) {
  const showSearch = props.showSearch
  const { products, categories, category, error, loading, more } = useSelector(
    state => state.catalog
  )
  const isShowSearch = ApiSearch(showSearch ? 'q' : null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(catalogInit(isShowSearch))
  }, [dispatch, isShowSearch])

  useEffect(() => {
    dispatch(fetchProductsRequest(false))
  }, [dispatch, isShowSearch])

  const handleReload = () => {
    dispatch(fetchProductsRequest(true))
  }

  const handleSelect = id => {
    dispatch(selectCategory(id))
  }

  return (
    <section className='catalog'>
      <h2 className='text-center'>Каталог</h2>
      {props.children}
      {error ? <ErrorAlert onRetry={handleReload} /> : null}
      {loading ? (
        <Loader />
      ) : (
        <>
          {loading || categories.length ? (
            <Categories
              selected={category}
              categories={categories}
              handleSelect={handleSelect}
            />
          ) : null}
          {products && <Products products={products} />}
          {loading ? <Loader /> : null}
          {error ? <ErrorAlert onRetry={handleReload} /> : null}
          {products.length < 6 || !more ? null : (
            <div className='text-center'>
              <button
                className='btn btn-outline-primary'
                disabled={!more}
                onClick={handleReload}
              >
                Загрузить ещё
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

Catalog.propTypes = {
  children: PropTypes.node
}
