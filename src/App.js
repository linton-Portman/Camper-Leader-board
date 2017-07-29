import React, { Component } from 'react';
import Title from './Components/title-bar';
import Content from './Components/content';
import './Assets/css/default.css';





class App extends Component {

  render() {
    return (
      <div>
        <Title />
        <Content />
      </div>
    );
  }
}

export default App;
