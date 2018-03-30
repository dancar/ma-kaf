import React from 'react'

const INTERVAL = 800
export default class Block extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true
    }
    this.timer = this.timer.bind(this)
  }
  componentDidMount () {
    const intervalId = window.setInterval(this.timer, INTERVAL);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount () {
    window.clearInterval(this.state.intervalId);
  }

  timer () {
    this.setState({ visible: !this.state.visible})
  }

  render () {
    return this.state.visible ? '▓' : ' '
  }
}
