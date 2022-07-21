import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck as fasCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleCheck as farCheck } from '@fortawesome/free-regular-svg-icons/faCircleCheck';
import { faTrash as fasTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan as fasTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan as farTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan';
import { faPenToSquare as farPen } from '@fortawesome/free-regular-svg-icons/faPenToSquare';
import { faPenToSquare as fasPen } from '@fortawesome/free-solid-svg-icons/faPenToSquare';

class Task extends Component {
  constructor(props) {
    super(props);

    this.onClickCompleted = this.onClickCompleted.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      disabled: true,
      iconEdit: farPen,
      taskDescription: this.props.task.desc,
    };
  }

  render() {
    const iconDeleted = this.props.task.deleted ? fasTrashCan : farTrashCan;
    const iconCompleted = this.props.task.completed ? fasCheck : farCheck;

    return (
      <div className='task'>
        <button className='btn btn-completed' onClick={this.onClickCompleted}>
          <FontAwesomeIcon icon={iconCompleted} size={'lg'} />
        </button>
        <input
          type='text'
          className={this.getStateBadge()}
          disabled={this.state.disabled}
          value={this.state.taskDescription}
          onChange={this.handleChange}
          onKeyDown={this.handleUpdate}
        />

        <button className='btn btn-edit' onClick={this.onClickEdit}>
          <FontAwesomeIcon icon={this.state.iconEdit} size={'lg'} />
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

  onClickEdit() {
    if (this.props.task.completed) {
      return;
    }
    this.setState((state) => {
      return { disabled: !state.disabled };
    });
    this.state.iconEdit = this.state.disabled ? fasPen : farPen;
  }

  getStateBadge() {
    let classes = 'task__desc ';
    classes += this.props.task.completed ? 'task--completed' : '';
    return classes;
  }

  handleChange(e) {
    this.setState({ taskDescription: e.target.value });
  }

  handleUpdate(event) {
    if (event.keyCode === 13) {
      this.onClickEdit();
      this.props.updateTask(this.props.task, event.target.value);
    }
  }
}

export default Task;
