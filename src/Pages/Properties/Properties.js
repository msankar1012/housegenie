// import { PropertyCard } from "../../Components/PropertyCard/PropertyCard";
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
//
// import './style.css'
//
// const Properties = () => {
//     const [listings, setListings] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [searchQueryString, setSearchQueryString] = useState('');
//     const [urlString, setUrlString] = useState('');
//
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//    // const urlString = queryParams.get('searchString')
//
//     useEffect(() => {
//         if (urlString && !searchQuery) {
//             setSearchQuery(urlString);
//             setSearchQueryString(urlString.length > 0 ? `city=${urlString}` : '');
//         }
//     }, [urlString, searchQuery]);
//
//     useEffect(() => {
//         console.log('String URL', urlString);
//
//         const fetchListings = async () => {
//             setLoading(true);
//
//             try {
//                 const response = await fetch(
//                     `https://api.repliers.io/listings?fields=mlsNumber%2ClistPrice%2ClistDate%2Caddress.area%2Caddress.zip%2Caddress.streetNumber%2Caddress.streetName%2Caddress.city%2Caddress.state%2Cimages%2Cdetails.numBedrooms%2Cdetails.numBedroomsPlus%2Cdetails.numBathrooms%2Cdetails.propertyType%2Cdetails.yearBuilt%2Coffice.brokerageName&listings=true&operator=AND&sortBy=updatedOnDesc&status=A&pageNum=${page}&resultsPerPage=20&${searchQueryString}`,
//                     {
//                         headers: {
//                             'REPLIERS-API-KEY': 'SOKZY30CjwBkm0aPvuYZWA8vjmKv4x'
//                         }
//                     }
//                 );
//                 const data = await response.json();
//
//                 if (page === 1) {
//                     setListings(data.listings);
//                 } else {
//                     setListings((prevListings) => [...prevListings, ...data.listings]);
//                 }
//                 if (data.listings.length === 0 && page === 1) {
//                     setHasMore(false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching listings:', error);
//             }
//             setLoading(false);
//         };
//
//         fetchListings();
//     }, [page, searchQuery, searchQueryString]);
//
//     const handleScroll = () => {
//         if (
//             window.innerHeight + document.documentElement.scrollTop ===
//             document.documentElement.offsetHeight
//         ) {
//             if (!loading && hasMore) {
//                 setPage((prevPage) => prevPage + 1);
//             }
//         }
//     };
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//
//     const handleSearchChange = (event) => {
//         const value = event.target.value;
//
//         // Clear urlString when the user types in the input box
//         setSearchQueryString('');
//         setSearchQuery(value);
//         setSearchQueryString(value.length > 0 ? `city=${value}` : ''); // Update searchQueryString
//
//         // Clear urlString
//         setUrlString('');
//
//         setPage(1); // Reset page number when search query changes
//
//         // Implement auto-suggestion logic here
//         // For simplicity, let's assume suggestions are based on city names
//         const filteredSuggestions = listings
//             .map((listing) => listing.address.city)
//             .filter((city) => city.toLowerCase().includes(value.toLowerCase()));
//         setSuggestions(filteredSuggestions);
//     };
//
//     const handleSuggestionClick = (suggestion) => {
//         setSearchQuery(suggestion)
//         setSearchQueryString(`city=${suggestion}`);
//         setSuggestions([]);
//     };
//
//     return (
//         <>
//             <div className={'filterBar bg-dark sticky-top py-2'}>
//                 <div className={'container-fluid'}>
//                     <div className={'row align-items-center'}>
//                         <div className={'col-lg-6'}>
//                             <div className={'searchBox'}>
//                                 <div className={'form-group position-relative'}>
//                                     <div className={'search-star'}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                                             <path
//                                                 d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"
//                                                 fill='#ffffff'/>
//                                         </svg>
//                                     </div>
//                                     <input
//                                         type="text"
//                                         list="browsers"
//                                         className={'form-control'}
//                                         placeholder="Search by city..."
//                                         value={searchQuery}
//                                         onChange={handleSearchChange}
//                                     />
//                                     {suggestions.length > 0 && (
//                                         <datalist id={'browsers'}>
//                                             {suggestions.map((suggestion, index) => (
//                                                 <option key={index}
//                                                         onClick={() => handleSuggestionClick(suggestion)}>
//                                                     {suggestion}
//                                                 </option>
//                                             ))}
//                                         </datalist>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={'col-lg-6'}>
//                             <a href="/" className={'text-white'}><u>Filter</u></a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="propertiesList py-4">
//                 <div className="container-fluid">
//                     <div className="row">
//                         {listings && listings.map((properties, index) => (
//                             <div key={index} className={'col-xl-3 col-lg-4 mb-4'}>
//                                 <PropertyCard properties={properties}/>
//                             </div>
//                         ))}
//                         {loading && <p>Loading...</p>}
//                         {!hasMore > 1 && <p>No more listings</p>}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default Properties;


//  Correct Code-------------------------------------------------------------------------------
// import { PropertyCard } from "../../Components/PropertyCard/PropertyCard";
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
//
// import './style.css';
//
// const Properties = () => {
//     const [listings, setListings] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//
//     const location = useLocation();
//
//     // Function to fetch listings
//     const fetchListings = async (query) => {
//         setLoading(true);
//         try {
//             const response = await fetch(
//                 `https://api.repliers.io/listings?fields=mlsNumber%2ClistPrice%2ClistDate%2Caddress.area%2Caddress.zip%2Caddress.streetNumber%2Caddress.streetName%2Caddress.city%2Caddress.state%2Cimages%2Cdetails.numBedrooms%2Cdetails.numBedroomsPlus%2Cdetails.numBathrooms%2Cdetails.propertyType%2Cdetails.yearBuilt%2Coffice.brokerageName&listings=true&operator=AND&sortBy=updatedOnDesc&status=A&pageNum=${page}&resultsPerPage=20&city=${query}`,
//                 {
//                     headers: {
//                         'REPLIERS-API-KEY': 'SOKZY30CjwBkm0aPvuYZWA8vjmKv4x'
//                     }
//                 }
//             );
//             const data = await response.json();
//
//             if (page === 1) {
//                 setListings(data.listings);
//             } else {
//                 setListings((prevListings) => [...prevListings, ...data.listings]);
//             }
//             if (data.listings.length === 0 && page === 1) {
//                 setHasMore(false);
//             }
//         } catch (error) {
//             console.error('Error fetching listings:', error);
//         }
//         setLoading(false);
//     };
//
//     // Fetch listings on component mount and when searchQuery changes
//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const queryString = queryParams.get('searchString');
//         if (queryString) {
//             setSearchQuery(queryString);
//             setPage(1); // Reset page number
//             fetchListings(queryString); // Fetch listings based on search query
//         } else {
//             setSearchQuery('');
//             fetchListings(''); // Fetch listings without any search query
//         }
//     }, [location.search]);
//
//     const handleScroll = () => {
//         if (
//             window.innerHeight + document.documentElement.scrollTop ===
//             document.documentElement.offsetHeight
//         ) {
//             if (!loading && hasMore) {
//                 setPage((prevPage) => prevPage + 1);
//             }
//         }
//     };
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//
//     const handleSearchChange = (event) => {
//         const value = event.target.value;
//         setSearchQuery(value);
//         setPage(1); // Reset page number
//         fetchListings(value); // Fetch listings based on new search query
//     };
//
//     // handleSuggestionClick remains the same
//
//     const filteredListings = listings.filter(listing =>
//         listing.address.city.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     return (
//         <>
//             <div className={'filterBar bg-dark sticky-top py-2'}>
//                 <div className={'container-fluid'}>
//                     <div className={'row align-items-center'}>
//                         <div className={'col-lg-6'}>
//                             <div className={'searchBox'}>
//                                 <div className={'form-group position-relative'}>
//                                     <div className={'search-star'}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">>
//                                             <path
//                                                 d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"
//                                                 fill='#ffffff'/>
//                                         </svg>
//                                     </div>
//                                     <input
//                                         type="text"
//                                         list="browsers"
//                                         className={'form-control'}
//                                         placeholder="Search by city..."
//                                         value={searchQuery}
//                                         onChange={handleSearchChange}
//                                     />
//                                     {/* Suggestions logic can be added here */}
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className={'col-lg-6'}>
//                             <a href="/" className={'text-white'}><u>Filter</u></a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//
//             <div className="propertiesList py-4">
//                 <div className="container-fluid">
//                     <div className="row">
//                         {filteredListings.length > 0 ? (
//                             filteredListings.map((properties, index) => (
//                                 <div key={index} className={'col-xl-3 col-lg-4 mb-4'}>
//                                     <PropertyCard properties={properties}/>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No listings found</p>
//                         )}
//                         {loading && <p>Loading...</p>}
//                         {!hasMore && <p>No more listings</p>}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default Properties;


// import { PropertyCard } from "../../Components/PropertyCard/PropertyCard";
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
//
// import './style.css'
//
// const Properties = () => {
//     const [listings, setListings] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [searchQueryString, setSearchQueryString] = useState('');
//     const [initialQueryString, setInitialQueryString] = useState('');
//
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//
//     useEffect(() => {
//         const queryString = queryParams.get('searchString');
//
//         console.log('INtial Query', initialQueryString)
//         console.log('Search Query', searchQuery)
//
//         if (queryString && !searchQuery) {
//             setSearchQuery(queryString);
//             setSearchQueryString(queryString.length > 0 ? `city=${queryString}` : '');
//         }
//         setInitialQueryString(queryString);
//     }, [initialQueryString, searchQuery]);
//
//     useEffect(() => {
//         const fetchListings = async () => {
//             setLoading(true);
//
//             try {
//                 const response = await fetch(
//                     `https://api.repliers.io/listings?fields=mlsNumber%2ClistPrice%2ClistDate%2Caddress.area%2Caddress.zip%2Caddress.streetNumber%2Caddress.streetName%2Caddress.city%2Caddress.state%2Cimages%2Cdetails.numBedrooms%2Cdetails.numBedroomsPlus%2Cdetails.numBathrooms%2Cdetails.propertyType%2Cdetails.yearBuilt%2Coffice.brokerageName&listings=true&operator=AND&sortBy=updatedOnDesc&status=A&pageNum=${page}&resultsPerPage=20&${searchQueryString}`,
//                     {
//                         headers: {
//                             'REPLIERS-API-KEY': 'SOKZY30CjwBkm0aPvuYZWA8vjmKv4x'
//                         }
//                     }
//                 );
//                 const data = await response.json();
//
//                 if (page === 1) {
//                     setListings(data.listings);
//                 } else {
//                     setListings((prevListings) => [...prevListings, ...data.listings]);
//                 }
//                 if (data.listings.length === 0 && page === 1) {
//                     setHasMore(false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching listings:', error);
//             }
//             setLoading(false);
//         };
//
//         fetchListings();
//     }, [page, searchQuery, searchQueryString]);
//
//     const handleScroll = () => {
//         if (
//             window.innerHeight + document.documentElement.scrollTop ===
//             document.documentElement.offsetHeight
//         ) {
//             if (!loading && hasMore) {
//                 setPage((prevPage) => prevPage + 1);
//             }
//         }
//     };
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//
//     const handleSearchChange = (event) => {
//         setInitialQueryString('')
//         const value = event.target.value;
//
//         // Update searchQuery state
//         setSearchQuery(value);
//
//         // Update searchQueryString state
//         setSearchQueryString(value.length > 0 ? `city=${value}` : '');
//
//         setPage(1); // Reset page number when search query changes
//     };
//
//     const handleSuggestionClick = (suggestion) => {
//         setSearchQuery(suggestion);
//         setSearchQueryString(`city=${suggestion}`);
//         setSuggestions([]);
//     };
//
//     const filteredListings = listings.filter(listing =>
//         listing.address.city.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//
//     return (
//         <>
//             <div className={'filterBar bg-dark sticky-top py-2'}>
//                 <div className="row">
//                     <div className={'col-lg-6'}>
//                         <div className={'searchBox'}>
//                             <div className={'form-group position-relative'}>
//                                 <div className={'search-star'}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                                         <path
//                                             d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"
//                                             fill='#ffffff'/>
//                                     </svg>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     list="browsers"
//                                     className={'form-control'}
//                                     placeholder="Search by city..."
//                                     value={searchQuery}
//                                     onChange={handleSearchChange}
//                                 />
//                                 {suggestions.length > 0 && (
//                                     <datalist id={'browsers'}>
//                                         {suggestions.map((suggestion, index) => (
//                                             <option key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                                                 {suggestion}
//                                             </option>
//                                         ))}
//                                     </datalist>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="propertiesList py-4">
//                 <div className="container-fluid">
//
//                     <div className="row">
//                         {filteredListings.length > 0 ? (
//                             filteredListings.map((properties, index) => (
//                                 <div key={index} className={'col-xl-3 col-lg-4 mb-4'}>
//                                     <PropertyCard properties={properties}/>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No listings found</p>
//                         )}
//                         {loading && <p>Loading...</p>}
//                         {!hasMore && <p>No more listings</p>}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default Properties;


// import { PropertyCard } from "../../Components/PropertyCard/PropertyCard";
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
//
// import './style.css'
//
// const Properties = () => {
//     const [listings, setListings] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [searchQueryString, setSearchQueryString] = useState('');
//     const [initialQueryString, setInitialQueryString] = useState('');
//
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//
//     useEffect(() => {
//         const queryString = queryParams.get('searchString');
//         if (initialQueryString && !searchQuery) {
//             setSearchQuery(initialQueryString);
//             setSearchQueryString(initialQueryString.length > 0 ? `city=${initialQueryString}` : '');
//         }
//         setInitialQueryString(queryString);
//     }, [location.search, searchQuery]);
//
//     useEffect(() => {
//         const fetchListings = async () => {
//             setLoading(true);
//
//             try {
//                 const response = await fetch(
//                     `https://api.repliers.io/listings?fields=mlsNumber%2ClistPrice%2ClistDate%2Caddress.area%2Caddress.zip%2Caddress.streetNumber%2Caddress.streetName%2Caddress.city%2Caddress.state%2Cimages%2Cdetails.numBedrooms%2Cdetails.numBedroomsPlus%2Cdetails.numBathrooms%2Cdetails.propertyType%2Cdetails.yearBuilt%2Coffice.brokerageName&listings=true&operator=AND&sortBy=updatedOnDesc&status=A&pageNum=${page}&resultsPerPage=20&${searchQueryString}`,
//                     {
//                         headers: {
//                             'REPLIERS-API-KEY': 'SOKZY30CjwBkm0aPvuYZWA8vjmKv4x'
//                         }
//                     }
//                 );
//                 const data = await response.json();
//
//                 if (page === 1) {
//                     setListings(data.listings);
//                 } else {
//                     setListings((prevListings) => [...prevListings, ...data.listings]);
//                 }
//                 if (data.listings.length === 0 && page === 1) {
//                     setHasMore(false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching listings:', error);
//             }
//             setLoading(false);
//         };
//
//         fetchListings();
//     }, [page, searchQuery, searchQueryString]);
//
//     const handleScroll = () => {
//         if (
//             window.innerHeight + document.documentElement.scrollTop ===
//             document.documentElement.offsetHeight
//         ) {
//             if (!loading && hasMore) {
//                 setPage((prevPage) => prevPage + 1);
//             }
//         }
//     };
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//
//     const handleSearchChange = (event) => {
//         const value = event.target.value;
//
//         // Clear initialQueryString when the user types in the input box
//         setSearchQueryString('');
//         setSearchQuery(value);
//         setSearchQueryString(value.length > 0 ? `city=${value}` : ''); // Update searchQueryString
//
//         // Clear initialQueryString
//         setInitialQueryString('');
//
//         setPage(1); // Reset page number when search query changes
//
//         // Implement auto-suggestion logic here
//         // For simplicity, let's assume suggestions are based on city names
//         const filteredSuggestions = listings
//             .map((listing) => listing.address.city)
//             .filter((city) => city.toLowerCase().includes(value.toLowerCase()));
//         setSuggestions(filteredSuggestions);
//     };
//
//     const handleSuggestionClick = (suggestion) => {
//         setSearchQuery(suggestion)
//         setSearchQueryString(`city=${suggestion}`);
//         setSuggestions([]);
//     };
//
//     return (
//         <>
//             <div className={'filterBar bg-dark sticky-top py-2'}>
//                 <div className={'container-fluid'}>
//                     <div className={'row align-items-center'}>
//                         <div className={'col-lg-6'}>
//                             <div className={'searchBox'}>
//                                 <div className={'form-group position-relative'}>
//                                     <div className={'search-star'}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                                             <path
//                                                 d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"
//                                                 fill='#ffffff'/>
//                                         </svg>
//                                     </div>
//                                     <input
//                                         type="text"
//                                         list="browsers"
//                                         className={'form-control'}
//                                         placeholder="Search by city..."
//                                         value={searchQuery}
//                                         onChange={handleSearchChange}
//                                     />
//                                     {suggestions.length > 0 && (
//                                         <datalist id={'browsers'}>
//                                             {suggestions.map((suggestion, index) => (
//                                                 <option key={index}
//                                                         onClick={() => handleSuggestionClick(suggestion)}>
//                                                     {suggestion}
//                                                 </option>
//                                             ))}
//                                         </datalist>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
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
//
//                         {
//                             listings.length > 0 ? (
//                             listings && listings.map((properties, index) => (
//                             <div key={index} className={'col-xl-3 col-lg-4 mb-4'}>
//                                 <PropertyCard properties={properties}/>
//                             </div>
//                         ))
//                             ): (
//                                 <p>No listings found</p>
//                                 )}
//
//                         {loading && <p>Loading...</p>}
//                         {!hasMore > 1 && <p>No more listings</p>}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default Properties;


// import {PropertyCard} from "../../Components/PropertyCard/PropertyCard";
// import React, {useState, useEffect} from 'react';
// import { useLocation } from 'react-router-dom';
//
// import './style.css'
//
// const Properties = () => {
//     const [listings, setListings] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [searchQueryString, setSearchQueryString] = useState();
//
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const urlString = queryParams.get('searchString')
//
//     useEffect(() => {
//         console.log('Srting URL', urlString)
//
//
//         // if(stringURL) {
//         //     inputQueryChnage(stringURL)
//         // }
//
//         const fetchListings = async () => {
//             setLoading(true);
//             // const dummy =''
//             try {
//                 const response = await fetch(
//                     `https://api.repliers.io/listings?fields=mlsNumber%2ClistPrice%2ClistDate%2Caddress.area%2Caddress.zip%2Caddress.streetNumber%2Caddress.streetName%2Caddress.city%2Caddress.state%2Cimages%2Cdetails.numBedrooms%2Cdetails.numBedroomsPlus%2Cdetails.numBathrooms%2Cdetails.propertyType%2Cdetails.yearBuilt%2Coffice.brokerageName&listings=true&operator=AND&sortBy=updatedOnDesc&status=A&pageNum=${page}&resultsPerPage=20&${searchQueryString}`,
//                     {
//                         headers: {
//                             'REPLIERS-API-KEY': 'SOKZY30CjwBkm0aPvuYZWA8vjmKv4x'
//                         }
//                     }
//                 );
//                 const data = await response.json();
//
//                 if (page === 1) {
//                     setListings(data.listings);
//                 } else {
//                     setListings((prevListings) => [...prevListings, ...data.listings]);
//                 }
//                 if (data.listings.length === 0 && page === 1) {
//                     setHasMore(false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching listings:', error);
//             }
//             setLoading(false);
//         };
//
//         fetchListings();
//     }, [page, searchQuery]); // Include searchQuery as dependency
//
//     const handleScroll = () => {
//         if (
//             window.innerHeight + document.documentElement.scrollTop ===
//             document.documentElement.offsetHeight
//         ) {
//             if (!loading && hasMore) {
//                 setPage((prevPage) => prevPage + 1);
//             }
//         }
//     };
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//
//
//     useEffect(() => {
//         if (urlString && !searchQuery) {
//             setSearchQuery(urlString);
//             setSearchQueryString(urlString.length > 0 ? `city=${urlString}` : '');
//         }
//     }, [urlString, searchQuery]);
//
//     const handleSearchChange = (event) => {
//         const urlString = '';
//         const value = event.target.value;
//
//         setSearchQuery(value);
//         setSearchQueryString(value.length > 0 ? `city=${value}` : '')
//
//         console.log('Search Query String', searchQueryString)
//
//         setPage(1); // Reset page number when search query changes
//         // Implement auto-suggestion logic here
//         // For simplicity, let's assume suggestions are based on city names
//         const filteredSuggestions = listings
//             .map((listing) => listing.address.city)
//             .filter((city) => city.toLowerCase().includes(value.toLowerCase()));
//         setSuggestions(filteredSuggestions);
//     };
//
//     const handleSuggestionClick = (suggestion) => {
//         setSearchQuery(suggestion)
//         setSearchQueryString(`city=${suggestion}`);
//         setSuggestions([]);
//     };
//
//     return (
//         <>
//             <div className={'filterBar bg-dark sticky-top py-2'}>
//                 <div className={'container-fluid'}>
//                     <div className={'row align-items-center'}>
//                         <div className={'col-lg-6'}>
//                             <div className={'searchBox'}>
//                                 <div className={'form-group position-relative'}>
//                                     <div className={'search-star'}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">>
//                                             <path
//                                                 d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"
//                                                 fill='#ffffff'/>
//                                         </svg>
//                                     </div>
//                                     <input
//                                         type="text"
//                                         list="browsers"
//                                         className={'form-control'}
//                                         placeholder="Search by city..."
//                                         value={searchQuery}
//                                         onChange={handleSearchChange}
//                                     />
//                                     {suggestions.length > 0 && (
//                                         <datalist id={'browsers'}>
//                                             {
//                                                 suggestions.map((suggestion, index) => (
//                                                     <option key={index}
//                                                             onClick={() => handleSuggestionClick(suggestion)}>
//                                                         {suggestion}
//                                                     </option>
//                                                 ))}
//                                         </datalist>
//                                     )}
//
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className={'col-lg-6'}>
//                             <a href="/" className={'text-white'}><u>Filter</u></a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//
//             <div className="propertiesList py-4">
//                 <div className="container-fluid">
//                     <div className="row">
//                         {listings && listings.map((properties, index) => (
//                             <div key={index} className={'col-xl-3 col-lg-4 mb-4'}>
//                                 <PropertyCard properties={properties}/>
//                             </div>
//                         ))}
//                         {loading && <p>Loading...</p>}
//                         {!hasMore > 1 && <p>No more listings</p>}
//                     </div>
//                 </div>
//             </div>
//
//         </>
//     );
// };
//
//
// export default Properties;


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


// Working Properly - Search Query string not working - from homepage

// import { PropertyCard } from "../../Components/PropertyCard/PropertyCard";
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
//
// import './style.css'
//
// const Properties = () => {
//     const [listings, setListings] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [searchQueryString, setSearchQueryString] = useState('');
//     const [queryString, setQueryString] = useState('');
//
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const urlString = queryParams.get('searchString')
//
//     useEffect(() => {
//         if (urlString && !searchQuery) {
//             setSearchQuery(urlString);
//             setSearchQueryString(urlString.length > 0 ? `city=${urlString}` : '');
//         }
//         setQueryString(urlString)
//     }, [urlString, searchQuery]);
//
//     useEffect(() => {
//         console.log('String URL', urlString);
//
//         const fetchListings = async () => {
//             setLoading(true);
//
//             try {
//                 const response = await fetch(
//                     `https://api.repliers.io/listings?fields=mlsNumber%2ClistPrice%2ClistDate%2Caddress.area%2Caddress.zip%2Caddress.streetNumber%2Caddress.streetName%2Caddress.city%2Caddress.state%2Cimages%2Cdetails.numBedrooms%2Cdetails.numBedroomsPlus%2Cdetails.numBathrooms%2Cdetails.propertyType%2Cdetails.yearBuilt%2Coffice.brokerageName&listings=true&operator=AND&sortBy=updatedOnDesc&status=A&pageNum=${page}&resultsPerPage=20&${searchQueryString}`,
//                     {
//                         headers: {
//                             'REPLIERS-API-KEY': 'SOKZY30CjwBkm0aPvuYZWA8vjmKv4x'
//                         }
//                     }
//                 );
//                 const data = await response.json();
//
//                 if (page === 1) {
//                     setListings(data.listings);
//                 } else {
//                     setListings((prevListings) => [...prevListings, ...data.listings]);
//                 }
//                 if (data.listings.length === 0 && page === 1) {
//                     setHasMore(false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching listings:', error);
//             }
//             setLoading(false);
//         };
//
//         fetchListings();
//     }, [page, searchQuery, searchQueryString]);
//
//     const handleScroll = () => {
//         if (
//             window.innerHeight + document.documentElement.scrollTop ===
//             document.documentElement.offsetHeight
//         ) {
//             if (!loading && hasMore) {
//                 setPage((prevPage) => prevPage + 1);
//             }
//         }
//     };
//
//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//
//     const handleSearchChange = (event) => {
//         const value = event.target.value;
//
//         // Clear urlString when the user types in the input box
//         setSearchQueryString('');
//         setSearchQuery(value);
//         setSearchQueryString(value.length > 0 ? `city=${value}` : ''); // Update searchQueryString
//
//         // Clear urlString
//         setQueryString('');
//
//         setPage(1); // Reset page number when search query changes
//
//         // Implement auto-suggestion logic here
//         // For simplicity, let's assume suggestions are based on city names
//         const filteredSuggestions = listings
//             .map((listing) => listing.address.city)
//             .filter((city) => city.toLowerCase().includes(value.toLowerCase()));
//         setSuggestions(filteredSuggestions);
//     };
//
//     const handleSuggestionClick = (suggestion) => {
//         setSearchQuery(suggestion)
//         setSearchQueryString(`city=${suggestion}`);
//         setSuggestions([]);
//     };
//
//     return (
//         <>
//             <div className={'filterBar bg-dark sticky-top py-2'}>
//                 <div className={'container-fluid'}>
//                     <div className={'row align-items-center'}>
//                         <div className={'col-lg-6'}>
//                             <div className={'searchBox'}>
//                                 <div className={'form-group position-relative'}>
//                                     <div className={'search-star'}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                                             <path
//                                                 d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"
//                                                 fill='#ffffff'/>
//                                         </svg>
//                                     </div>
//                                     <input
//                                         type="text"
//                                         list="browsers"
//                                         className={'form-control'}
//                                         placeholder="Search by city..."
//                                         value={searchQuery}
//                                         onChange={handleSearchChange}
//                                     />
//                                     {suggestions.length > 0 && (
//                                         <datalist id={'browsers'}>
//                                             {suggestions.map((suggestion, index) => (
//                                                 <option key={index}
//                                                         onClick={() => handleSuggestionClick(suggestion)}>
//                                                     {suggestion}
//                                                 </option>
//                                             ))}
//                                         </datalist>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={'col-lg-6'}>
//                             <a href="/" className={'text-white'}><u>Filter</u></a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="propertiesList py-4">
//                 <div className="container-fluid">
//                     <div className="row">
//                         {listings && listings.map((properties, index) => (
//                             <div key={index} className={'col-xl-3 col-lg-4 mb-4'}>
//                                 <PropertyCard properties={properties}/>
//                             </div>
//                         ))}
//                         {loading && <p>Loading...</p>}
//                         {!hasMore > 1 && <p>No more listings</p>}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default Properties;


import {PropertyCard} from "../../Components/PropertyCard/PropertyCard";
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import './style.css'

const Properties = () => {
    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchQueryString, setSearchQueryString] = useState('');
    // const [queryString, setQueryString] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const urlString = queryParams.get('searchString')


    const fetchListings = async () => {
        setLoading(true);

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

    useEffect(() => {
        fetchListings(1);
    }, [page, searchQuery, searchQueryString]);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    // const clearTest = (event) => {
    //     console.log('Text Box Value', event.target.value)
    // }
    const handleSearch = () => {
        console.log('Search Query', searchQuery)
        // Clear urlString when the user types in the input box
        setPage(1); // Reset page number
        setListings([]); // Clear previous listings
        setSearchQueryString(`city=${searchQuery}`);

        fetchListings(1, searchQuery, setSearchQueryString); // Fetch listings based on search query

        console.log('Search Query', searchQuery)

        // Clear urlString
        // setQueryString('');

        // Implement auto-suggestion logic here
        // For simplicity, let's assume suggestions are based on city names
        // const filteredSuggestions = listings
        //     .map((listing) => listing.address.city)
        //     .filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()));
        // setSuggestions(filteredSuggestions);
    };

    // const handleSuggestionClick = (suggestion) => {
    //     setSearchQuery(suggestion)
    //     setSearchQueryString(`city=${suggestion}`);
    //     setSuggestions([]);
    // };

    return (
        <>
            <div className={'filterBar bg-dark sticky-top py-2'}>
                <div className={'container-fluid'}>
                    <div className={'row align-items-center'}>
                        <div className={'col-lg-6'}>
                            <div className={'searchBox'}>
                                <div className={'form-group position-relative'}>
                                    <div className={'search-star'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                    />
                                    {suggestions.length > 0 && (
                                        <datalist id={'browsers'}>
                                            {suggestions.map((suggestion, index) => (
                                                <option key={index}
                                                    // onClick={() => handleSuggestionClick(suggestion)}
                                                >
                                                    {suggestion}
                                                </option>
                                            ))}
                                        </datalist>
                                    )}

                                    <button className={'btn btn-primary'} type={"submit"} onClick={handleSearch}>
                                        <svg width="32" height="28" viewBox="0 0 32 28" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M31.695 14.7888L19.8442 27.6209C19.6085 27.8761 19.2227 28 18.9656 28C18.6808 28 18.395 27.8997 18.1684 27.697C17.6846 27.264 17.6487 26.5261 18.0885 26.05L28.1376 15.1679H1.18508C0.529964 15.1679 0 14.6462 0 14.0669C0 13.4877 0.530107 12.8348 1.18508 12.8348H28.1369L18.0862 1.94935C17.6464 1.47318 17.6823 0.734674 18.1661 0.30232C18.651 -0.128285 19.3997 -0.0964236 19.8412 0.382083L31.692 13.2142C32.1022 13.6587 32.1022 14.344 31.695 14.7888Z"
                                                fill="white"/>
                                        </svg>
                                    </button>
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