import React from 'react'
import Block from './Block'
import './terminal.css'

// const TYPING_INTERVAL = 10
// const TYPING_INTERVAL = 30
const TYPING_INTERVAL = 70
// const TYPING_INTERVAL = 100
export default class Terminal extends React.Component {
  constructor (props) {
    super(props)
    this.nextFrame = this.nextFrame.bind(this)
    this.state = {
      index: 0,
      frames: []
    }
  }

  componentDidMount () {
    this.setState({
      stepFn: window.setInterval(this.nextFrame, TYPING_INTERVAL)
    })
  }

  componentWillUnmount () {
    window.clearInterval(this.state.stepFn)
  }


  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.content !== prevState.content) {
      const frames = Terminal.generateFrames(nextProps.content)
      return {
        content: nextProps.content,
        onFinishTyping: nextProps.onFinishTyping,
        frames,
        index: 0
      }
    }
    return null
  }

  nextFrame () {
    let { index,  onFinishTyping } = this.state

    if (index + 1 === this.state.frames.length) {
      if (onFinishTyping) {
        this.setState({
          onFinishTyping: null
        }, () => onFinishTyping())
      }
    }
    else {
      this.setState({
        index: index + 1
      })
    }
  }

  static generateFrames([item, ...tail], acc = []) {
    if (item === undefined) {
      return acc
    }

    if (typeof item === "string") {
      item = {
        type: "text",
        string: item
      }
    }

    const previous = acc.length > 0
          ? acc[acc.length - 1]
          : []

    let newItems
    switch (item.type) {
    case "text":
      newItems = Terminal.generateStringFrames(item.string)
            .map(substr => previous.concat([substr]))
      break

    case "link":
      newItems = Terminal.generateStringFrames(item.text)
        .map(substr => previous.concat([(
          <a
            key={item.text}
            href={item.href}
            onClick={item.onClick}
            target="_blank">
              {substr}
            </a>
        )]))
      break

    case "newline":
      newItems = [previous.concat([(<br/>)])]
      break
    }

    const newAcc = acc.concat(newItems)
    return Terminal.generateFrames(tail, newAcc)
  }

  static generateStringFrames(str) {
    return Array
      .from(new Array(str.length + 1))
      .map((_, i) =>
           str.substring(0, i))
  }


  render () {
    const items = this.state.frames[this.state.index] || [""]
    return (
      <div className="terminal">
        { items }<Block/>
      </div>
    )
  }
}
