import React from 'react';

import './css/ProgressCircle.css';

const ProgressCircle = (props) => {
  const { percentage, circleWidth, radius } = props;
  let { textSize, lineWidth } = props;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  if (textSize === undefined) textSize = '48px';
  if (lineWidth === undefined) lineWidth = '15px';
  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          className='circle-background'
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={lineWidth}
          r={radius}
        />
        <circle
          className='circle-progress'
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={lineWidth}
          r={radius}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text fontSize={textSize} className='circle-text' x='50%' y='50%' dy='.3em' textAnchor='middle'>
          {`${percentage}%`}
        </text>
      </svg>
    </div>
  );
};

export default ProgressCircle;
