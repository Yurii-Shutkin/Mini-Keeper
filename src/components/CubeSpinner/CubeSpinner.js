import React from 'react';
import './CubeSpinner.css';

const CubeSpinner = () => {
  return (
    <div className="cube-spinner">
      <div className="cube">
        <div className="side cube-front"></div>
        <div className="side cube-back"></div>
        <div className="side cube-left"></div>
        <div className="side cube-right"></div>
        <div className="side cube-top"></div>
        <div className="side cube-bottom"></div>
      </div>
    </div>
  );
};

export default CubeSpinner;
