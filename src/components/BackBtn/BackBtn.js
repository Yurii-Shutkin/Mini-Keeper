import React from 'react'
import './BackBtn.css'

function BackBtn({clickFn}) {
  return (
    <div className="button back-btn" onClick={clickFn}>
      Назад
    </div>
  )
}

export default BackBtn;
