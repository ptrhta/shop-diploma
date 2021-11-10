import {
    CHANGE_SEARCH_FIELD
  } from '../actions/actionTypes';
  
  const initialState = {
    search: ''
  };
  
  export default function SearchReducer(state = initialState, action) {
    switch (action.type) {
      case CHANGE_SEARCH_FIELD:
        const { search } = action.payload;
        return { ...state, search };
      default:
        return state;
    }
  }