// import React, { useEffect, useState } from 'react'
// import './Bill.css'
// import menuData from '../../menu.json'
// import OrderZone from '../OrderZone/OrderZone'
// import { get, set } from 'idb-keyval'

// function Bill( {orders, activeZone, currentTable, zonesState, cashClosedTables, setCashClosedTablesFn} ) {
//   const [orderMode, setOrderMode] = useState(false);
//   const [order, setOrder] = useState([]);
//   const [changeMode, setChangeMode] = useState(true);
//   const [modal, setModal] = useState(false);
//   const [savedOrder, setSavedOrder] = useState([]);

//   useEffect(() => {
//     if (orders) {
//       setOrder(orders)
//     }
//   }, [orders, activeZone, currentTable, cashClosedTables])

//   let zones = get('zones').then(val => zones = val);

//   const cashClosedHandler = () => {
//     setSavedOrder(order)
//     const closedTable = currentTable;
//     closedTable.status = 'Закрыт';
//     closedTable.order = [savedOrder];
//     setCashClosedTablesFn([...cashClosedTables, closedTable]);
//     set('closedTables', [...cashClosedTables, closedTable]);
//     console.log(closedTable)
//     // currentTable.order = [];
   
//     setModal(false);
//     onCheckHandler();
//     // fn();
//   }

//   // const fn = () => {
//   //   const closedTable = currentTable;
//   //   closedTable.status = 'Закрыт';
//   //   setCashClosedTablesFn([...cashClosedTables, closedTable])
//   //   console.log(cashClosedTables);
//   // }

//   const summary = order.reduce((accumulator, currentItem) => {
//     return accumulator + currentItem.price * currentItem.quantity;
//   }, 0);

//   const tovSummary = order.reduce((acc, currentItem) => {
//     if (currentItem.alc) {
//       return acc + currentItem.price * currentItem.quantity;
//     } else {
//       return acc
//     }
//   }, 0);

//   const onAddCliclHandle = () => {
//     setOrderMode(true)
//   }

//   const onBackClickHandle = () => {
//     setOrderMode(false)
//   }

//   const onChangeHandler = () => {
//     setChangeMode(true)
//   }

//   const addToOrder = (newFood, func) => {
//     if (order.find(food => food.id === newFood.id)) {
//         func(
//             order.map((item) =>
//                 item.id !== newFood.id
//                     ? item
//                     : {
//                           ...item,
//                           quantity: item.quantity,
//                       }
//             )
//         )
//     } else {
//         func([...order, newFood])
//     }
// }
//   const onMinusCliclHandle = (obj) => { 
//     if(obj.quantity === 0 || obj.quantity < 0) {
//       return
//     }
//     obj.quantity -= 1
//     setOrder([...order, obj])
//     addToOrder(obj, setOrder)
//   };

//   const onPlusCliclHandle = (obj) => { 
//     obj.quantity += 1
//     setOrder([...order, obj])
//     addToOrder(obj, setOrder)
//   };

//   const onSaveHandler = () => {
//     setOrder(order)
//     zones[activeZone][currentTable.number - 1].order = order;
//     zonesState(zones)
//     set('zones', zones).then(() => console.log('Setted'));
//     setChangeMode(false)
//   }

//   const onCheckHandler = () => {
//     setOrder([]);
//     currentTable.order = ([]);
//     zones[activeZone][currentTable.number - 1].order = [];
//     zonesState(zones)
//     orders = [];
//     console.log(order)
//     set('zones', zones);
//     setChangeMode(true)
//   }

//   const setModalHandler = () => {
//     setModal(true)
//   }

//   const closeModalHandler = () => {
//     setModal(false)
//   }

//   const keepModalHandler = (event) => {
//     event.stopPropagation();
//   }
  
//   // const onAddLocalHandler = (num) => {
//   //   const newZones = { ...zones };
  
//   // // Обновление копии состояния
//   //   newZones[activeZone][currentTable.local] = num;

//   // // Обновление состояния
//   //   zonesState(newZones);

//   // // Сохранение обновленного состояния в IndexedDB
//   //   set(`zones${[activeZone][currentTable.local]}`, num).then(() => {
//   //     console.log(zones);
//   //   }).catch((err) => {
//   //     console.error('Ошибка сохранения в IndexedDB:', err);
//   //   });
//   // }

//   return (
//     <div className='bill'>
//         <div className="bill-header-wrap">
//           <div className="bill-header">
//             <p>Наименование</p>
//             <p>Кол-во</p>
//             <p>Цена</p>
//           </div>
//         </div>
//       {order.map((item) => {
//           return (
//             <div className="bill-item-wrap" key={item.id}>
//               <div className="bill-item" key={Math.random()}>
//                 <li key={item.id} className='bill-name'>{item.name}</li>
//                 <div className="bill-quantity">
//                   <button className={changeMode ? 'bill-quant-reg minus' : 'bill-quant-reg minus index-1'} onClick={() => onMinusCliclHandle(item)}>-</button>
//                   <div className="bill-quantity-info">{item.quantity}</div>
//                   <button className={changeMode ? 'bill-quant-reg plus visible' : 'bill-quant-reg plus index-1'} onClick={() => onPlusCliclHandle(item)}>+</button>
//                 </div>
//                 <div className="bill-price">{item.price * item.quantity}</div>
//               </div>
//             </div>
//           )
//       })}
//       <div className='bill-buttons'>
//         <button 
//           className={changeMode ? 'bill-add bill-btn visible' : 'bill-add bill-btn unvisible'}
//           onClick={onAddCliclHandle}
//         >
//           +Добавить
//         </button>
//         {order.length && !changeMode ? (
//           <button 
//             className={'bill-save bill-btn unvisible'}
//             onClick={onSaveHandler}
//           >
//             Сохранить
//           </button>
//           ) : 
//           !order.length ? (
//             <button 
//             className={'bill-save bill-btn unvisible'}
//             onClick={onSaveHandler}
//           >
//             Сохранить
//           </button>
//           ) : (
//             <button 
//               className={'bill-save bill-btn visible'}
//               onClick={onSaveHandler}
//             >
//               Сохранить
//             </button>
//           )
//          }
            
//         <button 
//           className={changeMode ? 'bill-change bill-btn unvisible' : 'bill-change bill-btn visible'}
//           onClick={onChangeHandler}
//         >
//           Изменить
//         </button>
//         {/* <button 
//           className='bill-btn'
//           onClick={() => onAddLocalHandler(443654)}
//         >
//           Добавить Local
//         </button> */}
//       </div>
//       <div className="bill-summary">
//         <span className='bill-tov'>TOB: <span>{tovSummary} грн</span></span>
//         <span className='bill-fop'>ФОП: <span>{summary - tovSummary} грн</span></span>
//         <span className='bill-sum'>Разом: <span>{summary} грн</span></span>
//       </div>
//       <div className="bill-buttons bill-buttons right">
//         <button 
//           className={!changeMode ? 'bill-check bill-btn visible' : 'bill-check bill-btn unvisible'}
//           onClick={setModalHandler}
//           >
//           Рассчитать
//         </button>
//       </div>
//       {orderMode ? (
//         <OrderZone 
//           onBack={onBackClickHandle}
//           dataMenu={menuData.menu}
//           orderArray={order}
//           orderStateFn={setOrder}
//         />
//       ) :
//         null
//       }
//       {/* {console.log(kitchenPos, garneers, mainDishes,deserts,kidsMenu,coldDishes)} */}
//       {modal ? (
//         <div 
//           className="bill-modal-wrap"
//           onClick={closeModalHandler}
//           >
//           <div className="bill-modal" onClick={keepModalHandler}>
//             <h5 className='modal-header'>
//               Уверены ?
//             </h5>
//             <div className="modal-buttons">
//               <button className="modal-btn" onClick={cashClosedHandler}>
//                 Да
//               </button>
//               <button className="modal-btn" onClick={closeModalHandler}>
//                 Нет
//               </button>
//             </div>
//           </div>
//         </div>
//       )
//       :
//       null}
//     </div>
//   )
// }

// export default Bill;


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
  const [lokalNumber, setLokalNumber] = useState(null);
  const [focus, setFocus] = useState(false);



  useEffect(() => {
    if (orders) {
      setOrder(orders);
    }
    if (currentTable.status === 'Закрыт') {
      setChangeMode(false);
    }
    if (lokal) {
      setLokalNumber(lokal)
      currentTable.lokal = lokalNumber;
    }
  }, [orders, activeZone, currentTable, cashClosedTables, lokal]);

  useEffect(() => {
    
  })

  useEffect(() => {
    get('zones').then(val => setZones(val));
  }, []);
  
  const cashClosedHandler = () => {
    setSavedOrder(order);
    const closedTable = { ...currentTable, status: 'Закрыт', order: order, lokal: lokalNumber };
    setCashClosedTablesFn([...cashClosedTables, closedTable]);
    set('cashClosedTables', [...cashClosedTables, closedTable]);
    setModal(false);
    onCheckHandler();
  };

  const cardClosedHandler = () => {
    setSavedOrder(order);
    const closedTable2 = { ...currentTable, status: 'Закрыт', order: order, lokal: lokalNumber };
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
    if (existingItem) {
      func(order.map(item => item.id !== newFood.id ? item : { ...item, quantity: newFood.quantity }));
    } else {
      func([...order, newFood]);
    }
  };

  const onMinusCliclHandle = (obj) => {
    if (obj.quantity <= 0) return;
    obj.quantity -= 1;
    addToOrder(obj, setOrder);
  };

  const onPlusCliclHandle = (obj) => {
    obj.quantity += 1;
    addToOrder(obj, setOrder);
  };

  const onSaveHandler = () => {
    if (zones) {
      const updatedZones = { ...zones };
      setLokalNumber(lokalNumber);
      updatedZones[activeZone][currentTable.number - 1].order = order;
      updatedZones[activeZone][currentTable.number - 1].lokal = lokalNumber;
      zonesState(updatedZones);
      set('zones', updatedZones).then(() => console.log('Setted'));
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

  const onAddLocalHandler = (num) => {
    setLokalModal(true);
    const newZones = { ...zones };
    if (lokalNumber) {
      newZones[activeZone][currentTable.number - 1].lokal = lokalNumber;
      zonesState(newZones);
    } else {
      newZones[activeZone][currentTable.number - 1].lokal = num;
      zonesState(newZones);
    }
    setChangeMode(true);
    setFocus(true);
  }

  // const onAddLocalHandler = (num) => {
  //   console.log("Начало функции onAddLocalHandler");
  //   console.log("Исходное состояние zones:", zones);
  //   console.log("activeZone:", activeZone);
  //   console.log("currentTable.lokal:", currentTable.lokal);
  
  //   const newZones = { ...zones };
  //   console.log("Копия состояния newZones до изменения:", newZones);
  
  //   if (newZones[activeZone] && typeof newZones[activeZone] === 'object') {
  //     newZones(zones[activeZone][currentTable.lokal]) = num;
  //     console.log("Копия состояния newZones после изменения:", newZones);
      
  //     // Обновление состояния
  //     zonesState(newZones);
  //     console.log("Состояние обновлено. Новое состояние zones:", newZones);
  
  //     // Сохранение обновленного состояния в IndexedDB
  //     set(`zones${[activeZone]}${[currentTable.lokal]}`, num).then(() => {
  //       console.log("Сохранено в IndexedDB:", `zones${[activeZone]}${[currentTable.lokal]}`, num);
  //       console.log(zones[activeZone][currentTable.id - 1].lokal);
  //     }).catch((err) => {
  //       console.error('Ошибка сохранения в IndexedDB:', err);
  //     });
  //   } else {
  //     console.error('Некорректная структура данных для activeZone или currentTable.local');
  //   }
  // };
  
  // // Пример использования useEffect для проверки обновленного состояния
  // useEffect(() => {
  //   console.log("Состояние обновилось:", zones);
  // }, [zones]);
  

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
              <button className={changeMode ? 'bill-quant-reg minus' : 'bill-quant-reg minus index-1'} onClick={() => onMinusCliclHandle(item)}>-</button>
              <div className="bill-quantity-info">{item.quantity}</div>
              <button className={changeMode ? 'bill-quant-reg plus visible' : 'bill-quant-reg plus index-1'} onClick={() => onPlusCliclHandle(item)}>+</button>
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
        {lokalNumber && <span className='bill-lokal'>Lokal: <span>{lokalNumber}</span></span>}
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
