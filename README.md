Online Market ( Consensys Final Project )
=============

Online Marketplace that operates on blockchain. an admin ( deployer )
can manage store owners and store owners can manage their store.
Shoppers can buy products by Ether.

### Requirement

* NodeJS >= 10.7.0
* Ganashe >= 1.2.1

### Setup Dev Env

```sh
# Install node packages
$ yarn install

# Compile and deloy the smart contract
$ truffle compile && truffle migrate --reset
```

### Start Dev server

```sh
$ yarn start
```

### Run test for smart contract

```sh
$ NODE_ENV=development truffle test
```

### To run application

1. Start dev server with `yarn start`
2. Go to localhost:3000 on browser.
3. Log in as the deployer using MetaMask. You will be able to add store owners.
4. Log in as a Store Owner using MetaMask. You will be able to add items.
5. Log in as a any users other than deployer and store owners using MetaMask. You will be able to see item and buy them.
