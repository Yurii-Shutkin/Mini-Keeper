import React from 'react'
import Header from '../Header/Header'
import Tabs from '../Tabs/Tabs'
import './Main.css'

function Main({activeZone, activeZone2, zones, onTabClick}) {
  return (
    <div className='Main'>
      <Header header={activeZone}/>
      <Tabs 
        zones={zones}
        onTabClick={onTabClick}
        activeZone={activeZone2}
      />
    </div>

  )
}

export default Main
