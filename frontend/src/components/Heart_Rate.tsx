// EKG.js
import React from 'react';
import './EKG.css';

const EKG = () => {
  return (
    <svg
      className="ekg-animation"
      width="300"
      height="100"
      viewBox="0 0 100 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,25 L10,25 L20,15 L30,35 L40,25 L60,25 L70,15 L80,35 L90,25 L100,25"
        fill="none"
        stroke="red"
        strokeWidth="2"
      />
    </svg>
  );
};

export default EKG;
