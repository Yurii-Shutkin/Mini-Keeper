import React from 'react'
import './OrderZone.css'
import JsonTabs from '../JsonTabs/JsonTabs';

function OrderZone({dataMenu, onBack, orderArray, orderStateFn}) {

  return (
    <div className='orderZone'>
      <div 
        className="opasityZone"
        onClick={onBack}>
        
      </div>
      <div className="orderZone-menu">
        <button 
          className="orderZone-back"
          onClick={onBack}>
          Назад
        </button>
        <ul className="orderZone-categories">
          <JsonTabs 
            data={dataMenu}
            array={orderArray}
            fn={orderStateFn}
          />
        </ul>
      </div>
    </div>
  )
}

export default OrderZone;
