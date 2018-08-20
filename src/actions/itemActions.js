export const ITEM_CREATE_REQUEST = 'ITEM_CREATE_REQUEST';
export const ITEM_CREATE_SUCCESS = 'ITEM_CREATE_SUCCESS';
export const ITEM_CREATE_FAILURE = 'ITEM_CREATE_FAILURE';

export function create(api, account, item) {
  return (dispatch) => {
    dispatch({ type: ITEM_CREATE_REQUEST });
    return api.postQuestion(item, {from: account})
      .then((postedItem) => {
        console.log('done', postedItem);
        dispatch({ type: ITEM_CREATE_SUCCESS, item: postedItem });
      })
      .catch((e) => {
        console.log('failed', e);
        dispatch({ type: ITEM_CREATE_FAILURE, msg: e });
      });
  };
}
