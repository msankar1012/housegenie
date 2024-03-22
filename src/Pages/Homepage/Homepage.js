import {useEffect} from "react"
import './style.css'
import sliderImg1 from '../../images/img-search-home-1.svg'
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
//import {Routes, Route} from "react-router-dom";

//import {SearchProperty} from "../../Components/SearchProperty/SearchProperty";
//import sliderImg2 from '../../images/img-search-home-2.svg'

export const Homepage = () => {
    useEffect(() => {
        document.body.className = 'searchRoot';
        return () => { document.body.className = ''; }
    })

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        setQuery(e.target.value);
    };

    const handleClick = e => {
        e.preventDefault();
        alert("you have searched for - " + query);
        navigate({
            pathname: '/properties',
            search:`?searchString=${query}`,
        });
    };

    return (
        <>
            <div className={'search-container'}>
                <div className={'searchBoxOver'}>
                    <figure><img src={sliderImg1} alt="Slider"/></figure>

                    <div className={'searchBoxHolder'}>
                        <div className={'search-home'}>
                            <h1 className={'text-white text-center'}>Experience the Future of Real Estate: Empowered by
                                AI</h1>
                            <div className={'searchBox'}>
                                <div className={'form-group position-relative'}>
                                    <div className={'search-star'}>
                                        <svg viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M30.221 23.5379C20.266 21.2899 18.724 19.7479 16.476 9.79292C16.373 9.33792 15.968 9.01392 15.5 9.01392C15.032 9.01392 14.627 9.33792 14.524 9.79292C12.275 19.7479 10.734 21.2899 0.779023 23.5379C0.323023 23.6419 -0.000976562 24.0459 -0.000976562 24.5139C-0.000976562 24.9819 0.323023 25.3859 0.779023 25.4899C10.734 27.7389 12.275 29.2809 14.524 39.2349C14.627 39.6899 15.032 40.0139 15.5 40.0139C15.968 40.0139 16.373 39.6899 16.476 39.2349C18.725 29.2809 20.266 27.7389 30.221 25.4899C30.677 25.3859 31 24.9819 31 24.5139C31 24.0459 30.676 23.6419 30.221 23.5379Z"
                                                fill="white"/>
                                            <path
                                                d="M39.2208 8.03901C33.9288 6.84401 33.1858 6.10101 31.9908 0.810006C31.8868 0.354006 31.4828 0.0310059 31.0148 0.0310059C30.5468 0.0310059 30.1428 0.354006 30.0388 0.810006C28.8438 6.10101 28.1008 6.84401 22.8098 8.03901C22.3538 8.14301 22.0308 8.54701 22.0308 9.01501C22.0308 9.48301 22.3538 9.88701 22.8098 9.99101C28.1008 11.186 28.8438 11.929 30.0388 17.221C30.1428 17.676 30.5468 18 31.0148 18C31.4828 18 31.8868 17.676 31.9908 17.221C33.1858 11.929 33.9288 11.186 39.2208 9.99101C39.6758 9.88701 39.9998 9.48301 39.9998 9.01501C39.9998 8.54701 39.6758 8.14301 39.2208 8.03901Z"
                                                fill="white"/>
                                        </svg>
                                    </div>
                                    <input className={'form-control'} type="search" onChange={handleChange}/>
                                    <button className={'btn btn-primary'} type={"submit"} onClick={handleClick}>
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
                    </div>
                </div>
            </div>

            <div className={'searchFooter'}>
                <div className={'container-fluid d-flex justify-content-between align-items-center'}>
                    <p className={'pb-0'}>&copy; {new Date().getFullYear()}, all rights reserved.</p>
                    <ul className="hg-social-links p-0">
                        <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path
                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                                </path>
                            </svg>
                        </a>
                        </li>
                        <li><a href="https://twitter.com/" target="_blank" rel="noreferrer">
                            <svg width="1200" height="1227" viewBox="0 0 1200 1227" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
                            </svg>
                        </a></li>
                        <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
                                </path>
                            </svg>
                        </a></li>
                        <li><a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path
                                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                                </path>
                            </svg>
                        </a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
