import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Nav/Navbar';
import Logo from './components/Logo/Logo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Logo />
      </div>
    );
  }
}

export default App;
