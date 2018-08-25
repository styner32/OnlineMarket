import _ from 'lodash';

import {
  UPDATE_STORE_SUCCESS,
  FETCH_STORE_SUCCESS,
  //  ADD_ITEM_SUCCESS,
  FETCH_ITEMS_SUCCESS,
} from '../actions/storeActions';


const initialState = {
  title: '',
  itemCount: 0,
  items: [],
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STORE_SUCCESS:
      return Object.assign({}, state, { title: action.title });

    case FETCH_STORE_SUCCESS:
      return Object.assign({}, state, { title: action.title, itemCount: action.itemCount });

    // case ADD_ITEM_SUCCESS:

    case FETCH_ITEMS_SUCCESS: {
      const items = _.map(action.items, item => (
        { id: item[0], name: item[1], price: item[2].toNumber() }
      ));
      return Object.assign({}, state, { items });
    }

    default:
      return state;
  }
}
