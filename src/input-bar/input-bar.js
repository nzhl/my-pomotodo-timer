import React from 'react'

import style from './input-bar.module.css'

export default class InputBar extends React.Component {

  constructor (props) {
    super(props) 

    this.handleInputChanged = this.handleInputChanged.bind(this)
    this.handleKeyPressed = this.handleKeyPressed.bind(this)
  }

  render () {
    return (
      <div className={style.wrapper}>
        <input className={style.input} value={this.props.value}
          onKeyPress={this.handleKeyPressed}
          onChange={this.handleInputChanged}
          placeholder="Input your task, then press enter to add." />
      </div>
    )
  }

  handleKeyPressed (event) {
    this.props.onKeyPressed(event.key)
  }

  handleInputChanged (event) {
    this.props.onInputChanged(event.target.value)
  }
}