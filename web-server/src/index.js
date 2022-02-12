const path = require('path');
const express = require('express');
const request = require('request');
const { getGeoLocation } = require('../utils/index');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));


app.get('/weather', async (req, res) => {
    let { location } = req.query;
    let { latitude, longitude } = await getGeoLocation(location); // this fuction gets the coordinates of giving location 

    // Weather Stack Api Documentation: https://weatherstack.com/quickstart
    const url = `http://api.weatherstack.com/current?access_key=300d0733033573c95dd3c373243450d7&query=${latitude},${longitude}&units=m`;

    request({ url: url, json: true }, (err, dat) => {
        if (res) {
            let data = dat.body;
            res.status(200).send({
                error: false,
                message: data.current
            });
        }
        if (err) {
            res.status(404).send({
                error: true,
                message: 'Data Not Found!'
            })
        }
    })

})
app.listen(3030, () => {
    console.log("server is up on port 3000");
})