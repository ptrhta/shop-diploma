import React, { useState } from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { changeSearchField, getUrl } from '../actions/actionCreators'
import logo from '../assets/header-logo.png'

export function Menu () {
  const { search } = useSelector(state => state.search)
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const history = useHistory()
  const links = [
    { name: 'Главная', link: '/' },
    { name: 'Каталог', link: '/catalog' },
    { name: 'О магазине', link: '/about' },
    { name: 'Контакты', link: '/contacts' }
  ]

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const onSearch = event => {
    event.preventDefault()
    if (!isSearchOpen) {
      setIsSearchOpen(true)
    }

    if (search !== '') {
      const url = getUrl('/catalog', search)
      history.push(url)

      dispatch(push(url))
    }
  }

  const onChange = event => {
    dispatch(changeSearchField(event.target.value))
  }

  return (
    <header className='container'>
      <div className='row'>
        <div className='col'>
          <nav className='navbar navbar-expand-sm navbar-light bg-light'>
            <Link to='/' exact className='navbar-brand'>
              <img src={logo} alt='Bosa Noga' />
            </Link>
            <div className='collapse navbar-collapse' id='navbarMain'>
              <ul className='navbar-nav mr-auto'>
                {links.map(o => (
                  <li key={o.name} className='nav-item'>
                    <NavLink
                      to={o.link}
                      exact
                      className='nav-link'
                      activeClassName='active'
                    >
                      {o.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div>
                <div className='header-controls-pics'>
                  <div
                    onClick={onSearch}
                    className='header-controls-pic header-controls-search'
                  />
                  <Link to='/cart'>
                    <div className='header-controls-pic header-controls-cart'>
                      {items.length ? (
                        <div className='header-controls-cart-full'>
                          {items.length}
                        </div>
                      ) : null}
                      <div className='header-controls-cart-menu' />
                    </div>
                  </Link>
                </div>
                {isSearchOpen ? (
                  <form
                    className='header-controls-search-form form-inline'
                    onSubmit={onSearch}
                  >
                    <input
                      onChange={onChange}
                      value={search}
                      className='form-control'
                      placeholder='Поиск'
                    />
                  </form>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
