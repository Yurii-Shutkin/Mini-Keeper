import React from 'react'
import './Header.css'

 function Header({header}) {
  return (
    <div className='Header'>
      <h1 className='Header__title'>{header}</h1>
    </div>
  )
}

export default Header;
