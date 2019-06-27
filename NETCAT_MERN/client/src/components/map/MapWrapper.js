import React, { useState } from 'react';
import MyMap from './MyMap';
import API_KEY from './config';

export default ({ events, center, zoom }) => {
  const [markerId, setId] = useState('');

  return (
    <MyMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      events={events}
      markerId={markerId}
      setId={setId}
      center={center}
      zoom={zoom}
    />
  );
};
