export const ADD_STORE_OWNER_REQUEST = 'ADD_STORE_OWNER_REQUEST';
export const ADD_STORE_OWNER_SUCCESS = 'ADD_STORE_OWNER_SUCCESS';
export const ADD_STORE_OWNER_FAILURE = 'ADD_STORE_OWNER_FAILURE';

export function create(api, account, storeOwner) {
  return (dispatch) => {
    dispatch({ type: ADD_STORE_OWNER_REQUEST });
    return api.addStoreOwner(storeOwner, { from: account })
      .then(() => {
        dispatch({ type: ADD_STORE_OWNER_SUCCESS, storeOwner });
      })
      .catch((e) => {
        console.log('failed to add a store owner', e);
        dispatch({ type: ADD_STORE_OWNER_FAILURE, msg: e });
      });
  };
}

export const FETCH_STORE_OWNERS_REQUEST = 'FETCH_STORE_OWNERS_REQUEST';
export const FETCH_STORE_OWNERS_SUCCESS = 'FETCH_STORE_OWNERS_SUCCESS';
export const FETCH_STORE_OWNERS_FAILURE = 'FETCH_STORE_OWNERS_FAILURE';

export function fetchAll(api, account) {
  return (dispatch) => {
    dispatch({ type: FETCH_STORE_OWNERS_REQUEST });
    return api.getStoreOwners.call({ from: account })
      .then((storeOwners) => {
        dispatch({ type: FETCH_STORE_OWNERS_SUCCESS, storeOwners });
      })
      .catch((e) => {
        console.log('failed to fetch store owners', e);
        dispatch({ type: FETCH_STORE_OWNERS_FAILURE, msg: e });
      });
  };
}
