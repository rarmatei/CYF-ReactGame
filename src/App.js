import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/button';

class App extends Component {

  constructor() {
    super();
    this.state = {
      difficulty: 5,
      gameStarted: false,
      selectedButton: -1,
      startTime: 0,
      endTime: 0
    };
  }

  startGame = () => {
    this.resetGame();
    this.setState({
      gameStarted: true
    });
    const time = this.getRandomInt(2000, 8000);
    setTimeout(this.selectRandomButton, time);
  };

  difficultyChange = (e) => {
    this.setState({
      difficulty: e.target.value
    });
  };

  generateButtons = () => {
    let buttons = [];
    for(var i=0; i<this.state.difficulty; i++) {
      let selected = false;
      if(i === this.state.selectedButton) {
        selected = true;
      }
      buttons.push(<Button onClick={this.gameButtonClick} selected={selected}/>)
    }
    return buttons;
  };

  gameButtonClick = (e) => {
    console.log(e.target.className.includes('selected'));
    if(this.state.gameStarted) {
      this.setState({
        gameStarted: false,
        endTime: window.performance.now()
      });
    }
  };

  selectRandomButton = () => {
    const random = this.getRandomInt(0, this.state.difficulty);
    this.setState({
      selectedButton: random,
      startTime: window.performance.now()
    });
  }

  resetGame = () => {
    this.setState({
      endTime: 0,
      startGame: 0,
      gameStarted: false,
      selectedButton: -1
    })
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Select difficulty:
          <input value={this.state.difficulty} type="number" onChange={this.difficultyChange}/>
          <br/>
          {this.generateButtons()}
          <br/>
          <button className="startGameBtn" onClick={this.startGame}>Start game</button>
          <br/>
          Your score:
          {
            this.state.endTime > 0
              ? this.state.endTime - this.state.startTime
              : "Not started yet.."
          }
        </p>
      </div>
    );
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default App;
