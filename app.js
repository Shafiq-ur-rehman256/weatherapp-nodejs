const request = require('request');
const { getGeoLocation } = require('./utilities');

async function getWeather() {
    let {latitude , longitude } =  await getGeoLocation('karachi'); // this fuction gets the cordinates of giving location 

    // Weather Stack Api Documentation: https://weatherstack.com/quickstart
    const url = `http://api.weatherstack.com/current?access_key=300d0733033573c95dd3c373243450d7&query=${latitude},${longitude}&units=m`;

    request({ url:url, json:true }, (err ,res)=>{
     if (res) {
       let data = res.body;
       console.log(data.current);
     }
     if (err) {
         throw err
     }
    })
}



getWeather();