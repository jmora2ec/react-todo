import React, { Component } from 'react';
import _ from 'lodash';
import './Pagination.css';
import PropTypes from 'prop-types';

class Pagination extends Component {
  state = {};
  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
      <ul className='pagination'>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
