import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card } from "@mui/material";

const containerStyle = {
  width: '100%',
  height: '540px',
};

const center = {
  lat: 24.568229,
  lng: -81.796759,
};

const googleMapsApiKey = "AIzaSyAcnF_4nDqKp5bkFr7VYfE-n5anAnZDYIE";

// Corrected to destructure onWaypointsChange from props
const WelcomeMark = ({ onWaypointsChange, userPos }) => {
  const [waypoints, setWaypoints] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const mapRef = useRef(null);
  const initialCenter = userPos.lat && userPos.lon ? { lat: parseFloat(userPos.lat), lng: parseFloat(userPos.lon) } : center;

  const onMapClick = (event) => {
    const newWaypoint = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      order: waypoints.length + 1,
    };
    const newWaypoints = [...waypoints, newWaypoint]; // Corrected to use a new variable for the updated waypoints
    setWaypoints(newWaypoints);
    if(onWaypointsChange) onWaypointsChange(newWaypoints); // Correctly check if onWaypointsChange is provided before calling it
  };

  const onMarkerClick = (orderToRemove) => {
    const updatedWaypoints = waypoints.filter(waypoint => waypoint.order !== orderToRemove)
                                       .map((waypoint, index) => ({ ...waypoint, order: index + 1 }));
    setWaypoints(updatedWaypoints);
    if(onWaypointsChange) onWaypointsChange(updatedWaypoints);
  };

  useEffect(() => {
    if (userPos.lat && userPos.lon) {
      // Optionally, add the user's position as an initial waypoint
      setWaypoints([{ lat: parseFloat(userPos.lat), lng: parseFloat(userPos.lon), order: 1 }]);
    }
  }, [userPos]);

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => handleFullScreenChange());
    return () => document.removeEventListener('fullscreenchange', () => handleFullScreenChange());
  }, []);

  useEffect(() => {
    if (onWaypointsChange) onWaypointsChange(waypoints);
  }, [waypoints, onWaypointsChange]);

  const handleFullScreenChange = () => {
    const isMapFullScreen = document.fullscreenElement === mapRef.current;
    setIsFullScreen(isMapFullScreen);
  };

  return (
    <>
      <button onClick={() => setIsFullScreen(!isFullScreen)}>Toggle Full Screen</button>
      <Card ref={mapRef} sx={{ height: "500px", py: "32px", position: "relative" }}>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={onMapClick}
          >
            {waypoints.map((waypoint, index) => (
              <Marker key={index}
                position={{ lat: waypoint.lat, lng: waypoint.lng }}
                label={waypoint.order.toString()}
                onClick={() => onMarkerClick(waypoint.order)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </Card>
      {isFullScreen && (
        <input type="text" style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          width: '200px',
        }} placeholder="Enter waypoint name" />
      )}
    </>
  );
};

export default WelcomeMark;
