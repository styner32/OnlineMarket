import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreOwners from '../components/StoreOwners';
import EditStore from '../components/EditStore';
import Marketplace from '../components/Marketplace';
import { login } from '../actions/userActions';
import { initWeb3 } from '../actions/web3Actions';

class HomePage extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(initWeb3());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.instance && nextProps.account) {
      dispatch(login(nextProps.instance, nextProps.account));
    }
  }

  render() {
    const { role } = this.props;

    return (
      <div className="jumbotron">
        <h1>
          Online Market
        </h1>
        { role === 'Admin' ? (<StoreOwners {...this.props} />) : '' }
        { role === 'StoreOwner' ? (<EditStore {...this.props} />) : '' }
        { role === 'Shopper' ? (<Marketplace {...this.props} />) : '' }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    storeOwners: state.storeOwners.storeOwners,
    role: state.user.role,
    instance: state.web3.instance,
    account: state.web3.account,
    title: state.stores.title,
    items: state.stores.items,
    itemCount: state.stores.itemCount,
    stores: state.stores.stores,
    storeItems: state.stores.storeItems,
  };
}

export default connect(mapStateToProps)(HomePage);
