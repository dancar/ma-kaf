import React from 'react'
import Terminal from './Terminal'

export const CLEAR = Symbol('clear')
export default class TerminalApp extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      itemIndex: 0,
      currentContent: [""]
    }
    this.run = this.run.bind(this)
  }

  componentDidMount () {
    this.run()
  }

  run () {
    const { itemIndex }  = this.state
    if (itemIndex === this.props.app.length) {
      return
    }
    let item = this.props.app[itemIndex]

    if (typeof item === "string" ) {
      item = [item]
    }

    else if (item === CLEAR) {
      item = [""]
    }

    if (typeof item === "number") {
      window.setTimeout( () => {
        this.setState({
          itemIndex: itemIndex + 1
        }, this.run)
      }, item)
    }

    else {
      this.setState({
        itemIndex: itemIndex + 1,
        currentContent : item
      })
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
