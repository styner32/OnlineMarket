import web3manager from '../utils/web3manager';

export const WEB3_REQUEST = 'WEB3_REQUEST';
export const WEB3_SUCCESS = 'WEB3_SUCCESS';
export const WEB3_FAILURE = 'WEB3_FAILURE';

export function initWeb3() {
  return (dispatch) => {
    dispatch({ type: WEB3_REQUEST });
    return web3manager.onlineMarketInstance()
      .then((info) => {
        const { instance, account } = info;
        dispatch({ type: WEB3_SUCCESS, instance, account });
      })
      .catch((e) => {
        console.log('failed to initialize web3 instance', e);
        dispatch({ type: WEB3_FAILURE, msg: e });
      });
  };
}
