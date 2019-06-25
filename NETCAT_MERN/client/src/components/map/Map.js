import React, { useState } from 'react';
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl';

import Pin from './Pin';
import PinInfo from './PinInfo';

const TOKEN =
  'pk.eyJ1IjoiYW1zdHFxIiwiYSI6ImNqbHgyMW1hNDA1eXgza3I1Y3NrdTc4M2oifQ.aJBp9yymYOyRAlTFKLK6Vg';

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const initialViewport = {
  latitude: 34.02176870202642,
  longitude: -118.28651879471587,
  zoom: 14.842097014550346,
  bearing: 0,
  pitch: 0
};

export default ({ events }) => {
  // Initial map settings
  const [viewport, updateViewport] = useState(initialViewport);

  const [popupInfo, setPopupInfo] = useState(null);

  // Specify how markers are rendered
  const renderCityMarker = event => {
    return (
      <Marker
        key={event._id}
        longitude={event.location.longitude}
        latitude={event.location.latitude}
      >
        <Pin onClick={() => setPopupInfo(event)} />
      </Marker>
    );
  };

  const renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor='top'
          longitude={popupInfo.location.longitude}
          latitude={popupInfo.location.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <PinInfo event={popupInfo} />
        </Popup>
      )
    );
  };

  return (
    <MapGL
      {...viewport}
      width='100%'
      height='100%'
      mapStyle='mapbox://styles/mapbox/streets-v11'
      onViewportChange={v => updateViewport(v)}
      mapboxApiAccessToken={TOKEN}
    >
      {events.map(event => renderCityMarker(event))}
      {renderPopup()}
      <div className='fullscreen' style={fullscreenControlStyle}>
        <FullscreenControl />
      </div>
      <div className='nav' style={navStyle}>
        <NavigationControl />
      </div>
    </MapGL>
  );
};
