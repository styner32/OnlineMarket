import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import _ from 'lodash';
import * as storeActions from '../actions/storeActions';

export default class EditStore extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.state = {
      newTitle: '',
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { instance } = this.props;
    const events = instance.allEvents();

    // watch for changes
    events.watch((error, result) => {
      if (!error) {
        console.log(result);
      }
    });
  }

  /*
  componentWillReceiveProps(nextProps) {
  }
  */

  onClickUpdate() {
    const { newTitle } = this.state;
    const { instance, account, dispatch } = this.props;

    dispatch(storeActions.updateStore(instance, account, newTitle));
  }

  onChangeTitle(e) {
    this.setState({ newTitle: e.target.value });
  }

  render() {
    const { newTitle } = this.state;
    const { title } = this.props;

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
        </ul>

        <div className="col-md-8 order-md-1">
          <div className="form">
            <h4 className="mb-3">
              Edit Store
            </h4>

            <div className="row">
              <label htmlFor="storeTitle">
                Store Name:
                <input
                  id="storeTitle"
                  type="text"
                  onChange={this.onChangeTitle}
                  value={newTitle}
                  className="form-control"
                />
              </label>
            </div>
            <hr className="mb-4" />
            <input
              type="submit"
              onClick={this.onClickUpdate}
              className="btn btn-lg btn-primary"
              value="Update"
            />
          </div>
        </div>
      </div>
    );
  }
}

EditStore.propTypes = {
  dispatch: PropTypes.func.isRequired,
  instance: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
  title: PropTypes.string,
};

EditStore.defaultProps = {
  title: '',
};
