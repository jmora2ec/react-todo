import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { task: this.props.task };
    this.onClickCompleted = this.onClickCompleted.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  render() {
    return (
      <div className={this.getStateBadge()}>
        <div className='task__text'>{this.props.task.name}</div>
        <button className='btn btn-completed' onClick={this.onClickCompleted}>
          <FontAwesomeIcon icon={faCircleCheck} size={'lg'} />
        </button>
        <button className='btn btn-deleted' onClick={this.onClickDelete}>
          <FontAwesomeIcon icon={faTrashCan} size={'lg'} />
        </button>
      </div>
    );
  }

  onClickCompleted() {
    this.props.completeTask(this.props.task.id);
  }

  onClickDelete() {
    this.props.deleteTask(this.props.task.id);
  }

  getStateBadge() {
    let classes = 'task ';
    classes += this.props.task.completed ? 'task--completed' : '';
    return classes;
  }
}

export default Task;
