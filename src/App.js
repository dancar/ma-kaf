import React, { Component } from 'react';
import TerminalApp, { CLEAR, NEWLINE } from './components/TerminalApp'
import './App.css';

const LINKS = {
  Contact: {
    "Gmail"       : "mailto:dan@carmon.org.il"
  },

  Personal: {
    "Facebook"    : "http://www.facebook.com/dancarmon",
    "Twitter"     : "http://www.twitter.com/dancarmon7",
    "Google Plus" : "http://plus.google.com/+dancarmon",
    "Goodreads"   : "https://www.goodreads.com/user/show/59522774-dan-carmon",
    "Youtube"     : "https://www.youtube.com/channel/UC4xoAJpcaTJKvHPV-sAMOpQ/feed"
  },

  Professional: {
    "Github"      : "http://www.github.com/dancar",
    "Linkedin"    : "https://il.linkedin.com/pub/dan-carmon/96/609/825"
  },

  Photography: {
    "Flickr"      : "https://www.flickr.com/photos/95172579@N08/albums"
  }
}
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      app: this.generateApp()
    }
  }

  flatten (arr) {
    return arr.reduce((acc, cur ) => acc.concat(cur), [])
  }
  generateApp () {

    const links = this.flatten(
      this.flatten(
        Object.keys(LINKS)
          .map(group =>
               [NEWLINE, group + ": ", NEWLINE]
               .concat(Object.keys(LINKS[group])
                       .map(link => [
                         " - ",
                         {
                           text: link,
                           href: LINKS[group][link],
                           type: "link"
                         },
                         NEWLINE
                       ])
                      ))))

    return [
      1000,
      'Wake up, Neo...',
      3000,
      CLEAR,
      "The Matrix has you...",
      3000,
      CLEAR,
      [
        "Follow one of this links:", NEWLINE
      ].concat(links).concat([
        NEWLINE,
        "Good luck,", NEWLINE,
        " Dan Carmon", NEWLINE
      ])
    ]
  }
  render() {
    return (
      <div className="App">
        <TerminalApp app={this.state.app}/>
      </div>
    );
  }
}

export default App;
