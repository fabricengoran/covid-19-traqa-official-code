import axios from 'axios';

const url = 'https://www.trackcorona.live/api';

const uri = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(uri);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountryData = async () => {
    try {
        const { data: { data } } = await axios.get(`${url}/countries`);

        const modifiedData= data.map((countryData) => ({
            country: countryData.location,
            confirmed: countryData.confirmed,
            recovered: countryData.recovered,
            deaths: countryData.dead,
            date: new Date(countryData.updated).toLocaleDateString()
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCity = async () => {
    try {
        const { data: { data } } = await axios.get(`${url}/cities`);

        const modifiedCityData= data.map((countryData) => ({
            country: countryData.location,
            confirmed: countryData.confirmed,
            recovered: countryData.recovered,
            deaths: countryData.dead,
            lastUpdate: new Date(countryData.updated).toLocaleDateString()
        }));
        
        return modifiedCityData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchProvince = async () => {
    try {
        const { data: { data } } = await axios.get(`${url}/provinces`);

        const modifiedProvinceData= data.map((countryData) => ({
            country: countryData.location,
            confirmed: countryData.confirmed,
            recovered: countryData.recovered,
            deaths: countryData.dead,
            lastUpdate: new Date(countryData.updated).toLocaleDateString()
        }));
        
        return modifiedProvinceData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchTravelData = async () => {
    try {
        const { data: { data } } = await axios.get(`${url}/travel`);

        const modifiedTravelData= data.map((countryData) => ({
            country: countryData.location,
            travelInfo: countryData.data
        }));
        
        return modifiedTravelData;
    } catch (error) {
        console.log(error);
    }
}


//FOR OFFLINE CONTENT, COMMENT THE CODE ABOVE AND UNCOMMENT THE SECTION BELOW


// import axios from 'axios';

// // const url = 'http://localhost:3000/api/daily.json';

// const uri = 'http://localhost:3000/api/api.json';

// export const fetchData = async () => {
//     try {
//         const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(uri);

//         return { confirmed, recovered, deaths, lastUpdate };
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const fetchCountryData = async () => {
//     try {
//         const { data: { data } } = await axios.get(`http://localhost:3000/api/countries.json`);

//         const modifiedData= data.map((countryData) => ({
//             country: countryData.location,
//             confirmed: countryData.confirmed,
//             recovered: countryData.recovered,
//             deaths: countryData.dead,
//             date: new Date(countryData.updated).toLocaleDateString()
//         }));

//         return modifiedData;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const fetchCity = async () => {
//     try {
//         const { data: { data } } = await axios.get(`http://localhost:3000/api/cities.json`);

//         const modifiedCityData= data.map((countryData) => ({
//             country: countryData.location,
//             confirmed: countryData.confirmed,
//             recovered: countryData.recovered,
//             deaths: countryData.dead,
//             lastUpdate: new Date(countryData.updated).toLocaleDateString()
//         }));
        
//         return modifiedCityData;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const fetchProvince = async () => {
//     try {
//         const { data: { data } } = await axios.get(`http://localhost:3000/api/provinces.json`);

//         const modifiedProvinceData= data.map((countryData) => ({
//             country: countryData.location,
//             confirmed: countryData.confirmed,
//             recovered: countryData.recovered,
//             deaths: countryData.dead,
//             lastUpdate: new Date(countryData.updated).toLocaleDateString()
//         }));
        
//         return modifiedProvinceData;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const fetchTravelData = async () => {
//     try {
//         const { data: { data } } = await axios.get(`http://localhost:3000/api/travel.json`);

//         const modifiedTravelData= data.map((countryData) => ({
//             country: countryData.location,
//             travelInfo: countryData.data
//         }));
        
//         return modifiedTravelData;
//     } catch (error) {
//         console.log(error);
//     }
// }
