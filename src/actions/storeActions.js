export const UPDATE_STORE_REQUEST = 'UPDATE_STORE_REQUEST';
export const UPDATE_STORE_SUCCESS = 'UPDATE_STORE_SUCCESS';
export const UPDATE_STORE_FAILURE = 'UPDATE_STORE_FAILURE';

export function updateStore(api, account, title) {
  return (dispatch) => {
    dispatch({ type: UPDATE_STORE_REQUEST });
    return api.setStoreTitle(account, title, { from: account })
      .then(() => {
        dispatch({ type: UPDATE_STORE_SUCCESS, title });
      })
      .catch((e) => {
        console.log('failed to update title', e);
        dispatch({ type: UPDATE_STORE_FAILURE, msg: e });
      });
  };
}
