export const UPDATE_STORE_REQUEST = 'UPDATE_STORE_REQUEST';
export const UPDATE_STORE_SUCCESS = 'UPDATE_STORE_SUCCESS';
export const UPDATE_STORE_FAILURE = 'UPDATE_STORE_FAILURE';

export function updateStore(api, account, title) {
  return (dispatch) => {
    dispatch({ type: UPDATE_STORE_REQUEST });
    return api.setStoreTitle(title, { from: account })
      .then(() => {
        dispatch({ type: UPDATE_STORE_SUCCESS, title });
      })
      .catch((e) => {
        console.log('failed to update title', e);
        dispatch({ type: UPDATE_STORE_FAILURE, msg: e });
      });
  };
}

export const FETCH_STORE_REQUEST = 'FETCH_STORE_REQUEST';
export const FETCH_STORE_SUCCESS = 'FETCH_STORE_SUCCESS';
export const FETCH_STORE_FAILURE = 'FETCH_STORE_FAILURE';

export function fetchStore(api, account) {
  return (dispatch) => {
    dispatch({ type: FETCH_STORE_REQUEST });
    return api.getStoreTitle({ from: account })
      .then((storeInfo) => {
        console.log('fetched store info', storeInfo[0], storeInfo[1].toNumber());
        dispatch({ type: FETCH_STORE_SUCCESS, title: storeInfo[0], itemCount: storeInfo[1].toNumber() });
      })
      .catch((e) => {
        console.log('failed to update title', e);
        dispatch({ type: FETCH_STORE_FAILURE, msg: e });
      });
  };
}

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export function addItem(api, account, name, price) {
  return (dispatch) => {
    dispatch({ type: ADD_ITEM_REQUEST });
    return api.addItem(name, price, { from: account })
      .then((item) => {
        dispatch({ type: ADD_ITEM_SUCCESS, item });
      })
      .catch((e) => {
        console.log('failed to add an item', e);
        dispatch({ type: ADD_ITEM_FAILURE, msg: e });
      });
  };
}

export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export function fetchItems(api, account, itemCount) {
  return (dispatch) => {
    dispatch({ type: FETCH_ITEMS_REQUEST });
    const promises = [];
    for (let i = 0; i < itemCount; i += 1) {
      promises.push(api.fetchItem(i, { from: account }));
    }

    Promise.all(promises)
      .then((items) => {
        console.log('fetched items', items);
        dispatch({ type: FETCH_ITEMS_SUCCESS, items });
      })
      .catch((e) => {
        console.log('failed to add an item', e);
        dispatch({ type: FETCH_ITEMS_FAILURE, msg: e });
      });
  };
}
