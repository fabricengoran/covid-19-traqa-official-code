import React, { Component } from 'react';
import './Body.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import infectedImage from '../../images/infected1.jfif';
import recoveredImage from '../../images/recovered1_1.jpg';
import deathsImage from '../../images/deaths1.jpeg';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Chart from '../Chart/Chart';
import Picker from '../Picker/Picker';
import $ from 'jquery';

import { fetchData, fetchCountryData, fetchCity, fetchProvince } from '../../api';
import CountUp from 'react-countup';

class Body extends Component {
    state = {
        data: {},
        countryData: {},
        countryStore: {},
        dataSwap_0: {},
        dataSwap_1: {},
        country: '',
        cityData: {},
        city: [],
        provinceData: {},
        province: [],
        hasSearch: true,
        suggestedCountry: '',
        navigate: 'Home',
        heartBeatDuration: '4s',
        heartBeatParam: 0,
    };

    async componentDidMount() {
        const fetchedData = await fetchData();
        const fetchedCountryData = await fetchCountryData();
        const fetchedCity = await fetchCity();
        const fetchedProvince = await fetchProvince();

        fetchedCity.map((city, i) => {
            if (city.recovered === null) {
                return city.recovered = 0;
            }
            
            return this.setState({ city: city.country });
        });

        fetchedProvince.map((province, i) => {
            if (province.recovered === null) {
                return province.recovered = 0;
            }
            
            return this.setState({ province: province.country });
        });
    
        this.setState({ data: fetchedData });
        this.setState({ dataSwap_1: this.state.data });
        this.setState({ countryData: fetchedCountryData });
        this.setState({ countryStore: fetchedCountryData });
        this.setState({ cityData: fetchedCity });
        this.setState({ provinceData: fetchedProvince });

        // jQuery again🤦‍♂️
        // Initialize Tooltip
        $('[data-toggle1="tooltip"]').tooltip();
        $('#welcomeModal').modal('show');
    };


    handleRegionSwap = async (swapInfo) => {
        if (swapInfo === 'City') {
            this.setState({ countryData: this.state.cityData });
        } else if (swapInfo === 'Province') {
            this.setState({ countryData: this.state.provinceData });
        } else {
            this.setState({ countryData: this.state.countryStore });
        }
        this.setState({ nameState: swapInfo });
    }

    handleSearchChange = async (country) => {
        this.setState({ dataSwap_0: this.state.countryData });
        this.setState({ searched: true });
        
        return this.state.countryData.filter((countryName, i) => {
            if (country) {
                this.setState({ country });
                if (country === '') { 
                    this.setState({ hasSearch: false });
                } else if (country === countryName.country.toLowerCase()) {
                        this.setState({ country });
                        this.setState({ data: this.state.countryData[i] });
                        this.setState({ hasSearch: true });
                        this.state.heartBeatParam = this.state.countryData[i].confirmed;
                } else if (country === 'global') {
                    this.setState({ data: this.state.dataSwap_1 });
                    this.setState({ dataSwap_0: {} });
                    this.setState({ country: 'global' });
                    this.setState({ hasSearch: true });
                } else if (country !== countryName.country.toLowerCase()) {
                    this.state.hasSearch = false;
                }
            } else {
                this.setState({ hasSearch: false });
                this.setState({ country });
            }
            
        });
    }

    handlePickerChange = async (country1) => {

        // This is some real messy Shit of code :)😁
        let country;
        let country2;
        country2 = country1.split(',');
        country = country2[0].toLowerCase();
        this.state.heartBeatParam = country2[1];

        this.setState({ dataSwap_0: this.state.countryData });
        
        return this.state.countryData.filter((countryName, i) => {
            if (country) {
                if (country === countryName.country.toLowerCase()) {
                    this.setState({ country });
                    this.setState({ data: this.state.countryData[i] });
                    this.setState({ hasSearch: true });
                } else if (country === 'global') {
                    this.setState({ data: this.state.dataSwap_1 });
                    this.setState({ dataSwap_0: {} });
                    this.setState({ country: 'global' });
                    this.setState({ hasSearch: true });
                }
            }
        });
    }

    handleSuggestion = async country => {
        this.setState({ suggestedCountry: country });
    }

    handleNavigation = e => {
        this.setState({ navigate: e.target.innerHTML});

        // jQuery saved me :|🤦‍♂️
        $('.nav-buttons button').removeClass('active');
        e.target.classList.add('active');
    }

    // Change Heart Beat Rate based on the number of infected🤓
    // N:B I delibrately used "this.state" instead "this.setState", because React won't let me🤷‍♂️
    handleHeartBeatRate = () => {
        if (this.state.country === 'global' || this.state.country === 'GLOBAL') {
            this.state.heartBeatDuration = '4s';
        } else {
            if (this.state.hasSearch) {
                if (this.state.heartBeatParam > 0 && this.state.heartBeatParam < 100)  {
                    this.state.heartBeatDuration = '7s';
                } else if (this.state.heartBeatParam > 100 && this.state.heartBeatParam < 500)  {
                    this.state.heartBeatDuration = '5s';
                } else if (this.state.heartBeatParam > 500 && this.state.heartBeatParam < 1000) {
                    this.state.heartBeatDuration = '3s';
                } else if (this.state.heartBeatParam > 1000 && this.state.heartBeatParam < 5000) {
                    this.state.heartBeatDuration = '2s';
                } else if (this.state.heartBeatParam > 5000 && this.state.heartBeatParam < 10000) {
                    this.state.heartBeatDuration = '1s';
                } else if (this.state.heartBeatParam > 10000 && this.state.heartBeatParam < 100000) {
                    this.state.heartBeatDuration = '.5s';
                } else if (this.state.heartBeatParam > 100000) {
                    this.state.heartBeatDuration = '.2s';
                }
            } else {
                this.state.heartBeatDuration = '0s';
            }
        }
    }

    preventTop = () => {
        $('#welcomeModal').modal('hide');
    }

    render() {
        let { confirmed, recovered, deaths, lastUpdate } =  this.state.data;

        // Add smooth scrolling to all links in footer link on page load
        $("#welcomeModal a[href='#top']").on('click', function(event) {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            const hash2 = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash2).offset().top
            }, 900, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash2;
            });
        });

        // CSS Animation for Heart Beat :) N:B It's not that complicated. It's connected to a @keyframe called 'heartBeat' in the Body.css file
        // See this code showed me pepper. I'd to implement the css directly in the corresponding tag :(
        // const heartStyle = {
        //     fontSize: '4rem',
        //     marginLeft: '42.5%',
        //     marginRight: '42.5%',
        //     /* box-shadow: 0px 15px 40px rgba(525, 255, 255, 0.605), */
        //     animationName: 'heartBeat',
        //     animationDuration: this.state.heartBeatDuration,
        //     animationIterationCount: 'infinite',
        // }

        // Initialize Heart Beat ❤
        // I could' just run the fxn code directly in here but decided to for once follow the rules of writing clean code😁
        this.handleHeartBeatRate();

        let infected;
        let recover;
        let dead;
        let date;

        if(!confirmed) {
            return (
                <React.Fragment>
                    <div className="container-fluid loadPage">
                        <h1 className="d-flex justify-content-center container text-center">
                            <span>Loading</span>
                            <div className="d-flex flex-row justify-content-center dot">
                                <span className="dot4">.</span>
                                <span className="dot5">.</span>
                                <span className="dot6">.</span>
                            </div>
                        </h1>
                    </div>
                </React.Fragment>
            );
        } else {

            if(!this.state.dataSwap_0.length) {
                infected = confirmed.value;
                recover = recovered.value;
                dead = deaths.value;
                date = lastUpdate;
            } else {
                infected = confirmed;
                recover = recovered;
                dead = deaths;
                date = !this.state.data.lastUpdate ? this.state.data.date : this.state.data.lastUpdate;
            }

        return (
            <body className="m-auto p-0" id="top">
                <NavBar handleRegionSwap={this.handleRegionSwap} />

                    {/* <!-- Download Modal --> */}
                    <div className="modal fade" id="downloadModal" role="dialog">
                        <div className="modal-dialog">

                            {/* <!-- Modal content--> */}
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4>Thank you for downloading the app</h4>
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                </div>
                                <div className="modal-body">
                                    <p className="download-msg"><a href="./download/covid-traqa%20v1.1.apk">Click here</a> if download didn't start.</p>
                                </div>
                            </div>
                        </div>
                    </div> 

                    {/* <!-- Welcome Modal --> */}
                    <div className="modal fade" id="welcomeModal" role="dialog">
                        <div className="modal-dialog">

                            {/* <!-- Modal content--> */}
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4>Welcome to COVID-19 TRAQA!</h4>
                                    <a href="#top" target="_blank" rel="noopener noreferrer"><button type="button" className="close" data-dismiss="modal">×</button></a>
                                </div>
                                <div className="modal-body">
                                    <p className="welcome-msg">The <span className="ranking"><FontAwesomeIcon icon={["fas", "trophy"]} color="gold" />n#1</span> corona virus tracker app.</p>
                                    <hr />
                                    <p>If you're new here, don't forget to tell us what you think (what you like/dislike or what features you wish we'd implemented) using the <b>feedback platform</b> located <em>center-right</em> of the page OR message us using the <b>message form</b> located <a onClick={() => this.preventTop()} data-toggle1="tooltip" title="To Message Form" id="to-form" href="#footerForm">bottom</a> of the page. Thank you</p>
                                </div>
                            </div>
                        </div>
                    </div>          
                
                    {/* Picker */}
                    <div className="container-fluid m-auto p-0 backgroundImg" id="picker">

                        {/* Download button */}
                        <div className="download-btn">
                            <a href="./download/covid-traqa%20v1.1.apk"><button data-toggle="modal" data-target="#downloadModal" onSubmit={e => e.target.preventDefault()} type="submit" className="btn btn-success btn-sm" data-toggle1="tooltip" title="For Android only"><FontAwesomeIcon icon="download" /> Download App</button></a>
                            <small className="badge badge-warning">New!</small>
                        </div>
                        
                        {/* Showcase display */}
                        <div className="d-flex flex-row justify-content-center dots">
                            <span className="dot1">.</span>
                            <span className="dot2">.</span>
                            <span className="dot3">.</span>
                        </div>

                        <h1 className="head-text" style={{ textAlign: "center" }}>Get Daily Covid-19 updates from any part of the world here.</h1>
                        <span 
                        style={{
                            fontSize: '4rem',
                            marginLeft: '42.5%',
                            marginRight: '42.5%',
                            /* box-shadow: 0px 15px 40px rgba(525, 255, 255, 0.605), */
                            animationName: 'heartBeat',
                            animationDuration: this.state.heartBeatDuration,
                            animationIterationCount: 'infinite',
                            cursor: 'pointer'
                        }} 
                        className="love-icon d-flex justify-content-center" data-toggle1="tooltip" title="I beat based on the number of infected for each country & normally for GLOBAL"><FontAwesomeIcon icon="heart" color="rgb(224, 26, 26)" /></span>

                        <Picker 
                            handleSChange={this.handleSearchChange}
                            handlePChange={this.handlePickerChange}
                            city={this.state.city}
                            province={this.state.province}
                            hasChange={this.state.hasChange}
                            nameState={this.state.nameState}
                            handleSuggestion={this.handleSuggestion}
                        />

                        <hr/>

                        <div className="text-center display">
                            <h3>
                                {
                                this.state.hasSearch ?
                                    this.state.country === '' || !this.state.hasSearch ?
                                    (`GLOBAL Statistics.`) :
                                        this.state.country === 'global' ? 
                                        (`${this.state.country.toUpperCase()} Statistics.`)
                                        : 
                                            this.state.country[this.state.country.length - 1] === 's' ?

                                            (`${this.state.country.toUpperCase()}' Statistics.`) 
                                            :
                                            (`${this.state.country.toUpperCase()}'s Statistics.`) 
                                    : null
                                }
                            </h3>
                            <hr/>
                        </div>
                    </div>

                <div className="container">
                    <div className="d-flex flex-row justify-content-center nav-buttons">
                        <button onClick={(e) => this.handleNavigation(e)} className="btn active">Home</button>

                        {
                        this.state.country === 'GLOBAL' || this.state.country === 'global' || this.state.country === '' ?
                            <button onClick={(e) => this.handleNavigation(e)} className="btn">Line Chart</button>
                        :
                            <button onClick={(e) => this.handleNavigation(e)} className="btn" disabled>Line Chart</button>
                        }

                        <button onClick={(e) => this.handleNavigation(e)} className="btn">Bar Chart</button>
                        <button onClick={(e) => this.handleNavigation(e)} className="btn">Pie Chart</button>
                    </div>
                {
                    this.state.hasSearch ?

                    (<React.Fragment>

                    {
                        this.state.navigate === 'Home' ?

                        <div className="text-center cards">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card infected">
                                        <img className="card-img-top" src={infectedImage} alt="Infected cases" />
                                        <div className="card-body">
                                            <h3 className="card-title">Infected <FontAwesomeIcon icon={["far", "angry"]} color="rgb(255, 235, 0)" size="sm" /></h3>
                                            <hr/>
                                            <p className="card-text">
                                                <CountUp start={0} end={infected} duration={2.5} separator="," />
                                            </p>
                                            <div className="report">
                                                <p>{new Date(date).toDateString()}</p>
                                                <p>Number of Infected</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card recovered">
                                        <img className="card-img-top" src={recoveredImage} alt="recovered cases" />
                                        <div className="card-body">
                                            <h3 className="card-title">Recovered <FontAwesomeIcon icon={["far", "smile"]} color="green" size="sm" /></h3>
                                            <hr/>
                                            <p className="card-text">
                                                <CountUp start={0} end={recover} duration={2.5} separator="," />
                                            </p>
                                            <div className="report">
                                                <p>{new Date(date).toDateString()}</p>
                                                <p>Number of Recovered</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card deaths">
                                        <img className="card-img-top" src={deathsImage} alt="Deaths cases" />
                                        <div className="card-body">
                                            <h3 className="card-title">Deaths <FontAwesomeIcon icon={["far", "tired"]} color="red" size="sm" /></h3>
                                            <hr/>
                                            <p className="card-text">
                                                <CountUp start={0} end={dead} duration={2.5} separator="," />
                                            </p>
                                            <div className="report">
                                                <p>{new Date(date).toDateString()}</p>
                                                <p>Number of Deaths</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        :

                        <Chart 
                            data={this.state.data} 
                            country={this.state.country.toUpperCase()}
                            hasChange={this.state.hasChange}
                            navigate={this.state.navigate}
                         />
                    }
                    </React.Fragment>) 

                    :

                    (
                        <div className="alert alert-danger noSearch">
                            <h5>Result Not Found</h5>
                            <hr/>
                            <ul>
                                { this.state.country !== '' ?
                                    !this.state.suggestedCountry.length ?
                                        (<React.Fragment>
                                            <li>Please check if "<b><i>{this.state.country}</i></b>" is spelled correctly and try again.😞</li>
                                            <li>Sorry! Maybe our API provider does not provide information about "<b><i>{this.state.country}</i></b>".🥺</li>
                                            <li>Search the word "<b>Global</b>" in the search field to return to the default dashboard or choose a location from the selector above the search field.😩</li>
                                        </React.Fragment>)
                                        :
                                        (<React.Fragment>
                                            <li>Do you mean "<b><i>{this.state.suggestedCountry}</i></b>"🤔</li>
                                            <li>Please check if "<b><i>{this.state.country}</i></b>" is spelled correctly and try again.😞</li>
                                            <li>Sorry! Maybe our API provider does not provide information about "<b><i>{this.state.country}</i></b>".🥺</li>
                                            <li>Search the word "<b>Global</b>" in the search field to return to the default dashboard or choose a location from the selector above the search field.😩</li>
                                        </React.Fragment>)
                                    : 
                                    (<React.Fragment>
                                        <li>Seriously bro! An empty string(" <b><i>{this.state.country} </i></b>"). I'm a joke to you right? In your face.🤣</li>
                                        <li>Search the word "<b>Global</b>" in the search field to return to the default dashboard or choose a location from the selector above the search field.😩</li>
                                    </React.Fragment>)
                                }
                            </ul>
                        </div>
                    )

                }
                </div>
                        
                <Footer />  
            </body>
        )
        }
    }
}

export default Body;
