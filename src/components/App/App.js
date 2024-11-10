import './App.css';
import React, {useState} from 'react';
import Main from '../Main/Main'
import TableMap from '../TableMap/TableMap';
import BillWorkspace from '../BillWorkSpace/BillWorkSpace';
import TableStoreTabs from '../TableStoreTabs/TableStoreTabs';
import ActiveTables from '../ActiveTables/ActiveTables';
import ClosedTables from '../ClosedTables//ClosedTables'
import CubeSpinner from '../CubeSpinner/CubeSpinner';
import { get, set} from 'idb-keyval'

function App() {
  const initialZones = {
    Зал: [
      { id: 1, number: 1, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 2, number: 2, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 3, number: 3, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 4, number: 4, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 5, number: 5, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 6, number: 6, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 7, number: 7, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 8, number: 8, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 9, number: 9, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 10, number: 10, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 11, number: 11, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 12, number: 12, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 13, number: 13, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 14, number: 14, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 15, number: 15, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 16, number: 16, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 17, number: 17, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 18, number: 18, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 19, number: 19, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 20, number: 20, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 21, number: 21, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 22, number: 22, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 23, number: 23, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 24, number: 24, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 25, number: 25, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 26, number: 26, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 27, number: 27, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 28, number: 28, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 29, number: 29, position: 'Зал', status: 'available', lokal: null, order: [] },
      { id: 30, number: 30, position: 'Зал', status: 'available', lokal: null, order: [] }
    ],
    M1: [
      { id: 31, number: 1, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 32, number: 2, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 33, number: 3, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 34, number: 4, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 35, number: 5, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 36, number: 6, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 37, number: 7, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 38, number: 8, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 39, number: 9, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 40, number: 10, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 41, number: 11, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 42, number: 12, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 43, number: 13, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 44, number: 14, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 45, number: 15, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 46, number: 16, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 47, number: 17, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 48, number: 18, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 49, number: 19, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 50, number: 20, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 51, number: 21, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 52, number: 22, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 53, number: 23, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 54, number: 24, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 55, number: 25, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 56, number: 26, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 57, number: 27, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 58, number: 28, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 59, number: 29, position: 'М1', status: 'available', lokal: null, order: [] },
      { id: 60, number: 30, position: 'М1', status: 'available', lokal: null, order: [] }
    ],
    M2: [
      { id: 61, number: 1, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 62, number: 2, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 63, number: 3, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 64, number: 4, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 65, number: 5, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 66, number: 6, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 67, number: 7, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 68, number: 8, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 69, number: 9, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 70, number: 10, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 71, number: 11, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 72, number: 12, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 73, number: 13, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 74, number: 14, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 75, number: 15, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 76, number: 16, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 77, number: 17, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 78, number: 18, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 79, number: 19, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 80, number: 20, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 81, number: 21, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 82, number: 22, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 83, number: 23, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 84, number: 24, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 85, number: 25, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 86, number: 26, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 87, number: 27, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 88, number: 28, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 89, number: 29, position: 'М2', status: 'available', lokal: null, order: [] },
      { id: 90, number: 30, position: 'М2', status: 'available', lokal: null, order: [] }
    ],
    Подвал: [
      { id: 91, number: 1, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 92, number: 2, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 93, number: 3, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 94, number: 4, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 95, number: 5, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 96, number: 6, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 97, number: 7, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 98, number: 8, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 99, number: 9, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 100, number: 10, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 101, number: 11, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 102, number: 12, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 103, number: 13, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 104, number: 14, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 105, number: 15, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 106, number: 16, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 107, number: 17, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 108, number: 18, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 109, number: 19, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 110, number: 20, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 111, number: 21, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 112, number: 22, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 113, number: 23, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 114, number: 24, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 115, number: 25, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 116, number: 26, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 117, number: 27, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 118, number: 28, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 119, number: 29, position: 'Подвал', status: 'available', lokal: null, order: [] },
      { id: 120, number: 30, position: 'Подвал', status: 'available', lokal: null, order: [] }
    ]
  };

  const [zones, setZones] = useState(async () => {
    let savedZones = null;
    await get('zones').then((val) => savedZones = val);
    if (savedZones) {
      setZones(savedZones);
    }
    return savedZones ? savedZones : await set('zones', initialZones).then(() => setZones(initialZones));
  });

  const [cashClosedTables, setCashClosedTables] = useState(async () => {
    let savedCashClosedTables = null;
    await get('cashClosedTables').then((val) => savedCashClosedTables = val)
    if (savedCashClosedTables) {
      setCashClosedTables(savedCashClosedTables);
    }
    return savedCashClosedTables ? savedCashClosedTables : await set('cashClosedTables', []).then(() => setCashClosedTables([]))
  });

  const [cardClosedTables, setCardClosedTables] = useState(async () => {
    let savedCardClosedTables = null;
    await get('cardClosedTables').then((val) => savedCardClosedTables = val)
    if (savedCardClosedTables) {
      setCardClosedTables(savedCardClosedTables);
    }
    return savedCardClosedTables ? savedCardClosedTables : await set('cardClosedTables', []).then(() => setCardClosedTables([]))
  });

  const [activeZone, setActiveZone] = useState('Зал');
  const [selectedTable, setSelectedTable] = useState(null);
  const [activeTables, setActiveTables] = useState([]);
  const [activeBottomTab, setActiveBottomTab] = useState('');
  // const [cardClosedTables, setcardClosedTables] = useState([]);

  const handleTabClick = (zone) => {
    setActiveZone(zone);
    setSelectedTable(null);
    setActiveBottomTab('');
  }

  const handleTableClick = (table) => {
    setSelectedTable(table);
    setActiveBottomTab('');
  };

  const handleBackToTableMap = () => {
    setSelectedTable(null);
  };

  return (
    <div className='App'>
      {zones ? ( 
        <div className="App-wrap">
        <Main 
          activeZone={selectedTable ? `Стол ${selectedTable.number}` : activeZone}
          zones={Object.keys(zones)}
          onTabClick={handleTabClick}
          activeZone2={activeZone}
        />
        {selectedTable ? (
          <BillWorkspace
            activeZone={activeZone}
            table={selectedTable}
            setSelectedTableFn={setSelectedTable}
            onBack={handleBackToTableMap}
            bill={selectedTable.order}
            zonesState={setZones}
            activeBottomTab={activeBottomTab}
            cashClosedTables={cashClosedTables}
            setCashClosedTables={setCashClosedTables}
            cardClosedTables={cardClosedTables}
            setCardClosedTables={setCardClosedTables}
            lokal={selectedTable.lokal}
          />
        ) : 
          !activeBottomTab ? (
            <TableMap
              tables={zones[activeZone]}
              onTableClick={handleTableClick}
              activeZone={activeZone}
              setActiveTablesFn={setActiveTables}
              setCashClosedTablesFn={setCashClosedTables}
              setCardClosedTablesFn={setCardClosedTables}
              classname={true}
            />
          ) : null     
        }
        {activeBottomTab === 'Активные столы' ? (
          <ActiveTables
            activeTables={activeTables}
            activeZone={activeZone}
            onTableClick={handleTableClick}
          />
        ) : null}
        {activeBottomTab === 'Закрытые столы' ? (
          <ClosedTables 
            cashClosedTables={cashClosedTables}
            cardClosedTables={cardClosedTables}
            cashClosedTablesFn={setCashClosedTables}
            cardClosedTablesFn={setCardClosedTables}
            activeZone={activeZone}
            onTableClick={handleTableClick}
            zones= {zones}
          />
        ) : null}
        <TableStoreTabs
          setActiveTabFn={setActiveBottomTab}
          activeTab={activeBottomTab}
        /> 
      </div>
      ) : ( 
        <CubeSpinner />
      )} 
    </div>
  );
}

export default App;
