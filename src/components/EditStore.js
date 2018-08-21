import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import _ from 'lodash';
// import * as storeActions from '../actions/storeActions';

export default class EditStore extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.state = {
      newTitle: '',
    };
  }

  componentWillMount() {
  }

  /*
  componentWillReceiveProps(nextProps) {
  }
  */

  onAddItem() {
    console.log('add an item');
  }

  onChangeTitle(e) {
    this.setState({ newTitle: e.target.value });
  }

  render() {
    const { newTitle } = this.state;

    return (
      <div className="jumbotron">
        <h3>
          Edit Store
        </h3>

        <div className="form">
          <input
            type="text"
            onChange={this.onChangeTitle}
            value={newTitle}
          />
          <input
            type="submit"
            onClick={this.onAddItem}
            value="Update"
          />
        </div>
      </div>
    );
  }
}

EditStore.propTypes = {
  //  dispatch: PropTypes.func.isRequired,
  // instance: PropTypes.object.isRequired,
  // account: PropTypes.string.isRequired,
};

EditStore.defaultProps = {
};
