import React, { useState } from 'react';
import MyMap from './MyMap';

export default ({ events }) => {
  const [markerId, setId] = useState('');

  return (
    <MyMap
      googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyA7rjOUZ8hZCOIJjEjBuEuQyXQBM-TkCFo&v=3.exp&libraries=geometry,drawing,places'
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      events={events}
      markerId={markerId}
      setId={setId}
    />
  );
};
