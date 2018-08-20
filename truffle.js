require('babel-register');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      from: '0x8343e588e14fccb50e7d1b4d88853ed7b0937e33'
    }
  }
};
