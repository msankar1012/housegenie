import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {PropertyMap} from "../../Components/PropertyDetails/PropertyMap/PropertyMap";

const SingleProperty = () => {
    const {mlsNumber} = useParams();
    const [property, setProperty] = useState(null);

        useEffect(() => {
        // setLoading(true)
        const apiBaseURL = process.env.REACT_APP_API_BASE_URL
        const headers = {'REPLIERS-API-KEY': process.env.REACT_APP_API_KEY};
        fetch(`${apiBaseURL}/listings/${mlsNumber}`, {headers})
            .then(response => response.json())
            .then(data => setProperty(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [mlsNumber]);

    console.log('Single Property', property)

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div className={'row'}>
            <div className={'col-lg-6'}>
                <PropertyMap latitude={property.map.latitude} longitude={property.map.longitude}  />
            </div>

            <div className={'col-lg-6'}>
                as werbew
            </div>
        </div>

    );
}

export default SingleProperty;