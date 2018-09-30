import React from 'react'

import style from './tasks-list.module.css'


export default function TasksList (props) {
  return (
    <div className={style.wrapper}>
      {props.tasks.map( task => 
        <p className={style.task} key={task.name}>
          {`${task.name} (${task.numOfTomato})`} 
        </p>)} 
    </div>
  )
}