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

  addTask() {
    const tasks = this.state.tasks;
    const task = document.getElementById('new-task');
    if (!task.value) {
      task.value = 'New Task';
    }

    tasks.push({ id: nanoid(10), name: task.value, completed: false });
    this.setState({ tasks: tasks });

    console.log('adding task...' + task.value);
  }

  removeTask(id) {
    console.log('removing task...' + id);
  }

  completeTask(id) {
    const tasks = this.state.tasks;
    const task = tasks.find((item) => item.id === id);
    if (!task) {
      console.log('task id not found.');
      return;
    }
    console.log('task completed:' + task.id);
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
          />
          <button className='btn btn-add' onClick={this.addTask}></button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
//
