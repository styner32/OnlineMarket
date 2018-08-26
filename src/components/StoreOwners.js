import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import * as storeOwnerActions from '../actions/storeOwnerActions';

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
    const { dispatch, instance, account } = this.props;
    dispatch(storeOwnerActions.fetchAll(instance, account));
  }

  componentWillReceiveProps(nextProps) {
    const { newStoreOwner } = this.state;

    if (_.includes(nextProps.storeOwners, newStoreOwner)) {
      this.setState({ newStoreOwner: '' });
    }
  }

  onAdd() {
    const { newStoreOwner } = this.state;
    const { instance, account, dispatch } = this.props;

    dispatch(storeOwnerActions.create(instance, account, newStoreOwner));
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
  instance: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
};

StoreOwners.defaultProps = {
  storeOwners: [],
};
