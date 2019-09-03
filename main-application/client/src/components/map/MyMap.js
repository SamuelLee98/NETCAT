/* global google */
import React, { Fragment, useState, useEffect, useRef } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import InfoCard from './InfoCard';

const MyMap = withScriptjs(
  withGoogleMap(({ events, center, zoom, clickedEventId }) => {
    const [mapEventsArrays, setMapEventsArrays] = useState([]);
    const [markerId, setId] = useState('');
    const [mapBounds, setMapBounds] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
      let mapEventsArrays = [];
      // Marker bounds
      const bounds = new google.maps.LatLngBounds();

      if (events.length !== 0) {
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
          // Also extend to bounds
          bounds.extend(
            new google.maps.LatLng(
              event.location.latitude,
              event.location.longitude
            )
          );
        });
        setMapEventsArrays(mapEventsArrays);
        setMapBounds(bounds);
      }
    }, [events]);

    useEffect(() => {
      if (mapRef !== null && mapBounds !== null) {
        mapRef.current.fitBounds(mapBounds);
      }
    }, [mapRef, mapBounds]);

    // If event card is clicked
    useEffect(() => {
      let found = false;
      const bounds = new google.maps.LatLngBounds();

      if (mapEventsArrays !== null && mapRef !== null && mapBounds !== null) {
        if (clickedEventId !== null) {
          mapEventsArrays.forEach(mapEventsArray => {
            mapEventsArray.forEach(mapEvent => {
              if (mapEvent._id === clickedEventId) {
                setId(mapEventsArray[0]._id);
                found = true;
                bounds.extend(
                  new google.maps.LatLng(
                    mapEvent.location.latitude,
                    mapEvent.location.longitude
                  )
                );
                if (mapRef !== null && mapBounds !== null)
                  mapRef.current.fitBounds(bounds);
                return;
              }
            });
            if (found) return;
          });
        }

        if (!found) {
          setId(null);
          mapRef.current.fitBounds(mapBounds);
        }
      }
    }, [clickedEventId]);

    return (
      <GoogleMap defaultZoom={zoom} defaultCenter={center} ref={mapRef}>
        {mapEventsArrays.map(mapEventArray => {
          // Use first element of each arr to populate marker
          const firstMapEvent = mapEventArray[0];

          return (
            <Marker
              key={firstMapEvent._id}
              position={{
                lat: firstMapEvent.location.latitude,
                lng: firstMapEvent.location.longitude
              }}
              animation={google.maps.Animation.DROP}
              onClick={() => setId(firstMapEvent._id)}
            >
              {firstMapEvent._id === markerId && (
                <InfoWindow onCloseClick={() => setId('')}>
                  <Fragment>
                    {mapEventArray.map(event => (
                      <Fragment key={event._id}>
                        <InfoCard event={event} />
                      </Fragment>
                    ))}
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
