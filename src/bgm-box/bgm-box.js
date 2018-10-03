import React from 'react'

import style from './bgm-box.module.css'

import Bgm from './bgm.ogg'

export default function BgmBox (props) {
  return (
    <audio className={style['audio-box']} src={Bgm} autoPlay></audio>
  )
}
