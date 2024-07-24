import React, { useEffect, useState } from 'react'
import './Bill.css'
import menuData from '../../menu.json'
import OrderZone from '../OrderZone/OrderZone'

function Bill( {orders, activeZone, currentTable, zonesState, cashClosedTables, setCashClosedTablesFn} ) {
  const [orderMode, setOrderMode] = useState(false);
  const [order, setOrder] = useState([]);
  const [changeMode, setChangeMode] = useState(true);
  const [modal, setModal] = useState(false);

  console.log(order)
  useEffect(() => {
    setOrder(orders)
    // setOrder(JSON.parse(localStorage.getItem('zones'))[activeZone][currentTable.number - 1].order);
   
  }, [orders, activeZone, currentTable, cashClosedTables])

  const zones = JSON.parse(localStorage.getItem('zones'));

  const cashClosedHandler = () => {
    // const closedTable = currentTable;
    // closedTable.status = 'Закрыт';
    // setCashClosedTablesFn([...cashClosedTables, closedTable])
    localStorage.setItem('closedTables', JSON.stringify(order));
    setOrder([])
    setModal(false)
    onCheckHandler();
    // fn();
  }

  // const fn = () => {
  //   const closedTable = currentTable;
  //   closedTable.status = 'Закрыт';
  //   setCashClosedTablesFn([...cashClosedTables, closedTable])
  //   console.log(cashClosedTables);
  // }

  const summary = order.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  const tovSummary = order.reduce((acc, currentItem) => {
    if (currentItem.alc) {
      return acc + currentItem.price * currentItem.quantity;
    } else {
      return acc
    }
  }, 0);

  const onAddCliclHandle = () => {
    setOrderMode(true)
  }

  const onBackClickHandle = () => {
    setOrderMode(false)
  }

  const onChangeHandler = () => {
    setChangeMode(true)
  }

  const addToOrder = (newFood, func) => {
    if (order.find(food => food.id === newFood.id)) {
        func(
            order.map((item) =>
                item.id !== newFood.id
                    ? item
                    : {
                          ...item,
                          quantity: item.quantity,
                      }
            )
        )
    } else {
        func([...order, newFood])
    }
}
  const onMinusCliclHandle = (obj) => { 
    if(obj.quantity === 0 || obj.quantity < 0) {
      return
    }
    obj.quantity -= 1
    setOrder([...order, obj])
    addToOrder(obj, setOrder)
    console.log(order)
  };

  const onPlusCliclHandle = (obj) => { 
    obj.quantity += 1
    setOrder([...order, obj])
    addToOrder(obj, setOrder)
    console.log(order)
  };

  const onSaveHandler = () => {
    zones[activeZone][currentTable.number - 1].order = order;
    setOrder(order)
    zonesState(zones)
    setChangeMode(false)
  }

  const onCheckHandler = () => {
    zones[activeZone][currentTable.number - 1].order = [];
    zonesState(zones)
    setChangeMode(true)
  }

  const setModalHandler = () => {
    setModal(true)
  }

  const closeModalHandler = () => {
    setModal(false)
  }

  const keepModalHandler = (event) => {
    event.stopPropagation();
  }


  return (
    <div className='bill'>
        <div className="bill-header-wrap">
          <div className="bill-header">
            <p>Наименование</p>
            <p>Кол-во</p>
            <p>Цена</p>
          </div>
        </div>
      {order.map((item) => {
          return (
            <div className="bill-item-wrap" key={item.id}>
              <div className="bill-item" key={Math.random()}>
                <li key={item.id} className='bill-name'>{item.name}</li>
                <div className="bill-quantity">
                  <button className={changeMode ? 'bill-quant-reg minus' : 'bill-quant-reg minus index-1'} onClick={() => onMinusCliclHandle(item)}>-</button>
                  <div className="bill-quantity-info">{item.quantity}</div>
                  <button className={changeMode ? 'bill-quant-reg plus visible' : 'bill-quant-reg plus index-1'} onClick={() => onPlusCliclHandle(item)}>+</button>
                </div>
                <div className="bill-price">{item.price * item.quantity}</div>
              </div>
            </div>
          )
      })}
      <div className='bill-buttons'>
        <button 
          className={changeMode ? 'bill-add bill-btn visible' : 'bill-add bill-btn unvisible'}
          onClick={onAddCliclHandle}
        >
          +Добавить
        </button>
        {/* <button 
          className={changeMode ? 'bill-save bill-btn visible' : 'bill-save bill-btn unvisible'}
          onClick={onSaveHandler}
        >
          Сохранить
        </button> */}
        {order.length && !changeMode ? (
          <button 
            className={'bill-save bill-btn unvisible'}
            onClick={onSaveHandler}
          >
            Сохранить
          </button>
          ) : 
          !order.length ? (
            <button 
            className={'bill-save bill-btn unvisible'}
            onClick={onSaveHandler}
          >
            Сохранить
          </button>
          ) : (
            <button 
              className={'bill-save bill-btn visible'}
              onClick={onSaveHandler}
            >
              Сохранить
            </button>
          )
         }
            
        <button 
          className={changeMode ? 'bill-change bill-btn unvisible' : 'bill-change bill-btn visible'}
          onClick={onChangeHandler}
        >
          Изменить
        </button>
      </div>
      <div className="bill-summary">
        <span className='bill-tov'>TOB: <span>{tovSummary} грн</span></span>
        <span className='bill-fop'>ФОП: <span>{summary - tovSummary} грн</span></span>
        <span className='bill-sum'>Разом: <span>{summary} грн</span></span>
      </div>
      <div className="bill-buttons bill-buttons right">
        <button 
          className={!changeMode ? 'bill-check bill-btn visible' : 'bill-check bill-btn unvisible'}
          onClick={setModalHandler}
          >
          Рассчитать
        </button>
      </div>
      {orderMode ? (
        <OrderZone 
          onBack={onBackClickHandle}
          dataMenu={menuData.menu}
          orderArray={order}
          orderStateFn={setOrder}
        />
      ) :
        null
      }
      {/* {console.log(kitchenPos, garneers, mainDishes,deserts,kidsMenu,coldDishes)} */}
      {modal ? (
        <div 
          className="bill-modal-wrap"
          onClick={closeModalHandler}
          >
          <div className="bill-modal" onClick={keepModalHandler}>
            <h5 className='modal-header'>
              Закрыть как
            </h5>
            <div className="modal-buttons">
              <button className="modal-btn" onClick={cashClosedHandler}>
                Готiвка
              </button>
              <button className="modal-btn">
                Карта
              </button>
            </div>
          </div>
        </div>
      )
      :
      null}
    </div>
  )
}

export default Bill;
