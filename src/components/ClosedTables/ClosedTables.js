import React, {useEffect, useState} from 'react'
import './ClosedTables.css'
import TableMap from '../TableMap/TableMap';
import { del } from 'idb-keyval';


function ClosedTables({cashClosedTables, cardClosedTables, cashClosedTablesFn, cardClosedTablesFn, onTableClick, activeZone}) {
  const [currentCashTables, setCurrentCashTables] = useState([]);
  const [currentCardTables, setCurrentCardTables] = useState([]);
  const [modal, setModal] = useState(false);

  const setModalHandler = () => setModal(true);
  const closeModalHandler = () => setModal(false);
  const keepModalHandler = (event) => event.stopPropagation();

  useEffect(() => {
    setCurrentCashTables(cashClosedTables)
    setCurrentCardTables(cardClosedTables)
    console.log(cashClosedTables)
  }, [cashClosedTables, cardClosedTables])

  const onDelHandler = () => {
    cashClosedTablesFn([]);
    cardClosedTablesFn([]);
    setCurrentCardTables([]);
    setCurrentCashTables([]);
    del('cashClosedTables');
    del('cardClosedTables');
    setModal(false);
  }

  return (
    <>
      <div className="closed-headers">
        <div className="closed-cash closed-wrap">
          <h3 className="closed-hearder header-left">Готiвка</h3>
          {currentCashTables.length ? (
            <>
              <div className='statist'> 
                <span className='summary'>ФОП: <span>{cashClosedTables.reduce((acc, fopSum) => acc + fopSum.fop, 0)} грн</span></span>
                <span className='summary'>ТОВ: <span>{cashClosedTables.reduce((acc, tovSum) => acc + tovSum.tov, 0)} грн</span></span>
                <span className='summary summary-bold'>РАЗОМ: <span>{cashClosedTables.reduce((acc, summary) => acc + summary.summary, 0)} грн</span></span>
              </div>
              <TableMap 
                tables={cashClosedTables}
                onTableClick={onTableClick}
                activeZone={activeZone}
                classname={false}
                style={{
                  padding: '20px 0 0 0',
                  background: 'none'
                }}
              />
            </>
            ) : 
            null  
          }
        </div>
        <div className="closed-card closed-wrap">
          <h3 className="closed-hearder header-right">Картка</h3>
          {currentCardTables.length ? (
            <>
              <div className='statist'>
                <span className='summary'>ФОП: <span>{cardClosedTables.reduce((acc, fopSum) => acc + fopSum.fop, 0)} грн</span></span>
                <span className='summary'>ТОВ: <span>{cardClosedTables.reduce((acc, tovSum) => acc + tovSum.tov, 0)} грн</span></span>
                <span className='summary summary-bold'>РАЗОМ: <span className='summary-bold'>{cardClosedTables.reduce((acc, summary) => acc + summary.summary, 0)} грн</span></span>
              </div>
              <TableMap 
                tables={cardClosedTables}
                onTableClick={onTableClick}
                activeZone={activeZone}
                classname={false}
                style={{
                  padding: '20px 0 0 0',
                  background: 'none'
                }}
              />
            </>
            ) : 
            null  
          }
        </div>
      </div>

      {modal ? (
        <div className="closed-modal-wrap" onClick={closeModalHandler}>
          <div className="closed-modal" onClick={keepModalHandler}>
            <h5 className='closed-modal-header'>Уверены ? Действие невозможно будет отменить</h5>
            <div className="closed-modal-buttons">
              <button className="closed-modal-btn" onClick={onDelHandler}>Да</button>
              <button className="closed-modal-btn" onClick={closeModalHandler}>Нет</button>
            </div>
          </div>
        </div>
      ) : 
      null
      }

      <button 
        className="closed-btn"
        onClick={setModalHandler}
        >
        Очистить журнал
      </button>



      {/* {currentCashTables.length ? (
        <TableMap 
          tables={cashClosedTables}
          onTableClick={onTableClick}
          activeZone={activeZone}
          classname={false}
    />
      ) : 
      <p className='no-tables-message'> Тут ще немає закритих столів</p>} */}
    </>  
    // <p className='no-tables-message'>Тут будут показываться закрытые столы. В разработкe...</p>
  )
};

export default ClosedTables;
