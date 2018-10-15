import React from 'react'

import style from './tasks-list.module.css'


export default function TasksList (props) {
  return (
    <div className={style.wrapper}>
      {props.tasks.map( task => 
      <div className={style.task} key={task.name}>
        <p> {`${task.name} (${task.numOfTomato})`} </p>
        <button onClick={() => props.removeTask(task.name)}>删除</button>
      </div>
      )} 
    </div>
  )
}
