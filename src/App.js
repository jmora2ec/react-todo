import React, { Component } from 'react';
import Todo from './components/Todo';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='container'>
          <Todo />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
//
