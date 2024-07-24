import React, {useEffect, useState} from 'react'
import './ClosedTables.css'
import TableMap from '../TableMap/TableMap';

import './ClosedTables.css'

function ClosedTables({cashClosedTables, onTableClick, activeZone}) {
  // const [currentTables, setCurrentTables] = useState([]);
  // useEffect(() => {
  //   setCurrentTables(cashClosedTables)
  // }, [cashClosedTables])
  return (
    // <>
    //   {currentTables.length ? (
    //     <TableMap 
    //       tables={cashClosedTables}
    //       onTableClick={onTableClick}
    //       activeZone={activeZone}
    //       classname={false}
    // />
    //   ) : 
    //   <p className='no-tables-message'>На позиції ще немає активних столів</p>}
    // </>  
    <p className='no-tables-message'>Тут будут показываться закрытые столы. В разработкe...</p>
  )
};

export default ClosedTables;
