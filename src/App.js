import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Nav/Navbar';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';


const particleOptions = {
  particles: {
    "number": {
      "value": 120,
      "density": {
        "enable": true,
        "value_area": 800
      }
    }
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navbar />
        <Logo />
        <Rank />
        <ImageLink />
      </div>
    );
  }
}

export default App;
