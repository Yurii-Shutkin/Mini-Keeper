import React from 'react'
import './TableStoreTabs.css'

function TableStoreTabs({ setActiveTabFn, activeTab  }) {

  const onClickTabHandler = (tab) => {
    setActiveTabFn(tab)
  }

  return (
    <div className='TableStore-wrap'>
        <div className="tables-active">
          <button 
            className={activeTab === 'Активные столы' ? 'table-btn tab active' : 'table-btn'}
            onClick={() => onClickTabHandler('Активные столы')}
            >
              Активные столы
            </button>
        </div>
        <div className="tables-closed">
          <button 
            className={activeTab === 'Закрытые столы' ? 'table-btn tab active' : 'table-btn'}
            onClick={() => onClickTabHandler('Закрытые столы')}
            >
              Закрытые столы
          </button>
        </div>
      </div>
  )
}

export default TableStoreTabs
