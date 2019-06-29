import React from 'react';
import spinner from './spinner.svg';

export default () => {
  return (
    <div
      style={{
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img
        src={spinner}
        style={{ height: '50px', width: '50px' }}
        alt='Loading'
      />
    </div>
  );
};
