import {
  UPDATE_STORE_SUCCESS,
} from '../actions/storeActions';

const initialState = {
  title: '',
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STORE_SUCCESS:
      return Object.assign({}, state, { title: action.title });

    default:
      return state;
  }
}
