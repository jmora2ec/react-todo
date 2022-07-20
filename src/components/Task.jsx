import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck as fasCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleCheck as farCheck } from '@fortawesome/free-regular-svg-icons/faCircleCheck';
import { faTrash as fasTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan as fasTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan as farTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan';

class Task extends Component {
  constructor(props) {
    super(props);

    this.onClickCompleted = this.onClickCompleted.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  render() {
    const iconDeleted = this.props.task.deleted ? fasTrash : farTrashCan;
    const iconCompleted = this.props.task.completed ? fasCheck : farCheck;

    return (
      <div className={this.getStateBadge()}>
        <div className='task__text'>{this.props.task.desc}</div>
        <button className='btn btn-completed' onClick={this.onClickCompleted}>
          <FontAwesomeIcon icon={iconCompleted} size={'lg'} />
        </button>
        <button className='btn btn-deleted' onClick={this.onClickDelete}>
          <FontAwesomeIcon icon={iconDeleted} size={'lg'} />
        </button>
      </div>
    );
  }

  onClickCompleted() {
    this.props.completeTask(this.props.task);
  }

  onClickDelete() {
    this.props.deleteTask(this.props.task);
  }

  getStateBadge() {
    let classes = 'task ';
    classes += this.props.task.completed ? 'task--completed' : '';
    return classes;
  }
}

export default Task;
