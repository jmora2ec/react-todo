import React, { Component } from 'react';
import './App.css';
import ListTask from './components/ListTasks';
import { nanoid } from 'nanoid';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
    this.addTask = this.addTask.bind(this);
  }

  addTask(e) {
    if (e.type === 'keydown' && e.keyCode !== 13) {
      return;
    }

    const tasks = this.state.tasks;
    const taskInput = document.getElementById('new-task');
    if (!taskInput.value) {
      taskInput.value = 'New Task';
    }

    tasks.push(this.newTask(taskInput.value));

    this.setState({ tasks: tasks });
    taskInput.value = '';
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

  removeTask(taskDeleted) {
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === taskDeleted.id) {
        return { ...task, deleted: true };
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

  render() {
    return (
      <React.Fragment>
        <h1 className='title'>Todo List</h1>
        <ListTask
          tasks={this.state.tasks}
          onDeleteTask={(taskId) => {
            this.removeTask(taskId);
          }}
          onCompleteTask={(taskId) => {
            this.completeTask(taskId);
          }}
        />
        <div className='controls'>
          <input
            type='text'
            name='task'
            id='new-task'
            placeholder='New task...'
            onKeyDown={this.addTask}
          />
          <button className='btn btn-add' onClick={this.addTask}></button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
//
