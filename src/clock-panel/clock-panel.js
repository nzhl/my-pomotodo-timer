import React from 'react';

import style from './clock-panel.module.css';
import clockSvg from './clock.svg';


export default class ClockPanel extends React.Component { 
  constructor (props) {
    super(props)

    this.handleClockClicked = this.handleClockClicked.bind(this)
  }

  render () {
    return (
      <React.Fragment>
        <nav className={style.nav}>
          <img onClick={this.handleClockClicked} className={style.logo} src={clockSvg} alt="logo" />
          <h3 className={style.timer}>{this.props.title}</h3>
        </nav>
        <div className={style['nav-holder']}></div>
      </React.Fragment>
    )
  } 

  handleClockClicked () {
    this.props.onClockClicked()
  }
}


