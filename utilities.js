const axios = require('axios').default;

const getGeoLocation =  async() =>{

    let ret;
    let options = {
        method: 'GET',
        url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
        headers: {
          'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
          'x-rapidapi-key': '8590fd2a06mshedac11f4703d28ep1631b3jsnc22317e6faa2'
        }
      };
      
     await axios.request(options).then((response) => {
          ret = response.data
      }).catch((error) => {
          console.error(error);
      });
    return ret;
}

module.exports = {
    getGeoLocation
}