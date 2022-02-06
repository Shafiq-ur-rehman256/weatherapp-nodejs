const request = require('request');
const { getGeoLocation } = require('./utilities');


async function getWeather() {
    let weatherData;

    let {latitude , longitude } =  await getGeoLocation();
    const url = `http://api.weatherstack.com/current?access_key=300d0733033573c95dd3c373243450d7&query=${latitude},${longitude}`;

    request({'url':url}, (err ,res)=>{
     if (res) {
       let data = JSON.parse(res.body);
       console.log(data.current);
     }
     if (err) {
         throw err
     }
    })

}



getWeather();