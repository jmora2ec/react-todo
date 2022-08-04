import React, { Component } from 'react';
import './Todo.css';
import ListTask from './ListTasks';
import Pagination from './common/Pagination';
import { nanoid } from 'nanoid';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import InputTask from './inputTask';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: this.getTasks(),
      pageSize: 4,
      currentPage: 1,
      selectedFilter: 'All',
    };
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.getFilteredTasks = this.getFilteredTasks.bind(this);
  }

  getTasks() {
    return [];
  }

  addTask(e) {
    if (e.type === 'keydown' && e.keyCode !== 13) {
      return;
    }

    const tasks = this.state.tasks;
    const taskInput = document.getElementById('new-task');
    if (!taskInput.value) {
      taskInput.value = 'New Task ' + (this.state.tasks.length + 1);
    }

    this.setState({ tasks: [this.newTask(taskInput.value), ...tasks] });
    taskInput.value = '';
    //console.log(JSON.parse(JSON.stringify(this.state.tasks)));
  }

  newTask(desc) {
    const task = {
      id: nanoid(10),
      desc: desc,
      completed: false,
      deleted: false,
    };
    return task;
  }

  deleteTask(taskDeleted) {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === taskDeleted.id) {
        return { ...task, deleted: !task.deleted };
      }
      return task;
    });

    this.setState({ tasks: newTasks });
  }

  completeTask(taskCompleted) {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === taskCompleted.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    this.setState({ tasks: newTasks });
  }

  handleChangeDesc(task, event) {
    const tasks = this.state.tasks.map((item) => {
      if (item.id === task.id) {
        item.desc = event.target.value;
        return item;
      }
      return item;
    });

    this.setState({ tasks });
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  handleFilterSelect(item) {
    this.setState({ selectedFilter: item, currentPage: 1 });
  }

  getFilteredTasks(filter) {
    if (!filter || filter === 'All') {
      return this.state.tasks;
    }

    if (filter === 'Deleted') {
      return this.state.tasks.filter((t) => t.deleted);
    }

    if (filter === 'Active') {
      return this.state.tasks.filter((t) => !t.deleted && !t.completed);
    }

    if (filter === 'Completed') {
      return this.state.tasks.filter((t) => t.completed && !t.deleted);
    }
  }

  render() {
    const filters = ['All', 'Active', 'Completed', 'Deleted'];
    const {
      tasks: allTasks,
      pageSize,
      currentPage,
      selectedFilter,
    } = this.state;
    const tasksFiltered = this.getFilteredTasks(selectedFilter);
    const tasks = paginate(tasksFiltered, currentPage, pageSize);

    return (
      <React.Fragment>
        <h1 className='title'>Todo for today!</h1>
               <div className='tasks-counter'>
          <h2>There are {tasksFiltered.length} tasks in list.</h2>
        </div>
        <InputTask addTask={this.addTask}/>

        <div className='split vertical'>
          <div className='selector'>
            <ListGroup
              selections={filters}
              onItemSelect={this.handleFilterSelect}
              selectedItem={selectedFilter}
            />
          </div>
          <div>
            <ListTask
              tasks={tasks}
              filter={selectedFilter}
              onDeleteTask={this.deleteTask}
              onCompleteTask={this.completeTask}
              handleChangeDesc={this.handleChangeDesc}
            />
            <Pagination
              itemsCount={tasksFiltered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default Todo;
