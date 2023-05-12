import React from 'react';

import './css/ProgressCircle.css';

const ProgressCircle = (props) => {
  const { percentage, circleWidth, max } = props;
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  const backDashOffset = dashArray - (dashArray * max) / 100;

  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        {/* <circle
          className='circle-background'
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={"15px"}
          r={radius}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: backDashOffset,
          }}
        /> */}

        <circle
          className='circle-progress'
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={"15px"}
          r={radius}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          className='circle-text'
          x='50%'
          y='50%'
          dy='.3em'
          textAnchor='middle'
        >
          {`${percentage}%`}
        </text>
      </svg>
    </div>
  );
};

export default ProgressCircle;
