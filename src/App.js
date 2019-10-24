import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Nav/Navbar';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

require('dotenv').config();

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY
 });

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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

onInputChange = (e) => {
  this.setState({ input: e.target.value });
}


onButtonSubmit = () => {
  this.setState({ imageUrl: this.state.input })
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      console.error(err);
    }
  );
}

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navbar />
        <Logo />
        <Rank />
        <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
