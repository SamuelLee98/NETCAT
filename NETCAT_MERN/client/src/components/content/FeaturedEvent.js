import React, { Fragment } from 'react';

const FeaturedEvent = ({ event: { title, description }, image }) => {
  return (
    <Fragment>
      <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-3'>
        <div className='card'>
          <img
            src={image}
            id='featured-thumbnail1'
            className='img-responsive card-img-top'
            alt='Responsive Thumbnail'
          />
          <div className='card-body'>
            <h4 className='card-title'>{title}</h4>
            <p className='card-text'>{description}</p>
            <a href='details.html' className='btn btn-danger'>
              Check it out!
            </a>
          </div>
        </div>
      </div>
      <br />
    </Fragment>
  );
};

export default FeaturedEvent;
