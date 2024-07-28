import React, { useState, useEffect } from 'react';
import './BillWorkSpace.css';
import Bill from '../Bill/Bill';
import BackBtn from '../BackBtn/BackBtn';

const BillWorkspace = ({ activeZone, table, onBack, bill, zonesState, activeBottomTab, cashClosedTables, setCashClosedTables, cardClosedTables, setCardClosedTables, setSelectedTableFn }) => {
  
  const [newBill, setNewBill] = useState(false);

  useEffect(() => {
    if(bill.length) {
      setNewBill(true)
    }
  }, [newBill, bill])

  const onClickHandle = () => {
    setNewBill(true)
  }

  return (
    <div className={activeBottomTab ? "bill-workspace d-none" : "bill-workspace"}>
      <div className="bills">
       {
        !newBill ?
          <>
            <div className="bill-new">
              <span onClick={onClickHandle}>Новый счет</span>
            </div>
            <BackBtn 
              clickFn={onBack}
            />
          </> : 
          <>
            <Bill orders={bill}
                  activeZone={activeZone}
                  setSelectedTableFn={setSelectedTableFn}
                  currentTable={table}
                  zonesState={zonesState}
                  activeBottomTab={activeBottomTab}
                  cashClosedTables={cashClosedTables}
                  setCashClosedTablesFn={setCashClosedTables}
                  cardClosedTables={cardClosedTables}
                  setCardClosedTablesFn={setCardClosedTables}
            />
            <BackBtn 
              clickFn={onBack}
            />
          </>
        }
      </div>
    </div> 
  );
};

export default BillWorkspace;
