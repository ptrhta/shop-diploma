import React from 'react';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Loader } from './Loader';
import { ErrorAlert } from './ErrorAlert';
import {
  removeFromCart,
  cartSendInit,
  cartSendRequest
} from '../actions/actionCreators';

export function Cart(props) {
  const [owner, setOwner] = useState(null);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    success,
    items
  } = useSelector((state) => state.cart);
  const initialForm = {
    phone: '',
    address: '',
    agreement: false,
  };

  console.log(loading,
    error,
    success,
    items)

  const [cartForm, setCartForm] = useState(initialForm);

  useEffect(() => {
    dispatch(cartSendInit());
  }, [dispatch]);

  useEffect(() => {
    if (owner) dispatch(cartSendRequest(owner));
  }, [dispatch, owner]);

  const handleSendCart = (newOwner = null) => {
    setOwner((prev) => ( newOwner || { ...prev } ));
  };

  const handleInput = event => {
    const name = event.target.id;
    const value = (event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    setCartForm((prev) => ({ ...prev, [name]: value }));
  };

  const onRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { phone, address } = cartForm;
    handleSendCart({ phone, address });
    setCartForm(cartForm);
  };

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((o) => <tr key={o.id}>
              <th scope="row">1</th>
              <td><Link to={`/catalog/${o.id}`}>{o.title}</Link></td>
              <td>{o.size}</td>
              <td>{o.count}</td>
              <td>{o.price} руб.</td>
              <td>
                {Number(o.count) * Number(o.price)} руб.
              </td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onRemove(o.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>)}
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              {(props.cartItems.length) ? <td>
                {props.cartItems.map((o) => Number(o.count) * Number(o.price))
                  .reduce((total, o) => total + o)} руб
              </td> : null}
            </tr>
          </tbody>
        </table>
      </section>
      {(success) ? <div className="alert alert-success">
        <p>Ваш заказ успешно оформлен!</p>
      </div> : <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        {(loading) ? <Loader /> :
        <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
          {(error) ? <ErrorAlert onRetry={() => handleSendCart()} /> : null }
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                name="phone"
                id="phone"
                placeholder="Ваш телефон"
                value={cartForm.phone}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                name="address"
                id="address"
                placeholder="Адрес доставки"
                value={cartForm.address}
                onChange={handleInput}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                onChange={handleInput}
                checked={cartForm.agreement}
              />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              disabled={!cartForm.agreement}
            >
              Оформить
            </button>
          </form>
        </div>}
      </section>}
    </>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.items
});
export const ConnectedCart = connect(mapStateToProps, {})(Cart);
Cart.propTypes = {
  cartItems: PropTypes.array
};