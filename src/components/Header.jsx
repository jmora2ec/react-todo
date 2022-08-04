import React from 'react';

const Header = (props) => {
  return (
    <React.Fragment>
      <div className='tasks-counter'>
        <h2>There are {props.count} tasks in list.</h2>
      </div>
    </React.Fragment>
  );
};

export default Header;
