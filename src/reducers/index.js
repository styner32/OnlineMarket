import { combineReducers } from 'redux';
import votes from './voteReducer';
import items from './itemReducer';
import storeOwners from './storeOwnerReducer';
import user from './userReducer';
import web3 from './web3Reducer';

const rootReducer = combineReducers({
  votes,
  items,
  storeOwners,
  user,
  web3,
});

export default rootReducer;
