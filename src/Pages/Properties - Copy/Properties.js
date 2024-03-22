import {PropertyCard} from "../../Components/PropertyCard/PropertyCard";
import React, {useState, useEffect} from 'react';
import './style.css'

const Properties = () => {
    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchQueryString, setSearchQueryString] = useState();


    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            // const dummy =''
            try {
                const response = await fetch(
                    `https://api.repliers.io/listings?fields=mlsNumber%2ClistPrice%2ClistDate%2Caddress.area%2Caddress.zip%2Caddress.streetNumber%2Caddress.streetName%2Caddress.city%2Caddress.state%2Cimages%2Cdetails.numBedrooms%2Cdetails.numBedroomsPlus%2Cdetails.numBathrooms%2Cdetails.propertyType%2Cdetails.yearBuilt%2Coffice.brokerageName&listings=true&operator=AND&sortBy=updatedOnDesc&status=A&pageNum=${page}&resultsPerPage=20&${searchQueryString}`,
                    {
                        headers: {
                            'REPLIERS-API-KEY': 'SOKZY30CjwBkm0aPvuYZWA8vjmKv4x'
                        }
                    }
                );
                const data = await response.json();

                if (page === 1) {
                    setListings(data.listings);
                } else {
                    setListings((prevListings) => [...prevListings, ...data.listings]);
                }
                if (data.listings.length === 0 && page === 1) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
            setLoading(false);
        };

        fetchListings();
    }, [page, searchQuery]); // Include searchQuery as dependency

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            if (!loading && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;

        setSearchQuery(value);
        // setSearchQueryString(value.length > 0 ? `city=${value}` : '')
        console.log('Search Query String', searchQueryString)

        setPage(1); // Reset page number when search query changes
        // Implement auto-suggestion logic here
        // For simplicity, let's assume suggestions are based on city names
        const filteredSuggestions = listings
            .map((listing) => listing.address.city)
            .filter((city) => city.toLowerCase().includes(value.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion)
        setSearchQueryString(`city=${suggestion}`);
        setSuggestions([]);
    };

    return (
        <>
            <div className={'filterBar bg-dark sticky-top py-2'}>
                <div className={'container-fluid'}>
                    <div className={'row align-items-center'}>
                        <div className={'col-lg-6'}>
                            <div className={'searchBox'}>
                                <div className={'form-group position-relative'}>
                                    <div className={'search-star'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">>
                                            <path
                                                d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"
                                                fill='#ffffff'/>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        list="browsers"
                                        className={'form-control'}
                                        placeholder="Search by city..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    {suggestions.length > 0 && (
                                        <datalist id={'browsers'}>
                                            {
                                                suggestions.map((suggestion, index) => (
                                                    <option key={index}
                                                            onClick={() => handleSuggestionClick(suggestion)}>
                                                        {suggestion}
                                                    </option>
                                                ))}
                                        </datalist>
                                    )}

                                </div>
                            </div>
                        </div>

                        <div className={'col-lg-6'}>
                            <a href="/" className={'text-white'}><u>Filter</u></a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="propertiesList py-4">
                <div className="container-fluid">
                    <div className="row">
                        {listings && listings.map((properties, index) => (
                            <div key={index} className={'col-xl-3 col-lg-4 mb-4'}>
                                <PropertyCard properties={properties}/>
                            </div>
                        ))}
                        {loading && <p>Loading...</p>}
                        {!hasMore > 1 && <p>No more listings</p>}
                    </div>
                </div>
            </div>

        </>
    );
};


export default Properties;


// import {PropertyCard} from "../../Components/PropertyCard/PropertyCard";
// import {useEffect, useState} from "react";
// import {SearchProperty} from "../../Components/SearchProperty/SearchProperty";
//
// export const Properties = () => {
//     const [allData, setAllData] = useState([]);
//     const [filteredData, setFilteredData] = useState(allData);
//     // const [loading, setLoading] = useState(false)
//
//     console.log('Before Filter', filteredData)
//
//     const handleSearch = (event) => {
//         let value = event.target.value.toLowerCase();
//         let result = [];
//         console.log("the value is", value);
//         result = allData.listings.filter((data) => {
//             return data.address.city.toLowerCase().includes(value);
//         });
//         setFilteredData({listings: result});
//         console.log('After Filter', filteredData)
//     }
//
//     useEffect(() => {
//         // setLoading(true)
//         const apiKey = process.env.REACT_APP_API_KEY
//         const apiBaseURL = process.env.REACT_APP_API_BASE_URL
//         const headers = {'REPLIERS-API-KEY': apiKey};
//         fetch(`${apiBaseURL}listings?fields=mlsNumber%2ClistPrice%2ClistDate%2Caddress.area%2Caddress.zip%2Caddress.streetNumber%2Caddress.streetName%2Caddress.city%2Caddress.state%2Cimages%2Cdetails.numBedrooms%2Cdetails.numBedroomsPlus%2Cdetails.numBathrooms%2Cdetails.propertyType%2Cdetails.yearBuilt%2Coffice.brokerageName&listings=true&operator=AND&sortBy=updatedOnDesc&status=A`, {headers})
//             .then(response => response.json())
//             .then(data => {
//                 setAllData(data);
//                 setFilteredData(data)
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);
//
//
//     return (
//         <>
//             <div className={'filterBar bg-dark sticky-top py-2'}>
//                 <div className={'container-fluid'}>
//                     <div className={'row align-items-center'}>
//                         <div className={'col-lg-6'}>
//                             {/*<input className={'form-control'} type="text" onChange={(event) => handleSearch(event)} />*/}
//                             <SearchProperty handleSearch={handleSearch}/>
//                         </div>
//
//                         <div className={'col-lg-6'}>
//                             <a href="/" className={'text-white'}><u>Filter</u></a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="propertiesList py-4">
//                 <div className="container-fluid">
//                     <div className="row">
//                         {
//                             Array.isArray(filteredData.listings) && filteredData.listings.map(property => (
//                                 <div key={property.mlsNumber} className={'col-xl-3 col-lg-4 mb-4'}>
//                                     <PropertyCard property={property}/>
//                                 </div>
//                             ))
//                         }
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
