import React from 'react';
import LocationIntro from './location-intro/LocationIntro';
import LocationGallery from './location-gallery/LocationGallery';
import LocationMap from './location-map/LocationMap';
import LocationPlaces from './location-places/LocationPlaces';
import LocationPanorama from './location-panorama/LocationPanorama';

export interface ILocationComponent {}

const LocationComponent: React.FC<ILocationComponent> = () => {
    return (
        <>
            <LocationIntro />
            <LocationGallery />
            <LocationMap />
            <LocationPlaces />
            <LocationPanorama />
        </>
    );
};

export default LocationComponent;
