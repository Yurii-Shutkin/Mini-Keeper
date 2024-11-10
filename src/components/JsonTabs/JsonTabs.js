import React, { useState } from 'react';
import './JsonTabs.css';

const JsonTabs = ({ data, depth = 0, array, fn }) => {
  
  const [selectedKey, setSelectedKey] = useState(null);

  const addToOrder = (newFood, func) => {
      if (array.find(food => food.id === newFood.id)) {
          func(
              array.map((item) =>
                  item.id !== newFood.id
                      ? item
                      : {
                            ...item,
                            quantity: item.quantity + 1,
                        }
              )
          )
      } else {
          func([...array, newFood])
      }
  }

  const onClickTabHandle = (obj) => {
      addToOrder(obj, fn)
  }
  
  if (typeof data !== 'object' || data === null) {
    return <div>{String(data)}</div>;
  } 
  if (Array.isArray(data)) {
    return data.map((d) => {
      return (
        <div 
          className='tab-sub'
          key={d.id}
          onClick={() => onClickTabHandle(d)}
        >
          {'*' + d.name}
        </div>
      )
    })
  }

  const handleTabClick = (key) => {
    setSelectedKey(key === selectedKey ? null : key);
  };

  return (
    <div style={{ marginLeft: depth * 10 }}>
      {Object.keys(data).map((key) => (
        <div key={key}>
          <div
            className='tab-main'
            onClick={() => handleTabClick(key)}
            style={{ cursor: 'pointer', fontWeight: selectedKey === key ? 'bold' : 'normal' }}
          >
            {key}
          </div>
          {selectedKey === key && (
            <div style={{ paddingLeft: 10 }}>
              <JsonTabs data={data[key]} depth={depth} array={array} fn={fn} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JsonTabs;
