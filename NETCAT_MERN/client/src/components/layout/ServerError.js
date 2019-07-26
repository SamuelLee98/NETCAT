import React from 'react';

const ServerError = () => {
  return (
    <div className='container my-4' style={{ minHeight: '300px' }}>
      <h1 className='x-large text-center'>
        <i className='fa fa-exclamation-triangle' /> Server Error 500
      </h1>
      <p className='large text-center'>
        Internal server error. Please refresh this page.
      </p>
    </div>
  );
};

export default ServerError;
