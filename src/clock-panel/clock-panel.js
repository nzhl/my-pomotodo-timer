import React from 'react';

import style from './clock-panel.module.css';
import clockSvg from './clock.svg';


export default class ClockPanel extends React.Component { 
  constructor (props) {
    super(props)

    this.handleClockClicked = this.handleClockClicked.bind(this)
    this.handleDurationChanged = this.handleDurationChanged.bind(this)
    this.handleTimerStarted = this.handleTimerStarted.bind(this)
  }

  render () {
    return (
      <React.Fragment>
        <nav className={style.nav}>
          <div className={ this.props.clockActived ? style.actived:'' }>
            <img onClick={this.handleClockClicked} className={style.logo} src={clockSvg} alt="logo" />
            <h3 className={style.timer}>{this.props.title}</h3>
          </div>
          <div>
            <select className={style['select-bar']}
              value={this.props.clockDuration}
              onChange={this.handleDurationChanged}>
              <option disabled>请选择生成一个番茄所需时间</option>
              <option value="20">20分钟 => 🍅</option>
              <option value="40">40分钟 => 🍅</option>
              <option value="60">60分钟 => 🍅</option>
              <option value="0.05">3秒钟 => 🍅 (用于开发者测试)</option>
              <option disabled>完成后会有非常难听的音乐提示</option>
            </select>
            <button className={style['start-button']}
              onClick={this.handleTimerStarted}>✔</button>
          </div>
        </nav>
        <div className={style['nav-holder']}></div>
      </React.Fragment>
    )
  } 

  handleClockClicked () {
    this.props.onClockClicked()
  }

  handleDurationChanged (event) {
    this.props.onDurationChanged(event.target.value)
  }

  handleTimerStarted () {
    this.props.onTimerStarted()
  }
}
