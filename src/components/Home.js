import React, { Component } from 'react';

import Header from './Header';
import StoreOwners from './StoreOwners';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>
          Online Market
        </h1>
        <StoreOwners />
      </div>
    );
  }
}

export default Home;
