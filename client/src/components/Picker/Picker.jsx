import React, { useState, useEffect } from 'react';
import FontAwesomeIcon from 'react-fontawesome';
import { fetchCountryData, fetchCity, fetchProvince } from '../../api';
import './Picker.css';


const Picker = ({ handlePChange, handleSChange, handleSuggestion, nameState }) => {
    const [fetchedCountry, setFetchedCountry] = useState([]);
    const [fetchedCity, setFetchedCity] = useState([]);
    const [fetchedProvince, setFetchedProvince] = useState([]);
    const [suggestedCountry, setSuggestedCountry] = useState([]);

    useEffect(() => {
        const FetchCountry = async () => {
            const countrySorted = await fetchCountryData();
            const citySorted = await fetchCity();
            const provinceSorted = await fetchProvince();
            
            setFetchedCountry(countrySorted);
            setFetchedCity(citySorted);
            setFetchedProvince(provinceSorted);
        }

        FetchCountry();
    }, [setFetchedCountry, setFetchedCity, setFetchedProvince]);

    const handleCountrySearch = e => {
        e.preventDefault();
        let event = e.target.search.value;
        handleSChange(event.toLowerCase().trim());

        e.target.search.value = '';
    }

    const makeSuggestion = (e) => {
        const result = fetchedCountry.filter(({country}) => {
            return country.toLowerCase().includes(e.target.value);
        });
    
        result.map(({country}) => {
            return setSuggestedCountry(country);
        });
        handleSuggestion(suggestedCountry);
    }

    return (
        <div className="search text-center">
            <form className="form-inline">
                <p className="pickerText">Select {(nameState === 'City') ? "City" : (nameState === 'Province') ? "Province" : "Country"}</p>
                <select defaultValue="" onChange={(e) => handlePChange(e.target.value)} className="form-control" name="" id="">
                    <option value="Global">Global</option>
                    {
                    (nameState === 'City') ?
                            (fetchedCity.map(({country, confirmed}) => <React.Fragment><option key={country} value={[country, confirmed]}>{country}</option></React.Fragment>))
                            :
                    (nameState === 'Province') ?
                            (fetchedProvince.map(({country, confirmed}) => <React.Fragment><option key={country.country} value={[country, confirmed]}>{country}</option></React.Fragment>))
                            : 
                            fetchedCountry.map(({country, confirmed}) => <React.Fragment><option key={country} value={[country, confirmed]}>{country}</option></React.Fragment>)
                    }
                </select>
            </form>

            <p className="pickerText">OR</p>

            <form onSubmit={e => handleCountrySearch(e)}  
                className="form-inline my-2 my-lg-0"
                >
                <input 
                onChange={e => makeSuggestion(e)}
                className="form-control mr-sm-2" 
                type="text" 
                name="search"
                placeholder={(nameState === 'City') ? "Search city" : (nameState === 'Province') ? "Search province" : "Search country's name"} 
                aria-label="Search" 
                required 
                />
                <button className="btn btn-outline-success my-2 my-sm-0 text-center" type="submit"><span className="pickerPlaceholders">Search</span> <FontAwesomeIcon icon="search" /></button>
            </form>

        </div>
    );
}
export default Picker;
