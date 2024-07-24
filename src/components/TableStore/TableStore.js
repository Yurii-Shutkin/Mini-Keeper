import React, { useEffect, useState } from 'react'
import TableMap from '../TableMap/TableMap';
import './TableStore.css'


function TableStore({ activeTables, activeZone, onTableClick}) {
  const [currentTables, setCurrentTables] = useState([]);
  useEffect(() => {
    setCurrentTables(activeTables)
  }, [activeTables])
  return (
    <>
      {currentTables.length ? (
        <TableMap 
          tables={activeTables}
          onTableClick={onTableClick}
          activeZone={activeZone}
          classname={false}
    />
      ) : 
      <p className='no-tables-message'>На позиції ще немає активних столів</p>}
    </>  
  )
}

export default TableStore;
