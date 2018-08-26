import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as storeActions from '../actions/storeActions';
import * as storeOwnerActions from '../actions/storeOwnerActions';

export default class Marketplace extends Component {
  constructor(props, context) {
    super(props, context);

    this.renderStore = this.renderStore.bind(this);
  }

  componentWillMount() {
    const { dispatch, instance, account } = this.props;
    dispatch(storeOwnerActions.fetchAll(instance, account));
  }

  componentWillReceiveProps(nextProps) {
    const {
      instance,
      storeOwners,
      stores,
      dispatch,
    } = this.props;

    if (nextProps.storeOwners.length !== storeOwners.length) {
      dispatch(storeActions.fetchStores(instance, nextProps.storeOwners));
    }

    if (nextProps.stores.length !== stores.length) {
      dispatch(storeActions.fetchStoreItems(instance, nextProps.stores));
    }
  }

  renderNoStoreOwners() {
    return (
      <div>
        <h3>
          Market Place
        </h3>

        <div>
          No Store Owners
        </div>
      </div>
    );
  }

  renderItem(store, item, index) {
    return (
      <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6>
            { item.name }
          </h6>
        </div>
        <span className="text-muted">
          $
          { item.price }
        </span>
      </li>
    );
  }

  renderStore(store, storeIndex) {
    const { storeItems } = this.props;
    const items = storeItems[store.id];

    if (!items) {
      return null;
    }

    return (
      <div key={storeIndex} className="col-md-4 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">
            { store.title }
          </span>
        </h4>
        <ul className="list-group mb-3">
          { _.map(items, (item, index) => this.renderItem(store, item, index)) }
        </ul>
      </div>
    );
  }

  render() {
    const { stores } = this.props;

    if (stores.length === 0) {
      return this.renderNoStoreOwners();
    }

    return (
      <div>
        <h3>
          Market Place
        </h3>
        { _.map(stores, this.renderStore) }
      </div>
    );
  }
}

Marketplace.propTypes = {
  dispatch: PropTypes.func.isRequired,
  instance: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
  storeOwners: PropTypes.array,
  stores: PropTypes.array,
  storeItems: PropTypes.object,
};

Marketplace.defaultProps = {
  storeOwners: [],
  stores: [],
  storeItems: {},
};
