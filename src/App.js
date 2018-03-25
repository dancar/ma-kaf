import React, { Component } from 'react';
import TerminalApp, {CLEAR} from './components/TerminalApp'
import './App.css';

class App extends Component {
  render() {
    const ta = [
      "what", "hello", 1000, "bla",
      ["you can click ", {
        type: "link",
        href: "#bla",
        text: "here"
      }]
    ]

    const skip = [
    // const ta = [
      1000,
      'Wake up, Neo...',
      3000,
      CLEAR,
      "The Matrix has you...",
      3000,
      CLEAR,
      ["Follow one of this links:", "1. Dan Carmon on Twitter"]
    ]
    return (
      <div className="App">
        <TerminalApp app={ta}/>
      </div>
    );
  }
}

export default App;
