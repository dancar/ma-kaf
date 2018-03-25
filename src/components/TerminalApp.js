import React from 'react'
import Terminal from './Terminal'

export const CLEAR = Symbol('clear')
export default class TerminalApp extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      itemIndex: 0,
      terminalText: ""
    }
    this.run = this.run.bind(this)
  }

  componentDidMount () {
    this.run()
  }

  run () {
    const {itemIndex}  = this.state
    console.log('<-DANDEBUG-> TerminalApp.js\\ 22: this.props.app:', this.props.app);
    const item = this.props.app[itemIndex]
    console.log('<-DANDEBUG-> TerminalApp.js\\ 20: item:', item);

    if (typeof item === "string") {
      this.setState({
        itemIndex: itemIndex +1,
        terminalText: item
      })
    }

    else if (item === CLEAR) {
      this.setState({
        itemIndex: itemIndex + 1,
        terminalText: ""
      })
    }
    else if (typeof item === "number") {
      window.setTimeout( () => {
        this.setState({
          itemIndex: itemIndex + 1
        }, this.run)
      }, item)
    }

  }

  render () {
    return (
      <Terminal
        onFinishTyping={this.run}
        text={this.state.terminalText}
        />
    )
  }
}
