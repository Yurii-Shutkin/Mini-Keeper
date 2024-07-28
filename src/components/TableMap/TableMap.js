import React, { useEffect } from 'react';
import Table from '../Table/Table';
import './TableMap.css';

const TableMap = ({ tables, onTableClick, activeZone, setActiveTablesFn, setCashClosedTableFn, setCardClosedTableFn, classname, style }) => {

  useEffect(() => {
    if (tables) {
      tables.map(t => {
        if(t.status === "Закрыт") {
          return  null
        }
        return t.order.length ? t.status = 'Активен' : t.status = 'Свободен'
      })
      if(setActiveTablesFn) {
        const filteredTables = tables.filter(t => t.status === 'Активен');
        setActiveTablesFn(filteredTables);
      }
      if(setCashClosedTableFn || setCardClosedTableFn) {
        const filteredTables = tables.filter(t => t.status === 'Закрыт');
        setActiveTablesFn(filteredTables);
      } else return
    }
  }, [tables, setActiveTablesFn, setCashClosedTableFn, setCardClosedTableFn])
  return (
   tables ? (
    <div className={classname ? 'table-map table-d-none' : 'table-map'} style={style}>
    {tables.map((table) => (
      <Table 
        table={table}
        onClick={onTableClick}
        key={table.id}
        activeZone={activeZone}
      />
    ))}
  </div>
   ) : null
  );
};

export default TableMap;
