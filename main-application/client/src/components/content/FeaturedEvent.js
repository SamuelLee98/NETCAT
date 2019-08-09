import React from 'react';
import CardButtons from '../layout/CardButtons';

const FeaturedEvent = ({ event, image }) => {
  return (
    <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-3'>
      <div className='card'>
        <img
          src={image}
          id='featured-thumbnail1'
          className='card-img-top img-fluid'
          alt='Responsive Thumbnail'
        />
        <div className='card-block'>
          <div className='card-body'>
            <h4 className='card-title'>{event.title}</h4>
            <p className='card-text limited-text'>{event.description}</p>
            <CardButtons
              eventId={event._id}
              isCatalogued={event.isCatalogued}
              page='content'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;
