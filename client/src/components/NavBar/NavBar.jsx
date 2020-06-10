import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavBar.css'


function NavBar({ handleRegionSwap }) {

    const handleSwap = (e) => {
        e.preventDefault();
        handleRegionSwap(e.target.innerText);
    }

    return (
        <nav className="backgroundImg navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand text-success" href="index.html"><span className="navLogo"><FontAwesomeIcon icon="virus" /> COVID-19 TRAQA <FontAwesomeIcon icon="viruses" /></span></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a onClick={e => handleSwap(e)} className="nav-link" href="index.html">Country</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={e => handleSwap(e)} className="nav-link" href="index.html">City</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={e => handleSwap(e)} className="nav-link" href="index.html">Province</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
