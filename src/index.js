import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker'

import ClockPanel from './clock-panel/clock-panel'
import InputBar from './input-bar/input-bar'
import TasksList from './tasks-list/tasks-list'
import TomatoPanel from './tomato-panel/tomato-panel'
import './index.css';

class App extends React.Component {

  constructor (props) {
    super(props)
    this.handleClockClicked = this.handleClockClicked.bind(this)
    this.handleDurationChanged = this.handleDurationChanged.bind(this)
    this.handleTimerStarted = this.handleTimerStarted.bind(this)
    this.handleKeyPressed = this.handleKeyPressed.bind(this)
    this.handleInputChanged = this.handleInputChanged.bind(this)
    this.handleSelectedValueChanged = this.handleSelectedValueChanged.bind(this)
    this.handleCustomizedValueChanged = this.handleCustomizedValueChanged.bind(this)
    this.handleTomatoSubmitted = this.handleTomatoSubmitted.bind(this)
    this.addTask = this.addTask.bind(this)
    this.findTask = this.findTask.bind(this)
    this.submitTomato = this.submitTomato.bind(this)

    this.state = {
      clockTitle: '点击左边的图标开始计时~',
      clockState: 'ready',
      clockActived: false,
      clockDuration: '20',

      inputTask: '',
      tasks: [],

      selectedValue: '自定义任务',
      customizedValue: '',

    }
  }

  render () {
    return (
      <React.Fragment>
        <ClockPanel title={this.state.clockTitle} 
          clockDuration={this.state.clockDuration}
          onDurationChanged={this.handleDurationChanged}
          clockActived={this.state.clockActived}
          onClockClicked={this.handleClockClicked}
          onTimerStarted={this.handleTimerStarted} />
        <InputBar value={this.state.inputTask}
          onKeyPressed={this.handleKeyPressed}
          onInputChanged={this.handleInputChanged} />
        <TasksList tasks={this.state.tasks}
          removeTask={this.removeTask} />
        {this.state.clockState === 'finish' && 
          <TomatoPanel selectedValue={this.state.selectedValue}
            onSelectedValueChanged={this.handleSelectedValueChanged}
            customizedValue={this.state.customizedValue}
            onCustomizedValueChanged={this.handleCustomizedValueChanged}
            onTomatoSubmitted={this.handleTomatoSubmitted}
            tasks={this.state.tasks} />}
      </React.Fragment>
    )
  }

  handleClockClicked () {
    if (this.state.clockState !== 'ready') return
    this.setState({clockActived: true})
  }

  handleDurationChanged (duration) {
    this.setState({clockDuration: duration})
  }

  handleTimerStarted () {
    this.setState({clockState: 'on', clockActived: false})

    const calTime = secondsLeft => {
      let min = Math.floor(secondsLeft / 60)
      let sec = secondsLeft % 60
      min = min < 10 ? '0' + min : min
      sec = sec < 10 ? '0' + sec : sec
      return `${min}:${sec}`
    }

    let secondsLeft = this.state.clockDuration * 60;
    this.setState({clockTitle: calTime(secondsLeft)})
    let timer = setInterval(() => {
      --secondsLeft
      this.setState({clockTitle: calTime(secondsLeft)})
      if (secondsLeft === 0) {
        clearInterval(timer)
        this.setState({clockState: 'finish'})
      }
    },1000)
  }

  handleKeyPressed (key) {
    const task = this.state.inputTask.trim()
    if (key !== 'Enter' || !task) return

    this.setState({inputTask: ''})
    this.addTask(task)
  }

  handleInputChanged (value) {
    this.setState({inputTask: value})
  }

  handleSelectedValueChanged (value) {
    this.setState({selectedValue: value})
  }

  handleCustomizedValueChanged (value) {
    this.setState({customizedValue: value})
  }

  handleTomatoSubmitted () {
    if (this.state.selectedValue === '自定义任务') {
      const task = this.state.customizedValue.trim()
      if (task.length === 0) {
        alert('请输入足够长度的任务名称!')
        return
      }

      if (this.addTask(task, 1)) {
        this.setState({clockState: 'ready', customizedValue: ''})
      }
    } else {
      const task = this.state.selectedValue
      this.submitTomato(task)
      this.setState({clockState: 'ready', selectedValue: '自定义任务'})
    }
  }

  findTask (task) {
    for (let index = 0; index < this.state.tasks.length; index++) {
      const each = this.state.tasks[index].name
      if (each === task) return index
    }
    return -1
  }

  removeTask = task => {
    this.setState(
      {tasks: this.state.tasks.filter(each => each.name != task)})
  }

  addTask (task, numOfTomato=0) {
    if (this.findTask(task) !== -1) {
      alert('该任务名已经存在!')
      return false
    }

    this.setState({tasks: this.state.tasks.concat({
      name: task,
      numOfTomato: numOfTomato,
    })})
    return true
  }

  submitTomato (task) {
    const index = this.findTask(task)
    let tasks =  [...this.state.tasks]
    tasks[index].numOfTomato++
    this.setState({tasks: tasks})
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// helps you cache your assets and other files
// so that when the user is offline or on slow network, 
// he/she can still see results on the screen,
// https://stackoverflow.com/questions/47953732/what-does-registerserviceworker-do-in-react-js
registerServiceWorker();
