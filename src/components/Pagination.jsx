import React, { Component } from 'react';

class Pagination extends Component {
  state = {};
  render() {
    if (this.props.countItems > this.props.pageSize) {
      return (
        <ul className='pagination'>
          <li className='page-item'>
            <a className='page-link' href='#'>
              1
            </a>
          </li>
        </ul>
      );
    }
    return null;
  }
}

export default Pagination;
