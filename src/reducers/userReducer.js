import {
  LOGIN_SUCCESS,
} from '../actions/userActions';

const initialState = {
  role: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { role: action.role });

    default:
      return state;
  }
}
