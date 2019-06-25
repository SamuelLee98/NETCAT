import React from 'react';

const ICON =
  'm12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z';

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

const size = 30;

const Pin = ({ onClick }) => {
  return (
    <svg
      height={size}
      viewBox='0 0 24 24'
      style={{
        ...pinStyle,
        transform: `translate(${-size / 2}px,${-size}px)`
      }}
      onClick={onClick}
    >
      <path d={ICON} />
    </svg>
  );
};

export default Pin;
