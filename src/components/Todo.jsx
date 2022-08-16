import React, { Component } from 'react';
import './Todo.css';
import ListTask from './ListTasks';
import Pagination from './common/Pagination';
import { nanoid } from 'nanoid';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import InputTask from './InputTask';
import Header from './Header';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: this.getTasks(),
      pageSize: 5,
      currentPage: 1,
      selectedFilter: 'Active',
    };
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.getFilteredTasks = this.getFilteredTasks.bind(this);
    this.getFilters = this.getFilters.bind(this);
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
    this.setState({ selectedFilter: item.name, currentPage: 1 });
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

  getFilters(tasks) {
    const filters = [
      { name: 'All', count: 0 },
      { name: 'Active', count: 0 },
      { name: 'Completed', count: 0 },
      { name: 'Deleted', count: 0 },
    ];

    const completedTasks = tasks.filter((item) => {
      return item.completed === true && item.deleted === false;
    }).length;

    const deletedTasks = tasks.filter((item) => {
      return item.deleted === true;
    }).length;

    const activeTasks = tasks.filter((item) => {
      return item.completed === false && item.deleted === false;
    }).length;

    filters[0].count = tasks.length;
    filters[1].count = activeTasks;
    filters[2].count = completedTasks;
    filters[3].count = deletedTasks;

    return filters;
  }

  getContainerBackgroundColor(filter) {
    if (filter === 'Active') return 'bg-active';

    if (filter === 'Completed') return 'bg-completed';

    if (filter === 'Deleted') return 'bg-deleted';

    return 'bg-all';
  }

  render() {
    const {
      tasks: allTasks,
      pageSize,
      currentPage,
      selectedFilter,
    } = this.state;
    const tasksFiltered = this.getFilteredTasks(selectedFilter);
    const tasks = paginate(tasksFiltered, currentPage, pageSize);
    const filters = this.getFilters(allTasks);

    return (
      <div
        className={
          'container ' + this.getContainerBackgroundColor(selectedFilter)
        }
      >
        <div className='split'>
          <div className='selector'>
            <ListGroup
              selections={filters}
              onItemSelect={this.handleFilterSelect}
              selectedItem={selectedFilter}
            />
          </div>
          <div className='content'>
            <Header count={tasksFiltered.length} filter={selectedFilter} />
            <InputTask addTask={this.addTask} />
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
      </div>
    );
  }
}

export default Todo;
