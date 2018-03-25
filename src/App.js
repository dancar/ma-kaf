import React, { Component } from 'react';
import TerminalApp, {CLEAR} from './components/TerminalApp'
import './App.css';

class App extends Component {
  render() {
    const ta = [
      1000,
      'Wake up, Neo...',
      3000,
      CLEAR,
      "The Matrix has you...",
      3000,
      CLEAR,
      "Follow one of this links:\n\n\t1. Dan Carmon on Twitter"
    ]
    return (
      <div className="App">
        <TerminalApp app={ta}/>
      </div>
    );
  }
}

export default App;
