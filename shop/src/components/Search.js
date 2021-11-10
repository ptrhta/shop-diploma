import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchField, getUrl } from '../actions/actionCreators';
import { push } from 'connected-react-router';
import { useHistory } from 'react-router';

export function Search() {
  const { search } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (event) => {
    dispatch(changeSearchField(event.target.value));
  };
  const onSearch = (event) => {
    event.preventDefault();
    const url = getUrl('/catalog', search);
    history.push(url)

    dispatch(push(url));
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={(event) => onSearch(event)}>
      <input
        className="form-control"
        onChange={onChange}
        placeholder="Поиск"
        value={search}
      />
    </form>
  );
}