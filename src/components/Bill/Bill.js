import React, { useEffect, useState } from 'react';
import './Bill.css';
import menuData from '../../menu.json';
import OrderZone from '../OrderZone/OrderZone';
import { get, set } from 'idb-keyval';

function Bill({ orders, activeZone, setSelectedTableFn, currentTable, zonesState, cashClosedTables, setCashClosedTablesFn, cardClosedTables, setCardClosedTablesFn, lokal }) {
  const [orderMode, setOrderMode] = useState(false);
  const [order, setOrder] = useState([]);
  const [changeMode, setChangeMode] = useState(true);
  const [modal, setModal] = useState(false);
  const [savedOrder, setSavedOrder] = useState([]);
  const [zones, setZones] = useState(null);
  const [lokalModal, setLokalModal] = useState(false);
  const [lokalNumber, setLokalNumber] = useState(lokal);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (orders) {
      setOrder(orders);
      currentTable.order = orders;
      setChangeMode(false);
    }
    if (currentTable.status === 'Закрыт') {
      setChangeMode(false);
    }
  }, [currentTable, orders]);

  useEffect(() => {
    get('zones').then(val => setZones(val));
  }, []);
  
  const cashClosedHandler = () => {
    setSavedOrder(order);
    const closedTable = { ...currentTable, status: 'Закрыт', order: order, lokal: lokalNumber, tov: tovSummary, fop: summary - tovSummary, summary };
    setCashClosedTablesFn([...cashClosedTables, closedTable]);
    set('cashClosedTables', [...cashClosedTables, closedTable]);
    setModal(false);
    onCheckHandler();
  };

  const cardClosedHandler = () => {
    setSavedOrder(order);
    const closedTable2 = { ...currentTable, status: 'Закрыт', order: order, lokal: lokalNumber, tov: tovSummary, fop: summary - tovSummary, summary };
    setCardClosedTablesFn([...cardClosedTables, closedTable2]);
    set('cardClosedTables', [...cardClosedTables, closedTable2]);
    setModal(false);
    onCheckHandler();
  };

  const summary = order.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0);
  const tovSummary = order.reduce((acc, currentItem) => currentItem.alc ? acc + currentItem.price * currentItem.quantity : acc, 0);

  const onAddCliclHandle = () => {
    setOrderMode(true);
    setLokalModal(false);
  }
  const onBackClickHandle = () => setOrderMode(false);
  const onChangeHandler = () => setChangeMode(true);

  const addToOrder = (newFood, func) => {
    const existingItem = order.find(food => food.id === newFood.id);
    const emptyOrder = order.find(item => item.quantity === 0);
    if (existingItem) {
      func(order.map(item => item.id !== newFood.id ? item : { ...item, quantity: newFood.quantity }));
    } else {
      func([...order, newFood]);
    }
    if (emptyOrder) {
      func([...order.filter(item => item.quantity !== 0 && item.quantity >= 0)])
    }
  };

  const onMinusClickHandle = (obj) => {
    obj.quantity -= 1;
    addToOrder(obj, setOrder);
  };

  const onPlusClickHandle = (obj) => {
    obj.quantity += 1;
    addToOrder(obj, setOrder);
  };

  const onSaveHandler = () => {
    if (zones) {
      const updatedZones = { ...zones };
      currentTable.lokal = lokalNumber;
      updatedZones[activeZone][currentTable.number - 1].lokal = lokalNumber;
      updatedZones[activeZone][currentTable.number - 1].order = order;
      zonesState(updatedZones);
      set('zones', updatedZones);
      setChangeMode(false);
      setLokalModal(false);
      setFocus(false);
    }
  };

  const onCheckHandler = () => {
    if (zones) {
      setOrder([]);
      const updatedZones = { ...zones };
      updatedZones[activeZone][currentTable.number - 1].order = [];
      updatedZones[activeZone][currentTable.number - 1].lokal = null;
      zonesState(updatedZones);
      set('zones', updatedZones);
      setChangeMode(true);
      setSelectedTableFn(null);
    }
  };

  const onAddLocalHandler = () => {
    setLokalModal(true);
    setChangeMode(true);
    setFocus(true);
  }
  
  const setModalHandler = () => setModal(true);
  const closeModalHandler = () => setModal(false);
  const keepModalHandler = (event) => event.stopPropagation();

  return (
    <div className='bill'>
      <div className="bill-header-wrap">
        <div className="bill-header">
          <p>Наименование</p>
          <p>Кол-во</p>
          <p>Цена</p>
        </div>
      </div>
      {order.map((item) => (
        <div className="bill-item-wrap" key={item.id}>
          <div className="bill-item">
            <li className='bill-name'>{item.name}</li>
            <div className="bill-quantity">
              <button className={changeMode ? 'bill-quant-reg minus' : 'bill-quant-reg minus index-1'} onClick={() => onMinusClickHandle(item)}>-</button>
              <div className="bill-quantity-info">{item.quantity === 0 ? item.quantity += 1 : item.quantity}</div>
              <button className={changeMode ? 'bill-quant-reg plus visible' : 'bill-quant-reg plus index-1'} onClick={() => onPlusClickHandle(item)}>+</button>
            </div>
            <div className="bill-price">{item.price * item.quantity}</div>
          </div>
        </div>
      ))}
      <div className={currentTable.status === 'Закрыт' ? 'unvisible' : 'bill-buttons'}>
        <button className={changeMode ? 'bill-add bill-btn visible' : 'bill-add bill-btn unvisible'} onClick={onAddCliclHandle}>+Добавить</button>
        <button className={order.length && changeMode ? 'bill-save bill-btn visible' : 'bill-save bill-btn unvisible'} onClick={onSaveHandler}>Сохранить</button>
        <button className={changeMode ? 'bill-change bill-btn unvisible' : 'bill-change bill-btn visible'} onClick={onChangeHandler}>Изменить</button>
      </div>
      <div className="bill-summary">
        <span className='bill-tov'>TOB: <span>{tovSummary} грн</span></span>
        <span className='bill-fop'>ФОП: <span>{summary - tovSummary} грн</span></span>
        <span className='bill-sum'>Разом: <span>{summary} грн</span></span>
        {currentTable.lokal && <span className='bill-lokal'>Lokal: <span>{currentTable.lokal}</span></span>}
      </div>
      <div className={currentTable.status === 'Закрыт' ? 'unvisible' : "bill-buttons bill-buttons"}>
        <button className={!changeMode ? 'bill-check bill-btn visible' : 'bill-check bill-btn unvisible'} onClick={setModalHandler}>Рассчитать</button>
        {order.length ?
          <div className='lokal-wrap'>
            <button 
              className='bill-btn lokal-btn'
              onClick={() => onAddLocalHandler(lokalNumber)}
            >
              {lokalNumber ? 'Изменить Lokal' : 'Добавить Lokal'}
            </button>
            {lokalModal &&
              <input
                className='lokal-input'
                value={lokalNumber || ''} 
                type='number'
                onChange={e => setLokalNumber(e.target.value)} 
                autoFocus={focus}
                onBlur={() => setFocus(false)}
            />}
        </div> : null
        }
      </div>
      {orderMode && (
        <OrderZone onBack={onBackClickHandle} dataMenu={menuData.menu} orderArray={order} orderStateFn={setOrder} />
      )}
      {modal && (
        <div className="bill-modal-wrap" onClick={closeModalHandler}>
          <div className="bill-modal" onClick={keepModalHandler}>
            <h5 className='modal-header'>Закрити як..</h5>
            <div className="modal-buttons">
              <button className="modal-btn" onClick={cashClosedHandler}>Готiвка</button>
              <button className="modal-btn" onClick={cardClosedHandler}>Картка</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bill;
