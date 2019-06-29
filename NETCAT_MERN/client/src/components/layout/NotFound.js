import React from 'react';

const NotFound = () => {
  return (
    <div className='container my-4' style={{ minHeight: '300px' }}>
      <h1 className='x-large text-center'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='large text-center'>Sorry, this page does not exist</p>
    </div>
  );
};

export default NotFound;
