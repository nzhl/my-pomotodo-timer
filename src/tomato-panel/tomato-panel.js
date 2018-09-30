import React from 'react'

import style from './tomato-panel.module.css'

export default class TomatoPanel extends React.Component {
  constructor (props) {
    super(props)

    this.handleSelectedValueChanged = this.handleSelectedValueChanged.bind(this)
    this.handleCustomizedValueChanged = this.handleCustomizedValueChanged.bind(this)
    this.handleTomatoSubmitted = this.handleTomatoSubmitted.bind(this)
  }

  render () {
    return (
    <div className={style.potatoPanel} >
      <div>
        <h2>你获得了一枚 🍅 !!</h2>
        <select value={this.props.selectedValue}
          onChange={this.handleSelectedValueChanged} >
          <option>自定义任务</option>
          {this.props.tasks.map(task => <option key={task.name}>{task.name}</option>)}
        </select>
        { this.props.selectedValue === '自定义任务' &&
          <input value={this.props.customizedValue}
            onChange={this.handleCustomizedValueChanged} 
            placeholder="Input your task ~"/>}
        <button onClick={this.handleTomatoSubmitted}>提交</button>
      </div>
    </div>)
  }

  handleSelectedValueChanged (event) {
    this.props.onSelectedValueChanged(event.target.value)
  }

  handleCustomizedValueChanged (event) {
    this.props.onCustomizedValueChanged(event.target.value)
  }

  handleTomatoSubmitted () {
    this.props.onTomatoSubmitted()
  }
}