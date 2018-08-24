import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import StoreOwners from '../components/StoreOwners';
import EditStore from '../components/EditStore';
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
        <Header />
        <h1>
          Online Market
        </h1>
        { role === 'Admin' ? (<StoreOwners {...this.props} />) : '' }
        { role === 'StoreOwner' ? (<EditStore {...this.props} />) : '' }
        { role === 'Shopper'
          ? (
            <div>
              Buy Items
            </div>
          ) : '' }
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
  };
}

export default connect(mapStateToProps)(HomePage);
