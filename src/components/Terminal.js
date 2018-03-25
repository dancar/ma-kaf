import React from 'react'
import Block from './Block'
import './terminal.css'

const TYPING_INTERVAL = 100
export default class Terminal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      frames: this.generateFrames(props.content),
      index: 0
    }
    this.nextFrame = this.nextFrame.bind(this)
  }

  componentDidMount () {
    // setTimeout(this.nextFrame, TYPING_INTERVAL)
  }

  nextFrame () {
    let { index } = this.state
    const { onFinishTyping } = this.props
    const nextIndex = index + 1

    if (nextIndex >= this.state.frames.length) {
      onFinishTyping && onFinishTyping()
      return
    }

    this.setState({
      index: nextIndex
    })
    window.setTimeout(this.nextFrame, TYPING_INTERVAL)
  }

  componentWillReceiveProps ({content}) {
    if (this.props.content !==  content) {
      this.setState({
        index: 0,
        frames: this.generateFrames(content)
      }, () => setTimeout(this.nextFrame, TYPING_INTERVAL))
    }
  }

  generateFrames([item, ...tail], acc = []) {
    if (item === undefined) {
      return acc
    }

    if (typeof item === "string") {
      item = {
        type: "text",
        string: item
      }
    }

    const previous = acc.length > 0 ? acc[acc.length - 1] : []

    let newItems
    switch (item.type) {
    case "text":
      newItems = this.generateStringFrames(item.string)
            .map(substr => previous.concat([substr]))
      break

    case "link":
      newItems = this.generateStringFrames(item.text)
        .map(substr => previous.concat([(
            <a href={item.href}>
              {substr}
            </a>
        )]))
      break

    case "newline":
      newItems = [(<br/>)]
    }
    return this.generateFrames(tail, acc.concat(previous.concat(newItems)))
  }

  generateStringFrames(str) {
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
