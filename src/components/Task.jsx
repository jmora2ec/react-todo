import React, { Component } from 'react';
import './Task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

class Task extends Component {
  constructor(props) {
    super(props);

    this.handleComplete = this.handleComplete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.state = {
      disabled: true,
      iconEdit: regular('pen-to-square'),
    };
  }

  handleComplete() {
    this.props.completeTask(this.props.task);
  }

  handleDelete() {
    this.props.deleteTask(this.props.task);
  }

  handleEdit() {
    if (this.props.task.completed || this.props.task.deleted) {
      return;
    }
    this.setState((state) => {
      return { disabled: !state.disabled };
    });
    this.setState({
      iconEdit: this.state.disabled
        ? solid('pen-to-square')
        : regular('pen-to-square'),
    });
  }

  getStateBadge() {
    let classes = 'task ';
    classes += this.props.task.completed ? 'task--completed ' : '';
    classes += this.props.task.deleted ? 'task--deleted' : '';
    return classes;
  }

  handleChange(event) {
    this.props.handleChangeDesc(this.props.task, event);
  }

  onKeyDownHandler(event) {
    if (event.keyCode === 13) {
      this.handleEdit();
    }
  }

  render() {
    const iconDeleted = this.props.task.deleted
      ? solid('trash-can')
      : regular('trash-can');
    const iconCompleted = this.props.task.completed
      ? regular('square-check')
      : regular('square');

    return (
      <li className={this.getStateBadge()}>
        <button className='btn btn-completed' onClick={this.handleComplete}>
          <FontAwesomeIcon icon={iconCompleted} size={'lg'} />
        </button>
        <input
          type='text'
          className='task__desc'
          disabled={this.state.disabled}
          value={this.props.task.desc}
          onChange={this.handleChange}
          onKeyDown={this.onKeyDownHandler}
        />

        <button className='btn btn-edit' onClick={this.handleEdit}>
          <FontAwesomeIcon icon={this.state.iconEdit} size={'lg'} />
        </button>
        <button className='btn btn-deleted' onClick={this.handleDelete}>
          <FontAwesomeIcon icon={iconDeleted} size={'lg'} />
        </button>
      </li>
    );
  }
}

export default Task;
