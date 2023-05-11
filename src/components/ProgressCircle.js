import React from 'react';

const ProgressCircle = ({ progress }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashOffset = circumference - progress / 100 * circumference;

  return (
    <svg width="120" height="120">
      <circle
        stroke="lightgray"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
        strokeWidth="10"
      />
      <circle
        stroke="blue"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashOffset}
        style={{transform: 'rotate(-90deg)', transformOrigin: 'center'}}
      />
    </svg>
  );
};

export default ProgressCircle;
