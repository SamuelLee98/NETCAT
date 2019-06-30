import React from 'react';
import { Link } from 'react-router-dom';
import AddToCalendar from 'react-add-to-calendar';

const FeaturedEvent = ({ event, image, openModal }) => {
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
            <div className='row justify-content-center'>
              <Link
                to={`/details/${event._id}?featured=true`}
                className='btn btn-danger btn-block m-1'
              >
                Read more!
              </Link>
              <div className='w-100' />
              <button
                onClick={() => {
                  openModal(true, event._id);
                }}
                className='btn btn-danger btn-block m-1'
              >
                Share
              </button>
              <div className='w-100' />
              <button
                className='btn btn-danger btn-block m-1'
                style={{
                  paddingLeft: '0',
                  paddingRight: '0'
                }}
              >
                <AddToCalendar
                  event={{
                    title: event.title,
                    description: event.description,
                    location: event.location.address,
                    startTime: event.date.from,
                    endTime: event.date.to
                  }}
                  buttonTemplate={{ calendar: 'left' }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;
