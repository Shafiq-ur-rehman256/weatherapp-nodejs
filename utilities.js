const axios = require('axios').default;

const getGeoLocation =  async(location) =>{

    let ret = {};
    //GeocodignApi Documentation :   https://docs.mapbox.com/api/search/geocoding/
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic2hhZmlxLXVyLXJlaG1hbiIsImEiOiJja3pkdjh4cnQwZTB0Mm9wZDZ3aHZicHZoIn0.FJFupmNCS836h2rDdNvxCg&limit=1`;
      
     await axios.request(url).then((response) => {
      let  {center}  = response.data.features[0];
      ret.longitude = center[0];
      ret.latitude = center[1];
      }).catch((error) => {
          console.error(error);
      });

    return ret;
}

module.exports = {
    getGeoLocation
}