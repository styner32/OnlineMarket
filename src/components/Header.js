import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav>
        <Link to="/" className="active">
          Home
        </Link>
        {' | '}
        <Link to="/about" className="active">
          About
        </Link>
      </nav>
    );
  }
}

export default Header;
