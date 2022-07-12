import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

class Task extends Component {
  state = { task: this.props.task };
  render() {
    return (
      <div className={this.getStateBadge()}>
        <div className='task__text'>{this.props.task.name}</div>
        <button
          className='btn-completed'
          onClick={() => this.onClickCompleted()}
        >
          <FontAwesomeIcon icon={faCircleCheck} size={'lg'} />
        </button>
        <button className='btn-deleted' onClick={() => this.onClickDelete()}>
          <FontAwesomeIcon icon={faTrashCan} size={'lg'} />
        </button>
      </div>
    );
  }

  onClickCompleted() {
    const task = this.state.task;
    task.completed = !this.state.task.completed;
    this.setState({ task: task });
  }

  onClickDelete() {
    console.log('mark deleted');
  }

  getStateBadge() {
    let classes = 'task ';
    classes += this.props.task.completed ? 'task--completed' : '';
    return classes;
  }
}

export default Task;
