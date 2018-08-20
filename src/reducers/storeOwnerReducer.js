import {
  ADD_STORE_OWNER_SUCCESS,
  FETCH_STORE_OWNERS_SUCCESS,
} from '../actions/adminActions';

const initialState = {
  storeOwners: [],
  role: '',
};

export default function storeOwnerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STORE_OWNER_SUCCESS:
      return Object.assign({}, state, {
        storeOwners: state.storeOwners.concat(action.storeOwner),
      });

    case FETCH_STORE_OWNERS_SUCCESS:
      return Object.assign({}, state, { storeOwners: action.storeOwners });

    default:
      return state;
  }
}
