import React, { Component } from 'react';
import Task from './Task';
import Pagination from './Pagination';

class ListTask extends Component {
  state = {};
  render() {
    if (this.props.tasks.length === 0) return;

    const filteredTasks = [];
    this.props.tasks.forEach((element) => {
      if (element.deleted) return;
      filteredTasks.push(element);
    });

    const listTask = filteredTasks.map((task) => {
      if (task.deleted) return null;
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
    console.log(listTask);

    return (
      <React.Fragment>
        <ul className='task-list'>{listTask}</ul>
        <Pagination itemsCount={listTask.length} pageSize={4} />
      </React.Fragment>
    );
  }
}

export default ListTask;
