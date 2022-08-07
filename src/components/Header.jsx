import React from 'react';

const Header = (props) => {
  return (
    <React.Fragment>
      <div className='tasks-counter'>
        <h2>
          {props.count} {props.filter === 'All' ? '' : props.filter} tasks in
          list.
        </h2>
      </div>
    </React.Fragment>
  );
};

export default Header;
