export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login(api, account) {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return api.getRole(account, { from: account })
      .then((role) => {
        dispatch({ type: LOGIN_SUCCESS, role });
      })
      .catch((e) => {
        console.log('failed to check a role', e);
        dispatch({ type: LOGIN_FAILURE, msg: e });
      });
  };
}
