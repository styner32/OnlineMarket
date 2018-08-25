import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import * as storeActions from '../actions/storeActions';

export default class EditStore extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeNewItemName = this.onChangeNewItemName.bind(this);
    this.onChangeNewItemPrice = this.onChangeNewItemPrice.bind(this);
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      newTitle: '',
      newItemName: '',
      newItemPrice: '',
    };
  }

  componentWillMount() {
    const { instance, account, dispatch } = this.props;

    dispatch(storeActions.fetchStore(instance, account));
  }

  componentDidMount() {
    const { instance, account, dispatch } = this.props;
    const events = instance.allEvents();

    // watch for changes
    events.watch((error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      const { event } = result;
      if (event === 'ItemCreated') {
        const { storeOwner } = result.args;
        if (account.toLowerCase() === storeOwner.toLowerCase()) {
          this.setState({ newItemName: '', newItemPrice: '' });
          dispatch(storeActions.fetchStore(instance, account));
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { newTitle } = this.state;
    const {
      instance,
      account,
      dispatch,
      itemCount,
    } = this.props;

    if (nextProps.title === newTitle) {
      this.setState({ newTitle: '' });
    }

    console.log('item count', nextProps.itemCount, itemCount);
    if (nextProps.itemCount !== itemCount) {
      dispatch(storeActions.fetchItems(instance, account, nextProps.itemCount));
    }
  }

  onClickUpdate() {
    const { newTitle } = this.state;
    const { instance, account, dispatch } = this.props;

    dispatch(storeActions.updateStore(instance, account, newTitle));
  }

  onAddItem() {
    const { newItemName, newItemPrice } = this.state;
    const { instance, account, dispatch } = this.props;

    dispatch(storeActions.addItem(instance, account, newItemName, newItemPrice));
  }

  onChangeTitle(e) {
    this.setState({ newTitle: e.target.value });
  }

  onChangeNewItemName(e) {
    this.setState({ newItemName: e.target.value });
  }

  onChangeNewItemPrice(e) {
    this.setState({ newItemPrice: e.target.value });
  }

  renderItem(item, index) {
    const { name, price } = item;

    return (
      <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6>
            { name }
          </h6>
        </div>
        <span className="text-muted">
          { price }
        </span>
      </li>
    );
  }

  render() {
    const { newTitle, newItemName, newItemPrice } = this.state;
    const { title, items } = this.props;

    return (
      <div className="jumbotron">
        <h3>
          Store Detail
        </h3>

        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6>
                Store Name
              </h6>
            </div>
            <span className="text-muted">
              { title }
            </span>
          </li>
          {_.map(items, this.renderItem)}
        </ul>

        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">
            Edit Store
          </h4>

          <div className="form-inline">
            <div className="form-group mb-2">
              <label htmlFor="storeTitle">
                Store Name:
              </label>
              <input
                id="storeTitle"
                type="text"
                onChange={this.onChangeTitle}
                value={newTitle}
                className="form-control"
              />
            </div>
          </div>
          <input
            type="submit"
            onClick={this.onClickUpdate}
            className="btn btn-primary mb-2"
            value="Update"
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="item-name">
              Name
            </label>
            <input
              type="text"
              onChange={this.onChangeNewItemName}
              className="form-control"
              name="item-name"
              value={newItemName}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="item-price">
              Price
            </label>
            <input
              type="number"
              onChange={this.onChangeNewItemPrice}
              className="form-control"
              name="item-price"
              value={newItemPrice}
            />
          </div>
        </div>

        <input
          type="submit"
          onClick={this.onAddItem}
          className="btn btn-primary mb-2"
          value="Add Item"
        />
      </div>
    );
  }
}

EditStore.propTypes = {
  dispatch: PropTypes.func.isRequired,
  instance: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
  title: PropTypes.string,
  items: PropTypes.array,
  itemCount: PropTypes.number,
};

EditStore.defaultProps = {
  title: '',
  items: [],
  itemCount: 0,
};
