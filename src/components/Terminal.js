import React from 'react'
import Block from './Block'
import './terminal.css'

const TYPING_INTERVAL = 100
export default class Terminal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }
    this.writeText = this.writeText.bind(this)
  }

  writeText () {
    const { index } = this.state
    if (index === this.props.text.length) {
      if (this.props.onFinishTyping) {
        this.props.onFinishTyping()
      }
      return
    }

    this.setState({
      index: index + 1
    }, () => window.setTimeout(this.writeText, TYPING_INTERVAL))

  }

  componentDidMount () {

  }

  componentWillReceiveProps ({text}) {
    if (this.props.text !==  text) {
      this.setState({index: 0}, this.writeText)
    }
  }

  render () {
    const actualText = this.props.text.substring(0, this.state.index)
    return (
      <div className="terminal">
        {actualText}<Block/>
      </div>
    )
  }
}
