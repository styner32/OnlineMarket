import {
  WEB3_SUCCESS,
} from '../actions/web3Actions';

const initialState = {
  instance: null,
  account: '',
};

export default function web3Reducer(state = initialState, action) {
  switch (action.type) {
    case WEB3_SUCCESS:
      return Object.assign({}, state, {
        instance: action.instance,
        account: action.account,
      });

    default:
      return state;
  }
}
