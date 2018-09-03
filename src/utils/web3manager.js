import Web3 from 'web3';
import contract from 'truffle-contract';
import OnlineMarketContract from '../../build/contracts/OnlineMarket.json';

class Web3Manager {
  get() {
    if (typeof this.web3 === 'undefined') {
      return new Promise((resolve) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener('load', function () {
          let { web3 } = window;

          // Production Mode ( will be injected by Mist/MetaMast )
          if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            web3 = new Web3(web3.currentProvider);
            console.log('Injected web3 detected.');
          } else {
            // Development Mode
            const { host, port } = require('../../truffle.js').networks.development;
            console.log(host, port);
            const rpcUrl = `http://${host}:${port}`;
            const provider = new Web3.providers.HttpProvider(rpcUrl);
            web3 = new Web3(provider);
            console.log(`No web3 instance injected, using Local web3. connected to ${rpcUrl}`);
          }

          this.web3 = web3;
          resolve({ web3 });
        });
      });
    }

    return new Promise((resolve) => {
      resolve({ web3: this.web3 });
    });
  }

  onlineMarketInstance() {
    return new Promise((resolve) => {
      this.get().then((results) => {
        const { web3 } = results;
        const onlineMarket = contract(OnlineMarketContract);
        onlineMarket.setProvider(web3.currentProvider);

        web3.eth.getAccounts((error, accounts) => {
          if (error) {
            console.log(error);
          }

          const account = accounts[0];
          console.log(`account ${account} will be used`);

          onlineMarket.deployed().then((instance) => {
            resolve({
              instance,
              account,
            });
          });
        });
      });
    });
  }
}

const instance = new Web3Manager();

export default instance;
