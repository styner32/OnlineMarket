import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import * as adminActions from '../actions/adminActions';
import web3manager from '../utils/web3manager';

export default class StoreOwners extends Component {
  constructor(props, context) {
    super(props, context);

    this.onAdd = this.onAdd.bind(this);
    this.renderStoreOwner = this.renderStoreOwner.bind(this);
    this.onChangeNewStoreOwner = this.onChangeNewStoreOwner.bind(this);
    this.state = {
      newStoreOwner: '',
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;

    web3manager.onlineMarketInstance()
      .then((info) => {
        const newState = {
          instance: info.instance,
          account: info.account,
        };
        this.setState(newState);
      })
      .then(() => {
        const { instance, account } = this.state;
        dispatch(adminActions.fetchAll(instance, account));
      });
  }

  componentWillReceiveProps(nextProps) {
    const { newStoreOwner } = this.state;

    if (_.includes(nextProps.storeOwners, newStoreOwner)) {
      this.setState({ newStoreOwner: '' });
    }
  }

  onAdd() {
    const { instance, account, newStoreOwner } = this.state;
    const { dispatch } = this.props;

    dispatch(adminActions.create(instance, account, newStoreOwner));
  }

  onChangeNewStoreOwner(e) {
    this.setState({ newStoreOwner: e.target.value });
  }

  renderStoreOwner(storeOwner, index) {
    return (
      <li key={index}>
        <span>
          { storeOwner }
        </span>
      </li>
    );
  }

  render() {
    const { newStoreOwner } = this.state;
    const { storeOwners } = this.props;

    return (
      <div className="jumbotron">
        <h3>
          Store Owners
        </h3>
        <ul>
          { _.map(storeOwners, this.renderStoreOwner) }
        </ul>

        <div className="form">
          <input
            type="text"
            onChange={this.onChangeNewStoreOwner}
            value={newStoreOwner}
          />
          <input
            type="submit"
            onClick={this.onAdd}
            value="Add"
          />
        </div>
      </div>
    );
  }
}

StoreOwners.propTypes = {
  dispatch: PropTypes.func.isRequired,
  storeOwners: PropTypes.array,
};

StoreOwners.defaultProps = {
  storeOwners: [],
};
