import React from 'react';
import './InputTask.css';

const InputTask = (props) => {
  return (
    <div className='controls'>
      <input
        type='text'
        name='task'
        id='new-task'
        placeholder='New task...'
        onKeyDown={props.addTask}
      />
      {/* <button className='btn btn-add' onClick={props.addTask}></button> */}
    </div>
  );
};

export default InputTask;
