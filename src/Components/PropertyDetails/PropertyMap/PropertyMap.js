// import React, {useState} from 'react';
// import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
//
// export const PropertyMap = ({latitude, longitude}) => {
//     const mapContainerStyle = {
//         width: '100vw',
//         height: '100vh',
//     };
//     const center = {
//         lat: parseFloat(latitude), // default latitude
//         lng: parseFloat(longitude), // default longitude
//     };
//
//     const {isLoaded, loadError} = useLoadScript({
//         googleMapsApiKey: 'AIzaSyC_dT6yg1hbjr80oAxTphcIVbv_X5xe2BE'
//     });
//
//     if (loadError) {
//         return <div>Error loading maps</div>;
//     }
//
//     if (!isLoaded) {
//         return <div>Loading maps</div>;
//     }
//
//     return (
//         <>
//         <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             zoom={15}
//             center={center}
//         >
//             <Marker
//                 position={markerPosition}
//                 onClick={() => setInfoWindowOpen(true)}
//             />
//             {infoWindowOpen && (
//                 <InfoWindow
//                     position={markerPosition}
//                     onCloseClick={() => setInfoWindowOpen(false)}
//                 >
//                     <div>
//                         <h2>Marker Info</h2>
//                         <p>This is the info window content.</p>
//                     </div>
//                 </InfoWindow>
//             )}
//         </GoogleMap>
//         </>
//     );
// }

import React, { useState, useEffect } from 'react';

export const PropertyMap = ({ latitude, longitude }) => {
 const [mapLoaded, setMapLoaded] = useState(false);
//
//     useEffect(() => {
//         // Dynamically load Google Maps API script
//         const script = document.createElement('script');
//         script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC_dT6yg1hbjr80oAxTphcIVbv_X5xe2BE&libraries=places`;
//         script.async = true;
//         script.onload = () => setMapLoaded(true);
//         document.body.appendChild(script);
//
//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);
//
//     useEffect(() => {
//         if (mapLoaded) {
//             initMap_AdvancedMarkerElement();
//         }
//     }, [mapLoaded]);
//
//     const initMap_AdvancedMarkerElement = async () => {
//         const myLatLng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
//         const map = new window.google.maps.Map(document.getElementById("AdvancedMarker_MAP"), {
//             zoom: 4,
//             center: myLatLng,
//             disableDefaultUI: true,
//             mapId: "DEMO_MAP_ID",
//         });
//
//         // const marker = new window.google.maps.Marker({
//         //     position: myLatLng,
//         //     map: map,
//         //     title: "Uluru",
//         // });
//
//
//         new window.google.maps.Marker({
//             position: myLatLng,
//             map: map,
//             title: "Australia", // Set the title here
//         });
//     };
//
//     return (
//         <div id="AdvancedMarker_MAP" style={{ width: '100%', height: '800px' }}>
//             {/* Map will be rendered here */}
//         </div>
//     );
// };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC_dT6yg1hbjr80oAxTphcIVbv_X5xe2BE&libraries=places`;
        script.async = true;
        script.onload = () => setMapLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (mapLoaded) {
            initMap();
        }
    }, [mapLoaded]);

    const initMap = () => {
        if (!window.google || !window.google.maps || !window.google.maps.marker || !window.google.maps.marker.AdvancedMarkerElement) {
            console.error('Google Maps API or AdvancedMarkerElement not available.');
            return;
        }

        const myLatLng = { lat: -25.363, lng: 131.044 };
        const map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: myLatLng,

        });

        // Create advanced marker
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: myLatLng,
            map: map,
            title: "Hello World!"
        });
    };

    return (
        <div id="map" style={{ width: '100%', height: '400px' }}>
            {/* Map will be rendered here */}
        </div>
    );
};

export default PropertyMap;

