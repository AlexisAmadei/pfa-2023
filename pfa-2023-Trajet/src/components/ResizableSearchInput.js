import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizableSearchInput = () => {
  const [width, setWidth] = useState(200);
  const [focused, setFocused] = useState(false);

  const handleResize = (event, { element, size }) => {
    setWidth(size.width);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <Resizable
      width={width}
      height={30}
      onResize={handleResize}
      resizeHandles={['e']}
      minConstraints={[200, 30]}
      maxConstraints={[focused ? 500 : width, 30]}
    >
      <div
        style={{
          width: `${width}px`,
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          border: '1px solid #ccc',
        }}
      >
        <input
          type="search"
          placeholder="Search..."
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </Resizable>
  );
};

export default ResizableSearchInput;
