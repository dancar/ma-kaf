import React from 'react'
import Terminal from './Terminal'

export const CLEAR = Symbol('clear')
export const NEWLINE = { type: "newline" }
export default class TerminalApp extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      itemIndex: 0,
      currentContent: []
    }
    this.run = this.run.bind(this)
    this.handleFinishTyping = this.handleFinishTyping.bind(this)
  }

    static getDerivedStateFromProps (nextProps, prevState) {
      if (nextProps.app !== prevState.app) {
        return {
          app: nextProps.app,
          itemIndex: 0,
          currentContent: [""]
        }
      }
      return null
    }

  handleFinishTyping() {
    this.run()
  }

  run () {
    const { itemIndex }  = this.state
    if (itemIndex === this.props.app.length) {
      (this.props.onFinishTyping || (() => null))()
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
        onFinishTyping={this.handleFinishTyping}
        content={this.state.currentContent}
        />
    )
  }
}
