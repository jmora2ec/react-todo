import React from 'react';
import './ListGroup.css';

const ListGroup = (props) => {
  const { selections: items, onItemSelect, selectedItem } = props;
  return (
    <ul className='list-group vertical'>
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => onItemSelect(item)}
          className={
            item.filter === selectedItem
              ? 'list-group-item active'
              : 'list-group-item'
          }
        >
          {item.filter} <span class='count'>({item.count})</span>
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
