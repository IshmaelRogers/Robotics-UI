import React, {useState, useEffect,useRef} from 'react';
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

const googleMapsApiKey = "AIzaSyAcnF_4nDqKp5bkFr7VYfE-n5anAnZDYIE&libraries=geometry&callback=initMap";

const WelcomeMark = () => {
  const [markers, setMarkers] = useState([]);
  const [waypoints, setWaypoints] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const mapRef = useRef(null);

  const onMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      order: markers.length + 1,
    };
    setMarkers(current => [...current, newMarker]);
  };

  useEffect(() => {
    // Update waypoints object whenever markers array changes
    const newWaypoints = markers.reduce((acc, marker) => {
      acc[`waypoint${marker.order}`] = { lat: marker.lat, lng: marker.lng };
      return acc;
    }, {});
    setWaypoints(newWaypoints);
  }, [markers]);

  useEffect(() => {
    // Debugging: Log the full screen state
    const handleFullScreenChange = () => {
      const isMapFullScreen = document.fullscreenElement === mapRef.current;
      console.log("Is Full Screen:", isMapFullScreen); // Debug log
      setIsFullScreen(isMapFullScreen);
    };
  
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const toggleFullScreenDebug = () => setIsFullScreen(!isFullScreen); // Add this function

  

  // Function to remove a marker based on its order
  const onMarkerClick = (orderToRemove) => {
    setMarkers(current =>
      current
        .filter(marker => marker.order !== orderToRemove)
        .map((marker, index) => ({ ...marker, order: index + 1 })) // Reassign order to remaining markers
    );
  };


  return (
    <> <button onClick={toggleFullScreenDebug}>Toggle Full Screen Debug</button> {/* Temporary Button */}
      <Card ref={mapRef} sx={{ height: "500px", py: "32px", position: "relative" }}>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={onMapClick}
          >
            {markers.map((marker, index) => (
              <Marker key={index} 
                position={{ lat: marker.lat, lng: marker.lng }} 
                label={marker.order.toString()}
                onClick={() => onMarkerClick(marker.order)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </Card>
      {isFullScreen && (
        <input type="text" style={{
          position: 'relative',
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


