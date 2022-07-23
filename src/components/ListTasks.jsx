import React, { Component } from 'react';
import Task from './Task';
import Pagination from './Pagination';

class ListTask extends Component {
  state = {};
  render() {
    if (this.props.tasks.length === 0) return;

    const filteredTasks = this.props.tasks.filter((task) => {
      if (this.props.filter === 'all') {
        return task;
      }

      if (this.props.filter === 'active' && task.completed === false) {
        return task;
      }

      if (this.props.filter === 'deleted' && task.deleted === true) {
        return task;
      }
    });

    const listTask = filteredTasks.map((task) => {
      return (
        <li key={task.id.toString()}>
          <Task
            task={task}
            deleteTask={this.props.onDeleteTask}
            completeTask={this.props.onCompleteTask}
            handleChangeDesc={this.props.handleChangeDesc}
          />
        </li>
      );
    });

    return (
      <React.Fragment>
        <ul className='task-list'>{listTask}</ul>
        <Pagination itemsCount={listTask.length} pageSize={4} />
      </React.Fragment>
    );
  }
}

export default ListTask;
