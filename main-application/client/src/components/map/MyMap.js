import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import Moment from 'react-moment';

const MyMap = withScriptjs(
  withGoogleMap(({ events, markerId, setId, center, zoom }) => {
    let mapEventsArrays = [];

    events.forEach(event => {
      // If event does not contain lat lng values, ignore
      if (!event.location.latitude || !event.location.longitude) return;

      // Compare the coordinate of current event with the first event inside
      // each of the nested array of mapEventsArrays
      for (let i = 0; i < mapEventsArrays.length; i++) {
        const { latitude, longitude } = mapEventsArrays[i][0].location;

        // If coordinates match
        if (
          event.location.latitude === latitude &&
          event.location.longitude === longitude
        ) {
          mapEventsArrays[i].push(event);
          return;
        }
      }

      // If coordinates not found
      mapEventsArrays.push([event]);
    });

    return (
      <GoogleMap defaultZoom={zoom} defaultCenter={center}>
        {mapEventsArrays.map(mapEventArray => {
          // Use first element of each arr to populate marker with lat & lng
          const firstMapEvent = mapEventArray[0];

          return (
            <Marker
              key={firstMapEvent._id}
              position={{
                lat: firstMapEvent.location.latitude,
                lng: firstMapEvent.location.longitude
              }}
              onClick={() => setId(firstMapEvent._id)}
            >
              {firstMapEvent._id === markerId && (
                <InfoWindow onCloseClick={() => setId('')}>
                  <Fragment>
                    {mapEventArray.map(
                      ({
                        _id,
                        location: { room, address },
                        title,
                        date: { multiDay, from, to },
                        featured
                      }) => (
                        <Fragment key={_id}>
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
                              <Moment format='dddd, MMMM D, YYYY'>
                                {from}
                              </Moment>
                              <br />
                              {room}
                              <br />
                              <br />
                              <Link
                                to={
                                  featured
                                    ? `/details/${_id}?featured=true`
                                    : `/details/${_id}`
                                }
                                className='btn btn-danger'
                              >
                                Check it out!
                              </Link>
                            </div>
                          </div>
                          <hr />
                        </Fragment>
                      )
                    )}
                  </Fragment>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
    );
  })
);

export default MyMap;
