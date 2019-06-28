import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const FeaturedEvent = ({
  event: { _id, title, description },
  image,
  toggleModalDisplay
}) => {
  return (
    <Fragment>
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
              <h4 className='card-title'>{title}</h4>
              <p className='card-text limited-text'>{description}</p>
              <Link
                to={`/details/${_id}?featured=true`}
                className='btn btn-danger'
              >
                Read more!
              </Link>
              <button
                id='myBtn'
                onClick={() => toggleModalDisplay()}
                className='btn btn-danger float-right'
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
    </Fragment>
  );
};

export default FeaturedEvent;
