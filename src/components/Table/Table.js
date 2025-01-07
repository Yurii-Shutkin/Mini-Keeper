import React, { useEffect, useState } from 'react'
import './Table.css'

function Table( {table, onClick, activeZone} ) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(table.status);
  }, [table, activeZone, table.order])
  return (
    <div
      className={table.order.length && table.status === 'Закрыт' ? 'table closed' : 'table available' && table.status === 'Активен' ? 'table occupied' : 'table available'}
      onClick={() => onClick(table)}
    >
      {table.status === 'Закрыт' ? (<p style={{fontSize: '14px'}}>{table.position}</p>): null}
      <p className='table-number'>
        {/* Стол {table.number} */}
        {table.position === 'Лавка' ? table.specAttr : 'Стол ' + table.number}
      </p>
      <div className="table-desc-wrap">
        <p className='table-status'>
          {status}
        </p>
        <p className='table-price'>
          {table.order.reduce((acc, currentItem) => {
            return acc + currentItem.price * currentItem.quantity
          }, 0)} грн
        </p>
      </div>
    </div>
  )
}

export default Table;
