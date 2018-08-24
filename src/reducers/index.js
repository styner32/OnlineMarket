import { combineReducers } from 'redux';
import stores from './storeReducer';
import storeOwners from './storeOwnerReducer';
import user from './userReducer';
import web3 from './web3Reducer';

const rootReducer = combineReducers({
  stores,
  storeOwners,
  user,
  web3,
});

export default rootReducer;
