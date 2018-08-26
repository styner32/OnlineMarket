import _ from 'lodash';

import {
  UPDATE_STORE_SUCCESS,
  FETCH_STORE_SUCCESS,
  FETCH_STORES_SUCCESS,
  FETCH_ITEMS_SUCCESS,
  FETCH_STORE_ITEMS_SUCCESS,
} from '../actions/storeActions';

const initialState = {
  title: '',
  itemCount: 0,
  items: [],
  storeOwners: [],
  storeItems: {},
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STORE_SUCCESS:
      return Object.assign({}, state, { title: action.title });

    case FETCH_STORE_SUCCESS:
      return Object.assign({}, state, { title: action.title, itemCount: action.itemCount });

    case FETCH_STORES_SUCCESS:
      return Object.assign({}, state, { stores: action.stores });

    case FETCH_ITEMS_SUCCESS: {
      const items = _.map(action.items, item => (
        { id: item[0], name: item[1], price: item[2].toNumber() }
      ));
      return Object.assign({}, state, { items });
    }

    case FETCH_STORE_ITEMS_SUCCESS:
      return Object.assign({}, state, { storeItems: action.storeItems });

    default:
      return state;
  }
}
