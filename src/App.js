import tracker from './tracker'
import React, { Component } from 'react';
import TerminalApp, { CLEAR, NEWLINE } from './components/TerminalApp'
import './App.css';


const LINKS = [
  ["Social", [
    ["Facebook"    , "http://www.facebook.com/dancarmon"],
    ["Twitter"     , "http://www.twitter.com/dancarmon7"],
    ["Google Plus" , "http://plus.google.com/+dancarmon"],
    ["Goodreads"   , "https://www.goodreads.com/user/show/59522774-dan-carmon"],
    ["Youtube"     , "https://www.youtube.com/channel/UC4xoAJpcaTJKvHPV-sAMOpQ/feed"]
  ]],

  ["Professional", [
    ["Github"      , "http://www.github.com/dancar"],
    ["Linkedin"    , "https://il.linkedin.com/pub/dan-carmon/96/609/825"],
  ]],

  ["Photos", [
    ["Flickr"      , "https://www.flickr.com/photos/95172579@N08/albums"],
  ]],

  ["Contact", [
    ["Email"       , "mailto:dan@carmon.org.il"]
  ]],

]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: "main",
      app: this.generateApp()
    }
    this.handleFinishTyping = this.handleFinishTyping.bind(this)
  }

  handleFinishTyping () {
    tracker.track("finished typing", {page: this.state.page})
  }

  componentDidMount () {
    tracker.track("app mount")
  }
  flatten (arr) {
    return arr.reduce((acc, cur ) => acc.concat(cur), [])
  }

  linkClicked (text, href) {
    const app = [[
      "You have been redirected to:",
      NEWLINE,
      NEWLINE,
      ' ➡ [ ',
      {
        type: "link",
        text,
        href
      },
      ' ]',
      NEWLINE,
      NEWLINE,
      {
        text: "Back",
        href: "javascript: void(0);",
        onClick: () => this.main(),
        type: "link"
      }
    ]]

    tracker.track("linked click", {
      text, href
    })

    this.setState({app, page: text})
  }

  main () {
    const app = [["Find me on:"].concat(this.makeLinks())]
    this.setState({app, page: "main2"})
  }

  makeLinks() {
    return this.flatten(
      this.flatten(
        LINKS.map(
          ([group, subgroup]) =>
            [NEWLINE, group + ": ", NEWLINE]
            .concat(subgroup.map(([text, href])=> [
              " - ",
              {
                text, href,
                onClick: () => this.linkClicked(text, href),
                type: "link"
              },
              NEWLINE
            ]))
        )
      )
    )
  }

  generateApp () {
    return [
      1000,
      'Wake up, Neo...',
      3000,
      "The Matrix has you...",
      3000,
      "Follow the white rabbit,",
      3000,
      [
        "Or follow ME with these links:", NEWLINE
      ].concat(this.makeLinks()).concat([
        NEWLINE,
        "Good luck,", NEWLINE,
        " Dan Carmon", NEWLINE
      ])
    ]
  }

  render() {
    return (
      <div className="App">
        <TerminalApp
          onFinishTyping={this.handleFinishTyping}
          app={this.state.app} />
      </div>
    );
  }
}

export default App;
