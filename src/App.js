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
      box: {},
    }
  }

onInputChange = (e) => {
  this.setState({ input: e.target.value });
}

calculateFaceLocation = (data) => {
  const face = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage')
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: face.left_col * width,
    topRow: face.top_row * height,
    rightCol: width - (face.right_col * width),
    bottomRow: height - (face.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  console.log(box);
  this.setState({box: box})
}

onButtonSubmit = () => {
  this.setState({ imageUrl: this.state.input })
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch(err => console.log(err));
}

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navbar />
        <Logo />
        <Rank />
        <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
