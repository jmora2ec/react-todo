import React, { Component } from 'react';
import Task from './Task';

export default function ListTask(props) {
  const { tasks } = props;

  return (
    <React.Fragment>
      <ul className='task-list'>
        {tasks.map((task) => (
          <Task
            key={task.id.toString()}
            task={task}
            deleteTask={props.onDeleteTask}
            completeTask={props.onCompleteTask}
            handleChangeDesc={props.handleChangeDesc}
          />
        ))}
      </ul>
    </React.Fragment>
  );
}
