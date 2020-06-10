import React, { Component, Fragment } from 'react';
import { fetchCountryData, fetchTravelData } from '../../api';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Chart.css';

class Chart extends Component {
    state = {
        globalData: {},
        travelData: {},
        expanded: false,
    }

    async componentDidMount() {
        this.setState({ globalData: await fetchCountryData() });
        this.setState({ travelData: await fetchTravelData() });
    }

    render() {
        let { data, country, hasChange, navigate } = this.props;
        const { globalData, travelData, expanded } = this.state;

        const toggledClass = expanded ? 'expanded' : 'collapsed';

        if (!country) {
            country = 'Global';
        }

        const { confirmed, recovered, deaths, lastUpdate } =  data;

        let infected;
        let recover;
        let dead;

        if(lastUpdate && !hasChange && (country === 'Global' || country === 'GLOBAL')) {
            infected = confirmed.value;
            recover = recovered.value;
            dead = deaths.value;
        } else if (country) {
            infected = confirmed;
            recover = recovered;
            dead = deaths;
        }

        const lineChart = (
            globalData.length
            ? (
                <Line
                    data={{ 
                        labels: globalData.map(({ country }) => country),
                        datasets: [{
                            data: globalData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: 'rgba(255, 255, 0)',
                            fill: true
                        }, {
                            data: globalData.map(({ recovered }) => recovered),
                            label: 'Recovered',
                            borderColor: 'rgba(0, 255, 0)',
                            fill: true
                        }, {
                            data: globalData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0)',
                            fill: true
                        }]
                    }}
                    options={{ 
                        legend: { display: false },
                        title: { display: true, text: (country === 'Global' || country === 'GLOBAL') ? `Current ${country} state` : `Current state in ${country}`},
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                     }}
                />
            ) : <small className="text-sm-center">Please wait...</small>
        );

        const barChart = (
            data
            ? (
                <Bar
                    data={{ 
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            labels: 'People',
                            backgroundColor: [
                                'rgba(255, 255, 0, 0.5',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)'
                            ],
                            data: [infected, recover, dead]
                        }]
                    }}
                    options={{ 
                        legend: { display: false },
                        title: { display: true, text: (country === 'Global' || country === 'GLOBAL') ? `Current ${country} state` : `Current state in ${country}`},
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                     }}
                />
            ) : <small className="text-sm-center">Please wait...</small>
        );

        const pieChart = (
            data
            ? (
                <Pie
                    data={{ 
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            labels: 'People',
                            backgroundColor: [
                                'rgba(255, 255, 0, 0.5',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)'
                            ],
                            data: [infected, recover, dead]
                        }]
                    }}
                     options={{ 
                        legend: { display: true },
                        title: { display: true, text: (country === 'Global' || country === 'GLOBAL') ? `Current ${country} state` : `Current state in ${country}`},
                        responsive: true,
                        maintainAspectRatio: true,
                        // scales: {
                        //     yAxes: [{
                        //         ticks: {
                        //             beginAtZero: true
                        //         }
                        //     }]
                        // }
                     }}
                />
            ) : <small className="text-sm-center">Please wait...</small>
        );

    return (
        
        <div className="chart text-center">

            {
                navigate === 'Line Chart' ?
                
                <Fragment>
                    {
                    country === 'GLOBAL' || country === 'Global' ?
                        <Fragment>
                            <div className="alert alert-secondary line">
                                <p><FontAwesomeIcon icon="lightbulb" color="gold" /> The Line Chart below represents just Global information.</p>
                            </div>

                            <div className="lineChart">{lineChart}</div>
                        </Fragment>
                    : 
                        <div className="alert alert-success line p-5 m-2">
                            <p><FontAwesomeIcon icon="lightbulb" color="gold" /> Sorry! Information about any single country is currently unavailable for the line chart.</p>
                        </div>
                    }
                </Fragment>

                : navigate === 'Bar Chart' ?

                    <Fragment>
                        {
                            travelData.length ?

                                travelData.map(countryName => {
                                    if (countryName.country.toUpperCase() === country) {
                                        return (
                                            <div className="alert alert-success blockquote-inverse text-left text-dark">
                                                <h5 className="text-center">Travel Information</h5>
                                                <hr/>
                                                {
                                                    countryName.travelInfo.split('\n').map(info => {
                                                        if (info[0] === '1' || info[0] === 'a') {
                                                            return <p>{info}</p>;
                                                        } else {
                                                            return <p className={`content ${toggledClass}`} >{info}</p>
                                                        }
                                                    })
                                                }
                                                <p className="blockquote-footer text-center">{countryName.country}</p>
                                                <button className="btn btn-success btn-sm" onClick={() => this.setState({ expanded: !expanded })}>
                                                    {expanded ? 'View Less' : 'View More'}
                                                </button>
                                            </div>
                                        )
                                    }
                                })
                                : null
                        }

                        <div className="countryChart">
                            <div className="barChart">{barChart}</div>
                        </div>
                    </Fragment>

                    :

                    <Fragment>
                        {
                            travelData.length ?

                                travelData.map(countryName => {
                                    if (countryName.country.toUpperCase() === country) {
                                        return (
                                            <div className="alert alert-success blockquote-inverse text-left text-dark">
                                                <h5 className="text-center">Travel Information</h5>
                                                <hr/>
                                                {
                                                    countryName.travelInfo.split('\n').map(info => {
                                                        if (info[0] === '1' || info[0] === 'a') {
                                                            return <p>{info}</p>;
                                                        } else {
                                                            return <p className={`content ${toggledClass}`} >{info}</p>
                                                        }
                                                    })
                                                }
                                                <p className="blockquote-footer text-center">{countryName.country}</p>
                                                <button className="btn btn-success btn-sm" onClick={() => this.setState({ expanded: !expanded })}>
                                                    {expanded ? 'View Less' : 'View More'}
                                                </button>
                                            </div>
                                        )
                                    }
                                })
                                : null
                        }

                        <div className="countryChart">
                            <div className="pieChart">{pieChart}</div>
                        </div>
                    </Fragment>
            }

        </div>
    )
    }
}

export default Chart;
