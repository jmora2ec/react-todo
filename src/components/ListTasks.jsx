import React, { Component } from 'react';
import Task from './Task';

class ListTask extends Component {
  state = {};
  render() {
    const listTask = this.props.tasks.map((task) => (
      <li key={task.id.toString()}>
        <Task
          task={task}
          deleteTask={this.props.onDeleteTask}
          completeTask={this.props.onCompleteTask}
        />
      </li>
    ));
    return <ul className='task-list'>{listTask}</ul>;
  }
}

export default ListTask;
