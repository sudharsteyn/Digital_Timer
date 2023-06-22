import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCountRunning: false,
      counterMinutes: 25,
      counterSeconds: 0,
      setTimer: 25,
    }
    this.timerId = null
  }

  onDecreaseTimer = () => {
    let {setTimer} = this.state
    setTimer -= 1
    this.setState({counterMinutes: setTimer, setTimer})
  }

  onIncreaseTimer = () => {
    let {setTimer} = this.state
    setTimer += 1
    this.setState({counterMinutes: setTimer, setTimer})
  }

  onStartTimer = () => {
    if (!this.timerId) {
      this.timerId = setInterval(this.startTimer, 1000)
    }
  }

  startTimer = () => {
    let {counterMinutes, counterSeconds} = this.state

    if (counterSeconds === 0) {
      counterSeconds = 60
      counterMinutes -= 1
      if (counterMinutes === -1) {
        clearInterval(this.timerId)
        this.timerId = null
        this.setState({
          isCountRunning: false,
          counterMinutes: 0,
          counterSeconds: 0,
        })
        return
      }
    }
    counterSeconds -= 1
    this.setState({counterMinutes, counterSeconds, isCountRunning: true})
  }

  pauseTimer = () => {
    clearInterval(this.timerId)
    this.timerId = null
    this.setState({isCountRunning: false})
  }

  disableButton = () => {
    console.log('Button Disabled')
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.timerId = null
    this.setState({
      isCountRunning: false,
      counterMinutes: 25,
      counterSeconds: 0,
      setTimer: 25,
    })
  }

  render() {
    const {
      isCountRunning,
      counterMinutes,
      counterSeconds,
      setTimer,
    } = this.state
    const startOrPauseImageUrl = isCountRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isCountRunning ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-body-container">
          <div className="timer-container">
            <div className="timer">
              <h1 className="timer-count">
                {counterMinutes < 10 ? `0${counterMinutes}` : counterMinutes}:
                {counterSeconds < 10 ? `0${counterSeconds}` : counterSeconds}
              </h1>
              <p className="selection">
                {isCountRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="controls-container">
            <div className="controls">
              <div className="control">
                <button
                  onClick={isCountRunning ? this.pauseTimer : this.onStartTimer}
                  className="control-btn"
                  type="button"
                >
                  <img
                    className="control-icon"
                    src={startOrPauseImageUrl}
                    alt={startOrPauseAltText}
                  />
                  <p className="btn-text">
                    {isCountRunning ? 'Pause' : 'Start'}
                  </p>
                </button>
              </div>
              <div className="control">
                <button
                  onClick={this.onReset}
                  className="control-btn"
                  type="button"
                >
                  <img
                    className="control-icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="btn-text">Reset</p>
                </button>
              </div>
            </div>
            <p className="set-timer-text">Set Timer limit</p>
            <div className="set-timer-container">
              <button
                onClick={
                  isCountRunning ? this.disableButton : this.onDecreaseTimer
                }
                className="limit-btn"
                type="button"
              >
                -
              </button>
              <div className="timer-limit-container">
                <p className="set-timer">{setTimer}</p>
              </div>
              <button
                onClick={
                  isCountRunning ? this.disableButton : this.onIncreaseTimer
                }
                className="limit-btn"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
