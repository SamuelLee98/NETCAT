import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import Moment from 'react-moment';

const MyMap = withScriptjs(
  withGoogleMap(({ events, markerId, setId }) => (
    <GoogleMap
      defaultZoom={15.3}
      defaultCenter={{ lat: 34.021, lng: -118.286 }}
    >
      {events.map(
        ({
          _id,
          location: { latitude, longitude },
          title,
          date: { multiDay, from, to },
          location: { room, address }
        }) => (
          <Marker
            key={_id}
            position={{
              lat: latitude,
              lng: longitude
            }}
            onClick={() => setId(_id)}
          >
            {_id === markerId && (
              <InfoWindow onCloseClick={() => setId('')}>
                <div
                  className='moreEvents card mx-2'
                  style={{
                    padding: '0px',
                    border: 'none',
                    maxWidth: '300px'
                  }}
                >
                  <div className='card-body'>
                    <h5 className='card-title'>{title}</h5>
                    <Moment format='hh:mm A'>{from}</Moment> -{` `}
                    <Moment format='hh:mm A'>{to}</Moment>
                    <br />
                    <Moment format='dddd, MMMM D, YYYY'>{from}</Moment>
                    <br />
                    {room}
                    <br />
                    <br />
                    <a href='details.html' className='btn btn-danger'>
                      Check it out!
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )
      )}
    </GoogleMap>
  ))
);

export default MyMap;
