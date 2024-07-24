import React, { useState, useEffect } from 'react';
import './BillWorkSpace.css';
import Bill from '../Bill/Bill';
import BackBtn from '../BackBtn/BackBtn';

const BillWorkspace = ({ activeZone, table, onBack, bill, zonesState, activeBottomTab, cashClosedTables, setCashClosedTables }) => {
  
  const [newBill, setNewBill] = useState(false);

  useEffect(() => {
    if(bill.length) {
      setNewBill(true)
    }
  }, [newBill, bill])

  const onClickHandle = () => {
    setNewBill(true)
  }
  
  // const [bill, setBill] = useState(existingBill ? existingBill.items || [] : []);
  // const [selectedCategory, setSelectedCategory] = useState('kitchen');
  // const [selectedSubCategory, setSelectedSubCategory] = useState('nonAlcoholic');
  // const [selectedItem, setSelectedItem] = useState('');
  // const [quantity, setQuantity] = useState(1);

  // useEffect(() => {
  //   if (existingBill) {
  //     setBill(existingBill.items || []);
  //   }
  //   console.log(existingBill)
  // }, [existingBill]);

  // const handleAddItem = () => {
  //   const item = menuData.menu[selectedCategory][selectedSubCategory].find((item) => item.id === parseInt(selectedItem));
  //   if (item) {
  //     const newItem = { ...item, quantity };
  //     setBill([...bill, newItem]);
  //   }
  //   setSelectedItem('');
  //   setQuantity(1);
  // };

  // const handleCreateBill = () => {
  //   const totalAmount = bill.reduce((total, item) => total + item.price * item.quantity, 0);
  //   onSaveBill({ tableId: table.id, totalAmount, items: bill });
  //   onBack();
  // };

  // const getTotalForSubCategory = (subCategory) => {
  //   return (
  //     (bill
  //       .filter(item => item.type === subCategory)
  //       .reduce((total, item) => total + item.price * item.quantity, 0) || 0)
  //     .toFixed(2)
  //   );
  // };

  // const totalAmount = (bill.reduce((total, item) => total + item.price * item.quantity, 0) || 0).toFixed(2);

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
                  currentTable={table}
                  zonesState={zonesState}
                  activeBottomTab={activeBottomTab}
                  cashClosedTables={cashClosedTables}
                  setCashClosedTablesFn={setCashClosedTables}
            />
            <BackBtn 
              clickFn={onBack}
            />
          </>
        }
      </div>
    </div>
    // <div className="bill-workspace">
    //   <button onClick={onBack}>Back to Table Map</button>
    //   <h2>Create Bill for Table {table.number}</h2>
    //   <div className="menu-selection">
    //     <div className="menu-categories">
    //       <label>
    //         Category:
    //         <select
    //           value={selectedCategory}
    //           onChange={(e) => {
    //             setSelectedCategory(e.target.value);
    //             setSelectedSubCategory('nonAlcoholic');  // Сбрасываем подкатегорию при смене категории
    //           }}
    //         >
    //           <option value="kitchen">Kitchen</option>
    //           <option value="bar">Bar</option>
    //         </select>
    //       </label>
    //       {selectedCategory === 'bar' && (
    //         <label>
    //           Sub-Category:
    //           <select
    //             value={selectedSubCategory}
    //             onChange={(e) => setSelectedSubCategory(e.target.value)}
    //           >
    //             <option value="nonAlcoholic">Non-Alcoholic</option>
    //             <option value="alcoholic">Alcoholic</option>
    //           </select>
    //         </label>
    //       )}
    //     </div>
    //     <div className="menu-items">
    //       <label>
    //         Item:
    //         <select
    //           value={selectedItem}
    //           onChange={(e) => setSelectedItem(e.target.value)}
    //         >
    //           <option value="">Select an item</option>
    //           {menuData.menu[selectedCategory][selectedSubCategory]?.map((item) => (
    //             <option key={item.id} value={item.id}>
    //               {item.name} - ${item.price}
    //             </option>
    //           ))}
    //         </select>
    //       </label>
    //       <label>
    //         Quantity:
    //         <input
    //           type="number"
    //           value={quantity}
    //           min="1"
    //           onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
    //         />
    //       </label>
    //       <button onClick={handleAddItem}>Add Item</button>
    //     </div>
    //   </div>
    //   <div className="bill-details">
    //     <h3>Bill Details</h3>
    //     <ul>
    //       {bill.length > 0 ? (
    //         bill.map((item, index) => (
    //           <li key={index}>
    //             {item.name} - ${item.price} x {item.quantity}
    //           </li>
    //         ))
    //       ) : (
    //         <li>No items in the bill</li>
    //       )}
    //     </ul>
    //     <div>
    //       {selectedCategory === 'bar' && (
    //         <>
    //           <h4>Total for Non-Alcoholic Drinks: ${getTotalForSubCategory('nonAlcoholic')}</h4>
    //           <h4>Total for Alcoholic Drinks: ${getTotalForSubCategory('alcoholic')}</h4>
    //         </>
    //       )}
    //       <h4>Total Amount: ${totalAmount}</h4>
    //     </div>
    //     <button onClick={handleCreateBill}>Create Bill</button>
    //   </div>
    // </div>
    
  );
};

export default BillWorkspace;
