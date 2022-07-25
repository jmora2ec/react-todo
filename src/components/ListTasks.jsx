import React, { Component } from 'react';
import Task from './Task';

export default function ListTask(props) {
  const { tasks } = props;

  return (
    <React.Fragment>
      <ul className='task-list'>
        {tasks.map((task) => (
          <li key={task.id.toString()}>
            <Task
              task={task}
              deleteTask={props.onDeleteTask}
              completeTask={props.onCompleteTask}
              handleChangeDesc={props.handleChangeDesc}
            />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
