import React from 'react';
import MyMap from './MyMap';
import API_KEY from '../../utils/config';

import './Map.css';

export default ({ events, center, zoom, clickedEventId }) => {
  return (
    <MyMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      events={events}
      center={
        center.lat === null || center.lng === null
          ? { lat: 34.021, lng: 118.286 }
          : center
      }
      zoom={zoom}
      clickedEventId={clickedEventId}
    />
  );
};
