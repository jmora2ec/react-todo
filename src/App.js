import React, { Component } from 'react';
import Todo from './components/Todo';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className='title'>Todo List</h1>
        <Todo />
      </React.Fragment>
    );
  }
}

export default App;
//
