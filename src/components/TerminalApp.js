import React from 'react'
import Terminal from './Terminal'

export const CLEAR = Symbol('clear')
export default class TerminalApp extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      itemIndex: 0,
      currentContent: ""
    }
    this.run = this.run.bind(this)
  }

  componentDidMount () {
    this.run()
  }

  run () {
    const {itemIndex}  = this.state
    const item = this.props.app[itemIndex]

    if (typeof item === "string" || item instanceof Array) {
      this.setState({
        itemIndex: itemIndex + 1,
        currentContent : item
      })
    }

    else if (item === CLEAR) {
      this.setState({
        itemIndex: itemIndex + 1,
        currentContent: ""
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
        content={this.state.currentContent}
        />
    )
  }
}
