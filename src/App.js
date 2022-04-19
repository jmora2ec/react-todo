import React, { Component } from 'react';
import Task from './components/task';
import './App.css';

class App extends Component {
  state = {
    taskList: [
      { name: 'Task 1', completed: false },
      { name: 'Task 2', completed: true },
      { name: 'Task 3', completed: false },
    ],
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <ul>
            <li>
              <Task task={this.state.taskList[0]} />
            </li>
            <li>
              <Task task={this.state.taskList[1]} />
            </li>
            <li>
              <Task task={this.state.taskList[2]} />
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
