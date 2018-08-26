import _ from 'lodash';

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
    return api.getStore(account)
      .then((storeInfo) => {
        dispatch({
          type: FETCH_STORE_SUCCESS,
          id: storeInfo[0],
          title: storeInfo[1],
          itemCount: storeInfo[2].toNumber(),
        });
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
    return api.addItem(name, web3.utils.toWei(price, 'ether'), { from: account })
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
      promises.push(api.fetchItem(account, i, { from: account }));
    }

    return Promise.all(promises)
      .then((items) => {
        dispatch({ type: FETCH_ITEMS_SUCCESS, items });
      })
      .catch((e) => {
        console.log('failed to add an item', e);
        dispatch({ type: FETCH_ITEMS_FAILURE, msg: e });
      });
  };
}

export const FETCH_STORES_REQUEST = 'FETCH_STORES_REQUEST';
export const FETCH_STORES_SUCCESS = 'FETCH_STORES_SUCCESS';
export const FETCH_STORES_FAILURE = 'FETCH_STORES_FAILURE';

export function fetchStores(api, storeOwners) {
  return (dispatch) => {
    dispatch({ type: FETCH_STORES_REQUEST });
    const promises = [];

    for (let i = 0; i < storeOwners.length; i += 1) {
      promises.push(api.getStore(storeOwners[i]));
    }

    return Promise.all(promises)
      .then((stores) => {
        const storeInfos = _.map(stores, store => (
          { id: store[0], title: store[1], itemCount: store[2].toNumber() }
        ));

        dispatch({ type: FETCH_STORES_SUCCESS, stores: storeInfos });
      })
      .catch((e) => {
        console.log('failed to update title', e);
        dispatch({ type: FETCH_STORES_FAILURE, msg: e });
      });
  };
}

export const FETCH_STORE_ITEMS_REQUEST = 'FETCH_STORE_ITEMS_REQUEST';
export const FETCH_STORE_ITEMS_SUCCESS = 'FETCH_STORE_ITEMS_SUCCESS';
export const FETCH_STORE_ITEMS_FAILURE = 'FETCH_STORE_ITEMS_FAILURE';

export function fetchStoreItems(api, account, stores) {
  return (dispatch) => {
    dispatch({ type: FETCH_STORE_ITEMS_REQUEST });
    const storeItems = {};
    const promises = [];

    for (let i = 0; i < stores.length; i += 1) {
      const promisesForItems = [];
      for (let j = 0; j < stores[i].itemCount; j += 1) {
        promisesForItems.push(api.fetchItem(stores[i].id, j, { from: account }));
      }

      const promise = Promise.all(promisesForItems)
        .then((items) => {
          for (let j = 0; j < items.length; j += 1) {
            console.log('item', items[j]);
            const storeItem = {
              id: items[j][0].toNumber(),
              name: items[j][1],
              price: items[j][2],
              state: items[j][3],
            };
            storeItems[stores[i].id] = (storeItems[stores[i].id] || []).concat([storeItem]);
          }
        });

      promises.push(promise);
    }

    return Promise.all(promises)
      .then(() => {
        dispatch({ type: FETCH_STORE_ITEMS_SUCCESS, storeItems });
      })
      .catch((e) => {
        console.log('failed to fetch store items', e);
        dispatch({ type: FETCH_STORE_ITEMS_FAILURE, msg: e });
      });
  };
}

export const BUY_ITEM_REQUEST = 'BUY_ITEM_REQUEST';
export const BUY_ITEM_SUCCESS = 'BUY_ITEM_SUCCESS';
export const BUY_ITEM_FAILURE = 'BUY_ITEM_FAILURE';

export function buyItem(api, account, store, item) {
  return (dispatch) => {
    dispatch({ type: BUY_ITEM_REQUEST });
    return api.buyItem(store.id, item.id, { from: account, value: item.price })
      .then(() => {
        dispatch({ type: BUY_ITEM_SUCCESS });
      })
      .catch((e) => {
        console.log('failed to buy an item', e);
        dispatch({ type: BUY_ITEM_FAILURE, msg: e });
      });
  };
}
